import httpx
import asyncio
import json
from typing import Dict, List, Optional, Any
from datetime import datetime, timedelta
from app.config import settings, get_source, list_sources
from app.db import (
    init_db,
    ensure_feature_table,
    upsert_features,
    count_features,
    update_source_meta,
    get_source_meta,
)
from app.enrich import enrich_captages


class ArcGISFetcher:
    def __init__(self, client: httpx.AsyncClient):
        self.client = client

    async def fetch_layer_info(self, base_url: str, layer_id: int) -> Dict:
        url = f"{base_url}/{layer_id}?f=json"
        resp = await self.client.get(url, timeout=30)
        resp.raise_for_status()
        return resp.json()

    async def fetch_count(self, base_url: str, layer_id: int, where: str = "1=1") -> int:
        url = f"{base_url}/{layer_id}/query"
        params = {"where": where, "returnCountOnly": "true", "f": "json"}
        resp = await self.client.get(url, params=params, timeout=30)
        resp.raise_for_status()
        return resp.json().get("count", 0)

    async def fetch_page(
        self, base_url: str, layer_id: int, offset: int, limit: int, where: str = "1=1"
    ) -> List[Dict]:
        url = f"{base_url}/{layer_id}/query"
        params = {
            "where": where,
            "outFields": "*",
            "returnGeometry": "true",
            "resultOffset": offset,
            "resultRecordCount": limit,
            "f": "json",
            "outSR": "3857",
        }
        resp = await self.client.get(url, params=params, timeout=60)
        resp.raise_for_status()
        data = resp.json()
        return data.get("features", [])


async def sync_source(source_key: str) -> Dict[int, int]:
    source = get_source(source_key)
    if not source or source.status != "ok":
        return {}

    layer_counts = {}
    layer_meta = {}
    async with httpx.AsyncClient(timeout=60) as client:
        fetcher = ArcGISFetcher(client)
        for layer in source.layers:
            try:
                # Fetch layer metadata (fields, geometryType, extent, etc.)
                info = await fetcher.fetch_layer_info(source.base_url, layer.id)
                fields = info.get("fields", [])
                max_rc = info.get("maxRecordCount") or settings.max_record_count

                # Ensure table exists
                ensure_feature_table(source_key, layer.id, fields)

                # Fetch count
                total = await fetcher.fetch_count(source.base_url, layer.id)

                # Paginated fetch
                offset = 0
                fetched = 0
                while offset < total:
                    features = await fetcher.fetch_page(
                        source.base_url, layer.id, offset, max_rc
                    )
                    if not features:
                        break
                    upsert_features(source_key, layer.id, features)
                    fetched += len(features)
                    offset += len(features)
                    # small delay to be polite
                    await asyncio.sleep(0.05)

                layer_counts[layer.id] = fetched

                # Build rich layer metadata for catalogue (Intake-lite style)
                extent = info.get("extent")
                bbox = None
                if extent:
                    bbox = [extent.get("xmin"), extent.get("ymin"), extent.get("xmax"), extent.get("ymax")]

                layer_meta[layer.id] = {
                    "name": info.get("name", layer.name),
                    "description": info.get("description", ""),
                    "geometryType": info.get("geometryType"),
                    "extent": bbox,
                    "spatialReference": info.get("spatialReference", {}),
                    "fields": [
                        {
                            "name": f.get("name"),
                            "alias": f.get("alias"),
                            "type": f.get("type"),
                            "nullable": f.get("nullable", True),
                            "length": f.get("length"),
                        }
                        for f in fields
                    ],
                    "copyrightText": info.get("copyrightText", ""),
                    "service_url": f"{source.base_url}/{layer.id}",
                    "driver": "arcgis_featureserver",
                    "tags": ["referentiel", source.key],
                    "provenance": "sync_python",
                }

                print(f"  {source_key} layer {layer.id}: {fetched}/{total} — {info.get('name', layer.name)}")

            except Exception as e:
                print(f"  ERROR syncing {source_key} layer {layer.id}: {e}")
                layer_counts[layer.id] = 0
                layer_meta[layer.id] = {
                    "name": layer.name,
                    "driver": "arcgis_featureserver",
                    "provenance": "sync_python",
                    "error": str(e),
                }

    # Update meta with layer metadata
    update_source_meta(
        key=source_key,
        name=source.name,
        base_url=source.base_url,
        status="ok",
        layer_counts=layer_counts,
        layer_meta=layer_meta,
    )
    return layer_counts


def is_stale(source_key: str) -> bool:
    meta = get_source_meta(source_key)
    if not meta or not meta.get("last_sync"):
        return True
    try:
        last = datetime.fromisoformat(meta["last_sync"].replace("Z", "+00:00"))
        ttl = timedelta(hours=settings.ttl_hours)
        return datetime.utcnow() - last.replace(tzinfo=None) > ttl
    except Exception:
        return True


async def sync_all(force: bool = False) -> Dict[str, Dict[int, int]]:
    init_db()
    results = {}
    for source in list_sources():
        if source.status != "ok":
            update_source_meta(
                key=source.key,
                name=source.name,
                base_url=source.base_url,
                status=source.status,
                layer_counts={},
            )
            results[source.key] = {}
            continue
        if force or is_stale(source.key):
            print(f"Syncing {source.key}...")
            counts = await sync_source(source.key)
            results[source.key] = counts
        else:
            print(f"Skipping {source.key} (cache fresh)")
            results[source.key] = {}
    
    # Post-sync enrichment: attribuer commune et bassin aux captages
    print("Enrichissant les captages (commune + bassin)...")
    try:
        enriched = enrich_captages()
        print(f"  {enriched} captages enrichis")
    except Exception as e:
        print(f"  ERREUR enrichissement: {e}")
    
    return results


def get_sync_status() -> List[Dict]:
    sources = list_sources()
    status_list = []
    for src in sources:
        meta = get_source_meta(src.key)
        stale = is_stale(src.key) if src.status == "ok" else False
        status_list.append({
            "key": src.key,
            "name": src.name,
            "status": src.status,
            "priority": src.priority,
            "last_sync": meta.get("last_sync") if meta else None,
            "last_count": meta.get("last_count") if meta else 0,
            "layer_counts": meta.get("layer_counts") if meta else {},
            "layer_meta": meta.get("layer_meta") if meta else {},
            "catalog_version": meta.get("catalog_version") if meta else 0,
            "stale": stale,
        })
    return status_list
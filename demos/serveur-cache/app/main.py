from fastapi import FastAPI, HTTPException, Query, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import asyncio
import os
import json

from app.config import settings, get_source, list_sources
from app.db import (
    init_db,
    get_features,
    count_features,
    get_source_meta,
    get_all_sources_meta,
)
from app.sync import sync_all, get_sync_status
from app.enrich import simplify_geometry


def esri_to_geojson_geometry(geom: Optional[Dict]) -> Optional[Dict]:
    """Convertit une géométrie ESRI (Point/Polygon/Polyline) en GeoJSON standard.
    La géométrie d'entrée est supposée être en EPSG:3857 (Web Mercator)."""
    if not geom:
        return None
    # Point: {x, y} → [x, y]
    if "x" in geom and "y" in geom:
        return {"type": "Point", "coordinates": [geom["x"], geom["y"]]}
    # Polygon: {rings: [[[x,y], ...]]} → Polygon
    if "rings" in geom:
        rings = geom["rings"]
        # Le premier ring est l'exterieur, les suivants sont des trous
        # GeoJSON attend un tableau de rings
        return {"type": "Polygon", "coordinates": rings}
    # Polyline: {paths: [[[x,y], ...]]} → LineString (prend le premier path)
    if "paths" in geom and geom["paths"]:
        return {"type": "LineString", "coordinates": geom["paths"][0]}
    return None


app = FastAPI(
    title="HydroScope Serveur Cache",
    description="API cache pour les référentiels eau de Nouvelle-Calédonie",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Startup sync
@app.on_event("startup")
async def startup_sync():
    init_db()
    # Fire and forget - don't block startup
    asyncio.create_task(sync_all(force=False))


class RefreshResponse(BaseModel):
    message: str
    results: Dict[str, Dict[int, int]]


class FeatureResponse(BaseModel):
    features: List[Dict[str, Any]]
    count: int
    limit: int
    offset: int


@app.get("/health")
async def health():
    return {"status": "ok", "service": "hydroscope-serveur-cache"}


@app.get("/api/sources")
async def list_sources_api():
    """Liste des sources avec leur état de synchronisation"""
    status = get_sync_status()
    return {"sources": status}


@app.get("/api/sources/{key}")
async def get_source_detail(key: str):
    """Détail d'une source"""
    src = get_source(key)
    if not src:
        raise HTTPException(404, "Source not found")
    meta = get_source_meta(key)
    return {
        "key": src.key,
        "name": src.name,
        "base_url": src.base_url,
        "status": src.status,
        "layers": [{"id": l.id, "name": l.name, "count": l.count} for l in src.layers],
        "meta": meta,
    }


@app.get("/api/{key}", response_model=FeatureResponse)
async def get_source_features(
    key: str,
    layer: int = Query(0, ge=0),
    limit: int = Query(1000, ge=1, le=10000),
    offset: int = Query(0, ge=0),
    bbox: Optional[str] = Query(None, description="minx,miny,maxx,maxy"),
    simplify: Optional[float] = Query(None, description="Tolérance de simplification Douglas-Peucker en mètres (EPSG:3857)"),
):
    """Récupère les features d'une source/couche (GeoJSON-like)"""
    src = get_source(key)
    if not src:
        raise HTTPException(404, "Source not found")
    if src.status != "ok":
        raise HTTPException(400, f"Source {key} non disponible")

    # Verify layer exists
    layer_ids = [l.id for l in src.layers]
    if layer not in layer_ids:
        raise HTTPException(404, f"Layer {layer} not found for source {key}")

    total = count_features(key, layer)
    features = get_features(key, layer, limit=limit, offset=offset)

    # Convert to GeoJSON-like format
    geojson_features = []
    for f in features:
        props = {k: v for k, v in f.items() if k != "geometry"}
        geom = f.get("geometry")
        geojson_geom = esri_to_geojson_geometry(geom)
        if simplify is not None and geojson_geom:
            geojson_geom = simplify_geometry(geojson_geom, simplify)
        geojson_features.append({
            "type": "Feature",
            "properties": props,
            "geometry": geojson_geom,
        })

    return FeatureResponse(
        features=geojson_features,
        count=total,
        limit=limit,
        offset=offset,
    )


@app.get("/api/{key}/geojson")
async def get_source_geojson(
    key: str,
    layer: int = Query(0, ge=0),
    limit: int = Query(5000, ge=1, le=50000),
    simplify: Optional[float] = Query(None, description="Tolérance de simplification Douglas-Peucker en mètres (EPSG:3857)"),
):
    """Retourne un FeatureCollection GeoJSON complet (attention volume)"""
    src = get_source(key)
    if not src or src.status != "ok":
        raise HTTPException(404, "Source not found or unavailable")

    total = count_features(key, layer)
    features = get_features(key, layer, limit=limit, offset=0)

    geojson_features = []
    for f in features:
        props = {k: v for k, v in f.items() if k != "geometry"}
        geom = f.get("geometry")
        geojson_geom = esri_to_geojson_geometry(geom)
        if simplify is not None and geojson_geom:
            geojson_geom = simplify_geometry(geojson_geom, simplify)
        geojson_features.append({
            "type": "Feature",
            "properties": props,
            "geometry": geojson_geom,
        })

    return {
        "type": "FeatureCollection",
        "name": src.name,
        "source_key": key,
        "layer": layer,
        "total_count": total,
        "returned_count": len(geojson_features),
        "features": geojson_features,
        "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:EPSG::3857"}},
    }


@app.post("/api/refresh", response_model=RefreshResponse)
async def refresh_cache(background_tasks: BackgroundTasks, force: bool = Query(True)):
    """Déclenche une synchronisation complète (en arrière-plan)"""
    # Run sync in background
    async def run_sync():
        return await sync_all(force=force)

    # For immediate feedback, run sync now and return results
    # (Alternative: use background_tasks for very large syncs)
    results = await run_sync()

    return RefreshResponse(
        message=f"Synchronisation terminée pour {len(results)} sources",
        results=results,
    )


@app.get("/api/stats")
async def stats():
    """Statistiques globales du cache"""
    all_meta = get_all_sources_meta()
    total_features = sum(m.get("last_count", 0) for m in all_meta)
    sources_ok = sum(1 for m in all_meta if m.get("status") == "ok")
    return {
        "total_features": total_features,
        "sources_total": len(all_meta),
        "sources_ok": sources_ok,
        "sources_detail": all_meta,
    }


# =============================================================================
# Catalogue API (Intake-lite style) — pour le front "Données disponibles"
# =============================================================================

def _build_catalog_entry(source_key: str, layer_id: int, src_config, meta: Optional[Dict]) -> Dict:
    """Construit une entrée catalogue (Intake-lite) depuis config + meta sync."""
    layer_meta = (meta.get("layer_meta") or {}).get(str(layer_id)) if meta else None
    layer_counts = (meta.get("layer_counts") or {}).get(str(layer_id), 0) if meta else 0
    last_sync = meta.get("last_sync") if meta else None
    catalog_version = meta.get("catalog_version", 0) if meta else 0

    # Fallback to config if no sync meta
    cfg_layer = next((l for l in src_config.layers if l.id == layer_id), None)
    name = (layer_meta or {}).get("name", cfg_layer.name if cfg_layer else f"Layer {layer_id}")
    description = (layer_meta or {}).get("description", src_config.name)
    geometry_type = (layer_meta or {}).get("geometryType")
    extent = (layer_meta or {}).get("extent")
    spatial_ref = (layer_meta or {}).get("spatialReference", {})
    fields = (layer_meta or {}).get("fields", [])
    copyright_text = (layer_meta or {}).get("copyrightText", "")
    service_url = (layer_meta or {}).get("service_url", f"{src_config.base_url}/{layer_id}")
    driver = (layer_meta or {}).get("driver", "arcgis_featureserver")
    tags = (layer_meta or {}).get("tags", ["referentiel", source_key])
    provenance = (layer_meta or {}).get("provenance", "sync_python")

    entry_id = f"{source_key}/{layer_id}"
    return {
        "name": entry_id,
        "title": name,
        "description": description,
        "driver": driver,
        "args": {"url": service_url, "layer": layer_id},
        "metadata": {
            "geometryType": geometry_type,
            "bbox": extent,
            "crs": spatial_ref.get("wkid", 3857) if spatial_ref else 3857,
            "fields": fields,
            "count": layer_counts,
            "lastSync": last_sync,
            "provenance": provenance,
            "copyrightText": copyright_text,
        },
        "tags": tags,
        "links": [
            {"rel": "self", "href": f"/api/catalog/entries/{entry_id}"},
            {"rel": "data", "href": f"/api/{source_key}?layer={layer_id}&limit=10000"},
            {"rel": "service", "href": service_url},
            {"rel": "geojson", "href": f"/api/{source_key}/geojson?layer={layer_id}"},
        ],
        "version": catalog_version,
    }


@app.get("/api/catalog/entries")
async def list_catalog_entries(
    collection: Optional[str] = Query(None, description="Filtrer par collection: referentiels|indicateurs|tous"),
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200),
):
    """Liste paginée des entrées du catalogue (Intake-lite)."""
    status = get_sync_status()
    all_entries = []

    for src_status in status:
        src_key = src_status["key"]
        src_config = get_source(src_key)
        if not src_config or src_config.status != "ok":
            continue
        meta = src_status  # already has layer_meta, layer_counts, catalog_version
        for layer in src_config.layers:
            # Filtre collection: pour l'instant tout est dans "referentiels"
            if collection and collection != "tous" and collection != "referentiels":
                continue
            entry = _build_catalog_entry(src_key, layer.id, src_config, meta)
            all_entries.append(entry)

    total = len(all_entries)
    start = (page - 1) * page_size
    end = start + page_size
    return {
        "entries": all_entries[start:end],
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": (total + page_size - 1) // page_size,
    }


@app.get("/api/catalog/entries/{entry_id:path}")
async def get_catalog_entry(entry_id: str):
    """Détail complet d'une entrée du catalogue."""
    try:
        source_key, layer_id_str = entry_id.split("/", 1)
        layer_id = int(layer_id_str)
    except ValueError:
        raise HTTPException(400, "entry_id doit être au format 'source/layer' (ex: captages/0)")

    src_config = get_source(source_key)
    if not src_config:
        raise HTTPException(404, f"Source {source_key} non trouvée")

    meta = get_source_meta(source_key)
    entry = _build_catalog_entry(source_key, layer_id, src_config, meta)

    # Enrichir avec infos complètes si dispo
    layer_meta = (meta.get("layer_meta") or {}).get(str(layer_id)) if meta else {}
    if layer_meta:
        entry["metadata"]["full_layer_info"] = layer_meta

    return entry


@app.get("/api/catalog/collections")
async def list_catalog_collections():
    """Groupes logiques d'entrées (collections)."""
    return {
        "collections": [
            {
                "id": "referentiels",
                "title": "Référentiels géographiques",
                "description": "Socle géographique : bassins versants, captages, limites administratives, hydrographie",
                "entryIds": ["captages/0", "captages/1", "bassins/0", "bassins/1", "bassins/2", "communes/0"],
            },
            {
                "id": "hydrometrie",
                "title": "Hydrométrie",
                "description": "Stations limnimétriques et suivis hydrauliques",
                "entryIds": ["hydrometrie/0"],
            },
            {
                "id": "modelisation",
                "title": "Modélisation & Bilans",
                "description": "BBR (Bilan Besoin Ressource), RHM (Réseau Hydrographique Maillé)",
                "entryIds": ["bbr/0", "rhm/1", "rhm/2", "rhm/3", "rhm/4"],
            },
        ]
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.host, port=settings.port)
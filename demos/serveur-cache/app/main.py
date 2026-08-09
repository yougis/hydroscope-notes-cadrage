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
        geojson_features.append({
            "type": "Feature",
            "properties": props,
            "geometry": esri_to_geojson_geometry(geom),
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
        geojson_features.append({
            "type": "Feature",
            "properties": props,
            "geometry": esri_to_geojson_geometry(geom),
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


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.host, port=settings.port)
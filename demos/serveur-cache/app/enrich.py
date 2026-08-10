import json
from typing import Dict, List, Optional, Any
from shapely.geometry import shape, Point, Polygon, MultiPolygon
from shapely.prepared import prep

from app.db import get_features, get_conn, ensure_enrichment_columns


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


def simplify_geometry(geojson_geom: Dict[str, Any], tolerance: float) -> Dict[str, Any]:
    """Simplifie une géométrie GeoJSON avec l'algorithme Douglas-Peucker (shapely).
    
    Args:
        geojson_geom: Géométrie GeoJSON (Point, Polygon, MultiPolygon, etc.)
        tolerance: Tolérance en mètres (EPSG:3857 / Web Mercator)
    
    Returns:
        Géométrie GeoJSON simplifiée
    """
    if not geojson_geom or geojson_geom.get("type") == "Point":
        return geojson_geom
    
    try:
        geom = shape(geojson_geom)
        simplified = geom.simplify(tolerance, preserve_topology=False)
        return json.loads(json.dumps(simplified.__geo_interface__))
    except Exception:
        # En cas d'erreur, retourner la géométrie originale
        return geojson_geom


def _build_polygon_index(features: List[Dict]) -> Dict[str, Any]:
    """Construit un index spatial (prepared geometries) pour recherche point-in-polygon rapide.
    Les features de get_features sont plates (propriétés au niveau racine).
    La géométrie est au format ESRI (avec 'rings'), on la convertit en GeoJSON pour shapely."""
    index = {}
    for f in features:
        # f est un dict plat avec geometry et propriétés au même niveau
        geom_esri = f.get("geometry")
        if not geom_esri:
            continue
        try:
            # Convertir ESRI -> GeoJSON pour shapely
            geom_geojson = esri_to_geojson_geometry(geom_esri)
            if not geom_geojson:
                continue
            shapely_geom = shape(geom_geojson)
            if shapely_geom.is_empty:
                continue
            prepared = prep(shapely_geom)
            # Utiliser objectid comme clé
            key = str(f.get("objectid") or f.get("code_rh") or f.get("nom") or f.get("code_com"))
            if key:
                index[key] = {
                    "prepared": prepared,
                    "properties": f,  # passer le feature plat complet
                    "geometry": shapely_geom,
                }
        except Exception:
            continue
    return index


def _point_in_polygon_index(point: Point, index: Dict[str, Any]) -> Optional[Dict]:
    """Trouve le premier polygone contenant le point via l'index préparé."""
    for key, entry in index.items():
        if entry["prepared"].contains(point):
            return {"key": key, "properties": entry["properties"]}
    return None


def enrich_captages() -> int:
    """Enrichit les captages avec leur commune et bassin d'appartenance.
    
    - Bassin : jointure par regi_hydro_prel == nom du bassin (string, 100% fiable)
    - Commune : point-in-polygon shapely (une seule fois au sync)
    
    Returns:
        Nombre de captages enrichis
    """
    # S'assurer que les colonnes d'enrichissement existent
    ensure_enrichment_columns("captages", 0)
    
    # 1. Charger captages (layer 0 = Captages AEP) - features plates
    captages = get_features("captages", 0, limit=10000)
    if not captages:
        return 0
    
    # 2. Charger bassins (layer 0 = Régions hydrographiques)
    bassins = get_features("bassins", 0, limit=10000)
    
    # 3. Charger communes (layer 0 = Communes/Provinces)
    communes = get_features("communes", 0, limit=10000)
    
    # 4. Construire index bassins par nom (features plates)
    bassin_by_name = {}
    for b in bassins:
        nom = b.get("nom")
        if nom:
            bassin_by_name[nom] = {
                "objectid": b.get("objectid"),
                "code_rh": b.get("code_rh"),
                "nom": nom,
            }
    
    # 5. Construire index spatial communes
    commune_index = _build_polygon_index(communes)
    
    # 6. Enrichir chaque captage
    updated = 0
    conn = get_conn()
    try:
        for c in captages:
            # c est un dict plat
            geom = c.get("geometry")
            if not geom:
                continue
            
            objectid = c.get("objectid")
            if not objectid:
                continue
            
            # Attributs à mettre à jour
            updates = {}
            
            # Bassin par jointure string regi_hydro_prel
            regi_hydro = str(c.get("regi_hydro_prel", "")).strip()
            if regi_hydro and regi_hydro in bassin_by_name:
                b = bassin_by_name[regi_hydro]
                updates["id_bassin"] = b["objectid"]
                updates["code_bassin"] = b["code_rh"]
                updates["nom_bassin"] = b["nom"]
            
            # Commune par point-in-polygon
            try:
                # Convertir géométrie captage ESRI -> GeoJSON
                geom_geojson = esri_to_geojson_geometry(geom)
                if geom_geojson and geom_geojson.get("coordinates"):
                    point = Point(geom_geojson["coordinates"])
                    match = _point_in_polygon_index(point, commune_index)
                    if match:
                        cp = match["properties"]
                        updates["id_commune"] = cp.get("objectid")
                        updates["code_commune"] = cp.get("code_com")
                        updates["commune"] = cp.get("nom_minus") or cp.get("nom")
            except Exception:
                pass
            
            # Appliquer les mises à jour en base
            if updates:
                set_clause = ", ".join([f'"{k}" = ?' for k in updates.keys()])
                values = list(updates.values()) + [objectid]
                conn.execute(
                    f'UPDATE "features_captages_layer0" SET {set_clause} WHERE objectid = ?',
                    values,
                )
                updated += 1
        
        conn.commit()
    finally:
        conn.close()
    
    return updated


if __name__ == "__main__":
    # Test manuel
    print("Enrichissement des captages...")
    count = enrich_captages()
    print(f"{count} captages enrichis")
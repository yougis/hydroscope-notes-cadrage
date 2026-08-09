# HydroScope Serveur Cache

API de cache pour les référentiels eau de Nouvelle-Calédonie.
Synchronise les services ArcGIS publics (Géorep + carto.gouv.nc) vers SQLite et expose une API REST.

## Sources synchronisées

| Clé | Service | Couches |
|---|---|---|
| `captages` | Captages d'eau AEP (services1.arcgis.com) | L0: 540 AEP, L1: 1659 privés |
| `bassins` | Références hydrographiques | L0: 104 régions, L1: 7 HER, L2: 336 IFH |
| `communes` | Limites administratives terrestres | L0: communes/provinces |
| `hydrometrie` | Stations limnimétriques | L0: 590 |
| `bbr` | Bilan Besoin Ressource (carto.gouv.nc) | L0: 5327 BV |
| `rhm` | Réseau hydrographique maillé | L1: 1526 (5km²), L2: 8390 (1km²), L3: 41921 (0,2km²) |
| `dass` | Unités distribution DASS | *non disponible* |

## Démarrage

```bash
cd demos/serveur-cache
docker compose up --build -d
```

L'API sera disponible sur `http://localhost:8081`.

## Endpoints principaux

| Endpoint | Description |
|---|---|
| `GET /health` | Health check |
| `GET /api/sources` | Liste des sources + état sync |
| `GET /api/sources/{key}` | Détail d'une source |
| `GET /api/{key}?layer=0&limit=100&offset=0` | Features paginées (GeoJSON-like) |
| `GET /api/{key}/geojson?layer=0&limit=5000` | FeatureCollection GeoJSON |
| `POST /api/refresh?force=true` | Déclenche resync complète |
| `GET /api/stats` | Stats globales |

## Exemples

```bash
# État des sources
curl http://localhost:8081/api/sources | jq

# 10 premiers captages AEP
curl "http://localhost:8081/api/captages?layer=0&limit=10" | jq

# BBR - 5 premiers bassins
curl "http://localhost:8081/api/bbr?layer=0&limit=5" | jq

# RHM seuil 5km²
curl "http://localhost:8081/api/rhm?layer=1&limit=5" | jq

# Forcer resync
curl -X POST "http://localhost:8081/api/refresh?force=true" | jq
```

## Variables d'environnement

| Variable | Défaut | Description |
|---|---|---|
| `TTL_HOURS` | 24 | Durée de validité du cache avant resync auto |
| `DATA_DIR` | /app/data | Dossier persistant SQLite |
| `HOST` | 0.0.0.0 | Interface d'écoute |
| `PORT` | 8081 | Port d'écoute |

## Architecture

```
┌─────────────────┐     ┌──────────────────┐
│  ArcGIS Public  │────▶│  sync.py         │
│  (2 serveurs)   │     │  (pagination)    │
└─────────────────┘     └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │  SQLite (cache)  │
                        │  features_* tables│
                        └────────┬─────────┘
                                 │
                                 ▼
                        ┌──────────────────┐
                        │  FastAPI (main)  │
                        │  /api/*          │
                        └──────────────────┘
```

## Intégration figma-design

Ajouter dans `vite.config.ts` :
```ts
server: {
  proxy: {
    '/api': { target: 'http://localhost:8081', changeOrigin: true },
  }
}
```
Puis consommer `/api/captages`, `/api/bassins`, `/api/bbr`, `/api/hydrometrie`, `/api/rhm` depuis l'écran Référentiels (Mode avancé).
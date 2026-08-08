# HydroScope — Démo « Google Earth Engine · Dynamic World »

Démonstration de l'évolution de l'**occupation du sol** sur la **côte ouest de la Nouvelle-Calédonie**
(bassins des Périmètres de Protection des Eaux), à partir des données **Google Dynamic World**
(`GOOGLE/DYNAMICWORLD_V1`).

L'outil est pensé pour un public **non technique** (partenaires de l'OEIL, DAVAR, DASS) : interface
simple en français, sobre, avec trois modes de visualisation commutables.

## Modes de visualisation

| Onglet | Description |
|---|---|
| **Comparer** | Deux cartes satellites côte à côte (dates A et B), synchronisées en zoom / déplacement. |
| **Swipe** | Une carte avec diviseur vertical déplaçable à la souris pour comparer deux dates en un coup d'œil. |
| **Animation** | Une carte + un curseur temporel (frames trimestrielles 2016 → 2026) et une lecture automatique. |

## Démarrage rapide

```bash
npm install
cp .env.example .env
npm start
```

Puis ouvrir **http://localhost:8080**.

Par défaut aucun identifiant n'est requis : le serveur démarre en **mode simulation (mock)**,
qui génère localement des tuiles synthétiques pour illustrer l'interface.

## Utilisation avec les données réelles

1. Donner à l'identité utilisée (compte Google Cloud ou compte de service) l'accès à l'API
   **Earth Engine** (inscription au programme non commercial Google Earth Engine requise).
2. Renseigner `EE_PROJECT` dans `.env` (identifiant du projet Earth Engine/Cloud) :

   ```dotenv
   EE_MODE=gee
   EE_PROJECT=mon-projet-gee
   ```

3. Disposer d'**Application Default Credentials (ADC)** — résolues automatiquement par
   `google-auth-library` : environnement GCP (métadonnées), `gcloud auth application-default login`…
   Aucun fichier de clé n'est stocké dans ce projet.
4. Redémarrer : `npm start`. Le serveur s'authentifie via l'ADC, filtre
   `GOOGLE/DYNAMICWORLD_V1` sur la zone d'intérêt et la période demandée, calcule le
   mode dominant (`ee.Reducer.mode()`) et sert de vraies tuiles raster.

Si l'authentification échoue (ADC absente ou invalide, réseau…), le serveur **bascule
automatiquement en mode simulation** avec un avertissement dans les logs.

## Architecture

```
Navigateur (page statique + Leaflet 1.9.4, aucun build)
   │  /api/meta, /api/frames, /api/coverage
   ▼
server.js (Express 5)
   ├── mode mock : génère les tuiles PNG synthétiques via /mock/{z}/{x}/{y}.png
   └── mode gee  : appel Earth Engine (ee.data.getMapId) → proxy de tuiles
```

- Le serveur sert la page et agit comme **proxy de tuiles** (ni CORS apparent, ni clé exposée côté client).
- Les requêtes `GET /api/coverage?start=YYYY-MM-DD&end=YYYY-MM-DD` renvoient `{ mapid, token, urlFormat }`.
  En mode `gee`, `urlFormat` est une URL GEE absolue ; en mode `mock`, une URL relative servée localement.
- Les résultats `gee` sont **mis en cache** par (période) pour éviter de re-caluler.
- `GET /api/meta` fournit le mode actif et la palette officielle Dynamic World (9 classes).
- `GET /api/frames` fournit les dates trimestrielles du 1er du mois (mars 2016 → septembre 2026).

## Limites connues

- **Mode simulation** : les tuiles affichées sont **synthétiques** (bits hachés, pas de données réelles).
- **Mode réel** : le rendu Earth Engine est configuré pour être rapide (projetion EPSG:3857,
  échelle ~100 m) ; aux forts zooms l'image peut paraître nette mais les tuiles sont passées
  par l'API ; chaque période affichée par défaut recouvre la période ± 45 jours.
- **Dates hors plage** : avant le mois de juin 2015 ou dans le futur, le serveur répond en HTTP 400.
- **Sécurité** : aucun identifiant n'est stocké dans le projet ; l'authentification repose sur
  les Application Default Credentials de l'environnement d'exécution.
- Leaflet est chargé depuis le CDN unpkg : une connexion Internet est nécessaire pour afficher les cartes.
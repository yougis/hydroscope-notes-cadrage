# 1.3 — Ordonnançabilité MVP (règle MVP←MVP) et sens Backend→Front

Change `eval-fiabilite-cdc-backlog`, tâche 1.3. Contrôles scriptés read-only.
`MVP` lu comme chaîne (`True`/`False`), `Front_or_Back` tel que saisi.

## MVP dépendant de hors-MVP : 5 cas, tous reproduits

| US MVP | Parent hors MVP | Correction typée proposée |
|--------|----------------|---------------------------|
| US1bis.1 | US1.2 (`False`) | monter US1.2 en MVP, ou couper la dépendance, ou sortir US1bis.1 du MVP |
| US1bis.4 | US1bis.6 (`False`) | idem (ou Lot 2 explicite pour le couple) |
| US2.5 | US2.2 (`False`) | idem |
| US2.5 | US2.3 (`False`) | idem |
| US2.5 | US2.7 (`False`) | idem |

Verdict : MVP **non ordonnançable en l'état** (BLOQUANT, registre 2.1).
Note : US7.5 (`Prioriser territoires`, dép. `US5.1 ; US5.2`) est déjà
`MVP=False` sur les sources figées — pas de violation MVP, dépendance AMC
documentée comme lot/option à expliciter (cf. 2.2).

## Inversions Backend ← Front : 13 paires (valeurs brutes)

Sens attendu : le Front consomme le Back (dépendances Front ← Backend
normales) ; l'inverse est une inversion de sens.

| US Backend | Parent Front |
|------------|-------------|
| US1.3 | US1.1 |
| US1.4 | US1.1 |
| US1.6 | US1.1 |
| US1bis.10 | US1.1, US1bis.1 |
| US2.5 | US2.7 |
| US4.1 | US3.5, US1bis.12 |
| US4.2 | US3.1 |
| **US4.3** | **US6.24** |
| US6.18 | US3.1, US3.2 |
| US9.6 | US9.2 |

Cas emblématique (BLOQUANT) : `US4.3` (Backend, agrégation temporelle)
dépend de `US6.24` (Front-end, bascule de vues graphiques) — un calcul
ne peut pas dépendre d'une bascule de vue.

Réserve d'interprétation (honest reporting) : une partie des 13 cas peut
provenir d'une mauvaise classification Front/Back (ex. US1.1 « Importer via
fichier » classée Front-end alors que l'import est un traitement back) —
à croiser avec 2.2/2.3 avant de conclure au cas par cas. Seul US4.3←US6.24
est inambigü.

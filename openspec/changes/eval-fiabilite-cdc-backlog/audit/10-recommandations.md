# 3.3 — Recommandations actionnables (sans arbitrage supplémentaire)

Change `eval-fiabilite-cdc-backlog`, tâche 3.3. Chaque règle : applicable
directement à `backlog.xlsx`, exemple avant/après, portrait immédiat vs
toilettage continu.

## Règles immédiates (avant chiffrage)

1. **Un seul libellé EPIC 8** : `EPIC 8 – Export` partout (US8.1, US8.2,
   US8.4, US8.6 portent encore `Export & diffusion`).
2. **Bannir effort `0`/vide/`[object Object]`** : toute cellule `0`, vide ou
   non numérique = « non chiffré » ; resaisir les 97 US concernées (seule
   US1.1 = `12` est exploitable) et la colonne MOA (98/99 vides).
3. **Règle MVP←MVP** : aucune US MVP ne dépend d'une US hors MVP —
   pour US1bis.1/US1bis.4/US2.5 : monter le parent, couper la dépendance,
   ou sortir l'US du MVP (cf. 03).
4. **Rôle 3W = colonne Profil** : échanger les PROF US7.2/US7.3 ; préfixer
   US8.2/US8.6 par `En tant qu'expert métier eau potable,` ; aligner les 3W
   US6.21/US8.1/US8.4 sur leur PROF (cf. 07).
5. **Unifier le libellé du profil public** : `Intéressé public` (tableau) vs
   `Public averti` (prose) — choisir un seul libellé partout (cf. E2).
6. **Trancher US7.1** : prose MVP vs tableau `False` — passer US7.1 en MVP
   (avec US7.2 ?) ou corriger la prose (cf. E1).

## Gabarit 3W + acceptation (toilettage continu)

- Toute US P0/P1 : `En tant que <profil = colonne Profil>, Je veux
  <libellé explicite, pas 2 mots>, Afin de <bénéfice métier mesurable>`
  + au moins un ID de scénario `Besoins testables` (ou mention « à tester »).
- Exemple avant/après : `US8.5 / API / administrateur plateforme` →
  `US8.5 / Exposer les indicateurs via API / En tant qu'administrateur
  plateforme, je veux interroger les indicateurs via une API documentée
  afin de les réutiliser dans les outils partenaires`.

## Règles MVP/lots et traçabilité

- MVP = périmètre de référence figé au jalon zéro ; toute US MVP SHALL ne
  dépendre que d'US MVP (sinon lot explicite) ; Lot 2 = US `False` + EPIC 5
  (option chiffrée séparément, cf. M2).
- Traçabilité prose↔tableau : un seul identifiant de section par EPIC
  (réparer `@sec_backlog`, `(#sec-catalogage_donnees)` — cf. branche
  `revue-md-cdc-v1-1`), un seul libellé de profil, et toute affirmation
  MVP de la prose rejouée contre la colonne MVP avant relecture MOA.

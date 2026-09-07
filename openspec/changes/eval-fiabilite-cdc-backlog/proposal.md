## Why

Le cahier des charges HydroScope (v1.1) et `cahier des charges/backlog.xlsx` (99 US, 206 scénarios testables) constituent la base contractuelle du MVP, mais leur fiabilité actuelle ne permet ni un chiffrage sérieux ni un pilotage contractuel serein : incohérences MVP/dépendances, chiffrage inutilisable, granularité éclatée (EPIC 6 = 26 US) et 44 US sans scénario testable. Il faut auditer ce couple CdC/backlog avant réalisation, puis livrer des US ajustées et priorisées par gain fonctionnel.

## What Changes

- Auditer la fiabilité du couple CdC ↔ `backlog.xlsx` (onglets `Backlog` + `Besoins testables`) : complétude, unicité des IDs, parents existants, cycles, cohérence MVP/parent, cohérence EPIC/Module/Type/Pilier/Profil/Front-Back, cohérence prose CdC (`6_perimetre_fonctionnel`, `epics/*.qmd`, `5bis_profils_utilisateurs`, `7_product_backlog`, `7bis_dependances_us`) vs tableau.
- Auditer la simplicité/lisibilité : granularité des US (EPIC 6 sélecteur US6.9–US6.26, EPIC 1bis 15 US catalogue), libellés génériques en 2 mots, phrases agiles copiées-collées, redondances (US3.6 vs EPIC 9, US1.7 vs US4.7, US6.6 vs US6.7 vs EPIC 7).
- Relever erreurs et incohérences bloquantes observées : double libellé `EPIC 8 – Export` / `EPIC 8 – Export & diffusion`, `US6.21` = `[object Object]` en effort prestataire, colonne `Point d'effort estimé MOA` vide à 98/99 et `Point d'effort prestataire` à 54×`0` + 43 NaN, 4 US MVP dépendant d'un parent hors MVP (US1bis.1←US1.2, US1bis.4←US1bis.6, US2.5←US2.2/US2.3/US2.7), boucle `US4.1` ↔ `US4.7`, inversion `US4.3` (Backend) ← `US6.24` (Front), 44/99 US sans scénario testable dont EPIC 5 entier et US7.1/US7.2, inversions de rôles US7.2/US7.3 et phrases tronquées US8.2/US8.6.
- Émettre des recommandations de lisibilité actionnables : règles de nommage EPIC/US, format 3W + critères d'acceptation obligatoires, regroupements proposés (sélecteur EPIC 6, catalogue 1bis, qualité EPIC 2), normalisation MVP/lots, règle de chiffrage (bannir `0`/`[object Object]`/vide).
- Proposer des US ajustées (reformulation/fusion/découpage ciblé, MVP révisé) et une priorisation explicite **P0 gain fonctionnel décisif / P1 utile / P2 lambda à ne pas détailler** au regard des 4 piliers HydroScope et des 5 profils utilisateurs.

## Capabilities

### New Capabilities

- `cdc-backlog-audit`: audit fiabilité + simplicité du couple CdC/backlog, registre d'erreurs et incohérences, recommandations de lisibilité, US ajustées et priorisation P0/P1/P2 par gain fonctionnel.

### Modified Capabilities

- Aucune (pas de comportement système existant modifié ; `openspec/specs/` est vide).

## Impact

- Périmètre strictement documentationnel : aucun code, API, dépendance ou infra touchée pendant la planification.
- Artefacts produits dans `openspec/changes/eval-fiabilite-cdc-backlog/` ; sources lues uniquement : `cahier des charges/*.qmd`, `cahier des charges/epics/*.qmd`, `cahier des charges/specifications/`, `cahier des charges/backlog.xlsx`.
- Effet induit hors change (implémentation ultérieure, non autorisée ici) : correctifs `backlog.xlsx`, resserrage MVP, reformulations CdC proposées en annexe de l'audit.

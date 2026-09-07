## Context

État actuel (voir `proposal.md` — Why) : CdC v1.1 + `cahier des charges/backlog.xlsx` avec 99 US (`Backlog`) et 206 scénarios (`Besoins testables`), `openspec/specs/` vide. Contraintes : planification seule, lecture read-only des sources, audit opposable et rejouable (toute anomalie citée avec preuve), alignement aux 4 piliers HydroScope et aux 5 profils (`5bis_profils_utilisateurs.qmd`), prose générée partiellement depuis le tableau (`7bis_dependances_us.qmd` lit la colonne `Dépend de (Parent)`).

## Goals / Non-Goals

**Goals:**

- Objectiver la fiabilité (graphe de dépendances, ordonnançabilité MVP, chiffrabilité, testabilité) par contrôles rejouables sur les 99 US.
- Rendre la simplicité mesurable (granularité par EPIC, qualité 3W/INVEST, redondances) avec regroupements chiffrés.
- Livrer un registre BLOQUANT/MAJEUR/MINEUR et des US ajustées traçables + priorisation P0/P1/P2 défendable.

**Non-Goals:**

- Ne pas corriger `backlog.xlsx` ni les `.qmd` du CdC dans ce change (planification seule).
- Ne pas réécrire les 99 US ni produire un nouveau chiffrage de charge.
- Ne pas trancher les arbitrages MOA (périmètre MVP final, méthode AMC) : l'audit propose, la MOA dispose.

## Decisions

- **D1 — Double lecture outillée + ciblée.** Contrôles exhaustifs par lecture scriptée read-only des deux onglets (unicité IDs, parents existants, cycles, règle MVP←MVP, vides/`0`/`[object Object]`, couverture 55/99 US testées) + relecture manuelle ciblée de la prose (`epics/*.qmd`, `5bis`, `7`, `7bis`). *Alternative écartée : relecture 100 % manuelle* — non rejouable et aveugle aux 4 incohérences MVP et au cycle `US4.1`↔`US4.7`.
- **D2 — Registre unique avec sévérité ancrée sur l'impact.** BLOQUANT = interdit chiffrage, contractualisation MVP ou recette (ex. EPIC 8 double libellé, efforts inutilisables, MVP←hors-MVP, `US4.3`←`US6.24`, 44 US sans scénario) ; MAJEUR = dégrade lisibilité/pilotage ; MINEUR = toilettage. *Alternative écartée : liste plate sans sévérité* — inexploitable pour ordonner les correctifs avant chiffrage.
- **D3 — Règle MVP stricte + lots explicites.** Toute US MVP SHALL ne dépendre que d'US MVP, sinon correction typée (monter le parent, couper la dépendance, sortir l'US du MVP ou créer un lot). Traite US1bis.1←US1.2, US1bis.4←US1bis.6, US2.5←US2.2/US2.3/US2.7 et la dépendance AMC US7.5←US5.1/US5.2. *Alternative écartée : tolérer les dépendances hors MVP* — MVP non ordonnançable et non contractualisable.
- **D4 — Priorisation P0/P1/P2 par chaîne de valeur, pas MoSCoW générique.** P0 = chaîne minimale import→catalogue→qualité socle→référentiels→calculs→carte/fiches/exports simples→auth/traçabilité ; P1 = robustesse/lot 2 ; P2 = lambda non détaillée avec critère de réactivation. Adossée aux 4 piliers et 5 profils (ex. 14 US publiques anonymes toutes MVP interrogées, EPIC 5 entier hors MVP sans tests). *Alternative écartée : scoring pondéré par US* — illusoire avec des efforts à `0`/vides.
- **D5 — Regrouper sans réécrire.** US pivots conservées + fusions listées (bloc sélecteur US6.9–US6.26, catalogue 1bis, qualité EPIC 2) au lieu d'une réécriture des 99 US. *Alternative écartée : réécriture complète* — bruit, perte de traçabilité contractuelle, hors périmètre d'audit.

## Risks / Trade-offs

- [Risk] Colonne `Dépend de (Parent)` bruitée (séparateurs `;`/`,`, libellés EPIC instables) → faux positifs de graphe → Mitigation : normalisation stricte des IDs `US\d+(\.\d+|bis\.\d+)`, preuve par valeur brute citée, cas douteux en MAJEUR pas BLOQUANT.
- [Risk] Efforts à `0` ambigus (non chiffré vs charge nulle) → Mitigation : règle « `0`/vide/non-numérique = non chiffré », conclusion « chiffrage inutilisable », aucune moyenne.
- [Risk] Maquette IHM EPIC 6 non versée au change → audit du sélecteur fondé sur libellés/phrases uniquement → Mitigation : le signaler en limite, regroupements proposés comme hypothèses à valider sur maquette.
- [Risk] Backlog évolutif v1.1 → dérive entre l'audit et une version ultérieure → Mitigation : figer les versions/dates sources dans l'audit (compteurs 99/206 rappelés).
- Trade-off assumé : exhaustivité des contrôles automatiques vs finesse d'interprétation métier — tranché en faveur de contrôles rejouables + échantillons métier (US7.x, US8.x, US3.6, US6.21).

## Migration Plan

Aucune migration technique (pas de code). À l'apply (hors de ce workflow) : appliquer le registre au `backlog.xlsx` (unifier EPIC 8, resaisir efforts, corriger MVP/dépendances US1bis/US2/US4/US7, compléter phrases US7.2/US7.3/US8.2/US8.6), geler une version auditée, puis re-générer `7bis_dependances_us` et le graphe. Rollback = conserver la version pré-audit du fichier.

## Open Questions

- Arbitrage final du noyau P0 resserré et du sort des P2 (suppression vs maintien en lot 2) : relève de la MOA à la relecture de l'audit, ne change ni la méthode ni le découpage des tâches.
- Seuil de complétude cible (~80 % évoqué en EPIC 7) et méthode AMC définitive : points ouverts MOA/conseil scientifique déjà signalés en prose, repris tels quels sans les trancher.

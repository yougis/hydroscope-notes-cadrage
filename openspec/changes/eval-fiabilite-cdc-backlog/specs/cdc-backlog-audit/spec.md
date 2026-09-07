## Purpose

Fournir un audit opposable du couple cahier des charges HydroScope / backlog.xlsx : fiabilité contractuelle, simplicité de lecture, registre d'erreurs et US ajustées priorisées par gain fonctionnel.

## ADDED Requirements

### Requirement: Couverture d'audit croisé CdC ↔ backlog

L'audit SHALL couvrir les deux onglets `Backlog` (99 US) et `Besoins testables` (206 scénarios) de `cahier des charges/backlog.xlsx` ainsi que la prose du CdC v1.1 (`7_product_backlog.qmd`, `7bis_dependances_us.qmd`, `6_perimetre_fonctionnel.qmd`, `epics/*.qmd`, `5bis_profils_utilisateurs.qmd`, `5_presentation_indicateurs.qmd`), et SHALL signaler explicitement toute source annoncée mais introuvable ou illisible.

#### Scenario: Couverture complète attestée

- **WHEN** l'audit est livré
- **THEN** il liste les sources effectivement analysées avec leur version/date, le nombre d'US et de scénarios lus, et toute source manquante est déclarée comme limite et non comme hypothèse silencieuse

#### Scenario: Écart prose-tableau détecté

- **WHEN** une affirmation de la prose contredit le tableau (ex. EPIC 5 « option hors MVP » vs dépendance US7.5 ← US5.1/US5.2, profil Public « lecture seule stricte sans export/partage » vs 14 US publiques toutes MVP, EPIC 7 « MVP = US7.1 + US7.3 » vs US7.3 sans parent mais US7.4/US7.2 non testés)
- **THEN** l'écart est consigné au registre avec les deux références (fichier + US concernées)

### Requirement: Registre d'erreurs et incohérences avec sévérité

L'audit SHALL produire un registre unique où chaque entrée comporte l'identifiant US/EPIC, la nature de l'anomalie, la preuve (valeur lue) et une sévérité BLOQUANT / MAJEUR / MINEUR ; les BLOQUANT SHALL correspondre à ce qui interdit chiffrage, contractualisation MVP ou test de recette.

#### Scenario: Anomalies bloquantes relevées

- **WHEN** le registre est contrôlé
- **THEN** il contient au minimum : double libellé `EPIC 8 – Export` / `EPIC 8 – Export & diffusion`, `US6.21` avec effort `[object Object]`, colonne `Point d'effort estimé MOA` vide à 98/99 et `Point d'effort prestataire` à 54×`0` + 43 NaN, 4 US MVP dépendant d'un parent hors MVP (US1bis.1←US1.2, US1bis.4←US1bis.6, US2.5←US2.2/US2.3/US2.7), boucle `US4.1` ↔ `US4.7`, inversion `US4.3` (Backend) ← `US6.24` (Front), et 44/99 US sans scénario testable

#### Scenario: Sévérité vérifiable

- **WHEN** une entrée est classée BLOQUANT
- **THEN** sa justification cite l'impact concret (ex. « MVP non ordonnançable », « charge non chiffrable », « recette non testable ») et non un jugement générique

### Requirement: Grille de fiabilité contractuelle

L'audit SHALL noter la fiabilité sur quatre axes testables : unicité et stabilité des IDs, validité du graphe de dépendances (parents existants, absence de cycle, sens Backend→Front respecté), ordonnançabilité du MVP (aucune US MVP ne dépend d'une US hors MVP sans lot explicite), et chiffrabilité/testabilité (effort renseigné et non nul par défaut, chaque US P0/P1 adossée à au moins un scénario `Besoins testables` ou marquée « à tester »).

#### Scenario: MVP non ordonnançable détecté

- **WHEN** une US MVP dépend d'un parent hors MVP sans règle de lot
- **THEN** l'audit la signale comme BLOQUANT avec la correction proposée (basculer le parent en MVP, retirer la dépendance, ou sortir l'US du MVP)

#### Scenario: Chiffrage déclaré inutilisable

- **WHEN** les colonnes d'effort contiennent des `0` systématiques, des vides massifs ou des valeurs non numériques
- **THEN** l'audit conclut « chiffrage inutilisable en l'état » et impose une règle de resaisie au lieu de moyenner les valeurs existantes

### Requirement: Grille de simplicité et lisibilité

L'audit SHALL évaluer la simplicité sur la granularité (taille et homogénéité des US par EPIC), la qualité rédactionnelle 3W/INVEST (rôle explicite, bénéfice métier, petite taille, testabilité), et les redondances (doublons fonctionnels, frontières EPIC floues) ; il SHALL proposer des regroupements sans réécrire le CdC lui-même.

#### Scenario: Granularité éclatée signalée

- **WHEN** un EPIC concentre des micro-US redondantes (ex. EPIC 6 avec 26 US dont le bloc sélecteur US6.9–US6.26, EPIC 1bis avec 15 US catalogue, libellés en 2 mots type `API` / `Export CSV`, phrases agiles génériques)
- **THEN** l'audit propose un regroupement chiffré (US pivots conservées, US fusionnées listées) avec le gain de lisibilité attendu

#### Scenario: Redondance de périmètre relevée

- **WHEN** deux US/EPIC se recouvrent (ex. US3.6 « Gérer les profils » dans EPIC 3 Référentiels vs EPIC 9 Utilisateurs, US1.7 « Rejouer un traitement » vs US4.7 « Recalculer », US6.6/US6.7 vs EPIC 7)
- **THEN** l'audit désigne l'US de référence et la ou les US à fusionner ou déprécier, avec motif fonctionnel

### Requirement: Recommandations de lisibilité actionnables

Chaque recommandation SHALL être actionnable par la MOA/MOE (règle de nommage, gabarit d'US, règle MVP/lots, règle d'effort, règle de traçabilité prose↔tableau), SHALL citer les US exemples avant/après, et SHALL distinguer ce qui relève d'une correction immédiate avant chiffrage de ce qui relève d'un toilettage continu.

#### Scenario: Recommandation applicable sans interprétation

- **WHEN** la MOA lit une recommandation (ex. « un seul libellé EPIC 8 », « bannir effort `0`/vide/`[object Object]` », « toute US P0/P1 a un ID de scénario », « phrase agile avec rôle = colonne Profil » pour US7.2/US7.3 et phrases complètes pour US8.2/US8.6)
- **THEN** elle peut l'appliquer à `backlog.xlsx` sans arbitrage méthodologique supplémentaire

### Requirement: US ajustées avec MVP révisé

L'audit SHALL livrer une liste d'US ajustées limitée aux changements nécessaires (reformulation, fusion, découpage, reclassement MVP/lot, dépendance corrigée), chaque ajustement SHALL tracer l'US d'origine, le motif (erreur, simplification, testabilité) et l'effet sur le MVP ; l'audit SHALL NOT réécrire les 99 US.

#### Scenario: Traçabilité des ajustements

- **WHEN** une US ajustée est lue (ex. fusion du bloc sélecteur EPIC 6, reclassement US1.2/US1bis.6/US2.2/US2.3/US2.7 requis par des US MVP, correction US4.3/US4.1/US4.7, clarification US3.6, US6.21, US7.x, US8.x)
- **THEN** son ID d'origine, sa nouvelle formulation 3W, son statut MVP révisé et ses dépendances corrigées sont visibles sans ouvrir le fichier source

### Requirement: Priorisation P0/P1/P2 par gain fonctionnel

L'audit SHALL classer chaque US ou groupe fusionné en P0 (gain fonctionnel décisif pour le diagnostic BVAEP et la mise en service : socle données-catalogue-calcul-restitution-traçabilité minimale), P1 (utile en lot 2 : robustesse, confort, gouvernance avancée) ou P2 (lambda : faible gain direct, à ne pas détailler en US tant que P0/P1 ne sont pas stabilisés), en justifiant le rang par les 4 piliers HydroScope et les 5 profils utilisateurs ; les P2 SHALL rester recensées mais non détaillées (pas de nouveaux scénarios exigés).

#### Scenario: Noyau P0 resserré et défendable

- **WHEN** la priorisation est contrôlée
- **THEN** le noyau P0 couvre la chaîne minimale import → catalogue → qualité socle → référentiels BV/captages/indicateurs → calculs simples et agrégations → carte + fiches territoire + exports simples + auth/rôles + traçabilité imports/calculs, tandis que l'AMC complète (EPIC 5), la priorisation liée à l'AMC (US7.5), les gadgets de sélecteur et les US de gouvernance avancée sont en P1/P2 avec motif explicite

#### Scenario: P2 explicitement non détaillée

- **WHEN** une US est classée P2 (ex. variantes fines de visualisation, métadonnées avancées non bloquantes, audit d'usages détaillé)
- **THEN** l'audit indique « à ne pas détailler » avec le critère de réactivation (seuil d'usage, lot 2 validé) au lieu de produire une US réécrite complète

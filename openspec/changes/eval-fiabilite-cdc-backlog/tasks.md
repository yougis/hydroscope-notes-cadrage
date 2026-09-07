## 1. Socle et contrôles rejouables

- [x] 1.1 Figer les sources auditées (versions/dates de `backlog.xlsx`, CdC v1.1, compteurs 99 US / 206 scénarios) et vérifier que la liste des sources lues est complète et sans hypothèse silencieuse
- [x] 1.2 Contrôler unicité et format des IDs US plus existence des parents et cycles (dont boucle `US4.1` ↔ `US4.7`) et vérifier que chaque anomalie cite la valeur brute lue
- [x] 1.3 Contrôler l'ordonnançabilité MVP (règle MVP←MVP : US1bis.1←US1.2, US1bis.4←US1bis.6, US2.5←US2.2/US2.3/US2.7, US7.5←EPIC 5, inversion `US4.3`←`US6.24`) et vérifier que chaque cas a une correction typée proposée
- [x] 1.4 Contrôler chiffrabilité et testabilité (efforts `0`/vides/`[object Object]` US6.21, MOA 98/99 vide, 44/99 US sans scénario dont EPIC 5 et US7.1/US7.2) et vérifier la conclusion « chiffrage inutilisable » avec règle de resaisie

## 2. Registre fiabilité et cohérence CdC

- [x] 2.1 Constituer le registre unique BLOQUANT/MAJEUR/MINEUR avec preuve par US/EPIC (dont double libellé EPIC 8) et vérifier que tout BLOQUANT cite son impact chiffrage/MVP/recette
- [x] 2.2 Vérifier la cohérence prose ↔ tableau (`epics/*.qmd`, `5bis_profils`, `7`, `7bis` vs tableau : EPIC 5 option, 14 US publiques anonymes toutes MVP, EPIC 7 MVP US7.1+US7.3, US3.6 vs EPIC 9) et vérifier que chaque écart a double référence fichier + US
- [x] 2.3 Vérifier rôles et phrases agiles (inversions US7.2/US7.3, phrases tronquées US8.2/US8.6, 4 mismatches profil/phrase) et vérifier que chaque correction propose rôle et formulation cibles

## 3. Simplicité, lisibilité et recommandations

- [x] 3.1 Analyser la granularité (EPIC 6 = 26 US dont bloc sélecteur US6.9–US6.26, 1bis = 15 US, libellés en 2 mots, phrases génériques) et vérifier que chaque regroupement liste pivots conservés, US fusionnées et gain attendu
- [x] 3.2 Relever redondances et frontières floues (US3.6 vs EPIC 9, US1.7 vs US4.7, US6.6/US6.7 vs EPIC 7, US1.6 Gouvernance) et vérifier que chaque cas désigne l'US de référence et le sort proposé
- [x] 3.3 Rédiger les recommandations actionnables (nommage EPIC/US, gabarit 3W + acceptation, règle MVP/lots, règle d'effort, traçabilité prose↔tableau) avec exemples avant/après et vérifier leur applicabilité directe à `backlog.xlsx` sans arbitrage supplémentaire

## 4. US ajustées et priorisation par gain

- [x] 4.1 Produire les US ajustées traçables (reformulation/fusion/MVP et dépendances corrigées, sans réécrire les 99 US) et vérifier que chacune trace origine, motif et effet MVP
- [x] 4.2 Classer en P0/P1/P2 par chaîne de valeur et 4 piliers / 5 profils (P0 = import→catalogue→qualité socle→référentiels→calculs→carte/fiches/exports simples→auth/traçabilité ; EPIC 5 et US7.5 en P1/P2 motivés) et vérifier que le noyau P0 est défendable et chaque P2 porte « à ne pas détailler » + critère de réactivation

## 5. Consolidation et validation

- [x] 5.1 Relire l'ensemble (registre, recommandations, US ajustées, P0/P1/P2) contre `specs/cdc-backlog-audit/spec.md` et vérifier chaque requirement et scénario couvert
- [x] 5.2 Exécuter `openspec validate --change eval-fiabilite-cdc-backlog` (et `--strict` si disponible) et vérifier zéro erreur bloquante avant revue MOA

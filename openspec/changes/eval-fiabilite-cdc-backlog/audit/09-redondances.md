# 3.2 — Redondances et frontières floues

Change `eval-fiabilite-cdc-backlog`, tâche 3.2. Chaque cas : US de référence
+ sort proposé + motif fonctionnel (valeurs brutes citées).

## R1 — US3.6 vs EPIC 9 (recouvrement avéré)

- `US3.6` (`Gérer les profils utilisateurs`, EPIC 3 Référentiels, hors MVP,
  admin plateforme : « gérer les profils utilisateurs et leurs droits »).
- Référence : EPIC 9 (`US9.3` Rôles simples MVP + `US9.4` Restreindre accès fin).
- Sort : déprécier US3.6 au profit d'US9.3/US9.4 (ou la déplacer en EPIC 9).
  Motif : les droits relèvent de la gestion des utilisateurs, pas des
  référentiels géographiques/méthodologiques.

## R2 — US1.7 vs US4.7 (recouvrement partiel)

- `US1.7` (`Rejouer un traitement`, EPIC 1 : « recalculer un jeu de données
  après correction ») vs `US4.7` (`Recalculer un indicateur`, EPIC 4 :
  « mettre à jour les valeurs après correction »).
- Référence : US4.7 pour le recalcul d'indicateurs.
- Sort : fusionner en une US « rejouer / recalculer » rattachée EPIC 4,
  le rejeu ETL générique en critère d'acceptation — ou conserver les deux
  avec frontière explicite (traitement générique vs indicateur).

## R3 — US6.6/US6.7 vs EPIC 7 (frontière à sanctuariser, pas de doublon)

- `US6.6` (TDB avancé, décideur) et `US6.7` (Fiche territoire, décideur, MVP)
  sont descriptifs ; EPIC 7 = qualification/interprétation (seuils,
  priorisation, AMC).
- Sort : conserver en EPIC 6, sanctuariser la règle — toute US introduisant
  classes, seuils, classement ou priorisation bascule en EPIC 7 (garde-fou
  de recette, pas de doublon à fusionner).

## R4 — Type « Gouvernance » flou (14 US)

- Valeur `Type fonctionnel = Gouvernance` portée par US1.6, US3.6,
  US9.1–US9.6, US10.1–US10.6 ( = tout EPIC 9/10 + 2 intruses EPIC 1/3),
  recoupant exactement le pilier `Transverse (socle)` (14 US).
- Sort : réserver `Gouvernance` aux US EPIC 9/10 et retyper US1.6
  (→ Structuration/Traçabilité) et US3.6 (→ EPIC 9, cf. R1), ou renommer
  le type « Traçabilité & droits ».

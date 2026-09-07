# 2.2 — Cohérence prose ↔ tableau (avec double référence)

Change `eval-fiabilite-cdc-backlog`, tâche 2.2. Chaque écart : fichier prose
+ US concernées. Les allégations infirmées sont signalées comme telles.

## Écart E1 — US7.1 : prose MVP vs tableau hors MVP (BLOQUANT)

- Prose : `epics/epic-7-aide-decision.qmd:8` — « Le périmètre MVP couvre les
  US7.1 (définir des seuils), US7.3 (identifier des tendances). »
- Tableau : `US7.1` → `MVP=False`, `Dépend de=None` ; `US7.3` → `MVP=True`.
- Impact : périmètre MVP contractuel ambigu (chiffrage et recette).
  Correction typée : passer US7.1 en MVP (avec US7.2 qui en dépend ?) ou
  corriger la prose — arbitrage MOA.
- Connexe : US7.1 et US7.2 sans scénario testable (cf. 04).

## Écart E2 — libellé du profil public (MAJEUR)

- Tableau : profil `Intéressé public` (14 US : US6.1–6.3, US6.9–US6.15,
  US6.17, US6.20, US6.22, US6.25, toutes `MVP=True`).
- Prose : `5bis_profils_utilisateurs.qmd` — `Profil 1 : Public averti`.
- Deux libellés différents pour le même profil → traçabilité prose↔tableau
  fragile (recommandation 3.3 : unifier).
- Précision honnête : les 14 US sont de la visualisation (lecture), donc
  PAS de contradiction avec « lecture seule stricte, aucun export/partage »
  — l'allégation initiale est reformulée en conséquence. Reste un point
  d'attention : 14/14 MVP alors que la création de compte (US9.1,
  `MVP=False`) est hors MVP — cohérent uniquement si l'accès public est
  strictement anonyme (à confirmer, sinon BLOQUANT d'authentification).

## Non-écart N1 — EPIC 5 option (allégation infirmée)

- Prose : `6_perimetre_fonctionnel.qmd:25` — `EPIC 5 : Analyse multicritère (option)` ;
  EPIC 7 : priorisation liée à l'option EPIC 5, lot 2.
- Tableau : US7.5 (`Prioriser territoires`, dép. `US5.1 ; US5.2`) → `MVP=False`.
- Pas de contradiction : la dépendance vers l'option est portée par une US
  elle-même hors MVP. Reste MAJEUR M2 (option à lotir/chiffrer séparément).

## Écart E3 — US3.6 vs EPIC 9 (MAJEUR, traité en 3.2)

- Tableau : `US3.6` (`Gérer les profils utilisateurs`, EPIC 3 Référentiels,
  `MVP=False`, profil Administrateur plateforme).
- Prose/tableau : `EPIC 9 – Utilisateurs` couvre création de comptes, rôles,
  droits — recouvrement fonctionnel avéré avec US3.6.
- Sort proposé en 3.2 (référence vs fusion).

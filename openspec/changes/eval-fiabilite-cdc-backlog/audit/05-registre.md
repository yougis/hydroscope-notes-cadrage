# 2.1 — Registre unique des erreurs et incohérences

Change `eval-fiabilite-cdc-backlog`, tâche 2.1. Chaque entrée : identifiant,
nature, preuve (valeur brute lue), sévérité. BLOQUANT = interdit chiffrage,
contractualisation MVP ou recette.

## BLOQUANT

- **B1 — MVP non ordonnançable.** 5 cas MVP←hors-MVP : US1bis.1←US1.2
  (`False`), US1bis.4←US1bis.6 (`False`), US2.5←US2.2/US2.3/US2.7 (`False`
  ×3). Impact : contractualisation MVP impossible sans correction typée
  (cf. 03-mvp-ordonnancabilite.md).
- **B2 — Chiffrage inutilisable.** `Point d'effort prestataire` : `0` ×54,
  vide ×43, `12` ×1 (US1.1), `[object Object]` ×1 (`US6.21`, valeur brute) ;
  `Point d'effort estimé MOA` vide 98/99 (seule US1.1 = `22`). Impact :
  aucune charge chiffrable, aucune moyenne légitime (cf. 04).
- **B3 — Double libellé EPIC 8.** `EPIC 8 – Export` (US8.3, US8.5) vs
  `EPIC 8 – Export & diffusion` (US8.1, US8.2, US8.4, US8.6). Impact :
  périmètre EPIC ambigu pour le chiffrage par lot et la comparaison des offres.
- **B4 — Inversion fonctionnelle US4.3←US6.24.** `US4.3` (Backend,
  agrégation temporelle) dépend de `US6.24` (Front-end, bascule de vues
  graphiques). Impact : recette incohérente (un calcul ne dépend pas d'une vue).
- **B5 — Recette non testable (44/99).** 44 US sans scénario `Besoins
  testables`, dont EPIC 5 entier (US5.1–US5.6), US7.1/US7.2 (MVP) et les
  parents orphelins MVP (US1.2, US2.2, US2.3, US2.7). Impact : recette
  contractuelle impossible sur ces périmètres (liste exhaustive en 04).

## MAJEUR

- **M1 — 12 autres inversions Backend←Front** (13 paires au total moins B4) :
  US1.3/US1.4/US1.6/US1bis.10←US1.1, US1bis.10←US1bis.1, US2.5←US2.7,
  US4.1←US3.5/US1bis.12, US4.2←US3.1, US6.18←US3.1/US3.2, US9.6←US9.2.
  Réserve : une partie peut provenir d'une mauvaise classification
  Front/Back (ex. US1.1 classée Front-end) — à lever en 2.2/2.3.
- **M2 — Dépendance AMC non lotie.** US7.5 (`False`) dépend de US5.1/US5.2
  (EPIC 5, option) sans lot explicite ; EPIC 5 entier sans scénario.
  Le statut MVP est cohérent, mais l'option doit être lotie/chiffrée
  séparément avant tout engagement.

## NON REPRODUIT (allégation infirmée, ne pas inscrire au passif)

- Boucle `US4.1` ↔ `US4.7` : dépendance à sens unique sur sources figées
  (cf. 02). Le recouvrement fonctionnel calculer/recalculer reste traité
  en 3.2 comme redondance, pas comme cycle.

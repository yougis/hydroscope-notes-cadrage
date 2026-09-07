# 3.1 — Granularité et regroupements chiffrés

Change `eval-fiabilite-cdc-backlog`, tâche 3.1. Comptages scriptés ;
regroupements proposés (pivots conservés, US fusionnées, gain attendu).

## Comptages par EPIC (99 US)

EPIC 6 = 26 · EPIC 1bis = 15 · EPIC 1/2/3/4 = 7 chacun · EPIC 5 = 6 ·
EPIC 7 = 6 · EPIC 9 = 6 · EPIC 10 = 6 · EPIC 8 = 6 (2 + 4, cf. B3).

## Libellés courts (≤ 3 mots) : 48 US

Ex. `API`, `Export CSV`, `Authentification`, `Rôles simples`,
`Comparer scénarios`, `Tracer imports`, `Fiche territoire`.
Un libellé court n'est pas une faute en soi, mais corrélé aux 3W
pauvres il dégrade la testabilité (cf. 04 : 44 US sans scénario).

## Phrases génériques : allégation nuancée

Comptage des bénéfices 3W : le plus répété apparaît 2×
(`afin de maintenir le référentiel à jour`). Pas de copié-collé massif ;
le problème avéré est ailleurs (rôles inversés/manquants, cf. 07).

## Regroupements proposés

- **G1 — Sélecteur EPIC 6 (US6.9–US6.26, 18 US → 4 pivots, gain −14).**
  Pivots : recherche à facettes (US6.10/11/12/14/17), sélection d'unités
  (US6.9/15/16/18/19), couches & fonds (US6.13/20/21), sélecteur
  d'indicateurs (US6.22/23/24/25/26).
- **G2 — Catalogue 1bis (15 US → 6 pivots, gain −9).** Pivots :
  enregistrer (1bis.1), consulter (1bis.4/13), rechercher/filtrer
  (1bis.5/6), tracer (1bis.8/11), alimenter auto (1bis.10), historiser
  (1bis.7/15). Reste : 1bis.2/3/9/12/14 à rattacher au pivot le plus proche.
- **G3 — Qualité EPIC 2 (7 US → 4 pivots, gain −3).** Contrôles US2.1–2.3
  en une US « contrôles de cohérence » ; US2.5/2.6 en une US
  « qualification et documentation qualité ».
- Gain total potentiel : −26 US (~26 % du backlog), sans perte fonctionnelle
  si les critères d'acceptation des pivots reprennent les cas fusionnés.

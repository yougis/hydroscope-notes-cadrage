# 2.3 — Rôles et phrases agiles

Change `eval-fiabilite-cdc-backlog`, tâche 2.3. Extraction scriptée du rôle
3W (`En tant que …,) comparé à la colonne `Profil` (7 écarts, valeurs brutes).

## Inversions croisées US7.2 / US7.3

- `US7.2` : PROF = `Décideur métier` / 3W-rôle = `expert métier eau potable`.
- `US7.3` : PROF = `Expert métier eau potable` / 3W-rôle = `décideur métier`.
- Correction cible : échanger les deux valeurs PROF (US7.2 → Expert,
  US7.3 → Décideur), chaque 3W restant inchangée.

## Phrases tronquées US8.2 / US8.6 (sans rôle)

- `US8.2` : `je veux exporter au format SIG afin de réutiliser les données
  dans un logiciel cartographique.`
- `US8.6` : `je veux exporter une vue simple afin de partager un état des données.`
- Correction cible : préfixer `En tant qu'expert métier eau potable,`
  (cohérent avec leur PROF).

## Mismatches PROF Expert / 3W admin

- `US6.21` : PROF `Expert métier eau potable` / 3W `administrateur expert
  data` (triple faute avec l'effort `[object Object]`, cf. B2).
- `US8.1` : PROF `Expert` / 3W `administrateur expert data`.
- `US8.4` : PROF `Expert` / 3W `administrateur expert data`.
- Correction cible : aligner la 3W sur le PROF (Expert) pour US6.21/US8.1/US8.4.
  Variante MOA : si les exports relèvent de l'admin (nature back des formats
  SIG/CSV), basculer les 4 PROF US8.1/US8.2/US8.4/US8.6 en bloc vers
  `Administrateur expert data` au lieu de retoucher les 3W.

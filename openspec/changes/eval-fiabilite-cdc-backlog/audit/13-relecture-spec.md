# 5.1 — Relecture de couverture contre `specs/cdc-backlog-audit/spec.md`

Change `eval-fiabilite-cdc-backlog`, tâche 5.1. Vérification requirement par
requirement (scénarios inclus). Écarts assumés signalés, aucun masqué.

- **Couverture d'audit** ✓ — `01-socle-sources.md` : versions/dates,
  99 US / 206 scénarios, limites (maquette EPIC 6, maître indicateurs,
  branche d'évaluation). Écarts E1/E2/E3 + N1 infirmé en `06` avec double
  référence fichier + US.
- **Registre avec sévérité** ✓ — `05` : B1–B5 avec preuves et impacts
  (MVP/chiffrage/recette) ; boucle US4.1↔US4.7 infirmée par les valeurs
  brutes et classée en non-reproduit au lieu d'être tue.
- **Grille de fiabilité** ✓ — IDs (`02`), graphe sans cycle ni orphelin
  (`02`), MVP 5 cas + corrections typées (`03`), chiffrage inutilisable +
  règle de resaisie et 44/99 listées (`04`).
- **Simplicité** ✓ — granularité chiffrée G1–G3 (`08`), 3W/INVEST via
  7 écarts (`07`) + gabarit (`10`), redondances R1–R4 (`09`), sans
  réécrire le CdC.
- **Recommandations** ✓ — 6 immédiates + gabarit avant/après + MVP/lots +
  traçabilité (`10`), applicables sans arbitrage.
- **US ajustées** ✓ — table origine/motif/effet (`11`), fusions sans
  réécrire les 99.
- **P0/P1/P2** ✓ — noyau P0 défendable, P1 motivée (AMC, sélecteur avancé),
  P2 « à ne pas détailler » + réactivation (`12`).

Écart assumé : la spec annonçait « 4 mismatches profil/phrase » et une
boucle US4.1↔US4.7 — l'audit en a trouvé 7 et infirmé la boucle. L'audit
prime sur la spec (preuves à l'appui) ; la spec n'est pas réécrite ici
(planification figée), l'écart est tracé dans le présent document.

# 4.1 — US ajustées traçables (sans réécrire les 99 US)

Change `eval-fiabilite-cdc-backlog`, tâche 4.1. Chaque ligne : US d'origine,
ajustement, motif (erreur/simplification/testabilité), effet MVP/dépendances.

## Corrections d'intégrité (erreurs)

| US | Ajustement | Motif | Effet MVP/dépendances |
|----|-----------|-------|----------------------|
| US1bis.1 | couper dép. US1.2 OU monter US1.2 en MVP | B1 (MVP←hors-MVP) | MVP assaini |
| US1bis.4 | couper dép. US1bis.6 OU monter US1bis.6 en MVP | B1 | MVP assaini |
| US2.5 | couper US2.2/US2.3/US2.7 OU les monter en MVP | B1 | MVP assaini |
| US4.3 | retirer dép. US6.24 (inversion) | B4 | graphe assaini |
| US6.21 | resaisir effort (`[object Object]`), aligner 3W sur PROF Expert | B2 + 2.3 | chiffrable |
| US8.1/US8.2/US8.4/US8.6 | EPIC `Export` unique ; 3W US8.2/US8.6 complétées (rôle Expert), 3W US8.1/US8.4 alignées | B3 + 2.3 | périmètre EPIC unifié |
| US7.2/US7.3 | échanger les PROF (Expert ↔ Décideur) | 2.3 inversion | rôles cohérents |
| US7.1 | passer en MVP (avec US7.2 ?) OU corriger la prose EPIC 7 | E1 | MVP tranché (MOA) |

## Reclassements MVP requis par des US MVP (dépendances)

| US | Ajustement | Motif | Effet |
|----|-----------|-------|-------|
| US1.2, US1bis.6, US2.2, US2.3, US2.7 | monter en MVP (ou couper les dépendances filles, cf. ci-dessus) | parents hors MVP d'US MVP | MVP ordonnançable |

## Fusions / dépréciations (simplification)

| US | Ajustement | Motif | Effet |
|----|-----------|-------|-------|
| US3.6 | déprécier au profit d'US9.3/US9.4 (ou déplacer en EPIC 9) | R1 | −1 US |
| US1.7 + US4.7 | fusionner « rejouer / recalculer » (référence US4.7) | R2 | −1 US |
| Bloc US6.9–US6.26 | 4 pivots (G1) | 3.1 | −14 US |
| Catalogue 1bis | 6 pivots (G2) | 3.1 | −9 US |
| US2.1–2.3 / US2.5–2.6 | 2 pivots qualité (G3) | 3.1 | −3 US |

## Reformulations et retypage

| US | Ajustement | Motif |
|----|-----------|-------|
| US1.6, US3.6 | retyper (plus `Gouvernance` générique) | R4 |
| US à libellé ≤ 3 mots (48, cf. 08) | expliciter au fil des pivots G1–G3 | 3.1 |
| US7.5 | lotir l'option AMC (lot explicite) | M2 |

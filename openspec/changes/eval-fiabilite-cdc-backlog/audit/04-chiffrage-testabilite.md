# 1.4 — Chiffrabilité et testabilité

Change `eval-fiabilite-cdc-backlog`, tâche 1.4. Contrôles scriptés read-only.

## Chiffrabilité : conclusion « chiffrage inutilisable en l'état »

`Point d'effort prestataire` (99 US) : `0` × 54, vide × 43, `12` × 1
(seule US chiffrée : US1.1), `[object Object]` × 1 (`US6.21`, valeur brute
lue telle quelle — résidu d'export).

`Point d'effort estimé MOA` : vide 98/99 (seule US1.1 = `22`).

Règle de resaisie imposée (pas de moyenne) : `0` / vide / non-numérique =
« non chiffré ». Tout `0` actuel doit être resaisi (distinguer charge nulle
avérée de non-chiffrage) ; `US6.21` à resaisir impérativement.

## Testabilité : 44/99 US sans scénario (55 testées)

Liste exhaustive des US sans entrée dans `Besoins testables` :
US1.2, US1.7, US10.3, US10.4, US10.5, US10.6, US1bis.11, US1bis.13,
US1bis.14, US1bis.15, US1bis.3, US1bis.5, US1bis.6, US1bis.8, US1bis.9,
US2.2, US2.3, US2.7, US3.3, US3.6, US3.7, US4.4, US4.6, US4.7, US5.1,
US5.2, US5.3, US5.4, US5.5, US5.6, US6.5, US6.6, US7.1, US7.2, US7.5,
US7.6, US8.2, US8.3, US8.4, US8.5, US9.1, US9.4, US9.5, US9.6.

Points saillants : EPIC 5 entier (US5.1–US5.6) sans scénario ; US7.1 et
US7.2 (seuils/dépassement, MVP) sans scénario ; orphelins MVP←hors-MVP
(US1.2, US2.2, US2.3, US2.7) eux-mêmes non testés — double peine pour
l'ordonnançabilité (cf. 03).

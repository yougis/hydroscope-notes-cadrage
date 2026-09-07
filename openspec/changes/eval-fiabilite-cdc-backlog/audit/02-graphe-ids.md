# 1.2 — Unicité/format des IDs, parents, cycles

Change `eval-fiabilite-cdc-backlog`, tâche 1.2. Contrôles scriptés read-only
sur `Backlog` (99 lignes), normalisation : séparateurs `;`/`,`/`\n`,
format attendu `US\d+(\.\d+|bis\.\d+)`.

## Résultats (valeurs brutes)

- Lignes lues : 99. IDs dupliqués : AUCUN. IDs vides : 0.
- IDs hors format : AUCUN (ex. `US1bis.12`, `US4.7` conformes).
- Parents inexistants : AUCUN — toute valeur de `Dépend de (Parent)`
  référence un ID présent dans le tableau.
- Cycles (parcours DFS exhaustif) : AUCUN.

## Point de vigilance : boucle `US4.1` ↔ `US4.7` annoncée NON REPRODUITE

Valeurs lues sur les sources figées :

- `US4.1` → `Dépend de (Parent)` = `'US3.5 ; US1bis.12'`
- `US4.7` → `Dépend de (Parent)` = `'US4.1'`
  (dépendance à sens unique US4.7 ← US4.1, pas de cycle)

Il n'y a donc pas de boucle sur les sources figées. Le recouvrement
fonctionnel « calculer / recalculer » reste réel (traité en 3.2, propositions
P2/P3 de la branche `revue-md-cdc-v1-1`), mais il ne constitue pas un cycle
de dépendances. L'entrée correspondante du registre (2.1) est classée en
conséquence (pas de BLOQUANT graphe de ce fait).

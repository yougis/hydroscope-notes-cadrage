# Dépendances entre User Stories — HydroScope

Ce document recense les relations de dépendance **(parent → enfant)** entre les User Stories du backlog.
La colonne `Dépend de (Parent)` du fichier `backlog.csv` reprend ces relations pour chaque US concernée.

> Une US peut être **à la fois enfant et parent** (ex : `US6.7` est enfant de l'affichage des données et parent de `US8.3`). Ces influences croisées sont représentées dans le graphe navigable (`annexes/graphe_dependances.html`).

---

## 1. EPIC 1 & 1bis — Gestion & catalogage des données

### Import des données
| Parent | Enfant(s) | Justification |
|---|---|---|
| `US1.1` Importer via fichier | `US1.3` Planifier imports / `US1.4` Normaliser / `US1.5` Gérer erreurs / `US1.6` Historiser / `US1bis.10` Alimenter auto catalogue | Maillon racine : la planification, la normalisation, la gestion d'erreurs, l'historisation et l'alimentation du catalogue supposent qu'un import existe. |
| `US1.2` Connecter API externe | `US1bis.1` Enregistrer dans le catalogue | Un flux API doit pouvoir être catalogué. |
| `US1bis.1` Enregistrer dans catalogue | `US1bis.2` Associer métadonnées / `US1bis.10` Alimenter auto catalogue | L'enregistrement conditionne l'enrichissement métadonnées. |
| `US1bis.2` Associer métadonnées | `US1bis.3` Modifier métadonnées | On ne modifie que ce qui a été documenté. |
| `US1bis.8` Tracer transformations | `US1bis.11` Relier à un traitement (dbt) | Relier un jeu de données à un traitement s'appuie sur la traçabilité des transformations. |
| `US1bis.12` Enregistrer un indicateur comme donnée dérivée | `US4.1` Calculer indicateurs simples | L'indicateur dérivé est produit par un calcul préalable. |

### Historisation → dépendants
| Parent | Enfant(s) | Justification |
|---|---|---|
| `US1.6` Historiser les données | `US4.3` Agrégation temporelle / `US10.4` Historique modifications / `US10.5` Reconstituer un calcul | La lecture temporelle et la reconstitution d'état supposent l'existence d'un historique. |

---

## 2. EPIC 3 — Référentiels (socle géographique)

| Parent | Enfant(s) | Justification |
|---|---|---|
| `US3.1` Gérer les bassins versants | `US6.8` Basculer échelle Captages↔BV / `US6.18` Communes∩BV / `US6.19` Croisement captages↔BV / `US4.2` Agréger à l'échelle BV | Le BV est l'objet structurant de l'agrégation et de l'affichage cartographique. |
| `US3.2` Gérer les captages | `US6.8` / `US6.18` / `US6.19` | Le captage est nécessaire au croisement et au sélecteur. |
| `US3.5` Définir un indicateur | `US4.1` Calculer / `US6.2` Afficher carto / `US1bis.12` Donnée dérivée | Un indicateur doit être défini (méthode, unité) avant d'être calculé et affiché. |

---

## 3. EPIC 4 — Calcul d'indicateurs

| Parent | Enfant(s) | Justification |
|---|---|---|
| `US4.1` Calculer indicateurs simples | `US4.2` Agréger BV / `US4.3` Agrég. temporelle / `US4.7` Recalculer / `US10.2` Tracer calculs / `US5.1` Indice composite | Le calcul simple est la base de toutes les agrégations, du recalcul, de la traçabilité et de l'AMC. |
| `US4.7` Recalculer un indicateur | `US4.1` (boucle) | Recalculer ré-exécute un calcul existant. |
| `US6.24` Bascule entre vues graphiques | `US4.3` Agrégation temporelle | La vue temporelle est désactivée si les données ne sont pas historisées. |

---

## 4. EPIC 5 — Analyse multicritère (chaîne)

| Parent | Enfant(s) | Justification |
|---|---|---|
| `US5.1` Construire un indice composite | `US5.2` Pondérations / `US5.3` Scénarios / `US5.4` Comparer / `US5.5` Contributions / `US7.5` Prioriser | L'indice est le préalable à toute pondération et priorisation. |
| `US5.2` Définir pondérations | `US5.3` Tester scénarios / `US7.5` Prioriser | On teste et priorise à partir d'une pondération définie. |
| `US5.3` Tester scénarios | `US5.4` Comparer / `US5.5` Visualiser | La comparaison et la visualisation des contributions s'appuient sur des scénarios testés. |
| `US5.4` Comparer scénarios | `US5.5` Visualiser contributions | La visualisation des contributions clôt la chaîne d'analyse. |

---

## 5. EPIC 7 — Aide à la décision

| Parent | Enfant(s) | Justification |
|---|---|---|
| `US7.1` Définir des seuils | `US7.2` Détecter dépassement / `US7.6` Interprétation avancée | On ne peut détecter un dépassement qu'à partir de seuils définis. |
| `US6.7` Fiche territoire | `US8.3` Rapport PDF / `US6.4` Graphiques temporels | Une fiche territoire est la base du rapport PDF et alimente les graphiques. |

---

## 6. EPIC 8 — Export & diffusion

| Parent | Enfant(s) | Justification |
|---|---|---|
| `US8.4` Partage via lien | `US9.4` Restreindre accès fin | Le partage doit respecter les droits d'accès (voir EPIC 9). |
| `US8.5` API | `US9.4` Restreindre accès fin | L'API doit filtrer les données selon les habilitations. |

---

## 7. EPIC 9 — Gestion des utilisateurs

| Parent | Enfant(s) | Justification |
|---|---|---|
| `US9.2` Authentification | `US9.3` Rôles / `US9.1` Créer compte / `US9.5` Adapter interface / `US9.6` Suivre connexions | L'authentification est le préalable à la gestion des rôles, comptes et sessions. |
| `US9.3` Rôles simples | `US9.4` Accès fin / `US9.5` Adapter interface | Les rôles permettent de granuler les droits et d'adapter l'interface. |

---

## 8. EPIC 10 — Traçabilité

| Parent | Enfant(s) | Justification |
|---|---|---|
| `US10.2` Tracer calculs | `US10.5` Reconstituer un calcul | Reconstituer un résultat supposé qu'il ait été tracé à l'exécution. |

---

## Synthèse des chaînes principales

```
US1.1 → US1.4 / US1.5 / US1.6 → (US4.3, US10.4, US10.5)
      → US1bis.10 → US1bis.1 → US1bis.2 → US1bis.3
      → US1bis.8 → US1bis.11

US3.1 / US3.2 → US6.8 / US6.18 / US6.19
US3.5 → US4.1 → US4.2 / US4.3 / US4.7 / US10.2 → US10.5

US5.1 → US5.2 → US5.3 → US5.4 → US5.5
      ↘ US7.5                  ↙

US7.1 → US7.2 / US7.6
US6.7 → US8.3 / US6.4

US9.2 → US9.3 → US9.4 ← US8.4 / US8.5
      → US9.1 / US9.5 / US9.6
```

*Généré le 05/08/2026. Voir aussi `annexes/graphe_dependances.html` pour la version navigable.*
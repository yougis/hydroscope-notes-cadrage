# FAQ

Réponses aux questions fréquentes sur HydroScope.

## Que veut dire la couleur des hexagones sur la carte ?

La carte **choroplèthe H3** colore chaque hexagone selon la **classe de valeur** de
l'indicateur actif (classes identifiées dans la légende). Au **survol**, une infobulle
affiche la référence de l'hexagone (`H3 [q, r]`), sa valeur brute et sa classe.
La **carte thématique** affiche quant à elle la couche source de l'indicateur
(ex. MOS, incendies VIIRS).

## Pourquoi certains modes de graphique sont grisés ?

Un mode n'est disponible que si l'indicateur y est **compatible** : la **vue temporelle**
et la **vue des changements** exigent une série historisée ; la **carte H3** exige une
spatialisation. Un mode grisé signifie simplement que l'indicateur ne dispose pas des
données requises.

## Quelle est la différence entre une facette et une sélection ?

- Les **facettes** (commune, province, presets) **filtrent la liste** des unités : elles
  ne sélectionnent rien.
- La **sélection** (ce qui est coché) pilote la carte et les graphiques.
Un preset « Top 10 » coche les 10 unités de la liste **déjà filtrée** ; le retirer
restaure la sélection précédente.

## Les sélections captages et BV sont-elles liées ?

Non, les sélections sont **indépendantes** entre les deux échelles : basculer du mode
Captages au mode Bassins versants ne perd pas la sélection de l'autre échelle. En
revanche, la carte met en évidence le **croisement** (les BV des captages sélectionnés,
et inversement).

## Pourquoi certaines vues n'apparaissent pas dans la sidebar ?

Les vues **réservées aux experts** (Comparer, Données disponibles, Ajout de données,
Supervision, Historique & traçabilité, Référentiels, Connexion) ne sont affichées que
lorsque le **mode avancé** est activé dans l'en-tête.

## Comment savoir si une donnée est récente ?

Chaque visualisation et chaque fiche indiquent la **fraîcheur** et la **qualité** de la
donnée (date de mise à jour, indicateurs de fiabilité). Les vues du groupe **Suivi**
(Supervision) détaillent la qualité sur l'ensemble du système.

## Quelles technologies alimentent HydroScope ?

HydroScope s'appuie sur une architecture en couches : **sources de données →
ingestion → stockage (PostgreSQL + PostGIS) → traitement (dbt, géotraitements) → API
(REST, standards OGC WMS/WFS, compatible ESRI) → front-end** (carte MapLibre / OpenLayers,
interface web responsive). Le catalogue est exposé via STAC / CKAN et l'historisation
via GeoDiff. Ces choix garantissent robustesse, interopérabilité et traçabilité.

## Quelles sont les données personnelles stockées ?

La session (sélection, indicateurs, préférences) est mémorisée côté navigateur,
**limitée aux usages fonctionnels et sans données sensibles** (conforme RGPD). Aucune
donnée personnelle n'est nécessaire pour consulter les données publiques.

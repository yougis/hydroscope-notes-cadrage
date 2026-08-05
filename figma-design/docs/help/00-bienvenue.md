# Bienvenue dans HydroScope

HydroScope est le portail de l'eau potable de Nouvelle-Calédonie. Il cartographie, suit et
compare la qualité de l'eau et les pressions qui pèsent sur les ressources en eau potable
des **bassins versants** de la Nouvelle-Calédonie.

Cette documentation vous explique comment utiliser chaque vue de l'application. Elle est
accessible à tout moment depuis l'icône **?** de l'en-tête, et s'ouvre automatiquement sur
la section correspondant à la vue que vous étiez en train de consulter.

## Comprendre le vocabulaire

- **Captage / forage** — point de prélèvement d'eau potable (source, puits, forage).
- **Bassin versant (BV)** — territoire dont toutes les eaux s'écoulent vers un même point.
  C'est l'échelle d'analyse principale d'HydroScope.
- **Périmètre de protection de l'eau (PPE)** — zone de protection réglementaire autour
  d'un captage.
- **Indicateur** — mesure calculée (ex. « Surface brûlée », « Pression de prélèvement »),
  définie par une unité, une échelle d'interprétation et une méthode de calcul.
- **Session de travail** — l'ensemble cohérent de vos choix : captages sélectionnés,
  bassins versants, indicateurs ajoutés, filtres et période. Toutes les vues partagent la
  même session.

## Profils et droits

Trois familles d'utilisateurs sont prévues :

- **Grand public** — consultation de l'interface publique et des données ouvertes.
- **Partenaires** — accès aux données et indicateurs partagés avec leur institution.
- **Experts (OEIL)** — accès complet : toutes les vues, l'ajout de données et
  l'administration. Le **mode avancé** active l'affichage des vues réservées aux experts.

Seules les *actions* (ajouter un indicateur, exporter, administrer) sont régulées par les
droits : **tous les indicateurs restent visibles par tous** (transparence).

## La session de travail : le fil conducteur

Chaque vue de l'application lit et modifie la **même session** :

| Élément de session | Piloté par | Répercuté sur |
|---|---|---|
| Captages sélectionnés | Sélecteur (vue Carte) | Carte, graphiques, pages indicateurs |
| Bassins versants sélectionnés | Sélecteur (vue Carte) | Carte, graphiques, agrégations |
| Indicateurs ajoutés | Catalogue, colonne droite | Onglets, pages indicateurs, sidebar |
| Période | Sélecteur « Période » de l'en-tête | Carte, graphiques, pages |
| Filtres (commune, province) | Facettes du sélecteur | Liste des captages |

> **Astuce** : toute modification de sélection ou de filtre se répercute instantanément
> sur la carte, les graphiques et les onglets. C'est la garantie d'une cohérence totale
> entre les vues.

# Indicateurs

Les indicateurs sont les mesures calculées par HydroScope, organisées en **2 familles**
(ENJEUX / MENACES), puis **thèmes**, puis **groupes à objectifs communs**.

## Parcourir le catalogue

Le catalogue est la porte d'entrée de la colonne droite de la carte.

- **Vignettes** — chaque indicateur affiche son titre et deux actions : **ajouter à la
  session** (action, donc régulée par les droits) et **consulter la fiche** (icône ⓘ,
  toujours visible pour tous).
- **Recherche groupée** — à la frappe, une liste déroulante apparaît, organisée
  Famille → Thème → Groupe, filtrée sur code, nom, thème, groupe ou famille. En bas de
  liste, **« Voir toute la liste des indicateurs → »** ouvre la vue Indicateurs.
- **Filtres** — les tabs **familles** (ENJEUX / MENACES, un seul actif), les **pills
  thèmes** (multi-sélection) et le **dropdown groupes** pilotent la liste affichée.
  Changer de famille réinitialise thèmes et groupe. Le compteur « n » reflète la liste
  filtrée.
- La **recherche est indépendante** des filtres : elle interroge le catalogue complet et
  se superpose aux filtres sans se combiner avec eux.
- **Favoris** — marquez des indicateurs en favori pour les retrouver rapidement.

## Consulter la fiche indicateur

La **fiche métadonnées** (accessible par l'icône ⓘ sur la vignette, ou le bouton
« Fiche » de la vue Indicateurs) documente pour chaque indicateur : la **méthode de
calcul**, la **source**, l'**échelle d'interprétation**, les **seuils**, la **fraîcheur**
des données et la **qualité**. C'est la base de la traçabilité et de la transparence.

## Ouvrir une page indicateur

Ajouter un indicateur à la session ouvre un **onglet / une page** nommé à son titre,
avec les valeurs de **tous les captages sélectionnés** (comparaison inter-captages).
L'indicateur apparaît aussi dans la sidebar (groupe « Indicateurs »), avec son symbole
propre.

### Page indicateur

La page distingue **deux blocs de valeurs**, selon l'échelle :
- **Référentiel captage** — valeurs brutes par captage (accent bleu).
- **Référentiel bassins versants** — valeurs agrégées par BV (accent émeraude) :
  somme pour les stocks, moyenne pour la qualité.

Chaque bloc affiche ses **chiffres clés** (Valeur sélectionnée, Moyenne, Unités, Maximum)
puis un graphique.

## Choisir le mode de graphique

Sous chaque graphique, le sélecteur propose plusieurs modes :

| Mode | Icône | Comportement |
|---|---|---|
| **Répartition** | Barres | Comparaison inter-unités par défaut |
| **Vue temporelle** | Dynamiques temporelles | Série temporelle de l'indicateur (grisée si pas de série historisée) |
| **Vue des changements** | Variations | Variations entre une date de début et une date de fin |
| **Carte choroplèthe H3** | Carte stat | Indicateur spatialisé en hexagones H3 sur les BV des captages sélectionnés |

Chaque mode ne s'affiche que si l'indicateur y est compatible (spatialisation H3, série
temporelle disponible). Les boutons affichent une **infobulle au survol** décrivant leur
rôle ; le bouton H3 est un **interrupteur indépendant** du mode de graphique courant.

## Vue Indicateurs (liste complète)

La vue **Indicateurs** (sidebar) liste le catalogue complet (~40 indicateurs), groupée
Famille → Thème → Groupe (accordéons) avec compteur de résultats. Pour chaque indicateur :
unité, échelle d'interprétation, méthode de calcul, seuils et sources, plus le bouton
« Fiche ».

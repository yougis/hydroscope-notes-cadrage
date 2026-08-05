# Carte des territoires

La vue **Carte des territoires** est la zone de travail principale. Elle se compose de
trois zones :

- **Colonne de gauche** — sélecteur et gestion des unités (captages ou bassins versants),
  couches et légende.
- **Zone centrale** — carte interactive (fond cartographique, couches, grille H3).
- **Colonne de droite** — catalogue d'indicateurs puis visualisations (onglets).

## Sélectionner les unités étudiées

La colonne de gauche bascule entre deux **échelles d'analyse**, jamais mélangées :

| | Mode Captages | Mode Bassins versants |
|---|---|---|
| **Liste** | Captages / forages | BVAEP |
| **Carte** | Points captages en vedette ; BV des captages sélectionnés surlignés | Polygones BV colorés ; captages du BV sélectionné mis en évidence |
| **Valeurs** | Donnée brute par captage | Agrégation des captages du BV (somme pour les stocks, moyenne pour la qualité) |
| **Sélection par défaut** | Quelques captages pré-sélectionnés | Tous les BV |

Les **sélections sont indépendantes** d'un mode à l'autre : basculer ne perd pas la
sélection de l'autre échelle.

### Rechercher avec les facettes

- La **recherche plein texte** filtre la liste en direct (nom, commune, bassin versant,
  province).
- À la saisie, des **suggestions** proposent des communes, des provinces et des actions
  (presets Top 10). Choisir une suggestion ajoute une **facette**.
- Les facettes actives apparaissent en **puces décochables** au-dessus de la liste
  (ex. `Commune : Koumac ✕`). Elles se cumulent et se combinent en ET ; chaque puce se
  retire individuellement.
- Les facettes **filtrent la liste**, elles ne sélectionnent rien : la sélection est un
  étage séparé (cf. ci-dessous).

### Sélectionner (un étage séparé des filtres)

- La **sélection** est ce qui est **coché** dans la liste (lignes surlignées + compteur
  « n sélectionnés »). C'est elle qui pilote la carte et les graphiques.
- Sélection / désélection **unité par unité** (clic sur la ligne ou croix), ou bouton
  **« Vider »**.
- Les **presets « Top 10 »** (à côté du tri) sont des *macros de sélection* : ils cochent
  les 10 unités de la liste **déjà filtrée** par les facettes. La sélection reste ensuite
  modifiable à la main. Un preset appliqué apparaît en puce décochable ; le retirer
  **restaure la sélection précédente**.
- Le **tri** ordonne la liste par distance ou par nom.

### Lire la carte

- Le **fond de carte** se choisit avec le sélecteur posé sur la carte (haut-centre) :
  `Carto`, `Satellite` ou `Terrain`.
- Les **couches** se gèrent dans le volet gauche (accordéon) : `Bassins versants`,
  `Captages`, `Périmètres`, `Zones à risque`, avec un toggle par couche (pastille couleur
  + icône œil) et le badge « Source : … » de l'indicateur actif.
- La **légende** est dans le volet gauche (section pliable), adaptée au mode
  Captages / BV.
- Le **survol d'une hexagone H3** affiche une infobulle avec sa référence `H3 [q, r]`,
  la valeur brute de l'indicateur et sa classe colorée.

### États de sélection sur la carte

Trois états visuels distinguent les éléments du référentiel :

- **Sélectionné** — tracé **orange** `#f59e0b` (le plus visible).
- **Lié** — élément lié à la sélection (BV des captages sélectionnés, ou captages du BV
  sélectionné) : affiché normalement, sans tracé orange.
- **Autre** — tous les autres éléments : grisés et translucides pour ne pas gêner la
  lecture.

> **Limite de charge visuelle** : n'activez que les couches utiles. Plusieurs couches
> simultanées surchargent la lecture ; la gestion de la visibilité est là pour ça.

## Visualiser les indicateurs (colonne de droite)

La colonne de droite est la porte d'entrée des indicateurs. Consultez la page
« Indicateurs » de l'aide pour la recherche groupée, les filtres Famille / Thème /
Groupe, les fiches métadonnées et les modes de graphique.

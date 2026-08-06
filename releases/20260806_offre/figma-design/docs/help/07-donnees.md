# Données

Les vues du groupe **Données** concernent le cycle de vie des données qui alimentent
HydroScope : leur inventaire, leur qualité et leur intégration.

## Données disponibles

La vue **Données disponibles** (vue experte) est l'inventaire des **jeux de données
sources et dérivés** :

- Métadonnées de chaque jeu de données (producteur, mise à jour, périmètre).
- Le lien **source → transformation → indicateur** : pour chaque indicateur, vous
  remontez aux données qui le produisent.
- La conformité aux standards (STAC / CKAN) et les formats d'échange.

## Ajouter des données

La vue **Ajout de données** (vue experte) intègre de nouveaux jeux de données :

- **Par fichiers** : CSV, SIG (shapefile, GeoPackage)…
- **Par API** : connexion à des flux de données externes.
- **Planification** et **normalisation** des traitements.
- **Gestion des erreurs** et **rejeu** des traitements en cas d'échec.

> L'intégration respecte les *guidelines d'intégration* : formats d'échange attendus et
> règles de qualité applicables. Les traitements sont construits avec **dbt**, ce qui
> garantit la reproductibilité et la traçabilité des transformations.

## Des données traçables

Chaque donnée et chaque indicateur est traçable : fraîcheur, qualité, version et
historisation (GeoDiff) permettent de reconstituer la **source exacte** d'un indicateur
produit à une date donnée.

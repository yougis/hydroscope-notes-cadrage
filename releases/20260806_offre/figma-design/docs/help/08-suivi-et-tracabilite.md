# Suivi et traçabilité

Les vues du groupe **Suivi** (vues expertes) permettent de surveiller le bon
fonctionnement d'HydroScope et de reconstituer l'historique des données.

## Supervision

La vue **Supervision** regroupe trois niveaux de suivi :

- **Suivi technique** — imports, connexions aux sources, performances, disponibilité,
  healthcheck, temps de réponse.
- **Qualité des données** — fraîcheur, complétude, anomalies détectées par les contrôles.
- **Veille environnementale** — surveillance des tendances et ruptures sur les indicateurs
  métier et environnementaux.

En cas d'anomalie, des **alertes** sont déclenchées pour prévenir les administrateurs.

## Historique et traçabilité

La vue **Historique et traçabilité** documente le **cycle de vie des données** :

- **Versioning** des jeux de données (chaque mise à jour conserve un état complet,
  via GeoDiff ou équivalent).
- **Journal des actions** — qui a fait quoi, quand (imports, modifications, traitements).
- **Reconstitution** — à partir d'une date donnée, vous pouvez reconstituer l'état d'une
  donnée ou d'un calcul tel qu'il était à cette date.

> Grâce à l'historisation, un indicateur produit aujourd'hui reste reproductible et
> explicable : vous pouvez toujours retrouver la **source exacte** qui l'a généré.

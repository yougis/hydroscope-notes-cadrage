# 1.1 — Sources auditées (figées)

Change `eval-fiabilite-cdc-backlog`, tâche 1.1. Branche d'évaluation :
`eval-fiabilite-cdc-backlog` (basée sur `main`, sans les correctifs MD).

## Fichiers lus (read-only, non modifiés)

| Source | Version / date | Empreinte / taille | Contenu lu |
|--------|---------------|-------------------|------------|
| `cahier des charges/backlog.xlsx`, onglet `Backlog` | fichier du dépôt (mtime 2026-09-08, dernier commit le touchant : `22d7b90`) — md5 `b6bf31f166f38b1082e19a33cd8fcee0`, 45 265 octets | dims `A1:M100` | 99 US (1 ligne d'en-tête + 99 lignes) |
| `cahier des charges/backlog.xlsx`, onglet `Besoins testables` | idem | dims `A1:O207` | 206 scénarios (1 en-tête + 206 lignes) |
| CdC v1.1 (`cahier des charges/index.qmd`, `version: "version 1.1"`, historique : 1.1 du 10/08/2026 « version soumise à la relecture de la MOA ») | v1.1 | — | `7_product_backlog.qmd`, `7bis_dependances_us.qmd`, `6_perimetre_fonctionnel.qmd`, `epics/*.qmd`, `5bis_profils_utilisateurs.qmd`, `5_presentation_indicateurs.qmd` |

Colonnes `Backlog` (13) : EPIC, ID User Story, Libellé User Story, MVP,
Front_or_Back, Module, Dépend de (Parent), Type fonctionnel, Pilier(s),
Profil utilisateur, Phrase méthode agile, Point d'effort prestataire,
Point d'effort estimé MOA.

## Limites déclarées (non des hypothèses)

- Maquette IHM EPIC 6 non versée au repo : l'audit du sélecteur repose sur
  libellés/phrases uniquement (cf. design D — risque R3).
- Fichier maître des indicateurs (`fiche indicateur/fiches indicateurs.xlsx`,
  hors dépôt) non audité : seuls les renvois du CdC sont contrôlés.
- Valeurs MVP lues comme chaînes (`True`/`False`) ; `Dépend de (Parent)`
  utilise `;` et `,` comme séparateurs (normalisation §2.1 du registre).
- État audité = `main` pré-correctifs MD (les correctifs MD vivent sur la
  branche `revue-md-cdc-v1-1`, hors périmètre de cet audit).

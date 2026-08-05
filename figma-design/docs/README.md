# Documentation HydroScope

Ce dossier organise la documentation du projet en deux volets.

## `docs/help/` — Documentation utilisateur (rendue dans l'application)

La documentation utilisateur est **chargée et affichée dans l'application** via le
centre d'aide (icône `?` de l'en-tête). Chaque fichier est un chapitre ; les titres
`##` deviennent les entrées du sommaire (TOC) et des **ancres** vers lesquelles
l'application navigue selon la vue active.

| Fichier | Chapitre | Vues associées |
|---|---|---|
| `00-bienvenue.md` | Bienvenue, vocabulaire, profils, session | — |
| `01-premiers-pas.md` | Navigation, mode avancé, période, aide | — |
| `02-carte-territoires.md` | Carte des territoires | `carte` |
| `03-indicateurs.md` | Indicateurs, fiches, page indicateur | `indicateurs`, `ind:*` |
| `04-tableau-de-bord.md` | Tableau de bord + interface publique | `tableau` |
| `05-fiches-territoires.md` | Fiches des territoires | `fiches` |
| `06-comparer-territoires.md` | Comparer les territoires | `comparaison` |
| `07-donnees.md` | Données disponibles, ajout de données | `catalogue`, `import` |
| `08-suivi-et-tracabilite.md` | Supervision, historique | `monitoring`, `tracabilite` |
| `09-administration-et-compte.md` | Référentiels, connexion | `referentiels`, `connexion` |
| `10-export-partage.md` | Export, rapports, partage | — |
| `11-faq.md` | Questions fréquentes | — |

**Convention** : le titre `#` de chaque fichier est le titre du chapitre. Les sections
`##` (et `###`) reçoivent une ancre (slug sans accents). Le mapping vue → ancre est
déclaré dans `src/features/help/docs.ts` (`helpAnchorFor`). Si vous renommez un titre
de section référencé par ce mapping, mettez à jour le mapping en conséquence.

Syntaxe Markdown prise en charge par le rendu : titres `#`→`####`, paragraphes, listes
à puces et numérotées (imbrication 2 espaces), tableaux `| |`, citations `>` (notes),
blocs de code ` ``` `, `**gras**`, `*italique*`, `code`, liens `[texte](url)`.

## `docs/specs/` — Spécifications (documents source)

Documents de conception / spécification, conservés tels quels et non rendus dans
l'application :

- `specifications_interfaces_ux_architecture.md`
- `UX-header-sidebar.md`

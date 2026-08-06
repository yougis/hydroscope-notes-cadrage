# RAPPORT — Pack Offre HydroScope

Date de génération : `20260806`
Commande utilisée : `conda run -n reponse python scripts/compile_offre.py`

## Contenu du pack

1. `cahier des charges/` — les trois rendus frais du CDC (`index.html`, `index.pdf`, `index.docx`), ainsi que `profils_utilisateurs.qmd`, `dependances_us.qmd`, `backlog.csv` et les sous-dossiers `annexes/` (fiches PDF, arbre HTML, critères + fichier maître `fiches indicateurs.xlsx`), `specifications/` (tous les `.qmd`) et `epics/` (tous les `.qmd`).
2. `analyse_architecture_donnees_geographique_decisionnelle.md` (source `reponse_prestataire/`).
3. `figma-design/docs/specs/` et `figma-design/docs/help/` — specs UX (arborescence miroir).

## Choix de structure — préservation des liens relatifs de l'HTML

L'analyse des `href`/`src` de `index.html` (rendu Quarto, `embed-resources: true`) montre que le document référence des ressources par **chemins relatifs** depuis son propre répertoire :

- `index.pdf`, `index.docx` — téléchargement des versions pdf/docx, même dossier ;
- `./dependances_us.qmd`, `./profils_utilisateurs.qmd` — même dossier ;
- `./annexes/{Fiches_indicateurs_HydroScope-v4.pdf,arbre_indicateurs.html}` — fiches et arbre ;

**Décision :** placer les trois rendus dans un sous-dossier `cahier des charges/` **sans les renommer** (garder `index.{html,pdf,docx}`). Le renommage proposé `Cahier_des_charges.*` aurait cassé les liens internes `index.pdf` / `index.docx`. Les fichiers `dependances_us.qmd` et `profils_utilisateurs.qmd` sont placés à côté de l'HTML (référencés en relatif), et `backlog.csv` les accompagne pour cohérence. Le fichier maître `fiches indicateurs.xlsx` (source unique des indicateurs, résolu via `HYDRO_INDICATEURS_XLSX` ou le dossier voisin `fiche indicateur/`) est copié dans `annexes/`. Comme l'HTML embarque CSS/JS/images (`embed-resources`), uniquement les fichiers ci-dessus doivent être copiés (étape de scan supplémentaire pour ne rien oublier).

## Résultats des rendus Quarto

| Format | Résultat | Taille |
|---|---|---|
| html | OK | 5878536 o |
| pdf | OK | 1676877 o |
| docx | OK | 209730 o |

## Vérification des liens de l'HTML du pack

- Liens internes vérifiés (présents) : **6**
- Ressources copiées depuis les sources lors du scan : **0**
- Liens cassés restants : **0**

Aucun lien cassé restant (0 = OK).

## Structure du pack

```
cahier des charges/
  annexes/
    arbre_indicateurs.html  (11087 o)
    Cadre_chiffrage.qmd  (5230 o)
    Criteres_acceptation_donnees.qmd  (25190 o)
    Criteres_acceptation_lot2.qmd  (12912 o)
    Criteres_acceptation_visualisation.qmd  (30001 o)
    fiches indicateurs.xlsx  (53245 o)
    Fiches_indicateurs_HydroScope-v4.pdf  (792057 o)
    graphe_dependances.html  (22213 o)
  epics/
    epic-1-gestion-donnees.qmd  (3419 o)
    epic-10-tracabilite-audit.qmd  (1787 o)
    epic-1bis-catalogue.qmd  (2208 o)
    epic-2-qualite-donnees.qmd  (3513 o)
    epic-3-referentiels.qmd  (2530 o)
    epic-4-calcul-indicateurs.qmd  (2775 o)
    epic-5-analyse-multicritere.qmd  (2373 o)
    epic-6-visualisation.qmd  (4762 o)
    epic-7-aide-decision.qmd  (4420 o)
    epic-8-export-diffusion.qmd  (4363 o)
    epic-9-gestion-utilisateurs.qmd  (3621 o)
  specifications/
    ADI_caracterisation_radar.qmd  (2368 o)
    ADI_depassement_tendance.qmd  (2430 o)
    ADI_fiche_indicateur.qmd  (2885 o)
    ADI_fiche_territoire_synthese.qmd  (2589 o)
    ADI_methodologie_seuils.qmd  (5498 o)
    ADI_parcours.qmd  (3500 o)
    ADI_vigilance_carte.qmd  (2600 o)
    AMC_methodologie.qmd  (2794 o)
    AMC_rendu_score.qmd  (2254 o)
    CU-ADMIN-01.qmd  (2295 o)
    CU-ADMIN-02.qmd  (2117 o)
    CU-ADMIN-03.qmd  (1949 o)
    CU-ADMIN-04.qmd  (1854 o)
    CU-ADMIN-05.qmd  (1802 o)
    CU-DATA-01.qmd  (2029 o)
    CU-DATA-02.qmd  (1982 o)
    CU-DATA-03.qmd  (1877 o)
    CU-DATA-04.qmd  (1818 o)
    CU-DATA-05.qmd  (2414 o)
    CU-DECISION-01.qmd  (2151 o)
    CU-DECISION-02.qmd  (1796 o)
    CU-DECISION-03.qmd  (1708 o)
    CU-DECISION-04.qmd  (1748 o)
    CU-DECISION-05.qmd  (2113 o)
    CU-EXPERT-01.qmd  (2461 o)
    CU-EXPERT-02.qmd  (2116 o)
    CU-EXPERT-03.qmd  (1823 o)
    CU-EXPERT-04.qmd  (2328 o)
    CU-PUBLIC-01.qmd  (1780 o)
    CU-PUBLIC-02.qmd  (2001 o)
    CU-PUBLIC-03.qmd  (1731 o)
    CU-PUBLIC-04.qmd  (1777 o)
    CU-PUBLIC-05.qmd  (1720 o)
    index.qmd  (10939 o)
  backlog.csv  (34196 o)
  dependances_us.qmd  (10606 o)
  index.docx  (209730 o)
  index.html  (5878536 o)
  index.pdf  (1676877 o)
  profils_utilisateurs.qmd  (17877 o)
figma-design/
  docs/
    help/
      00-bienvenue.md  (2697 o)
      01-premiers-pas.md  (2326 o)
      02-carte-territoires.md  (3987 o)
      03-indicateurs.md  (3528 o)
      04-tableau-de-bord.md  (1272 o)
      05-fiches-territoires.md  (1059 o)
      06-comparer-territoires.md  (900 o)
      07-donnees.md  (1428 o)
      08-suivi-et-tracabilite.md  (1340 o)
      09-administration-et-compte.md  (1422 o)
      10-export-partage.md  (1473 o)
      11-faq.md  (2939 o)
    specs/
      specifications_interfaces_ux_architecture.md  (26148 o)
      UX-header-sidebar.md  (4311 o)
analyse_architecture_donnees_geographique_decisionnelle.md  (29300 o)
```

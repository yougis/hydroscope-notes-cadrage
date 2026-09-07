# Suivi d'intégration des retours de Marjolaine David — CDC v1.1

Objet : synthèse exhaustive des ajustements réalisés à partir des relectures MD, avec pour chaque retour la décision appliquée et le commit résultant. Branche de travail : `revue-md-cdc-v1-1`.

Sources MD (toutes dans `releases/`, figées, lecture seule) :
- `cahier-des-charges-v1.1-MD.docx` — 20 commentaires + suivi de modifications (27 paragraphes : 40 insertions / 26 suppressions, auteure Marjolaine DAVID).
- `backlog-v1.1-MD-commentaires.xlsx` — 48 lignes commentées (colonne Commentaires).
- `backlog-v1.1-MD.xlsx` — 9 écarts vs `cahier des charges/backlog.xlsx`.

Décisions (5 états) : **intégré** / **adapté** / **@todo** (question renvoyée à la MOA, tracée en `@todo[priority,section]`) / **reporté** (Lot 2 / priorité basse) / **rejeté** (motif obligatoire).

## A. Commentaires DOCX (20)

| # | Id MD | Commentaire | Ancre DOCX | Cible qmd | Décision + motif | Commit |
|---|-------|-------------|------------|-----------|------------------|--------|
| A1 | 979569393 | « c'est pas plutôt API météo France ? » | Tableau sources, modalité GEOREP | `1_contexte_objectif.qmd` (tbl-sources générée depuis le fichier maître externe `fiche indicateur/fiches indicateurs.xlsx`) | adapté — vérifier la modalité d'accès des sources météo dans le maître, corriger en API si flux ; sinon @todo | |
| A2 | 47463100 | « ya aussi openmeteo » | idem | idem | @todo — évaluer l'ajout d'Open-Meteo comme source candidate dans le maître si pertinent | |
| A3 | 1294083187 | ICPE : base LOGIC PSUD vs Open Data | Tableau sources (ICPE) | idem | @todo — préciser distributeur (PSUD Open Data, base LOGIC sur convention ?) dans le maître ; la liste statique cite  DIMENC à retirer | |
| A4 | 1985713834 | « Tu mentionnes pas le COPRO ? » | § gouvernance, COPIL | `2_partie_prenantes_gouvernance.qmd:34` (COPRO présent, ainsi qu'au glossaire) | intégré — COPRO présent dans les sources (DOCX antérieur) ; corrigé le sigle COOPRO→COPRO en `17_planning_jalons.qmd:69` | |
| A5 | 239861025 | « répétition de la même définition » | Définition US-SC | `4_methodologie_agile.qmd:23-25` (US et US-SC partageaient le même libellé) | intégré — différencié le libellé US-SC (conditions de validation : tests, seuils, jeux de données) | |
| A6 | 1694054913 | « pb référence » (`@sec_backlog`) | § backlog | `4_methodologie_agile.qmd:40` | intégré — corriger en `@sec-backlog` (id réel `{#sec-backlog}`) + coquilles de la phrase | |
| A7 | 1027808996 | Enveloppe MVP figée / pioche Lot 2 / aléa / avenant : détailler les cas | § 5.8 Maîtrise des évolutions | `4_methodologie_agile.qmd:94` + `16_cadre_contractuel.qmd` | intégré — rédiger les cas de figure (relecture OEIL requise, cf. tâche 3.1) | |
| A8 | 1023013908 | « C'est celles qui seront dans le MVP ? » (US principales) | § backlog.xlsx | `4_methodologie_agile.qmd:111` | intégré — clarifier ce que recouvre « US principales » | |
| A9 | 1355744299 | « c'est quoi le scénario de test ? » | idem | idem + backlog | @todo — définir le contenu attendu (exemples de tests de cohérence) avec la MOA | |
| A10 | 1460746416 | « menaces » vs « pressions » (terme incorrect selon le PENV OEIL) | § 38 indicateurs | `5_presentation_indicateurs.qmd:3`, `5bis_profils_utilisateurs.qmd:12,38` (prose CDC uniquement — la famille taxonomique « Menace » du catalogue et les maquettes EPIC 5/ADI sont hors périmètre) | intégré — « pressions » dans le CDC | |
| A11 | 1870055478 | « pb référence » (même §, `(@sec-Annexes)`) | idem | `5_presentation_indicateurs.qmd:3` | intégré — aucun `{#sec-Annexes}` n'existe (annexes packées séparément, non incluses au rendu) : remplacé par un lien fichier direct vers le PDF du catalogue. On integre pas les annexes entiere dans le CDC (trop lourd) | |
| A12 | 587743481 | « pb ref » (fiches PDF en annexe) | § fiches indicateurs | `5_presentation_indicateurs.qmd:45` | intégré — même cause que A11 : lien fichier direct vers le PDF (inclusion des annexes testée puis abandonnée : chemins d'inclusion incohérents + contenu du pack modifié) | |
| A13 | 1003324664 | « Sous partie 7.1 ? » (numérotation « 8 Profil 1 ») | Profils utilisateurs | `5bis_profils_utilisateurs.qmd` | intégré — passer les Profils 1–5 en `###` (sous-parties) | |
| A14 | 591057693 | 2 profils admin alors que l'OEIL cumulera les deux ? | Profil 4/5 | `5bis_profils_utilisateurs.qmd:46-70` | à arbitrer MOA (tâche 3.2) — trancher 1 vs 2 profils avant d'appliquer | |
| A15 | 121183428 | « Pas structuré en sous parties comme les autres epics, normal ? » | EPIC 1 | `epics/epic-1-gestion-donnees.qmd` | intégré — harmoniser la structure avec les autres EPIC | |
| A16 | 2059218774 | « pb ref » (`(#sec-catalogage_donnees)`) | EPIC 1 bis | `6_perimetre_fonctionnel.qmd:9` | intégré — corriger en `{#sec-catalogage_donnees}` | |
| A17 | 2015163039 | « ce sera codé en dur, pas administré » | Objectif « construire et faire évoluer les outils d'aide à la décision » | `5bis_profils_utilisateurs.qmd:56` | intégré — reformuler (AMC/seuils/pondérations codés en dur) | |
| A18 | 176102727 | Import de fichiers → Lot 2 (structure inconnue, utile qu'en automatisation) | EPIC 1 import | `6_perimetre_fonctionnel.qmd` + backlog | intégré — bascule Lot 2 + reformulation « automatisation » | |
| A19 | 289829657 | « Pourquoi distinguer cet EPIC du précédent (API) ? » | EPIC 1 import vs API | `6_perimetre_fonctionnel.qmd` | à arbitrer (tâche 5.1) — fusionner ou justifier la distinction | |
| A20 | 566759447 | Simplifier journalisation / suivi ingestion (statut, perf, volumétrie) | EPIC 1 suivi imports | `6_perimetre_fonctionnel.qmd` | adapté — fusionner les points redondants | |

## B. Suivi de modifications DOCX (40 insertions / 26 suppressions, 27 paragraphes)

Toutes auteure Marjolaine DAVID. Toutes de niveau orthographe/grammaire/mise en forme → **intégré** en un lot (tâche 2.1), sauf mention contraire.

| Groupe | Paragraphes concernés | Nature | Décision |
|--------|----------------------|--------|----------|
| B1 | Dossier PEP (« qui », « e ce projet avec ») | Grammaire | intégré |
| B2 | Objectifs Connaissance/Diagnostic/Veille/Partage (espaces) | Typographie | intégré |
| B3 | « DIMENC » ajouté à GEOREP ; « Cadastre minier » (« C ») | Complément + coquille | partiellement — liste statique conforme (`1_contexte_objectif.qmd:78` cite DIMENC) ; la cellule du tableau est générée depuis le maître externe → @todo maître |
| B4 | « recherche », « prévus » | Accords | intégré |
| B5 | Paragraphe MVP/Lot 2 (« L'ensemble des fonctionnalités (MVP et fonctionnalités avancées)… adapté au fil du projet ») | Reformulation de fond mineure | rejeté — paragraphe absent des sources actuelles ; fond déjà couvert par « Périmètre contractuel de référence » et « Maîtrise des évolutions » (`4_methodologie_agile.qmd:81-101`) |
| B6 | « prestataire » (support de chiffrage) | Précision | intégré |
| B7 | « Le @sec_backlog détaille les UserStories… jusqu'à » (+ § A6) | Grammaire + ref | intégré |
| B8 | Sprints (puces conception/test/incrément) | Mise en forme | intégré |
| B9 | § backlog.xlsx (« è », « e ») | Accords | intégré |
| B10 | § profils (« s », « que ») | Accords | intégré |
| B11 | Objectifs P1/P3/P4 (« risques présents », « décisionnelles », etc.) | Accords | intégré |
| B12 | Référencement/métadonnées (« l ») | Coquille | intégré |

## C. Commentaires backlog (48 lignes, par EPIC)

| # | EPIC / US | Commentaire (résumé) | Décision + motif | Commit |
|---|-----------|----------------------|------------------|--------|
| C1 | EPIC 1 / import fichiers | Structure inconnue, utile qu'en automatisation → Lot 2 | intégré — bascule Lot 2 (cf. A18) | |
| C2 | EPIC 1 / API | « c'est notre back qui appelle ; à virer ou backend si redondant » | adapté — qualifier backend, vérifier redondance | |
| C3 | EPIC 1 / libellé | « Intégration plutôt que import » | intégré — harmoniser le vocabulaire | |
| C4 | EPIC 1bis / US1bis.4-6 | Catalogue en 2 options : (1) Lot 1 vue fiche simple, (2) Lot 2 catalogue filtrable | intégré — rédiger les 2 options | |
| C5 | EPIC 1bis / données brutes | Mentionner aussi les données « brutes » sources |  conforme — `epic-1bis-catalogue.qmd:3` couvre sources + dérivées | |
| C6 | EPIC 1bis / libellé | « lors des intégrations de données » | intégré — reformuler | |
| C7 | EPIC 1bis / traçabilité exécutions | « relier indicateurs à une exécution ? » | @todo — clarifier le besoin avec la MOA | |
| C8 | EPIC 1bis / métadonnées | Regrouper avec « consulter les métadonnées » | adapté — fusionner | |
| C9 | EPIC 1bis / structure | « Sans modifier la structure de quoi ? De la bdd ? » | @todo — préciser avec la MOA | |
| C10 | EPIC 2 / US2.1-2.3 | « T'as des exemples de tests de cohérence ? c'est vague » | @todo — fournir des exemples | |
| C11 | EPIC 2 / complétude | « Taux de complétude sur le territoire de la NC ? » | adapté — préciser le périmètre | |
| C12 | EPIC 2 / US2.5-2.6 | Qualité en MVP alors que certaines données (ex. Dynamic World) ne seront pas qualifiées en V1 | adapté — nuancer : signaler les données non qualifiées en V1 | |
| C13 | EPIC 2 / Lot 2 | « Ok à garder en lot 2 mais pas une priorité » | reporté — Lot 2, priorité basse | |
| C14 | EPIC 3 / US3.1-3.4 | « Qu'entends-tu par gérer ? » + H3 en Lot 2 | intégré (H3 → Lot 2) + adapté (fusion gestion référentiels) | |
| C15 | EPIC 3 / calculable | « Tous précalculés non ? Création d'indicateurs via front ? » | rejeté (création front) — indicateurs codés en dur ; reformuler « définir » | |
| C16 | EPIC 3 / périmètre | « Pourquoi dans l'EPIC référentiels ? » |  conforme — section « Référentiel des utilisateurs et des rôles » : les profils sont gérés comme un référentiel | |
| C17 | EPIC 4 / échelles | « et des PPE et captages » | intégré — compléter les échelles | |
| C18 | EPIC 4 / params | Regrouper avec US4.1 « calcul paramétrable » | adapté — fusionner | |
| C19 | EPIC 4 / filtres front | « Pré-calcul, pas de filtre via le front. À retirer ? » | intégré — retirer le paramétrage front | |
| C20 | EPIC 4 / calculer-recalculer | « Vraiment 2 fonctionnalités à distinguer ? » | adapté — fusionner si redondant | |
| C21 | EPIC 5 / composite | « Codé en dur, pas dans le front. À virer ? » | intégré — retirer la définition front | |
| C22 | EPIC 5 / échelles | « à l'échelle d'un indicateur et d'une famille » | intégré — préciser | |
| C23 | EPIC 5 / tester-définir | « je vois pas la nuance » | intégré — US5.2 recentrée « choisir un jeu de pondérations » vs US5.3 « tester des scénarios » | |
| C24 | EPIC 5 / scénarios | « on a aussi parlé d'enregistrer et partager des scénarios » | intégré — US5.4 « Comparer et partager des scénarios » | |
| C25 | EPIC 5 / classement | Pas de score de criticité mais un classement (mail 14/08/2026) | intégré — aligner sur classement/priorisation | |
| C26 | EPIC 5 / pondérations | Détailler : pondérations dans l'export, fiche méthodo obligatoire par jeu partageable (mail 14/08) | intégré — détailler | |
| C27 | EPIC 6 / redondance | « Beaucoup de redondance, regrouper avec les 2 suivantes » | adapté — fusionner (validation MOA) | |
| C28 | EPIC 6 / agrégés | « selon des indicateurs agrégés » | intégré — préciser | |
| C29 | EPIC 6 / profil | « en tant qu'expert métier non ? » | adapté — corriger le profil | |
| C30 | EPIC 6 / détail | « à regrouper avec une US au dessus, c'est du détail » | adapté — fusionner | |
| C31 | EPIC 6 / profil+PPE | « expert métier plutôt ? + sélection PPE » | adapté — corriger + compléter | |
| C32 | EPIC 6 / facettes | Scinder : facette auto (utilisateur/décideur) vs intersections référentiels (admin data) ; virer la suivante | intégré — scinder en 2 US (proposition MD reprise) | |
| C33 | EPIC 6 / profil | « expert métier » | adapté — corriger le profil | |
| C34 | EPIC 6 / profil (US6.23) | « expert métier (+décideur ?) » | adapté — profil Expert appliqué ; « +décideur ? » restant à confirmer avec la MOA | |
| C35 | EPIC 6 / ergo | « Choix ergo UX pas une fonctionnalité, redondant » | conservée — bascule de vues = fonction de navigation (pas seulement ergo) ; libellé US6.24 inchangé | |
| C36 | EPIC 6 / volet droit | Reformuler en sélection d'indicateurs par famille (3W proposé) | intégré — reformuler (proposition MD reprise) | |
| C37 | EPIC 8 / exports (US8.1/US8.2) | « Expert métier ; CSV et SIG à regrouper » | tranché — regroupement CSV/SIG en proposition P7 ; profils conservés admin (arbitrage 3.2 option A) | |
| C38 | EPIC 8 / profil | « expert métier » | conservé admin — arbitrage 3.2 option A (exports côté Administrateur expert data) | |
| C39 | EPIC 8 / profil | « expert métier » | conservé admin — arbitrage 3.2 option A | |
| C40 | EPIC 8 / format | « préciser le format ? redondant avec le rapport PDF ? » | conforme — formats précisés `epic-8-export-diffusion.qmd:11-22`, rapport PDF = US8.3 distincte | |
| C41 | EPIC 9 / MVP | « c'est normal que MVP soit à False ? » | @todo — vérifier avec la MOA | |
| C42 | EPIC 9 / redondance | « redondance avec US 3.6 » | adapté — fusionner | |
| C43 | EPIC 9 / droits | Scinder vue/fonctionnalités vs données (2 US proposées : restreindre fonctions front MVP=true ; filtrer jeux sensibles back MVP=false) | intégré — scinder (proposition MD reprise) | |
| C44 | EPIC 10 / remaniement | Remanier US1bis.8/9.6/10.1-10.4/10.6 en 2-3 US (3 propositions : suivi pipelines, audit sécurité, versioning métier) | intégré — remanier (propositions MD reprises) | |
| C45 | EPIC 10 / recalculer-tracer | « quel genre de calcul ? redondant avec d'autres US » | adapté — fusionner + préciser (indicateur vs AMC) | |
| C46 | EPIC 7 / alertes | Fusionner 7.4+7.2 (seuils/changements) + alertes nouveautés | proposition P11 (nouveaux IDs requis, validation MOA) — voir ci-dessous | |
| P11 | US7.2 + US7.4 + nouveautés (cf. C46) | Fusion alertes seuils/changements + alertes nouveautés (intégrations, fonctionnalités) | proposition — fusionner en une US « être alerté » à 3 volets, sans renumérotation avant validation MOA | |
| C47 | EPIC 7 / vocabulaire | « selon un classement multicritère » | intégré — aligner sur classement | |
| C48 | EPIC 7 / contribution | « c'est quoi ? » (contribution au score de criticité) | intégré — reformuler en contribution au classement | |

## D. Écarts backlog MD vs base (9)

À reprendre tels quels dans `cahier des charges/backlog.xlsx` (tâche 4.1), en commit tracé MD.

| # | US | Champ | Base → MD | Décision | Commit |
|---|----|-------|-----------|----------|--------|
| D1 | US1bis.13 | Dépend de | `US1bis.1` → vide | intégré | d24c69c |
| D2 | US1bis.4 | Dépend de | `US1bis.6` → vide | intégré | d24c69c |
| D3 | US2.5 | Dépend de | liste → vide | intégré | d24c69c |
| D4 | US2.6 | Dépend de | `US2.5` → vide | intégré | d24c69c |
| D5 | US4.1 | Dépend de | `US3.5 ; US1bis.12` → `US3.5 ; US4.7 ; US1bis.12` | intégré | d24c69c |
| D6 | US8.1 | EPIC / Profil | `Export & diffusion` → `Export` ; Expert métier → Administrateur expert data | intégré (profil : voir arbitrage C37/tâche 3.2 pour les exports restants) | d24c69c |
| D7 | US8.2 | EPIC / Profil / 3W | idem + 3W réécrite côté admin | intégré | d24c69c |
| D8 | US8.4 | EPIC / Profil | idem D6 | intégré | d24c69c |
| D9 | US8.6 | EPIC / Profil / 3W | idem + 3W réécrite côté admin | intégré | d24c69c |

## Points d'arbitrage MOA en suspens

- Enveloppe MVP/aléa/avenant (A7, tâche 3.1) — relecture OEIL requise.
- 1 vs 2 profils admin (A14, C37–C39 vs D6–D9, tâches 3.2/4.1) — trancher avant d'uniformiser les exports.
- Fusion EPIC import/API (A19) et fusions d'US redondantes (C27, C30, C42, C45, tâche 5.1) — valider avant renumérotation.

## Propositions de fusion/scission (tâche 5.1) — validation MOA requise, sans renumérotation

| # | Périmètre (IDs sources) | Motif | Proposition |
|---|------------------------|-------|-------------|
| P1 | US1bis.13 + US1bis.12 (« Enregistrer un indicateur comme donnée dérivée » / métadonnées jeu de données, cf. C8) | Même fonctionnalité de consultation des métadonnées une fois tout catalogué | Fusionner en une US « consulter les métadonnées (jeu ou indicateur) » |
| P2 | US4.4 (« Paramétrer un calcul ») + US4.1 (« Calculer des indicateurs simples », cf. C18) | Pas de paramètres propres par source de données | Fusionner dans US4.1, paramètres éventuels en critères d'acceptation |
| P3 | US4.1 (« Calculer ») + US4.7 (« Recalculer un indicateur », cf. C20) | Recalculer = ré-exécuter le même calcul (correction de données, nouvelle version) | Fusionner : « calculer / recalculer » en une US avec critère de rejouabilité |
| P4 | US6.1 + US6.2 + US6.3 (carte / indicateurs carto / navigation, cf. C27) | Trois facettes d'une même vue cartographique de base | Fusionner en une US « visualiser et naviguer sur carte » |
| P5 | US6.14 + US6.13 (facettes/preset, cf. C30) | Détail de manipulation des facettes | Absorber US6.14 en critère d'acceptation de la gestion des facettes |
| P6 | US9.3 (« Rôles simples », MVP) vs US3.6 (« Gérer les profils utilisateurs », Lot 2, cf. C42) | Recouvrement gestion des rôles/profils | Fusionner ou expliciter la frontière (rôles applicatifs vs profils référentiels) |
| P7 | US8.1 (CSV) + US8.2 (SIG, cf. C37) | Même geste d'export, seul le format change | Fusionner en « exporter (CSV, SIG) » avec formats en critères d'acceptation |
| P8 | US10.1/10.2/10.3/10.4/10.6 + US1bis.8 + US9.6 (cf. C44) | Journalisation pipeline / audit sécurité / versioning métier mélangés | Remanier en 3 US selon la proposition MD (Suivi des Pipelines / Audit de Sécurité / Versioning Métier) |
| P9 | US10.5 (« Reconstituer calcul ») + US4.7 + US10.2 (cf. C45) | Tracer vs reconstituer vs recalculer : trois faces d'une même traçabilité des calculs | Fusionner en précisant le type de calcul (indicateur vs AMC) |
| P10 | EPIC 1 « Import fichiers & API » vs « Connexion sources web » (cf. A19) | Distinction de canaux pour une même fonction d'intégration | Fusionner en « Intégration des données (fichiers & API) » ou justifier la distinction (temps réel vs batch) |

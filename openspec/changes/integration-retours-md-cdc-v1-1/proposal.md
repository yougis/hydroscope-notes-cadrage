## Why

Le CDC v1.1 a été relu par Marjolaine David (`releases/cahier-des-charges-v1.1-MD.docx` : 20 commentaires, ~40 insertions / 26 suppressions suivies ; `releases/backlog-v1.1-MD-commentaires.xlsx` : ~70 lignes commentées ; `releases/backlog-v1.1-MD.xlsx` : 9 écarts vs `cahier des charges/backlog.xlsx`). Sans tri, ces retours restent dans `releases/` (figé) et ne sont ni arbitrés ni tracés. Il faut analyser leur pertinence métier (piliers 2 Diagnostic et 4 Partage surtout) et les intégrer aux sources Quarto/xlsx avec un commit précisant l'origine « Proposé par Marjolaine David ».

## What Changes

- Triage exhaustif des 20 commentaires DOCX + insertions/suppressions en 4 classes : intégrer direct (orthographe, clarifications ICPE/LOGIC-PSUD, COPRO, terminologie menaces/pressions, références cassées), à arbitrer MOA (MVP vs Lot 2, import fichiers en Lot 2, profils admin data vs admin plateforme, regroupements d'US redondantes, classement multicritère vs score — cf. mail 14/08/2026), à transformer en `@todo` (scénario de test, périmètre MVP, sous-partie 7.1, structuration EPIC), à rejeter avec motif.
- Triage des ~70 commentaires backlog (ex. US catalogue 1bis.4/5/6 en 2 options, H3 en Lot 2, pré-calcul indicateurs codé en dur, pondérations + fiche méthodo obligatoires) et des 9 diffs MD (dependances vidées, EPIC 8 renommé « Export », exports SIG/vue simple re-attribués à Administrateur expert data).
- Intégration aux seules sources : `cahier des charges/*.qmd`, `epics/*.qmd`, `specifications/*.qmd`, `backlog.xlsx` (+ `Besoins testables` si touché). `releases/` reste intact.
- Chaque commit Git précise l'origine : `Proposé par Marjolaine David — <fichier MD> — <id commentaire / US>` et la décision (intégré / adapté / reporté / rejeté + motif).
- Production d'un fichier de synthèse exhaustif versionné (`cahier des charges/suivi-retours-MD.md`, au même niveau — ni dans `annexes/` dont les qmd sont inclus au rendu CDC, ni dans `releases/` figé), avec une ligne par retour MD : commentaire source → cible qmd/US → décision 5 états → commit résultant.

## Capabilities

### New Capabilities
- `revue-cdc-md`: règles de triage, d'intégration et de traçabilité des retours MD sur CDC v1.1 et backlog (classes de décision, format de commit, non-régression Quarto).

### Modified Capabilities
<!-- Aucune spec existante sous openspec/specs/ — change documentaire pur, pas de comportement système modifié. -->

## Impact

- Fichiers touchés : sources `cahier des charges/` (qmd + `backlog.xlsx` + `suivi-retours-MD.md`), jamais `releases/`. Re-rendu `quarto render` ciblé, `{#todo-list}` mise à jour.
- Travail sur branche dédiée `revue-md-cdc-v1-1` créée depuis `main` ; `main` reste intacte jusqu'à validation/merge final.
- Référentiels : backlog (MVP/Lot 2, profils, dépendances), EPIC 1/2/3/4/5/6/8/9/10, specs AMC/ADI, CU.
- Hors périmètre : aucune modification de `_lib_indicateurs.py`, filtres Lua, `_quarto.yml`, ni code applicatif HydroScope.

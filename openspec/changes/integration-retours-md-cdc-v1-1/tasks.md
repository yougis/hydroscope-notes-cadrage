## 0. Branche de travail

- [x] 0.1 Créer la branche `revue-md-cdc-v1-1` depuis `main` à jour et y basculer avant tout edit, et vérifier par `git branch --show-current` et `git status` qu'aucune modification n'existe sur `main`
- [x] 0.2 Pousser la branche avec `-u` après le premier commit et vérifier que `main` reste intacte (`git status --short --branch` sans écriture sur main)

## 1. Triage et audit (lecture seule)

- [x] 1.1 Extraire les 20 commentaires + insertions/suppressions de `releases/cahier-des-charges-v1.1-MD.docx` vers une matrice de triage (id MD → cible qmd → décision 5 états) et vérifier que les 20 ids y figurent sans écrire aucun qmd
- [x] 1.2 Classer les ~70 lignes commentées de `releases/backlog-v1.1-MD-commentaires.xlsx` + les 9 diffs de `releases/backlog-v1.1-MD.xlsx` par EPIC avec décision et origine, et vérifier la couverture EPIC 1/2/3/4/5/6/8/9/10 par relecture croisée
- [x] 1.3 Initialiser `cahier des charges/suivi-retours-MD.md` (une ligne par retour : source MD | cible qmd/US | décision + motif | commit — colonne commit vide à ce stade) et vérifier la couverture 20 + ~70 + 9 par confrontation aux sources MD

## 2. Corrections directes CDC

- [x] 2.1 Intégrer orthographe/grammaire (insertions MD), mentions DIMENC/COPRO, clarification ICPE/LOGIC-PSUD, terminologie « pressions », répétitions et 4 `pb ref` dans les qmd cibles en un commit atomique citant l'origine MD, et vérifier par `quarto render` ciblé sans avertissement de référence
- [x] 2.2 Convertir les questions MD sans réponse (scénario de test, « celles du MVP ? », sous-partie 7.1, structuration EPIC) en `@todo[priority,section]` et vérifier que `{#todo-list}` les liste après rendu

## 3. Cadre contractuel MVP / Lot 2

- [x] 3.1 Rédiger dans le qmd contractuel les cas enveloppe MVP figée / pioche Lot 2 / aléa / avenant (demande commentaire 16:02) avec traçabilité MD, et vérifier la relecture OEIL avant de poursuivre
- [x] 3.2 Trancher avec la MOA admin data vs admin plateforme (OEIL cumule) et l'appliquer aux CU/profils en commit tracé MD, et vérifier l'absence de profil orphelin par recherche des occurrences

## 4. Backlog.xlsx

- [x] 4.1 Appliquer via script openpyxl rejouable les 9 diffs (dépendances vidées sauf US4.1, EPIC 8 « Export », exports vers Administrateur expert data) + bascules MVP/Lot 2 (import fichiers, H3, catalogue avancé) en commit tracé MD, et vérifier par diff clamé à 9 écarts attendus et colonnes MVP renseignées
- [x] 4.2 Mettre à jour les libellés/parents impactés (US8.x profils, US4.1 dépendance US4.7, US1bis.4/13, US2.5/2.6) avec table de correspondance ancien/nouvel ID dans le message de commit, et vérifier qu'aucune dépendance ne pointe vers un ID inexistant

## 5. Regroupements et AMC

- [x] 5.1 Proposer les fusions d'US redondantes (journalisation/ingestion, calcul/recalcul, catalogue/métadonnées, droits/données, EPIC 10 traçabilité en 2-3 US) sans renuméroter sans validation MOA, et vérifier chaque fusion par motif écrit + IDs sources cités
- [x] 5.2 Aligner les specs AMC sur classement (pas de score), pondérations de référence + fiche méthodo obligatoire, calculs codés en dur (mail 14/08/2026), et vérifier par relecture des sections AMC/ADI et du backlog EPIC 5
- [x] 5.3 Après chaque lot (2.x–5.x), renseigner la colonne commit de `suivi-retours-MD.md` avec les SHA correspondants en commit dédié, et vérifier par échantillonnage que chaque SHA existe et que sa décision correspond à la ligne

## 6. Vérification finale

- [x] 6.1 Rendre l'ensemble du CDC (`quarto render` du projet ou documents touchés), mettre à jour l'historique de version et `{#todo-list}`, et vérifier zéro référence cassée et rendus html/pdf/docx OK
- [x] 6.2 Relire `suivi-retours-MD.md` comme preuve d'exhaustivité (chaque retour source a une ligne avec décision + SHA valide) et vérifier par confrontation finale aux 20 commentaires, ~70 lignes backlog et 9 diffs
- [x] 6.3 Lancer `openspec validate "integration-retours-md-cdc-v1-1" --strict` et `git log` de contrôle sur la branche (chaque commit cite « Proposé par Marjolaine David » + décision), pousser la branche et ouvrir le merge/PR vers `main`, et vérifier validation verte, aucun fichier `releases/` modifié et `main` intacte jusqu'au merge

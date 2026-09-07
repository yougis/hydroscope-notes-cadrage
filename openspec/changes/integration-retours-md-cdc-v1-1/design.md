## Context

Voir `proposal.md` (Why). État actuel : sources CDC en `cahier des charges/*.qmd` + `backlog.xlsx` (100 lignes, onglets Backlog / Besoins testables) ; retours MD isolés dans `releases/` (docx avec commentaires + suivi de modifications, xlsx avec colonne Commentaires + 9 diffs). Branche courante `main` avec le change non commité. Contraintes : `releases/` intouchable, fabrique Quarto fragile aux références (`pb ref` x4), backlog = base contractuelle MVP, commits Git = seule traçabilité d'origine exigée.

## Goals / Non-Goals

**Goals:**
- Matrice de triage complète et auditable avant toute écriture qmd/xlsx.
- Commits atomiques par EPIC avec origine MD citée.
- Fichier de synthèse exhaustif reliant chaque retour à sa décision et son commit.
- Travail sur branche dédiée, `main` intacte jusqu'à validation.
- Rendu Quarto vert + todo-list cohérente en fin de lot.

**Non-Goals:**
- Pas de refonte AMC/méthodo au-delà du cadrage mail 14/08/2026.
- Pas de migration outillage (Quarto, openpyxl, Git) ni touche à `_lib_indicateurs.py` / filtres Lua.
- Pas de régénération des PDF/DOCX de `releases/`.

## Decisions

- **Branche dédiée `revue-md-cdc-v1-1`** créée depuis `main` à jour avant tout edit ; tous les commits d'intégration et la synthèse y sont poussés, merge/PR vers `main` uniquement après validation finale. Rationale : la base contractuelle (CDC + backlog) ne doit pas être altérée à moitié en cas d'arbitrage MOA divergent ; le revert global reste un simple abandon de branche. Alternative « commits directs sur main » rejetée (risque d'état intermédiaire incohérent, revert chirurgical coûteux).
- **Extraction d'abord, écriture ensuite** : parser `word/comments.xml` + `w:ins/w:del` et la colonne Commentaires du xlsx vers une matrice de triage (id MD → cible qmd/US → décision). Rationale : évite d'écrire puis revert ; alternative « édition directe au fil de Word » rejetée (perte de traçabilité, écrasement releases).
- **Fichier de synthèse `cahier des charges/suivi-retours-MD.md`** (tableau : source MD | cible | décision + motif | commit SHA), initialisé après triage puis colonne commit alimentée après chaque lot. Rationale : preuve d'exhaustivité relisible par l'OEIL et porte d'entrée vers `git log` ; placé hors `annexes/` (incluses au rendu) et hors `releases/` (figé). Alternative « synthèse inline dans le CDC » rejetée (bruit lecteur dans un document contractuel).
- **Décision en 5 états** (intégré / adapté / @todo / reporté Lot 2 / rejeté + motif) plutôt que binaire : les commentaires MD mélangent fautes, questions MOA et désaccords structurants (ex. enveloppe MVP/aléa/avenant, admin data vs plateforme). Alternative binaire rejetée : aurait forcé des intégrations prématurées.
- **Backlog.xlsx édité via script openpyxl + revue manuelle**, pas à la main sous Excel : les 9 diffs (dépendances, EPIC 8, profils exports) et les bascules MVP/Lot 2 doivent être rejouables et diffables. Alternative 100 % manuelle rejetée : risque d'écarts silencieux sur 100 lignes.
- **Commits atomiques par EPIC** avec gabarit `CDC/MD: <EPIC/US> — <décision> — Proposé par Marjolaine David (<fichier>:<id>)` : répond à l'exigence de traçabilité sans polluer le texte qmd de mentions d'auteur. Alternative « mention MD inline dans le qmd » rejetée (bruit lecteur, non conventionnel).
- **Regroupements d'US proposés, pas imposés** : MD signale des redondances (EPIC 5/6/8/9/10, journalisation, calcul/recalcul) ; on propose les fusions en tasks avec validation MOA car renumérotation = impact contractuel.

## Risks / Trade-offs

- [Renumérotation backlog casse les dépendances] → ne renuméroter qu'après validation MOA, garder table de correspondance ancien/nouvel ID dans le message de commit.
- [Divergence interprétation MVP/aléa/avenant] → figer le texte contractuel proposé en task dédiée et le faire relire OEIL avant autres edits (risque blocant).
- [Références Quarto cassées en cascade] → réparer les 4 `pb ref` en premier lot + render ciblé après chaque lot.
- [Sur-intégration (tout accepter)] → règle : toute bascule MVP↔Lot 2 ou suppression d'US exige motif + validation, sinon @todo.
- [Branche qui dérive de main] → rebaser ou fusionner `main` avant le merge final et re-rendre le CDC après l'opération.

## Migration Plan

0. Créer `revue-md-cdc-v1-1` depuis `main` à jour ; y basculer avant tout edit.
1. Matrice de triage (lecture seule, aucun qmd touché) + initialisation de `suivi-retours-MD.md` (colonne commit vide).
2. Lots de commits atomiques sur la branche : (a) orthographe/refs/terminologie, (b) cadre contractuel MVP, (c) backlog MVP/Lot 2 + profils + dépendances, (d) regroupements EPIC + AMC/classement, (e) @todo résiduels — alimenter la colonne commit de la synthèse après chaque lot.
3. `quarto render` ciblé après chaque lot ; rollback = revert du commit atomique (pas de squash avant validation finale).
4. Relire la synthèse comme preuve d'exhaustivité, pousser la branche, merge/PR vers `main` après validation OEIL.
5. Validation : `openspec validate "integration-retours-md-cdc-v1-1" --strict`.

## Open Questions

- Enveloppe MVP/Lot 1 figée mais contenu évolutif : confirmer le mécanisme aléa/avenant avec l'OEIL avant de figer la section contractuelle ?
- Faut-il vraiment 2 profils admin (data vs plateforme) si l'OEIL cumule les deux, ou un seul profil avec droits cumulés ?
- EPIC import fichiers vs EPIC API : fusionner comme MD le suggère, ou garder la distinction automatisation/temps réel ?

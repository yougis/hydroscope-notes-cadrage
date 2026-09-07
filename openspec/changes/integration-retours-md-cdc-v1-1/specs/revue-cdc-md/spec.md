## Purpose

Encadrer le tri, l'arbitrage et l'intégration tracée des retours de Marjolaine David sur le CDC v1.1 et le backlog, sans toucher aux fichiers figés de releases/.

## ADDED Requirements

### Requirement: Triage exhaustif avec origine tracée
Chaque retour MD (20 commentaires DOCX, insertions/suppressions suivies, ~70 lignes backlog commentées, 9 diffs backlog MD) SHALL être classé en intégré / adapté / converti en @todo / reporté / rejeté avec motif, et chaque intégration SHALL citer son origine « Proposé par Marjolaine David — <fichier> — <id commentaire / US> » dans le message de commit et, si visible, dans l'historique de version du qmd.

#### Scenario: Couverture complète du tri
- **WHEN** on relit la matrice de triage à la fin de la revue
- **THEN** les 20 commentaires DOCX, les insertions/suppressions et les ~70 lignes backlog ont chacun une décision, et aucun retour n'est perdu ni intégré sans origine citée

#### Scenario: Commit traçable
- **WHEN** on consulte `git log` d'un commit d'intégration
- **THEN** le message contient l'origine MD (fichier + identifiant) et la décision, permettant de remonter au commentaire source

### Requirement: Intégration aux seules sources, releases intactes
Le système documentaire SHALL n'écrire que dans `cahier des charges/*.qmd`, `epics/`, `specifications/`, `backlog.xlsx` (et `index.qmd` pour versions) ; `releases/*MD*` et les PDF/DOCX figés SHALL rester inchangés et servir uniquement de référence d'audit.

#### Scenario: Non-altération des figés
- **WHEN** on compare `git status` après intégration
- **THEN** aucun fichier sous `releases/` n'est modifié, seules les sources qmd/xlsx et les artefacts OpenSpec du change apparaissent

### Requirement: Règles métier MD arbitrées (MVP, profils, terminologie, AMC)
Les intégrations SHALL respecter : terminologie « pressions » (pas « menaces ») ; méthode AMC = classement/priorisation avec pondérations de référence + fiche méthodo (mail 14/08/2026), calculs et indice composite codés en dur sans paramétrage front ; import de fichiers en Lot 2 (structure partenaires inconnue) ; maillage H3 en Lot 2 ; catalogue métadonnées en 2 options (Lot 1 fiche simple / Lot 2 catalogue filtrable) ; exports SIG/vue simple attribués à Administrateur expert data ; EPIC 8 renommé « Export » ; dépendances US nettoyées ; redondances EPIC 1/2/3/5/6/8/9/10 regroupées ou explicitées ; distinction admin data / admin plateforme tranchée (OEIL cumule les 2 profils sauf décision contraire).

#### Scenario: Terminologie et AMC conformes
- **WHEN** on relit les sections indicateurs et AMC après intégration
- **THEN** le terme « menaces » a disparu au profit de « pressions », et l'AMC parle de classement avec jeux de pondérations + fiche méthodo, sans score de criticité ni création d'indicateurs via front

#### Scenario: MVP vs Lot 2 explicite
- **WHEN** on contrôle `backlog.xlsx` (colonne MVP) et la section cadre contractuel du CDC
- **THEN** import fichiers, H3, catalogue avancé et US redondantes sont positionnés MVP/Lot 2 comme arbitré, et les cas enveloppe MVP figée / pioche Lot 2 / aléa / avenant sont documentés (demande du commentaire 16:02)

### Requirement: Non-régression de la fabrique Quarto
Après chaque lot d'intégration, `quarto render` ciblé du document touché SHALL réussir, la `{#todo-list}` SHALL refléter les @todo créés/résolus (scénario de test, périmètre MVP, sous-partie 7.1, structuration EPIC), et les références croisées signalées « pb ref » SHALL être réparées sans nouvelle référence cassée.

#### Scenario: Rendu et références saines
- **WHEN** on rend le CDC après intégration et on contrôle les avertissements Quarto
- **THEN** le rendu réussit et le nombre de références cassées est nul (vs 4+ signalées par MD), avec la todo-list à jour

### Requirement: Synthèse exhaustive des ajustements
Un fichier de synthèse versionné (`cahier des charges/suivi-retours-MD.md`) SHALL consigner une ligne par retour MD : commentaire source (fichier + identifiant) → cible qmd/US → décision 5 états avec motif → référence du commit résultant (SHA). Il SHALL être complété au fil des lots et relu comme preuve d'exhaustivité en fin de revue.

#### Scenario: Couverture ligne par ligne
- **WHEN** on confronte le fichier de synthèse aux sources MD (20 commentaires DOCX, ~70 lignes backlog, 9 diffs)
- **THEN** chaque retour source a exactement une ligne avec décision renseignée, sans oubli ni doublon

#### Scenario: Décision reliée au commit
- **WHEN** on suit une ligne de la synthèse vers le dépôt
- **THEN** le SHA cité existe, son message cite l'origine MD et sa décision correspond à celle de la ligne

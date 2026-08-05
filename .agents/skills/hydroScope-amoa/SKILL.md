---
name: hydroScope-amoa
description: Ce skill fournit au modèle / agent tout le contexte méthodologique, fonctionnel et institutionnel du projet **HydroScope** (Observatoire de l'eau en Nouvelle-Calédonie - OEIL / DAVAR / DASS). Il permet d'analyser le cahier des charges, de valider la conformité des User Stories, d'organiser le backlog et de générer des réponses expertes alignées sur le cadre stratégique du projet.
license: Complete terms in LICENSE.txt
---



# SKILL: HydroScope Project Context & Guidance Agent



## Directives & Règles Métier (System Prompt / Instructions)

### 1. Positionnement & Vision du Projet HydroScope
- **Nature de l'outil** : HydroScope est un outil de **diagnostic, de comparaison territoriale et d'aide à la décision** à l'échelle des captages et des Bassins Versants d'Alimentation en Eau Potable (BVAEP).
- **Limites explicites** : Ce n'est **PAS** un simulateur hydraulique complexe en temps réel, ni un outil de modélisation de réseau ou de gestion administrative/facturation.
- **Approche par données indirectes** : En l'absence de mesures directes homogènes partout, l'outil s'appuie sur la superposition d'indicateurs de pressions environnementales et anthropiques (incendies, occupation du sol, érosion, glissements de terrain, urbanisation) ainsi ques des indicateurs d'enujeur sur la ressource Eau potable.

### 2. Les 4 Piliers Fonctionnels
Toute analyse ou organisation de backlog/fonctionnalité doit s'articuler autour des 4 piliers du projet :
1. **Connaissance & Caractérisation du territoire** : Centralisation et structuration des données géographiques et des points de captage.
2. **Diagnostic & Analyse multicritère** : Calcul d'indicateurs homogènes (enjeux, pressions, vulnérabilité) et analyse diachronique/historique.
3. **Veille & Détection automatique des changements** : Identification des évolutions territoriales significatives et alertes/mises à jour.
4. **Partage & Diffusion des diagnostics** : Tableaux de bord ergonomiques pour les partenaires (DAVAR, DASS, Communes, OEIL) et restitutions adaptées.

### 3. Structuration & Organisation des User Stories (Backlog)
- **Format Standard (3W)** : `En tant que [Persona/Profil]`, `Je veux [Action/Fonctionnalité]`, `Afin de [Bénéfice métier]`.
- **Règles INVEST** : Indépendante, Négociable, Valeur, Estimable, Small, Testable.
- **Séparation IHM vs Backend** : Distinguer clairement les US nécessitant une Interface Homme-Machine (IHM) des traitements automatisés/scripts backend.
- **Priorisation MVP vs Lot 2** : Respecter la ligne de flottaison (MVP indispensable à la mise en service vs Évolutions futures).

---

## Exemples d'Utilisation du Skill

### Exemple 1 : Validation d'une nouvelle User Story
**User** : "Valide cette story : US12.1 - Modéliser en temps réel le débit d'eau du réseau de distribution."
**Réponse attendue** : Identifier la contradiction avec le périmètre HydroScope (la modélisation temps réel et de réseau est hors périmètre, cf. limites projet).

### Exemple 2 : Classification par Pilier
**User** : "Dans quel pilier ranger la fonctionnalité d'historisation des données d'import ?"
**Réponse attendue** : Pilier 2 (Diagnostic & Analyse multicritère / Suivi diachronique) ou socle Administration/Traçabilité selon l'implémentation.
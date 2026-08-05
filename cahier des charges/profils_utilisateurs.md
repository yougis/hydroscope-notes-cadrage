# Profils utilisateurs HydroScope

## Profil 1 : Administrateur plateforme

**Description** — Agent technique (OEIL) responsable de l'exploitation, de la sécurité et de la maintenance de la plateforme HydroScope. Gère les comptes utilisateurs, les droits d'accès, les paramètres système et l'audit des usages. 

**Objectifs** :

1. Sécuriser les accès et garantir la conformité RGPD
2. Maintenir la disponibilité et les performances du système
3. Paramétrer les profils utilisateurs et les droits d'accès
4. Assurer la traçabilité complète des opérations
5. Suivre les usages pour adapter la plateforme aux besoins


| # | Cas d'usage | US | Phrase agile |
|---|---|---|---|
| CU-ADMIN-01 | Créer un compte utilisateur et lui attribuer un profil | US9.1 | En tant qu'administrateur plateforme, je veux créer un compte utilisateur et lui attribuer un profil afin que chaque acteur puisse accéder à la plateforme avec les droits appropriés. |
| CU-ADMIN-02 | Configurer les rôles et les droits d'accès par profil | US9.3 | En tant qu'administrateur plateforme, je veux configurer les rôles et les droits d'accès par profil afin de garantir que chaque utilisateur ne dispose que des fonctionnalités nécessaires à son rôle. |
| CU-ADMIN-03 | Restreindre l'accès à certaines données sensibles selon le profil | US9.4 | En tant qu'administrateur plateforme, je veux restreindre l'accès aux données sensibles selon le profil afin de protéger les informations réglementées. |
| CU-ADMIN-04 | Consulter le journal des actions et détecter des anomalies | US10.3 | En tant qu'administrateur plateforme, je veux consulter le journal des actions afin de détecter des comportements anormaux et assurer la sécurité du système. |
| CU-ADMIN-05 | Lancer un audit d'usage pour adapter la plateforme aux besoins | US10.6 | En tant qu'administrateur plateforme, je veux lancer un audit d'usage afin d'identifier les fonctionnalités les plus utilisées et adapter la plateforme aux besoins réels. |

---

## Profil 2 : Administrateur expert data

**Description** — Administrateur des données responsable de l'alimentation, de la qualité, du catalogue, des calculs d'indicateurs et de la construction de l'aide à la décision. Gère les référentiels géographiques et méthodologiques.

**Objectifs** :

1. Alimenter la plateforme avec des données fiables et normalisées
2. Qualifier la qualité des données et détecter les anomalies
3. Construire et maintenir les référentiels géographiques et méthodologiques
4. Produire les indicateurs et les rendre accessibles aux autres profils
5. Construire l'aide à la décision (AMC, seuils, pondérations) et gérer les exports

| # | Cas d'usage | US | Phrase agile |
|---|---|---|---|
| CU-DATA-01 | Importer un nouveau jeu de données et le normaliser | US1.1, US1.4 | En tant qu'administrateur expert data, je veux importer un nouveau jeu de données et le normaliser afin que la plateforme dispose de données fiables et homogènes. |
| CU-DATA-02 | Détecter des valeurs aberrantes et qualifier la fiabilité | US2.1, US2.5 | En tant qu'administrateur expert data, je veux détecter des valeurs aberrantes et qualifier la fiabilité afin de garantir la confiance à accorder aux données produites. |
| CU-DATA-03 | Gérer un bassin versant et ses captages dans le référentiel | US3.1, US3.2 | En tant qu'administrateur expert data, je veux gérer un bassin versant et ses captages dans le référentiel afin de maintenir la cohérence spatiale du système. |
| CU-DATA-04 | Calculer un indicateur et versionner sa méthode | US4.1, US4.6 | En tant qu'administrateur expert data, je veux calculer un indicateur et versionner sa méthode afin de garantir la traçabilité et la reproductibilité des résultats. |
| CU-DATA-05 | Construire un indice composite et documenter les méthodes | US5.1, US5.6 | En tant qu'administrateur expert data, je veux construire un indice composite et documenter les méthodes afin de fournir une base transparente pour l'aide à la décision. |

---

## Profil 3 : Expert métier eau potable

**Description** — Ingénieur/e spécialisé(e) en eau potable qui consulte les indicateurs et approfondit l'analyse (AMC, scénarios, comparaisons). N'effectue pas de gestion de données en back-end mais exploite les résultats pour son expertise métier.


**Objectifs** :

1. Conduire l'analyse multicritère pour évaluer des scénarios
2. Consulter les indicateurs de menace sur l'eau potable d'un territoire
3. Suivre les tendances et détecter les situations critiques
4. Produire des synthèses pour alimenter la décision
5. Alterner entre les vues graphiques pour une analyse multi-échelle

| # | Cas d'usage | US | Question concrète | Phrase agile |
|---|---|---|---|---|
| CU-EXPERT-01 | Conduire l'analyse multicritère (pondérations, scénarios, comparaisons, contributions) | US5.2, US5.3, US5.4, US5.5 | Sachant que le BVAEP de la Dumbéa a un statut PPE absent, une surface agricole de 15 %, 3 ICPE en amont et une géologie ruisselante, quel poids attribuer à chaque indicateur pour que le classement de criticité reflète le risque réel de dégradation ? | En tant qu'expert métier eau potable, je veux conduire l'analyse multicritère et paramétrer les pondérations afin de créer un score de criticité adapté au contexte de chaque territoire. |
| CU-EXPERT-02 | Consulter les graphiques temporels et alterner les vues | US6.4, US6.24 | Entre 2021 et 2025, comment a évolué la surface cumulée d'incendies sur le BVAEP de la Dumbéa, et cette hausse est-elle corrélée aux surfaces d'érosion identifiées la même année ? | En tant qu'expert métier eau potable, je veux consulter l'évolution temporelle des indicateurs et basculer les vues graphiques (changement, répartition, carte H3) afin d'identifier les dynamiques croisées impactant la ressource. |
| CU-EXPERT-03 | Identifier des tendances et détecter des dépassements | US7.3, US7.2 | Le BBR du captage de la Dumbéa est-il passé sous le seuil de déficit en période d'étiage sur les deux dernières années, indiquant une tension quantitative sur la ressource ? | En tant qu'expert métier eau potable, je veux identifier les tendances des indicateurs et être alerté par les dépassements de seuil que j'ai définis, afin d'anticiper les périodes de tension sur la ressource. |
| CU-EXPERT-04 | Consulter la fiche synthétique du BVAEP prioritaire | US7.4, US7.5 | Quels indicateurs contribuent le plus au score de criticité final du BVAEP de la Dumbéa : est-ce le statut PPE, la densité d'ICPE, la surface d'incendies cumulés, ou la géologie ? | En tant qu'expert métier eau potable, je veux consulter la fiche synthétique d'un territoire prioritaire afin d'identifier rapidement les facteurs de vulnérabilité dominants avant de recommander une action. |
| CU-EXPERT-05 | Utiliser l'aide à l'interprétation avancée pour prioriser | US7.6 | Parmi les 5 captages prioritaires du Grand Nouméa, lequel cumule le plus de facteurs de risque aggravants : absence de PPE + BBR déficitaire + forte densité d'ICPE + superficie brûlée récurrente ? | En tant qu'expert métier eau potable, je veux prioriser les territoires avec l'aide à l'interprétation avancée afin d'établir une hiérarchie d'actions justifiée partagée avec les décideurs. |

---

## Profil 4 : Décideur métier

**Description** — Élu, directeur de service ou président d'association disposant d'un pouvoir de décision métier. Utilise HydroScope pour piloter les orientations stratégiques et opérationnelles en matière de gestion de l'eau potable.

**Objectifs** :

1. Disposer d'une vue synthétique de la qualité de l'eau sur son territoire
2. Comparer des territoires pour arbitrer des investissements
3. Suivre les tendances et détecter les situations critiques
4. Produire des rapports formalisés pour les instances décisionnelles
5. Consulter l'aide à la décision pour éclairer ses choix

| # | Cas d'usage | US | Phrase agile |
|---|---|---|---|
| CU-DECISION-01 | Consulter un tableau de bord synthétique et une fiche territoire | US6.6, US6.7 | En tant que décideur métier, je veux consulter un tableau de bord synthétique et une fiche territoire afin de disposer d'une vue d'ensemble de la qualité de l'eau sur mon territoire. |
| CU-DECISION-02 | Comparer deux bassins versants pour prioriser des investissements | US6.5, US7.5 | En tant que décideur métier, je veux comparer deux bassins versants afin d'arbitrer les investissements en fonction des besoins identifiés. |
| CU-DECISION-03 | Identifier une tendance critique et détecter un dépassement de seuil | US7.3, US7.2 | En tant que décideur métier, je veux identifier une tendance critique et détecter un dépassement de seuil afin de réagir rapidement face à une situation urgente. |
| CU-DECISION-04 | Générer un rapport PDF pour un conseil municipal | US8.3 | En tant que décideur métier, je veux générer un rapport PDF afin de présenter les résultats au conseil municipal et formaliser la prise de décision. |
| CU-DECISION-05 | Consulter l'aide à l'interprétation avancée pour éclairer une décision | US7.6 | En tant que décideur métier, je veux consulter l'aide à l'interprétation avancée afin de comprendre les causes sous-jacentes des anomalies détectées. |

---

## Profil 5 : Intéressé public

**Description** — Citoyen, habitant ou journaliste souhaitant consulter la qualité de l'eau sur son territoire. Accès anonyme, interface simplifiée et filtrable, lecture seule stricte (aucun export, aucun partage).


**Objectifs** :

1. Vérifier la qualité de l'eau potable sur son lieu de résidence
2. Explorer la carte des captages et bassins versants de sa commune
3. Comprendre les indicateurs de qualité grâce à des données chiffrées
4. Accéder aux périmètres de protection et aux zones à risque
5. S'informer sur l'état de la ressource en eau sans outil technique

| # | Cas d'usage | US | Phrase agile |
|---|---|---|---|
| CU-PUBLIC-01 | Vérifier la qualité de l'eau près de chez soi via la carte | US6.1, US6.2, US6.20 | En tant qu'intéressé public, je veux vérifier la qualité de l'eau près de chez moi via la carte afin de connaître l'état de la ressource en eau dans mon quartier. |
| CU-PUBLIC-02 | Rechercher ma commune ou mon captage et consulter les indicateurs | US6.10, US6.22 | En tant qu'intéressé public, je veux rechercher ma commune ou mon captage et consulter les indicateurs afin de trouver rapidement l'information pertinente. |
| CU-PUBLIC-03 | Consulter les couches thématiques et zoomer sur un territoire | US6.3, US6.21 | En tant qu'intéressé public, je veux consulter les couches thématiques et zoomer sur un territoire afin d'explorer visuellement les zones de ma commune. |
| CU-PUBLIC-04 | Appliquer un preset pour voir les territoires les plus exposés | US6.13 | En tant qu'intéressé public, je veux appliquer un preset afin de visualiser rapidement les territoires les plus concernés par les problèmes de qualité de l'eau. |
| CU-PUBLIC-05 | Trier la liste des indicateurs par distance pour trouver les plus proches | US6.17, US6.25 | En tant qu'intéressé public, je veux trier la liste des indicateurs par distance afin de trouver les données les plus proches de mon lieu de résidence. |
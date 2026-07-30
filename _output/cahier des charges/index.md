---
author:
- Hugo Roussaffa
authors:
- affiliation:
    address: BP 38, 98836 Dumbéa Mairie, Nouvelle-Calédonie
    name: Yapuka SARL
    Ridet: 1 568 070.001
  email: hugoroussaffa@gmail.com
  name: Hugo Roussaffa
  Position: Expert Géomatique -- Architecte data - Consultant
  Tel: +687 97.83.24
copyright:
  statement: Copyright Yapuka SARL - 2026. Tous droits réservés. 1
date: 30 juillet 2026
date-format: long
engines:
- path: /opt/quarto/share/extension-subtrees/julia-engine/\_extensions/julia-engine/julia-engine.js
execute:
  echo: false
image_font_1: ../ressources/MJunckerOEIL.jpg
image_font_2: ../ressources/eau-monitoring.png
lang: fr
logo: ../ressources/OEIL_logo.png
logo_partenaire: ../ressources/logo_yapuka.png
resume: Succédant au tableau de bord PressionPPE (2021), dont il
  capitalise les acquis techniques et le retour d'expérience, le projet
  Hydroscope vise la mise en place de services numériques destinées au
  suivi de la ressource en eau potable sur l'ensemble du territoire de
  la Nouvelle-Calédonie. Le projet Hydroscope se fixe pour objectif de
  caractériser les Bassin Versant d'Approvisionnement en Eau Potable
  (BVAEP), incluant les Perimetre de Protection de l'Eau (PPE) et les
  points de captages via leurs facteurs biogéographiques (relief,
  géologie, végétation, pluviométrie), les pressions subies
  (urbanisation, incendies, érosion...) et les réponses qui ont pu être
  apporté sur ces milieux. Le projet doit aussi permettre le partage de
  ces connaissances à différentes échelles (pays, province, commune) via
  des interfaces numériques adaptés à différents publics.
subtitle: Note de cadrage stratégique
title: Projet HydroScope
toc-title: Table des matières
version: version 1
---



::: {}
> **Note de version**
>
> Historique des versions du document :
>
>   Version   Date   Auteur(s)        Description des modifications
>   --------- ------ ---------------- ------------------------------------------
>   1                Hugo Roussaffa   Rédaction initiale du cahier des charges
>
> Points en attente (4)
>
> [high (annexe)](#annexe-indiquer-l-annexe) : indiquer l'annexe
>
> [high (link)](#link-mettre-lien-section) : mettre lien section
>
> [high (annexe-liens-fichiers)](#annexe-liens-fichiers-inserer-un-lien-vers-le-tableau-des-indicateurs)
> : inserer un lien vers le tableau des indicateurs
>
> [high (annexe-liens-fichiers)](#annexe-liens-fichiers-inserer-un-lien-vers-le-catalogue-de-fiches-des-indicateurs)
> : inserer un lien vers le catalogue de fiches des indicateurs
:::

**Introduction**

Le projet Hydroscope s'inscrit dans la continuité d'un premier outil
développé en 2021 pour la DAVAR (PressionPPE). Suite au retour
d'expérience de ce premier projet, l'OEIL a déposé un dossier au fonds
PEP en 2023, validé avec un co-financement de l'OFB (65 %) et du fonds
PEP (35 %). L'objectif est de faire évoluer cet outil pour répondre aux
besoins accrus de connaissance et de gestion de la ressource en eau.

Le projet **Hydroscope** a pour ambition de doter le territoire d'une
architecture logicielle et d'une structure de données robuste, capables
de transformer les données brutes en informations stratégiques, tout en
garantissant l'historisation des indicateurs et l'automatisation de la
veille sur les pressions environnementales telles que les incendies,
l'érosion, la pollution, le développement des espèces envahissantes ou
l'artificialisation des sols.

L'OEIL assure la continuité intellectuelle du projet initiale
(PressionPPE en 2021) et s'assurera à ce que les futurs outils --- qu'il
s'agisse de tableaux de bord experts, d'interfaces simplifiées pour les
partenaires ou de fiches pédagogiques --- deviennent des leviers d'aide
à la décision pour la protection durable des bassins versants
producteurs d'eau potable (BVAEP).

------------------------------------------------------------------------



## Contexte et objectifs {#contexte-et-objectifs number="0.1"}

La protection des ressources en eau potable constitue un enjeu majeur
pour la Nouvelle-Calédonie. Les captages destinés à l'alimentation en
eau potable sont exposés à de nombreuses pressions environnementales et
anthropiques susceptibles d'altérer durablement la qualité et la
disponibilité de la ressource. Les incendies, l'érosion des sols, les
activités minières, l'urbanisation ou encore les effets du changement
climatique nécessitent une connaissance fine des territoires afin
d'orienter les actions de prévention et de protection.

Une grande partie des captages est alimentée par des eaux
superficielles, ce qui les rend particulièrement sensibles aux
modifications des bassins versants d'alimentation en eau potable. La
préservation de ces bassins versants constitue ainsi un levier essentiel
pour garantir une ressource en eau de qualité sur le long terme.

### Contexte institutionnel {#contexte-institutionnel number="0.1.1"}

La gestion de l'eau potable en Nouvelle-Calédonie repose sur une
organisation institutionnelle impliquant plusieurs acteurs
complémentaires.

Depuis la loi du pays du **15 juillet 2025** relative au domaine public
de l'eau, le **Gouvernement de la Nouvelle-Calédonie** est compétent
pour instaurer les **Périmètres de Protection des Eaux (PPE)** par
arrêté. Le service de l'eau de la **DAVAR** assure l'instruction
technique et administrative des dossiers de protection.

Les **Provinces** interviennent principalement dans leurs compétences
environnementales et participent à l'instruction des dossiers en
formulant un avis obligatoire. Elles assurent également un rôle de
conseil et d'accompagnement auprès des collectivités.

Les **Communes** conservent la responsabilité du service public de
production et de distribution d'eau potable ainsi que de
l'assainissement. Elles sont les principales gestionnaires des captages
destinés à l'alimentation des populations.

Sur les **terres coutumières**, la création d'un périmètre de protection
est soumise à l'accord des autorités coutumières concernées.

La réglementation impose désormais la régularisation des captages
existants ne disposant pas encore de périmètre de protection, renforçant
ainsi les besoins en outils d'observation, de suivi et d'aide à la
décision.

### Positionnement du projet HydroScope {#positionnement-du-projet-hydroscope number="0.1.2"}

Le projet **HydroScope** est une initiative portée par l'OEIL, en
partenariat avec les services techniques concernés, avec le soutien
financier de l'Office Français de la Biodiversité (OFB) et du fonds de
la Politique de l'Eau Partagée (PEP).

Il s'inscrit dans la continuité du tableau de bord **PressionPPE**,
développé en 2021 avec le Service de l'eau de la DAVAR pour centraliser
des informations relatives aux pressions exercées sur les ressources en
eau potable. Les retours d'expérience sur cet outil ont mis en évidence
plusieurs pistes d'amélioration, notamment concernant l'historisation
des données, l'automatisation des traitements, l'adaptation des
interfaces aux différents profils d'utilisateurs ainsi que l'ouverture
vers des technologies open source.

HydroScope vise ainsi à faire évoluer cet outil en proposant une
plateforme permettant de consolider les données disponibles, de produire
des indicateurs homogènes, de faciliter leur consultation par les
différents acteurs impliqués dans la gestion de la ressource et de
simplifier le processus de production et de diffusion des données.

Le projet est actuellement engagé dans une phase de réalisation destinée
à développer des services numériques en réponse aux besoins métiers
identifiés lors de la phase d'analyse. Cette phase se concentre sur la
définition des indicateurs, la structuration des données et la
conception des interfaces utilisateurs adaptées aux différents profils
d'acteurs.

### Objectifs du projet {#objectifs-du-projet number="0.1.3"}

L'objectif d'HydroScope est de mettre à disposition un système
d'information permettant de mieux suivre l'état des bassins versants
d'alimentation en eau potable (BVAEP), les unités de gestion
(captage/forage) et des périmètres de protection des eaux, afin de
faciliter leur analyse et leur suivi dans le temps.

Plus précisément, le projet poursuit 4 objectifs :

- **Connaissance:** Mieux caractériser le territoire (relief, géologie,
  pluviométrie) et les enjeux (population desservie) en centralisant et
  structurerantles données utiles à la caractérisation des bassins
  versants et des points de captages

- **Diagnostic:** Appréhender le niveau d'intégrité de la ressource via
  l'analyse d'une multitude d'indicateurs :

  - en produisant des indicateurs homogènes décrivant les enjeux, les
    pressions environnementales et les caractéristiques des territoires.
  - en assurerant l'historisation des données afin de suivre leur
    évolution dans le temps.

- **Veille:** Détecter automatiquement les changements environnementaux
  significatifs et faciliter l'identification de ces évolutions
  significatives grâce à des mécanismes de veille et de mise à jour
  automatisée.

- **Partage:** Diffuser un diagnostic commun entre les parties prenantes
  pour orienter les investissements publics en mettant à disposition des
  indicateurs dans un tableau de bord adaptés aux différents profils
  d'utilisateurs et en facilitant le partage d'une information cohérente
  entre les différents partenaires.

HydroScope n'a pas vocation à remplacer les outils métiers existants ni
à se substituer aux décisions des gestionnaires. Il constitue un outil
d'observation, d'analyse et de restitution destiné à fournir une vision
consolidée des informations disponibles afin d'appuyer les travaux de
suivi et de protection de la ressource en eau potable.

### Objectifs fonctionnels {#objectifs-fonctionnels number="0.1.4"}

L'application doit permettre aux gestionnaires de répondre à des
questions concrètes pour prioriser leurs interventions :

- Quels sont les bassins versants actuellement sous pression forte et
  selon quels critères ?
- Quelle est la tendance d'évolution d'une pression (ex: incendies,
  glissement de terrain) sur les 5 ou 10 dernières années ?
- Quels zones doivent être protégés/restaurer en priorité ?
- Quel est le niveau de gravité d'un défrichage détectée par satellite ?

L'application devra notamment permettre de :

- consulter les caractéristiques des bassins versants d'alimentation en
  eau potable ;
- visualiser les indicateurs produits à différentes échelles
  territoriales et sur les objets géographiques suivants
  (captage/forage; bassin versant AEP, maille géographique vectorielle
  H3 [^1] );
- suivre l'évolution temporelle des pressions environnementales ;
- comparer plusieurs territoires, captages/forages ou bassins versants ;
- Assurer la traçabilité et la transparence des traitements effectués
- accéder aux fiches descriptives des indicateurs, des bassins versants
  AEP, des captages/forages et périmètres de protection ;
- produire des rapports exportables ;
- diffuser des niveaux d'information adaptés aux différents profils
  d'utilisateurs (experts, partenaires institutionnels et grand public).

L'ensemble de ces fonctionnalités devra contribuer à améliorer l'accès
aux données existantes et d'appuyer la prise de décision publique et
opérationnelle auprès des acteurs de la gestion de l'eau potable en
Nouvelle-Calédonie.

### Quantification du périmètre {#quantification-du-périmètre number="0.1.5"}

Le périmètre fonctionnel du projet HydroScope s'appuie sur un ensemble
de données territoriales et d'indicateurs dont les volumes doivent être
pris en compte pour dimensionner la solution.

À ce stade, les ordres de grandeur sont les suivants :

- **Bassins versants d'alimentation en eau potable (BVAEP)** : \~XX
  unités\
- **Captages / forages** : \~500 unités\
- **Périmètres de protection** : \~250 unités\
- **Indicateurs** : \~40 indicateurs (en fonction des thématiques
  retenues)\
- **Sources de données** : \~30 sources (catalogue georep, google earth
  engine, base de données OEIL ...)

Ces valeurs sont indicatives et pourront évoluer au cours du projet,
notamment en fonction :

- de la disponibilité des données ;
- des choix méthodologiques ;
- des besoins exprimés par les utilisateurs.

Elles permettent néanmoins de fournir un premier niveau de cadrage pour
le dimensionnement technique et fonctionnel de la solution. Les
indicateurs et leur sources identifiés jusqu'à présent sont détaillés
dans l'annexe ...

@todo [priority=high, section=annexe] : indiquer l'annexe

### Sources de données {#sources-de-données number="0.1.6"}

Le projet HydroScope repose sur l'intégration et la valorisation de
données issues de sources multiples, produites par différents acteurs du
territoire.

Les principales sources de données mobilisées incluent :

- **Données géographiques de référence** :
  - bassins versants d'alimentation en eau potable (BVAEP) ;
  - captages et forages ;
  - périmètres de protection des eaux ;
  - limites administratives.
- **Données environnementales** :
  - incendies ;
  - érosion des sols ;
  - occupation du sol ;
  - données climatiques (pluviométrie, etc.).
- **Données issues de l'observation satellitaire** :
  - détection de changements d'occupation du sol ;
  - suivi de phénomènes environnementaux.
- **Données administratives et réglementaires** :
  - informations liées aux périmètres de protection ;
  - données issues des services de l'État et des collectivités.

Ces données sont produites et mises à disposition par différents acteurs
(communes, provinces, services du Gouvernement, partenaires techniques).

Elles présentent des niveaux hétérogènes de qualité, de structuration et
de fréquence de mise à jour, ce qui nécessite des traitements
spécifiques dans le cadre du projet HydroScope.

------------------------------------------------------------------------



## Parties prenantes et gouvernance {#parties-prenantes-et-gouvernance number="0.2"}

La mise en œuvre du projet HydroScope repose sur une gouvernance
partenariale associant des acteurs institutionnels, techniques et
opérationnels intervenant à différentes étapes du cycle de vie de la
donnée et de la décision publique.

### Acteurs {#acteurs number="0.2.1"}

L'**OEIL** assure le portage du projet HydroScope. Il coordonne les
travaux, centralise les données et garantit la cohérence globale du
dispositif, notamment en matière de structuration de l'information et de
production d'indicateurs.

Les **services du Gouvernement de la Nouvelle-Calédonie**, en
particulier la **DAVAR (service de l'eau)**, interviennent en tant
qu'acteurs clés sur les aspects réglementaires, techniques et
méthodologiques liés à la gestion des ressources en eau et à la mise en
œuvre des périmètres de protection.

Les **Provinces** contribuent à la fois à la production de données
environnementales et à leur analyse, dans le cadre de leurs compétences
en matière d'environnement et d'aménagement du territoire. Elles jouent
également un rôle d'appui auprès des communes.

Les **Communes** sont les gestionnaires opérationnels des captages d'eau
potable. Elles constituent des utilisateurs centraux de l'outil, tant
pour le suivi de leurs ressources que pour l'aide à la décision dans la
gestion quotidienne et stratégique.

Les **partenaires techniques** (producteurs de données, organismes
scientifiques, opérateurs) participent à l'alimentation du système, à la
qualification des données et à la définition des indicateurs.

Enfin, les **utilisateurs finaux** regroupent différents profils
(techniciens, ingénieurs, décideurs, partenaires institutionnels), avec
des besoins différenciés en matière d'accès, de lecture et
d'exploitation de l'information.

### Rôles et responsabilités {#rôles-et-responsabilités number="0.2.2"}

La **Maîtrise d'Ouvrage (MOA)**, assurée par l'OEIL, définit les
orientations stratégiques du projet, exprime les besoins fonctionnels et
valide les livrables.

L'**Assistance à Maîtrise d'Ouvrage (AMOA)** accompagne la formalisation
des besoins, veille à la cohérence méthodologique, en particulier sur
les aspects liés aux indicateurs et aux traitements de données, et
assure l'interface entre les acteurs métiers et les équipes techniques.

La **Maîtrise d'Œuvre (MOE)** est en charge de la conception technique,
du développement et de la mise en œuvre de la solution, en respectant
les exigences fonctionnelles et non fonctionnelles définies.

Les **utilisateurs** sont associés tout au long du projet afin de
garantir l'adéquation de l'outil aux usages réels. Ils interviennent
notamment dans les phases de recueil des besoins, de tests et de
validation fonctionnelle.

### Modalités de validation {#modalités-de-validation number="0.2.3"}

La gouvernance du projet s'appuie sur plusieurs instances :

- Le **comité de pilotage (COPIL)**, chargé de définir les orientations
  stratégiques, de valider les grandes étapes du projet et d'arbitrer
  les décisions structurantes ;
- Le **comité technique (COTECH)**, qui assure le suivi opérationnel, la
  validation des choix fonctionnels et méthodologiques ainsi que la
  coordination entre les acteurs ;
- Des **ateliers thématiques et utilisateurs**, permettant de recueillir
  les besoins, de confronter les propositions fonctionnelles aux usages
  et d'intégrer les retours terrain.

Les validations sont réalisées de manière itérative, en lien avec les
cycles de développement, afin de sécuriser progressivement les choix
effectués.

### Organisation du projet en mode Agile {#organisation-du-projet-en-mode-agile number="0.2.4"}

Le projet HydroScope est conduit selon une approche itérative et
incrémentale inspirée des méthodes Agile, permettant d'adapter en
continu le produit aux besoins des utilisateurs et aux contraintes
identifiées.

Le développement s'appuie sur un **backlog produit** structuré en
fonctionnalités (EPICS) et décliné en éléments plus fins. Ce backlog est
priorisé en continu par la MOA, en fonction de la valeur métier, des
contraintes techniques et des enjeux du projet.

Le fonctionnement repose sur des cycles courts de développement
(**sprints**), intégrant : - des phases de planification (sprint
planning), - des points de suivi réguliers au sein de l'équipe projet, -
des **revues de sprint** associant les parties prenantes pour présenter
les fonctionnalités développées, - des **rétrospectives** visant à
améliorer en continu l'organisation et les pratiques.

Des démonstrations régulières sont organisées afin de recueillir les
retours des utilisateurs et d'ajuster les priorités. Cette organisation
vise à sécuriser les développements, à améliorer la qualité du produit
et à garantir son adéquation avec les besoins métiers.

------------------------------------------------------------------------



## Vision produit & principes méthodologiques {#vision-produit-principes-méthodologiques number="0.3"}

Le projet HydroScope vise à proposer un outil structurant permettant
d'améliorer la connaissance, le suivi et l'analyse des ressources en eau
à l'échelle des bassins versants d'alimentation en eau potable. Il
s'inscrit dans une logique d'appui à la décision publique, en mettant à
disposition des informations consolidées, fiables et accessibles aux
différents acteurs du territoire.

### Vision cible {#vision-cible number="0.3.1"}

HydroScope a vocation à devenir un outil de référence partagé entre les
acteurs institutionnels et techniques de la gestion de l'eau en
Nouvelle-Calédonie. Il doit permettre de croiser des données issues de
sources multiples afin de produire une lecture synthétique et
opérationnelle des dynamiques à l'œuvre sur les territoires.

L'outil repose sur un équilibre entre plusieurs exigences
complémentaires :

- garantir une **rigueur scientifique** dans la production et
  l'interprétation des indicateurs ;
- proposer une **accessibilité adaptée à des publics variés**, allant
  des experts aux décideurs ;
- offrir des capacités d'**exploration, de comparaison et d'analyse**,
  facilitant l'identification des enjeux prioritaires et l'orientation
  des actions.

HydroScope ne constitue pas un outil de décision automatisée, mais un
support d'analyse visant à éclairer les choix des gestionnaires.

### Principes méthodologiques {#principes-méthodologiques number="0.3.2"}

La conception et le développement d'HydroScope reposent sur un ensemble
de principes visant à garantir la fiabilité et la compréhension des
résultats produits.

- **Traçabilité**\
  Chaque donnée intégrée dans le système doit être associée à sa source,
  à sa date de production et aux éventuelles transformations qu'elle a
  subies. Cette traçabilité doit être accessible aux utilisateurs afin
  de garantir la transparence de l'information.

- **Transparence des calculs**\
  Les méthodes de calcul des indicateurs doivent être explicites,
  documentées et compréhensibles. Les choix méthodologiques (agrégation,
  pondération, seuils) doivent pouvoir être consultés et justifiés.

- **Robustesse des indicateurs**\
  Les indicateurs produits doivent reposer sur des bases méthodologiques
  solides. Une attention particulière est portée à la pertinence des
  données utilisées, à leur qualité et à la cohérence des traitements
  appliqués.

- **Interopérabilité**\
  Le système doit s'inscrire dans un écosystème existant en respectant
  les standards en vigueur, notamment dans le domaine des données
  géographiques, afin de faciliter les échanges et la réutilisation des
  données.

- **Lisibilité**\
  Les restitutions proposées doivent permettre une appropriation rapide
  de l'information, en évitant les représentations complexes ou
  ambiguës. Une attention particulière est portée à la pédagogie et à
  l'adaptation des interfaces aux différents profils d'utilisateurs.

### Risques méthodologiques {#risques-méthodologiques number="0.3.3"}

Compte tenu de la diversité des données mobilisées et des traitements
envisagés, plusieurs risques méthodologiques doivent être identifiés et
maîtrisés.

- **Agrégation abusive**\
  Le croisement ou la combinaison de données hétérogènes (échelles
  spatiales, temporelles, unités, niveaux de précision) peut conduire à
  des résultats peu pertinents, voire trompeurs.

- **Biais d'interprétation**\
  La simplification nécessaire à la production d'indicateurs
  synthétiques peut induire des erreurs de lecture ou des conclusions
  hâtives si le contexte d'interprétation n'est pas suffisamment
  explicité.

- **Qualité des données**\
  La fiabilité des résultats dépend directement de la qualité des
  données sources, qui peuvent être incomplètes, hétérogènes ou non
  validées.

- **Effet "boîte noire"**\
  Une complexité excessive des traitements ou un manque de transparence
  dans les calculs peut entraîner une perte de confiance des
  utilisateurs.

- **Surinterprétation**\
  Les indicateurs produits doivent être utilisés dans leur domaine de
  validité et dans le cadre des objectifs que nous leurs avons fixés.
  Leur interprétation en dehors de ce cadre peut conduire à des
  décisions inadaptées.

## Stratégie MVP (Minimum Viable Product) {#stratégie-mvp-minimum-viable-product number="0.4"}

Le projet HydroScope repose sur la mise à disposition rapide d'une
première version fonctionnelle du système (MVP), permettant de répondre
aux besoins prioritaires des utilisateurs tout en limitant les risques.

Le MVP vise à : - proposer un socle fonctionnel opérationnel (données,
indicateurs, visualisation) ; - permettre une première utilisation par
les acteurs métiers ; - recueillir des retours utilisateurs afin
d'ajuster les développements ultérieurs.

Le périmètre du MVP est volontairement restreint aux fonctionnalités à
plus forte valeur métier, notamment : - l'intégration de données
structurées ; - le calcul d'indicateurs simples et robustes ; - la
visualisation cartographique et temporelle ; - la consultation de fiches
territoires.

Les fonctionnalités plus avancées (analyse multicritère, paramétrage
complexe, automatisation avancée) sont prévues dans des phases
ultérieures.

Le MVP constitue une étape clé du projet et fera l'objet d'une
validation spécifique par la MOA.

------------------------------------------------------------------------



## Monitoring, supervision et pilotage {#monitoring-supervision-et-pilotage number="0.5"}

Le projet HydroScope intègre des besoins transverses de monitoring
visant à garantir le bon fonctionnement du système, la fiabilité des
données et la capacité à suivre les dynamiques environnementales dans le
temps. Ces fonctions de monitoring ne se limitent pas à la production de
tableaux de bord, mais reposent sur des mécanismes de suivi, d'alerte et
d'analyse continue.

L'objectif est double : sécuriser techniquement et méthodologiquement le
système, tout en fournissant aux acteurs des outils de veille et de
pilotage adaptés à leurs besoins.

### Monitoring technique {#monitoring-technique number="0.5.1"}

Le système devra permettre de suivre le bon fonctionnement des
traitements et des flux de données.

Cela inclut notamment : - le suivi des processus d'import (succès,
échecs, volumétrie, durée) ; - la surveillance des connexions aux
sources de données (API, bases externes) ; - le suivi des performances
(temps de réponse, temps de calcul) ; - la gestion des erreurs et des
journaux techniques.

Ces éléments sont principalement destinés aux équipes techniques en
charge de l'exploitation et de la maintenance du système.

### Monitoring de la qualité des données {#monitoring-de-la-qualité-des-données number="0.5.2"}

HydroScope devra permettre de suivre en continu la qualité et la
fraîcheur des données intégrées.

Cela comprend : - la visualisation des dates de mise à jour des données
; - le suivi de la complétude des jeux de données ; - la détection
d'anomalies (valeurs aberrantes, ruptures de séries, incohérences) ; -
la qualification du niveau de fiabilité des données.

Ces informations devront être accessibles aux utilisateurs afin
d'éclairer l'interprétation des indicateurs.

### Monitoring métier et environnemental {#monitoring-métier-et-environnemental number="0.5.3"}

Le système devra permettre de suivre les évolutions des indicateurs dans
une logique de veille environnementale.

Cela inclut : - le suivi temporel des pressions environnementales ; - la
détection de tendances et de ruptures ; - la mise en place de mécanismes
d'alerte sur des évolutions significatives ; - la priorisation des
territoires en fonction de leur niveau de pression.

Ces fonctionnalités participent directement à l'aide à la décision.

### Monitoring des usages {#monitoring-des-usages number="0.5.4"}

HydroScope devra permettre d'analyser les usages de la plateforme afin
d'en améliorer la pertinence et l'adoption.

Cela comprend : - le suivi de la fréquentation de l'outil ; -
l'identification des fonctionnalités les plus utilisées ; - l'analyse
des usages par profil utilisateur ; - le suivi des exports et des
consultations.

Ces éléments alimentent la démarche d'amélioration continue du produit.

------------------------------------------------------------------------



## Périmètre fonctionnel -- EPICS {#périmètre-fonctionnel-epics number="0.6"}

Le périmètre fonctionnel d'HydroScope est structuré en grands ensembles
cohérents de fonctionnalités (EPICS), permettant d'organiser le
développement du produit de manière progressive et itérative. Chaque
EPIC fait l'objet d'une description détaillée dans une fiche dédiée,
intégrée dynamiquement dans ce document via des inclusions Quarto.

### EPIC 1 : Gestion des données {#epic-1-gestion-des-données number="0.6.1"}

Cet EPIC constitue le socle technique et fonctionnel d'HydroScope. Il
regroupe l'ensemble des mécanismes permettant d'acquérir, d'intégrer, de
structurer et de maintenir les données nécessaires au fonctionnement du
système. La qualité, la cohérence et la pérennité des traitements
réalisés dans les autres EPICS reposent directement sur la robustesse de
cette brique.

HydroScope a vocation à centraliser des données issues de sources
multiples, hétérogènes tant par leur format que par leur fréquence de
mise à jour ou leur niveau de structuration. L'outil doit donc être en
mesure de gérer cette diversité tout en garantissant une homogénéisation
progressive des données intégrées.

L'EPIC couvre plusieurs dimensions complémentaires.

- **Import de données (fichiers, API)**\
  Le système doit permettre l'intégration de données via différents
  canaux : dépôts de fichiers (CSV, formats SIG, etc.) et connexions à
  des services externes (API). Ces imports doivent être paramétrables
  afin de s'adapter aux spécificités de chaque source (structure,
  fréquence, format). Une attention particulière est portée à la
  reproductibilité des imports, notamment dans une logique
  d'automatisation.

- **Connexion aux sources existantes**\
  HydroScope doit pouvoir se connecter à des sources de données
  existantes (bases de données, services institutionnels, flux
  automatisés) afin de limiter les ressaisies et de garantir la mise à
  jour régulière des informations. Ces connexions doivent être
  sécurisées et documentées.

- **Structuration et normalisation des données**\
  Les données intégrées doivent être transformées afin de s'inscrire
  dans un modèle de données commun. Cela implique des opérations de
  standardisation (formats, unités, nomenclatures), de mise en cohérence
  spatiale et temporelle, ainsi que de rattachement aux référentiels du
  système (objets géographiques, indicateurs, etc.).\
  Cette étape est essentielle pour permettre les traitements ultérieurs,
  notamment les calculs d'indicateurs et les analyses croisées.

- **Historisation des données**\
  Le système doit conserver les différentes versions des données dans le
  temps afin de permettre le suivi des évolutions, la reproductibilité
  des analyses et la traçabilité des traitements.\
  L'historisation doit permettre de répondre à des besoins variés :
  reconstitution d'un état à une date donnée, analyse de tendances, ou
  encore audit des modifications.

De manière transverse, cet EPIC doit intégrer des exigences fortes en
matière de traçabilité (origine des données, date d'intégration,
transformations appliquées) et de résilience (gestion des erreurs,
contrôle des imports, capacité à rejouer des traitements).

Compte tenu de son rôle structurant, l'EPIC "Gestion des données"
constitue une priorité dans le développement du projet et conditionne la
qualité globale du système HydroScope.

- **Monitoring**

Les fonctionnalités de monitoring au sein de cet EPIC visent à assurer
la maîtrise des flux de données et la fiabilité des processus
d'intégration.

Elles comprennent : - le suivi des imports de données (statut des
traitements, succès/échec, volumétrie, durée d'exécution) ; - la
journalisation des opérations d'ingestion (date, source, type de
traitement, résultat) ; - la capacité à rejouer des traitements en cas
d'erreur ou de correction de données ; - la mise en place d'indicateurs
de performance des pipelines (temps de traitement, fréquence des mises à
jour).

Ces éléments permettent d'identifier rapidement les dysfonctionnements
et de garantir la continuité des flux de données.

### EPIC 2 : Qualité et validation des données {#epic-2-qualité-et-validation-des-données number="0.6.2"}

Cet EPIC vise à garantir la fiabilité, la cohérence et la compréhension
des données intégrées dans HydroScope. Il constitue un complément
indispensable à la gestion des données, en introduisant des mécanismes
de contrôle, de qualification et de documentation permettant de
sécuriser les usages analytiques et décisionnels.

Compte tenu de la diversité des sources mobilisées (données
environnementales, géographiques, satellitaires, administratives), cet
EPIC doit permettre d'expliciter le niveau de confiance associé aux
données et d'éviter des interprétations erronées liées à des données
incomplètes ou de qualité insuffisante.

#### Description {#description number="0.6.2.1"}

L'EPIC couvre l'ensemble des processus permettant de contrôler les
données lors de leur intégration, de qualifier leur qualité et de rendre
visible cette information auprès des utilisateurs.

Il s'inscrit dans une logique de transparence méthodologique, en rendant
explicites les limites des données utilisées et en permettant, le cas
échéant, d'alerter sur des anomalies ou incohérences détectées.

#### Fonctionnalités {#fonctionnalités number="0.6.2.2"}

- **Contrôles de cohérence**\
  Mise en place de règles automatiques permettant de détecter des
  anomalies dans les données :

  - valeurs aberrantes ou hors plage attendue\
  - incohérences spatiales (ex : géométries invalides, mauvais
    rattachement territorial)\
  - incohérences temporelles (dates manquantes, inversées,
    discontinuités)\
    Ces contrôles peuvent être bloquants ou informatifs selon les cas.

- **Qualification des données**\
  Attribution d'un niveau de qualité ou de confiance aux données, en
  fonction de critères définis (source, méthode de production,
  complétude, fréquence de mise à jour).\
  Cette qualification doit être exploitable dans les traitements
  ultérieurs (filtrage, pondération, affichage différencié).

- **Gestion des métadonnées**\
  Association systématique de métadonnées aux jeux de données :

  - source et producteur\
  - date de production et de mise à jour\
  - description du contenu\
  - méthodes de collecte ou de calcul\
    Ces informations doivent être accessibles aux utilisateurs afin de
    faciliter l'interprétation.

- **Indicateurs de fiabilité**\
  Production d'indicateurs synthétiques permettant d'évaluer la qualité
  globale d'un jeu de données ou d'un indicateur :

  - taux de complétude\
  - fréquence de mise à jour\
  - niveau de validation\
    Ces indicateurs doivent être visibles dans les interfaces (tableaux
    de bord, fiches indicateurs).

- **Monitoring**

Dans cet EPIC les besoins en monitoring intègre des mécanismes de suivi
continu de la qualité des données afin d'éclairer leur utilisation.

Les fonctionnalités incluent : - la production d'indicateurs de qualité
(complétude, fraîcheur, cohérence) ; - la détection automatisée
d'anomalies (valeurs aberrantes, ruptures de séries, incohérences
spatiales ou temporelles) ; - la visualisation synthétique de l'état des
données (tableaux de bord de qualité) ; - l'historisation des
indicateurs de qualité afin de suivre leur évolution.

Ces éléments permettent de rendre explicite le niveau de confiance
associé aux données.

#### Points de vigilance {#points-de-vigilance number="0.6.2.3"}

- Hétérogénéité des standards de qualité selon les sources de données\
- Risque de surconfiance dans des données insuffisamment qualifiées\
- Complexité de mise en œuvre des règles de contrôle (équilibre entre
  automatisation et pertinence métier)\
- Nécessité de rendre lisible l'information de qualité sans alourdir
  l'expérience utilisateur\
- Articulation avec les autres EPICS, notamment le calcul d'indicateurs
  et l'analyse multicritère, où la qualité des données conditionne
  directement la validité des résultats

### EPIC 3 : Référentiels {#epic-3-référentiels number="0.6.3"}

Cet EPIC regroupe l'ensemble des éléments structurants nécessaires au
bon fonctionnement d'HydroScope. Les référentiels constituent le socle
commun sur lequel reposent les données, les traitements et les
restitutions. Ils permettent d'assurer la cohérence globale du système,
en garantissant une compréhension partagée des objets manipulés et des
règles associées.

Dans un contexte multi-acteurs et multi-sources, la mise en place de
référentiels fiables et partagés est essentielle pour éviter les
ambiguïtés, faciliter les croisements de données et sécuriser les
analyses.

#### Description {#description-1 number="0.6.3.1"}

L'EPIC couvre la définition, la gestion et la mise à jour des
référentiels utilisés par HydroScope. Il s'agit notamment des
référentiels géographiques, des référentiels d'indicateurs et des
référentiels liés aux utilisateurs.

Ces référentiels doivent être centralisés, versionnés et documentés. Ils
doivent également permettre de gérer les évolutions dans le temps
(modification de périmètres, ajout de nouveaux objets, évolution des
indicateurs) sans remettre en cause la cohérence des données
historiques.

#### Fonctionnalités {#fonctionnalités-1 number="0.6.3.2"}

- **Référentiel géographique**\
  Gestion des objets spatiaux utilisés dans le système :
  - bassins versants d'alimentation en eau potable (BVAEP)\
  - captages et forages\
  - périmètres de protection\
  - limites administratives (communes, provinces)\
  - maillages d'analyse (ex : grille H3)

Ce référentiel doit permettre d'assurer la cohérence spatiale des
données, de gérer les relations entre objets (inclusion, intersection)
et de prendre en compte les évolutions des périmètres dans le temps.

- **Référentiel des indicateurs**\
  Définition et structuration des indicateurs utilisés dans HydroScope :
  - nom, description et finalité\
  - méthode de calcul\
  - unités et échelles d'interprétation\
  - seuils éventuels\
  - liens avec les données sources

Ce référentiel constitue un élément central de la transparence
méthodologique et doit être accessible aux utilisateurs via des fiches
descriptives.

- **Référentiel des utilisateurs et des rôles**\
  Définition des profils utilisateurs et des droits associés :
  - types de profils (expert, technicien, décideur, grand public)\
  - niveaux d'accès aux données et aux fonctionnalités\
  - gestion des rôles et des habilitations

Ce référentiel permet d'adapter l'outil aux différents usages et de
contrôler l'accès aux informations sensibles.

#### Points de vigilance {#points-de-vigilance-1 number="0.6.3.3"}

- Cohérence entre les différents référentiels (ex : correspondance entre
  objets géographiques et indicateurs)\
- Gestion des évolutions dans le temps (modification de périmètres,
  évolution des nomenclatures)\
- Nécessité de documenter précisément les référentiels pour éviter les
  ambiguïtés d'usage\
- Risque de multiplication des référentiels non maîtrisés si la
  gouvernance n'est pas clairement définie\
- Importance de l'alignement avec les standards existants (notamment
  géographiques) pour garantir l'interopérabilité

### EPIC 4 : Calcul d'indicateurs {#epic-4-calcul-dindicateurs number="0.6.4"}

Cet EPIC constitue le cœur analytique d'HydroScope. Il regroupe
l'ensemble des mécanismes permettant de transformer les données brutes
en indicateurs exploitables pour le suivi, l'analyse et l'aide à la
décision.

Les indicateurs produits doivent permettre de caractériser les
territoires, d'identifier les pressions exercées sur la ressource en eau
et de suivre leur évolution dans le temps. Leur construction repose sur
des choix méthodologiques structurants, qui doivent être explicités et
maîtrisés.

#### Description {#description-2 number="0.6.4.1"}

L'EPIC couvre la définition, le calcul, la gestion et l'évolution des
indicateurs. Il s'appuie sur les données structurées (EPIC 1),
qualifiées (EPIC 2) et organisées via les référentiels (EPIC 3).

Les traitements doivent permettre de produire des indicateurs à
différentes échelles spatiales (captage, bassin versant, maille) et
temporelles, tout en garantissant la reproductibilité des résultats.

Une attention particulière est portée à la transparence des méthodes de
calcul et à la capacité du système à gérer les évolutions des
indicateurs dans le temps.

#### Fonctionnalités {#fonctionnalités-2 number="0.6.4.2"}

- **Calculs simples (statistiques descriptives)**\
  Production d'indicateurs de base à partir des données disponibles :
  - moyennes, médianes, sommes\
  - fréquences, occurrences\
  - indicateurs de tendance simple

Ces calculs constituent les briques élémentaires pour des analyses plus
complexes.

- **Agrégations spatiales et temporelles**\
  Transformation des données afin de produire des indicateurs à
  différentes échelles :
  - agrégation de données ponctuelles à l'échelle d'un bassin versant\
  - consolidation sur des périodes temporelles (mensuelle, annuelle,
    pluriannuelle)\
  - gestion des changements d'échelle (ex : maille H3 vers bassin
    versant)

Ces agrégations doivent être maîtrisées afin d'éviter les biais liés aux
changements d'échelle.

- **Paramétrage des méthodes de calcul**\
  Possibilité de définir et d'ajuster les règles de calcul :
  - choix des variables utilisées\
  - définition de seuils\
  - règles d'agrégation\
  - filtres sur les données (qualité, période, source)

Ce paramétrage doit être documenté et accessible afin de garantir la
transparence.

- **Versioning des indicateurs**\
  Gestion des évolutions des indicateurs dans le temps :
  - conservation des versions successives des méthodes de calcul\
  - possibilité de reproduire un indicateur selon une version donnée\
  - traçabilité des modifications (changement de formule, de source, de
    paramètres)

Ce mécanisme est essentiel pour assurer la comparabilité des résultats
dans le temps.

#### Points de vigilance {#points-de-vigilance-2 number="0.6.4.3"}

- Cohérence entre les données sources et les méthodes de calcul
  utilisées\
- Risques liés aux agrégations spatiales et temporelles (perte
  d'information, biais d'échelle)\
- Complexité croissante des indicateurs pouvant nuire à leur
  compréhension\
- Nécessité de documenter précisément les méthodes pour éviter les
  effets "boîte noire"\
- Dépendance forte à la qualité des données en entrée, impactant
  directement la fiabilité des résultats

### EPIC 5 : Analyse multicritère (vigilance forte) {#epic-5-analyse-multicritère-vigilance-forte number="0.6.5"}

### EPIC 5 : Analyse multicritère {#epic-5-analyse-multicritère number="0.6.6"}

L'analyse multicritère constitue un axe d'évolution du projet HydroScope
visant à proposer des lectures synthétiques des dynamiques
territoriales, en combinant plusieurs indicateurs relatifs aux
pressions, aux enjeux et aux caractéristiques des bassins versants.

Elle a pour objectif de faciliter l'identification de situations
prioritaires et d'apporter un appui à la décision, tout en conservant un
lien explicite avec les données et indicateurs sous-jacents.

### Description {#description-3 number="0.6.7"}

Cet EPIC couvre les fonctionnalités permettant de croiser plusieurs
indicateurs afin de produire des analyses agrégées ou des
représentations synthétiques. Il s'inscrit dans une logique exploratoire
et progressive, compte tenu des enjeux méthodologiques associés.

À ce stade, les modalités précises de construction de ces analyses ne
sont pas arrêtées. Elles feront l'objet de travaux spécifiques associant
les partenaires techniques et les utilisateurs, afin de garantir leur
pertinence scientifique et leur compréhension.

L'analyse multicritère devra ainsi être conçue comme un outil d'aide à
l'interprétation, et non comme un mécanisme de décision automatisée.

### Fonctionnalités envisagées {#fonctionnalités-envisagées number="0.6.8"}

À titre indicatif, les fonctionnalités pouvant être couvertes par cet
EPIC incluent :

- la combinaison de plusieurs indicateurs au sein de représentations
  synthétiques ;
- la possibilité d'explorer différentes configurations (sélection
  d'indicateurs, regroupements) ;
- la visualisation des contributions respectives des indicateurs ;
- la comparaison de territoires selon plusieurs critères.

Ces fonctionnalités seront précisées et priorisées au cours du projet.

### Principes de mise en œuvre {#principes-de-mise-en-œuvre number="0.6.9"}

La mise en œuvre de cet EPIC devra respecter plusieurs principes :

- **Transparence** : les méthodes utilisées devront être explicites et
  compréhensibles ;
- **Traçabilité** : les résultats devront pouvoir être reliés aux
  indicateurs sources ;
- **Réversibilité** : il devra être possible de revenir à une lecture
  détaillée des indicateurs ;
- **Prudence méthodologique** : éviter toute simplification excessive ou
  biaisée.

### Points de vigilance {#points-de-vigilance-3 number="0.6.10"}

- Risques liés à l'agrégation de données hétérogènes (échelles, unités,
  qualité)\
- Difficulté d'interprétation des résultats par les utilisateurs\
- Risque d'effet "boîte noire" en cas de manque de transparence\
- Nécessité de validation scientifique des approches retenues\
- Risque de surinterprétation ou d'usage inadapté des résultats

### Positionnement dans le projet {#positionnement-dans-le-projet number="0.6.11"}

Compte tenu de sa complexité et des enjeux méthodologiques associés,
l'analyse multicritère n'est pas intégrée dans le périmètre du MVP. Elle
fera l'objet d'un développement ultérieur, après validation des
principes méthodologiques et des besoins utilisateurs.

Cet EPIC sera abordé de manière progressive, en lien étroit avec les
partenaires techniques, afin de garantir la robustesse et la pertinence
des résultats produits.

### EPIC 6 : Visualisation et exploration {#epic-6-visualisation-et-exploration number="0.6.12"}

Cet EPIC regroupe l'ensemble des fonctionnalités permettant de
restituer, explorer et interpréter les données et indicateurs produits
par HydroScope. Il constitue l'interface principale entre le système et
les utilisateurs, en traduisant des informations complexes en
représentations compréhensibles et exploitables.

L'enjeu est de proposer des outils de visualisation adaptés à des
profils variés, tout en garantissant une lecture fiable et non ambiguë
des données.

#### Description {#description-4 number="0.6.12.1"}

L'EPIC couvre la conception et la mise en œuvre des interfaces de
consultation et d'exploration des données. Il s'appuie sur les
indicateurs produits (EPIC 4) et les référentiels (EPIC 3) pour proposer
des restitutions à différentes échelles spatiales et temporelles.

Les visualisations doivent permettre à la fois une lecture synthétique
des informations (tableaux de bord) et une exploration plus fine
(cartographie, graphiques), en fonction des besoins des utilisateurs.

Une attention particulière est portée à l'ergonomie, à la lisibilité et
à la cohérence des représentations proposées.

#### Fonctionnalités {#fonctionnalités-3 number="0.6.12.2"}

- **Cartographie interactive**\
  Visualisation des données et indicateurs sur des supports
  cartographiques :
  - affichage des bassins versants, captages et autres objets
    géographiques\
  - représentation des indicateurs sous forme de couches thématiques\
  - navigation (zoom, déplacement) et interaction (sélection, survol)\
  - superposition de plusieurs couches d'information

La cartographie constitue un élément central pour appréhender les
dynamiques territoriales.

- **Tableaux de bord**\
  Mise à disposition de vues synthétiques permettant de suivre les
  principaux indicateurs :
  - sélection d'indicateurs clés\
  - visualisation agrégée par territoire ou thématique\
  - accès rapide à l'information essentielle

Ces tableaux de bord doivent être adaptés aux différents profils
utilisateurs.

- **Graphiques temporels**\
  Représentation de l'évolution des indicateurs dans le temps :
  - séries temporelles\
  - comparaison de périodes\
  - identification de tendances et de ruptures

Ces outils permettent d'analyser les dynamiques et les évolutions.

- **Comparaisons spatiales**\
  Possibilité de comparer plusieurs territoires ou objets :
  - comparaison entre bassins versants\
  - comparaison entre captages\
  - visualisation simultanée de plusieurs entités

Ces fonctionnalités facilitent la priorisation et l'identification des
situations contrastées.

- **Monitoring**

Les fonctionnalités de monitoring dans cet EPIC visent à rendre visibles
et compréhensibles les informations de suivi pour les utilisateurs.

Elles comprennent : - la mise à disposition de tableaux de bord dédiés
au monitoring (technique, qualité des données, indicateurs métier) ; -
l'affichage d'informations de fraîcheur et de qualité directement dans
les visualisations (cartes, graphiques, fiches) ; - des outils de suivi
temporel permettant d'identifier des tendances ou des anomalies ; - des
vues synthétiques facilitant l'identification rapide des situations
nécessitant une attention particulière.

Ces fonctionnalités doivent rester lisibles et adaptées aux différents
profils utilisateurs.

#### Points de vigilance {#points-de-vigilance-4 number="0.6.12.3"}

- Risque de surcharge visuelle pouvant nuire à la compréhension\
- Nécessité d'adapter les visualisations aux différents profils
  d'utilisateurs\
- Importance de la cohérence entre les représentations (cartes,
  graphiques, tableaux)\
- Risque de mauvaise interprétation lié à des choix de représentation
  (échelles, couleurs, classifications)\
- Dépendance à la qualité et à la fraîcheur des données affichées

### EPIC 7 : Aide à la décision {#epic-7-aide-à-la-décision number="0.6.13"}

Cet EPIC vise à traduire les données et indicateurs produits par
HydroScope en éléments directement mobilisables pour l'action. Il ne
s'agit pas de produire une décision automatisée, mais de fournir des
outils permettant d'orienter, de prioriser et de contextualiser les
interventions des gestionnaires.

L'objectif est de faciliter la lecture des enjeux, de mettre en évidence
les situations à risque ou prioritaires, et d'accompagner
l'interprétation des résultats dans une logique d'appui à la décision
publique.

#### Description {#description-5 number="0.6.13.1"}

L'EPIC couvre l'ensemble des mécanismes permettant de passer d'une
information analytique (indicateurs, visualisations) à une information
décisionnelle. Il s'appuie sur les EPICS précédents, notamment le calcul
d'indicateurs et la visualisation, pour proposer des synthèses, des
alertes et des outils d'interprétation.

Les fonctionnalités doivent permettre d'identifier rapidement les
territoires ou les captages nécessitant une attention particulière, tout
en conservant un accès au détail des données pour justifier les
analyses.

#### Fonctionnalités {#fonctionnalités-4 number="0.6.13.2"}

- **Seuils et alertes**\
  Définition de seuils sur certains indicateurs afin de signaler des
  situations spécifiques :
  - dépassement de seuils critiques\
  - évolution rapide ou anormale d'un indicateur\
  - détection d'événements significatifs

Ces alertes doivent être paramétrables et contextualisées pour éviter
les effets de sur-alarme.

- **Lecture synthétique des indicateurs**\
  Production de synthèses facilitant la compréhension globale d'une
  situation :
  - scores ou niveaux d'état (avec prudence méthodologique)\
  - regroupement d'indicateurs par thématique (pressions, enjeux, état)\
  - visualisation simplifiée des résultats

Ces synthèses doivent rester transparentes et explicables.

- **Fiches territoires**\
  Mise à disposition de fiches synthétiques pour chaque objet (bassin
  versant, captage, périmètre) :
  - caractéristiques principales\
  - indicateurs clés\
  - évolution dans le temps\
  - éléments de contexte

Ces fiches constituent un point d'entrée privilégié pour les
utilisateurs.

- **Interprétation guidée**\
  Apport d'éléments d'aide à la lecture des indicateurs :
  - définitions et explications associées aux indicateurs\
  - mise en contexte des valeurs observées\
  - recommandations générales d'interprétation

L'objectif est de limiter les risques de mauvaise compréhension,
notamment pour les utilisateurs non experts.

- **Monitoring**

Le monitoring dans cet EPIC vise à transformer les observations en
signaux utiles pour l'action.

Les fonctionnalités incluent : - la définition de seuils d'alerte sur
les indicateurs clés ; - la détection automatique d'évolutions
significatives (tendances, ruptures) ; - la génération d'alertes
contextualisées (territoire, indicateur, période) ; - la mise en
évidence des territoires ou captages prioritaires.

Ces mécanismes doivent être paramétrables et interprétables afin
d'éviter des alertes inadaptées.

#### Points de vigilance {#points-de-vigilance-5 number="0.6.13.3"}

- Risque de simplification excessive pouvant masquer la complexité des
  phénomènes\
- Nécessité de rendre explicites les règles utilisées (seuils,
  agrégations)\
- Risque d'effet "boîte noire" si les synthèses ne sont pas justifiées\
- Importance de ne pas substituer l'outil à l'expertise des
  gestionnaires\
- Risque de surinterprétation ou de mauvaise utilisation des indicateurs
  dans des contextes non adaptés

### EPIC 8 : Export et diffusion {#epic-8-export-et-diffusion number="0.6.14"}

Cet EPIC regroupe les fonctionnalités permettant de diffuser, partager
et valoriser les données et analyses produites par HydroScope. Il répond
à un enjeu central du projet : faciliter l'accès à une information
fiable et homogène pour l'ensemble des parties prenantes, tout en
permettant leur réutilisation dans d'autres contextes.

L'objectif est de rendre les données et résultats produits facilement
exploitables, que ce soit pour des usages internes (analyse, reporting)
ou externes (communication, partage inter-institutionnel).

#### Description {#description-6 number="0.6.14.1"}

L'EPIC couvre les mécanismes d'export des données et des indicateurs,
ainsi que leur mise à disposition via différents supports. Il doit
permettre de répondre à des besoins variés, allant de l'extraction brute
de données à la production de documents synthétiques.

Les fonctionnalités doivent être adaptées aux différents profils
d'utilisateurs, en tenant compte de leurs besoins en termes de format,
de niveau de détail et de fréquence d'accès.

#### Fonctionnalités {#fonctionnalités-5 number="0.6.14.2"}

- **Export de données**\
  Possibilité d'extraire les données et indicateurs sous des formats
  standards :
  - formats tabulaires (CSV, Excel)\
  - formats géographiques (GeoJSON, Shapefile, etc.)\
  - export filtré selon des critères (territoire, période, indicateur)

Ces exports doivent permettre une réutilisation directe dans des outils
tiers.

- **Export de rapports**\
  Génération de documents synthétiques :
  - rapports par territoire (bassin versant, captage)\
  - synthèses thématiques\
  - intégration de cartes, graphiques et indicateurs

Ces rapports doivent être adaptés à des usages de communication et
d'aide à la décision.

- **Partage de résultats**\
  Mise à disposition de fonctionnalités facilitant le partage :
  - liens de consultation\
  - diffusion auprès de partenaires\
  - partage de vues spécifiques (tableaux de bord, cartes)

Ces mécanismes doivent permettre de diffuser une information cohérente
entre acteurs.

- **API de diffusion**\
  Exposition des données via des interfaces programmatiques :
  - accès aux indicateurs et données structurées\
  - possibilité d'intégration dans d'autres systèmes\
  - gestion des droits d'accès

Cette ouverture permet d'inscrire HydroScope dans un écosystème plus
large.

#### Points de vigilance {#points-de-vigilance-6 number="0.6.14.3"}

- Maîtrise des droits d'accès et des niveaux de diffusion (données
  sensibles)\
- Cohérence entre les données diffusées et les données visualisées dans
  l'application\
- Risque de mauvaise interprétation en dehors du contexte fourni par
  l'outil\
- Nécessité de documenter les formats et contenus diffusés\
- Gestion des performances et des volumes de données lors des exports

### EPIC 9 : Gestion des utilisateurs {#epic-9-gestion-des-utilisateurs number="0.6.15"}

Cet EPIC regroupe les fonctionnalités liées à la gestion des accès, des
profils et des droits au sein d'HydroScope. Il vise à garantir un accès
sécurisé et adapté aux données et aux fonctionnalités, en tenant compte
de la diversité des utilisateurs et des usages.

Dans un contexte multi-acteurs, impliquant des partenaires
institutionnels, techniques et potentiellement le grand public, la
gestion des utilisateurs constitue un élément clé pour assurer à la fois
la sécurité des données et la pertinence des informations diffusées.

#### Description {#description-7 number="0.6.15.1"}

L'EPIC couvre l'ensemble des mécanismes d'authentification,
d'autorisation et de gestion des profils utilisateurs. Il doit permettre
de contrôler l'accès aux données, de différencier les niveaux de
visibilité et d'adapter les fonctionnalités disponibles en fonction des
besoins et des rôles.

Le système doit également permettre une gestion évolutive des
utilisateurs, afin d'intégrer de nouveaux acteurs et d'adapter les
droits en fonction des évolutions organisationnelles.

#### Fonctionnalités {#fonctionnalités-6 number="0.6.15.2"}

- **Authentification**\
  Mise en place de mécanismes permettant d'identifier les utilisateurs :
  - connexion sécurisée (identifiant / mot de passe)\
  - possibilité d'intégration avec des systèmes existants (SSO,
    annuaires)\
  - gestion des sessions

Ces mécanismes doivent garantir la sécurité des accès tout en restant
simples d'utilisation.

- **Gestion des droits d'accès**\
  Définition et gestion des autorisations :
  - accès aux données (restreint ou ouvert selon les profils)\
  - accès aux fonctionnalités (visualisation, export, paramétrage)\
  - gestion fine des permissions

Cette gestion doit permettre de protéger les données sensibles tout en
facilitant leur diffusion lorsque cela est pertinent.

- **Profils utilisateurs**\
  Définition de profils adaptés aux différents usages :
  - profils techniques (experts, analystes)\
  - profils opérationnels (collectivités, gestionnaires)\
  - profils décisionnels\
  - éventuellement accès grand public

Chaque profil doit bénéficier d'une interface et de fonctionnalités
adaptées à ses besoins.

- **Monitoring**

Les fonctionnalités de monitoring dans cet EPIC concernent le suivi et
l'analyse des usages de la plateforme.

Elles comprennent : - le suivi de la fréquentation de l'outil
(connexions, sessions) ; - l'analyse des usages par type d'utilisateur
(fonctionnalités consultées, parcours) ; - le suivi des actions
réalisées (consultations, exports, modifications) ; - la production de
statistiques d'usage pour orienter les évolutions du produit.

Ces éléments contribuent à l'amélioration continue de l'outil et à
l'adaptation aux besoins réels.

#### Points de vigilance {#points-de-vigilance-7 number="0.6.15.3"}

- Équilibre entre sécurité des données et accessibilité pour les
  utilisateurs\
- Complexité potentielle de la gestion des droits si elle n'est pas bien
  structurée\
- Nécessité d'aligner les profils avec les usages réels et les
  organisations existantes\
- Gestion des évolutions (arrivées/départs d'utilisateurs, changements
  de rôle)\
- Cohérence avec les règles de diffusion définies dans l'EPIC Export et
  diffusion

### EPIC 10 : Traçabilité et audit {#epic-10-traçabilité-et-audit number="0.6.16"}

Cet EPIC vise à garantir la transparence, la reproductibilité et la
fiabilité des traitements réalisés au sein d'HydroScope. Il constitue un
élément central pour instaurer un climat de confiance dans l'outil, en
permettant de comprendre l'origine des données, les transformations
appliquées et les actions réalisées par les utilisateurs.

Dans un contexte où les indicateurs produits peuvent influencer des
décisions publiques, la capacité à tracer les opérations et à auditer
les résultats est essentielle.

#### Description {#description-8 number="0.6.16.1"}

L'EPIC couvre l'ensemble des mécanismes permettant de suivre
l'historique des données, des traitements et des actions utilisateurs.
Il s'appuie sur les principes de traçabilité définis dans la vision
produit et doit permettre de reconstituer, à tout moment, le cheminement
ayant conduit à un résultat donné.

Il doit également permettre d'identifier les modifications apportées au
système (données, paramètres, indicateurs) et d'en analyser les impacts.

#### Fonctionnalités {#fonctionnalités-7 number="0.6.16.2"}

- **Historique des modifications**\
  Enregistrement des évolutions apportées aux données et aux
  référentiels :
  - modifications de données\
  - mises à jour de référentiels\
  - changements de paramètres

Cet historique doit permettre de visualiser les évolutions dans le temps
et, si nécessaire, de revenir à un état antérieur.

- **Traçabilité des calculs**\
  Capacité à documenter les traitements appliqués pour produire un
  indicateur :
  - données sources utilisées\
  - règles de calcul appliquées\
  - version de l'indicateur\
  - paramètres utilisés

Cette traçabilité doit permettre de reproduire un calcul et d'en
comprendre les résultats.

- **Journal des actions**\
  Enregistrement des actions réalisées par les utilisateurs :
  - connexions\
  - imports de données\
  - modifications de paramètres\
  - exports réalisés

Ce journal permet de suivre l'utilisation du système et de répondre à
des besoins d'audit ou de sécurité.

- **Monitoring**

Cet EPIC assure la consolidation des informations de suivi dans une
logique d'audit et de transparence.

Les fonctionnalités incluent : - la centralisation des journaux
d'événements techniques et fonctionnels ; - la traçabilité complète des
traitements (données sources, calculs, paramètres) ; - l'historique des
actions utilisateurs ; - la mise à disposition d'outils d'audit
permettant d'analyser les événements et de reconstituer les processus.

Ces éléments sont essentiels pour garantir la reproductibilité des
analyses et la confiance dans le système.

#### Points de vigilance {#points-de-vigilance-8 number="0.6.16.3"}

- Volume important de données générées par les logs et historiques\
- Nécessité de rendre la traçabilité exploitable et compréhensible pour
  les utilisateurs\
- Équilibre entre niveau de détail et lisibilité des informations\
- Gestion des droits d'accès aux informations de traçabilité (données
  potentiellement sensibles)\
- Cohérence avec les mécanismes de versioning (indicateurs, données,
  référentiels)

------------------------------------------------------------------------



## Liste des User Stories (US) identifiées dans les EPICS {#liste-des-user-stories-us-identifiées-dans-les-epics number="0.7"}

## Backlog produit et gestion des User Stories {#backlog-produit-et-gestion-des-user-stories number="0.8"}

Le tableau ci-dessus présente une première structuration du backlog
produit d'HydroScope, organisée en EPICS et en User Stories (US). Il
constitue une traduction opérationnelle des besoins fonctionnels
identifiés dans le cadre du projet.

Chaque **EPIC** correspond à un grand ensemble fonctionnel (ex : gestion
des données, visualisation, aide à la décision), lui-même décliné en
**User Stories**, qui décrivent des fonctionnalités attendues du point
de vue utilisateur.

La colonne associée au **MVP (Minimum Viable Product)** permet
d'identifier les fonctionnalités prioritaires à développer en première
phase, afin de disposer rapidement d'un outil opérationnel répondant aux
besoins essentiels.

  ------------------------------------------------------------------------
  EPIC                     ID User Story Libellé User Story          MVP
  ------------------------ ------------- --------------------------- -----
  EPIC 1 -- Gestion des    US1.1         Importer des données via    ✅
  données                                fichier                     

  EPIC 1 -- Gestion des    US1.2         Connecter une API externe   ❌
  données                                                            

  EPIC 1 -- Gestion des    US1.3         Planifier des imports       ✅
  données                                simples                     

  EPIC 1 -- Gestion des    US1.4         Normaliser les données      ✅
  données                                                            

  EPIC 1 -- Gestion des    US1.5         Gérer les erreurs d'import  ✅
  données                                                            

  EPIC 1 -- Gestion des    US1.6         Historiser les données      ✅
  données                                                            

  EPIC 1 -- Gestion des    US1.7         Rejouer un traitement       ❌
  données                                                            

  EPIC 10 -- Traçabilité   US10.1        Tracer imports              ✅

  EPIC 10 -- Traçabilité   US10.2        Tracer calculs              ✅

  EPIC 10 -- Traçabilité   US10.3        Journal actions             ❌

  EPIC 10 -- Traçabilité   US10.4        Historique modifications    ❌

  EPIC 10 -- Traçabilité   US10.5        Reconstituer calcul         ❌

  EPIC 10 -- Traçabilité   US10.6        Audit usages                ❌

  EPIC 2 -- Qualité des    US2.1         Détecter des valeurs        ✅
  données                                aberrantes                  

  EPIC 2 -- Qualité des    US2.2         Vérifier cohérence          ❌
  données                                temporelle                  

  EPIC 2 -- Qualité des    US2.3         Vérifier cohérence spatiale ❌
  données                                                            

  EPIC 2 -- Qualité des    US2.4         Calculer un taux de         ✅
  données                                complétude                  

  EPIC 2 -- Qualité des    US2.5         Qualifier la fiabilité      ✅
  données                                                            

  EPIC 2 -- Qualité des    US2.6         Associer des métadonnées    ✅
  données                                                            

  EPIC 2 -- Qualité des    US2.7         Visualiser la qualité       ❌
  données                                                            

  EPIC 3 -- Référentiels   US3.1         Gérer les bassins versants  ✅

  EPIC 3 -- Référentiels   US3.2         Gérer les captages          ✅

  EPIC 3 -- Référentiels   US3.3         Gérer périmètres de         ❌
                                         protection                  

  EPIC 3 -- Référentiels   US3.4         Gérer la maille H3          ✅

  EPIC 3 -- Référentiels   US3.5         Définir un indicateur       ✅

  EPIC 3 -- Référentiels   US3.6         Gérer les profils           ❌
                                         utilisateurs                

  EPIC 3 -- Référentiels   US3.7         Versionner les référentiels ❌

  EPIC 4 -- Calcul         US4.1         Calculer des indicateurs    ✅
  d'indicateurs                          simples                     

  EPIC 4 -- Calcul         US4.2         Agréger à l'échelle BV      ✅
  d'indicateurs                                                      

  EPIC 4 -- Calcul         US4.3         Agrégation temporelle       ✅
  d'indicateurs                                                      

  EPIC 4 -- Calcul         US4.4         Paramétrer un calcul        ❌
  d'indicateurs                                                      

  EPIC 4 -- Calcul         US4.5         Filtrer les données         ✅
  d'indicateurs                                                      

  EPIC 4 -- Calcul         US4.6         Versionner un indicateur    ❌
  d'indicateurs                                                      

  EPIC 4 -- Calcul         US4.7         Recalculer un indicateur    ❌
  d'indicateurs                                                      

  EPIC 5 -- Analyse        US5.1         Construire un indice        ❌
  multicritère                           composite                   

  EPIC 5 -- Analyse        US5.2         Définir des pondérations    ❌
  multicritère                                                       

  EPIC 5 -- Analyse        US5.3         Tester des scénarios        ❌
  multicritère                                                       

  EPIC 5 -- Analyse        US5.4         Comparer scénarios          ❌
  multicritère                                                       

  EPIC 5 -- Analyse        US5.5         Visualiser contributions    ❌
  multicritère                                                       

  EPIC 5 -- Analyse        US5.6         Documenter méthodes         ❌
  multicritère                                                       

  EPIC 6 -- Visualisation  US6.1         Visualiser sur carte        ✅

  EPIC 6 -- Visualisation  US6.2         Afficher indicateurs carto  ✅

  EPIC 6 -- Visualisation  US6.3         Navigation (zoom filtres)   ✅

  EPIC 6 -- Visualisation  US6.4         Graphiques temporels        ✅

  EPIC 6 -- Visualisation  US6.5         Comparer territoires        ❌

  EPIC 6 -- Visualisation  US6.6         Tableau de bord avancé      ❌

  EPIC 6 -- Visualisation  US6.7         Fiche territoire            ✅

  EPIC 7 -- Aide à la      US7.1         Définir des seuils          ✅
  décision                                                           

  EPIC 7 -- Aide à la      US7.2         Détecter dépassement        ❌
  décision                                                           

  EPIC 7 -- Aide à la      US7.3         Identifier tendances        ✅
  décision                                                           

  EPIC 7 -- Aide à la      US7.4         Fiche synthétique           ✅
  décision                                                           

  EPIC 7 -- Aide à la      US7.5         Prioriser territoires       ❌
  décision                                                           

  EPIC 7 -- Aide à la      US7.6         Aide à interprétation       ❌
  décision                               avancée                     

  EPIC 8 -- Export         US8.1         Export CSV                  ✅

  EPIC 8 -- Export         US8.2         Export SIG                  ❌

  EPIC 8 -- Export         US8.3         Rapport PDF                 ❌

  EPIC 8 -- Export         US8.4         Partage lien                ❌

  EPIC 8 -- Export         US8.5         API                         ❌

  EPIC 8 -- Export         US8.6         Export vue simple           ✅

  EPIC 9 -- Utilisateurs   US9.1         Créer compte                ❌

  EPIC 9 -- Utilisateurs   US9.2         Authentification            ✅

  EPIC 9 -- Utilisateurs   US9.3         Rôles simples               ✅

  EPIC 9 -- Utilisateurs   US9.4         Restreindre accès fin       ❌

  EPIC 9 -- Utilisateurs   US9.5         Adapter interface           ❌

  EPIC 9 -- Utilisateurs   US9.6         Suivre connexions           ❌
  ------------------------------------------------------------------------

### Rôle du backlog {#rôle-du-backlog number="0.8.1"}

Ce backlog constitue un outil de pilotage des developpement du projet.
Il permettra de :

- structurer les besoins de manière progressive et lisible ;
- prioriser les développements en fonction de la valeur métier ;
- suivre l'avancement des fonctionnalités au fil des itérations ;
- faciliter les échanges entre la MOA, l'AMOA (si existante) et la MOE.

Il ne s'agit pas d'un document figé, mais d'un référentiel de base qui
est évolutif.

### Évolution du backlog {#évolution-du-backlog number="0.8.2"}

Dans une démarche Agile, le backlog est amené à évoluer tout au long du
projet :

- de nouvelles User Stories pourront être ajoutées à mesure que les
  besoins se précisent ;
- certaines User Stories pourront être reformulées ou découpées ;
- les priorités pourront être ajustées en fonction des retours
  utilisateurs, des contraintes techniques ou des arbitrages projet ;
- des fonctionnalités initialement prévues hors MVP pourront être
  intégrées plus tôt, ou inversement.

Cette capacité d'adaptation est essentielle pour garantir la pertinence
du produit final.

### Intégration dans les outils de gestion de projet {#intégration-dans-les-outils-de-gestion-de-projet number="0.8.3"}

Le backlog présenté dans ce document a vocation à être intégré dans les
outils de gestion de projet utilisés par l'OEIL, notamment **Azure
DevOps**.

Dans ce cadre :

- les EPICS et User Stories seront créés et structurés dans un projet
  dédié ;
- ils seront enrichis avec des critères d'acceptation, des estimations
  de charge et des dépendances ;
- ils seront planifiés et suivis au sein des sprints de développement ;
- leur avancement sera tracé de manière continue
- le code source sera hebergé dans l'infrastructure de l'OEIL et les
  commits seront liés aux US dans la mesure du possible.

Le tableau présent dans le présent cahier des charges constitue ainsi
une base de travail initiale, destinée à être opérationnalisée et
détaillée dans l'outil de gestion de projet au cours de la phase de
réalisation.

------------------------------------------------------------------------



## Exigences non fonctionnelles {#exigences-non-fonctionnelles number="0.9"}

Les exigences non fonctionnelles définissent les qualités attendues du
système HydroScope au-delà des fonctionnalités métiers. Elles visent à
garantir la performance, la sécurité, la robustesse et la pérennité de
la solution, tout en assurant une expérience utilisateur adaptée aux
différents profils.

Ces exigences doivent être prises en compte dès la conception du système
afin d'éviter des limitations structurelles ou des coûts de refonte
ultérieurs.

### Performance {#performance number="0.9.1"}

Le système doit offrir des temps de réponse compatibles avec les usages
attendus :

- affichage des cartes et tableaux de bord : **\< 3 secondes** dans des
  conditions nominales ;
- chargement de fiches territoires : **\< 2 secondes** ;
- génération de graphiques temporels : **\< 3 secondes**.

Les traitements de calcul d'indicateurs doivent être réalisés : - en
temps quasi immédiat pour les indicateurs simples (quelques secondes)
; - en différé (pipeline de traitement en arrière plan) pour les
traitements lourds, avec des délais maîtrisés et suivi (cf. monitoring).

@todo [priority=high, subject=lien]: faire le lien avec la section
monitoring pour le suivi des traitements en arrière plan

### Volumétrie et charge {#volumétrie-et-charge number="0.9.2"}

Le système devra être dimensionné pour gérer les volumes suivants :

- plusieurs dizaines de bassins versants et
- plusieurs centaines de captages et forages ;
- plusieurs dizaines d'indicateurs calculés à différentes échelles ;
- des données spatiales potentiellement volumineuses (maillages, séries
  temporelles) ;

@todo [priority=high, subject=processing]: indiquer la volumetrie plus
précisement sur les traitements.

Le système devra permettre :

- la gestion de **10 à 50 utilisateurs simultanés** (ordre de grandeur)
  ;
- des mises à jour régulières des données (de quotidienne à annuelle
  selon les sources) ;
- une évolution du volume de données dans le temps.

Ces exigences seront précisées et validées lors des phases de
conception.

### Sécurité {#sécurité number="0.9.3"}

HydroScope doit garantir la protection des données et des accès au
système.

Cela inclut :

- la sécurisation des accès (authentification, gestion des droits) ;
- la protection des données utilisateur et des données sensibles ;
- la sécurisation des échanges pour certaines données avec les systèmes
  externes ;
- Une traçabilité des accès et des actions.

Les mécanismes de sécurité doivent être adaptés aux différents niveaux
d'utilisateurs et aux contraintes institutionnelles.

### Interopérabilité {#interopérabilité number="0.9.4"}

Le système doit pouvoir s'intégrer dans un écosystème existant de
données et d'outils:

- le respect des standards en vigueur, notamment pour les données
  géographiques ;
- la capacité à consommer et à exposer des données via des API ;
- la compatibilité avec les formats d'échange usuels (tabulaires,
  géographiques) ;
- la possibilité d'interagir avec des systèmes tiers (API sécurisés ou
  non, webservices OGC et ESRI, serveur FTP).
- @todo [priority=high, subject=API]: préciser les usage des API externe
  prévues.

L'interopérabilité est un facteur clé pour faciliter le partage et la
réutilisation des données.

### Accessibilité et ergonomie {#accessibilité-et-ergonomie number="0.9.5"}

L'interface utilisateur doit être conçue pour être accessible à des
profils variés, allant des experts aux utilisateurs non spécialisés.

- une navigation claire et intuitive ;
- des interfaces adaptées aux usages (exploration, analyse, restitution)
  ;
- une lisibilité des informations (cartes, graphiques, tableaux) ;
- une prise en compte des bonnes pratiques en matière d'accessibilité
  numérique.

L'objectif est de faciliter l'appropriation de l'outil et de limiter les
risques de mauvaise interprétation.

### Maintenabilité et évolutivité {#maintenabilité-et-évolutivité number="0.9.6"}

Le système doit être conçu de manière à faciliter sa maintenance et son
évolution dans le temps.

- une architecture modulaire permettant d'ajouter ou de modifier des
  fonctionnalités (microservices);
- une documentation technique et fonctionnelle complète fourni qu format
  numérique, mise à jour à chaque livraison de version;
- la possibilité de faire évoluer les indicateurs, les référentiels et
  les sources de données;

Ces éléments doivent permettre d'assurer la pérennité du système et sa
capacité à s'adapter aux évolutions futures.

### Disponibilité {#disponibilité number="0.9.7"}

Le système devra garantir un niveau de disponibilité compatible avec les
usages :

- disponibilité cible : **≥ 95 %** (hors maintenance planifiée) ;
- plages de maintenance définies et communiquées ;
- reprise en cas d'incident dans des délais maîtrisés (cf. SLA).

@todo [priority=high, subject=lien]: faire le lien avec SLA

### Points de vigilance {#points-de-vigilance-9 number="0.9.8"}

- Cohérence entre volumétrie estimée et choix techniques\
- Risque de dégradation des performances avec l'augmentation des
  données\
- Nécessité d'ajuster les exigences en fonction des usages réels\
- Arbitrage entre performance, coût et complexité technique

------------------------------------------------------------------------



## Architecture cible (niveau macro) {#architecture-cible-niveau-macro number="0.10"}

L'architecture cible d'HydroScope vise à structurer de manière cohérente
les différents composants du système afin de répondre aux besoins
fonctionnels, aux exigences non fonctionnelles et aux contraintes
d'interopérabilité. Elle doit permettre de garantir la robustesse, la
scalabilité et la maintenabilité de la solution, tout en facilitant les
évolutions futures.

Cette architecture repose sur une séparation claire des responsabilités
entre les différentes couches du système : acquisition des données,
stockage, traitement, exposition et restitution.

### Principes généraux {#principes-généraux number="0.10.1"}

L'architecture s'appuie sur les principes suivants :

- **Modularité** : séparation des composants pour faciliter la
  maintenance et les évolutions ;
- **Scalabilité** : capacité à gérer l'augmentation des volumes de
  données et des usages ;
- **Interopérabilité** : intégration facilitée avec des systèmes
  externes et respect des standards ;
- **Traçabilité** : capacité à suivre les flux de données et les
  traitements ;
- **Ouverture** : recours privilégié à des technologies open source
  lorsque cela est pertinent.

### Schéma fonctionnel {#schéma-fonctionnel number="0.10.2"}

L'architecture s'organise autour de plusieurs briques principales :

- **Sources de données**\
  Données internes et externes (services institutionnels, données
  environnementales, données satellitaires, bases existantes).

- **Couche d'ingestion**\
  Mécanismes d'import et de connexion aux sources (API, fichiers, flux
  automatisés), incluant des processus de validation initiale.

- **Couche de stockage**\
  Stockage des données brutes et des données structurées :

  - base de données (relationnelle et/ou spatiale)\
  - stockage des historiques\
  - gestion des référentiels

- **Couche de traitement**\
  Traitements permettant :

  - la transformation et la normalisation des données\
  - le calcul des indicateurs\
  - l'agrégation spatiale et temporelle\
  - l'application des règles métier

- **Couche d'exposition (API)**\
  Mise à disposition des données et indicateurs via des interfaces
  programmatiques, permettant leur consommation par l'application et par
  des systèmes tiers.

- **Couche de restitution (front-end)**\
  Interfaces utilisateurs :

  - cartographie interactive\
  - tableaux de bord\
  - fiches détaillées\
  - outils d'exploration et d'analyse

### Intégration au système d'information existant {#intégration-au-système-dinformation-existant number="0.10.3"}

HydroScope doit s'intégrer dans l'écosystème existant des partenaires.

Cela implique : - la connexion à des sources de données existantes sans
duplication inutile ; - la capacité à consommer des services externes
(API, flux de données) ; - la possibilité de diffuser les données
produites vers d'autres systèmes ; - la compatibilité avec les outils
SIG et les standards géographiques.

Cette intégration doit être pensée de manière à limiter les redondances
et à favoriser la cohérence des données entre systèmes.

### Choix technologiques (à cadrer) {#choix-technologiques-à-cadrer number="0.10.4"}

Les choix technologiques seront précisés lors des phases de conception
détaillée. Ils devront répondre aux exigences du projet en matière de
performance, de sécurité, d'interopérabilité et de maintenabilité.

Une attention particulière sera portée : - à l'utilisation de
technologies open source ; - à la gestion des données géographiques ; -
à la capacité à traiter des volumes de données importants ; - à la
facilité de déploiement et d'exploitation.

Ces choix devront être validés en cohérence avec les contraintes des
partenaires et les compétences disponibles.

------------------------------------------------------------------------



## Organisation du projet en mode Agile {#organisation-du-projet-en-mode-agile-1 number="0.11"}

Le projet HydroScope est conduit selon une approche itérative et
incrémentale inspirée des méthodes Agile. Cette organisation vise à
adapter en continu le produit aux besoins des utilisateurs, à sécuriser
les développements et à garantir une livraison progressive de
fonctionnalités opérationnelles.

Elle permet également de concilier des exigences de rigueur
méthodologique (notamment sur les indicateurs) avec une capacité
d'adaptation aux retours terrain.

### Principes d'organisation {#principes-dorganisation number="0.11.1"}

L'organisation du projet repose sur les principes suivants :

- **Itération** : développement par cycles courts permettant des
  ajustements réguliers ;
- **Incrémentation** : livraison progressive de fonctionnalités
  utilisables ;
- **Priorisation par la valeur** : les fonctionnalités sont développées
  en fonction de leur utilité métier ;
- **Co-construction** : implication continue des utilisateurs et
  partenaires ;
- **Amélioration continue** : adaptation des pratiques au fil du projet.

### Backlog produit {#backlog-produit number="0.11.2"}

Le projet s'appuie sur un **backlog produit** structuré, qui constitue
le référentiel central des besoins.

Ce backlog est organisé :

- en **EPICS**, correspondant aux grandes fonctionnalités du système ;
- en **User Stories (US)**, décrivant les besoins du point de vue
  utilisateur.

Le backlog est :

- maintenu et priorisé par la **MOA**, avec l'appui de l'AMOA ;
- enrichi et ajusté en continu en fonction des retours utilisateurs et
  des contraintes techniques ;
- utilisé comme base de planification des développements.

Le backlog a vocation à être intégré et suivi dans les outils de gestion
de projet utilisés par l'OEIL, notamment **Azure DevOps**, permettant :

- le suivi de l'avancement ;
- la traçabilité des développements ;
- le lien entre besoins fonctionnels et réalisation technique.

### Stratégie MVP (Minimum Viable Product) {#stratégie-mvp-minimum-viable-product-1 number="0.11.3"}

Le projet prévoit la réalisation d'un **MVP (Minimum Viable Product)**
dès les premières phases de développement.

Le MVP constitue une première version fonctionnelle du système, centrée
sur les fonctionnalités à plus forte valeur métier. Il vise à : -
proposer un socle opérationnel (données, indicateurs, visualisation) ; -
permettre une première utilisation par les acteurs ; - recueillir des
retours utilisateurs en conditions réelles.

Le périmètre du MVP est volontairement restreint afin de : - limiter les
risques techniques et méthodologiques ; - valider les choix structurants
du projet ; - faciliter une montée en charge progressive.

Le détail du périmètre fonctionnel du MVP est détaillé dans une section
suivante du présent document.

@todo [priority=high, section=link] : mettre lien section

### Organisation des sprints {#organisation-des-sprints number="0.11.4"}

Le développement est organisé en cycles courts appelés **sprints**,
d'une durée généralement comprise entre 2 et 4 semaines.

Chaque sprint comprend : - la sélection d'un ensemble de User Stories
issues du backlog priorisé ; - leur conception, développement et test
; - la production d'un incrément fonctionnel utilisable.

Cette organisation permet : - des livraisons régulières ; - une
réduction des risques ; - une meilleure visibilité sur l'avancement.

### Rituels Agile {#rituels-agile number="0.11.5"}

Le projet s'appuie sur des rituels permettant d'assurer la coordination
et le pilotage :

- **Sprint planning** : définition des objectifs et du contenu du sprint
  ;
- **Points de suivi réguliers** : coordination de l'équipe projet ;
- **Sprint review** : présentation des fonctionnalités réalisées aux
  parties prenantes ;
- **Rétrospective** : amélioration continue des pratiques.

Ces rituels structurent le fonctionnement de l'équipe et facilitent la
communication entre les acteurs.

### Validation et implication des utilisateurs {#validation-et-implication-des-utilisateurs number="0.11.6"}

Les utilisateurs sont associés tout au long du projet afin de garantir
l'adéquation de l'outil aux besoins réels.

Cela se traduit par : - des démonstrations régulières des
fonctionnalités développées ; - la collecte de retours utilisateurs à
chaque itération ; - l'intégration de ces retours dans le backlog.

Cette démarche permet d'ajuster progressivement le produit et de
sécuriser les choix fonctionnels.

### Gestion des livraisons {#gestion-des-livraisons number="0.11.7"}

Le projet prévoit des livraisons progressives, structurées autour :

- d'un **MVP**, mis à disposition rapidement ;
- de versions successives enrichissant les fonctionnalités ;
- d'une validation régulière par la MOA avant mise en production.

Les livraisons sont synchronisées avec les jalons du projet et les
contraintes calendaires définies.

### Points de vigilance {#points-de-vigilance-10 number="0.11.8"}

- Maintenir une forte implication de la MOA dans la priorisation du
  backlog\
- Assurer la cohérence entre rythme Agile et contraintes calendaires
  (OFB / PEP)\
- Garantir la qualité méthodologique des indicateurs malgré les cycles
  courts\
- Éviter la dispersion du backlog et les dérives de périmètre\
- Assurer la traçabilité entre besoins, développements et livraisons

------------------------------------------------------------------------



## Priorisation et périmètre du MVP {#priorisation-et-périmètre-du-mvp number="0.12"}

Dans une logique de développement itératif et de sécurisation des
usages, le projet HydroScope prévoit la mise en œuvre d'un **MVP
(Minimum Viable Product)** dès les premières phases de réalisation.

Ce MVP constitue une première version opérationnelle du système, centrée
sur les fonctionnalités à plus forte valeur métier. Il s'appuie
directement sur les EPICS définis précédemment, en sélectionnant un
sous-ensemble cohérent et priorisé de fonctionnalités.

L'objectif est de disposer rapidement d'un outil permettant : - de
structurer et exploiter les données disponibles ; - de produire des
indicateurs fiables ; - de visualiser et interpréter les résultats à
l'échelle des territoires.

### Périmètre fonctionnel du MVP par EPIC {#périmètre-fonctionnel-du-mvp-par-epic number="0.12.1"}

Le MVP mobilise les EPICS de la manière suivante :

#### EPIC 1 : Gestion des données {#epic-1-gestion-des-données-1 number="0.12.1.1"}

Le MVP intègre les fonctionnalités essentielles permettant l'acquisition
et la structuration des données : - import de données via fichiers ; -
normalisation des données selon un modèle commun ; - gestion simple des
erreurs d'import ; - historisation des données.

Ces éléments constituent le socle du système.

#### EPIC 2 : Qualité et validation des données {#epic-2-qualité-et-validation-des-données-1 number="0.12.1.2"}

Le MVP inclut des mécanismes de contrôle de base : - détection simple
d'anomalies (valeurs aberrantes) ; - calcul d'indicateurs de complétude
; - qualification élémentaire des données ; - gestion des métadonnées.

Ces fonctionnalités permettent d'assurer un premier niveau de fiabilité.

#### EPIC 3 : Référentiels {#epic-3-référentiels-1 number="0.12.1.3"}

Le MVP repose sur la mise en place des référentiels structurants : -
référentiel géographique (bassins versants, captages) ; - premiers
éléments du référentiel indicateurs.

Ces référentiels sont nécessaires à la cohérence du système.

#### EPIC 4 : Calcul d'indicateurs {#epic-4-calcul-dindicateurs-1 number="0.12.1.4"}

Le MVP se concentre sur des indicateurs simples et robustes : - calculs
statistiques de base ; - agrégations spatiales à l'échelle des bassins
versants ; - agrégations temporelles simples ; - filtrage des données
utilisées.

Les mécanismes avancés de paramétrage et de versioning ne sont pas
inclus à ce stade.

#### EPIC 5 : Analyse multicritère {#epic-5-analyse-multicritère-1 number="0.12.1.5"}

Cet EPIC n'est pas intégré dans le MVP.

Les fonctionnalités associées (indices composites, pondérations,
scénarios) sont reportées à des phases ultérieures, en raison des
risques méthodologiques et de leur complexité.

#### EPIC 6 : Visualisation et exploration {#epic-6-visualisation-et-exploration-1 number="0.12.1.6"}

Le MVP intègre les fonctionnalités principales de restitution : -
cartographie interactive des données et indicateurs ; - navigation
(zoom, filtres) ; - graphiques temporels ; - accès à des fiches
territoires.

Ces éléments permettent une appropriation immédiate de l'outil.

#### EPIC 7 : Aide à la décision {#epic-7-aide-à-la-décision-1 number="0.12.1.7"}

Le MVP inclut une version simplifiée de cet EPIC : - définition de
seuils simples ; - identification de tendances ; - restitution
synthétique par territoire.

Les mécanismes avancés de scoring ou d'analyse sont exclus à ce stade.

#### EPIC 8 : Export et diffusion {#epic-8-export-et-diffusion-1 number="0.12.1.8"}

Le MVP propose des capacités d'export limitées : - export de données en
format tabulaire ; - export de vues simples.

Les fonctionnalités avancées (API étendues, diffusion automatisée) sont
reportées.

#### EPIC 9 : Gestion des utilisateurs {#epic-9-gestion-des-utilisateurs-1 number="0.12.1.9"}

Le MVP inclut une gestion simplifiée des accès : - authentification des
utilisateurs ; - gestion de profils basiques.

#### EPIC 10 : Traçabilité et audit {#epic-10-traçabilité-et-audit-1 number="0.12.1.10"}

Le MVP intègre un niveau minimal de traçabilité : - suivi des imports de
données ; - traçabilité simple des calculs.

Les mécanismes d'audit avancés sont hors périmètre à ce stade.

------------------------------------------------------------------------



## Gestion du code source et pratiques de développement {#gestion-du-code-source-et-pratiques-de-développement number="0.13"}

Le développement du projet HydroScope s'appuie sur des pratiques de
gestion de code visant à garantir la qualité, la traçabilité et la
maintenabilité du système.

Le code source sera hébergé au sein de l'infrastructure de l'OEIL, dans
un dépôt dédié. Les outils de gestion de projet et de versionnement
(notamment Azure DevOps) seront utilisés pour assurer la cohérence entre
les développements et les besoins fonctionnels.

#### Gestion des versions {#gestion-des-versions number="0.13.0.1"}

Le code source devra être structuré selon des pratiques de gestion de
versions permettant : - de tracer les évolutions du code ; - de gérer
les développements parallèles ; - de sécuriser les mises en production.

Une stratégie de gestion de branches (par exemple de type GitFlow ou
équivalent) devra être définie et appliquée.

#### Lien avec le backlog {#lien-avec-le-backlog number="0.13.0.2"}

Dans la mesure du possible, chaque évolution du code devra être associée
à une User Story ou à un élément du backlog.

Cela implique : - la référence explicite des identifiants de User
Stories dans les messages de commit ; - la traçabilité entre les
développements réalisés et les besoins fonctionnels ; - une cohérence
entre l'avancement technique et le suivi du backlog dans Azure DevOps.

#### Nomenclature des commits {#nomenclature-des-commits number="0.13.0.3"}

Les messages de commit devront respecter une nomenclature commune afin
de garantir leur lisibilité et leur exploitabilité.

À titre indicatif, les commits pourront suivre une structure de type :

`[EPIC/US] Type : description courte`

Exemples : - `[US4.1] feat : ajout du calcul d’indicateur de base` -
`[US6.2] fix : correction affichage carte` -
`[US1.1] chore : amélioration script import`

Les types de commits peuvent inclure : - `feat` (nouvelle
fonctionnalité) - `fix` (correction) - `chore` (maintenance) -
`refactor` (amélioration du code sans modification fonctionnelle)

#### Revue de code {#revue-de-code number="0.13.0.4"}

Des mécanismes de revue de code (pull requests) devront être mis en
place afin de : - garantir la qualité du code produit ; - partager les
connaissances au sein de l'équipe ; - limiter les risques d'erreur.

#### Points de vigilance {#points-de-vigilance-11 number="0.13.0.5"}

- Maintenir une discipline dans la rédaction des commits\
- Assurer le lien systématique entre code et backlog\
- Éviter les commits trop volumineux ou peu explicites\
- Garantir la cohérence entre branches et cycles de développement

------------------------------------------------------------------------



## Stratégie de déploiement {#stratégie-de-déploiement number="0.14"}

La stratégie de déploiement d'HydroScope vise à mettre à disposition un
outil opérationnel de manière progressive, en sécurisant les usages et
en accompagnant l'appropriation par les utilisateurs. Elle s'inscrit
dans la continuité de l'approche Agile, avec des mises en production
incrémentales et maîtrisées.

L'objectif est de limiter les risques, de valider les choix fonctionnels
en conditions réelles et de permettre une montée en charge progressive
du système.

### Approche progressive {#approche-progressive number="0.14.1"}

Le déploiement du projet s'appuie sur la mise en production d'un MVP,
permettant une première utilisation en conditions réelles sur un
périmètre fonctionnel limité.

Ce MVP sera enrichi progressivement par itérations successives,
permettant d'introduire progressivement les fonctionnalités auprès des
utilisateurs.et en intégrant les retours des utilisateurs et les
évolutions du backlog.

Le déploiement du système est envisagé en plusieurs étapes:

- Mise à disposition d'un **MVP (Minimum Viable Product)** couvrant les
  fonctionnalités essentielles (intégration de données, premiers
  indicateurs, visualisation de base) ;
- Enrichissement progressif des fonctionnalités en fonction des
  priorités du backlog ;
- Extension du périmètre fonctionnel et des jeux de données intégrés.

Cette approche permet de tester rapidement les usages et d'ajuster le
produit en continu.

### Environnements {#environnements number="0.14.2"}

Le système devra être déployé sur plusieurs environnements distincts
afin de garantir la qualité et la sécurité des mises en production :

- **Environnement de développement** : utilisé par la MOE pour le
  développement et les tests techniques ;
- **Environnement de test / recette** : utilisé pour la validation
  fonctionnelle par la MOA et les utilisateurs ;
- **Environnement de production** : accessible aux utilisateurs finaux.

La gestion des environnements doit permettre de sécuriser les
déploiements et de limiter les risques de régression.

### Modalités de mise en production {#modalités-de-mise-en-production number="0.14.3"}

Les mises en production seront réalisées de manière régulière, en
cohérence avec les cycles de développement.

- Déploiement des nouvelles fonctionnalités à l'issue des phases de
  validation ;
- Vérification du bon fonctionnement après mise en production ;
- Possibilité de retour arrière en cas de problème majeur.

Une attention particulière devra être portée à la continuité de service
lors des mises à jour.

### Montée en charge {#montée-en-charge number="0.14.4"}

Le déploiement devra prendre en compte une montée en charge progressive
:

- augmentation du nombre d'utilisateurs ;
- intégration de nouveaux jeux de données ;
- extension des fonctionnalités.

Le système devra être dimensionné pour accompagner cette montée en
charge sans dégradation des performances.

### Accompagnement au déploiement {#accompagnement-au-déploiement number="0.14.5"}

Le déploiement devra être accompagné afin de faciliter l'appropriation
de l'outil :

- information des utilisateurs sur les évolutions ;
- organisation de phases de test avec les utilisateurs ;
- prise en compte des retours dans les versions suivantes.

Cet accompagnement est essentiel pour assurer l'adhésion des parties
prenantes.

### Points de vigilance {#points-de-vigilance-12 number="0.14.6"}

- Coordination entre les cycles Agile et les contraintes de mise en
  production\
- Gestion des dépendances entre fonctionnalités\
- Risque de décalage entre les attentes utilisateurs et les
  fonctionnalités livrées\
- Nécessité de maintenir la cohérence des données entre environnements\
- Anticipation des impacts techniques liés à la montée en charge

------------------------------------------------------------------------



## Recette et validation {#recette-et-validation number="0.15"}

La recette et la validation du système HydroScope constituent une étape
essentielle pour garantir la conformité de la solution aux besoins
exprimés, ainsi que la fiabilité des traitements et des indicateurs
produits. Elles s'inscrivent dans une démarche continue, en cohérence
avec l'approche Agile du projet.

L'objectif est de vérifier à la fois la qualité fonctionnelle du
système, la robustesse technique et la validité méthodologique des
résultats.

### Stratégie de tests {#stratégie-de-tests number="0.15.1"}

La stratégie de tests repose sur plusieurs niveaux complémentaires :

- **Tests techniques** réalisés par la MOE :
  - tests unitaires (fonctions, composants) ;
  - tests d'intégration (enchaînement des traitements, flux de données)
    ;
  - tests de performance.
- **Tests fonctionnels** :
  - vérification de la conformité des fonctionnalités aux besoins
    exprimés ;
  - validation des interfaces et des parcours utilisateurs.
- **Tests de non-régression** :
  - vérification que les évolutions n'altèrent pas les fonctionnalités
    existantes.

Ces tests sont réalisés de manière continue au fil des sprints.

### Recette fonctionnelle {#recette-fonctionnelle number="0.15.2"}

La recette fonctionnelle est pilotée par la MOA, avec l'appui de l'AMOA
et la participation des utilisateurs.

Elle vise à : - valider la conformité des fonctionnalités livrées ; -
vérifier l'adéquation de l'outil aux usages métiers ; - identifier les
écarts ou anomalies.

La recette s'appuie sur des scénarios de test représentatifs des usages
réels. Elle est réalisée de manière itérative, à chaque livraison de
fonctionnalités.

### Validation scientifique et méthodologique {#validation-scientifique-et-méthodologique number="0.15.3"}

Compte tenu de la nature du projet, une attention particulière est
portée à la validation des indicateurs et des méthodes de calcul.

Cette validation vise à : - vérifier la pertinence des indicateurs
produits ; - contrôler la cohérence des méthodes d'agrégation et de
calcul ; - s'assurer de la conformité aux principes méthodologiques
définis.

Elle implique les experts métiers et les partenaires techniques
concernés.

### Critères d'acceptation {#critères-dacceptation number="0.15.4"}

Chaque fonctionnalité doit être associée à des critères d'acceptation
permettant de valider sa conformité.

Ces critères portent notamment sur : - le respect des exigences
fonctionnelles ; - la qualité des résultats produits ; - la conformité
des interfaces ; - la prise en compte des règles métier.

La validation est prononcée par la MOA sur la base de ces critères.

### Gestion des anomalies {#gestion-des-anomalies number="0.15.5"}

Les anomalies identifiées lors des phases de test et de recette sont : -
recensées et qualifiées ; - priorisées en fonction de leur impact ; -
corrigées dans les cycles de développement suivants.

Un suivi des anomalies est mis en place afin de garantir leur
résolution.

### Validation des versions {#validation-des-versions number="0.15.6"}

Chaque version du système fait l'objet d'une validation avant mise en
production.

Cette validation repose sur : - la réussite des tests techniques et
fonctionnels ; - la validation des éléments méthodologiques ; - la
correction des anomalies critiques.

La décision de mise en production est prise par la MOA.

### Points de vigilance {#points-de-vigilance-13 number="0.15.7"}

- Nécessité d'impliquer les utilisateurs dans les phases de recette\
- Importance de la validation méthodologique des indicateurs\
- Risque de sous-estimation des efforts de test dans un contexte Agile\
- Coordination entre corrections d'anomalies et développement de
  nouvelles fonctionnalités\
- Maintien d'un référentiel de tests à jour tout au long du projet

------------------------------------------------------------------------



## Accompagnement et conduite du changement {#accompagnement-et-conduite-du-changement number="0.16"}

La mise en œuvre d'HydroScope implique des évolutions dans les pratiques
des acteurs de la gestion de l'eau en Nouvelle-Calédonie. À ce titre, un
dispositif d'accompagnement et de conduite du changement est აუცილaire
pour favoriser l'appropriation de l'outil, garantir son utilisation
effective et assurer la cohérence des usages entre les différentes
parties prenantes.

L'objectif est de faciliter l'adoption du système, de sécuriser son
déploiement et de maximiser sa valeur pour les utilisateurs.

### Accompagnement des utilisateurs {#accompagnement-des-utilisateurs number="0.16.1"}

L'accompagnement vise à permettre aux différents profils d'utilisateurs
de comprendre et d'utiliser efficacement HydroScope.

Il comprend : - la présentation des objectifs et des fonctionnalités de
l'outil ; - l'explication des indicateurs et des principes
méthodologiques ; - l'accompagnement à la prise en main des interfaces.

Cet accompagnement doit être adapté aux différents profils (experts,
techniciens, décideurs).

### Formation {#formation number="0.16.2"}

Des actions de formation devront être mises en place afin de garantir
une appropriation opérationnelle de l'outil.

Ces formations pourront prendre plusieurs formes : - sessions de
formation initiale lors du déploiement ; - formations thématiques
(indicateurs, visualisation, analyse) ; - supports pédagogiques (guides,
tutoriels).

Les contenus devront être adaptés au niveau de connaissance des
utilisateurs.

### Documentation {#documentation number="0.16.3"}

Une documentation complète et accessible devra être produite.

Elle comprend : - une documentation fonctionnelle (présentation des
fonctionnalités) ; - une documentation méthodologique (définition des
indicateurs, méthodes de calcul) ; - une documentation utilisateur
(guides de prise en main, cas d'usage).

Cette documentation constitue un support essentiel pour l'autonomie des
utilisateurs.

### Support et assistance {#support-et-assistance number="0.16.4"}

Un dispositif de support devra être mis en place pour accompagner les
utilisateurs dans la durée.

Il comprend : - un point de contact pour le support (questions,
incidents) ; - la gestion des demandes d'évolution ; - le suivi des
incidents et leur résolution.

Ce dispositif doit permettre de maintenir un niveau de service
satisfaisant.

### Communication {#communication number="0.16.5"}

Une communication régulière devra être assurée autour du projet et de
ses évolutions.

Elle vise à : - informer les utilisateurs des nouvelles fonctionnalités
; - valoriser les usages et les résultats obtenus ; - maintenir
l'engagement des parties prenantes.

### Points de vigilance {#points-de-vigilance-14 number="0.16.6"}

- Hétérogénéité des profils utilisateurs et des niveaux de compétence\
- Nécessité d'expliquer les limites méthodologiques des indicateurs\
- Risque de non-appropriation si l'accompagnement est insuffisant\
- Importance de maintenir la documentation à jour\
- Coordination entre évolutions de l'outil et formation des utilisateurs

------------------------------------------------------------------------



## Cadre contractuel et juridique {#cadre-contractuel-et-juridique number="0.17"}

Le présent projet s'inscrit dans un cadre contractuel nécessitant la
définition de règles claires en matière de propriété, de gestion des
données, de maintenance et de réversibilité. Les éléments suivants
devront être pris en compte dans la mise en œuvre et l'exploitation de
la solution HydroScope.

### Propriété intellectuelle {#propriété-intellectuelle number="0.17.1"}

Les développements réalisés dans le cadre du projet HydroScope feront
l'objet d'une clarification des droits de propriété intellectuelle.

Sauf disposition contraire, les éléments suivants sont attendus : - les
codes sources développés dans le cadre du projet seront accessibles à
l'OEIL ; - l'OEIL disposera de droits d'usage, de modification et de
réutilisation du code ; - les éventuels composants tiers ou
bibliothèques utilisées devront être clairement identifiés (licences,
restrictions).

Une attention particulière sera portée à la compatibilité avec des
solutions open source.

### Protection des données (RGPD) {#protection-des-données-rgpd number="0.17.2"}

Le traitement des données dans HydroScope devra respecter la
réglementation en vigueur en matière de protection des données,
notamment le RGPD.

Cela implique : - l'identification des données sensibles ou à caractère
personnel (le cas échéant) ; - la mise en place de mesures de
sécurisation adaptées ; - la limitation des accès aux données en
fonction des profils utilisateurs ; - la traçabilité des accès et des
traitements.

Une analyse du niveau de sensibilité des données devra être réalisée en
amont.

### Réversibilité {#réversibilité number="0.17.3"}

Le prestataire devra garantir la réversibilité de la solution en fin de
contrat ou en cas de changement de prestataire.

Cela inclut : - la restitution des données dans des formats standards et
exploitables ; - la mise à disposition du code source (selon les
modalités définies) ; - la documentation technique et fonctionnelle
nécessaire à la reprise ; - l'assistance à la reprise par un tiers, si
nécessaire.

L'objectif est d'éviter toute dépendance technique ou fonctionnelle
vis-à-vis d'un prestataire.

### Maintenance et support (SLA / TMA) {#maintenance-et-support-sla-tma number="0.17.4"}

Un dispositif de maintenance et de support devra être défini afin de
garantir le bon fonctionnement du système dans la durée.

Ce dispositif précisera notamment : - les niveaux de service attendus
(SLA) ; - les délais de prise en charge et de résolution des incidents
; - les modalités de maintenance corrective et évolutive (TMA) ; - les
canaux de support et de communication.

Des niveaux de criticité pourront être définis afin de prioriser les
interventions.

Ci dessous un tableau de délais de prise en charge et de résolution
approximatif attendu en réponse.

  Criticité   Délai de prise en charge   Délai de résolution
  ----------- -------------------------- ---------------------
  Bloquant    4h                         24h
  Majeur      5 jours                    10 jours
  Mineur      10 jours                   30 jours

### Points de vigilance {#points-de-vigilance-15 number="0.17.5"}

- Clarifier les droits d'usage et de modification du code dès le
  démarrage du projet\
- Anticiper les contraintes liées aux données sensibles ou réglementées\
- Éviter toute dépendance forte à des solutions propriétaires non
  maîtrisées\
- Définir des engagements de service réalistes et adaptés aux moyens
  disponibles

------------------------------------------------------------------------



## Planning et jalons {#planning-et-jalons number="0.18"}

Le planning du projet HydroScope s'inscrit dans une logique itérative et
incrémentale, tout en intégrant des contraintes calendaires fortes liées
aux financements (OFB / PEP). Il vise à concilier une approche Agile
avec des jalons contractuels permettant de sécuriser le pilotage du
projet.

La période de développement est prévue du **1er novembre 2026 au 31 mai
2027**, avec une mise à disposition progressive des fonctionnalités.

### Macro-planning {#macro-planning number="0.18.1"}

Le projet est structuré en grandes phases :

- **Phase de préparation (octobre 2026)**
  - finalisation du cadrage fonctionnel et technique ;
  - consolidation du backlog initial ;
  - préparation des environnements ;
  - cadrage des flux de données avec les partenaires.
- **Phase de développement -- itérative (novembre 2026 → avril 2027)**
  - développement par sprints (2 à 4 semaines) ;
  - intégration progressive des données ;
  - validations régulières avec les utilisateurs ;
  - ajustement du backlog en continu.
- **Phase de stabilisation et recette (mai 2027)**
  - tests fonctionnels et méthodologiques ;
  - correction des anomalies ;
  - validation des indicateurs ;
  - préparation à la mise en production.
- **Mise en production initiale (fin mai 2027)**

### Jalons contractuels {#jalons-contractuels number="0.18.2"}

Afin de sécuriser le pilotage du projet, plusieurs jalons contractuels
sont définis :

- **J1 -- Lancement du projet (01/11/2026)**\
  Démarrage des développements, validation du backlog initial, des
  modalités de travail et des engagements de fourniture de données.

- **J2 -- Validation du socle technique et des flux de données
  (mi-décembre 2026)**\
  Mise en place des mécanismes d'import, structuration des données,
  premiers référentiels opérationnels.

- **J3 -- Livraison du MVP (fin janvier 2027)**\
  Mise à disposition d'une première version fonctionnelle incluant :

  - intégration de données structurées ;
  - calcul d'indicateurs simples ;
  - visualisation cartographique et temporelle ;
  - premières fiches territoires.

- **J4 -- Enrichissement fonctionnel (mars 2027)**\
  Extension des fonctionnalités :

  - enrichissement des indicateurs ;
  - amélioration des visualisations ;
  - premières fonctionnalités d'aide à la décision ;
  - consolidation des données.

- **J5 -- Recette fonctionnelle et méthodologique (mai 2027)**\
  Validation par la MOA :

  - conformité fonctionnelle ;
  - validation des indicateurs ;
  - correction des anomalies critiques ;
  - validation des performances globales.

- **J6 -- Mise en production (31/05/2027)**\
  Mise à disposition de la version initiale du système.

### Pilotage et suivi {#pilotage-et-suivi number="0.18.3"}

Le suivi du planning repose sur :

- l'avancement des sprints ;
- le suivi du backlog produit et de ses priorités ;
- les démonstrations régulières (sprint review) ;
- les comités de pilotage (COPIL) et comités techniques (COTECH) ;
- le suivi des anomalies et des corrections.

Des ajustements pourront être réalisés en fonction de l'avancement réel,
dans le respect des jalons contractuels.

### Dépendances {#dépendances number="0.18.4"}

Le respect du planning dépend de plusieurs facteurs :

- disponibilité et qualité des données sources ;
- mobilisation des acteurs pour les validations ;
- formalisation des engagements de fourniture de données ;
- validation des choix méthodologiques (indicateurs) ;
- contraintes techniques liées à l'intégration des données.

Ces dépendances devront être suivies de manière continue.

### Gestion des risques projet {#gestion-des-risques-projet number="0.18.5"}

Le projet comporte des risques pouvant impacter les délais, la qualité
ou le périmètre. Leur identification et leur suivi sont essentiels pour
sécuriser le projet.

#### Principaux risques {#principaux-risques number="0.18.5.1"}

- **Disponibilité des données** : retard ou absence de certaines données
  nécessaires ;
- **Qualité des données** : données incomplètes ou hétérogènes ;
- **Dépendance aux partenaires** : variabilité dans les contributions
  des acteurs ;
- **Complexité méthodologique** : difficulté à stabiliser les
  indicateurs ou les méthodes ;
- **Charge technique** : sous-estimation des volumes ou des performances
  attendues ;
- **Dérive du périmètre** : ajout de fonctionnalités non priorisées ;
- **Adoption utilisateur** : difficulté d'appropriation de l'outil.

#### Suivi des risques {#suivi-des-risques number="0.18.5.2"}

Les risques feront l'objet : - d'un suivi régulier en COTECH et COPIL
; - d'une mise à jour continue ; - de la définition de mesures de
mitigation adaptées.

#### Mesures de mitigation (exemples) {#mesures-de-mitigation-exemples number="0.18.5.3"}

- formalisation des engagements de fourniture de données ;
- priorisation stricte du MVP et du backlog ;
- validation progressive des indicateurs ;
- mise en place de contrôles qualité sur les données ;
- implication régulière des utilisateurs.

### Points de vigilance {#points-de-vigilance-16 number="0.18.6"}

- Respect des échéances liées aux financements (OFB / PEP)\
- Nécessité de stabiliser rapidement un MVP opérationnel\
- Coordination entre rythme Agile et contraintes contractuelles\
- Anticipation des phases de recette et de validation méthodologique\
- Gestion des dépendances liées aux données et aux partenaires

------------------------------------------------------------------------

# Annexes {#sec-Annexes number="1"}

## Tableau synthétique des indicateurs {#tableau-synthétique-des-indicateurs number="1.1"}

@todo [priority=high, section=annexe-liens-fichiers] : inserer un lien
vers le tableau des indicateurs

## Catalogue des indicateurs {#catalogue-des-indicateurs number="1.2"}

@todo [priority=high, section=annexe-liens-fichiers] : inserer un lien
vers le catalogue de fiches des indicateurs

[^1]: Système de grille hierarchique vectorielle standardisée utilisé
    pour agréger des données hétérogènes (incendies, érosion, occupation
    du sol).

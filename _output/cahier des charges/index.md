# Projet HydroScope
Hugo Roussaffa
2 août 2026



> **Note de version**
>
> Historique des versions du document :
>
> <table>
> <thead>
> <tr>
> <th>Version</th>
> <th>Date</th>
> <th>Auteur(s)</th>
> <th>Description des modifications</th>
> </tr>
> </thead>
> <tbody>
> <tr>
> <td>1</td>
> <td></td>
> <td>Hugo Roussaffa</td>
> <td>Rédaction initiale du cahier des charges</td>
> </tr>
> </tbody>
> </table>
>
> Points en attente (8)
>
> [high (annexe)](#annexe-indiquer-l-annexe) : indiquer l’annexe
>
> [high (link)](#link-mettre-lien-section) : mettre lien section
>
> [high (lien)](#lien-faire-le-lien-avec-la-section-monitoring-pour-le-suivi-des-traitements-en-arri-re-plan)
> : faire le lien avec la section monitoring pour le suivi des traitements en arrière plan
>
> [high (processing)](#processing-indiquer-la-volumetrie-plus-pr-cisement-sur-les-traitements-)
> : indiquer la volumetrie plus précisement sur les traitements.
>
> [high (API)](#api-pr-ciser-les-usage-des-api-externe-pr-vues-)
> : préciser les usage des API externe prévues.
>
> [high (lien)](#lien-faire-le-lien-avec-sla) : faire le lien avec SLA
>
> [high (annexe-liens-fichiers)](#annexe-liens-fichiers-inserer-un-lien-vers-le-tableau-des-indicateurs)
> : inserer un lien vers le tableau des indicateurs
>
> [high (annexe-liens-fichiers)](#annexe-liens-fichiers-inserer-un-lien-vers-le-catalogue-de-fiches-des-indicateurs)
> : inserer un lien vers le catalogue de fiches des indicateurs

**Introduction**

Le projet Hydroscope s’inscrit dans la continuité d’un premier outil
développé en 2021 pour la DAVAR (PressionPPE). Suite au retour
d’expérience de ce premier projet, l’OEIL a déposé un dossier au fonds
PEP en 2023, validé avec un co-financement de l’OFB (65 %) et du fonds
PEP (35 %). L’objectif est de faire évoluer cet outil pour répondre aux
besoins accrus de connaissance et de gestion de la ressource en eau.

Le projet **Hydroscope** a pour ambition de doter le territoire d’une
architecture logicielle et d’une structure de données robuste, capables
de transformer les données brutes en informations stratégiques, tout en
garantissant l’historisation des indicateurs et l’automatisation de la
veille sur les pressions environnementales telles que les incendies,
l’érosion, la pollution, le développement des espèces envahissantes ou
l’artificialisation des sols.

L’OEIL assure la continuité intellectuelle du projet initiale
(PressionPPE en 2021) et s’assurera à ce que les futurs outils — qu’il
s’agisse de tableaux de bord experts, d’interfaces simplifiées pour les
partenaires ou de fiches pédagogiques — deviennent des leviers d’aide à
la décision pour la protection durable des bassins versants producteurs
d’eau potable (BVAEP).

------------------------------------------------------------------------



## Contexte et objectifs

La protection des ressources en eau potable constitue un enjeu majeur
pour la Nouvelle-Calédonie. Les captages destinés à l’alimentation en
eau potable sont exposés à de nombreuses pressions environnementales et
anthropiques susceptibles d’altérer durablement la qualité et la
disponibilité de la ressource. Les incendies, l’érosion des sols, les
activités minières, l’urbanisation ou encore les effets du changement
climatique nécessitent une connaissance fine des territoires afin
d’orienter les actions de prévention et de protection.

Une grande partie des captages est alimentée par des eaux
superficielles, ce qui les rend particulièrement sensibles aux
modifications des bassins versants d’alimentation en eau potable. La
préservation de ces bassins versants constitue ainsi un levier essentiel
pour garantir une ressource en eau de qualité sur le long terme.

### Contexte institutionnel

La gestion de l’eau potable en Nouvelle-Calédonie repose sur une
organisation institutionnelle impliquant plusieurs acteurs
complémentaires.

Depuis la loi du pays du **15 juillet 2025** relative au domaine public
de l’eau, le **Gouvernement de la Nouvelle-Calédonie** est compétent
pour instaurer les **Périmètres de Protection des Eaux (PPE)** par
arrêté. Le service de l’eau de la **DAVAR** assure l’instruction
technique et administrative des dossiers de protection.

Les **Provinces** interviennent principalement dans leurs compétences
environnementales et participent à l’instruction des dossiers en
formulant un avis obligatoire. Elles assurent également un rôle de
conseil et d’accompagnement auprès des collectivités.

Les **Communes** conservent la responsabilité du service public de
production et de distribution d’eau potable ainsi que de
l’assainissement. Elles sont les principales gestionnaires des captages
destinés à l’alimentation des populations.

Sur les **terres coutumières**, la création d’un périmètre de protection
est soumise à l’accord des autorités coutumières concernées.

La réglementation impose désormais la régularisation des captages
existants ne disposant pas encore de périmètre de protection, renforçant
ainsi les besoins en outils d’observation, de suivi et d’aide à la
décision.

### Positionnement du projet HydroScope

Le projet **HydroScope** est une initiative portée par l’OEIL, en
partenariat avec les services techniques concernés, avec le soutien
financier de l’Office Français de la Biodiversité (OFB) et du fonds de
la Politique de l’Eau Partagée (PEP).

Il s’inscrit dans la continuité du tableau de bord **PressionPPE**,
développé en 2021 avec le Service de l’eau de la DAVAR pour centraliser
des informations relatives aux pressions exercées sur les ressources en
eau potable. Les retours d’expérience sur cet outil ont mis en évidence
plusieurs pistes d’amélioration, notamment concernant l’historisation
des données, l’automatisation des traitements, l’adaptation des
interfaces aux différents profils d’utilisateurs ainsi que l’ouverture
vers des technologies open source.

HydroScope vise ainsi à faire évoluer cet outil en proposant une
plateforme permettant de consolider les données disponibles, de produire
des indicateurs homogènes, de faciliter leur consultation par les
différents acteurs impliqués dans la gestion de la ressource et de
simplifier le processus de production et de diffusion des données.

Le projet est actuellement engagé dans une phase de réalisation destinée
à développer des services numériques en réponse aux besoins métiers
identifiés lors de la phase d’analyse. Cette phase se concentre sur la
définition des indicateurs, la structuration des données et la
conception des interfaces utilisateurs adaptées aux différents profils
d’acteurs.

### Objectifs du projet

L’objectif d’HydroScope est de mettre à disposition un système
d’information permettant de mieux suivre l’état des bassins versants
d’alimentation en eau potable (BVAEP), les unités de gestion
(captage/forage) et des périmètres de protection des eaux, afin de
faciliter leur analyse et leur suivi dans le temps.

Plus précisément, le projet poursuit 4 objectifs :

- **Connaissance:** Mieux caractériser le territoire (relief, géologie,
  pluviométrie) et les enjeux (population desservie) en centralisant et
  structurerantles données utiles à la caractérisation des bassins
  versants et des points de captages

- **Diagnostic:** Appréhender le niveau d’intégrité de la ressource via
  l’analyse d’une multitude d’indicateurs :

  - en produisant des indicateurs homogènes décrivant les enjeux, les
    pressions environnementales et les caractéristiques des territoires.
  - en assurerant l’historisation des données afin de suivre leur
    évolution dans le temps.

- **Veille:** Détecter automatiquement les changements environnementaux
  significatifs et faciliter l’identification de ces évolutions
  significatives grâce à des mécanismes de veille et de mise à jour
  automatisée.

- **Partage:** Diffuser un diagnostic commun entre les parties prenantes
  pour orienter les investissements publics en mettant à disposition des
  indicateurs dans un tableau de bord adaptés aux différents profils
  d’utilisateurs et en facilitant le partage d’une information cohérente
  entre les différents partenaires.

HydroScope n’a pas vocation à remplacer les outils métiers existants ni
à se substituer aux décisions des gestionnaires. Il constitue un outil
d’observation, d’analyse et de restitution destiné à fournir une vision
consolidée des informations disponibles afin d’appuyer les travaux de
suivi et de protection de la ressource en eau potable.

### Objectifs fonctionnels

L’application doit permettre aux gestionnaires de répondre à des
questions concrètes pour prioriser leurs interventions :

- Quels sont les bassins versants actuellement sous pression forte et
  selon quels critères ?
- Quelle est la tendance d’évolution d’une pression (ex: incendies,
  glissement de terrain) sur les 5 ou 10 dernières années ?
- Quels zones doivent être protégés/restaurer en priorité ?
- Quel est le niveau de gravité d’un défrichage détectée par satellite ?

L’application devra notamment permettre de :

- consulter les caractéristiques des bassins versants d’alimentation en
  eau potable ;
- visualiser les indicateurs produits à différentes échelles
  territoriales et sur les objets géographiques suivants
  (captage/forage; bassin versant AEP, maille géographique vectorielle
  H3 [1] );
- suivre l’évolution temporelle des pressions environnementales ;
- comparer plusieurs territoires, captages/forages ou bassins versants ;
- Assurer la traçabilité et la transparence des traitements effectués
- accéder aux fiches descriptives des indicateurs, des bassins versants
  AEP, des captages/forages et périmètres de protection ;
- produire des rapports exportables ;
- diffuser des niveaux d’information adaptés aux différents profils
  d’utilisateurs (experts, partenaires institutionnels et grand public).

L’ensemble de ces fonctionnalités devra contribuer à améliorer l’accès
aux données existantes et d’appuyer la prise de décision publique et
opérationnelle auprès des acteurs de la gestion de l’eau potable en
Nouvelle-Calédonie.

### Quantification du périmètre

Le périmètre fonctionnel du projet HydroScope s’appuie sur un ensemble
de données territoriales et d’indicateurs dont les volumes doivent être
pris en compte pour dimensionner la solution.

À ce stade, les ordres de grandeur sont les suivants :

- **Bassins versants d’alimentation en eau potable (BVAEP)** : ~50
  unités  
- **Captages / forages** : ~500 unités  
- **Périmètres de protection** : ~250 unités  
- **Indicateurs** : ~40 indicateurs (en fonction des thématiques
  retenues)  
- **Sources de données** : ~30 sources (catalogue georep, google earth
  engine, base de données OEIL …)

Ces valeurs sont indicatives et pourront évoluer au cours du projet,
notamment en fonction :

- de la disponibilité des données ;
- des choix méthodologiques ;
- des besoins exprimés par les utilisateurs.

Elles permettent néanmoins de fournir un premier niveau de cadrage pour
le dimensionnement technique et fonctionnel de la solution. Les
indicateurs et leur sources identifiés jusqu’à présent sont détaillés
dans l’annexe …

@todo \[priority=high, section=annexe\] : indiquer l’annexe

### Sources de données

Le projet HydroScope repose sur l’intégration et la valorisation de
données issues de sources multiples, produites par différents acteurs du
territoire.

Les principales sources de données mobilisées incluent :

- **Données géographiques de référence** :
  - bassins versants d’alimentation en eau potable (BVAEP) ;
  - captages et forages ;
  - périmètres de protection des eaux ;
  - limites administratives.
- **Données environnementales** :
  - incendies ;
  - érosion des sols ;
  - occupation du sol ;
  - données climatiques (pluviométrie, etc.).
- **Données issues de l’observation satellitaire** :
  - détection de changements d’occupation du sol ;
  - suivi de phénomènes environnementaux.
- **Données administratives et réglementaires** :
  - informations liées aux périmètres de protection ;
  - données issues des services de l’État et des collectivités.

Ces données sont produites et mises à disposition par différents acteurs
(communes, provinces, services du Gouvernement, partenaires techniques).

Elles présentent des niveaux hétérogènes de qualité, de structuration et
de fréquence de mise à jour, ce qui nécessite des traitements
spécifiques dans le cadre du projet HydroScope.

------------------------------------------------------------------------



## Parties prenantes et gouvernance

La mise en œuvre du projet HydroScope repose sur une gouvernance
partenariale associant des acteurs institutionnels, techniques et
opérationnels intervenant à différentes étapes du cycle de vie de la
donnée et de la décision publique.

### Acteurs

L’**OEIL** assure le portage du projet HydroScope. Il coordonne les
travaux, centralise les données et garantit la cohérence globale du
dispositif, notamment en matière de structuration de l’information et de
production d’indicateurs.

Les **services du Gouvernement de la Nouvelle-Calédonie**, en
particulier la **DAVAR (service de l’eau)**, interviennent en tant
qu’acteurs clés sur les aspects réglementaires, techniques et
méthodologiques liés à la gestion des ressources en eau et à la mise en
œuvre des périmètres de protection.

Les **Provinces** contribuent à la fois à la production de données
environnementales et à leur analyse, dans le cadre de leurs compétences
en matière d’environnement et d’aménagement du territoire. Elles jouent
également un rôle d’appui auprès des communes.

Les **Communes** sont les gestionnaires opérationnels des captages d’eau
potable. Elles constituent des utilisateurs centraux de l’outil, tant
pour le suivi de leurs ressources que pour l’aide à la décision dans la
gestion quotidienne et stratégique.

Les **partenaires techniques** (producteurs de données, organismes
scientifiques, opérateurs) participent à l’alimentation du système, à la
qualification des données et à la définition des indicateurs.

Enfin, les **utilisateurs finaux** regroupent différents profils
(techniciens, ingénieurs, décideurs, partenaires institutionnels), avec
des besoins différenciés en matière d’accès, de lecture et
d’exploitation de l’information.

### Rôles et responsabilités

La **Maîtrise d’Ouvrage (MOA)**, assurée par l’OEIL, définit les
orientations stratégiques du projet, exprime les besoins fonctionnels et
valide les livrables.

L’**Assistance à Maîtrise d’Ouvrage (AMOA)** accompagne la formalisation
des besoins, veille à la cohérence méthodologique, en particulier sur
les aspects liés aux indicateurs et aux traitements de données, et
assure l’interface entre les acteurs métiers et les équipes techniques.

La **Maîtrise d’Œuvre (MOE)** est en charge de la conception technique,
du développement et de la mise en œuvre de la solution, en respectant
les exigences fonctionnelles et non fonctionnelles définies.

Les **utilisateurs** sont associés tout au long du projet afin de
garantir l’adéquation de l’outil aux usages réels. Ils interviennent
notamment dans les phases de recueil des besoins, de tests et de
validation fonctionnelle.

### Modalités de validation

La gouvernance du projet s’appuie sur plusieurs instances :

- Le **comité de pilotage (COPIL)**, chargé de définir les orientations
  stratégiques, de valider les grandes étapes du projet et d’arbitrer
  les décisions structurantes ;
- Le **comité technique (COTECH)**, qui assure le suivi opérationnel, la
  validation des choix fonctionnels et méthodologiques ainsi que la
  coordination entre les acteurs ;
- Des **ateliers thématiques et utilisateurs**, permettant de recueillir
  les besoins, de confronter les propositions fonctionnelles aux usages
  et d’intégrer les retours terrain.

Les validations sont réalisées de manière itérative, en lien avec les
cycles de développement, afin de sécuriser progressivement les choix
effectués.

### Organisation du projet en mode Agile

Le projet HydroScope est conduit selon une approche itérative et
incrémentale inspirée des méthodes Agile, permettant d’adapter en
continu le produit aux besoins des utilisateurs et aux contraintes
identifiées.

Le développement s’appuie sur un **backlog produit** structuré en
fonctionnalités (EPICS) et décliné en éléments plus fins. Ce backlog est
priorisé en continu par la MOA, en fonction de la valeur métier, des
contraintes techniques et des enjeux du projet.

Le fonctionnement repose sur des cycles courts de développement
(**sprints**), intégrant :

- des phases de planification (sprint planning),
- des points de suivi réguliers au sein de l’équipe projet,
- des **revues de sprint** associant les parties prenantes pour
  présenter les fonctionnalités développées,
- des **rétrospectives** visant à améliorer en continu l’organisation et
  les pratiques.

Des démonstrations régulières sont organisées afin de recueillir les
retours des utilisateurs et d’ajuster les priorités. Cette organisation
vise à sécuriser les développements, à améliorer la qualité du produit
et à garantir son adéquation avec les besoins métiers.

------------------------------------------------------------------------



## Vision produit & principes méthodologiques

Le projet HydroScope vise à proposer un outil structurant permettant
d’améliorer la connaissance, le suivi et l’analyse des ressources en eau
à l’échelle des bassins versants d’alimentation en eau potable. Il
s’inscrit dans une logique d’appui à la décision publique, en mettant à
disposition des informations consolidées, fiables et accessibles aux
différents acteurs du territoire.

### Vision cible

HydroScope a vocation à devenir un outil de référence partagé entre les
acteurs institutionnels et techniques de la gestion de l’eau en
Nouvelle-Calédonie. Il doit permettre de croiser des données issues de
sources multiples afin de produire une lecture synthétique et
opérationnelle des dynamiques à l’œuvre sur les territoires.

L’outil repose sur un équilibre entre plusieurs exigences
complémentaires :

- garantir une **rigueur scientifique** dans la production et
  l’interprétation des indicateurs ;
- proposer une **accessibilité adaptée à des publics variés**, allant
  des experts aux décideurs ;
- offrir des capacités d’**exploration, de comparaison et d’analyse**,
  facilitant l’identification des enjeux prioritaires et l’orientation
  des actions.

HydroScope ne constitue pas un outil de décision automatisée, mais un
support d’analyse visant à éclairer les choix des gestionnaires.

### Principes méthodologiques

La conception et le développement d’HydroScope reposent sur un ensemble
de principes visant à garantir la fiabilité et la compréhension des
résultats produits.

- **Traçabilité**  
  Chaque donnée intégrée dans le système doit être associée à sa source,
  à sa date de production et aux éventuelles transformations qu’elle a
  subies. Cette traçabilité doit être accessible aux utilisateurs afin
  de garantir la transparence de l’information.

- **Transparence des calculs**  
  Les méthodes de calcul des indicateurs doivent être explicites,
  documentées et compréhensibles. Les choix méthodologiques (agrégation,
  pondération, seuils) doivent pouvoir être consultés et justifiés.

- **Robustesse des indicateurs**  
  Les indicateurs produits doivent reposer sur des bases méthodologiques
  solides. Une attention particulière est portée à la pertinence des
  données utilisées, à leur qualité et à la cohérence des traitements
  appliqués.

- **Interopérabilité**  
  Le système doit s’inscrire dans un écosystème existant en respectant
  les standards en vigueur, notamment dans le domaine des données
  géographiques, afin de faciliter les échanges et la réutilisation des
  données.

- **Lisibilité**  
  Les restitutions proposées doivent permettre une appropriation rapide
  de l’information, en évitant les représentations complexes ou
  ambiguës. Une attention particulière est portée à la pédagogie et à
  l’adaptation des interfaces aux différents profils d’utilisateurs.

### Risques méthodologiques

Compte tenu de la diversité des données mobilisées et des traitements
envisagés, plusieurs risques méthodologiques doivent être identifiés et
maîtrisés.

- **Agrégation abusive**  
  Le croisement ou la combinaison de données hétérogènes (échelles
  spatiales, temporelles, unités, niveaux de précision) peut conduire à
  des résultats peu pertinents, voire trompeurs.

- **Biais d’interprétation**  
  La simplification nécessaire à la production d’indicateurs
  synthétiques peut induire des erreurs de lecture ou des conclusions
  hâtives si le contexte d’interprétation n’est pas suffisamment
  explicité.

- **Qualité des données**  
  La fiabilité des résultats dépend directement de la qualité des
  données sources, qui peuvent être incomplètes, hétérogènes ou non
  validées.

- **Effet “boîte noire”**  
  Une complexité excessive des traitements ou un manque de transparence
  dans les calculs peut entraîner une perte de confiance des
  utilisateurs.

- **Surinterprétation**  
  Les indicateurs produits doivent être utilisés dans leur domaine de
  validité et dans le cadre des objectifs que nous leurs avons fixés.
  Leur interprétation en dehors de ce cadre peut conduire à des
  décisions inadaptées.

L’offre proposée par le prestataire doit intégrer ces principes
méthodologiques et proposer des solutions permettant de limiter les
risques identifiés, tout en garantissant la pertinence et la fiabilité
des résultats produits. Nous estimons que la mise en œuvre d’un **MVP
(Minimum Viable Product)** constituera un moyen efficace pour valider
les choix méthodologiques et techniaues avant de déployer des
fonctionnalités plus avancées.

### Mise en oeuvre d’un MVP (Minimum Viable Product)

La mise à disposition rapide d’une première version fonctionnelle du
système (MVP), permetra de répondre aux besoins prioritaires des
utilisateurs tout en limitant les risques identifiés.

Le MVP permettra de :

- proposer un socle fonctionnel opérationnel (données, indicateurs,
  visualisation) ;
- permettre une première utilisation par des beta testeurs;
- recueillir des retours afin d’ajuster les développements ultérieurs.

Le périmètre du MVP est volontairement restreint aux fonctionnalités à
plus forte valeur métier, comme :

- l’intégration de données structurées ;
- le calcul d’indicateurs simples et robustes ;
- la visualisation cartographique et temporelle ;
- la consultation de fiches de synthèses sur certains territoires.

Les fonctionnalités plus avancées (analyse multicritère, paramétrage
complexe, automatisation avancée) et un jeu d’indicateur complet sont
prévues dans des phases ultérieures.

Le MVP constitue un jalon important du projet et fera l’objet d’une
validation spécifique par la MOA.

------------------------------------------------------------------------



## Organisation du projet en mode Agile

Le projet HydroScope est conduit selon une approche itérative et
incrémentale inspirée des méthodes Agile. Cette organisation vise à
adapter en continu le produit aux besoins des utilisateurs, à sécuriser
les développements et à garantir une livraison progressive de
fonctionnalités opérationnelles.

Elle permet également de concilier des exigences de rigueur
méthodologique (notamment sur les indicateurs) avec une capacité
d’adaptation aux retours terrain.

### Principes d’organisation

L’organisation du projet repose sur les principes suivants :

- **Itération** : développement par cycles courts permettant des
  ajustements réguliers ;
- **Incrémentation** : livraison progressive de fonctionnalités
  utilisables ;
- **Priorisation par la valeur** : les fonctionnalités sont développées
  en fonction de leur utilité métier ;
- **Co-construction** : implication continue des utilisateurs et
  partenaires ;
- **Amélioration continue** : adaptation des pratiques au fil du projet.

### Backlog produit

Le projet s’appuie sur un **backlog produit** structuré, qui constitue
le référentiel central des besoins.

Ce backlog est organisé :

- en **EPICS**, correspondant aux grandes fonctionnalités du système ;
- en **User Stories (US)**, décrivant les besoins du point de vue
  utilisateur.

Le backlog est :

- maintenu et priorisé par la **MOA**, avec l’appui de l’AMOA ;
- enrichi et ajusté en continu en fonction des retours utilisateurs et
  des contraintes techniques ;
- utilisé comme base de planification des développements.

Le backlog a vocation à être intégré et suivi dans les outils de gestion
de projet utilisés par l’OEIL, notamment **Azure DevOps**, permettant :

- le suivi de l’avancement ;
- la traçabilité des développements ;
- le lien entre besoins fonctionnels et réalisation technique.

### Stratégie MVP (Minimum Viable Product)

Le projet prévoit la réalisation d’un **MVP (Minimum Viable Product)**
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

@todo \[priority=high, section=link\] : mettre lien section

### Organisation des sprints

Le développement est organisé en cycles courts appelés **sprints**,
d’une durée généralement comprise entre 2 et 4 semaines.

Chaque sprint comprend : - la sélection d’un ensemble de User Stories
issues du backlog priorisé ; - leur conception, développement et test
; - la production d’un incrément fonctionnel utilisable.

Cette organisation permet : - des livraisons régulières ; - une
réduction des risques ; - une meilleure visibilité sur l’avancement.

### Rituels Agile

Le projet s’appuie sur des rituels permettant d’assurer la coordination
et le pilotage :

- **Sprint planning** : définition des objectifs et du contenu du sprint
  ;
- **Points de suivi réguliers** : coordination de l’équipe projet ;
- **Sprint review** : présentation des fonctionnalités réalisées aux
  parties prenantes ;
- **Rétrospective** : amélioration continue des pratiques.

Ces rituels structurent le fonctionnement de l’équipe et facilitent la
communication entre les acteurs.

### Validation et implication des utilisateurs

Les utilisateurs sont associés tout au long du projet afin de garantir
l’adéquation de l’outil aux besoins réels.

Cela se traduit par : - des démonstrations régulières des
fonctionnalités développées ; - la collecte de retours utilisateurs à
chaque itération ; - l’intégration de ces retours dans le backlog.

Cette démarche permet d’ajuster progressivement le produit et de
sécuriser les choix fonctionnels.

### Gestion des livraisons

Le projet prévoit des livraisons progressives, structurées autour :

- d’un **MVP**, mis à disposition rapidement ;
- de versions successives enrichissant les fonctionnalités ;
- d’une validation régulière par la MOA avant mise en production.

Les livraisons sont synchronisées avec les jalons du projet et les
contraintes calendaires définies.

------------------------------------------------------------------------



L’intégration et l’exploitation de données issues de sources multiples,
hétérogènes et évolutives rendent nécessaire la mise en place d’un
dispositif de catalogage structuré. Celui-ci constitue un élément
central du système HydroScope.

Le catalogue de données vise à référencer l’ensemble des jeux de données
manipulés dans la plateforme, qu’il s’agisse de données sources ou de
données dérivées, dont les indicateurs.

### Description

Le catalogage des données constitue un composant opérationnel du
système. Il permet d’organiser, qualifier et rendre intelligibles les
données utilisées dans HydroScope.

Chaque jeu de données intégré doit être identifié, décrit et relié aux
traitements auxquels il participe. Cette structuration permet d’assurer
la lisibilité du système, tant pour les administrateurs que pour les
utilisateurs, et de garantir la traçabilité des analyses produites.

### Fonctionnalités

Le système devra permettre de référencer les jeux de données au sein
d’un catalogue structuré, en associant à chaque dataset un ensemble de
métadonnées descriptives.

Il devra également permettre de tracer les relations entre données
sources, transformations et données produites, notamment les
indicateurs. Cette capacité est essentielle pour comprendre l’origine
des résultats et en assurer la reproductibilité.

Le catalogue devra être consultable afin de permettre aux utilisateurs
d’accéder aux informations nécessaires à l’interprétation des données.
Le niveau de détail et d’accès pourra être adapté selon les profils.

Le système devra enfin permettre l’intégration progressive de nouvelles
sources de données, sans remise en cause de la structure existante.

### Principes de mise en œuvre

Le catalogue devra reposer sur une structuration homogène des
métadonnées, afin de garantir la cohérence des descriptions et leur
exploitabilité.

Lorsque cela est pertinent, des standards existants pourront être
mobilisés, notamment dans le domaine des données géographiques, afin de
faciliter l’interopérabilité.

Le catalogue devra être alimenté autant que possible de manière
automatisée, en lien avec les processus d’intégration et de
transformation des données. Cette automatisation est essentielle pour
garantir la cohérence entre les données réellement exploitées et leur
description.

### Implémentation technique

Chaque jeu de données intégré dans HydroScope devra être associé à un
ensemble de métadonnées structurées décrivant son origine, son contenu
et ses conditions d’usage.

Ces métadonnées devront couvrir les informations nécessaires à la
compréhension et à l’exploitation des données, notamment leur source,
leur description, leur emprise spatiale, leurs dates de production et de
mise à jour, ainsi que les modalités de collecte ou de transformation.

Elles devront être intégrées au fonctionnement du système et alimentées
en lien avec les pipelines de données, notamment via des outils de
transformation tels que dbt. Elles participent ainsi à la traçabilité
des traitements et à la cohérence globale du système.

Les indicateurs calculés seront intégrés au catalogue comme des données
dérivées, avec un lien explicite vers les données sources et les
traitements associés.

Une partie des métadonnées pourra être exposée aux utilisateurs afin de
faciliter l’interprétation des résultats.

### Points de vigilance

- Risque de dissociation entre catalogue et données réellement
  exploitées  
- Nécessité d’automatiser la production et la mise à jour des
  métadonnées  
- Importance de maintenir la cohérence entre données, traitements et
  indicateurs

------------------------------------------------------------------------



## Monitoring, supervision et pilotage

Des besoins transverses de monitoring sont essentiels pour le bon
fonctionnement du système, la fiabilité des données et la capacité à
suivre les dynamiques géographiques dans le temps. Ces fonctions de
monitoring reposent sur des mécanismes de suivi, d’alerte et d’analyse
continue.

L’objectif est double : sécuriser techniquement et méthodologiquement le
système, tout en fournissant aux administrateurs des outils de veille et
de pilotage adaptés à leurs besoins.

### Monitoring technique

Le système devra permettre de suivre le bon fonctionnement des
traitements et des flux de données.

Cela inclut notamment :

- le suivi des processus d’import (sources, sortie, succès, échecs,
  volumétrie, date et durée) ;
- la surveillance des connexions aux sources de données (catalogues,
  API, bases interne/externe) ;
- le suivi des performances (helthcheck, temps de réponse, charge
  serveur, disponibilité) ;
- la gestion des erreurs et des journaux techniques.
- des alertes et notifications en cas de dysfonctionnements ou
  d’anomalies.

Ces éléments sont principalement destinés aux équipes techniques en
charge de l’exploitation et de la maintenance du système.

### Monitoring de la qualité des données

HydroScope devra permettre de suivre en continu la qualité et la
fraîcheur des données intégrées.

Cela comprend :

- la visualisation des dates de mise à jour des données ;
- le suivi de la complétude des jeux de données ;
- la détection d’anomalies (valeurs aberrantes, ruptures de séries,
  incohérences) ;
- la qualification du niveau de fiabilité des données.

Ces informations devront être accessibles aux utilisateurs afin
d’éclairer l’interprétation des indicateurs.

### Monitoring métier et environnemental

Le système devra permettre de suivre les évolutions des indicateurs dans
une logique de veille environnementale.

Cela inclut :

- le suivi temporel des pressions environnementales ;
- la détection de tendances et de ruptures ;
- la mise en place de mécanismes d’alerte sur des évolutions
  significatives ;
- détéction différentielle brute des données à leur mise à jours.

Ces fonctionnalités participent directement au rôle d’aide à la décision
du projet. D’autre part, elles permettent de sécuriser la production des
indicateurs et d’alerter les utilisateurs sur des évolutions
significatives.

### Monitoring des usages

HydroScope devra permettre d’analyser les usages de la plateforme afin
d’en améliorer la pertinence et l’adoption.

Le prestataire devra proposer des mécanismes permettant de suivre :

- le suivi de la fréquentation de l’outil ;
- l’identification des actions les plus utilisées ;
- l’analyse des usages par profil utilisateur ;
- le suivi des exports ;
- Le territoires les plus consultés et les indicateurs les plus
  utilisés.

Ces éléments alimentent la démarche d’amélioration continue de l’outil.

### Historisation et traçabilité des données

Pour assurer un monitoring efficace et garantir la traçabilité des
indicateurs produits, nous pensons qu’un versionnement des données et
des logs de traitements effectués est important.

Chaque jeu de données thématique ou de référence intégré dans HydroScope
(ICPE, radier/gué, MOS vectorisés, routes, feux Sentinel/VIIRS, etc.)
pourra faire l’objet d’un stockage versionné, horodaté, permettant de :

- conserver un état complet des données utilisées à chaque mise à jour ;
- reconstituer la source exacte d’un indicateur produit à une date
  donnée et reproduire tout résultat passé (traçabilité
  environnementale, réglementaire) ;
- faciliter les audits techniques, relectures et vérifications des
  traitements ;

L’historisation des données ne peut pas être uniforme, elle devra donc
s’adapter aux types de données sources exploitées (données vectorielles,
raster, séries temporelles, etc.) et aux besoins des utilisateurs.

------------------------------------------------------------------------



## Périmètre fonctionnel – EPICS

Le périmètre fonctionnel d’HydroScope est structuré en grands ensembles
cohérents de fonctionnalités (EPICS), permettant d’organiser le
développement du produit de manière progressive et itérative.

### EPIC 1 : Gestion des indicateurs

Cet EPIC regroupe l’ensemble des mécanismes permettant d’acquérir,
d’intégrer, de structurer et de maintenir les données nécessaires au
fonctionnement du système. La qualité, la cohérence et la pérennité des
traitements réalisés dans les autres EPICS reposent directement sur la
robustesse de cette brique.

HydroScope a vocation à centraliser des données issues de sources
multiples, hétérogènes tant par leur format que par leur fréquence de
mise à jour ou leur niveau de structuration. L’outil doit donc être en
mesure de gérer cette diversité tout en garantissant une homogénéisation
progressive des données intégrées.

L’EPIC couvre plusieurs dimensions complémentaires.

- **Import de données (fichiers & API)**  
  Le système doit permettre l’intégration de données via différents
  canaux : dépôts FTP de fichiers (CSV, formats SIG, etc.) et connexions
  à des services externes (API). Ces imports doivent être paramétrables
  afin de s’adapter aux spécificités de chaque source (structure,
  fréquence, format). Une attention particulière sera portée à la
  **reproductibilité** des imports, notamment dans une logique
  d’automatisation.

- **Connexion aux sources web existantes**  
  HydroScope doit pouvoir se connecter à des sources de données
  existantes (bases de données, services web institutionnels ex.Georep
  et privée) et de garantir la mise à jour régulière des informations.
  Ces connexions doivent être documentées.

- **Structuration et normalisation des données**  
  Les données intégrées doivent être transformées afin de s’inscrire
  dans un modèle de données commun. Cela implique des opérations de
  standardisation (formats, unités, nomenclatures), de mise en cohérence
  spatiale et temporelle, ainsi que de rattachement aux référentiels du
  système (objets géographiques, indicateurs, etc.).  
  Cette étape est essentielle pour permettre les traitements ultérieurs,
  notamment les calculs d’indicateurs et les analyses croisées.

- **Historisation des données**  
  Le système doit conserver les différentes versions des données dans le
  temps afin de permettre le suivi des évolutions, la reproductibilité
  des analyses et la traçabilité des traitements.  
  L’historisation doit permettre de répondre à des besoins variés :
  reconstitution d’un état à une date donnée, analyse de tendances, ou
  encore audit des modifications.

- **Monitoring** Les fonctionnalités de monitoring au sein de cet EPIC
  visent à assurer la maîtrise des flux de données et la fiabilité des
  processus d’intégration. Elles comprennent :

  - le suivi des imports de données (statut des traitements,
    succès/échec, volumétrie, durée d’exécution) ;
  - la journalisation des opérations d’ingestion (date, source, type de
    traitement, résultat) ;
  - la capacité à rejouer des traitements en cas d’erreur ou de
    correction de données ;
  - la mise en place d’indicateurs de performance des pipelines (temps
    de traitement, fréquence des mises à jour). Ces éléments permettent
    d’identifier rapidement les dysfonctionnements et de garantir la
    continuité des flux de données. Compte tenu de son rôle structurant,
    cet EPIC constitue une priorité dans le développement du projet et
    conditionne la qualité globale du système HydroScope, c’est notament
    pour cela qu’il fait partie du MVP du projet.

### EPIC 1 bis : Catalogue de données

#### Description

L’intégration et l’exploitation de données issues de sources multiples,
hétérogènes et évolutives nécessitent la mise en place d’un dispositif
de catalogage structuré.

Le catalogue de données a pour objectif de référencer l’ensemble des
jeux de données manipulés dans HydroScope, qu’il s’agisse de données
sources ou de données dérivées, dont les indicateurs. Il constitue un
point d’entrée pour comprendre les données disponibles, leurs
caractéristiques et leurs conditions d’usage.

Il doit permettre de rendre le système de données lisible, de faciliter
la réutilisation des données entre traitements et indicateurs, et de
garantir la traçabilité des analyses produites. Dans un contexte
multi-acteurs, il contribue également à structurer les échanges autour
des données et à partager une compréhension commune.

Le catalogue ne constitue pas uniquement un outil documentaire. Il est
conçu comme un composant opérationnel du système, directement lié aux
processus d’intégration, de transformation et d’exploitation des
données.

#### Fonctionnalités

Le catalogue devra permettre de référencer chaque jeu de données intégré
dans la plateforme et de lui associer un ensemble de métadonnées
décrivant son origine, son contenu et ses conditions d’usage. Ces
métadonnées doivent être structurées de manière homogène afin de
garantir leur exploitation dans le système.

Chaque dataset devra être identifiable de manière unique et relié aux
traitements auxquels il participe. Le système devra permettre d’établir
des liens explicites entre données sources, transformations et données
produites, notamment les indicateurs, afin d’assurer une traçabilité
complète des traitements.

Le catalogue devra être alimenté autant que possible de manière
automatisée, en lien avec les pipelines de données. Les outils de
transformation (tels que dbt) devront être utilisés pour structurer les
dépendances entre datasets et documenter les transformations, afin de
limiter les écarts entre données réellement exploitées et informations
décrites.

Les indicateurs seront intégrés au catalogue comme des données dérivées,
avec un lien explicite vers les données sources et les traitements
associés.

Le catalogue devra être consultable, au moins partiellement, afin de
permettre aux utilisateurs d’accéder aux informations nécessaires à la
compréhension et à l’interprétation des données. Le niveau de détail
pourra être adapté selon les profils.

La solution devra permettre l’intégration progressive de nouvelles
sources de données sans remise en cause de la structure existante, ainsi
que la mise à jour continue des métadonnées.

Lorsque cela est pertinent, des standards existants pourront être
mobilisés, notamment dans le domaine des données géographiques, afin de
garantir l’interopérabilité et la pérennité du système.

Enfin, le dispositif devra s’intégrer aux mécanismes de monitoring du
système, notamment pour assurer le suivi de la traçabilité (origine des
données, transformations, mises à jour) et la gestion des erreurs dans
les processus d’intégration.

### EPIC 2 : Qualité et validation des données

Cet EPIC vise à garantir la fiabilité, la cohérence et la compréhension
des données intégrées dans HydroScope. Il constitue un complément
indispensable à la gestion des données, en introduisant des mécanismes
de catalogage, de contrôle, de qualification et de documentation
permettant de sécuriser les usages analytiques et décisionnels.

Compte tenu de la diversité des sources mobilisées (données
environnementales, géographiques, satellitaires, administratives), cet
EPIC doit permettre d’expliciter le niveau de confiance associé aux
données et d’éviter des interprétations erronées liées à des données
incomplètes ou de qualité insuffisante.

#### Description

L’EPIC couvre l’ensemble des processus permettant de contrôler les
données lors de leur intégration, de qualifier leur qualité et de rendre
visible cette information auprès des utilisateurs.

Il s’inscrit dans une logique de transparence méthodologique, en rendant
explicites les limites des données utilisées et en permettant, le cas
échéant, d’alerter sur des anomalies ou incohérences détectées.

#### Fonctionnalités

- **Contrôles de cohérence**  
  Mise en place de règles automatiques permettant de détecter des
  anomalies dans les données :

  - valeurs aberrantes ou hors plage attendue  
  - incohérences spatiales (ex : géométries invalides, mauvais
    rattachement territorial)  
  - incohérences temporelles (dates manquantes, inversées,
    discontinuités)  
    Ces contrôles peuvent être bloquants ou informatifs selon les cas.

- **Qualification des données**  
  Attribution d’un niveau de qualité ou de confiance aux données, en
  fonction de critères définis (source, méthode de production,
  complétude, fréquence de mise à jour).  
  Cette qualification doit être exploitable dans les traitements
  ultérieurs (filtrage, pondération, affichage différencié).

- **Indicateurs de fiabilité**  
  Production d’indicateurs synthétiques permettant d’évaluer la qualité
  globale d’un jeu de données ou d’un indicateur :

  - taux de complétude  
  - fréquence de mise à jour  
  - niveau de validation  
    Ces indicateurs doivent être visibles dans les interfaces (tableaux
    de bord, fiches indicateurs).

- **Monitoring**

Dans cet EPIC les besoins en monitoring intègre des mécanismes de suivi
continu de la qualité des données afin d’éclairer leur utilisation.

Les fonctionnalités incluent : - la production d’indicateurs de qualité
(complétude, fraîcheur, cohérence) ; - la détection automatisée
d’anomalies (valeurs aberrantes, ruptures de séries, incohérences
spatiales ou temporelles) ; - la visualisation synthétique de l’état des
données (tableaux de bord de qualité) ; - l’historisation des
indicateurs de qualité afin de suivre leur évolution.

Ces éléments permettent de rendre explicite le niveau de confiance
associé aux données.

#### Points de vigilance

- Hétérogénéité des standards de qualité selon les sources de données  
- Risque de surconfiance dans des données insuffisamment qualifiées  
- Complexité de mise en œuvre des règles de contrôle (équilibre entre
  automatisation et pertinence métier)  
- Nécessité de rendre lisible l’information de qualité sans alourdir
  l’expérience utilisateur  
- Articulation avec les autres EPICS, notamment le calcul d’indicateurs
  et l’analyse multicritère, où la qualité des données conditionne
  directement la validité des résultats

### EPIC 3 : Référentiels

Cet EPIC regroupe des éléments nécessaires au modèle de données de
l’application HydroScope. Les référentiels constituent le socle sur
lequel reposent les données, les traitements et les restitutions. Ils
permettent d’assurer la cohérence globale du système, en garantissant
une compréhension partagée des objets manipulés et des règles associées.

Dans un contexte multi-acteurs et multi-sources, la mise en place de
référentiels fiables et partagés est essentielle pour éviter les
ambiguïtés, faciliter les croisements de données et sécuriser les
analyses.

#### Description

L’EPIC couvre la définition, la gestion et la mise à jour des
référentiels utilisés par HydroScope. Il s’agit notamment des
référentiels géographiques, des référentiels d’indicateurs et des
référentiels liés aux utilisateurs.

Ces référentiels doivent être centralisés, versionnés et documentés. Ils
doivent également permettre de gérer les évolutions dans le temps
(modification de périmètres, ajout de nouveaux objets, évolution des
indicateurs) sans remettre en cause la cohérence des données
historiques.

#### Fonctionnalités

- **Référentiel géographique**  
  Gestion des objets spatiaux utilisés dans le système :
  - bassins versants d’alimentation en eau potable (BVAEP)
  - captages et forages
  - périmètres de protection
  - limites administratives (communes, provinces)
  - maillages d’analyse (ex : grille H3) Ce référentiel doit permettre
    d’assurer la cohérence spatiale des données, de gérer les relations
    entre objets (inclusion, intersection) et de prendre en compte les
    évolutions des périmètres dans le temps.
- **Référentiel des indicateurs**  
  Définition et structuration des indicateurs utilisés dans HydroScope :
  - nom, description et finalité  
  - méthode de calcul  
  - unités et échelles d’interprétation  
  - seuils éventuels  
  - liens avec les données sources

Ce référentiel constitue un élément central de la transparence
méthodologique et doit être accessible aux utilisateurs via des fiches
descriptives.

- **Référentiel des utilisateurs et des rôles**  
  Définition des profils utilisateurs et des droits associés :
  - types de profils (expert, technicien, décideur, autres)
  - niveaux d’accès aux données et aux fonctionnalités
  - gestion des rôles et des habilitations Ce référentiel permet
    d’adapter l’outil aux différents usages et de contrôler l’accès aux
    informations sensibles.

### EPIC 4 : Calcul d’indicateurs

Cet EPIC constitue le partie analytique d’HydroScope. Il regroupe des
mécanismes permettant de transformer les données brutes en indicateurs
exploitables pour le suivi, l’analyse et l’aide à la décision.

Les indicateurs produits doivent permettre de caractériser les
territoires et les unités de gestion de l’eau potable, d’identifier les
enjeux et les pressions exercées sur la ressource en eau et de suivre
leur évolution dans le temps. Leur construction repose sur des choix
méthodologiques structurants, qui doivent être explicités et maîtrisés.

#### Description

L’EPIC couvre la définition, le calcul, la gestion et l’évolution des
indicateurs. Il s’appuie sur les données structurées et cataloguées
(EPIC 1 & 1 Bis), qualifiées (EPIC 2) et organisées via les référentiels
(EPIC 3).

Les traitements doivent permettre de produire des indicateurs à
différentes échelles spatiales (captage, bassin versant, maille) et
temporelles, tout en garantissant la reproductibilité des résultats.

Une attention particulière est portée à la transparence des méthodes de
calcul et à la capacité du système à gérer les évolutions des
indicateurs dans le temps.

#### Fonctionnalités

- **Calculs simples (statistiques descriptives)**  
  Production d’indicateurs de base à partir des données disponibles :
  - moyennes, médianes, sommes
  - fréquences, occurrences
  - indicateurs de tendance simple Ces calculs constituent les briques
    élémentaires pour des analyses plus complexes.
- **Agrégations spatiales et temporelles**  
  Transformation des données afin de produire des indicateurs à
  différentes échelles :
  - agrégation de données ponctuelles à l’échelle d’un bassin versant
  - consolidation sur des périodes temporelles (mensuelle, annuelle,
    pluriannuelle)
  - gestion des changements d’échelle (ex : maille H3 vers bassin
    versant, vers captages et vise-versa) Ces agrégations doivent être
    maîtrisées afin d’éviter les biais liés aux changements d’échelle.
- **Paramétrage des méthodes de calcul**  
  Possibilité de définir et d’ajuster les règles de calcul :
  - choix des variables utilisées
  - règles d’agrégation
  - filtres sur les données (qualité/type, période, source) Ce
    paramétrage doit être documenté et accessible afin de garantir la
    transparence.
- **Versioning des indicateurs**  
  Gestion des évolutions des indicateurs dans le temps :
  - conservation des versions successives des méthodes de calcul
  - possibilité de reproduire un indicateur selon une version donnée
  - traçabilité des modifications (changement de formule, de source, de
    paramètres) Ce mécanisme est essentiel pour assurer la comparabilité
    des résultats dans le temps.

### EPIC 5 : Analyse multicritère (vigilance forte)

#### Description

L’analyse multicritère constitue un axe d’évolution du projet HydroScope
visant à proposer des lectures synthétiques des dynamiques
territoriales, en combinant plusieurs indicateurs relatifs aux
pressions, aux enjeux et aux caractéristiques des bassins versants.

Elle a pour objectif de faciliter l’identification de situations
prioritaires et d’apporter un appui à la décision, tout en conservant un
lien explicite avec les données et indicateurs sous-jacents.

À ce stade, les modalités précises de construction de ces analyses ne
sont pas arrêtées. Elles feront l’objet de travaux spécifiques associant
les partenaires techniques et les utilisateurs, afin de garantir leur
pertinence scientifique et leur compréhension.

L’analyse multicritère devra ainsi être conçue comme un outil d’aide à
l’interprétation, et non comme de l’aide à la décision.

#### Fonctionnalités envisagées

À titre indicatif, les fonctionnalités pouvant être couvertes par cet
EPIC incluent :

- la combinaison de plusieurs indicateurs au sein de représentations
  synthétiques ;
- la possibilité d’explorer différentes configurations (sélection
  d’indicateurs, regroupements) ;
- la visualisation des contributions respectives des indicateurs ;
- la comparaison de territoires selon plusieurs critères. Ces
  fonctionnalités seront précisées et priorisées au cours du projet.

#### Principes de mise en œuvre

La mise en œuvre de cet EPIC devra respecter les principes suivants:

- **Transparence** : les méthodes utilisées devront être explicites et
  compréhensibles ;
- **Traçabilité** : les résultats devront pouvoir être reliés aux
  indicateurs sources ;
- **Réversibilité** : il devra être possible de revenir à une lecture
  détaillée des indicateurs ;
- **Prudence méthodologique** : éviter toute simplification excessive ou
  biaisée.

#### Positionnement dans le projet

Compte tenu de sa complexité et des enjeux méthodologiques associés,
l’analyse multicritère n’est pas intégrée dans le périmètre du MVP. Elle
fera l’objet d’un développement après validation des principes
méthodologiques et des besoins utilisateurs.

Cet EPIC sera abordé de manière progressive, en lien étroit avec les
partenaires techniques, afin de garantir la robustesse et la pertinence
des résultats.

### EPIC 6 : Visualisation et exploration

#### Description

L’EPIC couvre la conception et la mise en œuvre des interfaces de
consultation et d’exploration des données. Il s’appuie sur les
indicateurs produits (EPIC 4) et les référentiels (EPIC 3) pour proposer
des restitutions graphiques et cartographiques à différentes échelles
spatiales et temporelles.

Les data visualisations doivent permettre à la fois une lecture
synthétique des informations (tableaux de bord) et une exploration plus
fine (cartographie, graphiques), en fonction des besoins des
utilisateurs.

Une attention particulière est portée à l’ergonomie, à la lisibilité et
à la cohérence des représentations proposées.

#### Fonctionnalités

- **Cartographie interactive**
  - affichage des bassins versants, captages et autres objets
    géographiques
  - représentation des indicateurs sous forme de couches thématiques
  - navigation (zoom, déplacement) et interaction (sélection, survol)
  - superposition de plusieurs couches d’information
- **Tableaux de bord**
  - sélection d’indicateur
  - visualisation agrégée par territoire ou thématique
  - accès rapide à l’information essentielle Ces tableaux de bord
    doivent être adaptés aux différents profils utilisateurs.
- **Graphiques temporels**
  - séries temporelles  
  - comparaison de périodes  
  - identification de tendances et de ruptures  
    Ces outils permettent d’analyser les dynamiques et les évolutions.
- **Comparaisons spatiales**  
  Possibilité de comparer plusieurs territoires ou objets :
  - comparaison entre bassins versants
  - comparaison entre captages
  - visualisation simultanée de plusieurs entités Les interfaces devront
    intégrer des mécanismes de sélection et de filtrage permettant
    d’explorer les données de manière dynamique.
- **Sélecteurs et filtres** Ces dispositifs doivent permettre de filtrer
  les données selon différentes dimensions, notamment :
  - le territoire (bassin versant, captage, zone géographique) ;
  - la période temporelle ;
  - certains attributs ou caractéristiques des referentiels (type,
    status, propriété etc. ).

Les sélecteurs doivent être cohérents entre les différentes vues
(cartes, graphiques, tableaux) afin de garantir une expérience
utilisateur homogène. Une modification de filtre doit se répercuter de
manière cohérente sur l’ensemble des visualisations.

Une attention particulière devra être portée à la lisibilité et à
l’ergonomie de ces filtres, afin d’éviter une complexité excessive pour
les utilisateurs non experts, tout en permettant des usages avancés pour
les profils techniques.

- **Monitoring** Les fonctionnalités de monitoring dans cet EPIC visent
  à rendre visibles et compréhensibles les informations de suivi pour
  les utilisateurs.

Elles comprennent : - la mise à disposition de tableaux de bord dédiés
au monitoring (technique, qualité des données, indicateurs métier) ; -
l’affichage d’informations de fraîcheur et de qualité directement dans
les visualisations (cartes, graphiques, fiches) ; - des outils de suivi
temporel permettant d’identifier des tendances ou des anomalies ; - des
vues synthétiques facilitant l’identification rapide des situations
nécessitant une attention particulière.

Ces fonctionnalités doivent rester lisibles et adaptées aux profils
d’administrateur de la plateforme.

#### Points de vigilance

- Risque de surcharge visuelle pouvant nuire à la compréhension  
- Nécessité d’adapter les visualisations aux différents profils
  d’utilisateurs  
- Importance de la cohérence entre les représentations (cartes,
  graphiques, tableaux)  
- Risque de mauvaise interprétation lié à des choix de représentation
  (échelles, couleurs, classifications)  
- Dépendance à la qualité et à la fraîcheur des données affichées

### EPIC 7 : Fiches et rapports automatisés

#### Objectifs

Cet EPIC vise à produire des restitutions statiques et structurées des
données et indicateurs à différentes échelles territoriales, notamment
la commune et les unités de gestion (captages, bassins versants).

Ces fiches ont pour objectif de fournir une vision claire et homogène
des informations disponibles pour un territoire donné, en présentant les
unités de gestion associées ainsi que les indicateurs qui s’y
rapportent.

Elles doivent permettre de décrire les situations observées, de
visualiser les évolutions dans le temps et de comparer les unités de
gestion entre elles, sans introduire d’interprétation ni de
hiérarchisation.

#### Mise en œuvre et fonctionnalités

Le système devra permettre de générer automatiquement des fiches à
différentes échelles spatiales, en particulier : - à l’échelle d’une
commune, en regroupant les unités de gestion présentes sur le territoire
; - à l’échelle d’une unité de gestion (captage, bassin versant), en
présentant ses caractéristiques et ses indicateurs associés.

Les fiches devront proposer une structuration homogène des informations,
incluant une description du périmètre concerné, la présentation des
unités de gestion associées lorsque cela est pertinent, ainsi que les
indicateurs disponibles.

Le système devra permettre d’intégrer des éléments de comparaison
descriptive entre unités de gestion, ainsi que des visualisations
associées (cartes, graphiques temporels) afin de faciliter la lecture
des évolutions.

Les contenus devront être directement issus des données et indicateurs
produits, sans transformation interprétative. Aucune fonctionnalité de
classement, de scoring ou de priorisation ne devra être introduite dans
ce cadre.

### EPIC 8 : Export et diffusion

#### Description

Cet EPIC regroupe les fonctionnalités permettant de diffuser, partager
et valoriser les données et analyses produites par HydroScope. Il répond
à un des grands objectifs du projet à savoir faciliter l’accès à une
information fiable et homogène pour l’ensemble des parties prenantes,
tout en permettant leur réutilisation dans d’autres contextes.

L’objectif est de rendre les données et résultats produits facilement
exploitables, que ce soit pour des usages internes (analyse, reporting)
ou externes (communication, partage inter-institutionnel).

#### Fonctionnalités

- **Export de données** Possibilité d’extraire les données et
  indicateurs sous des formats standards :
  - formats tabulaires (CSV, Excel)
  - formats géographiques (GeoJSON, Shapefile, Geopackage etc.)
  - export filtré selon des critères (territoire, période, indicateurs)
    Ces exports doivent permettre une réutilisation dans des outils
    tiers comme des SIG bureautique.
- **Export de rapports** Le système devra permettre le téléchargement de
  ces fiches sous des formats adaptés (PDF ou équivalent), depuis
  l’interface, afin de faciliter leur diffusion et leur utilisation par
  les différents acteurs. D’un point de vue technique, le système ne
  devra pas nécesserement générer ces fiches sur demande, mais elles
  devront être maintenues à jour suite à l’intégration de mises à jour
  des données.

**Partage de résultats**

Le système devra permettre le partage de vues de l’application sous
forme de liens, afin de faciliter la diffusion d’analyses entre les
différents acteurs.

Ces liens devront permettre de restituer un **contexte de
consultation**, incluant notamment : - le territoire sélectionné ; - les
indicateurs affichés ; - les filtres appliqués (temporels, thématiques,
géographiques) ; - le type de visualisation (carte, graphique, tableau
de bord).

L’utilisateur destinataire devra pouvoir accéder à cette vue de manière
directe, sans avoir à reconstruire manuellement le contexte d’analyse.

L’accès à ces contenus devra toutefois respecter les règles de gestion
des droits. Un utilisateur ne devra pouvoir consulter que les données
auxquelles il est autorisé, même lorsqu’il accède via un lien partagé.

Le système devra permettre de gérer différents niveaux de partage, par
exemple : - partage interne entre utilisateurs authentifiés ; -
diffusion élargie à des partenaires disposant d’un accès ; -
éventuellement partage public limité à certaines données.

Les mécanismes de partage devront garantir la cohérence des informations
diffusées et éviter toute ambiguïté liée à des différences de
configuration ou de filtres.

Une attention particulière devra être portée à la pérennité des liens
(gestion des versions, évolution des données) ainsi qu’à la lisibilité
des informations partagées.

- **API de diffusion**

Le système devra exposer les données via des interfaces programmatiques
(API) afin de permettre leur réutilisation dans des systèmes tiers et
d’assurer l’interopérabilité de la plateforme.

L’API devra permettre d’accéder aux données structurées du système,
notamment : - les données sources intégrées ; - les indicateurs calculés
; - les référentiels géographiques et thématiques.

Les données devront être accessibles selon différents critères de
requête, incluant notamment le territoire, la période temporelle, le
type d’indicateur ou de donnée.

L’API devra permettre de restituer des données cohérentes avec celles
affichées dans l’application, en tenant compte des traitements et des
agrégations réalisés.

L’accès à l’API devra être sécurisé et respecter les droits des
utilisateurs. Les données exposées devront être filtrées en fonction des
habilitations, afin de garantir la confidentialité des informations
sensibles. @todo \[priority=high section=lien\]: lien avec epic 9

L’API devra être documentée afin de faciliter son utilisation par des
systèmes tiers. Cette documentation devra préciser les formats
d’échange, les paramètres de requête et les modalités
d’authentification.

### EPIC 9 : Gestion des utilisateurs

#### Description

L’EPIC 9 regroupe les fonctionnalités liées à la gestion des accès, des
profils et des droits au sein d’HydroScope. Il vise à garantir un accès
sécurisé et adapté aux données et aux fonctionnalités, en tenant compte
de la diversité des utilisateurs et des usages.

Dans un contexte multi-acteurs, impliquant des partenaires
institutionnels, techniques et potentiellement le grand public, la
gestion des utilisateurs constitue un élément clé pour assurer à la fois
la sécurité des données et la pertinence des informations diffusées.

Le système doit également permettre une gestion évolutive des
utilisateurs, afin d’intégrer de nouveaux acteurs et d’adapter les
droits en fonction des évolutions organisationnelles.

#### Fonctionnalités

- **Authentification**  
  Mise en place de mécanismes permettant d’identifier les utilisateurs :
  - connexion sécurisée (identifiant / mot de passe)
  - possibilité d’intégration avec des systèmes existants (SSO,
    annuaires)
  - gestion des sessions

Ces mécanismes doivent garantir la sécurité des accès tout en restant
simples d’utilisation.

- **Gestion des droits d’accès**  
  Définition et gestion des autorisations :
  - accès aux données (restreint ou ouvert selon les profils)  
  - accès aux fonctionnalités (visualisation, export, paramétrage)  
  - gestion fine des permissions

Cette gestion doit permettre de protéger les données sensibles tout en
facilitant leur diffusion lorsque cela est pertinent.

- **Profils utilisateurs**  
  Définition de profils adaptés aux différents usages :
  - profils techniques (experts, analystes)  
  - profils opérationnels (collectivités, gestionnaires)  
  - profils décisionnels  
  - éventuellement accès grand public

Chaque profil doit bénéficier d’une interface et de fonctionnalités
adaptées à ses besoins.

- **Gestion des sessions et stockage local** Le système pourra utiliser
  des mécanismes de stockage côté navigateur (cookies, stockage local)
  afin de gérer les sessions utilisateurs et de mémoriser certains
  paramètres d’usage (préférences, filtres, état de navigation).

Ces mécanismes devront être limités aux usages strictement nécessaires
au fonctionnement de l’application et à l’amélioration de l’expérience
utilisateur.

Les informations stockées ne devront pas contenir de données sensibles.

- **Conformité RGPD et gestion des cookies** L’utilisation de cookies ou
  de stockage local devra respecter la réglementation en vigueur en
  matière de protection des données.

Cela implique notamment : - une transparence sur les données stockées
côté navigateur ; - une limitation des usages aux besoins fonctionnels
; - la mise en place de mécanismes de consentement si nécessaire ; - une
cohérence avec les règles définies dans le cadre contractuel (RGPD).

Les mécanismes mis en œuvre devront être proportionnés aux usages de la
plateforme et à la sensibilité des données manipulées.

- **Monitoring** Les fonctionnalités de monitoring dans cet EPIC
  concernent le suivi et l’analyse des usages de la plateforme.

Elles comprennent : - le suivi de la fréquentation de l’outil
(connexions, sessions) ; - l’analyse des usages par type d’utilisateur
(fonctionnalités consultées, parcours) ; - le suivi des actions
réalisées (consultations, exports, modifications) ; - la production de
statistiques d’usage pour orienter les évolutions du produit.

Ces éléments contribuent à l’amélioration continue de l’outil et à
l’adaptation aux besoins réels.

### EPIC 10 : Traçabilité et audit

### EPIC 10 : Traçabilité et audit

#### Objectifs

Cet EPIC vise à garantir la transparence, la reproductibilité et la
fiabilité des traitements réalisés au sein d’HydroScope.

Il doit permettre de comprendre l’origine des données, les
transformations appliquées et les actions réalisées dans le système,
afin d’instaurer un climat de confiance dans l’outil.

Dans un contexte où les indicateurs peuvent contribuer à orienter des
décisions publiques, la capacité à tracer les traitements et à justifier
les résultats constitue un enjeu central.

#### Mise en œuvre et fonctionnalités

Le système devra permettre de suivre et de reconstituer l’ensemble du
cycle de vie des données, depuis leur intégration jusqu’à leur
exploitation.

Il devra assurer un suivi des évolutions apportées aux données, aux
référentiels et aux paramètres, afin de permettre une lecture dans le
temps des modifications et, si nécessaire, une restitution d’un état
antérieur.

La traçabilité des calculs devra permettre de relier chaque indicateur
aux données sources mobilisées, aux transformations appliquées et aux
paramètres utilisés. L’objectif est de pouvoir reproduire un résultat et
d’en comprendre les conditions de production.

Le système devra également enregistrer les actions réalisées par les
administrateurs et les utilisateurs, notamment les opérations d’import,
de modification et d’export. Ces informations doivent permettre de
suivre l’utilisation de la plateforme et de répondre à des besoins
d’audit ou de sécurité.

Enfin, les informations de traçabilité devront être structurées et
accessibles de manière à permettre l’analyse des événements et la
reconstitution des processus, sans se limiter à une accumulation de
journaux techniques.

------------------------------------------------------------------------



## Backlog et gestion des User Stories

Le tableau ci-dessus présente une première structuration du backlog
produit d’HydroScope, organisée en EPICS et en User Stories (US). Il
constitue une traduction opérationnelle des besoins fonctionnels
identifiés dans le cadre du projet.

Chaque **EPIC** correspondant à un grand ensemble fonctionnel est
lui-même décliné en **User Stories**, qui décrivent des fonctionnalités
attendues du point de vue utilisateur et qui constituent une liste de
travail appelée backlog.

### Rôle du backlog

Ce backlog constitue un outil de pilotage des developpement du projet.
Il permettra de :

- structurer les besoins de manière progressive et lisible ;
- prioriser les développements en fonction de la valeur métier ;
- suivre l’avancement des fonctionnalités au fil des itérations ;
- faciliter les échanges entre la MOA, l’AMOA (si existante) et la MOE.

Il ne s’agit pas d’un document figé, mais d’un référentiel de base qui
est évolutif.

<table class="cell">
<colgroup>
<col style="width: 29%" />
<col style="width: 13%" />
<col style="width: 50%" />
<col style="width: 5%" />
</colgroup>
<thead>
<tr>
<th style="text-align: left;">EPIC</th>
<th style="text-align: left;">ID User Story</th>
<th style="text-align: left;">Libellé User Story</th>
<th style="text-align: left;">MVP</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align: left;">EPIC 1 – Gestion des données</td>
<td style="text-align: left;">US1.1</td>
<td style="text-align: left;">Importer des données via fichier</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1 – Gestion des données</td>
<td style="text-align: left;">US1.2</td>
<td style="text-align: left;">Connecter une API externe</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1 – Gestion des données</td>
<td style="text-align: left;">US1.3</td>
<td style="text-align: left;">Planifier des imports simples</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1 – Gestion des données</td>
<td style="text-align: left;">US1.4</td>
<td style="text-align: left;">Normaliser les données</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1 – Gestion des données</td>
<td style="text-align: left;">US1.5</td>
<td style="text-align: left;">Gérer les erreurs d’import</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1 – Gestion des données</td>
<td style="text-align: left;">US1.6</td>
<td style="text-align: left;">Historiser les données</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1 – Gestion des données</td>
<td style="text-align: left;">US1.7</td>
<td style="text-align: left;">Rejouer un traitement</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 10 – Traçabilité</td>
<td style="text-align: left;">US10.1</td>
<td style="text-align: left;">Tracer imports</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 10 – Traçabilité</td>
<td style="text-align: left;">US10.2</td>
<td style="text-align: left;">Tracer calculs</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 10 – Traçabilité</td>
<td style="text-align: left;">US10.3</td>
<td style="text-align: left;">Journal actions</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 10 – Traçabilité</td>
<td style="text-align: left;">US10.4</td>
<td style="text-align: left;">Historique modifications</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 10 – Traçabilité</td>
<td style="text-align: left;">US10.5</td>
<td style="text-align: left;">Reconstituer calcul</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 10 – Traçabilité</td>
<td style="text-align: left;">US10.6</td>
<td style="text-align: left;">Audit usages</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.1</td>
<td style="text-align: left;">Enregistrer un jeu de données dans le
catalogue</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.10</td>
<td style="text-align: left;">Alimenter automatiquement le catalogue
lors des imports</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.11</td>
<td style="text-align: left;">Relier un jeu de données à un traitement
(ex : dbt)</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.12</td>
<td style="text-align: left;">Enregistrer un indicateur comme donnée
dérivée</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.13</td>
<td style="text-align: left;">Consulter les métadonnées d’un
indicateur</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.14</td>
<td style="text-align: left;">Ajouter un nouveau jeu de données sans
modifier la structure</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.15</td>
<td style="text-align: left;">Historiser les modifications des
métadonnées</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.2</td>
<td style="text-align: left;">Associer des métadonnées à un jeu de
données</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.3</td>
<td style="text-align: left;">Modifier les métadonnées d’un jeu de
données</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.4</td>
<td style="text-align: left;">Consulter les informations d’un jeu de
données</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.5</td>
<td style="text-align: left;">Rechercher un jeu de données dans le
catalogue</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.6</td>
<td style="text-align: left;">Filtrer les jeux de données selon des
critères</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.7</td>
<td style="text-align: left;">Visualiser les relations entre indicateur
et données sources</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.8</td>
<td style="text-align: left;">Tracer les transformations appliquées à un
jeu de données</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 1bis – Catalogage des données</td>
<td style="text-align: left;">US1bis.9</td>
<td style="text-align: left;">Identifier une donnée comme source ou
dérivée</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 2 – Qualité des données</td>
<td style="text-align: left;">US2.1</td>
<td style="text-align: left;">Détecter des valeurs aberrantes</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 2 – Qualité des données</td>
<td style="text-align: left;">US2.2</td>
<td style="text-align: left;">Vérifier cohérence temporelle</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 2 – Qualité des données</td>
<td style="text-align: left;">US2.3</td>
<td style="text-align: left;">Vérifier cohérence spatiale</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 2 – Qualité des données</td>
<td style="text-align: left;">US2.4</td>
<td style="text-align: left;">Calculer un taux de complétude</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 2 – Qualité des données</td>
<td style="text-align: left;">US2.5</td>
<td style="text-align: left;">Qualifier la fiabilité</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 2 – Qualité des données</td>
<td style="text-align: left;">US2.6</td>
<td style="text-align: left;">Associer des métadonnées</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 2 – Qualité des données</td>
<td style="text-align: left;">US2.7</td>
<td style="text-align: left;">Visualiser la qualité</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 3 – Référentiels</td>
<td style="text-align: left;">US3.1</td>
<td style="text-align: left;">Gérer les bassins versants</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 3 – Référentiels</td>
<td style="text-align: left;">US3.2</td>
<td style="text-align: left;">Gérer les captages</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 3 – Référentiels</td>
<td style="text-align: left;">US3.3</td>
<td style="text-align: left;">Gérer périmètres de protection</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 3 – Référentiels</td>
<td style="text-align: left;">US3.4</td>
<td style="text-align: left;">Gérer la maille H3</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 3 – Référentiels</td>
<td style="text-align: left;">US3.5</td>
<td style="text-align: left;">Définir un indicateur</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 3 – Référentiels</td>
<td style="text-align: left;">US3.6</td>
<td style="text-align: left;">Gérer les profils utilisateurs</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 3 – Référentiels</td>
<td style="text-align: left;">US3.7</td>
<td style="text-align: left;">Versionner les référentiels</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 4 – Calcul d’indicateurs</td>
<td style="text-align: left;">US4.1</td>
<td style="text-align: left;">Calculer des indicateurs simples</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 4 – Calcul d’indicateurs</td>
<td style="text-align: left;">US4.2</td>
<td style="text-align: left;">Agréger à l’échelle BV</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 4 – Calcul d’indicateurs</td>
<td style="text-align: left;">US4.3</td>
<td style="text-align: left;">Agrégation temporelle</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 4 – Calcul d’indicateurs</td>
<td style="text-align: left;">US4.4</td>
<td style="text-align: left;">Paramétrer un calcul</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 4 – Calcul d’indicateurs</td>
<td style="text-align: left;">US4.5</td>
<td style="text-align: left;">Filtrer les données</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 4 – Calcul d’indicateurs</td>
<td style="text-align: left;">US4.6</td>
<td style="text-align: left;">Versionner un indicateur</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 4 – Calcul d’indicateurs</td>
<td style="text-align: left;">US4.7</td>
<td style="text-align: left;">Recalculer un indicateur</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 5 – Analyse multicritère</td>
<td style="text-align: left;">US5.1</td>
<td style="text-align: left;">Construire un indice composite</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 5 – Analyse multicritère</td>
<td style="text-align: left;">US5.2</td>
<td style="text-align: left;">Définir des pondérations</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 5 – Analyse multicritère</td>
<td style="text-align: left;">US5.3</td>
<td style="text-align: left;">Tester des scénarios</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 5 – Analyse multicritère</td>
<td style="text-align: left;">US5.4</td>
<td style="text-align: left;">Comparer scénarios</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 5 – Analyse multicritère</td>
<td style="text-align: left;">US5.5</td>
<td style="text-align: left;">Visualiser contributions</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 5 – Analyse multicritère</td>
<td style="text-align: left;">US5.6</td>
<td style="text-align: left;">Documenter méthodes</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 6 – Visualisation</td>
<td style="text-align: left;">US6.1</td>
<td style="text-align: left;">Visualiser sur carte</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 6 – Visualisation</td>
<td style="text-align: left;">US6.2</td>
<td style="text-align: left;">Afficher indicateurs carto</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 6 – Visualisation</td>
<td style="text-align: left;">US6.3</td>
<td style="text-align: left;">Navigation (zoom filtres)</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 6 – Visualisation</td>
<td style="text-align: left;">US6.4</td>
<td style="text-align: left;">Graphiques temporels</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 6 – Visualisation</td>
<td style="text-align: left;">US6.5</td>
<td style="text-align: left;">Comparer territoires</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 6 – Visualisation</td>
<td style="text-align: left;">US6.6</td>
<td style="text-align: left;">Tableau de bord avancé</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 6 – Visualisation</td>
<td style="text-align: left;">US6.7</td>
<td style="text-align: left;">Fiche territoire</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 7 – Aide à la décision</td>
<td style="text-align: left;">US7.1</td>
<td style="text-align: left;">Définir des seuils</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 7 – Aide à la décision</td>
<td style="text-align: left;">US7.2</td>
<td style="text-align: left;">Détecter dépassement</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 7 – Aide à la décision</td>
<td style="text-align: left;">US7.3</td>
<td style="text-align: left;">Identifier tendances</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 7 – Aide à la décision</td>
<td style="text-align: left;">US7.4</td>
<td style="text-align: left;">Fiche synthétique</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 7 – Aide à la décision</td>
<td style="text-align: left;">US7.5</td>
<td style="text-align: left;">Prioriser territoires</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 7 – Aide à la décision</td>
<td style="text-align: left;">US7.6</td>
<td style="text-align: left;">Aide à interprétation avancée</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 8 – Export</td>
<td style="text-align: left;">US8.1</td>
<td style="text-align: left;">Export CSV</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 8 – Export</td>
<td style="text-align: left;">US8.2</td>
<td style="text-align: left;">Export SIG</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 8 – Export</td>
<td style="text-align: left;">US8.3</td>
<td style="text-align: left;">Rapport PDF</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 8 – Export</td>
<td style="text-align: left;">US8.4</td>
<td style="text-align: left;">Partage lien</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 8 – Export</td>
<td style="text-align: left;">US8.5</td>
<td style="text-align: left;">API</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 8 – Export</td>
<td style="text-align: left;">US8.6</td>
<td style="text-align: left;">Export vue simple</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 9 – Utilisateurs</td>
<td style="text-align: left;">US9.1</td>
<td style="text-align: left;">Créer compte</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 9 – Utilisateurs</td>
<td style="text-align: left;">US9.2</td>
<td style="text-align: left;">Authentification</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 9 – Utilisateurs</td>
<td style="text-align: left;">US9.3</td>
<td style="text-align: left;">Rôles simples</td>
<td style="text-align: left;">O</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 9 – Utilisateurs</td>
<td style="text-align: left;">US9.4</td>
<td style="text-align: left;">Restreindre accès fin</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 9 – Utilisateurs</td>
<td style="text-align: left;">US9.5</td>
<td style="text-align: left;">Adapter interface</td>
<td style="text-align: left;">X</td>
</tr>
<tr>
<td style="text-align: left;">EPIC 9 – Utilisateurs</td>
<td style="text-align: left;">US9.6</td>
<td style="text-align: left;">Suivre connexions</td>
<td style="text-align: left;">X</td>
</tr>
</tbody>
</table>

### Évolution du backlog

DLe backlog produit est amené à évoluer tout au long du projet afin de
s’adapter aux besoins et aux retours des utilisateurs. Cette évolutivité
constitue un principe de fonctionnement du projet.

Toutefois, cette évolution doit être encadrée afin de garantir la
maîtrise du périmètre, des délais et des coûts.

Le backlog initial constitue la base contractuelle du projet, notamment
pour le périmètre du MVP. Les fonctionnalités associées à ce périmètre
devront être réalisées dans le cadre du marché.

Les évolutions du backlog (ajout, modification ou suppression de
fonctionnalités) devront faire l’objet : - d’une analyse d’impact
(fonctionnelle et technique) ; - d’une estimation de charge ; - d’une
validation par la MOA.

Ces évolutions pourront être : - intégrées dans le périmètre existant si
elles restent compatibles avec les engagements contractuels ; - ou
traitées comme des évolutions hors périmètre, dans le cadre d’un
dispositif de maintenance ou de prestations complémentaires.

Le prestataire devra proposer une organisation permettant de gérer ces
évolutions de manière transparente, notamment via l’outil de gestion de
projet (ex : Azure DevOps).

Une attention particulière devra être portée à la maîtrise du périmètre
du MVP, qui constitue une étape clé du projet.

### Intégration dans les outils de gestion de projet

Le backlog présenté dans ce document a vocation à être intégré dans les
outils de gestion de projet utilisés par l’OEIL, notamment **Azure
DevOps**.

Dans ce cadre :

- les EPICS et User Stories seront créés et structurés dans un projet
  dédié ;
- ils seront enrichis avec des critères d’acceptation, des estimations
  de charge et des dépendances ;
- ils seront planifiés et suivis au sein des sprints de développement ;
- leur avancement sera tracé de manière continue
- le code source sera hebergé dans l’infrastructure de l’OEIL et les
  commits seront liés aux US dans la mesure du possible.

Le tableau présent dans le présent cahier des charges constitue ainsi
une base de travail initiale, destinée à être opérationnalisée et
détaillée dans l’outil de gestion de projet au cours de la phase de
réalisation.

------------------------------------------------------------------------



## Exigences non fonctionnelles

Les exigences non fonctionnelles définissent les qualités attendues du
système HydroScope au-delà des fonctionnalités métiers. Elles visent à
garantir la performance, la sécurité, la robustesse et la pérennité de
la solution, tout en assurant une expérience utilisateur adaptée aux
différents profils.

Ces exigences doivent être prises en compte dès la conception du système
afin d’éviter des limitations structurelles ou des coûts de refonte
ultérieurs.

### Performance

Le système doit offrir des temps de réponse compatibles avec les usages
attendus :

- affichage des cartes et tableaux de bord : **\< 3 secondes** dans des
  conditions nominales ;
- chargement de fiches territoires : **\< 3 secondes** ;
- génération de graphiques temporels : **\< 3 secondes**. Au delà des
  indicateur de chargement doivent etre affichés pour informer
  l’utilisateur du temps de traitement restant.

Pour les traitements liés aux calcul d’indicateurs : - en temps quasi
immédiat pour les indicateurs simples (quelques secondes) ; - en différé
(pipeline de traitement en arrière plan) pour les traitements lourds,
avec des délais maîtrisés et suivi.

@todo \[priority=high, section=lien\]: faire le lien avec la section
monitoring pour le suivi des traitements en arrière plan

### Volumétrie et charge

Le système devra être dimensionné pour gérer les volumes suivants :

- plusieurs dizaines de bassins versants
- plusieurs centaines de captages et forages ;
- plusieurs dizaines d’indicateurs calculés à différentes échelles ;
- des données spatiales potentiellement volumineuses (maillages, séries
  temporelles) ;

@todo \[priority=high, section=processing\]: indiquer la volumetrie plus
précisement sur les traitements.

Le système devra permettre :

- la gestion de **10 à 50 utilisateurs simultanés** (ordre de grandeur)
  ;
- des mises à jour régulières des données (de quotidienne à annuelle
  selon les sources) ;
- une évolution continue du volume de données dans le temps (env. +15%
  ). Ces exigences seront précisées et validées lors des phases de
  conception.

### Sécurité

HydroScope doit garantir la protection des données et des accès au
système.

Cela inclut :

- la sécurisation des accès (authentification, gestion des droits) ;
- la protection des données utilisateur et des données sensibles ;
- la sécurisation des échanges pour certaines données avec les systèmes
  externes ;
- Une traçabilité des accès et des actions ;
- la conformité avec les réglementations en vigueur (RGPD, directives
  institutionnelles) ;
- la mise en place de mécanismes de sauvegarde et de restauration des
  données (Barman).

Les mécanismes de sécurité doivent être adaptés aux différents niveaux
d’utilisateurs et aux contraintes institutionnelles.

### Interopérabilité

Le système doit pouvoir s’intégrer dans un écosystème existant de
données et d’outils:

- le respect des standards en vigueur, notamment pour les données
  géographiques ;
- la capacité à consommer et à exposer des données via des API ;
- la compatibilité avec les formats d’échange usuels (tabulaires,
  géographiques) ;
- la possibilité d’interagir avec des systèmes tiers (API sécurisés ou
  non, webservices OGC et ESRI, serveur FTP).

@todo \[priority=high, section=API\]: préciser les usage des API externe
prévues.

L’interopérabilité est un facteur clé pour faciliter le partage et la
réutilisation des données.

### Accessibilité et ergonomie

L’interface utilisateur doit être conçue pour être accessible à des
profils variés, allant des experts aux utilisateurs non spécialisés.

- une navigation claire et intuitive ;
- des interfaces adaptées aux usages (exploration, analyse, restitution)
  ;
- une lisibilité des informations (cartes, graphiques, tableaux) avec
  respect des règle de l’art en datavizualisation ;
- une prise en compte des bonnes pratiques en matière d’accessibilité
  numérique.

L’objectif est de faciliter l’appropriation de l’outil et de limiter les
risques de mauvaise interprétation.

### Maintenabilité et évolutivité

Le système doit être conçu de manière à faciliter sa maintenance et son
évolution dans le temps.

- une architecture modulaire permettant d’ajouter ou de modifier des
  fonctionnalités (microservices);
- une documentation technique et fonctionnelle complète fourni qu format
  numérique, mise à jour à chaque livraison de version;
- la possibilité de faire évoluer les indicateurs, les référentiels et
  les sources de données ;
- l’utilisation de framework et de bibliothèques standards pour
  faciliter la maintenance et l’intégration de nouvelles fonctionnalités
  ;
- l’identification précises de briques technique et librairie et leur
  modalité de mise à jour ;

Ces éléments doivent permettre d’assurer la pérennité du système et sa
capacité à s’adapter aux évolutions futures.

### Disponibilité

Le système devra garantir un niveau de disponibilité compatible avec les
usages :

- disponibilité cible : **≥ 98 %** (soit 7 jours hors maintenance
  planifiée) ;
- plages de maintenance définies et communiquées ;
- reprise en cas d’incident dans des délais maîtrisés (cf. SLA).

@todo \[priority=high, section=lien\]: faire le lien avec SLA

------------------------------------------------------------------------



## Architecture cible (niveau macro)

L’architecture cible d’HydroScope vise à structurer de manière cohérente
les différents composants du système afin de répondre aux besoins
fonctionnels, aux exigences non fonctionnelles et aux contraintes
d’interopérabilité. Elle doit permettre de garantir la robustesse, la
scalabilité et la maintenabilité de la solution, tout en facilitant les
évolutions futures.

Cette architecture repose sur une séparation claire des responsabilités
entre les différentes couches du système : acquisition des données,
stockage, traitement, exposition et restitution.

### Principes généraux

L’architecture s’appuie sur les principes suivants :

- **Modularité** : séparation des composants pour faciliter la
  maintenance et les évolutions ;
- **Scalabilité** : capacité à gérer l’augmentation des volumes de
  données et des usages ;
- **Interopérabilité** : intégration facilitée avec des systèmes
  externes et respect des standards ;
- **Traçabilité** : capacité à suivre les flux de données et les
  traitements ;
- **Ouverture** : recours privilégié à des technologies open source
  lorsque cela est pertinent.

### Schéma fonctionnel

L’architecture s’organise autour de plusieurs briques principales :

- **Sources de données**  
  Données internes et externes (services institutionnels, données
  environnementales, données satellitaires, bases existantes).

- **Couche d’ingestion**  
  Mécanismes d’import et de connexion aux sources (API, fichiers, flux
  automatisés), incluant des processus de validation initiale.

- **Couche de stockage**  
  Stockage des données brutes et des données structurées :

  - base de données (relationnelle et/ou spatiale)  
  - stockage des historiques  
  - gestion des référentiels

- **Couche de traitement**  
  Traitements permettant :

  - la transformation et la normalisation des données  
  - le calcul des indicateurs  
  - l’agrégation spatiale et temporelle  
  - l’application des règles métier

- **Couche d’exposition (API)**  
  Mise à disposition des données et indicateurs via des interfaces
  programmatiques, permettant leur consommation par l’application et par
  des systèmes tiers.

- **Couche de restitution (front-end)**  
  Interfaces utilisateurs :

  - cartographie interactive  
  - tableaux de bord  
  - fiches détaillées  
  - outils d’exploration et d’analyse

### Intégration au système d’information existant

HydroScope doit s’intégrer dans l’écosystème existant des partenaires.

Cela implique : - la connexion à des sources de données existantes sans
duplication inutile ; - la capacité à consommer des services externes
(API, flux de données) ; - la possibilité de diffuser les données
produites vers d’autres systèmes ; - la compatibilité avec les outils
SIG et les standards géographiques.

Cette intégration doit être pensée de manière à limiter les redondances
et à favoriser la cohérence des données entre systèmes.

### Choix technologiques (à cadrer)

Les choix technologiques seront précisés lors des phases de conception
détaillée. Ils devront répondre aux exigences du projet en matière de
performance, de sécurité, d’interopérabilité et de maintenabilité.

Une attention particulière sera portée : - à l’utilisation de
technologies open source ; - à la gestion des données géographiques ; -
à la capacité à traiter des volumes de données importants ; - à la
facilité de déploiement et d’exploitation.

Ces choix devront être validés en cohérence avec les contraintes des
partenaires et les compétences disponibles.

------------------------------------------------------------------------



## Gestion du code source et pratiques de développement

Le développement du projet HydroScope s’appuie sur des pratiques de
gestion de code visant à garantir la qualité, la traçabilité et la
maintenabilité du système.

Le code source sera hébergé au sein de l’infrastructure de l’OEIL, dans
un dépôt dédié. Les outils de gestion de projet et de versionnement
(notamment Azure DevOps) seront utilisés pour assurer la cohérence entre
les développements et les besoins fonctionnels.

#### Gestion des versions

Le code source devra être structuré selon des pratiques de gestion de
versions permettant : - de tracer les évolutions du code ; - de gérer
les développements parallèles ; - de sécuriser les mises en production.

Une stratégie de gestion de branches (par exemple de type GitFlow ou
équivalent) devra être définie et appliquée.

#### Lien avec le backlog

Dans la mesure du possible, chaque évolution du code devra être associée
à une User Story ou à un élément du backlog.

Cela implique : - la référence explicite des identifiants de User
Stories dans les messages de commit ; - la traçabilité entre les
développements réalisés et les besoins fonctionnels ; - une cohérence
entre l’avancement technique et le suivi du backlog dans Azure DevOps.

#### Nomenclature des commits

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

#### Revue de code

Des mécanismes de revue de code (pull requests) devront être mis en
place afin de : - garantir la qualité du code produit ; - partager les
connaissances au sein de l’équipe ; - limiter les risques d’erreur.

------------------------------------------------------------------------



## Stratégie de déploiement

La stratégie de déploiement d’HydroScope vise à mettre à disposition un
outil opérationnel de manière progressive, en sécurisant les usages et
en accompagnant l’appropriation par les utilisateurs. Elle s’inscrit
dans la continuité de l’approche Agile, avec des mises en production
incrémentales et maîtrisées.

L’objectif est de limiter les risques, de valider les choix fonctionnels
en conditions réelles et de permettre une montée en charge progressive
du système.

### Approche progressive

Le déploiement du projet s’appuie sur la mise en production d’un MVP,
permettant une première utilisation en conditions réelles sur un
périmètre fonctionnel limité.

Ce MVP sera enrichi progressivement par itérations successives,
permettant d’introduire progressivement les fonctionnalités auprès des
utilisateurs.et en intégrant les retours des utilisateurs et les
évolutions du backlog.

Le déploiement du système est envisagé en plusieurs étapes:

- Mise à disposition du **MVP (Minimum Viable Product)** couvrant les
  fonctionnalités essentielles (intégration de données, premiers
  indicateurs, visualisation de base) ;
- Enrichissement progressif des fonctionnalités en fonction des
  priorités du backlog ;
- Extension du périmètre fonctionnel et des jeux de données intégrés.

Cette approche permet de tester rapidement les usages et d’ajuster le
produit en continu.

### Environnements

Le système devra être déployé sur plusieurs environnements distincts
afin de garantir la qualité et la sécurité des mises en production :

- **Environnement de développement** : utilisé par la MOE pour le
  développement et les tests techniques ;
- **Environnement de test / recette / qualification** : utilisé pour la
  validation fonctionnelle par la MOA et les utilisateurs ;
- **Environnement de production** : accessible aux utilisateurs finaux.

La gestion des environnements doit permettre de sécuriser les
déploiements et de limiter les risques de régression.

### Modalités de mise en production

Les mises en production seront réalisées de manière régulière, en
cohérence avec les cycles de développement.

- Déploiement des nouvelles fonctionnalités à l’issue des phases de
  validation ;
- Vérification du bon fonctionnement après mise en production ;
- Possibilité de retour arrière en cas de problème majeur.

Une attention particulière devra être portée à la continuité de service
lors des mises à jour.

### Montée en charge

Le déploiement devra prendre en compte une montée en charge progressive
:

- augmentation du nombre d’utilisateurs ;
- intégration de nouveaux jeux de données ;
- extension des fonctionnalités.

Le système devra être dimensionné pour accompagner cette montée en
charge sans dégradation des performances.

### Accompagnement au déploiement

Le déploiement devra être accompagné afin de faciliter l’appropriation
de l’outil :

- information des utilisateurs sur les évolutions ;
- organisation de phases de test avec les utilisateurs ;
- prise en compte des retours dans les versions suivantes.

Cet accompagnement est essentiel pour assurer l’adhésion des parties
prenantes.

------------------------------------------------------------------------



## Recette et validation

La recette et la validation du système HydroScope constituent une étape
essentielle pour garantir la conformité de la solution aux besoins
exprimés, ainsi que la fiabilité des traitements et des indicateurs
produits. Elles s’inscrivent dans une démarche continue, en cohérence
avec l’approche Agile du projet.

L’objectif est de vérifier à la fois la qualité fonctionnelle du
système, la robustesse technique et la validité méthodologique des
résultats.

### Stratégie de tests

La stratégie de tests repose sur plusieurs niveaux complémentaires :

- **Tests techniques** réalisés par la MOE :
  - tests unitaires (fonctions, composants) ;
  - tests d’intégration (enchaînement des traitements, flux de données)
    ;
  - tests de performance.
- **Tests fonctionnels** :
  - vérification de la conformité des fonctionnalités aux besoins
    exprimés ;
  - validation des interfaces et des parcours utilisateurs.
- **Tests de non-régression** :
  - vérification que les évolutions n’altèrent pas les fonctionnalités
    existantes.

Ces tests sont réalisés de manière continue au fil des sprints.

### Recette fonctionnelle

La recette fonctionnelle est pilotée par la MOA, avec l’appui de l’AMOA
et la participation des utilisateurs.

Elle vise à : - valider la conformité des fonctionnalités livrées ; -
vérifier l’adéquation de l’outil aux usages métiers ; - identifier les
écarts ou anomalies.

La recette s’appuie sur des scénarios de test représentatifs des usages
réels. Elle est réalisée de manière itérative, à chaque livraison de
fonctionnalités.

### Validation scientifique et méthodologique

Compte tenu de la nature du projet, une attention particulière est
portée à la validation des indicateurs et des méthodes de calcul.

Cette validation vise à : - vérifier la pertinence des indicateurs
produits ; - contrôler la cohérence des méthodes d’agrégation et de
calcul ; - s’assurer de la conformité aux principes méthodologiques
définis.

Elle implique les experts métiers et les partenaires techniques
concernés.

### Critères d’acceptation

Chaque fonctionnalité doit être associée à des critères d’acceptation
permettant de valider sa conformité.

Ces critères portent notamment sur : - le respect des exigences
fonctionnelles ; - la qualité des résultats produits ; - la conformité
des interfaces ; - la prise en compte des règles métier.

La validation est prononcée par la MOA sur la base de ces critères.

### Gestion des anomalies

Les anomalies identifiées lors des phases de test et de recette sont : -
recensées et qualifiées ; - priorisées en fonction de leur impact ; -
corrigées dans les cycles de développement suivants.

Un suivi des anomalies est mis en place afin de garantir leur
résolution.

### Validation des versions

Chaque version du système fait l’objet d’une validation avant mise en
production.

Cette validation repose sur : - la réussite des tests techniques et
fonctionnels ; - la validation des éléments méthodologiques ; - la
correction des anomalies critiques.

La décision de mise en production est prise par la MOA.

### Points de vigilance

- Nécessité d’impliquer les utilisateurs dans les phases de recette  
- Importance de la validation méthodologique des indicateurs  
- Risque de sous-estimation des efforts de test dans un contexte Agile  
- Coordination entre corrections d’anomalies et développement de
  nouvelles fonctionnalités  
- Maintien d’un référentiel de tests à jour tout au long du projet

------------------------------------------------------------------------



## Accompagnement et conduite du changement

La mise en œuvre d’HydroScope implique des évolutions dans les pratiques
des acteurs de la gestion de l’eau en Nouvelle-Calédonie. À ce titre, un
dispositif d’accompagnement et de conduite du changement est nécessaire
pour favoriser l’appropriation de l’outil, garantir son utilisation
effective et assurer la cohérence des usages entre les différentes
parties prenantes.

L’objectif est de faciliter l’adoption du système, de sécuriser son
déploiement et de permettre une montée en compétence progressive des
utilisateurs et des administrateurs.

### Accompagnement des utilisateurs et des administrateurs

Le dispositif d’accompagnement concerne à la fois :

- les **utilisateurs finaux** (techniciens, ingénieurs, décideurs), qui
  utilisent l’outil pour analyser et interpréter les données ;
- les **administrateurs** (OEIL notamment), qui assurent l’exploitation,
  la gestion des données et le paramétrage de la plateforme.

#### Objectifs

L’accompagnement vise à permettre :

- une prise en main rapide de l’outil ;
- une compréhension des indicateurs et de leurs limites ;
- une utilisation adaptée aux différents profils ;
- une autonomie progressive des administrateurs dans la gestion du
  système.

Pour les administrateurs, cela inclut en particulier :

- la gestion des données (import, mise à jour, contrôle qualité) ;
- l’administration des référentiels (objets géographiques, indicateurs)
  ;
- la supervision des traitements et des calculs ;
- la gestion des utilisateurs et des droits ;
- un premier niveau de support aux utilisateurs.

### Formation

Des actions de formation devront être mises en place, adaptées aux
différents profils :

- **Formations utilisateurs** :
  - prise en main de l’interface ;
  - lecture et interprétation des indicateurs ;
  - utilisation des outils de visualisation et d’analyse.
- **Formations administrateurs** :
  - gestion des flux de données et des imports ;
  - administration des référentiels et des indicateurs ;
  - utilisation des outils de supervision et de monitoring ;
  - bonnes pratiques d’exploitation de la plateforme.

Ces formations pourront être réalisées sous forme de sessions dédiées,
d’ateliers pratiques et de supports pédagogiques.

### Documentation

Une documentation complète devra être produite et maintenue à jour :

- **Documentation utilisateur** :
  - guides de prise en main ;
  - description des fonctionnalités ;
  - cas d’usage.
- **Documentation administrateur** :
  - guide d’administration ;
  - description des processus d’import et de mise à jour ;
  - documentation des indicateurs et des traitements ;
  - procédures de gestion des incidents.

Cette documentation constitue un support essentiel pour l’autonomie des
utilisateurs et des administrateurs.

### Support et accompagnement dans la durée

Un dispositif de support devra être mis en place pour accompagner les
utilisateurs et les administrateurs après le déploiement :

- point de contact pour les questions et incidents ;
- accompagnement lors des premières phases d’exploitation ;
- suivi des demandes d’évolution ;
- support spécifique pour les administrateurs lors de la prise en main.

Des actions de **transfert de compétences** devront être prévues afin de
limiter la dépendance au prestataire.

### Communication

Une communication régulière devra être assurée tout au long du projet :

- information sur les évolutions de l’outil ;
- valorisation des usages ;
- partage des bonnes pratiques.

Cette communication contribue à maintenir l’engagement des parties
prenantes.

------------------------------------------------------------------------



## Cadre contractuel et juridique

Le présent projet s’inscrit dans un cadre contractuel nécessitant la
définition de règles claires en matière de propriété, de gestion des
données, de maintenance et de réversibilité. Les éléments suivants
devront être pris en compte dans la mise en œuvre et l’exploitation de
la solution HydroScope.

### Propriété intellectuelle

Les développements réalisés dans le cadre du projet HydroScope feront
l’objet d’une clarification des droits de propriété intellectuelle.

Sauf disposition contraire, les éléments suivants sont attendus : - les
codes sources développés dans le cadre du projet seront accessibles à
l’OEIL ; - l’OEIL disposera de droits d’usage, de modification et de
réutilisation du code ; - les éventuels composants tiers ou
bibliothèques utilisées devront être clairement identifiés (licences,
restrictions).

Une attention particulière sera portée à la compatibilité avec des
solutions open source.

### Protection des données (RGPD)

Le traitement des données dans HydroScope devra respecter la
réglementation en vigueur en matière de protection des données,
notamment le RGPD.

Cela implique : - l’identification des données sensibles ou à caractère
personnel (le cas échéant) ; - la mise en place de mesures de
sécurisation adaptées ; - la limitation des accès aux données en
fonction des profils utilisateurs ; - la traçabilité des accès et des
traitements.

Une analyse du niveau de sensibilité des données devra être réalisée en
amont.

### Réversibilité

Le prestataire devra garantir la réversibilité de la solution en fin de
contrat ou en cas de changement de prestataire.

Cela inclut : - la restitution des données dans des formats standards et
exploitables ; - la mise à disposition du code source (selon les
modalités définies) ; - la documentation technique et fonctionnelle
nécessaire à la reprise ; - l’assistance à la reprise par un tiers, si
nécessaire.

L’objectif est d’éviter toute dépendance technique ou fonctionnelle
vis-à-vis d’un prestataire.

### Maintenance et support (SLA / TMA)

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

<table>
<thead>
<tr>
<th>Criticité</th>
<th>Délai de prise en charge</th>
<th>Délai de résolution</th>
</tr>
</thead>
<tbody>
<tr>
<td>Bloquant</td>
<td>4h</td>
<td>24h</td>
</tr>
<tr>
<td>Majeur</td>
<td>5 jours</td>
<td>10 jours</td>
</tr>
<tr>
<td>Mineur</td>
<td>10 jours</td>
<td>30 jours</td>
</tr>
</tbody>
</table>

------------------------------------------------------------------------



## Planning et jalons

Le planning du projet HydroScope s’inscrit dans une logique itérative et
incrémentale, tout en intégrant des contraintes calendaires fortes liées
aux financements (OFB / PEP). Il vise à concilier une approche Agile
avec des jalons contractuels permettant de sécuriser le pilotage du
projet.

La période de développement est prévue du **1er novembre 2026 au 31 mai
2027**, avec une mise à disposition progressive des fonctionnalités.

### Macro-planning

Le projet est structuré en grandes phases :

- **Phase de préparation (octobre 2026)**
  - finalisation du cadrage fonctionnel et technique ;
  - consolidation du backlog initial ;
  - préparation des environnements ;
  - cadrage des flux de données avec les partenaires.
- **Phase de développement – itérative (novembre 2026 → avril 2027)**
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

### Jalons contractuels

Afin de sécuriser le pilotage du projet, plusieurs jalons contractuels
sont définis :

- **J1 – Lancement du projet (01/11/2026)**  
  Démarrage des développements, validation du backlog initial, des
  modalités de travail et des engagements de fourniture de données.

- **J2 – Validation du socle technique et des flux de données
  (mi-décembre 2026)**  
  Mise en place des mécanismes d’import, structuration des données,
  premiers référentiels opérationnels.

- **J3 – Livraison du MVP (fin janvier 2027)**  
  Mise à disposition d’une première version fonctionnelle incluant :

  - intégration de données structurées ;
  - calcul d’indicateurs simples ;
  - visualisation cartographique et temporelle ;
  - premières fiches territoires.

- **J4 – Enrichissement fonctionnel (mars 2027)**  
  Extension des fonctionnalités :

  - enrichissement des indicateurs ;
  - amélioration des visualisations ;
  - premières fonctionnalités d’aide à la décision ;
  - consolidation des données.

- **J5 – Recette fonctionnelle et méthodologique (mai 2027)**  
  Validation par la MOA :

  - conformité fonctionnelle ;
  - validation des indicateurs ;
  - correction des anomalies critiques ;
  - validation des performances globales.

- **J6 – Mise en production (31/05/2027)**  
  Mise à disposition de la version initiale du système.

### Pilotage et suivi

Le suivi du planning repose sur :

- l’avancement des sprints ;
- le suivi du backlog produit et de ses priorités ;
- les démonstrations régulières (sprint review) ;
- les comités de pilotage (COPIL) et comités techniques (COTECH) ;
- le suivi des anomalies et des corrections.

Des ajustements pourront être réalisés en fonction de l’avancement réel,
dans le respect des jalons contractuels.

### Dépendances

Le respect du planning dépend de plusieurs facteurs :

- disponibilité et qualité des données sources ;
- mobilisation des acteurs pour les validations ;
- formalisation des engagements de fourniture de données ;
- validation des choix méthodologiques (indicateurs) ;
- contraintes techniques liées à l’intégration des données.

Ces dépendances devront être suivies de manière continue.

### Gestion des risques projet

Le projet comporte des risques pouvant impacter les délais, la qualité
ou le périmètre. Leur identification et leur suivi sont essentiels pour
sécuriser le projet.

#### Principaux risques

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
- **Adoption utilisateur** : difficulté d’appropriation de l’outil.

#### Suivi des risques

Les risques feront l’objet : - d’un suivi régulier en COTECH et COPIL
; - d’une mise à jour continue ; - de la définition de mesures de
mitigation adaptées.

#### Mesures de mitigation (exemples)

- formalisation des engagements de fourniture de données ;
- priorisation stricte du MVP et du backlog ;
- validation progressive des indicateurs ;
- mise en place de contrôles qualité sur les données ;
- implication régulière des utilisateurs.

### Points de vigilance

- Respect des échéances liées aux financements (OFB / PEP)  
- Nécessité de stabiliser rapidement un MVP opérationnel  
- Coordination entre rythme Agile et contraintes contractuelles  
- Anticipation des phases de recette et de validation méthodologique  
- Gestion des dépendances liées aux données et aux partenaires

------------------------------------------------------------------------

# Annexes

## Tableau synthétique des indicateurs

@todo \[priority=high, section=annexe-liens-fichiers\] : inserer un lien
vers le tableau des indicateurs

## Catalogue des indicateurs

@todo \[priority=high, section=annexe-liens-fichiers\] : inserer un lien
vers le catalogue de fiches des indicateurs

## Cadre de chiffrage (DQE)

## Détail Quantitatif Estimatif (DQE)

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>

<table class="dataframe" data-quarto-postprocess="true" data-border="1">
<thead>
<tr style="text-align: right;">
<th data-quarto-table-cell-role="th"></th>
<th data-quarto-table-cell-role="th">EPIC</th>
<th data-quarto-table-cell-role="th">ID_US</th>
<th data-quarto-table-cell-role="th">User_Story</th>
<th data-quarto-table-cell-role="th">MVP</th>
<th data-quarto-table-cell-role="th">Complexité</th>
<th data-quarto-table-cell-role="th">Charge (JH)</th>
<th data-quarto-table-cell-role="th">Coût</th>
<th data-quarto-table-cell-role="th">Commentaires</th>
</tr>
</thead>
<tbody>
<tr>
<td data-quarto-table-cell-role="th">0</td>
<td>EPIC 1 – Gestion des données</td>
<td>US1.1</td>
<td>Importer des données via fichier</td>
<td>Oui</td>
<td>Élevée</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td data-quarto-table-cell-role="th">5</td>
<td>EPIC 1 – Gestion des données</td>
<td>US1.2</td>
<td>Connecter une API externe</td>
<td>Non</td>
<td>Élevée</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td data-quarto-table-cell-role="th">1</td>
<td>EPIC 1 – Gestion des données</td>
<td>US1.3</td>
<td>Planifier des imports simples</td>
<td>Oui</td>
<td>Élevée</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td data-quarto-table-cell-role="th">2</td>
<td>EPIC 1 – Gestion des données</td>
<td>US1.4</td>
<td>Normaliser les données</td>
<td>Oui</td>
<td>Élevée</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td data-quarto-table-cell-role="th">3</td>
<td>EPIC 1 – Gestion des données</td>
<td>US1.5</td>
<td>Gérer les erreurs d’import</td>
<td>Oui</td>
<td>Élevée</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td data-quarto-table-cell-role="th">...</td>
<td>...</td>
<td>...</td>
<td>...</td>
<td>...</td>
<td>...</td>
<td>...</td>
<td>...</td>
<td>...</td>
</tr>
<tr>
<td data-quarto-table-cell-role="th">68</td>
<td>EPIC 9 – Utilisateurs</td>
<td>US9.2</td>
<td>Authentification</td>
<td>Oui</td>
<td>Faible</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td data-quarto-table-cell-role="th">69</td>
<td>EPIC 9 – Utilisateurs</td>
<td>US9.3</td>
<td>Rôles simples</td>
<td>Oui</td>
<td>Faible</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td data-quarto-table-cell-role="th">71</td>
<td>EPIC 9 – Utilisateurs</td>
<td>US9.4</td>
<td>Restreindre accès fin</td>
<td>Non</td>
<td>Faible</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td data-quarto-table-cell-role="th">72</td>
<td>EPIC 9 – Utilisateurs</td>
<td>US9.5</td>
<td>Adapter interface</td>
<td>Non</td>
<td>Faible</td>
<td></td>
<td></td>
<td></td>
</tr>
<tr>
<td data-quarto-table-cell-role="th">73</td>
<td>EPIC 9 – Utilisateurs</td>
<td>US9.6</td>
<td>Suivre connexions</td>
<td>Non</td>
<td>Faible</td>
<td></td>
<td></td>
<td></td>
</tr>
</tbody>
</table>

<p>80 rows × 8 columns</p>
</div>

[1] Système de grille hierarchique vectorielle standardisée utilisé pour
agréger des données hétérogènes (incendies, érosion, occupation du sol).

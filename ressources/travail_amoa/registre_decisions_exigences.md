# Registre des décisions et exigences — HydroScope (source : réunions Read AI)

> Analyse factuelle des comptes rendus Read AI de 10 réunions (juin–août 2026), alimentant la finalisation du Cahier des Charges (CDC). Aucun détail inventé.

## 1. Synthèse par réunion

### R1 · 09/06 · Atelier large (M. David/OEIL, H. Roussaffa/AMO, S. Balayre/DAVAR, L. Brounais/SIVOM, A. Racle/CDE, P. Barrière, J. Villemain/PSud, CEREG, Mairie Thio)
- Présentation (juin 2025→déc. 2027, PEP/OFB) : 37 sources, ~38 indicateurs ; GeoREP ≈ 420 captages AEP ; convergence avec cartographie pressions Province Sud.
- DÉCISION : hors périmètre = pluviométrie temps réel, narration SOURCE, gestion administrative, modélisation hydraulique ; open source/modulaire/profils ; bassins versants via RHM/MNT ; trilatérales avec Province Sud/NCB/Magis.
- OUVERT : unités de distribution (ADAS), critère MOSS vs DIMAC, pollutions minières historiques.

### R2 · 07/06 · Bilatérale (M. DAVID, H. Roussaffa)
- DÉCISION : MOSS (sols nus) pour la dynamique minière, non cadastre ; Azure DAVAR = référentiel captages ; fiches = livrable intermédiaire facturable, code immutable ; rassurer les miniers (agrégation, non-publication).
- OUVERT : liaison UD↔captages, identifiants, métadonnées GeoREP.

### R3 · 21/06 · Bilatérale PSUD (M. DAVID, H. Roussaffa)
- ~38 indicateurs × 3 familles ; ETL nord/sud ; ICPE ; signalements (API Tinanac).
- DÉCISION : pas de pondération imposée (encadrée, validée conseil scientifique) ; pas d'indexation brute ; acquisitions étalées 5–10 ans, accès API/OneShot ; signalements = événements (ouvert/traité).
- OUVERT : maille spatiale, priorisation des 38, espèces sensibles, produit final.

### R4 · 23/06 · Bilatérale SIVOMVKP (L. Brounais, M. DAVID, H. Roussaffa)
- Échelle captage appuyé sur UD ; pondération démographique par îlots (recensement 2024/25).
- DÉCISION : outil d'aide à la décision ; pressions en 4 familles ; foncier = vulnérabilité ; qualité exclue de la V1 ; suivis terrain si peu coûteux.
- OUVERT : débit prélevable (50 %), harmonisation Province Nord, PUD en PDF.

### R5 · 25/06 · Bilatérale EauNC (M. DAVID, H. Roussaffa)
- ONC (bureau d'études, schémas directeurs, débits d'étiage DAVAR, piézométrie >15 ans, osmoseurs, Sentinel/Google Earth Engine).
- DÉCISION : agréger au niveau captages uniquement ; pas de simulations ni captages virtuels ; diffusion agrégée + métadonnées, floutage ; qualité exclue de la V1.
- OUVERT : mise à jour piézométrie, osmoseurs, PSSE/zones isolées.

### R6 · 02/07 · Bilatérale CDE (A. Racle, M. DAVID, H. Roussaffa)
- CDE 180 000 p. ; FTP nocturne ; indicateur BBR ; loi Climat et Résilience ; refonte interface (Vulcain→Django).
- DÉCISION : indicateurs par captage + stockage, adduction/distribution séparés, BBR conservé ; qualité exclue V1 ; ré-ingestion annuelle ; interconnexion simplifiée acceptée.
- OUVERT : captage de secours (DAVAR), données UD, serveur carto, RGPD.

### R7 · 26/06 · Point fiches (E. Boyer, S. Lenz/OFB, S. Balayre/DAVAR, M. DAVID, H. Roussaffa)
- DÉCISION : livrable contractuel = tableau synthétique ; fiches = technique évolutif ; exclusions qualité/nappes ; pluviométrie/géologie sans pondération ; 50 % du débit de référence.
- DÉCISION : pondérations à l'atelier OS1 (mi/fin août) ; signalement via outils existants ; fin exécution 31/12, convention 06/2027 ; dev début septembre ; pas d'avenant avant retour Fabien.

### R8 · 19/07 · Point avancement (M. DAVID, H. Roussaffa)
- Fiches + générateur Python ; Metabase vs Esri/SRI.
- DÉCISION : V1 = automatisation/consolidation/export datamarts sans accès libre ; signalements/alertes fines et requêtes fines reportés (newsletter mensuelle) ; analyse multicritère V1 simple, avancée en option ; IA non imposée ; dev début août, CDC fin juillet.

### R9 · 21/07 · Brainstorming analyse multicritère (équipe OEIL)
- Indice pondéré vs approche conservatrice ; pluie modulateur ; ~80 % complétude ; eaux souterraines non raccordées.
- DÉCISION : scoring conservateur (classe la plus pénalisante) + scores intermédiaires exportables ; pondérations encadrées ; périmètre = captages publics AEP, bassins hydromodélisés ; négocier la méthode avec Stéphane avant conseil scientifique.

### R10 · 04/08 · Point prestation (F. Albouy, M. DAVID, H. Roussaffa)
- Wireframes (prototype IA sans back-end) ; réunion 11 avec Stéphane ; OS1 avant le 20.
- DÉCISION : MVP (indicateurs + visualisation) ; analyse complète en option chiffrée ; vues guidées/presets ; datamarts + client-side (pas de serveur) ; 3 profils ; admin monitoring sans saisie ; internaliser traitement, externaliser le dev ; validation interne d'abord.

## 2. Registre consolidé des décisions

| ID | Décision | Source | Statut | Répercussion CDC |
|----|----------|--------|--------|------------------|
| D01 | Exclure pluie temps réel, SOURCE, gestion admin, modélisation hydraulique | R1 | Actée | Périmètre |
| D02 | Fiches V1 = livrable contractuel (tableau synthétique) | R1, R7 | Actée | Livrable contractuel |
| D03 | Open source, modulaire, droits par profils | R1, R5 | Actée | Architecture |
| D04 | Bassins par captage via RHM/MNT (référentiel) | R1, R9 | En cours | Données |
| D05 | MOSS pour minière, pas cadastre | R2 | Actée | Méthodo |
| D06 | Azure DAVAR = référentiel captages | R2 | En cours | Données/conventions |
| D07 | Fiches par familles, code immutable | R2 | Actée | Livrable technique |
| D08 | Pondérations encadrées, validation CS, matrice anti-associations | R3/R7/R9 | En cours | Analyse multicritère |
| D09 | Indexer max de jeux, API/OneShot (5–10 ans) | R3 | En cours | Données/flux |
| D10 | Échelle = captage ; outil d'aide à la décision | R4–R6 | Actée | Objectif |
| D11 | Pressions en 4 familles, foncier = indicateur | R4 | Actée | Méthodo |
| D12 | Qualité/nappes exclues ; pluie/géologie sans pondération | R4–R7 | Actée | V1 |
| D13 | Pas de simulations ni captages virtuels | R5 | Actée | Hors-périmètre |
| D14 | Diffusion agrégée + floutage des sensibles | R5, R10 | Actée | Données/sécurité |
| D15 | Captage + stockage, adduction/distribution séparés, BBR | R6 | Actée | Liste indicateurs |
| D16 | Ré-ingestion annuelle + analyse des évolutions | R6 | En cours | Flux |
| D17 | Interconnexion simplifiée acceptée | R6 | En cours | Liste indicateurs |
| D18 | Carto libre, benchmark serveurs | R6, R8 | En cours | Architecture |
| D19 | Pondérations à l'atelier OS1 (ajustements encadrés) | R7 | À valider | Analyse multicritère |
| D20 | Fin exécution 31/12, convention 06/2027 | R7 | Actée | Calendrier |
| D21 | V1 = automatisation, consolidation, datamarts ; pas de requêtage libre | R8, R10 | En cours | P1/options |
| D22 | Alerte fines reportées, newsletter mensuelle | R8 | Actée | V2 |
| D23 | Analyse multicritère avancée = option chiffrée | R8, R10 | Actée | DQE |
| D24 | Scoring conservateur déclassant + scores intermédiaires | R9 | À valider | Méthodo analyse |
| D25 | Analyse sur captages publics AEP uniquement | R9 | Actée | Périmètre |
| D26 | Négocier la méthode avec Stéphane avant CS | R9 | En cours | Gouvernance |
| D27 | MVP + vues guidées/presets | R10 | Actée | P1 |
| D28 | Datamarts + client-side, pas de serveur d'images | R10 | En cours | Architecture |
| D29 | 3 profils, admin monitoring, pas de saisie | R8, R10 | En cours | Interface/profils |
| D30 | Internaliser le volume, externaliser le dev | R10 | À valider | Organisation |
| D31 | Dev début septembre, CDC fin juillet | R7–R10 | En cours | Calendrier |

## 3. Exigences fonctionnelles et données

### Périmètre / MVP
- Aide à la décision centrée sur captages AEP publics comparables (R1, R4, R9) → CDC objectifs/périmètre.
- V1 : indicateurs + visualisation uniquement ; V2 (option) : analyse avancée, signalements, alertes, requêtes, IA (R8, R10) → CDC périmètre/DQE.
- Une application, plusieurs profils ; dashboard public + espace gestion/expert (R1, R7, R10) → CDC interface.
- Newsletter mensuelle de consolidation (R8) → CDC fonctionnalités.

### Indicateurs & données
- ~38 indicateurs en familles (enjeux/pressions/vulnérabilité), fiches + tableau (R1, R3, R7) → CDC liste.
- Par captage et stockage, adduction/distribution séparés, BBR, interconnexion (R6) → CDC indicateurs.
- Pressions en 4 familles ; foncier, assainissement autonome, usages, accessibilité (R4, R5) → CDC indicateurs.
- Débit prélevable : 50 % du débit caractéristique par défaut ; capacité de production (R7) → CDC méthodes.
- Exclues de l'analyse : qualité, nappes, pluie temps réel, espèces/zones non liées à la ressource (R4, R7) → CDC indicateurs.
- Sources : captages GeoREP/Azure (réf. DAVAR), débits d'étiage, schémas directeurs (ADESSE/DAS), MOSS, Sentinel/VIRS (OEIL), PUD (selon commune), UD à clarifier ADAS (R1–R7) → CDC données/conventions.

### Analyse multicritère
- Pondérations encadrées (OS1 ou CS), presets + garde-fous, matrice de correspondance (R3, R7, R9) → CDC analyse.
- Scoring conservateur déclassant, scores intermédiaires, export Excel, seuil complétude ~80 % (R9) → CDC analyse.
- Normalisation en 4 classes, discrétisation commune (quantiles, seuils métier) (R10) → CDC analyse.

### Interface & profils
- 3 profils ; vues guidées par indicateur ; comparaisons sans agrégation par défaut ; exports SIG structurés ; contextes partageables (R10) → CDC interface.
- Admin monitoring pipelines/sources, bilan d'erreurs ; pas de saisie métier (R10) → CDC administration.

### Architecture / technique
- Open source, modulaire, extensible ; floutage des sensibles (R1, R5) → CDC architecture.
- ETL d'homogénéisation ; datamarts (H3/bassins) pré-agrégés ; client-side ; pas de serveur d'images ; perf navigateur cadrée (R3, R10) → CDC architecture.
- Flux API/OneShot ; ré-ingestion annuelle avec analyse des modifications (R3, R6) → CDC flux.
- Cartographie libre maintenue pour les données ; benchmark avant verrouillage (R6, R8) → CDC architecture.

### Gouvernance / calendrier / contractuel
- Atelier OS1 (captages publics, mi/fin août), ateliers parties prenantes, trilatérales Province Sud/Magis (R1, R3, R7) → CDC gouvernance.
- Validation conseil scientifique : sélection, pondération, croisements (R3, R9) → CDC gouvernance.
- Calendrier : CDC fin juillet, réunion 11/08, OS1 avant 20/08, dev début septembre, fin exécution 31/12, convention 06/2027 (R7–R10) → CDC planning.
- Prestation : externalisation du développement, internalisation du traitement ; option séparée (R10) → CDC organisation/DQE.

## 4. Points ouverts (décision MOA requise)

1. **Méthode d'analyse multicritère** : scoring conservateur vs indice pondéré → MOA avec Stéphane + CS (divergences R9/R10).
2. **Pondérations** : OS1 vs modulables par profil → MOA + CS (biais, R7–R9).
3. **Accès aux UD** : blocage ADAS/RGPD — conditionne interconnexion → DAVAR via Stéphane + MOA (R1, R2, R6).
4. **Débit prélevable** : règle 50 % / définition → DAVAR (R4, R7).
5. **Maille spatiale** : H3 vs micro-bassins → MOA + CS (R3, R8).
6. **Serveur/framework carto** : benchmark → MOA (R6, R8).
7. **Dev back-end** : interne vs sous-traitance ; briques hors CDC → MOA après CDC (R8, R10).
8. **Avenant / option V2** : heures, budget PEP/OFB, retour Fabien → MOA (R7, R8, R10).
9. **Analyse des pressions PPE** : à prioriser → MOA (R8).
10. **Périmètre de l'atelier OS1** : restreint vs élargi, communication → MOA + Stéphane (R7, R8).
11. **Captage de secours** : définition/source → DAVAR (R6).
12. **Piézométrie et osmoseurs** : mise à jour >15 ans → MOA + DAVAR (R5).
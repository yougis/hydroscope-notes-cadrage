# HydroScope — Spécifications UX · Header & Sidebar

---


## 1. En-tête (Header)

Hauteur fixe **56 px**, fond blanc, bordure basse `neutral-200`. Trois zones :

### 1.1 Zone gauche — Identité
- **Logo** : carré arrondi `8×8` px, fond `blue-600`, monogramme « H » blanc.
- **Titre** : « HydroScope », graisse bold.
- **Sous-titre** : « Nouvelle-Calédonie · Eau potable », `10px`, gris clair.

### 1.2 Zone centrale — Mode avancé
- **Interrupteur unique « Mode avancé »** (remplace le sélecteur binaire Expert/Simplifié).
- État **activé** : bouton `blue-600`, poignée à droite. État désactivé : bouton `neutral-300`, poignée à gauche.
- Comportement :
  - **Actif** → toutes les vues de navigation sont visibles (y compris celles réservées aux experts).
  - **Inactif** → les entrées `expertOnly` sont masquées ; seules les 6 vues courantes restent.
- Libellé affiché dans l’identifiant utilisateur : « Avancé » / « Standard » selon l’état.
- **État par défaut** : activé (parité avec l’ancien profil Expert).

### 1.3 Zone droite — Architecture & utilisateur
- **Sélecteur d’architecture**  : segmenté « App unifiée » / « Portail public », état actif sur fond `neutral-800`.
- **Identifiant utilisateur** : « {Mode} · OEIL » (masqué sous `sm`).
- **Avatar** : cercle `8×8` px, fond `neutral-200`, initiales « OE ».

---

## 2. Barre latérale (Sidebar)

Largeur **224 px étendue / 56 px rétractée**, fond blanc, bordure droite `neutral-200`. Transition de largeur **150 ms**.

### 2.1 Contrôle de repli
- **Bouton de rétraction** en tête de la sidebar (« Navigation » + chevron).
  - **Étendu** : libellé « NAVIGATION » à gauche, chevron-gauche à droite.
  - **Rétracté** : chevron-droite seul, centré dans un carré `8×8` px.
- **État par défaut** : étendu (l’utilisateur replie explicitement).

### 2.2 Groupes de navigation
4 groupes conservés, dans cet ordre :

| Groupe | Contenu |
|--------|---------|
| Exploration | Carte des territoires · Tableau de bord  · Comparer les territoires |
| Données | Indicateurs · Données disponibles · Ajout de données |
| Suivi | Supervision · Historique & traçabilité |
| Administration | Référentiels · Connexion |
| Autres écrans | Fiches des territoires |

- **Étendu** : en-tête de groupe en `10px` capitales, gris clair.
- **Rétracté** : l’en-tête devient un **simple séparateur** `1px` (`neutral-200`) qui conserve la structure visuelle des groupes.

### 2.3 Entrées de menu — état étendu
- Affichage : **icône `16px` + libellé**, libellé tronqué (`truncate`).
- Entrée active : fond `blue-50`, texte/icône `blue-700`, graisse medium.
- Entrée inactive : texte `neutral-600`, survol `neutral-100`.

### 2.4 Entrées de menu — état rétracté (rail d’icônes)
- Chaque entrée devient une **icône seule**, centrée dans un bouton pleine hauteur.
- L’icône **remplace le libellé** ; un **tooltip natif `title`** affiche le libellé complet au survol (indispensable à la navigation par icônes).
- État actif identique à l’étendu (fond `blue-50`, icône `blue-700`).

### 2.5 Icônes (glyphes SVG inline, trait `1.5`, `16px`)

| Entrée | Icône |
|--------|-------|
| Carte des territoires | Carte pliée |
| Tableau de bord | Grille de 4 cellules |
| Fiches des territoires | Document avec lignes |
| Comparer les territoires | Balance / équerre |
| Indicateurs | Jauge |
| Données disponibles | Base de données |
| Ajout de données | Import (flèche dans un cadre) |
| Supervision | Activité (électrocardiogramme) |
| Historique & traçabilité | Horloge / historique |
| Référentiels | Étiquette |
| Connexion | Cadenas |

---

## 3. Règles transversales

- **Accessibilité** : boutons avec `role="switch"` et `aria-checked` (mode avancé) ; icônes `aria-hidden` + libellé ou `title` ; `aria-label` sur le bouton de repli.
- **Couleurs sémantiques** : bleu `blue-600` = interactif/actif ; gris neutres = fil de fer ; vert/rouge/ambre réservés aux états (données, alertes).
- **Typographie** : Inter (Google Fonts), corps 14 px par défaut.
- **Le mode avancé ne modifie pas l’architecture** : il ne fait que densifier le menue navigation "Exploration" masquage d’entrées).

---
repo
# Administration et compte

Les vues du groupe **Administration** (vues expertes) gèrent les référentiels et les
accès à l'application.

## Référentiels

La vue **Référentiels** centralise la gestion des objets de référence :

- **Objets géographiques** — bassins versants, captages, périmètres, grille d'analyse H3.
- **Indicateurs** — fiches, méthodes de calcul, seuils, sources.
- **Profils et rôles** — référentiel des utilisateurs et de leurs droits.

Ces référentiels évoluent progressivement et alimentent toutes les autres vues :
modifier un référentiel se répercute sur la carte, les graphiques et les fiches.

## Compte et connexion

La vue **Connexion** gère l'authentification et les droits d'accès :

- **Connexion** via un compte interne OEIL ou une fédération externe (SSO).
- **Profils** associés au compte : expert, technicien, décideur, partenaire, grand public.
- **Droits par profil (RBAC)** — régulent l'accès aux données, indicateurs, fonctions et
  exports. Une action sans droit (ex. ajouter un indicateur) reste visible mais
  désactivée.
- **Sessions** mémorisées côté navigateur, limitées aux usages fonctionnels et
  **conformes RGPD** (cookies et stockage local réduits au strict nécessaire).

> Tous les indicateurs sont **visibles par tous** ; seules les *actions* dépendent des
> droits. Cette transparence ne compromet pas la sécurité.

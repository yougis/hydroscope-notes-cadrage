import type { ReactElement } from 'react'
import type { ViewDef } from '@/types/domain'
import { catalogueById } from '@/data/hydroscope'
import { Icon } from '@/components/ui/Icon'

export const VIEWS: ViewDef[] = [
  { id: 'carte', label: 'Carte des territoires', group: 'Exploration', expertOnly: false, desc: 'Zone de travail : sélecteur d\'unités de gestion à gauche, carte et couches au centre, catalogue d\'indicateurs à droite. Les indicateurs ajoutés ouvrent une page dédiée dans la sidebar.', epic: 'EPIC 6', mvp: true },
  { id: 'tableau', label: 'Tableau de bord', group: 'Exploration', expertOnly: false, desc: 'Vue d’ensemble par territoire : chiffres clés, évolution dans le temps, comparaison de périodes, tendances et alertes.', epic: 'EPIC 6', mvp: true },
  { id: 'fiches', label: 'Fiches des territoires', group: 'Exploration', expertOnly: false, desc: 'Fiches structurées par unité (commune, bassin versant, point de captage, périmètre de protection) et fiches indicateurs, avec rapports exportables.', epic: 'EPIC 7', mvp: true },
  { id: 'comparaison', label: 'Comparer les territoires', group: 'Exploration', expertOnly: true, desc: 'Comparaison de plusieurs territoires ou unités, visualisation simultanée et filtres cohérents entre les vues.', epic: 'EPIC 6', mvp: false },
  { id: 'indicateurs', label: 'Indicateurs', group: 'Données', expertOnly: false, desc: 'Liste des indicateurs (~40) : unité, échelle d’interprétation, méthode de calcul, seuils et sources.', epic: 'EPIC 1bis / 4', mvp: true },
  { id: 'catalogue', label: 'Données disponibles', group: 'Données', expertOnly: true, desc: 'Inventaire des jeux de données sources et dérivés, métadonnées, lien source → transformation → indicateur.', epic: 'EPIC 1bis', mvp: true },
  { id: 'import', label: 'Ajout de données', group: 'Données', expertOnly: true, desc: 'Intégration par fichiers (CSV, SIG) ou API, planification, normalisation, gestion des erreurs et rejeu de traitements.', epic: 'EPIC 1', mvp: true },
  { id: 'monitoring', label: 'Supervision', group: 'Suivi', expertOnly: true, desc: 'Suivi technique (imports, connexions, performances), qualité des données (fraîcheur, complétude, anomalies) et veille environnementale.', epic: 'Monitoring', mvp: true },
  { id: 'tracabilite', label: 'Historique & traçabilité', group: 'Suivi', expertOnly: true, desc: 'Cycle de vie des données : versioning, journal des actions, reconstitution d’un état ou d’un calcul à une date donnée.', epic: 'EPIC 10', mvp: true },
  { id: 'referentiels', label: 'Référentiels', group: 'Administration', expertOnly: true, desc: 'Gestion des objets géographiques (bassins versants, captages, périmètres, grille d’analyse), des indicateurs et des profils.', epic: 'EPIC 3', mvp: true },
  { id: 'connexion', label: 'Connexion', group: 'Administration', expertOnly: true, desc: 'Authentification, gestion des droits d’accès et des sessions, conformité RGPD.', epic: 'EPIC 9', mvp: true },
]

export const GROUP_ORDER = ['Exploration', 'Données', 'Suivi', 'Administration']

export interface NavGroup {
  name: string
  views: ViewDef[]
}

export const GROUPS: NavGroup[] = GROUP_ORDER.map((g) => ({
  name: g,
  views: VIEWS.filter((v) => v.group === g),
}))

export const VIEW_ICONS: Record<string, ReactElement> = {
  carte: (
    <Icon>
      <path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4L1 6z" />
      <path d="M8 2v16" />
      <path d="M16 6v16" />
    </Icon>
  ),
  tableau: (
    <Icon>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </Icon>
  ),
  fiches: (
    <Icon>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </Icon>
  ),
  comparaison: (
    <Icon>
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M14 15H9v-5" />
      <path d="M16 3h5v5" />
      <path d="M21 3l-7 7" />
    </Icon>
  ),
  indicateurs: (
    <Icon>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </Icon>
  ),
  catalogue: (
    <Icon>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      <path d="M3 12a9 3 0 0 0 18 0" />
    </Icon>
  ),
  import: (
    <Icon>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </Icon>
  ),
  monitoring: (
    <Icon>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </Icon>
  ),
  tracabilite: (
    <Icon>
      <path d="M3 3v5h5" />
      <path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" />
      <path d="M12 7v5l4 2" />
    </Icon>
  ),
  referentiels: (
    <Icon>
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <path d="M7 7h.01" />
    </Icon>
  ),
  connexion: (
    <Icon>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Icon>
  ),
}

export function buildIndicatorGroup(ids: string[]): NavGroup {
  return {
    name: 'Indicateurs',
    views: ids.map((id) => {
      const i = catalogueById(id)
      return {
        id,
        label: i ? i.label : id,
        group: 'Indicateurs',
        expertOnly: false,
        desc: '',
        epic: 'EPIC 4 · 1bis',
        mvp: true,
      }
    }),
  }
}

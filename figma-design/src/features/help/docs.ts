import { extractHeadings, slugify, type MarkdownHeading } from './markdown'

import bienvenueRaw from '../../../docs/help/00-bienvenue.md?raw'
import premiersPasRaw from '../../../docs/help/01-premiers-pas.md?raw'
import carteRaw from '../../../docs/help/02-carte-territoires.md?raw'
import indicateursRaw from '../../../docs/help/03-indicateurs.md?raw'
import tableauRaw from '../../../docs/help/04-tableau-de-bord.md?raw'
import fichesRaw from '../../../docs/help/05-fiches-territoires.md?raw'
import comparaisonRaw from '../../../docs/help/06-comparer-territoires.md?raw'
import donneesRaw from '../../../docs/help/07-donnees.md?raw'
import suiviRaw from '../../../docs/help/08-suivi-et-tracabilite.md?raw'
import administrationRaw from '../../../docs/help/09-administration-et-compte.md?raw'
import exportRaw from '../../../docs/help/10-export-partage.md?raw'
import faqRaw from '../../../docs/help/11-faq.md?raw'

export interface HelpDoc {
  id: string
  title: string
  /** Titre du fichier Markdown (# …) ; s'il est absent, `title` est utilisé. */
  raw: string
}

export const HELP_DOCS: HelpDoc[] = [
  { id: 'bienvenue', title: 'Bienvenue', raw: bienvenueRaw },
  { id: 'premiers-pas', title: 'Premiers pas', raw: premiersPasRaw },
  { id: 'carte', title: 'Carte des territoires', raw: carteRaw },
  { id: 'indicateurs', title: 'Indicateurs', raw: indicateursRaw },
  { id: 'tableau', title: 'Tableau de bord', raw: tableauRaw },
  { id: 'fiches', title: 'Fiches des territoires', raw: fichesRaw },
  { id: 'comparaison', title: 'Comparer les territoires', raw: comparaisonRaw },
  { id: 'donnees', title: 'Données', raw: donneesRaw },
  { id: 'suivi', title: 'Suivi et traçabilité', raw: suiviRaw },
  { id: 'administration', title: 'Administration et compte', raw: administrationRaw },
  { id: 'export', title: 'Export et partage', raw: exportRaw },
  { id: 'faq', title: 'FAQ', raw: faqRaw },
]

export function docById(id: string): HelpDoc | undefined {
  return HELP_DOCS.find((d) => d.id === id)
}

export interface HelpEntry extends MarkdownHeading {
  docId: string
  docTitle: string
}

/** Sommaire plat de toute la doc : chaque titre (niveaux 1 à 3) d'un chapitre est une entrée. */
export function buildToc(): HelpEntry[] {
  const entries: HelpEntry[] = []
  for (const doc of HELP_DOCS) {
    for (const h of extractHeadings(doc.raw)) {
      if (h.level <= 3) {
        entries.push({ ...h, docId: doc.id, docTitle: doc.title })
      }
    }
  }
  return entries
}

/**
 * Ancre de la documentation correspondant à une vue de l'application.
 * Les slugs sont produits par `slugify` sur les titres `##` des fichiers (voir docs/help/).
 */
const VIEW_ANCHORS: Record<string, string> = {
  carte: 'carte-des-territoires',
  tableau: 'tableau-de-bord',
  fiches: 'fiches-des-territoires',
  comparaison: 'comparer-les-territoires',
  indicateurs: 'indicateurs',
  catalogue: 'donnees-disponibles',
  import: 'ajouter-des-donnees',
  monitoring: 'supervision',
  tracabilite: 'historique-et-tracabilite',
  referentiels: 'referentiels',
  connexion: 'compte-et-connexion',
}

export function helpAnchorFor(viewId: string): string | undefined {
  if (viewId.startsWith('ind:')) return 'page-indicateur'
  return VIEW_ANCHORS[viewId]
}

/** Nom lisible de la section ciblée pour le bandeau contextuel. */
export function sectionLabelFor(viewId: string): string | undefined {
  const anchor = helpAnchorFor(viewId)
  if (!anchor) return undefined
  const entry = buildToc().find((e) => e.anchor === anchor)
  return entry?.title
}

export { slugify }

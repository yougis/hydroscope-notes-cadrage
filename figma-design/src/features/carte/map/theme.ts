import { catalogueById } from '@/data/hydroscope'
import { valueForBvaep } from '@/data/values'
import type { DataType } from '@/types/domain'

/** Couleurs par niveau de qualité (0..3). */
export const QUALITE_COLORS: Record<number, string> = {
  0: '#9ca3af',
  1: '#10b981',
  2: '#f59e0b',
  3: '#ef4444',
}

export const QUALITE_LABELS: Record<number, string> = {
  0: 'Indéterminé',
  1: 'Bon',
  2: 'Dégradé',
  3: 'Critique',
}

/** Remplissages des bassins versants par classe. */
export const BV_FILLS: Record<number, string> = {
  0: 'rgba(148, 163, 184, 0.35)',
  1: 'rgba(16, 185, 129, 0.45)',
  2: 'rgba(245, 158, 11, 0.45)',
  3: 'rgba(239, 68, 68, 0.5)',
}

/** Remplissages de la couche source par indicateur. */
export const SOURCE_FILLS: Record<string, string> = {
  'ind:200': 'rgba(239, 68, 68, 0.18)',
  'ind:201': 'rgba(146, 64, 14, 0.16)',
  'ind:301': 'rgba(100, 116, 139, 0.2)',
  'ind:105': 'rgba(16, 185, 129, 0.16)',
  'ind:308': 'rgba(99, 102, 241, 0.16)',
  'ind:500': 'rgba(59, 130, 246, 0.14)',
}

/** Rayon + couleur d'un point de captage selon l'indicateur. */
export function symbolFor(value: number, datatype: DataType) {
  if (datatype === 'stock') return { r: Math.min(11, 4 + value / 120), fill: '#3b82f6' }
  if (datatype === 'mixte') {
    const cls = value % 4
    return { r: Math.min(11, 4 + value / 120), fill: QUALITE_COLORS[cls] }
  }
  const cls = value % 4
  return { r: 5, fill: QUALITE_COLORS[cls] }
}

/** Classe de qualité (0..3) d'un bassin versant pour l'indicateur donné. */
export function bvaepClass(indId: string | null, bvId: string): number {
  if (!indId) return 0
  const ind = catalogueById(indId)
  const val = valueForBvaep(indId, bvId)
  if (ind && ind.datatype === 'qualite') return val % 4
  return Math.min(3, Math.floor(val / 300))
}

/** Classe de qualité (0..3) d'une cellule H3 à partir de son centre (lon, lat). */
export function h3Class(indId: string | null, lon: number, lat: number): number {
  const ind = catalogueById(indId)
  const q = Math.round((lon - 164) * 4)
  const r = Math.round((lat + 20.5) * 4)
  const noise = ((q * 13 + r * 7 + q * r * 7) % 41) - 20
  if (ind && ind.datatype === 'qualite') return Math.abs((q * 3 + r * 5) % 4)
  const raw = 80 + q * 12 + r * 18 + noise
  return Math.max(0, Math.min(3, Math.floor(raw / 180)))
}

/** Valeur affichée d'une cellule H3. */
export function h3Value(indId: string, lon: number, lat: number): number {
  const q = Math.round((lon - 164) * 4)
  const r = Math.round((lat + 20.5) * 4)
  const noise = ((q * 31 + r * 47 + q * r * 13) % 61) - 30
  return Math.max(0, 120 + q * 14 + r * 22 + noise)
}

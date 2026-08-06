import { valueForCell, type HexCellSpec } from './spatial'
import { normalize, clamp01, type NormMethod } from './normalize'

/** Couleurs des trois canaux (R, G, B) — sommets du triangle de légende. */
export const CHANNEL_COLORS = ['#ff3b30', '#34c759', '#0a84ff']
export const CHANNEL_NAMES = ['R', 'G', 'B']
export const MAX_INDICATORS = 3

/**
 * Calcule, pour chaque cellule H3, les trois canaux [r, g, b] ∈ [0, 1]
 * correspondant aux indicateurs sélectionnés (affectés par ordre : 0→R, 1→G, 2→B).
 * La somme est ramenée à ≤ 1 afin que la couleur de chaque hexagone se situe
 * dans le triangle additif de la légende (cohérence lecture ↔ hexagones).
 */
export function channelsForCells(
  indicators: string[],
  cells: HexCellSpec[],
  method: NormMethod,
): Map<string, [number, number, number]> {
  const normed = indicators.map((indId) => {
    const vals = cells.map((c, i) => valueForCell(indId, i, c.center[0], c.center[1]))
    return normalize(vals, method).map(clamp01)
  })

  const out = new Map<string, [number, number, number]>()
  cells.forEach((c, i) => {
    const ch: number[] = []
    for (let k = 0; k < MAX_INDICATORS; k++) ch.push(normed[k]?.[i] ?? 0)
    let [r, g, b] = ch as [number, number, number]
    const sum = r + g + b
    if (sum > 1) {
      r /= sum
      g /= sum
      b /= sum
    }
    out.set(c.cell, [r, g, b])
  })
  return out
}

export function rgbCss(ch: [number, number, number]): string {
  const r = Math.round(ch[0] * 255)
  const g = Math.round(ch[1] * 255)
  const b = Math.round(ch[2] * 255)
  return `rgb(${r},${g},${b})`
}

/** Valeur brute d'une cellule pour l'indicateur donné (tooltip / échelle). */
export function cellValue(indId: string, index: number, center: [number, number]): number {
  return valueForCell(indId, index, center[0], center[1])
}

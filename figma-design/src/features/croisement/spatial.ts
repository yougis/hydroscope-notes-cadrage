/**
 * Champ spatial déterministe (maquette) par indicateur.
 * Chaque indicateur obtient un dégradé spatial distinct (graine = indId) pour que
 * l'agrégation ternaire soit visuellement différenciée, sans toucher au rendu carte.
 */

export interface HexCellSpec {
  cell: string
  center: [number, number] // lon, lat
  ring: Array<[number, number]> // lon, lat (fermé)
}

function seedOf(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h || 1
}

/** Valeur (échelle d'un indicateur) d'une cellule H3 à partir de son centre (lon, lat). */
export function valueForCell(indId: string, index: number, lon: number, lat: number): number {
  const seed = seedOf(indId)
  const base = 120 + (seed % 900)
  const fx = 0.5 + ((seed % 10) + 4) / 12
  const fy = 0.5 + (((seed >> 3) % 10) + 4) / 12
  const phase = (seed % 628) / 100
  const grad = 0.55 + 0.45 * Math.sin(lon * fx + phase) * Math.cos(lat * fy)
  const noise = ((seed * 7 + index * 13) % 41) - 20
  return Math.max(8, Math.round(base * grad + noise))
}

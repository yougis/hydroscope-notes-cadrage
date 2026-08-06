/** Méthodes de normalisation des valeurs. */
export type NormMethod = 'minmax' | 'zscore'

export function minMax(values: number[]): number[] {
  if (values.length === 0) return []
  const min = Math.min(...values)
  const max = Math.max(...values)
  const span = max - min || 1
  return values.map((v) => (v - min) / span)
}

export function zScore(values: number[]): number[] {
  if (values.length === 0) return []
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const variance = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length
  const sd = Math.sqrt(variance) || 1
  return values.map((v) => (v - mean) / sd)
}

export function normalize(values: number[], method: NormMethod): number[] {
  return method === 'minmax' ? minMax(values) : zScore(values)
}

/** Ramène une valeur dans [0, 1] (nécessaire après un z-score). */
export function clamp01(n: number): number {
  return Math.max(0, Math.min(1, n))
}

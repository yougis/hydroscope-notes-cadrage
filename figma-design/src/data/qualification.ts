import { BVAEPS, CATALOGUE, UNITES_GESTIONES, catalogueById } from './hydroscope'
import { valueForBvaep, valueForUnite } from './values'

export type Niveau = 0 | 1 | 2 | 3

export interface Qualification {
  niveau: Niveau
  label: string
  seuilP75: number
  seuilP90: number
  justification: string
}

export type Direction = 'higher_is_worse' | 'higher_is_better'

export interface SeuilsRef {
  seuilP75: number
  seuilP90: number
  direction: Direction
}

export type Tendance = 'hausse' | 'baisse' | 'stable' | 'indeterminee'

export interface ReserveCompletude {
  indetermine: boolean
  raison: string
}

const NIVEAU_LABELS: Record<Niveau, string> = {
  0: 'Indéterminé',
  1: 'Bon',
  2: 'Dégradé',
  3: 'Critique',
}

const COMPLETUDE_MIN = 0.8

const AMC_CODES = new Set(['1', '6', '2', '3', '12', '105', '106', '100', '101', '102', '104', '107', '300', '301', '308', '302', '304', '305', '306', '200', '201', '202', '203', '500', '501', '503', '504'])

function percentile(sortedAsc: number[], p: number): number {
  if (sortedAsc.length === 0) return 0
  const idx = Math.min(sortedAsc.length - 1, Math.max(0, Math.ceil((p / 100) * sortedAsc.length) - 1))
  return sortedAsc[idx]
}

function directionOf(indId: string): Direction {
  const ind = catalogueById(indId)
  if (!ind) return 'higher_is_worse'
  if (ind.family === 'ENJEUX') return 'higher_is_better'
  return 'higher_is_worse'
}

function distribution(indId: string): number[] {
  const vals = [
    ...UNITES_GESTIONES.map((u) => valueForUnite(indId, u.id)),
    ...BVAEPS.map((b) => valueForBvaep(indId, b.id)),
  ]
  return vals.sort((a, b) => a - b)
}

const SEUILS_REF: Record<string, SeuilsRef> = Object.fromEntries(
  CATALOGUE.map((ind) => {
    const sorted = distribution(ind.id)
    return [
      ind.id,
      {
        seuilP75: percentile(sorted, 75),
        seuilP90: percentile(sorted, 90),
        direction: directionOf(ind.id),
      },
    ]
  }),
)

export function seuilsRef(indId: string): SeuilsRef {
  return SEUILS_REF[indId] ?? { seuilP75: 0, seuilP90: 0, direction: 'higher_is_worse' }
}

export function niveauForValue(indId: string, valeur: number): Niveau {
  const { seuilP75, seuilP90, direction } = seuilsRef(indId)
  const ind = catalogueById(indId)
  if (ind?.datatype === 'qualite') {
    const cls = valeur % 4
    return cls as Niveau
  }
  if (direction === 'higher_is_worse') {
    if (valeur >= seuilP90) return 3
    if (valeur >= seuilP75) return 2
    return 1
  }
  if (valeur <= seuilP75 && seuilP75 > 0) return 3
  if (valeur <= seuilP90 && seuilP90 > 0) return 2
  return 1
}

export function qualify(indId: string, valeur: number): Qualification {
  const niveau = niveauForValue(indId, valeur)
  const { seuilP75, seuilP90 } = seuilsRef(indId)
  const ind = catalogueById(indId)
  const direction = directionOf(indId)

  let justification: string
  if (niveau === 0) {
    justification = 'Données insuffisantes pour qualifier l’indicateur.'
  } else if (ind?.datatype === 'qualite') {
    justification = `Classe ${valeur % 4} — ${NIVEAU_LABELS[niveau]}.`
  } else if (direction === 'higher_is_worse') {
    justification =
      niveau === 3
        ? `Valeur ${valeur} ≥ seuil critique (P90 = ${seuilP90}).`
        : niveau === 2
          ? `Valeur ${valeur} ≥ seuil de vigilance (P75 = ${seuilP75}).`
          : `Valeur ${valeur} < seuil de vigilance (P75 = ${seuilP75}).`
  } else {
    justification =
      niveau === 3
        ? `Valeur ${valeur} ≤ P75 (${seuilP75}) — situation dégradée.`
        : niveau === 2
          ? `Valeur ${valeur} ≤ P90 (${seuilP90}) — à surveiller.`
          : `Valeur ${valeur} au-dessus du seuil de vigilance (P75 = ${seuilP75}).`
  }

  return { niveau, label: NIVEAU_LABELS[niveau], seuilP75, seuilP90, justification }
}

export function niveauLabel(niveau: Niveau): string {
  return NIVEAU_LABELS[niveau]
}

export function tendanceDe(series: number[]): Tendance {
  if (!series || series.length < 2) return 'indeterminee'
  const first = series[0]
  const last = series[series.length - 1]
  if (first === 0 && last === 0) return 'stable'
  const delta = last - first
  const rel = first === 0 ? 0 : delta / first
  if (Math.abs(rel) < 0.03) return 'stable'
  return delta > 0 ? 'hausse' : 'baisse'
}

export function debutTension(series: number[], seuil: number): number | null {
  if (!series || series.length < 2 || seuil <= 0) return null
  const years = [2016, 2018, 2021, 2023, 2026]
  for (let i = 0; i < series.length; i++) {
    if (series[i] >= seuil) return years[i] ?? null
  }
  return null
}

export function ecartA(indId: string, valeur: number): number {
  const { seuilP90 } = seuilsRef(indId)
  if (seuilP90 === 0) return 0
  return Math.round(((valeur - seuilP90) / seuilP90) * 100)
}

export function reserveCompletude(indId: string, nbValeurs: number, nbAttendu: number): ReserveCompletude {
  const ratio = nbAttendu === 0 ? 0 : nbValeurs / nbAttendu
  if (ratio < COMPLETUDE_MIN) {
    return {
      indetermine: true,
      raison: `Complétude ${Math.round(ratio * 100)} % < ${COMPLETUDE_MIN * 100} % — niveau « Indéterminé ».`,
    }
  }
  return { indetermine: false, raison: '' }
}

export function amcEligible(indId: string): boolean {
  const code = indId.replace('ind:', '')
  return AMC_CODES.has(code)
}

export function eligibleIndicators(): string[] {
  return CATALOGUE.filter((i) => amcEligible(i.id)).map((i) => i.id)
}

export interface ContributionScore {
  indicateur: string
  label: string
  valeur: number
  niveau: Niveau
  poids: number
  contribution: number
}

export function scoreCriticite(indIdToValue: Record<string, number>, pondérations?: Record<string, number>): {
  score: number
  label: string
  contributions: ContributionScore[]
} {
  const eligibles = eligibleIndicators()
  const contributions: ContributionScore[] = eligibles
    .map((id) => {
      const val = indIdToValue[id]
      if (val === undefined) return null
      const ind = catalogueById(id)
      const niveau = niveauForValue(id, val)
      const poids = pondérations?.[id] ?? 1
      const contribution = poids * niveau
      return {
        indicateur: id,
        label: ind?.label ?? id,
        valeur: val,
        niveau,
        poids,
        contribution,
      }
    })
    .filter((c): c is ContributionScore => c !== null)

  const totalPoids = contributions.reduce((s, c) => s + c.poids, 0)
  const totalContrib = contributions.reduce((s, c) => s + c.contribution, 0)
  const score = totalPoids === 0 ? 0 : Math.round((totalContrib / totalPoids) * 100) / 100
  const label = score >= 2.5 ? 'Critique' : score >= 1.5 ? 'Dégradé' : score >= 0.5 ? 'Bon' : 'Indéterminé'

  return { score, label, contributions }
}

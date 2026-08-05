import { BVAEPS, catalogueById } from './hydroscope'

function hashNum(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return h
}

const BASE: Record<string, number> = {
  'ind:1': 4200,
  'ind:6': 3200,
  'ind:2': 85,
  'ind:3': 950,
  'ind:12': 6,
  'ind:302': 1400,
  'ind:304': 480,
  'ind:305': 22,
  'ind:306': 36,
  'ind:503': 18,
  'ind:504': 540,
  'ind:202': 300,
  'ind:501': 1400,
  'ind:105': 1200,
  'ind:106': 780,
  'ind:107': 300,
  'ind:100': 60,
  'ind:101': 820,
  'ind:102': 490,
  'ind:104': 190,
  'ind:500': 3,
  'ind:308': 40,
  'ind:200': 620,
  'ind:201': 480,
  'ind:301': 210,
}

export function valueForUnite(indId: string, uniteId: string): number {
  const ind = catalogueById(indId) ?? catalogueById('ind:200')!
  const base = BASE[ind.id] ?? 400
  const salt = hashNum(indId + uniteId)
  const jitter = (salt % 140) - 0.35 * base
  const raw = Math.max(0, base + jitter)
  return ind.datatype === 'qualite' ? Math.round(raw) % 4 : Math.round(raw)
}

export function valueForBvaep(indId: string, bvaepId: string): number {
  const ind = catalogueById(indId) ?? catalogueById('ind:200')!
  const bv = BVAEPS.find((b) => b.id === bvaepId) ?? BVAEPS[0]
  const vals = bv.captageRefs.map((c) => valueForUnite(indId, c))
  const sum = vals.reduce((a, b) => a + b, 0)
  return sum === 0 ? 0 : ind.datatype === 'qualite' ? Math.round(sum / vals.length) : Math.round(sum)
}

export function timeSeriesForUnite(indId: string, uniteId: string): number[] {
  const base = valueForUnite(indId, uniteId)
  const salt = hashNum('ts' + indId + uniteId)
  const trend = ((salt % 30) - 12) / 100
  return [2016, 2018, 2021, 2023, 2026].map((yr, i) => {
    const growth = Math.round(base * (1 + trend * i))
    return Math.max(0, growth + ((hashNum(yr + uniteId) % 30) - 15))
  })
}

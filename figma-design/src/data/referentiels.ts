import { UNITES_GESTIONES as MOCK_UNITES, BVAEPS as MOCK_BVAEPS, CAPTAGE_COORDS as MOCK_CAPTAGE_COORDS, BVAEP_OUTLINES as MOCK_BVAEP_OUTLINES, communes as mockCommunes, provinces as mockProvinces } from './hydroscope'
import type { UniteGestionDef, BvaepDef, CaptageKind } from '@/types/domain'

const API_BASE = '/api'

export interface LiveCaptage {
  id: string
  name: string
  commune: string
  province: string
  kind: CaptageKind
  coordinates: [number, number]
  properties: Record<string, unknown>
}

export interface LiveRegion {
  id: string
  name: string
  province: string
  communes: string[]
  coordinates: number[][][]
  captageRefs: string[]
  properties: Record<string, unknown>
}

export interface LiveCommune {
  id: string
  name: string
  province: string
  coordinates: number[][][]
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

function deriveKind(props: Record<string, unknown>): CaptageKind {
  const nature = String(props['nature_prel'] ?? '').toLowerCase()
  const typeEau = String(props['type_eau'] ?? '').toLowerCase()
  if (nature.includes('forage') || typeEau.includes('forage')) return 'forage'
  if (nature.includes('tranch') || nature.includes('drain')) return 'tranchee_drainante'
  return 'captage_superficiel'
}

function pointInPolygon(pt: [number, number], poly: number[][]): boolean {
  const [x, y] = pt
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i]
    const [xj, yj] = poly[j]
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi
    if (intersect) inside = !inside
  }
  return inside
}

function pointInMultiPolygon(pt: [number, number], coords: number[][][]): boolean {
  for (const ring of coords) {
    if (pointInPolygon(pt, ring)) return true
  }
  return false
}

export async function loadLiveReferentiels(): Promise<{
  captages: LiveCaptage[]
  regions: LiveRegion[]
  communes: LiveCommune[]
} | null> {
  try {
    const [captagesRes, regionsRes, communesRes] = await Promise.all([
      fetchJson<any>(`${API_BASE}/captages?layer=0&limit=10000`),
      fetchJson<any>(`${API_BASE}/bassins?layer=0&limit=500`),
      fetchJson<any>(`${API_BASE}/communes?layer=0&limit=100`),
    ])

    const liveCommunes: LiveCommune[] = (communesRes.features ?? []).map((f: any) => ({
      id: String(f.properties.objectid),
      name: String(f.properties.nom ?? f.properties.nom_minus ?? ''),
      province: '',
      coordinates: f.geometry?.coordinates ?? [],
    }))

    const communeById = new Map(liveCommunes.map(c => [c.id, c]))
    const communeNames = liveCommunes.map(c => c.name).filter(Boolean)

    const liveCaptages: LiveCaptage[] = (captagesRes.features ?? []).map((f: any) => {
      const props = f.properties
      const coords = f.geometry?.coordinates as [number, number] | undefined
      let commune = ''
      let province = ''
      if (coords) {
        for (const c of liveCommunes) {
          if (c.coordinates && pointInMultiPolygon(coords, c.coordinates)) {
            commune = c.name
            break
          }
        }
      }
      return {
        id: String(props.objectid ?? props.num_ore ?? ''),
        name: String(props.nom_ouvrage ?? props.num_ore ?? ''),
        commune,
        province,
        kind: deriveKind(props),
        coordinates: coords ?? [0, 0],
        properties: props,
      }
    }).filter(c => c.id)

    const liveRegions: LiveRegion[] = (regionsRes.features ?? []).map((f: any) => {
      const props = f.properties
      const coords = f.geometry?.coordinates as number[][][] | undefined
      const captageRefs = liveCaptages
        .filter(c => coords && pointInMultiPolygon(c.coordinates, coords))
        .map(c => c.id)
      return {
        id: String(props.objectid ?? props.code_rh ?? ''),
        name: String(props.nom ?? ''),
        province: '',
        communes: String(props.communes ?? '').split(',').map(s => s.trim()).filter(Boolean),
        coordinates: coords ?? [],
        captageRefs,
        properties: props,
      }
    }).filter(r => r.id)

    return { captages: liveCaptages, regions: liveRegions, communes: liveCommunes }
  } catch (e) {
    console.warn('[referentiels] Failed to load live data, falling back to mock:', e)
    return null
  }
}

function mockToLiveCaptages(): LiveCaptage[] {
  return MOCK_UNITES.map(u => ({
    id: u.id,
    name: u.name,
    commune: u.commune,
    province: u.province,
    kind: u.kind,
    coordinates: MOCK_CAPTAGE_COORDS[u.id] ?? [0, 0],
    properties: {},
  }))
}

function mockToLiveRegions(): LiveRegion[] {
  return MOCK_BVAEPS.map(b => ({
    id: b.id,
    name: b.name,
    province: b.province,
    communes: mockCommunes().filter(c => mockCommunesIntersectingBvaep(b.id).includes(c)),
    coordinates: MOCK_BVAEP_OUTLINES[b.id] ? [MOCK_BVAEP_OUTLINES[b.id]] : [],
    captageRefs: b.captageRefs,
    properties: {},
  }))
}

function mockCommunesIntersectingBvaep(bvaepId: string): string[] {
  const b = MOCK_BVAEPS.find(x => x.id === bvaepId)
  if (!b) return []
  return [...new Set(b.captageRefs.map(cid => MOCK_UNITES.find(u => u.id === cid)?.commune).filter(Boolean))]
}

export function getFallbackReferentiels() {
  return {
    captages: mockToLiveCaptages(),
    regions: mockToLiveRegions(),
    communes: mockCommunes().map(c => ({ id: c, name: c, province: '', coordinates: [] })),
  }
}
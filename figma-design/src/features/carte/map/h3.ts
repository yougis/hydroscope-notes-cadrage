import { polygonToCells, cellToBoundary, cellToLatLng } from 'h3-js'
import { fromLonLat } from 'ol/proj'
import { Feature } from 'ol'
import Polygon from 'ol/geom/Polygon'
import { BVAEP_OUTLINES } from '@/data/hydroscope'
import { h3Class, h3Value } from './theme'

/** Résolution H3 (~0,74 km² ≈ 1 km²/hexagone). */
export const H3_RES = 8

interface HexSpec {
  cell: string
  center: [number, number] // lon, lat
  ring: Array<[number, number]> // lon, lat (fermé)
}

// Couverture H3 : union des 3 bassins versants régionaux, calculée une seule fois.
const HEX_SPECS: HexSpec[] = (() => {
  const rings = Object.values(BVAEP_OUTLINES).map((r) =>
    r.map(([lon, lat]) => [lat, lon] as [number, number])
  )
  return polygonToCells(rings as number[][][], H3_RES).map((cell) => {
    const [lat, lon] = cellToLatLng(cell)
    const boundary = cellToBoundary(cell).map(([lat, lon]) => [lon, lat] as [number, number])
    boundary.push(boundary[0])
    return { cell, center: [lon, lat], ring: boundary }
  })
})()

/** Construit la géométrie polygonale (EPSG:3857) d'une cellule H3. */
function buildPolygon(spec: HexSpec): Polygon {
  return new Polygon([spec.ring.map(([lon, lat]) => fromLonLat([lon, lat]))])
}

/** Retourne les features H3 (une par cellule) pour l'indicateur actif. */
export function buildH3Features(indId: string): Feature<Polygon>[] {
  return HEX_SPECS.map((spec) => {
    const [lon, lat] = spec.center
    const feature = new Feature({ geometry: buildPolygon(spec) })
    feature.set('kind', 'h3')
    feature.set('cell', spec.cell)
    feature.set('cls', h3Class(indId, lon, lat))
    feature.set('value', h3Value(indId, lon, lat))
    return feature
  })
}

export function h3CellCount(): number {
  return HEX_SPECS.length
}

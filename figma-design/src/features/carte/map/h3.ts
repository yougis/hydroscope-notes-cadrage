import { polygonToCells, cellToBoundary, cellToLatLng } from 'h3-js'
import { fromLonLat } from 'ol/proj'
import { Feature } from 'ol'
import Polygon from 'ol/geom/Polygon'
import { BVAEP_OUTLINES } from '@/data/hydroscope'
import { h3Class, h3Value, h3Qualify } from './theme'

export const H3_RES = 8

export interface HexSpec {
  cell: string
  center: [number, number]
  ring: Array<[number, number]>
}

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

function buildPolygon(spec: HexSpec): Polygon {
  return new Polygon([spec.ring.map(([lon, lat]) => fromLonLat([lon, lat]))])
}

export function buildH3Features(indId: string): Feature<Polygon>[] {
  return HEX_SPECS.map((spec) => {
    const [lon, lat] = spec.center
    const feature = new Feature({ geometry: buildPolygon(spec) })
    feature.set('kind', 'h3')
    feature.set('cell', spec.cell)
    const qual = h3Qualify(indId, lon, lat)
    feature.set('cls', qual.niveau)
    feature.set('value', qual.seuilP75 > 0 ? qual.seuilP75 : qual.seuilP90 > 0 ? qual.seuilP90 : h3Value(indId, lon, lat))
    feature.set('unit', '') // set by caller
    return feature
  })
}

export function h3CellCount(): number {
  return HEX_SPECS.length
}

export function getHexSpecs(): HexSpec[] {
  return HEX_SPECS
}
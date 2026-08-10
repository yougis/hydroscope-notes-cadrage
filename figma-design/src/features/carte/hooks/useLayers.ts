import { useState } from 'react'

export type BasemapId = 'carto' | 'terrain' | 'esri' | 'google' | 'bing' | 'mapbox' | 'georep'
export type SatelliteId = Extract<BasemapId, 'esri' | 'google' | 'bing' | 'mapbox' | 'georep'>

export const SATELLITE_IDS: SatelliteId[] = ['esri', 'google', 'bing', 'mapbox', 'georep']

export interface LayerDef {
  key: string
  label: string
  on: boolean
}

export const LAYER_DEFS: LayerDef[] = [
  { key: 'bv', label: 'Bassins versants', on: true },
  { key: 'bbr', label: 'Bassins versants BBR', on: false },
  { key: 'capt', label: 'Unités de gestion', on: true },
  { key: 'source', label: 'Couche source', on: false },
]

export function useLayers() {
  const [layers, setLayers] = useState<LayerDef[]>(LAYER_DEFS)
  const [basemap, setBasemap] = useState<BasemapId>('terrain')

  const toggleLayer = (key: string) =>
    setLayers((prev) => prev.map((x) => (x.key === key ? { ...x, on: !x.on } : x)))

  return { layers, toggleLayer, basemap, setBasemap }
}

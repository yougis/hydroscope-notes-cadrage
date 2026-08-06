import { useState } from 'react'

export type BasemapId = 'carto' | 'satellite' | 'terrain'

export interface LayerDef {
  key: string
  label: string
  on: boolean
}

export const LAYER_DEFS: LayerDef[] = [
  { key: 'bv', label: 'Bassins versants', on: true },
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

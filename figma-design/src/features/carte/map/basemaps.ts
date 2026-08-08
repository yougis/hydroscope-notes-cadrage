import TileLayer from 'ol/layer/Tile'
import ImageLayer from 'ol/layer/Image'
import ImageArcGISRest from 'ol/source/ImageArcGISRest'
import XYZ from 'ol/source/XYZ'
import OSM from 'ol/source/OSM'
import WMTS from 'ol/source/WMTS'
import WMTSTileGrid from 'ol/tilegrid/WMTS'
import proj4 from 'proj4'
import { register } from 'ol/proj/proj4'
import type { SatelliteId, BasemapId } from '../hooks/useLayers'

export interface BasemapMeta {
  id: BasemapId
  label: string
  credits: string
  satellite?: boolean
}

/**
 * Fonds de carte et sources satellite.
 * Les générateurs d'URL Bing et Google reproduisent les scripts SASPlanet
 * fournis dans `maps/bing/` et `maps/GoogleSat/` (quadkey Bing, version khms
 * Google avec repli sur `mt/lyrs=s`). Le fond aérien Géorep utilise le WMTS
 * officiel `fond_imagerie` de Géorep NC en projection Lambert locale
 * (EPSG:3163), reprojetée par OpenLayers vers la vue WebMercator.
 */

declare const __MAPBOX_TOKEN__: string

/* Projection des tuiles du service Géorep (RGNC91‑93 / Lambert New Caledonia). */
proj4.defs(
  'EPSG:3163',
  '+proj=lcc +lat_0=-21.5 +lon_0=166 +lat_1=-20.6666666666667 +lat_2=-22.3333333333333 +x_0=400000 +y_0=300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
)
register(proj4)

const GEOREP_IMAGERY_URL =
  'https://carto.gouv.nc/public/rest/services/fond_imagerie/MapServer'

const GEOREP_WMTS_URL =
  'https://carto.gouv.nc/public/rest/services/fond_imagerie/MapServer/WMTS/tile/1.0.0/fond_imagerie/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}'

/* Matrice `default028mm` du service (14 niveaux) — issu du GetCapabilities
   officiel : origine, résolutions (ScaleDenominator × 0,28mm) et tailles.
   EPSG:3163, tuiles 256px. */
const GEOREP_ORIGIN: [number, number] = [-5750000, 10400000]
const GEOREP_TILE_SIZE: [number, number] = [256, 256]
const GEOREP_RESOLUTIONS = [
  6614.5966, 2645.8386, 1322.9193, 661.4597, 264.5839, 132.2919,
  66.146, 26.4584, 13.2292, 6.6146, 2.6458, 1.3229, 0.5292, 0.2646,
]
const GEOREP_MATRIX_IDS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13',
]
const GEOREP_MATRIX_SIZES: [number, number][] = [
  [5, 8], [13, 18], [25, 36], [50, 71], [123, 176], [246, 352], [492, 703],
  [1230, 1758], [2459, 3515], [4918, 7030], [12293, 17573], [24586, 35146],
  [61463, 87864], [122926, 175727],
]

let georepTileGrid: WMTSTileGrid | null = null
function getGeorepTileGrid(): WMTSTileGrid {
  if (!georepTileGrid) {
    georepTileGrid = new WMTSTileGrid({
      origin: GEOREP_ORIGIN,
      resolutions: GEOREP_RESOLUTIONS,
      matrixIds: GEOREP_MATRIX_IDS,
      tileSize: GEOREP_TILE_SIZE,
      sizes: GEOREP_MATRIX_SIZES,
    })
  }
  return georepTileGrid
}

const GEOREP_IMAGERY_ATTRIBUTION =
  '© Gouvernement de la Nouvelle-Calédonie — Géorep NC'

const ESRI_WORLD_IMAGERY_URL =
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'

const ESRI_ATTRIBUTION =
  'Tiles &copy; Esri &mdash; Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community'

const OPENTOPOMAP_URL = 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
const OPENTOPOMAP_ATTRIBUTION =
  'Cartes & données © contribeurs OpenStreetMap <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'

/** Métadonnées du sélecteur de fond : libellé + crédits d'attribution (chip). */
export const BASEMAP_META: BasemapMeta[] = [
  { id: 'carto', label: 'Carte', credits: '© OpenStreetMap' },
  { id: 'terrain', label: 'Relief', credits: '© OpenTopoMap (CC-BY-SA)' },
  { id: 'esri', label: 'Esri World Imagery', credits: 'ESRI — Imagerie composite', satellite: true },
  { id: 'google', label: 'Satellite Google', credits: '© Google', satellite: true },
  { id: 'bing', label: 'Bing Aerial', credits: '© Microsoft', satellite: true },
  { id: 'mapbox', label: 'Mapbox Satellite', credits: '© Mapbox · © OpenStreetMap', satellite: true },
  { id: 'georep', label: 'Aérienne Géorep NC', credits: '© Gouvernement NC — Géorep', satellite: true },
]

/** Repli : couche image ArcGIS (export) si le WMTS ne peut pas être construit. */
function createImageryRestLayer(): ImageLayer<ImageArcGISRest> {
  return new ImageLayer({
    source: new ImageArcGISRest({
      url: GEOREP_IMAGERY_URL,
      params: { LAYERS: '0', FORMAT: 'png32' },
      attributions: GEOREP_IMAGERY_ATTRIBUTION,
      ratio: 1,
    }),
  })
}

/** Couche tuilée WMTS Géorep (`fond_imagerie`, raster `default028mm`, EPSG:3163 reprojeté en WebMercator). */
function createImageryLayer(): TileLayer<WMTS> {
  return new TileLayer({
    source: new WMTS({
      url: GEOREP_WMTS_URL,
      layer: 'fond_imagerie',
      style: 'default',
      matrixSet: 'default028mm',
      format: 'image/jpgpng',
      projection: 'EPSG:3163',
      tileGrid: getGeorepTileGrid(),
      wrapX: false,
      attributions: GEOREP_IMAGERY_ATTRIBUTION,
    }),
  })
}

function createEsriLayer(): TileLayer<XYZ> {
  return new TileLayer({
    source: new XYZ({
      url: ESRI_WORLD_IMAGERY_URL,
      attributions: ESRI_ATTRIBUTION,
      crossOrigin: 'anonymous',
      maxZoom: 19,
    }),
  })
}

/** Quadkey Bing — reproduit `maps/bing/GetUrlScript.txt`. */
function toQuadkey(x: number, y: number, z: number): string {
  let qk = ''
  for (let i = z; i > 0; i--) {
    const m = 1 << (i - 1)
    let d = 0
    if (x & m) d += 1
    if (y & m) d += 2
    qk += String(d)
  }
  return qk
}

function bingTileUrl(x: number, y: number, z: number): string {
  return `https://ecn.t${x % 4}.tiles.virtualearth.net/tiles/a${toQuadkey(x, y, z)}.jpeg?g=0`
}

function createBingLayer(): TileLayer<XYZ> {
  return new TileLayer({
    source: new XYZ({
      tileUrlFunction: (tc) => bingTileUrl(tc[1], tc[2], tc[0]),
      attributions: '&copy; Microsoft',
      crossOrigin: 'anonymous',
      maxZoom: 19,
    }),
  })
}

let googleVersion: string | null | undefined

/** Version du cache `khms` — reproduit `_RequestVersion` du script Google (via proxy Vite). */
export async function resolveGoogleVersion(): Promise<string | null> {
  if (googleVersion !== undefined) return googleVersion
  try {
    const res = await fetch('/gmaps-js')
    const text = await res.text()
    const m = text.match(/khms\d+\.googleapis\.com\/kh\?v=(\d+)/)
    googleVersion = m ? m[1] : null
  } catch {
    googleVersion = null
  }
  return googleVersion
}

/** URL tuile Google — reproduit `maps/GoogleSat/GetUrlScript.txt` (khms versionné, repli mt lyrs=s). */
function googleTileUrl(x: number, y: number, z: number): string {
  if (googleVersion) {
    return `https://khms${x % 4}.google.com/kh/v=${googleVersion}&src=app&x=${x}&y=${y}&z=${z}`
  }
  return `https://mt${x % 4}.google.com/vt/lyrs=s&hl=fr&x=${x}&y=${y}&z=${z}`
}

function createGoogleLayer(): TileLayer<XYZ> {
  void resolveGoogleVersion()
  return new TileLayer({
    source: new XYZ({
      tileUrlFunction: (tc) => googleTileUrl(tc[1], tc[2], tc[0]),
      attributions: '&copy; Google',
      crossOrigin: 'anonymous',
      maxZoom: 19,
    }),
  })
}

function mapboxTileUrl(x: number, y: number, z: number): string {
  return `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/${z}/${x}/${y}?access_token=${__MAPBOX_TOKEN__}`
}

function createMapboxLayer(): TileLayer<XYZ> {
  return new TileLayer({
    source: new XYZ({
      tileUrlFunction: (tc) => mapboxTileUrl(tc[1], tc[2], tc[0]),
      attributions: '&copy; Mapbox &copy; OpenStreetMap',
      crossOrigin: 'anonymous',
      maxZoom: 19,
    }),
  })
}

/** Retourne le calque de fond correspondant au fond choisi. */
export function createBasemapLayer(
  basemap: BasemapId,
): ImageLayer<ImageArcGISRest> | TileLayer<XYZ | OSM | WMTS> {
  switch (basemap) {
    case 'esri':
      return createEsriLayer()
    case 'google':
      return createGoogleLayer()
    case 'bing':
      return createBingLayer()
    case 'mapbox':
      return createMapboxLayer()
    case 'georep':
      return createImageryLayer()
    case 'terrain':
      return new TileLayer({ source: new XYZ({ url: OPENTOPOMAP_URL, attributions: OPENTOPOMAP_ATTRIBUTION, maxZoom: 17 }) })
    case 'carto':
    default:
      return new TileLayer({ source: new OSM() })
  }
}

/** Tuile web-mercator contenant un point lon/lat (utilisée pour le test de santé). */
export function webMercatorTile(lon: number, lat: number, z: number): { x: number; y: number; z: number } {
  const x = Math.floor(((lon + 180) / 360) * Math.pow(2, z))
  const latRad = (lat * Math.PI) / 180
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * Math.pow(2, z),
  )
  return { x, y, z }
}

/** URL de test d'une source satellite (retourne null si la source n'est pas testable). */
export function probeUrl(id: BasemapId, x: number, y: number, z: number): string | null {
  switch (id) {
    case 'esri':
      return ESRI_WORLD_IMAGERY_URL.replace('{z}', String(z)).replace('{y}', String(y)).replace('{x}', String(x))
    case 'google':
      return `https://mt1.google.com/vt/lyrs=s&hl=fr&x=${x}&y=${y}&z=${z}`
    case 'bing':
      return bingTileUrl(x, y, z)
    case 'mapbox':
      return __MAPBOX_TOKEN__ ? mapboxTileUrl(x, y, z) : null
    default:
      return null
  }
}

/** Teste si une tuile se charge réellement (santé de la source). */
export function probeTile(url: string, timeoutMs = 4000): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    const timer = window.setTimeout(() => {
      img.onload = null
      img.onerror = null
      resolve(false)
    }, timeoutMs)
    img.onload = () => {
      window.clearTimeout(timer)
      resolve(true)
    }
    img.onerror = () => {
      window.clearTimeout(timer)
      resolve(false)
    }
    img.src = url
  })
}

export function isSatelliteId(id: BasemapId): id is SatelliteId {
  return id === 'esri' || id === 'google' || id === 'bing' || id === 'mapbox' || id === 'georep'
}

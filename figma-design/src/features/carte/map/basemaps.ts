import proj4 from 'proj4'
import { register } from 'ol/proj/proj4'
import Projection from 'ol/proj/Projection'
import TileGrid from 'ol/tilegrid/TileGrid'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import OSM from 'ol/source/OSM'
import type { BasemapId } from '../hooks/useLayers'

/**
 * Fond imagerie du Géoréférentiel de la Nouvelle-Calédonie (Géorep NC).
 * Service ArcGIS REST en cache tuilé, projection RGNC 1991-93 Lambert (EPSG:3163).
 * https://carto.gouv.nc/arcgis/rest/services/fond_imagerie/MapServer
 */

const GEOREP_IMAGERY_LAYER = 'fond_imagerie'
const GEOREP_TILE_URL = `https://carto.gouv.nc/arcgis/rest/services/${GEOREP_IMAGERY_LAYER}/MapServer/tile`

const GEOREP_IMAGERY_ATTRIBUTION =
  'Gouvernement de la Nouvelle-Calédonie — Géorep NC (SENTINEL-2, QUICKBIRD, photos aériennes)'

// Mosaïque tuilée issue du service : origine + résolutions par niveau de zoom.
const GEOREP_ORIGIN: [number, number] = [-5750000, 10400000]
const GEOREP_RESOLUTIONS = [
  6614.596562526459, 2645.8386250105836, 1322.9193125052918, 661.4596562526459,
  264.5838625010584, 132.2919312505292, 66.1459656252646, 26.458386250105836,
  13.229193125052918, 6.614596562526459, 2.6458386250105836, 1.3229193125052918,
  0.5291677250021167, 0.26458386250105836,
]

// Étendue de la Nouvelle-Calédonie en EPSG:3163.
const GEOREP_EXTENT = [142758.4, 287218.8, 557536.4, 620686.9]

let registered = false

function ensureProjection(): Projection {
  if (!registered) {
    proj4.defs(
      'EPSG:3163',
      '+proj=lcc +lat_0=-21.5 +lon_0=166 +lat_1=-20.66666666666667 +lat_2=-22.33333333333333 +x_0=400000 +y_0=400000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    )
    register(proj4)
    registered = true
  }
  return new Projection({ code: 'EPSG:3163', extent: GEOREP_EXTENT, units: 'm' })
}

function createImagerySource(): XYZ {
  const projection = ensureProjection()
  const tileGrid = new TileGrid({ origin: GEOREP_ORIGIN, resolutions: GEOREP_RESOLUTIONS })
  return new XYZ({
    projection,
    tileGrid,
    crossOrigin: 'anonymous',
    tileUrlFunction: (tileCoord) =>
      `${GEOREP_TILE_URL}/${tileCoord[0]}/${tileCoord[1]}/${tileCoord[2]}`,
    attributions: GEOREP_IMAGERY_ATTRIBUTION,
  })
}

const OPENTOPOMAP_URL = 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
const OPENTOPOMAP_ATTRIBUTION =
  'Cartes & données © contribeurs OpenStreetMap <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'

/** Retourne le calque de fond correspondant au fond choisi. */
export function createBasemapLayer(basemap: BasemapId): TileLayer<XYZ | OSM> {
  switch (basemap) {
    case 'satellite':
      return new TileLayer({ source: createImagerySource() })
    case 'terrain':
      return new TileLayer({ source: new XYZ({ url: OPENTOPOMAP_URL, attributions: OPENTOPOMAP_ATTRIBUTION, maxZoom: 17 }) })
    case 'carto':
    default:
      return new TileLayer({ source: new OSM() })
  }
}

import TileLayer from 'ol/layer/Tile'
import ImageLayer from 'ol/layer/Image'
import ImageArcGISRest from 'ol/source/ImageArcGISRest'
import XYZ from 'ol/source/XYZ'
import OSM from 'ol/source/OSM'
import type { BasemapId } from '../hooks/useLayers'

/**
 * Fond imagerie du Géoréférentiel de la Nouvelle-Calédonie (Géorep NC).
 * Service ArcGIS REST MapServer (imagerie SENTINEL-2 / QUICKBIRD / photos aériennes).
 * https://carto.gouv.nc/public/rest/services/fond_imagerie/MapServer
 *
 * Le tuple tuilé `/tile/{z}/{y}/{x}` du service n'est pas exposé par le proxy public
 * (404), on consomme donc la couche via l'endpoint `/MapServer/export` (ImageArcGISRest).
 * OL déduit automatiquement bboxSR/imageSR à partir de la projection de la vue (EPSG:3857).
 */

const GEOREP_IMAGERY_URL =
  'https://carto.gouv.nc/public/rest/services/fond_imagerie/MapServer'

const GEOREP_IMAGERY_ATTRIBUTION =
  'Gouvernement de la Nouvelle-Calédonie — Géorep NC (SENTINEL-2, QUICKBIRD, photos aériennes)'

function createImageryLayer(): ImageLayer<ImageArcGISRest> {
  return new ImageLayer({
    source: new ImageArcGISRest({
      url: GEOREP_IMAGERY_URL,
      params: { LAYERS: '0', FORMAT: 'png32' },
      attributions: GEOREP_IMAGERY_ATTRIBUTION,
      ratio: 1,
    }),
  })
}

const OPENTOPOMAP_URL = 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
const OPENTOPOMAP_ATTRIBUTION =
  'Cartes & données © contribeurs OpenStreetMap <a href="https://opentopomap.org">OpenTopoMap</a> (CC-BY-SA)'

/** Retourne le calque de fond correspondant au fond choisi. */
export function createBasemapLayer(
  basemap: BasemapId,
): ImageLayer<ImageArcGISRest> | TileLayer<XYZ | OSM> {
  switch (basemap) {
    case 'satellite':
      return createImageryLayer()
    case 'terrain':
      return new TileLayer({ source: new XYZ({ url: OPENTOPOMAP_URL, attributions: OPENTOPOMAP_ATTRIBUTION, maxZoom: 17 }) })
    case 'carto':
    default:
      return new TileLayer({ source: new OSM() })
  }
}

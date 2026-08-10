import { useEffect, useMemo, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { PanelSection } from '@/features/carte/components/PanelSection'
import { WireframeBlock } from '@/components/ui/WireframeBlock'

interface StubProps {
  onNavigate: (view: string) => void
  location: { pathname: string; search: string }
}

const API_BASE = '/api'

interface CatalogEntry {
  name: string
  title: string
  description: string
  driver: string
  args: { url: string; layer: number }
  metadata: {
    geometryType?: string
    bbox?: number[]
    crs?: number
    fields?: Array<{ name: string; alias: string; type: string; nullable: boolean; length: number | null }>
    count?: number
    lastSync?: string
    provenance?: string
    copyrightText?: string
    full_layer_info?: any
  }
  tags: string[]
  links: Array<{ rel: string; href: string }>
  version: number
}

interface CatalogListResponse {
  entries: CatalogEntry[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

interface Collection {
  id: string
  title: string
  description: string
  entryIds: string[]
}

export function CatalogueView({ onNavigate, location }: StubProps) {
  const [entries, setEntries] = useState<CatalogEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(12)
  const [collections, setCollections] = useState<Collection[]>([])
  const [selectedCollection, setSelectedCollection] = useState<string | null>('referentiels')
  const [detailEntry, setDetailEntry] = useState<CatalogEntry | null>(null)

  const entryIdFromUrl = useMemo(() => {
    const params = new URLSearchParams(location.search)
    return params.get('entry')
  }, [location.search])

  useEffect(() => {
    loadCollections()
  }, [])

  useEffect(() => {
    loadEntries()
  }, [page, selectedCollection])

  useEffect(() => {
    if (entryIdFromUrl) {
      loadEntryDetail(entryIdFromUrl)
    } else {
      setDetailEntry(null)
    }
  }, [entryIdFromUrl])

  const loadCollections = async () => {
    try {
      const res = await fetch(`${API_BASE}/catalog/collections`)
      if (!res.ok) throw new Error('Failed to load collections')
      const data = await res.json()
      setCollections(data.collections || [])
    } catch (e) {
      console.error('Failed to load collections:', e)
    }
  }

  const loadEntries = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
      })
      if (selectedCollection && selectedCollection !== 'tous') {
        params.set('collection', selectedCollection)
      }
      const res = await fetch(`${API_BASE}/catalog/entries?${params}`)
      if (!res.ok) throw new Error('Failed to load entries')
      const data: CatalogListResponse = await res.json()
      setEntries(data.entries)
      setTotal(data.total)
    } catch (e) {
      setError('Erreur lors du chargement du catalogue')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const loadEntryDetail = async (entryId: string) => {
    try {
      const res = await fetch(`${API_BASE}/catalog/entries/${entryId}`)
      if (!res.ok) throw new Error('Entry not found')
      const data: CatalogEntry = await res.json()
      setDetailEntry(data)
    } catch (e) {
      console.error('Failed to load entry detail:', e)
      setDetailEntry(null)
    }
  }

  const closeDetail = () => {
    setDetailEntry(null)
    // Update URL without reload
    window.history.pushState({}, '', location.pathname)
    window.dispatchEvent(new Event('hydroscope:navigate'))
  }

  const navigateToEntry = (entryId: string) => {
    const newSearch = `?entry=${entryId}`
    window.history.pushState({}, '', `${location.pathname}${newSearch}`)
    // Notify App.tsx to refresh location (pushState doesn't fire popstate)
    window.dispatchEvent(new Event('hydroscope:navigate'))
  }

  const driverLabels: Record<string, string> = {
    arcgis_featureserver: 'ArcGIS FeatureServer',
    dbt: 'dbt Model',
    stac: 'STAC Catalog',
    ckan: 'CKAN Dataset',
  }

  const driverColors: Record<string, string> = {
    arcgis_featureserver: '#1e40af',
    dbt: '#7c3aed',
    stac: '#059669',
    ckan: '#ea580c',
  }

  if (loading && entries.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-500">
        Chargement du catalogue…
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold">Données disponibles — Catalogue</h2>
        <div className="ml-auto flex items-center gap-2">
          <select
            value={selectedCollection || 'tous'}
            onChange={(e) => { setSelectedCollection(e.target.value || 'tous'); setPage(1) }}
            className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm"
          >
            <option value="tous">Toutes les collections</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 min-w-0 overflow-y-auto pr-2">
          {error && (
            <div className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {entries.map((entry) => (
              <CatalogCard
                key={entry.name}
                entry={entry}
                driverLabel={driverLabels[entry.driver] || entry.driver}
                driverColor={driverColors[entry.driver] || '#64748b'}
                onClick={() => navigateToEntry(entry.name)}
                isSelected={detailEntry?.name === entry.name}
              />
            ))}
          </div>

          {entries.length === 0 && (
            <WireframeBlock label="Aucune donnée dans cette collection" className="min-h-44 w-full" />
          )}

          {total > pageSize && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Précédent
              </button>
              <span className="text-sm text-neutral-600">
                Page {page} / {Math.ceil(total / pageSize)}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(Math.ceil(total / pageSize), p + 1))}
                disabled={page >= Math.ceil(total / pageSize)}
                className="rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          )}
        </div>

        {detailEntry && (
          <CatalogDetailPanel
            entry={detailEntry}
            onClose={closeDetail}
          />
        )}
      </div>
    </div>
  )
}

function CatalogCard({
  entry,
  driverLabel,
  driverColor,
  onClick,
  isSelected,
}: {
  entry: CatalogEntry
  driverLabel: string
  driverColor: string
  onClick: () => void
  isSelected: boolean
}) {
  const syncDate = entry.metadata.lastSync
    ? new Date(entry.metadata.lastSync).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'Jamais'

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col rounded-lg border p-3 transition ${
        isSelected
          ? 'border-blue-400 bg-blue-50 ring-2 ring-blue-200'
          : 'border-neutral-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium text-white" style={{ background: driverColor }}>
              {driverLabel}
            </span>
            {entry.metadata.provenance && (
              <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-neutral-100 text-neutral-600">
                {entry.metadata.provenance}
              </span>
            )}
          </div>
          <h3 className="font-medium text-neutral-800 truncate">{entry.title}</h3>
          <p className="mt-0.5 text-xs text-neutral-500 line-clamp-2">{entry.description || 'Sans description'}</p>
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-1">
        {entry.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-600">
            {tag}
          </span>
        ))}
        {entry.tags.length > 3 && (
          <span className="rounded-full bg-neutral-100 px-1.5 py-0.5 text-[10px] text-neutral-500">
            +{entry.tags.length - 3}
          </span>
        )}
      </div>

      <div className="mt-3 border-t border-neutral-100 pt-3 space-y-1.5 text-[11px] text-neutral-600">
        <div className="flex justify-between">
          <span>Objets</span>
          <span className="font-medium text-neutral-800">{entry.metadata.count?.toLocaleString('fr-FR') ?? '—'}</span>
        </div>
        <div className="flex justify-between">
          <span>Dernière sync</span>
          <span className="font-medium text-neutral-800">{syncDate}</span>
        </div>
        <div className="flex justify-between">
          <span>Géométrie</span>
          <span className="font-medium text-neutral-800">{entry.metadata.geometryType || '—'}</span>
        </div>
        <div className="flex justify-between">
          <span>CRS</span>
          <span className="font-medium text-neutral-800">EPSG:{entry.metadata.crs || 3857}</span>
        </div>
      </div>
    </button>
  )
}

function CatalogDetailPanel({ entry, onClose }: { entry: CatalogEntry; onClose: () => void }) {
  const syncDate = entry.metadata.lastSync
    ? new Date(entry.metadata.lastSync).toLocaleString('fr-FR')
    : 'Jamais'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-lg bg-white overflow-hidden flex flex-col">
        <div className="flex items-center justify-between border-b border-neutral-200 p-4 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded px-2 py-0.5 text-[10px] font-medium bg-blue-100 text-blue-700">
              {entry.driver}
            </span>
            <h3 className="font-semibold text-neutral-800 truncate">{entry.title}</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-neutral-100 text-neutral-500">
            <Icon><path d="M18 6 6 18M6 6l12 12" /></Icon>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <section>
            <h4 className="mb-2 font-medium text-neutral-700">Identité</h4>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-neutral-500">ID entrée</dt>
              <dd className="font-mono text-neutral-800">{entry.name}</dd>
              <dt className="text-neutral-500">Titre</dt>
              <dd className="font-medium text-neutral-800">{entry.title}</dd>
              <dt className="text-neutral-500">Driver</dt>
              <dd className="font-medium text-neutral-800">{entry.driver}</dd>
              <dt className="text-neutral-500">Version catalogue</dt>
              <dd className="font-mono text-neutral-800">{entry.version}</dd>
              <dt className="text-neutral-500">Provenance</dt>
              <dd className="font-medium text-neutral-800">{entry.metadata.provenance}</dd>
              <dt className="text-neutral-500">Dernière synchronisation</dt>
              <dd className="font-medium text-neutral-800">{syncDate}</dd>
            </dl>
          </section>

          <section>
            <h4 className="mb-2 font-medium text-neutral-700">Source & Accès</h4>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-neutral-500">Service URL</dt>
              <dd className="font-mono text-neutral-800 truncate max-w-xs">{entry.args.url}</dd>
              <dt className="text-neutral-500">Layer ID</dt>
              <dd className="font-mono text-neutral-800">{entry.args.layer}</dd>
            </dl>
            <div className="mt-2 flex flex-wrap gap-2">
              {entry.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs hover:bg-neutral-50"
                >
                  <Icon className="h-3 w-3"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></Icon>
                  {link.rel}
                </a>
              ))}
            </div>
          </section>

          <section>
            <h4 className="mb-2 font-medium text-neutral-700">Géométrie & Emprise</h4>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <dt className="text-neutral-500">Type</dt>
              <dd className="font-medium text-neutral-800">{entry.metadata.geometryType || '—'}</dd>
              <dt className="text-neutral-500">CRS</dt>
              <dd className="font-medium text-neutral-800">EPSG:{entry.metadata.crs || 3857}</dd>
              <dt className="text-neutral-500">BBox (minX, minY, maxX, maxY)</dt>
              <dd className="font-mono text-neutral-800 col-span-2">
                {entry.metadata.bbox ? entry.metadata.bbox.map((v) => v.toLocaleString('fr-FR')).join(', ') : '—'}
              </dd>
            </dl>
          </section>

          <section>
            <h4 className="mb-2 font-medium text-neutral-700">Champs ({entry.metadata.fields?.length || 0})</h4>
            {entry.metadata.fields && entry.metadata.fields.length > 0 ? (
              <div className="rounded border border-neutral-200 bg-white overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-neutral-50">
                    <tr>
                      <th className="text-left p-2 font-medium text-neutral-700 border-b">Nom</th>
                      <th className="text-left p-2 font-medium text-neutral-700 border-b">Alias</th>
                      <th className="text-left p-2 font-medium text-neutral-700 border-b">Type</th>
                      <th className="text-left p-2 font-medium text-neutral-700 border-b">Nullable</th>
                      <th className="text-left p-2 font-medium text-neutral-700 border-b">Longueur</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.metadata.fields.map((f, i) => (
                      <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="p-2 font-mono text-neutral-800">{f.name}</td>
                        <td className="p-2 text-neutral-600">{f.alias || '—'}</td>
                        <td className="p-2 font-mono text-neutral-600">{f.type}</td>
                        <td className="p-2 text-center">{f.nullable ? 'Oui' : 'Non'}</td>
                        <td className="p-2 text-center text-neutral-600">{f.length ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-neutral-500">Aucun champ disponible</p>
            )}
          </section>

          {entry.metadata.copyrightText && (
            <section>
              <h4 className="mb-2 font-medium text-neutral-700">Copyright / Crédits</h4>
              <p className="text-sm text-neutral-600">{entry.metadata.copyrightText}</p>
            </section>
          )}

          {entry.metadata.full_layer_info && (
            <section>
              <h4 className="mb-2 font-medium text-neutral-700">Métadonnées complètes (source)</h4>
              <pre className="rounded border border-neutral-200 bg-neutral-50 p-3 text-[10px] overflow-auto max-h-64">
                {JSON.stringify(entry.metadata.full_layer_info, null, 2)}
              </pre>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { WireframeBlock } from '@/components/ui/WireframeBlock'
import { Icon } from '@/components/ui/Icon'

interface StubProps {
  onNavigate: (view: string) => void
  location: { pathname: string; search: string }
}

interface SourceMeta {
  key: string
  name: string
  status: string
  priority: number
  last_sync: string | null
  last_count: number
  layer_counts: Record<string, number>
  stale: boolean
}

interface FeatureItem {
  type: 'Feature'
  properties: Record<string, unknown>
  geometry: unknown | null
}

interface FeatureResponse {
  features: FeatureItem[]
  count: number
  limit: number
  offset: number
}

const API_BASE = '/api'

async function fetchSources(): Promise<SourceMeta[]> {
  const res = await fetch(`${API_BASE}/sources`)
  if (!res.ok) throw new Error('Failed to fetch sources')
  const data = await res.json()
  return data.sources
}

async function fetchFeatures(sourceKey: string, layer: number, limit = 10): Promise<FeatureResponse> {
  const res = await fetch(`${API_BASE}/${sourceKey}?layer=${layer}&limit=${limit}`)
  if (!res.ok) throw new Error(`Failed to fetch ${sourceKey}`)
  return res.json()
}

async function triggerRefresh(): Promise<void> {
  const res = await fetch(`${API_BASE}/refresh?force=true`, { method: 'POST' })
  if (!res.ok) throw new Error('Refresh failed')
  await res.json()
}

export function ReferentielsView({ onNavigate, location }: StubProps) {
  const [sources, setSources] = useState<SourceMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [preview, setPreview] = useState<{ key: string; layer: number; data: FeatureResponse } | null>(null)

  useEffect(() => {
    loadSources()
  }, [])

  const loadSources = async () => {
    setLoading(true)
    try {
      const data = await fetchSources()
      setSources(data)
    } catch (e) {
      console.error('Failed to load sources:', e)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    try {
      await triggerRefresh()
      await loadSources()
    } catch (e) {
      console.error('Refresh failed:', e)
    } finally {
      setRefreshing(false)
    }
  }

  const handlePreview = async (key: string, layer: number) => {
    try {
      const data = await fetchFeatures(key, layer, 10)
      setPreview({ key, layer, data })
    } catch (e) {
      console.error(`Preview failed for ${key}/${layer}:`, e)
    }
  }

  const statusColor = (status: string) =>
    status === 'ok' ? 'text-green-600' : status === 'non_disponible' ? 'text-amber-600' : 'text-red-600'

  const statusLabel = (status: string) =>
    status === 'ok' ? '✓ Disponible' : status === 'non_disponible' ? '⚠ Non disponible' : '✗ Erreur'

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-500">
        Chargement des référentiels…
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold">Référentiels géographiques (EPIC 3)</h2>
        <span className="ml-auto flex items-center gap-2 text-xs text-neutral-500">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="rounded border border-neutral-300 bg-white px-3 py-1.5 hover:bg-neutral-50 disabled:opacity-50"
          >
            {refreshing ? '⟳ Synchronisation…' : '⟳ Rafraîchir le cache'}
          </button>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3">
        {sources.map((src) => {
          const totalCount = src.last_count || 0
          const layers = Object.entries(src.layer_counts)
          const isAvailable = src.status === 'ok'

          return (
            <div
              key={src.key}
              className="rounded-lg border border-neutral-200 bg-white"
            >
              <button
                onClick={() => setExpanded((e) => (e === src.key ? null : src.key))}
                className="w-full flex items-center justify-between gap-3 p-4 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-sm font-medium ${
                      isAvailable ? 'text-green-700' : 'text-amber-700'
                    }`}
                  >
                    {src.key === 'captages' && '💧'}
                    {src.key === 'bassins' && '🌊'}
                    {src.key === 'bbr' && '📊'}
                    {src.key === 'rhm' && '🗺️'}
                    {src.key === 'hydrometrie' && '📈'}
                    {src.key === 'communes' && '🏘️'}
                    {src.key === 'dass' && '🔒'}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{src.name}</p>
                    <p className="truncate text-xs text-neutral-500">
                      {src.base_url ? src.base_url.slice(0, 70) + '…' : 'Source non configurée'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-sm font-medium ${statusColor(src.status)}`}>
                    {statusLabel(src.status)}
                  </span>
                  {isAvailable && totalCount > 0 && (
                    <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                      {totalCount.toLocaleString()} objets
                    </span>
                  )}
                  {src.stale && (
                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700">
                      Cache expiré
                    </span>
                  )}
                  {layers.length > 0 && (
                    <button
                      onClick={() => setExpanded((e) => (e === src.key ? null : src.key))}
                      className="text-neutral-400 hover:text-neutral-600"
                      aria-label={expanded === src.key ? 'Réduire' : 'Étendre'}
                    >
                      {expanded === src.key ? '▲' : '▼'}
                    </button>
                  )}
                </div>
              </button>

              {expanded === src.key && (
                <div className="border-t border-neutral-100 p-4 space-y-3 bg-neutral-50">
                  {layers.map(([layerId, count]) => (
                    <div
                      key={layerId}
                      className="flex items-center justify-between rounded border border-neutral-200 bg-white p-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-neutral-500">Layer {layerId}</span>
                        <span className="text-sm text-neutral-700">{count.toLocaleString()} features</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-neutral-400">
                          Dernier sync: {src.last_sync ? new Date(src.last_sync).toLocaleString() : 'Jamais'}
                        </span>
                        {isAvailable && (
                          <>
                            <button
                              onClick={() => handlePreview(src.key, Number(layerId))}
                              className="rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs hover:bg-neutral-50"
                            >
                              Aperçu (10)
                            </button>
                            <button
                              onClick={() => onNavigate('catalogue')}
                              className="rounded border border-neutral-300 bg-white px-2.5 py-1 text-xs hover:bg-neutral-50"
                              title="Voir la fiche complète dans le catalogue"
                              aria-label={`Fiche catalogue pour ${src.key} layer ${layerId}`}
                            >
                              <Icon className="h-3.5 w-3.5">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M8 6v4M8 14v.01" />
                              </Icon>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {src.status === 'non_disponible' && (
                    <div className="rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                      ⚠ Cette source n'est pas accessible via API publique (ex: unités de distribution DASS).
                      Elle est listée pour traçabilité du CDC.
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {sources.length === 0 && (
          <WireframeBlock label="Aucun référentiel chargé" className="min-h-44 w-full" />
        )}
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-3xl max-h-[80vh] rounded-lg bg-white overflow-hidden">
            <div className="flex items-center justify-between border-b border-neutral-200 p-4">
              <h3 className="font-medium">
                Aperçu : {preview.key} / Layer {preview.layer} ({preview.data.count} total)
              </h3>
              <button
                onClick={() => setPreview(null)}
                className="rounded-lg p-1 hover:bg-neutral-100"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-4 text-sm font-mono">
              <pre className="whitespace-pre-wrap">{JSON.stringify(preview.data.features, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
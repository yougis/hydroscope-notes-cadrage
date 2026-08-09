import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { loadLiveReferentiels, getFallbackReferentiels, type LiveCaptage, type LiveRegion, type LiveCommune } from './referentiels'

interface ReferentielsContextValue {
  captages: LiveCaptage[]
  regions: LiveRegion[]
  communes: LiveCommune[]
  loading: boolean
  error: Error | null
  isLive: boolean
}

const ReferentielsContext = createContext<ReferentielsContextValue | null>(null)

export function ReferentielsProvider({ children }: { children: ReactNode }) {
  const [captages, setCaptages] = useState<LiveCaptage[]>([])
  const [regions, setRegions] = useState<LiveRegion[]>([])
  const [communes, setCommunes] = useState<LiveCommune[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [isLive, setIsLive] = useState(false)

  useEffect(() => {
    let mounted = true
    loadLiveReferentiels().then(data => {
      if (!mounted) return
      if (data) {
        setCaptages(data.captages)
        setRegions(data.regions)
        setCommunes(data.communes)
        setIsLive(true)
      } else {
        const fallback = getFallbackReferentiels()
        setCaptages(fallback.captages)
        setRegions(fallback.regions)
        setCommunes(fallback.communes)
        setIsLive(false)
      }
      setLoading(false)
    }).catch(e => {
      if (!mounted) return
      const fallback = getFallbackReferentiels()
      setCaptages(fallback.captages)
      setRegions(fallback.regions)
      setCommunes(fallback.communes)
      setIsLive(false)
      setError(e as Error)
      setLoading(false)
    })
    return () => { mounted = false }
  }, [])

  return (
    <ReferentielsContext.Provider value={{ captages, regions, communes, loading, error, isLive }}>
      {children}
    </ReferentielsContext.Provider>
  )
}

export function useReferentiels() {
  const ctx = useContext(ReferentielsContext)
  if (!ctx) throw new Error('useReferentiels must be used within ReferentielsProvider')
  return ctx
}
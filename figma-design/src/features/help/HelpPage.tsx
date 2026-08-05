import { useEffect, useMemo, useRef, useState } from 'react'
import { HELP_DOCS, buildToc } from './docs'
import { renderMarkdown } from './markdown'

export interface HelpPageProps {
  /** Ancre (slug de section) vers laquelle naviguer à l'ouverture — la vue active. */
  initialAnchor?: string
  /** Libellé de la vue d'où vient l'utilisateur (bandeau contextuel). */
  fromLabel?: string
  onBack: () => void
}

export function HelpPage({ initialAnchor, fromLabel, onBack }: HelpPageProps) {
  const toc = useMemo(() => buildToc(), [])
  const [query, setQuery] = useState('')
  const [activeAnchor, setActiveAnchor] = useState<string | null>(initialAnchor ?? null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const filteredToc = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return toc
    return toc.filter((e) => e.title.toLowerCase().includes(q))
  }, [toc, query])

  useEffect(() => {
    if (!initialAnchor) return
    const t = window.setTimeout(() => {
      document.getElementById(initialAnchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
    return () => window.clearTimeout(t)
  }, [initialAnchor])

  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActiveAnchor(e.target.id)
        }
      },
      { root, rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    )
    const ids = new Set(toc.map((t) => t.anchor))
    for (const el of root.querySelectorAll<HTMLElement>('[id]')) {
      if (ids.has(el.id)) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [toc])

  const scrollTo = (anchor: string) => {
    setActiveAnchor(anchor)
    document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const contextLabel = initialAnchor ? toc.find((e) => e.anchor === initialAnchor)?.title : undefined

  return (
    <div className="flex h-screen flex-col bg-white text-neutral-800">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-emerald-600 text-sm font-bold text-white">H</div>
          <div className="leading-tight">
            <div className="text-sm font-bold">HydroScope</div>
            <div className="text-[10px] text-neutral-400">Centre d’aide · Documentation</div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-md border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-sm">
          <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 stroke-neutral-400" fill="none" strokeWidth="1.5">
            <circle cx="7" cy="7" r="4.5" />
            <line x1="10.5" y1="10.5" x2="14" y2="14" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher dans la documentation…"
            className="w-full bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
          />
        </div>

        <button
          onClick={onBack}
          className="ml-auto shrink-0 rounded-full border border-neutral-300 bg-white px-4 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
        >
          ← Retour à l’application
        </button>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="w-72 shrink-0 overflow-y-auto border-r border-neutral-200 bg-neutral-50 p-4">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-wider text-neutral-400">Sommaire</span>
          {HELP_DOCS.map((doc) => {
            const docEntries = filteredToc.filter((e) => e.docId === doc.id)
            const chapter = docEntries.find((e) => e.level === 1)
            const subs = docEntries.filter((e) => e.level > 1)
            if (docEntries.length === 0) return null
            return (
              <div key={doc.id} className="mb-3">
                <button
                  onClick={() => chapter && scrollTo(chapter.anchor)}
                  className={`block w-full truncate rounded px-1.5 py-1 text-left text-[13px] font-semibold transition ${
                    activeAnchor === chapter?.anchor ? 'text-emerald-800' : 'text-neutral-800 hover:text-emerald-800'
                  }`}
                >
                  {chapter?.title ?? doc.title}
                </button>
                {subs.length > 0 && (
                  <div className="mt-0.5 space-y-0.5 border-l border-neutral-200 pl-2">
                    {subs.map((e) => (
                      <button
                        key={`${doc.id}-${e.anchor}`}
                        onClick={() => scrollTo(e.anchor)}
                        className={`block w-full truncate rounded px-1 py-0.5 text-left text-xs transition ${
                          activeAnchor === e.anchor
                            ? 'bg-emerald-100 font-medium text-emerald-800'
                            : e.level === 3
                              ? 'pl-3 text-neutral-400 hover:text-neutral-700'
                              : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                      >
                        {e.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          {filteredToc.length === 0 && (
            <p className="text-xs text-neutral-400">Aucun résultat pour « {query} ».</p>
          )}
        </aside>

        <main ref={scrollRef} className="min-w-0 flex-1 overflow-y-auto">
          {contextLabel && (
            <div className="sticky top-0 z-10 border-b border-emerald-200 bg-emerald-50/90 px-6 py-2 text-xs text-emerald-800 backdrop-blur">
              Vous consultiez <span className="font-semibold">{fromLabel}</span> — section « {contextLabel} ».{' '}
              <button onClick={onBack} className="font-semibold underline">
                Revenir à l’application
              </button>
            </div>
          )}

          <div className="mx-auto max-w-3xl px-6 py-6">
            {HELP_DOCS.map((doc) => (
              <section key={doc.id} className={doc.id !== 'bienvenue' ? 'mt-10 border-t border-neutral-100 pt-6' : ''}>
                {renderMarkdown(doc.raw)}
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

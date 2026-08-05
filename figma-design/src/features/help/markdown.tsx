import { Fragment, type ReactNode } from 'react'

/** Slug d'ancre : minuscules, sans accents, non-alphanumériques → « - ». */
export function slugify(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, 'et')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export interface MarkdownHeading {
  level: number
  anchor: string
  title: string
}

/** Liste des titres (### à #) utilisée pour construire le sommaire (TOC). */
export function extractHeadings(raw: string): MarkdownHeading[] {
  const out: MarkdownHeading[] = []
  for (const line of raw.split('\n')) {
    const m = /^(#{1,4})\s+(.+)$/.exec(line)
    if (m) out.push({ level: m[1].length, anchor: slugify(m[2]), title: m[2].trim() })
  }
  return out
}

function renderInline(text: string, keyBase: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let m: RegExpExecArray | null
  let i = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(<Fragment key={`${keyBase}-t${i++}`}>{text.slice(last, m.index)}</Fragment>)
    const tok = m[0]
    if (tok.startsWith('**')) {
      nodes.push(<strong key={`${keyBase}-b${i++}`}>{tok.slice(2, -2)}</strong>)
    } else if (tok.startsWith('*')) {
      nodes.push(<em key={`${keyBase}-i${i++}`}>{tok.slice(1, -1)}</em>)
    } else if (tok.startsWith('`')) {
      nodes.push(
        <code key={`${keyBase}-c${i++}`} className="rounded bg-neutral-100 px-1 py-0.5 text-[0.85em] text-blue-700">
          {tok.slice(1, -1)}
        </code>,
      )
    } else {
      const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok)
      if (lm) {
        nodes.push(
          <a key={`${keyBase}-l${i++}`} href={lm[2]} className="text-blue-600 underline hover:text-blue-800">
            {lm[1]}
          </a>,
        )
      }
    }
    last = m.index + tok.length
  }
  if (last < text.length) nodes.push(<Fragment key={`${keyBase}-t${i++}`}>{text.slice(last)}</Fragment>)
  return nodes
}

interface TableRow {
  cells: string[]
}

/** Rendu d'un bloc Markdown en React, avec ancres sur les titres. */
export function renderMarkdown(raw: string): ReactNode[] {
  const lines = raw.split('\n')
  const out: ReactNode[] = []
  const used = new Set<string>()
  const anchorFor = (title: string) => {
    let base = slugify(title)
    let a = base
    let n = 2
    while (used.has(a)) a = `${base}-${n++}`
    used.add(a)
    return a
  }

  const emit = (node: ReactNode, key: number) => out.push(<Fragment key={key}>{node}</Fragment>)

  const isTableRow = (line: string) => line.trim().startsWith('|') && line.trim().endsWith('|')
  const parseRow = (line: string): string[] =>
    line
      .trim()
      .replace(/^\||\|$/g, '')
      .split('|')
      .map((c) => c.trim())

  let i = 0
  let key = 0
  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === '---') {
      emit(<hr key={`${key++}-hr`} className="my-4 border-neutral-200" />, key)
      i++
      continue
    }

    const h = /^(#{1,4})\s+(.+)$/.exec(line)
    if (h) {
      const level = h[1].length
      const title = h[2].trim()
      const anchor = anchorFor(title)
      const cls =
        level === 1
          ? 'border-b border-neutral-200 pb-2 text-xl font-bold text-neutral-800'
          : level === 2
            ? 'mt-6 text-lg font-semibold text-neutral-800'
            : level === 3
              ? 'mt-4 text-base font-semibold text-neutral-700'
              : 'mt-3 text-sm font-semibold text-neutral-700'
      const Tag = (level <= 4 ? `h${level}` : 'h4') as 'h1' | 'h2' | 'h3' | 'h4'
      emit(
        <Tag id={anchor} className={`scroll-mt-24 ${cls}`}>
          {renderInline(title, `h-${key}`)}
        </Tag>,
        key,
      )
      key++
      i++
      continue
    }

    if (line.trim() === '') {
      i++
      continue
    }

    if (line.trim().startsWith('```')) {
      const buf: string[] = []
      i++
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        buf.push(lines[i])
        i++
      }
      i++ // closing fence
      emit(
        <pre key={`${key}-code`} className="my-3 overflow-x-auto rounded-md border border-neutral-200 bg-neutral-900 p-3 text-xs text-neutral-100">
          <code>{buf.join('\n')}</code>
        </pre>,
        key,
      )
      key++
      continue
    }

    if (line.trim().startsWith('> ')) {
      const buf: string[] = []
      while (i < lines.length && (lines[i].trim().startsWith('> ') || lines[i].trim() === '>')) {
        buf.push(lines[i].trim().replace(/^>\s?/, ''))
        i++
      }
      emit(
        <blockquote
          key={`${key}-note`}
          className="my-3 rounded-md border-l-4 border-blue-500 bg-blue-50 px-3 py-2 text-sm text-blue-900"
        >
          {buf.map((b, j) => (
            <p key={j} className={j > 0 ? 'mt-1' : ''}>
              {renderInline(b, `note-${key}-${j}`)}
            </p>
          ))}
        </blockquote>,
        key,
      )
      key++
      continue
    }

    if (isTableRow(line) && i + 1 < lines.length && /^\|[\s:|-]+\|$/.test(lines[i + 1].trim())) {
      const header = parseRow(line)
      i += 2
      const rows: TableRow[] = []
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push({ cells: parseRow(lines[i]) })
        i++
      }
      emit(
        <div key={`${key}-table`} className="my-3 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-neutral-300 text-left">
                {header.map((c, j) => (
                  <th key={j} className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                    {renderInline(c, `th-${key}-${j}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, j) => (
                <tr key={j} className="border-b border-neutral-100">
                  {r.cells.map((c, k) => (
                    <td key={k} className="px-3 py-1.5 align-top text-neutral-700">
                      {renderInline(c, `td-${key}-${j}-${k}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
        key,
      )
      key++
      continue
    }

    if (/^\s*[-*]\s+/.test(line) || /^\s*\d+[.)]\s+/.test(line)) {
      const items: { ordered: boolean; depth: number; text: string }[] = []
      while (i < lines.length && (/^\s*[-*]\s+/.test(lines[i]) || /^\s*\d+[.)]\s+/.test(lines[i]) || /^\s{2,}[-*]\s+/.test(lines[i]))) {
        const l = lines[i]
        const ordered = /^\s*\d+[.)]\s+/.test(l)
        const m = /^(\s*)(?:[-*]|\d+[.)])\s+(.*)$/.exec(l)!
        const depth = Math.floor(m[1].length / 2)
        items.push({ ordered, depth, text: m[2] })
        i++
      }
      const renderList = (start: number, depth: number): { nodes: ReactNode[]; next: number } => {
        const nodes: ReactNode[] = []
        let idx = start
        while (idx < items.length && items[idx].depth >= depth) {
          if (items[idx].depth === depth) {
            const ordered = items[idx].ordered
            const batch: { text: string; children: ReactNode[] }[] = []
            while (idx < items.length && items[idx].depth === depth && items[idx].ordered === ordered) {
              const sub: { nodes: ReactNode[]; next: number } = { nodes: [], next: idx + 1 }
              if (idx + 1 < items.length && items[idx + 1].depth > depth) {
                const r = renderList(idx + 1, depth + 1)
                sub.nodes = r.nodes
                sub.next = r.next
              }
              batch.push({ text: items[idx].text, children: sub.nodes })
              idx = sub.next
            }
            const Tag = ordered ? 'ol' : 'ul'
            nodes.push(
              <Tag key={`${key}-list-${depth}-${idx}`} className={depth === 0 ? 'my-2 list-disc space-y-1 pl-5' : 'mt-1 list-disc space-y-1 pl-4'}>
                {batch.map((b, j) => (
                  <li key={j}>
                    {renderInline(b.text, `li-${key}-${idx}-${j}`)}
                    {b.children}
                  </li>
                ))}
              </Tag>,
            )
          } else {
            idx++
          }
        }
        return { nodes, next: idx }
      }
      const rendered = renderList(0, 0)
      emit(
        <Fragment key={`${key}-list`}>{rendered.nodes}</Fragment>,
        key,
      )
      key++
      continue
    }

    // Paragraphe simple (peut s'étendre sur plusieurs lignes contiguës)
    const buf: string[] = [line]
    i++
    while (i < lines.length && lines[i].trim() !== '' && !/^(#{1,4})\s+/.test(lines[i]) && !lines[i].trim().startsWith('```') && !isTableRow(lines[i]) && !/^\s*[-*]\s+/.test(lines[i]) && !/^\s*\d+[.)]\s+/.test(lines[i]) && !lines[i].trim().startsWith('> ') && lines[i].trim() !== '---') {
      buf.push(lines[i])
      i++
    }
    emit(
      <p key={`${key}-p`} className="my-2 text-sm leading-relaxed text-neutral-700">
        {renderInline(buf.join(' '), `p-${key}`)}
      </p>,
      key,
    )
    key++
  }

  return out
}

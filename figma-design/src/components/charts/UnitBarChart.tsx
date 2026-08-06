export interface UnitBarDatum {
  id?: string
  label: string
  value: number
}

export function UnitBarChart({
  data,
  unit = '',
  className = '',
  hoveredId,
  onHovered,
}: {
  data: UnitBarDatum[]
  unit?: string
  className?: string
  hoveredId?: string | null
  onHovered?: (id: string | null) => void
}) {
  if (data.length === 0) return null
  const max = Math.max(...data.map((d) => d.value), 1)
  return (
    <div className={className}>
      <svg viewBox={`0 0 ${data.length * 40} 90`} className="w-full" preserveAspectRatio="none" role="img" aria-label="Valeurs par unité">
        <rect width="1000" height="90" fill="#fafafa" />
        {[30, 60].map((y) => (
          <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#ececec" strokeWidth="1" />
        ))}
        {data.map((d, i) => {
          const h = Math.max(4, (d.value / max) * 60)
          const isHover = d.id != null && d.id === hoveredId
          return (
            <rect
              key={i}
              x={i * 40 + 8}
              y={84 - h}
              width={24}
              height={h}
              rx="3"
              fill={isHover ? '#2563eb' : '#93c5fd'}
              onMouseEnter={() => d.id && onHovered?.(d.id)}
              onMouseLeave={() => d.id && onHovered?.(null)}
              style={{ cursor: d.id ? 'pointer' : 'default' }}
            />
          )
        })}
      </svg>
      <div className="flex justify-between gap-1 overflow-hidden text-[9px] text-neutral-400">
        {data.map((d, i) => (
          <span
            key={i}
            className={`truncate ${d.id === hoveredId ? 'font-semibold text-blue-700' : ''}`}
            title={`${d.label} : ${d.value} ${unit}`}
            onMouseEnter={() => d.id && onHovered?.(d.id)}
            onMouseLeave={() => d.id && onHovered?.(null)}
          >
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

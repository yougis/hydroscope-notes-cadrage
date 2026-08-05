export interface UnitBarDatum {
  label: string
  value: number
}

export function UnitBarChart({ data, unit = '', className = '' }: { data: UnitBarDatum[]; unit?: string; className?: string }) {
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
          return (
            <rect key={i} x={i * 40 + 8} y={84 - h} width={24} height={h} rx="3" fill="#93c5fd" />
          )
        })}
      </svg>
      <div className="flex justify-between gap-1 overflow-hidden text-[9px] text-neutral-400">
        {data.map((d, i) => (
          <span key={i} className="truncate" title={`${d.label} : ${d.value} ${unit}`}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  )
}

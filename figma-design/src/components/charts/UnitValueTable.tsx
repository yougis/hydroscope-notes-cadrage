export interface UnitValueDatum {
  label: string
  sub?: string
  value: number
}

export function UnitValueTable({ data, unit = '', className = '' }: { data: UnitValueDatum[]; unit?: string; className?: string }) {
  if (data.length === 0) return null
  return (
    <div className={`overflow-hidden rounded-md border border-neutral-200 ${className}`}>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-neutral-50 text-[9px] uppercase tracking-wide text-neutral-400">
            <th className="border-b border-neutral-200 px-2 py-1 font-medium">Unité</th>
            <th className="border-b border-neutral-200 px-2 py-1 text-right font-medium">Valeur {unit}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label} className="border-b border-neutral-100 last:border-0">
              <td className="px-2 py-1">
                <div className="text-[11px] font-medium text-neutral-700">{d.label}</div>
                {d.sub && <div className="text-[9px] text-neutral-400">{d.sub}</div>}
              </td>
              <td className="px-2 py-1 text-right text-[11px] font-semibold tabular-nums text-neutral-800">
                {d.value.toLocaleString('fr-FR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

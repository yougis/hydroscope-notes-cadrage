export function IndicateursStub() {
  const rows = [
    ['308', 'Autres IOTA', 'Nombre', 'oui'],
    ['500', 'BBR', 'Classe', 'oui'],
    ['200', 'Surface brûlée', 'ha', 'oui'],
    ['201', 'Surface érosion', 'ha', 'oui'],
    ['301', 'Zone d’exploitation minière', 'ha', 'oui'],
    ['105', 'Occupation sol (couvert végétal)', 'ha', 'oui'],
  ]
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-400">Rechercher un indicateur…</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">Thématique</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">Unité</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">Actif</span>
      </div>
      <div className="overflow-hidden rounded-md border border-neutral-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-50 text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-3 py-2 font-medium">ID</th>
              <th className="px-3 py-2 font-medium">Nom</th>
              <th className="px-3 py-2 font-medium">Unité</th>
              <th className="px-3 py-2 font-medium">Actif</th>
              <th className="px-3 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-neutral-700">
            {rows.map((r) => (
              <tr key={r[0]} className="hover:bg-neutral-50">
                <td className="px-3 py-2 text-neutral-500">{r[0]}</td>
                <td className="px-3 py-2 font-medium">{r[1]}</td>
                <td className="px-3 py-2 text-neutral-500">{r[2]}</td>
                <td className="px-3 py-2">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {r[3]}
                  </span>
                </td>
                <td className="px-3 py-2 text-right text-xs text-blue-600">Fiche</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <span className="text-xs text-neutral-400">40 indicateurs · catalogue de fiches descriptives</span>
    </div>
  )
}
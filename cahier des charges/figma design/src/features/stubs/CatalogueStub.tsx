export function CatalogueStub() {
  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="flex-1 rounded-md border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-400">Rechercher un jeu de données…</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">Source / dérivé</span>
        <span className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs text-neutral-600">Statut</span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-4">
        {[
          ['Captages d’eau', 'GEOREP · DAVAR', 'Disponible'],
          ['Zones potentiellement brûlées (VIIRS)', 'GEOREP · OEIL', 'Disponible'],
          ['Occupation du sol (Dynamic World)', 'GEE API', 'Disponible'],
          ['Espèces envahissantes', 'ANCB', 'Pas d’API'],
          ['Surface brûlée (dérivé)', 'Pipeline dbt', 'Dérivé'],
          ['Pluviométrie — Météo France', 'GEOREP', 'Disponible'],
        ].map((d) => (
          <div key={d[0]} className="rounded-md border border-neutral-200 bg-white p-3">
            <span className="block text-sm font-medium text-neutral-800">{d[0]}</span>
            <span className="mt-1 block text-xs text-neutral-500">{d[1]}</span>
            <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] text-emerald-700">{d[2]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
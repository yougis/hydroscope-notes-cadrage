import { WireframeBlock } from '@/components/ui/WireframeBlock'

export function ConnexionStub() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-80 space-y-3 rounded-md border border-neutral-200 bg-white p-6 shadow-sm">
        <span className="block text-center text-sm font-semibold text-neutral-800">Connexion à HydroScope</span>
        <WireframeBlock label="Identifiant" className="h-9 w-full" />
        <WireframeBlock label="Mot de passe" className="h-9 w-full" />
        <span className="block rounded-md bg-blue-600 py-2 text-center text-sm font-medium text-white">Se connecter</span>
        <span className="block text-center text-xs text-neutral-400">SSO / annuaire institutionnel (intégration à confirmer)</span>
      </div>
    </div>
  )
}
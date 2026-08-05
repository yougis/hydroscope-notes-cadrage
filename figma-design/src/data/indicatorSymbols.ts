import type { LucideIcon } from 'lucide-react'
import {
  Gauge, Users, BadgeCheck, HeartPulse, Network, Box, FlaskConical, FileCheck2,
  ShieldCheck, Lock, Link, Drill, Trees, TreePine, Landmark, Mountain, Bird,
  Sprout, Wheat, Factory, Pickaxe, Building2, Home, Waypoints, Signpost,
  Map, Droplets, Flame, MountainSnow, CircleOff, TriangleAlert, Layers3, Droplet,
  Torus, CloudRain, Waves,
} from 'lucide-react'

/** Mappage id d'indicateur → pictogramme lucide + classe de couleur d'accent. */
export const INDICATOR_SYMBOLS: Record<string, IndicatorSymbolMap> = {
  // ── Enjeux AEP · Importance unité de gestion ──
  'ind:1': { icon: Gauge, color: 'text-blue-500' },
  'ind:6': { icon: Users, color: 'text-sky-500' },
  'ind:10': { icon: BadgeCheck, color: 'text-teal-500' },
  'ind:12': { icon: HeartPulse, color: 'text-rose-500' },
  // ── Enjeux AEP · Niveau infrastructures ──
  'ind:2': { icon: Network, color: 'text-cyan-500' },
  'ind:3': { icon: Box, color: 'text-amber-500' },
  // ── Enjeux AEP · Sécurité sanitaire & règlementaire ──
  'ind:4': { icon: FlaskConical, color: 'text-violet-500' },
  'ind:7': { icon: FileCheck2, color: 'text-blue-500' },
  'ind:8': { icon: ShieldCheck, color: 'text-emerald-500' },
  'ind:11': { icon: Lock, color: 'text-orange-500' },
  // ── Enjeux AEP · Vulnérabilité structurelle ──
  'ind:5': { icon: Link, color: 'text-purple-500' },
  'ind:9': { icon: Drill, color: 'text-slate-500' },
  // ── Enjeux Environnementaux · Zone naturelle ──
  'ind:105': { icon: Trees, color: 'text-green-500' },
  'ind:106': { icon: TreePine, color: 'text-green-600' },
  // ── Enjeux Environnementaux · Zones protégées ──
  'ind:100': { icon: Landmark, color: 'text-amber-500' },
  'ind:101': { icon: Mountain, color: 'text-blue-500' },
  'ind:102': { icon: Bird, color: 'text-sky-500' },
  'ind:104': { icon: Sprout, color: 'text-green-500' },
  // ── Menaces Anthropiques · Activités à risque ──
  'ind:107': { icon: Wheat, color: 'text-yellow-500' },
  'ind:300': { icon: Factory, color: 'text-red-500' },
  'ind:301': { icon: Pickaxe, color: 'text-orange-500' },
  'ind:308': { icon: Mountain, color: 'text-amber-500' },
  // ── Menaces Anthropiques · Infrastructures & usages ──
  'ind:302': { icon: Building2, color: 'text-slate-500' },
  'ind:304': { icon: Home, color: 'text-blue-500' },
  'ind:305': { icon: Waypoints, color: 'text-fuchsia-500' },
  'ind:306': { icon: Signpost, color: 'text-gray-500' },
  'ind:307': { icon: Map, color: 'text-blue-600' },
  'ind:503': { icon: Droplets, color: 'text-cyan-500' },
  'ind:504': { icon: Waves, color: 'text-blue-600' },
  // ── Menaces Naturelles · Perturbations environnementales ──
  'ind:200': { icon: Flame, color: 'text-orange-500' },
  'ind:201': { icon: MountainSnow, color: 'text-stone-500' },
  'ind:202': { icon: CircleOff, color: 'text-stone-500' },
  'ind:204': { icon: TriangleAlert, color: 'text-lime-500' },
  // ── Menaces Naturelles · Sensibilité naturelle ──
  'ind:203': { icon: TriangleAlert, color: 'text-yellow-500' },
  'ind:401': { icon: Layers3, color: 'text-purple-500' },
  'ind:402': { icon: Droplet, color: 'text-blue-500' },
  'ind:500': { icon: Torus, color: 'text-teal-500' },
  'ind:501': { icon: CloudRain, color: 'text-sky-500' },
}

export interface IndicatorSymbolMap {
  icon: LucideIcon
  color: string
}

/** Symbole décoratif (pictogramme lucide + couleur d'accent) pour un indicateur. */
export function getIndicatorSymbol(id: string): { icon: LucideIcon; color: string } {
  return INDICATOR_SYMBOLS[id] ?? { icon: CircleOff, color: 'text-neutral-400' }
}
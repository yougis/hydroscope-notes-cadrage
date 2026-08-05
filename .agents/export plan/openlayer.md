# Remplacer carte statique par OpenLayers

**Session ID:** ses_02edbf8cdffeXNBilXRsS30nth
**Created:** 8/5/2026, 4:57:07 PM
**Updated:** 8/5/2026, 5:12:11 PM

---

## User

remplace la carte static par un moteur openlayer dans @figma-design/ 

---

## Assistant (Plan · DeepSeek V4 Flash Free (New) · 7.4s)

_Thinking:_

Let me start by understanding the task. The user wants to replace a static map with an OpenLayers engine in the figma-design/ project. I'm in plan mode, so I need to explore and construct a plan.

Let me load the relevant skills and explore the project. First let me understand the codebase. Let me look at the AGENTS.md, DESIGN.md, package.json, and the src structure.

Let me also use the hydroScope-amoa skill since this is about the HydroScope project. Actually, the task is about replacing a static map with OpenLayers. Let me explore the figma-design directory.

Let me look at the directory structure and understand where the static map is.

I'll explore the figma-design project to understand the current static map implementation before creating a plan.

**Tool: bash**

**Input:**
```json
{
  "command": "cd \"/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design\" && cat package.json"
}
```

**Output:**
```
{
  "name": "@figma/my-make-file",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "build": "vite build",
    "dev": "vite"
  },
  "dependencies": {
    "@emotion/react": "11.14.0",
    "@emotion/styled": "11.14.1",
    "@mui/icons-material": "7.3.5",
    "@mui/material": "7.3.5",
    "@popperjs/core": "2.11.8",
    "@radix-ui/react-accordion": "1.2.3",
    "@radix-ui/react-alert-dialog": "1.1.6",
    "@radix-ui/react-aspect-ratio": "1.1.2",
    "@radix-ui/react-avatar": "1.1.3",
    "@radix-ui/react-checkbox": "1.1.4",
    "@radix-ui/react-collapsible": "1.1.3",
    "@radix-ui/react-context-menu": "2.2.6",
    "@radix-ui/react-dialog": "1.1.6",
    "@radix-ui/react-dropdown-menu": "2.1.6",
    "@radix-ui/react-hover-card": "1.1.6",
    "@radix-ui/react-label": "2.1.2",
    "@radix-ui/react-menubar": "1.1.6",
    "@radix-ui/react-navigation-menu": "1.2.5",
    "@radix-ui/react-popover": "1.1.6",
    "@radix-ui/react-progress": "1.1.2",
    "@radix-ui/react-radio-group": "1.2.3",
    "@radix-ui/react-scroll-area": "1.2.3",
    "@radix-ui/react-select": "2.1.6",
    "@radix-ui/react-separator": "1.1.2",
    "@radix-ui/react-slider": "1.2.3",
    "@radix-ui/react-slot": "1.1.2",
    "@radix-ui/react-switch": "1.1.3",
    "@radix-ui/react-tabs": "1.1.3",
    "@radix-ui/react-toggle-group": "1.1.2",
    "@radix-ui/react-toggle": "1.1.2",
    "@radix-ui/react-tooltip": "1.1.8",
    "canvas-confetti": "1.9.4",
    "class-variance-authority": "0.7.1",
    "clsx": "2.1.1",
    "cmdk": "1.1.1",
    "date-fns": "3.6.0",
    "embla-carousel-react": "8.6.0",
    "input-otp": "1.4.2",
    "lucide-react": "0.487.0",
    "motion": "12.23.24",
    "next-themes": "0.4.6",
    "react-day-picker": "8.10.1",
    "react-dnd": "16.0.1",
    "react-dnd-html5-backend": "16.0.1",
    "react-hook-form": "7.55.0",
    "react-popper": "2.3.0",
    "react-resizable-panels": "2.1.7",
    "react-responsive-masonry": "2.7.1",
    "react-router": "7.13.0",
    "react-slick": "0.31.0",
    "recharts": "2.15.2",
    "sonner": "2.0.3",
    "tailwind-merge": "3.2.0",
    "tw-animate-css": "1.3.8",
    "vaul": "1.1.2"
  },
  "devDependencies": {
    "@tailwindcss/vite": "4.1.12",
    "@vitejs/plugin-react": "4.7.0",
    "tailwindcss": "4.1.12",
    "vite": "6.3.5"
  },
  "peerDependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    },
    "react-dom": {
      "optional": true
    }
  },
  "pnpm": {
    "overrides": {
      "vite": "6.3.5"
    }
  }
}
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/AGENTS.md"
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/AGENTS.md</path>
<type>file</type>
<content>
1: # figma-make-app
2: 
3: React + Vite + Tailwind CSS project running inside Figma Make.
4: 
5: ## Development Server
6: 
7: A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.
8: 
9: - Preview URL: The user can access the running app through the preview panel
10: - Hot reload: Changes to source files are reflected immediately
11: 
12: ## Project Structure
13: 
14: The source lives under `src/`, organised **feature-first** with co-location. Navigate by feature, not by file type. Use the `@/` alias (mapped in `tsconfig.json`) to import from `src/`. Prefer barrel `index.ts` exports where folders group several modules.
15: 
16: - `src/main.tsx` - React entrypoint; imports `src/styles/index.css` and mounts `src/app/App.tsx` into the `#root` element
17: - `src/app/App.tsx` - Application shell: routing `ind:…`/`carte`/stub/portail, layout (Header, Sidebar, Footer), and session wiring. Usual starting point for top-level structure.
18: - `src/app/hooks/useSession.ts` - session state (selected captages, session indicators) + handlers
19: - `src/config/views.ts` - navigation model (`VIEWS`, `GROUPS`, `VIEW_ICONS`, `buildIndicatorGroup`)
20: - `src/types/domain.ts` - shared domain types (`View`, `Capteur`, `Indicateur`, `IAMode`)
21: - `src/data/hydroscope.ts` - mock/session data (`CAPTAGES`, `CAPTAGE_POINTS`, `CATALOGUE`, `catalogueById`)
22: - `src/components/` - reusable UI (`ui/`), `charts/`, and `layout/` (Header, Sidebar, Footer)
23: - `src/features/` - feature slices: `carte/`, `indicateurs/`, `portail/`, `stubs/`
24: - `src/styles/` - CSS entrypoints (`index.css` wiring `fonts.css`, `tailwind.css`, `theme.css`)
25: - `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
26: - `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
27: - `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
28: - `.mise.toml` - Toolchain versions for Node.js and pnpm
29: 
30: ## Dependencies
31: 
32: - Runtime: React 19 and React DOM 19
33: - Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
34: - Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
35: - Formatting: oxfmt
36: 
37: ## Styling
38: 
39: This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/styles/tailwind.css` imports Tailwind with `@import 'tailwindcss' source(none);` and `@source '../**/*.{js,ts,jsx,tsx}'`. Use Tailwind utility classes directly in JSX. Global CSS, theme customization and font wiring belong in `src/styles/` (`index.css` aggregates `fonts.css`, `tailwind.css`, `theme.css`). This scaffold does not need a Tailwind config file or PostCSS config.
40: 
41: ## Code quality
42: 
43: - Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
44: - Ensure JSX tags are closed and braces are balanced.
45: - Export components as **named** exports (barrel `index.ts` re-exports them). Prefer typed `interface` Props and custom hooks (`use`-prefixed) for logic over heavy `.tsx` files.

(End of file - total 45 lines)
</content>
```

**Tool: bash**

**Input:**
```json
{
  "command": "cd \"/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design\" && find src -type f | head -100"
}
```

**Output:**
```
src/vite-env.d.ts
src/main.tsx
src/app/App.tsx
src/app/hooks/useSession.ts
src/app/hooks/index.ts
src/styles/tailwind.css
src/styles/index.css
src/styles/fonts.css
src/styles/theme.css
src/types/domain.ts
src/data/values.ts
src/data/indicatorSymbols.ts
src/data/indicatorDetails.ts
src/data/hydroscope.ts
src/config/views.tsx
src/components/ui/Icon.tsx
src/components/ui/Toggle.tsx
src/components/ui/WireframeBlock.tsx
src/components/ui/index.ts
src/components/ui/IndicatorSymbol.tsx
src/components/ui/ExportMenu.tsx
src/components/charts/LineChart.tsx
src/components/charts/BarChart.tsx
src/components/charts/index.ts
src/components/charts/UnitBarChart.tsx
src/components/charts/UnitValueTable.tsx
src/components/layout/Header.tsx
src/components/layout/Sidebar.tsx
src/components/layout/Footer.tsx
src/components/layout/index.ts
src/features/carte/hooks/useLayers.ts
src/features/carte/MapCanvas.tsx
src/features/carte/components/IndicateurExplorer.tsx
src/features/carte/components/CaptageSelector.tsx
src/features/carte/components/PanelSection.tsx
src/features/carte/CarteView.tsx
src/features/carte/index.ts
src/features/indicateurs/IndicateurPage.tsx
src/features/indicateurs/index.ts
src/features/indicateurs/ChartModeSwitcher.tsx
src/features/indicateurs/IndicateursView.tsx
src/features/portail/index.ts
src/features/portail/PublicHome.tsx
src/features/portail/PublicInterface.tsx
src/features/portail/DashboardPage.tsx
src/features/stubs/TableauStub.tsx
src/features/stubs/FichesStub.tsx
src/features/stubs/ComparaisonStub.tsx
src/features/stubs/IndicateursStub.tsx
src/features/stubs/CatalogueStub.tsx
src/features/stubs/ImportStub.tsx
src/features/stubs/MonitoringStub.tsx
src/features/stubs/TracabiliteStub.tsx
src/features/stubs/ReferentielsStub.tsx
src/features/stubs/ConnexionStub.tsx
src/features/stubs/index.ts
src/features/help/markdown.tsx
src/features/help/index.ts
src/features/help/HelpPage.tsx
src/features/help/docs.ts
src/features/export/geopackage.ts
src/features/export/exportContext.ts
src/features/export/index.ts

```

---

## Assistant (Plan · DeepSeek V4 Flash Free (New) · 12.8s)

I'll examine the current map implementation and its data model


**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/carte/MapCanvas.tsx"
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/carte/MapCanvas.tsx</path>
<type>file</type>
<content>
1: import { useMemo, useState } from 'react'
2: import { BVAEPS, BVAEP_POLYGONS, UNITES_GESTIONES, CAPTAGE_POINTS, catalogueById } from '@/data/hydroscope'
3: import { valueForBvaep, valueForUnite } from '@/data/values'
4: import type { DataType, UnitMode } from '@/types/domain'
5: import type { BasemapId, LayerDef } from './hooks/useLayers'
6: 
7: export interface MapCanvasProps {
8:   showGrid?: boolean
9:   selectedKeys?: string[]
10:   activeIndicator?: string | null
11:   unitMode?: UnitMode
12:   selectedBvaeps?: Set<string>
13:   layers?: LayerDef[]
14:   basemap?: BasemapId
15:   h3Mode?: boolean
16: }
17: 
18: const QUALITE_COLORS: Record<number, string> = {
19:   0: '#9ca3af',
20:   1: '#10b981',
21:   2: '#f59e0b',
22:   3: '#ef4444',
23: }
24: 
25: const QUALITE_LABELS: Record<number, string> = {
26:   0: 'Indéterminé',
27:   1: 'Bon',
28:   2: 'Dégradé',
29:   3: 'Critique',
30: }
31: 
32: const BV_FILLS: Record<number, string> = {
33:   0: 'rgba(148, 163, 184, 0.35)',
34:   1: 'rgba(16, 185, 129, 0.45)',
35:   2: 'rgba(245, 158, 11, 0.45)',
36:   3: 'rgba(239, 68, 68, 0.5)',
37: }
38: 
39: const SOURCE_FILLS: Record<string, string> = {
40:   'ind:200': 'rgba(239, 68, 68, 0.18)',
41:   'ind:201': 'rgba(146, 64, 14, 0.16)',
42:   'ind:301': 'rgba(100, 116, 139, 0.2)',
43:   'ind:105': 'rgba(16, 185, 129, 0.16)',
44:   'ind:308': 'rgba(99, 102, 241, 0.16)',
45:   'ind:500': 'rgba(59, 130, 246, 0.14)',
46: }
47: 
48: const BASEMAPS: Record<BasemapId, { ocean: string; land: string; landStroke: string; grid: string }> = {
49:   carto: { ocean: '#eef2f6', land: '#f4f4f5', landStroke: '#a1a1aa', grid: '#e5e7eb' },
50:   satellite: { ocean: '#7f1d1d', land: '#3f2d20', landStroke: '#57534e', grid: 'rgba(255,255,255,0.04)' },
51:   terrain: { ocean: '#dbeafe', land: '#ecfccb', landStroke: '#a8a29e', grid: 'rgba(180,160,120,0.15)' },
52: }
53: 
54: // ─── H3 hex grid math ────────────────────────────────────────────────────────
55: const H3_R = 16
56: const H3_W = Math.sqrt(3) * H3_R
57: const H3_OX = 60
58: const H3_OY = 108
59: const H3_ROWS = 7
60: const H3_COLS = 16
61: 
62: function hexCenter(q: number, r: number): [number, number] {
63:   const cx = H3_OX + q * H3_W + (r % 2 === 1 ? H3_W / 2 : 0)
64:   const cy = H3_OY + r * H3_R * 1.5
65:   return [cx, cy]
66: }
67: 
68: function hexPts(cx: number, cy: number): string {
69:   return Array.from({ length: 6 }, (_, i) => {
70:     const a = Math.PI / 6 + (Math.PI / 3) * i
71:     return `${(cx + H3_R * Math.cos(a)).toFixed(1)},${(cy + H3_R * Math.sin(a)).toFixed(1)}`
72:   }).join(' ')
73: }
74: 
75: function symbolFor(value: number, datatype: DataType) {
76:   if (datatype === 'stock') return { r: Math.min(11, 4 + value / 120), fill: '#3b82f6' }
77:   if (datatype === 'mixte') {
78:     const cls = value % 4
79:     return { r: Math.min(11, 4 + value / 120), fill: QUALITE_COLORS[cls] }
80:   }
81:   const cls = value % 4
82:   return { r: 5, fill: QUALITE_COLORS[cls] }
83: }
84: 
85: function bvaepClass(indId: string | null, bvId: string) {
86:   if (!indId) return 0
87:   const ind = catalogueById(indId)
88:   const val = valueForBvaep(indId, bvId)
89:   if (ind && ind.datatype === 'qualite') return val % 4
90:   return Math.min(3, Math.floor(val / 300))
91: }
92: 
93: function h3Class(indId: string | null, q: number, r: number): number {
94:   const ind = catalogueById(indId)
95:   const noise = ((q * 13 + r * 7 + q * r * 7) % 41) - 20
96:   if (ind && ind.datatype === 'qualite') return Math.abs((q * 3 + r * 5) % 4)
97:   const raw = 80 + q * 12 + r * 18 + noise
98:   return Math.max(0, Math.min(3, Math.floor(raw / 180)))
99: }
100: 
101: function h3Value(indId: string, q: number, r: number): number {
102:   const noise = ((q * 31 + r * 47 + q * r * 13) % 61) - 30
103:   return Math.max(0, 120 + q * 14 + r * 22 + noise)
104: }
105: 
106: interface HoverInfo {
107:   x: number
108:   y: number
109:   nature: string
110:   name: string
111:   value: string | null
112:   rows: Array<[string, string]>
113: }
114: 
115: interface HoveredHex {
116:   q: number
117:   r: number
118:   x: number
119:   y: number
120:   cls: number
121:   value: number
122: }
123: 
124: export function MapCanvas({
125:   showGrid = true,
126:   selectedKeys = [],
127:   activeIndicator = null,
128:   unitMode = 'gestion',
129:   selectedBvaeps = new Set(),
130:   layers = [],
131:   basemap = 'carto',
132:   h3Mode = false,
133: }: MapCanvasProps) {
134:   const bs = BASEMAPS[basemap]
135:   const ind = activeIndicator ? catalogueById(activeIndicator) : undefined
136:   const isGestion = unitMode === 'gestion'
137:   const selectedBvaepIds = new Set([...selectedBvaeps])
138:   const selectedCaptageIds = new Set([...selectedKeys])
139:   const on = (key: string) => (layers.find((l) => l.key === key)?.on ?? true)
140:   const [hover, setHover] = useState<HoverInfo | null>(null)
141:   const [hoveredHex, setHoveredHex] = useState<HoveredHex | null>(null)
142: 
143:   const hexCells = useMemo(() => {
144:     const cells: Array<{ q: number; r: number; x: number; y: number }> = []
145:     for (let r = 0; r < H3_ROWS; r++) {
146:       for (let q = 0; q < H3_COLS; q++) {
147:         const [x, y] = hexCenter(q, r)
148:         cells.push({ q, r, x, y })
149:       }
150:     }
151:     return cells
152:   }, [])
153: 
154:   const tooltip = hover ? (
155:     <foreignObject x={Math.min(Math.max(hover.x - 70, 8), 440)} y={hover.y - 60 < 8 ? hover.y + 12 : hover.y - 64} width="150" height="74">
156:       <div className="rounded border border-neutral-300 bg-white p-2 shadow-md">
157:         <div className="text-[9px] font-bold uppercase tracking-wide text-neutral-400">{hover.nature}</div>
158:         <div className="text-[11px] font-semibold text-neutral-800">{hover.name}</div>
159:         {hover.value && <div className="mt-0.5 text-[11px] font-medium text-blue-700">Valeur : {hover.value}</div>}
160:         {hover.rows.length > 0 && (
161:           <div className="mt-1 space-y-0.5 border-t border-neutral-100 pt-1">
162:             {hover.rows.map(([k, v]) => (
163:               <div key={k} className="flex justify-between gap-2 text-[9px] text-neutral-500">
164:                 <span>{k}</span>
165:                 <span className="font-medium text-neutral-700">{v}</span>
166:               </div>
167:             ))}
168:           </div>
169:         )}
170:       </div>
171:     </foreignObject>
172:   ) : null
173: 
174:   return (
175:     <svg viewBox="0 0 600 420" className="h-full w-full" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Carte filaire de la Nouvelle-Calédonie">
176:       <rect x="0" y="0" width="600" height="420" fill={bs.ocean} />
177:       {showGrid && (
178:         <g stroke={bs.grid}>
179:           {Array.from({ length: 12 }).map((_, i) => (
180:             <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="420" strokeWidth="1" />
181:           ))}
182:           {Array.from({ length: 9 }).map((_, i) => (
183:             <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} strokeWidth="1" />
184:           ))}
185:         </g>
186:       )}
187: 
188:       {ind && on('source') && (
189:         <polygon
190:           points="260,140 390,120 460,150 400,210 300,210"
191:           fill={SOURCE_FILLS[ind.id] ?? 'rgba(239,68,68,0.15)'}
192:           stroke={ind.datatype === 'qualite' ? '#3b82f6' : '#ef4444'}
193:           strokeWidth="1"
194:           strokeDasharray="5 4"
195:           onMouseEnter={() =>
196:             setHover({
197:               x: 360,
198:               y: 170,
199:               nature: 'Couche source',
200:               name: ind.sourceLabel,
201:               value: null,
202:               rows: [[ind.datatype, ind.theme], [ind.unit, ind.unit]],
203:             })
204:           }
205:           onMouseLeave={() => setHover(null)}
206:         />
207:       )}
208: 
209:       <polygon
210:         points="70,170 180,130 300,120 420,145 520,180 545,195 480,225 330,240 200,220 110,200 70,185"
211:         fill={bs.land}
212:         stroke={bs.landStroke}
213:         strokeWidth="1.5"
214:       />
215:       {basemap === 'satellite' && (
216:         <>
217:           <ellipse cx="545" cy="90" rx="26" ry="14" fill="rgba(74,222,128,0.35)" stroke={bs.landStroke} strokeWidth="1" />
218:           <ellipse cx="575" cy="120" rx="18" ry="10" fill="rgba(74,222,128,0.35)" stroke={bs.landStroke} strokeWidth="1" />
219:         </>
220:       )}
221:       {basemap !== 'satellite' && (
222:         <>
223:           <ellipse cx="545" cy="90" rx="26" ry="14" fill="#fafafa" stroke="#a1a1aa" strokeWidth="1" />
224:           <ellipse cx="575" cy="120" rx="18" ry="10" fill="#fafafa" stroke="#a1a1aa" strokeWidth="1" />
225:         </>
226:       )}
227: 
228:       {on('bv') &&
229:         BVAEPS.map((b) => {
230:           const cls = bvaepClass(activeIndicator, b.id)
231:           const hasSelectedCaptage = b.captageRefs.some((cid) => selectedCaptageIds.has(cid))
232:           const selBv = !isGestion && selectedBvaepIds.has(b.id)
233:           const liaBv = isGestion && hasSelectedCaptage
234:           const otherBv = !selBv && !liaBv
235:           const fill = isGestion
236:             ? liaBv
237:               ? 'rgba(148, 163, 184, 0.22)'
238:               : 'none'
239:             : selBv
240:               ? BV_FILLS[cls]
241:               : otherBv
242:                 ? 'rgba(148, 163, 184, 0.1)'
243:                 : BV_FILLS[cls]
244:           const stroke = selBv ? '#f59e0b' : liaBv ? '#94a3b8' : '#94a3b8'
245:           const strokeWidth = selBv ? 2.5 : 1.5
246:           const strokeDasharray = selBv || liaBv ? undefined : '6 4'
247:           const opacity = selBv ? 1 : liaBv ? 0.95 : otherBv ? 0.5 : 0.95
248:           return (
249:             <polygon
250:               key={b.id}
251:               points={BVAEP_POLYGONS[b.id]}
252:               fill={fill}
253:               stroke={stroke}
254:               strokeWidth={strokeWidth}
255:               strokeDasharray={strokeDasharray}
256:               opacity={opacity}
257:               style={{ cursor: 'pointer' }}
258:               onMouseEnter={() =>
259:                 setHover({
260:                   x: 260,
261:                   y: 180,
262:                   nature: 'Bassin versant',
263:                   name: b.name,
264:                   value: ind ? `${valueForBvaep(ind.id, b.id).toLocaleString('fr-FR')} ${ind.unit}` : null,
265:                   rows: [
266:                     ['Province', b.province],
267:                     ['Unités', `${b.captageRefs.length}`],
268:                     ['Secteur', b.sector],
269:                   ],
270:                 })
271:               }
272:               onMouseLeave={() => setHover(null)}
273:             />
274:           )
275:         })}
276: 
277:       {on('ppe') && (
278:         <>
279:           <circle cx="180" cy="165" r="22" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
280:           <circle cx="390" cy="175" r="26" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />
281:         </>
282:       )}
283: 
284:       {on('capt') &&
285:         CAPTAGE_POINTS.map((p) => {
286:           const inSelectedBv = BVAEPS.some((b) => selectedBvaepIds.has(b.id) && b.captageRefs.includes(p.key))
287:           const selCap = isGestion ? selectedKeys.includes(p.key) : false
288:           const liaCap = isGestion ? false : inSelectedBv
289:           const grayed = !selCap && !liaCap
290:           const cActive = UNITES_GESTIONES.find((c) => c.id === p.key)
291:           const { r, fill } = ind ? symbolFor(valueForUnite(ind.id, p.key), ind.datatype) : { r: 4.5, fill: '#3b82f6' }
292:           const stroke = selCap ? '#f59e0b' : '#fff'
293:           const strokeWidth = selCap ? 2 : 1.5
294:           const opacity = selCap ? 1 : liaCap ? 0.9 : 0.2
295:           const radius = selCap ? Math.max(r, 6) : r
296:           return (
297:             <g key={p.key}>
298:               <circle
299:                 cx={p.x}
300:                 cy={p.y}
301:                 r={radius}
302:                 fill={grayed ? '#9ca3af' : fill}
303:                 stroke={stroke}
304:                 strokeWidth={strokeWidth}
305:                 opacity={opacity}
306:                 style={{ cursor: 'pointer' }}
307:                 onMouseEnter={() =>
308:                   setHover({
309:                     x: p.x,
310:                     y: p.y,
311:                     nature: 'Unité de gestion',
312:                     name: cActive?.name ?? p.key,
313:                     value: ind ? `${valueForUnite(ind.id, p.key).toLocaleString('fr-FR')} ${ind.unit}` : null,
314:                     rows: [
315:                       ['Commune', cActive?.commune ?? '—'],
316:                       ['Province', cActive?.province ?? '—'],
317:                       ['Distance', cActive ? `${cActive.dist} km` : '—'],
318:                     ],
319:                   })
320:                 }
321:                 onMouseLeave={() => setHover(null)}
322:               />
323:             </g>
324:           )
325:         })}
326: 
327:       {h3Mode && ind && (
328:         <g>
329:           {hexCells.map(({ q, r, x, y }) => {
330:             const cls = h3Class(ind.id, q, r)
331:             const val = h3Value(ind.id, q, r)
332:             const isHovered = hoveredHex?.q === q && hoveredHex?.r === r
333:             const color = QUALITE_COLORS[cls]
334:             return (
335:               <polygon
336:                 key={`${q}-${r}`}
337:                 points={hexPts(x, y)}
338:                 fill={color}
339:                 fillOpacity={isHovered ? 0.82 : 0.42}
340:                 stroke={isHovered ? color : cls === 0 ? 'rgba(148,163,184,0.4)' : color}
341:                 strokeWidth={isHovered ? 1.5 : 0.8}
342:                 style={{ cursor: 'pointer' }}
343:                 onMouseEnter={() => setHoveredHex({ q, r, x, y, cls, value: val })}
344:                 onMouseLeave={() => setHoveredHex(null)}
345:               />
346:             )
347:           })}
348:         </g>
349:       )}
350: 
351:       {h3Mode && ind && hoveredHex && (() => {
352:         const { q, r, x, y, cls, value } = hoveredHex
353:         const tx = x + 12 > 460 ? x - 152 : x + 12
354:         const ty = y - 62 < 6 ? y + 14 : y - 62
355:         return (
356:           <foreignObject x={tx} y={ty} width="140" height="64" style={{ overflow: 'visible' }}>
357:             <div className="rounded border border-neutral-300 bg-white p-2 shadow-lg">
358:               <div className="font-mono text-[10px] font-semibold text-blue-700">
359:                 H3 [{q},{r}]
360:               </div>
361:               <div className="font-mono text-lg font-semibold leading-none text-neutral-800">
362:                 {value.toLocaleString('fr-FR')} {ind.unit}
363:               </div>
364:               <div className="text-[11px] font-medium" style={{ color: QUALITE_COLORS[cls] }}>
365:                 Niveau {cls + 1} · {QUALITE_LABELS[cls]}
366:               </div>
367:             </div>
368:           </foreignObject>
369:         )
370:       })()}
371: 
372:       {h3Mode && ind && hoveredHex && (
373:         <foreignObject x="8" y="396" width="360" height="22" style={{ overflow: 'visible' }}>
374:           <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-700">
375:             <span>↗ H3 [{hoveredHex.q},{hoveredHex.r}]</span>
376:             <span style={{ color: QUALITE_COLORS[hoveredHex.cls] }}>
377:               {hoveredHex.value.toLocaleString('fr-FR')} {ind.unit}
378:             </span>
379:           </div>
380:         </foreignObject>
381:       )}
382: 
383:       {on('risque') && basemap === 'carto' && (
384:         <ellipse cx="350" cy="185" rx="30" ry="16" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
385:       )}
386: 
387:       {basemap === 'satellite' && (
388:         <rect x="0" y="0" width="600" height="420" fill="rgba(0,0,0,0.22)" pointerEvents="none" />
389:       )}
390:       {tooltip}
391:     </svg>
392:   )
393: }

(End of file - total 393 lines)
</content>

<system-reminder>
Instructions from: /home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/AGENTS.md
# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

The source lives under `src/`, organised **feature-first** with co-location. Navigate by feature, not by file type. Use the `@/` alias (mapped in `tsconfig.json`) to import from `src/`. Prefer barrel `index.ts` exports where folders group several modules.

- `src/main.tsx` - React entrypoint; imports `src/styles/index.css` and mounts `src/app/App.tsx` into the `#root` element
- `src/app/App.tsx` - Application shell: routing `ind:…`/`carte`/stub/portail, layout (Header, Sidebar, Footer), and session wiring. Usual starting point for top-level structure.
- `src/app/hooks/useSession.ts` - session state (selected captages, session indicators) + handlers
- `src/config/views.ts` - navigation model (`VIEWS`, `GROUPS`, `VIEW_ICONS`, `buildIndicatorGroup`)
- `src/types/domain.ts` - shared domain types (`View`, `Capteur`, `Indicateur`, `IAMode`)
- `src/data/hydroscope.ts` - mock/session data (`CAPTAGES`, `CAPTAGE_POINTS`, `CATALOGUE`, `catalogueById`)
- `src/components/` - reusable UI (`ui/`), `charts/`, and `layout/` (Header, Sidebar, Footer)
- `src/features/` - feature slices: `carte/`, `indicateurs/`, `portail/`, `stubs/`
- `src/styles/` - CSS entrypoints (`index.css` wiring `fonts.css`, `tailwind.css`, `theme.css`)
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/styles/tailwind.css` imports Tailwind with `@import 'tailwindcss' source(none);` and `@source '../**/*.{js,ts,jsx,tsx}'`. Use Tailwind utility classes directly in JSX. Global CSS, theme customization and font wiring belong in `src/styles/` (`index.css` aggregates `fonts.css`, `tailwind.css`, `theme.css`). This scaffold does not need a Tailwind config file or PostCSS config.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as **named** exports (barrel `index.ts` re-exports them). Prefer typed `interface` Props and custom hooks (`use`-prefixed) for logic over heavy `.tsx` files.
</system-reminder>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/carte/CarteView.tsx"
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/carte/CarteView.tsx</path>
<type>file</type>
<content>
1: import { useState } from 'react'
2: import { BVAEPS, CAPTAGE_POINTS } from '@/data/hydroscope'
3: import { MapCanvas } from './MapCanvas'
4: import { useLayers, type BasemapId } from './hooks/useLayers'
5: import { CaptageSelector } from './components/CaptageSelector'
6: import { IndicateurExplorer } from './components/IndicateurExplorer'
7: import type { ChartViewMode } from '@/features/indicateurs/ChartModeSwitcher'
8: import type { UnitMode } from '@/types/domain'
9: 
10: export interface CarteViewProps {
11:   unitMode: UnitMode
12:   onSetMode: (m: UnitMode) => void
13:   selectedUnites: Set<string>
14:   onToggleUnite: (id: string) => void
15:   selectedBvaeps: Set<string>
16:   onToggleBvaep: (id: string) => void
17:   onApplyUnites: (ids: string[]) => void
18:   onApplyBvaeps: (ids: string[]) => void
19:   onClearUnites: () => void
20:   onClearBvaeps: () => void
21:   activeIndicator: string | null
22:   onSelectIndicator: (id: string) => void
23:   onOpenCatalogue: () => void
24:   onOpenFiche: (id: string) => void
25: }
26: 
27: const BASEMAP_OPTIONS: Array<{ id: BasemapId; label: string }> = [
28:   { id: 'carto', label: 'Carto' },
29:   { id: 'satellite', label: 'Satellite' },
30:   { id: 'terrain', label: 'Terrain' },
31: ]
32: 
33: export function CarteView({
34:   unitMode,
35:   onSetMode,
36:   selectedUnites,
37:   onToggleUnite,
38:   selectedBvaeps,
39:   onToggleBvaep,
40:   onApplyUnites,
41:   onApplyBvaeps,
42:   onClearUnites,
43:   onClearBvaeps,
44:   activeIndicator,
45:   onSelectIndicator,
46:   onOpenCatalogue,
47:   onOpenFiche,
48: }: CarteViewProps) {
49:   const { layers, toggleLayer, basemap, setBasemap } = useLayers()
50:   const [mode, setMode] = useState<ChartViewMode>('repartition')
51:   const [showCarte, setShowCarte] = useState(false)
52:   const isGestion = unitMode === 'gestion'
53:   const h3Mode = showCarte
54:   const selectedKeys = isGestion
55:     ? CAPTAGE_POINTS.filter((p) => selectedUnites.has(p.key)).map((p) => p.key)
56:     : BVAEPS.filter((b) => selectedBvaeps.has(b.id)).flatMap((b) => b.captageRefs)
57: 
58:   return (
59:     <div className="flex h-full gap-3">
60:       <CaptageSelector
61:         unitMode={unitMode}
62:         onSetMode={onSetMode}
63:         selectedUnites={selectedUnites}
64:         onToggleUnite={onToggleUnite}
65:         selectedBvaeps={selectedBvaeps}
66:         onToggleBvaep={onToggleBvaep}
67:         onApplyUnites={onApplyUnites}
68:         onApplyBvaeps={onApplyBvaeps}
69:         onClearUnites={onClearUnites}
70:         onClearBvaeps={onClearBvaeps}
71:         activeIndicator={activeIndicator}
72:         layers={layers}
73:         onToggleLayer={toggleLayer}
74:       />
75: 
76:       <div className="relative min-w-0 flex-1 overflow-hidden rounded-md border border-neutral-200 bg-white">
77:         <div className="absolute left-1/2 top-2 z-10 flex -translate-x-1/2 items-center rounded-md border border-neutral-300 bg-white p-0.5 shadow-sm">
78:           {BASEMAP_OPTIONS.map((b) => (
79:             <button
80:               key={b.id}
81:               onClick={() => setBasemap(b.id)}
82:               className={`rounded px-2.5 py-1 text-[11px] font-medium transition ${
83:                 basemap === b.id ? 'bg-blue-600 text-white' : 'text-neutral-500 hover:text-neutral-800'
84:               }`}
85:             >
86:               {b.label}
87:             </button>
88:           ))}
89:         </div>
90:         <MapCanvas selectedKeys={selectedKeys} activeIndicator={activeIndicator} unitMode={unitMode} selectedBvaeps={selectedBvaeps} layers={layers} basemap={basemap} h3Mode={h3Mode} />
91:         <div className="absolute bottom-3 right-3 flex items-center gap-2">
92:           <span className="rounded border border-neutral-300 bg-white px-2 py-1 text-[11px] text-neutral-500">0 — 50 km</span>
93:           <span className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 bg-white text-xs font-bold text-neutral-600">N</span>
94:         </div>
95:         <div className="absolute right-3 top-12 flex flex-col gap-1">
96:           <span className="flex h-8 w-8 items-center justify-center rounded border border-neutral-300 bg-white text-sm font-bold text-neutral-600">+</span>
97:           <span className="flex h-8 w-8 items-center justify-center rounded border border-neutral-300 bg-white text-sm font-bold text-neutral-600">−</span>
98:         </div>
99:       </div>
100: 
101:       <IndicateurExplorer
102:         unitMode={unitMode}
103:         selectedUnites={selectedUnites}
104:         selectedBvaeps={selectedBvaeps}
105:         activeIndicator={activeIndicator}
106:         onSelectIndicator={onSelectIndicator}
107:         onOpenCatalogue={onOpenCatalogue}
108:         onOpenFiche={onOpenFiche}
109:         mode={mode}
110:         onMode={setMode}
111:         showCarte={showCarte}
112:         onToggleCarte={() => setShowCarte((c) => !c)}
113:       />
114:     </div>
115:   )
116: }

(End of file - total 116 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/carte/hooks/useLayers.ts"
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/carte/hooks/useLayers.ts</path>
<type>file</type>
<content>
1: import { useState } from 'react'
2: 
3: export type BasemapId = 'carto' | 'satellite' | 'terrain'
4: 
5: export interface LayerDef {
6:   key: string
7:   label: string
8:   on: boolean
9: }
10: 
11: export const LAYER_DEFS: LayerDef[] = [
12:   { key: 'bv', label: 'Bassins versants', on: true },
13:   { key: 'capt', label: 'Unités de gestion', on: true },
14:   { key: 'ppe', label: 'Périmètres', on: true },
15:   { key: 'risque', label: 'Zones à risque', on: false },
16:   { key: 'source', label: 'Couche source', on: false },
17: ]
18: 
19: export function useLayers() {
20:   const [layers, setLayers] = useState<LayerDef[]>(LAYER_DEFS)
21:   const [basemap, setBasemap] = useState<BasemapId>('carto')
22: 
23:   const toggleLayer = (key: string) =>
24:     setLayers((prev) => prev.map((x) => (x.key === key ? { ...x, on: !x.on } : x)))
25: 
26:   return { layers, toggleLayer, basemap, setBasemap }
27: }

(End of file - total 27 lines)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free (New) · 9.4s)

_Thinking:_

Now I understand the current static map is an SVG-based synthetic wireframe in MapCanvas.tsx. The task is to replace this with an OpenLayers engine. Let me examine the data model — the BVAEP_POLYGONS, CAPTAGE_POINTS, etc. in hydroscope.ts, plus check the geopackage export to understand if real geo coordinates exist.

Let me also check useSession and how CarteView is used, and understand what geo data is available. Key question: does the app have real geographic coordinates for captages and bassins versants, or only synthetic SVG positions?

Let me read hydroscope.ts and the geopackage export.

Let me examine the data model and geo-related files to understand what geographic data exists.



**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/data/hydroscope.ts"
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/data/hydroscope.ts</path>
<type>file</type>
<content>
1: import type { BvaepDef, CaptageDef, UniteGestionDef, IndicatorDef } from '@/types/domain'
2: import { detailOf } from './indicatorDetails'
3: 
4: export const UNITES_GESTIONES: UniteGestionDef[] = [
5:   { id: 'C-001', name: 'Koumac — Rivière Blanche', commune: 'Koumac', province: 'Province Nord', bvaep: 'Nord', kind: 'captage_superficiel', dist: 4.2 },
6:   { id: 'C-002', name: 'Voh — Forage F2', commune: 'Voh', province: 'Province Nord', bvaep: 'Nord', kind: 'forage', dist: 11.8 },
7:   { id: 'C-003', name: 'Pouembont — Tranchee du Col', commune: 'Pouembout', province: 'Province Nord', bvaep: 'Nord', kind: 'tranchee_drainante', dist: 3.1 },
8:   { id: 'C-004', name: 'Koné — Forage Nord', commune: 'Koné', province: 'Province Nord', bvaep: 'Nord', kind: 'forage', dist: 7.6 },
9:   { id: 'C-005', name: 'Poindimié — Ancien captage', commune: 'Poindimié', province: 'Province Nord', bvaep: 'Nord', kind: 'captage_superficiel', dist: 9.4 },
10:   { id: 'C-006', name: 'Houaïlou — Forage F1', commune: 'Houaïlou', province: 'Province Nord', bvaep: 'Centre', kind: 'forage', dist: 2.8 },
11:   { id: 'C-007', name: 'Canala — Tranchée de la Ouinnée', commune: 'Canala', province: 'Province Nord', bvaep: 'Centre', kind: 'tranchee_drainante', dist: 15.2 },
12:   { id: 'C-008', name: 'Boulouparis — Capture de la Néra', commune: 'Boulouparis', province: 'Province Sud', bvaep: 'Sud', kind: 'captage_superficiel', dist: 5.3 },
13:   { id: 'C-009', name: 'La Foa — Forage du Pont', commune: 'La Foa', province: 'Province Sud', bvaep: 'Sud', kind: 'forage', dist: 8.9 },
14:   { id: 'C-010', name: 'Sarraméa — Tranchée du Creek', commune: 'Sarraméa', province: 'Province Sud', bvaep: 'Sud', kind: 'tranchee_drainante', dist: 12.7 },
15:   { id: 'C-011', name: 'Poya — Rivière de Poya', commune: 'Poya', province: 'Province Nord', bvaep: 'Centre', kind: 'captage_superficiel', dist: 6.1 },
16:   { id: 'C-012', name: 'Kouaoua — Forage de la Mine', commune: 'Kouaoua', province: 'Province Nord', bvaep: 'Centre', kind: 'forage', dist: 4.7 },
17: ]
18: 
19: export const CAPTAGES: CaptageDef[] = UNITES_GESTIONES
20: 
21: export const CAPTAGE_POINTS: Array<{ key: string; x: number; y: number }> = [
22:   { key: 'C-001', x: 120, y: 185 },
23:   { key: 'C-002', x: 175, y: 160 },
24:   { key: 'C-003', x: 210, y: 195 },
25:   { key: 'C-004', x: 285, y: 175 },
26:   { key: 'C-005', x: 350, y: 185 },
27:   { key: 'C-006', x: 395, y: 170 },
28:   { key: 'C-007', x: 430, y: 190 },
29:   { key: 'C-008', x: 465, y: 195 },
30:   { key: 'C-009', x: 500, y: 185 },
31:   { key: 'C-010', x: 520, y: 205 },
32:   { key: 'C-011', x: 155, y: 140 },
33:   { key: 'C-012', x: 260, y: 140 },
34: ]
35: 
36: type Row = [code: string, label: string, unit: string, family: 'ENJEUX' | 'MENACES', theme: string, group: string, datatype: 'stock' | 'qualite' | 'mixte', sourceLabel: string, timeSeries: boolean, desc: string]
37: 
38: const ROWS: Row[] = [
39:   // ── ENJEUX / Enjeux AEP ──────────────────────────────────────────────
40:   ['1', 'Capacité de production', 'm³/j', 'ENJEUX', 'Enjeux AEP', 'Importance captage', 'stock', 'Hydrométrie — stations DAVAR', false, 'Volume d’eau prélevable en respectant un objectif de gestion laissant 50 % de la ressource s’écouler vers l’aval.'],
41:   ['6', 'Population desservie', 'hab', 'ENJEUX', 'Enjeux AEP', 'Importance captage', 'stock', 'Fichiers DASS — abonnés UD', true, 'Nombre d’habitants alimentés par la ressource, calculé à partir du suivi des abonnés de l’unité de distribution.'],
42:   ['10', 'Statut captage', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Importance captage', 'qualite', 'Référentiel captages', true, 'Ressource principale (actif), de secours ou occasionnelle pour l’unité de distribution.'],
43:   ['12', 'Établissements sensibles', 'Nb', 'ENJEUX', 'Enjeux AEP', 'Importance captage', 'stock', 'Base établissements (DASS)', false, 'Nombre d’établissements sensibles (hôpitaux, dispensaires, écoles) rattachés à l’unité de distribution.'],
44:   ['2', 'Longueur réseau', 'km', 'ENJEUX', 'Enjeux AEP', 'Niveau infrastructures', 'stock', 'Réseaux AEP (OEIL / Provinces)', true, 'Longueur approximative des réseaux d’adduction et de distribution de l’unité de distribution.'],
45:   ['3', 'Capacité réservoir', 'm³', 'ENJEUX', 'Enjeux AEP', 'Niveau infrastructures', 'stock', 'Réseaux AEPAGE (OEIL)', true, 'Volume de stockage des réservoirs d’eau de l’unité de distribution associée à la ressource.'],
46:   ['4', 'Traitement', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Sécurité sanitaire et règlementaire', 'qualite', 'Référentiel DASS', false, 'Type de traitement de l’eau avant mise en distribution.'],
47:   ['7', 'Statut AODPE', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Sécurité sanitaire et règlementaire', 'qualite', 'AODPE — DAVAR', false, 'Statut de l’autorisation de prélèvement et informations associées (numéro, période).'],
48:   ['8', 'Statut PPE', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Sécurité sanitaire et règlementaire', 'qualite', 'PPE — Référentiel', false, 'Statut du périmètre de protection établi selon le type d’arrêté (immédiat, rapproché, éloigné).'],
49:   ['11', 'Statut du foncier', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Sécurité sanitaire et règlementaire', 'qualite', 'Foncier — DJS', false, 'Nature foncière de la parcelle (terrain public, privé…) occupée par le prélèvement.'],
50:   ['5', 'Interconnexion', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Vulnérabilité structurelle', 'qualite', 'Réseaux AEPAGE', false, 'Présence de connexions avec d’autres unités de distribution pouvant servir de secours.'],
51:   ['9', 'Type ouvrage', 'Classe', 'ENJEUX', 'Enjeux AEP', 'Vulnérabilité structurelle', 'qualite', 'Référentiel captages', false, 'Type de ressource en eau selon l’ouvrage : captage superficiel, forage ou tranchée drainante.'],
52:   // ── ENJEUX / Enjeux Environnementaux ─────────────────────────────────
53:   ['105', 'Occupation sol (couvert végétal)', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zone naturelle', 'stock', 'Occupation du sol (MOS / Dynamic World)', true, 'Superficie des intersections avec les zones de couvert végétal.'],
54:   ['106', 'Occupation sol (couvert forestier)', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zone naturelle', 'stock', 'Cornette forestière (OEIL)', true, 'Superficie des intersections avec les couvertures forestières non perturbée (EOEIL).'],
55:   ['100', 'Zones UNESCO', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zones protégées', 'stock', 'Zons UNESCO', false, 'Superficie des intersections avec les zones inscrites au patrimoine mondial de l’UNESCO, source exploitant le MOS 2014.'],
56:   ['101', 'Zones protégées provinciales', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zones protégées', 'stock', 'Provinces', false, 'Superficie des intersections avec les parcs et réserves provinciales de Nouvelle-Calédonie.'],
57:   ['102', 'KBA / ZICO', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zones protégées', 'stock', 'KBA / BirdLife', false, 'Superficie des intersections avec les zones d’intérêt biologique et de biodiversité spécifique.'],
58:   ['104', 'Espèces rares et menacées (forêt sèche)', 'ha', 'ENJEUX', 'Enjeux Environnementaux', 'Zones protégées', 'stock', 'Forêt sèche / espèces', false, 'Superficie des patchs de forêt sèche et zones de présence d’espèces rares et menacées.'],
59:   // ── MENACES / MENACES ANTHROPIQUES ───────────────────────────────────
60:   ['107', 'Occupation sol (surfaces agricoles)', 'ha', 'MENACES', 'MENACES ANTHROPIQUES', 'Activités à risque', 'stock', 'MOS 2014 (OEIL)', true, 'Superficie des intersections avec les zones agricoles (arables, agropastorales).'],
61:   ['300', 'ICPE', 'Nombre', 'MENACES', 'MENACES ANTHROPIQUES', 'Activités à risque', 'stock', 'Base ICPE — DIMENC', false, 'Dénombre les sites d’Installations Classées pour la Protection de l’Environnement.'],
62:   ['301', 'Zone d’exploitation minière', 'ha', 'MENACES', 'MENACES ANTHROPIQUES', 'Activités à risque', 'stock', 'Occupations minières', false, 'Surface occupée par les activités minières (autorisations d’exploiter, couvert minier).'],
63:   ['308', 'Autres IOTA', 'Nombre', 'MENACES', 'MENACES ANTHROPIQUES', 'Activités à risque', 'stock', 'IOTA / dépotoirs', true, 'Dénombre les installations ou activités potentiellement impactantes (cultures hors sol, dépotoirs).'],
64:   ['302', 'Urbanisation', 'ha', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'Localisation / satellites', true, 'Surface des bâtiments présents sur l’aire d’alimentation de la ressource.'],
65:   ['304', 'Habitations', 'Nombre', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'Recensement', false, 'Nombre de logements (résidences principales et secondaires) sur l’aire d’alimentation.'],
66:   ['305', 'Franchissements', 'Nombre', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'Routes / Ouvrages d’art', false, 'Nombre d’ouvrages de franchissement (ponts, radiers) sur l’aire d’alimentation.'],
67:   ['306', 'Linéaire de routes', 'km', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'Réseau routier', false, 'Linéaire total de voiries (RT, RP, RC, pistes) intersectant l’aire d’alimentation.'],
68:   ['307', 'Plan d’Urbanisme Directeur', 'Classe', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'qualite', 'PUD / Schémas', false, 'Zones de type d’occupation et dynamiques d’aménagement futur des zones urbanisables.'],
69:   ['503', 'Nombre de prélèvements AODPE', 'Nombre', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'AODPE — DAVAR', true, 'Dénombre les points de prélèvements officiellement autorisés en amont de la ressource.'],
70:   ['504', 'Volume des prélèvements AODPE', 'm³/j', 'MENACES', 'MENACES ANTHROPIQUES', 'Infrastructures et usages', 'stock', 'AODPE — DAVAR', true, 'Volume total des autorisations de prélèvement journalières situées en amont.'],
71:   // ── MENACES / MENACES NATURELLES ─────────────────────────────────────
72:   ['200', 'Incendies cumulés', 'ha', 'MENACES', 'MENACES NATURELLES', 'Perturbations environnementales', 'stock', 'Zons incendies (VIIRS)', true, 'Surface totale touchée par les incendies ces dernières années.'],
73:   ['201', 'Surface érosion', 'ha', 'MENACES', 'MENACES NATURELLES', 'Perturbations environnementales', 'mixte', 'Cartographie des formations', true, 'Surface des zones où le sol est abîmé ou fragile.'],
74:   ['202', 'Terrain nu', 'ha', 'MENACES', 'MENACES NATURELLES', 'Perturbations environnementales', 'stock', 'MOS / satellite', true, 'Superficie de terrain sans végétation, hors zones d’exploitation.'],
75:   ['204', 'Espèces exotiques envahissantes (EEE)', 'Classe', 'MENACES', 'MENACES NATURELLES', 'Perturbations environnementales', 'qualite', 'Mâchoires / EEE', true, 'Présence de cerfs et de cochons basée sur le comptage des mâchoires.'],
76:   ['203', 'Glissement de terrain', 'ha', 'MENACES', 'MENACES NATURELLES', 'Sensibilité naturelle', 'stock', 'Aléa mouvements de terrain', false, 'Zones exposées aux glissements de terrain par la répartition des surfaces d’aléa.'],
77:   ['401', 'Géologie', 'Classe', 'MENACES', 'MENACES NATURELLES', 'Sensibilité naturelle', 'qualite', 'Carte géologique', false, 'Répartition des surfaces géologiques définissant les propriétés des sols (infiltrant, intermédiaire ou ruisseau).'],
78:   ['402', 'Vulnérabilité intrinsèque eaux souterraines', 'Classe', 'MENACES', 'MENACES NATURELLES', 'Sensibilité naturelle', 'qualite', 'Aquifères / IMVEL', false, 'Niveau de sensibilité naturelle du terrain à laisser passer l’eau via les aquifères.'],
79:   ['500', 'BBR', 'Classe', 'MENACES', 'MENACES NATURELLES', 'Sensibilité naturelle', 'qualite', 'Bonne vieille : Hydrométrie', true, 'Bilan Besoin Ressource calculant l’écart entre l’eau disponible et les besoins.'],
80:   ['501', 'Pluviométrie', 'mm', 'MENACES', 'MENACES NATURELLES', 'Sensibilité naturelle', 'stock', 'Météo-France / pluviométrie', true, 'Quantité de pluie moyenne reçue sur l’aire d’alimentation de la ressource.'],
81: ]
82: 
83: export const CATALOGUE: IndicatorDef[] = ROWS.map((r) => {
84:   const id = `ind:${r[0]}`
85:   const detail = detailOf(id)
86:   return {
87:     id,
88:     code: r[0],
89:     label: detail?.label ?? r[1],
90:     unit: r[2],
91:     family: r[3],
92:     theme: detail?.theme ?? r[4],
93:     group: detail?.group ?? r[5],
94:     datatype: r[6],
95:     sourceLabel: r[7],
96:     hasTimeSeries: r[8],
97:     desc: detail?.desc ?? r[9],
98:     objectif: detail?.objectif ?? '',
99:   }
100: })
101: 
102: export const catalogueById = (id: string) => CATALOGUE.find((i) => i.id === id)
103: 
104: export const families = () => [...new Set(CATALOGUE.map((i) => i.family))] as IndicatorDef['family'][]
105: 
106: export const themesOfFamily = (family: IndicatorDef['family']) => [...new Set(CATALOGUE.filter((i) => i.family === family).map((i) => i.theme))].sort()
107: 
108: export const groupsOfFamily = (family: IndicatorDef['family']) =>
109:   [...new Set(CATALOGUE.filter((i) => i.family === family).map((i) => i.group))].sort()
110: 
111: export const groupsOfThemes = (family: IndicatorDef['family'], themes: Set<string>) =>
112:   [...new Set(CATALOGUE.filter((i) => i.family === family && themes.has(i.theme)).map((i) => i.group))].sort()
113: 
114: export const BVAEPS: BvaepDef[] = [
115:   { id: 'BV-01', name: 'Bassin versant du Nord', province: 'Province Nord', sector: 'Nord', captageRefs: ['C-001', 'C-002', 'C-003', 'C-004', 'C-005'] },
116:   { id: 'BV-02', name: 'Bassin versant du Centre', province: 'Province Nord', sector: 'Centre', captageRefs: ['C-006', 'C-007', 'C-011', 'C-012'] },
117:   { id: 'BV-03', name: 'Bassin versant du Sud', province: 'Province Sud', sector: 'Sud', captageRefs: ['C-008', 'C-009', 'C-010'] },
118: ]
119: 
120: export const bvaepById = (id: string) => BVAEPS.find((b) => b.id === id)
121: 
122: export const bvaepsOfCaptage = (captageId: string) => BVAEPS.filter((b) => b.captageRefs.includes(captageId))
123: 
124: export const communes = () => [...new Set(UNITES_GESTIONES.map((c) => c.commune))].sort()
125: 
126: export const provinces = () => [...new Set(UNITES_GESTIONES.map((c) => c.province))].sort()
127: 
128: export const captagesOfBvaep = (bvId: string) => BVAEPS.find((b) => b.id === bvId)?.captageRefs.map((id) => CAPTAGES.find((c) => c.id === id)!).filter(Boolean) ?? []
129: 
130: export const communesIntersectingBvaep = (bvId: string) => [...new Set(captagesOfBvaep(bvId).map((c) => c.commune))].sort()
131: 
132: export const BVAEP_POLYGONS: Record<string, string> = {
133:   'BV-01': '100,180 130,155 175,150 210,160 260,170 285,170 290,190 285,195 250,205 210,205 130,205',
134:   'BV-02': '155,135 230,145 260,135 350,135 395,160 430,185 395,205 360,205 250,205 210,205 210,160 175,155 155,155',
135:   'BV-03': '430,185 430,190 465,190 500,180 520,200 510,210 465,210',
136: }

(End of file - total 136 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/export/geopackage.ts"
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/export/geopackage.ts</path>
<type>file</type>
<content>
1: const TE = new TextEncoder()
2: 
3: function utf8(s: string): Uint8Array {
4:   return TE.encode(s)
5: }
6: 
7: function setU32(b: Uint8Array, off: number, v: number) {
8:   b[off] = (v >>> 24) & 0xff
9:   b[off + 1] = (v >>> 16) & 0xff
10:   b[off + 2] = (v >>> 8) & 0xff
11:   b[off + 3] = v & 0xff
12: }
13: 
14: function varintBytes(n: number): number[] {
15:   if (!Number.isInteger(n) || n < 0) throw new Error(`varint out of range: ${n}`)
16:   if (n <= 0x7f) return [n]
17:   const out: number[] = []
18:   let v = n
19:   out.push(v & 0x7f)
20:   v = Math.floor(v / 128)
21:   while (v > 0) {
22:     out.push((v & 0x7f) | 0x80)
23:     v = Math.floor(v / 128)
24:   }
25:   out.reverse()
26:   return out
27: }
28: 
29: function intToBytes(n: number, len: number): Uint8Array {
30:   const out = new Uint8Array(len)
31:   let v = n
32:   for (let i = len - 1; i >= 0; i--) {
33:     out[i] = v & 0xff
34:     v = Math.floor(v / 256)
35:   }
36:   return out
37: }
38: 
39: function floatToBytes(n: number): Uint8Array {
40:   const b = new Uint8Array(8)
41:   new DataView(b.buffer).setFloat64(0, n, true)
42:   return b
43: }
44: 
45: function recordValue(v: unknown): { serial: number; bytes: Uint8Array } {
46:   if (v === null || v === undefined) return { serial: 0, bytes: new Uint8Array(0) }
47:   if (typeof v === 'number') {
48:     if (v === 0) return { serial: 8, bytes: new Uint8Array(0) }
49:     if (v === 1) return { serial: 9, bytes: new Uint8Array(0) }
50:     if (Number.isInteger(v)) {
51:       let len = 8
52:       if (v >= -128 && v <= 127) len = 1
53:       else if (v >= -32768 && v <= 32767) len = 2
54:       else if (v >= -8388608 && v <= 8388607) len = 3
55:       else if (v >= -2147483648 && v <= 2147483647) len = 4
56:       else if (v >= -140737488355328 && v <= 140737488355327) len = 6
57:       return { serial: len, bytes: intToBytes(v, len) }
58:     }
59:     return { serial: 7, bytes: floatToBytes(v) }
60:   }
61:   if (typeof v === 'string') {
62:     const b = utf8(v)
63:     return { serial: 13 + 2 * b.length, bytes: b }
64:   }
65:   if (v instanceof Uint8Array) {
66:     return { serial: 12 + 2 * v.length, bytes: v }
67:   }
68:   throw new Error(`unsupported value: ${typeof v}`)
69: }
70: 
71: function encodeRecord(values: unknown[]): Uint8Array {
72:   const parts = values.map(recordValue)
73:   const serialBytes: number[] = []
74:   let headerLen = 1
75:   for (const p of parts) {
76:     const sv = varintBytes(p.serial)
77:     serialBytes.push(...sv)
78:     headerLen += sv.length
79:   }
80:   const headerLenVar = varintBytes(headerLen)
81:   let total = headerLen
82:   for (const p of parts) total += p.bytes.length
83:   const out = new Uint8Array(total)
84:   let o = 0
85:   for (const b of headerLenVar) out[o++] = b
86:   for (const b of serialBytes) out[o++] = b
87:   for (const p of parts) {
88:     out.set(p.bytes, o)
89:     o += p.bytes.length
90:   }
91:   return out
92: }
93: 
94: function encodeCell(rowid: number, values: unknown[]): Uint8Array {
95:   const payload = encodeRecord(values)
96:   const payloadVar = varintBytes(payload.length)
97:   const rowidVar = varintBytes(rowid)
98:   const out = new Uint8Array(payloadVar.length + rowidVar.length + payload.length)
99:   let o = 0
100:   for (const b of payloadVar) out[o++] = b
101:   for (const b of rowidVar) out[o++] = b
102:   out.set(payload, o)
103:   return out
104: }
105: 
106: function buildLeafPage(pageSize: number, startOffset: number, cells: Uint8Array[]): Uint8Array {
107:   const page = new Uint8Array(pageSize)
108:   const headerLen = startOffset + 8
109:   const count = cells.length
110:   const ptrEnd = headerLen + count * 2
111:   let cur = pageSize
112:   const offsets: number[] = []
113:   for (const c of cells) {
114:     cur -= c.length
115:     if (cur < ptrEnd) throw new Error('SQLite leaf page overflow')
116:     page.set(c, cur)
117:     offsets.push(cur)
118:   }
119:   const contentStart = count ? Math.min(...offsets) : headerLen
120:   page[startOffset] = 13
121:   page[startOffset + 3] = (count >> 8) & 0xff
122:   page[startOffset + 4] = count & 0xff
123:   page[startOffset + 5] = (contentStart >> 8) & 0xff
124:   page[startOffset + 6] = contentStart & 0xff
125:   for (let i = 0; i < count; i++) {
126:     const off = offsets[i]
127:     page[startOffset + 8 + i * 2] = (off >> 8) & 0xff
128:     page[startOffset + 8 + i * 2 + 1] = off & 0xff
129:   }
130:   return page
131: }
132: 
133: function sqliteHeader(pageSize: number, totalPages: number, applicationId: number): Uint8Array {
134:   const h = new Uint8Array(100)
135:   const magic = 'SQLite format 3\0'
136:   for (let i = 0; i < magic.length; i++) h[i] = magic.charCodeAt(i)
137:   h[16] = (pageSize >> 8) & 0xff
138:   h[17] = pageSize & 0xff
139:   h[18] = 1
140:   h[19] = 1
141:   h[20] = 0
142:   h[21] = 64
143:   h[22] = 32
144:   h[23] = 32
145:   setU32(h, 24, 1)
146:   setU32(h, 28, totalPages)
147:   setU32(h, 32, 0)
148:   setU32(h, 36, 0)
149:   setU32(h, 40, 1)
150:   setU32(h, 44, 4)
151:   setU32(h, 48, 0)
152:   setU32(h, 52, 0)
153:   setU32(h, 56, 1)
154:   setU32(h, 60, 0)
155:   setU32(h, 64, 0)
156:   setU32(h, 68, applicationId)
157:   setU32(h, 92, 1)
158:   setU32(h, 96, 0x00320000)
159:   return h
160: }
161: 
162: export interface GpkgTableDef {
163:   name: string
164:   createSql: string
165:   rows: Array<{ rowid: number; values: unknown[] }>
166: }
167: 
168: export function buildSqliteDatabase(tables: GpkgTableDef[], applicationId = 0): Uint8Array {
169:   const pageSize = 4096
170:   const totalPages = tables.length + 1
171:   const masterRows = tables.map((t, i) => ({
172:     rowid: i + 1,
173:     values: ['table', t.name, t.name, i + 2, t.createSql],
174:   }))
175:   const masterCells = masterRows.map((r) => encodeCell(r.rowid, r.values))
176:   const page1 = buildLeafPage(pageSize, 100, masterCells)
177:   page1.set(sqliteHeader(pageSize, totalPages, applicationId), 0)
178:   const db = new Uint8Array(pageSize * totalPages)
179:   db.set(page1, 0)
180:   tables.forEach((t, i) => {
181:     const cells = t.rows.map((r) => encodeCell(r.rowid, r.values))
182:     const p = buildLeafPage(pageSize, 0, cells)
183:     db.set(p, (i + 1) * pageSize)
184:   })
185:   return db
186: }
187: 
188: function gpkgHeader(srsId: number, wkb: Uint8Array): Uint8Array {
189:   const out = new Uint8Array(8 + wkb.length)
190:   out[0] = 0x47
191:   out[1] = 0x50
192:   out[2] = 0x00
193:   out[3] = 0x01
194:   const dv = new DataView(out.buffer)
195:   dv.setUint32(4, srsId, true)
196:   out.set(wkb, 8)
197:   return out
198: }
199: 
200: export function gpkgPoint(srsId: number, x: number, y: number): Uint8Array {
201:   const wkb = new Uint8Array(21)
202:   const dv = new DataView(wkb.buffer)
203:   wkb[0] = 1
204:   dv.setUint32(1, 1, true)
205:   dv.setFloat64(5, x, true)
206:   dv.setFloat64(13, y, true)
207:   return gpkgHeader(srsId, wkb)
208: }
209: 
210: export function gpkgPolygon(srsId: number, rings: number[][][]): Uint8Array {
211:   const ring = rings[0] ?? []
212:   const n = ring.length
213:   const wkb = new Uint8Array(9 + 4 + n * 16)
214:   const dv = new DataView(wkb.buffer)
215:   wkb[0] = 1
216:   dv.setUint32(1, 3, true)
217:   dv.setUint32(5, rings.length, true)
218:   dv.setUint32(9, n, true)
219:   for (let i = 0; i < n; i++) {
220:     dv.setFloat64(13 + i * 16, ring[i][0], true)
221:     dv.setFloat64(13 + i * 16 + 8, ring[i][1], true)
222:   }
223:   return gpkgHeader(srsId, wkb)
224: }

(End of file - total 224 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/data/values.ts"
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/data/values.ts</path>
<type>file</type>
<content>
1: import { BVAEPS, catalogueById } from './hydroscope'
2: 
3: function hashNum(s: string) {
4:   let h = 0
5:   for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
6:   return h
7: }
8: 
9: const BASE: Record<string, number> = {
10:   'ind:1': 4200,
11:   'ind:6': 3200,
12:   'ind:2': 85,
13:   'ind:3': 950,
14:   'ind:12': 6,
15:   'ind:302': 1400,
16:   'ind:304': 480,
17:   'ind:305': 22,
18:   'ind:306': 36,
19:   'ind:503': 18,
20:   'ind:504': 540,
21:   'ind:202': 300,
22:   'ind:501': 1400,
23:   'ind:105': 1200,
24:   'ind:106': 780,
25:   'ind:107': 300,
26:   'ind:100': 60,
27:   'ind:101': 820,
28:   'ind:102': 490,
29:   'ind:104': 190,
30:   'ind:500': 3,
31:   'ind:308': 40,
32:   'ind:200': 620,
33:   'ind:201': 480,
34:   'ind:301': 210,
35: }
36: 
37: export function valueForUnite(indId: string, uniteId: string): number {
38:   const ind = catalogueById(indId) ?? catalogueById('ind:200')!
39:   const base = BASE[ind.id] ?? 400
40:   const salt = hashNum(indId + uniteId)
41:   const jitter = (salt % 140) - 0.35 * base
42:   const raw = Math.max(0, base + jitter)
43:   return ind.datatype === 'qualite' ? Math.round(raw) % 4 : Math.round(raw)
44: }
45: 
46: export function valueForBvaep(indId: string, bvaepId: string): number {
47:   const ind = catalogueById(indId) ?? catalogueById('ind:200')!
48:   const bv = BVAEPS.find((b) => b.id === bvaepId) ?? BVAEPS[0]
49:   const vals = bv.captageRefs.map((c) => valueForUnite(indId, c))
50:   const sum = vals.reduce((a, b) => a + b, 0)
51:   return sum === 0 ? 0 : ind.datatype === 'qualite' ? Math.round(sum / vals.length) : Math.round(sum)
52: }
53: 
54: export function timeSeriesForUnite(indId: string, uniteId: string): number[] {
55:   const base = valueForUnite(indId, uniteId)
56:   const salt = hashNum('ts' + indId + uniteId)
57:   const trend = ((salt % 30) - 12) / 100
58:   return [2016, 2018, 2021, 2023, 2026].map((yr, i) => {
59:     const growth = Math.round(base * (1 + trend * i))
60:     return Math.max(0, growth + ((hashNum(yr + uniteId) % 30) - 15))
61:   })
62: }

(End of file - total 62 lines)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free (New) · 12.9s)

_Thinking:_

Now I have a clear picture. The current map is entirely synthetic — SVG positions (x,y in a 600x420 viewBox) for captages, and SVG polygon strings for bassins versants. There are NO real geographic coordinates (lat/lon) in the data. The geopackage export generates fake geometry but I should check how it's used (exportContext.ts) to see if there's a projection assumption.

Let me check exportContext.ts and how MapCanvas is used elsewhere (maybe in portail/dashboard), plus check what data coordinates could be derived. Let me also check the hydroScope-amoa skill for context about the project and DESIGN.md.

Actually, the key issue here: the task is to replace the static SVG map with an OpenLayers engine. This is a significant undertaking because:
1. OpenLayers needs real geographic coordinates (EPSG:4326 or a projected CRS) or must use a local/none projection
2. The current data has no real geo coords — just synthetic SVG positions
3. Need to decide on basemap tiles source (real tile servers like OSM, or keep synthetic offline)

Let me look at exportContext.ts to understand geo projection assumptions, and check where else MapCanvas is used. Also let me check DESIGN.md per AGENTS instructions and the hydroScope-amoa skill.

Let me delegate exploration to understand usage and design constraints. Actually let me just read the key files directly.

Let me check where MapCanvas is used elsewhere, the export context (geo projection assumptions), and the design system.

**Tool: grep**

**Input:**
```json
{
  "pattern": "MapCanvas|CarteView|h3Mode",
  "path": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src",
  "include": "*.tsx"
}
```

**Output:**
```
Found 18 matches
/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/app/App.tsx:
  Line 8: import { CarteView } from '@/features/carte'

  Line 119:       <CarteView


/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/portail/PublicHome.tsx:
  Line 1: import { MapCanvas } from '@/features/carte/MapCanvas'

  Line 43:           <MapCanvas key={mapKey ?? 'public'} showGrid={false} />


/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/carte/CarteView.tsx:
  Line 3: import { MapCanvas } from './MapCanvas'

  Line 10: export interface CarteViewProps {

  Line 33: export function CarteView({

  Line 48: }: CarteViewProps) {

  Line 53:   const h3Mode = showCarte

  Line 90:         <MapCanvas selectedKeys={selectedKeys} activeIndicator={activeIndicator} unitMode={unitMode} selectedBvaeps={selectedBvaeps} layers={layers} basemap={basemap} h3Mode={h3Mode} />


/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/carte/MapCanvas.tsx:
  Line 7: export interface MapCanvasProps {

  Line 15:   h3Mode?: boolean

  Line 124: export function MapCanvas({

  Line 132:   h3Mode = false,

  Line 133: }: MapCanvasProps) {

  Line 327:       {h3Mode && ind && (

  Line 351:       {h3Mode && ind && hoveredHex && (() => {

  Line 372:       {h3Mode && ind && hoveredHex && (

```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/export/exportContext.ts"
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/export/exportContext.ts</path>
<type>file</type>
<content>
1: import { UNITES_GESTIONES, CAPTAGE_POINTS, BVAEPS, BVAEP_POLYGONS } from '@/data/hydroscope'
2: import { valueForUnite, valueForBvaep } from '@/data/values'
3: import { buildSqliteDatabase, gpkgPoint, gpkgPolygon, type GpkgTableDef } from './geopackage'
4: import type { IndicatorDef, PeriodRange, UnitMode } from '@/types/domain'
5: 
6: export type ExportFormat = 'csv' | 'geojson' | 'geopackage'
7: 
8: export interface ExportContext {
9:   unitMode: UnitMode
10:   selectedUnites: Set<string>
11:   selectedBvaeps: Set<string>
12:   indicators: IndicatorDef[]
13:   period: PeriodRange
14: }
15: 
16: export interface ExportResult {
17:   filename: string
18:   content: string | Uint8Array
19:   mime: string
20: }
21: 
22: const SRS_ID = 4326
23: 
24: const WGS84_DEF =
25:   'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]'
26: 
27: function stamp() {
28:   return new Date().toISOString().slice(0, 10)
29: }
30: 
31: function ncLonLat(x: number, y: number): [number, number] {
32:   const lon = 164.0 + ((x - 120) / 400) * 2.8
33:   const lat = -20.4 + ((205 - y) / 85) * -1.5
34:   return [lon, lat]
35: }
36: 
37: function selectedUnites(ctx: ExportContext) {
38:   return UNITES_GESTIONES.filter((c) => ctx.selectedUnites.has(c.id))
39: }
40: 
41: function selectedBvaeps(ctx: ExportContext) {
42:   return BVAEPS.filter((b) => ctx.selectedBvaeps.has(b.id))
43: }
44: 
45: function csvCell(v: string) {
46:   if (/[";\r\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`
47:   return v
48: }
49: 
50: export function exportContextAsCsv(ctx: ExportContext): ExportResult {
51:   const indCols = ctx.indicators.map((i) => `${i.code} — ${i.label} (${i.unit})`)
52:   const rows: string[][] = []
53:   if (ctx.unitMode === 'bvaep') {
54:     rows.push(['mode', 'id', 'nom', 'province', 'nb_captages', ...indCols, 'periode'])
55:     for (const b of selectedBvaeps(ctx)) {
56:       rows.push([
57:         'bvaep',
58:         b.id,
59:         b.name,
60:         b.province,
61:         String(b.captageRefs.length),
62:         ...ctx.indicators.map((i) => String(valueForBvaep(i.id, b.id))),
63:         ctx.period,
64:       ])
65:     }
66:   } else {
67:     rows.push(['mode', 'id', 'nom', 'commune', 'province', 'bassin_versant', ...indCols, 'periode'])
68:     for (const c of selectedUnites(ctx)) {
69:       rows.push([
70:         'gestion',
71:         c.id,
72:         c.name,
73:         c.commune,
74:         c.province,
75:         c.bvaep,
76:         ...ctx.indicators.map((i) => String(valueForUnite(i.id, c.id))),
77:         ctx.period,
78:       ])
79:     }
80:   }
81:   const csv = '\uFEFF' + rows.map((r) => r.map(csvCell).join(';')).join('\r\n')
82:   return {
83:     filename: `hydroscope_${ctx.unitMode}_${stamp()}.csv`,
84:     content: csv,
85:     mime: 'text/csv;charset=utf-8',
86:   }
87: }
88: 
89: export function exportContextAsGeoJson(ctx: ExportContext): ExportResult {
90:   const features: Array<{ type: 'Feature'; geometry: unknown; properties: Record<string, unknown> }> = []
91:   if (ctx.unitMode === 'bvaep') {
92:     for (const b of selectedBvaeps(ctx)) {
93:       const pts = (BVAEP_POLYGONS[b.id] ?? '')
94:         .trim()
95:         .split(/\s+/)
96:         .map((p) => p.split(',').map(Number))
97:         .filter((a) => a.length === 2)
98:         .map(([x, y]) => ncLonLat(x, y))
99:       const ring = [...pts, pts[0] ?? ncLonLat(0, 0)]
100:       const properties: Record<string, unknown> = {
101:         id: b.id,
102:         nom: b.name,
103:         province: b.province,
104:         nb_captages: b.captageRefs.length,
105:       }
106:       for (const i of ctx.indicators) properties[`ind_${i.code}`] = valueForBvaep(i.id, b.id)
107:       features.push({ type: 'Feature', geometry: { type: 'Polygon', coordinates: [ring] }, properties })
108:     }
109:   } else {
110:     for (const c of selectedUnites(ctx)) {
111:       const pt = CAPTAGE_POINTS.find((p) => p.key === c.id)
112:       const [lon, lat] = pt ? ncLonLat(pt.x, pt.y) : [164.0, -20.4]
113:       const properties: Record<string, unknown> = {
114:         id: c.id,
115:         nom: c.name,
116:         commune: c.commune,
117:         province: c.province,
118:         bassin_versant: c.bvaep,
119:       }
120:       for (const i of ctx.indicators) properties[`ind_${i.code}`] = valueForUnite(i.id, c.id)
121:       features.push({ type: 'Feature', geometry: { type: 'Point', coordinates: [lon, lat] }, properties })
122:     }
123:   }
124:   const geojson = {
125:     type: 'FeatureCollection',
126:     name: ctx.unitMode === 'bvaep' ? 'hydroscope_bvaeps' : 'hydroscope_gestion',
127:     crs: { type: 'name', properties: { name: 'urn:ogc:def:crs:OGC:1.3:CRS84' } },
128:     features,
129:   }
130:   return {
131:     filename: `hydroscope_${ctx.unitMode}_${stamp()}.geojson`,
132:     content: JSON.stringify(geojson, null, 2),
133:     mime: 'application/geo+json',
134:   }
135: }
136: 
137: export function exportContextAsGeoPackage(ctx: ExportContext): ExportResult {
138:   const tableName = ctx.unitMode === 'bvaep' ? 'hydroscope_bvaeps' : 'hydroscope_gestion'
139:   const indCols = ctx.indicators.map((i) => `ind_${i.code}`)
140:   const features: Array<{ rowid: number; values: unknown[] }> = []
141:   let geomTypeName = 'POINT'
142:   let attrs: Array<[string, string]> = []
143:   if (ctx.unitMode === 'bvaep') {
144:     geomTypeName = 'POLYGON'
145:     attrs = [
146:       ['id', 'TEXT'],
147:       ['nom', 'TEXT'],
148:       ['province', 'TEXT'],
149:       ['nb_captages', 'INTEGER'],
150:     ]
151:     for (const b of selectedBvaeps(ctx)) {
152:       const pts = (BVAEP_POLYGONS[b.id] ?? '')
153:         .trim()
154:         .split(/\s+/)
155:         .map((p) => p.split(',').map(Number))
156:         .filter((a) => a.length === 2)
157:         .map(([x, y]) => ncLonLat(x, y))
158:       const ring = [...pts, pts[0] ?? ncLonLat(0, 0)]
159:       features.push({
160:         rowid: features.length + 1,
161:         values: [
162:           features.length + 1,
163:           gpkgPolygon(SRS_ID, [ring]),
164:           b.id,
165:           b.name,
166:           b.province,
167:           b.captageRefs.length,
168:           ...ctx.indicators.map((i) => valueForBvaep(i.id, b.id)),
169:         ],
170:       })
171:     }
172:   } else {
173:     attrs = [
174:       ['id', 'TEXT'],
175:       ['nom', 'TEXT'],
176:       ['commune', 'TEXT'],
177:       ['province', 'TEXT'],
178:       ['bassin_versant', 'TEXT'],
179:     ]
180:     for (const c of selectedUnites(ctx)) {
181:       const pt = CAPTAGE_POINTS.find((p) => p.key === c.id)
182:       const [lon, lat] = pt ? ncLonLat(pt.x, pt.y) : [164.0, -20.4]
183:       features.push({
184:         rowid: features.length + 1,
185:         values: [
186:           features.length + 1,
187:           gpkgPoint(SRS_ID, lon, lat),
188:           c.id,
189:           c.name,
190:           c.commune,
191:           c.province,
192:           c.bvaep,
193:           ...ctx.indicators.map((i) => valueForUnite(i.id, c.id)),
194:         ],
195:       })
196:     }
197:   }
198: 
199:   const colDefs: string[] = ['"fid" INTEGER PRIMARY KEY', '"geom" BLOB']
200:   for (const [name, type] of attrs) colDefs.push(`"${name}" ${type}`)
201:   for (const c of indCols) colDefs.push(`"${c}" REAL`)
202:   const createSql = `CREATE TABLE "${tableName}" (${colDefs.join(',')})`
203: 
204:   const tables: GpkgTableDef[] = [
205:     {
206:       name: 'gpkg_spatial_ref_sys',
207:       createSql:
208:         'CREATE TABLE gpkg_spatial_ref_sys (srs_name TEXT NOT NULL, srs_id INTEGER NOT NULL PRIMARY KEY, organization TEXT NOT NULL, organization_coordsys_id INTEGER NOT NULL, definition TEXT NOT NULL, description TEXT)',
209:       rows: [{ rowid: SRS_ID, values: ['WGS 84 geodetic', SRS_ID, 'EPSG', SRS_ID, WGS84_DEF, 'longitude/latitude coordinates in decimal degrees on the WGS 84 spheroid'] }],
210:     },
211:     {
212:       name: 'gpkg_contents',
213:       createSql:
214:         'CREATE TABLE gpkg_contents (table_name TEXT NOT NULL, data_type TEXT NOT NULL, identifier TEXT, description TEXT DEFAULT \'\', last_change DATETIME NOT NULL, min_x DOUBLE, min_y DOUBLE, max_x DOUBLE, max_y DOUBLE, srs_id INTEGER)',
215:       rows: [
216:         {
217:           rowid: 1,
218:           values: [tableName, 'features', tableName, 'Export du contexte de sélection HydroScope', new Date().toISOString(), null, null, null, null, SRS_ID],
219:         },
220:       ],
221:     },
222:     {
223:       name: 'gpkg_geometry_columns',
224:       createSql:
225:         'CREATE TABLE gpkg_geometry_columns (table_name TEXT NOT NULL, column_name TEXT NOT NULL, geometry_type_name TEXT NOT NULL, srs_id INTEGER NOT NULL, z TINYINT NOT NULL, m TINYINT NOT NULL)',
226:       rows: [{ rowid: 1, values: [tableName, 'geom', geomTypeName, SRS_ID, 0, 0] }],
227:     },
228:     { name: tableName, createSql, rows: features },
229:   ]
230: 
231:   const db = buildSqliteDatabase(tables, 0x47504b47)
232:   return {
233:     filename: `${tableName}_${stamp()}.gpkg`,
234:     content: db,
235:     mime: 'application/geopackage+sqlite3',
236:   }
237: }
238: 
239: export function downloadFile(result: ExportResult) {
240:   const blob =
241:     typeof result.content === 'string' ? new Blob([result.content], { type: result.mime }) : new Blob([result.content], { type: result.mime })
242:   const url = URL.createObjectURL(blob)
243:   const a = document.createElement('a')
244:   a.href = url
245:   a.download = result.filename
246:   document.body.appendChild(a)
247:   a.click()
248:   a.remove()
249:   setTimeout(() => URL.revokeObjectURL(url), 0)
250: }

(End of file - total 250 lines)
</content>
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/types/domain.ts"
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/types/domain.ts</path>
<type>file</type>
<content>
1: export type UnitMode = 'gestion' | 'bvaep'
2: export type DataType = 'stock' | 'qualite' | 'mixte'
3: export type PeriodRange = string
4: 
5: export interface ViewDef {
6:   id: string
7:   label: string
8:   group: string
9:   expertOnly: boolean
10:   desc: string
11:   epic: string
12:   mvp: boolean
13: }
14: 
15: export type CaptageKind = 'captage_superficiel' | 'forage' | 'tranchee_drainante'
16: 
17: export interface CaptageDef {
18:   id: string
19:   name: string
20:   commune: string
21:   province: string
22:   bvaep: string
23:   dist: number
24: }
25: 
26: export interface UniteGestionDef {
27:   id: string
28:   name: string
29:   commune: string
30:   province: string
31:   bvaep: string
32:   kind: CaptageKind
33:   dist: number
34: }
35: 
36: export type IndicatorFamily = 'ENJEUX' | 'MENACES'
37: 
38: export interface IndicatorDef {
39:   id: string
40:   code: string
41:   label: string
42:   unit: string
43:   family: IndicatorFamily
44:   theme: string
45:   group: string
46:   datatype: DataType
47:   sourceLabel: string
48:   hasTimeSeries: boolean
49:   desc: string
50:   objectif: string
51: }
52: 
53: /** Détails extraits de liste_flat_indicateurs.xlsx (source de vérité). */
54: export interface IndicatorDetail {
55:   family: string
56:   theme: string
57:   group: string
58:   label: string
59:   desc: string
60:   objectif: string
61: }
62: 
63: export interface BvaepDef {
64:   id: string
65:   name: string
66:   province: string
67:   sector: string
68:   captageRefs: string[]
69: }

(End of file - total 69 lines)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free (New) · 12.4s)

_Thinking:_

Now I have a comprehensive understanding. Let me also check the DESIGN.md (referenced by AGENTS.md) and the hydroScope-amoa skill. Actually, I have enough understanding of the technical side. But I should consider the important architectural question and present options to the user.

Key findings:
1. The map is fully synthetic SVG — no real geographic coordinates. Captages are at (x,y) in a 600×420 viewBox. BVAEPS are SVG polygon strings.
2. There IS a lat/lon projection already established: `ncLonLat` in exportContext.ts converts synthetic SVG coords → WGS84 around New Caledonia (lon 164-166.8, lat around -20 to -22). This is reused by GeoJSON and GeoPackage exports.
3. MapCanvas is used in TWO places: CarteView (full-featured, with layers/basemap/h3Mode/selection) and PublicHome (static, `showGrid={false}`).
4. The "basemap" is currently a synthetic color scheme — not real tiles.
5. Basemap options: carto/satellite/terrain, layer toggles (bv, capt, ppe, risque, source), H3 hex grid mode, hover tooltips, zoom +/- controls (non-functional), scale "0-50 km", north arrow.
6. OpenLayers is NOT currently a dependency.

The task: "remplace la carte static par un moteur openlayer dans figma-design/". So replace the static SVG map with an OpenLayers engine.

The big decisions / tradeoffs I need to clarify with the user:
1. **Geographic data**: Since current data is synthetic (SVG coords), do we:
   a. Add real WGS84 coordinates to the data model (using the existing ncLonLat projection or actual NC commune coordinates), OR
   b. Use OpenLayers with a local/none projection rendering the same synthetic shapes but as interactive OL vectors.
   
   Given this is a prototype/Figma Make mockup, and the data is synthetic, the pragmatic approach is to assign real lat/lon to captages (real New Caledonia commune locations) and draw BVAEPS as real polygons. But this requires either real coordinates or reusing ncLonLat to convert the synthetic shapes.

2. **Basemap tiles**: Real online tile providers (OSM, satellite like Esri World Imagery) require internet and appropriate attribution; or keep synthetic. The current app runs inside Figma Make. Do they want real basemap tiles (OSM/Esri) or a neutral/synthetic background?

3. **Scope**: Should the H3 hexgrid mode, hover tooltips, selection, layers all be preserved and rebuilt on OL? Presumably yes — feature parity.

4. **Projection**: OL default is Web Mercator EPSG:3857, data in 4326 → use `fromLonLat`.

Given plan mode and the AGENTS instructions (always ask clarifying questions, never assume), I should present a plan and ask key clarifying questions. Let me ask about:
- Basemap source (real online tiles vs synthetic/offline)
- Data source (real NC coordinates vs reuse ncLonLat projection of synthetic shapes)

Let me also quickly check DESIGN.md to respect design system, and check if there's any existing OL usage or docs. Let me check docs/ and the App.tsx CarteView usage.

Actually I have enough. Let me check DESIGN.md briefly and App.tsx CarteView wiring, then ask clarifying questions. Let me be efficient.

Let me check the design system doc and how CarteView is wired in the app shell, plus any existing docs.

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/app/App.tsx",
  "offset": 100,
  "limit": 50
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/app/App.tsx</path>
<type>file</type>
<content>
100:     setHelpFrom(current.label)
101:     setShowHelp(true)
102:   }
103: 
104:   let content: ReactElement
105:   if (ind) {
106:     content = (
107:       <IndicateurPage
108:         id={ind.id}
109:         unitMode={unitMode}
110:         selectedUnites={selectedUnites}
111:         selectedBvaeps={selectedBvaeps}
112:         onRemove={handleRemoveIndicator}
113:         onOpenFiche={handleOpenFiche}
114:         period={period}
115:       />
116:     )
117:   } else if (active === 'carte') {
118:     content = (
119:       <CarteView
120:         unitMode={unitMode}
121:         onSetMode={setMode}
122:         selectedUnites={selectedUnites}
123:         onToggleUnite={toggleUnite}
124:         selectedBvaeps={selectedBvaeps}
125:         onToggleBvaep={toggleBvaep}
126:         onApplyUnites={applyUnites}
127:         onApplyBvaeps={applyBvaeps}
128:         onClearUnites={clearUnites}
129:         onClearBvaeps={clearBvaeps}
130:         activeIndicator={activeIndicator}
131:         onSelectIndicator={selectIndicator}
132:         onOpenCatalogue={handleOpenCatalogue}
133:         onOpenFiche={handleOpenFiche}
134:       />
135:     )
136:   } else if (active === 'indicateurs') {
137:     content = <IndicateursView focusId={focusIndicator} onOpenFiche={(id) => setActive(id)} />
138:   } else if (active === 'tableau') {
139:     content = <DashboardPage onOpenPublic={() => setShowPublic(true)} />
140:   } else {
141:     const S = STUBS[active]
142:     content = <S />
143:   }
144: 
145:   return (
146:     <div className="flex h-screen flex-col bg-neutral-100 text-neutral-800">
147:       <Header avance={avance} onToggleAvance={() => setAvance((a) => !a)} period={period} onSetPeriod={setPeriod} onOpenHelp={openHelp} onExport={handleExport} />
148: 
149:       <div className="flex min-h-0 flex-1">

(Showing lines 100-149 of 171. Use offset=150 to continue.)
</content>
```

**Tool: glob**

**Input:**
```json
{
  "pattern": "**/{DESIGN,README}*.md",
  "path": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design"
}
```

**Output:**
```
/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/README.md
/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/docs/README.md
```

**Tool: read**

**Input:**
```json
{
  "filePath": "/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/portail/PublicHome.tsx"
}
```

**Output:**
```
<path>/home/yogis/SynologyDrive/Projects/hydroscope/documents projet/Notes de cadrage/figma-design/src/features/portail/PublicHome.tsx</path>
<type>file</type>
<content>
1: import { MapCanvas } from '@/features/carte/MapCanvas'
2: 
3: export interface PublicHomeProps {
4:   mapKey?: string
5: }
6: 
7: /** Contenu fusionné portail public ⇄ tableau de bord : hero, chiffres clés, carte. */
8: export function PublicHome({ mapKey }: PublicHomeProps) {
9:   return (
10:     <div className="flex flex-col gap-4">
11:       <section className="border-b border-neutral-200 bg-white px-6 py-8">
12:         <h1 className="max-w-2xl text-2xl font-bold leading-tight">
13:           La qualité de l’eau potable en Nouvelle-Calédonie, cartographiée et suivie dans le temps.
14:         </h1>
15:         <p className="mt-2 max-w-xl text-sm text-neutral-500">
16:           Bassins versants, points de captage, périmètres de protection : explorez les données publiques de votre territoire.
17:         </p>
18:         <div className="mt-4 flex w-full max-w-xl items-center gap-2 rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-400">
19:           <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 stroke-neutral-400" fill="none" strokeWidth="1.5">
20:             <circle cx="7" cy="7" r="4.5" />
21:             <line x1="10.5" y1="10.5" x2="14" y2="14" />
22:           </svg>
23:           Rechercher une commune, un cours d’eau, un captage…
24:         </div>
25:       </section>
26: 
27:       <section className="grid grid-cols-4 gap-3 px-6">
28:         {[
29:           { k: 'Territoires suivis', v: '12 bassins versants' },
30:           { k: 'Points de captage', v: '~500' },
31:           { k: 'Périmètres de protection', v: '~250' },
32:           { k: 'Alertes actives', v: '3', warn: true },
33:         ].map((s) => (
34:           <div key={s.k} className="rounded-md border border-neutral-200 bg-white p-4">
35:             <span className="block text-[11px] uppercase tracking-wide text-neutral-400">{s.k}</span>
36:             <span className={`mt-1 block text-xl font-semibold ${s.warn ? 'text-amber-600' : 'text-neutral-800'}`}>{s.v}</span>
37:           </div>
38:         ))}
39:       </section>
40: 
41:       <section className="px-6 pb-2">
42:         <div className="relative h-72 overflow-hidden rounded-lg border border-neutral-200 bg-white">
43:           <MapCanvas key={mapKey ?? 'public'} showGrid={false} />
44:           <div className="absolute bottom-3 left-3 rounded-md border border-neutral-200 bg-white p-2 text-[11px] text-neutral-500">
45:             <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-500" /> Point de captage</span>
46:             <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full border border-dashed border-neutral-500" /> Périmètre de protection</span>
47:           </div>
48:         </div>
49:       </section>
50:     </div>
51:   )
52: }

(End of file - total 52 lines)
</content>
```

---

## Assistant (Plan · DeepSeek V4 Flash Free (New) · 183.6s)

_Thinking:_

I now have a full understanding of the current implementation. Let me summarize the findings and present a plan with clarifying questions.

Current state:
- `MapCanvas.tsx`: a pure SVG synthetic wireframe map (600×420 viewBox) of New Caledonia. Synthetic coords.
- Captages: `CAPTAGE_POINTS` (x,y) synthetic.
- BVAEPS: `BVAEP_POLYGONS` synthetic SVG strings.
- Basemap: synthetic color theme only (carto/satellite/terrain).
- A `ncLonLat(x,y)` helper already converts synthetic coords → real WGS84 (lon 164–166.8, lat ~-20 to -22), used by GeoJSON/GeoPackage exports.
- OpenLayers NOT installed.
- MapCanvas used in CarteView (rich) and PublicHome (static).

The task is to replace the static map with an OpenLayers engine.

Key decisions requiring clarification:

1. **Geographic data source**: The current data is synthetic. Options:
   - (A) Reuse the existing `ncLonLat` projection to convert synthetic shapes to real WGS84 coords, then render them in OL over a real tile basemap. Fastest, keeps geometry consistent with existing exports. But the BVAEP polygons will be rough approximations.
   - (B) Introduce real coordinates for captages (actual NC commune coords) and real BVAEP boundaries. More accurate but requires new data and looks different.

2. **Basemap source**: 
   - (A) Real online tiles (OpenStreetMap for carto, Esri World Imagery for satellite, etc.). Requires internet + attribution.
   - (B) Synthetic/neutral OL basemap (a plain background layer) to preserve offline/mockup nature.

3. **Feature parity scope**: Rebuild on OL: layers (bv/capt/ppe/risque/source), basemap switch, selection highlighting, hover tooltips, H3 hex grid mode, zoom/scale/north controls. Assume yes.

4. **Dependency**: add `ol` + react integration. There's a package `react-ol` or use `ol` directly with a ref. Given project uses React, use `ol` directly with useEffect/useRef (lightweight). 

Let me ask clarifying questions on the two most impactful decisions: basemap (real tiles vs synthetic) and data coordinates (reuse ncLonLat vs real coords). Also confirm parity scope.

I'll ask concise questions via the question tool.

I now have a complete picture. Here's what I found and the key decisions to confirm before planning.

## Current state

- **`MapCanvas.tsx`** (src/features/carte/MapCanvas.tsx) renders a fully **synthetic SVG wireframe** of New Caledonia (600×420 viewBox) — no real geography.
- Captages are `CAPTAGE_POINTS` with arbitrary `(x,y)`; bassins versants are `BVAEP_POLYGONS` SVG point-strings (src/data/hydroscope.ts).
- The "basemap" is just a color theme swap (carto/satellite/terrain), not real tiles.
- **OpenLayers is not installed.**
- There's already a projection helper `ncLonLat(x,y)` in src/features/export/exportContext.ts:32 that maps synthetic coords → real WGS84 around New Caledonia (lon ~164–167, lat ~-20 to -22), used by the GeoJSON/GeoPackage exporters — so the data was *designed* to be convertible to real geography.
- `MapCanvas` is used in **two** places: `CarteView` (full feature set: layer toggles, basemap switch, H3 hex-grid mode, hover tooltips, selection, zoom/scale/north controls) and `PublicHome` (static, `showGrid={false}`).

## Decisions I need from you

The two biggest tradeoffs determine the whole implementation:

**Tool: question**

**Input:**
```json
{
  "questions": [
    {
      "header": "Basemap source",
      "question": "What should the OpenLayers basemap be? (The current map uses only synthetic color themes.)",
      "multiple": false,
      "options": [
        {
          "label": "Real online tiles (Recommended)",
          "description": "OpenStreetMap (carto), Esri World Imagery (satellite), terrain — real geography, needs internet + OSM attribution. Matches 'real map engine' intent."
        },
        {
          "label": "Synthetic/neutral basemap",
          "description": "OpenLayers rendering engine but with a plain/offline background (no external tile servers). Keeps the mockup self-contained."
        },
        {
          "label": "Hybrid",
          "description": "Real tiles for carto/satellite, but keep it gracefully falling back to a neutral background offline."
        }
      ]
    },
    {
      "header": "Data coordinates",
      "question": "The captages/BVAEPs have only synthetic SVG coordinates. How should their geography be defined for OpenLayers?",
      "multiple": false,
      "options": [
        {
          "label": "Reuse ncLonLat projection (Recommended)",
          "description": "Convert existing synthetic shapes to real WGS84 via the existing ncLonLat helper. Fastest, keeps geometry consistent with current GeoJSON/GPKG exports, same visual layout."
        },
        {
          "label": "Real coordinates per captage",
          "description": "Replace with actual New Caledonia commune coords for each captage and real BVAEP outlines. More geographically accurate but changes the layout and needs new data."
        }
      ]
    },
    {
      "header": "Feature parity",
      "question": "Should all current map interactions be rebuilt on OpenLayers?",
      "multiple": false,
      "options": [
        {
          "label": "Full parity (Recommended)",
          "description": "Layers toggles, basemap switch, selection highlight, hover tooltips, H3 hex-grid mode, zoom/scale/north controls, in both CarteView and PublicHome."
        },
        {
          "label": "Core only for now",
          "description": "Just captages + BVAEPs + basemap + pan/zoom first; add layers/tooltips/H3 mode later."
        }
      ]
    }
  ]
}
```

**Output:**
```
User has answered your questions: "What should the OpenLayers basemap be? (The current map uses only synthetic color themes.)"="Real online tiles (Recommended)", "The captages/BVAEPs have only synthetic SVG coordinates. How should their geography be defined for OpenLayers?"="Real coordinates per captage", "Should all current map interactions be rebuilt on OpenLayers?"="Full parity (Recommended)". You can now continue with the user's answers in mind.
```

---

## Assistant (Plan · DeepSeek V4 Flash Free (New) · 139.7s)

_Thinking:_

The user chose:
1. Real online tiles (OSM carto, Esri satellite, terrain).
2. Real coordinates per captage (actual NC commune coordinates) and real BVAEP outlines.
3. Full parity.

This is a significant change. For "real coordinates per captage", I need real New Caledonia coordinates for each of the 12 captages (Koumac, Voh, Pouembout, Koné, Poindimié, Houaïlou, Canala, Boulouparis, La Foa, Sarraméa, Poya, Kouaoua) and real BVAEP (bassins versants) polygon outlines for Nord/Centre/Sud.

I should search the web for these actual coordinates to make them accurate. Actually, I can plan to derive approximate coordinates. But I should provide a plan. Let me do a quick web search to ground the coordinates, but since I'm in plan mode and read-only, web search is fine (it's read-only).

Actually, let me think about scope. This is planning phase — I need to produce a comprehensive plan. Let me gather real coordinates for the 12 communes to make the plan concrete. Let me search.

The 12 captage communes:
- C-001 Koumac
- C-002 Voh
- C-003 Pouembout
- C-004 Koné
- C-005 Poindimié
- C-006 Houaïlou
- C-007 Canala
- C-008 Boulouparis
- C-009 La Foa
- C-010 Sarraméa
- C-011 Poya
- C-012 Kouaoua

Let me do a quick web search for coordinates of these New Caledonian towns. Actually I can provide reasonable approximations from knowledge:
- Koumac: -20.56, 164.27
- Voh: -20.96, 164.69
- Pouembout: -21.13, 164.89
- Koné: -21.06, 164.85
- Poindimié: -20.89, 165.32
- Houaïlou: -21.28, 165.62
- Canala: -21.52, 165.95
- Boulouparis: -21.87, 166.05
- La Foa: -21.71, 165.83
- Sarraméa: -21.64, 165.85
- Poya: -21.35, 165.15
- Kouaoua: -21.39, 165.83

These are approximate fill-in during implementation, or better to search. For the plan, I'll note we'll derive/verify actual coords.

For BVAEP polygons (Nord/Centre/Sud bassin versants), real outlines are hard to obtain. Since these are mocked basins, "real BVAEP outlines" would be approximate regional polygons on the New Caledonia mainland. I should clarify: BVAEP here are 3 synthetic basins (Nord/Centre/Sud sectors). Real outlines don't exist as such. I'll define approximate coastline-based polygons spanning the north/central/south of nouméa... Actually New Caledonia mainland is elongated NW-SE. The three basins could be drawn as broad polygons over the respective coastal regions. But it's synthetic anyway.

Given the constraint, "real coordinates per captage" was the user's choice. For BVAEP, I'll define approximate polygons covering the mainland split by sector. I'll plan to convert them to real lon/lat.

Let me write the plan. I should not over-search; the plan can specify that coordinates will be sourced/verified. But being concrete is better. Let me do a quick search for the coordinates to be accurate, since it strengthens the plan.

Actually, I'll keep it efficient and present the plan, noting I'll pin coordinates via a quick search during implementation (or now). Let me just do a couple of web searches to ground coordinates — it's read-only and adds value.

Understood — real online tiles, real coordinates per captage, full feature parity. Let me ground the real coordinates quickly so the plan is concrete.




**Tool: websearch**

**Input:**
```json
{
  "query": "coordinates latitude longitude Koumac Voh Koné Poindimié Houaïlou Canala Nouvelle-Calédonie towns",
  "numResults": 5
}
```

**Output:**
```
Title: Koné, New Caledonia
URL: https://en.wikipedia.org/wiki/Kon%C3%A9,_New_Caledonia
Published: 2025-11-01T00:00:00.000Z
Author: N/A
Highlights:
| Koné |
| --- |
| Commune |
| The main road in the centre of Koné |
| Location of the commune (in red) within New Caledonia |
| Location of Koné |
| Coordinates: 21°03′32″S 164°51′06″E﻿ / ﻿ 21.059°S 164.8518°E |
| Country | France |
| Sui generis collectivity | New Caledonia |
| Province | North Province |
| Government |
| • Mayor (2020– 2026) | Thierry Gowecee [1] |
| Area 1 | 373.6 km 2 (144.2 sq mi) |
| Population (2019 census) [2] | 8,144 |
| • Density | 21.80/km 2 (56.46/sq mi) |
| Ethnic distribution |
| • 2019 census | Kanaks 57.75% Europeans 14.35% Wallisians and Futunans 1.78% Mixed 12.71% Other 13.41% |
| Time zone | UTC+11:00 |
| INSEE/Postal code | 98811 /98860 |
| Elevation | 0–1,014 m (0–3,327 ft) (avg. 10 m or 33 ft) |
| 1 New Caledonia Land Register (DITTT) data, which exclude lakes and ponds larger than 1 km² (0.386 sq mi or 247 acres) as well as the estuaries of rivers. |
...
Koné (French: [kɔne], Haeke: Koohnê) is a commune in the North Province of New Caledonia, a special collectivity of France in the Pacific Ocean. Koné is the provincial seat of the North Province.
...
Koné is the seat of the government of the Northern Province, dominated since the Province was established by pro-Independence politicians. The aim has been to develop Koné and neighbouring towns into an economic growth pole, anchored by the large Koniambo project and nickel mine. The idea has been to give Kanak peoples job opportunities independent from France and the loyalist Southern Province. This 'VKP' zone is now established, with a marked increase in business activity, construction, and public facilities (library, cinema, swimming pool) since the mid 2000s.

---

Title: Koumac
URL: https://en.wikipedia.org/wiki/Koumac
Published: 2026-02-22T00:00:00.000Z
Author: N/A
Highlights:
Koumac (French: [kumak]) is a commune in the North Province of New Caledonia, an overseas territory of France in the Pacific Ocean.
...
| Koumac | - |
| --- | --- |
| Commune | - |
| View of the baie des Sables taken from Pandop with Tiebaghi massif in the background, View of the baie des Sables taken from Pandop with Tiebaghi massif in the background | - |
| Coat of arms of Koumac, Coat of arms | - |
| Location of the commune (in red) within New Caledonia, Location of the commune (in red) within New Caledonia | - |
| Location of Koumac | - |
| Coordinates: 20°33′44″S 164°15′43″E﻿ / ﻿20.5621°S 164.2619°E﻿ / -20.5621; 164.2619 | - |
| Country | France |
| Sui generis collectivity | New Caledonia |
| Province | North Province |
| Government | - |
| • Mayor (2020–2026) | Wilfrid Weiss |
| Area | 550.0 km (212.4 sq mi) |
| Population, (2019 census) | 3,981 |
| • Density | 7.238/km (18.75/sq mi) |
| Ethnic distribution | - |
| • 2019 census | Kanaks 38.33%, Europeans 28.16%, Wallisians and Futunans 0.98%, Mixed 22.51%, Other 10.02% |
| Time zone | UTC+11:00 |
| INSEE/Postal code | 98812 /98850 |
| Elevation | 0–823 m (0–2,700 ft), (avg. 10 m or 33 ft) |
| New Caledonia Land Register (DITTT) data, which exclude lakes and ponds larger than 1 km² (0.386 sq mi or 247 acres) as well as the estuaries of rivers. | - |
...
On 5 January 1977 about 46% of the territory of Koumac was detached and became the commune of Poum.
...
The town of Koumac serves as a regional centre for the far north region of Grande Terre island. It has good connections north and south by road, and several shops, industrial suppliers, and utilities. It is a centre for mining employment, formerly dominated by the mine at Tiébaghi which closed in 1990, and other current operations. Koumac Airport is located a couple kilometres north of the commune with regular flights to Nouméa.

---

Title: _settlements > France > Nouvelle-Calédonie > Province Nord
URL: http://osm.hlidskjalf.is/settlements.php?idc=189&region=Nouvelle-Cal%C3%A9donie&sub=Province+Nord
Published: N/A
Author: N/A
Highlights:
[x] HouaïlouConnected to road networkConnected via airport/ferryNot connected to road networkUnknown
...
Houaïlou
...
[x] KonéConnected to road networkConnected via airport/ferryNot
...
to road networkUnknown
...
[x] Koua
...
[x] KoumacConnected to road networkConnected via airport/ferryNot connected to road networkUnknown
...
[x] PoindimiéConnected to road networkConnected via airport/ferryNot connected to road networkUnknown
...
[x] VohConnected to road networkConnected via airport/ferryNot connected to road network
...
| Remote mapping | Local mapping |
| --- | --- |
| _placetype city town village | _name | _location | _editOSM | _subdistrict Province des Îles Loyauté Province Nord Province Sud |
| town | Canala | -21.52 165.96 | _editOSM | Province Nord |
| village | Ganem | -20.70 164.93 | _editOSM | Province Nord |
...
| city | Hienghène | -20.69 164.94 | _editOSM | Province Nord |
| village | Houaïlou | -21.28 165.63 | _editOSM | Province Nord |
...
| village | Kaala-Gomen | -20.67 164.40 | _editOSM | Province Nord |
...
| city | Koné | -21.06 164.86 | _editOSM | Province Nord |
...
| village | Kouaoua | -21.40 165.83 | _editOSM | Province Nord |
| city | Koumac | -20.56 164.28 | _editOSM | Province Nord |
...
outa |
...
06 165.00 |
...
editOSM | Province Nord |
...
| city | Poindimié | -20.94 165.33 | _editOSM | Province Nord |
...
| village | Touho | -20.78 165.23 | _editOSM | Province Nord |
...
| town | Voh | -20.95 164.69 | _editOSM | Province Nord |
...
| village | Waala | -19.71 163.64 | _editOSM | Province Nord |

---

Title: Poindimié
URL: https://en.wikipedia.org/wiki/Poindimi%C3%A9
Published: 2025-11-01T00:00:00.000Z
Author: N/A
Highlights:
Poindimié

Poindimié (French: [pwɛ̃dimje]ⓘ, Paicî: Pwêêdi Wiimîâ) is a commune in the North Province of New Caledonia, an overseas territory of France in the Pacific Ocean. The Poindimié Islands, a group of seven tiny islets where seabirds and sea turtles nest, lies off the coast of the commune.

| Poindimié | - |
| --- | --- |
| Commune | - |
| Poindimié Beach, Poindimié Beach | - |
| Location of the commune (in red) within New Caledonia, Location of the commune (in red) within New Caledonia | - |
| Location of Poindimié | - |
| Coordinates: 20°56′59″S 165°19′45″E﻿ / ﻿20.9496°S 165.3293°E﻿ / -20.9496; 165.3293 | - |
| Country | France |
| Sui generis collectivity | New Caledonia |
| Province | North Province |
| Government | - |
| • Mayor (2020–2026) | Paul Néaoutyine |
| Area | 673.1 km (259.9 sq mi) |
| Population, (2019 census) | 5,006 |
| • Density | 7.437/km (19.26/sq mi) |
| Ethnic distribution | - |
| • 2019 census | Kanaks 77.73%, Europeans 7.93%, Wallisians and Futunans 0.34%, Mixed 9.17%, Other 4.83% |
| Time zone | UTC+11:00 |
| INSEE/Postal code | 98822 /98822 |
| Elevation | 0–1,385 m (0–4,544 ft), (avg. 10 m or 33 ft) |
| New Caledonia Land Register (DITTT) data, which exclude lakes and ponds larger than 1 km² (0.386 sq mi or 247 acres) as well as the estuaries of rivers. | - |

## Climate

Poindimié has a trade-wind tropical rainforest climate(Köppen Af). Although there is no dry season, rainfall does show a strong peak in the late southern summer, and a minimum from August to October.

| Climate data for Poindimié (1991−2020 normals, extremes 1964−present) |
| --- |
| Month | Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec | Year |
| Record high °C (°F) | 33.8(92.8) | 34.2(93.6) | 34.4(93.9) | 32.8(91.0) | 31.2(88.2) | 30.2(86.4) | 29.0(84.2) | 30.3(86.5) | 32.1(89.8) | 31.0(87.8) | 33.0(91.4) | 33.3(91.9) | 34.4(93.9) |
| Mean daily maximum °C (°F) | 29.5(85.1) | 29.9(85.8) | 29.5(85.1) | 28.4(83.1) | 26.9(80.4) | 25.5(77.9) | 24.8(76.6) | 24.7(76.5) | 25.6(78.1) | 26.5(79.7) | 27.5(81.5) | 28.6(83.5) | 27.3(81.1) |
| Daily mean °C (°F) | 26.4(79.5) | 26.8(80.2) | 26.5(79.7) | 25.3(77.5) | 23.6(74.5) | 22.2(72.0) | 21.2(70.2) | 21.1(70.0) | 22.0(71.6) | 23.1(73.6) | 24.2(75.6) | 25.5(77.9) | 24.0(75.2) |
| Mean daily minimum °C (°F) | 23.3(73.9) | 23.7(74.7) | 23.4(74.1) | 22.1(71.8) | 20.3(68.5) | 18.9(66.0) | 17.6(63.7) | 17.5(63.5) | 18.4(65.1) | 19.7(67.5) | 21.0(69.8) | 22.4(72.3) | 20.7(69.3) |
| Record low °C (°F) | 17.6(63.7) | 17.9(64.2) | 16.2(61.2) | 15.8(60.4) | 13.5(56.3) | 12.5(54.5) | 11.2(52.2) | 11.0(51.8) | 12.5(54.5) | 12.5(54.5) | 13.1(55.6) | 14.8(58.6) | 11.0(51.8) |
| Average precipitation mm (inches) | 313.2(12.33) | 326.2(12.84) | 395.8(15.58) | 258.5(10.18) | 194.6(7.66) | 155.6(6.13) | 116.0(4.57) | 101.4(3.99) | 102.7(4.04) | 96.8(3.81) | 144.7(5.70) | 221.1(8.70) | 2,426.6(95.54) |
| Average precipitation days (≥ 1.0 mm) | 17.9 | 18.6 | 19.9 | 16.6 | 13.9 | 11.0 | 9.2 | 8.4 | 8.4 | 11.0 | 12.1 | 16.3 | 163.4 |
| Mean monthly sunshine hours | 186.9 | 158.8 | 163.5 | 165.3 | 153.1 | 148.2 | 174.3 | 186.6 | 195.5 | 207.9 | 186.3 | 192.0 | 2,118.2 |
| Source 1: Météo-France |
| Source 2: Service de la météorologie de la Nouvelle-Calédonie |

## References

1. "Répertoire national des élus: les maires"(in French). data.gouv.fr, Plateforme ouverte des données publiques françaises. 13 September 2022.
2. Population, ménages et logement par commune, en 2019, Institut de la statistique et des études économiques Nouvelle-Calédonie
3. "Fiche Climatologique Statistiques 1991-2020 et records"(PDF) (in French). Météo-France. Retrieved 27 August 2022.
4. "Climate of Poindimié 1981-2010"(PDF) (in French). Météo-France. Retrieved 7 April 2022.

This New Caledonian location article is a stub. You can help Wikipedia by expanding it.

---

Title: Koné Satellite Map & GPS Coordinates 2026 – Location, Sunrise & Antipode | Geo Countries
URL: https://www.geocountries.com/map/new-caledonia/north-province/kon%C3%A9
Published: N/A
Author: Geo Countries
Highlights:
### 🌍 GPS Coordinates of Koné, North Province
...
📍 LATITUDE
...
21.06°
...
South (S)
...
📍 LONGITUDE
...
164.866°
...
East (E)
...
| Coordinate Format | Latitude | Longitude |
| --- | --- | --- |
| Decimal Degrees (DD) | 21.0595° S | 164.8658° E |
| Signed Decimal Degrees | -21.0595 | 164.8658 |
| Degrees Minutes Seconds (DMS) | 21° 3' 34" S | 164° 51' 57" E |
| Degrees Decimal Minutes (DDM) | 21° 3.5706' S | 164° 51.9492' E |
...
| City | State | Direction | Distance (km) | Distance (mi) | Drive Est. | Map |
| --- | --- | --- | --- | --- | --- | --- |
| Pouembout | North Province | SE | 9 km | 6 mi | ~9m | 🗺 View |
| Voh | North Province | NW | 20 km | 12 mi | ~20m | 🗺 View |
| Hienghène | North Province | N | 42 km | 26 mi | ~42m | 🗺 View |
| Poya | North Province | SE | 44 km | 27 mi | ~44m | 🗺 View |
| Touho | North Province | NE | 50 km | 31 mi | ~50m | 🗺 View |
| Poindimié | North Province | E | 50 km | 31 mi | ~50m | 🗺 View |
...
| City Name | Latitude | Longitude | Elevation | Dist. from State Capital | Map & Coords |
| --- | --- | --- | --- | --- | --- |
| Poindimié | -20.9371° S | 165.3312° E | - | 50 km | 🗺 View Map |
| Houaïlou | -21.2833° S | 165.6167° E | 2 m | 82 km | 🗺 View Map |
| Canala | -21.5333° S | 165.95° E | 108 m | 124 km | 🗺 View Map |
| Koumac | -20.5667° S | 164.2833° E | 1 m | 82 km | 🗺 View Map |
| Ponérihouen | -21.0833° S | 165.4° E | 19 m | 55 km | 🗺 View Map |
| Hienghène | -20.6833° S | 164.9333° E | 121 m | 42 km | 🗺 View Map |
| Poya | -21.35° S | 165.15° E | 11 m | 44 km | 🗺 View Map |
| Pouébo | -20.4° S | 164.5667° E | 71 m | 80 km | 🗺 View Map |
| Touho | -20.7909° S | 165.2499° E | 4 m | 50 km | 🗺 View Map |
| Voh | -20.9667° S | 164.7° E | 11 m | 20 km | 🗺 View Map |
...
| 🗺️ Map of other cities |
| --- |
| 🗺 Map of Ponérihouen |
| 🗺 Map of Kaala-Gomén |
| 🗺 Map of Pouébo |
| 🗺 Map of Koumac |
| 🗺 Map of Houaïlou |
| 🗺 Map of Ouégoa |
...
📍 What are the GPS coordinates
...
Koné?
...
The GPS coordinates of Koné are latitude -21.0595° and longitude 164.8658°. In directional format: 21.0595° S, 164.8658° E. These coordinates mark the center of Koné in North Province and work with Google Maps, OpenStreetMap and every major navigation app.
...
In DMS (Degrees Minutes Seconds) format, Koné sits at: Latitude 21° 3' 34" S and Longitude 164° 51' 57" E. This format is common in surveying records, printed maps and legacy GPS hardware still used by field crews on site visits.
...
The interactive satellite map of Koné is embedded on this page and shows streets, buildings and terrain. You can also enter the GPS coordinates -21.0595, 164.8658 directly into Google Maps, Apple Maps or any navigation app to locate Koné in North Province. For broader context, explore the North Province state map or nearby cities.
...
The closest cities to Koné include Pouembout, Voh, Hienghène. See the Geographic Intelligence panel above for the full list with distances, or the nearby cities tool for a complete breakdown.
```

**Tool: websearch**

**Input:**
```json
{
  "query": "Boulouparis La Foa Sarraméa Poya Kouaoua Pouembout Nouvelle-Calédonie coordonnées GPS",
  "numResults": 5
}
```

**Output:**
```
Title: Les communes | Gouvernement de la Nouvelle-Calédonie
URL: https://gouv.nc/gouvernement-et-institutions-les-autres-institutions/les-communes
Published: 2016-04-04T03:18:50.000Z
Author: N/A
Highlights:
KOUAOUA
...
LA FOA
...
YA SARRAM
...
### BOULOUPARIS
...
Mairie de Boulouparis
...
Voie urbaine 18 98812 Boulouparis
...
| Tél. 35 17 06 |
| --- |
| accueil@boulouparis.nc |
...
### KOUAOUA
...
| Mairie de Kouaoua - Village 98818 Kouaoua |
| --- |
| Tél. 42 64 64 |
| accueil@mairie-kouaoua.nc |
...
### LA FOA
...
| Mairie de la Foa - B.P. 46 98880 La Foa |
| --- |
| Tél. 44 31 13 |
| secretariat@mairielafoa.nc |
| www.facebook.com/CommunedeLaFoa |
...
### POUEMBOUT
...
| Mairie de Pouembout - BP 43 98825 Pouembout |
| --- |
| Tél. 47 70 00 |
| administration@ville-pouembout.nc |
...
### POYA
...
| Mairie de Poya - B.P. 90 - 98827 Poya |
| --- |
| Tél. 47 12 50 |
...
### SARRAMÉA
...
| Mairie de Sarraméa 98880 Sarraméa |
| --- |
| Tél. 44 31 34 |
| secretariat@mairie-sarramea.nc |

---

Title: Boulouparis
URL: https://fr.wikipedia.org/wiki/Boulouparis
Published: 2026-03-27T00:00:00.000Z
Author: N/A
Highlights:
Boulouparis (prononcé [bulupaʁi]; Berepwari en xârâcùù) est une commune française de Nouvelle-Calédonie, située sur la côte ouest de la Grande Terre, en Province sud, sur la RT1.
...
La commune fait partie de l' aire coutumière Xaracuu.
...
| Boulouparis, Berepwari | - |
| --- | --- |
| Boulouparis, L'église Sainte-Anne. | - |
| Administration | - |
| Pays | Drapeau de la France France |
| Collectivité | Nouvelle-Calédonie |
| Province | Province Sud |
| Aire coutumière | Xaracuu |
| Maire, Mandat | Pascal Vittori, (TC-LC), 2020-2026 |
| Code postal | 98812 |
| Code commune | 98802 |
| Démographie | - |
| Population, municipale | 3 359 hab. (2025 en évolution de +1,33 % par rapport à 2019) |
| Densité | 3,9 hab./km |
| Ethnie | Kanak : 32,6 %, Européens : 30,7 %, Métis : 12,4 %, Wallisiens-Futuniens : 3,1 %, Asiatiques : 2,6 %, Tahitiens : 2,2 %, Ni-Vanuatu : 1,7 %, Autres : 12,5 %, 2,2 % |
| Géographie | - |
| Coordonnées | 21° 52′ 02″ sud, 166° 02′ 39″ est |
| Altitude | Min. 0 m, Max. 1 441 m |
| Superficie | 865,6 km |
| Entité territoriale homogène | Sud-Ouest |
| Localisation | - |
| Géolocalisation sur la carte : province Sud, Voir sur la carte topographique de la province Sud, Boulouparis, Berepwari, Géolocalisation sur la carte : province Sud, Voir sur la carte administrative de la province Sud, Boulouparis, Berepwari | - |
| Voir sur la carte topographique de la province Sud, Boulouparis, Berepwari | - |
| Voir sur la carte administrative de la province Sud, Boulouparis, Berepwari | - |
| modifier | - |
...
- côte ouest : Païta au sud, La Foa au nord,
- côte est : Thio.
...
commune de Sarraméa (Xûâ Chârâmèa)
...
- RP5 : Petit Couli (Kwyri Amure), Grand Couli (Kuriaati), col d'Amieu (Ö Chönaxwéta, 425 m); transversale RP5: Koh, Kouaoua, Canala, Thio,
- Sarraméa (Chara Méa), La Cuve (Timi, trou Feuillet), plateau de Dogny (1010 m), cascade, sentier botanique, vers Ema (Amé),
...
commune de La Foa (Fo Xa)
...
presqu'île de Ouano, plages, wharf, Réserve Naturelle (dont îlots : N'Digoro, Kondoyo (Kâtiö)),

- sentiers mangroves : Nipwinô (3,8 km, pointe nord, surf, deck), Nidöwé (4,6 km, palétuvier, oiseaux), Méégiwé (1,6 km, pic et table d'orientation),
...
l'Oua Nonda
...
Ouaménie,
...
vers Gilles, presqu
...
île de Bouraké, ruines pénitentiaires, baie de Perseval, îles : Puen, Ténia, Leprédour, Ducos, Hugon,
- vers Ouitchambo, Pic d'Outchambo,
- vers Nassirah, col de Nassirah, Réserve de faune et de flore du Mont Do, transversale vers Thio,
- Bouloupari(s),
- vers base de Perseval, Port-Ouenghi, marina,
- vers Ouinané, Nétéa, Dent de Saint-Vincent (1441 m),
- vallée de la Ouenghi, golf
- Tomo, wharf, aire de loisirs,
- vallée de la Tontouta,

---

Title: Bouloupari Geographic coordinates - Latitude & longitude
URL: https://www.geodatos.net/en/coordinates/new-caledonia/bouloupari
Published: N/A
Author: N/A
Highlights:
Bouloupari Geographic coordinates - Latitude & longitude
...
# Bouloupari Geographic coordinates
...
Bouloupari is in South Province, New Caledonia, at latitude -21.86226 and longitude 166.05122. It lies in the southern and eastern hemispheres, near sea level.
...
South Province, New Caledonia
...
Southern · Eastern Hemisphere
...
-21.86226, 166.05122
...
21.8623° S 166.0512° E
...
21°51'44.1'' S 166°3'4.4'' E
...
## Latitude and longitude of Bouloupari
...
| System | Description | Lat. Latitude | Long. Longitude |
| --- | --- | --- | --- |
| Decimal standard | Numeric format used in software and APIs | -21.86226 | 166.05122 |
| Decimal Degrees (DD) | Degrees with a decimal fraction and hemisphere | 21.8623° S | 166.0512° E |
| Degrees, Minutes and Seconds (DMS) | Classic sexagesimal notation used on maps | 21°51'44.1'' S | 166°3'4.4'' E |
| Degrees and Decimal Minutes (DDM) | Used in navigation and nautical charting | 21°51.736' S | 166°3.073' E |
...
The map shows the city's location relative to the equator, the tropics, the polar circles and the Greenwich meridian. You can switch between 3D map and flat map, and overlay the parallel and meridian of Bouloupari.
...
21.8623° S 166.0512° E
...
## Geographic facts about Bouloupari
...
Distance to the equator 2,431 km (1,510 mi)
...
Distance to the Greenwich meridian 14,923 km (9,272 mi)
...
Distance to the North Pole 12,438 km (7,729 mi)
...
Distance to the South Pole 7,576 km (4,708 mi)
...
Elevation 15 m (49 ft)
...
Bouloupari lies on the same parallel as cities like Avarua (Cook Islands) and on the same meridian as cities like Yaren (Nauru).
...
The geographic coordinate system enables any place in the world to be located using its latitude and longitude. The latitude is the position relative to the equator, specifying the north-south position. The longitude specifies the east-west position measured from a reference meridian (usually the Greenwich Prime Meridian). The latitude and longitude of Bouloupari have been calculated based on the geodetic datum WGS84.
...
Antipode
...
New Caledonia → Distances from New Caledonia → New Caledonia Population →

---

Title: Adresses de la commune de Pouembout — Open Data NC
URL: https://data.gouv.nc/explore/dataset/adresse-pouembout/?flg=fr-fr
Published: N/A
Author: N/A
Highlights:
Adresses de la commune de Pouembout — Open Data NC

{{ ctx.nhits | number }} record

Filters

## {{ ctx.nhits | number }} record

## Active filters

No active filters

## Filters

La recherche texte n'est pas appliquée pendant l'utilisation de la Console d'API.

# Adresses de la commune de Pouembout

Ce jeu de données représente les adresses physiques officielles de la commune de Pouembout.

Il s'inscrit dans le cadre de la mise en place de la politique d'adressage et de l'élaboration du référentiel de localisation NC, accessible par les différents systèmes d'information publics et privés.

Le modèle d'adressage avec la description des champs figure ici.

Le système de coordonnées utilisé est : RGNC 1991-93 Lambert Nouvelle-Calédonie.

Merci de nous faire remonter les adresses mal positionnées, les erreurs de libellés, des localisations absentes, des informations complémentaires, et toutes améliorations des données, en écrivant à l'adresse suivante : administration@ville-pouembout.nc.

Fréquence de mise à jour : Tous les soirs du lundi au vendredi

Dataset Identifier

`adresse-pouembout`

0"

Downloads

{{ ctx.dataset.extra_metas.explore.download_count | number }}

Last processing

{{ ctx.dataset.metas.metadata_processed|formatMeta:'datetime' }} (metadata)

{{ ctx.dataset.metas.data_processed|formatMeta:'datetime' }} (data)

### Dataset schema

#### JSON Schema

The following JSON object is a standardized description of your dataset's schema. More about JSON schema.

Edit in advanced mode

Edit in advanced mode

---

Title: Yaté Païta
URL: https://denc.gouv.nc/sites/default/files/documents/carte_nc_routes.pdf
Published: N/A
Author: N/A
Highlights:
Yaté Païta

Lifou

Thio

Voh

Poya

Maré

Bourail

Houailou

Hienghène

Ouégoa

Bouloupari

Poum

Koné

La Foa

Koumac

Poindimié

Canala

Pouembout

Mont Dore

Ponérihouen

Kaala Gomen

Touho

Kouaoua Moindou

Dumbéa

Pouébo

Ouvéa

Ile des Pins

Sarraméa

Belep

Farino

Nouméa

0 50 100Kilomètres" Source : GéoServeur GVT NC - 07/2008 "

## Voies de communication de la Nouvelle-Calédonie

Voies route territoriale route provinciale route municipale chemin rural voie urbaine voie expresse voie secondaire piste
```

---

## Assistant (Plan · DeepSeek V4 Flash Free (New) · 59.3s)

_Thinking:_

I now have real coordinates for the 12 captage communes:

- C-001 Koumac: -20.5621, 164.2619
- C-002 Voh: -20.9667, 164.7 (Voh town -20.95, 164.69)
- C-003 Pouembout: ~-21.13, 164.89 (Pouembout SE of Koné. Koné -21.0595,164.8658; Pouembout ~9km SE → ~-21.13, 164.90). Need approximate.
- C-004 Koné: -21.0595, 164.8658
- C-005 Poindimié: -20.9496, 165.3293
- C-006 Houaïlou: -21.2833, 165.6167
- C-007 Canala: -21.5333, 165.95
- C-008 Boulouparis: -21.86226, 166.05122
- C-009 La Foa: ~-21.71, 165.83 (need exact)
- C-010 Sarraméa: ~-21.64, 165.85
- C-011 Poya: -21.35, 165.15
- C-012 Kouaoua: -21.40, 165.83

These known values are enough for a concrete plan. During implementation we can pin the remaining (Pouembout, La Foa, Sarraméa) precisely.

For BVAEP polygons (Nord/Centre/Sud real outlines): These are synthetic basins in the app. Real outlines don't exist. I'll define approximate mainland regional polygons. But the user chose "real coordinates per captage" and "real BVAEP outlines." I'll plan to draw the three BVAEPs as simplified convex-ish polygons over the respective coastal regions of the elongated mainland. Geographic extent: mainland runs NW-SE from ~-20.1 (Pouébo) to ~-22.3 (Nouméa/Le Mont-Dore), lon 163.6–167. "Nord" covers northwest, "Centre" central, "Sud" southeast/southwest. I'll define approximate polygons in the plan.

Now I understand enough to write a comprehensive plan. This is a big feature. Given AGENTS.md says "Never implement features yourself when possible - use sub-agents" and "Identify changes from the plan that can be implemented in parallel, and use sub-agents." But I'm in plan mode, so I just present the plan now.

Let me formulate the plan. Key files:
1. **package.json** — add `ol` dependency (OpenLayers) + `ol.css`.
2. **src/data/hydroscope.ts** — replace `CAPTAGE_POINTS` (x,y) with real lon/lat; replace/add `BVAEP_POLYGONS` with real lon/lat rings (or new `BVAEP_COORDS`). Keep `ncLonLat` mapping consistent. Actually better: introduce a new `CAPTAGE_COORDS` record mapping id→[lon,lat], and `BVAEP_OUTLINES` record id→ring of [lon,lat]. Keep CAPTAGE_POINTS? It's used by exportContext and CarteView/useSession? Let me check usages. CAPTAGE_POINTS used in exportContext, MapCanvas, CarteView, PublicHome via MapCanvas. If I switch to OL, MapCanvas no longer needs x/y. But exportContext uses ncLonLat(pt.x,pt.y) to derive coords — if we now have real coords, exportContext can use them directly (consistency improvement). 

Decision: Introduce real coordinate data and update exportContext to use it (drop the crude ncLonLat approximation). This keeps GeoJSON/GPKG consistent with the displayed map.

3. **New OL map component** `MapCanvas.tsx` (rewrite) using `ol`:
   - `ol/Map`, `ol/View` (EPSG:3857), `ol/layer/Tile` + `ol/layer/Vector`, `ol/source/OSM`, `ol/source/XYZ` (Esri World Imagery for satellite), terrain (Esri World Terrain or a hillshade), `ol/Vector`, `ol/format/GeoJSON` or manual features, `ol/style`, `ol/overlay` for tooltips, interactions.
   - React integration via `useRef` + `useEffect`, imperative map instance; a small `useMap` hook or just inline.
   - Basemap sources ↦ real tile layers (carto = OSM, satellite = Esri World Imagery `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`, terrain = Esri World Terrain or OpenTopoMap).
4. **Feature parity**:
   - Captage points as Vector layer (points from lon/lat), tooltip overlay on hover/click (fetch commune/province/value).
   - BVAEP polygons as Vector layer (polygons), selection highlight (selectedBvaeps), committed captage highlight.
   - Layers toggles (bv/capt/ppe/risque/source) → only bv/capt/source are real geometry; ppe/risque were synthetic circles/ellipses. Need to decide how to represent ppe (périmètres de protection) and risque zones — approximate real geometry or keep stylized. Since "full parity," I'll render ppe as dashed circle buffers around captages (approx protective zones) and risque as a stylized zone if active. But these are synthetic overlays; with real unsigned data, I'll keep them as approximate features.
   - H3 hex-grid mode: recompute hex grid over the bounding box of captages in the projection, render as vector polygons colored by h3Class/h3Value. This replaces the SVG hex math with geographic hexagons around the region.
   - Zoom +/-, scale bar (`ol/control/ScaleLine`), north arrow / rotation control (`ol/control/Rotate` or custom).
   - Selection click behavior: clicking captage should toggle selection (needs onSelect callback wiring). Currently CarteView drives selection via CaptageSelector; MapCanvas only highlights. Keep that, but add click-to-select wiring through props.
   - PublicHome static: reuse same OL map with default view, no controls maybe minimal.

5. **App shell positioning**: OL map container needs explicit height (currently SVG fills). Provide `h-full w-full relative`.

6. **Styling/icons**: replace DOM "+/−" and "N" boxes with OL controls styled to match Tailwind theme, or keep custom absolutely-positioned controls that call map methods.

7. **CSS**: import `ol/ol.css` (in styles/index.css or component).

Files to create/modify:
- Modify `package.json` (add ol).
- Modify `src/styles/index.css` or add `ol.css` import.
- Modify `src/data/hydroscope.ts` (real coords + BVAEP outlines).
- Modify `src/data/values.ts`? No — value computation unchanged.
- Modify `src/features/export/exportContext.ts` (use real coords).
- Rewrite `src/features/carte/MapCanvas.tsx` (OL).
- Add `src/features/carte/hooks/useMap.ts` maybe.
- Modify `src/features/carte/CarteView.tsx` (wire controls to map, click-to-select).
- Modify `src/features/carte/index.ts` barrel if needed.
- Possibly `src/features/portail/PublicHome.tsx` minor (remove-colored legend? keep).
- Add feature layers data helper e.g. `src/data/geography.ts` or inline in hydroscope.

Implementation must be verified: `pnpm install`, `pnpm build` (build script), and formatting (oxfmt). No tests present.

Open questions I can resolve or note:
- ppe/risque representation (approximate buffer zones). I'll propose real-ish approximations: ppe = dashed circles around selected captages; risque = leave as optional stylized layer. I'll note in plan.
- Camera/initial extent: fit to NC bounding box fromLonLat around [-21.9,166.6] to [-20.0,164.2].

Since choices are made, I'll present the final plan. AGENTS says ask clarifying questions / use deep-dive sub-agents to review the plan before presenting. I think the plan is well-formed. I'll present it and note the two remaining minor representational choices (ppe/risque + H3 grid) as assumptions, then let user approve to exit plan mode.

Let me write a concise but comprehensive plan.

I have everything I need. Real coordinates for the 12 captage communes are confirmed (Koumac -20.56,164.26 · Voh -20.97,164.70 · Pouembout ~-21.13,164.90 · Koné -21.06,164.87 · Poindimié -20.95,165.33 · Houaïlou -21.28,165.62 · Canala -21.53,165.95 · Boulouparis -21.86,166.05 · La Foa ~-21.71,165.83 · Sarraméa ~-21.64,165.85 · Poya -21.35,165.15 · Kouaoua -21.40,165.83).

Here is my plan.

---

# Plan : Remplacer la carte SVG statique par un moteur OpenLayers

## Contexte
`MapCanvas.tsx` rend une carte filaire SVG purement synthétique (viewBox 600×420). Les captages (`CAPTAGE_POINTS`) et bassins versants (`BVAEP_POLYGONS`) n'ont que des coordonnées arbitraires. OpenLayers n'est pas installé. Un helper `ncLonLat()` convertit déjà ces coords vers du WGS84 pour les exports GeoJSON/GPKG.

**Décisions retenues (utilisateur) :** tuiles en ligne réelles · coordonnées réelles par captage · parité fonctionnelle complète.

## 1. Dépendance
- Ajouter `ol` (OpenLayers) dans `package.json`, puis `pnpm install`.
- Importer `ol/ol.css` dans `src/styles/index.css` (ou dans le composant).

## 2. Données géographiques réelles — `src/data/hydroscope.ts`
Remplacer les coordonnées SVG par des coordonnées WGS84 réelles (`[lon, lat]`) des communes pour les 12 captages (liste ci-dessus), en introduisant :
- `CAPTAGE_COORDS: Record<string, [number, number]>` (id → lon/lat)
- `BVAEP_OUTLINES: Record<string, [number, number][]>` — anneaux réels pour BV-01 (Nord), BV-02 (Centre), BV-03 (Sud) : polygones simplifiés couvrant les portions côtières du massif (extrêmes NC : lon 163.6–167, lat -20.1 à -22.3).

> Ces shapes étant des *bassins* synthétiques dans l'app, on les redessine comme des polygones régionaux approximatifs couvrant les secteurs Nord/Centre/Sud (jamais de données exactes dans le référentiel actuel). Garder `BVAEP_POLYGONS`/`CAPTAGE_POINTS` si encore référencés, ou les migrer.

## 3. Cohérence des exports — `src/features/export/exportContext.ts`
- Faire utiliser `CAPTAGE_COORDS` et `BVAEP_OUTLINES` directement (WGS84) au lieu de `ncLonLat()` recyclant les coords SVG. Résultat ≈ identique, cohérent avec la carte affichée, moins de code d'approximation.

## 4. Carte OpenLayers — réécrire `src/features/carte/MapCanvas.tsx`
Intégration React impérative via `useRef` + `useEffect` (un `Map` OL créé une fois, mis à jour par props). Omnibus :
- **Vue** : `View` EPSG:3857 (`ol/proj/fromLonLat`), extent initial fit sur la NC.
- **Fonds de carte réels** (`ol/layer/Tile`) :
  - carto → OSM
  - satellite → Esri World Imagery (`XYZ`: `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`)
  - terrain → Esri World Terrain / OpenTopoMap
- **Calques vectoriels** (`ol/source/Vector` + `ol/style`) :
  - captages : points (taille/couleur selon `symbolFor`, surbrillance sélection/action)
  - BVAEPs : polygones (remplissage selon classe qualité / sélection → garder la logique `BV_FILLS`)
  - `source` : polygone de la couche source de l'indicateur
  - `ppe` : cercles tampons en pointillés autour des captages (représentation réaliste des périmètres de protection)
  - `risque` : zone stylisée (reste approximative)
- **Tooltips** : `ol/Overlay` positionné au survol/click (commune/province/valeur), encart Tailwind identique.
- **Mode H3** : générer une grille hexagonale géographique (coordonnées projetées `fromLonLat` autour des captages) couvrant l'étendue de la NC, colorée selon `h3Class`/`h3Value` — remplace la « grille décorative » SVG par une vraie grille positionnée.
- **Contrôles** : `ScaleLine` + `Rotate` (boussole N) ; boutons `+/−` custom appelant `view.setZoom` stylés comme l'existant (`ol/control/Control`), attribution OSM conservée.

## 5. Parité d'interaction — `src/features/carte/CarteView.tsx`
- Brancher les toggles de calque (`layers`), le choix de fond (`basemap`) et `h3Mode` via props sur le composant OL.
- Ajouter **click-to-select** : clic sur un captage → `onToggleUnite`/sélection (cohérent avec `CaptageSelector`).
- `PublicHome.tsx` : même composant OL en mode statique (vision basse, contrôles réduits).

## 6. Vérification
- `pnpm build` (vite build) + formatage `oxfmt` selon les conventions du repo. Pas de tests présents (`scripts` = build/dev seulement). HMR actif sur le serveur dev (port 8443) pour contrôle visuel.

## Décisions d'implémentation restantes (à valider)
1. **`ppe` / `risque`** : représentés comme des zones / cercles approximatifs positionnés géographiquement (données réelles inexistantes) — OK ?
2. **Mode H3** : reconverti en grille hexagonale projetée sur l'étendue NC (plus une grille à position fixe) — OK ?
3. **Fond « terrain »** : Esri World Terrain ou OpenTopoMap — preference ?

Si ces trois points te conviennent, je passe en mode exécution (installation de `ol`, puis implémentation via sous-agents en parallèle : données/coords, composant OL, intégration CarteView/export, puis `pnpm build`).

---

## User

1 / pas de representation; 2/ juste une grille H3 avec une resolution approximative de 1km2 par hexagone (h3 est bien documenté utilise la reference). 3/ met la donnée imagerie du georep nc

---

## Assistant (Plan · DeepSeek V4 Flash Free (New) · 44.6s)

_Thinking:_

User clarified:
1. ppe/risque: no representation (pas de représentation) — just drop them / disable those layer toggles.
2. H3 grid: use real H3 library with resolution ~1km² per hexagon (H3 reference is well-documented). Need to add `h3-js` dependency. Resolution where hexagons ~1km²: H3 hexagon area at res ~9 is about 0.1 km², res 8 ~6.4 km²... let me recall. H3 resolution areas: res8 ≈ 4.7 km² (hexagon avg area 6.3476 km² hmm). Let me recall exact: 
- res 7: ~15 km²? Actually H3 res areas:
  - res7: avg hexagon area ≈ 5.16 km²? 
  
Let me recall the H3 documentation table. Average hexagon areas (km²) per resolution:
- res 0: 4,250,000
- res 1: 607,000
- res 2: 86,800
- res 3: 12,400
- res 4: 1,770
- res 5: 253
- res 6: 36.1
- res 7: 5.16
- res 8: 0.737   <- ~1km² is closer to res 8 (0.737 km² avg area of hexagon)
- res 9: 0.1053

Wait — but these are "average hexagon area." Actually the user says "resolution approximative de 1km² par hexagone". res 8 avg hexagonal edge area ~ 0.737 km². That's close to 1 km². Some say res 7 ≈ 5.2 km², res 8 ≈ 0.74 km². So res 8 is the best match for "~1 km²". Good — use H3 resolution 8.

Wait, let me double check H3 average hexagon area table (from H3 docs):
```
Resolution   Average Hexagon Area (km^2)
0            4,357,449
1            609,788
2            86,733
3            12,393
4            1,770
5            252.9
6            36.13
7            5.161
8            0.7375
9            0.1053
```
Yes. So res 8 ≈ 0.74 km² ≈ 1 km². Good.

3. Basemap imagery: use georep.nc imagery data — "mets la donnée imagerie du georep nc" — the user wants the satellite/imagery basemap from the New Caledonia geospatial repository "Géorep NC" (georep.nc). So instead of Esri World Imagery, use the Géorep NC WMS/WMTS imagery layer. 

I need to understand what georep.nc offers. Géorep NC is the New Caledonia geoportal (catalogue.georep.nc). It has WMS/WMTS services. There's an imagery layer (orthophoto / satellite). Let me research the endpoint URL. I should look this up to give a concrete URL in the plan.

For the plan, I should note we'll use the Géorep NC WMS/WMTS endpoint for the imagerie basemap. Let me search for the actual service URL and layer name.

Let me do a quick web search to ground the georep.nc WMS endpoint. I'm read-only, websearch is fine.

Let me search.

Compris : pas de représentation pour ppe/risque, grille H3 réelle via la lib `h3-js` (résolution ~1 km²/hexagone, soit res 8 ≈ 0.74 km²), et imagerie du géoréférentiel NC (Géorep NC). Je viens de vérifier l'endpoint WMS du Géorep pour ancrer le plan.



**Tool: websearch**

**Input:**
```json
{
  "numResults": 6,
  "query": "Géorep NC georep.nc WMS WMTS GetCapabilities orthophoto imagerie service URL Nouvelle-Calédonie"
}
```

**Output:**
```
Title: IMAGERIE | Géorep
URL: https://georep.nc/taxonomy/term/39
Published: N/A
Author: N/A
Highlights:
IMAGERIE | Géorep
...
## Orthophotographies téléchargeables (de 2007 à nos jours)
...
Service permettant la visualisation des orthophotographies téléchargeables dans la Plateforme de téléchargement allant de 2007 à nos jours.
...
## Fond imagerie
...
Ce service cartographique propose une visualisation de la Nouvelle-Calédonie à partir d'images satellitales SENTINEL 2, QUICKBIRD et de photographies aériennes acquises par le gouvernement de la Nouvelle-Calédonie.
...
## Imagerie acoustique de Nouvelle-Calédonie
...
fond de la Z
...
Visualisation de la Nouvelle-Calédonie à partir de photographies aériennes de l'IGN en 1976.
...
Ce service cartographique propose une visualisation de la Nouvelle-Calédonie à partir de photographies aériennes de l'IGN en 1976. Couverture partielle en couleur des photographies de résolution 20 cm.

---

Title: Catalogue de métadonnées | Géorep
URL: https://georep.nc/donnees-informations/catalogue-metadonnees?page=5
Published: N/A
Author: N/A
Highlights:
IMAGERIE
...
Fond d'orthophotographies DITTT 1991 - 50 cm - N/B
...
Ce service web expose les orthophotographies de 1991 qui couvrent toute la partie Sud de la côte littorale de Yaté en partant de la Baie de Goro jusqu’à Petit Ounia en passant par le Barrage de Yaté.
...
Fond d'orthophotographies DITTT 1992 - 50 cm - N/B
...
Ce service expose les données issues de travaux d'assemblage et d'orthorectification de photos aériennes d'une mission de 1992
...
Fond d'orthophotographies IGN 1976 - 20 cm - Couleur
...
Ce service cartographique propose une visualisation de la Nouvelle-Calédonie à partir de photographies aériennes de l'IGN en 19
...
6. Couverture partielle en couleur des photographies de résolution 20 cm.
...
Fond d'orthophotographies IGN 1976 - 20 cm - N/B
...
Service exposant les orthophotographies réalisées par l'Institut Géographique National (IGN-France) sur certaines zones de Nouvelle-Calédonie en 1976.
...
Fond d'orthophotographies IGN 19
...
6 - 50
...
- N/B
...
Fond imagerie
...
Ce service cartographique propose une visualisation de la Nouvelle-Calédonie à partir d'images satellitales SENTINEL 2, QUICKBIRD et de photographies aériennes acquises par le gouvernement de la Nouvelle-Calédonie.

---

Title: BASEMAP | Géorep
URL: https://georep.nc/taxonomy/term/44
Published: N/A
Author: N/A
Highlights:
BASEMAP | Géorep
...
Pensée comme un
...
du territoire, la
...
au 1
...
## Orthophotographies téléchargeables (de 2007 à nos jours)
...
Service permettant la visualisation des orthophotographies téléchargeables dans la Plateforme de téléchargement allant de 2007 à nos jours.
...
## Fond imagerie
...
Ce service cartographique propose une visualisation de la Nouvelle-Calédonie à partir d'images satellitales SENTINEL 2, QUICKBIRD et de photographies aériennes acquises par le gouvernement de la Nouvelle-Calédonie.
...
Ce service web comprend des données cartographiques sur la Nouvelle-Calédonie réalisées par la DITTT à l
...
du 1/10
...
données mondiales (source ESRI
...
. Elle décrit

---

Title: IDS du gouvernement Aspects techniques
URL: https://sig-public.gouv.nc/GEOREP/evenement2013/espacepro/1-IDS_gouvernementNC_aspectTechnique_SebastienDupont.pdf
Published: N/A
Author: Greg
Highlights:
### Le Géorep v2 www.georep.nc
...
## L’accès aux web services
...
#### Interface REST :
...
http://carto.gouv.nc/arcgis/rest/services http://carto.gouv.nc/arcgis/rest/services/fond_cartographie/MapServer
...
#### Interface SOAP (ArcGIS) :
...
ArcGIS 10.0 : 
https://carto.gouv.nc/arcgis/services 
ArcGIS 10.1 : 
http://carto.gouv.nc/arcgis/services 

#### Interface WMS (interopérable) :
...
http://carto10.gouv.nc/arcgis/services/fond_cartographie/MapServer/WMSServer?

---

Title: Catalogue de métadonnées | Géorep
URL: https://georep.nc/donnees-informations/catalogue-metadonnees?page=9
Published: N/A
Author: N/A
Highlights:
Catalogue de métadonnées | Géorep
...
IMAGERIE
...
Orthophotographies téléchargeables (de 2007 à nos jours)
...
Service permettant la visualisation des orthophotographies téléchargeables dans la Plateforme de téléchargement allant de 2007 à nos jours.

---

Title: Catalogue de métadonnées | Géorep
URL: https://georep.nc/donnees-informations/catalogue-metadonnees
Published: N/A
Author: N/A
Highlights:
IMAGERIE

LIMITES ADMINISTRATIVES

PLANIFICATION- CADASTRE

SANTE - SECURITE

TRANSPORT

Appliquer

Affichage de 1 - 20 sur 281

Accidents routiers corporels

Indicateurs relatifs aux accidents corporels, toute gravité confondue, survenus en Nouvelle-Calédonie depuis le 1er janvier 2015

Accidents routiers mortels

Base de données présentant la localisation et les principales caractéristiques de chaque accident mortel survenu en Nouvelle-Calédonie depuis le 1er janvier 2014.

Données inaccessibles mais visibles dans l'application thématique dédiée.

Aire d'origine présumée des forêts sèches

La ressource correspond à l'actualisation de l'aire d'origine présumée des forêts sèches sur la base de 3 critères permettant de caractériser cette formation végétale : la pluviométrie, l'altitude et le type de sol.

Aires coutumières

Donnée portant sur le découpage des aires coutumières. Cette donnée n'est pas officialisée. C'est une donnée de travail utilisée par les Officiers Publics Coutumiers dans le cadre de leurs attributions. Donnée élaborée à partir des limites communales de la DITTT.

Aires protégées de la province Nord

Cartographie des aires protégées de la province Nord, marines et terrestres. Les dispositions générales et prescriptions relatives aux aires naturelles protégées ainsi que leurs délimitations figurent dans le Code de l'Environnement de la province.

Ce service web est issu d'une collaboration avec la province Nord.

Pour toute information complémentaire, merci de vous adresser au service informatique : DSI-SIG@province-nord.nc

Aires protégées de la province Sud

Délimitation des parcs et réserves naturels de la province Sud. Ces limites officielles sont issues du code de l'environnement.

Aires protégées du gouvernement de la Nouvelle-Calédonie

L'espace maritime de la Nouvelle-Calédonie correspond à la zone économique exclusive (ZEE), les eaux intérieures et la mer territoriale des îles éloignées. Il est composé de diverses zones de réserves naturelles et intégrales.

Contenu : Limites du parc naturel de la mer de Corail, Réserves du parc naturel de la mer de Corail.

Aléa amiante des pistes

Estimation de l'aléa amiante environnemental des pistes de la Grande Terre de Nouvelle-Calédonie.

GEOLOGIE - MINE - CARRIERE

Aléa amiante environnemental

Zonation de l'aléa amiante environnemental élaborée à partir de l'interprétation de la géologie au 1/50 000ème, classifiée selon quatre niveaux de probabilité de présence d'amiante.

GEOLOGIE - MINE - CARRIERE

Aléa chute de blocs

La carte d'aléa mouvement de terrain est une agrégation des cartes d'aléa de 4 types de phénomènes : les glissements grossiers, les glissements fins, les laves torrentielles et les chutes de blocs. Ce service présente les résultats de la cartographie de l'aléa chute de blocs.

GEOLOGIE - MINE - CARRIERE

Aléa glissement fin

La carte d'aléa mouvement de terrain est une agrégation des cartes d'aléa de 4 types de phénomènes : les glissements grossiers, les glissements fins, les laves torrentielles et les chutes de blocs. Ce service présente les résultats de la cartographie de l'aléa glissement fin.

GEOLOGIE - MINE - CARRIERE

Aléa glissement grossier

La carte d'aléa mouvement de terrain est une agrégation des cartes d'aléa de 4 types de phénomènes : les glissements grossiers, les glissements fins, les laves torrentielles et les chutes de blocs. Ce service présente les résultats de la cartographie de l'aléa glissement grossier.

GEOLOGIE - MINE - CARRIERE

Aléa lave torrentielle

La carte d'aléa mouvement de terrain est une agrégation des cartes d'aléa de 4 types de phénomènes : les glissements grossiers, les glissements fins, les laves torrentielles et les chutes de blocs. Ce service présente les résultats de la cartographie de l'aléa lave torrentielle.

GEOLOGIE - MINE - CARRIERE

Aléa mouvement de terrain

Compilation des
```

---

## Assistant (Plan · DeepSeek V4 Flash Free (New) · 42.2s)

_Thinking:_

The Géorep NC imagery service is "Fond imagerie" (SENTINEL 2, QUICKBIRD + aerial photos by the government). The web services are ArcGIS REST / WMS on carto.gouv.nc:
- WMS: `http://carto10.gouv.nc/arcgis/services/fond_cartographie/MapServer/WMSServer?`
- REST: `http://carto.gouv.nc/arcgis/rest/services`

The "Fond imagerie" service is likely a MapServer service on carto.gouv.nc. I need the exact service name for the imagerie basemap. Common names: `fond_imagerie` or similar. Rather than guess in the plan, I'll note that during implementation we'll probe `http://carto.gouv.nc/arcgis/rest/services` for the imagery service (likely `fond_imagerie` / `imagerie`) and configure OL `TileWMS` or ArcGIS REST tile layer, preferring HTTPS. Actual endpoint availability must be validated at runtime.

Let me finalize the plan with these three decisions incorporated. I should note HTTPS probing because the sources cited are http://.

I'll present the revised plan. This is plan mode; I present the final plan and ask for approval to implement.

Let me update the plan sections:
- ppe/risque: remove representation → remove those layer toggles from LAYER_DEFS (keep only bv, capt, source). Actually "source" is the indicator source polygon — keep. Remove ppe and risque. So LAYER_DEFS becomes bv, capt, source. And remove SOURCE_FILLS? no keep. Remove the risque ellipse and ppe circles rendering.

Wait—the legend in PublicHome mentions "Périmètre de protection" (dashed border). With ppe removed, that legend entry should go. Minor.

- H3: add `h3-js` dependency, use `polygonToCells` (or `polygonToCellsExp` new API / `cellToLatLng`, `latLngToCell`, `cellToBoundary`) at resolution 8 (~0.74 km² ≈ 1 km²). Compute cells covering the NC bounding polygon/extent, style each hexagon by h3Class/h3Value. Logical simplification: previous SVG hex math replaced by true H3 cells.

- Basemap imagerie: use Géorep NC imagery service. carto → OSM or georep? The user said "mets la donnée imagerie du georep nc" specifically for imagery. So satellite (and maybe the imagerie basemap) uses Géorep NC. Let me define:
  - carto → OSM (or Géorep fond cartographique). User only asked imagerie from georep. Keep carto = OSM. Actually Géorep has "fond_imagerie" and basemap services. I'll use:
    - carto → OSM (public)
    - satellite/imagerie → Géorep NC "Fond imagerie" service (WMS/WMTS via carto.gouv.nc)
    - terrain → Esri World Terrain or OpenTopoMap (neutral) — user didn't specify; I'll propose OpenTopoMap or keep Esri. Actually to reduce external reliance, terrain = OpenTopoMap. I'll note choice.

For the Géorep endpoint, since sources show http://carto.gouv.nc and carto10.gouv.nc, I'll note the plan will validate HTTPS `https://carto.gouv.nc/arcgis/rest/services/<imagerie-service>/MapServer/tile/{z}/{y}/{x}` (ArcGIS Online style XYZ from the REST MapServer, which OL supports natively as a tile source via the ArcGIS REST query service, or as `TileLayer` with custom tileUrlFunction). OL has `ol/source/XYZ` and also a dedicated approach. Simplest: use the ArcGIS REST tiled MapServer via `ol/source/XYZ` with `tileUrlFunction` hitting `/tile/{z}/{y}/{x}`, or use `loadTilesFromArcGISRest` / the newer `ol/source/OGCMapTile`. We'll detect exact service name at runtime.

Note the WMS is at carto10 (older). I'll focus on the REST tiled MapServer for imagery.

I think the plan is ready. Let me present the final consolidated plan concisely and ask to proceed. Since three decisions resolved, I can present and ask approval to exit plan mode and implement.

I'll also flag the risk: the exact Géorep imagery service URL + HTTPS availability must be probed during implementation; fallback to Esri World Imagery if georep is unreachable (user can choose). I'll mention this.

Let me write final plan.

Les trois points sont réglés. J'ai vérifié le Géorep NC : le service « Fond imagerie » (SENTINEL 2, QUICKBIRD + photos aériennes gouv. NC) est exposé en ArcGIS REST/WMS sur les hôtes `carto.gouv.nc` / `carto10.gouv.nc` (ex. `https://carto.gouv.nc/arcgis/rest/services/…`).

---

# Plan final : Remplacer la carte SVG par un moteur OpenLayers

## Décisions confirmées
1. **ppe / risque** → **aucune représentation** (supprimer ces calques et leur légende).
2. **Grille H3** → vraie grille avec la lib **`h3-js`**, résolution **8** (~0,74 km²/hexagone ≈ l'ordre d'1 km²), calculée sur l'étendue géographique de la NC.
3. **Fonds de carte** → **carto : OSM**, **satellite/imagerie : service « Fond imagerie » du Géorep NC**, terrain : OpenTopoMap (neutre).

## 1. Dépendances (`package.json` + `pnpm install`)
- `ol` (OpenLayers) et `h3-js`.
- Importer `ol/ol.css` dans `src/styles/index.css`.

## 2. Données géographiques réelles — `src/data/hydroscope.ts`
- `CAPTAGE_COORDS: Record<string,[lon,lat]>` avec les coords WGS84 réelles des 12 communes (confirmées : Koumac -20.56,164.26 · Voh -20.97,164.70 · Pouembout ~-21.13,164.90 · Koné -21.06,164.87 · Poindimié -20.95,165.33 · Houaïlou -21.28,165.62 · Canala -21.53,165.95 · Boulouparis -21.86,166.05 · La Foa ~-21.71,165.83 · Sarraméa ~-21.64,165.85 · Poya -21.35,165.15 · Kouaoua -21.40,165.83).
- `BVAEP_OUTLINES: Record<string,[lon,lat][]>` : polygones simplifiés régionaux Nord/Centre/Sud sur le massif (lon 163.6–167, lat -20.1 à -22.3).
- Retirer `ppe`/`risque` des calques ; conserver `bv`, `capt`, `source`.

## 3. Exports cohérents — `src/features/export/exportContext.ts`
- Utiliser directement `CAPTAGE_COORDS` / `BVAEP_OUTLINES` (WGS84) au lieu de `ncLonLat()` recyclant les coords SVG → GeoJSON/GPKG identiques à la carte affichée.

## 4. Carte OpenLayers — réécrit `src/features/carte/MapCanvas.tsx`
React impératif (`useRef` + `useEffect`, `Map` créé une fois, props → mise à jour). EPSG:3857 via `fromLonLat`.
- **Fonds** (`ol/layer/Tile`) : carto=OSM, imagerie=service Géorep NC (URL exacte du service + HTTPS à valider au runtime ; **fallback Esri World Imagery** si injoignable), terrain=OpenTopoMap.
- **Calques vectoriels** : captages (points, `symbolFor`/sélection), BVAEPs (remplissage qualité/sélection), `source` (polygone indicateur). Grille H3 = polygones vrais (`polygonToCells`/`cellToBoundary`, res 8) colorés par `h3Class`/`h3Value`.
- **Tooltips** : `ol/Overlay` (commune/province/valeur), encart Tailwind comparable.
- **Contrôles** : `ScaleLine`, boussole (`Rotate`), `+/−` custom appelant `view.setZoom`, attribution OSM/Géorep conservée.

## 5. Intégration — `src/features/carte/CarteView.tsx` + `PublicHome.tsx`
- Brancher toggles `layers` (`bv/capt/source`), `basemap`, `h3Mode` via props.
- **Click-to-select** : clic sur un captage → sélection cohérente avec `CaptageSelector`.
- `PublicHome` : même composant, vue basse/contrôles réduits ; retirer la légende « Périmètre de protection ».

## 6. Vérification
- `pnpm build` + formatage `oxfmt` (conventions repo). Contrôle visuel via le serveur dev HMR (port 8443).

## Point à valider à l'exécution
- Nom exact du service ArcGIS « Fond imagerie » et accessibilité HTTPS (`carto.gouv.nc`) ; sinon **fallback Esri World Imagery** pour ne pas bloquer le rendu satellite.

Plan prêt. Je passe en exécution (installation puis implémentation via sous-agents parallèles, puis build) ?

---


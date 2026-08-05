import { useState, useMemo, useRef, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechTooltip, ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine,
} from "recharts";
import {
  Layers, Search, Eye, EyeOff, ZoomIn, ZoomOut, RefreshCw, Download,
  Bell, Settings, User, ChevronDown, Activity, AlertTriangle,
  Droplets, TrendingUp, TrendingDown, Minus, Navigation, Radio,
  Database, Sliders, X, MapPin,
} from "lucide-react";

// ─── Types ──────────────────────────────────────────────────────────────────
type StationStatus = "online" | "warning" | "critical" | "offline";
type LayerKey = "hexGrid" | "stations" | "pipelines" | "watersheds" | "envZones";
type Tab = "overview" | "stations" | "alerts";

// ─── Hex Math ────────────────────────────────────────────────────────────────
const HEX_R = 15;
const COLS = 30;
const ROWS = 20;
const HEX_W = Math.sqrt(3) * HEX_R;

function hexCenter(q: number, r: number): [number, number] {
  const cx = q * HEX_W + (r % 2 === 1 ? HEX_W / 2 : 0) + HEX_W / 2 + 8;
  const cy = r * HEX_R * 1.5 + HEX_R + 8;
  return [cx, cy];
}

function hexPts(cx: number, cy: number): string {
  return Array.from({ length: 6 }, (_, i) => {
    const a = Math.PI / 6 + (Math.PI / 3) * i;
    return `${(cx + HEX_R * Math.cos(a)).toFixed(1)},${(cy + HEX_R * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

function getWQI(q: number, r: number): number {
  const dist = Math.sqrt((q - 15) ** 2 + (r - 10) ** 2);
  const noise = ((q * 13 + r * 17 + q * r * 3) % 24) - 12;
  let v = 88 - dist * 2.4 + noise;
  const d1 = Math.sqrt((q - 5) ** 2 + (r - 16) ** 2);
  if (d1 < 4.5) v -= (4.5 - d1) * 9;
  const d2 = Math.sqrt((q - 24) ** 2 + (r - 3) ** 2);
  if (d2 < 3.5) v -= (3.5 - d2) * 7;
  const d3 = Math.sqrt((q - 28) ** 2 + (r - 17) ** 2);
  if (d3 < 3) v -= (3 - d3) * 8;
  return Math.max(14, Math.min(98, Math.round(v)));
}

function wqiColor(v: number): string {
  if (v >= 80) return "#10b981";
  if (v >= 65) return "#0d9488";
  if (v >= 50) return "#38bdf8";
  if (v >= 35) return "#f59e0b";
  return "#ef4444";
}

function wqiLabel(v: number): string {
  if (v >= 80) return "Excellent";
  if (v >= 65) return "Good";
  if (v >= 50) return "Moderate";
  if (v >= 35) return "Poor";
  return "Critical";
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const WQI_SERIES = [
  { m: "Aug", wqi: 68.2, band: [62, 75] }, { m: "Sep", wqi: 71.5, band: [65, 78] },
  { m: "Oct", wqi: 69.8, band: [63, 76] }, { m: "Nov", wqi: 73.1, band: [66, 79] },
  { m: "Dec", wqi: 70.4, band: [64, 77] }, { m: "Jan", wqi: 72.8, band: [67, 80] },
  { m: "Feb", wqi: 74.1, band: [68, 81] }, { m: "Mar", wqi: 75.3, band: [70, 82] },
  { m: "Apr", wqi: 76.2, band: [71, 83] }, { m: "May", wqi: 74.8, band: [69, 81] },
  { m: "Jun", wqi: 75.9, band: [70, 83] }, { m: "Jul", wqi: 73.4, band: [67, 80] },
];

const CONTAMINANTS = [
  { name: "Nitrates",  pct: 42, value: "4.2",   limit: "10.0",  unit: "mg/L" },
  { name: "Turbidity", pct: 20, value: "0.8",   limit: "4.0",   unit: "NTU" },
  { name: "Chlorine",  pct: 22, value: "0.9",   limit: "4.0",   unit: "mg/L" },
  { name: "Fluoride",  pct: 47, value: "0.70",  limit: "1.50",  unit: "mg/L" },
  { name: "Lead",      pct: 27, value: "0.004", limit: "0.015", unit: "mg/L" },
];

const SOURCE_DATA = [
  { name: "Groundwater", value: 42, color: "#0d9488" },
  { name: "Surface",     value: 35, color: "#2563eb" },
  { name: "Recycled",    value: 15, color: "#10b981" },
  { name: "Purchased",   value: 8,  color: "#6366f1" },
];

const ALERTS = [
  { id: 1, sev: "critical" as const, sta: "STA-0847", msg: "Turbidity spike: 8.3 NTU", time: "14 min ago",  zone: "Zone C-7" },
  { id: 2, sev: "warning"  as const, sta: "STA-0231", msg: "Pressure −18% of setpoint", time: "1h 22m ago", zone: "Zone A-3" },
  { id: 3, sev: "warning"  as const, sta: "STA-0512", msg: "Chlorine residual 0.12 mg/L", time: "3h 05m ago", zone: "Zone B-5" },
  { id: 4, sev: "info"     as const, sta: "STA-0044", msg: "Scheduled maintenance window", time: "5h ago",   zone: "Zone D-1" },
];

const STATION_LIST = [
  { id: "STA-0847", zone: "C-7", wqi: 31, flow: "2,847", temp: "14.2°C", status: "critical" as StationStatus, q: 5,  r: 16 },
  { id: "STA-0231", zone: "A-3", wqi: 61, flow: "5,201", temp: "13.8°C", status: "warning"  as StationStatus, q: 10, r: 5  },
  { id: "STA-0512", zone: "B-5", wqi: 58, flow: "3,940", temp: "14.1°C", status: "warning"  as StationStatus, q: 22, r: 14 },
  { id: "STA-0044", zone: "D-1", wqi: 0,  flow: "—",     temp: "—",      status: "offline"  as StationStatus, q: 26, r: 8  },
  { id: "STA-0123", zone: "B-3", wqi: 78, flow: "6,115", temp: "13.5°C", status: "online"   as StationStatus, q: 16, r: 11 },
  { id: "STA-0156", zone: "A-5", wqi: 82, flow: "4,883", temp: "14.0°C", status: "online"   as StationStatus, q: 8,  r: 8  },
  { id: "STA-0289", zone: "D-4", wqi: 72, flow: "3,714", temp: "14.4°C", status: "online"   as StationStatus, q: 21, r: 3  },
  { id: "STA-0334", zone: "C-9", wqi: 69, flow: "5,037", temp: "13.9°C", status: "online"   as StationStatus, q: 14, r: 17 },
];

// Pipeline path data (SVG path strings)
const PIPELINES_MAIN = [
  "M 412,18 C 411,70 410,130 410,185 C 409,220 409,240 410,258",
  "M 410,258 C 411,310 412,370 412,440",
  "M 75,255 C 160,253 280,254 410,258",
  "M 760,248 C 690,250 580,253 410,258",
];
const PIPELINES_DIST = [
  "M 410,258 C 375,262 320,262 234,208",
  "M 410,258 C 455,268 530,295 600,340",
  "M 410,258 C 398,295 392,360 392,440",
  "M 234,208 C 185,200 140,190 80,185",
  "M 600,340 C 620,380 625,415 618,440",
];

// ─── Stat Card ───────────────────────────────────────────────────────────────

function KpiCard({
  label, value, unit, trend, Icon, accentClass,
}: {
  label: string; value: string; unit: string;
  trend: number | null; Icon: React.ElementType; accentClass: string;
}) {
  return (
    <div className="bg-card rounded-md border border-border p-3 flex flex-col gap-1.5 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
        <Icon size={13} className={accentClass} />
      </div>
      <div className="flex items-end gap-1.5">
        <span className="text-2xl font-semibold leading-none font-mono tracking-tight text-foreground">{value}</span>
        <span className="text-[11px] text-muted-foreground mb-0.5">{unit}</span>
      </div>
      {trend !== null && (
        <div className={`flex items-center gap-0.5 text-[11px] font-medium ${trend > 0 ? "text-emerald-600" : trend < 0 ? "text-red-500" : "text-muted-foreground"}`}>
          {trend > 0 ? <TrendingUp size={11} /> : trend < 0 ? <TrendingDown size={11} /> : <Minus size={11} />}
          <span>{trend > 0 ? "+" : ""}{trend}%</span>
          <span className="text-muted-foreground font-normal ml-0.5">vs last month</span>
        </div>
      )}
      {trend === null && (
        <div className="flex items-center gap-0.5 text-[11px] text-red-500 font-medium">
          <AlertTriangle size={11} />
          <span>Requires attention</span>
        </div>
      )}
    </div>
  );
}

// ─── Layer Toggle ─────────────────────────────────────────────────────────────

function LayerToggle({
  label, color, active, onToggle, icon: Icon,
}: {
  label: string; color: string; active: boolean; onToggle: () => void; icon: React.ElementType;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded hover:bg-muted transition-colors group text-left"
    >
      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: active ? color : "#c6c6c6" }} />
      <Icon size={12} className={active ? "text-foreground" : "text-muted-foreground"} />
      <span className={`text-[12px] flex-1 ${active ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
      {active
        ? <Eye size={11} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        : <EyeOff size={11} className="text-muted-foreground opacity-60" />}
    </button>
  );
}

// ─── Custom Tooltip for WQI Chart ─────────────────────────────────────────────

function WqiTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  return (
    <div className="bg-[#0f2744] border border-[#1e3a5f] rounded p-2 text-xs text-white shadow-lg">
      <div className="text-blue-300 font-mono mb-0.5">{label} 2024–25</div>
      <div className="text-base font-semibold font-mono">{v.toFixed(1)}</div>
      <div style={{ color: wqiColor(v) }}>{wqiLabel(v)}</div>
    </div>
  );
}

// ─── Alert Severity Badge ─────────────────────────────────────────────────────

function AlertBadge({ sev }: { sev: "critical" | "warning" | "info" }) {
  const map = {
    critical: "bg-red-100 text-red-700 border-red-200",
    warning:  "bg-amber-100 text-amber-700 border-amber-200",
    info:     "bg-blue-100 text-blue-700 border-blue-200",
  };
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded border ${map[sev]}`}>
      {sev}
    </span>
  );
}

// ─── Station Status Dot ───────────────────────────────────────────────────────

function StatusDot({ status }: { status: StationStatus }) {
  const color = { online: "bg-emerald-500", warning: "bg-amber-400", critical: "bg-red-500", offline: "bg-gray-400" }[status];
  return (
    <span className="relative flex h-2 w-2">
      {(status === "critical" || status === "warning") && (
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color}`} />
      )}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
    </span>
  );
}

// ─── Left Sidebar ─────────────────────────────────────────────────────────────

function LeftSidebar({
  layers, onToggle,
}: {
  layers: Record<LayerKey, boolean>;
  onToggle: (k: LayerKey) => void;
}) {
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(true);

  return (
    <aside className="w-60 flex-shrink-0 bg-card border-r border-border flex flex-col overflow-y-auto">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center gap-2 bg-muted rounded px-2.5 py-1.5">
          <Search size={12} className="text-muted-foreground flex-shrink-0" />
          <input
            type="text"
            placeholder="Search stations, zones…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-[12px] outline-none text-foreground placeholder:text-muted-foreground w-full"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-muted-foreground hover:text-foreground">
              <X size={10} />
            </button>
          )}
        </div>
      </div>

      {/* Layers */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Map Layers</span>
          <Layers size={11} className="text-muted-foreground" />
        </div>
        <div className="space-y-0.5">
          <LayerToggle label="H3 Hex Grid (WQI)"   color="#0ea5e9" active={layers.hexGrid}     onToggle={() => onToggle("hexGrid")}     icon={Database} />
          <LayerToggle label="Monitoring Stations"  color="#10b981" active={layers.stations}    onToggle={() => onToggle("stations")}    icon={Radio} />
          <LayerToggle label="Pipelines & Mains"    color="#3b82f6" active={layers.pipelines}   onToggle={() => onToggle("pipelines")}   icon={Sliders} />
          <LayerToggle label="Watershed Boundary"   color="#6366f1" active={layers.watersheds}  onToggle={() => onToggle("watersheds")}  icon={MapPin} />
          <LayerToggle label="Environmental Zones"  color="#f59e0b" active={layers.envZones}    onToggle={() => onToggle("envZones")}    icon={Activity} />
        </div>
      </div>

      {/* Filters */}
      <div className="p-3 border-b border-border">
        <button
          onClick={() => setFiltersOpen(v => !v)}
          className="w-full flex items-center justify-between mb-2"
        >
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">Spatial Filters</span>
          <ChevronDown size={11} className={`text-muted-foreground transition-transform ${filtersOpen ? "" : "-rotate-90"}`} />
        </button>
        {filtersOpen && (
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-muted-foreground mb-1.5">
                <span>WQI Range</span>
                <span className="font-mono">0 – 100</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[73%] rounded-full bg-gradient-to-r from-red-500 via-amber-400 via-sky-400 to-emerald-500" />
              </div>
              <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                <span>Critical</span><span>Excellent</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] text-muted-foreground mb-1.5">Station Status</div>
              <div className="flex flex-wrap gap-1">
                {(["online","warning","critical","offline"] as StationStatus[]).map(s => (
                  <span key={s} className={`text-[10px] px-1.5 py-0.5 rounded border font-medium cursor-pointer select-none transition-colors
                    ${ s === "online"   ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                     : s === "warning"  ? "bg-amber-50 border-amber-200 text-amber-700"
                     : s === "critical" ? "bg-red-50 border-red-200 text-red-700"
                                        : "bg-gray-50 border-gray-200 text-gray-500" }`}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-muted-foreground mb-1.5">Date Window</div>
              <div className="flex gap-1">
                {["7D","30D","90D","1Y"].map(d => (
                  <button key={d} className={`flex-1 text-[10px] py-1 rounded border font-medium transition-colors ${d === "30D" ? "bg-primary text-white border-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="p-3 border-b border-border">
        <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">WQI Legend</div>
        <div className="space-y-1">
          {[
            { label: "Excellent (80–100)", color: "#10b981" },
            { label: "Good (65–79)",       color: "#0d9488" },
            { label: "Moderate (50–64)",   color: "#38bdf8" },
            { label: "Poor (35–49)",       color: "#f59e0b" },
            { label: "Critical (<35)",     color: "#ef4444" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: item.color }} />
              <span className="text-[11px] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data freshness */}
      <div className="p-3 mt-auto">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live · Updated 2 min ago</span>
        </div>
        <div className="text-[10px] text-muted-foreground/70 mt-0.5 font-mono">
          HYDROSCOPE v3.7.2 · Region 7 NW
        </div>
      </div>
    </aside>
  );
}

// ─── GIS Map ──────────────────────────────────────────────────────────────────

type HexCell = { q: number; r: number; cx: number; cy: number; wqi: number };
type HoveredHex = { q: number; r: number; wqi: number; cx: number; cy: number } | null;

function GISMap({
  layers, hexCells, hoveredHex, setHoveredHex, selectedHex, setSelectedHex,
}: {
  layers: Record<LayerKey, boolean>;
  hexCells: HexCell[];
  hoveredHex: HoveredHex;
  setHoveredHex: (h: HoveredHex) => void;
  selectedHex: { q: number; r: number } | null;
  setSelectedHex: (h: { q: number; r: number } | null) => void;
}) {
  return (
    <svg
      viewBox="0 0 820 500"
      className="w-full h-full"
      style={{ display: "block" }}
    >
      <defs>
        {/* Vignette */}
        <radialGradient id="vignette" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#040d1a" stopOpacity="0.7" />
        </radialGradient>
        {/* Water glow */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-sm" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="mapClip">
          <rect x="0" y="0" width="820" height="500" />
        </clipPath>
      </defs>

      {/* Basemap */}
      <rect x="0" y="0" width="820" height="500" fill="#07111f" />

      {/* Subtle grid */}
      <g opacity="0.06">
        {Array.from({ length: 20 }, (_, i) => (
          <line key={`v${i}`} x1={i * 43} y1="0" x2={i * 43} y2="500" stroke="#4a90d9" strokeWidth="0.5" />
        ))}
        {Array.from({ length: 12 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 45} x2="820" y2={i * 45} stroke="#4a90d9" strokeWidth="0.5" />
        ))}
      </g>

      {/* Watershed boundary */}
      {layers.watersheds && (
        <path
          d="M 85,35 C 170,15 320,8 460,14 C 600,20 710,42 775,105 C 812,165 818,255 805,345 C 792,435 748,478 665,492 C 582,506 468,502 380,497 C 292,492 190,478 128,442 C 66,406 36,338 32,268 C 28,198 46,125 78,90 C 82,60 85,35 85,35 Z"
          fill="#0a2a4f"
          fillOpacity="0.6"
          stroke="#1e4a8a"
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />
      )}

      {/* H3 hex grid */}
      {layers.hexGrid && hexCells.map(({ q, r, cx, cy, wqi }) => {
        const isHovered = hoveredHex?.q === q && hoveredHex?.r === r;
        const isSelected = selectedHex?.q === q && selectedHex?.r === r;
        const color = wqiColor(wqi);
        return (
          <polygon
            key={`${q}-${r}`}
            points={hexPts(cx, cy)}
            fill={color}
            fillOpacity={isHovered ? 0.82 : isSelected ? 0.72 : 0.32}
            stroke={isHovered || isSelected ? color : "transparent"}
            strokeWidth={isHovered ? 1.5 : isSelected ? 1.5 : 0}
            strokeOpacity={0.9}
            style={{ cursor: "pointer", transition: "fill-opacity 0.1s" }}
            onMouseEnter={() => setHoveredHex({ q, r, wqi, cx, cy })}
            onMouseLeave={() => setHoveredHex(null)}
            onClick={() => setSelectedHex(isSelected ? null : { q, r })}
          />
        );
      })}

      {/* River / water flow paths */}
      <g opacity="0.35" filter="url(#glow-sm)">
        <path d="M 413,18 C 411,70 410,130 410,185 C 409,230 409,245 410,260" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
        <path d="M 410,260 C 411,305 412,370 413,445" stroke="#38bdf8" strokeWidth="2" fill="none" />
        <path d="M 75,255 C 160,252 285,254 410,260" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
        <path d="M 762,248 C 692,251 580,255 410,260" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
      </g>

      {/* Pipelines */}
      {layers.pipelines && (
        <g>
          {PIPELINES_MAIN.map((d, i) => (
            <path key={`pm${i}`} d={d} stroke="#3b82f6" strokeWidth="2.5" fill="none" strokeOpacity="0.85" />
          ))}
          {PIPELINES_DIST.map((d, i) => (
            <path key={`pd${i}`} d={d} stroke="#60a5fa" strokeWidth="1.5" fill="none" strokeOpacity="0.65" strokeDasharray="6,4" />
          ))}
          {/* Pipeline nodes */}
          {[[410,260],[410,18],[75,255],[762,248],[410,440]].map(([x,y],i) => (
            <circle key={`pn${i}`} cx={x} cy={y} r={3.5} fill="#3b82f6" fillOpacity="0.9" />
          ))}
        </g>
      )}

      {/* Monitoring stations */}
      {layers.stations && STATION_LIST.map(s => {
        const [px, py] = hexCenter(s.q, s.r);
        const color = { online: "#10b981", warning: "#f59e0b", critical: "#ef4444", offline: "#6b7280" }[s.status];
        const isAnim = s.status === "critical" || s.status === "warning";
        return (
          <g key={s.id} style={{ cursor: "pointer" }}>
            {isAnim && (
              <circle cx={px} cy={py} r="10" fill={color} fillOpacity="0.15">
                <animate attributeName="r" values="8;18;8" dur={s.status === "critical" ? "1.2s" : "2s"} repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.3;0;0.3" dur={s.status === "critical" ? "1.2s" : "2s"} repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={px} cy={py} r="5.5" fill={color} fillOpacity="0.95" filter="url(#glow-sm)" />
            <circle cx={px} cy={py} r="5.5" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.9" />
            {/* Station label */}
            <text x={px + 7} y={py + 4} fontSize="8" fill="white" fillOpacity="0.75" className="font-mono select-none">{s.id.slice(-4)}</text>
          </g>
        );
      })}

      {/* Hex tooltip */}
      {hoveredHex && (() => {
        const { cx, cy, q, r, wqi } = hoveredHex;
        const tx = cx + 12 > 680 ? cx - 152 : cx + 12;
        const ty = cy - 55 < 5 ? cy + 8 : cy - 55;
        return (
          <foreignObject x={tx} y={ty} width="140" height="68">
            <div
              style={{ fontFamily: "IBM Plex Sans, sans-serif", background: "#0d1e36", border: "1px solid #1e3a5f", borderRadius: "4px", padding: "7px 9px" }}
            >
              <div style={{ color: "#7eb7f5", fontSize: "10px", fontFamily: "JetBrains Mono, monospace", marginBottom: "2px" }}>
                H3 {q.toString().padStart(2,"0")},{r.toString().padStart(2,"0")}
              </div>
              <div style={{ color: "white", fontSize: "16px", fontWeight: 600, fontFamily: "JetBrains Mono, monospace", lineHeight: 1 }}>
                {wqi}
              </div>
              <div style={{ color: wqiColor(wqi), fontSize: "11px", marginTop: "2px" }}>
                {wqiLabel(wqi)}
              </div>
            </div>
          </foreignObject>
        );
      })()}

      {/* Vignette overlay */}
      <rect x="0" y="0" width="820" height="500" fill="url(#vignette)" pointerEvents="none" />

      {/* Scale bar */}
      <g transform="translate(20, 475)" opacity="0.7">
        <line x1="0" y1="0" x2="60" y2="0" stroke="white" strokeWidth="1.5" />
        <line x1="0" y1="-4" x2="0" y2="4" stroke="white" strokeWidth="1.5" />
        <line x1="60" y1="-4" x2="60" y2="4" stroke="white" strokeWidth="1.5" />
        <text x="30" y="-6" textAnchor="middle" fontSize="9" fill="white" style={{ fontFamily: "JetBrains Mono, monospace" }}>5 km</text>
      </g>

      {/* Compass */}
      <g transform="translate(790, 28)">
        <circle cx="0" cy="0" r="14" fill="#0d1e36" fillOpacity="0.8" stroke="#1e3a5f" strokeWidth="1" />
        <text x="0" y="-5" textAnchor="middle" fontSize="9" fontWeight="600" fill="white" style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>N</text>
        <polygon points="0,-12 3,-4 0,-7 -3,-4" fill="#ef4444" />
        <polygon points="0,12 3,4 0,7 -3,4" fill="white" fillOpacity="0.6" />
      </g>
    </svg>
  );
}

// ─── Map Center Panel ─────────────────────────────────────────────────────────

function MapCenter({
  layers, hexCells, hoveredHex, setHoveredHex, selectedHex, setSelectedHex,
}: {
  layers: Record<LayerKey, boolean>;
  hexCells: HexCell[];
  hoveredHex: HoveredHex;
  setHoveredHex: (h: HoveredHex) => void;
  selectedHex: { q: number; r: number } | null;
  setSelectedHex: (h: { q: number; r: number } | null) => void;
}) {
  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-[#07111f] relative">
      {/* Map toolbar */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        <button className="w-7 h-7 bg-[#0d1e36]/90 border border-[#1e3a5f] rounded text-white hover:bg-[#1e3a5f] transition-colors flex items-center justify-center">
          <ZoomIn size={13} />
        </button>
        <button className="w-7 h-7 bg-[#0d1e36]/90 border border-[#1e3a5f] rounded text-white hover:bg-[#1e3a5f] transition-colors flex items-center justify-center">
          <ZoomOut size={13} />
        </button>
        <div className="w-7 h-px bg-[#1e3a5f] mx-auto" />
        <button className="w-7 h-7 bg-[#0d1e36]/90 border border-[#1e3a5f] rounded text-white hover:bg-[#1e3a5f] transition-colors flex items-center justify-center">
          <Navigation size={13} />
        </button>
      </div>

      {/* Map style switcher */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex gap-0.5 bg-[#0d1e36]/90 border border-[#1e3a5f] rounded p-0.5">
        {["Hydro", "Satellite", "Terrain"].map((m, i) => (
          <button key={m} className={`text-[10px] px-2.5 py-1 rounded font-medium transition-colors ${i === 0 ? "bg-primary text-white" : "text-[#7eb7f5] hover:text-white"}`}>
            {m}
          </button>
        ))}
      </div>

      {/* Active hex info panel */}
      {selectedHex && (
        <div className="absolute top-3 right-3 z-10 w-44 bg-[#0d1e36]/95 border border-[#1e3a5f] rounded p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] text-[#7eb7f5] font-mono uppercase tracking-wide">Selected Cell</span>
            <button onClick={() => setSelectedHex(null)} className="text-[#7eb7f5] hover:text-white">
              <X size={10} />
            </button>
          </div>
          <div className="text-white font-mono text-sm font-semibold">
            WQI {getWQI(selectedHex.q, selectedHex.r)}
          </div>
          <div style={{ color: wqiColor(getWQI(selectedHex.q, selectedHex.r)) }} className="text-[11px] mt-0.5">
            {wqiLabel(getWQI(selectedHex.q, selectedHex.r))}
          </div>
          <div className="text-[#7eb7f5] text-[10px] font-mono mt-1">
            H3 {selectedHex.q.toString().padStart(2,"0")},{selectedHex.r.toString().padStart(2,"0")}
          </div>
        </div>
      )}

      {/* GIS Map SVG */}
      <div className="flex-1 overflow-hidden">
        <GISMap
          layers={layers}
          hexCells={hexCells}
          hoveredHex={hoveredHex}
          setHoveredHex={setHoveredHex}
          selectedHex={selectedHex}
          setSelectedHex={setSelectedHex}
        />
      </div>

      {/* Status bar */}
      <div className="h-6 bg-[#0d1e36]/95 border-t border-[#1e3a5f] px-3 flex items-center gap-4 text-[10px] font-mono text-[#7eb7f5] flex-shrink-0">
        <span>47.6062° N, 122.3321° W</span>
        <span className="text-[#1e3a5f]">|</span>
        <span>Zoom 11</span>
        <span className="text-[#1e3a5f]">|</span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          512 / 600 cells loaded
        </span>
        <span className="text-[#1e3a5f]">|</span>
        <span>EPSG:4326 · WGS84</span>
        {hoveredHex && (
          <>
            <span className="text-[#1e3a5f]">|</span>
            <span style={{ color: wqiColor(hoveredHex.wqi) }}>
              ↗ H3 [{hoveredHex.q},{hoveredHex.r}] WQI {hoveredHex.wqi}
            </span>
          </>
        )}
      </div>
    </main>
  );
}

// ─── Right Analytics Panel ────────────────────────────────────────────────────

function RightPanel({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {

  return (
    <aside className="w-80 flex-shrink-0 bg-[#f7f9fc] border-l border-border flex flex-col overflow-y-auto">
      {/* KPIs */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">System Status</span>
          <div className="flex items-center gap-1.5">
            <button className="text-muted-foreground hover:text-foreground transition-colors"><RefreshCw size={11} /></button>
            <button className="text-muted-foreground hover:text-foreground transition-colors"><Download size={11} /></button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <KpiCard label="Avg WQI"          value="73.4" unit="/ 100"   trend={2.1}  Icon={Activity}       accentClass="text-teal-600" />
          <KpiCard label="Stations Online"  value="847"  unit="/ 1,024" trend={-3}   Icon={Radio}          accentClass="text-blue-600" />
          <KpiCard label="Pipe Integrity"   value="94.2" unit="%"       trend={0.3}  Icon={Database}       accentClass="text-emerald-600" />
          <KpiCard label="Active Alerts"    value="3"    unit="critical" trend={null} Icon={AlertTriangle}  accentClass="text-amber-600" />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-3">
        <div className="flex gap-0">
          {(["overview","stations","alerts"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-[11px] font-medium px-3 py-2.5 capitalize border-b-2 transition-colors ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >
              {t}
              {t === "alerts" && <span className="ml-1 text-[9px] bg-red-500 text-white rounded-full px-1 font-semibold">3</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 p-3 space-y-4">

        {tab === "overview" && (
          <>
            {/* WQI Time Series */}
            <div className="bg-card border border-border rounded-md p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-foreground">Water Quality Index</span>
                <span className="text-[10px] text-muted-foreground font-mono">Aug 2024 – Jul 2025</span>
              </div>
              <ResponsiveContainer width="100%" height={110}>
                <AreaChart data={WQI_SERIES} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8ecf2" />
                  <XAxis dataKey="m" tick={{ fontSize: 9, fill: "#525252", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[60, 85]} tick={{ fontSize: 9, fill: "#525252", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <ReferenceLine y={75} stroke="#10b981" strokeDasharray="4 3" strokeOpacity={0.7} />
                  <RechTooltip content={<WqiTooltip />} />
                  <Area type="monotone" dataKey="wqi" stroke="#0ea5e9" strokeWidth={2} fill="#0ea5e9" fillOpacity={0.12} dot={false} activeDot={{ r: 3, fill: "#0ea5e9" }} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="flex items-center gap-1 mt-1">
                <span className="inline-block w-6 h-0.5 bg-emerald-500" style={{ borderTop: "2px dashed" }} />
                <span className="text-[10px] text-muted-foreground">Target WQI 75</span>
              </div>
            </div>

            {/* Contaminant levels */}
            <div className="bg-card border border-border rounded-md p-3">
              <div className="text-[12px] font-semibold text-foreground mb-2.5">Contaminant Levels</div>
              <div className="space-y-2">
                {CONTAMINANTS.map(c => (
                  <div key={c.name}>
                    <div className="flex justify-between text-[10px] mb-0.5">
                      <span className="text-muted-foreground">{c.name}</span>
                      <span className="font-mono text-foreground">{c.value} <span className="text-muted-foreground">{c.unit}</span></span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${c.pct}%`,
                          background: c.pct > 70 ? "#ef4444" : c.pct > 50 ? "#f59e0b" : "#0d9488",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Water source donut */}
            <div className="bg-card border border-border rounded-md p-3">
              <div className="text-[12px] font-semibold text-foreground mb-1">Supply Sources</div>
              <div className="flex items-center gap-3">
                <PieChart width={90} height={90}>
                  <Pie
                    data={SOURCE_DATA}
                    cx={45} cy={45}
                    innerRadius={25} outerRadius={40}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {SOURCE_DATA.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="flex-1 space-y-1.5">
                  {SOURCE_DATA.map(d => (
                    <div key={d.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-sm" style={{ background: d.color }} />
                        <span className="text-[11px] text-muted-foreground">{d.name}</span>
                      </div>
                      <span className="text-[11px] font-mono font-medium text-foreground">{d.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === "stations" && (
          <div className="bg-card border border-border rounded-md overflow-hidden">
            <div className="px-3 py-2 border-b border-border flex items-center justify-between">
              <span className="text-[11px] font-semibold text-foreground">Monitoring Stations</span>
              <span className="text-[10px] text-muted-foreground font-mono">{STATION_LIST.length} total</span>
            </div>
            <div className="divide-y divide-border">
              {STATION_LIST.map(s => (
                <div key={s.id} className="px-3 py-2 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-2">
                      <StatusDot status={s.status} />
                      <span className="text-[11px] font-mono font-semibold text-foreground">{s.id}</span>
                    </div>
                    {s.wqi > 0 && (
                      <span className="text-[11px] font-mono font-semibold" style={{ color: wqiColor(s.wqi) }}>{s.wqi}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 pl-4 text-[10px] text-muted-foreground">
                    <span>Zone {s.zone}</span>
                    <span>Q {s.flow} m³/d</span>
                    <span>{s.temp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "alerts" && (
          <div className="space-y-2">
            {ALERTS.map(a => (
              <div key={a.id} className={`bg-card border rounded-md p-2.5 ${a.sev === "critical" ? "border-red-200" : a.sev === "warning" ? "border-amber-200" : "border-border"}`}>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <AlertBadge sev={a.sev} />
                  <span className="text-[10px] text-muted-foreground">{a.time}</span>
                </div>
                <div className="text-[12px] font-medium text-foreground mb-0.5">{a.msg}</div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                  <span>{a.sta}</span>
                  <span>·</span>
                  <span>{a.zone}</span>
                </div>
              </div>
            ))}
            <div className="text-center pt-2">
              <button className="text-[11px] text-primary hover:underline font-medium">View all 18 alerts →</button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

// ─── Top Navigation Bar ───────────────────────────────────────────────────────

function TopBar() {
  return (
    <header className="h-12 flex-shrink-0 bg-[#0f2744] flex items-center px-4 gap-4 border-b border-[#1a3a5f]">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded bg-[#1a4e8c] border border-[#2563eb]/60 flex items-center justify-center">
          <Droplets size={14} className="text-[#38bdf8]" />
        </div>
        <div>
          <span className="text-white font-semibold text-sm tracking-wide" style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>
            HYDROSCOPE
          </span>
          <span className="text-[#7eb7f5] text-[10px] ml-2 font-mono">v3.7.2</span>
        </div>
      </div>

      <div className="w-px h-5 bg-[#1e3a5f]" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[12px] text-[#7eb7f5]" style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>
        <span>Metro Water District</span>
        <ChevronDown size={10} />
        <span className="text-white font-medium">Region 7 Northwest</span>
      </div>

      <div className="flex-1" />

      {/* Center tools */}
      <div className="flex items-center gap-1.5 bg-[#0a1e38] border border-[#1e3a5f] rounded px-2 py-1">
        <span className="text-[10px] text-[#7eb7f5] font-mono">Jul 14, 2025</span>
        <span className="text-[#1e3a5f]">|</span>
        <span className="text-[10px] text-[#7eb7f5] font-mono">09:41 UTC</span>
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 ml-1 animate-pulse" />
      </div>

      <div className="flex-1" />

      {/* Right controls */}
      <div className="flex items-center gap-1.5">
        <button className="relative w-8 h-8 rounded text-[#7eb7f5] hover:bg-[#1a3a5f] transition-colors flex items-center justify-center">
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" />
        </button>
        <button className="w-8 h-8 rounded text-[#7eb7f5] hover:bg-[#1a3a5f] transition-colors flex items-center justify-center">
          <Download size={14} />
        </button>
        <button className="w-8 h-8 rounded text-[#7eb7f5] hover:bg-[#1a3a5f] transition-colors flex items-center justify-center">
          <Settings size={14} />
        </button>
        <div className="w-px h-5 bg-[#1e3a5f]" />
        <div className="flex items-center gap-2 bg-[#0a1e38] border border-[#1e3a5f] rounded px-2.5 py-1 cursor-pointer hover:border-[#2563eb] transition-colors">
          <div className="w-5 h-5 rounded-full bg-[#1a4e8c] flex items-center justify-center">
            <User size={11} className="text-[#38bdf8]" />
          </div>
          <span className="text-[11px] text-[#7eb7f5]" style={{ fontFamily: "IBM Plex Sans, sans-serif" }}>J. Torres</span>
          <ChevronDown size={9} className="text-[#7eb7f5]" />
        </div>
      </div>
    </header>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState<Tab>("overview");
  const [hoveredHex, setHoveredHex] = useState<HoveredHex>(null);
  const [selectedHex, setSelectedHex] = useState<{ q: number; r: number } | null>(null);
  const [layers, setLayers] = useState<Record<LayerKey, boolean>>({
    hexGrid: true,
    stations: true,
    pipelines: true,
    watersheds: true,
    envZones: false,
  });

  const hexCells = useMemo<HexCell[]>(() => {
    const cells: HexCell[] = [];
    for (let q = 0; q < COLS; q++) {
      for (let r = 0; r < ROWS; r++) {
        const [cx, cy] = hexCenter(q, r);
        cells.push({ q, r, cx, cy, wqi: getWQI(q, r) });
      }
    }
    return cells;
  }, []);

  const toggleLayer = useCallback((key: LayerKey) => {
    setLayers(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return (
    <div
      className="h-screen w-screen flex flex-col overflow-hidden bg-background"
      style={{ fontFamily: "IBM Plex Sans, sans-serif" }}
    >
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar layers={layers} onToggle={toggleLayer} />
        <MapCenter
          layers={layers}
          hexCells={hexCells}
          hoveredHex={hoveredHex}
          setHoveredHex={setHoveredHex}
          selectedHex={selectedHex}
          setSelectedHex={setSelectedHex}
        />
        <RightPanel tab={tab} setTab={setTab} />
      </div>
    </div>
  );
}

import { useState, type CSSProperties } from 'react'

const COLORS = {
  primary: '#1a3a5c',
  primaryLight: '#2a5a7c',
  success: '#27ae60',
  warning: '#e67e22',
  danger: '#e74c3c',
  info: '#3498db',
  bg: '#f0f4f8',
  cardBg: '#ffffff',
  textPrimary: '#1a3a5c',
  textSecondary: '#7a8a9a',
  border: '#e0e8f0',
  accentGreen: '#27ae60',
  accentBlue: '#3498db',
  accentOrange: '#e67e22',
  accentRed: '#e74c3c',
}

interface KPI {
  label: string
  value: string
  sub: string
  accent: string
}

interface Alert {
  type: 'critical' | 'minor'
  title: string
  message: string
}

const KPIs: KPI[] = [
  { label: 'Captages actifs', value: '47', sub: '12 prioritaires', accent: COLORS.accentGreen },
  { label: 'Indicateurs', value: '43', sub: '8 alertes actives', accent: COLORS.accentBlue },
  { label: 'BVAEP', value: '12', sub: '3 sous surveillance', accent: COLORS.accentOrange },
  { label: 'Sources connectées', value: '43', sub: '5 à confirmer', accent: COLORS.accentRed },
]

const alerts: Alert[] = [
  { type: 'critical', title: 'Alerte critique', message: 'Défrichage détecté — BVAEP Sud — 2h' },
  { type: 'minor', title: 'Alerte mineure', message: 'Turbidité élevée — BVAEP Centre — 6h' },
]

const layers = ['BVAEP', 'PPE', 'Alertes', 'Urbanisation', 'Incendies', 'Satellite']

export default function HydroScopeDashboard() {
  const [activeProfile, setActiveProfile] = useState<'expert' | 'partner' | 'public'>('expert')
  const [activeLayer, setActiveLayer] = useState<string>('BVAEP')
  const [opacity, setOpacity] = useState(0.7)

  const profileColors: Record<string, string> = {
    expert: COLORS.accentGreen,
    partner: COLORS.accentBlue,
    public: COLORS.accentOrange,
  }

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundColor: COLORS.bg,
    fontFamily: 'Inter, Arial, sans-serif',
  }

  const headerStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    height: '52px',
    padding: '0 20px',
    backgroundColor: COLORS.primary,
    gap: '12px',
  }

  const kpiRowStyle: CSSProperties = {
    display: 'flex',
    gap: '12px',
    padding: '12px 16px',
    backgroundColor: COLORS.cardBg,
    borderBottom: `1px solid ${COLORS.border}`,
  }

  const kpiCardStyle: CSSProperties = {
    flex: 1,
    padding: '12px 16px',
    backgroundColor: COLORS.cardBg,
    borderRadius: '6px',
    border: `1px solid ${COLORS.border}`,
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    position: 'relative',
    overflow: 'hidden',
  }

  const mainAreaStyle: CSSProperties = {
    display: 'flex',
    flex: 1,
    minHeight: '0',
  }

  const mapPanelStyle: CSSProperties = {
    flex: '1 1 66%',
    backgroundColor: '#d4e6f1',
    position: 'relative',
    borderRight: `1px solid ${COLORS.border}`,
  }

  const sidebarStyle: CSSProperties = {
    flex: '1 1 34%',
    backgroundColor: COLORS.cardBg,
    display: 'flex',
    flexDirection: 'column',
    borderLeft: `1px solid ${COLORS.border}`,
  }

  const layerBtnStyle = (active: boolean): CSSProperties => ({
    padding: '4px 12px',
    borderRadius: '11px',
    border: `1px solid ${active ? COLORS.accentBlue : COLORS.border}`,
    backgroundColor: active ? '#e8f0f8' : 'transparent',
    fontSize: '11px',
    fontWeight: 500,
    color: active ? COLORS.primary : COLORS.textSecondary,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  })

  const statusCardStyle: CSSProperties = {
    padding: '8px 12px',
    borderRadius: '4px',
    border: `1px solid ${COLORS.border}`,
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  }

  const alertCardStyle = (type: 'critical' | 'minor'): CSSProperties => ({
    padding: '8px 12px',
    borderRadius: '4px',
    border: `1px solid ${type === 'critical' ? '#f5c6c6' : '#e8d0a0'}`,
    backgroundColor: type === 'critical' ? '#fef0f0' : '#fef9f0',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  })

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <span style={{ color: '#fff', fontWeight: 700, fontSize: '20px' }}>HydroScope</span>
        <span style={{ color: '#c0d0e0', fontSize: '11px' }}>Nouvelle-Calédonie — Eau potable</span>
        <div style={{ display: 'flex', gap: '4px', marginLeft: 'auto' }}>
          {(['expert', 'partner', 'public'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setActiveProfile(p)}
              style={{
                padding: '4px 12px',
                borderRadius: '11px',
                border: `1px solid ${activeProfile === p ? '#fff' : 'rgba(255,255,255,0.3)'}`,
                backgroundColor: activeProfile === p ? 'rgba(255,255,255,0.9)' : 'transparent',
                color: activeProfile === p ? COLORS.primary : '#c0d0e0',
                fontSize: '10px',
                fontWeight: activeProfile === p ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              {p === 'expert' ? 'Expert' : p === 'partner' ? 'Partenaire' : 'Public'}
            </button>
          ))}
        </div>
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: COLORS.info,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '10px',
            fontWeight: 700,
          }}
        >
          OE
        </div>
      </header>

      <div style={kpiRowStyle}>
        {KPIs.map((kpi) => (
          <div key={kpi.label} style={kpiCardStyle}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '4px',
                backgroundColor: kpi.accent,
                borderRadius: '6px 0 0 6px',
              }}
            />
            <span style={{ fontSize: '9px', color: COLORS.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {kpi.label}
            </span>
            <span style={{ fontSize: '28px', fontWeight: 700, color: COLORS.textPrimary }}>{kpi.value}</span>
            <span style={{ fontSize: '10px', color: kpi.accent }}>● {kpi.sub}</span>
          </div>
        ))}
      </div>

      <div style={mainAreaStyle}>
        <div style={mapPanelStyle}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '40px',
              padding: '0 12px',
              backgroundColor: '#fafbfc',
              borderBottom: `1px solid ${COLORS.border}`,
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {layers.map((layer) => (
              <button
                key={layer}
                onClick={() => setActiveLayer(layer)}
                style={layerBtnStyle(activeLayer === layer)}
              >
                {layer}
              </button>
            ))}
            <span style={{ fontSize: '10px', color: COLORS.textSecondary, marginLeft: 'auto' }}>Opacité</span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(opacity * 100)}
              onChange={(e) => setOpacity(Number(e.target.value) / 100)}
              style={{ width: '60px', accentColor: COLORS.accentBlue }}
            />
          </div>

          <div style={{ position: 'relative', flex: 1, background: 'linear-gradient(135deg, #d4e6f1, #a8c8dc)' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle at center, rgba(200,216,232,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', color: '#5a7a8a' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>🗺️</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>Carte interactive</div>
                <div style={{ fontSize: '11px', marginTop: '4px' }}>Bassins versants & captages — Nouvelle-Calédonie</div>
              </div>
            </div>

            <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#fff', padding: '4px 8px', borderRadius: '4px', opacity: 0.9 }}>
              <div style={{ width: '60px', height: '3px', backgroundColor: COLORS.textSecondary }} />
              <div style={{ width: '3px', height: '9px', backgroundColor: COLORS.textSecondary }} />
              <div style={{ width: '3px', height: '9px', backgroundColor: COLORS.textSecondary }} />
              <span style={{ fontSize: '7px', color: COLORS.textSecondary }}>50 km</span>
            </div>

            <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#fff', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <span style={{ fontSize: '7px', fontWeight: 700, color: COLORS.textSecondary }}>N</span>
              <div style={{ width: '1px', height: '8px', backgroundColor: COLORS.textSecondary }} />
            </div>

            <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px', backgroundColor: '#fff', padding: '4px 8px', borderRadius: '4px', border: `1px solid ${COLORS.border}`, opacity: 0.9 }}>
              {[
                { color: COLORS.accentRed, label: 'Captage' },
                { color: COLORS.accentGreen, label: 'BVAEP' },
                { color: COLORS.accentOrange, label: 'PPE' },
                { color: COLORS.accentBlue, label: 'Alerte' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color }} />
                  <span style={{ fontSize: '7px', color: COLORS.textSecondary }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={sidebarStyle}>
          <div style={{ display: 'flex', borderBottom: `1px solid ${COLORS.border}`, height: '36px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f4f8', borderRadius: '6px 0 0 0', fontSize: '10px', fontWeight: 600, color: COLORS.textPrimary }}>
              Tableau de bord
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: COLORS.textSecondary }}>
              Analyse multicritère
            </div>
          </div>

          <div style={{ padding: '12px', flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: COLORS.textPrimary }}>Synthèse — BVAEP Nord</span>
              <select style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '9px', border: `1px solid ${COLORS.border}`, backgroundColor: '#e8f0f8', color: COLORS.textPrimary }}>
                <option>BVAEP Nord</option>
                <option>BVAEP Sud</option>
                <option>BVAEP Centre</option>
                <option>BVAEP Ouest</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ ...statusCardStyle, flex: 1, borderColor: '#b8d8b8', backgroundColor: '#f0faf4' }}>
                <span style={{ fontSize: '7px', color: '#7a9a7a', textTransform: 'uppercase' }}>État</span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: COLORS.success }}>Bon</span>
                <span style={{ fontSize: '7px', color: COLORS.textSecondary }}>score 72/100</span>
              </div>
              <div style={{ ...statusCardStyle, flex: 1, borderColor: '#e8d0a0', backgroundColor: '#fef9f0' }}>
                <span style={{ fontSize: '7px', color: '#9a7a3a', textTransform: 'uppercase' }}>Pression</span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: COLORS.warning }}>Moy.</span>
                <span style={{ fontSize: '7px', color: COLORS.textSecondary }}>indice 5.2</span>
              </div>
              <div style={{ ...statusCardStyle, flex: 1, borderColor: '#f5c6c6', backgroundColor: '#fef0f0' }}>
                <span style={{ fontSize: '7px', color: '#9a5a5a', textTransform: 'uppercase' }}>Alertes</span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: COLORS.danger }}>3</span>
                <span style={{ fontSize: '7px', color: COLORS.textSecondary }}>actives</span>
              </div>
            </div>

            <div style={{ padding: '8px', backgroundColor: '#fafbfc', borderRadius: '4px', border: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: '8px', color: COLORS.textSecondary, textTransform: 'uppercase' }}>Tendance — Précipitations (mm/mois)</span>
              <svg viewBox="0 0 200 40" style={{ width: '100%', height: '40px', marginTop: '4px' }}>
                <polyline points="0,30 26,20 52,25 78,10 104,15 130,5 156,12 182,0" fill="none" stroke={COLORS.accentBlue} strokeWidth="1.5" />
                <circle cx="182" cy="0" r="3" fill={COLORS.accentBlue} />
              </svg>
            </div>

            <div style={{ padding: '8px', backgroundColor: '#f0f4f8', borderRadius: '2px' }}>
              <span style={{ fontSize: '8px', fontWeight: 600, color: COLORS.textPrimary }}>Répartition des pressions</span>
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { label: 'Environnementales', value: 60, color: COLORS.accentRed },
                  { label: 'Anthropiques', value: 40, color: COLORS.accentOrange },
                  { label: 'Biogéographiques', value: 30, color: COLORS.accentBlue },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '7px', color: COLORS.textSecondary, width: '80px' }}>{item.label}</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: COLORS.border, borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.value}%`, height: '100%', backgroundColor: item.color, opacity: 0.7, borderRadius: '3px' }} />
                    </div>
                    <span style={{ fontSize: '7px', color: COLORS.textSecondary, width: '30px', textAlign: 'right' }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '8px', backgroundColor: '#fafbfc', borderRadius: '4px', border: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: '9px', fontWeight: 600, color: COLORS.textPrimary }}>Analyse multicritère</span>
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { label: 'État biogéographique', value: 70, color: COLORS.accentGreen },
                  { label: 'Pressions environnementales', value: 50, color: COLORS.accentRed },
                  { label: 'Pressions anthropiques', value: 40, color: COLORS.accentOrange },
                  { label: 'Enjeux', value: 80, color: COLORS.accentBlue },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '7px', color: COLORS.textSecondary, width: '100px' }}>{item.label}</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: COLORS.border, borderRadius: '3px', overflow: 'hidden', position: 'relative' }}>
                      <div style={{ width: `${item.value}%`, height: '100%', backgroundColor: item.color, opacity: 0.6, borderRadius: '3px' }} />
                      <div style={{ position: 'absolute', left: `${item.value}%`, top: '-4px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#fff', border: `2px solid ${item.color}`, transform: 'translateX(-50%)', cursor: 'grab' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '7px', color: COLORS.textSecondary }}>Mode :</span>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{ padding: '2px 8px', borderRadius: '8px', backgroundColor: 'rgba(39,174,96,0.15)', border: `1px solid ${COLORS.accentGreen}`, fontSize: '7px', color: COLORS.accentGreen, fontWeight: 600 }}>Référence</div>
                  <div style={{ padding: '2px 8px', borderRadius: '8px', border: `1px solid ${COLORS.border}`, fontSize: '7px', color: COLORS.textSecondary }}>Scénario</div>
                </div>
                <div style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: '4px', backgroundColor: '#f0faf4', border: `1px solid #b8d8b8`, fontSize: '7px', color: COLORS.accentGreen }}>🥇 BVAEP Nord</div>
              </div>
            </div>

            <div style={{ padding: '8px', backgroundColor: '#fafbfc', borderRadius: '4px', border: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: '9px', fontWeight: 600, color: COLORS.textPrimary }}>Comparaison inter-BVAEP</span>
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { label: 'BVAEP Nord', value: 80, color: COLORS.accentGreen },
                  { label: 'BVAEP Sud', value: 60, color: COLORS.accentOrange },
                  { label: 'BVAEP Centre', value: 45, color: COLORS.accentBlue },
                  { label: 'BVAEP Ouest', value: 30, color: COLORS.accentRed },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '7px', color: COLORS.textSecondary, width: '70px' }}>{item.label}</span>
                    <div style={{ flex: 1, height: '6px', backgroundColor: COLORS.border, borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${item.value}%`, height: '100%', backgroundColor: item.color, opacity: 0.6, borderRadius: '3px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '8px', backgroundColor: '#fafbfc', borderRadius: '4px', border: `1px solid ${COLORS.border}` }}>
              <span style={{ fontSize: '9px', fontWeight: 600, color: COLORS.textPrimary }}>Alertes qualifiées</span>
              <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {alerts.map((alert) => (
                  <div key={alert.title} style={alertCardStyle(alert.type)}>
                    <span style={{ fontSize: '7px', fontWeight: 600, color: alert.type === 'critical' ? '#a04040' : '#8a6a3a' }}>{alert.title}</span>
                    <span style={{ fontSize: '7px', color: alert.type === 'critical' ? '#8a6a6a' : '#8a7a5a' }}>{alert.message}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer style={{ display: 'flex', alignItems: 'center', height: '28px', padding: '0 20px', backgroundColor: COLORS.primary, justifyContent: 'space-between' }}>
        <span style={{ fontSize: '8px', color: '#a0b8c8' }}>HydroScope · OEIL · Données Nouvelle-Calédonie · © 2026</span>
        <span style={{ fontSize: '8px', color: '#a0b8c8' }}>v0.1 — Projet pilote</span>
      </footer>
    </div>
  )
}
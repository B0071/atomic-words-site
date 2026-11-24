import { useState } from 'react'
import { siteContent } from '../data/siteContent'

export default function HealthXray() {
  const [proView, setProView] = useState(false)
  const [openTips, setOpenTips] = useState({})

  const toggleTip = (id) => {
    setOpenTips((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="health-xray" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT // VOCABULARY HEALTH X-RAY</span>
          <span className="mono-label">SAMPLE LEARNER DATA</span>
        </div>
        <h2>
          Most apps show streaks and XP. Atomic Words shows what is actually
          sticking.
        </h2>
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            alignItems: 'center',
          }}
        >
          <span className="mono-label">PREVIEW TIER:</span>
          <button
            type="button"
            className={`btn-pill ${!proView ? 'active' : ''}`}
            id="xrayFreePreviewBtn"
            aria-pressed={!proView}
            onClick={() => setProView(false)}
          >
            Free Plan (2 X-Rays + 4 Locked)
          </button>
          <button
            type="button"
            className={`btn-pill ${proView ? 'active' : ''}`}
            id="xrayProPreviewBtn"
            aria-pressed={proView}
            onClick={() => setProView(true)}
          >
            Pro Plan (All 6 X-Rays)
          </button>
        </div>

        <div className="grid-2" id="xrayGrid" style={{ marginTop: 22 }}>
          {siteContent.xrayItems.map((item) => {
            const isLocked = !proView && item.proOnly
            const isTipOpen = Boolean(openTips[item.id])

            return (
              <article key={item.id} className="xray-card" aria-label={item.title}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <span className="mono-label">Sample learner data</span>
                  <span className="eyebrow-tag">
                    {item.proOnly ? (isLocked ? 'LOCKED · PRO' : 'PRO') : 'FREE'}
                  </span>
                </div>
                <h3 style={{ marginTop: 8 }}>{item.title}</h3>
                <p style={{ fontWeight: 700, marginTop: 6 }}>"{item.question}"</p>
                <p className="muted-copy" style={{ marginTop: 4 }}>
                  {item.purpose}
                </p>

                <div className={isLocked ? 'xray-locked-overlay' : ''}>
                  <div className={isLocked ? 'xray-blurred-body' : ''}>
                    <div className="chart-legend">
                      <span>{item.legend}</span>
                    </div>
                    <button
                      type="button"
                      className="btn-outline xray-inspect-btn"
                      style={{ width: '100%', justifyContent: 'space-between' }}
                      data-xray-id={item.id}
                      disabled={isLocked}
                      aria-expanded={!isLocked && isTipOpen}
                      onClick={() => toggleTip(item.id)}
                    >
                      <span>{item.sampleSummary}</span>
                      <span>Inspect ▾</span>
                    </button>
                  </div>

                  {isLocked ? (
                    <div className="xray-lock-banner">
                      <span className="mono-label">🔒 Unlock with Pro</span>
                      <button
                        type="button"
                        className="btn-pill unlock-pro-xray-btn"
                        onClick={() => setProView(true)}
                      >
                        Preview Pro view
                      </button>
                    </div>
                  ) : (
                    isTipOpen && (
                      <div
                        id={`xrayTip-${item.id}`}
                        className="card-flat"
                        style={{ marginTop: 8 }}
                        aria-live="polite"
                      >
                        <span className="mono-label">TOOLTIP INSIGHT</span>
                        <p style={{ margin: '4px 0 0', fontSize: '0.9rem' }}>
                          {item.tooltip}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

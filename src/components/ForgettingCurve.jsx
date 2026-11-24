import { useEffect, useRef, useState } from 'react'
import { siteContent } from '../data/siteContent'

function yFromPct(pct) {
  return (192 - (pct / 100) * 168).toFixed(1)
}

export default function ForgettingCurve() {
  const [dayIdx, setDayIdx] = useState(0)
  const [minutes, setMinutes] = useState(15)
  const [months, setMonths] = useState(3)
  const [strokeLen, setStrokeLen] = useState(0)
  const [animatedIn, setAnimatedIn] = useState(false)
  const atomicPathRef = useRef(null)

  const xCoords = [56, 122, 188, 254, 320]
  const cramPts = siteContent.retentionMilestones
    .map((m, i) => `${xCoords[i]},${yFromPct(m.cram)}`)
    .join(' ')
  const atomicPts = siteContent.retentionMilestones
    .map((m, i) => `${xCoords[i]},${yFromPct(m.atomic)}`)
    .join(' ')

  const triggerCurveAnimation = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pathEl = atomicPathRef.current
    if (reduced || !pathEl) {
      setStrokeLen(0)
      setAnimatedIn(true)
      return
    }
    const len = pathEl.getTotalLength ? Math.ceil(pathEl.getTotalLength()) : 320
    setStrokeLen(len)
    setAnimatedIn(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAnimatedIn(true)
      })
    })
  }

  useEffect(() => {
    triggerCurveAnimation()
  }, [])

  const activeM = siteContent.retentionMilestones[dayIdx]
  const pace = siteContent.fixedDailyBricks
  const days = months * 30
  const laid = pace * days
  const mature = Math.max(0, laid - (days > 21 ? pace * 21 : 0))

  let atomicRecall = 84
  let cramRecall = 11
  if (days <= 1) {
    atomicRecall = 95
    cramRecall = 95
  } else if (days <= 3) {
    atomicRecall = 84
    cramRecall = 45
  } else if (days <= 7) {
    atomicRecall = 80
    cramRecall = 25
  } else if (days <= 14) {
    atomicRecall = 84
    cramRecall = 18
  }

  return (
    <section id="problem" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT // THE FORGETTING CURVE</span>
          <span className="mono-label">
            30-DAY RETENTION MODEL{' '}
            <span style={{ whiteSpace: 'nowrap' }} aria-hidden="true">
              ಠ_ಠ
            </span>
          </span>
        </div>
        <h2>Cramming feels productive on Sunday. By Day 30, most of it is gone.</h2>
        <p className="lead-copy">
          In a typical Sunday cram dump,{' '}
          <span className="key-u">
            most are fading within a week and mostly gone within a month
          </span>
          . Same words. Different method.
        </p>

        <div className="grid-2" style={{ marginTop: 22 }}>
          <div className="card-box">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              <h3>Recall Curve (Day 1 to Day 30)</h3>
              <button
                type="button"
                className="btn-pill"
                id="replayCurveBtn"
                onClick={triggerCurveAnimation}
              >
                Replay Curve
              </button>
            </div>

            <div className="chart-legend" aria-label="Chart legend">
              <span>
                <span className="legend-swatch hollow" />
                Cram Dump (95% → 45% → 25% → 18% → 11%)
              </span>
              <span>
                <span className="legend-swatch filled" />
                Atomic Words (95% → 84% → 80% → 84% → 84%)
              </span>
            </div>

            <svg
              id="forgettingCurveSvg"
              viewBox="0 0 360 210"
              width="100%"
              height="210"
              role="img"
              aria-label="Forgetting curve comparison across Day 1, Day 3, Day 7, Day 14, and Day 30"
            >
              <line
                x1="36"
                y1="24"
                x2="340"
                y2="24"
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeDasharray="3 3"
              />
              <line
                x1="36"
                y1="66"
                x2="340"
                y2="66"
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeDasharray="3 3"
              />
              <line
                x1="36"
                y1="108"
                x2="340"
                y2="108"
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeDasharray="3 3"
              />
              <line
                x1="36"
                y1="150"
                x2="340"
                y2="150"
                stroke="currentColor"
                strokeOpacity="0.15"
                strokeDasharray="3 3"
              />
              <line
                x1="36"
                y1="192"
                x2="340"
                y2="192"
                stroke="currentColor"
                strokeOpacity="0.35"
              />

              <rect
                x="36"
                y="49"
                width="304"
                height="9"
                fill="currentColor"
                fillOpacity="0.12"
              />
              <text
                x="340"
                y="45"
                textAnchor="end"
                fontFamily="ui-monospace, monospace"
                fontSize="10"
                fill="currentColor"
              >
                SWEET SPOT 80–85%
              </text>

              <text
                x="28"
                y="28"
                textAnchor="end"
                fontFamily="ui-monospace, monospace"
                fontSize="10"
                fill="currentColor"
              >
                100%
              </text>
              <text
                x="28"
                y="111"
                textAnchor="end"
                fontFamily="ui-monospace, monospace"
                fontSize="10"
                fill="currentColor"
              >
                50%
              </text>
              <text
                x="28"
                y="192"
                textAnchor="end"
                fontFamily="ui-monospace, monospace"
                fontSize="10"
                fill="currentColor"
              >
                0%
              </text>

              <path
                id="cramCurvePath"
                d={`M ${cramPts.split(' ').join(' L ')}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5 4"
              />
              <path
                ref={atomicPathRef}
                id="atomicCurvePath"
                d={`M ${atomicPts.split(' ').join(' L ')}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                style={{
                  strokeDasharray: strokeLen ? String(strokeLen) : undefined,
                  strokeDashoffset: strokeLen ? (animatedIn ? '0' : String(strokeLen)) : undefined,
                  transition: strokeLen ? 'stroke-dashoffset 0.9s var(--ease-studio)' : undefined,
                }}
              />
              <g id="curveNodesGroup">
                {siteContent.retentionMilestones.map((m, i) => {
                  const cyA = yFromPct(m.atomic)
                  const cyC = yFromPct(m.cram)
                  const isSel = i === dayIdx
                  return (
                    <g key={m.day}>
                      <circle
                        cx={xCoords[i]}
                        cy={cyC}
                        r="4.5"
                        fill="var(--bg-paper)"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <circle
                        cx={xCoords[i]}
                        cy={cyA}
                        r={isSel ? 7 : 5}
                        fill="currentColor"
                        stroke="var(--bg-paper)"
                        strokeWidth="1.5"
                      />
                      <text
                        x={xCoords[i]}
                        y="206"
                        textAnchor="middle"
                        fontFamily="ui-monospace, monospace"
                        fontSize="10"
                        fill="currentColor"
                      >
                        {m.day}
                      </text>
                    </g>
                  )
                })}
              </g>
            </svg>

            <div className="d-btn-row" role="group" aria-label="Select retention milestone day">
              {siteContent.retentionMilestones.map((m, i) => (
                <button
                  key={m.day}
                  type="button"
                  className={`d-btn ${i === dayIdx ? 'active' : ''}`}
                  data-day-idx={i}
                  onClick={() => setDayIdx(i)}
                >
                  {m.day}
                </button>
              ))}
            </div>

            <div className="card-flat" id="curveMilestoneReadout" style={{ marginTop: 10 }} aria-live="polite">
              <div className="mono-label">{activeM.label} SNAPSHOT</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}>
                Atomic Words: {activeM.atomic}% recall vs. Cram Dump: {activeM.cram}% recall
              </div>
              <p className="muted-copy" style={{ margin: '4px 0 0' }}>
                {activeM.note}
              </p>
            </div>
          </div>

          <div className="card-box">
            <h3>90-Day Pace &amp; Horizon Simulator</h3>
            <p className="muted-copy" style={{ marginTop: 4 }}>
              Fixed intake: <strong id="calcFixedPace">{pace} new bricks/day</strong>.
            </p>

            <div className="form-field" style={{ marginTop: 14 }}>
              <label htmlFor="calcMinutesSlider">
                Daily study time: <span id="calcMinutesVal">{minutes}</span> min/day
              </label>
              <input
                type="range"
                id="calcMinutesSlider"
                min="5"
                max="45"
                step="5"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
            </div>

            <div className="form-field">
              <label htmlFor="calcMonthsSlider">
                Time horizon: <span id="calcMonthsVal">{months}</span> months (
                <span id="calcDaysVal">{days}</span> days)
              </label>
              <input
                type="range"
                id="calcMonthsSlider"
                min="1"
                max="12"
                step="1"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
              />
            </div>

            <div className="metrics-4" id="calcOutputGrid" aria-live="polite">
              <div className="metric-box">
                <div className="mono-label">BRICKS LAID</div>
                <div className="metric-val" id="outBricksLaid">
                  {laid}
                </div>
              </div>
              <div className="metric-box">
                <div className="mono-label">MATURE (&gt;21D)</div>
                <div className="metric-val" id="outMatureBricks">
                  {mature}
                </div>
              </div>
              <div className="metric-box">
                <div className="mono-label">ATOMIC RECALL</div>
                <div className="metric-val" id="outAtomicRecall">
                  {atomicRecall}%
                </div>
              </div>
              <div className="metric-box">
                <div className="mono-label">CRAM RECALL</div>
                <div className="metric-val" id="outCramRecall">
                  {cramRecall}%
                </div>
              </div>
            </div>

            <p className="mono-label" style={{ marginTop: 12 }}>
              Assumptions: fixed 3 new bricks/day (30-day months), mature = laid minus (3 × 21) when horizon &gt; 21 days; recall anchored to 1-model milestones.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

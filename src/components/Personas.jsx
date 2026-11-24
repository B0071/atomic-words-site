import { useEffect, useRef, useState } from 'react'
import { siteContent } from '../data/siteContent'

function PortraitSvg({ id }) {
  const portraits = {
    dilnoza: (
      <>
        <circle cx="48" cy="36" r="16" fill="currentColor" />
        <path d="M20 96 C22 68, 74 68, 76 96 Z" fill="currentColor" />
        <rect x="36" y="18" width="24" height="6" fill="var(--bg-paper)" />
      </>
    ),
    marcus: (
      <>
        <rect x="33" y="20" width="30" height="30" rx="4" fill="currentColor" />
        <path d="M18 96 C20 66, 76 66, 78 96 Z" fill="currentColor" />
        <rect x="38" y="31" width="20" height="5" fill="var(--bg-paper)" />
      </>
    ),
    aylin: (
      <>
        <circle cx="48" cy="35" r="15" fill="currentColor" />
        <path d="M22 96 C24 68, 72 68, 74 96 Z" fill="currentColor" />
        <line
          x1="34"
          y1="22"
          x2="62"
          y2="22"
          stroke="var(--bg-paper)"
          strokeWidth="3"
        />
      </>
    ),
    kenji: (
      <>
        <circle cx="48" cy="35" r="15" fill="currentColor" />
        <path d="M18 96 C20 67, 76 67, 78 96 Z" fill="currentColor" />
        <rect x="34" y="33" width="28" height="4" fill="var(--bg-paper)" />
      </>
    ),
    sofia: (
      <>
        <circle cx="48" cy="35" r="15" fill="currentColor" />
        <path d="M21 96 C23 69, 73 69, 75 96 Z" fill="currentColor" />
        <circle cx="48" cy="20" r="4" fill="var(--bg-paper)" />
      </>
    ),
    ravi: (
      <>
        <circle cx="48" cy="36" r="15" fill="currentColor" />
        <path d="M19 96 C21 67, 75 67, 77 96 Z" fill="currentColor" />
        <path
          d="M48 56 L48 68 M42 62 L54 62"
          stroke="var(--bg-paper)"
          strokeWidth="3"
        />
      </>
    ),
    lena: (
      <>
        <circle cx="48" cy="35" r="15" fill="currentColor" />
        <path d="M20 96 C22 68, 74 68, 76 96 Z" fill="currentColor" />
        <circle cx="48" cy="35" r="5" fill="var(--bg-paper)" />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 96 112"
      width="100%"
      height="100%"
      className="portrait-halftone"
      role="img"
      aria-label={`Composite portrait illustration for ${id}`}
    >
      <defs>
        <pattern
          id={`ht-${id}`}
          width="6"
          height="6"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.1" fill="currentColor" opacity="0.22" />
        </pattern>
      </defs>
      <rect width="96" height="112" fill={`url(#ht-${id})`} />
      {portraits[id] || portraits.dilnoza}
    </svg>
  )
}

function CountUpMetric({ targetValue, suffix = '', active }) {
  const [displayValue, setDisplayValue] = useState(targetValue)

  useEffect(() => {
    if (!active) {
      setDisplayValue(targetValue)
      return
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDisplayValue(targetValue)
      return
    }
    const duration = 800
    const startTime = performance.now()
    let rafId = 0

    const step = (now) => {
      const progress = Math.min(1, (now - startTime) / duration)
      setDisplayValue(Math.round(progress * targetValue))
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      }
    }

    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [targetValue, active])

  return (
    <div className="metric-val">
      {displayValue}
      {suffix}
    </div>
  )
}

export default function Personas() {
  const [selectedId, setSelectedId] = useState('dilnoza')
  const [mode, setMode] = useState('after')
  const [bookmarkMsg, setBookmarkMsg] = useState('')
  const tabRefs = useRef({})

  const personas = siteContent.personas
  const active = personas.find((p) => p.id === selectedId) || personas[0]

  const selectPersona = (nextId, focusTab = false) => {
    setSelectedId(nextId)
    setMode('after')
    setBookmarkMsg('')
    if (focusTab) {
      requestAnimationFrame(() => {
        tabRefs.current[nextId]?.focus()
      })
    }
  }

  const handleTabKeyDown = (e, idx) => {
    let targetIdx = idx
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      targetIdx = (idx + 1) % personas.length
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      targetIdx = (idx - 1 + personas.length) % personas.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      targetIdx = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      targetIdx = personas.length - 1
    } else {
      return
    }
    selectPersona(personas[targetIdx].id, true)
  }

  const isAfter = mode === 'after'
  const metrics = active.stayPut ? null : isAfter ? active.after : active.before

  return (
    <section id="personas" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT // IS IT FOR YOU?</span>
          <span className="mono-label">7 COMPOSITE LEARNERS</span>
        </div>
        <h2>Which of these sounds like you?</h2>
        <p className="lead-copy">Composite personas. Illustrative 90-day outcomes.</p>

        <div className="persona-layout" style={{ marginTop: 22 }}>
          <div
            className="persona-tablist"
            role="tablist"
            aria-label="Composite learner personas"
            id="personaTablist"
          >
            {personas.map((p, idx) => {
              const selected = p.id === active.id
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabRefs.current[p.id] = el
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={selected}
                  tabIndex={selected ? 0 : -1}
                  data-persona-id={p.id}
                  className={`persona-tab-btn ${p.stayPut ? 'stay-put' : ''}`}
                  onClick={() => selectPersona(p.id, false)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                >
                  <span className="persona-thumb-wrap">
                    <PortraitSvg id={p.id} />
                  </span>
                  <span>
                    <strong style={{ display: 'block', fontSize: '0.95rem' }}>
                      {p.name}
                    </strong>
                    <span className="persona-role-meta mono-label" style={{ fontSize: 12 }}>
                      {p.role}
                    </span>
                    <span className="persona-tag-line" style={{ display: 'block' }}>
                      {p.stayPut ? 'STAY PUT' : p.tag}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <div id="personaPanelContainer">
            <div
              className="card-box persona-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active.id}`}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 14,
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div className="persona-portrait-frame">
                    <PortraitSvg id={active.id} />
                  </div>
                  <div>
                    <span className="eyebrow-tag" style={{ marginBottom: 6 }}>
                      Composite persona
                    </span>
                    <h3 style={{ fontSize: '1.35rem' }}>
                      {active.name}, {active.age}
                    </h3>
                    <div className="muted-copy">{active.role}</div>
                    <div style={{ marginTop: 6, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <span className="eyebrow-tag">{active.level}</span>
                      <span className="eyebrow-tag">Plan: {active.plan}</span>
                    </div>
                  </div>
                </div>
              </div>

              <blockquote
                style={{
                  margin: '16px 0 0',
                  paddingLeft: 12,
                  borderLeft: '3px solid var(--border)',
                  fontStyle: 'italic',
                  fontSize: '1.1rem',
                }}
              >
                "{active.quote}"
              </blockquote>

              <div style={{ marginTop: 16 }}>
                <span className="mono-label">THEIR PROBLEM</span>
                <ul
                  style={{
                    margin: '6px 0 0',
                    paddingLeft: 18,
                    display: 'grid',
                    gap: 4,
                  }}
                >
                  {active.problems.map((pr) => (
                    <li key={pr}>{pr}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 16 }}>
                <span className="mono-label">HOW ATOMIC WORDS HELPS</span>
                <ul
                  style={{
                    margin: '6px 0 0',
                    paddingLeft: 18,
                    display: 'grid',
                    gap: 6,
                  }}
                >
                  {active.helps.map((h) => (
                    <li key={h.feature}>
                      <strong>[{h.feature}]</strong> {h.text}
                    </li>
                  ))}
                </ul>
              </div>

              {active.stayPut ? (
                <div
                  className="card-flat"
                  style={{ marginTop: 16, borderStyle: 'dashed' }}
                >
                  <span className="mono-label">VERDICT</span>
                  <h3 style={{ marginTop: 4 }}>Keep your method. Seriously.</h3>
                  <p className="muted-copy" style={{ marginTop: 6 }}>
                    Switching has a cost, and you’d be paying it for nothing. With ~90%
                    retention and daily spoken use already working, keep your current
                    routine.
                  </p>
                  <div
                    style={{
                      marginTop: 12,
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 10,
                    }}
                  >
                    <a href="#tenWordTestBox" className="btn-solid">
                      Take the 10-word test
                    </a>
                    <button
                      type="button"
                      className="btn-outline"
                      id="bookmarkLaterBtn"
                      onClick={() =>
                        setBookmarkMsg(
                          'Saved to your mental bookmark—come back whenever your workflow changes.'
                        )
                      }
                    >
                      Bookmark us for later
                    </button>
                  </div>
                  {bookmarkMsg && (
                    <div
                      id="bookmarkFeedback"
                      aria-live="polite"
                      className="mono-label"
                      style={{ marginTop: 8 }}
                    >
                      {bookmarkMsg}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ marginTop: 16 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <span className="mono-label">BEFORE VS AFTER (90 DAYS)</span>
                    <div
                      role="group"
                      aria-label="Before or After 90 days toggle"
                      style={{ display: 'flex', gap: 6 }}
                    >
                      <button
                        type="button"
                        className={`btn-pill ${!isAfter ? 'active' : ''}`}
                        id="personaBeforeBtn"
                        onClick={() => setMode('before')}
                      >
                        Before
                      </button>
                      <button
                        type="button"
                        className={`btn-pill ${isAfter ? 'active' : ''}`}
                        id="personaAfterBtn"
                        onClick={() => setMode('after')}
                      >
                        After (90d)
                      </button>
                    </div>
                  </div>

                  <div className="metrics-4" id="personaMetricsGrid">
                    <div className={`metric-box ${!isAfter ? 'before-state' : ''}`}>
                      <div className="mono-label">
                        {isAfter ? 'BRICKS LAID' : 'WORDS SAVED'}
                      </div>
                      <CountUpMetric
                        targetValue={isAfter ? metrics.laid : metrics.saved}
                        active={isAfter}
                      />
                    </div>
                    <div className={`metric-box ${!isAfter ? 'before-state' : ''}`}>
                      <div className="mono-label">
                        {isAfter ? 'MATURE (>21D)' : 'WORDS USED'}
                      </div>
                      <CountUpMetric
                        targetValue={isAfter ? metrics.mature : metrics.used}
                        active={isAfter}
                      />
                    </div>
                    <div className={`metric-box ${!isAfter ? 'before-state' : ''}`}>
                      <div className="mono-label">RECALL</div>
                      <CountUpMetric
                        targetValue={metrics.recall}
                        suffix="%"
                        active={isAfter}
                      />
                    </div>
                    <div className={`metric-box ${!isAfter ? 'before-state' : ''}`}>
                      <div className="mono-label">DAILY TIME</div>
                      <CountUpMetric
                        targetValue={metrics.timeMin}
                        suffix="m/d"
                        active={isAfter}
                      />
                    </div>
                  </div>

                  <p style={{ marginTop: 12, fontWeight: 700 }}>
                    Result: "{active.result}"
                  </p>
                </div>
              )}

              <p className="muted-copy" style={{ marginTop: 14 }}>
                <strong>Not ideal if…</strong> {active.notIdealIf}
              </p>

              <div
                style={{
                  marginTop: 16,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                <a href="#pricing" className="btn-solid">
                  Start free
                </a>
                <a href="#pricing" className="btn-outline">
                  See Pro features
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

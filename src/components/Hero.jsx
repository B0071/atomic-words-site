import { useEffect, useState } from 'react'
import { siteContent } from '../data/siteContent'

export default function Hero() {
  const [fadedIds, setFadedIds] = useState([])
  const [lit, setLit] = useState(true)

  const runAnimation = () => {
    setFadedIds([])
    setLit(false)

    siteContent.specimenWords.forEach((word, idx) => {
      setTimeout(() => {
        setFadedIds((prev) => (prev.includes(word) ? prev : [...prev, word]))
      }, 120 + idx * 55)
    })

    setTimeout(() => {
      setLit(true)
    }, 820)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadedIds(siteContent.specimenWords)
      setLit(true)
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="top" className="section-block">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT I // THE THESIS</span>
          <span className="mono-label">SPACED ACTIVE RECALL</span>
        </div>

        <div className="hero-grid">
          <div>
            <h1>
              You don’t have a memory problem. You have a{' '}
              <span className="key-u">cramming problem</span>.{' '}
              <span style={{ whiteSpace: 'nowrap' }} aria-hidden="true">
                •_•
              </span>
            </h1>
            <p className="lead-copy">
              Every Sunday you save 30 new C1 words. A week later{' '}
              <span className="key-u">most have faded</span>, and when someone
              actually speaks to you, you reach for <em>"very good"</em> instead.
              Saving isn’t learning.
            </p>

            <div className="hero-actions">
              <a href="#final-cta" className="btn-solid">
                Start free: lay your first brick →
              </a>
              <a href="#health-xray" className="btn-outline">
                Inspect Health X-Ray
              </a>
            </div>
            <p className="mono-label" style={{ marginTop: 8 }}>
              No card required. Upgrade anytime.
            </p>

            <div className="stat-strip" role="list" aria-label="Core cadence metrics">
              <div className="stat-cell" role="listitem">
                1 brick at a time
              </div>
              <div className="stat-cell" role="listitem">
                15 min a day
              </div>
              <div className="stat-cell" role="listitem">
                80–85% target retention
              </div>
            </div>
          </div>

          <div className="card-box" id="heroSpecimenCard">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span className="mono-label">SUNDAY_DUMP_30.DOCX</span>
              <button
                type="button"
                className="btn-pill"
                id="toggleSpecimenBtn"
                onClick={runAnimation}
              >
                Replay Brick
              </button>
            </div>

            <ul
              className="specimen-list collapsed"
              id="heroSpecimenList"
              aria-label="30 crammed words fading"
            >
              {siteContent.specimenWords.map((word) => (
                <li
                  key={word}
                  className={`specimen-item ${fadedIds.includes(word) ? 'faded-out' : ''}`}
                >
                  {word}
                </li>
              ))}
            </ul>

            <div
              className={`single-brick-stage ${lit ? 'lit' : ''}`}
              id="heroSingleBrick"
            >
              <div className="mono-label" style={{ color: 'inherit', opacity: 0.8 }}>
                1 CEMENTED BRICK // ACTIVE RECALL
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: 4 }}>
                mitigate
              </div>
              <div style={{ fontSize: '0.9rem', marginTop: 4, opacity: 0.9 }}>
                <em>"We need to mitigate the risk before launch."</em>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

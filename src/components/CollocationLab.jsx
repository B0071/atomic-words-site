import { useEffect, useRef, useState } from 'react'
import { siteContent } from '../data/siteContent'

export default function CollocationLab() {
  const [registerFilter, setRegisterFilter] = useState('all')
  const [selectedId, setSelectedId] = useState(
    siteContent.collocationBricks[0].id
  )
  const [revealed, setRevealed] = useState(false)
  const [tipOpen, setTipOpen] = useState(false)

  const chipRefs = useRef({})
  const tipBtnRef = useRef(null)

  const list =
    registerFilter === 'all'
      ? siteContent.collocationBricks
      : siteContent.collocationBricks.filter((b) => b.register === registerFilter)

  const active =
    list.find((b) => b.id === selectedId) ||
    list[0] ||
    siteContent.collocationBricks[0]

  useEffect(() => {
    if (!list.some((b) => b.id === selectedId) && list[0]) {
      setSelectedId(list[0].id)
      setRevealed(false)
    }
  }, [registerFilter, list, selectedId])

  const selectBrickWithFocus = (nextId) => {
    setSelectedId(nextId)
    setRevealed(false)
    requestAnimationFrame(() => {
      chipRefs.current[nextId]?.focus()
    })
  }

  const handleChipKeyDown = (e, idx) => {
    let nextIdx = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIdx = (idx + 1) % list.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIdx = (idx - 1 + list.length) % list.length
    }
    if (nextIdx !== null && list[nextIdx]) {
      e.preventDefault()
      selectBrickWithFocus(list[nextIdx].id)
    }
  }

  const handleTipKeyDown = (e) => {
    if (e.key === 'Escape') {
      setTipOpen(false)
      tipBtnRef.current?.blur()
    }
  }

  return (
    <section id="collocation-lab" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT // COLLOCATION LAB</span>
          <span className="mono-label">PHRASE PAIRING &amp; SPOKEN CUE</span>
        </div>
        <h2>Words stick in pairs, not isolation.</h2>
        <p className="lead-copy">
          Select a <span className="key-u">register</span> and{' '}
          <span className="key-u">brick pair</span> to inspect how a collocation
          holds up in a live sentence.
        </p>

        <div className="aw-lab-grid">
          <div className="card-box">
            <span className="mono-label">01 // REGISTER FILTER</span>
            <div
              className="aw-chip-row"
              role="group"
              aria-label="Filter collocations by register"
              id="awRegisterGroup"
            >
              {[
                { key: 'all', label: 'All Pairs' },
                { key: 'workplace', label: 'Workplace' },
                { key: 'academic', label: 'Academic / Exam' },
              ].map((reg) => (
                <button
                  key={reg.key}
                  type="button"
                  className="aw-chip"
                  data-aw-reg={reg.key}
                  aria-pressed={registerFilter === reg.key}
                  onClick={() => {
                    setRegisterFilter(reg.key)
                    setRevealed(false)
                  }}
                >
                  {reg.label}
                </button>
              ))}
            </div>

            <div style={{ marginTop: 14 }}>
              <span className="mono-label">02 // CHOOSE A COLLOCATION BRICK</span>
              <div
                className="aw-chip-row"
                role="group"
                aria-label="Select collocation brick"
                id="awBrickChoices"
              >
                {list.map((b, idx) => (
                  <button
                    key={b.id}
                    ref={(el) => {
                      chipRefs.current[b.id] = el
                    }}
                    type="button"
                    className="aw-chip"
                    data-aw-brick={b.id}
                    aria-pressed={b.id === active.id}
                    onClick={() => {
                      setSelectedId(b.id)
                      setRevealed(false)
                    }}
                    onKeyDown={(e) => handleChipKeyDown(e, idx)}
                  >
                    {b.phrase}
                  </button>
                ))}
              </div>
            </div>

            <div className="aw-hatch-box">
              <div className="aw-hatch-inner" id="awLabDetail" aria-live="polite">
                <div className="mono-label">{active.registerLabel}</div>
                <h3 style={{ marginTop: 4 }}>{active.phrase}</h3>
                <p
                  className="muted-copy"
                  style={{ margin: '6px 0 0', fontSize: '0.92rem' }}
                >
                  <strong>Spoken target:</strong> "{active.model}"
                </p>
              </div>
            </div>
          </div>

          <div className="card-box">
            <span className="mono-label">03 // SPOKEN RETRIEVAL CHECK</span>
            <h3 style={{ marginTop: 6 }}>Say it out loud before flipping the cue.</h3>
            <p className="muted-copy" style={{ marginTop: 6 }}>
              Cover the target phrase in your head, answer the spoken situation, then
              reveal the model phrasing.
            </p>

            <div className="card-flat" style={{ marginTop: 12 }}>
              <div className="mono-label">SITUATION</div>
              <p
                id="awCueSituation"
                style={{ margin: '6px 0 0', fontWeight: 600 }}
              >
                {active.cue}
              </p>
            </div>

            <div
              style={{
                marginTop: 12,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                alignItems: 'center',
              }}
            >
              <button
                type="button"
                className="btn-solid"
                id="awRevealCueBtn"
                aria-expanded={revealed}
                aria-controls="awCueAnswerBox"
                onClick={() => setRevealed((prev) => !prev)}
              >
                {revealed ? 'Hide model phrasing' : 'Reveal model phrasing'}
              </button>
              <div className="aw-tip-wrap">
                <button
                  ref={tipBtnRef}
                  type="button"
                  className="aw-tip-btn"
                  id="awLabTipBtn"
                  aria-expanded={tipOpen}
                  aria-controls="awLabTipBox"
                  onClick={() => setTipOpen((prev) => !prev)}
                  onFocus={() => setTipOpen(true)}
                  onKeyDown={handleTipKeyDown}
                >
                  ? Why collocations
                </button>
              </div>
            </div>

            {revealed && (
              <div
                id="awCueAnswerBox"
                className="card-flat"
                style={{ marginTop: 12 }}
                aria-live="polite"
              >
                <span className="mono-label">MODEL PHRASING</span>
                <p style={{ margin: '6px 0 0', fontWeight: 600 }}>
                  "{active.model}"
                </p>
              </div>
            )}

            {tipOpen && (
              <div
                id="awLabTipBox"
                className="aw-tip-popover"
                role="region"
                aria-label="Collocation note"
              >
                <strong>Active retrieval rule:</strong> Learning <em>"mitigate"</em>{' '}
                alone leaves you searching for a noun or verb frame in speech;
                learning <em>"mitigate the risk"</em> gives you a ready-made slot.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { siteContent } from '../data/siteContent'

export default function BrickDemo() {
  const [demoIdx, setDemoIdx] = useState(0)
  const [feedback, setFeedback] = useState('')

  const current = siteContent.brickDemoWords[demoIdx]

  const handleSelectWord = (idx) => {
    setDemoIdx(idx)
    setFeedback('')
  }

  const handlePickOption = (opt) => {
    if (opt === current.answer) {
      setFeedback(`✓ Cemented: "${current.collocation}" recalled on cue.`)
    } else {
      setFeedback(
        `Not quite — "${current.answer}" fits "${current.collocation}" best. Try again.`
      )
    }
  }

  return (
    <section id="product-demo" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT III // TRY ONE BRICK</span>
          <span className="mono-label">NO SIGNUP REQUIRED</span>
        </div>
        <h2>Test a single brick right now.</h2>
        <p className="lead-copy">
          Pick a word, check its{' '}
          <span className="key-u">collocation and pronunciation</span>, and test
          active recall in one tap.
        </p>

        <div className="card-box" style={{ marginTop: 20 }}>
          <div className="pill-row" role="tablist" aria-label="Sample brick words" id="brickDemoTabs">
            {siteContent.brickDemoWords.map((item, idx) => (
              <button
                key={item.word}
                type="button"
                className={`pill-tab ${idx === demoIdx ? 'active' : ''}`}
                role="tab"
                aria-selected={idx === demoIdx}
                onClick={() => handleSelectWord(idx)}
              >
                {item.word}
              </button>
            ))}
          </div>

          <div id="brickDemoStage" role="tabpanel" style={{ marginTop: 18 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                gap: 8,
                borderBottom: '1px solid var(--border-soft)',
                paddingBottom: 12,
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.5rem' }}>
                  {current.word}{' '}
                  <span className="mono-label" style={{ fontWeight: 400 }}>
                    {current.ipa} · {current.pos}
                  </span>
                </h3>
                <p style={{ margin: '6px 0 0' }}>{current.meaning}</p>
              </div>
              <div className="card-flat">
                <span className="mono-label">COLLOCATION</span>
                <div style={{ fontWeight: 700, marginTop: 2 }}>{current.collocation}</div>
              </div>
            </div>

            <p className="muted-copy" style={{ marginTop: 12 }}>
              <em>"{current.example}"</em>
            </p>

            <div className="card-flat" style={{ marginTop: 14 }}>
              <span className="mono-label">RECALL PROMPT</span>
              <p style={{ margin: '6px 0 12px', fontWeight: 600 }}>{current.prompt}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {current.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className="btn-outline demo-opt-btn"
                    onClick={() => handlePickOption(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {feedback && (
                <div
                  id="demoRecallFeedback"
                  aria-live="polite"
                  style={{
                    marginTop: 12,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  {feedback}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

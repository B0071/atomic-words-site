import { useState } from 'react'

export default function FinalCta() {
  const [brickInput, setBrickInput] = useState('')
  const [collocationInput, setCollocationInput] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const word = brickInput.trim()
    const collocation = collocationInput.trim()

    if (!word) {
      setStatusMessage('Enter one target word to lay your first brick.')
      return
    }

    setStatusMessage(
      collocation
        ? `Brick queued: "${word}" paired with "${collocation}".`
        : `Brick queued: "${word}" ready for its first active recall cue.`
    )
    setBrickInput('')
    setCollocationInput('')
  }

  return (
    <section id="final-cta" className="section-block section-inverted reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT VIII // START QUIETLY</span>
          <span className="mono-label">15 MIN / DAY</span>
        </div>
        <h2>Lay one brick today. Keep it in reach next month.</h2>
        <p className="lead-copy">
          Start free with up to <span className="key-u">50 bricks</span> and{' '}
          <span className="key-u">3 new bricks per day</span>—no credit card or
          cramming marathon required.
        </p>

        <form
          className="card-box"
          onSubmit={handleSubmit}
          style={{ marginTop: 22 }}
          noValidate
        >
          <h3>Queue Your First Brick</h3>
          <div className="grid-2" style={{ marginTop: 12 }}>
            <div className="form-field" style={{ marginBottom: 0 }}>
              <label htmlFor="ctaWordInput">Target word</label>
              <input
                type="text"
                id="ctaWordInput"
                placeholder="e.g., corroborate"
                value={brickInput}
                onChange={(e) => setBrickInput(e.target.value)}
              />
            </div>

            <div className="form-field" style={{ marginBottom: 0 }}>
              <label htmlFor="ctaCollocationInput">Natural collocation</label>
              <input
                type="text"
                id="ctaCollocationInput"
                placeholder="e.g., corroborate the findings"
                value={collocationInput}
                onChange={(e) => setCollocationInput(e.target.value)}
              />
            </div>
          </div>

          <div
            style={{
              marginTop: 14,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <button type="submit" className="btn-solid">
              Lay First Brick →
            </button>
            <a href="#fit-check" className="btn-outline">
              Take the 10-word test first
            </a>
          </div>

          {statusMessage && (
            <p
              className="mono-label"
              aria-live="polite"
              style={{ marginTop: 12 }}
            >
              ✓ {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

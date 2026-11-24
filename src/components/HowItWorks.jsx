export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT II // HOW IT WORKS</span>
          <span className="mono-label">
            THREE QUIET STEPS{' '}
            <span style={{ whiteSpace: 'nowrap' }} aria-hidden="true">
              •_•
            </span>
          </span>
        </div>
        <h2>Capture one brick. Review before it fades. Speak under pressure.</h2>
        <p className="lead-copy">
          No 40-card cramming marathons. Just{' '}
          <span className="key-u">one word with its real collocation</span>,
          returned right inside the 80–85% recall window.
        </p>

        <div className="grid-3" style={{ marginTop: 24 }}>
          <div className="card-box">
            <div className="step-icon-box pulse-subtle" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="6" width="18" height="12" rx="1" />
                <line x1="12" y1="9" x2="12" y2="15" />
                <line x1="9" y1="12" x2="15" y2="12" />
              </svg>
            </div>
            <span className="mono-label">STEP 01 // CAPTURE</span>
            <h3 style={{ marginTop: 6 }}>Lay one brick</h3>
            <p className="muted-copy" style={{ marginTop: 8 }}>
              Save <span className="key-u">one high-value word</span> with a
              natural phrase—not a 30-word dictionary dump you never revisit.
            </p>
          </div>

          <div className="card-box">
            <div className="step-icon-box pulse-subtle" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 16 14" />
              </svg>
            </div>
            <span className="mono-label">STEP 02 // REVIEW</span>
            <h3 style={{ marginTop: 6 }}>Catch it before it drops</h3>
            <p className="muted-copy" style={{ marginTop: 8 }}>
              Spaced intervals bring back <span className="key-u">due bricks</span>{' '}
              right when effort peaks, keeping recall in the 80–86% zone.
            </p>
          </div>

          <div className="card-box">
            <div className="step-icon-box pulse-subtle" aria-hidden="true">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
                <rect x="2" y="14" width="4" height="6" rx="1" />
                <rect x="18" y="14" width="4" height="6" rx="1" />
              </svg>
            </div>
            <span className="mono-label">STEP 03 // SPEAK</span>
            <h3 style={{ marginTop: 6 }}>Retrieve on cue</h3>
            <p className="muted-copy" style={{ marginTop: 8 }}>
              Short active recall prompts train{' '}
              <span className="key-u">spoken retrieval</span> so the word shows up
              in live conversation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

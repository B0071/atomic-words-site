export default function SpokenGap() {
  return (
    <>
      <section id="spoken-gap" className="section-block reveal">
        <div className="container">
          <div className="eyebrow-row">
            <span className="eyebrow-tag">■ ACT // THE SPOKEN GAP</span>
            <span className="mono-label">PASSIVE RECOGNITION VS. LIVE SPEECH</span>
          </div>
          <h2>In your head it’s a supercar. Out loud it sputters like a jalopy.</h2>
          <p className="lead-copy">
            Recognizing a word when reading is{' '}
            <span className="key-u">not the same</span> as calling it up on a live
            call.
          </p>

          <div className="grid-2" style={{ marginTop: 22 }}>
            <div className="gap-card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span className="mono-label">01 // ENGLISH IN YOUR MIND</span>
                <span className="mono-label">C1 DEPTH</span>
              </div>
              <div className="vehicle-stage" aria-label="Aerodynamic supercar with speed lines">
                <svg
                  viewBox="0 0 320 150"
                  width="100%"
                  height="150"
                  role="img"
                  aria-label="Sleek monochrome supercar illustration"
                >
                  <g
                    className="speed-line"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    opacity="0.55"
                  >
                    <line x1="20" y1="42" x2="72" y2="42" />
                    <line x1="12" y1="62" x2="58" y2="62" />
                    <line x1="24" y1="84" x2="66" y2="84" />
                  </g>
                  <path
                    d="M58 106 L84 82 L146 66 L218 68 L272 88 L294 96 L292 110 L58 110 Z"
                    fill="currentColor"
                  />
                  <path
                    d="M150 70 L206 72 L222 86 L138 86 Z"
                    fill="var(--bg-paper)"
                  />
                  <circle
                    cx="102"
                    cy="110"
                    r="17"
                    fill="var(--bg-paper)"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <circle cx="102" cy="110" r="7" fill="currentColor" />
                  <circle
                    cx="248"
                    cy="110"
                    r="17"
                    fill="var(--bg-paper)"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <circle cx="248" cy="110" r="7" fill="currentColor" />
                </svg>
              </div>
              <p>
                You read articles smoothly and think, <em>"I know that word."</em>{' '}
                Then the pause hits.
              </p>
            </div>

            <div className="gap-card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span className="mono-label">02 // ENGLISH YOU SPEAK</span>
                <span className="mono-label">UNPRACTICED RECALL</span>
              </div>
              <div className="vehicle-stage" aria-label="Tilted jalopy emitting smoke">
                <svg
                  viewBox="0 0 320 150"
                  width="100%"
                  height="150"
                  role="img"
                  aria-label="Dented jalopy car with smoke puffs"
                >
                  <g className="smoke-puff" fill="currentColor" opacity="0.45">
                    <circle cx="268" cy="54" r="9" />
                    <circle cx="282" cy="40" r="12" />
                    <circle cx="298" cy="28" r="8" />
                  </g>
                  <g transform="rotate(-4 160 95)">
                    <rect x="64" y="80" width="188" height="28" fill="currentColor" />
                    <path
                      d="M104 80 L122 54 L196 54 L214 80 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <circle
                      cx="106"
                      cy="112"
                      r="15"
                      fill="var(--bg-paper)"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                    <circle
                      cx="222"
                      cy="110"
                      r="17"
                      fill="var(--bg-paper)"
                      stroke="currentColor"
                      strokeWidth="3"
                    />
                  </g>
                </svg>
              </div>
              <p>
                Under real-time pressure, you fall back on safe filler phrases like{' '}
                <em>"very good"</em> or <em>"big problem."</em>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="why-a-brick" className="section-block reveal">
        <div className="container">
          <div className="eyebrow-row">
            <span className="eyebrow-tag">■ ACT // WHY A BRICK</span>
            <span className="mono-label">STRUCTURE OVER BULK</span>
          </div>
          <h2>A wall is built brick by brick—not dumped from a dump truck.</h2>
          <p className="lead-copy">
            Each brick holds{' '}
            <span className="key-u">
              one word, one clear meaning, and one natural collocation
            </span>{' '}
            you can test aloud.
          </p>
        </div>
      </section>
    </>
  )
}

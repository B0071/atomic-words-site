export default function SwitchingExtensions({ onOpenShop }) {
  return (
    <>
      <section id="switching" className="section-block reveal">
        <div className="container">
          <div className="eyebrow-row">
            <span className="eyebrow-tag">■ ACT // SWITCHING &amp; IMPORT</span>
            <span className="mono-label">ZERO LOSS</span>
          </div>
          <h2>Bringing your word list over shouldn’t mean starting at zero.</h2>
          <div className="grid-2" style={{ marginTop: 18 }}>
            <div className="card-box">
              <h3>Import &amp; Export Paths</h3>
              <p className="muted-copy" style={{ marginTop: 6 }}>
                Export CSV, JSON, or Anki-compatible decks anytime. Concierge
                import helps move existing lists from Anki, Notion, spreadsheets,
                or Quizlet cleanly.
              </p>
            </div>
            <div className="card-box">
              <h3>Your Data Stays Yours</h3>
              <p className="muted-copy" style={{ marginTop: 6 }}>
                Your bricks, review history, and exports belong to you—never
                locked behind a wall.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="essays-drills" className="section-block section-inverted reveal">
        <div className="container">
          <div className="eyebrow-row">
            <span className="eyebrow-tag">■ ACT // EXTENSIONS</span>
            <span className="mono-label">ESSAYS · DRILLS · WORD FAMILIES</span>
          </div>
          <h2>Essays, Drills, and Word Families—when you want more.</h2>
          <p className="lead-copy">
            The core 15-minute brick loop stays untouched.{' '}
            <span className="key-u">Essays, Drills, and Word Families</span> sit
            alongside it when you want deeper context or spoken drills.
          </p>
          <div className="grid-3" style={{ marginTop: 22 }}>
            <div className="card-box">
              <span className="mono-label">01 // ESSAYS</span>
              <h3 style={{ marginTop: 6 }}>Short essays in context</h3>
              <p className="muted-copy" style={{ marginTop: 6 }}>
                See target bricks used inside realistic paragraphs with clear
                collocation notes.
              </p>
            </div>
            <div className="card-box">
              <span className="mono-label">02 // DRILLS</span>
              <h3 style={{ marginTop: 6 }}>Focused spoken &amp; usage drills</h3>
              <p className="muted-copy" style={{ marginTop: 6 }}>
                Practice choosing the right collocation under a short cue rather
                than passive multiple-choice guessing.
              </p>
            </div>
            <div className="card-box">
              <span className="mono-label">03 // WORD FAMILIES</span>
              <h3 style={{ marginTop: 6 }}>Roots &amp; related forms</h3>
              <p className="muted-copy" style={{ marginTop: 6 }}>
                Connect nouns, verbs, adjectives, and adverbs around one core
                brick without cluttering your daily queue.
              </p>
            </div>
          </div>
          <p className="mono-label" style={{ marginTop: 14 }}>
            Free: 1–2 mini-games + word-family preview · Pro: 20 word-family
            unlocks/mo, 10 Essays, 50 Drills/mo · Believer: Unlimited
          </p>
        </div>
      </section>

      <section id="merch-teaser" className="section-block reveal">
        <div className="container">
          <div className="eyebrow-row">
            <span className="eyebrow-tag">■ ACT // MERCH TEASER</span>
            <span className="mono-label">10 STUDIO ITEMS</span>
          </div>
          <h2>Physical reminders for your desk and wall.</h2>
          <p className="lead-copy">
            Monochrome notebooks, desk mats, enamel pins, and brick posters for
            learners who like{' '}
            <span className="key-u">tactile cues outside the screen</span>.
          </p>
          <div style={{ marginTop: 16 }}>
            <button
              type="button"
              className="btn-solid"
              id="openShopFromTeaserBtn"
              onClick={onOpenShop}
            >
              Open Merch Shop (10 Items) →
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

import { useState } from 'react'
import { siteContent } from '../data/siteContent'

export default function FitCheck() {
  const [checkedWords, setCheckedWords] = useState(() => Array(10).fill(false))
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [remindOpen, setRemindOpen] = useState(false)
  const [remindEmail, setRemindEmail] = useState('')
  const [remindStatus, setRemindStatus] = useState('')

  const score = checkedWords.filter(Boolean).length

  const toggleWord = (idx) => {
    setCheckedWords((prev) => prev.map((val, i) => (i === idx ? !val : val)))
  }

  const handleQuizAnswer = (answer) => {
    setQuizAnswers((prev) => [...prev, answer])
    setQuizStep((prev) => prev + 1)
  }

  const resetQuiz = () => {
    setQuizStep(0)
    setQuizAnswers([])
  }

  const handleRemindSubmit = () => {
    const trimmed = remindEmail.trim()
    if (!/\S+@\S+\.\S+/.test(trimmed)) {
      setRemindStatus('Enter a valid email address first.')
      return
    }
    setRemindStatus(
      `30-day reminder scheduled for ${trimmed} (sample confirmation).`
    )
  }

  const renderTenWordOutcome = () => {
    if (score >= 8) {
      return (
        <>
          Your method works. Keep it.{' '}
          <a href="#final-cta" className="btn-outline" style={{ marginLeft: 8 }}>
            Remind me in 30 days
          </a>
        </>
      )
    }
    if (score >= 5) {
      return (
        <>
          Close. Try laying 1 brick a day alongside your current method for 14 days.{' '}
          <a href="#pricing" className="btn-solid" style={{ marginLeft: 8 }}>
            Start free
          </a>
        </>
      )
    }
    return (
      <>
        Your words are fading. Atomic Words was built for this.{' '}
        <a href="#final-cta" className="btn-solid" style={{ marginLeft: 8 }}>
          Lay your first brick
        </a>
      </>
    )
  }

  const renderQuizVerdict = () => {
    const grammarYes = quizAnswers[4] === true
    const examSoonYes = quizAnswers[5] === true
    const speechYes = quizAnswers[0] === true
    const threeWkYes = quizAnswers[1] === true
    const skipYes = quizAnswers[2] === true
    const dreadYes = quizAnswers[3] === true

    let title = ''
    let body = ''
    let ctaHref = '#pricing'
    let ctaLabel = 'Start free'

    if (grammarYes || examSoonYes) {
      title = 'Honest pause before switching.'
      body = grammarYes
        ? 'If you need a structured grammar course from scratch, start with a grammar foundation first.'
        : 'If your exam or deadline is within 7 days, short-term cramming makes sense for tomorrow—Atomic Words is built for lasting recall.'
    } else if (speechYes && threeWkYes && !skipYes && !dreadYes) {
      title = 'Stay put.'
      body =
        "Your current system already supports 3-week recall and live speech without backlog dread. Don't pay a switching cost unnecessarily."
      ctaHref = '#final-cta'
      ctaLabel = 'Remind me in 30 days'
    } else if (!threeWkYes && skipYes) {
      title = 'Good fit.'
      body =
        'Words slipping after 3+ weeks plus regular skipped days is the exact gap Atomic Words was designed to calm.'
    } else {
      title = 'Try it alongside.'
      body =
        'Mixed signals: test 1 brick a day on Free for 14 days alongside your current habit and judge by your own recall.'
    }

    return (
      <div className="card-flat">
        <h4>{title}</h4>
        <p className="muted-copy" style={{ marginTop: 6 }}>
          {body}
        </p>
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            gap: 10,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <a href={ctaHref} className="btn-solid">
            {ctaLabel}
          </a>
          <button
            type="button"
            className="btn-outline"
            id="retakeQuizBtn"
            onClick={resetQuiz}
          >
            Take the quiz again
          </button>
        </div>
      </div>
    )
  }

  const totalQuestions = siteContent.quizQuestions.length
  const currentQuestion = siteContent.quizQuestions[quizStep]

  return (
    <section
      id="fit-check"
      className="section-block section-inverted fit-check-section reveal"
    >
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT // HONEST FIT CHECK</span>
          <span className="mono-label">
            NO HARD SELL{' '}
            <span style={{ whiteSpace: 'nowrap' }} aria-hidden="true">
              •_•
            </span>
          </span>
        </div>
        <h2>The best method is the one that’s already working.</h2>
        <p className="lead-copy">
          If you can pick 10 words you learned three weeks ago and use at least 8
          in a spoken sentence without looking, and you rarely skip 2–3 days in a
          row, <span className="key-u">keep your system</span>. Switching has a cost,
          and you’d be paying it for nothing.
        </p>

        <div className="grid-2" style={{ marginTop: 22 }}>
          <div className="card-box">
            <span className="mono-label">STAY WITH YOUR METHOD IF…</span>
            <ul
              style={{
                margin: '10px 0 0',
                paddingLeft: 18,
                display: 'grid',
                gap: 6,
              }}
            >
              <li>You use most new words in real speaking or writing within a week.</li>
              <li>You can still recall words after 3+ weeks.</li>
              <li>You rarely skip 2–3 days in a row.</li>
              <li>Your system feels sustainable, with no backlog dread.</li>
              <li>You’re happy with the tools you already use.</li>
            </ul>
          </div>

          <div className="card-box">
            <span className="mono-label">ATOMIC WORDS ISN’T BUILT FOR…</span>
            <ul
              style={{
                margin: '10px 0 0',
                paddingLeft: 18,
                display: 'grid',
                gap: 6,
              }}
            >
              <li>Absolute beginners who need a grammar course.</li>
              <li>Learners of languages other than English.</li>
              <li>Last-minute crammers: cramming works for tomorrow’s exam.</li>
              <li>Anyone unwilling to spend ~15 minutes most days.</li>
              <li>Anyone who wants a streak-and-XP game.</li>
            </ul>
          </div>
        </div>

        <div className="card-box" id="tenWordTestBox" style={{ marginTop: 22 }}>
          <span className="mono-label">INLINE SELF-AUDIT // NO SIGNUP</span>
          <h3 style={{ marginTop: 4 }}>The 10-Word Spoken Test</h3>
          <p className="muted-copy" style={{ marginTop: 4 }}>
            Step 1: Write or think of 10 words you learned about 3 weeks ago. Step 2:
            Check each one you used in a spoken sentence without looking.
          </p>

          <div
            className="grid-2"
            id="tenWordChecklist"
            style={{ marginTop: 12, gap: 8 }}
          >
            {checkedWords.map((checked, idx) => (
              <div key={idx} className="word-test-row">
                <label
                  htmlFor={`w10-${idx}`}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 13,
                    cursor: 'pointer',
                    flex: 1,
                  }}
                >
                  Word #{idx + 1}: Used it in a spoken sentence without looking
                </label>
                <input
                  type="checkbox"
                  id={`w10-${idx}`}
                  checked={checked}
                  onChange={() => toggleWord(idx)}
                />
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            <strong style={{ fontFamily: 'var(--font-mono)' }}>
              SCORE: <span id="tenWordScoreNum">{score}</span> / 10 (Threshold: 8)
            </strong>
            <div id="tenWordOutcome" aria-live="polite" style={{ fontWeight: 700 }}>
              {renderTenWordOutcome()}
            </div>
          </div>
        </div>

        <div className="card-box" id="switchQuizBox" style={{ marginTop: 20 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            <div>
              <span className="mono-label">6-QUESTION DIAGNOSTIC</span>
              <h3 style={{ marginTop: 4 }}>Should you switch?</h3>
            </div>
            <div id="quizProgressDots" aria-label="Quiz progress">
              {siteContent.quizQuestions.map((q, i) => {
                const answered = i < quizAnswers.length
                return (
                  <span
                    key={q.id}
                    className="mono-label"
                    style={{
                      padding: '2px 6px',
                      marginLeft: i > 0 ? 4 : 0,
                      border: '1px solid var(--border)',
                      background: answered ? 'var(--inv-bg)' : 'transparent',
                      color: answered ? 'var(--inv-fg)' : 'inherit',
                    }}
                  >
                    {i + 1}
                  </span>
                )
              })}
            </div>
          </div>

          <div id="quizStage" aria-live="polite" style={{ marginTop: 14 }}>
            {quizStep >= totalQuestions ? (
              renderQuizVerdict()
            ) : (
              <>
                <p style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                  {quizStep + 1}. {currentQuestion.text}
                </p>
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <button
                    type="button"
                    className="btn-solid"
                    id="quizYesBtn"
                    onClick={() => handleQuizAnswer(true)}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn-outline"
                    id="quizNoBtn"
                    onClick={() => handleQuizAnswer(false)}
                  >
                    No
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="card-box" style={{ marginTop: 20 }}>
          <h3>Not sure? Run both for 14 days.</h3>
          <p className="muted-copy" style={{ marginTop: 6 }}>
            Keep your current method. Lay one brick a day on Free. If your 10-word
            test improves, switch. If it doesn’t, you’ve lost nothing.
          </p>
          <div
            style={{
              marginTop: 12,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              alignItems: 'center',
            }}
          >
            <a href="#pricing" className="btn-solid">
              Start free
            </a>
            <button
              type="button"
              className="btn-outline"
              id="remind30Btn"
              onClick={() => setRemindOpen(true)}
            >
              Remind me in 30 days
            </button>
          </div>

          {remindOpen && (
            <div id="remind30FormArea" style={{ marginTop: 12 }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                  alignItems: 'center',
                }}
              >
                <label htmlFor="remind30Email" className="sr-only">
                  Email for 30-day reminder
                </label>
                <input
                  type="email"
                  id="remind30Email"
                  placeholder="you@example.com"
                  value={remindEmail}
                  onChange={(e) => setRemindEmail(e.target.value)}
                  style={{
                    minHeight: 44,
                    padding: '0 12px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-paper)',
                    color: 'var(--ink)',
                  }}
                />
                <button
                  type="button"
                  className="btn-solid"
                  id="remind30Submit"
                  onClick={handleRemindSubmit}
                >
                  Set reminder
                </button>
              </div>
              {remindStatus && (
                <p
                  id="remind30Status"
                  aria-live="polite"
                  className="mono-label"
                  style={{ marginTop: 6 }}
                >
                  {remindStatus}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

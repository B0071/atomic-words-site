import { useEffect, useState } from 'react'
import { siteContent } from '../data/siteContent'

const IDEAS_STORAGE_KEY = 'aw_ideas_v1'
const VOTED_STORAGE_KEY = 'aw_ideas_voted_v1'

export default function TalkToUs() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('Feature Idea')
  const [message, setMessage] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const [formSuccess, setFormSuccess] = useState('')

  const [ideas, setIdeas] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(IDEAS_STORAGE_KEY))
      return Array.isArray(saved) && saved.length
        ? saved
        : siteContent.initialIdeas
    } catch {
      return siteContent.initialIdeas
    }
  })

  const [votedIds, setVotedIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(VOTED_STORAGE_KEY))
      return Array.isArray(saved) ? saved : []
    } catch {
      return []
    }
  })

  const [newIdeaTitle, setNewIdeaTitle] = useState('')
  const [ideaError, setIdeaError] = useState('')

  useEffect(() => {
    try {
      localStorage.setItem(IDEAS_STORAGE_KEY, JSON.stringify(ideas))
    } catch {
      // ignore storage quota errors
    }
  }, [ideas])

  useEffect(() => {
    try {
      localStorage.setItem(VOTED_STORAGE_KEY, JSON.stringify(votedIds))
    } catch {
      // ignore storage quota errors
    }
  }, [votedIds])

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    const errors = {}
    const trimmedEmail = email.trim()
    const trimmedMsg = message.trim()

    if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.'
    }
    if (trimmedMsg.length < 10) {
      errors.message = 'Please enter at least 10 characters.'
    }

    setFormErrors(errors)
    if (Object.keys(errors).length > 0) {
      setFormSuccess('')
      return
    }

    setFormSuccess(
      `Thanks${name.trim() ? `, ${name.trim()}` : ''}! Your ${category.toLowerCase()} note was logged locally.`
    )
    setMessage('')
  }

  const toggleVote = (id) => {
    const alreadyVoted = votedIds.includes(id)
    setIdeas((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, votes: Math.max(0, item.votes + (alreadyVoted ? -1 : 1)) }
          : item
      )
    )
    setVotedIds((prev) =>
      alreadyVoted ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  const handleAddIdea = (e) => {
    e.preventDefault()
    const trimmed = newIdeaTitle.trim()
    if (trimmed.length < 6) {
      setIdeaError('Describe your idea in at least 6 characters.')
      return
    }
    setIdeaError('')
    const newId = `idea-${Date.now()}`
    setIdeas((prev) => [
      { id: newId, title: trimmed, status: 'Under Review', votes: 1 },
      ...prev,
    ])
    setVotedIds((prev) => [...prev, newId])
    setNewIdeaTitle('')
  }

  return (
    <section id="talk-to-us" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT // TALK TO US &amp; ROADMAP</span>
          <span className="mono-label">BUILT IN PUBLIC</span>
        </div>
        <h2>Tell us what slows your spoken recall down.</h2>
        <p className="lead-copy">
          Send a note, request student or regional pricing, or upvote what we
          ship next.
        </p>

        <div className="grid-2" style={{ marginTop: 22 }}>
          <form className="card-box" onSubmit={handleFeedbackSubmit} noValidate>
            <h3>Direct Note to the Studio</h3>
            <div className="form-field" style={{ marginTop: 14 }}>
              <label htmlFor="talkName">Your Name (optional)</label>
              <input
                type="text"
                id="talkName"
                placeholder="Dilnoza"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-field">
              <label htmlFor="talkEmail">Email *</label>
              <input
                type="email"
                id="talkEmail"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {formErrors.email && (
                <span className="field-error" role="alert">
                  {formErrors.email}
                </span>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="talkCategory">Topic</label>
              <select
                id="talkCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Feature Idea">Feature Idea</option>
                <option value="Student / Regional Pricing">
                  Student / Regional Pricing
                </option>
                <option value="Concierge Import Help">
                  Concierge Import Help
                </option>
                <option value="General Feedback">General Feedback</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="talkMessage">Message *</label>
              <textarea
                id="talkMessage"
                rows="4"
                placeholder="What makes C1 words stick—or slip—for you?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              {formErrors.message && (
                <span className="field-error" role="alert">
                  {formErrors.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn-solid">
              Send Note →
            </button>

            {formSuccess && (
              <p
                className="mono-label"
                aria-live="polite"
                style={{ marginTop: 10, color: 'var(--ink-strong)' }}
              >
                ✓ {formSuccess}
              </p>
            )}
          </form>

          <div className="card-box">
            <h3>Public Idea &amp; Roadmap Board</h3>
            <p className="muted-copy" style={{ marginTop: 4 }}>
              Vote on upcoming features or add a one-line proposal.
            </p>

            <form
              onSubmit={handleAddIdea}
              style={{ display: 'flex', gap: 8, marginTop: 12 }}
              noValidate
            >
              <label htmlFor="newIdeaInput" className="sr-only">
                Propose a roadmap idea
              </label>
              <input
                type="text"
                id="newIdeaInput"
                placeholder="Propose a feature (e.g., IELTS Part 2 cue cards)..."
                value={newIdeaTitle}
                onChange={(e) => setNewIdeaTitle(e.target.value)}
                style={{
                  flex: 1,
                  minHeight: 44,
                  padding: '0 12px',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-paper)',
                  color: 'var(--ink)',
                }}
              />
              <button type="submit" className="btn-outline">
                Add
              </button>
            </form>
            {ideaError && (
              <p className="field-error" style={{ marginTop: 6 }} role="alert">
                {ideaError}
              </p>
            )}

            <div
              style={{
                marginTop: 14,
                display: 'grid',
                gap: 10,
              }}
              aria-label="Roadmap feature list"
            >
              {ideas.map((idea) => {
                const isVoted = votedIds.includes(idea.id)
                return (
                  <div
                    key={idea.id}
                    className="card-flat"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <div>
                      <span className="eyebrow-tag" style={{ marginBottom: 4 }}>
                        {idea.status}
                      </span>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        {idea.title}
                      </div>
                    </div>
                    <button
                      type="button"
                      className={`btn-pill ${isVoted ? 'active' : ''}`}
                      aria-pressed={isVoted}
                      onClick={() => toggleVote(idea.id)}
                    >
                      ▲ {idea.votes}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

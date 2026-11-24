import { useState } from 'react'
import { siteContent } from '../data/siteContent'

export default function Faq() {
  const [query, setQuery] = useState('')
  const [openIdx, setOpenIdx] = useState(0)

  const trimmed = query.trim().toLowerCase()
  const filteredFaqs = trimmed
    ? siteContent.faqs.filter(
        (item) =>
          item.q.toLowerCase().includes(trimmed) ||
          item.a.toLowerCase().includes(trimmed)
      )
    : siteContent.faqs

  return (
    <section id="faq" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT // FAQ</span>
          <span className="mono-label">DIRECT ANSWERS</span>
        </div>
        <h2>Questions people ask before laying their first brick.</h2>

        <div className="form-field" style={{ marginTop: 18, maxWidth: 480 }}>
          <label htmlFor="faqSearchInput" className="sr-only">
            Filter questions
          </label>
          <input
            type="search"
            id="faqSearchInput"
            placeholder="Filter questions (e.g., Anki, refund, 15 minutes)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpenIdx(0)
            }}
          />
        </div>

        <div style={{ marginTop: 18 }} id="faqAccordionList">
          {filteredFaqs.length === 0 ? (
            <div className="card-flat">
              No questions matched "{query}". Try another term or ask via{' '}
              <a href="#talk-to-us" style={{ textDecoration: 'underline' }}>
                Talk To Us
              </a>
              .
            </div>
          ) : (
            filteredFaqs.map((item, idx) => {
              const isOpen = openIdx === idx
              const panelId = `faq-panel-${idx}`
              const btnId = `faq-btn-${idx}`

              return (
                <div key={item.q} className="faq-item">
                  <button
                    type="button"
                    id={btnId}
                    className="faq-btn"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  >
                    <span>{item.q}</span>
                    <span className="mono-label" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className="faq-panel"
                    >
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}

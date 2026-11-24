import { useState } from 'react'
import { siteContent } from '../data/siteContent'

export default function Pricing() {
  const [yearly, setYearly] = useState(false)

  return (
    <section id="pricing" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT VII // PICK YOUR FOUNDATION</span>
          <span className="mono-label">
            AD-FREE BY DESIGN{' '}
            <span style={{ whiteSpace: 'nowrap' }} aria-hidden="true">
              •_•
            </span>
          </span>
        </div>
        <h2>Free to start. $5/mo when you’re serious.</h2>
        <p className="lead-copy">
          Many free apps make money from ads and engagement.{' '}
          <span className="key-u">Atomic Words is funded by subscribers</span>, so
          we have nothing to sell you except the method. Free is ad-free too.
        </p>

        <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            className={`btn-pill ${!yearly ? 'active' : ''}`}
            id="billingMonthlyBtn"
            aria-pressed={!yearly}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`btn-pill ${yearly ? 'active' : ''}`}
            id="billingYearlyBtn"
            aria-pressed={yearly}
            onClick={() => setYearly(true)}
          >
            Yearly (2 months free)
          </button>
        </div>

        <div className="grid-3" id="pricingCardsGrid" style={{ marginTop: 20 }}>
          {siteContent.pricingTiers.map((tier) => {
            const price = yearly ? tier.priceYearly : tier.priceMonthly
            return (
              <article
                key={tier.id}
                className={`pricing-card ${tier.inverted ? 'believer-card' : ''}`}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <h3>{tier.name}</h3>
                    <span className="eyebrow-tag">{tier.badge}</span>
                  </div>
                  <div className="price-num">{price}</div>
                  <p className="muted-copy" style={{ margin: 0 }}>
                    {tier.sub}
                  </p>
                  <ul
                    style={{
                      margin: '14px 0 0',
                      paddingLeft: 18,
                      display: 'grid',
                      gap: 6,
                      fontSize: '0.93rem',
                    }}
                  >
                    {tier.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
                <a href="#final-cta" className="btn-solid" style={{ width: '100%' }}>
                  {tier.cta}
                </a>
              </article>
            )
          })}
        </div>

        <div className="card-box" style={{ marginTop: 24 }}>
          <h3>Compare plans</h3>
          <div className="desktop-table-wrap table-scroll" style={{ marginTop: 12 }}>
            <table className="mono-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Free ($0)</th>
                  <th>Pro ($5/mo or $48/yr)</th>
                  <th>Believer ($10/mo or $96/yr)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Active bricks &amp; daily pace</td>
                  <td>Up to 50 bricks · 3 new/day</td>
                  <td>Unlimited bricks · up to 15 new/day</td>
                  <td>Unlimited bricks · custom pacing</td>
                </tr>
                <tr>
                  <td>Health X-Rays</td>
                  <td>2 X-rays (Memory Stages, Daily Goal) + 4 locked previews</td>
                  <td>All 6 X-rays + Workload Forecast</td>
                  <td>All 6 X-rays + early beta analytics</td>
                </tr>
                <tr>
                  <td>Import &amp; Export</td>
                  <td>Concierge import up to 50 words</td>
                  <td>Unlimited concierge + self-serve CSV/Anki export</td>
                  <td>Priority concierge import + export</td>
                </tr>
                <tr>
                  <td>Essays, Drills &amp; Word Families</td>
                  <td>1–2 mini-games · word-family preview</td>
                  <td>20 word-family unlocks/mo · 10 Essays · 50 Drills/mo</td>
                  <td>Unlimited word families, Essays &amp; Drills</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mobile-stack-cards" style={{ marginTop: 12 }}>
            <div className="card-flat">
              <strong>Free ($0):</strong> Up to 50 bricks (3/day), 2 X-rays (+4 locked
              previews), concierge import up to 50 words, 1–2 mini-games.
            </div>
            <div className="card-flat">
              <strong>Pro ($5/mo or $48/yr):</strong> Unlimited bricks (up to 15/day),
              all 6 X-rays, CSV/Anki import &amp; export, 20 word families/mo, 10
              Essays &amp; 50 Drills/mo.
            </div>
            <div className="card-flat">
              <strong>Believer ($10/mo or $96/yr):</strong> Everything in Pro + early
              beta access, unlimited word families/Essays/Drills, roadmap voting,
              private Discord channel, quarterly merch pack, price lock.
            </div>
          </div>

          <p className="mono-label" style={{ marginTop: 12 }}>
            Cancel anytime · 7-day Pro trial · 30-day refund
          </p>
          <p className="muted-copy" style={{ marginTop: 6 }}>
            <strong>Student / regional pricing:</strong> Verified students and
            learners in lower-income regions can request adjusted Pro rates through
            Talk To Us.
          </p>
        </div>
      </div>
    </section>
  )
}

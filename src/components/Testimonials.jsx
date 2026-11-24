import { useState } from 'react'
import { siteContent } from '../data/siteContent'

function TestimonialCard({ item }) {
  const initials = item.name
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <div className="t-card">
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span className="brick-avatar" aria-hidden="true">
              {initials}
            </span>
            <div>
              <strong style={{ display: 'block', fontSize: '0.92rem' }}>
                {item.name} {item.flag}
              </strong>
              <span className="mono-label">
                {item.country} · {item.time}
              </span>
            </div>
          </div>
          <span className="eyebrow-tag">{item.plan}</span>
        </div>
        <p style={{ margin: '10px 0 0', fontSize: '0.92rem' }}>"{item.quote}"</p>
      </div>
      <div className="mono-label">{item.level}</div>
    </div>
  )
}

export default function Testimonials() {
  const [playingId, setPlayingId] = useState('')

  const half = Math.ceil(siteContent.testimonials.length / 2)
  const set1 = siteContent.testimonials.slice(0, half)
  const set2 = siteContent.testimonials.slice(half)

  return (
    <section id="testimonials" className="section-block reveal">
      <div className="container">
        <div className="eyebrow-row">
          <span className="eyebrow-tag">■ ACT // PROOF</span>
          <span className="mono-label">SAMPLE LEARNER STORIES</span>
        </div>
        <h2>4.8 average · 12,400+ learners · 78% still active after 60 days</h2>

        <div className="grid-3" id="audioClipsGrid" style={{ marginTop: 20 }}>
          {siteContent.audioClips.map((clip) => {
            const isPlaying = playingId === clip.id
            return (
              <div key={clip.id} className="card-box">
                <span className="mono-label">{clip.meta}</span>
                <h3 style={{ marginTop: 4 }}>{clip.speaker}</h3>
                <p
                  className="muted-copy"
                  style={{ marginTop: 8, fontSize: '0.88rem' }}
                >
                  {clip.week1}
                </p>
                <p style={{ marginTop: 6, fontSize: '0.9rem', fontWeight: 600 }}>
                  {clip.week8}
                </p>
                <div
                  style={{
                    marginTop: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <button
                    type="button"
                    className="btn-outline clip-play-btn"
                    data-clip-id={clip.id}
                    onClick={() => setPlayingId(clip.id)}
                  >
                    {isPlaying ? '■ Playing (Mock)' : '▶ Play (Mock)'}
                  </button>
                  <span
                    className="mono-label clip-status"
                    id={`clipStatus-${clip.id}`}
                    aria-live="polite"
                  >
                    {isPlaying
                      ? 'Playing mock waveform (0:14)…'
                      : 'Week 1 → Week 8'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="marquee-wrapper" style={{ marginTop: 24 }}>
          <div className="marquee-track" id="marqueeRow1">
            {[...set1, ...set1].map((t, idx) => (
              <TestimonialCard key={`r1-${t.name}-${idx}`} item={t} />
            ))}
          </div>
        </div>

        <div className="marquee-wrapper" style={{ marginTop: 14 }}>
          <div className="marquee-track reverse" id="marqueeRow2">
            {[...set2, ...set2].map((t, idx) => (
              <TestimonialCard key={`r2-${t.name}-${idx}`} item={t} />
            ))}
          </div>
        </div>

        <div
          className="mobile-t-carousel"
          id="mobileTestimonialsCarousel"
          style={{ marginTop: 20 }}
        >
          {siteContent.testimonials.map((t, idx) => (
            <TestimonialCard key={`mob-${t.name}-${idx}`} item={t} />
          ))}
        </div>
        <div className="carousel-dots" id="mobileCarouselDots" aria-hidden="true" />
      </div>
    </section>
  )
}

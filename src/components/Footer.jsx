import { siteContent } from '../data/siteContent'

export default function Footer({ onOpenShop }) {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand-wordmark">
              Atomic <span className="brand-badge">{siteContent.brand.badge}</span>
            </div>
            <p className="muted-copy" style={{ marginTop: 8, maxWidth: 360 }}>
              Spaced active recall for English vocabulary—one brick and its real
              collocation at a time.
            </p>
          </div>

          <div>
            <div className="mono-label">METHOD &amp; PROOF</div>
            <div className="footer-links" style={{ marginTop: 8 }}>
              <a href="#how-it-works">How It Works</a>
              <a href="#health-xray">Health X-Ray</a>
              <a href="#personas">Personas</a>
              <a href="#testimonials">Testimonials</a>
            </div>
          </div>

          <div>
            <div className="mono-label">PLANS &amp; MORE</div>
            <div className="footer-links" style={{ marginTop: 8 }}>
              <a href="#pricing">Pricing</a>
              <a href="#comparison">Compare</a>
              <a href="#faq">FAQ</a>
              <button
                type="button"
                className="footer-link-btn"
                onClick={() => onOpenShop?.()}
              >
                Merch Shop
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom mono-label">
          <span>© {year} Atomic Words. Built brick by brick.</span>
          <span>Spaced Active Recall · Monochrome Studio</span>
        </div>
      </div>
    </footer>
  )
}

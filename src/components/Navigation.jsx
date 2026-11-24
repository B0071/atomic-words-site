import { siteContent } from '../data/siteContent'

export default function Navigation({ onOpenShop }) {
  return (
    <header className="site-header" role="banner">
      <div className="container nav-inner">
        <a href="#top" className="brand-wordmark">
          Atomic <span className="brand-badge">{siteContent.brand.badge}</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#how-it-works">How It Works</a>
          <a href="#product-demo">Try a Brick</a>
          <a href="#problem">Curve</a>
          <a href="#personas">Personas</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="btn-outline"
            onClick={() => onOpenShop?.()}
          >
            Merch Shop
          </button>
          <a href="#final-cta" className="btn-solid">
            Start Free
          </a>
        </div>
      </div>
    </header>
  )
}

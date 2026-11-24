import { useState } from 'react'
import { siteContent } from '../data/siteContent'

export default function Navbar({
  theme,
  onToggleTheme,
  preview,
  onChangePreview,
  onOpenShop,
}) {
  const [moreOpen, setMoreOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const closeMenus = () => {
    setMoreOpen(false)
    setDrawerOpen(false)
  }

  return (
    <header className="site-nav" role="banner">
      <div className="nav-inner">
        <a href="#top" className="brand-mark" aria-label="Atomic Words Home" onClick={closeMenus}>
          <svg width="28" height="20" viewBox="0 0 140 84" aria-hidden="true">
            <rect x="55" y="2" width="30" height="16" rx="2" fill="currentColor" />
            <rect x="37" y="23" width="31" height="16" rx="2" fill="currentColor" />
            <rect x="72" y="23" width="31" height="16" rx="2" fill="currentColor" />
            <rect x="20" y="44" width="31" height="16" rx="2" fill="currentColor" />
            <rect x="55" y="44" width="31" height="16" rx="2" fill="currentColor" />
            <rect x="90" y="44" width="31" height="16" rx="2" fill="currentColor" />
            <rect x="4" y="65" width="31" height="16" rx="2" fill="currentColor" />
            <rect x="38" y="65" width="31" height="16" rx="2" fill="currentColor" />
            <rect x="72" y="65" width="31" height="16" rx="2" fill="currentColor" />
            <rect x="106" y="65" width="31" height="16" rx="2" fill="currentColor" />
          </svg>
          <span className="brand-wordmark">
            Atomic <span className="brand-badge">{siteContent.brand.badge}</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#problem" className="nav-link">Problem</a>
          <a href="#how-it-works" className="nav-link">Method</a>
          <a href="#personas" className="nav-link">Is it for you?</a>
          <a href="#health-xray" className="nav-link">Health X-Ray</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#comparison" className="nav-link">Compare</a>
          <div className="nav-more-wrap">
            <button
              type="button"
              className="nav-link"
              id="moreNavBtn"
              aria-expanded={moreOpen}
              aria-controls="moreNavMenu"
              onClick={() => setMoreOpen((prev) => !prev)}
            >
              More ▾
            </button>
            <div className={`nav-more-menu ${moreOpen ? 'open' : ''}`} id="moreNavMenu" role="menu">
              <a href="#fit-check" className="nav-more-item" role="menuitem" onClick={closeMenus}>Honest Fit Check</a>
              <a href="#testimonials" className="nav-more-item" role="menuitem" onClick={closeMenus}>Testimonials</a>
              <a href="#switching" className="nav-more-item" role="menuitem" onClick={closeMenus}>Switching &amp; Import</a>
              <a href="#essays-drills" className="nav-more-item" role="menuitem" onClick={closeMenus}>Essays &amp; Drills</a>
              <a href="#merch-teaser" className="nav-more-item" role="menuitem" onClick={closeMenus}>Merch &amp; Shop</a>
              <button
                type="button"
                className="nav-more-item"
                id="navOpenShopBtn"
                role="menuitem"
                onClick={() => {
                  closeMenus()
                  onOpenShop?.()
                }}
              >
                Open Merch Shop
              </button>
              <a href="#talk-to-us" className="nav-more-item" role="menuitem" onClick={closeMenus}>Talk To Us &amp; Roadmap</a>
              <a href="#faq" className="nav-more-item" role="menuitem" onClick={closeMenus}>FAQ</a>
            </div>
          </div>
          <a href="#final-cta" className="btn-solid">Start</a>
        </nav>

        <div className="nav-controls">
          <button
            type="button"
            className="btn-pill"
            id="previewDesktopBtn"
            aria-pressed={preview === 'desktop'}
            title="Desktop preview"
            onClick={() => onChangePreview?.('desktop')}
          >
            Desktop
          </button>
          <button
            type="button"
            className="btn-pill"
            id="previewMobileBtn"
            aria-pressed={preview === 'mobile'}
            title="390px Mobile preview"
            onClick={() => onChangePreview?.('mobile')}
          >
            390px
          </button>
          <button
            type="button"
            className="btn-pill"
            id="themeToggleBtn"
            aria-pressed={theme === 'dark'}
            aria-label="Toggle dark or light mode"
            onClick={onToggleTheme}
          >
            {theme === 'dark' ? 'Light' : 'Dark'}
          </button>
          <button
            type="button"
            className="hamburger-btn"
            id="hamburgerBtn"
            aria-expanded={drawerOpen}
            aria-controls="mobileDrawer"
            aria-label="Open menu"
            onClick={() => setDrawerOpen((prev) => !prev)}
          >
            ☰
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`} id="mobileDrawer">
        <a href="#problem" onClick={closeMenus}>Problem</a>
        <a href="#how-it-works" onClick={closeMenus}>Method</a>
        <a href="#personas" onClick={closeMenus}>Is it for you?</a>
        <a href="#fit-check" onClick={closeMenus}>Honest Fit Check</a>
        <a href="#health-xray" onClick={closeMenus}>Health X-Ray</a>
        <a href="#pricing" onClick={closeMenus}>Pricing</a>
        <a href="#testimonials" onClick={closeMenus}>Testimonials</a>
        <a href="#comparison" onClick={closeMenus}>Compare</a>
        <a href="#switching" onClick={closeMenus}>Switching &amp; Import</a>
        <a href="#essays-drills" onClick={closeMenus}>Essays &amp; Drills</a>
        <a href="#merch-teaser" onClick={closeMenus}>Merch Teaser</a>
        <button
          type="button"
          className="drawer-link"
          id="mobileShopBtn"
          onClick={() => {
            closeMenus()
            onOpenShop?.()
          }}
        >
          Merch Shop (10 Items) →
        </button>
        <a href="#talk-to-us" onClick={closeMenus}>Talk To Us &amp; Idea Board</a>
        <a href="#faq" onClick={closeMenus}>FAQ</a>
        <a href="#final-cta" onClick={closeMenus}>Start Free →</a>
      </div>
    </header>
  )
}

import { useEffect, useState } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import HowItWorks from './components/HowItWorks'
import BrickDemo from './components/BrickDemo'
import ForgettingCurve from './components/ForgettingCurve'
import SpokenGap from './components/SpokenGap'
import CollocationLab from './components/CollocationLab'
import Personas from './components/Personas'
import FitCheck from './components/FitCheck'
import HealthXray from './components/HealthXray'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Comparison from './components/Comparison'
import SwitchingExtensions from './components/SwitchingExtensions'
import TalkToUs from './components/TalkToUs'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'
import MerchShopModal from './components/MerchShopModal'

export default function App() {
  const [shopOpen, setShopOpen] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sections = Array.from(document.querySelectorAll('.section-block.reveal'))

    if (reduced || typeof IntersectionObserver === 'undefined') {
      sections.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const updateScrollProgress = () => {
      const bar = document.getElementById('scrollProgressBar')
      if (!bar) return
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0
      bar.style.width = `${pct}%`
    }

    updateScrollProgress()
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    window.addEventListener('resize', updateScrollProgress)
    return () => {
      window.removeEventListener('scroll', updateScrollProgress)
      window.removeEventListener('resize', updateScrollProgress)
    }
  }, [])

  return (
    <div className="page-shell">
      <div className="scroll-progress-track" aria-hidden="true">
        <div id="scrollProgressBar" className="scroll-progress-bar" />
      </div>

      <Navigation onOpenShop={() => setShopOpen(true)} />

      <main id="main-content">
        <Hero />
        <HowItWorks />
        <BrickDemo />
        <ForgettingCurve />
        <SpokenGap />
        <CollocationLab />
        <Personas />
        <FitCheck />
        <HealthXray />
        <Pricing />
        <Testimonials />
        <Comparison />
        <SwitchingExtensions onOpenShop={() => setShopOpen(true)} />
        <TalkToUs />
        <Faq />
        <FinalCta />
      </main>

      <Footer onOpenShop={() => setShopOpen(true)} />

      <MerchShopModal isOpen={shopOpen} onClose={() => setShopOpen(false)} />
    </div>
  )
}

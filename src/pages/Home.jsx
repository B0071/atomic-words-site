import { siteContent } from '../data/siteContent'

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <p
        style={{
          margin: 0,
          textAlign: 'center',
          fontStyle: 'italic',
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.75rem, 4vw, 3rem)',
          lineHeight: 1.3,
          color: 'var(--color-text)',
        }}
      >
        {siteContent.brand.tagline}
      </p>
    </main>
  )
}

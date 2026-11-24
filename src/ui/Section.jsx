import Container from './Container'

export default function Section({ id, children, surface = false }) {
  return (
    <section
      id={id}
      style={{
        padding: 'var(--section-py) 0',
        backgroundColor: surface ? 'var(--color-surface)' : 'var(--color-bg)',
      }}
    >
      <Container>{children}</Container>
    </section>
  )
}

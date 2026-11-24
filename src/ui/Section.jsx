import Container from './Container'

export default function Section({
  id,
  children,
  inverted = false,
  reveal = true,
  className = '',
}) {
  const classes = [
    'section-block',
    inverted ? 'section-inverted' : '',
    reveal ? 'reveal' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id={id} className={classes}>
      <Container>{children}</Container>
    </section>
  )
}

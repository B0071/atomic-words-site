export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
}) {
  const isPrimary = variant === 'primary'
  const styles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.95rem',
    fontWeight: 600,
    textDecoration: 'none',
    cursor: 'pointer',
    border: isPrimary ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
    backgroundColor: isPrimary ? 'var(--color-accent)' : 'transparent',
    color: isPrimary ? 'var(--color-accent-contrast)' : 'var(--color-text)',
  }

  if (href) {
    return (
      <a href={href} style={styles}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} style={styles}>
      {children}
    </button>
  )
}

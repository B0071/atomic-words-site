export default function Badge({ children }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '0.35rem 0.85rem',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text-muted)',
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </span>
  )
}

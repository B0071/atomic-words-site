export default function Card({ children }) {
  return (
    <div
      style={{
        padding: '1.75rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {children}
    </div>
  )
}

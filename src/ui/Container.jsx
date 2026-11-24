export default function Container({ children, className = '' }) {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: 'var(--container-max)',
        margin: '0 auto',
        padding: '0 1.5rem',
      }}
    >
      {children}
    </div>
  )
}

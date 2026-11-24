export default function Badge({ children, className = '' }) {
  return (
    <span className={`eyebrow-tag ${className}`.trim()}>
      {children}
    </span>
  )
}

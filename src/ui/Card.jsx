export default function Card({
  children,
  variant = 'box',
  className = '',
  id,
}) {
  const baseClass = variant === 'flat' ? 'card-flat' : 'card-box'
  const classes = `${baseClass} ${className}`.trim()

  return (
    <div id={id} className={classes}>
      {children}
    </div>
  )
}

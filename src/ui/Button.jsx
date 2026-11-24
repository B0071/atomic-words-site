export default function Button({
  children,
  href,
  onClick,
  variant = 'solid',
  className = '',
  type = 'button',
  disabled = false,
  ariaPressed,
  ariaLabel,
  title,
}) {
  const variantClass =
    variant === 'outline'
      ? 'btn-outline'
      : variant === 'pill'
        ? 'btn-pill'
        : 'btn-solid'

  const classes = `${variantClass} ${className}`.trim()

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        title={title}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </button>
  )
}

import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  icon,
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${className}`}
      {...props}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      {children}
    </button>
  );
}

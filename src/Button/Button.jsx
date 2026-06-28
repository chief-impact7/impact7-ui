import './Button.css';

/**
 * 토큰·a11y 기반 공유 버튼.
 * @param {{variant?: 'primary'|'secondary'|'danger', children, [k:string]: any}} props
 */
export function Button({ variant = 'primary', children, className = '', ...props }) {
  return (
    <button className={`i7-btn i7-btn--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

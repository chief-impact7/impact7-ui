import './Button.css';

/**
 * 토큰·a11y 기반 공유 버튼.
 * type 기본값은 'button' — <form> 안에서 암묵적 submit(폼 리로드)을 막는다. props로 덮어쓸 수 있다.
 * @param {{variant?: 'primary'|'secondary'|'danger', type?: string, children, [k:string]: any}} props
 */
export function Button({ variant = 'primary', type = 'button', children, className = '', ...props }) {
  return (
    <button type={type} className={`i7-btn i7-btn--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

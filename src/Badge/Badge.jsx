import './Badge.css';

/**
 * 톤 컬러 상태 칩. tone은 `@impact7/shared/enrollment-status`의 STATUS_TONE 값과
 * 그대로 호환(active/scheduled/paused/consult/ended-hard/ended-soft) + 범용 3종(neutral/danger/warning).
 * @param {{tone?: 'active'|'scheduled'|'paused'|'consult'|'ended-hard'|'ended-soft'|'neutral'|'danger'|'warning', children, [k:string]: any}} props
 */
export function Badge({ tone = 'neutral', children, className = '', ...props }) {
  return (
    <span className={`i7-badge i7-badge--${tone} ${className}`.trim()} {...props}>
      {children}
    </span>
  );
}

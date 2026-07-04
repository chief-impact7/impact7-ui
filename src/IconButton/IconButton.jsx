import './IconButton.css';
import { Icon } from '../Icon/Icon.jsx';

/**
 * 아이콘 전용 액션 버튼 — label이 aria-label과 title(툴팁)로 노출된다.
 * 에코시스템 액션 규약: pencil=수정, trash=삭제(tone="danger"), xMark=닫기, link=링크 복사, download=다운로드.
 * 돈이 움직이는 액션(확정·발행·환불 등)은 아이콘 대신 텍스트 Button을 유지한다.
 * @param {{icon: string, label: string, tone?: 'danger', size?: number, className?: string, [k:string]: any}} props
 */
export function IconButton({ icon, label, tone, size = 16, className = '', ...props }) {
  const cls = `i7-icon-btn${tone === 'danger' ? ' i7-icon-btn--danger' : ''} ${className}`.trim();
  return (
    <button type="button" className={cls} aria-label={label} title={label} {...props}>
      <Icon name={icon} size={size} />
    </button>
  );
}

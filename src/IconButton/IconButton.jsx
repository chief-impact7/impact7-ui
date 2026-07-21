import './IconButton.css';
import { Icon } from '../Icon/Icon.jsx';

/**
 * 아이콘 전용 액션 버튼 — label이 aria-label과 CSS 툴팁(data-i7-tip)으로 노출된다.
 * 버튼 규약: 액션 버튼은 가급적 IconButton(아이콘+툴팁)을 쓰고, 텍스트 Button은
 * 돈이 움직이는 액션(확정·발행·환불 등)과 주요 폼 제출에만 유지한다.
 * 에코시스템 액션 규약: pencil=수정, trash=삭제(tone="danger"), xMark=닫기, link=링크 복사, download=다운로드.
 * @param {{icon?: string, svg?: string, label: string, tone?: 'danger', size?: number, className?: string, [k:string]: any}} props
 */
export function IconButton({ icon, svg, label, tone, size = 16, className = '', ...props }) {
  const cls = `i7-icon-btn${tone === 'danger' ? ' i7-icon-btn--danger' : ''} ${className}`.trim();
  return (
    <button type="button" className={cls} aria-label={label} data-i7-tip={label} {...props}>
      <Icon name={icon} svg={svg} size={size} />
    </button>
  );
}

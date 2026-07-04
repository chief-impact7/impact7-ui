// React 없는 아이콘 진입점 — 바닐라 JS(DSC·DB)·Svelte(HR) 앱이 innerHTML 렌더에 사용.
// React 앱은 이 파일 대신 Icon/IconButton 컴포넌트를 쓴다.
//
//   import { iconSvg, iconButtonHtml } from '@impact7/ui/icons';
//   el.innerHTML = `<button class="icon-btn" aria-label="삭제">${iconSvg('trash', { size: 16 })}</button>`;
//
// 액션 규약(에코시스템 공통): pencil=수정, trash=삭제, xMark=닫기, link=링크 복사, download=다운로드.
// 돈이 움직이는 액션(확정·발행·환불 등)은 아이콘 금지 — 텍스트 버튼 유지.
export { ICON_PATHS } from './Icon/icons.js';
import { ICON_PATHS } from './Icon/icons.js';

/** Heroicons outline SVG 문자열. 색은 currentColor, aria-hidden — 라벨은 감싸는 버튼에 붙일 것. */
export function iconSvg(name, { size = 16, strokeWidth = 1.5, className = '' } = {}) {
  const path = ICON_PATHS[name];
  if (!path) throw new Error(`unknown icon: ${name}`);
  const cls = className ? ` class="${className}"` : '';
  return `<svg${cls} viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`;
}

/**
 * 아이콘 전용 버튼 HTML 문자열 — React IconButton과 같은 클래스(i7-icon-btn)·규약.
 * 소비 앱은 `@impact7/ui/styles.css`를 로드하거나 자체 스타일로 i7-icon-btn을 정의해야 한다.
 * label은 aria-label·title(툴팁)로 들어간다. 핸들러는 attrs(onclick·data-*)로 전달.
 */
export function iconButtonHtml({ icon, label, tone, size = 16, className = '', attrs = '' }) {
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const cls = `i7-icon-btn${tone === 'danger' ? ' i7-icon-btn--danger' : ''}${className ? ` ${className}` : ''}`;
  return `<button type="button" class="${cls}" aria-label="${esc(label)}" title="${esc(label)}" ${attrs}>${iconSvg(icon, { size })}</button>`;
}

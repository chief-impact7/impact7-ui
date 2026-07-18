import { ICON_SVGS } from './phosphor-icons.js';
import { stripBackdrop } from './flat.js';

/**
 * Phosphor Duotone 아이콘. 색은 currentColor를 따른다.
 * flat=true면 옅은 배경층을 제거해 단색으로 렌더(원형 배지 안 등).
 * @param {{name: keyof typeof ICON_SVGS, size?: number, flat?: boolean, [k:string]: any}} props
 */
export function Icon({ name, size = 20, flat = false, ...props }) {
  const body = ICON_SVGS[name] || '';
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
      dangerouslySetInnerHTML={{ __html: flat ? stripBackdrop(body) : body }}
    />
  );
}

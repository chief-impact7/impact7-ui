import { ICON_SVGS } from './phosphor-icons.js';

/**
 * Phosphor Duotone 아이콘. 색은 currentColor를 따른다.
 * @param {{name: keyof typeof ICON_SVGS, size?: number, [k:string]: any}} props
 */
export function Icon({ name, size = 20, ...props }) {
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
      dangerouslySetInnerHTML={{ __html: ICON_SVGS[name] || '' }}
    />
  );
}

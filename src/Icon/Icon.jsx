import { ICON_PATHS } from './icons.js';

/**
 * Heroicons outline 24px 아이콘. 색은 currentColor를 따른다.
 * @param {{name: keyof typeof ICON_PATHS, size?: number, [k:string]: any}} props
 */
export function Icon({ name, size = 20, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

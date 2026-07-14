// TypeScript 소비 앱(payments admin 등)용 수동 타입 선언 — src와 함께 갱신할 것.
// IconName·ICON_PATHS의 SSoT는 ./icons.d.ts(React-free) — 여기선 재사용만 한다.
import type { ButtonHTMLAttributes, ReactNode, SVGProps } from 'react';
import type { JSX } from 'react';
import type { IconName } from './icons';

export type { IconName };
export { ICON_PATHS, ICON_SVGS } from './icons';

export declare function Icon(
  props: { name: IconName; size?: number } & SVGProps<SVGSVGElement>
): JSX.Element;

export declare function IconButton(
  props: {
    icon: IconName;
    label: string;
    tone?: 'danger';
    size?: number;
  } & ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element;

export declare function Button(
  props: {
    variant?: 'primary' | 'secondary' | 'danger';
    children?: ReactNode;
  } & ButtonHTMLAttributes<HTMLButtonElement>
): JSX.Element;

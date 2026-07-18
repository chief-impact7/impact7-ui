// TypeScript 소비 앱(payments admin 등)용 수동 타입 선언 — src와 함께 갱신할 것.
// IconName·ICON_PATHS의 SSoT는 ./icons.d.ts(React-free) — 여기선 재사용만 한다.
import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode, SVGProps } from 'react';
import type { JSX } from 'react';
import type { IconName } from './icons';

export type { IconName };
export { ICON_PATHS, ICON_SVGS } from './icons';

export declare function Icon(
  props: { name: IconName; size?: number; flat?: boolean } & SVGProps<SVGSVGElement>
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

export declare function Modal(
  props: {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: ReactNode;
    footer?: ReactNode;
  }
): JSX.Element;

export type BadgeTone =
  | 'active'
  | 'scheduled'
  | 'paused'
  | 'consult'
  | 'ended-hard'
  | 'ended-soft'
  | 'neutral'
  | 'danger'
  | 'warning';

export declare function Badge(
  props: {
    tone?: BadgeTone;
    children?: ReactNode;
  } & HTMLAttributes<HTMLSpanElement>
): JSX.Element;

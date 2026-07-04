// TypeScript 소비 앱(payments admin 등)용 수동 타입 선언 — src와 함께 갱신할 것.
import type { ButtonHTMLAttributes, ReactNode, SVGProps } from 'react';
import type { JSX } from 'react';

export type IconName =
  | 'banknotes'
  | 'users'
  | 'pencil'
  | 'trash'
  | 'xMark'
  | 'link'
  | 'download'
  | 'chartBar'
  | 'magnifier'
  | 'logout'
  | 'bell'
  | 'ledger'
  | 'upload'
  | 'megaphone'
  | 'cog'
  | 'tag'
  | 'inbox';

export declare const ICON_PATHS: Record<IconName, string>;

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

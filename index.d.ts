// TypeScript 소비 앱(payments admin 등)용 수동 타입 선언 — src와 함께 갱신할 것.
import type { ButtonHTMLAttributes, ReactNode, SVGProps } from 'react';
import type { JSX } from 'react';

export type IconName =
  | 'academicCap'
  | 'adjustmentsHorizontal'
  | 'archiveBox'
  | 'arrowDownOnSquare'
  | 'arrowLeft'
  | 'arrowLongRight'
  | 'arrowPath'
  | 'arrowPathRoundedSquare'
  | 'arrowRight'
  | 'arrowRightEndOnRectangle'
  | 'arrowTrendingUp'
  | 'arrowUturnLeft'
  | 'arrowsRightLeft'
  | 'banknotes'
  | 'bars3'
  | 'beaker'
  | 'bell'
  | 'bolt'
  | 'bookOpen'
  | 'bookmark'
  | 'bookmarkSlash'
  | 'buildingOffice'
  | 'buildingOffice2'
  | 'calendar'
  | 'calendarDateRange'
  | 'calendarDays'
  | 'chartBar'
  | 'chatBubbleLeftEllipsis'
  | 'chatBubbleLeftRight'
  | 'check'
  | 'checkBadge'
  | 'checkCircle'
  | 'chevronDown'
  | 'chevronLeft'
  | 'chevronRight'
  | 'chevronUp'
  | 'circle'
  | 'circleStack'
  | 'clipboardDocument'
  | 'clipboardDocumentCheck'
  | 'clipboardDocumentList'
  | 'clock'
  | 'cloudArrowUp'
  | 'cog'
  | 'cpuChip'
  | 'devicePhoneMobile'
  | 'documentArrowUp'
  | 'documentCheck'
  | 'documentDuplicate'
  | 'documentText'
  | 'download'
  | 'ellipsisHorizontalCircle'
  | 'envelope'
  | 'exclamationCircle'
  | 'exclamationTriangle'
  | 'folderOpen'
  | 'funnel'
  | 'globeAlt'
  | 'homeModern'
  | 'identification'
  | 'inbox'
  | 'informationCircle'
  | 'ledger'
  | 'link'
  | 'listBullet'
  | 'logout'
  | 'magnifier'
  | 'magnifyingGlassCircle'
  | 'megaphone'
  | 'moon'
  | 'noSymbol'
  | 'numberedList'
  | 'paperAirplane'
  | 'pauseCircle'
  | 'pencil'
  | 'pencilSquare'
  | 'phone'
  | 'phoneArrowDownLeft'
  | 'photo'
  | 'playCircle'
  | 'plus'
  | 'plusCircle'
  | 'presentationChartLine'
  | 'printer'
  | 'questionMarkCircle'
  | 'queueList'
  | 'shieldCheck'
  | 'sparkles'
  | 'squares2x2'
  | 'squaresPlus'
  | 'sun'
  | 'tableCells'
  | 'tag'
  | 'trash'
  | 'upload'
  | 'user'
  | 'userGroup'
  | 'userMinus'
  | 'userPlus'
  | 'users'
  | 'xCircle'
  | 'xMark';

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

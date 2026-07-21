// 이 CSS import는 라이브러리 빌드 시 styles.css로 추출된다(번들 JS엔 안 들어감).
// 소비 앱은 `import '@impact7/ui/styles.css'`를 전역에 1회 별도 로드해야 스타일이 적용된다.
import './tokens.css';
import './a11y.css';
import './tooltip.css';

export { Button } from './Button/Button.jsx';
export { Icon } from './Icon/Icon.jsx';
export { ICON_PATHS } from './Icon/icons.js';
// ICON_SVGS(전체 Phosphor 맵, ~900KB)는 여기서 정적 재수출하지 않는다 — 메인 엔트리에 딸려 들어가
// Icon의 동적 import 지연 로드를 무력화하기 때문. 필요하면 '@impact7/ui/icons'에서 가져올 것.
export { IconButton } from './IconButton/IconButton.jsx';
export { Modal } from './Modal/Modal.jsx';
export { Badge } from './Badge/Badge.jsx';

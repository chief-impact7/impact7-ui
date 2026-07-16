# @impact7/ui

impact7 에코시스템 공유 **React 컴포넌트 라이브러리**. 색·테두리 등 모든 토큰은
`design-tokens.json` SSoT(impact7DB/.agents)에서 빌드 타임에 자동 생성되어 4앱 디자인과
일치하고, 접근성(focus-visible·reduced-motion)이 내장돼 있다.

두 목적을 동시에 만족한다:
- **한 번 만들어 여러 앱 재사용** — React 앱은 직접 import, 바닐라·Svelte 앱은 `mount` 어댑터.
- **단일 스택 수렴** — 신규 화면·앱은 이 라이브러리로 만들어 React 비중을 점진 확대.

## 사용법

### React 앱 (exam/Next 등)
```jsx
import { Button } from '@impact7/ui';
import '@impact7/ui/styles.css'; // 토큰 + a11y + 컴포넌트 스타일 (1회)

<Button variant="primary" onClick={save}>저장</Button>
```

### 바닐라 JS · Svelte 앱 (DSC·DB·HR) — 부분 마운트(islands)
전면 전환 없이 특정 영역만 React 컴포넌트로. 전역에 한 번 `@impact7/ui/styles.css`를 로드.
```js
import { mount } from '@impact7/ui/mount';
import { Button } from '@impact7/ui';

const handle = mount(el, Button, { variant: 'primary', children: '저장', onClick });
handle.update({ children: '저장됨', disabled: true }); // 바닐라 상태 변화 시
handle.unmount();                                       // 영역 제거 시 정리(누수 방지)
```
⚠️ 한 앱 *내부*에서 바닐라/React를 무분별하게 섞으면 분열 비용이 최악이 된다 — ROI 높은
영역에만 선택적으로 도입하고, 마운트한 영역은 반드시 `unmount`로 정리한다.

## 컴포넌트
- `Button` — `variant: 'primary' | 'secondary' | 'danger'`
- `Icon` — `name: IconName, size?` (Phosphor Duotone)
- `IconButton` — `icon, label, tone?: 'danger', size?` — label이 aria-label + CSS 툴팁으로 노출
- `Modal` — `open, onClose, title?, children, footer?` — 네이티브 `<dialog>` 기반. `open`이 showModal()/close()를 구동하고 ESC·배경 클릭 모두 `onClose`로 수렴. `title` 생략 시 헤더(제목+닫기 버튼)를 그리지 않는다 — 소비 화면이 자체 헤더를 그릴 때 사용. 데스크톱 센터(max-width 640px) / 모바일(<768px) 풀스크린 전환 내장
- `Badge` — `tone?: 'active'|'scheduled'|'paused'|'consult'|'ended-hard'|'ended-soft'|'neutral'|'danger'|'warning'` — `@impact7/shared/enrollment-status`의 `STATUS_TONE` 값과 그대로 호환되는 톤 컬러 칩

(로드맵: Card · Input — 점진 추가)

## 버튼 규약
- 액션 버튼은 **가급적 `IconButton`(아이콘 + 툴팁)** 을 쓴다. 글씨 버튼보다 아이콘 우선.
- 텍스트 `Button`은 돈이 움직이는 액션(확정·발행·환불 등)과 주요 폼 제출(저장·전송)에만 유지한다.
- 툴팁은 `data-i7-tip` 속성으로 어떤 요소에든 붙일 수 있다 (hover/focus-visible 시 표시).
  터치 기기에선 툴팁이 안 뜨므로 아이콘 자체가 의미를 전달해야 한다 — 액션 규약의 표준 아이콘을 따를 것.

## 아이콘

- 사용자 화면의 제목·버튼·탭·상태·안내문에는 이모지나 유니코드 그림문자를 아이콘으로 사용하지 않는다.
- `Icon` 또는 `@impact7/ui/icons`의 Phosphor Duotone만 사용한다. 필요한 아이콘은 앱별로 혼용하지 않고 이 패키지의 공용 이름에 추가한다.

## 토큰
`--i7-*` (primary/surface/text-main/text-sec/success/danger/warning/border)는
`scripts/build-tokens.mjs`가 SSoT에서 생성한다. **토큰 값은 SSoT(design-tokens.json)에서만
바꾼다** — `npm run build`가 자동 반영.

## 개발
```bash
npm install
npm run build      # 토큰 생성 + lib 빌드 → dist/
```
react/react-dom은 peer/external — 소비 앱의 것을 쓴다(hook 충돌·중복 번들 방지).

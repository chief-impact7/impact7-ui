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

(로드맵: Badge · Card · Modal · Input — 점진 추가)

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

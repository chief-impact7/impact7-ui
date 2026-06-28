// 멀티프레임워크 어댑터 — 바닐라 JS·Svelte 앱에서 React 컴포넌트를 특정 엘리먼트에 마운트.
// React 앱은 이게 필요 없다(컴포넌트를 직접 import). islands 패턴으로 점진 도입하는 통로.
//
//   import { mount } from '@impact7/ui/mount';
//   import { Button } from '@impact7/ui';
//   const handle = mount(el, Button, { variant: 'primary', children: '저장', onClick });
//   handle.update({ ...nextProps });  // 바닐라 상태 변화 시 props 갱신
//   handle.unmount();                 // 영역 제거 시 정리(메모리 누수 방지)
import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
// 이 CSS import는 라이브러리 빌드 시 styles.css로 추출된다(번들 JS엔 안 들어감).
// 따라서 소비 앱은 전역에 `@impact7/ui/styles.css`를 1회 별도 로드해야 스타일이 적용된다.
import './tokens.css';
import './a11y.css';

// 같은 el에 createRoot를 두 번 만들면 React 경고 + root 누수가 나므로 el→root를 캐시해 멱등화.
const roots = new WeakMap();

export function mount(el, Component, props = {}) {
  let root = roots.get(el);
  if (!root) {
    root = createRoot(el);
    roots.set(el, root);
  }
  root.render(createElement(Component, props));
  return {
    update: (nextProps) => {
      if (roots.has(el)) root.render(createElement(Component, nextProps)); // unmount 후 호출 무시
    },
    unmount: () => {
      if (!roots.has(el)) return;
      roots.delete(el);
      root.unmount();
    },
  };
}

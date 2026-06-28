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
import './tokens.css';
import './a11y.css';

export function mount(el, Component, props = {}) {
  const root = createRoot(el);
  root.render(createElement(Component, props));
  return {
    update: (nextProps) => root.render(createElement(Component, nextProps)),
    unmount: () => root.unmount(),
  };
}

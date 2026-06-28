// 같은 Button 컴포넌트를 두 방식으로 렌더해 멀티프레임워크 동작을 증명한다.
import { createRoot } from 'react-dom/client';
import { Button } from '../src/index.js';
import { mount } from '../src/mount.js';

// ① React 앱: 컴포넌트를 직접 렌더
createRoot(document.getElementById('react-root')).render(
  <div style={{ display: 'flex', gap: 8 }}>
    <Button variant="primary" onClick={() => alert('primary')}>저장</Button>
    <Button variant="secondary">취소</Button>
    <Button variant="danger">삭제</Button>
    <Button variant="primary" disabled>비활성</Button>
  </div>
);

// ② 바닐라/Svelte 앱: mount 어댑터로 React 컴포넌트를 DOM 노드에 부분 마운트
const handle = mount(document.getElementById('vanilla-mount'), Button, {
  variant: 'primary',
  children: 'mount로 렌더됨',
});
// 바닐라 상태 변화 시 props 갱신이 되는지도 시연
setTimeout(() => handle.update({ variant: 'danger', children: 'update()로 변경됨' }), 1500);

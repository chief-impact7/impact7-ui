import assert from 'node:assert/strict';
import test from 'node:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Icon } from '../dist/impact7-ui.js';

test('svg prop은 맵 조회 없이 동기 렌더되고 name보다 우선한다', () => {
  const html = renderToStaticMarkup(
    createElement(Icon, { svg: '<circle cx="1" cy="1" r="1"></circle>', name: 'academicCap' })
  );
  assert.match(html, /<circle/);
  assert.doesNotMatch(html, /<path/); // academicCap의 body가 섞여 들어오지 않음 — svg가 name을 무시했다는 증거
});

test('svg prop에도 flat(배경층 제거)이 적용된다', () => {
  // stripBackdrop은 self-closing <path .../>만 매칭한다(phosphor 원본 포맷) — 테스트도 동일 포맷 사용.
  const svg = '<path opacity="0.2" d="M0 0"/><path d="M1 1"/>';
  const html = renderToStaticMarkup(createElement(Icon, { svg, flat: true }));
  assert.doesNotMatch(html, /opacity/);
  assert.match(html, /<path/);
});

import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { PHOSPHOR_ICON_NAMES } from '../src/Icon/phosphor-icon-names.js';
import { ICON_PATHS, ICON_SVGS, iconSvg } from '../src/icons-entry.js';
import { stripBackdrop } from '../src/Icon/flat.js';

test('Phosphor Duotone 전체 + Heroicons alias가 렌더링된다', () => {
  // Phosphor duotone 전체(1500+)를 원본 슬러그로 노출한다.
  assert.ok(Object.keys(ICON_SVGS).length >= 1512);

  // 원본 슬러그로 바로 렌더된다.
  const native = iconSvg('graduation-cap');
  assert.match(native, /viewBox="0 0 256 256"/);
  assert.match(native, /opacity="0.2"/);
  assert.doesNotMatch(native, /stroke=/);

  // 기존 Heroicons alias는 매핑된 슬러그와 동일 body로 하위호환된다.
  assert.equal(ICON_SVGS.academicCap, ICON_SVGS['graduation-cap']);
  for (const [alias, slug] of Object.entries(PHOSPHOR_ICON_NAMES)) {
    assert.equal(ICON_SVGS[alias], ICON_SVGS[slug], `alias ${alias} → ${slug}`);
  }

  // 레거시 ICON_PATHS 키(Heroicons 이름)도 전부 SVG로 해석된다.
  for (const key of Object.keys(ICON_PATHS)) {
    assert.ok(ICON_SVGS[key], `legacy icon ${key} missing`);
  }

  // 어떤 아이콘도 스크립트/이벤트 핸들러를 품지 않는다.
  for (const body of Object.values(ICON_SVGS)) {
    assert.doesNotMatch(body, /<script|\son\w+=/i);
  }

  // 실제로 duotone 에셋에서 구웠는지 — 잘못된 세트(regular/thin)면 마커가 전량 사라진다.
  // Phosphor duotone 소수(현재 2개)는 단색이라 완전 100%는 요구하지 않는다.
  const bodies = Object.values(ICON_SVGS);
  const duotone = bodies.filter((b) => /opacity="0.2"/.test(b)).length;
  assert.ok(duotone / bodies.length > 0.99, `duotone 마커 비율 ${duotone}/${bodies.length}`);
});

test('flat 옵션은 배경층(opacity=0.2)만 제거하고 전경 path는 남긴다', () => {
  const full = ICON_SVGS['graduation-cap'];
  assert.match(full, /opacity="0.2"/);
  const flat = stripBackdrop(full);
  assert.doesNotMatch(flat, /opacity="0.2"/); // 배경층 제거
  assert.match(flat, /<path\b/); // 전경 path는 유지
  assert.match(iconSvg('graduation-cap', { flat: true }), /viewBox="0 0 256 256"/);
  assert.doesNotMatch(iconSvg('graduation-cap', { flat: true }), /opacity="0.2"/);
});

test('공유 React 번들은 production JSX runtime만 사용한다', async () => {
  const bundle = await readFile(new URL('../dist/impact7-ui.js', import.meta.url), 'utf8');
  assert.doesNotMatch(bundle, /jsxDEV|jsx-dev-runtime/);
});

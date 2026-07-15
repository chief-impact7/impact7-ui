import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { PHOSPHOR_ICON_NAMES } from '../src/Icon/phosphor-icon-names.js';
import { ICON_PATHS, ICON_SVGS, iconSvg } from '../src/icons-entry.js';

test('공용 아이콘은 Phosphor Duotone으로 렌더링된다', () => {
  assert.equal(Object.keys(ICON_SVGS).length, 129);
  const svg = iconSvg('academicCap');
  assert.match(svg, /viewBox="0 0 256 256"/);
  assert.match(svg, /opacity="0.2"/);
  assert.doesNotMatch(svg, /stroke=/);
  assert.equal(PHOSPHOR_ICON_NAMES.documentCheck, 'seal-check');
  assert.equal(PHOSPHOR_ICON_NAMES.bookmarkSlash, 'prohibit');
  assert.equal(PHOSPHOR_ICON_NAMES.receiptPercent, 'percent');
  assert.deepEqual(Object.keys(ICON_SVGS), Object.keys(PHOSPHOR_ICON_NAMES));
  assert.deepEqual(Object.keys(ICON_SVGS).sort(), Object.keys(ICON_PATHS).sort());
  for (const body of Object.values(ICON_SVGS)) {
    assert.match(body, /opacity="0.2"/);
    assert.doesNotMatch(body, /<script|\son\w+=/i);
  }
});

test('공유 React 번들은 production JSX runtime만 사용한다', async () => {
  const bundle = await readFile(new URL('../dist/impact7-ui.js', import.meta.url), 'utf8');
  assert.doesNotMatch(bundle, /jsxDEV|jsx-dev-runtime/);
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { PHOSPHOR_ICON_NAMES } from '../src/Icon/phosphor-icon-names.js';
import { ICON_PATHS, ICON_SVGS, iconSvg } from '../src/icons-entry.js';

test('공용 아이콘은 Phosphor Duotone으로 렌더링된다', () => {
  assert.equal(Object.keys(ICON_SVGS).length, 109);
  const svg = iconSvg('academicCap');
  assert.match(svg, /viewBox="0 0 256 256"/);
  assert.match(svg, /opacity="0.2"/);
  assert.doesNotMatch(svg, /stroke=/);
  assert.equal(PHOSPHOR_ICON_NAMES.documentCheck, 'seal-check');
  assert.equal(PHOSPHOR_ICON_NAMES.bookmarkSlash, 'prohibit');
  assert.equal(PHOSPHOR_ICON_NAMES.receiptPercent, 'percent');
  assert.deepEqual(Object.keys(ICON_SVGS), Object.keys(PHOSPHOR_ICON_NAMES));
  assert.deepEqual(Object.keys(ICON_SVGS), Object.keys(ICON_PATHS).sort());
  for (const body of Object.values(ICON_SVGS)) {
    assert.match(body, /opacity="0.2"/);
    assert.doesNotMatch(body, /<script|\son\w+=/i);
  }
});

// design-tokens.json SSoT → src/tokens.css (--i7-* CSS 변수) 자동 생성.
// 라이브러리를 토큰 SSoT의 소비자로 만들어, 토큰을 한 곳에서만 바꾸면 라이브러리도 따라간다.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
// SSoT는 impact7DB/.agents에 있다(허브, 로컬 절대경로). 부재 시 마지막 생성본 유지.
const SSOT = '/Users/jongsooyi/IMPACT7/impact7DB/.agents/design-tokens.json';

let tokens;
try {
  tokens = JSON.parse(readFileSync(SSOT, 'utf8')).tokens;
} catch {
  console.warn(`⚠️ design-tokens SSoT를 못 읽음(${SSOT}) — 기존 tokens.css 유지`);
  process.exit(0);
}

const vars = Object.entries(tokens).map(([name, t]) => `  --i7-${name}: ${t.value};`);
const css = `/* 자동 생성 — design-tokens.json SSoT에서. 직접 수정 금지 (npm run build:tokens). */\n:root {\n${vars.join('\n')}\n}\n`;
writeFileSync(join(here, '..', 'src', 'tokens.css'), css);
console.log(`✅ tokens.css 생성 — ${Object.keys(tokens).length}개 토큰 (--i7-*)`);

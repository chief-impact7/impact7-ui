import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PHOSPHOR_ICON_NAMES } from '../src/Icon/phosphor-icon-names.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir = join(root, 'node_modules', '@phosphor-icons', 'core', 'assets', 'duotone');

function body(svg, sourceName) {
  const b = svg.match(/^<svg[^>]*>([\s\S]*)<\/svg>$/)?.[1];
  if (!b) throw new Error(`invalid Phosphor SVG: ${sourceName}`);
  return b;
}

// 1) Phosphor duotone 전체를 원본 슬러그(kebab)로 굽는다.
const bySlug = {};
const files = (await readdir(assetsDir)).filter((f) => f.endsWith('-duotone.svg'));
for (const file of files) {
  const slug = file.replace(/-duotone\.svg$/, '');
  bySlug[slug] = body(await readFile(join(assetsDir, file), 'utf8'), slug);
}

// 2) Heroicons 호환 alias(academicCap 등)를 같은 body로 매핑 — 기존 소비 앱 하위호환.
const icons = { ...bySlug };
for (const [alias, slug] of Object.entries(PHOSPHOR_ICON_NAMES)) {
  const b = bySlug[slug];
  if (!b) throw new Error(`alias "${alias}" → 존재하지 않는 Phosphor 아이콘 "${slug}"`);
  icons[alias] = b;
}

const names = Object.keys(icons).sort();
const ordered = Object.fromEntries(names.map((n) => [n, icons[n]]));

const js = `// npm run build:icons로 생성. 직접 편집하지 않는다.\nexport const ICON_SVGS = ${JSON.stringify(ordered, null, 2)};\n`;
await writeFile(join(root, 'src', 'Icon', 'phosphor-icons.js'), js);

const union = names.map((name) => `  | '${name}'`).join('\n');
const dts = `// npm run build:icons로 생성. 직접 편집하지 않는다.\nexport type IconName =\n${union};\n\nexport declare const ICON_SVGS: Record<IconName, string>;\n/** @deprecated 새 코드는 ICON_SVGS 또는 iconSvg를 사용한다. */\nexport declare const ICON_PATHS: Record<string, string>;\n\nexport declare function iconSvg(\n  name: IconName,\n  options?: { size?: number; strokeWidth?: number; className?: string; flat?: boolean }\n): string;\n\nexport declare function iconButtonHtml(options: {\n  icon: IconName;\n  label: string;\n  tone?: 'danger';\n  size?: number;\n  className?: string;\n  attrs?: string;\n  flat?: boolean;\n}): string;\n`;
await writeFile(join(root, 'icons.d.ts'), dts);

// 3) tree-shakeable 개별 export — 정적 이름 소비자가 import { arrowLeft } from '@impact7/ui/icons/named'로
//    쓰면 사용한 것만 번들된다. kebab 슬러그·camel alias를 camelCase 식별자로 수렴(같은 body는 dedupe).
// JS 예약어(export·function·package 등)나 숫자 시작이면 `_` 프리픽스 — 유효한 식별자 보장.
const RESERVED = new Set(
  'break case catch class const continue debugger default delete do else enum export extends false finally for function if import in instanceof new null return super switch this throw true try typeof var void while with let static yield await implements interface package private protected public'.split(
    ' ',
  ),
);
const toIdent = (s) => {
  const id = s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
  return /^[0-9]/.test(id) || RESERVED.has(id) ? `_${id}` : id;
};
const seen = new Map(); // ident -> key(첫 등장)
for (const name of names) {
  const id = toIdent(name);
  const prev = seen.get(id);
  if (prev === undefined) seen.set(id, name);
  else if (ordered[prev] !== ordered[name]) {
    throw new Error(`named export 식별자 충돌 "${id}": ${prev} vs ${name} (body 상이)`);
  }
}
const idents = [...seen.keys()].sort();
const namedJs =
  '// npm run build:icons로 생성. 직접 편집하지 않는다.\n' +
  '// tree-shakeable 개별 export — import { arrowLeft } from "@impact7/ui/icons/named"\n' +
  idents.map((id) => `export const ${id} = ${JSON.stringify(ordered[seen.get(id)])};`).join('\n') +
  '\n';
await writeFile(join(root, 'src', 'Icon', 'icons-named.js'), namedJs);

const namedDts =
  '// npm run build:icons로 생성. 직접 편집하지 않는다.\n' +
  idents.map((id) => `export declare const ${id}: string;`).join('\n') +
  '\n';
await writeFile(join(root, 'icons-named.d.ts'), namedDts);

console.log(
  `icons: ${files.length} slugs + ${Object.keys(PHOSPHOR_ICON_NAMES).length} aliases → ${names.length} keys, ${idents.length} named exports`,
);

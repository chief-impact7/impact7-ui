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
const dts = `// npm run build:icons로 생성. 직접 편집하지 않는다.\nexport type IconName =\n${union};\n\nexport declare const ICON_SVGS: Record<IconName, string>;\n/** @deprecated 새 코드는 ICON_SVGS 또는 iconSvg를 사용한다. */\nexport declare const ICON_PATHS: Record<string, string>;\n\nexport declare function iconSvg(\n  name: IconName,\n  options?: { size?: number; strokeWidth?: number; className?: string }\n): string;\n\nexport declare function iconButtonHtml(options: {\n  icon: IconName;\n  label: string;\n  tone?: 'danger';\n  size?: number;\n  className?: string;\n  attrs?: string;\n}): string;\n`;
await writeFile(join(root, 'icons.d.ts'), dts);

console.log(`icons: ${files.length} slugs + ${Object.keys(PHOSPHOR_ICON_NAMES).length} aliases → ${names.length} keys`);

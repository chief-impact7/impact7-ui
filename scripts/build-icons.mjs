import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PHOSPHOR_ICON_NAMES } from '../src/Icon/phosphor-icon-names.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const entries = [];

for (const [name, sourceName] of Object.entries(PHOSPHOR_ICON_NAMES)) {
  const file = join(root, 'node_modules', '@phosphor-icons', 'core', 'assets', 'duotone', `${sourceName}-duotone.svg`);
  const svg = await readFile(file, 'utf8');
  const body = svg.match(/^<svg[^>]*>([\s\S]*)<\/svg>$/)?.[1];
  if (!body) throw new Error(`invalid Phosphor SVG: ${sourceName}`);
  entries.push([name, body]);
}

const js = `// npm run build:icons로 생성. 직접 편집하지 않는다.\nexport const ICON_SVGS = ${JSON.stringify(Object.fromEntries(entries), null, 2)};\n`;
await writeFile(join(root, 'src', 'Icon', 'phosphor-icons.js'), js);

const names = entries.map(([name]) => `  | '${name}'`).join('\n');
const dts = `// npm run build:icons로 생성. 직접 편집하지 않는다.\nexport type IconName =\n${names};\n\nexport declare const ICON_SVGS: Record<IconName, string>;\n/** @deprecated 새 코드는 ICON_SVGS 또는 iconSvg를 사용한다. */\nexport declare const ICON_PATHS: Record<IconName, string>;\n\nexport declare function iconSvg(\n  name: IconName,\n  options?: { size?: number; strokeWidth?: number; className?: string }\n): string;\n\nexport declare function iconButtonHtml(options: {\n  icon: IconName;\n  label: string;\n  tone?: 'danger';\n  size?: number;\n  className?: string;\n  attrs?: string;\n}): string;\n`;
await writeFile(join(root, 'icons.d.ts'), dts);

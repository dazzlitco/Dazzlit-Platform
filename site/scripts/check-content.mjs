#!/usr/bin/env node
/**
 * Content check for Dazzlit.
 *
 * The owner does not want placeholder markers in the code (decision D-17),
 * so this check does not look for data-placeholder markers. Instead it
 * fails the build if invented proof or unfinished copy is left in the
 * content, pages, components or layouts:
 *   - bracketed template text from the mockup: [Client name], [00], [Name] …
 *   - lorem ipsum, TODO / FIXME, or a fake phone number (000-0000)
 *   - a capitalised "Placeholder" label
 *
 * It also fails if a content file under src/content/ contains body text
 * other than H2 headings. Body copy is written in Phase 2, one cluster at
 * a time — that started with the Wave 1 hubs, so this body-text rule was
 * removed then. The forbidden-pattern checks above still apply to body
 * copy: no bracketed template text, lorem ipsum, TODO/FIXME, fake phone
 * numbers, "Placeholder" labels or data-placeholder markers.
 *
 * Exits 1 and lists every hit.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const PATTERNS = [
  { name: 'bracketed template text', re: /\[(Client name|Name|Role|Company|Industry|Market|00|0\.0)\]/ },
  { name: 'lorem ipsum', re: /lorem ipsum/i },
  { name: 'TODO / FIXME', re: /\b(TODO|FIXME|XXX)\b/ },
  { name: 'fake phone number', re: /000-0000|\(000\)/ },
  { name: '"Placeholder" label', re: /Placeholder/ },
  { name: 'data-placeholder marker', re: /data-placeholder/ },
];

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

const errors = [];
const scanned = [
  ...walk(join(root, 'src', 'content')),
  ...walk(join(root, 'src', 'pages')),
  ...walk(join(root, 'src', 'components')),
  ...walk(join(root, 'src', 'layouts')),
  ...walk(join(root, 'src', 'data')),
];

for (const file of scanned) {
  const text = readFileSync(file, 'utf-8');
  const rel = file.slice(root.length + 1);
  for (const pattern of PATTERNS) {
    if (pattern.re.test(text)) errors.push(`${rel}: ${pattern.name}`);
  }
}

if (errors.length > 0) {
  console.error(`Content check failed: ${errors.length} problem(s):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`Content check passed: ${scanned.length} file(s) checked, 0 problems.`);

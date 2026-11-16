#!/usr/bin/env node
/**
 * Internal link check for Dazzlit.
 *
 * Checks every internal link in:
 *   - src/content front-matter (internalLinks)
 *   - built HTML in dist/ (href and src starting with /)
 *
 * A link passes when its path is:
 *   - a URL in data/sitemap.csv, or
 *   - a page actually built into dist/, or
 *   - a file in dist/ (static asset), or
 *   - a planned utility page from the development plan section 1
 *     (/privacy/, /terms/, /cookies/, /accessibility/) — those pages are
 *     built in Phase 1, step 7, and are listed here so the check does not
 *     fail on a link to a page the plan already requires.
 *
 * Anchor fragments (#...) are ignored; only the path is checked.
 * Exits 1 and lists every broken link.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(root, '..');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 1;
        } else inQuotes = false;
      } else field += ch;
    } else if (ch === '"') inQuotes = true;
    else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (ch !== '\r') field += ch;
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  const [header, ...body] = rows.filter((r) => r.some((c) => c.trim() !== ''));
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) walk(path, out);
    else out.push(path);
  }
  return out;
}

function pathOf(href) {
  return href.split('#')[0].split('?')[0];
}

const PLANNED_UTILITY_PAGES = new Set(['/privacy/', '/terms/', '/cookies/', '/accessibility/']);

const sitemap = parseCsv(readFileSync(join(repoRoot, 'data', 'sitemap.csv'), 'utf-8'));
const sitemapUrls = new Set(sitemap.map((r) => r['URL']));

// Pages actually built into dist/
const distFiles = walk(join(root, 'dist'));
const builtUrls = new Set(['/']);
for (const file of distFiles) {
  if (!file.endsWith('.html')) continue;
  const rel = file.slice(join(root, 'dist').length).replace(/\\/g, '/');
  if (rel === '/index.html') continue;
  builtUrls.add(rel.endsWith('/index.html') ? rel.slice(0, -'index.html'.length) : rel);
}
const distPaths = new Set(
  distFiles.map((f) => f.slice(join(root, 'dist').length).replace(/\\/g, '/')),
);

const errors = [];
let checked = 0;

function check(url, source) {
  if (!url || !url.startsWith('/')) return;
  const path = pathOf(url);
  if (path === '' || path === '/') {
    checked += 1;
    return;
  }
  checked += 1;
  const ok =
    sitemapUrls.has(path) ||
    sitemapUrls.has(path.endsWith('/') ? path : `${path}/`) ||
    builtUrls.has(path) ||
    PLANNED_UTILITY_PAGES.has(path) ||
    distPaths.has(path) ||
    distPaths.has(path.endsWith('/') ? path : `${path}/`);
  if (!ok) errors.push(`${source}: broken internal link ${url}`);
}

// 1. Content front-matter internalLinks
for (const file of walk(join(root, 'src', 'content'))) {
  if (!file.endsWith('.md')) continue;
  const text = readFileSync(file, 'utf-8');
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) continue;
  for (const match of fm[1].matchAll(/^\s*url:\s*"([^"]+)"/gm)) {
    check(match[1], file.slice(root.length + 1));
  }
}

// 2. Built HTML href/src
for (const file of distFiles) {
  if (!file.endsWith('.html')) continue;
  const html = readFileSync(file, 'utf-8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    check(match[1], file.slice(root.length + 1));
  }
}

if (errors.length > 0) {
  console.error(`Link check failed: ${errors.length} broken link(s) out of ${checked} checked:`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`Link check passed: ${checked} internal link(s) checked, 0 broken.`);

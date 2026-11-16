#!/usr/bin/env node
/**
 * CSV → content scaffolder for Dazzlit.
 *
 * Turns one wave file, data/pages-by-wave/wave-N.csv, into Markdown files
 * under src/content/. Front-matter comes only from the CSV brief columns;
 * the body is only the H2 headings from the H2 Outline column, with no
 * body copy — body copy is written in Phase 2, one cluster at a time.
 *
 * There is no data/pages.csv in the handoff pack; the per-wave files plus
 * data/sitemap.csv are the source of truth (see docs/RECORD_REGISTER.md, R-035).
 *
 * Usage:
 *   node scripts/scaffold-from-csv.mjs --wave 1 [--dry-run]
 *
 * The script fails (exit 1) on: duplicate URLs, a missing H1 / meta title /
 * meta description, a meta title over 60 or a meta description over 160
 * characters, or an internal link whose URL is not in data/sitemap.csv.
 * It never invents URLs, titles, keywords or meta tags.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(root, '..');

function parseArgs(argv) {
  const args = { wave: null, dryRun: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === '--wave') args.wave = argv[i + 1];
    if (argv[i] === '--dry-run') args.dryRun = true;
  }
  if (!args.wave) throw new Error('Missing required argument: --wave N');
  return args;
}

/** Minimal RFC 4180 CSV parser: quoted fields, embedded commas and newlines. */
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
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (ch === '\r') {
      // Ignore CR; LF follows.
    } else {
      field += ch;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  const [header, ...body] = rows.filter((r) => r.some((c) => c.trim() !== ''));
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ''])));
}

function splitLines(value) {
  return value
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitSemicolons(value) {
  return value
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseInternalLinks(value) {
  return splitLines(value).map((line) => {
    const parts = line.split('→');
    if (parts.length !== 2) throw new Error(`Bad internal link line: ${line}`);
    return { anchor: parts[0].trim(), url: parts[1].trim() };
  });
}

function parseH2s(value) {
  return splitLines(value).map((line) => {
    const match = line.match(/^H2\s+\d+\.\s*(.+)$/);
    return match ? match[1].trim() : line.replace(/^H2\s+/, '').trim();
  });
}

/** JSON double-quoted strings are valid YAML scalars. */
function y(value) {
  return JSON.stringify(value);
}

function yamlList(items, indent = '  ') {
  if (items.length === 0) return ' []';
  return `\n${items.map((item) => `${indent}- ${y(item)}`).join('\n')}`;
}

function collectionFor(pageType) {
  if (pageType === 'Core Page') return 'core';
  if (pageType === 'Service Page') return 'services';
  if (pageType === 'Resource Page') return 'resources';
  if (pageType === 'Blog Post') return 'blog';
  throw new Error(`Unknown Page Type: ${pageType}`);
}

function stripPrefix(url, prefix) {
  return url.startsWith(prefix) ? url.slice(prefix.length) : url;
}

function filePathFor(collection, url) {
  let path = url;
  if (collection === 'services') path = stripPrefix(path, '/services/');
  if (collection === 'resources') path = stripPrefix(path, '/resources/');
  if (collection === 'blog') path = stripPrefix(path, '/blog/');
  if (collection === 'locations') path = stripPrefix(path, '/locations/');
  path = path.replace(/^\/+|\/+$/g, '');
  if (path === '') path = 'home';
  return `${collection}/${path}.md`;
}

function frontMatter(row) {
  const secondaryKeywords = splitSemicolons(row['Secondary Keywords']);
  const schema = row['Schema Markup'].split('+').map((s) => s.trim()).filter(Boolean);
  const internalLinks = parseInternalLinks(row['Internal Links Out (anchor → URL)']);
  const faqs = splitLines(row['FAQs to Answer']);
  const lines = [
    '---',
    `pageId: ${y(row['Page ID'])}`,
    `url: ${y(row['URL'])}`,
    `title: ${y(row['H1'])}`,
    `metaTitle: ${y(row['Meta Title'])}`,
    `metaDescription: ${y(row['Meta Description'])}`,
    `primaryKeyword: ${y(row['Primary Keyword'])}`,
    `secondaryKeywords:${yamlList(secondaryKeywords)}`,
    `schema:${yamlList(schema)}`,
    `parentPage: ${y(row['Parent Page'])}`,
    ...(internalLinks.length === 0
      ? ['internalLinks: []']
      : [
          'internalLinks:',
          ...internalLinks.flatMap((link) => [
            `  - anchor: ${y(link.anchor)}`,
            `    url: ${y(link.url)}`,
          ]),
        ]),
    `faqs:${yamlList(faqs)}`,
    `cta: ${y(row['CTA'])}`,
    `wave: ${Number(row['Wave'])}`,
    `status: ${y(row['Status'])}`,
    `pageType: ${y(row['Page Type'])}`,
    `pageSubtype: ${y(row['Page Sub-type'])}`,
    `pillar: ${y(row['Pillar (Field)'])}`,
    `topic: ${y(row['Topic (Sub-field)'])}`,
    `priority: ${y(row['Priority'])}`,
    `targetWords: ${y(row['Target Words'])}`,
    `searchIntent: ${y(row['Search Intent'])}`,
    `funnelStage: ${y(row['Funnel Stage'])}`,
    '---',
  ];
  return lines.join('\n');
}

function main() {
  const { wave, dryRun } = parseArgs(process.argv.slice(2));
  const csvPath = join(repoRoot, 'data', 'pages-by-wave', `wave-${wave}.csv`);
  const sitemapPath = join(repoRoot, 'data', 'sitemap.csv');
  if (!existsSync(csvPath)) throw new Error(`Wave file not found: ${csvPath}`);
  const rows = parseCsv(readFileSync(csvPath, 'utf-8'));
  const sitemapRows = parseCsv(readFileSync(sitemapPath, 'utf-8'));
  const sitemapUrls = new Set(sitemapRows.map((r) => r['URL']));

  const errors = [];
  const seenUrls = new Set();
  const outputs = [];

  for (const row of rows) {
    const id = row['Page ID'] || '(no ID)';
    if (!row['URL']) errors.push(`${id}: missing URL`);
    if (seenUrls.has(row['URL'])) errors.push(`${id}: duplicate URL ${row['URL']}`);
    seenUrls.add(row['URL']);
    if (!row['H1']) errors.push(`${id}: missing H1`);
    if (!row['Meta Title']) errors.push(`${id}: missing Meta Title`);
    if (row['Meta Title'].length > 60)
      errors.push(`${id}: Meta Title is ${row['Meta Title'].length} characters (max 60)`);
    if (!row['Meta Description']) errors.push(`${id}: missing Meta Description`);
    if (row['Meta Description'].length > 160)
      errors.push(`${id}: Meta Description is ${row['Meta Description'].length} characters (max 160)`);
    let links = [];
    try {
      links = parseInternalLinks(row['Internal Links Out (anchor → URL)']);
    } catch (error) {
      errors.push(`${id}: ${error.message}`);
    }
    for (const link of links) {
      if (!sitemapUrls.has(link.url)) errors.push(`${id}: internal link not in sitemap.csv: ${link.url}`);
    }
    if (splitLines(row['FAQs to Answer']).length === 0) {
      console.warn(`warn: ${id} (${row['URL']}) has no FAQs to Answer`);
    }

    const collection = collectionFor(row['Page Type']);
    const relativePath = filePathFor(collection, row['URL']);
    const h2s = parseH2s(row['H2 Outline']);
    const body = h2s.map((h2) => `## ${h2}\n`).join('\n');
    const content = `${frontMatter(row)}\n\n<!-- Content scaffold generated from data/pages-by-wave/wave-${wave}.csv. Body copy is written in Phase 2, one cluster at a time. -->\n\n${body}`;
    outputs.push({ relativePath, content, url: row['URL'] });
  }

  if (errors.length > 0) {
    console.error(`Scaffolder failed with ${errors.length} error(s):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
  }

  let written = 0;
  for (const output of outputs) {
    const target = join(root, 'src', 'content', output.relativePath);
    if (!dryRun) {
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, output.content, 'utf-8');
    }
    written += 1;
  }
  console.log(
    `${dryRun ? '[dry-run] Would write' : 'Wrote'} ${written} page(s) from wave-${wave}.csv` +
      ` (${outputs.filter((o) => o.relativePath.startsWith('core/')).length} core, ` +
      `${outputs.filter((o) => o.relativePath.startsWith('services/')).length} services)`,
  );
}

main();

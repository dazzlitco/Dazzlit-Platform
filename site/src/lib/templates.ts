// Template mapping and helpers for the 15 page templates (plan, section 4).
// A page's template is decided by its URL pattern first, then by its CSV
// page sub-type, so the same mapping works when later waves add new
// collections (industries, resources, blog, locations).
import type { CollectionEntry } from 'astro:content';

export type PageEntry = CollectionEntry<'core'> | CollectionEntry<'services'>;

export type TemplateId =
  | 'T1'
  | 'T2'
  | 'T3'
  | 'T4'
  | 'T5'
  | 'T6'
  | 'T7'
  | 'T8'
  | 'T9'
  | 'T10'
  | 'T11'
  | 'T12'
  | 'T13'
  | 'T14'
  | 'T15';

export function templateFor(entry: PageEntry): TemplateId {
  const url = entry.data.url;
  if (url === '/') return 'T1';
  if (url === '/pricing/' || url.endsWith('/seo-pricing-and-packages/')) return 'T4';
  if (url.startsWith('/locations/')) return 'T6';
  if (url.startsWith('/industries/') && url !== '/industries/') return 'T5';
  if (url.startsWith('/resources/guides/')) return 'T7';
  if (url.startsWith('/resources/templates/') || url.startsWith('/resources/checklists/')) return 'T8';
  if (url.startsWith('/resources/tools/')) return 'T9';
  if (url.startsWith('/resources/statistics/')) return 'T10';
  if (url.startsWith('/resources/examples/')) return 'T11';
  if (url.startsWith('/resources/glossary/')) return 'T12';
  if (url.startsWith('/blog/') && url !== '/blog/') return 'T13';
  if (url.startsWith('/resources/tools-roundup/')) return 'T14';
  switch (entry.data.pageSubtype) {
    case 'Pillar hub (service)':
      return 'T2';
    case 'Service':
    case 'Audience service':
    case 'Industry service':
      return 'T3';
    case 'Pricing page':
      return 'T4';
    default:
      return 'T15';
  }
}

export interface TemplateProps {
  entry: PageEntry;
  trail: Crumb[];
  children: PageEntry[];
  headings: { text: string; id: string }[];
}

export interface Crumb {
  label: string;
  href?: string;
}

/** Breadcrumb trail from the entry's parent chain (parentPage column). */
export function breadcrumbTrail(all: PageEntry[], entry: PageEntry): Crumb[] {
  const byUrl = new Map(all.map((e) => [e.data.url, e]));
  const trail: Crumb[] = [{ label: entry.data.title }];
  let parentUrl = entry.data.parentPage;
  const seen = new Set<string>([entry.data.url]);
  while (parentUrl && parentUrl !== '/' && !seen.has(parentUrl)) {
    seen.add(parentUrl);
    const parent = byUrl.get(parentUrl);
    if (!parent) break;
    trail.unshift({ label: parent.data.title, href: parent.data.url });
    parentUrl = parent.data.parentPage;
  }
  trail.unshift({ label: 'Home', href: '/' });
  return trail;
}

/** Child pages: entries whose parentPage is this page's URL, in CSV order. */
export function childrenOf(all: PageEntry[], url: string): PageEntry[] {
  return all.filter((e) => e.data.parentPage === url);
}

/** H2 headings from the Markdown body, for tables of contents. */
export function bodyHeadings(body: string): { text: string; id: string }[] {
  const headings: { text: string; id: string }[] = [];
  for (const match of body.matchAll(/^## (.+)$/gm)) {
    const text = match[1].trim();
    headings.push({ text, id: slugify(text) });
  }
  return headings;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Display copy for the CTA band. The CSV CTA column holds instructions such
 * as "Get a free SEO proposal (form above the fold + sticky CTA)" — the part
 * in brackets is a build note, so only the text before it is shown.
 */
export function ctaDisplay(cta: string): string {
  return cta.split(' (')[0].trim();
}

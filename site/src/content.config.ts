import { defineCollection, z } from 'astro:content';

// One schema for every page collection. Every field comes from the CSV brief;
// nothing here invents a URL, title, keyword or meta tag.
const pageSchema = z.object({
  pageId: z.string(),
  url: z.string(),
  title: z.string(),
  metaTitle: z.string().max(60),
  metaDescription: z.string().max(160),
  primaryKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  schema: z.array(z.string()).default([]),
  parentPage: z.string(),
  internalLinks: z
    .array(z.object({ anchor: z.string(), url: z.string() }))
    .default([]),
  faqs: z.array(z.string()).default([]),
  // FAQ answers, written in Phase 2 (one per question in `faqs`). When
  // present, TemplateShell renders them in the FAQ accordion, which also
  // emits the FAQPage JSON-LD.
  faqAnswers: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .default([]),
  // Hero image (AI-generated per docs/PHOTO_BRIEF.md, WebP in
  // site/public/images/). When present, PageHero renders it as a banner
  // under the header text.
  heroImage: z.string().optional(),
  heroImageAlt: z.string().optional(),
  cta: z.string(),
  wave: z.number(),
  status: z.string(),
  pageType: z.string(),
  pageSubtype: z.string(),
  pillar: z.string(),
  topic: z.string(),
  priority: z.string(),
  targetWords: z.string(),
  searchIntent: z.string(),
  funnelStage: z.string(),
});

export const collections = {
  core: defineCollection({ type: 'content', schema: pageSchema }),
  services: defineCollection({ type: 'content', schema: pageSchema }),
};

// Navigation data — URLs taken from data/sitemap.csv only.
// Markets and Resources anchors are noted in docs/RECORD_REGISTER.md (R-034).

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  heading: string;
  links: NavLink[];
}

export const MARKETS: NavLink[] = [
  { label: 'United States', href: '/#markets' },
  { label: 'United Kingdom', href: '/#markets' },
  { label: 'Australia', href: '/#markets' },
  { label: 'Canada', href: '/#markets' },
  { label: 'United Arab Emirates', href: '/#markets' },
  { label: 'Singapore', href: '/#markets' },
];

export const SOLUTION_GROUPS: NavGroup[] = [
  {
    heading: 'Search & AI visibility',
    links: [
      { label: 'SEO', href: '/services/seo/' },
      { label: 'Local SEO', href: '/services/local-seo/' },
      { label: 'Link Building', href: '/services/link-building/' },
      { label: 'App Store Optimization', href: '/services/app-store-optimization/' },
      { label: 'AI Marketing & Automation', href: '/services/ai-services/' },
    ],
  },
  {
    heading: 'Paid media',
    links: [
      { label: 'PPC Management', href: '/services/ppc-management/' },
      { label: 'Social Media Advertising', href: '/services/social-media-advertising/' },
    ],
  },
  {
    heading: 'Social & content',
    links: [
      { label: 'Social Media Marketing', href: '/services/social-media-marketing/' },
      { label: 'Content Marketing', href: '/services/content-marketing/' },
      { label: 'Video & Media Production', href: '/services/media-production/' },
      { label: 'Digital PR', href: '/services/digital-pr/' },
    ],
  },
  {
    heading: 'Web & conversion',
    links: [
      { label: 'Web Design & Development', href: '/services/web-design-development/' },
      { label: 'Conversion Rate Optimization', href: '/services/conversion-rate-optimization/' },
      { label: 'Marketing Automation', href: '/services/marketing-automation/' },
    ],
  },
  {
    heading: 'Commerce',
    links: [
      { label: 'eCommerce Management', href: '/services/ecommerce-management/' },
      { label: 'eCommerce Marketing', href: '/services/ecommerce-marketing/' },
      { label: 'Amazon & Marketplaces', href: '/services/marketplace-marketing/' },
    ],
  },
  {
    heading: 'Reputation',
    links: [
      { label: 'Online Reputation Management', href: '/services/reputation-management/' },
      { label: 'Review Generation', href: '/services/review-generation/' },
    ],
  },
];

export const INDUSTRIES: NavLink[] = [
  { label: 'Healthcare', href: '/industries/healthcare/' },
  { label: 'Dental', href: '/industries/dental/' },
  { label: 'Law firms', href: '/industries/law-firms/' },
  { label: 'Home services', href: '/industries/home-services/' },
  { label: 'SaaS', href: '/industries/saas/' },
  { label: 'B2B technology', href: '/industries/technology/' },
  { label: 'Startups', href: '/industries/startups/' },
  { label: 'Manufacturing', href: '/industries/manufacturing/' },
  { label: 'Finance & crypto', href: '/industries/finance/' },
  { label: 'Real estate', href: '/industries/real-estate/' },
  { label: 'Restaurants & hospitality', href: '/industries/restaurants-hospitality/' },
  { label: 'Events', href: '/industries/events/' },
  { label: 'Retail', href: '/industries/retail/' },
  { label: 'Franchise', href: '/industries/franchise/' },
  { label: 'Automotive', href: '/industries/automotive/' },
  { label: 'Higher education', href: '/industries/education/' },
  { label: 'Nonprofit', href: '/industries/nonprofit/' },
];

export const RESOURCE_LINKS: NavLink[] = [
  { label: 'Guides', href: '/resources/#guides' },
  { label: 'Free tools', href: '/resources/#tools' },
  { label: 'Templates', href: '/resources/#templates' },
  { label: 'Checklists', href: '/resources/#checklists' },
  { label: 'Statistics', href: '/resources/#statistics' },
  { label: 'Examples', href: '/resources/#examples' },
  { label: 'Glossary', href: '/resources/#glossary' },
];

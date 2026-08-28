export const siteConfig = {
  name: 'TealGuard',
  canonicalOrigin: 'https://tealguard.eu',
  contactEmail: 'andreea@smartclover.ro',
  legalName: 'SMARTCLOVER SRL',
  registeredAddress: 'Strada Cernăuți 17-21, bl. J, parter, ap. 1, Cluj-Napoca, Cluj, Romania',
  taxId: '50315196',
  tradeRegister: 'J12/3050/2024',
  smartCloverUrl: 'https://smartclover.ro',
  announcementUrl:
    'https://smartclover.ro/blog/tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology',
  affideaUrl: 'https://affidea.ro/ro-RO/affidea-romania/',
  programmeUrl: 'https://mfe.gov.ro/ghiduri-ms/prioritatea_9_actiunea_b_step/',
  ministryUrl: 'https://mfe.gov.ro/',
  opportunitiesUrl: 'https://oportunitati-ue.gov.ro/',
  euFundsUrl: 'https://www.fonduri-ue.ro/',
  dataProtectionAuthorityUrl: 'https://www.dataprotection.ro/',
  whoUrl: 'https://www.who.int/initiatives/cervical-cancer-elimination-initiative',
  euGuidanceUrl: 'https://cancer-screening-and-care.jrc.ec.europa.eu/en/ec-cvc/european-cervical-cancer-guidelines'
} as const;

export const locales = ['ro', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const sectionSlugs = [
  'project',
  'platform',
  'validation',
  'baseline',
  'progress',
  'outputs',
  'news',
  'consortium',
  'funding',
  'trust',
  'privacy',
  'accessibility',
  'contact'
] as const;

export type SectionSlug = (typeof sectionSlugs)[number];

export const isLocale = (value: string): value is Locale => locales.includes(value as Locale);

export const isSectionSlug = (value: string): value is SectionSlug =>
  sectionSlugs.includes(value as SectionSlug);

export const localizedPath = (locale: Locale, section?: SectionSlug) =>
  section ? `/${locale}/${section}` : `/${locale}`;

export const alternateLocale = (locale: Locale): Locale => (locale === 'ro' ? 'en' : 'ro');

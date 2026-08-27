import type { MetadataRoute } from 'next';

import { locales, sectionSlugs, siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date('2026-08-27T00:00:00+03:00');

  return locales.flatMap((locale) => [
    {
      url: `${siteConfig.canonicalOrigin}/${locale}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: { languages: { ro: `${siteConfig.canonicalOrigin}/ro`, en: `${siteConfig.canonicalOrigin}/en` } }
    },
    ...sectionSlugs.map((section) => ({
      url: `${siteConfig.canonicalOrigin}/${locale}/${section}`,
      lastModified,
      changeFrequency: section === 'progress' || section === 'news' || section === 'outputs' ? 'weekly' as const : 'monthly' as const,
      priority: section === 'project' || section === 'platform' || section === 'validation' ? 0.8 : 0.6,
      alternates: {
        languages: {
          ro: `${siteConfig.canonicalOrigin}/ro/${section}`,
          en: `${siteConfig.canonicalOrigin}/en/${section}`
        }
      }
    }))
  ]);
}

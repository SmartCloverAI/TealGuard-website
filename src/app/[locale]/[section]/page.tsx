import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SectionPage } from '@/components/SectionPage';
import { sectionCopy, text } from '@/content/project';
import {
  isLocale,
  isSectionSlug,
  locales,
  sectionSlugs,
  type Locale,
  type SectionSlug
} from '@/lib/site';

type Params = Promise<{ locale: string; section: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) => sectionSlugs.map((section) => ({ locale, section })));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, section } = await params;
  if (!isLocale(locale) || !isSectionSlug(section)) return {};
  const copy = sectionCopy[section];

  return {
    title: text(copy.title, locale),
    description: text(copy.introduction, locale),
    alternates: {
      canonical: `/${locale}/${section}`,
      languages: { ro: `/ro/${section}`, en: `/en/${section}`, 'x-default': `/ro/${section}` }
    },
    openGraph: {
      type: 'website',
      siteName: 'TealGuard',
      locale: locale === 'ro' ? 'ro_RO' : 'en_GB',
      alternateLocale: locale === 'ro' ? ['en_GB'] : ['ro_RO'],
      title: text(copy.title, locale),
      description: text(copy.introduction, locale),
      url: `/${locale}/${section}`,
      images: [{ url: '/images/social/tealguard-announcement.png', width: 1200, height: 630, alt: 'TealGuard' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: text(copy.title, locale),
      description: text(copy.introduction, locale),
      images: ['/images/social/tealguard-announcement.png']
    }
  };
}

export default async function Page({ params }: { params: Params }) {
  const { locale, section } = await params;
  if (!isLocale(locale) || !isSectionSlug(section)) notFound();

  return <SectionPage locale={locale as Locale} slug={section as SectionSlug} />;
}

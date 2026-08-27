import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { HomePage } from '@/components/HomePage';
import { defaultLocale, isLocale, type Locale } from '@/lib/site';

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    alternates: {
      canonical: `/${locale}`,
      languages: { ro: '/ro', en: '/en', 'x-default': `/${defaultLocale}` }
    }
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale as Locale} />;
}

import '@fontsource-variable/ibm-plex-sans';
import '@fontsource-variable/space-grotesk';
import '../globals.css';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { FundingBar } from '@/components/FundingBar';
import { Header } from '@/components/Header';
import { isLocale, locales, siteConfig, type Locale } from '@/lib/site';

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale: value } = await params;
  if (!isLocale(value)) return {};
  const locale = value as Locale;
  const ro = locale === 'ro';

  return {
    metadataBase: new URL(siteConfig.canonicalOrigin),
    title: {
      default: ro ? 'TealGuard | AI pentru parcursuri de oncologie ginecologică' : 'TealGuard | AI-supported gynecologic oncology pathways',
      template: `%s | TealGuard`
    },
    description: ro
      ? 'TealGuard este un proiect de cercetare și validare clinică pentru o platformă AI suverană dedicată parcursurilor de oncologie ginecologică.'
      : 'TealGuard is a research and clinical-validation project for a sovereign AI platform supporting gynecologic oncology pathways.',
    alternates: {
      canonical: `/${locale}`,
      languages: { ro: '/ro', en: '/en', 'x-default': '/ro' }
    },
    openGraph: {
      type: 'website',
      siteName: 'TealGuard',
      locale: ro ? 'ro_RO' : 'en_GB',
      alternateLocale: ro ? ['en_GB'] : ['ro_RO'],
      title: ro ? 'TealGuard | AI pentru oncologie ginecologică' : 'TealGuard | AI for gynecologic oncology',
      description: ro ? 'Cercetare, integrare și validare clinică într-un program de 36 de luni.' : 'Research, integration and clinical validation in a 36-month programme.',
      url: `/${locale}`,
      images: [{ url: '/images/social/tealguard-announcement.png', width: 1200, height: 630, alt: 'TealGuard' }]
    },
    twitter: {
      card: 'summary_large_image',
      title: ro ? 'TealGuard | AI pentru oncologie ginecologică' : 'TealGuard | AI for gynecologic oncology',
      images: ['/images/social/tealguard-announcement.png']
    },
    robots: { index: true, follow: true },
    applicationName: 'TealGuard'
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value as Locale;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ResearchProject',
    name: 'TealGuard',
    alternateName: 'TealGuard — Intelligent platform for personalised management in gynecologic oncology',
    url: `${siteConfig.canonicalOrigin}/${locale}`,
    description: locale === 'ro'
      ? 'Proiect de cercetare și validare clinică pentru parcursuri de oncologie ginecologică sprijinite de AI.'
      : 'Research and clinical-validation project for AI-supported gynecologic oncology pathways.',
    member: [
      { '@type': 'Organization', name: 'HIPERDIA SA', legalName: 'HIPERDIA SA', brand: { '@type': 'Brand', name: 'Affidea' } },
      { '@type': 'Organization', name: 'SmartClover SRL', url: siteConfig.smartCloverUrl }
    ],
    funder: { '@type': 'Organization', name: 'European Union' }
  };

  return (
    <html lang={locale}>
      <body>
        <a className="skip-link" href="#main-content">{locale === 'ro' ? 'Sari la conținut' : 'Skip to content'}</a>
        <FundingBar locale={locale} />
        <Header locale={locale} />
        <div id="main-content">{children}</div>
        <Footer locale={locale} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}

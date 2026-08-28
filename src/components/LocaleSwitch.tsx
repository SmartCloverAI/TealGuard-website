'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';

import { locales, type Locale } from '@/lib/site';

const localizedHref = (pathname: string, locale: Locale) => {
  const segments = pathname.split('/');
  if (locales.includes(segments[1] as Locale)) {
    segments[1] = locale;
    return segments.join('/') || `/${locale}`;
  }
  return `/${locale}`;
};

export function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const hrefFor = (nextLocale: Locale) => localizedHref(pathname, nextLocale);

  const preserveLocationSuffix = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    const suffix = `${window.location.search}${window.location.hash}`;
    if (!suffix) return;
    event.preventDefault();
    router.push(`${href}${suffix}`);
  };

  return (
    <nav className="locale-switch" aria-label={locale === 'ro' ? 'Alegeți limba' : 'Choose language'}>
      <Link
        aria-current={locale === 'ro' ? 'page' : undefined}
        aria-label="Română"
        href={hrefFor('ro')}
        hrefLang="ro"
        lang="ro"
        onClick={(event) => preserveLocationSuffix(event, hrefFor('ro'))}
      >
        RO
      </Link>
      <Link
        aria-current={locale === 'en' ? 'page' : undefined}
        aria-label="English"
        href={hrefFor('en')}
        hrefLang="en"
        lang="en"
        onClick={(event) => preserveLocationSuffix(event, hrefFor('en'))}
      >
        EN
      </Link>
    </nav>
  );
}

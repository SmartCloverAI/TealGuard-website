import { ChevronDown, Mail, Menu } from 'lucide-react';
import Link from 'next/link';

import { commonCopy, navigation, text } from '@/content/project';
import { alternateLocale, type Locale } from '@/lib/site';

import { Brand } from './Brand';

export function Header({ locale }: { locale: Locale }) {
  const otherLocale = alternateLocale(locale);
  const primary = navigation.filter((item) => item.group === 'primary');
  const evidence = navigation.filter((item) => item.group === 'evidence');

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Brand locale={locale} />
        <nav className="desktop-nav" aria-label={locale === 'ro' ? 'Navigație principală' : 'Primary navigation'}>
          {primary.map((item) => (
            <Link key={item.slug} href={`/${locale}/${item.slug}`}>
              {text(item.label, locale)}
            </Link>
          ))}
          <details className="nav-disclosure">
            <summary>
              {text(commonCopy.evidenceMenu, locale)}
              <ChevronDown aria-hidden="true" size={15} strokeWidth={1.8} />
            </summary>
            <div className="nav-disclosure__panel">
              {evidence.map((item) => (
                <Link key={item.slug} href={`/${locale}/${item.slug}`}>
                  {text(item.label, locale)}
                </Link>
              ))}
            </div>
          </details>
        </nav>
        <div className="header-actions">
          <div className="locale-switch" aria-label={locale === 'ro' ? 'Alege limba' : 'Choose language'}>
            <Link aria-current={locale === 'ro' ? 'page' : undefined} href="/ro">
              RO
            </Link>
            <Link aria-current={locale === 'en' ? 'page' : undefined} href="/en">
              EN
            </Link>
          </div>
          <Link className="icon-link" href={`/${locale}/contact`} title={text(navigation.find((item) => item.slug === 'contact')!.label, locale)}>
            <Mail aria-hidden="true" size={18} />
            <span className="sr-only">{text(navigation.find((item) => item.slug === 'contact')!.label, locale)}</span>
          </Link>
          <details className="mobile-menu">
            <summary title={text(commonCopy.menu, locale)}>
              <Menu aria-hidden="true" size={21} />
              <span className="sr-only">{text(commonCopy.menu, locale)}</span>
            </summary>
            <nav aria-label={locale === 'ro' ? 'Navigație mobilă' : 'Mobile navigation'}>
              {navigation.filter((item) => item.group !== 'legal').map((item) => (
                <Link key={item.slug} href={`/${locale}/${item.slug}`}>
                  {text(item.label, locale)}
                </Link>
              ))}
              <Link href={`/${locale}/contact`}>{text(navigation.find((item) => item.slug === 'contact')!.label, locale)}</Link>
              <Link href={`/${otherLocale}`}>{otherLocale.toUpperCase()}</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

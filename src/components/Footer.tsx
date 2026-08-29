import { ArrowUpRight, Mail } from 'lucide-react';
import Link from 'next/link';

import { commonCopy, navigation, text } from '@/content/project';
import { siteConfig, type Locale } from '@/lib/site';

import { Brand } from './Brand';
import { ServedBy } from './ServedBy';

export function Footer({ locale }: { locale: Locale }) {
  const legal = navigation.filter((item) => item.group === 'legal');

  return (
    <footer className="site-footer">
      <div className="site-footer__main shell">
        <div className="site-footer__intro">
          <Brand locale={locale} />
          <p>{text(commonCopy.developmentNotice, locale)}</p>
        </div>
        <div>
          <p className="footer-heading">{locale === 'ro' ? 'Proiect' : 'Project'}</p>
          {navigation.filter((item) => item.group === 'primary').map((item) => (
            <Link key={item.slug} href={`/${locale}/${item.slug}`}>{text(item.label, locale)}</Link>
          ))}
        </div>
        <div>
          <p className="footer-heading">{locale === 'ro' ? 'Transparență' : 'Transparency'}</p>
          {navigation.filter((item) => item.group === 'evidence').map((item) => (
            <Link key={item.slug} href={`/${locale}/${item.slug}`}>{text(item.label, locale)}</Link>
          ))}
        </div>
        <div>
          <p className="footer-heading">{locale === 'ro' ? 'Informații' : 'Information'}</p>
          {legal.map((item) => (
            <Link key={item.slug} href={`/${locale}/${item.slug}`}>{text(item.label, locale)}</Link>
          ))}
          <a href={`mailto:${siteConfig.contactEmail}`}>
            <Mail aria-hidden="true" size={15} /> {siteConfig.contactEmail}
          </a>
        </div>
      </div>
      <div className="site-footer__base shell">
        <div className="site-footer__runtime">
          <span>SMIS 358561 · {text(commonCopy.lastUpdated, locale)}</span>
          <ServedBy locale={locale} />
        </div>
        <a href={siteConfig.programmeUrl} target="_blank" rel="noreferrer">
          {locale === 'ro' ? 'Programul Sănătate 2021–2027' : 'Health Programme 2021–2027'}
          <ArrowUpRight aria-hidden="true" size={14} />
        </a>
      </div>
    </footer>
  );
}

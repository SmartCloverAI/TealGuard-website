import Link from 'next/link';

import type { Locale } from '@/lib/site';

export function Brand({ locale }: { locale: Locale }) {
  return (
    <Link className="brand" href={`/${locale}`} aria-label={`TealGuard ${locale === 'ro' ? 'pagina principală' : 'home'}`}>
      <span className="brand__mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>TealGuard</span>
    </Link>
  );
}

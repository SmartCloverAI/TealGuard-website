import Link from 'next/link';

import { defaultLocale } from '@/lib/site';

export default function NotFound() {
  return (
    <main className="not-found">
      <p>404</p>
      <h1>Page not found</h1>
      <Link className="button button--primary" href={`/${defaultLocale}`}>TealGuard</Link>
    </main>
  );
}

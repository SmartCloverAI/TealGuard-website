import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const canonicalOrigin = 'https://tealguard.eu';
const aliasHosts = new Set([
  'teal-guard.eu',
  'www.tealguard.eu',
  'www.teal-guard.eu',
  '5d6ceb989608.smartclover.ro'
]);

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = (forwardedHost || request.headers.get('host') || '').split(':')[0].toLowerCase();

  if (aliasHosts.has(host)) {
    const path = request.nextUrl.pathname === '/' ? '/ro' : request.nextUrl.pathname;
    const destination = new URL(`${path}${request.nextUrl.search}`, canonicalOrigin);
    return NextResponse.redirect(destination, 308);
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/ro', request.url), 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico)$).*)']
};

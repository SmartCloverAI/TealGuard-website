import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { defaultLocale, locales, sectionSlugs, siteConfig } from '@/lib/site';
import { createNotFoundResponse } from '@/lib/not-found-response';

const canonicalOrigin = siteConfig.canonicalOrigin;
const canonicalHost = new URL(canonicalOrigin).hostname;
const defaultLocalePath = `/${defaultLocale}`;
const publicRuntimePaths = new Set(['/icon', '/manifest.webmanifest', '/robots.txt', '/sitemap.xml']);
const aliasHosts = new Set([
  'teal-guard.eu',
  'www.tealguard.eu',
  'www.teal-guard.eu',
  '5d6ceb989608.smartclover.ro'
]);

const isKnownPagePath = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 1) return locales.includes(segments[0] as (typeof locales)[number]);
  if (segments.length !== 2) return false;
  return (
    locales.includes(segments[0] as (typeof locales)[number]) &&
    sectionSlugs.includes(segments[1] as (typeof sectionSlugs)[number])
  );
};

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host');
  const host = (forwardedHost || request.headers.get('host') || '').split(':')[0].toLowerCase();
  const forwardedProto = request.headers.get('x-forwarded-proto')?.split(',')[0].trim().toLowerCase();
  const protocol = forwardedProto || request.nextUrl.protocol.replace(':', '').toLowerCase();
  const path = request.nextUrl.pathname === '/' ? defaultLocalePath : request.nextUrl.pathname;

  if (aliasHosts.has(host) || (host === canonicalHost && protocol !== 'https')) {
    const destination = new URL(`${path}${request.nextUrl.search}`, canonicalOrigin);
    return NextResponse.redirect(destination, 308);
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL(`${defaultLocalePath}${request.nextUrl.search}`, request.url), 307);
  }

  if (
    publicRuntimePaths.has(request.nextUrl.pathname) ||
    isKnownPagePath(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  return createNotFoundResponse();
}

export const config = {
  matcher: [
    '/((?!api(?:/|$)|_next/static(?:/|$)|_next/image(?:/|$)|favicon\\.ico$|.*\\.(?:svg|png|jpg|jpeg|webp|avif|ico)$).*)'
  ]
};

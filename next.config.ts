import type { NextConfig } from 'next';
import { execFileSync } from 'node:child_process';

const sourceRevision = (() => {
  const supplied = process.env.GIT_COMMIT_SHA ?? process.env.SOURCE_VERSION ?? process.env.COMMIT_SHA;
  if (supplied) return supplied;

  try {
    return execFileSync('git', ['rev-parse', '--short=12', 'HEAD'], { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
})();

const buildTime = process.env.BUILD_TIME ?? new Date().toISOString();

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  'upgrade-insecure-requests'
].join('; ');

const securityHeaders = [
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()'
  }
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BUILD_REVISION: sourceRevision,
    NEXT_PUBLIC_BUILD_TIME: buildTime
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...securityHeaders,
          ...(process.env.NODE_ENV === 'production'
            ? [
                { key: 'Content-Security-Policy', value: contentSecurityPolicy },
                { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' }
              ]
            : [])
        ]
      }
    ];
  }
};

export default nextConfig;

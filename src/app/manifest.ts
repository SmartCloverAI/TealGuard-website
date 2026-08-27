import type { MetadataRoute } from 'next';

import { defaultLocale } from '@/lib/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    lang: defaultLocale,
    name: 'TealGuard',
    short_name: 'TealGuard',
    description: 'Developing AI-supported gynecologic oncology pathways through clinical validation.',
    start_url: `/${defaultLocale}`,
    display: 'standalone',
    background_color: '#061a1a',
    theme_color: '#0a3434',
    icons: [{ src: '/icon', sizes: '32x32', type: 'image/png' }]
  };
}

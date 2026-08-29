'use client';

import { Server } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { Locale } from '@/lib/site';

const normalizeHostId = (value: unknown) => {
  if (typeof value !== 'string') return 'unknown';
  return value.trim() || 'unknown';
};

export function ServedBy({ locale }: { locale: Locale }) {
  const [hostId, setHostId] = useState('unknown');

  useEffect(() => {
    const controller = new AbortController();

    const loadHostId = async () => {
      try {
        const response = await fetch('/api/host-id', {
          cache: 'no-store',
          signal: controller.signal
        });
        if (!response.ok) return;

        const data = await response.json();
        setHostId(normalizeHostId(data?.hostId));
      } catch {
        // Retain the explicit fallback when runtime identity is unavailable.
      }
    };

    void loadHostId();
    return () => controller.abort();
  }, []);

  return (
    <span className="site-footer__served-by" aria-live="polite" data-runtime-host={hostId}>
      <Server aria-hidden="true" size={14} />
      <span>
        {locale === 'ro' ? 'Servit de' : 'Served by'} <strong>{hostId}</strong>
      </span>
    </span>
  );
}

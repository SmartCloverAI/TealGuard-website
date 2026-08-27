import Image from 'next/image';

import type { Locale } from '@/lib/site';

const copy = {
  en: {
    label: 'Project co-funded by the European Union through the European Regional Development Fund',
    eu: 'Co-funded by the European Union',
    government: 'Government of Romania',
    programme: 'Health Programme'
  },
  ro: {
    label: 'Proiect cofinanțat de Uniunea Europeană prin Fondul European de Dezvoltare Regională',
    eu: 'Cofinanțat de Uniunea Europeană',
    government: 'Guvernul României',
    programme: 'Programul Sănătate'
  }
} as const;

export function FundingBar({ locale }: { locale: Locale }) {
  const labels = copy[locale];

  return (
    <aside className="funding-bar" aria-label={labels.label}>
      <div className="funding-bar__inner">
        <div className="funding-bar__marks">
          <Image
            className="funding-bar__eu"
            src="/images/funding/eu-cofunded-ro.png"
            width={234}
            height={50}
            alt={labels.eu}
            priority
            unoptimized
          />
          <Image
            className="funding-bar__government"
            src="/images/funding/guvernul-romaniei.png"
            width={49}
            height={49}
            alt={labels.government}
            priority
            unoptimized
          />
          <Image
            className="funding-bar__programme"
            src="/images/funding/programul-sanatate.png"
            width={136}
            height={51}
            alt={labels.programme}
            priority
            unoptimized
          />
        </div>
        <p>{labels.label}</p>
      </div>
    </aside>
  );
}

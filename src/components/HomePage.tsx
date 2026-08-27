import { ArrowRight, CircleCheck, Clock3, ExternalLink, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  commonCopy,
  homeCopy,
  modules,
  projectFacts,
  targets,
  text
} from '@/content/project';
import { siteConfig, type Locale } from '@/lib/site';

import { HeroScene } from './HeroScene';

export function HomePage({ locale }: { locale: Locale }) {
  const labels = locale === 'ro'
    ? {
        current: 'Acum',
        next: 'Urmează',
        currentValue: 'Programul de implementare de 36 de luni',
        nextValue: 'Primele etape tehnice și de integrare',
        modules: 'Platforma TealGuard',
        status: 'Stadiul proiectului',
        boundaries: 'Dezvoltare cu responsabilități clare',
        boundariesBody: 'Fiecare modul planificat sprijină o parte definită a fluxului. Deciziile clinice rămân la profesioniști calificați, iar afirmațiile de performanță vor urma validării.',
        validation: 'Obiective de validare',
        validationBody: 'Programul urmărește maturizarea de la TRL 6 la TRL 9 prin integrare, validare prospectivă și operare la nivel de producție.',
        targetsNote: 'Toate cifrele de mai jos sunt obiective contractuale, nu rezultate curente.',
        announcement: 'Anunț de proiect',
        announcementTitle: 'Contractul de finanțare TealGuard a fost semnat',
        announcementBody: 'HIPERDIA SA și SmartClover au început programul de 36 de luni pentru dezvoltarea și validarea unei platforme AI suverane dedicate oncologiei ginecologice.',
        consortium: 'Consorțiu',
        coordinator: 'Lider de consorțiu și partener pentru implementare clinică',
        technology: 'Partener AI și deep tech',
        funding: 'Datele finanțării'
      }
    : {
        current: 'Now',
        next: 'Next',
        currentValue: '36-month implementation programme',
        nextValue: 'First technical and integration milestones',
        modules: 'The TealGuard platform',
        status: 'Project status',
        boundaries: 'Development with clear responsibilities',
        boundariesBody: 'Each planned module supports a defined part of the pathway. Clinical decisions remain with qualified professionals, and performance claims will follow validation.',
        validation: 'Validation targets',
        validationBody: 'The programme targets progress from TRL 6 to TRL 9 through integration, prospective validation and production-level operation.',
        targetsNote: 'Every figure below is a contractual target, not a current result.',
        announcement: 'Project announcement',
        announcementTitle: 'The TealGuard financing contract has been signed',
        announcementBody: 'HIPERDIA SA and SmartClover have begun a 36-month programme to develop and validate a sovereign AI platform for gynecologic oncology.',
        consortium: 'Consortium',
        coordinator: 'Consortium lead and clinical implementation partner',
        technology: 'AI and deep-tech partner',
        funding: 'Funding facts'
      };

  return (
    <main>
      <section className="hero-band">
        <div className="hero-band__grid shell">
          <div className="hero-copy">
            <p className="eyebrow">{text(commonCopy.projectLabel, locale)}</p>
            <h1>TealGuard</h1>
            <p className="hero-category">{text(homeCopy.category, locale)}</p>
            <p className="hero-introduction">{text(homeCopy.introduction, locale)}</p>
            <div className="hero-actions">
              <Link className="button button--primary" href={`/${locale}/project`}>
                {text(commonCopy.exploreProject, locale)}
                <ArrowRight aria-hidden="true" size={17} />
              </Link>
              <Link className="button button--quiet" href={`/${locale}/progress`}>
                {text(commonCopy.viewProgress, locale)}
              </Link>
            </div>
            <p className="consortium-line">{text(homeCopy.consortium, locale)}</p>
          </div>
          <HeroScene locale={locale} />
        </div>
      </section>

      <section className="mobile-hero-context" aria-label={locale === 'ro' ? 'Contextul proiectului' : 'Project context'}>
        <div className="shell">
          <p>{text(homeCopy.introduction, locale)}</p>
          <p>{text(homeCopy.consortium, locale)}</p>
        </div>
      </section>

      <section className="status-band" aria-labelledby="project-status-heading">
        <div className="shell status-band__grid">
          <div>
            <p className="eyebrow" id="project-status-heading">{labels.status}</p>
            <p className="status-band__lead"><CircleCheck aria-hidden="true" /> {text(homeCopy.currentStatus, locale)}</p>
          </div>
          <div className="status-step">
            <span>{labels.current}</span>
            <strong>{labels.currentValue}</strong>
          </div>
          <div className="status-step">
            <span>{labels.next}</span>
            <strong>{labels.nextValue}</strong>
          </div>
          <Link className="text-link" href={`/${locale}/progress`}>
            {text(commonCopy.viewProgress, locale)} <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="section section--light" aria-labelledby="modules-heading">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">{labels.modules}</p>
            <h2 id="modules-heading">{text(homeCopy.pathwayHeading, locale)}</h2>
            <p>{text(homeCopy.pathwayIntro, locale)}</p>
          </div>
          <div className="module-grid">
            {modules.map((module, index) => (
              <article className="module-card" key={module.id} style={{ '--module-accent': module.accent } as React.CSSProperties}>
                <div className="module-card__top">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <b>{module.shortCode}</b>
                </div>
                <h3>{module.name}</h3>
                <p>{text(module.responsibility, locale)}</p>
                <p className="module-card__boundary">{text(module.boundary, locale)}</p>
              </article>
            ))}
          </div>
          <Link className="text-link section-link" href={`/${locale}/platform`}>
            {locale === 'ro' ? 'Vedeți arhitectura platformei' : 'See the platform architecture'}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="section section--ink" aria-labelledby="boundaries-heading">
        <div className="shell split-feature">
          <div>
            <p className="eyebrow">{locale === 'ro' ? 'Responsabilitate' : 'Responsibility'}</p>
            <h2 id="boundaries-heading">{labels.boundaries}</h2>
          </div>
          <div>
            <p className="feature-copy">{labels.boundariesBody}</p>
            <div className="principle-row">
              <span><ShieldCheck aria-hidden="true" /> {locale === 'ro' ? 'Supraveghere umană' : 'Human oversight'}</span>
              <span><CircleCheck aria-hidden="true" /> {locale === 'ro' ? 'Roluri delimitate' : 'Bounded roles'}</span>
              <span><Clock3 aria-hidden="true" /> {locale === 'ro' ? 'Dovezi datate' : 'Dated evidence'}</span>
            </div>
            <Link className="text-link text-link--light" href={`/${locale}/trust`}>
              {locale === 'ro' ? 'Încredere și guvernanță' : 'Trust and governance'}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--cool" aria-labelledby="targets-heading">
        <div className="shell">
          <div className="section-heading section-heading--wide">
            <p className="eyebrow">{labels.validation}</p>
            <h2 id="targets-heading">{labels.validationBody}</h2>
            <p className="target-note">{labels.targetsNote}</p>
          </div>
          <div className="target-grid">
            {targets.slice(0, 4).map((target) => (
              <article key={target.id}>
                <span>{text(target.value, locale)}</span>
                <h3>{text(target.label, locale)}</h3>
                <p>{text(target.qualifier, locale)}</p>
              </article>
            ))}
          </div>
          <Link className="button button--dark section-link" href={`/${locale}/validation`}>
            {locale === 'ro' ? 'Vedeți planul de validare' : 'View the validation plan'}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="section section--news" aria-labelledby="announcement-heading">
        <div className="shell news-feature">
          <div className="news-feature__media">
            <Image
              src="/images/social/tealguard-announcement.png"
              width={1200}
              height={630}
              sizes="(max-width: 800px) 100vw, 48vw"
              alt={locale === 'ro' ? 'Anunțul semnării contractului TealGuard' : 'TealGuard contract signing announcement'}
            />
          </div>
          <div className="news-feature__copy">
            <p className="eyebrow">{labels.announcement} · 26.08.2026</p>
            <h2 id="announcement-heading">{labels.announcementTitle}</h2>
            <p>{labels.announcementBody}</p>
            <a className="button button--primary" href={siteConfig.announcementUrl} target="_blank" rel="noreferrer">
              {text(commonCopy.readUpdate, locale)}
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          </div>
        </div>
      </section>

      <section className="section partner-band" aria-labelledby="consortium-heading">
        <div className="shell">
          <div className="section-heading">
            <p className="eyebrow">{labels.consortium}</p>
            <h2 id="consortium-heading">
              {locale === 'ro' ? 'Expertiză clinică și tehnologică într-un singur program' : 'Clinical and technology expertise in one programme'}
            </h2>
          </div>
          <div className="partner-grid">
            <a href={siteConfig.affideaUrl} target="_blank" rel="noreferrer" className="partner-item">
              <Image src="/images/partners/affidea.svg" alt="Affidea" width={256} height={77} />
              <span><strong>HIPERDIA SA</strong>{labels.coordinator}</span>
            </a>
            <a href={siteConfig.smartCloverUrl} target="_blank" rel="noreferrer" className="partner-item">
              <Image className="smartclover-mark" src="/images/partners/smartclover.png" alt="SmartClover" width={108} height={108} />
              <span><strong>SmartClover SRL</strong>{labels.technology}</span>
            </a>
          </div>
          <div className="project-fact-line">
            <span>SMIS 358561</span>
            <span>{projectFacts[2].value[locale]}</span>
            <Link href={`/${locale}/funding`}>{labels.funding} <ArrowRight aria-hidden="true" size={15} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}

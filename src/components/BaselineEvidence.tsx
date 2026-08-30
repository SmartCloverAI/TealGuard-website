import { ArrowRight, Code2, ExternalLink, FileJson, Hash, ShieldCheck, TriangleAlert } from 'lucide-react';
import Image from 'next/image';

import {
  baselineArtifacts,
  baselineCaptures,
  baselineCopy,
  baselineScope,
  baselineText,
  cerviGuardRelease,
  evidenceLimits,
  evidenceSupports
} from '@/content/baseline';
import type { Locale } from '@/lib/site';

const trlDefinitionsUrl = 'https://eic.ec.europa.eu/programme-finder-13_en';

export function BaselineEvidence({ locale }: { locale: Locale }) {
  const ro = locale === 'ro';
  const newTabNote = ro ? ' (se deschide într-o filă nouă)' : ' (opens in a new tab)';

  return (
    <div className="baseline-evidence">
      <section className="baseline-scope" aria-labelledby="baseline-scope-heading">
        <div className="section-heading section-heading--wide">
          <p className="eyebrow">{ro ? 'CerviGuard astăzi' : 'CerviGuard today'}</p>
          <h2 id="baseline-scope-heading">{baselineText(baselineCopy.scopeHeading, locale)}</h2>
          <p>{baselineText(baselineCopy.scopeIntroduction, locale)}</p>
        </div>
        <div className="baseline-scope__grid">
          {baselineScope.map((item) => (
            <article className={`baseline-scope__item baseline-scope__item--${item.state}`} key={item.id}>
              <span>{baselineText(item.label, locale)}</span>
              <h3>{baselineText(item.title, locale)}</h3>
              <p>{baselineText(item.description, locale)}</p>
            </article>
          ))}
        </div>
      </section>

      <nav className="evidence-quick-links" aria-label={ro ? 'Legături CerviGuard' : 'CerviGuard links'}>
        <a href={cerviGuardRelease.historicalSourceUrl} target="_blank" rel="noreferrer">
          <Code2 aria-hidden="true" size={17} />
          <span>{ro ? 'Cod anterior proiectului' : 'Pre-project source'}<span className="sr-only">{newTabNote}</span></span>
          <ExternalLink aria-hidden="true" size={14} />
        </a>
        <a href={cerviGuardRelease.sourceUrl} target="_blank" rel="noreferrer">
          <Code2 aria-hidden="true" size={17} />
          <span>{ro ? 'Cod CerviGuard actual' : 'Current CerviGuard source'}<span className="sr-only">{newTabNote}</span></span>
          <ExternalLink aria-hidden="true" size={14} />
        </a>
        <a href={cerviGuardRelease.liveUrl} target="_blank" rel="noreferrer">
          <span>{ro ? 'Autentificare CerviGuard' : 'CerviGuard sign-in'}<span className="sr-only">{newTabNote}</span></span>
          <ExternalLink aria-hidden="true" size={14} />
        </a>
        <a href={cerviGuardRelease.manifestUrl}>
          <FileJson aria-hidden="true" size={17} />
          <span>{ro ? 'Manifest JSON' : 'JSON manifest'}</span>
        </a>
      </nav>

      <section className="baseline-captures" aria-labelledby="baseline-captures-heading">
        <div className="section-heading section-heading--wide">
          <p className="eyebrow">{ro ? 'Ecrane de produs' : 'Product screens'}</p>
          <h2 id="baseline-captures-heading">{baselineText(baselineCopy.capturesHeading, locale)}</h2>
          <p>{baselineText(baselineCopy.capturesIntroduction, locale)}</p>
        </div>

        {baselineCaptures.map((capture) => (
          <article className="evidence-record" key={capture.id}>
            <figure className="evidence-record__figure">
              <h3>{baselineText(capture.title, locale)}</h3>
              <a
                className="evidence-record__image-link"
                href={capture.src}
                target="_blank"
                rel="noreferrer"
                aria-label={`${baselineText(capture.title, locale)}, ${ro ? 'deschideți captura de ecran la dimensiune completă într-o filă nouă' : 'open the full-size screenshot in a new tab'}`}
              >
                <Image
                  src={capture.src}
                  alt={baselineText(capture.alt, locale)}
                  width={capture.width}
                  height={capture.height}
                  sizes="(max-width: 340px) calc(100vw - 24px), (max-width: 900px) calc(100vw - 32px), (max-width: 1288px) 62vw, 800px"
                  unoptimized
                />
                <span className="evidence-record__open">
                  {ro ? 'Deschideți captura de ecran' : 'Open full-size screenshot'}
                  <ExternalLink aria-hidden="true" size={15} />
                </span>
              </a>
              <figcaption>{baselineText(capture.caption, locale)}</figcaption>
            </figure>

            <aside className="evidence-record__meta" aria-label={`${baselineText(capture.title, locale)}, ${ro ? 'detalii despre captura de ecran' : 'screenshot details'}`}>
              <p className="evidence-status"><Hash aria-hidden="true" size={16} /> {ro ? 'Captură de ecran CerviGuard · SHA-256' : 'CerviGuard screenshot · SHA-256'}</p>
              <p className="evidence-record__supports">
                <strong>{ro ? 'Prezintă:' : 'Shows:'}</strong> {baselineText(capture.supports, locale)}
              </p>
              <dl className="provenance-list">
                <div><dt>{ro ? 'Data capturii' : 'Screenshot date'}</dt><dd>{ro ? '28 august 2026' : '28 August 2026'}</dd></div>
                <div><dt>{ro ? 'Aplicație' : 'Application'}</dt><dd>CerviGuard v{cerviGuardRelease.version}</dd></div>
                <div><dt>{ro ? 'Conținut' : 'Content'}</dt><dd>{ro ? 'Date demonstrative' : 'Demonstration data'}</dd></div>
                <div><dt>{ro ? 'Fișier' : 'File'}</dt><dd>PNG · {capture.width} × {capture.height}</dd></div>
                <div><dt>SHA-256</dt><dd><code>{capture.sha256}</code></dd></div>
              </dl>
            </aside>
          </article>
        ))}
      </section>

      <section className="evidence-boundary" aria-labelledby="evidence-boundary-heading">
        <h2 id="evidence-boundary-heading">{ro ? 'Informații publice actuale' : 'Current public information'}</h2>
        <div className="evidence-boundary__grid">
          <div>
            <h3><ShieldCheck aria-hidden="true" size={19} /> {baselineText(baselineCopy.supportsHeading, locale)}</h3>
            <ul>{evidenceSupports.map((item) => <li key={baselineText(item, locale)}>{baselineText(item, locale)}</li>)}</ul>
          </div>
          <div>
            <h3><TriangleAlert aria-hidden="true" size={19} /> {baselineText(baselineCopy.limitsHeading, locale)}</h3>
            <ul>{evidenceLimits.map((item) => <li key={baselineText(item, locale)}>{baselineText(item, locale)}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="evidence-inventory" aria-labelledby="evidence-inventory-heading">
        <div className="section-heading section-heading--wide">
          <p className="eyebrow">{ro ? 'Surse publice' : 'Source links'}</p>
          <h2 id="evidence-inventory-heading">{baselineText(baselineCopy.inventoryHeading, locale)}</h2>
          <p>{baselineText(baselineCopy.inventoryIntroduction, locale)}</p>
        </div>
        <ul className="evidence-inventory__list">
          {baselineArtifacts.map((artifact) => (
            <li className="evidence-inventory__item" key={artifact.id}>
              <div>
                <span>{baselineText(artifact.kind, locale)}</span>
                <h3>{baselineText(artifact.title, locale)}</h3>
                <p>{baselineText(artifact.description, locale)}</p>
                <code>{artifact.identifier}</code>
              </div>
              <a href={artifact.href} target="_blank" rel="noreferrer">
                {baselineText(artifact.action, locale)}
                <span className="sr-only">{newTabNote}</span>
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <aside className="trl-boundary" aria-labelledby="trl-boundary-heading">
        <div>
          <p className="eyebrow">{ro ? 'Stadiu de dezvoltare' : 'Development stage'}</p>
          <h2 id="trl-boundary-heading">{baselineText(baselineCopy.trlHeading, locale)}</h2>
          <p>{baselineText(baselineCopy.trlBody, locale)}</p>
        </div>
        <div className="trl-boundary__links">
          <a className="text-link" href={trlDefinitionsUrl} target="_blank" rel="noreferrer">
            {baselineText(baselineCopy.ecLabel, locale)}<span className="sr-only">{newTabNote}</span> <ExternalLink aria-hidden="true" size={15} />
          </a>
          <a className="text-link" href={cerviGuardRelease.manifestUrl}>
            <FileJson aria-hidden="true" size={16} /> {baselineText(baselineCopy.manifestLabel, locale)}
          </a>
          <a className="button button--dark" href={`/${locale}/validation`}>
            {ro ? 'Continuați cu planul de validare' : 'Continue to the validation plan'} <ArrowRight aria-hidden="true" size={16} />
          </a>
        </div>
      </aside>
    </div>
  );
}

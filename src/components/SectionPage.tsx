import { ArrowRight, Download, ExternalLink, Mail, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  commonCopy,
  fundingFacts,
  milestones,
  modules,
  outputRegistry,
  projectFacts,
  sectionCopy,
  statusLabels,
  stateCopy,
  targets,
  text,
  trustPrinciples
} from '@/content/project';
import { siteConfig, type Locale, type SectionSlug } from '@/lib/site';

import { BaselineEvidence } from './BaselineEvidence';

function FactList({ facts, locale }: { facts: typeof projectFacts; locale: Locale }) {
  return (
    <dl className="fact-list">
      {facts.map((fact) => (
        <div key={text(fact.label, locale)}>
          <dt>{text(fact.label, locale)}</dt>
          <dd>{text(fact.value, locale)}</dd>
        </div>
      ))}
    </dl>
  );
}

function EvidenceFigure({
  locale,
  src,
  alt,
  caption,
  title,
  collapsed = false
}: {
  locale: Locale;
  src: string;
  alt: string;
  caption: string;
  title: string;
  collapsed?: boolean;
}) {
  const figure = (
    <figure className="evidence-figure">
      <h2 className="figure-heading">{title}</h2>
      <a href={src} target="_blank" rel="noreferrer">
        <Image src={src} alt={alt} width={1857} height={948} sizes="(max-width: 900px) 100vw, 1180px" />
        <span>{text(commonCopy.openFigure, locale)} <ExternalLink aria-hidden="true" size={15} /></span>
      </a>
      <figcaption>{caption}</figcaption>
    </figure>
  );

  if (!collapsed) return figure;

  return (
    <details className="evidence-disclosure">
      <summary>{locale === 'ro' ? 'Vedeți figura tehnică originală în limba engleză' : 'View original technical figure'}</summary>
      {figure}
    </details>
  );
}

function ArchitectureLayers({ locale }: { locale: Locale }) {
  const ro = locale === 'ro';
  const layers = ro
    ? [
        ['Aplicații', 'ColVisionAI, NavigatorAI, Follow-upAI și EcoAI formează cele patru module planificate.'],
        ['AI și raționament', 'Viziune computerizată, verificarea calității imaginilor, modele lingvistice ancorate în surse aprobate, reguli explicite și escaladare umană.'],
        ['Învățare distribuită', 'Proiectul va studia învățarea federată și actualizările controlate ale modelelor; criptarea homomorfă va fi evaluată acolo unde este proporțională și justificată tehnic.'],
        ['Date și interoperabilitate', 'Gestionare locală criptată, minimizarea datelor, anonimizare controlată, HL7 FHIR și API-uri controlate.'],
        ['Încredere și infrastructură', 'Operare pe dispozitiv, local și la marginea rețelei, acces bazat pe roluri, evidențe de audit și controale de implementare orientate către UE.']
      ]
    : [
        ['Applications', 'ColVisionAI, NavigatorAI, Follow-upAI and EcoAI form the four planned modules.'],
        ['AI and reasoning', 'Computer vision, image-quality checks, language models grounded in approved sources, explicit rules and human escalation.'],
        ['Distributed learning', 'The project will study federated learning and controlled model updates; homomorphic encryption will be evaluated where proportionate and technically justified.'],
        ['Data and interoperability', 'Encrypted local handling, data minimisation, controlled anonymisation, HL7 FHIR and controlled APIs.'],
        ['Trust and infrastructure', 'On-device, on-premises and edge operation, role-based access, audit records and EU-first deployment controls.']
      ];

  return (
    <section className="architecture-section" aria-labelledby="architecture-layers-heading">
      <div className="section-heading">
        <p className="eyebrow">{ro ? 'Arhitectura propusă' : 'Proposed architecture'}</p>
        <h2 id="architecture-layers-heading">{ro ? 'Cinci straturi tehnice, cu limite explicite' : 'Five technical layers with explicit boundaries'}</h2>
      </div>
      <div className="architecture-layers">
        {layers.map(([name, description], index) => (
          <article key={name}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{name}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Modules({ locale }: { locale: Locale }) {
  return (
    <div className="module-detail-list">
      {modules.map((module, index) => (
        <article key={module.id} style={{ '--module-accent': module.accent } as React.CSSProperties}>
          <div className="module-detail-list__index">{String(index + 1).padStart(2, '0')}</div>
          <div>
            <p className="module-code">{module.shortCode}</p>
            <h2>{module.name}</h2>
          </div>
          <div>
            <p>{text(module.responsibility, locale)}</p>
            <p className="boundary-copy"><ShieldCheck aria-hidden="true" size={17} /> {text(module.boundary, locale)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function Targets({ locale }: { locale: Locale }) {
  return (
    <div className="target-list">
      {targets.map((target) => (
        <article key={target.id}>
          <div className="target-list__value">{text(target.value, locale)}</div>
          <div>
            <span className="status-label status-label--target">{text(statusLabels.target, locale)}</span>
            <h2>{text(target.label, locale)}</h2>
            <p>{text(target.qualifier, locale)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function SectionBody({ slug, locale }: { slug: SectionSlug; locale: Locale }) {
  const ro = locale === 'ro';

  switch (slug) {
    case 'project':
      return (
        <>
          <div className="content-grid content-grid--intro">
            <div>
              <h2>{ro ? 'De ce este nevoie de un parcurs conectat' : 'Why a connected pathway matters'}</h2>
              <p>{ro
                ? 'Prevenția și managementul cancerului de col uterin implică informație, screening, investigații, îndrumare, monitorizare și resurse clinice. TealGuard cercetează cum pot fi coordonate aceste etape fără a transfera responsabilitatea clinică către software.'
                : 'Cervical-cancer prevention and management involve information, screening, investigation, navigation, follow-up and clinical resources. TealGuard is researching how these steps can be coordinated without transferring clinical responsibility to software.'}</p>
            </div>
            <div className="callout">
              <span>{text(commonCopy.projectLabel, locale)}</span>
              <strong>{ro ? '36 de luni de cercetare, integrare și validare' : '36 months of research, integration and validation'}</strong>
              <p>{text(commonCopy.developmentNotice, locale)}</p>
            </div>
          </div>
          <FactList facts={projectFacts} locale={locale} />
        </>
      );
    case 'platform':
      return (
        <>
          <div className="content-grid content-grid--intro">
            <div>
              <p className="eyebrow">{ro ? 'Fundație existentă' : 'Existing foundation'}</p>
              <h2>{ro ? 'De la CerviGuard la TealGuard' : 'From CerviGuard to TealGuard'}</h2>
              <p>{ro
                ? 'CerviGuard reunește deja într-un flux funcțional de screening preluarea structurată a cazurilor, procesarea imaginilor, accesul controlat pe roluri, starea procesării și istoricul cazului. TealGuard va extinde și valida această fundație prin cele patru module planificate și prin controale comune pentru interoperabilitate, guvernanță și implementare.'
                : 'CerviGuard already brings together structured case intake, image processing, role-controlled access, processing status and case history in a working screening workflow. TealGuard will extend and validate that foundation through the four planned modules and shared interoperability, governance and deployment controls.'}</p>
              <Link className="text-link" href={`/${locale}/baseline`}>
                {ro ? 'Consultați dovezile tehnologice datate' : 'Review the dated technology evidence'}
                <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
            <div className="callout">
              <span>{ro ? 'CerviGuard astăzi' : 'CerviGuard today'}</span>
              <strong>{ro ? 'Un flux funcțional de screening' : 'A working screening workflow'}</strong>
              <p>{ro
                ? 'Dovezile publicate arată interfețe sintetice pentru preluarea și verificarea cazurilor. Acestea nu stabilesc performanța clinică sau pregătirea finală a produsului.'
                : 'The published evidence shows synthetic case-intake and review interfaces. It does not establish clinical performance or final product readiness.'}</p>
            </div>
          </div>
          <Modules locale={locale} />
          <ArchitectureLayers locale={locale} />
          <EvidenceFigure
            locale={locale}
            src="/images/diagrams/tealguard-deep-tech-architecture.png"
            alt={ro ? 'Arhitectura tehnică TealGuard de la intrări clinice la rezultate operaționale' : 'TealGuard technical architecture from clinical inputs to operational outputs'}
            caption={ro ? 'Componente selectate ale arhitecturii propuse. Configurațiile de securitate și detaliile sensibile de implementare nu sunt publice.' : 'Selected components of the proposed architecture. Security configurations and sensitive deployment details are not public.'}
            title={ro ? 'Arhitectura tehnică' : 'Technical architecture'}
            collapsed={ro}
          />
        </>
      );
    case 'validation':
      return (
        <>
          <div className="target-warning">
            <strong>{ro ? 'Obiective, nu rezultate curente' : 'Targets, not current results'}</strong>
            <p>{ro ? 'Documentul din dosarul proiectului „TRL6_CerviGuard.docx”, datat 13 ianuarie 2026, consemnează CerviGuard la TRL 6 drept punct de plecare. Codul și capturile publice confirmă existența aplicației, dar nu validează independent demonstrarea într-un mediu relevant sau performanța clinică. Integrarea la TRL 7, validarea prospectivă la TRL 8 și operarea la TRL 9 rămân obiective ale programului.' : 'The project-dossier document “TRL6_CerviGuard.docx”, dated 13 January 2026, records CerviGuard at TRL 6 as the starting point. Public code and captures confirm that the application exists, but do not independently validate demonstration in a relevant environment or clinical performance. TRL 7 integration, TRL 8 prospective validation and TRL 9 operation remain programme targets.'}</p>
            <Link className="text-link target-warning__link" href={`/${locale}/baseline`}>
              {ro ? 'Consultați dovezile tehnologice și limitele lor' : 'Review the technology evidence and its limits'}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <Targets locale={locale} />
          <EvidenceFigure
            locale={locale}
            src="/images/diagrams/tealguard-impact-roadmap.png"
            alt={ro ? 'Foaie de parcurs cu obiectivele TealGuard de la TRL 6 la TRL 9' : 'Roadmap of TealGuard targets from TRL 6 to TRL 9'}
            caption={ro ? 'Foaia de parcurs contractuală. Niciun indicator din diagramă nu este prezentat ca rezultat obținut.' : 'Contractual target roadmap. No indicator in the diagram is presented as an achieved result.'}
            title={ro ? 'Foaia de parcurs contractuală' : 'Contractual target roadmap'}
            collapsed={ro}
          />
        </>
      );
    case 'baseline':
      return <BaselineEvidence locale={locale} />;
    case 'progress':
      return (
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <article key={`${milestone.state}-${index}`}>
              <div className={`timeline__marker timeline__marker--${milestone.state}`} aria-hidden="true" />
              <div className="timeline__date">{text(milestone.date, locale)}</div>
              <div>
                <span className={`status-label status-label--${milestone.state}`}>{text(stateCopy[milestone.state], locale)}</span>
                <h2>{text(milestone.title, locale)}</h2>
                <p>{text(milestone.description, locale)}</p>
              </div>
            </article>
          ))}
        </div>
      );
    case 'outputs':
      return (
        <>
          <div className="output-list">
            {outputRegistry.map((output) => (
              <article key={text(output.type, locale)}>
                <span>{output.target}</span>
                <div><h2>{text(output.type, locale)}</h2><p>{text(output.state, locale)}</p></div>
                <Download aria-hidden="true" />
              </article>
            ))}
          </div>
          <p className="empty-state">{ro ? 'Nu există încă rezultate publice aprobate pentru descărcare.' : 'There are no approved public outputs available for download yet.'}</p>
        </>
      );
    case 'news':
      return (
        <article className="news-list-item">
          <Image
            src="/images/diagrams/tealguard-deep-tech-architecture.png"
            width={1857}
            height={948}
            alt={ro ? 'Arhitectura deep-tech propusă pentru TealGuard' : 'Proposed TealGuard deep-tech architecture'}
          />
          <div>
            <p className="eyebrow">26.08.2026 · {ro ? 'Contract semnat' : 'Contract signed'}</p>
            <h2>{ro ? 'TealGuard intră oficial în implementare' : 'TealGuard officially enters implementation'}</h2>
            <p>{ro ? 'Aflați cum TealGuard pornește de la fluxul funcțional de screening CerviGuard și definește cele patru module planificate, arhitectura tehnică și obiectivele contractuale de validare.' : "Read how TealGuard starts from CerviGuard's working screening workflow and sets out the four planned modules, technical architecture and contractual validation targets."}</p>
            <a className="text-link" href={siteConfig.announcementUrls[locale]} target="_blank" rel="noreferrer">
              {text(commonCopy.readUpdate, locale)} <ExternalLink aria-hidden="true" size={15} />
            </a>
          </div>
        </article>
      );
    case 'consortium':
      return (
        <div className="consortium-list">
          <article>
            <div className="partner-logo-wrap"><Image src="/images/partners/affidea.svg" alt="Affidea" width={256} height={77} /></div>
            <div>
              <p className="eyebrow">{ro ? 'Lider de consorțiu' : 'Consortium lead'}</p>
              <h2>HIPERDIA SA</h2>
              <p>{ro ? 'HIPERDIA SA, parte a rețelei Affidea, coordonează proiectul și contribuie cu expertiza clinică și operațională necesară cercetării și validării.' : 'HIPERDIA SA, part of the Affidea network, leads the project and contributes the clinical and operational expertise required for research and validation.'}</p>
              <a className="text-link" href={siteConfig.affideaUrl} target="_blank" rel="noreferrer">Affidea Romania <ExternalLink aria-hidden="true" size={15} /></a>
            </div>
          </article>
          <article>
            <div className="partner-logo-wrap"><Image className="smartclover-mark" src="/images/partners/smartclover.png" alt="SmartClover" width={124} height={124} /></div>
            <div>
              <p className="eyebrow">{ro ? 'Partener AI și deep tech' : 'AI and deep-tech partner'}</p>
              <h2>SmartClover SRL</h2>
              <p>{ro ? 'SmartClover contribuie la proiectarea și dezvoltarea modulelor AI, a fundației tehnice și a mecanismelor de operare la marginea rețelei.' : 'SmartClover contributes to the design and development of the AI modules, technical foundation and edge-operation mechanisms.'}</p>
              <a className="text-link" href={siteConfig.smartCloverUrl} target="_blank" rel="noreferrer">smartclover.ro <ExternalLink aria-hidden="true" size={15} /></a>
            </div>
          </article>
        </div>
      );
    case 'funding':
      return (
        <>
          <FactList facts={fundingFacts} locale={locale} />
          <div className="funding-explanation">
            <h2>{ro ? 'Contextul finanțării' : 'Funding context'}</h2>
            <p>{ro ? 'TealGuard este cofinanțat de Uniunea Europeană prin Fondul European de Dezvoltare Regională, în cadrul Programului Sănătate 2021–2027, Prioritatea 9, RSO1.6, Acțiunea B.' : 'TealGuard is co-funded by the European Union through the European Regional Development Fund under the Health Programme 2021–2027, Priority 9, RSO1.6, Action B.'}</p>
            <p>{ro ? 'Valorile sunt prezentate la nivelul întregului proiect de consorțiu.' : 'The values are presented for the consortium project as a whole.'}</p>
            <a className="button button--dark" href={siteConfig.programmeUrl} target="_blank" rel="noreferrer">{ro ? 'Sursa programului' : 'Programme source'} <ExternalLink aria-hidden="true" size={15} /></a>
          </div>
          <div className="authority-links">
            <h2>{ro ? 'Informații despre fondurile europene' : 'European funding information'}</h2>
            <p>{ro ? 'Pentru informații detaliate despre celelalte programe cofinanțate de Uniunea Europeană, vă invităm să vizitați:' : 'For detailed information about other programmes co-funded by the European Union, visit:'}</p>
            <a href={siteConfig.ministryUrl} target="_blank" rel="noreferrer">Ministerul Investițiilor și Proiectelor Europene <ExternalLink aria-hidden="true" size={15} /></a>
            <a href={siteConfig.opportunitiesUrl} target="_blank" rel="noreferrer">Oportunități UE <ExternalLink aria-hidden="true" size={15} /></a>
            <a href={siteConfig.euFundsUrl} target="_blank" rel="noreferrer">Fonduri UE <ExternalLink aria-hidden="true" size={15} /></a>
          </div>
        </>
      );
    case 'trust':
      return (
        <>
          <div className="principle-list">
            {trustPrinciples.map((principle, index) => (
              <article key={index}><span>{String(index + 1).padStart(2, '0')}</span><p>{text(principle, locale)}</p></article>
            ))}
          </div>
          <div className="target-warning">
            <strong>{ro ? 'Limită clinică' : 'Clinical boundary'}</strong>
            <p>{text(commonCopy.developmentNotice, locale)}</p>
          </div>
        </>
      );
    case 'privacy':
      return (
        <div className="prose">
          <h2>{ro ? 'Operatorul site-ului și operatorul de date' : 'Website operator and data controller'}</h2>
          <p><strong>{siteConfig.legalName}</strong><br />{siteConfig.registeredAddress}<br />CUI {siteConfig.taxId} · ONRC {siteConfig.tradeRegister}<br /><a className="text-link" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></p>
          <p>{ro ? 'SmartClover SRL este operatorul datelor prelucrate prin acest site public și prin corespondența trimisă la adresa de contact. Acest site nu colectează date clinice pentru proiectul TealGuard.' : 'SmartClover SRL controls the data processed through this public website and correspondence sent to the contact address. This website does not collect clinical data for the TealGuard project.'}</p>
          <h2>{ro ? 'Ce date procesează acest site' : 'What data this website processes'}</h2>
          <p>{ro ? 'Versiunea publică inițială nu folosește conturi, formulare, instrumente de analiză sau trackere publicitare. Serverul de găzduire poate păstra temporar jurnale tehnice, precum adresa IP, ruta solicitată, ora și informații despre browser, pentru securitate și operare.' : 'The initial public release uses no accounts, forms, analytics or advertising trackers. The hosting server may temporarily retain technical logs such as IP address, requested path, time and browser information for security and operation.'}</p>
          <h2>{ro ? 'Scop, temei juridic și păstrare' : 'Purpose, legal basis and retention'}</h2>
          <p>{ro ? 'Jurnalele tehnice sunt prelucrate pentru securitatea și funcționarea site-ului, în baza interesului legitim al SmartClover. Sunt păstrate numai atât timp cât este necesar pentru operare, investigarea incidentelor și obligațiile legale aplicabile. Datele din corespondență sunt prelucrate pentru a răspunde solicitării și, unde este cazul, pentru demersuri precontractuale. Sunt păstrate pe durata necesară soluționării și urmăririi solicitării sau pentru perioada impusă de o obligație legală.' : 'Technical logs are processed to secure and operate the website under SmartClover’s legitimate interests. They are retained only as long as needed for operation, incident investigation and applicable legal obligations. Correspondence data is processed to answer the enquiry and, where relevant, to take pre-contractual steps. It is retained for the time needed to resolve and follow up the enquiry or for a period required by law.'}</p>
          <h2>{ro ? 'Contact prin e-mail' : 'Contact by email'}</h2>
          <p>{ro ? 'Dacă ne contactați prin e-mail, SmartClover va folosi datele furnizate pentru a răspunde solicitării. Nu transmiteți date medicale, documente clinice sau solicitări de îngrijire.' : 'If you contact us by email, SmartClover will use the information you provide to answer the enquiry. Do not send medical data, clinical documents or requests for care.'}</p>
          <h2>{ro ? 'Furnizori și transferuri' : 'Providers and transfers'}</h2>
          <p>{ro ? 'Furnizorii de găzduire și e-mail pot prelucra date tehnice sau de corespondență în numele SmartClover. Atunci când un furnizor implică un transfer în afara Spațiului Economic European, SmartClover aplică mecanismul de transfer cerut de legislația aplicabilă. Puteți solicita informații despre furnizorii și garanțiile curente prin adresa de contact.' : 'Hosting and email providers may process technical or correspondence data on SmartClover’s behalf. Where a provider involves a transfer outside the European Economic Area, SmartClover applies the transfer mechanism required by applicable law. Current provider and safeguard information is available through the contact address.'}</p>
          <h2>{ro ? 'Drepturile dumneavoastră' : 'Your rights'}</h2>
          <p>{ro ? 'Puteți solicita accesul, rectificarea, ștergerea sau restricționarea datelor și vă puteți opune prelucrării. Portabilitatea și retragerea consimțământului se aplică atunci când temeiul juridic și tipul datelor le fac relevante. Acest site nu ia decizii automate despre vizitatori.' : 'You may request access, correction, erasure or restriction and may object to processing. Portability and withdrawal of consent apply where the legal basis and data type make them relevant. This website makes no automated decisions about visitors.'}</p>
          <p>{ro ? 'Puteți depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal.' : 'You may lodge a complaint with the Romanian National Supervisory Authority for Personal Data Processing.'}</p>
          <a className="text-link" href={siteConfig.dataProtectionAuthorityUrl} target="_blank" rel="noreferrer">www.dataprotection.ro <ExternalLink aria-hidden="true" size={15} /></a>
          <h2>{ro ? 'Întrebări și solicitări privind confidențialitatea' : 'Privacy enquiries and requests'}</h2>
          <a className="text-link" href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail} <Mail aria-hidden="true" size={15} /></a>
        </div>
      );
    case 'accessibility':
      return (
        <div className="prose">
          <h2>{ro ? 'Obiectivul nostru' : 'Our target'}</h2>
          <p>{ro ? 'Urmărim conformitatea cu WCAG 2.2 nivel AA. Conținutul principal rămâne disponibil fără animație, WebGL sau JavaScript, iar controalele interactive sunt proiectate pentru tastatură și tehnologii asistive.' : 'We target WCAG 2.2 Level AA. Core content remains available without animation, WebGL or JavaScript, and interactive controls are designed for keyboard and assistive technology use.'}</p>
          <h2>{ro ? 'Semnalează o problemă' : 'Report a problem'}</h2>
          <p>{ro ? 'Descrieți pagina, dispozitivul și tehnologia asistivă folosită. Vom investiga problemele de accesibilitate care pot fi reproduse.' : 'Describe the page, device and assistive technology used. We will investigate accessibility problems that can be reproduced.'}</p>
          <a className="button button--dark" href={`mailto:${siteConfig.contactEmail}?subject=TealGuard%20accessibility`}>{ro ? 'Trimite un e-mail' : 'Send an email'} <Mail aria-hidden="true" size={15} /></a>
        </div>
      );
    case 'contact':
      return (
        <div className="contact-panel">
          <div>
            <p className="eyebrow">SmartClover SRL</p>
            <h2>{ro ? 'Contact pentru proiect' : 'Project contact'}</h2>
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </div>
          <div>
            <p>{ro ? 'Pentru discuții despre cercetare, tehnologie, program, presă sau colaborare, includeți contextul și organizația în mesaj.' : 'For research, technology, programme, media or collaboration enquiries, include your context and organisation in the message.'}</p>
            <p className="contact-warning">{ro ? 'Nu transmiteți date medicale sau solicitări de îngrijire.' : 'Do not send medical data or requests for care.'}</p>
            <a className="button button--primary" href={`mailto:${siteConfig.contactEmail}?subject=TealGuard%20project%20enquiry`}>{ro ? 'Contactați-ne' : 'Email us'} <Mail aria-hidden="true" size={16} /></a>
          </div>
        </div>
      );
  }
}

export function SectionPage({ slug, locale }: { slug: SectionSlug; locale: Locale }) {
  const copy = sectionCopy[slug];

  return (
    <main>
      <section className="page-hero">
        <div className="shell page-hero__inner">
          <p className="eyebrow">{text(copy.eyebrow, locale)}</p>
          <h1>{text(copy.title, locale)}</h1>
          <p>{text(copy.introduction, locale)}</p>
          <div className="page-hero__meta"><span>TealGuard</span><span>SMIS 358561</span><span>{text(commonCopy.lastUpdated, locale)}</span></div>
        </div>
      </section>
      <section className="page-content section">
        <div className="shell">
          <SectionBody slug={slug} locale={locale} />
          {slug !== 'contact' ? (
            <div className="next-action">
              <span>{locale === 'ro' ? 'Urmăriți implementarea' : 'Follow implementation'}</span>
              <Link className="text-link" href={`/${locale}/progress`}>
                {text(commonCopy.viewProgress, locale)} <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

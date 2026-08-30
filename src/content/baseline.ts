import type { Locale } from '@/lib/site';

type LocalizedText = Record<Locale, string>;

const localized = (en: string, ro: string): LocalizedText => ({ en, ro });

export const cerviGuardRelease = {
  version: '0.4.11',
  sourceRevision: '8274b00929c5072438354502ee7ad454dd62a8da',
  sourceUrl:
    'https://github.com/SmartCloverAI/CerviGuard/tree/8274b00929c5072438354502ee7ad454dd62a8da',
  liveUrl: 'https://cerviguard.link/login',
  observedAt: localized('28 August 2026, 11:22 UTC', '28 august 2026, 11:22 UTC'),
  manifestUrl: '/evidence/cerviguard-baseline-manifest_v1.json',
  historicalRevision: '20a03dd2fd5a454f6f7cb3fe3b857f3199b96cef',
  historicalSourceUrl:
    'https://github.com/SmartCloverAI/CerviGuard/tree/20a03dd2fd5a454f6f7cb3fe3b857f3199b96cef',
  dossierTitle: 'TRL6_CerviGuard.docx',
  dossierDate: localized('13 January 2026', '13 ianuarie 2026')
} as const;

export const baselineCopy = {
  scopeHeading: localized('What CerviGuard already includes', 'Ce include deja CerviGuard'),
  scopeIntroduction: localized(
    'CerviGuard provides the existing software foundation for TealGuard. The programme will extend it through four planned modules and clinical validation.',
    'CerviGuard oferă fundația software existentă pentru TealGuard. Programul o va extinde prin patru module planificate și validare clinică.'
  ),
  capturesHeading: localized('CerviGuard screenshots', 'Capturi de ecran CerviGuard'),
  capturesIntroduction: localized(
    'Screenshots from CerviGuard v0.4.11 show structured case intake and model-output review. The screens use demonstration data.',
    'Capturile de ecran din CerviGuard v0.4.11 prezintă preluarea structurată a cazurilor și verificarea rezultatelor modelelor. Ecranele folosesc date demonstrative.'
  ),
  inventoryHeading: localized('CerviGuard sources and links', 'Surse și legături CerviGuard'),
  inventoryIntroduction: localized(
    'These links provide the application source available before TealGuard, the current source, the CerviGuard sign-in page and model-development code.',
    'Aceste legături oferă codul aplicației disponibil înainte de TealGuard, codul actual, pagina de autentificare CerviGuard și codul pentru dezvoltarea modelelor.'
  ),
  trlHeading: localized("CerviGuard's TRL 6 starting point", 'Punctul de plecare TRL 6 al CerviGuard'),
  trlBody: localized(
    'The TealGuard project dossier includes “TRL6_CerviGuard.docx”, dated 13 January 2026. It records CerviGuard as a TRL 6 prototype and is the source for the programme\'s starting-level statement. The public source and screenshots document the application but do not independently validate operation in a relevant environment or the TRL assignment.',
    'Dosarul proiectului TealGuard include documentul „TRL6_CerviGuard.docx”, datat 13 ianuarie 2026. Acesta consemnează CerviGuard drept prototip TRL 6 și este sursa afirmației privind nivelul inițial al programului. Codul și capturile de ecran publice documentează aplicația, dar nu validează independent funcționarea într-un mediu relevant sau atribuirea TRL.'
  ),
  supportsHeading: localized('What the public material shows', 'Ce prezintă materialele publice'),
  limitsHeading: localized('What the public material does not show', 'Ce nu prezintă materialele publice'),
  manifestLabel: localized('Open the machine-readable evidence manifest', 'Deschideți manifestul de dovezi într-un format prelucrabil automat'),
  ecLabel: localized('European Commission TRL definitions', 'Definițiile TRL ale Comisiei Europene')
} as const;

export const baselineScope = [
  {
    id: 'historical',
    state: 'existing',
    label: localized('Before project start', 'Înaintea începerii proiectului'),
    title: localized('CerviGuard application code', 'Codul aplicației CerviGuard'),
    description: localized(
      'A public source revision dated 11 May 2026 predates TealGuard implementation and contains authenticated intake and AI-output review workflows.',
      'O revizie publică a codului, datată 11 mai 2026, precedă implementarea TealGuard și conține fluxuri autentificate pentru preluare și verificarea rezultatelor AI.'
    )
  },
  {
    id: 'current',
    state: 'current',
    label: localized('Current public release', 'Versiunea publică actuală'),
    title: localized('CerviGuard v0.4.11', 'CerviGuard v0.4.11'),
    description: localized(
      'Version 0.4.11 includes owner-or-administrator case controls, focused access-control tests and clear boundaries for demonstration data. It was released after TealGuard implementation began.',
      'Versiunea 0.4.11 include acces la cazuri pentru proprietar sau administrator, teste focalizate ale controlului accesului și delimitări clare pentru datele demonstrative. A fost publicată după începerea implementării TealGuard.'
    )
  },
  {
    id: 'planned',
    state: 'planned',
    label: localized('Programme work', 'Activitate în program'),
    title: localized('Four integrated TealGuard modules', 'Patru module TealGuard integrate'),
    description: localized(
      'System integration, multi-site implementation, prospective validation and progression toward the programme maturity targets.',
      'Integrarea sistemului, implementarea în mai multe locații, validarea prospectivă și progresul către obiectivele de maturitate ale programului.'
    )
  }
] as const;

export const baselineCaptures = [
  {
    id: 'structured-intake',
    src: '/images/evidence/cerviguard/2026-08-28/cerviguard-structured-intake-demo_v1.png',
    width: 1440,
    height: 960,
    sha256: 'bc54263ff8847227e30feff84f6c2368ce711a8ed32e5062a5920b9c202a5d09',
    title: localized('CerviGuard case intake', 'Preluarea cazului în CerviGuard'),
    alt: localized(
      'CerviGuard v0.4.11 case-intake screen showing an authenticated cervical-screening form, privacy guidance and the demonstration banner.',
      'Ecran CerviGuard v0.4.11 pentru preluarea unui caz de screening cervical, cu formular autentificat, instrucțiuni de confidențialitate și marcajul pentru demonstrație.'
    ),
    caption: localized(
      'CerviGuard v0.4.11 screenshot.',
      'Captură de ecran CerviGuard v0.4.11.'
    ),
    supports: localized(
      'A working, authenticated case-intake screen with upload limits and de-identification guidance.',
      'Un ecran funcțional și autentificat pentru preluarea cazurilor, cu limite de încărcare și instrucțiuni de de-identificare.'
    )
  },
  {
    id: 'clinician-review',
    src: '/images/evidence/cerviguard/2026-08-28/cerviguard-clinician-review-demo_v1.png',
    width: 1200,
    height: 1257,
    sha256: '451a5f6adfb5f60a24cd651517dd45790de3bd0b56a9b40210c8fafb451e4155',
    title: localized('CerviGuard case review', 'Verificarea cazului în CerviGuard'),
    alt: localized(
      'CerviGuard v0.4.11 case-review screen with case metadata, an image placeholder, demonstration model outputs and a qualified-professional decision boundary.',
      'Ecran CerviGuard v0.4.11 pentru verificarea unui caz, cu metadate, un substitut pentru imagine, rezultate demonstrative ale modelelor și limita decizională rezervată profesioniștilor calificați.'
    ),
    caption: localized(
      'CerviGuard v0.4.11 screenshot.',
      'Captură de ecran CerviGuard v0.4.11.'
    ),
    supports: localized(
      'A working review screen that displays model outputs while leaving interpretation and follow-up decisions to qualified professionals.',
      'Un ecran funcțional de verificare, care afișează rezultatele modelelor și păstrează interpretarea și deciziile de monitorizare la profesioniști calificați.'
    )
  }
] as const;

export const baselineArtifacts = [
  {
    id: 'historical-application-source',
    kind: localized('Pre-project application source', 'Cod al aplicației anterior proiectului'),
    title: localized('CerviGuard source before TealGuard implementation', 'Cod CerviGuard anterior implementării TealGuard'),
    description: localized(
      'Authored on 11 May 2026, this revision contains the application and core workflow before TealGuard began. It predates the current owner/admin case-access controls and should not be used to assess current security controls.',
      'Creată la 11 mai 2026, această revizie conține aplicația și fluxurile de bază anterioare începerii TealGuard. Ea precedă controalele actuale de acces la cazuri pentru proprietar și administrator și nu trebuie utilizată pentru evaluarea controalelor de securitate actuale.'
    ),
    href: cerviGuardRelease.historicalSourceUrl,
    identifier: cerviGuardRelease.historicalRevision,
    action: localized('Open historical source', 'Deschideți codul istoric'),
    immutable: true
  },
  {
    id: 'application-source',
    kind: localized('Current application source', 'Codul actual al aplicației'),
    title: localized('CerviGuard v0.4.11 source', 'Codul CerviGuard v0.4.11'),
    description: localized(
      'This pinned revision contains the current workflow and focused owner/admin access-control tests. Released after 19 August 2026, it does not represent CerviGuard\'s state when TealGuard began.',
      'Această revizie fixată conține fluxul actual și testele focalizate ale controalelor de acces pentru proprietar și administrator. Publicată după 19 august 2026, ea nu reprezintă starea CerviGuard la începutul TealGuard.'
    ),
    href: cerviGuardRelease.sourceUrl,
    identifier: cerviGuardRelease.sourceRevision,
    action: localized('Open current source', 'Deschideți codul actual'),
    immutable: true
  },
  {
    id: 'live-surface',
    kind: localized('Live surface', 'Interfață publică'),
    title: localized('CerviGuard sign-in', 'Autentificare CerviGuard'),
    description: localized(
      'CerviGuard v0.4.11 was available at this public URL on 28 August 2026 at 11:22 UTC. The live application may change as new versions are released.',
      'CerviGuard v0.4.11 era disponibil la această adresă publică la 28 august 2026, ora 11:22 UTC. Aplicația publică se poate schimba odată cu publicarea unor versiuni noi.'
    ),
    href: cerviGuardRelease.liveUrl,
    identifier: 'CerviGuard v0.4.11 · 28 August 2026',
    action: localized('Open live surface', 'Deschideți interfața publică'),
    immutable: false
  },
  {
    id: 'model-source',
    kind: localized('Model-development source', 'Cod pentru dezvoltarea modelelor'),
    title: localized('CerviGuardModels source revision', 'Revizia sursă CerviGuardModels'),
    description: localized(
      'Pinned public source for model-development workflows. This repository does not identify deployment weights or report model performance.',
      'Cod public fixat pentru fluxurile de dezvoltare a modelelor. Acest depozit nu identifică ponderile utilizate într-o implementare și nu raportează performanța modelelor.'
    ),
    href: 'https://github.com/SmartCloverAI/CerviGuardModels/tree/4d1a28c58f538c0d8045acb3c268c2f465b43677',
    identifier: '4d1a28c58f538c0d8045acb3c268c2f465b43677',
    action: localized('Open model-development source', 'Deschideți codul pentru dezvoltarea modelelor'),
    immutable: true
  }
] as const;

export const evidenceSupports = [
  localized('A public CerviGuard application revision that predates TealGuard implementation.', 'O revizie publică a aplicației CerviGuard anterioară implementării TealGuard.'),
  localized('A current CerviGuard revision with focused access-control tests.', 'O revizie actuală CerviGuard, cu teste focalizate ale controlului accesului.'),
  localized('CerviGuard case-intake and model-output review screenshots.', 'Capturi de ecran CerviGuard pentru preluarea cazurilor și verificarea rezultatelor modelelor.'),
  localized('A dated, publicly reachable CerviGuard v0.4.11 sign-in surface.', 'O interfață publică de autentificare CerviGuard v0.4.11, observată la o dată precisă.'),
  localized('Pinned model-development source code.', 'Cod fixat pentru dezvoltarea modelelor.')
] as const;

export const evidenceLimits = [
  localized('Clinical sensitivity, specificity, diagnostic performance or patient outcomes.', 'Sensibilitate, specificitate, performanță diagnostică sau efecte asupra pacientelor.'),
  localized('Medical-device conformity, production readiness or production-security assurance.', 'Conformitate ca dispozitiv medical, pregătire pentru producție sau asigurarea securității în producție.'),
  localized('The model weights used by any current or historical deployment.', 'Ponderile modelelor utilizate de orice implementare actuală sau istorică.'),
  localized('Operational adoption or completed TealGuard modules.', 'Adopție operațională sau module TealGuard finalizate.'),
  localized('Independent confirmation of TRL 5/6 or demonstration in a relevant environment.', 'Confirmarea independentă a TRL 5/6 sau demonstrarea într-un mediu relevant.')
] as const;

export const baselineText = (value: LocalizedText, locale: Locale) => value[locale];

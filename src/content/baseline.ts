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
  scopeHeading: localized('What can be inspected today', 'Ce poate fi verificat în prezent'),
  scopeIntroduction: localized(
    'This dated record separates CerviGuard code that predates TealGuard, the current hardened release and the work funded through the programme.',
    'Această evidență datată separă codul CerviGuard anterior proiectului TealGuard, versiunea actuală consolidată și activitatea finanțată prin program.'
  ),
  capturesHeading: localized('Dated interface evidence', 'Dovezi datate ale interfeței'),
  capturesIntroduction: localized(
    'SmartClover produced both captures from a local production build configured for synthetic demonstration. The account, case, values and image placeholder contain no patient data.',
    'SmartClover a realizat ambele capturi dintr-o versiune locală de producție configurată pentru demonstrație cu date sintetice. Contul, cazul, valorile și substitutul imaginii nu conțin date ale pacientelor.'
  ),
  inventoryHeading: localized('Verification sources', 'Surse pentru verificare'),
  inventoryIntroduction: localized(
    'The record distinguishes pre-project source, the current hardened revision, a dated live observation and model-development source. A deployment URL remains mutable.',
    'Evidența distinge codul anterior proiectului, revizia actuală consolidată, o observație datată a aplicației publice și codul pentru dezvoltarea modelelor. Adresa unei implementări rămâne schimbătoare.'
  ),
  trlHeading: localized('Where the TRL 6 statement comes from', 'Sursa afirmației privind TRL 6'),
  trlBody: localized(
    'The TealGuard project dossier includes “TRL6_CerviGuard.docx”, dated 13 January 2026, which records CerviGuard as a TRL 6 prototype. That dossier is the source of the starting-level statement. The public artifacts here confirm pre-project application code and a dated current release; they do not independently demonstrate operation in a relevant environment or validate the TRL assignment.',
    'Dosarul proiectului TealGuard include documentul „TRL6_CerviGuard.docx”, datat 13 ianuarie 2026, care consemnează CerviGuard drept prototip TRL 6. Acest document este sursa afirmației privind nivelul inițial. Artefactele publice de aici confirmă existența codului aplicației înaintea proiectului și o versiune actuală datată; ele nu demonstrează independent funcționarea într-un mediu relevant și nu validează atribuirea TRL.'
  ),
  supportsHeading: localized('This public record supports', 'Aceste dovezi publice susțin'),
  limitsHeading: localized('This public record does not establish', 'Aceste dovezi publice nu stabilesc'),
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
    title: localized('Hardened workflow evidence', 'Dovezi ale fluxului consolidat'),
    description: localized(
      'Version 0.4.11 adds owner-or-administrator case controls, focused access-control tests and explicit synthetic-demo boundaries. It was released after TealGuard implementation began.',
      'Versiunea 0.4.11 adaugă acces la cazuri pentru proprietar sau administrator, teste focalizate ale controlului accesului și delimitări explicite pentru demonstrația sintetică. A fost publicată după începerea implementării TealGuard.'
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
    title: localized('Structured case intake', 'Preluarea structurată a cazului'),
    alt: localized(
      'Synthetic CerviGuard demonstration showing an authenticated cervical-screening case-intake form, privacy guidance and the demo-only banner.',
      'Demonstrație sintetică CerviGuard cu un formular autentificat pentru preluarea unui caz de screening cervical, instrucțiuni de confidențialitate și marcajul pentru demonstrație.'
    ),
    caption: localized(
      'Publisher-produced capture of CerviGuard v0.4.11, made on 28 August 2026 from a local production build configured for synthetic demonstration. No patient data or clinical result is shown.',
      'Captură realizată de SmartClover din CerviGuard v0.4.11 la 28 august 2026, folosind o versiune locală de producție configurată pentru demonstrație sintetică. Nu sunt afișate date ale pacientelor sau rezultate clinice.'
    ),
    supports: localized(
      'An implemented, authenticated intake surface with upload boundaries and de-identification guidance.',
      'O interfață autentificată și implementată pentru preluarea cazurilor, cu limite de încărcare și instrucțiuni de de-identificare.'
    )
  },
  {
    id: 'clinician-review',
    src: '/images/evidence/cerviguard/2026-08-28/cerviguard-clinician-review-demo_v1.png',
    width: 1200,
    height: 1257,
    sha256: '451a5f6adfb5f60a24cd651517dd45790de3bd0b56a9b40210c8fafb451e4155',
    title: localized('Model-output review', 'Verificarea rezultatelor modelelor'),
    alt: localized(
      'Synthetic CerviGuard review screen with case metadata, a patient-image placeholder, demonstration model outputs and a qualified-professional decision boundary.',
      'Ecran sintetic CerviGuard pentru verificarea unui caz, cu metadate, un substitut pentru imaginea pacientei, rezultate demonstrative ale modelelor și limita decizională rezervată profesioniștilor calificați.'
    ),
    caption: localized(
      'Synthetic interface evidence from CerviGuard v0.4.11. The displayed classifications and confidence values are demonstration data, not clinical findings or model-performance results.',
      'Dovadă sintetică a interfeței CerviGuard v0.4.11. Clasificările și valorile de încredere afișate sunt date demonstrative, nu constatări clinice sau rezultate privind performanța modelelor.'
    ),
    supports: localized(
      'An implemented review surface that presents model outputs while keeping interpretation and follow-up decisions with qualified professionals.',
      'O interfață de verificare implementată, care prezintă rezultatele modelelor și păstrează interpretarea și deciziile de monitorizare la profesioniști calificați.'
    )
  }
] as const;

export const baselineArtifacts = [
  {
    id: 'historical-application-source',
    kind: localized('Pre-project application source', 'Cod al aplicației anterior proiectului'),
    title: localized('CerviGuard source before TealGuard implementation', 'Cod CerviGuard anterior implementării TealGuard'),
    description: localized(
      'This revision was authored on 11 May 2026. It establishes that application code and core workflow surfaces predate TealGuard, but it predates the current owner/admin case-access controls and is not security evidence.',
      'Această revizie a fost creată la 11 mai 2026. Ea confirmă că aplicația și fluxurile de bază precedă TealGuard, dar este anterioară controalelor actuale de acces la cazuri pentru proprietar și administrator și nu reprezintă o dovadă de securitate.'
    ),
    href: cerviGuardRelease.historicalSourceUrl,
    identifier: cerviGuardRelease.historicalRevision,
    action: localized('Open historical source', 'Deschideți codul istoric'),
    immutable: true
  },
  {
    id: 'application-source',
    kind: localized('Current application source', 'Codul actual al aplicației'),
    title: localized('CerviGuard v0.4.11 hardened revision', 'Revizia consolidată CerviGuard v0.4.11'),
    description: localized(
      'Pinned source for the current workflow and focused owner/admin access-control tests. This post-start revision must not be mistaken for the application state on 19 August 2026.',
      'Cod fixat pentru fluxul actual și testele focalizate ale controalelor de acces pentru proprietar și administrator. Această revizie ulterioară începerii proiectului nu trebuie confundată cu starea aplicației din 19 august 2026.'
    ),
    href: cerviGuardRelease.sourceUrl,
    identifier: cerviGuardRelease.sourceRevision,
    action: localized('Open current source', 'Deschideți codul actual'),
    immutable: true
  },
  {
    id: 'live-surface',
    kind: localized('Live surface', 'Interfață publică'),
    title: localized('CerviGuard sign-in surface', 'Interfața de autentificare CerviGuard'),
    description: localized(
      'Version 0.4.11 was observed at the public URL on 28 August 2026 at 11:22 UTC. The URL is mutable and is not a cryptographic link to the source revision.',
      'Versiunea 0.4.11 a fost observată la adresa publică la 28 august 2026, ora 11:22 UTC. Adresa este schimbătoare și nu reprezintă o legătură criptografică cu revizia sursă.'
    ),
    href: cerviGuardRelease.liveUrl,
    identifier: 'Observed v0.4.11 · mutable',
    action: localized('Open live surface', 'Deschideți interfața publică'),
    immutable: false
  },
  {
    id: 'model-source',
    kind: localized('Model-development source', 'Cod pentru dezvoltarea modelelor'),
    title: localized('CerviGuardModels source revision', 'Revizia sursă CerviGuardModels'),
    description: localized(
      'Pinned public source for model-development workflows. It does not identify the weights used by a deployment or establish model performance.',
      'Cod public fixat pentru fluxurile de dezvoltare a modelelor. Nu identifică ponderile utilizate de o implementare și nu stabilește performanța modelelor.'
    ),
    href: 'https://github.com/SmartCloverAI/CerviGuardModels/tree/4d1a28c58f538c0d8045acb3c268c2f465b43677',
    identifier: '4d1a28c58f538c0d8045acb3c268c2f465b43677',
    action: localized('Open model-development source', 'Deschideți codul pentru dezvoltarea modelelor'),
    immutable: true
  }
] as const;

export const evidenceSupports = [
  localized('A public CerviGuard application revision that predates TealGuard implementation.', 'O revizie publică a aplicației CerviGuard anterioară implementării TealGuard.'),
  localized('A current hardened application revision with focused access-control tests.', 'O revizie actuală consolidată a aplicației, cu teste focalizate ale controlului accesului.'),
  localized('Synthetic intake and model-output review interfaces.', 'Interfețe sintetice pentru preluare și verificarea rezultatelor modelelor.'),
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

import { z } from 'zod';

import { moduleDefinitions } from '@/content/modules';
import type { Locale, SectionSlug } from '@/lib/site';

export type LocalizedText = Record<Locale, string>;

const localized = (en: string, ro: string): LocalizedText => ({ en, ro });

const localizedTextSchema = z.object({
  en: z.string().min(1),
  ro: z.string().min(1)
});

const moduleSchema = z.object({
  id: z.enum(['colvision', 'navigator', 'followup', 'eco']),
  name: z.string(),
  shortCode: z.string(),
  accent: z.string().regex(/^#[0-9A-F]{6}$/i),
  responsibility: localizedTextSchema,
  boundary: localizedTextSchema
});

const targetSchema = z.object({
  id: z.string(),
  value: localizedTextSchema,
  label: localizedTextSchema,
  qualifier: localizedTextSchema,
  state: z.literal('target')
});

const milestoneSchema = z.object({
  date: localizedTextSchema,
  title: localizedTextSchema,
  description: localizedTextSchema,
  state: z.enum(['completed', 'in-progress', 'planned'])
});

export const statusLabels = {
  current: localized('Current status', 'Stadiu actual'),
  target: localized('Project target', 'Obiectiv al proiectului'),
  planned: localized('Planned output', 'Rezultat planificat'),
  evidence: localized('Published evidence', 'Dovezi publicate'),
  review: localized('Under review', 'În curs de verificare')
} as const;

export const navigation: Array<{ slug: SectionSlug; label: LocalizedText; group: 'primary' | 'evidence' | 'legal' }> = [
  { slug: 'project', label: localized('Project', 'Proiect'), group: 'primary' },
  { slug: 'platform', label: localized('Platform', 'Platformă'), group: 'primary' },
  { slug: 'validation', label: localized('Validation', 'Validare'), group: 'primary' },
  { slug: 'progress', label: localized('Progress', 'Progres'), group: 'primary' },
  { slug: 'news', label: localized('News', 'Noutăți'), group: 'primary' },
  { slug: 'baseline', label: localized('Technology evidence', 'Dovezi tehnologice'), group: 'evidence' },
  { slug: 'outputs', label: localized('Outputs', 'Rezultate'), group: 'evidence' },
  { slug: 'consortium', label: localized('Consortium', 'Consorțiu'), group: 'evidence' },
  { slug: 'funding', label: localized('Funding', 'Finanțare'), group: 'evidence' },
  { slug: 'trust', label: localized('Trust', 'Încredere'), group: 'evidence' },
  { slug: 'privacy', label: localized('Privacy', 'Confidențialitate'), group: 'legal' },
  { slug: 'accessibility', label: localized('Accessibility', 'Accesibilitate'), group: 'legal' },
  { slug: 'contact', label: localized('Contact', 'Contact'), group: 'legal' }
];

export const commonCopy = {
  projectLabel: localized('Funded R&D and clinical-validation project', 'Proiect finanțat de cercetare-dezvoltare și validare clinică'),
  menu: localized('Menu', 'Meniu'),
  close: localized('Close', 'Închide'),
  evidenceMenu: localized('Evidence', 'Dovezi'),
  exploreProject: localized('Explore the project', 'Descoperiți proiectul'),
  viewProgress: localized('View progress', 'Vedeți progresul'),
  readUpdate: localized('Read the announcement', 'Citiți anunțul'),
  openFigure: localized('Open full-size figure', 'Deschideți figura la dimensiune completă'),
  lastUpdated: localized('Information current as of 28 August 2026', 'Informații actualizate la 28 august 2026'),
  developmentNotice: localized(
    'TealGuard is in research, development and validation. It is not a certified medical device and does not replace professional medical advice, diagnosis, treatment or applicable clinical guidelines.',
    'TealGuard se află în cercetare, dezvoltare și validare. Nu este un dispozitiv medical certificat și nu înlocuiește sfatul medical, diagnosticul, tratamentul sau ghidurile clinice aplicabile.'
  )
};

export const homeCopy = {
  category: localized(
    'Developing AI-supported pathways for gynecologic oncology through clinical validation.',
    'Dezvoltăm parcursuri de oncologie ginecologică sprijinite de AI prin validare clinică.'
  ),
  introduction: localized(
    'We are building TealGuard for clinical and operational teams coordinating cervical screening, patient navigation, follow-up and equipment availability across gynecologic oncology workflows.',
    'Dezvoltăm TealGuard pentru echipele clinice și operaționale care coordonează screeningul cancerului de col uterin, navigarea pacientelor, monitorizarea și disponibilitatea echipamentelor în parcursurile de oncologie ginecologică.'
  ),
  consortium: localized(
    'A 36-month project led by HIPERDIA SA, part of the Affidea network, with SmartClover as AI and deep-tech partner.',
    'Un proiect de 36 de luni coordonat de HIPERDIA SA, parte a rețelei Affidea, cu SmartClover ca partener pentru AI și deep tech.'
  ),
  currentStatus: localized('Contract signed. 36-month implementation programme started.', 'Contract semnat. Programul de implementare de 36 de luni a început.'),
  pathwayHeading: localized('Four planned modules across one clinical pathway.', 'Patru module planificate într-un singur parcurs clinic.'),
  pathwayIntro: localized(
    'Each module has a defined responsibility, explicit limits and a human decision boundary.',
    'Fiecare modul are o responsabilitate definită, limite explicite și puncte clare în care decizia aparține oamenilor.'
  ),
  evidenceHeading: localized('Follow TealGuard from contract to clinical validation.', 'Parcursul TealGuard, de la contract la validare clinică.'),
  evidenceBody: localized(
    'We publish completed milestones with their date and supporting public record.',
    'Publicăm etapele finalizate împreună cu data și dovada publică aferentă.'
  )
};

export const modules = z.array(moduleSchema).length(4).parse(moduleDefinitions);

export const projectFacts = [
  { label: localized('Contractual project title', 'Denumirea contractuală a proiectului'), value: localized('TealGuard — Intelligent platform for personalised management in gynecologic oncology', 'TealGuard — Intelligent platform for personalised management in gynecologic oncology') },
  { label: localized('SMIS code', 'Cod SMIS'), value: localized('358561', '358561') },
  { label: localized('Financing contract', 'Contract de finanțare'), value: localized('108809 / 19.08.2026', '108809 / 19.08.2026') },
  { label: localized('Implementation period', 'Perioadă de implementare'), value: localized('36 months', '36 de luni') },
  { label: localized('Programme', 'Program'), value: localized('Health Programme 2021–2027, Priority 9, RSO1.6, Action B', 'Programul Sănătate 2021–2027, Prioritatea 9, RSO1.6, Acțiunea B') },
  { label: localized('Fund', 'Fond'), value: localized('European Regional Development Fund', 'Fondul European de Dezvoltare Regională') }
];

export const fundingFacts = [
  { label: localized('Total project value', 'Valoarea totală a proiectului'), value: localized('RON 17,618,140.27', '17.618.140,27 lei') },
  { label: localized('Total eligible value', 'Valoarea totală eligibilă'), value: localized('RON 17,355,115.27', '17.355.115,27 lei') },
  { label: localized('Maximum non-refundable funding', 'Valoarea maximă a finanțării nerambursabile'), value: localized('RON 11,297,237.07', '11.297.237,07 lei') }
];

export const targets = z.array(targetSchema).parse([
  {
    id: 'maturity',
    value: localized('TRL 6 → target TRL 9', 'TRL 6 → obiectiv TRL 9'),
    label: localized('Programme maturity pathway', 'Parcursul de maturitate al programului'),
    qualifier: localized('“TRL6_CerviGuard.docx”, dated 13 January 2026, records the starting position; public artifacts do not independently validate it.', 'Documentul „TRL6_CerviGuard.docx”, datat 13 ianuarie 2026, consemnează poziția inițială; artefactele publice nu o validează independent.'),
    state: 'target'
  },
  {
    id: 'validation',
    value: localized('100–200 women', '100–200 de femei'),
    label: localized('Prospective TRL 8 validation', 'Validare prospectivă la TRL 8'),
    qualifier: localized('Subject to clinical, ethical and data-protection approvals.', 'Sub rezerva aprobărilor clinice, etice și de protecție a datelor.'),
    state: 'target'
  },
  {
    id: 'assisted',
    value: localized('At least 1,000 women', 'Cel puțin 1.000 de femei'),
    label: localized('Assisted through project functions at TRL 9', 'Sprijinite prin funcțiile proiectului la TRL 9'),
    qualifier: localized('A contractual target, not a current usage figure.', 'Obiectiv contractual, nu cifră de utilizare curentă.'),
    state: 'target'
  },
  {
    id: 'sites',
    value: localized('At least 3 clinical locations', 'Cel puțin 3 locații clinice'),
    label: localized('Formal STEP implementation target', 'Obiectiv formal STEP de implementare'),
    qualifier: localized('Five HIPERDIA locations are described in the wider implementation plan.', 'Cinci locații HIPERDIA sunt descrise în planul extins de implementare.'),
    state: 'target'
  },
  {
    id: 'edge',
    value: localized('4 on-edge applications', '4 aplicații la marginea rețelei'),
    label: localized('Sovereign operation target', 'Obiectiv de operare suverană'),
    qualifier: localized('Zero raw patient-data transfer to public non-EU cloud is a target, not a current result.', 'Transferul zero al datelor brute ale pacientelor către cloud public din afara UE este un obiectiv, nu un rezultat actual.'),
    state: 'target'
  },
  {
    id: 'outputs',
    value: localized('2 + 2 + 2', '2 + 2 + 2'),
    label: localized('Datasets, open-weight models and publications', 'Seturi de date, modele cu ponderi deschise și publicații'),
    qualifier: localized('Planned outputs, subject to ethics, privacy, IP, cybersecurity and regulatory requirements.', 'Rezultate planificate, condiționate de cerințe etice, de confidențialitate, proprietate intelectuală, securitate cibernetică și reglementare.'),
    state: 'target'
  }
]);

export const milestones = z.array(milestoneSchema).parse([
  {
    date: localized('19 August 2026', '19 august 2026'),
    title: localized('Financing contract signed', 'Contract de finanțare semnat'),
    description: localized('The consortium entered the 36-month implementation programme.', 'Consorțiul a intrat în programul de implementare cu durata de 36 de luni.'),
    state: 'completed'
  },
  {
    date: localized('Current phase', 'Etapa actuală'),
    title: localized('Implementation programme', 'Program de implementare'),
    description: localized('The project has entered its 36-month implementation programme. Specifications, governance, engineering and integration are the next areas of work.', 'Proiectul a intrat în programul de implementare de 36 de luni. Specificațiile, guvernanța, ingineria și integrarea sunt următoarele direcții de lucru.'),
    state: 'in-progress'
  },
  {
    date: localized('Planned', 'Planificat'),
    title: localized('Prospective validation', 'Validare prospectivă'),
    description: localized('TRL 8 validation begins only after applicable approvals and readiness gates.', 'Validarea la TRL 8 începe numai după aprobările și verificările de pregătire aplicabile.'),
    state: 'planned'
  },
  {
    date: localized('Programme target', 'Obiectiv al programului'),
    title: localized('Production-level operation', 'Operare la nivel de producție'),
    description: localized('TRL 9 operation and scale indicators remain targets until evidence is published.', 'Operarea la TRL 9 și indicatorii de scară rămân obiective până la publicarea dovezilor.'),
    state: 'planned'
  }
]);

export const sectionCopy: Record<SectionSlug, { eyebrow: LocalizedText; title: LocalizedText; introduction: LocalizedText }> = {
  project: {
    eyebrow: statusLabels.current,
    title: localized('Built around the whole care pathway', 'Conceput pentru întregul parcurs de îngrijire'),
    introduction: localized('Cervical-cancer prevention depends on connected steps, from information and screening to referral, follow-up and operational availability.', 'Prevenția cancerului de col uterin depinde de etape conectate, de la informare și screening până la îndrumare, monitorizare și disponibilitate operațională.')
  },
  platform: {
    eyebrow: localized('System architecture', 'Arhitectura sistemului'),
    title: localized('Four planned modules on one shared technical foundation', 'Patru module planificate pe o fundație tehnică comună'),
    introduction: localized('The proposed architecture assigns each planned module a distinct part of the pathway. Deterministic controls, governed AI, interoperability and human review points are intended to work together across the platform.', 'Arhitectura propusă atribuie fiecărui modul planificat o etapă distinctă a parcursului. Controalele deterministe, AI-ul guvernat, interoperabilitatea și punctele de verificare umană sunt concepute să funcționeze împreună la nivelul platformei.')
  },
  validation: {
    eyebrow: statusLabels.target,
    title: localized('Validation before clinical claims', 'Validare înaintea afirmațiilor clinice'),
    introduction: localized('No clinical-performance or patient-outcome results are claimed today. Every validation figure below is a project target.', 'În prezent, proiectul nu revendică rezultate privind performanța clinică sau efectele asupra pacientelor. Fiecare cifră de validare de mai jos este un obiectiv al proiectului.')
  },
  baseline: {
    eyebrow: localized('Technology evidence', 'Dovezi tehnologice'),
    title: localized('CerviGuard evidence for TealGuard', 'Dovezi CerviGuard pentru TealGuard'),
    introduction: localized(
      'Inspect the CerviGuard application code available before TealGuard, the current hardened release, dated synthetic captures and the precise limits of this public evidence.',
      'Consultați codul aplicației CerviGuard disponibil înaintea TealGuard, versiunea actuală consolidată, capturile sintetice datate și limitele precise ale acestor dovezi publice.'
    )
  },
  progress: {
    eyebrow: localized('Implementation record', 'Evidența implementării'),
    title: localized('A 36-month path from integration to clinical validation', 'Un parcurs de 36 de luni, de la integrare la validare clinică'),
    introduction: localized('The financing contract was signed on 19 August 2026, starting the 36-month implementation programme. Specifications, governance, engineering and integration are the next areas of work; prospective validation follows the applicable approvals and readiness gates.', 'Contractul de finanțare a fost semnat la 19 august 2026, marcând începutul programului de implementare de 36 de luni. Specificațiile, guvernanța, ingineria și integrarea sunt următoarele direcții de lucru; validarea prospectivă va urma după obținerea aprobărilor aplicabile și trecerea etapelor de verificare a pregătirii.')
  },
  outputs: {
    eyebrow: statusLabels.planned,
    title: localized('Research outputs and public resources', 'Rezultate de cercetare și resurse publice'),
    introduction: localized('Approved datasets, open-weight models and publications will be listed here as the programme delivers them.', 'Seturile de date, modelele cu ponderi deschise și publicațiile aprobate vor fi listate aici pe măsură ce sunt realizate în cadrul programului.')
  },
  news: {
    eyebrow: localized('Project updates', 'Actualizări despre proiect'),
    title: localized('News from the TealGuard programme', 'Noutăți din programul TealGuard'),
    introduction: localized('Read consortium-approved updates on implementation, validation milestones and public research outputs.', 'Actualizări aprobate de consorțiu despre implementare, etapele de validare și rezultatele publice ale cercetării.')
  },
  consortium: {
    eyebrow: localized('Defined responsibilities', 'Responsabilități definite'),
    title: localized('Clinical implementation and AI engineering', 'Implementare clinică și inginerie AI'),
    introduction: localized('HIPERDIA SA leads the consortium, contributing clinical expertise and multi-site implementation capacity. SmartClover contributes AI research, software engineering, distributed architecture, interoperability and productisation.', 'HIPERDIA SA coordonează consorțiul și contribuie cu expertiză clinică și capacitate de implementare în mai multe locații. SmartClover contribuie cu cercetare AI, inginerie software, arhitectură distribuită, interoperabilitate și dezvoltarea soluției pentru utilizare operațională.')
  },
  funding: {
    eyebrow: localized('Programme facts', 'Date despre program'),
    title: localized('Financing for the 36-month consortium project', 'Finanțarea proiectului de consorțiu cu durata de 36 de luni'),
    introduction: localized('The figures below cover the full HIPERDIA–SmartClover project. They do not represent SmartClover revenue, cash received or company allocation.', 'Valorile de mai jos acoperă întregul proiect HIPERDIA–SmartClover. Ele nu reprezintă venituri SmartClover, numerar încasat sau alocare către companie.')
  },
  trust: {
    eyebrow: localized('Governed development', 'Dezvoltare guvernată'),
    title: localized('Human oversight as a clinical design requirement', 'Supravegherea umană ca cerință de proiectare clinică'),
    introduction: localized('TealGuard is intended to support technical and operational processes. It will not autonomously diagnose, prescribe or replace clinical protocols.', 'TealGuard este destinat sprijinirii proceselor tehnice și operaționale. Nu va diagnostica și nu va prescrie autonom și nu va înlocui protocoalele clinice.')
  },
  privacy: {
    eyebrow: localized('Public-information website', 'Site de informare publică'),
    title: localized('Minimal data by design', 'Date minime prin proiectare'),
    introduction: localized('This website uses no analytics, advertising trackers, account system or submission form.', 'Acest site nu folosește instrumente de analiză, trackere publicitare, conturi sau formulare de trimitere.')
  },
  accessibility: {
    eyebrow: localized('Inclusive access', 'Acces incluziv'),
    title: localized('Access TealGuard content with or without WebGL', 'Accesează conținutul TealGuard cu sau fără WebGL'),
    introduction: localized('Core project information is available as semantic text and static visuals. The interface supports keyboard navigation, visible focus, readable reflow and reduced motion.', 'Informațiile esențiale despre proiect sunt disponibile ca text semantic și elemente vizuale statice. Interfața permite navigarea cu tastatura, focalizare vizibilă, redimensionare lizibilă și mișcare redusă.')
  },
  contact: {
    eyebrow: localized('Project enquiries', 'Întrebări despre proiect'),
    title: localized('Contact SmartClover', 'Contactează SmartClover'),
    introduction: localized('Use the project contact for research, technical, programme or media enquiries. Do not send medical records or requests for care.', 'Folosiți adresa de contact a proiectului pentru întrebări de cercetare, tehnice, de program sau media. Nu transmiteți documente medicale sau solicitări de îngrijire.')
  }
};

export const outputRegistry = [
  { type: localized('Public datasets', 'Seturi publice de date'), target: '2', state: statusLabels.planned },
  { type: localized('Open-weight models', 'Modele cu ponderi deschise'), target: '2', state: statusLabels.planned },
  { type: localized('Open-access publications', 'Publicații cu acces deschis'), target: '2', state: statusLabels.planned }
];

export const trustPrinciples = [
  localized('Human approval remains explicit at clinical and operational decision points.', 'Aprobarea umană rămâne explicită în punctele de decizie clinică și operațională.'),
  localized('On-device, on-premises and edge operation will be evaluated where proportionate.', 'Operarea pe dispozitiv, în infrastructură locală și la marginea rețelei va fi evaluată acolo unde este proporțională.'),
  localized('Data minimisation, role-based access and traceable critical events are design requirements.', 'Minimizarea datelor, accesul bazat pe roluri și evenimentele critice trasabile sunt cerințe de proiectare.'),
  localized('HL7 FHIR integration is controlled and remains subject to validation.', 'Integrarea HL7 FHIR este controlată și rămâne supusă validării.'),
  localized('Detailed security configurations and sensitive deployment internals are not public.', 'Configurațiile detaliate de securitate și elementele interne sensibile ale implementării nu sunt publice.')
];

export const stateCopy = {
  completed: localized('Completed', 'Finalizat'),
  'in-progress': localized('In progress', 'În desfășurare'),
  planned: localized('Planned', 'Planificat')
} as const;

export const text = (value: LocalizedText, locale: Locale) => value[locale];

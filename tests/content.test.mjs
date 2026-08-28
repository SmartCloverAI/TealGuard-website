import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sourceFiles = [
  'src/content/baseline.ts',
  'src/content/project.ts',
  'src/content/modules.ts',
  'src/components/BaselineEvidence.tsx',
  'src/components/HeroScene.tsx',
  'src/components/HomePage.tsx',
  'src/components/LocaleSwitch.tsx',
  'src/components/PathwayCanvas.tsx',
  'src/components/SectionPage.tsx',
  'src/app/[locale]/layout.tsx'
];

const officialAssets = {
  'public/images/funding/eu-cofunded-ro.png': '93f8dd63d1bf7b6f6e2ed7ea137ff7484b10c76ed92ceb0ca76216000cf87320',
  'public/images/funding/guvernul-romaniei.png': '86ea57e38b14642f75d5a9f9ee8d74d1e684cc89fb997875cb678bb53820ca42',
  'public/images/funding/programul-sanatate.png': '52b9c70365dfba187fa9faeb06aa710f91fa0a08164abaf2025874b2ab3422d8',
  'public/images/partners/affidea.svg': 'dc5f906a0c5aa312490a1a81d2f3950477aba48306f7bde487e9c1c2da3e1e26'
};

const evidenceAssets = {
  'public/images/evidence/cerviguard/2026-08-28/cerviguard-structured-intake-demo_v1.png': {
    sha256: 'bc54263ff8847227e30feff84f6c2368ce711a8ed32e5062a5920b9c202a5d09',
    width: 1440,
    height: 960
  },
  'public/images/evidence/cerviguard/2026-08-28/cerviguard-clinician-review-demo_v1.png': {
    sha256: '451a5f6adfb5f60a24cd651517dd45790de3bd0b56a9b40210c8fafb451e4155',
    width: 1200,
    height: 1257
  }
};

const publicationAssets = {
  'public/images/diagrams/tealguard-deep-tech-architecture.png': {
    sha256: '2325a92332959e2773182ff157e8f647a8fc961c05b8c603b0f7779fc3fbced6',
    width: 1857,
    height: 948
  }
};

test('official funding and Affidea assets remain byte-identical', async () => {
  for (const [path, expected] of Object.entries(officialAssets)) {
    const bytes = await readFile(path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected, path);
  }
});

test('CerviGuard evidence captures retain approved bytes and dimensions', async () => {
  for (const [path, expected] of Object.entries(evidenceAssets)) {
    const bytes = await readFile(path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256, path);
    assert.equal(bytes.subarray(1, 4).toString('ascii'), 'PNG', `${path} signature`);
    assert.equal(bytes.readUInt32BE(16), expected.width, `${path} width`);
    assert.equal(bytes.readUInt32BE(20), expected.height, `${path} height`);
  }
});

test('operator-supplied TealGuard announcement artwork retains its exact bytes and dimensions', async () => {
  for (const [path, expected] of Object.entries(publicationAssets)) {
    const bytes = await readFile(path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected.sha256, path);
    assert.equal(bytes.subarray(1, 4).toString('ascii'), 'PNG', `${path} signature`);
    assert.equal(bytes.readUInt32BE(16), expected.width, `${path} width`);
    assert.equal(bytes.readUInt32BE(20), expected.height, `${path} height`);
  }
});

test('public source includes the exact contract and programme facts', async () => {
  const source = await readFile('src/content/project.ts', 'utf8');
  for (const fact of [
    '358561',
    '108809 / 19.08.2026',
    'RON 17,618,140.27',
    'RON 17,355,115.27',
    'RON 11,297,237.07',
    '36 months',
    'HIPERDIA SA',
    'SmartClover'
  ]) {
    assert.match(source, new RegExp(fact.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
});

test('launch copy excludes disallowed financing and traction claims', async () => {
  const source = (await Promise.all(sourceFiles.map((path) => readFile(path, 'utf8')))).join('\n');
  const disallowed = [
    /(?:EUR|€)\s*3\s*(?:M|million)/i,
    /3\s*M\s*EUR/i,
    /HIPERDIA.{0,30}(?:customer|client)/i,
    /(?:customer|commercial)\s+traction/i,
    /TealGuard\s+is\s+currently\s+(?:deployed|validated|certified)/i,
    /achieved\s+(?:clinical|patient)\s+outcomes?/i
  ];

  for (const pattern of disallowed) assert.doesNotMatch(source, pattern);
});

test('targets are explicitly distinguished from achieved results', async () => {
  const source = await readFile('src/content/project.ts', 'utf8');
  assert.match(source, /A contractual target, not a current usage figure/);
  assert.match(source, /is a target, not a current result/);
  assert.match(source, /No clinical-performance or patient-outcome results are claimed today/);
  assert.doesNotMatch(source, /Peste 3 locații clinice/);
  assert.match(source, /Cel puțin 3 locații clinice/);
});

test('planned work is not described as operational', async () => {
  const source = await readFile('src/content/project.ts', 'utf8');
  assert.match(source, /Four planned modules on one shared technical foundation/);
  assert.match(source, /The proposed architecture assigns each planned module/);
  assert.match(source, /Specifications, governance, engineering and integration are the next areas of work/);
  assert.doesNotMatch(source, /Research, governance and integration are now under way/);
});

test('CerviGuard is presented as the audience-facing foundation without weakening evidence boundaries', async () => {
  const home = await readFile('src/components/HomePage.tsx', 'utf8');
  const section = await readFile('src/components/SectionPage.tsx', 'utf8');

  assert.match(home, /CerviGuard is SmartClover's working starting point for TealGuard/);
  assert.match(home, /structured case intake, image processing, role-controlled access, processing status and case history/);
  assert.match(section, /From CerviGuard to TealGuard/);
  assert.match(section, /four planned modules and shared interoperability, governance and deployment controls/);
  assert.match(section, /does not establish clinical performance or final product readiness/);
  assert.doesNotMatch(home, /A public CerviGuard revision from May 2026/);
  assert.doesNotMatch(section, /tealguard-platform-modules\.png/);
  assert.match(home, /\/images\/diagrams\/tealguard-deep-tech-architecture\.png/);
  assert.match(section, /\/images\/diagrams\/tealguard-deep-tech-architecture\.png/);
});

test('TealGuard announcement links follow the active English or Romanian locale', async () => {
  const site = await readFile('src/lib/site.ts', 'utf8');
  const home = await readFile('src/components/HomePage.tsx', 'utf8');
  const section = await readFile('src/components/SectionPage.tsx', 'utf8');

  assert.match(
    site,
    /en: 'https:\/\/smartclover\.ro\/blog\/tealguard-financing-contract-signed-sovereign-ai-gynecologic-oncology'/
  );
  assert.match(
    site,
    /ro: 'https:\/\/smartclover\.ro\/blog\/tealguard-intra-oficial-in-implementare-inteligenta-artificiala-suverana-oncologie-ginecologica'/
  );
  assert.match(home, /siteConfig\.announcementUrls\[locale\]/);
  assert.match(section, /siteConfig\.announcementUrls\[locale\]/);
  assert.doesNotMatch(`${home}\n${section}`, /siteConfig\.announcementUrl(?!s)/);
});

test('homepage pathway is user-triggered, finite and current-versus-planned', async () => {
  const hero = await readFile('src/components/HeroScene.tsx', 'utf8');
  const canvas = await readFile('src/components/PathwayCanvas.tsx', 'utf8');

  for (const label of [
    'CerviGuard today',
    'TealGuard next',
    'Four planned modules',
    'CerviGuard astăzi',
    'TealGuard: etapa următoare',
    'Patru module planificate',
    'Play pathway',
    'Replay pathway',
    'Planned module',
    'Modul planificat'
  ]) assert.match(hero, new RegExp(label));

  assert.match(hero, /const actDurations = \[900, 900, 1400\]/);
  assert.match(hero, /data-scene-act=\{sceneActs\[sequenceAct\]\}/);
  assert.match(hero, /data-playback=\{playbackState\}/);
  assert.match(hero, /sequenceState === 'running'/);
  assert.match(hero, /Clinical interpretation stays with qualified professionals/);
  assert.match(hero, /Fără decizii clinice/);
  assert.doesNotMatch(hero, /autoPlay|setInterval/);

  assert.match(canvas, /const finiteMotionDurations = \[0\.65, 0\.72, 1\.15\]/);
  assert.match(canvas, /modulePositions\.map/);
  assert.match(canvas, /frameloop=\{animating \? 'always' : 'demand'\}/);
  assert.doesNotMatch(canvas, /FlowPulse|getElapsedTime|%\s*1/);
});

test('baseline evidence is pinned, bilingual and claim-bounded', async () => {
  const source = `${await readFile('src/content/baseline.ts', 'utf8')}\n${await readFile('src/components/BaselineEvidence.tsx', 'utf8')}\n${await readFile('src/components/SectionPage.tsx', 'utf8')}`;
  const manifest = JSON.parse(await readFile('public/evidence/cerviguard-baseline-manifest_v1.json', 'utf8'));

  for (const revision of [
    '20a03dd2fd5a454f6f7cb3fe3b857f3199b96cef',
    '8274b00929c5072438354502ee7ad454dd62a8da',
    '4d1a28c58f538c0d8045acb3c268c2f465b43677'
  ]) {
    assert.match(source, new RegExp(revision));
  }

  for (const bilingualFragment of [
    'Dated interface evidence',
    'Dovezi datate ale interfeței',
    'This public record does not establish',
    'Aceste dovezi publice nu stabilesc'
  ]) assert.match(source, new RegExp(bilingualFragment));

  assert.match(source, /TRL6_CerviGuard\.docx/);
  assert.match(source, /do not independently demonstrate operation in a relevant environment or validate the TRL assignment/);
  assert.match(source, /production-security assurance/);
  assert.match(source, /post-start revision/);
  assert.doesNotMatch(source, /existing CerviGuard TRL 6 prototype/);
  assert.doesNotMatch(source, /Reviewed synthetic evidence|Dovadă sintetică verificată/);
  assert.doesNotMatch(source, /499e23c70431f795f589e6d1ad0f5da2fdceafd9|18a8e0b327ff2a003743facf0253df21dd97068f/);
  assert.doesNotMatch(source, /\/(?:main|latest)(?:['"/]|$)/);
  assert.equal(manifest.timeline.preProjectSource.revision, '20a03dd2fd5a454f6f7cb3fe3b857f3199b96cef');
  assert.equal(manifest.timeline.currentRelease.revision, '8274b00929c5072438354502ee7ad454dd62a8da');
  assert.equal(manifest.liveObservation.mutable, true);
  assert.match(manifest.liveObservation.note, /not a cryptographic deployment-to-source link/);
  assert.equal(manifest.captureMethod.independentlyAttested, false);
  assert.equal(manifest.captureMethod.browser, 'Chromium 151.0.7922.34');
  assert.equal(manifest.trlPosition.projectDossierSource.title, 'TRL6_CerviGuard.docx');
  assert.equal(manifest.trlPosition.projectDossierSource.classification, 'TealGuard project dossier; non-public');
  assert.equal(manifest.modelArtifacts, undefined);
  assert.equal(manifest.captures.length, 2);
  for (const capture of manifest.captures) {
    const expected = Object.values(evidenceAssets).find((asset) => asset.sha256 === capture.output.sha256);
    assert.ok(expected, `${capture.id} manifest hash`);
    assert.equal(capture.output.width, expected.width, `${capture.id} manifest width`);
    assert.equal(capture.output.height, expected.height, `${capture.id} manifest height`);
  }
  assert.ok(manifest.doesNotEstablish.includes('independent confirmation of TRL 5/6 or demonstration in a relevant environment'));
});

test('funding and privacy surfaces include the required public routes', async () => {
  const source = `${await readFile('src/lib/site.ts', 'utf8')}\n${await readFile('src/components/SectionPage.tsx', 'utf8')}`;
  for (const value of [
    'https://mfe.gov.ro/',
    'https://oportunitati-ue.gov.ro/',
    'https://www.fonduri-ue.ro/',
    'https://www.dataprotection.ro/',
    '50315196',
    'J12/3050/2024'
  ]) assert.match(source, new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  assert.match(source, /Pentru informații detaliate despre celelalte programe cofinanțate de Uniunea Europeană, vă invităm să vizitați:/);
});

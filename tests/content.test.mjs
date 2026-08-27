import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const sourceFiles = [
  'src/content/project.ts',
  'src/content/modules.ts',
  'src/components/HomePage.tsx',
  'src/components/SectionPage.tsx',
  'src/app/[locale]/layout.tsx'
];

const officialAssets = {
  'public/images/funding/eu-cofunded-ro.png': '93f8dd63d1bf7b6f6e2ed7ea137ff7484b10c76ed92ceb0ca76216000cf87320',
  'public/images/funding/guvernul-romaniei.png': '86ea57e38b14642f75d5a9f9ee8d74d1e684cc89fb997875cb678bb53820ca42',
  'public/images/funding/programul-sanatate.png': '52b9c70365dfba187fa9faeb06aa710f91fa0a08164abaf2025874b2ab3422d8',
  'public/images/partners/affidea.svg': 'dc5f906a0c5aa312490a1a81d2f3950477aba48306f7bde487e9c1c2da3e1e26'
};

test('official funding and Affidea assets remain byte-identical', async () => {
  for (const [path, expected] of Object.entries(officialAssets)) {
    const bytes = await readFile(path);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), expected, path);
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

import { expect, test } from '@playwright/test';

const sectionRoutes = [
  'project',
  'platform',
  'validation',
  'baseline',
  'progress',
  'outputs',
  'news',
  'consortium',
  'funding',
  'trust',
  'privacy',
  'accessibility',
  'contact'
];

test('homepage exposes the project identity, status and progressive scene', async ({ page, isMobile }) => {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  await page.goto('/en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1, name: 'TealGuard' })).toBeVisible();
  await expect(page.getByText('Contract signed. 36-month implementation programme started.')).toBeVisible();
  const consortiumCopy = page.getByText('A 36-month project led by HIPERDIA SA');
  await expect(consortiumCopy).toHaveCount(2);
  expect(await consortiumCopy.evaluateAll((elements) => elements.some((element) => {
    const style = getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
  }))).toBe(true);
  await expect(page.locator('.hero-scene')).toHaveAttribute('data-scene-mode', /webgl|static/);
  await expect(page.locator('.hero-scene')).toHaveAttribute('data-scene-act', 'current');
  await expect(page.locator('.hero-scene')).toHaveAttribute('data-playback', 'idle');
  await expect(page.getByRole('button', { name: 'Play pathway' })).toBeVisible();
  await expect(page.locator('.scene-narrative').getByText('CerviGuard today', { exact: true })).toBeVisible();
  await expect(page.locator('.scene-narrative').getByText('TealGuard next', { exact: true })).toBeVisible();
  await expect(page.locator('.scene-narrative').getByText('Four planned modules', { exact: true })).toBeVisible();
  await expect(page.getByText('Planned module', { exact: true })).toHaveCount(4);
  await expect(page.getByRole('link', { name: 'Inspect the CerviGuard evidence' })).toHaveAttribute('href', '/en/baseline');
  await expect(page.getByRole('heading', { level: 2, name: 'TealGuard builds on CerviGuard' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Review the technology evidence' })).toHaveAttribute('href', '/en/baseline');
  await expect(page.getByText('Structured case intake', { exact: true })).toBeVisible();
  await expect(page.getByText('Role-controlled access', { exact: true })).toBeVisible();
  await expect(page.getByText('Case history', { exact: true })).toBeVisible();

  const announcementArtwork = page.locator('.news-feature__media img');
  await announcementArtwork.scrollIntoViewIfNeeded();
  await expect(announcementArtwork).toHaveCSS('object-fit', 'contain');
  const announcementBox = await announcementArtwork.boundingBox();
  expect((announcementBox?.width ?? 0) / (announcementBox?.height ?? 1)).toBeCloseTo(1857 / 948, 1);

  if ((await page.locator('.hero-scene').getAttribute('data-scene-mode')) === 'webgl') {
    await expect(page.locator('.hero-scene')).toHaveAttribute('data-scene-ready', 'true', { timeout: 10_000 });
    const canvas = page.locator('.scene-canvas canvas');
    const box = await canvas.boundingBox();
    expect(box?.width).toBeGreaterThan(300);
    expect(box?.height).toBeGreaterThan(isMobile ? 150 : 200);
    expect((await canvas.screenshot()).byteLength).toBeGreaterThan(10_000);
  }

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  expect(consoleErrors).toEqual([]);
});

test('pathway waits for a command, fans out once and becomes pixel-stable', async ({ page, isMobile }) => {
  test.skip(isMobile, 'finite canvas timing check runs once');

  await page.goto('/en');
  const scene = page.locator('.hero-scene');
  const play = page.getByRole('button', { name: 'Play pathway' });
  await expect(scene).toHaveAttribute('data-scene-act', 'current');
  await expect(scene).toHaveAttribute('data-playback', 'idle');
  await page.waitForTimeout(1100);
  await expect(scene).toHaveAttribute('data-scene-act', 'current');
  await expect(scene).toHaveAttribute('data-playback', 'idle');

  if ((await scene.getAttribute('data-scene-mode')) === 'webgl') {
    await expect(scene).toHaveAttribute('data-scene-ready', 'true', { timeout: 10_000 });
    const canvas = page.locator('.scene-canvas canvas');
    const firstIdleFrame = await canvas.screenshot();
    await page.waitForTimeout(500);
    const secondIdleFrame = await canvas.screenshot();
    expect(firstIdleFrame.equals(secondIdleFrame)).toBe(true);
  }

  await play.click();
  await expect(scene).toHaveAttribute('data-playback', 'playing');
  await expect(scene).toHaveAttribute('data-scene-act', 'programme', { timeout: 1400 });
  await expect(scene).toHaveAttribute('data-scene-act', 'modules', { timeout: 1400 });
  await expect(scene).toHaveAttribute('data-playback', 'stopped', { timeout: 2100 });
  await expect(page.getByRole('button', { name: 'Replay pathway' })).toBeVisible();

  if ((await scene.getAttribute('data-scene-mode')) === 'webgl') {
    const canvas = page.locator('.scene-canvas canvas');
    const firstStoppedFrame = await canvas.screenshot();
    await page.waitForTimeout(500);
    const secondStoppedFrame = await canvas.screenshot();
    expect(firstStoppedFrame.equals(secondStoppedFrame)).toBe(true);

    const viewport = page.viewportSize();
    expect(viewport).not.toBeNull();
    await page.setViewportSize({ width: viewport!.width - 1, height: viewport!.height });
    await page.setViewportSize(viewport!);
    await page.waitForTimeout(250);
    const stoppedFrameAfterNeutralResize = await canvas.screenshot();
    expect(firstStoppedFrame.equals(stoppedFrameAfterNeutralResize)).toBe(true);
  }

  const navigator = page.getByRole('button', { name: 'Planned module: NavigatorAI' });
  await navigator.click();
  await expect(navigator).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.scene-description')).toContainText('Clinical questions stay with qualified professionals.');
  await expect(scene).toHaveAttribute('data-scene-act', 'modules');
  await expect(scene).toHaveAttribute('data-playback', 'stopped');
});

test('both locales and every public section return complete pages', async ({ page }) => {
  for (const locale of ['ro', 'en']) {
    for (const section of sectionRoutes) {
      const response = await page.goto(`/${locale}/${section}`);
      expect(response?.status(), `${locale}/${section}`).toBe(200);
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${locale}/${section}`).toBe(true);
    }
  }
});

test('baseline routes expose bilingual, pinned and bounded evidence', async ({ page }) => {
  for (const locale of ['en', 'ro'] as const) {
    await page.goto(`/${locale}/baseline`);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.evidence-record')).toHaveCount(2);
    await expect(page.locator('.evidence-record img')).toHaveCount(2);
    await expect(page.locator('.evidence-quick-links a')).toHaveCount(4);
    await expect(page.locator('.evidence-record img').first()).toHaveAttribute('alt', /synthetic|sintetic/i);
    await expect(page.locator('code').filter({ hasText: '20a03dd2fd5a454f6f7cb3fe3b857f3199b96cef' })).toBeVisible();
    await expect(page.locator('code').filter({ hasText: '8274b00929c5072438354502ee7ad454dd62a8da' })).toBeVisible();
    await expect(page.getByText('TRL6_CerviGuard.docx')).toBeVisible();
    await expect(page.getByText(locale === 'ro' ? 'Aceste dovezi publice nu stabilesc' : 'This public record does not establish')).toBeVisible();
    await expect(page.getByText(/relevant environment|mediu relevant/i).last()).toBeVisible();
    await expect(page.getByRole('link', { name: /machine-readable evidence manifest|manifestul de dovezi/i })).toHaveAttribute('href', '/evidence/cerviguard-baseline-manifest_v1.json');

    const otherLocale = locale === 'en' ? 'Română' : 'English';
    await expect(page.locator('.locale-switch').getByRole('link', { name: otherLocale })).toHaveAttribute(
      'href',
      `/${locale === 'en' ? 'ro' : 'en'}/baseline`
    );
  }
});

test('locale switch retains section, query and fragment', async ({ page }) => {
  await page.goto('/en/baseline?source=review#evidence-boundary-heading');
  const romanian = page.locator('.locale-switch').getByRole('link', { name: 'Română' });
  await expect(romanian).toHaveAttribute('href', '/ro/baseline');
  await romanian.click();
  await expect(page).toHaveURL(/\/ro\/baseline\?source=review#evidence-boundary-heading$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'ro');
  await expect.poll(async () => {
    const header = await page.locator('.site-header').boundingBox();
    const target = await page.locator('#evidence-boundary-heading').boundingBox();
    if (!header || !target) return false;
    return target.y >= header.y + header.height + 8;
  }).toBe(true);
});

test('images load and official funding marks remain visible', async ({ page }) => {
  await page.goto('/ro');
  const fundingMarks = page.locator('.funding-bar img');
  await expect(fundingMarks).toHaveCount(3);
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate((element) => {
      const img = element as HTMLImageElement;
      return img.complete && img.naturalWidth > 0;
    })).toBe(true);
  }
});

test('metadata, canonical routes and runtime probes are consistent', async ({ page, request }) => {
  const pageResponse = await page.goto('/en/platform');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://tealguard.eu/en/platform');
  await expect(page.locator('link[rel="alternate"][hreflang="ro"]')).toHaveAttribute('href', 'https://tealguard.eu/ro/platform');
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute('href', 'https://tealguard.eu/en/platform');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', 'https://tealguard.eu/images/social/tealguard-announcement.png');
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content', 'TealGuard');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');

  const headers = pageResponse?.headers() ?? {};
  expect(headers['content-security-policy']).toContain("default-src 'self'");
  expect(headers['strict-transport-security']).toContain('includeSubDomains');
  expect(headers['strict-transport-security']).not.toContain('preload');
  expect(headers['x-frame-options']).toBe('DENY');
  expect(headers['x-content-type-options']).toBe('nosniff');

  const health = await request.get('/api/healthz');
  expect(health.status()).toBe(200);
  expect(await health.json()).toEqual({ status: 'ok', service: 'tealguard-website' });
  expect(health.headers()['cache-control']).toBe('no-store');

  const version = await request.get('/api/version');
  expect(version.status()).toBe(200);
  const versionBody = await version.json();
  expect(versionBody.version).toBe('1.0.5');
  expect(versionBody.revision).toMatch(/^[0-9a-f]{7,40}$/);
  expect(Number.isNaN(Date.parse(versionBody.builtAt))).toBe(false);

  const directAsset = await request.get('/images/funding/eu-cofunded-ro.png');
  expect(directAsset.status()).toBe(200);
  expect(directAsset.headers()['x-content-type-options']).toBe('nosniff');

  const evidenceManifest = await request.get('/evidence/cerviguard-baseline-manifest_v1.json');
  expect(evidenceManifest.status()).toBe(200);
  expect(evidenceManifest.headers()['content-type']).toContain('application/json');
  const evidenceManifestBody = await evidenceManifest.json();
  expect(evidenceManifestBody.timeline.preProjectSource.revision).toBe('20a03dd2fd5a454f6f7cb3fe3b857f3199b96cef');
  expect(evidenceManifestBody.timeline.currentRelease.revision).toBe('8274b00929c5072438354502ee7ad454dd62a8da');
  expect(evidenceManifestBody.captureMethod.independentlyAttested).toBe(false);

  const alias = await request.get('/en/platform?source=test', {
    headers: { Host: 'teal-guard.eu' },
    maxRedirects: 0
  });
  expect(alias.status()).toBe(308);
  expect(alias.headers().location).toBe('https://tealguard.eu/en/platform?source=test');

  for (const host of [
    'teal-guard.eu',
    'www.tealguard.eu',
    'www.teal-guard.eu',
    '5d6ceb989608.smartclover.ro'
  ]) {
    const aliasRoot = await request.get('/?source=alias', {
      headers: { Host: host },
      maxRedirects: 0
    });
    expect(aliasRoot.status(), host).toBe(308);
    expect(aliasRoot.headers().location, host).toBe('https://tealguard.eu/en?source=alias');
  }

  const defaultRoot = await request.get('/?source=default', { maxRedirects: 0 });
  expect(defaultRoot.status()).toBe(307);
  expect(defaultRoot.headers().location).toBe('/en?source=default');

  const canonicalHttp = await request.get('/en/platform?source=http', {
    headers: { Host: 'tealguard.eu', 'X-Forwarded-Proto': 'http' },
    maxRedirects: 0
  });
  expect(canonicalHttp.status()).toBe(308);
  expect(canonicalHttp.headers().location).toBe('https://tealguard.eu/en/platform?source=http');

  const canonicalHttpRoot = await request.get('/?source=http-root', {
    headers: { Host: 'tealguard.eu', 'X-Forwarded-Proto': 'http' },
    maxRedirects: 0
  });
  expect(canonicalHttpRoot.status()).toBe(308);
  expect(canonicalHttpRoot.headers().location).toBe('https://tealguard.eu/en?source=http-root');

  const manifest = await request.get('/manifest.webmanifest');
  expect(manifest.status()).toBe(200);
  const manifestBody = await manifest.json();
  expect(manifestBody.id).toBe('/');
  expect(manifestBody.lang).toBe('en');
  expect(manifestBody.start_url).toBe('/en');

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain('hreflang="x-default" href="https://tealguard.eu/en"');
  expect(sitemapBody).toContain('hreflang="x-default" href="https://tealguard.eu/en/platform"');
  expect(sitemapBody).toContain('hreflang="x-default" href="https://tealguard.eu/en/baseline"');
  expect((sitemapBody.match(/<loc>/g) ?? []).length).toBe(28);

  const tunnelHealth = await request.get('/api/healthz', {
    headers: { Host: '5d6ceb989608.smartclover.ro' },
    maxRedirects: 0
  });
  expect(tunnelHealth.status()).toBe(200);
});

test('unknown routes use a server-rendered styled English 404', async ({ page, request, browser }) => {
  const unknownPaths = [
    '/not-a-public-route',
    '/en/not-a-public-route',
    '/ro/not-a-public-route',
    '/apiary',
    '/api-docs',
    '/api2',
    '/favicon.ico-help'
  ];

  for (const path of unknownPaths) {
    const response = await page.goto(path);
    expect(response?.status(), path).toBe(404);
    expect(page.url(), path).toContain(path);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('.not-found')).toBeVisible();
    await expect(page.getByRole('banner').getByRole('link', { name: 'TealGuard home' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Return to TealGuard' })).toHaveAttribute('href', '/en');

    const visualState = await page.locator('.not-found').evaluate((element) => ({
      background: getComputedStyle(element).backgroundColor,
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth
    }));
    expect(visualState.background).toBe('rgb(6, 26, 26)');
    expect(visualState.overflow).toBe(0);

    const rawResponse = await request.get(path);
    expect(rawResponse.status(), path).toBe(404);
    expect(rawResponse.headers()['content-language'], path).toBe('en');
    const rawHtml = await rawResponse.text();
    expect(rawHtml, path).toContain('<html lang="en">');
    expect(rawHtml, path).toContain('<h1>Page not found</h1>');
    expect(rawHtml, path).toContain('>Return to TealGuard</a>');
  }

  const noScriptContext = await browser.newContext({ javaScriptEnabled: false });
  const noScriptPage = await noScriptContext.newPage();
  for (const path of unknownPaths) {
    const response = await noScriptPage.goto(path);
    expect(response?.status(), path).toBe(404);
    await expect(noScriptPage.locator('html')).toHaveAttribute('lang', 'en');
    await expect(noScriptPage.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
    await expect(noScriptPage.getByRole('link', { name: 'Return to TealGuard' })).toBeVisible();
  }
  await noScriptContext.close();
});

test('core project content survives without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/en');
  await expect(page.getByRole('heading', { level: 1, name: 'TealGuard' })).toBeVisible();
  await expect(page.getByText('Four planned modules across one clinical pathway.')).toBeVisible();
  await expect(page.locator('.scene-narrative').getByText('CerviGuard today', { exact: true })).toBeVisible();
  await expect(page.locator('.scene-narrative').getByText('TealGuard next', { exact: true })).toBeVisible();
  await expect(page.locator('.scene-narrative').getByText('Four planned modules', { exact: true })).toBeVisible();
  await expect(page.getByText('Planned module', { exact: true })).toHaveCount(4);
  await expect(page.getByRole('button', { name: 'Play pathway' })).toHaveCount(0);
  await expect(page.getByRole('heading', { level: 2, name: 'TealGuard builds on CerviGuard' })).toBeVisible();
  await expect(page.locator('.scene-fallback')).toBeVisible();
  await page.goto('/en/baseline');
  await expect(page.getByRole('heading', { level: 1, name: 'CerviGuard evidence for TealGuard' })).toBeVisible();
  await expect(page.locator('.evidence-record')).toHaveCount(2);
  await expect(page.getByText('This public record does not establish')).toBeVisible();
  await expect(page.getByRole('link', { name: /Open the machine-readable evidence manifest/ })).toBeVisible();
  await context.close();
});

test('baseline evidence reflows without clipping or overlap', async ({ page, isMobile }) => {
  test.skip(isMobile, 'cross-viewport evidence check runs once');

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 1024, height: 768 },
    { width: 768, height: 1024 },
    { width: 390, height: 844 },
    { width: 320, height: 568 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/en/baseline');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${viewport.width}px overflow`).toBe(true);
    await expect(page.locator('.evidence-record')).toHaveCount(2);
    for (const record of await page.locator('.evidence-record').all()) {
      await record.scrollIntoViewIfNeeded();
      await expect(record).toBeVisible();
    }
    const provenance = page.locator('.provenance-list').first();
    await provenance.scrollIntoViewIfNeeded();
    expect((await provenance.boundingBox())?.width, `${viewport.width}px provenance width`).toBeLessThanOrEqual(viewport.width);
  }
});

test('reduced-motion mode keeps a readable static pathway', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en');
  await page.getByRole('button', { name: 'Play pathway' }).click();
  await expect(page.locator('.hero-scene')).toHaveAttribute('data-scene-act', 'modules');
  await expect(page.locator('.hero-scene')).toHaveAttribute('data-playback', 'stopped');
  await expect(page.getByRole('button', { name: 'Replay pathway' })).toBeVisible();
  await expect(page.getByRole('button', { name: /NavigatorAI/ })).toBeVisible();
  await page.getByRole('button', { name: /NavigatorAI/ }).click();
  await expect(page.locator('.scene-description')).toContainText('NavigatorAI');
  await expect(page.locator('.scene-description')).toContainText('qualified professionals');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('pathway controls stay readable and non-overlapping at supported widths', async ({ page, isMobile }) => {
  test.skip(isMobile, 'cross-viewport pathway layout check runs once');

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 1024, height: 900 },
    { width: 620, height: 900 },
    { width: 390, height: 844 },
    { width: 320, height: 844 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/ro');
    const scene = page.locator('.hero-scene');
    const controls = page.locator('.scene-controls');
    const description = page.locator('.scene-description');
    await expect(page.getByRole('button', { name: 'Porniți parcursul' })).toBeVisible();
    await expect(page.getByText('Modul planificat', { exact: true })).toHaveCount(4);

    const [sceneBox, controlsBox, descriptionBox] = await Promise.all([
      scene.boundingBox(),
      controls.boundingBox(),
      description.boundingBox()
    ]);
    expect(sceneBox, `${viewport.width}px scene`).not.toBeNull();
    expect(controlsBox, `${viewport.width}px controls`).not.toBeNull();
    expect(descriptionBox, `${viewport.width}px description`).not.toBeNull();
    expect((controlsBox?.y ?? 0) + (controlsBox?.height ?? 0), `${viewport.width}px controls/description overlap`)
      .toBeLessThanOrEqual((descriptionBox?.y ?? 0) + 1);
    expect((descriptionBox?.y ?? 0) + (descriptionBox?.height ?? 0), `${viewport.width}px scene containment`)
      .toBeLessThanOrEqual((sceneBox?.y ?? 0) + (sceneBox?.height ?? 0) + 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), `${viewport.width}px overflow`).toBe(true);
  }
});

test('a lost WebGL context restores the static hero fallback', async ({ page }) => {
  await page.goto('/en');
  const scene = page.locator('.hero-scene');
  if ((await scene.getAttribute('data-scene-mode')) !== 'webgl') return;

  await expect(scene).toHaveAttribute('data-scene-ready', 'true', { timeout: 10_000 });
  await page.locator('.scene-canvas canvas').dispatchEvent('webglcontextlost');
  await expect(scene).toHaveAttribute('data-scene-mode', 'static');
  await expect(scene).toHaveAttribute('data-scene-ready', 'false');
  await expect(page.locator('.scene-fallback')).toBeVisible();
});

test('mobile navigation opens without covering or widening the page', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile navigation check');
  await page.goto('/en');
  await page.locator('.mobile-menu > summary').click();
  await expect(page.locator('.mobile-menu nav')).toBeVisible();
  await expect(page.locator('.mobile-menu nav').getByRole('link', { name: 'Platform' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);

  await page.setViewportSize({ width: 320, height: 568 });
  const lastLink = page.locator('.mobile-menu nav a').last();
  await lastLink.scrollIntoViewIfNeeded();
  await expect(lastLink).toBeVisible();
  await lastLink.focus();
  await expect(lastLink).toBeFocused();
});

test('official marks retain their source assets and compliant minimum sizes', async ({ page, isMobile }) => {
  test.skip(isMobile, 'cross-viewport check runs once');

  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
    { width: 360, height: 640 },
    { width: 320, height: 568 }
  ]) {
    await page.setViewportSize(viewport);
    await page.goto('/ro');

    const eu = page.locator('.funding-bar__eu');
    const government = page.locator('.funding-bar__government');
    const programme = page.locator('.funding-bar__programme');
    await expect(eu).toHaveAttribute('src', '/images/funding/eu-cofunded-ro.png');
    await expect(government).toHaveAttribute('src', '/images/funding/guvernul-romaniei.png');
    await expect(programme).toHaveAttribute('src', '/images/funding/programul-sanatate.png');

    expect((await eu.boundingBox())?.height, `${viewport.width}px EU mark`).toBeGreaterThanOrEqual(38);
    expect((await government.boundingBox())?.width, `${viewport.width}px Government mark`).toBeGreaterThanOrEqual(67);
    expect((await programme.boundingBox())?.height, `${viewport.width}px programme mark`).toBeGreaterThanOrEqual(38);

    const scene = await page.locator('.hero-scene').boundingBox();
    expect(scene?.y, `${viewport.width}px scene position`).toBeLessThan(viewport.height - 100);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
  }
});

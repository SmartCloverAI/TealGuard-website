import { expect, test } from '@playwright/test';

const sectionRoutes = [
  'project',
  'platform',
  'validation',
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
  expect(versionBody.version).toBe('1.0.2');
  expect(versionBody.revision).toMatch(/^[0-9a-f]{7,40}$/);
  expect(Number.isNaN(Date.parse(versionBody.builtAt))).toBe(false);

  const directAsset = await request.get('/images/funding/eu-cofunded-ro.png');
  expect(directAsset.status()).toBe(200);
  expect(directAsset.headers()['x-content-type-options']).toBe('nosniff');

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

  const tunnelHealth = await request.get('/api/healthz', {
    headers: { Host: '5d6ceb989608.smartclover.ro' },
    maxRedirects: 0
  });
  expect(tunnelHealth.status()).toBe(200);
});

test('core project content survives without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/en');
  await expect(page.getByRole('heading', { level: 1, name: 'TealGuard' })).toBeVisible();
  await expect(page.getByText('Four planned modules across one clinical pathway.')).toBeVisible();
  await expect(page.locator('.scene-fallback')).toBeVisible();
  await context.close();
});

test('reduced-motion mode keeps a readable static pathway', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en');
  await expect(page.getByRole('button', { name: /NavigatorAI/ })).toBeVisible();
  await page.getByRole('button', { name: /NavigatorAI/ }).click();
  await expect(page.locator('.scene-description')).toContainText('NavigatorAI');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
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

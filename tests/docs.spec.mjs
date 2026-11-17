import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const representativePages = [
  '/', '/getting-started.html', '/pushing.html',
  '/enterprise/telemetry.html', '/deploy/deploying-to-agents/index.html',
];

test('brand, responsive layout, and page assets', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const [index, url] of representativePages.entries()) {
    const response = await page.goto(url);
    expect(response.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.locator('body')).toHaveCSS('font-family', /Mulish/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const logo = page.getByRole('img', { name: 'Cachix', exact: true });
    expect(await logo.evaluate((img) => img.complete && img.naturalWidth > 0)).toBe(true);
    await page.screenshot({ path: testInfo.outputPath(`page-${index}.png`) });
  }
  expect(errors).toEqual([]);
  if (page.viewportSize().width >= 1100) {
    const header = page.locator('header.header');
    expect((await header.boundingBox()).height).toBeLessThanOrEqual(56);
    expect((await header.getByRole('img', { name: 'Cachix', exact: true }).boundingBox()).width).toBeLessThanOrEqual(96);
    const login = header.getByRole('link', { name: 'Log in', exact: true });
    await expect(login).toBeVisible();
    expect((await login.boundingBox()).height).toBeLessThanOrEqual(36);
    await expect(header.getByRole('link', { name: 'Sign up', exact: true })).toHaveCount(0);
    const blog = header.getByRole('link', { name: 'Blog', exact: true });
    await blog.hover();
    await expect(blog).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  }
});

test('overview task tabs support keyboard selection, copying, and navigation', async ({ page, context, baseURL }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
  await page.goto('/');
  const push = page.getByRole('tab', { name: 'Push a build', exact: true });
  const use = page.getByRole('tab', { name: 'Use an existing cache', exact: true });
  await expect(push).toHaveAttribute('aria-selected', 'true');
  await push.focus();
  await push.press('ArrowRight');
  await expect(use).toBeFocused();
  await expect(use).toHaveAttribute('aria-selected', 'true');
  const panel = page.getByRole('tabpanel', { name: 'Use an existing cache', exact: true });
  await expect(panel).toBeVisible();
  await panel.locator('button[title="Copy to clipboard"]').first().click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe('cachix use mycache');
  await panel.getByRole('link', { name: 'Use an existing cache', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('Use an existing cache');
  await page.goBack();
  await expect(page.locator('h1')).toHaveText('Cachix documentation');
  await page.getByRole('tab', { name: 'Use an existing cache', exact: true }).click();
  await expect(page.getByRole('tabpanel', { name: 'Use an existing cache', exact: true })).toBeVisible();
});

test('search opens by keyboard, returns results, and closes with Escape', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Search', exact: true })).toBeEnabled();
  await page.keyboard.press('ControlOrMeta+k');
  const dialog = page.getByRole('dialog', { name: 'Search' });
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole('textbox');
  await expect(input).toBeFocused();
  await input.fill('garbage collection');
  const result = dialog.locator('.pagefind-ui__result-link').filter({ hasText: 'Garbage Collection' }).first();
  await expect(result).toBeVisible();
  await expect(result).toHaveAttribute('href', /\/garbage-collection\.html(?:#.*)?$/);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  // Pagefind clears its query on Escape.
  await input.fill('garbage collection');
  await result.click();
  await expect(page.locator('h1')).toHaveText('Garbage Collection');
});

test('legacy search query and no-results state', async ({ page }) => {
  await page.goto('/search.html?q=pins');
  const search = page.locator('#docs-search');
  await expect(search.getByRole('textbox')).toHaveValue('pins');
  const result = search.locator('.pagefind-ui__result-link').filter({ hasText: /^Pins$/ }).first();
  await expect(result).toBeVisible();
  await expect(result).toHaveAttribute('href', /\/pins\.html(?:#.*)?$/);
  await search.getByRole('textbox').fill('zzzz-no-such-cachix-page-zzzz');
  await expect(search.locator('.pagefind-ui__message')).toContainText(/no results/i);
  await search.getByRole('textbox').fill('pins');
  await expect(result).toBeVisible();
  await result.click();
  await expect(page.locator('h1')).toHaveText('Pins');
  await page.goBack();
  await expect(search.getByRole('textbox')).toHaveValue('pins');
  await expect(result).toBeVisible();
});

test('client navigation preserves the document and initializes page controls', async ({ page, context, baseURL }) => {
  const navigate = async (name) => {
    const menu = page.getByRole('button', { name: 'Menu', exact: true });
    if (await menu.isVisible()) await menu.click();
    await page.locator('#starlight__sidebar').getByRole('link', { name, exact: true }).click();
  };
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
  await page.goto('/');
  await page.evaluate(() => { window.docsNavigationMarker = true; });
  await navigate('Pushing to Cachix');
  await expect(page.locator('h1')).toHaveText('Pushing to Cachix');
  expect(await page.evaluate(() => window.docsNavigationMarker)).toBe(true);
  await page.locator('.expressive-code button[title="Copy to clipboard"]').first().click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe('nix-build | cachix push mycache');
  await page.goBack();
  await expect(page.locator('h1')).toHaveText('Cachix documentation');
  await navigate('Pins');
  await expect(page.locator('h1')).toHaveText('Pins');
  expect(await page.evaluate(() => window.docsNavigationMarker)).toBe(true);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.keyboard.press('ControlOrMeta+k');
  const dialog = page.getByRole('dialog', { name: 'Search' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('textbox')).toBeFocused();
});

test('copy commands without the terminal prompt', async ({ page, context, baseURL }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
  await page.goto('/configuring-a-cache.html');
  const buttons = page.locator('.expressive-code button[title="Copy to clipboard"]');
  await buttons.nth(0).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe('cachix authtoken <my auth token>');
  await buttons.nth(1).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe('cachix generate-keypair <mycache>');
});

test('mobile menu, keyboard focus, and navigation', async ({ page }) => {
  test.skip(page.viewportSize().width >= 800, 'Mobile menu is replaced by the desktop sidebar.');
  await page.goto('/getting-started.html');
  const button = page.getByRole('button', { name: 'Menu', exact: true });
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('.main-frame')).toHaveAttribute('inert', '');
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(button).toBeFocused();
  await button.press('Enter');
  await page.locator('#starlight__sidebar').getByRole('link', { name: 'Pushing to Cachix', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('Pushing to Cachix');
  await expect(page.locator('body')).not.toHaveAttribute('data-mobile-menu-expanded', '');
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('skip link, legacy anchors, and previous/next navigation', async ({ page }) => {
  await page.goto('/getting-started.html');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#_top$/);
  await page.locator('a[rel="next"]').click();
  await expect(page.locator('h1')).toHaveText('Use an existing cache');
  await page.goto('/faq.html#cachix-use-effects');
  const anchor = page.locator('#cachix-use-effects');
  await expect(anchor).toBeAttached();
  expect(await anchor.evaluate((node) => {
    const top = node.getBoundingClientRect().top;
    return top >= 0 && top < innerHeight;
  })).toBe(true);
});

test('WCAG accessibility on articles, tables, and search', async ({ page }) => {
  for (const url of ['/', '/getting-started.html', '/enterprise/telemetry.html', '/search.html?q=pins']) {
    await page.goto(url);
    if (url.includes('search.html')) await expect(page.locator('#docs-search .pagefind-ui__result-link').first()).toBeVisible();
    if (url.includes('telemetry') && page.viewportSize().width < 800) {
      const table = page.getByRole('table');
      await expect(table).toHaveAttribute('tabindex', '0');
      await table.focus();
      await page.keyboard.press('ArrowRight');
      await expect.poll(() => table.evaluate((node) => node.scrollLeft)).toBeGreaterThan(0);
    }
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    expect(audit.violations).toEqual([]);
  }
});

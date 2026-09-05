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
    const button = page.locator('.header .cachix-signup');
    expect((await button.boundingBox()).height).toBeLessThanOrEqual(44);
  }
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
});

test('copy commands without the terminal prompt', async ({ page, context, baseURL }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: new URL(baseURL).origin });
  await page.goto('/getting-started.html');
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
});

test('skip link, legacy anchors, and previous/next navigation', async ({ page }) => {
  await page.goto('/getting-started.html');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#_top$/);
  await page.locator('a[rel="next"]').click();
  await expect(page.locator('h1')).toHaveText('Pushing to Cachix');
  await page.goto('/faq.html#cachix-use-effects');
  const anchor = page.locator('#cachix-use-effects');
  await expect(anchor).toBeAttached();
  expect(await anchor.evaluate((node) => {
    const top = node.getBoundingClientRect().top;
    return top >= 0 && top < innerHeight;
  })).toBe(true);
});

test('WCAG accessibility on articles, tables, and search', async ({ page }) => {
  for (const url of ['/getting-started.html', '/enterprise/telemetry.html', '/search.html?q=pins']) {
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

import { expect, test } from '@playwright/test';

// Token Studio's page: the app titles in each app's top bar switch between
// the two apps, and a design sent from Frame Studio becomes Token Maker's frame.

test("the app titles in each app's top bar switch between Token Maker and Frame Studio", async ({ page }) => {
  await page.goto('/');
  // There is no bar of its own above the apps.
  await expect(page.locator('body > #root header')).toHaveCount(0);
  const maker = page.frameLocator('iframe[title="Token Maker"]');
  const studio = page.frameLocator('iframe[title="Frame Studio"]');
  await expect(maker.getByRole('button', { name: 'Token Maker', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(maker.getByRole('button', { name: /upload image/i }).first()).toBeVisible();
  await expect(page.locator('iframe[title="Frame Studio"]')).toHaveCount(0);

  await maker.getByRole('button', { name: 'Frame Studio', exact: true }).click();
  await expect(page.locator('iframe[title="Frame Studio"]')).toBeVisible();
  await expect(page.locator('iframe[title="Token Maker"]')).toBeHidden();
  await expect(studio.getByRole('button', { name: 'Frame Studio', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(studio.getByRole('button', { name: 'Export' })).toBeVisible();

  // The choice is remembered.
  await page.reload();
  await expect(page.locator('iframe[title="Frame Studio"]')).toBeVisible();

  await studio.getByRole('button', { name: 'Token Maker', exact: true }).click();
  await expect(page.locator('iframe[title="Token Maker"]')).toBeVisible();
  await expect(page.locator('iframe[title="Frame Studio"]')).toBeHidden();
});

test('a theme picked in one app colours both, light ones included', async ({ page }) => {
  await page.goto('/');
  const maker = page.frameLocator('iframe[title="Token Maker"]');
  await maker.getByRole('button', { name: 'Themes' }).click();
  await expect(maker.getByRole('menuitemradio')).toHaveText([/^Dark/, /^Light/, /^Rustic/, /^Night/, /^Day/, /^Sunset/, /^Ocean/]);
  await maker.getByRole('menuitemradio', { name: /^Ocean/ }).click();
  await expect(maker.locator('html')).toHaveAttribute('data-palette', 'ocean');
  await maker.getByRole('button', { name: 'Frame Studio', exact: true }).click();
  const studio = page.frameLocator('iframe[title="Frame Studio"]');
  await expect(studio.locator('html')).toHaveAttribute('data-palette', 'ocean');
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'ocean');
  // A light theme makes every page light; there is no separate light/dark switch.
  await studio.getByRole('button', { name: 'Themes' }).click();
  await studio.getByRole('menuitemradio', { name: /^Day/ }).click();
  for (const html of [studio.locator('html'), maker.locator('html'), page.locator('html')]) {
    await expect(html).toHaveAttribute('data-palette', 'day');
    await expect(html).toHaveAttribute('data-theme', 'light');
  }
});

test('Send to Token Maker uses the Frame Studio design as the token frame', async ({ page }) => {
  await page.goto('/');
  await page.frameLocator('iframe[title="Token Maker"]').getByRole('button', { name: 'Frame Studio', exact: true }).click();
  const studio = page.frameLocator('iframe[title="Frame Studio"]');
  const name = await studio.getByRole('textbox', { name: 'Project name' }).inputValue();
  // In Token Studio, Export starts on "Frame for Token Maker".
  await studio.getByRole('button', { name: 'Export' }).click();
  await expect(studio.getByRole('combobox', { name: 'Export as' })).toHaveValue('tokenMaker');
  await studio.getByRole('button', { name: 'Send to Token Maker' }).click();

  await expect(page.locator('iframe[title="Token Maker"]')).toBeVisible();
  const maker = page.frameLocator('iframe[title="Token Maker"]');
  await expect(maker.getByText(`Opened "${name}" as the frame.`)).toBeVisible();
  // It is kept in Token Maker's design library too.
  await expect(maker.getByRole('radio', { name: new RegExp(name) }).first()).toBeVisible();
});

test("on their own pages, Frame Studio exports a PNG first and Token Maker's pages still open", async ({ page }) => {
  await page.goto('/frame-studio/');
  await page.getByRole('button', { name: 'Export' }).click();
  await expect(page.getByRole('combobox', { name: 'Export as' })).toHaveValue('png');
  await expect(page.getByRole('option', { name: 'Frame for Token Maker' })).toHaveCount(0);
  await page.goto('/token-maker/about');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/about/i);
});

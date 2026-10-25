import { expect, test } from '@playwright/test';

// Token Studio's page: the title buttons switch between the two apps, and a
// design sent from Frame Studio becomes Token Maker's frame.

test('the title buttons switch between Token Maker and Frame Studio', async ({ page }) => {
  await page.goto('/');
  const tokenMakerButton = page.getByRole('button', { name: 'Token Maker', exact: true });
  const frameStudioButton = page.getByRole('button', { name: 'Frame Studio', exact: true });
  await expect(tokenMakerButton).toHaveAttribute('aria-pressed', 'true');
  await expect(page.frameLocator('iframe[title="Token Maker"]').getByRole('button', { name: /upload image/i }).first()).toBeVisible();
  await expect(page.locator('iframe[title="Frame Studio"]')).toHaveCount(0);

  await frameStudioButton.click();
  await expect(frameStudioButton).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('iframe[title="Frame Studio"]')).toBeVisible();
  await expect(page.locator('iframe[title="Token Maker"]')).toBeHidden();
  await expect(page.frameLocator('iframe[title="Frame Studio"]').getByRole('button', { name: 'Export' })).toBeVisible();

  // The choice is remembered.
  await page.reload();
  await expect(page.getByRole('button', { name: 'Frame Studio', exact: true })).toHaveAttribute('aria-pressed', 'true');

  await tokenMakerButton.click();
  await expect(page.locator('iframe[title="Token Maker"]')).toBeVisible();
  await expect(page.locator('iframe[title="Frame Studio"]')).toBeHidden();
});

test('Send to Token Maker uses the Frame Studio design as the token frame', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Frame Studio', exact: true }).click();
  const studio = page.frameLocator('iframe[title="Frame Studio"]');
  const name = await studio.getByRole('textbox', { name: 'Project name' }).inputValue();
  // In Token Studio, Export starts on "Frame for Token Maker".
  await studio.getByRole('button', { name: 'Export' }).click();
  await expect(studio.getByRole('combobox', { name: 'Export as' })).toHaveValue('tokenMaker');
  await studio.getByRole('button', { name: 'Send to Token Maker' }).click();

  await expect(page.getByRole('button', { name: 'Token Maker', exact: true })).toHaveAttribute('aria-pressed', 'true');
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

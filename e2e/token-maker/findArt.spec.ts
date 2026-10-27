import { expect, test, type Page } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { openSection } from './panel';

// Find art online, and bringing a found picture back (paste, drop, link).
// Every route ends in the same import, and the token must still export:
// a picture drawn from another site without permission would "taint" the
// canvas and make exporting fail.

const PNG = readFileSync('e2e/token-maker/fixtures/goblin-boss.png');
const BLOCKED = 'That site blocks direct loading. Right-click the image, choose “Copy image”, then press Ctrl+V here.';

const tokenName = (page: Page) => page.locator('.token-summary__name').first();

const importPanel = (page: Page) => openSection(page, 'Import');

/** Exports a PNG and checks it is a real picture. */
async function expectExports(page: Page, isMobile: boolean) {
  const download = page.waitForEvent('download');
  if (isMobile) await page.locator('.bottom-sheet__summary').getByRole('button', { name: 'Export' }).click();
  else await page.locator('.bottom-bar').getByRole('button', { name: 'Export PNG' }).click();
  const file = readFileSync(await (await download).path());
  expect(file.subarray(1, 4).toString()).toBe('PNG');
  expect(file.readUInt32BE(16)).toBeGreaterThan(0);
}

/**
 * Sites for these tests: open.example lets other sites load its pictures
 * (CORS), strict.example doesn't, and the proxy has nothing to give. No
 * request reaches the real internet.
 */
async function fakeSites(page: Page) {
  // Routed for the whole browser, so tabs the search buttons open are covered too.
  const context = page.context();
  await context.route((url) => url.hostname !== 'localhost', (route) => route.abort('failed'));
  await context.route('https://www.google.com/**', (route) => route.fulfill({ contentType: 'text/html', body: '<title>Results</title>' }));
  await context.route('https://open.example/**', (route) =>
    route.fulfill({ contentType: 'image/png', body: PNG, headers: { 'Access-Control-Allow-Origin': '*' } }),
  );
  // To the page, a refused request looks the same as one CORS blocks. (Playwright's own answers skip CORS checks.)
  await context.route('https://strict.example/**', (route) => route.abort('accessdenied'));
  await context.route('**/api/**', (route) => route.fulfill({ status: 502, json: { error: { code: 'site_refused', message: '' } } }));
}

test.beforeEach(async ({ page }) => {
  await page.goto('/token-maker/');
  await page.evaluate(() => new Promise((r) => {
    const req = indexedDB.deleteDatabase('token-maker');
    req.onsuccess = req.onerror = req.onblocked = () => r(null);
  }));
  await page.reload();
  await fakeSites(page);
});

test('the search buttons open each site with the words filled in', async ({ page }) => {
  const panel = await importPanel(page);
  const sites = panel.getByRole('group', { name: 'Search on' });
  await expect(sites.getByRole('button', { name: 'Google Images' })).toBeDisabled();

  const box = panel.getByRole('searchbox', { name: 'Find art online' });
  await box.fill('goblin shaman');
  const google = sites.getByRole('link', { name: 'Google Images' });
  await expect(google).toHaveAttribute('href', 'https://www.google.com/search?udm=2&q=goblin%20shaman%20fantasy%20art');
  await expect(google).toHaveAttribute('target', '_blank');
  await expect(google).toHaveAttribute('rel', 'noopener noreferrer');
  await expect(sites.getByRole('link')).toHaveCount(6);

  await panel.getByRole('switch', { name: 'Add “fantasy art”' }).click();
  await expect(sites.getByRole('link', { name: 'ArtStation' })).toHaveAttribute('href', 'https://www.artstation.com/search?query=goblin%20shaman');

  // Enter searches Google Images in a new tab.
  const popup = page.waitForEvent('popup');
  await box.press('Enter');
  await expect.poll(async () => (await popup).url()).toContain('https://www.google.com/search?udm=2&q=goblin%20shaman');
});

test('a picture pasted with Ctrl+V becomes the art and exports', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'desktop paste');
  await page.evaluate(async () => {
    const blob = await (await fetch('https://open.example/goblin.png')).blob();
    const dt = new DataTransfer();
    dt.items.add(new File([blob], 'image.png', { type: 'image/png' }));
    document.body.dispatchEvent(new ClipboardEvent('paste', { clipboardData: dt, bubbles: true, cancelable: true }));
  });
  await expect(page.getByTestId('token-canvas')).toBeVisible();
  await expect(page.locator('.toast--error')).toHaveCount(0);
  await expectExports(page, !!isMobile);
});

test('a dropped picture file becomes the art and exports', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'desktop drag');
  await page.evaluate(async () => {
    const blob = await (await fetch('https://open.example/goblin.png')).blob();
    const dt = new DataTransfer();
    dt.items.add(new File([blob], 'goblin-boss.png', { type: 'image/png' }));
    window.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true, cancelable: true }));
  });
  await expect(tokenName(page)).toHaveText('Goblin Boss');
  await expectExports(page, !!isMobile);
});

test('a dropped file that is not a picture says so', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'desktop drag');
  await page.evaluate(() => {
    const dt = new DataTransfer();
    dt.items.add(new File(['hello'], 'notes.txt', { type: 'text/plain' }));
    window.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true, cancelable: true }));
  });
  await expect(page.getByText("That isn't an image file.")).toBeVisible();
});

test('an image dragged from another tab loads straight from its site and exports', async ({ page, isMobile }) => {
  test.skip(!!isMobile, 'desktop drag');
  await page.evaluate(() => {
    const dt = new DataTransfer();
    dt.setData('text/uri-list', 'https://open.example/gallery/owlbear');
    dt.setData('text/html', '<a href="https://open.example/gallery/owlbear"><img src="https://open.example/art/owlbear.png"></a>');
    window.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true, cancelable: true }));
  });
  await expect(tokenName(page)).toHaveText('Owlbear');
  await expectExports(page, !!isMobile);
});

test('a pasted image link loads and exports', async ({ page, isMobile }) => {
  const panel = await importPanel(page);
  await panel.getByRole('textbox', { name: 'Web address' }).fill('https://open.example/art/cave-troll.png');
  await panel.getByRole('button', { name: 'Get' }).click();
  await expect(tokenName(page)).toHaveText('Cave Troll');
  await expectExports(page, !!isMobile);
});

test('a site that blocks direct loading says how to copy and paste instead', async ({ page }) => {
  const panel = await importPanel(page);
  await panel.getByRole('textbox', { name: 'Web address' }).fill('https://strict.example/art/lich.png');
  await panel.getByRole('button', { name: 'Get' }).click();
  await expect(panel.getByRole('alert')).toHaveText(BLOCKED);
});

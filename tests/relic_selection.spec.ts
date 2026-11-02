import { expect, test, type Page } from '@playwright/test';
import { tryDecodeUserRunState } from '../src/lib/functions/userRunStateHelpers';

test.use({ viewport: { width: 1280, height: 900 } });

let runtimeErrors: string[];
test.beforeEach(async ({ page }) => {
	runtimeErrors = [];
	page.on('pageerror', (error) => runtimeErrors.push(error.message));
	page.on('response', (response) => {
		if (response.status() >= 400 && response.url().includes('/images/relics/')) {
			runtimeErrors.push(`${response.status()} ${response.url()}`);
		}
	});
});
test.afterEach(() => expect(runtimeErrors).toEqual([]));

async function openRelics(page: Page) {
	await page.locator('.footerBar [role="button"]').click();
	await expect(page.locator('#reset')).toBeVisible();
}

async function closeRelics(page: Page) {
	await page.keyboard.press('Escape');
	await expect(page.locator('#reset')).toHaveCount(0);
}

const card = (page: Page, id: string) => page.locator(`[data-relic-card][id="${id}"]`);
const blackId = 'rogue_6_relic_fight_30';

test('staged relics update stats and retain their stage when reopening the overlay', async ({
	page
}) => {
	await page.setViewportSize({ width: 375, height: 844 });
	await page.goto('http://localhost:4173/en/stages/ISW-NO_猎犬病原');
	const hp = page.locator('#enemy_2137_shsdgo p[data-id="hp-value"]');
	const baseHp = Number(await hp.textContent());
	await openRelics(page);
	const relic = card(page, blackId);
	const toggle = relic.locator('[data-relic-toggle]');
	await expect(toggle).toHaveAttribute('aria-label', '探测先锋');
	await toggle.click();
	await relic.locator('[data-stage-index="2"]').click();
	await expect(relic.locator('[data-stage-index="2"]')).toHaveAttribute('aria-pressed', 'true');
	await expect(toggle).toContainText('(x3)');
	await closeRelics(page);
	await expect.poll(async () => Number(await hp.textContent())).toBeCloseTo(baseHp * 1.6, 0);
	await openRelics(page);
	await expect(relic.locator('[data-stage-index="2"]')).toHaveAttribute('aria-pressed', 'true');
	await toggle.focus();
	await page.keyboard.press('Space');
	await expect(toggle).toHaveAttribute('aria-pressed', 'false');
	await expect(relic.locator('[data-stage-index]')).toHaveCount(0);
	await toggle.click();
	await expect(relic.locator('[data-stage-index="0"]')).toHaveAttribute('aria-pressed', 'true');
	await page.locator('#reset').click();
	await expect(toggle).toHaveAttribute('aria-pressed', 'false');
	await page.locator('.footerBar [role="presentation"].fixed').click({ position: { x: 5, y: 5 } });
	await expect(page.locator('#reset')).toHaveCount(0);
	await expect(hp).toHaveText(String(baseHp));
});

test('legacy saved stages load and newly selected stages survive share-code restoration', async ({
	page
}) => {
	await page.goto('http://localhost:4173/zh/stages/ISW-NO_猎犬病原?state=AQUPAwAHAwQAD2QF');
	await openRelics(page);
	const relic = card(page, blackId);
	await expect(relic.locator('[data-stage-index="2"]')).toHaveAttribute('aria-pressed', 'true');
	await relic.locator('[data-stage-index="5"]').click();
	await closeRelics(page);
	await page.locator('#settings-toggle').click();
	const code = (await page.locator('#combined-settings-dialog code').textContent())!.trim();
	expect(tryDecodeUserRunState(code)?.relics.find((entry) => entry.id === blackId)?.count).toBe(6);
	const restoredUrl = new URL(page.url());
	restoredUrl.searchParams.set('state', code);
	await page.goto(restoredUrl.href);
	await openRelics(page);
	await expect(relic.locator('[data-stage-index="5"]')).toHaveAttribute('aria-pressed', 'true');
});

test('Black wave options and overlay selections update each other', async ({ page }) => {
	await page.goto('http://localhost:4173/zh/stages/ISW-NO_猎犬病原');
	await page.getByRole('button', { name: /敌人路线演算 v0.5/ }).click();
	const option = page
		.getByRole('button', { name: /敌人路线演算 v0.5/ })
		.locator('..')
		.getByRole('button', { name: /谒日之祈/ });
	await option.click();
	await expect(option).toHaveAttribute('aria-pressed', 'true');
	await openRelics(page);
	const toggle = card(page, 'rogue_6_relic_final_7').locator('[data-relic-toggle]');
	await expect(toggle).toHaveAttribute('aria-pressed', 'true');
	await toggle.click();
	await closeRelics(page);
	await expect(option).toHaveAttribute('aria-pressed', 'false');
});

test('variant selection preserves existing stages and adds the variant relic once', async ({
	page
}) => {
	await page.goto('http://localhost:4173/zh/stages/ISW-NO_铁腕迷思');
	await openRelics(page);
	await card(page, blackId).locator('[data-relic-toggle]').click();
	await card(page, blackId).locator('[data-stage-index="3"]').click();
	await closeRelics(page);
	const variants = page.locator('#stage-variant-selector button[aria-pressed]');
	await variants.nth(1).click();
	await variants.nth(0).click();
	await variants.nth(1).click();
	await openRelics(page);
	await expect(card(page, blackId).locator('[data-stage-index="3"]')).toHaveAttribute(
		'aria-pressed',
		'true'
	);
	await expect(card(page, 'rogue_6_relic_final_7').locator('[data-relic-toggle]')).toHaveAttribute(
		'aria-pressed',
		'true'
	);
});

test('Black stage defaults preserve an existing alternative and restore required selections', async ({
	page
}) => {
	await page.goto('http://localhost:4173/zh/stages/ISW-NO_灰坑');
	await openRelics(page);
	const defaultToggle = card(page, 'rogue_6_relic_final_7').locator('[data-relic-toggle]');
	const alternativeToggle = card(page, 'rogue_6_relic_final_9').locator('[data-relic-toggle]');
	await expect(defaultToggle).toHaveAttribute('aria-pressed', 'true');
	await alternativeToggle.click();
	await defaultToggle.click();
	await expect(defaultToggle).toHaveAttribute('aria-pressed', 'false');
	await expect(alternativeToggle).toHaveAttribute('aria-pressed', 'true');
	await page.locator('#reset').click();
	await expect(defaultToggle).toHaveAttribute('aria-pressed', 'true');
	await expect(alternativeToggle).toHaveAttribute('aria-pressed', 'false');
});

test('Sui stages and wave options use the same selection after reset', async ({ page }) => {
	await page.goto('http://localhost:4173/en/stages/ISW-NO_Whack-A-Mus');
	await page.getByRole('button', { name: /Enemy Routes Simulator v0.5/ }).click();
	const duck = page
		.getByRole('button', { name: /Enemy Routes Simulator v0.5/ })
		.locator('..')
		.getByRole('button', { name: /Duck Coin/ });
	await duck.click();
	await expect(duck).toHaveAttribute('aria-pressed', 'true');
	await openRelics(page);
	const relic = card(page, 'rogue_5_copper_U_2');
	await relic.locator('[data-relic-toggle]').click();
	await relic.locator('[data-stage-index="3"]').click();
	await expect(relic.locator('[data-relic-toggle]')).toContainText('(--)');
	await page.locator('#reset').click();
	await expect(card(page, 'rogue_5_copper_S_1').locator('[data-relic-toggle]')).toHaveAttribute(
		'aria-pressed',
		'false'
	);
	await closeRelics(page);
	await expect(duck).toHaveAttribute('aria-pressed', 'false');
});

test('Phantom hard relics share stage controls and remain mutually exclusive', async ({ page }) => {
	await page.goto('http://localhost:4173/en/stages/ISW-DF_Mind_the_Doors');
	await openRelics(page);
	const first = card(page, 'rogue_1_relic_c07');
	const second = card(page, 'rogue_1_relic_c08');
	await first.locator('[data-relic-toggle]').click();
	await first.locator('[data-stage-index="6"]').click();
	await expect(first.locator('[data-relic-toggle]')).toContainText('(65)');
	await second.locator('[data-relic-toggle]').click();
	await expect(first.locator('[data-relic-toggle]')).toHaveAttribute('aria-pressed', 'false');
	await expect(second.locator('[data-stage-index="0"]')).toHaveAttribute('aria-pressed', 'true');
	await second.locator('[data-stage-index="1"]').click();
	await expect(second.locator('[data-relic-toggle]')).toContainText('(ALL)');
	await closeRelics(page);
	await openRelics(page);
	await expect(second.locator('[data-stage-index="1"]')).toHaveAttribute('aria-pressed', 'true');
	await page.locator('#reset').click();
	await expect(second.locator('[data-relic-toggle]')).toHaveAttribute('aria-pressed', 'false');
});

test('recruitment-only relic aliases render in both the catalog and selected view', async ({
	page
}) => {
	await page.goto('http://localhost:4173/en/recruit');
	const heading = page.getByRole('button', { name: 'Integrated Strategies', exact: true });
	const panel = heading.locator('..');
	await heading.click();
	await panel.getByRole('button', { name: 'Phantom', exact: true }).click();
	const image = panel.getByRole('img', { name: 'Hand of Superspeed', exact: true });
	await image.scrollIntoViewIfNeeded();
	await expect(image).toHaveAttribute('src', '/images/relics/relic_hand_superspeed.webp');
	await expect
		.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth))
		.toBeGreaterThan(0);
	await image.locator('..').click();
	await heading.click();
	const selectedImage = panel.locator('img[width="75"]');
	await expect(selectedImage).toHaveAttribute('src', '/images/relics/relic_hand_superspeed.webp');
	await expect(selectedImage).toHaveAttribute('alt', 'Hand of Superspeed');
});

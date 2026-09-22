import { expect, test, type Locator, type Page } from '@playwright/test';

test.use({
	viewport: { width: 1280, height: 900 }
});

async function expectTimelineToAdvance(page: Page, timeline: Locator) {
	const initialTime = Number(await timeline.getAttribute('aria-valuenow'));
	await page.locator('canvas').click({ position: { x: 300, y: 180 } });
	await expect
		.poll(async () => Number(await timeline.getAttribute('aria-valuenow')), { timeout: 10_000 })
		.toBeGreaterThan(initialTime + 2);
}

test('stage simulator loads and its controls remain reactive', async ({ page }) => {
	const pageErrors: string[] = [];
	const consoleErrors: string[] = [];
	const failedResponses: string[] = [];

	page.on('pageerror', (error) => pageErrors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') consoleErrors.push(message.text());
	});
	page.on('response', (response) => {
		if (response.status() >= 400) {
			failedResponses.push(`${response.status()} ${response.url()}`);
		}
	});

	await page.goto('http://localhost:4173/en/stages/ISW-NO_Passage_Blockade');
	await expect(page).toHaveTitle(/Passage Blockade/);
	await page.getByRole('button', { name: /Enemy Routes Simulator v0.5/ }).click();

	const simulatorControls = page.locator('button.interface');
	await expect(simulatorControls).toHaveCount(3, { timeout: 60_000 });
	await expect(page.locator('canvas')).toBeVisible();
	await expect(page.getByRole('slider', { name: 'Simulation time' })).toBeVisible();
	await expect(page.getByText('Failed to load the stage simulator:', { exact: false })).toHaveCount(
		0
	);

	const speedControl = simulatorControls.nth(1);
	await expect(speedControl).toContainText('4X');
	await speedControl.click();
	await expect(speedControl).toContainText('1X');

	const rangeControl = page.getByRole('button', { name: /Show Attack Range/ });
	await expect(rangeControl).toContainText('YES');
	await rangeControl.click();
	await expect(rangeControl).toContainText('NO');

	await page.getByRole('button', { name: 'Reset' }).click();
	await expect(page.getByRole('slider', { name: 'Simulation time' })).toBeVisible();

	expect(pageErrors).toEqual([]);
	expect(consoleErrors).toEqual([]);
	expect(failedResponses).toEqual([]);
});

test('rogue 6 wave selection survives a simulator reset', async ({ page }) => {
	const pageErrors: string[] = [];
	const consoleErrors: string[] = [];
	const failedResponses: string[] = [];

	page.on('pageerror', (error) => pageErrors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') consoleErrors.push(message.text());
	});
	page.on('response', (response) => {
		if (response.status() >= 400) {
			failedResponses.push(`${response.status()} ${response.url()}`);
		}
	});

	await page.goto('http://localhost:4173/zh/stages/ISW-NO_猎犬病原');
	await expect(page).toHaveTitle(/猎犬病原/);
	await page.getByRole('button', { name: /敌人路线演算 v0.5/ }).click();

	const simulatorControls = page.locator('button.interface');
	await expect(simulatorControls).toHaveCount(3, { timeout: 60_000 });
	const timeline = page.getByRole('slider', { name: 'Simulation time' });
	await expect(timeline).toHaveAttribute('tabindex', '0', { timeout: 60_000 });

	const bearBonusOption = page.locator('#bonus-enemy-enemy_2002_bearmi');
	await expect(bearBonusOption).toHaveClass(/brightness-50/);
	await bearBonusOption.click();
	await expect(bearBonusOption).toHaveClass(/bg-slate-700/);

	await page.getByRole('button', { name: '自选', exact: true }).click();
	await expect(page.getByText('波次 #1', { exact: true })).toBeVisible();

	const selectedWaveOption = page.locator('#wave-option-w0f0-t1-1');
	await expect(selectedWaveOption).toHaveClass(/brightness-50/);
	await selectedWaveOption.click();
	await expect(selectedWaveOption).not.toHaveClass(/brightness-50/);
	await expect(timeline).toHaveAttribute('tabindex', '0', { timeout: 60_000 });
	await expectTimelineToAdvance(page, timeline);

	// Reset must not discard the selected wave configuration.
	const timeBeforeReset = Number(await timeline.getAttribute('aria-valuenow'));
	const canvas = page.locator('canvas');
	const revisionBeforeReset = await canvas.getAttribute('data-scenario-revision');
	const resetButton = page.getByRole('button', { name: '清除', exact: true });
	await resetButton.click();
	expect(pageErrors).toEqual([]);
	expect(consoleErrors).toEqual([]);
	await expect(canvas).not.toHaveAttribute('data-scenario-revision', revisionBeforeReset ?? '');
	await expect(timeline).toHaveAttribute('tabindex', '0', { timeout: 60_000 });
	await expect
		.poll(async () => Number(await timeline.getAttribute('aria-valuenow')), { timeout: 10_000 })
		.toBeLessThan(timeBeforeReset);
	await expect(selectedWaveOption).not.toHaveClass(/brightness-50/);
	await expectTimelineToAdvance(page, timeline);
	await page.getByRole('button', { name: '预定义', exact: true }).click();
	await expect(bearBonusOption).toHaveClass(/bg-slate-700/);
	await expect(page.locator('canvas')).toBeVisible();
	await expect(page.getByText('Failed to load the stage simulator:', { exact: false })).toHaveCount(
		0
	);

	expect(pageErrors).toEqual([]);
	expect(consoleErrors).toEqual([]);
	expect(failedResponses).toEqual([]);
});

test('multi-phase stage selection survives simulator resets', async ({ page }) => {
	const pageErrors: string[] = [];
	const consoleErrors: string[] = [];

	page.on('pageerror', (error) => pageErrors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') consoleErrors.push(message.text());
	});

	await page.goto("http://localhost:4173/en/stages/ISW-DF_Fate's_Finale");
	await expect(page).toHaveTitle(/Fate's Finale/);
	await page.getByRole('button', { name: /Enemy Routes Simulator v0.5/ }).click();

	const phases = page.locator('button[data-stage-phase]');
	await expect(phases).toHaveCount(3, { timeout: 60_000 });
	await expect(phases.nth(0)).toBeEnabled({ timeout: 60_000 });
	await expect(phases.nth(0)).toHaveClass(/bg-gray-500/);

	await phases.nth(1).click();
	await expect(phases.nth(1)).toHaveClass(/bg-gray-500/);
	await expect(phases.nth(0)).toHaveClass(/bg-gray-700/);
	await expect(page.locator('canvas')).toBeVisible();

	await page.getByRole('button', { name: 'Reset', exact: true }).click();
	await expect(phases.nth(1)).toHaveClass(/bg-gray-500/);

	await phases.nth(2).click();
	await expect(phases.nth(2)).toHaveClass(/bg-gray-500/);
	await expect(phases.nth(1)).toHaveClass(/bg-gray-700/);
	await expect(page.getByText('Failed to load the stage simulator:', { exact: false })).toHaveCount(
		0
	);

	expect(pageErrors).toEqual([]);
	expect(consoleErrors).toEqual([]);
});

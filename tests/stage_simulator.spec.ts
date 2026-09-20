import { expect, test } from '@playwright/test';

test.use({
	viewport: { width: 1280, height: 900 }
});

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

	await simulatorControls.first().click();
	await expect(page.getByRole('slider', { name: 'Simulation time' })).toBeVisible();

	expect(pageErrors).toEqual([]);
	expect(consoleErrors).toEqual([]);
	expect(failedResponses).toEqual([]);
});

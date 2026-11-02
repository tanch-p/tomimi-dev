import { test, expect } from '@playwright/test';

test.use({
	baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:4173',
	viewport: { width: 375, height: 844 }
});

test('theme preference persists across app and stage layouts without overriding utility colors', async ({
	page
}) => {
	await page.goto('/en');
	const toggle = page.getByRole('switch');
	await expect(toggle).toBeEnabled();
	await expect(toggle).not.toBeChecked();

	await page.locator('main').evaluate((main) => {
		const probe = document.createElement('div');
		probe.id = 'theme-utility-probe';
		probe.className = 'bg-neutral-800';
		main.append(probe);
	});
	const utilityColor = await page
		.locator('#theme-utility-probe')
		.evaluate((element) => getComputedStyle(element).backgroundColor);

	await toggle.focus();
	await page.keyboard.press('Space');
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
	await expect(page.locator('main')).toHaveCSS('background-color', 'oklch(0.97 0 none)');
	await expect(page.locator('#theme-utility-probe')).toHaveCSS('background-color', utilityColor);

	await page.goto('/zh/stages/ISW-NO_猎犬病原');
	await expect(toggle).toBeEnabled();
	await expect(toggle).toBeChecked();
	await expect(page.locator('main')).toHaveCSS('background-color', 'oklch(0.97 0 none)');
	await expect(page.locator('#floor-options img').last()).toHaveCSS(
		'background-color',
		'rgb(49, 49, 49)'
	);

	const switchBounds = await toggle.boundingBox();
	const languageBounds = await page.locator('header button').last().boundingBox();
	expect(switchBounds!.x + switchBounds!.width).toBeLessThanOrEqual(languageBounds!.x);
	expect(await page.locator('header').evaluate((header) => header.scrollWidth)).toBeLessThanOrEqual(
		375
	);

	await toggle.uncheck();
	await expect(page.locator('main')).toHaveCSS('background-color', utilityColor);
	await expect(page.locator('#floor-options img').last()).toHaveCSS(
		'background-color',
		'rgba(0, 0, 0, 0)'
	);
	await page.reload();
	await expect(toggle).toBeEnabled();
	await expect(toggle).not.toBeChecked();
});

test('stage navigation borders and settings dialogs follow the selected theme', async ({
	page
}) => {
	await page.addInitScript(() => localStorage.setItem('theme', 'light'));
	await page.goto('/en/black');
	await expect(page.getByRole('switch')).toBeEnabled();
	await expect(page.locator('table td').first()).toHaveCSS(
		'border-top-color',
		'oklch(0.439 0 none)'
	);
	await page.getByRole('switch').uncheck();
	await expect(page.locator('table td').first()).toHaveCSS(
		'border-top-color',
		'rgb(128, 128, 128)'
	);

	await page.goto('/zh/stages/ISW-NO_猎犬病原');
	await expect(page.getByRole('switch')).toBeEnabled();
	await page.locator('#settings-toggle').click();
	const settings = page.getByRole('dialog').filter({ visible: true });
	await expect(settings).toHaveCSS('background-color', 'oklch(0.97 0 none)');
	await expect(settings.locator('#diff-count')).toHaveCSS('color', 'oklch(0.269 0 none)');
});

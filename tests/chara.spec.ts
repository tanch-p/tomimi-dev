import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 375, height: 844 }
});

test('chara selector is not crashing', async ({ page }) => {
	const pageErrors: Error[] = [];
	page.on('pageerror', (error) => pageErrors.push(error));

	await page.goto('http://localhost:4173/en/recruit');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Operator Recruit Helper/);
	await expect(page.locator('button.select-none')).toHaveCount(50);

	await page.locator('#enemy_debuff').click();
	await expect(page.locator('#ms_down')).toBeVisible();
	await page.locator('#ms_down').click();
	await expect(page.locator('#sec-sluggish')).toBeVisible();
	await page.locator('#sec-sluggish').click();

	await expect(page.locator('#sec-sluggish')).toHaveClass(/active/);
	await page.locator('#clear-filters-button').click();
	await expect(page.locator('#sec-sluggish')).toHaveCount(0);
	expect(pageErrors).toEqual([]);
});

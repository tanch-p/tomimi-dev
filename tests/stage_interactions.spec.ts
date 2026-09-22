import { expect, test, type Page } from '@playwright/test';

test.use({
	viewport: { width: 1280, height: 900 }
});

function monitorRuntimeFailures(page: Page) {
	const pageErrors: string[] = [];
	const consoleErrors: string[] = [];
	const failedResponses: string[] = [];

	page.on('pageerror', (error) => pageErrors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') consoleErrors.push(message.text());
	});
	page.on('response', (response) => {
		if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`);
	});

	return () => {
		expect(pageErrors).toEqual([]);
		expect(consoleErrors).toEqual([]);
		expect(failedResponses).toEqual([]);
	};
}

test('black stage settings coordinate difficulty, floors, variations and run state', async ({
	page,
	context
}) => {
	const expectNoRuntimeFailures = monitorRuntimeFailures(page);
	await context.grantPermissions(['clipboard-read', 'clipboard-write'], {
		origin: 'http://localhost:4173'
	});

	await page.goto('http://localhost:4173/zh/stages/ISW-NO_猎犬病原');
	await expect(page).toHaveTitle(/猎犬病原/);

	await page.getByRole('button', { name: /设定 · 难易度 0/ }).click();
	const settingsDialog = page.getByRole('dialog', { name: '设定', exact: true });
	await expect(settingsDialog).toBeVisible();

	await settingsDialog.getByRole('button', { name: 'Increase the counter by one' }).click({
		clickCount: 2
	});
	await expect(settingsDialog.locator('#diff-count')).toHaveText('2');

	const eliteToggle = settingsDialog.locator('#combined-settings-elite-toggle');
	const normalToggle = settingsDialog.locator('#combined-settings-normal-toggle');
	const enemyCountToggle = page.getByRole('button', { name: /敌人数量 \(/ });
	await eliteToggle.click();
	await expect(eliteToggle).not.toHaveClass(/opacity-30/);
	await expect(enemyCountToggle).toContainText('(14)');
	await normalToggle.click();
	await expect(eliteToggle).toHaveClass(/opacity-30/);
	await expect(enemyCountToggle).toContainText('(15)');

	const floorFive = settingsDialog.getByRole('button', { name: '5', exact: true });
	await floorFive.click();
	await expect(settingsDialog.getByRole('button', { name: '5', exact: true })).toHaveClass(
		/bg-gray-500/
	);

	const earlyWeather = settingsDialog.locator('#combined-settings-rogue_6_weather_1_a');
	await earlyWeather.click();
	await expect(earlyWeather).toHaveClass(/bg-neutral-700/);

	const goldVariation = settingsDialog.locator('#combined-settings-rogue_6_variation_7');
	await goldVariation.click();
	await expect(goldVariation).toHaveClass(/bg-neutral-700/);
	const goldInput = settingsDialog.getByRole('spinbutton', { name: '源石锭' });
	await goldInput.fill('120');
	await expect(goldInput).toHaveValue('100');

	const stateCode = settingsDialog.locator('code');
	const encodedState = await stateCode.textContent();
	await settingsDialog.getByRole('button', { name: '复制代码' }).click();
	await expect(settingsDialog.getByRole('button', { name: '已复制' })).toBeVisible();
	await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(encodedState);

	await settingsDialog.getByRole('button', { name: '载入设置' }).click();
	const loadDialog = page.getByRole('dialog', { name: '载入设置', exact: true });
	const stateInput = loadDialog.getByRole('textbox', { name: '粘贴运行状态代码' });
	await stateInput.fill('not-valid');
	await loadDialog.getByRole('button', { name: '载入', exact: true }).click();
	await expect(loadDialog.getByRole('alert')).toHaveText('运行状态代码无效');

	await stateInput.fill('AQUPAwAHAwQAD2QF');
	await loadDialog.getByRole('button', { name: '载入', exact: true }).click();
	await expect(loadDialog).toBeHidden();
	await expect(settingsDialog.locator('#diff-count')).toHaveText('15');
	await expect(settingsDialog.getByRole('button', { name: '5', exact: true })).toHaveClass(
		/bg-gray-500/
	);
	await expect(settingsDialog.locator('#combined-settings-rogue_6_weather_1_c')).toHaveClass(
		/bg-neutral-700/
	);

	await settingsDialog.getByRole('button', { name: '收起', exact: true }).click();
	await expect(settingsDialog).toBeHidden();
	await expect(page.locator('#floor-options img[alt="卡德霍之颅"]')).toBeVisible();

	await page.locator('#floor-options').click();
	const floorOptions = page.locator('#floor-options').locator('..');
	await floorOptions.locator('#rogue_6_weather_2').click();
	await expect(page.locator('#floor-options img[alt="“倾斜沙丘”"]')).toBeVisible();

	await page.locator('.footerBar [role="button"]').click();
	await expect(page.locator('#rogue_6_relic_artifact_5')).toHaveClass(/bg-neutral-800/);
	await page.locator('#reset').click();
	await expect(page.locator('#rogue_6_relic_artifact_5')).not.toHaveClass(/bg-neutral-800/);
	await page.locator('.footerBar [role="presentation"].fixed').click({ position: { x: 5, y: 5 } });

	expectNoRuntimeFailures();
});

test('black stage shared panels and enemy display controls remain interactive', async ({
	page
}) => {
	const expectNoRuntimeFailures = monitorRuntimeFailures(page);

	await page.goto('http://localhost:4173/zh/stages/ISW-NO_猎犬病原');
	await expect(page).toHaveTitle(/猎犬病原/);

	const devicesToggle = page.getByRole('button', { name: '装置', exact: true });
	await devicesToggle.click();
	await expect(devicesToggle.locator('..').getByRole('table')).toBeVisible();

	const modsToggle = page.getByRole('button', { name: '属性加成确认', exact: true });
	await modsToggle.click();
	const modsPanel = modsToggle.locator('..');
	await expect(modsPanel.getByRole('img').first()).toBeVisible();
	const modEnemyOptions = modsPanel.locator('button:has(img[alt^="enemy_"])');
	expect(await modEnemyOptions.count()).toBeGreaterThan(1);
	await expect(modEnemyOptions.nth(0).locator('img')).not.toHaveClass(/brightness-50/);
	await expect(modEnemyOptions.nth(1).locator('img')).toHaveClass(/brightness-50/);
	await modEnemyOptions.nth(1).click();
	await expect(modEnemyOptions.nth(0).locator('img')).toHaveClass(/brightness-50/);
	await expect(modEnemyOptions.nth(1).locator('img')).not.toHaveClass(/brightness-50/);

	const enemyCountToggle = page.getByRole('button', { name: /敌人数量 \(/ });
	const enemyCountPanel = enemyCountToggle.locator('..');
	await expect(enemyCountPanel.locator('a[href^="#enemy_"]').first()).toBeVisible();
	await enemyCountToggle.click();
	await expect(enemyCountPanel.locator('a[href^="#enemy_"]')).toHaveCount(0);
	await enemyCountToggle.click();
	await expect(enemyCountPanel.locator('a[href^="#enemy_"]').first()).toBeVisible();

	await page.getByRole('button', { name: '手册模式', exact: true }).click();
	await expect(page.locator('#table-wrapper')).toHaveCount(0);
	await expect(page.locator('#enemy_2152_shezlc')).toBeVisible();
	await page.getByRole('button', { name: '列表模式', exact: true }).click();
	await expect(page.locator('#table-wrapper')).toBeVisible();

	const hpColumnToggle = page.locator('button.rounded-full').filter({ hasText: /^生命值$/ });
	const enemyTable = page.locator('#table-wrapper');
	await expect(enemyTable.getByRole('columnheader', { name: '生命值', exact: true })).toBeVisible();
	await hpColumnToggle.click();
	await expect(enemyTable.getByRole('columnheader', { name: '生命值', exact: true })).toHaveCount(
		0
	);
	await hpColumnToggle.click();
	await expect(enemyTable.getByRole('columnheader', { name: '生命值', exact: true })).toBeVisible();

	await page.getByRole('link', { name: '强买强卖', exact: true }).click();
	await expect(page).toHaveTitle(/强买强卖/);
	expectNoRuntimeFailures();
});

test('other IS stage pages allow selecting floors outside the stage floor list', async ({
	page
}) => {
	const stages = [
		{ path: 'ISW-DF_Mind_the_Doors', stageFloor: '3' },
		{ path: 'ISW-DF_Destiny_of_We_Many', stageFloor: '6' },
		{ path: 'ISW-NO_Instinct_Contamination', stageFloor: '5' },
		{ path: 'ISW-NO_Heavenly_Paradise', stageFloor: '6' },
		{ path: 'ISW-NO_Cold_Moonlight', stageFloor: '3' }
	];

	for (const { path, stageFloor } of stages) {
		await page.goto(`http://localhost:4173/en/stages/${path}`);
		await page.locator('#floor-options').click();

		const floorOptions = page.locator('#floor-options').locator('..');
		await expect(floorOptions.getByRole('button', { name: stageFloor, exact: true })).toHaveClass(
			/bg-gray-500/
		);

		const floorOne = floorOptions.getByRole('button', { name: '1', exact: true });
		await floorOne.click();
		await expect(floorOne).toHaveClass(/bg-gray-500/);
	}
});

test('level_rogue6_t-8 stage variants update the selected stage data', async ({ page }) => {
	const expectNoRuntimeFailures = monitorRuntimeFailures(page);

	await page.goto('http://localhost:4173/zh/stages/ISW-NO_强买强卖');
	await expect(page).toHaveTitle(/强买强卖/);
	await expect(page.getByRole('heading', { name: '变体', exact: true })).toBeVisible();

	const variants = page.locator('button[aria-pressed]');
	await expect(variants).toHaveCount(3);
	await expect(variants.nth(0)).toHaveAttribute('aria-pressed', 'true');
	await expect(page.locator('#enemy_10073_mpcar')).toBeVisible();
	await expect(page.locator('#floor-options img[alt="甜美的伤口"]')).toBeVisible();
	await page.locator('#floor-options').click();
	await page
		.locator('#floor-options')
		.locator('..')
		.getByRole('button', { name: '3', exact: true })
		.click();
	await expect(page.locator('#floor-options img[alt="血色空脉"]')).toBeVisible();
	await page.locator('#floor-options').click();

	await variants.nth(1).click();
	await expect(variants.nth(1)).toHaveAttribute('aria-pressed', 'true');
	await expect(variants.nth(0)).toHaveAttribute('aria-pressed', 'false');
	await expect(page.locator('#enemy_1152_dsurch')).toBeVisible();
	await expect(page.locator('img[alt="level_rogue6_t-8-b"]')).toBeVisible();

	await variants.nth(2).click();
	await expect(variants.nth(2)).toHaveAttribute('aria-pressed', 'true');
	await expect(page.locator('#enemy_2136_shcolo')).toBeVisible();
	await expect(page.locator('img[alt="level_rogue6_t-8-c"]')).toBeVisible();

	await variants.nth(0).click();
	await expect(variants.nth(0)).toHaveAttribute('aria-pressed', 'true');
	await expect(page.locator('#enemy_10073_mpcar')).toBeVisible();
	expectNoRuntimeFailures();
});

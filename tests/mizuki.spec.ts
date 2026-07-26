import { test, expect } from '@playwright/test';

test.use({
	viewport: { width: 375, height: 844 }
});

// test every possible mod available
test('mizuki difficulty + variation + relic', async ({ page }) => {
	await page.goto('http://localhost:4173/en/stages/ISW-DF_Destiny_of_We_Many');

	await expect(page).toHaveTitle(/Destiny of We Many/);
	const diffIncreButton = await page.$('#diff-plus');

	let hp = await page.$eval('#enemy_2039_syskad p[data-id="hp-value"]', (el) => el.textContent);
	let atk = await page.$eval('#enemy_2039_syskad p[data-id="atk-value"]', (el) => el.textContent);
	let res = await page.$eval('#enemy_2039_syskad p[data-id="res-value"]', (el) => el.textContent);
	expect(hp).toBe('90000');
	expect(res).toBe('70');
	expect(atk).toBe('1600');

	await diffIncreButton?.click({ clickCount: 10 });
	await page.waitForTimeout(1500);
	let diff = await page.$eval('#diff-count', (el) => el.textContent);
	expect(diff).toBe('10');

	hp = await page.$eval('#enemy_2039_syskad p[data-id="hp-value"]', (el) => el.textContent);
	atk = await page.$eval('#enemy_2039_syskad p[data-id="atk-value"]', (el) => el.textContent);
	expect(hp).toBe('159440');
	expect(atk).toBe('3260');

	await diffIncreButton?.click({ clickCount: 5 });
	await page.waitForTimeout(1500);
	diff = await page.$eval('#diff-count', (el) => el.textContent);
	expect(diff).toBe('15');

	hp = await page.$eval('#enemy_2039_syskad p[data-id="hp-value"]', (el) => el.textContent);
	atk = await page.$eval('#enemy_2039_syskad p[data-id="atk-value"]', (el) => el.textContent);
	let def = await page.$eval('#enemy_2039_syskad p[data-id="def-value"]', (el) => el.textContent);
	res = await page.$eval('#enemy_2039_syskad p[data-id="res-value"]', (el) => el.textContent);
	expect(hp).toBe('299773');
	expect(atk).toBe('5107');
	expect(def).toBe('1656');
	expect(res).toBe('90');

	const oneAmongMany = await page.$('#One_Among_Many');
	await oneAmongMany?.dispatchEvent('click');
	const proliferation = await page.$('#Proliferation');
	await proliferation?.dispatchEvent('click');
	hp = await page.$eval('#enemy_2039_syskad p[data-id="hp-value"]', (el) => el.textContent);
	atk = await page.$eval('#enemy_2039_syskad p[data-id="atk-value"]', (el) => el.textContent);
	def = await page.$eval('#enemy_2039_syskad p[data-id="def-value"]', (el) => el.textContent);
	res = await page.$eval('#enemy_2039_syskad p[data-id="res-value"]', (el) => el.textContent);
	expect(hp).toBe('299773');
	expect(atk).toBe('5107');
	expect(def).toBe('2484');
	expect(res).toBe('100');

	const form2 = await page.$('#enemy_2039_syskad button[data-id="form-2"]');
	await form2?.click();
	hp = await page.$eval('#enemy_2039_syskad p[data-id="hp-value"]', (el) => el.textContent);
	atk = await page.$eval('#enemy_2039_syskad p[data-id="atk-value"]', (el) => el.textContent);
	def = await page.$eval('#enemy_2039_syskad p[data-id="def-value"]', (el) => el.textContent);
	res = await page.$eval('#enemy_2039_syskad p[data-id="res-value"]', (el) => el.textContent);
	expect(hp).toBe('149886');
	expect(atk).toBe('3192');
	expect(def).toBe('745');
	expect(res).toBe('53');
});

test('mizuki difficulty + mission + elite mods', async ({ page }) => {
	await page.goto('http://localhost:4173/en/stages/ISW-NO_Crime_and_Punishment');

	await expect(page).toHaveTitle(/Crime and Punishment/);
	const diffIncreButton = await page.$('#diff-plus');
	let hp, atk, def;
	await page.waitForTimeout(1500);
	hp = await page.$eval('#enemy_1083_sotiab_2 p[data-id="hp-value"]', (el) => el.textContent);
	atk = await page.$eval('#enemy_1083_sotiab_2 p[data-id="atk-value"]', (el) => el.textContent);
	expect(hp).toBe('5000');
	expect(atk).toBe('430');

	await diffIncreButton?.click({ clickCount: 18 });
	await page.waitForTimeout(1500);
	const diff = await page.$eval('#diff-count', (el) => el.textContent);
	expect(diff).toBe('18');
	hp = await page.$eval('#enemy_1083_sotiab_2 p[data-id="hp-value"]', (el) => el.textContent);
	atk = await page.$eval('#enemy_1083_sotiab_2 p[data-id="atk-value"]', (el) => el.textContent);
	expect(hp).toBe('12168');
	expect(atk).toBe('743');

	const mission = await page.$('#mission');
	await mission?.dispatchEvent('click');
	hp = await page.$eval('#enemy_1083_sotiab_2 p[data-id="hp-value"]', (el) => el.textContent);
	atk = await page.$eval('#enemy_1083_sotiab_2 p[data-id="atk-value"]', (el) => el.textContent);
	expect(hp).toBe('15818');
	expect(atk).toBe('966');

	const eliteToggle = await page.$('#elite-toggle');
	await eliteToggle?.dispatchEvent('click');
	hp = await page.$eval('#enemy_1083_sotiab_2 p[data-id="hp-value"]', (el) => el.textContent);
	atk = await page.$eval('#enemy_1083_sotiab_2 p[data-id="atk-value"]', (el) => el.textContent);
	def = await page.$eval('#enemy_1083_sotiab_2 p[data-id="def-value"]', (el) => el.textContent);
	expect(hp).toBe('18982');
	expect(atk).toBe('1159');
	expect(def).toBe('660');

	const buff = await page.$('#enemy_1083_sotiab_2-buff-enemy_1080_sotidp');
	await buff?.dispatchEvent('click');
	hp = await page.$eval('#enemy_1083_sotiab_2 p[data-id="hp-value"]', (el) => el.textContent);
	atk = await page.$eval('#enemy_1083_sotiab_2 p[data-id="atk-value"]', (el) => el.textContent);
	def = await page.$eval('#enemy_1083_sotiab_2 p[data-id="def-value"]', (el) => el.textContent);
	expect(hp).toBe('18982');
	expect(atk).toBe('1275');
	expect(def).toBe('780');
});

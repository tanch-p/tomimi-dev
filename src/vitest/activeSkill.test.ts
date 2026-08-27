import { describe, expect, it, vi } from 'vitest';
import type { Skill } from '$lib/types';
import {
	ActiveSkill,
	isFtprgSummonSkill
} from '$lib/components/StageSimulator/objects/ActiveSkill';

describe('ActiveSkill cooldowns', () => {
	it('starts an empty bar using the initial cooldown', () => {
		const activeSkill = Object.create(ActiveSkill.prototype) as ActiveSkill;
		const skill = {
			initCooldown: 30,
			cooldowns: [75, 65, 60, 45, 30, 30]
		} as unknown as Skill;

		expect(activeSkill.convertCooldownToTimeRegen(skill)).toEqual({ initSp: 0, spCost: 30 });
	});

	it('advances through cooldowns and keeps using the final value', () => {
		const activeSkill = Object.create(ActiveSkill.prototype) as ActiveSkill;
		activeSkill.skill = {
			cooldowns: [75, 65, 60, 45, 30, 30]
		} as unknown as Skill;

		const expectedCooldowns = [75, 65, 60, 45, 30, 30, 30];
		for (const [index, expectedCooldown] of expectedCooldowns.entries()) {
			activeSkill.currCount = index + 1;
			activeSkill.setNextCooldown();
			expect(activeSkill.spCost).toBe(expectedCooldown);
		}
	});

	it('uses a single cooldown after the initial activation', () => {
		const activeSkill = Object.create(ActiveSkill.prototype) as ActiveSkill;
		activeSkill.skill = {
			initCooldown: 10,
			cooldown: 25
		} as unknown as Skill;

		activeSkill.currCount = 0;
		activeSkill.setNextCooldown();
		expect(activeSkill.spCost).toBe(10);

		activeSkill.currCount = 1;
		activeSkill.setNextCooldown();
		expect(activeSkill.spCost).toBe(25);
	});

	it('renders a zero-second initial cooldown as ready', () => {
		const activeSkill = Object.create(ActiveSkill.prototype) as ActiveSkill;
		activeSkill.currSp = 0;
		activeSkill.spCost = 0;

		expect(activeSkill.getSkillBarProgress()).toBe(1);
	});
});

describe('ftprg summon skills', () => {
	it('recognizes the base key and suffixed variants', () => {
		expect(isFtprgSummonSkill('ftprg_summon')).toBe(true);
		expect(isFtprgSummonSkill('ftprg_summon_2')).toBe(true);
		expect(isFtprgSummonSkill('ftprg_summoner')).toBe(false);
	});

	it('activates its branch after the initial cooldown and then on each cooldown', () => {
		const addBranch = vi.fn();
		const activeSkill = Object.create(ActiveSkill.prototype) as ActiveSkill;
		activeSkill.enemy = {
			gameManager: { spawnManager: { addBranch } }
		} as unknown as ActiveSkill['enemy'];
		activeSkill.skill = {
			key: 'ftprg_summon_2',
			initCooldown: 30,
			cooldown: 15
		} as unknown as Skill;
		activeSkill.isSummonSkill = true;
		activeSkill.isFinished = false;
		activeSkill.maxUsageCount = 2;
		activeSkill.currCount = 0;
		activeSkill.currSp = 0;
		activeSkill.spCost = 30;
		activeSkill.branchKey = 'summon_branch';
		activeSkill.branch = { phases: [] };

		activeSkill.update(29);
		expect(addBranch).not.toHaveBeenCalled();

		activeSkill.update(1);
		expect(addBranch).toHaveBeenCalledTimes(1);
		expect(activeSkill.spCost).toBe(15);

		activeSkill.update(15);
		expect(addBranch).toHaveBeenCalledTimes(2);
		expect(activeSkill.currCount).toBe(2);
		expect(activeSkill.isFinished).toBe(true);
	});
});

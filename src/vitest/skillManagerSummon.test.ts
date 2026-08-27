import { describe, expect, it, vi } from 'vitest';
import { SkillManager } from '$lib/components/StageSimulator/objects/SkillManager';
import type { ActiveSkill } from '$lib/components/StageSimulator/objects/ActiveSkill';

const createSummonSkill = (delay: number, finishOnUpdate: number) => {
	let updateCount = 0;
	const skill = {
		isSummonSkill: true,
		isFinished: false,
		skill: { delay },
		skillBar: { position: { y: 0 }, colorId: delay },
		update: vi.fn(function (this: ActiveSkill) {
			updateCount++;
			if (updateCount === finishOnUpdate) this.isFinished = true;
		}),
		dispose: vi.fn()
	};
	return skill as unknown as ActiveSkill;
};

describe('SkillManager ftprg summon lifecycle', () => {
	it('removes completed skills and uses the last-finishing skill delay', () => {
		const firstSkill = createSummonSkill(2, 1);
		const lastSkill = createSummonSkill(5, 2);
		firstSkill.skillBar.position.y = -10;
		lastSkill.skillBar.position.y = -20;
		const lastSkillColor = (lastSkill.skillBar as unknown as { colorId: number }).colorId;
		const startAfterSummons = vi.fn();
		const manager = Object.create(SkillManager.prototype) as SkillManager;
		manager.activeSkills = [firstSkill, lastSkill];
		manager.skills = [
			{ key: 'ftprg_summon', type: 'skill', initCooldown: 30, cooldown: 15, count: 2 },
			{ key: 'ftprg_summon_2', type: 'skill', initCooldown: 30, cooldown: 15, count: 2 }
		] as SkillManager['skills'];
		manager.skillBarColorIndexes = new Map([
			['ftprg_summon', 0],
			['ftprg_summon_2', 1]
		]);
		manager.summonDelayRemaining = null;
		manager.accelerateParams = null;
		manager.enemy = {
			meshGroup: { add: vi.fn(), remove: vi.fn() },
			startAfterSummons
		} as unknown as SkillManager['enemy'];

		manager.update(1);
		expect(manager.activeSkills).toEqual([lastSkill]);
		expect(manager.summonDelayRemaining).toBeNull();
		expect(lastSkill.skillBar.position.y).toBe(-10);
		expect((lastSkill.skillBar as unknown as { colorId: number }).colorId).toBe(lastSkillColor);

		manager.update(1);
		expect(manager.activeSkills).toEqual([]);
		expect(manager.summonDelayRemaining).toBe(5);
		expect(manager.isHoldingForSummons).toBe(true);

		manager.update(5);
		expect(startAfterSummons).toHaveBeenCalledOnce();
		expect(manager.isHoldingForSummons).toBe(false);
		expect(manager.startedEnemyAfterSummons).toBe(true);

		manager.set({
			manualSkills: [],
			summonSkills: [
				{ key: 'ftprg_summon', currSp: 1, currCount: 0 },
				{ key: 'ftprg_summon_2', currSp: 2, currCount: 1 }
			],
			summonDelayRemaining: null
		});
		expect(manager.activeSkills.map((skill) => skill.skill.key)).toEqual([
			'ftprg_summon',
			'ftprg_summon_2'
		]);
		expect(manager.activeSkills.map((skill) => skill.skillBar.position.y)).toEqual([-10, -20]);
	});
});

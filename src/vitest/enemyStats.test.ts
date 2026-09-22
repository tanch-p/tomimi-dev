import { describe, expect, it } from 'vitest';
import type { Enemy, StatMods } from '$lib/types';
import { EnemyStats } from '$lib/components/StageSimulator/objects/EnemyStats';
import { SkillManager } from '$lib/components/StageSimulator/objects/SkillManager';

const enemy = {
	id: 'TEST',
	key: 'enemy_test',
	stageId: 'enemy_test_stage',
	level: 0,
	name_en: 'Test Enemy',
	name_ja: 'Test Enemy',
	name_zh: 'Test Enemy',
	type: ['melee', 'NORMAL'],
	traits: [],
	modsList: [],
	stats: {
		hp: 1000,
		atk: 100,
		def: 50,
		res: 0,
		aspd: 1,
		range: 0,
		weight: 1,
		lifepoint: 1,
		ms: 1,
		epDamageResistance: 0,
		epResistance: 0,
		traits: [],
		special: [[], []],
		form_mods: [[], [{ key: 'ms', value: 0.5, mode: 'mul', order: 'initial' }]]
	},
	forms: [
		{
			title: null,
			normal_attack: { atk_type: ['melee', 'phys'], hits: 1 },
			status_immune: [],
			special: [],
			stats: {
				hp: 1000,
				atk: 100,
				def: 50,
				res: 0,
				aspd: 1,
				range: 0,
				weight: 1,
				lifepoint: 1,
				ms: 1
			}
		},
		{
			title: 'fast',
			normal_attack: { atk_type: ['melee', 'phys'], hits: 1 },
			status_immune: [],
			special: [],
			stats: {
				hp: 1000,
				atk: 100,
				def: 50,
				res: 0,
				aspd: 1,
				range: 0,
				weight: 1,
				lifepoint: 1,
				ms: 1.5
			}
		}
	]
} as unknown as Enemy;

const persistentModifiers = {
	runes: { key: 'combat_ops', mods: [] },
	diff: null,
	others: [
		{
			key: 'persistent_speed',
			mods: [[{ targets: ['ALL'], mods: [{ key: 'ms', value: 2, mode: 'mul', order: 'final' }] }]]
		}
	]
} as unknown as StatMods;

describe('EnemyStats', () => {
	it('calculates persistent run modifiers for an individual enemy', () => {
		const stats = new EnemyStats(enemy, persistentModifiers);

		expect(stats.get('hp')).toBe(1000);
		expect(stats.get('ms')).toBe(2);
		expect(enemy.modsList).toEqual([]);
	});

	it('recalculates from the new intrinsic form when the form changes', () => {
		const stats = new EnemyStats(enemy, persistentModifiers);

		stats.setFormIndex(1);

		expect(stats.currentFormIndex).toBe(1);
		expect(stats.get('ms')).toBe(3);
	});

	it('adds, stacks, and removes runtime modifiers by handle', () => {
		const stats = new EnemyStats(enemy, persistentModifiers);
		const handle = stats.addModifier({
			source: 'accelerate',
			mods: [{ key: 'ms', value: 1.25, mode: 'mul', order: 'final' }],
			stacks: 2,
			maxStacks: 4,
			stackType: 'add'
		});

		expect(stats.get('ms')).toBe(3);
		expect(stats.addModifierStacks(handle, 10)).toBe(true);
		expect(stats.activeModifiers[0].stacks).toBe(4);
		expect(stats.get('ms')).toBe(4);

		expect(stats.removeModifier(handle)).toBe(true);
		expect(stats.get('ms')).toBe(2);
	});

	it('expires timed modifiers and recalculates once their duration elapses', () => {
		const stats = new EnemyStats(enemy, persistentModifiers);
		const handle = stats.addModifier({
			source: 'slow',
			mods: [{ key: 'ms', value: 0.5, mode: 'mul', order: 'final' }],
			duration: 3
		});

		expect(stats.get('ms')).toBe(1);
		expect(stats.update(2)).toEqual([]);
		expect(stats.get('ms')).toBe(1);
		expect(stats.update(1)).toEqual([handle]);
		expect(stats.get('ms')).toBe(2);
	});

	it('serializes active modifiers with their remaining duration', () => {
		const source = new EnemyStats(enemy, persistentModifiers);
		source.addModifier({
			source: 'temporary-speed',
			mods: [{ key: 'ms', value: 1.5, mode: 'mul', order: 'final' }],
			duration: 5
		});
		source.update(2);

		const restored = new EnemyStats(enemy, persistentModifiers);
		restored.setData(source.getData());

		expect(restored.get('ms')).toBe(3);
		expect(restored.activeModifiers[0].remainingDuration).toBe(3);
		restored.update(3);
		expect(restored.get('ms')).toBe(2);
	});

	it('uses the runtime stack lifecycle for acceleration skills', () => {
		const stats = new EnemyStats(enemy, persistentModifiers);
		const simulatedEnemy = {
			stats,
			baseSpeed: stats.get('ms'),
			moddedSpeed: stats.get('ms')
		} as unknown as SkillManager['enemy'];
		const manager = Object.create(SkillManager.prototype) as SkillManager;
		manager.enemy = simulatedEnemy;
		manager.activeSkills = [];
		manager.transformModel = null;
		manager.summonDelayRemaining = null;
		manager.accelerateParams = { i: 1, m: 0.25, preDelay: 0, limit: 2 };
		manager.accelerationIntervalTimer = 0;
		manager.accelerationPreDelayTimer = 0;
		manager.accelerationStacks = 0;
		manager.accelerationModifierHandle = null;

		manager.update(1.1);
		expect(stats.get('ms')).toBe(2.5);
		manager.update(1.1);
		expect(stats.get('ms')).toBe(3);
		expect(stats.activeModifiers).toHaveLength(1);
	});
});

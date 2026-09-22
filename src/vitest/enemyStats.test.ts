import { describe, expect, it } from 'vitest';
import type { Enemy, StatMods } from '$lib/types';
import {
	EnemyStats,
	preserveHpPercentage
} from '$lib/components/StageSimulator/objects/EnemyStats';
import {
	ACCELERATION_MODIFIER_SOURCE,
	SkillManager
} from '$lib/components/StageSimulator/objects/SkillManager';
import { AIRFLOW_MODIFIERS } from '$lib/components/StageSimulator/functions/airflowHelpers';

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

	it('restores modifier snapshots received through reactive proxies', () => {
		const source = new EnemyStats(enemy, persistentModifiers);
		source.addModifier({
			source: 'seek-speed',
			mods: [{ key: 'ms', value: 1.5, mode: 'mul', order: 'final' }],
			duration: 5
		});
		source.update(2);
		const serialized = source.getData();
		const proxiedModifiers = serialized.modifiers.map(
			(modifier) =>
				new Proxy(
					{
						...modifier,
						mods: modifier.mods.map((mod) => new Proxy(mod, {}))
					},
					{}
				)
		);
		const proxiedSnapshot = new Proxy(
			{
				nextModifierId: serialized.nextModifierId,
				modifiers: new Proxy(proxiedModifiers, {})
			},
			{}
		);

		const restored = new EnemyStats(enemy, persistentModifiers);
		expect(() => restored.setData(proxiedSnapshot)).not.toThrow();
		expect(restored.get('ms')).toBe(3);
		expect(restored.activeModifiers[0].remainingDuration).toBe(3);
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
		expect(stats.getRuntimeModifierStacks(ACCELERATION_MODIFIER_SOURCE)).toBe(2);
	});

	it('preserves current HP percentage when max HP changes', () => {
		expect(preserveHpPercentage(250, 1000, 1500)).toBe(375);
		expect(preserveHpPercentage(1200, 1000, 500)).toBe(500);
	});

	it('combines multiple airflow modifiers using the normal stat formula', () => {
		const stats = new EnemyStats(enemy, persistentModifiers);
		stats.addModifier({ source: 'blower-1', mods: [AIRFLOW_MODIFIERS.downstream] });
		stats.addModifier({ source: 'blower-2', mods: [AIRFLOW_MODIFIERS.downstream] });

		// Base 1 * (1 + 0.8 + 0.8) * persistent 2.
		expect(stats.get('ms')).toBe(5.2);

		stats.addModifier({ source: 'blower-3', mods: [AIRFLOW_MODIFIERS.upstream] });
		expect(stats.get('ms')).toBe(2.6);
	});

	it('identifies active runtime movement-speed buffs independently of debuffs', () => {
		const stats = new EnemyStats(enemy, persistentModifiers);
		expect(stats.hasRuntimeStatIncrease('ms')).toBe(false);

		const buffHandle = stats.addModifier({
			source: 'blower-buff',
			mods: [AIRFLOW_MODIFIERS.downstream]
		});
		expect(stats.hasRuntimeStatIncrease('ms')).toBe(true);

		stats.addModifier({ source: 'blower-debuff', mods: [AIRFLOW_MODIFIERS.upstream] });
		expect(stats.get('ms')).toBe(1.8);
		expect(stats.hasRuntimeStatIncrease('ms')).toBe(true);

		stats.removeModifier(buffHandle);
		expect(stats.hasRuntimeStatIncrease('ms')).toBe(false);
	});

	it('updates current HP through the percentage-preserving change callback', () => {
		let currentHp = 250;
		const stats = new EnemyStats(enemy, persistentModifiers, {}, 0, (previous, current) => {
			currentHp = preserveHpPercentage(currentHp, previous.hp, current.hp);
		});
		const handle = stats.addModifier({
			source: 'hp-buff',
			mods: [{ key: 'hp', value: 0.5, mode: 'mul', order: 'initial' }]
		});

		expect(stats.get('hp')).toBe(1500);
		expect(currentHp).toBe(375);
		stats.removeModifier(handle);
		expect(currentHp).toBe(250);
	});
});

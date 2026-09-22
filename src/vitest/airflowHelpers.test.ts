import { describe, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import {
	AIRFLOW_MODIFIERS,
	addBlowerTileEffects,
	getAirflowEffect,
	getAirflowTilePositions,
	removeBlowerTileEffects
} from '$lib/components/StageSimulator/functions/airflowHelpers';
import { Enemy } from '$lib/components/StageSimulator/objects/Enemy';
import type { Position } from '$lib/types';

describe('trap_013_blower airflow', () => {
	it('affects only the three tiles in front of the blower', () => {
		expect(getAirflowTilePositions({ row: 4, col: 4 }, 'RIGHT')).toEqual([
			{ row: 4, col: 5 },
			{ row: 4, col: 6 },
			{ row: 4, col: 7 }
		]);
	});

	it('supports vertical blower directions in simulator grid coordinates', () => {
		expect(getAirflowTilePositions({ row: 4, col: 4 }, 'UP')).toEqual([
			{ row: 3, col: 4 },
			{ row: 2, col: 4 },
			{ row: 1, col: 4 }
		]);
		expect(getAirflowEffect('UP', { x: 0, y: 1 })).toBe('downstream');
		expect(getAirflowEffect('DOWN', { x: 0, y: 1 })).toBe('upstream');
	});

	it('affects only movement parallel to the blower axis', () => {
		expect(getAirflowEffect('RIGHT', { x: 1, y: 0 })).toBe('downstream');
		expect(getAirflowEffect('RIGHT', { x: -1, y: 0 })).toBe('upstream');
		expect(getAirflowEffect('RIGHT', { x: 0, y: 1 })).toBeNull();
		expect(getAirflowEffect('RIGHT', { x: 0.8, y: 0.2 })).toBeNull();
	});

	it('registers and removes effects on the affected tiles', () => {
		const tiles = new Map<string, any>([
			['5,4', {}],
			['6,4', {}],
			['7,4', {}],
			['8,4', {}]
		]);
		const blower = {
			key: 'trap_013_blower',
			alias: 'trap_013_blower#1',
			position: { row: 4, col: 4 },
			direction: 'RIGHT'
		};

		addBlowerTileEffects(tiles, blower);
		expect(tiles.get('5,4').effects.airflow).toEqual([
			{ source: 'trap:airflow:trap_013_blower#1', direction: 'RIGHT' }
		]);
		expect(tiles.get('7,4').effects.airflow).toHaveLength(1);
		expect(tiles.get('8,4').effects).toBeUndefined();

		removeBlowerTileEffects(tiles, blower);
		expect(tiles.get('5,4').effects.airflow).toEqual([]);
		expect(tiles.get('7,4').effects.airflow).toEqual([]);
	});

	it('uses initial addition for downstream and final multiplication for upstream', () => {
		expect(AIRFLOW_MODIFIERS.downstream).toEqual({
			key: 'ms',
			value: 0.8,
			mode: 'mul',
			order: 'initial'
		});
		expect(AIRFLOW_MODIFIERS.upstream).toEqual({
			key: 'ms',
			value: 0.5,
			mode: 'mul',
			order: 'final'
		});
	});

	it('adds, reverses, and removes the live modifier as movement changes', () => {
		const activeModifiers = new Map<string, { handle: string; source: string }>();
		let nextHandle = 1;
		const addModifier = vi.fn(({ source }) => {
			const handle = `airflow-${nextHandle++}`;
			activeModifiers.set(handle, { handle, source });
			return handle;
		});
		const removeModifier = vi.fn((handle) => activeModifiers.delete(handle));
		const enemy = Object.create(Enemy.prototype) as any;
		Object.assign(enemy, {
			actions: [{ type: 'MOVE', position: { row: 4, col: 8 }, reachOffset: null }],
			currentActionIndex: 0,
			motionMode: 'WALK',
			raycastPos: new THREE.Vector3(2, -4, 0),
			movementDirectionScratch: new THREE.Vector3(),
			skills: [],
			skillManager: { isHoldingForSummons: false, isUsingSkill: false },
			standbyTime: 0,
			startDuration: 0,
			startElapsedTime: 0,
			state: 'idle',
			stats: {
				getModifierHandlesBySourcePrefix: (prefix: string) =>
					[...activeModifiers.values()].filter((modifier) => modifier.source.startsWith(prefix)),
				addModifier,
				removeModifier
			},
			gameManager: {
				getVectorCoordinates: (position: Position) => ({ x: position.col, y: -position.row }),
				getGridPosition: () => [2, 4],
				tiles: new Map([
					[
						'2,4',
						{
							effects: {
								airflow: [
									{
										source: 'trap:airflow:trap_013_blower#1',
										direction: 'RIGHT'
									}
								]
							}
						}
					]
				])
			}
		});

		enemy.syncAirflowModifiers();
		expect(addModifier).toHaveBeenLastCalledWith({
			source: 'trap:airflow:trap_013_blower#1:downstream',
			mods: [AIRFLOW_MODIFIERS.downstream]
		});

		enemy.actions[0].position.col = 0;
		enemy.syncAirflowModifiers();
		expect(removeModifier).toHaveBeenCalledOnce();
		expect(addModifier).toHaveBeenLastCalledWith({
			source: 'trap:airflow:trap_013_blower#1:upstream',
			mods: [AIRFLOW_MODIFIERS.upstream]
		});

		enemy.skills = [{ key: 'stealth' }];
		enemy.syncAirflowModifiers();
		expect(removeModifier).toHaveBeenCalledTimes(2);
		expect(activeModifiers.size).toBe(0);
	});

	it('shows airflow beside the acceleration movement-speed icon', () => {
		const accelerationIcon = new THREE.Sprite();
		const airflowIcon = new THREE.Sprite();
		const stackIcon = new THREE.Sprite();
		let airflowActive = true;
		const enemy = Object.create(Enemy.prototype) as any;
		Object.assign(enemy, {
			movementSpeedBuffIcon: accelerationIcon,
			airflowMovementSpeedBuffIcon: airflowIcon,
			movementSpeedBuffStackIcon: stackIcon,
			movementSpeedBuffStackCanvas: null,
			movementSpeedBuffStackTexture: null,
			displayedAccelerationStacks: -1,
			stats: {
				hasRuntimeStatIncrease: () => true,
				getRuntimeModifierStacks: () => 3,
				getModifierHandlesBySourcePrefix: () =>
					airflowActive
						? [
								{
									handle: 'airflow',
									source: 'trap:airflow:trap_013_blower#1:downstream'
								}
							]
						: []
			}
		});

		enemy.syncMovementSpeedBuffIcon();
		expect(accelerationIcon.visible).toBe(true);
		expect(airflowIcon.visible).toBe(true);
		expect(accelerationIcon.position.x).toBeLessThan(airflowIcon.position.x);
		expect(stackIcon.position.x).toBeGreaterThan(accelerationIcon.position.x);

		airflowActive = false;
		enemy.syncMovementSpeedBuffIcon();
		expect(airflowIcon.visible).toBe(false);
		expect(accelerationIcon.position.x).toBe(0);
	});
});

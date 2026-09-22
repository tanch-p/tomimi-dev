import { expect, test } from 'vitest';
import * as THREE from 'three';
import { loadStage } from '$lib/server/stageLoad';
import { EMPTY_STAT_MODS, normalizeEnemyDefinitions } from '$lib/functions/statHelpers';
import { GameMap } from '$lib/components/StageSimulator/objects/GameMap';
import { Enemy } from '$lib/components/StageSimulator/objects/Enemy';
import { EnemyStats } from '$lib/components/StageSimulator/objects/EnemyStats';
import { SkillManager } from '$lib/components/StageSimulator/objects/SkillManager';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig.svelte.js';
import { OfflineStageRuntime } from '$lib/components/StageSimulator/objects/StageRuntime';
import { GameSimManager } from '$lib/components/StageSimulator/functions/Simulator';
import { getEnemySkills } from '$lib/functions/skillHelpers';
import type { EnemyDBEntry, Position } from '$lib/types';

type TestCheckpoint = {
	type: string;
	time: number;
	position: Position;
	reachOffset: { x: number; y: number };
	reachDistance: number;
};

type TestRoute = {
	motionMode: string;
	startPosition: Position;
	endPosition: Position;
	spawnOffset: { x: number; y: number };
	checkpoints: TestCheckpoint[];
	allowDiagonalMove: boolean;
	visitEveryTileCenter: boolean;
	visitEveryNodeCenter: boolean;
	visitEveryCheckPoint: boolean;
};

const EXPECTED_CHECKPOINT_POSITIONS = [
	{ row: 6, col: 1 },
	{ row: 6, col: 2 },
	{ row: 5, col: 2 },
	{ row: 5, col: 1 },
	{ row: 6, col: 1 },
	{ row: 6, col: 2 },
	{ row: 4, col: 2 },
	{ row: 4, col: 1 },
	{ row: 6, col: 1 },
	{ row: 6, col: 2 },
	{ row: 4, col: 2 },
	{ row: 4, col: 4 },
	{ row: 5, col: 4 },
	{ row: 5, col: 7 },
	{ row: 4, col: 8 }
];

function createMovingEnemy(
	manager: GameSimManager,
	route: TestRoute,
	enemyDefinition: ReturnType<typeof normalizeEnemyDefinitions>[number]
) {
	const stats = new EnemyStats(
		enemyDefinition,
		manager.persistentStatMods,
		manager.runtime.specialMods
	);
	const traits = getEnemySkills(
		enemyDefinition,
		enemyDefinition.traits,
		0,
		manager.runtime.specialMods,
		'trait'
	);
	const specials = getEnemySkills(
		enemyDefinition,
		enemyDefinition.forms[0].special,
		0,
		manager.runtime.specialMods,
		'special'
	);
	const start = manager.getVectorCoordinates(route.startPosition, route.spawnOffset);
	const raycastStart = manager.getVectorCoordinates(route.startPosition, null);
	const enemy = Object.create(Enemy.prototype) as Enemy & Record<string, any>;
	Object.assign(enemy, {
		actions: [],
		alive: true,
		animState: 'Idle',
		arrivalThreshold: GameConfig.gridSize * 0.45,
		avoidanceForce: new THREE.Vector3(),
		avoidanceFrameCounter: 0,
		baseSpeed: stats.get('ms'),
		cachedFacingActionIndex: -1,
		cachedFacingActions: null,
		cachedFacingTarget: null,
		cachedFacingPreservesFacing: false,
		countdownId: -1,
		currentActionIndex: 0,
		data: enemyDefinition,
		direction: new THREE.Vector3(),
		disguiseSkel: { scale: { x: 1 } },
		exit: false,
		facingDirectionScratch: new THREE.Vector3(),
		formIndex: 0,
		gameManager: manager,
		gridPos: `${route.startPosition.col},${route.startPosition.row}`,
		halfBodyWidth: 0.2,
		handleAnimUpdate: () => undefined,
		hp: stats.get('hp'),
		inertia: new THREE.Vector3(),
		isMoving: false,
		key: enemyDefinition.key,
		meshGroup: new THREE.Group(),
		moddedSpeed: stats.get('ms'),
		motionMode: route.motionMode,
		movementDirectionScratch: new THREE.Vector3(),
		movementFrameAccumulator: 0,
		pathFinder: manager.pathFinder,
		pathRevision: manager.pathFinder.revision,
		raycastPos: new THREE.Vector3(raycastStart.x, raycastStart.y, GameConfig.baseZIndex),
		route,
		skel: { scale: { x: 1 } },
		skills: [...traits, ...specials],
		specials,
		standbyTime: 0,
		startDuration: 0,
		startElapsedTime: 0,
		state: 'idle',
		stats,
		timeToWait: 0,
		timeoutDuration: null,
		timeoutElapsedTime: 0,
		traits,
		waitElapsedTime: 0
	});
	enemy.meshGroup.position.set(start.x, start.y, GameConfig.baseZIndex);
	enemy.actions = enemy.getActions(route);
	enemy.skillManager = new SkillManager(enemy, enemy.skills, manager as never);
	return enemy;
}

async function createDlancerStageFixture() {
	const stage = await loadStage('ISW-NO_排风口', 'zh', 'ro4');
	const config = structuredClone(stage.mapConfig);
	for (const trap of config.traps) trap.hidden = true;

	const enemies = normalizeEnemyDefinitions(stage.enemies as unknown as EnemyDBEntry[]);
	const runtime = new OfflineStageRuntime({
		levelId: config.levelId,
		mode: 'wave_normal',
		currentWaveIndex: 0,
		stagePhaseIndex: 0,
		eliteMode: false,
		specialMods: {},
		steeringEnabled: true
	});
	const manager = new GameSimManager(config, enemies, runtime, EMPTY_STAT_MODS);
	new GameMap(manager as never);

	const route = ((config.routes ?? []) as TestRoute[])
		.map(
			(candidate): TestRoute =>
				manager.convertMovementConfig(structuredClone(candidate)) as TestRoute
		)
		.find(
			(candidate) =>
				candidate.startPosition.row === 0 &&
				candidate.startPosition.col === 1 &&
				candidate.endPosition.row === 4 &&
				candidate.endPosition.col === 9
		);
	if (!route) throw new Error('Expected 排风口 route was not found');

	const enemyDefinition = enemies.find((enemy) => enemy.stageId === 'enemy_1072_dlancer');
	if (!enemyDefinition) throw new Error('Expected enemy_1072_dlancer was not found');

	return { manager, route, enemyDefinition };
}

test('ISW-NO_排风口 applies right-facing airflow throughout the row 5 col 4-to-7 segment', async () => {
	const stage = await loadStage('ISW-NO_排风口', 'zh', 'ro4');
	const config = structuredClone(stage.mapConfig);
	for (const trap of config.traps) trap.hidden = true;

	const enemies = normalizeEnemyDefinitions(stage.enemies as unknown as EnemyDBEntry[]);
	const runtime = new OfflineStageRuntime({
		levelId: config.levelId,
		mode: 'wave_normal',
		currentWaveIndex: 0,
		stagePhaseIndex: 0,
		eliteMode: false,
		specialMods: {},
		steeringEnabled: true
	});
	const manager = new GameSimManager(config, enemies, runtime, EMPTY_STAT_MODS);
	new GameMap(manager as never);

	const route = ((config.routes ?? []) as TestRoute[])
		.map(
			(candidate): TestRoute =>
				manager.convertMovementConfig(structuredClone(candidate)) as TestRoute
		)
		.find(
			(candidate) =>
				candidate.startPosition.row === 0 &&
				candidate.startPosition.col === 1 &&
				candidate.endPosition.row === 4 &&
				candidate.endPosition.col === 9
		);
	if (!route) throw new Error('Expected 排风口 route was not found');

	expect(route.motionMode).toBe('WALK');
	expect(route.checkpoints.map((checkpoint) => checkpoint.position)).toEqual(
		EXPECTED_CHECKPOINT_POSITIONS
	);
	const targetActionIndex = route.checkpoints.findIndex(
		(checkpoint, index) =>
			index > 0 &&
			route.checkpoints[index - 1].position.row === 5 &&
			route.checkpoints[index - 1].position.col === 4 &&
			checkpoint.position.row === 5 &&
			checkpoint.position.col === 7
	);
	expect(targetActionIndex).toBeGreaterThan(0);
	expect(route.checkpoints[targetActionIndex].reachOffset).toEqual({ x: 0.37, y: -0.18 });

	const blower = manager.addTrap(null, 'trap_013_blower#1');
	expect(blower).toMatchObject({
		key: 'trap_013_blower',
		position: { row: 5, col: 3 },
		direction: 'RIGHT'
	});
	for (const col of [4, 5, 6]) {
		expect((manager.tiles.get(`${col},5`) as any).effects.airflow).toContainEqual({
			source: 'trap:airflow:trap_013_blower#1',
			direction: 'RIGHT'
		});
	}

	const enemyDefinition = enemies.find((enemy) => enemy.stageId === 'enemy_1039_breakr');
	if (!enemyDefinition) throw new Error('Expected test enemy was not found');
	const stats = new EnemyStats(enemyDefinition, EMPTY_STAT_MODS);
	const baseMovementSpeed = stats.get('ms');
	const enemy = Object.create(Enemy.prototype) as any;
	Object.assign(enemy, {
		route,
		actions: route.checkpoints.map((checkpoint) => ({ ...checkpoint, pathType: 'cp' })),
		currentActionIndex: targetActionIndex,
		motionMode: 'WALK',
		raycastPos: new THREE.Vector3(),
		movementDirectionScratch: new THREE.Vector3(),
		skills: [],
		skillManager: { isHoldingForSummons: false, isUsingSkill: false },
		standbyTime: 0,
		startDuration: 0,
		startElapsedTime: 0,
		state: 'idle',
		stats,
		gameManager: manager
	});

	for (const col of [4, 5, 6]) {
		const { x, y } = manager.getVectorCoordinates({ row: 5, col }, null);
		enemy.raycastPos.set(x, y, 0);
		enemy.syncAirflowModifiers();
		expect(stats.get('ms')).toBeCloseTo(baseMovementSpeed * 1.8, 2);
		expect(stats.activeModifiers).toMatchObject([
			{ source: 'trap:airflow:trap_013_blower#1:downstream' }
		]);
	}

	const { x, y } = manager.getVectorCoordinates({ row: 5, col: 7 }, null);
	enemy.raycastPos.set(x, y, 0);
	enemy.syncAirflowModifiers();
	expect(stats.get('ms')).toBe(baseMovementSpeed);
	expect(stats.activeModifiers).toEqual([]);
});

test('ISW-NO_排风口 airflow carries enemy_1072_dlancer into the row 5 col 8 hole', async () => {
	const { manager, route, enemyDefinition } = await createDlancerStageFixture();

	const blower = manager.addTrap(null, 'trap_013_blower#1');
	expect(blower).toMatchObject({ position: { row: 5, col: 3 }, direction: 'RIGHT' });
	expect(manager.tiles.get('8,5')).toMatchObject({ tileName: 'tile_hole' });

	const enemy = createMovingEnemy(manager, route, enemyDefinition);
	const accelerationSkill = enemy.skills.find((skill) => skill.key === 'lancer_accelerate');
	expect(accelerationSkill?.accelerate).toEqual({
		i: 0.5,
		m: 0.5,
		limit: 25,
		preDelay: 0
	});

	let enteredAirflow = false;
	let leftAirflowWithInertia = false;
	let retainedAirflowMomentum = false;
	let accumulatedPartialMovementFrame = false;
	for (let frame = 0; frame < 20_000 && enemy.state !== 'fall' && !enemy.exit; frame++) {
		const positionBeforeUpdate = enemy.meshGroup.position.clone();
		enemy.update(1 / 60);
		if (
			enemy.movementFrameAccumulator > 0 &&
			enemy.meshGroup.position.equals(positionBeforeUpdate)
		) {
			accumulatedPartialMovementFrame = true;
		}
		if (['4,5', '5,5', '6,5'].includes(enemy.gridPos)) {
			enteredAirflow ||= enemy.stats.activeModifiers.some((modifier) =>
				modifier.source.endsWith(':downstream')
			);
		}
		if (enemy.gridPos === '7,5' && enemy.inertia.x > 0) {
			leftAirflowWithInertia = true;
			retainedAirflowMomentum ||= enemy.inertia.length() > enemy.stats.get('ms') * 0.5;
		}
	}

	expect(enteredAirflow).toBe(true);
	expect(leftAirflowWithInertia).toBe(true);
	expect(retainedAirflowMomentum).toBe(true);
	expect(accumulatedPartialMovementFrame).toBe(true);
	expect(enemy.skillManager.accelerationStacks).toBeGreaterThan(0);
	expect(enemy.state).toBe('fall');
	expect(enemy.gridPos).toBe('8,5');
	expect(enemy.inertia.x).toBeGreaterThan(0);
});

test('ISW-NO_排风口 enemy_1072_dlancer avoids the row 5 col 8 hole without the row 5 col 3 blower', async () => {
	const { manager, route, enemyDefinition } = await createDlancerStageFixture();
	expect(manager.traps.has('3,5')).toBe(false);
	expect(manager.tiles.get('8,5')).toMatchObject({ tileName: 'tile_hole' });

	const enemy = createMovingEnemy(manager, route, enemyDefinition);
	let enteredHole = false;
	for (let frame = 0; frame < 20_000 && enemy.state !== 'fall' && !enemy.exit; frame++) {
		enemy.update(1 / 60);
		enteredHole ||= enemy.gridPos === '8,5' || enemy.state === 'fall';
	}

	expect(enteredHole).toBe(false);
	expect(enemy.state).not.toBe('fall');
	expect(enemy.gridPos).toBe('9,4');
	expect(enemy.exit).toBe(true);
});

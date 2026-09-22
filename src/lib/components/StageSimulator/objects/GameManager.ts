import * as THREE from 'three';
import type { Enemy as EnemyType, MapConfig, Position } from '$lib/types';
import { GameConfig } from './GameConfig.svelte.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { AssetManager } from './AssetManager';
import { generateMaze } from '$lib/functions/mazeHelpers';
import { Enemy } from './Enemy';
import { SPFA } from './SPFA';
import { Trap } from './Trap';
import { SpawnManager } from './SpawnManager';
import { TileManager } from './TileManager';
import { CountdownManager } from './ShaderCountdownManager';
import type { GameWorld } from './GameWorld';
import { liveStageRuntime, type StageRuntime } from './StageRuntime';

type MovementRoute = {
	motionMode?: string;
	startPosition?: Position;
	endPosition?: Position;
	checkpoints?: Array<{ type: string; position?: Position }>;
	allowDiagonalMove?: boolean;
};

export class GameManager {
	assetManager: AssetManager;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera | null;
	world: GameWorld;
	config;
	mazeLayout: number[][];
	baseMazeLayout: number[][];
	enemies: EnemyType[];
	enemiesOnMap: Enemy[] = [];
	traps = new Map();
	pathFinder: SPFA;
	noEnemyAlive = false;
	noWaveBlockingSpawns = false;
	killedCount = 0;
	spawnManager: SpawnManager;
	tiles = new Map();
	tileManager: TileManager;
	rollOverMeshes = new Map();
	roadblockReachabilityCache = new Map<string, boolean>();
	countdownManager: CountdownManager;
	isSimulation = false;
	runtime: StageRuntime;

	constructor(
		config: MapConfig,
		world: GameWorld,
		enemies: EnemyType[],
		runtime: StageRuntime = liveStageRuntime
	) {
		this.runtime = runtime;
		this.enemies = enemies;
		this.config = config;
		this.world = world;
		this.assetManager = AssetManager.getInstance();
		this.scene = world.scene;
		this.camera = world.camera;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
		this.baseMazeLayout = structuredClone(mazeLayout);
		this.pathFinder = new SPFA(mazeLayout);
		this.tileManager = new TileManager(config.levelId);
		this.countdownManager = CountdownManager.getInstance();
		this.initPlane();
		this.initRollOverMeshes();
	}

	getVectorCoordinates = (pos, reachOffset) => {
		let offSetX = 0,
			offSetY = 0;
		if (reachOffset) {
			offSetX = reachOffset.x;
			offSetY = reachOffset.y;
		}
		const { row, col } = pos;
		const x = this.getCoordinate(parseInt(col) + offSetX, 'x');
		const y = -this.getCoordinate(parseInt(row) - offSetY, 'y');
		return { x, y };
	};

	createCountdown(time: number, x: number, y: number, colorKey = 'normal', countsDown = true) {
		const countdown = this.countdownManager.createCountdown(time, colorKey, countsDown);
		countdown.setPosition(x, y);
		this.addToScene(countdown.getGroup());
		return countdown.id;
	}

	removeCountdown(id: number) {
		this.countdownManager.removeCountdown(id);
	}

	getCoordinate = (coordinate, type = 'x') => {
		const center = type === 'x' ? this.mazeLayout[0].length / 2 : this.mazeLayout.length / 2;
		return (coordinate - center) * GameConfig.gridSize + GameConfig.gridSize / 2;
	};

	getGridPosFromVectors(pos: THREE.Vector3) {
		const gridCols = this.mazeLayout[0].length;
		const gridRows = this.mazeLayout.length;
		const gridWorldWidth = gridCols * GameConfig.gridSize;
		const gridWorldHeight = gridRows * GameConfig.gridSize;

		const originX = -gridWorldWidth / 2;
		const originY = gridWorldHeight / 2;

		const col = Math.floor((pos.x - originX) / GameConfig.gridSize);
		const row = Math.floor((originY - pos.y) / GameConfig.gridSize);

		const boundedCol = Math.max(0, Math.min(col, gridCols - 1));
		const boundedRow = Math.max(0, Math.min(row, gridRows - 1));

		return `${boundedCol},${boundedRow}`;
	}

	getGridPosition = (vector: THREE.Vector3) => {
		const gridWorldWidth = this.mazeLayout[0].length * GameConfig.gridSize;
		const gridWorldHeight = this.mazeLayout.length * GameConfig.gridSize;
		const col = Math.floor((vector.x + gridWorldWidth / 2) / GameConfig.gridSize);
		const row = Math.floor((gridWorldHeight / 2 - vector.y) / GameConfig.gridSize);

		return [col, row];
	};

	calculateAvoidanceForce(
		raycastPos: THREE.Vector3,
		footpoint: THREE.Vector3,
		direction: THREE.Vector3,
		halfBodyWidth = 0.2
	) {
		const [centerCol, centerRow] = this.getGridPosition(raycastPos);
		if (!this.isGridPositionInBounds(centerCol, centerRow)) return new THREE.Vector3();

		const center = this.getGridCenter(centerCol, centerRow);
		let avoidanceIntermediate: THREE.Vector3;
		if (this.isAvoidanceObstacle(centerCol, centerRow)) {
			avoidanceIntermediate = this.findNearestPassableTileVector(centerCol, centerRow);
		} else {
			avoidanceIntermediate = new THREE.Vector3();
			for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
				for (let colOffset = -1; colOffset <= 1; colOffset++) {
					if (colOffset === 0 && rowOffset === 0) continue;
					const col = centerCol + colOffset;
					const row = centerRow + rowOffset;
					if (!this.isGridPositionInBounds(col, row)) continue;
					if (!this.isAvoidanceObstacle(col, row)) continue;

					// Grid rows increase downward while world-space Y increases upward.
					const relativeX = colOffset;
					const relativeY = -rowOffset;
					const nearestPointX = footpoint.x + relativeX * halfBodyWidth * GameConfig.gridSize;
					const nearestPointY = footpoint.y;
					const positiveOffsetX = Math.max(
						((nearestPointX - center.x) / GameConfig.gridSize) * relativeX,
						0
					);
					const positiveOffsetY = Math.max(
						((nearestPointY - center.y) / GameConfig.gridSize) * relativeY,
						0
					);
					const effectiveOffsetX = (positiveOffsetX - 0.25) * Math.abs(relativeX);
					const effectiveOffsetY = (positiveOffsetY - 0.25) * Math.abs(relativeY);

					const isEdgeNeighbor = relativeX === 0 || relativeY === 0;
					if (isEdgeNeighbor && (effectiveOffsetX > 0 || effectiveOffsetY > 0)) {
						avoidanceIntermediate.x -= effectiveOffsetX * relativeX;
						avoidanceIntermediate.y -= effectiveOffsetY * relativeY;
					} else if (!isEdgeNeighbor && effectiveOffsetX > 0 && effectiveOffsetY > 0) {
						const averageOffset = (effectiveOffsetX + effectiveOffsetY) / 2;
						avoidanceIntermediate.x -= averageOffset * relativeX;
						avoidanceIntermediate.y -= averageOffset * relativeY;
					}
				}
			}
			if (avoidanceIntermediate.lengthSq() > 0) avoidanceIntermediate.normalize();
		}

		const normalizedDirection = direction.clone().setZ(0);
		if (normalizedDirection.lengthSq() === 0) return avoidanceIntermediate;
		normalizedDirection.normalize();
		const projection = normalizedDirection.multiplyScalar(
			avoidanceIntermediate.dot(normalizedDirection)
		);
		return avoidanceIntermediate.sub(projection).setZ(0);
	}

	correctMovementForObstacle(entityPosition: THREE.Vector3, displacement: THREE.Vector3) {
		const [currentCol, currentRow] = this.getGridPosition(entityPosition);
		const nextPosition = entityPosition.clone().add(displacement);
		const [nextCol, nextRow] = this.getGridPosition(nextPosition);
		if (currentCol === nextCol && currentRow === nextRow) return displacement.clone();
		if (!this.isAvoidanceObstacle(nextCol, nextRow)) return displacement.clone();

		const obstacleDirection = this.getGridCenter(nextCol, nextRow).sub(entityPosition).setZ(0);
		if (obstacleDirection.lengthSq() === 0) return displacement.clone();
		obstacleDirection.normalize();
		const projection = obstacleDirection.multiplyScalar(displacement.dot(obstacleDirection));
		return displacement.clone().sub(projection.multiplyScalar(2)).setZ(0);
	}

	private isGridPositionInBounds(col: number, row: number) {
		return row >= 0 && col >= 0 && row < this.mazeLayout.length && col < this.mazeLayout[0].length;
	}

	private isAvoidanceObstacle(col: number, row: number) {
		if (!this.isGridPositionInBounds(col, row)) return false;
		const weight = this.mazeLayout[row][col];
		if (weight === Number.POSITIVE_INFINITY) return true;
		if (weight === 1000) return false;
		return Boolean(this.traps.get(`${col},${row}`)?.isRoadblock);
	}

	private getGridCenter(col: number, row: number) {
		const { x, y } = this.getVectorCoordinates({ col, row }, null);
		return new THREE.Vector3(x, y, GameConfig.baseZIndex);
	}

	private findNearestPassableTileVector(centerCol: number, centerRow: number) {
		const directions = [
			[0, -1],
			[1, -1],
			[1, 0],
			[1, 1],
			[0, 1],
			[-1, 1],
			[-1, 0],
			[-1, -1]
		].sort((a, b) => Math.hypot(a[0], a[1]) - Math.hypot(b[0], b[1]));

		for (const [colOffset, rowOffset] of directions) {
			const col = centerCol + colOffset;
			const row = centerRow + rowOffset;
			if (!this.isGridPositionInBounds(col, row)) continue;
			if (this.isAvoidanceObstacle(col, row)) continue;
			return new THREE.Vector3(colOffset, -rowOffset, 0);
		}
		return new THREE.Vector3();
	}

	convertMovementConfig = (route) => {
		const height = this.mazeLayout.length;
		const start = {
			row: height - 1 - route.startPosition.row,
			col: route.startPosition.col
		};
		const end = {
			row: height - 1 - route.endPosition.row,
			col: route.endPosition.col
		};
		const checkpoints = route.checkpoints ? [...route.checkpoints] : [];
		for (const checkpoint of checkpoints) {
			checkpoint.position.row = height - 1 - checkpoint.position.row;
		}
		return {
			...route,
			endPosition: end,
			startPosition: start,
			checkpoints: checkpoints
		};
	};

	gameToWorldPos(pos: Position) {
		const height = this.mazeLayout.length;
		return { row: height - 1 - pos.row, col: pos.col };
	}

	updateMazeLayout(pos: Position, value: number) {
		return this.updateMazeLayouts([{ position: pos, value }]);
	}

	updateMazeLayouts(changes: Array<{ position: Position; value: number }>) {
		if (
			changes.some(
				({ position, value }) =>
					value === Number.POSITIVE_INFINITY && this.isRouteEndPosition(position)
			)
		) {
			return false;
		}
		const changed = this.pathFinder.updateTiles(changes);
		if (!changed) return false;
		this.roadblockReachabilityCache.clear();

		for (const enemy of this.enemiesOnMap) {
			enemy.rerouteForMapChange();
		}
		return true;
	}

	restoreMazeLayout(pos: Position) {
		const value = this.baseMazeLayout[pos.row]?.[pos.col];
		if (value === undefined) return false;
		return this.updateMazeLayout(pos, value);
	}

	isRouteEndPosition(pos: Position) {
		const routes = this.getConfiguredRoutes();
		return (
			routes.some((route) => {
				if (!route?.endPosition) return false;
				const endPosition = this.gameToWorldPos(route.endPosition);
				return endPosition.row === pos.row && endPosition.col === pos.col;
			}) ||
			this.enemiesOnMap.some((enemy) => {
				const endPosition = enemy.route?.endPosition;
				return endPosition?.row === pos.row && endPosition?.col === pos.col;
			})
		);
	}

	private getConfiguredRoutes(): MovementRoute[] {
		const config = this.config as unknown as {
			routes?: MovementRoute[];
			extra_routes?: MovementRoute[];
		};
		return [...(config.routes ?? []), ...(config.extra_routes ?? [])];
	}

	private isEnemyOnTile(pos: Position) {
		const key = `${pos.col},${pos.row}`;
		return this.enemiesOnMap.some((enemy) => {
			if (enemy.alive === false) return false;
			const enemyGridPosition = enemy.meshGroup
				? this.getGridPosition(enemy.meshGroup.position).join(',')
				: enemy.gridPos;
			return enemyGridPosition === key;
		});
	}

	private areRoutesReachableWithRoadblock(pos: Position) {
		const cacheKey = `${this.pathFinder.revision}:${pos.col},${pos.row}`;
		const cached = this.roadblockReachabilityCache.get(cacheKey);
		if (cached !== undefined) return cached;

		const hypotheticalLayout = this.mazeLayout.map((row) =>
			row.map((value) => (value >= 1000 ? Number.POSITIVE_INFINITY : value))
		);
		if (!hypotheticalLayout[pos.row] || hypotheticalLayout[pos.row][pos.col] === undefined) {
			return false;
		}
		hypotheticalLayout[pos.row][pos.col] = Number.POSITIVE_INFINITY;
		const hypotheticalPathFinder = new SPFA(hypotheticalLayout);
		const reachable = this.getConfiguredRoutes().every((route) =>
			this.isRouteReachable(route, hypotheticalPathFinder)
		);
		this.roadblockReachabilityCache.set(cacheKey, reachable);
		return reachable;
	}

	private isRouteReachable(route: MovementRoute, pathFinder: SPFA) {
		if ((route.motionMode ?? 'WALK') !== 'WALK') return true;
		if (!route.startPosition || !route.endPosition) return true;

		let currentPosition = this.gameToWorldPos(route.startPosition);
		const actions = [...(route.checkpoints ?? []), { type: 'MOVE', position: route.endPosition }];

		for (const action of actions) {
			if (!action.position) continue;
			const position = this.gameToWorldPos(action.position);
			if (action.type === 'APPEAR_AT_POS') {
				currentPosition = position;
				continue;
			}
			if (action.type !== 'MOVE') continue;

			if (!pathFinder.hasPath(currentPosition, position, route.allowDiagonalMove !== false)) {
				return false;
			}
			currentPosition = position;
		}
		return true;
	}

	canPlaceRoadblock(pos: Position) {
		const key = `${pos.col},${pos.row}`;
		const tile = this.tiles.get(key);
		return Boolean(
			tile &&
			tile.buildableType != 0 &&
			tile.heightType !== 1 &&
			!this.traps.has(key) &&
			!this.isRouteEndPosition(pos) &&
			!this.isEnemyOnTile(pos) &&
			this.areRoutesReachableWithRoadblock(pos)
		);
	}

	removeTrap(trap: Trap) {
		const key = `${trap.position.col},${trap.position.row}`;
		if (this.traps.get(key) === trap) this.traps.delete(key);
		if (trap.isRoadblock && trap.roadblockApplied) {
			trap.roadblockApplied = false;
			const value = trap.roadblockPreviousValue;
			if (value === null) {
				this.restoreMazeLayout(trap.position);
			} else {
				this.updateMazeLayout(trap.position, value);
			}
		}
	}

	getTextSprite(text, size = 20, color = 0xffffff) {
		if (typeof text !== 'string') {
			text = text.toString();
		}
		const textGeometry = new TextGeometry(text, {
			font: this.assetManager.font,
			size: size,
			depth: 1,
			curveSegments: 12,
			bevelEnabled: false
		});
		textGeometry.computeBoundingBox();
		const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
		const yOffset = -0.5 * (textGeometry.boundingBox.max.y - textGeometry.boundingBox.min.y);
		const textMaterial = new THREE.MeshBasicMaterial({
			color: color,
			transparent: true,
			depthTest: false
		});
		const mesh = new THREE.Mesh(textGeometry, textMaterial);
		mesh.position.x = centerOffset;
		mesh.position.y = yOffset;
		return mesh;
	}

	initPlane() {
		const geometry = new THREE.PlaneGeometry(
			this.mazeLayout[0].length * GameConfig.gridSize,
			this.mazeLayout.length * GameConfig.gridSize
		);
		// geometry.rotateX(-Math.PI / 2);
		const plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ visible: false }));
		plane.userData.name = 'plane';
		this.addToScene(plane);
		this.world.objects.push(plane);
		this.world.placementPlane = plane;
	}
	initRollOverMeshes() {
		this.rollOverMeshes.clear();
		if (this.runtime.tokenCard) {
			const key = this.runtime.tokenCard.key;
			const position = { row: 0, col: 0 };
			const trap = new Trap({ key, direction: 'UP', position }, position, false, null, this);
			this.rollOverMeshes.set(key, trap);
			const mesh = trap.getMesh();
			mesh.visible = false;
			mesh.position.set(0, 0, 0);
			this.scene.add(mesh);
		}
	}

	initTraps(traps) {
		const predefineChanges = this.runtime.eliteMode && this.config.elite_runes?.predefine_changes;
		const trapList = structuredClone(traps);
		if (predefineChanges) {
			for (const [key, value] of predefineChanges) {
				const trap = trapList.find((ele) => ele.alias === key);
				if (trap) {
					trap.hidden = Boolean(!value);
				}
			}
		}
		const trapsToInit = trapList.filter((ele) => !ele.hidden);
		for (const trapData of trapsToInit) {
			this.addTrap(trapData);
		}
	}

	addTrap(data: any, actionKey: string | null = null, posType = 'game') {
		if (!data) {
			data = this.config.traps.find((ele) => ele.alias === actionKey || ele.key === actionKey);
		}
		// console.log(data, actionKey);
		if (!data) {
			return;
		}
		let dataPos = data.pos;
		let blackboard;
		const predefineRandomSpawn = this.config.systems?.level_predefine_tokens_random_spawn_on_tile;
		if (predefineRandomSpawn) {
			const trapRandomTiles = predefineRandomSpawn[actionKey] || predefineRandomSpawn[data.key];
			if (trapRandomTiles) {
				// list of tile keys ["tile_dygmny_2"]
				const selectedTile =
					trapRandomTiles[Math.floor(this.runtime.random() * trapRandomTiles.length)];
				const tileData = predefineRandomSpawn?.tiles?.[selectedTile];
				if (tileData) {
					const availableTiles = tileData.filter((tile) => {
						const worldPos = this.gameToWorldPos(tile.pos);
						return !this.traps.get(`${worldPos.col},${worldPos.row}`);
					});
					const selectedPos =
						availableTiles[Math.floor(this.runtime.random() * availableTiles.length)];
					if (selectedPos) {
						dataPos = selectedPos.pos;
						blackboard = selectedPos.blackboard;
					}
				}
			}
		}
		const pos = posType === 'game' ? this.gameToWorldPos(dataPos) : dataPos;
		const trap = new Trap(data, pos, this.isSimulation, blackboard, this);
		const isSnapshot = posType === 'snapshot';
		if (trap.isRoadblock && posType === 'world' && !this.canPlaceRoadblock(pos)) {
			trap.remove();
			return null;
		}
		if (trap.isRoadblock && !isSnapshot && this.isRouteEndPosition(pos)) {
			trap.remove();
			return null;
		}
		const { x, y } = this.getVectorCoordinates(pos, null);
		const tile = this.tiles.get(`${pos.col},${pos.row}`);
		let z = 0;
		if (trap.hideTile) {
			tile.mesh.visible = false;
			trap.getMesh().add(this.tileManager.basicTile.clone());
		} else if (tile.heightType === 1 || tile.tileName === 'tile_forbidden') {
			z = 40;
		}
		this.traps.set(`${pos.col},${pos.row}`, trap);
		if (trap.isRoadblock) {
			trap.roadblockPreviousValue = this.mazeLayout[pos.row][pos.col];
			trap.roadblockApplied = true;
			this.updateMazeLayout(pos, 1000);
		}

		trap.getMesh().position.set(x, y, z + 0.03);
		this.addToScene(trap.getMesh());
		trap.initSelectionUI();
		return trap;
	}
	addToScene(mesh: THREE.Mesh | THREE.Group) {
		if (!this.isSimulation) {
			this.scene?.add(mesh);
		}
	}
	clearAndAddBranch(key: string, index: number) {
		this.spawnManager.reset();
		this.clearEnemies();
		this.clearTraps();
		this.runtime.waveElapsedTime = 0;
		this.spawnManager.addBranch(key, structuredClone(this.config.branches[key]), index);
	}

	clearEnemies() {
		const enemiesToRemove = [];
		this.enemiesOnMap.forEach((enemy) => {
			enemiesToRemove.push(enemy);
		});
		enemiesToRemove.forEach((enemy) => enemy.remove());
		this.enemiesOnMap = [];
	}
	clearTraps() {
		const trapsToRemove = [];
		this.traps.forEach((trap) => {
			trapsToRemove.push(trap);
		});
		trapsToRemove.forEach((trap) => trap.remove());
		this.traps.clear();
	}
	clearRollOverMeshes() {
		const rollOverTraps = [...this.rollOverMeshes.values()];
		this.rollOverMeshes.clear();
		rollOverTraps.forEach((trap) => trap.remove());
	}
	clearSceneObjects() {
		this.clearEnemies();
		this.clearTraps();
		this.clearRollOverMeshes();
		this.countdownManager.removeAllCountdowns();
		this.tiles.clear();
		this.roadblockReachabilityCache.clear();
	}

	reset(config, enemies) {
		this.clearSceneObjects();
		this.enemies = enemies;
		this.config = config;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
		this.baseMazeLayout = structuredClone(mazeLayout);
		this.roadblockReachabilityCache.clear();
		this.noEnemyAlive = false;
		this.noWaveBlockingSpawns = false;
		this.killedCount = 0;
		this.pathFinder = new SPFA(mazeLayout);
		this.tiles.clear();
		this.tileManager = new TileManager(config.levelId);
		this.initPlane();
		this.initRollOverMeshes();
	}

	set(data) {
		this.countdownManager.removeAllCountdowns();
		this.syncRoadblocks(data.roadblocks ?? []);
		const enemiesToRemove = [];
		this.enemiesOnMap.forEach((enemy) => {
			if (!data.enemiesOnMap.find((e) => enemy.spawnUID === e.spawnUID)) {
				enemiesToRemove.push(enemy);
			}
		});
		enemiesToRemove.forEach((enemy) => enemy.remove());
		data.enemiesOnMap.forEach((enemy) => {
			const existingEnemy = this.enemiesOnMap.find((e) => enemy.spawnUID === e.spawnUID);
			if (existingEnemy) {
				existingEnemy.updateData(enemy);
				return existingEnemy;
			}
			return new Enemy(
				enemy.data,
				null,
				enemy.route,
				this,
				enemy.fragmentKey,
				enemy.spawnUID,
				0,
				enemy
			);
		});
		// console.log('after', this.enemiesOnMap,data.enemiesOnMap);
	}

	syncRoadblocks(
		roadblocks: Array<{
			key: string;
			position: Position;
			placementId: string | null;
		}>
	) {
		const desiredByPosition = new Map(
			roadblocks.map((roadblock) => [
				`${roadblock.position.col},${roadblock.position.row}`,
				roadblock
			])
		);

		for (const [positionKey, trap] of [...this.traps.entries()]) {
			if (!trap.isRoadblock) continue;
			const desired = desiredByPosition.get(positionKey);
			if (desired && desired.key === trap.key && desired.placementId === trap.userPlacementId) {
				desiredByPosition.delete(positionKey);
				continue;
			}
			trap.remove();
		}

		for (const roadblock of desiredByPosition.values()) {
			const trap = this.addTrap(
				{
					key: roadblock.key,
					direction: 'UP',
					pos: roadblock.position
				},
				null,
				'snapshot'
			);
			if (trap) trap.userPlacementId = roadblock.placementId;
		}
	}

	syncUserRoadblocks(
		roadblocks: Array<{
			key: string;
			position: Position;
			placementId: string | null;
		}>
	) {
		const desiredByPlacement = new Map(
			roadblocks.map((roadblock) => [roadblock.placementId, roadblock])
		);

		for (const trap of [...this.traps.values()]) {
			if (!trap.isRoadblock || !trap.userPlacementId) continue;
			const desired = desiredByPlacement.get(trap.userPlacementId);
			if (
				desired &&
				desired.key === trap.key &&
				desired.position.row === trap.position.row &&
				desired.position.col === trap.position.col
			) {
				desiredByPlacement.delete(trap.userPlacementId);
				continue;
			}
			trap.remove();
		}

		for (const roadblock of desiredByPlacement.values()) {
			const trap = this.addTrap(
				{ key: roadblock.key, direction: 'UP', pos: roadblock.position },
				null,
				'snapshot'
			);
			if (trap) trap.userPlacementId = roadblock.placementId;
		}
	}

	applyObstacleEvent(event: {
		action: 'place' | 'remove';
		position: Position;
		trapKey: string;
		placementId: string | null;
	}) {
		const positionKey = `${event.position.col},${event.position.row}`;
		if (event.action === 'place') {
			const existing = this.traps.get(positionKey);
			if (existing?.userPlacementId === event.placementId) return;
			if (existing?.isRoadblock) existing.remove();
			const trap = this.addTrap(
				{ key: event.trapKey, direction: 'UP', pos: event.position },
				null,
				'snapshot'
			);
			if (trap) trap.userPlacementId = event.placementId;
			return;
		}

		const trap = event.placementId
			? [...this.traps.values()].find(
					(candidate) => candidate.userPlacementId === event.placementId
				)
			: this.traps.get(positionKey);
		if (trap?.isRoadblock && trap.key === event.trapKey) trap.remove();
	}

	update(delta: number) {
		this.countdownManager.update(delta);
		if (this.runtime.tokenCooldownRemaining > 0) {
			this.runtime.tokenCooldownRemaining = Math.max(
				0,
				this.runtime.tokenCooldownRemaining - delta
			);
		}
		this.traps.forEach((trap) => {
			trap.update(delta);
		});

		this.runtime.scaledElapsedTime += delta;
		this.noWaveBlockingSpawns =
			this.enemiesOnMap.filter((enemy) => !enemy.dontBlockWave).length === 0;
		this.noEnemyAlive = this.enemiesOnMap.filter((enemy) => !enemy.notCountInTotal).length === 0;

		for (const enemy of this.enemiesOnMap) {
			enemy.update(delta);
		}
		this.enemiesOnMap = this.enemiesOnMap.filter((ele) => ele.alive);
	}
}

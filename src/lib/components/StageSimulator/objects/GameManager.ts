import * as THREE from 'three';
import type { Enemy as EnemyType, MapConfig, Position } from '$lib/types';
import { GameConfig } from './GameConfig';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { AssetManager } from './AssetManager';
import { generateMaze } from '$lib/functions/mazeHelpers';
import { Enemy } from './Enemy';
import { SPFA } from './SPFA';
import { Trap } from './Trap';
import { SpawnManager } from './SpawnManager';
import { TileManager } from './TileManager';
import { CountdownManager } from './ShaderCountdownManager';
import { clearObjects } from '$lib/functions/threejsHelpers';
import { Game } from './Game';

export class GameManager {
	assetManager: AssetManager;
	scene: THREE.Scene;
	camera: THREE.OrthographicCamera | null;
	game: Game;
	config;
	mazeLayout: number[][];
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
	countdownManager: CountdownManager;
	isSimulation = false;

	constructor(config: MapConfig, game: Game, enemies: Enemy[]) {
		this.enemies = enemies;
		this.config = config;
		this.game = game;
		this.assetManager = AssetManager.getInstance();
		this.scene = game.scene;
		this.camera = game.camera;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
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
		// Get the column (x coordinate)
		const col = Math.floor(
			(vector.x - GameConfig.gridSize / 2) / GameConfig.gridSize + this.mazeLayout[0].length / 2
		);

		// Get the row (y coordinate)
		// Note the negative sign because y is inverted in your original function
		const row = Math.floor(
			(-vector.y - GameConfig.gridSize / 2) / GameConfig.gridSize + this.mazeLayout.length / 2
		);

		return [col, row];
	};

	calculateAvoidanceForce = (
		raycastPos: THREE.Vector3,
		footpoint: THREE.Vector3,
		direction: THREE.Vector3
	) => {
		const gridPos = this.getGridPosition(raycastPos);
		const tile = this.tiles.get(`${gridPos[0]},${gridPos[1]}`);
		// let avoidanceIntermediate;

		// if (!this.isPassable(currentTile)) {
		// 	avoidanceIntermediate = this.findNearestPassableTileVector(currentTile);
		// } else {
		// 	avoidanceIntermediate = this.calculateSurroundingAvoidance(enemy, currentTile);
		// }
	};

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
		const { row, col } = pos;
		this.mazeLayout[row][col] = value;
		this.pathFinder = new SPFA(this.mazeLayout);
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
		this.game.objects.push(plane);
	}
	initRollOverMeshes() {
		this.rollOverMeshes.clear();
		if (GameConfig.tokenCard) {
			const key = 'trap_001_crate';
			const trap = new Trap({
				key,
				direction: 'UP',
				position: { row: 0, col: 0 }
			});
			this.rollOverMeshes.set('trap_001_crate', trap);
			const mesh = trap.getMesh();
			mesh.visible = false;
			mesh.position.set(0, 0, 0);
			this.scene.add(mesh);
		}
	}

	initTraps(traps) {
		const predefineChanges = GameConfig.eliteMode && this.config.elite_runes?.predefine_changes;
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

	addTrap(data, actionKey, posType = 'game') {
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
				const selectedTile = trapRandomTiles[Math.floor(Math.random() * trapRandomTiles.length)];
				const tileData = predefineRandomSpawn?.tiles?.[selectedTile];
				if (tileData) {
					const availableTiles = tileData.filter((tile) => {
						const worldPos = this.gameToWorldPos(tile.pos);
						return !this.traps.get(`${worldPos.col},${worldPos.row}`);
					});
					const selectedPos = availableTiles[Math.floor(Math.random() * availableTiles.length)];
					if (selectedPos) {
						dataPos = selectedPos.pos;
						blackboard = selectedPos.blackboard;
					}
				}
			}
		}
		const pos = posType === 'game' ? this.gameToWorldPos(dataPos) : dataPos;
		const trap = new Trap(data, pos, this.isSimulation, blackboard, this);
		if (trap.isRoadblock) {
			this.updateMazeLayout(pos, 1000);
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

		trap.getMesh().position.set(x, y, z + 0.03);
		this.addToScene(trap.getMesh());
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
		GameConfig.setValue('waveElapsedTime', 0);
		this.spawnManager.addBranch(key, structuredClone(this.config.branches[key]), index);
	}

	clearEnemies() {
		const enemiesToRemove = [];
		this.enemiesOnMap.forEach((enemy) => {
			enemiesToRemove.push(enemy);
		});
		enemiesToRemove.forEach((enemy) => enemy.remove());
	}
	clearTraps() {
		const trapsToRemove = [];
		this.traps.forEach((trap) => {
			trapsToRemove.push(trap);
		});
		trapsToRemove.forEach((trap) => trap.remove());
		this.traps.clear();
	}

	reset(config, enemies) {
		this.enemies = enemies;
		this.config = config;
		const mazeLayout = generateMaze(config.mapData.map, config.mapData.tiles);
		this.mazeLayout = mazeLayout;
		this.clearEnemies();
		this.clearTraps();
		this.noEnemyAlive = false;
		this.pathFinder = new SPFA(mazeLayout);
		this.tiles.clear();
		this.tileManager = new TileManager(config.levelId);
		this.initPlane();
		this.initRollOverMeshes();
	}

	set(data) {
		this.countdownManager.removeAllCountdowns();
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

	update(delta: number) {
		this.countdownManager.update(delta);
		this.traps.forEach((trap, pos) => {
			trap.update(delta);
		});

		GameConfig.setValue('scaledElapsedTime', GameConfig.scaledElapsedTime + delta);
		this.noWaveBlockingSpawns =
			this.enemiesOnMap.filter((enemy) => !enemy.dontBlockWave).length === 0;
		this.noEnemyAlive = this.enemiesOnMap.filter((enemy) => !enemy.notCountInTotal).length === 0;

		for (const enemy of this.enemiesOnMap) {
			enemy.update(delta);
		}
		this.enemiesOnMap = this.enemiesOnMap.filter((ele) => ele.alive);
	}
}

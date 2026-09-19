import * as THREE from 'three';
import type { MapConfig } from '$lib/types';
import { Enemy } from './Enemy';
import { GameConfig } from './GameConfig';
import { StickBox } from './StickBox';
import { AssetManager } from './AssetManager';
import { GameManager } from './GameManager';

export class GameMap {
	config: MapConfig;
	scene: THREE.Scene;
	enemies: Enemy[] = [];
	objects: THREE.Mesh[];
	maxWaitTime = 0;
	assetManager: AssetManager;
	gameManager: GameManager;

	constructor(gameManager: GameManager) {
		this.assetManager = AssetManager.getInstance();
		this.gameManager = gameManager;
		this.config = gameManager.config;
		this.scene = gameManager.scene;

		this.setup(this.config.mapData);
		this.gameManager.initTraps(this.gameManager.config.traps);
	}

	setup(mapData) {
		const forbiddenTiles =
			(this.gameManager.runtime?.eliteMode && this.config.elite_runes?.forbid_locations) || [];
		const { map, tiles } = mapData;
		map.forEach((row, rowIdx) =>
			row.forEach((tileIndex, colIdx) => {
				const [tileName, heightType, mask, blackboard, buildableType] = tiles[tileIndex];
				const tileToSet = structuredClone(tiles[tileIndex]);
				const key = `${colIdx},${rowIdx}`;
				if (forbiddenTiles.includes(key)) {
					switch (heightType) {
						case 0:
							tileToSet[0] = 'tile_floor';
							break;
						default:
							tileToSet[0] = 'tile_forbidden';
							break;
					}
				}
				let group;
				let tileGroup;
				if (!this.gameManager.isSimulation) {
					group = new THREE.Group();
					tileGroup = this.gameManager.tileManager.get(tileToSet);
				}
				const { x, y } = this.gameManager.getVectorCoordinates(
					{
						row: rowIdx,
						col: colIdx
					},
					null
				);
				let z = 0;
				switch (tileName) {
					case 'tile_end':
						tileGroup && tileGroup.add(new StickBox(100, 100, 100, 'blue').getMesh());
						break;
					case 'tile_start':
						tileGroup && tileGroup.add(new StickBox(100, 100, 100, 'red').getMesh());
						break;
					case 'tile_telin':
					case 'tile_telout':
					case 'tile_hole':
					case 'tile_deepsea':
						z = -50;
						break;
					case 'tile_forbidden':
						z = 20;
						break;
					case 'tile_flystart':
						break;
					default:
						if (heightType === 1) {
							z = 20;
						}
						break;
				}
				this.gameManager.tiles.set(`${colIdx},${rowIdx}`, {
					tileName,
					heightType,
					mask,
					buildableType,
					blackboard,
					mesh: tileGroup,
					group: group
				});
				if (!this.gameManager.isSimulation) {
					group.add(tileGroup);
					group.position.set(x, y, z);
					this.scene.add(group);
				}
			})
		);
	}
}

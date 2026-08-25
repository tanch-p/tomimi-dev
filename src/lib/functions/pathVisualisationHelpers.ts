import * as THREE from 'three';
import { GameConfig } from '$lib/components/StageSimulator/objects/GameConfig';
import type { AssetManager } from '$lib/components/StageSimulator/objects/AssetManager';
import type { GameManager } from '$lib/components/StageSimulator/objects/GameManager';

export function createPathVisualisation(
	paths: any[],
	startPos: any,
	spawnOffset: any,
	assetManager: AssetManager,
	gameManager: GameManager
) {
	const returnGroup = new THREE.Group();
	returnGroup.renderOrder = 50;
	const lineGroup = new THREE.Group();
	const movePaths = paths.filter((path) => path.type === 'MOVE' || path.type === 'APPEAR_AT_POS');
	for (let i = 0; i < movePaths.length; i++) {
		const startCoordinates = movePaths[i - 1]?.position || startPos;
		const startOffset = i === 0 ? spawnOffset : movePaths[i - 1].reachOffset;
		const endCoordinates = movePaths[i].position;
		const endOffset = movePaths[i].reachOffset;
		const startPoint = gameManager.getVectorCoordinates(startCoordinates, startOffset);
		const endPoint = gameManager.getVectorCoordinates(endCoordinates, endOffset);
		const geometry = new THREE.BufferGeometry().setFromPoints([
			new THREE.Vector3(startPoint.x, startPoint.y, 0),
			new THREE.Vector3(endPoint.x, endPoint.y, 0)
		]);
		const line = new THREE.Line(
			geometry,
			new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true, depthTest: false })
		);
		line.position.z = 10;
		lineGroup.add(line);
	}
	for (let i = 0; i < paths.length; i++) {
		const { type, pathType, time, position, reachOffset } = paths[i];
		const group = new THREE.Group();
		switch (type) {
			case 'MOVE':
				if (pathType === 'cp') {
					const texture = assetManager.textures.get('flag').texture;
					const sprite = new THREE.Sprite(
						new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false })
					);
					sprite.scale.set(GameConfig.gridSize * 0.6, GameConfig.gridSize * 0.6, 1);
					const { x, y } = gameManager.getVectorCoordinates(position, reachOffset);
					sprite.position.set(x + 2, y + GameConfig.gridSize * 0.3, GameConfig.baseZIndex + 10);
					group.renderOrder = 50;
					sprite.renderOrder = 50;
					group.add(sprite);
				}
				break;
			case 'WAIT_FOR_SECONDS': {
				const circle = new THREE.Mesh(
					new THREE.CircleGeometry(GameConfig.gridSize / 4, 32),
					new THREE.MeshBasicMaterial({ color: 0xb1b1b1, transparent: true, depthTest: false })
				);
				const ring = new THREE.Mesh(
					new THREE.RingGeometry(GameConfig.gridSize / 4 - 2, GameConfig.gridSize / 4, 32),
					new THREE.MeshBasicMaterial({ color: 0xdc143c, transparent: true, depthTest: false })
				);
				ring.position.z = 2;
				const waitPosition =
					i === 0
						? startPos
						: paths[i - 1].type === 'DISAPPEAR'
						? paths[i - 2].position
						: paths[i - 1].position;
				const { x, y } = gameManager.getVectorCoordinates(
					waitPosition,
					i === 0 ? spawnOffset : reachOffset
				);
				const text = gameManager.getTextSprite(time.toFixed() + 's', 16);
				text.position.z = 5;
				group.add(text, ring, circle);
				group.position.set(x, y, GameConfig.baseZIndex + 15);
				group.renderOrder = 50;
				circle.renderOrder = 50;
				text.renderOrder = 50;
				ring.renderOrder = 50;
				break;
			}
		}
		returnGroup.add(group);
	}
	returnGroup.add(lineGroup);
	return returnGroup;
}

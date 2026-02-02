import * as THREE from 'three';
import { GameConfig } from './GameConfig';
import { TextSprite } from './TextSprite';
import { AssetManager } from './AssetManager';

export class TileManager {
	assetManager: AssetManager;
	edgesMaterial: THREE.LineBasicMaterial;
	levelId: string;
	basicTile: THREE.Group;
	constructor(levelId: string) {
		this.levelId = levelId;
		this.assetManager = AssetManager.getInstance();
		this.edgesMaterial = new THREE.LineBasicMaterial({
			color: 0x484848,
			transparent: true,
			opacity: 0.4
		});
		this.basicTile = this.setupBasicTile();
	}

	setupBasicTile() {
		const group = new THREE.Group();
		const geometry = new THREE.PlaneGeometry(GameConfig.gridSize, GameConfig.gridSize);
		const box = new THREE.Mesh(
			geometry,
			new THREE.MeshStandardMaterial({
				color: 0xd1d1d1,
				roughness: 0.8
			})
		);
		const edges = new THREE.EdgesGeometry(geometry);
		const edgeLines = new THREE.LineSegments(edges, this.edgesMaterial);
		edgeLines.position.z = 0.01;
		group.add(box, edgeLines);
		return group;
	}

	get(tile) {
		const [tileName, heightType, mask, blackboard, buildableType] = tile;
		let boxGroup = new THREE.Group();
		let topTextureName = tileName;
		let topTexture;
		let depth = 0,
			size = 1;
		switch (tileName) {
			case 'tile_telin':
			case 'tile_telout':
				boxGroup.add(
					this.createTeleport(
						blackboard?.direction || "left",
						tileName,
						blackboard?.colorIndex,
						blackboard?.type
					)
				);
				return boxGroup;
			case 'tile_forbidden':
			case 'tile_empty':
				return this.createBox(0, 0xb8b8b8, 0x292929, null);
			case 'tile_deepsea':
				return this.createDeepSeaBox();
			case 'tile_hole': {
				const hollowBox = this.createHollowBox();
				boxGroup.add(hollowBox);
				const material = new THREE.MeshStandardMaterial({
					color: 0xc1c1c1,
					side: THREE.DoubleSide
				});
				const topAttachmentDepth = 7;
				const topHazardDepth = 9;
				const topHazardWidth = GameConfig.gridSize - topAttachmentDepth * 2;
				const vertHazard = this.assetManager.textures.get('hole_hazard_vert');
				const vertHazardTexture = this.getTopTexture(
					tileName,
					vertHazard,
					null,
					size,
					topHazardDepth,
					new THREE.PlaneGeometry(topHazardDepth, topHazardWidth)
				);
				const horizHazard = this.assetManager.textures.get('hole_hazard_horiz');
				const horizHazardTexture = this.getTopTexture(
					tileName,
					horizHazard,
					null,
					size,
					topHazardDepth,
					new THREE.PlaneGeometry(topHazardWidth, topHazardDepth)
				);
				// Bottom
				const btmTopAttachment = new THREE.Mesh(
					new THREE.BoxGeometry(GameConfig.gridSize, topAttachmentDepth, topAttachmentDepth),
					material
				);
				btmTopAttachment.position.y = -GameConfig.gridSize / 2 + topAttachmentDepth / 2;
				btmTopAttachment.position.z = GameConfig.gridSize / 2 - topAttachmentDepth / 2;
				boxGroup.add(btmTopAttachment);
				const btmBtmAttachment = new THREE.Mesh(
					new THREE.BoxGeometry(GameConfig.gridSize, 10, 10),
					material
				);
				btmBtmAttachment.position.y = -GameConfig.gridSize / 2 + 10 / 2;
				btmBtmAttachment.position.z = -GameConfig.gridSize / 2 + 10 / 2;
				btmBtmAttachment.renderOrder = -1;
				boxGroup.add(btmBtmAttachment);
				//hazard
				const btmTopHazard = new THREE.Mesh(
					new THREE.BoxGeometry(topHazardWidth, topHazardDepth, topHazardDepth),
					material
				);
				const btmHazardGroup = new THREE.Group();
				btmHazardGroup.position.y =
					-GameConfig.gridSize / 2 + topHazardDepth / 2 + topAttachmentDepth;
				btmHazardGroup.position.z = GameConfig.gridSize / 2 - topAttachmentDepth / 2 - 10;
				btmHazardGroup.add(btmTopHazard);
				btmHazardGroup.add(horizHazardTexture.clone());
				btmHazardGroup.renderOrder = -1;
				boxGroup.add(btmHazardGroup);

				// Top
				const topTopAttachment = new THREE.Mesh(
					new THREE.BoxGeometry(GameConfig.gridSize, topAttachmentDepth, topAttachmentDepth),
					material
				);
				topTopAttachment.position.y = GameConfig.gridSize / 2 - topAttachmentDepth / 2;
				topTopAttachment.position.z = GameConfig.gridSize / 2 - topAttachmentDepth / 2;
				boxGroup.add(topTopAttachment);
				const topBtmAttachment = new THREE.Mesh(
					new THREE.BoxGeometry(GameConfig.gridSize, 10, 10),
					material
				);
				topBtmAttachment.position.y = GameConfig.gridSize / 2 - 10 / 2;
				topBtmAttachment.position.z = -GameConfig.gridSize / 2 + 10 / 2;
				topBtmAttachment.renderOrder = -2;
				boxGroup.add(topBtmAttachment);
				//hazard
				const topTopHazard = new THREE.Mesh(
					new THREE.BoxGeometry(topHazardWidth, topHazardDepth, topHazardDepth),
					material
				);
				const topHazardGroup = new THREE.Group();
				topHazardGroup.position.y =
					GameConfig.gridSize / 2 - topHazardDepth / 2 - topAttachmentDepth;
				topHazardGroup.position.z = GameConfig.gridSize / 2 - topAttachmentDepth / 2 - 10;
				topHazardGroup.add(topTopHazard);
				topHazardGroup.add(horizHazardTexture.clone());
				boxGroup.add(topHazardGroup);

				// Left wall
				const leftTopAttachment = new THREE.Mesh(
					new THREE.BoxGeometry(topAttachmentDepth, GameConfig.gridSize, topAttachmentDepth),
					material
				);
				leftTopAttachment.position.x = -GameConfig.gridSize / 2 + topAttachmentDepth / 2;
				leftTopAttachment.position.z = GameConfig.gridSize / 2 - topAttachmentDepth / 2;
				boxGroup.add(leftTopAttachment);
				const leftBtmAttachment = new THREE.Mesh(
					new THREE.BoxGeometry(10, GameConfig.gridSize, 10),
					material
				);
				leftBtmAttachment.position.x = -GameConfig.gridSize / 2 + 10 / 2;
				leftBtmAttachment.position.z = -GameConfig.gridSize / 2 + 10 / 2;
				boxGroup.add(leftBtmAttachment);

				//hazard
				const leftTopHazard = new THREE.Mesh(
					new THREE.BoxGeometry(topHazardDepth, topHazardWidth, topHazardDepth),
					material
				);
				const leftHazardGroup = new THREE.Group();
				leftHazardGroup.position.x =
					-GameConfig.gridSize / 2 + topHazardDepth / 2 + topAttachmentDepth;
				leftHazardGroup.position.z = GameConfig.gridSize / 2 - topHazardDepth / 2 - 10;
				leftHazardGroup.add(leftTopHazard);
				leftHazardGroup.add(vertHazardTexture.clone());
				boxGroup.add(leftHazardGroup);

				// Right wall
				const rightTopAttachment = new THREE.Mesh(
					new THREE.BoxGeometry(topAttachmentDepth, GameConfig.gridSize, topAttachmentDepth),
					material
				);
				rightTopAttachment.position.x = GameConfig.gridSize / 2 - topAttachmentDepth / 2;
				rightTopAttachment.position.z = GameConfig.gridSize / 2 - topAttachmentDepth / 2;
				boxGroup.add(rightTopAttachment);
				const rightBtmAttachment = new THREE.Mesh(
					new THREE.BoxGeometry(10, GameConfig.gridSize, 10),
					material
				);
				rightBtmAttachment.position.x = GameConfig.gridSize / 2 - 10 / 2;
				rightBtmAttachment.position.z = -GameConfig.gridSize / 2 + 10 / 2;
				boxGroup.add(rightBtmAttachment);
				//hazard
				const rightTopHazard = new THREE.Mesh(
					new THREE.BoxGeometry(topHazardDepth, topHazardWidth, topHazardDepth),
					material
				);
				const rightHazardGroup = new THREE.Group();
				rightHazardGroup.position.x =
					GameConfig.gridSize / 2 - topHazardDepth / 2 - topAttachmentDepth;
				rightHazardGroup.position.z = GameConfig.gridSize / 2 - topHazardDepth / 2 - 10;
				rightHazardGroup.add(rightTopHazard);
				rightHazardGroup.add(vertHazardTexture.clone());
				boxGroup.add(rightHazardGroup);

				// Black material for the base (hole effect)
				const baseMaterial = new THREE.MeshStandardMaterial({
					color: 0x232323,
					side: THREE.DoubleSide
				});

				const base = new THREE.Mesh(
					new THREE.BoxGeometry(GameConfig.gridSize - 10, GameConfig.gridSize - 10, 2),
					baseMaterial
				);
				// Position at the back of the box
				base.position.z = -(GameConfig.gridSize / 2 + 2);
				boxGroup.add(base);

				return boxGroup;
			}
			case 'tile_flystart': {
				const backing = this.createBox(0, 0xb8b8b8, 0x292929, null);
				const icon = this.assetManager.textures.get('fly_icon');
				size = 0.85;
				// const btmBoxPlane = this.getTopTexture(box, null, size, 0, null);
				const iconPlane = this.getTopTexture(tileName, icon, null, size, 0, null);
				// const topBoxPlane = btmBoxPlane.clone();
				// btmBoxPlane.position.z = 40 + 10;
				iconPlane.position.z = 40 + 30;
				// topBoxPlane.position.z = 40 + 90;
				backing.position.z = 40 / 2;
				boxGroup.add(backing, iconPlane);
				boxGroup.position.z = 0;
				return boxGroup;
			}
		}
		if (heightType === 1) {
			if (['tile_pollution_wall', 'tile_toxicwall'].includes(tileName)) {
				topTextureName = 'tile_wall';
			}
			if (!['tile_wall', 'tile_grass'].includes(topTextureName)) {
				size = 0.84;
			}
			return this.createBox(40, 0xff8108, 0xc1c1c1, topTextureName, size);
		}

		boxGroup = this.basicTile.clone();
		switch (tileName) {
			// texture size
			case 'tile_volcano':
			case 'tile_grass':
			case 'tile_smog':
				break;
			default:
				size = 0.84;
				break;
		}
		switch (tileName) {
			// additional layers
			case 'tile_fence_bound':
			case 'tile_fence':
				boxGroup.add(this.createBoundingAttachments(GameConfig.gridSize * 0.1));
				break;
			case 'tile_smog':
				boxGroup.add(this.createTileSmog());
				break;
			case 'tile_creep':
			case 'tile_creepf':
				if (blackboard.mode) {
					const texture = this.assetManager.textures.get('creep');
					const creep = this.getTopTexture('tile_creep', texture, null, 1, 2, null);
					boxGroup.add(creep);
				}
				break;
			default:
				topTexture = this.assetManager.textures.get(topTextureName);
				break;
		}

		if (buildableType == 0 && !['tile_start', 'tile_end', 'tile_floor'].includes(tileName)) {
			const floorTexture = this.assetManager.textures.get('tile_floor');
			const frontPlane = this.getTopTexture('tile_floor', floorTexture, null, size, depth, null);
			frontPlane.position.z = 0.01;
			boxGroup.add(frontPlane);
			size = 0.7;
		}

		if (topTexture) {
			const frontPlane = this.getTopTexture(topTextureName, topTexture, null, size, depth, null);
			boxGroup.add(frontPlane);
		}
		// if (
		// 	![
		// 		'tile_floor',
		// 		'tile_road',
		// 		'tile_end',
		// 		'tile_start',
		// 		'tile_infection',
		// 		'tile_fence',
		// 		'tile_fence_bound',
		// 		'tile_defbreak',
		// 		'tile_healing',
		// 		'tile_volcano',
		// 		'tile_defup',
		// 		'tile_pollution_road',
		// 		'tile_toxic',
		// 		'tile_toxicroad',
		// 		'tile_creep',
		// 		'tile_creepf',
		// 		'tile_bigforce',
		// 		'tile_grass',
		// 		'tile_smog'
		// 	].includes(tileName)
		// ) {
		// 	const sprite = new TextSprite(tileName.replace('tile_', '')).get();
		// 	sprite.position.z = 1;
		// 	sprite.position.x = -5;
		// 	boxGroup.add(sprite);
		// }
		return boxGroup;
	}
	getTopTexture(tileName, topTexture, eMapName, size = 1, depth, customGeometry) {
		const { texture, config } = topTexture;
		const frontGeometry =
			customGeometry ||
			new THREE.PlaneGeometry(GameConfig.gridSize * size, GameConfig.gridSize * size);
		if (config) {
			const { UVWidth, UVHeight, uvOffsetX, uvOffsetY } = config;
			// Modify UV coordinates to match the specific tile in the sprite sheet
			const uvs = frontGeometry.attributes.uv;
			const uvArray = uvs.array;
			// Set UV coordinates for each vertex
			// Bottom left
			uvArray[0] = uvOffsetX;
			uvArray[1] = uvOffsetY + UVHeight; // Flip Y-coordinate
			// Bottom right
			uvArray[2] = uvOffsetX + UVWidth;
			uvArray[3] = uvOffsetY + UVHeight; // Flip Y-coordinate
			// Top left
			uvArray[4] = uvOffsetX;
			uvArray[5] = uvOffsetY; // Flip Y-coordinate
			// Top right
			uvArray[6] = uvOffsetX + UVWidth;
			uvArray[7] = uvOffsetY; // Flip Y-coordinate
		}
		const materialAddons = {};
		if (eMapName) {
			materialAddons.emissiveMap = this.assetManager.textures.get(eMapName).texture;
			materialAddons.emissive = new THREE.Color(0xffffff);
		}
		const frontMaterial = new THREE.MeshStandardMaterial({
			map: texture,
			transparent: true,
			...materialAddons
		});
		const frontPlane = new THREE.Mesh(frontGeometry, frontMaterial);

		// Position front plane at the front of the box
		frontPlane.position.z = depth / 2 + 0.1;
		frontPlane.renderOrder = -10;
		return frontPlane;
	}

	createBox(depth, sideColor, topColor, topTextureName, size = 1) {
		const group = new THREE.Group();
		const geometry = new THREE.BoxGeometry(GameConfig.gridSize, GameConfig.gridSize, 40);
		const sideMaterial = new THREE.MeshStandardMaterial({
			color: sideColor
		});
		const topMaterial = new THREE.MeshStandardMaterial({
			color: topColor
		});

		const materials = [
			sideMaterial, // right
			sideMaterial, // left
			sideMaterial, // front
			sideMaterial, // back
			topMaterial, // top (+Z)
			topMaterial // bottom (-Z)
		];

		const box = new THREE.Mesh(geometry, materials);
		const edges = new THREE.EdgesGeometry(geometry);
		const edgeLines = new THREE.LineSegments(edges, this.edgesMaterial);
		group.add(box);
		group.add(edgeLines);
		if (topTextureName) {
			const topTexture = this.assetManager.textures.get(topTextureName);
			if (topTexture) {
				const frontPlane = this.getTopTexture(topTextureName, topTexture, null, size, depth, null);
				group.add(frontPlane);
			}
		}
		if (topTextureName === 'tile_smog') {
			const grater = this.createTileSmog();
			grater.position.z = 19;
			group.add(grater);
		}
		return group;
	}
	createBoundingAttachments(inset: number) {
		const group = new THREE.Group();
		const material = new THREE.MeshStandardMaterial({
			color: 0xa1a1a1,
			side: THREE.DoubleSide
		});
		const attachmentDepth = 7;
		const btm = new THREE.Mesh(
			new THREE.BoxGeometry(GameConfig.gridSize - inset * 2, attachmentDepth, attachmentDepth),
			material
		);
		btm.position.z = attachmentDepth / 2;
		const top = btm.clone();
		btm.position.y = -GameConfig.gridSize / 2 + attachmentDepth / 2 + inset;
		top.position.y = GameConfig.gridSize / 2 - attachmentDepth / 2 - inset;

		const left = new THREE.Mesh(
			new THREE.BoxGeometry(attachmentDepth, GameConfig.gridSize - inset * 2, attachmentDepth),
			material
		);
		left.position.z = attachmentDepth / 2;
		const right = left.clone();
		left.position.x = -GameConfig.gridSize / 2 + attachmentDepth / 2 + inset;
		right.position.x = GameConfig.gridSize / 2 - attachmentDepth / 2 - inset;
		group.add(btm, top, left, right);
		return group;
	}

	createDeepSeaBox() {
		const geometry = new THREE.BoxGeometry(
			GameConfig.gridSize,
			GameConfig.gridSize,
			GameConfig.gridSize
		);
		const material = new THREE.MeshPhysicalMaterial({
			color: 0x45b6fe, // White base color
			transmission: 0.5, // Makes the material translucent
			transparent: true, // Enable transparency
			opacity: 0.7, // Overall opacity
			blending: THREE.NoBlending,
			depthWrite: false,
			depthTest: true,
			alphaToCoverage: false
		});
		const box = new THREE.Mesh(geometry, material);
		return box;
	}
	createTileSmog() {
		const group = new THREE.Group();
		const planeGeometry = new THREE.PlaneGeometry(GameConfig.gridSize, GameConfig.gridSize);
		const planeMaterial = new THREE.MeshBasicMaterial({
			color: 0x000000,
			side: THREE.DoubleSide
		});
		const plane = new THREE.Mesh(planeGeometry, planeMaterial);
		plane.position.z = 1.01;
		group.add(plane);
		const boundary = this.createBoundingAttachments(0);
		group.add(boundary);
		const graterMaterial = new THREE.MeshStandardMaterial({
			color: 0xa1a1a1,
			side: THREE.DoubleSide
		});
		// horizontal
		for (let i = 0; i < 3; i++) {
			const line = new THREE.Mesh(
				new THREE.PlaneGeometry(GameConfig.gridSize, (GameConfig.gridSize - 14) / 7),
				graterMaterial
			);

			line.position.y =
				i === 1
					? 0
					: i === 0
					? (GameConfig.gridSize - 14) / 3.5
					: -(GameConfig.gridSize - 14) / 3.5;
			line.position.z = 1.02;
			group.add(line);
		}

		// vertical
		for (let i = 0; i < 3; i++) {
			const line = new THREE.Mesh(
				new THREE.PlaneGeometry((GameConfig.gridSize - 14) / 7, GameConfig.gridSize),
				graterMaterial
			);
			line.position.x =
				i === 1
					? 0
					: i === 0
					? (GameConfig.gridSize - 14) / 3.5
					: -(GameConfig.gridSize - 14) / 3.5;
			line.position.z = 1.02;
			group.add(line);
		}
		return group;
	}

	createHollowBox() {
		const group = new THREE.Group();
		const material = new THREE.MeshStandardMaterial({
			color: 0xc1c1c1,
			side: THREE.DoubleSide
		});
		const bottomWall = new THREE.Mesh(
			new THREE.BoxGeometry(GameConfig.gridSize, 2, GameConfig.gridSize),
			material
		);
		bottomWall.position.y = -GameConfig.gridSize / 2;
		const topWall = bottomWall.clone();
		topWall.position.y = GameConfig.gridSize / 2;
		const leftWall = new THREE.Mesh(
			new THREE.BoxGeometry(2, GameConfig.gridSize, GameConfig.gridSize),
			material
		);
		leftWall.position.x = -GameConfig.gridSize / 2;
		const rightWall = leftWall.clone();
		rightWall.position.x = GameConfig.gridSize / 2;
		group.add(bottomWall, topWall, leftWall, rightWall);

		group.renderOrder = -1;
		return group;
	}

	createTeleport(direction = 'left', tileName, index = 0, type = 'arrow') {
		if (this.levelId === 'level_rogue3_b-1') {
			if (tileName === 'tile_telin') {
				tileName = 'tile_telout';
			} else {
				tileName = 'tile_telin';
			}
		}
		const group = new THREE.Group();
		const darkMaterial = new THREE.MeshStandardMaterial({
			color: 0x666666,
			side: THREE.DoubleSide
		});
		if (type === 'arrow') {
			const bottomWall = new THREE.Mesh(
				new THREE.BoxGeometry(GameConfig.gridSize, 2, GameConfig.gridSize),
				darkMaterial
			);
			bottomWall.position.y = -GameConfig.gridSize / 2;
			const topWall = bottomWall.clone();
			topWall.position.y = GameConfig.gridSize / 2;
			const leftWall = new THREE.Mesh(
				new THREE.BoxGeometry(2, GameConfig.gridSize, GameConfig.gridSize),
				darkMaterial
			);
			leftWall.position.x = -GameConfig.gridSize / 2;
			const rightWall = leftWall.clone();
			rightWall.position.x = GameConfig.gridSize / 2;
			group.add(bottomWall, topWall, leftWall, rightWall);
			const stepMaterial = new THREE.MeshStandardMaterial({
				color: 0xc1c1c1,
				side: THREE.DoubleSide
			});
			const stepWidth = (GameConfig.gridSize * 4) / 10;
			const stepHeight = 30;
			const stepGeometry = new THREE.BoxGeometry(stepWidth, GameConfig.gridSize, stepHeight);
			const stepEdges = new THREE.EdgesGeometry(stepGeometry);

			[20, 50, 80].map((zOffset, i) => {
				const stepGroup = new THREE.Group();
				const step = new THREE.Mesh(stepGeometry, stepMaterial);
				const stepLines = new THREE.LineSegments(stepEdges, this.edgesMaterial);
				stepGroup.add(step, stepLines);
				stepGroup.position.z = GameConfig.gridSize / 2 - stepHeight / 2 - zOffset;
				stepGroup.position.x =
					(i === 0
						? GameConfig.gridSize / 2 - stepWidth / 2
						: i === 1
						? 0
						: -GameConfig.gridSize / 2 + stepWidth / 2) - 2.5;
				group.add(stepGroup);
			});
		}
		const teleport = this.assetManager.textures.get(
			type === 'arrow'
				? `tel_arrow_${index}`
				: tileName === 'tile_telin'
				? 'tel_block_in'
				: 'tel_block_out'
		);
		const arrowGroup = new THREE.Group();
		const arrowWidth = (GameConfig.gridSize * 2) / 10;
		const arrowPlaneGeometry = new THREE.PlaneGeometry(
			type === 'arrow' ? arrowWidth : GameConfig.gridSize,
			GameConfig.gridSize
		);
		const arrowTexture = this.getTopTexture(
			tileName,
			teleport,
			'tel_e_map',
			1,
			0,
			arrowPlaneGeometry
		);
		const arrowPlane = new THREE.Mesh(
			arrowPlaneGeometry,
			new THREE.MeshStandardMaterial({
				color: 0xe1e1e1
			})
		);
		arrowGroup.add(arrowPlane, arrowTexture);
		arrowGroup.position.z = GameConfig.gridSize / 2;
		if (type === 'arrow') {
			arrowGroup.position.x = GameConfig.gridSize / 2 - arrowWidth / 2;
			if (tileName === 'tile_telout') {
				arrowGroup.position.x = GameConfig.gridSize / 2 + arrowWidth / 2;
				arrowGroup.position.z = GameConfig.gridSize / 2 + 2;
			} else {
				arrowGroup.rotation.z = -Math.PI;
			}
		}

		group.add(arrowGroup);
		let rotation =
			direction === 'right'
				? Math.PI
				: direction === 'up'
				? -Math.PI / 2
				: direction === 'down'
				? Math.PI / 2
				: 0;
		if (type === 'block') {
			rotation =
				direction === 'right'
					? Math.PI / 2
					: direction === 'up'
					? Math.PI
					: direction === 'down'
					? 0
					: -Math.PI / 2;
			if (tileName === 'tile_telout') {
				if (direction === 'up') {
					rotation = 0;
				}
				if (direction === 'down') {
					rotation = Math.PI;
				}
				rotation = -rotation;
			}
		}
		group.renderOrder = -1;
		group.rotation.z = rotation;
		group.position.z = -1;
		return group;
	}
}

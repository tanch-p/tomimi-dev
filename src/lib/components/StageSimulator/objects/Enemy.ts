import * as THREE from 'three';
import * as spine from '$lib/spine';
import { GameConfig } from './GameConfig';
import { GameManager } from './GameManager';
import { AssetManager } from './AssetManager';
import type { Enemy as EnemyType, Skill } from '$lib/types';
import { SPFA } from './SPFA';
import { getEnemySkills } from '$lib/functions/skillHelpers';
import { getAnimDuration, getSpineAnimations, getSpineMetaData } from '$lib/functions/spineHelpers';
import { SkillManager } from './SkillManager';
import { clearObjects } from '$lib/functions/threejsHelpers';

const moveMultiplier = 0.5;
export class Enemy {
	raycastPos: THREE.Vector3; //光标坐标在移动逻辑中被大量使用，造成了一些反直觉的现象
	targetPos: THREE.Vector3;
	gridPos: string;
	assetManager: AssetManager;
	gameManager: GameManager;
	pathFinder: SPFA;
	data;
	key: string;
	spawnUID: string;
	actions;
	hp: number;
	baseSpeed: number;
	moddedSpeed: number;
	route;
	currentActionIndex = 0;
	state: string;
	alive = true;
	direction: THREE.Vector3;
	motionMode: 'WALK' | 'FLY' | 'BLINK' | 'NONE';
	isMoving = false;
	traits: Skill[];
	specials: Skill[];
	skillManager: SkillManager;
	selected = false;
	buffs = [];
	waitElapsedTime = 0;
	standbyTime = 0;
	formIndex = 0;
	arrivalThreshold = GameConfig.gridSize * 0.45;
	fragmentKey: string;
	dontBlockWave = false;
	notCountInTotal = false;

	countdownId = -1;
	pathGroup;
	meshGroup: THREE.Group;
	hitbox;
	shadow;
	atkRangeMesh: THREE.Group;
	skillRangeMeshes: THREE.Group[] = [];
	skel: spine.SkeletonMesh;
	skelData: spine.SkeletonData;
	animations;
	animState = 'Idle'; //used as a key
	darkness = 1;
	sprite: THREE.Sprite;
	height: number;
	width: number;
	startElapsedTime = 0;
	startDuration = 0;
	entry = true;
	entryElapsedTime = 0;
	exit = false;
	exitElapsedTime = 0;
	blinkState: 'START' | 'END' | null = null;
	blinkElapsedTime = 0;
	blinkStartDuration = 0;
	blinkEndDuration = 0;
	spineAnimIndex = 0;
	timeToWait = 0;
	reviveTimer = 0;
	reviveDuration = 0;
	disguiseSkel: spine.SkeletonMesh;
	texture;

	constructor(
		enemyData: EnemyType,
		action,
		route,
		gameManager: GameManager,
		fragmentKey,
		spawnUID: string,
		formIndex = 0,
		setData = null
	) {
		this.assetManager = AssetManager.getInstance();
		this.gameManager = gameManager;
		gameManager.enemiesOnMap.push(this);
		if (setData) {
			this.raycastPos = new THREE.Vector3(
				setData.raycastPos.x,
				setData.raycastPos.y,
				setData.raycastPos.z
			);

			this.targetPos = setData.targetPos
				? new THREE.Vector3(setData.targetPos.x, setData.targetPos.y, setData.targetPos.z)
				: null;
			this.gridPos = setData.gridPos;
			this.data = setData.data;
			this.key = setData.key;
			this.spawnUID = setData.spawnUID;
			this.actions = setData.actions;
			this.hp = setData.hp;
			this.baseSpeed = setData.baseSpeed;
			this.moddedSpeed = setData.moddedSpeed;
			this.route = setData.route;
			this.dontBlockWave = setData.dontBlockWave;
			this.notCountInTotal = setData.notCountInTotal;
			this.currentActionIndex = setData.currentActionIndex;
			this.state = setData.state;
			this.direction = setData.direction
				? new THREE.Vector3(setData.direction.x, setData.direction.y, setData.direction.z)
				: null;
			this.motionMode = setData.motionMode;
			this.isMoving = setData.isMoving;
			this.blinkState = setData.blinkState;
			this.blinkElapsedTime = setData.blinkElapsedTime;
			this.waitElapsedTime = setData.waitElapsedTime;
			this.entry = false;
			this.exit = setData.exit;
			this.exitElapsedTime = setData.exitElapsedTime;
			this.animState = setData.animState;
			this.traits = setData.traits;
			this.specials = setData.specials;
			this.formIndex = setData.formIndex;
			this.spineAnimIndex = setData.spineAnimIndex;
			this.timeToWait = setData.timeToWait;
			this.standbyTime = setData.standbyTime;
			this.pathFinder = setData.pathFinder;
			this.fragmentKey = setData.fragmentKey;
			this.reviveTimer = setData.reviveTimer;
			this.reviveDuration = setData.reviveDuration;
			this.startDuration = setData.startDuration;
			this.startElapsedTime = setData.startElapsedTime;
		} else {
			this.spawnUID = spawnUID;
			this.formIndex = formIndex;
			this.spineAnimIndex = formIndex;
			this.pathFinder = gameManager.pathFinder;
			this.data = enemyData;
			this.key = enemyData.key;
			this.dontBlockWave = action.dontBlockWave;
			this.route = route;
			this.fragmentKey = fragmentKey;
			if (!route.checkpoints?.length > 0) {
				this.arrivalThreshold = GameConfig.gridSize * 0.25;
			} else if (route.visitEveryNodeCenter) {
				this.arrivalThreshold = GameConfig.gridSize * 0.05;
			}
			this.motionMode = route.motionMode;
			this.state = 'idle';
			this.hp = enemyData.forms[0].stats.hp;
			this.baseSpeed = enemyData.forms[0].stats.ms;
			this.moddedSpeed = this.baseSpeed;
			this.traits = getEnemySkills(
				this.data,
				this.data.traits,
				this.formIndex,
				GameConfig.specialMods,
				'trait'
			);
			this.specials = getEnemySkills(
				this.data,
				this.data.forms[this.formIndex].special,
				this.formIndex,
				GameConfig.specialMods,
				'special'
			);
			if (this.traits.find((skill) => ['not_count_in_total'].includes(skill.key))) {
				this.notCountInTotal = true;
			}
			if (this.traits.find((skill) => ['self_bind', 'self_bind_plus'].includes(skill.key))) {
				this.motionMode = 'NONE';
			}
			if (this.traits.find((skill) => skill.key === 'move_blink')) {
				this.motionMode = 'BLINK';
			}
			this.actions = this.getActions(route);
		}

		this.meshGroup = new THREE.Group();
		this.meshGroup.renderOrder = 1;
		this.initModel();
		if (setData) {
			this.skillManager = new SkillManager(
				this,
				this.traits.concat(this.specials),
				this.gameManager,
				setData.skillData
			);
			this.handleAnimUpdate(0.01);
			this.meshGroup.position.set(setData.meshPos.x, setData.meshPos.y, GameConfig.baseZIndex);
			this.pathGroup = this.visualisePath(
				this.actions,
				this.currentActionIndex,
				this.route.startPosition,
				this.route.spawnOffset
			);
		} else {
			if (
				this.animations?.[this.spineAnimIndex]?.Start &&
				this.traits.some((skill) => skill.key === 'appear_nowhere')
			) {
				this.animState = 'Start';
				this.startDuration = getAnimDuration(
					this.skelData,
					this.animations?.[this.spineAnimIndex]?.[this.animState]
				);
			}
			this.skillManager = new SkillManager(
				this,
				this.traits.concat(this.specials),
				this.gameManager
			);
			const { x: actualX, y: actualY } = this.gameManager.getVectorCoordinates(
				route.startPosition,
				route.spawnOffset
			);
			this.meshGroup.position.set(actualX, actualY, GameConfig.baseZIndex); //实体坐标：即敌人中点实际所在位置。敌人处于什么位置，应该判定哪个地块的效果，是否处于我方部分效果的范围内，都是判断的实体坐标
			if (!this.gameManager.isSimulation) {
				this.pathGroup = this.visualisePath(
					this.actions,
					this.currentActionIndex,
					this.route.startPosition,
					this.route.spawnOffset
				);
			}
			const { x, y } = this.gameManager.getVectorCoordinates(route.startPosition, null);
			this.raycastPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
			const standbyTime = this.traits.concat(this.specials).find((skill) => skill.standby)?.standby;
			if (standbyTime) {
				this.state = 'standby';
				this.standbyTime = standbyTime;
			}
		}
	}

	initModel() {
		let modelType = 'spine';
		if (
			[
				'enemy_2096_skzamj',
				'enemy_2095_skzamf',
				'enemy_10061_cjglon',
				'enemy_10062_cjblon'
			].includes(this.key)
		) {
			modelType = 'texture'; //actually its 3D
		}
		if (this.gameManager.isSimulation) {
			if (modelType === 'texture') {
				return;
			}
			this.skelData = this.assetManager.spineMap.get(this.key);
			this.animations = getSpineAnimations(this.key, this.skelData);
			if (this.motionMode === 'BLINK' && this.skelData) {
				this.blinkStartDuration = this.skelData.animations.find(
					(ele) => ele.name === 'Move_Begin'
				)?.duration;
				this.blinkEndDuration = this.skelData.animations.find(
					(ele) => ele.name === 'Move_End'
				)?.duration;
			}
			return;
		}
		const shadowGeometry = new THREE.PlaneGeometry(
			GameConfig.gridSize * 0.8,
			GameConfig.gridSize * 0.4
		);
		const shadowMaterial = new THREE.ShaderMaterial({
			uniforms: {
				shadowTexture: { value: this.assetManager.textures.get('sprite_shadow').texture },
				selectedColor: { value: new THREE.Color(0xff0000) },
				isSelected: { value: false }, // Toggle for using custom color
				opacity: { value: 0.85 }
			},
			vertexShader: `
				varying vec2 vUv;
				void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
				}
			`,
			fragmentShader: `
				uniform sampler2D shadowTexture;
				uniform vec3 selectedColor;
				uniform bool isSelected;
				uniform float opacity;
				varying vec2 vUv;
				void main() {
				vec4 texColor = texture2D(shadowTexture, vUv);
				float alpha = texColor.a;
				
				if(alpha <= 0.01) {
					gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
				} else {
					// Choose between original black or custom color based on toggle
					vec3 finalColor = isSelected ? selectedColor : vec3(0.0, 0.0, 0.0);
					gl_FragColor = vec4(finalColor, alpha * opacity);
				}
				}
			`,
			transparent: true,
			depthTest: false
		});
		const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
		// const hitBoxGeo = new THREE.CircleGeometry(GameConfig.gridSize * 0.1, 32);
		// const hitBoxMaterial = new THREE.MeshBasicMaterial({
		// 	color: 0xc51009,
		// 	depthTest: false,
		// 	transparent:true,
		// 	opacity: 0
		// });
		// const hitBoxMesh = new THREE.Mesh(hitBoxGeo, hitBoxMaterial);
		// hitBoxMesh.position.set(0.5, 0.5, 0.5);
		// hitBoxMesh.userData.name = 'hitbox';
		// this.hitbox = hitBoxMesh;
		shadowMesh.renderOrder = -1;
		shadowMesh.userData.name = 'shadow';
		this.meshGroup.add(shadowMesh);
		this.shadow = shadowMaterial;

		if (modelType === 'texture') {
			let texture;
			let modelScale = 100;
			let spriteScale = 100;

			if (this.gameManager.config.levelId === 'level_rogue4_b-8') {
				modelScale = 65;
				spriteScale = 75;
				texture = this.assetManager.textures.get('skzamj')?.texture;
			} else {
				texture = this.assetManager.textures.get(this.key)?.texture;
			}
			const material = new THREE.SpriteMaterial({
				map: texture,
				transparent: true
			});
			const model = new THREE.Sprite(material);
			model.scale.set(modelScale, modelScale, modelScale);
			model.position.z = 40;
			this.meshGroup.add(model);
			this.texture = model;
			const spriteMaterial = new THREE.SpriteMaterial({
				transparent: true,
				depthTest: false,
				opacity: 0,
				color: 0x000021
			});
			const sprite = new THREE.Sprite(spriteMaterial);
			sprite.scale.set(spriteScale, spriteScale, 1);
			sprite.position.z = GameConfig.gridSize;
			sprite.position.y = -GameConfig.gridSize * 0.15;
			this.meshGroup.add(sprite);
			this.sprite = sprite;
			sprite.userData.enemy = this;
			this.gameManager.game.objects.push(sprite);
			this.gameManager.scene.add(this.meshGroup);
			this.meshGroup.renderOrder = 5;
		} else if (modelType === 'spine') {
			this.skelData = this.assetManager.spineMap.get(this.key);
			if (!this.skelData) {
				return;
			}
			if (this.motionMode === 'BLINK') {
				this.blinkStartDuration = this.skelData.animations.find(
					(ele) => ele.name === 'Move_Begin'
				)?.duration;
				this.blinkEndDuration = this.skelData.animations.find(
					(ele) => ele.name === 'Move_End'
				)?.duration;
			}
			this.animations = getSpineAnimations(this.key, this.skelData);
			const skeletonMesh = new spine.SkeletonMesh(this.skelData, (parameters) => {
				parameters.depthTest = false;
				parameters.alphaTest = 0.001;
				parameters.uniforms = {
					map: { type: 't', value: null },
					darkness: { value: this.darkness }
				};
			});
			this.meshGroup.add(skeletonMesh);
			const { width, height } = getSpineMetaData(this.key, skeletonMesh.skeleton);
			this.width = width;
			this.height = height;
			const size = new spine.Vector2(Math.max(50, this.width), Math.max(75, this.height));
			const spriteMaterial = new THREE.SpriteMaterial({
				transparent: true,
				depthTest: false,
				opacity: 0,
				color: 0x000021
			});
			const sprite = new THREE.Sprite(spriteMaterial);
			sprite.scale.set(size.x, size.y, 1);
			sprite.position.z = GameConfig.gridSize;
			sprite.position.y = skeletonMesh.skeleton.data.height < 300 ? -GameConfig.gridSize * 0.15 : 0;
			this.meshGroup.add(sprite);
			this.sprite = sprite;
			this.skel = skeletonMesh;
			if (
				this.motionMode === 'FLY' &&
				this.data.type.some((type) => ['drone', 'flying'].includes(type))
			) {
				this.sprite.position.y += GameConfig.gridSize * 0.7;
				this.skel.position.y += GameConfig.gridSize * 0.7;
			}
			sprite.userData.enemy = this;
			this.gameManager.game.objects.push(sprite);
			this.gameManager.scene.add(this.meshGroup);

			if (this.entry) {
				this.skel.skeleton.color.r = 0.2;
				this.skel.skeleton.color.g = 0.2;
				this.skel.skeleton.color.b = 0.2;
			}

			if (this.traits.some((skill) => skill.key === 'disguise')) {
				const skel = new spine.SkeletonMesh(this.skelData, (parameters) => {
					parameters.depthTest = false;
				});
				skel.skeleton.color.a = 0.4;
				this.disguiseSkel = skel;
				this.meshGroup.add(skel);
			}

			const range = this.data.forms[this.formIndex].stats.range;
			const normalAtkIsRanged =
				this.data.forms[this.formIndex].normal_attack.atk_type.includes('ranged');
			if (
				(range > 0 && normalAtkIsRanged) ||
				this.traits.some((skill) => ['no_block_ranged_atk'].includes(skill.key))
			) {
				const group = new THREE.Group();
				const radius = range * GameConfig.gridSize;
				const circleGeometry = new THREE.CircleGeometry(radius, 32);
				const ringGeometry = new THREE.RingGeometry(radius - 2, radius, 64);
				const circleMaterial = new THREE.MeshBasicMaterial({
					color: 0xcc526e,
					transparent: true,
					opacity: 0.05,
					depthWrite: false,
					depthTest: false
				});

				const ringMaterial = new THREE.MeshBasicMaterial({
					color: 0xcc526e,
					transparent: true,
					opacity: 0.8,
					depthWrite: false,
					depthTest: false
				});
				const circle = new THREE.Mesh(circleGeometry, circleMaterial);
				const ring = new THREE.Mesh(ringGeometry, ringMaterial);
				group.add(ring, circle);
				group.visible = GameConfig.showAllRange;
				this.atkRangeMesh = group;
				this.meshGroup.add(group);
			}
			const allSkills = this.traits.concat(this.specials);
			if (allSkills.some((skill) => skill.key.includes('stealth'))) {
				this.buffs.push('stealth');
				this.darkness = 0.4;
			}
			const spineStateSkill = allSkills.find((skill) => skill.spineState);
			if (spineStateSkill) {
				this.spineAnimIndex = spineStateSkill.spineState;
			}
			if (allSkills.some((skill) => skill.key.includes('stealth'))) {
				this.buffs.push('stealth');
				this.darkness = 0.4;
			}

			const skillsWithRange = allSkills.filter(
				(skill) => skill.skillRange && (skill.skillRange !== range || !normalAtkIsRanged)
			);
			for (const skill of skillsWithRange) {
				const group = new THREE.Group();
				const radius = skill.skillRange * GameConfig.gridSize;
				const circleGeometry = new THREE.CircleGeometry(radius, 32);
				const ringGeometry = new THREE.RingGeometry(radius - 2, radius, 64);
				const circleMaterial = new THREE.MeshBasicMaterial({
					color: 0x3f5ad7,
					transparent: true,
					opacity: 0.05,
					depthWrite: false,
					depthTest: false
				});

				const ringMaterial = new THREE.MeshBasicMaterial({
					color: 0x3f5ad7,
					transparent: true,
					opacity: 0.8,
					depthWrite: false,
					depthTest: false
				});
				const circle = new THREE.Mesh(circleGeometry, circleMaterial);
				const ring = new THREE.Mesh(ringGeometry, ringMaterial);
				group.add(ring, circle);
				group.visible = GameConfig.showAllRange;
				this.skillRangeMeshes.push(group);
				this.meshGroup.add(group);
			}
		}
	}
	handlePosChange() {
		const gridPos = this.gameManager.getGridPosFromVectors(this.meshGroup.position);
		if (gridPos !== this.gridPos) {
			this.gridPos = gridPos;
			if (!(this.motionMode === 'FLY' || this.traits.some((skill) => skill.key === 'hover'))) {
				this.handleTileInteraction();
			}
		}
	}

	handleTileInteraction() {
		const tile = this.gameManager.tiles.get(this.gridPos);
		if (tile) {
			switch (tile.tileName) {
				case 'tile_hole':
					this.state = 'fall';
					break;
			}
		}
	}
	getFootpoint() {
		// 足坐标在计算避障力时被使用
		const { x, y, z } = this.meshGroup.position;
		return new THREE.Vector3(x, y - GameConfig.gridSize * 0.2, z);
	}

	getActions(route) {
		const actions = [
			...route.checkpoints.map((cp) => {
				return { ...cp, pathType: 'cp' };
			}),
			{
				type: 'MOVE',
				time: 0.0,
				position: route.endPosition,
				reachOffset: {
					x: 0.0,
					y: 0.0
				},
				randomizeReachOffset: false,
				reachDistance: 0.0,
				pathType: 'end'
			}
		];
		if (this.motionMode === 'FLY' || this.motionMode === 'BLINK') {
			return actions;
		}

		// WALK
		let currentPosition = this.route.startPosition; //spawnOffset not applied
		const routedActions = actions.reduce((acc, action) => {
			const { type, pathType, position, reachOffset } = action;
			switch (type) {
				case 'MOVE':
					{
						// Special case where Movement in same position but with reachOffset ro2_4_5
						if (currentPosition.row === position.row && currentPosition.col === position.col) {
							acc.push({
								type: 'MOVE',
								time: 0.0,
								position: position,
								reachOffset: reachOffset,
								reachDistance: 0.0,
								pathType: 'cp'
							});
							break;
						}
						const paths = this.pathFinder.findPath(currentPosition, position);
						const relevantPaths = paths?.slice(1);
						if (relevantPaths) {
							relevantPaths.forEach(([col, row]) => {
								const isCheckPoint =
									pathType === 'cp' && row === position.row && col === position.col;
								const isEnd = pathType === 'end' && row === position.row && col === position.col;
								acc.push({
									type: 'MOVE',
									time: 0.0,
									position: { row, col },
									reachOffset: isCheckPoint
										? reachOffset
										: {
												x: 0.0,
												y: 0.0
										  },
									reachDistance: 0.0,
									pathType: isCheckPoint ? 'cp' : isEnd ? 'end' : 'intermediate'
								});
							});
						}
						currentPosition = position;
					}
					break;
				case 'APPEAR_AT_POS':
					currentPosition = position;
					acc.push(action);
					break;
				default:
					acc.push(action);
					break;
			}

			return acc;
		}, []);
		return routedActions;
	}

	entryColorChange(delta) {
		if (this.entryElapsedTime > 0.5) {
			this.entry = false;
			if (this.skel) {
				this.skel.skeleton.color.r = 1;
				this.skel.skeleton.color.g = 1;
				this.skel.skeleton.color.b = 1;
			}
			return;
		}
		this.entryElapsedTime += delta * 2;
		if (this.skel) {
			this.skel.skeleton.color.r += delta * 2;
			this.skel.skeleton.color.g += delta * 2;
			this.skel.skeleton.color.b += delta * 2;
		}
	}

	exitColorChange(delta) {
		if (this.exitElapsedTime > 0.5) {
			this.alive = false;
			this.remove();
			return;
		}
		this.exitElapsedTime += delta;
		if (this.skel) {
			this.skel.skeleton.color.r -= delta * 2;
			this.skel.skeleton.color.g -= delta * 2;
			this.skel.skeleton.color.b -= delta * 2;
			this.skel.skeleton.color.a -= delta * 2;
		}
	}

	handleAnimUpdate(delta: number) {
		this.handleAnimationChange();
		this.skel && this.skel.update(delta);
		this.disguiseSkel && this.disguiseSkel.update(delta);

		if (this.state === 'fall') {
			if (this.exitElapsedTime > 0.5) {
				this.alive = false;
				this.remove();
				return;
			}
			this.exitElapsedTime += delta;
			if (this.skel) {
				this.skel.skeleton.color.r -= delta * 4;
				this.skel.skeleton.color.g -= delta * 4;
				this.skel.skeleton.color.b -= delta * 4;
				this.meshGroup.position.x += 3 * (this.direction?.x ?? 0);
				this.meshGroup.position.y += 3 * (this.direction?.y ?? 0);
				this.meshGroup.position.z -= 20;
			}
			return;
		}

		if (this.entry) {
			this.entryColorChange(delta);
		}
		if (this.exit) {
			this.exitColorChange(delta);
		}
	}

	update(delta: number) {
		this.handleAnimUpdate(delta);
		if (this.startDuration > this.startElapsedTime) {
			this.handleStart(delta);
			return;
		}
		if (this.state === 'fall') return;

		this.skillManager.update(delta);
		if (this.currentActionIndex >= this.actions.length) {
			if (this.motionMode === 'NONE') {
				// special case for skzamb
				this.animState = 'Idle';
				return;
			}
			this.onEnd();
			return;
		}
		if(this.traits.some(skill => skill.key === "statue_enemy")){
			return;
		}
		// 避障力
		// const force = this.gameManager.calculateAvoidanceForce(this.raycastPos,this.getFootpoint(),this.direction);

		const { type, position, pathType, time, reachOffset } = this.actions[this.currentActionIndex];

		if (this.selected) {
			if (!this.pathOn) {
				this.visualisePath(this.actions, this.currentActionIndex, this.route.startPosition);
				this.pathOn = true;
			}
		}
		switch (type) {
			case 'MOVE':
				{
					if (this.gameManager.config.levelId.includes('_d-') && GameConfig.stagePhaseIndex === 0) {
						// workaround for duel stages to prevent enemy from moving
						this.animState = 'Idle';
						return;
					}
					if (this.standbyTime > 0) {
						break;
					}
					if (this.skillManager.isUsingSkill) {
						break;
					}
					if (this.state === 'revive') {
						this.handleRevive(delta);
						break;
					}
					if (this.motionMode === 'NONE') {
						return;
					}
					if (this.motionMode === 'BLINK') {
						// smedzi
						if (!this.skelData) return;
						switch (this.blinkState) {
							case null:
								//START BLINK
								this.animState = 'Blink';
								this.blinkState = 'START';
								break;
							case 'START':
								{
									this.blinkElapsedTime += delta;
									if (this.blinkElapsedTime > this.blinkStartDuration) {
										this.blinkElapsedTime = 0;
										const { x, y } = this.gameManager.getVectorCoordinates(position, reachOffset);
										this.targetPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
										this.raycastPos.copy(this.targetPos);
										this.meshGroup.position.copy(this.targetPos);
										this.blinkState = 'END';
									}
								}
								break;
							case 'END':
								{
									this.blinkElapsedTime += delta;
									if (this.blinkElapsedTime > this.blinkEndDuration) {
										this.blinkElapsedTime = 0;
										this.blinkState = null;
										this.currentActionIndex++;
									}
								}
								break;
						}

						return;
					}
					if (!this.isMoving) {
						// Start new movement
						const { x, y } = this.gameManager.getVectorCoordinates(position, reachOffset);
						this.targetPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
						this.isMoving = true;
						this.animState = 'Move';
					}
					let direction = new THREE.Vector3()
						.subVectors(this.targetPos, this.raycastPos)
						.normalize();
					if (direction.x === 0) {
						let nextCheckPoint;
						for (let i = this.currentActionIndex; i < this.actions.length; i++) {
							if (['cp', 'end'].includes(this.actions[i].pathType)) {
								nextCheckPoint = this.actions[i].position;
							}
						}
						if (!nextCheckPoint) {
							nextCheckPoint = this.actions[this.actions.length - 1]?.position;
						}
						const { x, y } = this.gameManager.getVectorCoordinates(nextCheckPoint, reachOffset);
						direction = new THREE.Vector3()
							.subVectors(new THREE.Vector3(x, y, GameConfig.baseZIndex), this.raycastPos)
							.normalize();
					}
					this.direction = direction;
					this.updateSpriteOrientation();

					const distance = this.raycastPos.distanceTo(this.targetPos);
					const adjustedSpeed = this.moddedSpeed * delta * GameConfig.gridSize * moveMultiplier;
					let arrivalThreshold = this.arrivalThreshold;
					if (['cp', 'end'].includes(pathType)) {
						arrivalThreshold = adjustedSpeed;
					}
					if (distance > arrivalThreshold) {
						const moveDistance = Math.min(adjustedSpeed, distance);

						const dx = this.targetPos.x - this.raycastPos.x;
						const dy = this.targetPos.y - this.raycastPos.y;

						this.meshGroup.position.x += (dx / distance) * moveDistance;
						this.raycastPos.x += (dx / distance) * moveDistance;
						this.meshGroup.position.y += (dy / distance) * moveDistance;
						this.raycastPos.y += (dy / distance) * moveDistance;
					} else {
						this.isMoving = false;
						if (['cp', 'end'].includes(pathType)) {
							this.raycastPos.copy(this.targetPos);
						}
						this.currentActionIndex++;
					}
				}
				break;
			case 'WAIT_CURRENT_FRAGMENT_TIME':
			case 'WAIT_CURRENT_WAVE_TIME':
			case 'WAIT_FOR_SECONDS':
				if (this.waitElapsedTime === 0) {
					this.state = 'wait';
					this.animState = 'Idle';
					this.waitElapsedTime += delta;
					switch (type) {
						case 'WAIT_CURRENT_FRAGMENT_TIME':
							this.timeToWait =
								time - this.gameManager.spawnManager.fragmentsTimeTracker.get(this.fragmentKey);
							break;
						case 'WAIT_CURRENT_WAVE_TIME':
							this.timeToWait = time - GameConfig.waveElapsedTime;
							break;
						default:
							this.timeToWait = time;
							break;
					}
					if (!this.gameManager.isSimulation) {
						this.countdownId = this.gameManager.createCountdown(
							this.timeToWait,
							this.meshGroup.position.x,
							this.meshGroup.position.y + 30
						);
					}
				} else {
					this.waitElapsedTime += delta;
					if (this.countdownId === -1 && !this.gameManager.isSimulation) {
						this.countdownId = this.gameManager.createCountdown(
							this.timeToWait - this.waitElapsedTime,
							this.meshGroup.position.x,
							this.meshGroup.position.y + 30
						);
					}
				}

				if (this.waitElapsedTime >= this.timeToWait) {
					this.countdownId = -1;
					this.waitElapsedTime = 0;
					this.currentActionIndex++;
				}
				break;

			case 'DISAPPEAR':
				this.state = 'disappear';
				this.meshGroup.visible = false;
				this.currentActionIndex++;
				break;

			case 'APPEAR_AT_POS':
				this.meshGroup.visible = true;
				const { x, y } = this.gameManager.getVectorCoordinates(position, reachOffset);
				this.meshGroup.position.set(x, y, GameConfig.baseZIndex);
				this.raycastPos = new THREE.Vector3(x, y, GameConfig.baseZIndex);
				this.currentActionIndex++;
				break;
			default:
				console.warn(type, ' action is undefined');
		}
		this.handlePosChange();
		if (this.standbyTime > 0) {
			if (this.state === 'wait' && this.waitElapsedTime > 0) {
				// executing WAIT action
				this.standbyTime -= delta;
			} else {
				if (this.waitElapsedTime === 0) {
					this.state = 'standby';
					if (!this.gameManager.isSimulation) {
						this.countdownId = this.gameManager.createCountdown(
							this.standbyTime,
							this.meshGroup.position.x,
							this.meshGroup.position.y + 20,
							'standby'
						);
					}
					this.animState = 'Idle';
					this.waitElapsedTime += delta;
				} else {
					this.waitElapsedTime += delta;
					if (this.countdownId === -1 && !this.gameManager.isSimulation) {
						this.countdownId = this.gameManager.createCountdown(
							this.standbyTime - this.waitElapsedTime,
							this.meshGroup.position.x,
							this.meshGroup.position.y + 30,
							'standby'
						);
					}
				}

				if (this.waitElapsedTime >= this.standbyTime) {
					this.countdownId = -1;
					this.standbyTime = 0;
					this.waitElapsedTime = 0;
					if (this.key === 'enemy_2089_skzjkl') {
						this.handleFormIndexChange();
					}
				}
			}
			return;
		}
	}

	takeDamage(damage: number): void {
		this.hp -= damage;
		if (this.hp <= 0) {
			this.onDeath();
		}
	}
	onEnd(): void {
		this.exit = true;
	}

	onDeath(): void {
		this.skel.state.setAnimation(0, 'Die', false);
		this.exit = true;
	}

	remove() {
		if (!this.gameManager.isSimulation) {
			if (!this.sprite) return;
			let index = this.gameManager.game.objects.findIndex((ele) => ele.uuid === this.sprite.uuid);
			if (index !== -1) {
				this.gameManager.game.objects.splice(index, 1);
			}
			this.gameManager.removeCountdown(this.countdownId);
			index = this.gameManager.enemiesOnMap.findIndex((enemy) => enemy.spawnUID === this.spawnUID);
			this.gameManager.enemiesOnMap.splice(index, 1);
			this.onDeselect();
			this.gameManager.scene.remove(this.meshGroup);
			clearObjects(this.meshGroup);
		}
		this.gameManager.killedCount++;
	}

	onSelect() {
		// console.log(this.spawnUID);
		// console.log(this.data);
		// const pos = this.gameManager.getGridPosition(this.raycastPos);
		// console.log(pos);
		this.shadow.uniforms.isSelected.value = true;
		this.gameManager.scene.add(this.pathGroup);
		this.selected = true;
		if (this.waitElapsedTime > 0) {
			this.gameManager.countdownManager.toggleCountdown(this.countdownId, true);
		}
		if (this.atkRangeMesh) {
			this.atkRangeMesh.visible = true;
		}
		this.skillRangeMeshes.forEach((mesh) => (mesh.visible = true));
	}
	onDeselect() {
		if (!this.gameManager.isSimulation) {
			this.gameManager.scene.remove(this.pathGroup);
			this.shadow.uniforms.isSelected.value = false;
			this.selected = false;
			!GameConfig.showAllTimers &&
				this.gameManager.countdownManager.toggleCountdown(this.countdownId, false);
			if (this.atkRangeMesh) {
				this.atkRangeMesh.visible = GameConfig.showAllRange;
			}
			this.skillRangeMeshes.forEach((mesh) => (mesh.visible = GameConfig.showAllRange));
		}
	}

	visualisePath(paths, currentActionIndex, startPos, spawnOffset) {
		const remainingPaths = paths.filter((ele, i) => i >= currentActionIndex);
		const returnGroup = new THREE.Group();
		returnGroup.renderOrder = 50;
		const lineGroup = new THREE.Group();
		const movePaths = paths.filter((ele) => ele.type === 'MOVE' || ele.type === 'APPEAR_AT_POS');
		for (let i = 0; i < movePaths.length; i++) {
			const startCoordinates = movePaths?.[i - 1]?.position || startPos;
			const startOffSet = i - 1 === -1 ? spawnOffset : movePaths?.[i - 1].reachOffset;
			const endCoordinates = movePaths[i].position;
			const endOffset = movePaths?.[i].reachOffset;
			// if(movePaths[i].type === "APPEAR_AT_POS"){
			// continue;
			// }

			const startPoint = this.gameManager.getVectorCoordinates(startCoordinates, startOffSet);
			const start = new THREE.Vector3(startPoint.x, startPoint.y, 0);
			// Define start and end points
			const endPoint = this.gameManager.getVectorCoordinates(endCoordinates, endOffset);
			const end = new THREE.Vector3(endPoint.x, endPoint.y, 0);

			// Create a geometry and add the points
			const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);

			// Create a material for the line
			const material = new THREE.LineBasicMaterial({
				color: 0xff0000,
				transparent: true,
				depthTest: false
			}); // Red line

			// Create the line
			const line = new THREE.Line(geometry, material);
			line.position.z = 10;
			lineGroup.add(line);
		}
		for (let i = 0; i < paths.length; i++) {
			const { type, pathType, time, position, reachOffset } = paths[i];
			const group = new THREE.Group();

			switch (type) {
				case 'MOVE':
					if (pathType === 'cp') {
						const texture = this.assetManager.textures.get('flag').texture;
						const spriteMaterial = new THREE.SpriteMaterial({
							map: texture,
							transparent: true,
							depthTest: false
						});
						const sprite = new THREE.Sprite(spriteMaterial);
						sprite.scale.set(GameConfig.gridSize * 0.6, GameConfig.gridSize * 0.6, 1);
						const { x, y } = this.gameManager.getVectorCoordinates(position, reachOffset);
						sprite.position.set(x + 2, y + GameConfig.gridSize * 0.3, GameConfig.baseZIndex + 10);
						group.renderOrder = 50;
						sprite.renderOrder = 50;
						group.add(sprite);
					}
					break;
				case 'WAIT_FOR_SECONDS':
					{
						const geometry = new THREE.CircleGeometry(GameConfig.gridSize / 4, 32);
						const material = new THREE.MeshBasicMaterial({
							color: 0xb1b1b1,
							transparent: true,
							depthTest: false
						});
						const circle = new THREE.Mesh(geometry, material);
						const ringGeometry = new THREE.RingGeometry(
							GameConfig.gridSize / 4 - 2,
							GameConfig.gridSize / 4,
							32
						);
						const ringMaterial = new THREE.MeshBasicMaterial({
							color: 0xdc143c,
							transparent: true,
							depthTest: false
						});
						const ring = new THREE.Mesh(ringGeometry, ringMaterial);
						ring.position.z = 2;
						const waitPosition =
							i === 0
								? startPos
								: paths[i - 1].type === 'DISAPPEAR'
								? paths[i - 2].position
								: paths[i - 1].position;
						const offset = i === 0 ? spawnOffset : reachOffset;
						const { x, y } = this.gameManager.getVectorCoordinates(waitPosition, offset);
						const textMesh = this.gameManager.getTextSprite(time.toFixed() + 's', 16);
						textMesh.position.z = 5;
						group.add(textMesh, ring, circle);
						group.position.set(x, y, GameConfig.baseZIndex + 15);
						group.renderOrder = 50;
						circle.renderOrder = 50;
						textMesh.renderOrder = 50;
						ring.renderOrder = 50;
					}
					break;
				default:
					break;
			}
			returnGroup.add(group);
		}
		returnGroup.add(lineGroup);
		return returnGroup;
	}

	handleFormIndexChange() {
		this.animState = 'Revive';
		if (!this.reviveDuration) {
			this.reviveDuration = getAnimDuration(
				this.skelData,
				this.animations?.[this.spineAnimIndex]?.[this.animState]
			);
		}
		this.gameManager.spawnManager.enterNextWaveFlag = true;
		this.state = 'revive';
	}

	handleStart(delta: number) {
		this.startElapsedTime += delta;
		if (this.startElapsedTime > this.startDuration) {
			this.startDuration = 0;
			this.startElapsedTime = 0;
			this.animState = 'Idle';
		}
	}

	handleRevive(delta: number) {
		this.reviveTimer += delta;
		if (this.reviveTimer > this.reviveDuration) {
			this.state = 'free';
			this.reviveDuration = 0;
			this.reviveTimer = 0;
			this.formIndex++;
			this.spineAnimIndex++;
			this.specials = getEnemySkills(
				this.data,
				this.data.forms[this.formIndex].special,
				this.formIndex,
				GameConfig.specialMods,
				'special'
			);
			this.skillManager.setSkills(this.traits.concat(this.specials));
		}
	}

	handleAnimationChange() {
		if (!this.skel) return;
		let animName = this.animations?.[this.spineAnimIndex]?.[this.animState];
		if (this.animState === 'Blink') {
			switch (this.blinkState) {
				case 'START':
					animName = this.animations?.[this.spineAnimIndex]?.Move_Begin;
					break;
				case 'END':
					animName = this.animations?.[this.spineAnimIndex]?.Move_End;
					break;
			}
		}
		if (!animName) return;
		if (!this.skel.state.hasAnimation(animName)) return;
		if (this.disguiseSkel) {
			this.disguiseSkel.state.setAnimation(0, animName.replace('A', 'B'), true);
		}
		if (animName === this.skel.state.currentAnimation) return;
		const repeat = !['Start', 'Blink'].includes(this.animState);
		this.skel.state.setAnimation(0, animName, repeat);
	}

	updateSpriteOrientation() {
		if (!this.direction) return;
		if (this.direction.x !== 0) {
			if (this.skel) {
				this.skel.scale.x = this.direction.x < 0 ? -1 : 1;
			}
			if (this.disguiseSkel) {
				this.disguiseSkel.scale.x = this.direction.x < 0 ? -1 : 1;
			}
		}
	}

	updateData(setData) {
		this.raycastPos.set(setData.raycastPos.x, setData.raycastPos.y, setData.raycastPos.z);
		this.meshGroup.position.set(setData.meshPos.x, setData.meshPos.y, GameConfig.baseZIndex);
		this.targetPos = setData.targetPos
			? new THREE.Vector3(setData.targetPos.x, setData.targetPos.y, setData.targetPos.z)
			: null;
		this.gridPos = setData.gridPos;
		this.hp = setData.hp;
		this.moddedSpeed = setData.moddedSpeed;
		this.currentActionIndex = setData.currentActionIndex;
		this.state = setData.state;
		this.direction = setData.direction
			? new THREE.Vector3(setData.direction.x, setData.direction.y, setData.direction.z)
			: null;
		this.isMoving = setData.isMoving;
		this.blinkState = setData.blinkState;
		this.blinkElapsedTime = setData.blinkElapsedTime;
		this.waitElapsedTime = setData.waitElapsedTime;
		this.exit = setData.exit;
		this.exitElapsedTime = setData.exitElapsedTime;
		this.animState = setData.animState;
		this.skillManager.set(setData.skillData);
		this.formIndex = setData.formIndex;
		this.spineAnimIndex = setData.spineAnimIndex;
		this.timeToWait = setData.timeToWait;
		this.standbyTime = setData.standbyTime;
		this.reviveTimer = setData.reviveTimer;
		this.reviveDuration = setData.reviveDuration;
		this.startDuration = setData.startDuration;
		this.startElapsedTime = setData.startElapsedTime;
		this.countdownId = -1;
		this.entry = false;
		if (this.skel) {
			this.skel.skeleton.color.r = 1;
			this.skel.skeleton.color.g = 1;
			this.skel.skeleton.color.b = 1;
			this.skel.skeleton.color.a = 1;
		}
		this.meshGroup.visible = setData.meshVisible;
		this.handleAnimUpdate(1);
		this.updateSpriteOrientation();
	}
}

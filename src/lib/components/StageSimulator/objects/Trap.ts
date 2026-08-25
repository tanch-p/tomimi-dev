import * as THREE from 'three';
import * as spine from '$lib/spine';
import trapLookup from '$lib/data/trap/traps.json';
import trapSkills from '$lib/data/trap/traps_skills.json';
import { AssetManager } from './AssetManager';
import { GameConfig } from './GameConfig';
import { getAnimDuration, getIdleAnimName, getSpineMetaData } from '$lib/functions/spineHelpers';
import { clearObjects } from '$lib/functions/threejsHelpers';
import { createPathVisualisation } from '$lib/functions/pathVisualisationHelpers';
import type { GameManager } from './GameManager';

export class Trap {
	assetManager: AssetManager;
	isRoadblock: 0 | 1;
	data;
	key;
	type;
	skel;
	direction;
	position;
	hideTile: boolean;
	meshGroup = new THREE.Group();
	isSimulation;
	gameManager: GameManager;
	branchKey: string | null = null;
	branch: any = null;
	isPeriodicSummoner = false;
	summonInterval = 0;
	summonElapsedTime = 0;
	summonAnimation: string | null = null;
	summonAnimationDuration = 0;
	summonAnimationElapsedTime = 0;
	previousAnimation: string | null = null;
	pathGroup: THREE.Group | null = null;
	sprite: THREE.Sprite | null = null;
	selected = false;
	constructor(data, pos, isSimulation: boolean, blackboard, gameManager?: GameManager) {
		this.assetManager = AssetManager.getInstance();
		this.gameManager = gameManager!;
		const trap = trapLookup[data.key];
		this.data = trap;
		this.key = data.key;
		this.hideTile = trap.hideTile;
		this.direction = data.direction;
		this.position = pos;
		this.type = trap.modelType;
		this.isSimulation = isSimulation;
		const blackboards = [blackboard, data.overrideSkillBlackboard].filter(Array.isArray);
		const blackboardEntries = blackboards.flat();
		this.branchKey = blackboardEntries.find((entry) => entry.key === 'branch_id')?.valueStr ?? null;
		this.branch = (gameManager?.config as any)?.branches?.[this.branchKey as string] ?? null;
		this.isPeriodicSummoner = Boolean(
			this.branchKey && this.branch && trap.special.includes('rgdysm_summon')
		);
		if (this.isPeriodicSummoner) {
			const specialMod =
				(GameConfig.specialMods as any)?.[this.key]?.rgdysm_summon ||
				(GameConfig.specialMods as any)?.[data.alias]?.rgdysm_summon;
			const summonSkill = { ...trapSkills.rgdysm_summon, ...specialMod };
			const intervalOverride = blackboardEntries.find(
				(entry) => entry.key === 'talent@interval' || entry.key === 'interval'
			)?.value;
			this.summonInterval = Number(intervalOverride ?? summonSkill.interval);
			this.summonAnimation = summonSkill.beginAnimation ?? null;
		}
		!isSimulation && this.initModel(trap.modelType);
		this.isRoadblock =
			trap.special.some((skillRef) => ['roadblock'].includes(skillRef)) ||
			trap.skills.some((skillRef) => ['sktok_crate', 'sktok_stone'].includes(skillRef));
	}

	getMesh() {
		return this.meshGroup;
	}

	initModel(type) {
		switch (type) {
			case 'spine':
				{
					const skeletonData = this.assetManager.spineMap.get(this.key);
					if (!skeletonData) {
						return;
					}
					// console.log(skeletonData);
					const skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
						parameters.depthTest = false;
					});
					this.skel = skeletonMesh;
					skeletonMesh.position.set(0, -GameConfig.gridSize * 0.2, 0);
					skeletonMesh.state;
					const animName = getIdleAnimName(this.key, skeletonData);
					this.skel.state.setAnimation(0, animName, true);
					this.summonAnimationDuration = getAnimDuration(skeletonData, this.summonAnimation);
					skeletonMesh.renderOrder = -1;
					this.meshGroup.add(skeletonMesh);

					if (this.branchKey && this.gameManager) {
						const { width, height } = getSpineMetaData(this.key, skeletonMesh.skeleton) ?? {
							width: 50,
							height: 75
						};
						const sprite = new THREE.Sprite(
							new THREE.SpriteMaterial({
								transparent: true,
								depthTest: false,
								opacity: 0,
								color: 0x000021
							})
						);
						sprite.scale.set(Math.max(50, width), Math.max(75, height), 1);
						sprite.position.z = GameConfig.gridSize / 2;
						sprite.userData.trap = this;
						this.sprite = sprite;
						this.meshGroup.add(sprite);
						this.gameManager.game.objects.push(sprite);
						this.pathGroup = this.visualiseBranchPaths();
					}
				}
				switch (this.direction) {
					case 'LEFT':
						this.meshGroup.scale.x *= -1;
						break;
					case 'UP':
						break;
					case 'DOWN':
						break;
					default:
						break;
				}
				return;
			case 'model':
				{
					const model = this.assetManager.models.get(this.key)?.clone();
					if (!model) {
						return;
					}
					let scale = 100;
					switch (this.key) {
						case 'trap_107_smpow':
							model.position.z = 40;
							break;
						case 'trap_001_crate':
						case 'trap_480_roadblockxb':
							scale = 110;
							break;
						case 'trap_097_hstone':
							scale = 123;
							model.position.x = -20;
							break;
						case 'trap_057_wpnsts':
							model.position.z = 30;
							scale = 110;
							break;
					}

					model.scale.set(scale, scale, scale);
					this.meshGroup.add(model);
					switch (this.key) {
						case 'trap_106_smtree':
						case 'trap_111_wdfarm':
							switch (this.direction) {
								case 'LEFT':
									this.meshGroup.rotation.z = Math.PI;
									break;
								case 'UP':
									this.meshGroup.rotation.z = -Math.PI / 2;
									break;
								case 'DOWN':
									this.meshGroup.rotation.z = Math.PI / 2;
									break;
								default:
									break;
							}
							return;
					}
					switch (this.direction) {
						case 'LEFT':
							this.meshGroup.rotation.z = Math.PI;
							break;
						case 'UP':
							this.meshGroup.rotation.z = Math.PI / 2;
							break;
						case 'DOWN':
							this.meshGroup.rotation.z = -Math.PI / 2;
							break;
						default:
							break;
					}
				}
				return;
			case 'texture':
			default:
				{
					const texture = this.assetManager.textures.get(this.key)?.texture;
					if (!texture) break;
					const geometry = new THREE.PlaneGeometry(GameConfig.gridSize, GameConfig.gridSize);
					const material = new THREE.MeshStandardMaterial({
						map: texture,
						transparent: true
					});
					const frontPlane = new THREE.Mesh(geometry, material);
					frontPlane.renderOrder = -1;
					frontPlane.position.z = 15;
					this.meshGroup.add(frontPlane);
				}
				break;
		}
	}

	remove() {
		const gameManager = this.gameManager;
		const sprite = this.sprite;
		if (sprite) {
			const index = gameManager.game.objects.findIndex((object) => object.uuid === sprite.uuid);
			if (index !== undefined && index !== -1) {
				gameManager.game.objects.splice(index, 1);
			}
		}
		if (this.pathGroup) {
			this.gameManager?.scene.remove(this.pathGroup);
			clearObjects(this.pathGroup);
		}
		clearObjects(this.meshGroup);
	}

	onSelect() {
		if (!this.pathGroup || !this.gameManager || this.selected) return;
		this.gameManager.scene.add(this.pathGroup);
		this.selected = true;
	}

	onDeselect() {
		if (!this.pathGroup || !this.gameManager || !this.selected) return;
		this.gameManager.scene.remove(this.pathGroup);
		this.selected = false;
	}

	activateBranch() {
		if (!this.branchKey || !this.branch || !this.gameManager) return;
		if (this.isPeriodicSummoner) {
			this.onDeselect();
			return;
		}
		this.gameManager.spawnManager.addBranch(this.branchKey, structuredClone(this.branch));
		this.gameManager.traps.delete(`${this.position.col},${this.position.row}`);
		this.remove();
	}

	summonBranch() {
		if (!this.branchKey || !this.branch || !this.gameManager) return;
		this.playSummonAnimation();
		this.gameManager.spawnManager.addBranch(this.branchKey, structuredClone(this.branch));
	}

	playSummonAnimation() {
		if (!this.skel || !this.summonAnimation || !this.summonAnimationDuration) return;
		if (!this.skel.state.hasAnimation(this.summonAnimation)) return;
		if (!this.previousAnimation) {
			this.previousAnimation = this.skel.state.currentAnimation;
		}
		this.skel.state.setAnimation(0, this.summonAnimation, false);
		this.summonAnimationElapsedTime = 0;
	}

	updateSummonAnimation(delta) {
		if (!this.previousAnimation || !this.summonAnimationDuration) return;
		this.summonAnimationElapsedTime += delta;
		if (this.summonAnimationElapsedTime < this.summonAnimationDuration) return;
		this.skel.state.setAnimation(0, this.previousAnimation, true);
		this.previousAnimation = null;
		this.summonAnimationElapsedTime = 0;
	}

	getPathActions(route: any) {
		const actions = [
			...(route.checkpoints ?? []).map((checkpoint) => ({ ...checkpoint, pathType: 'cp' })),
			{
				type: 'MOVE',
				time: 0,
				position: route.endPosition,
				reachOffset: { x: 0, y: 0 },
				pathType: 'end'
			}
		];
		let currentPosition = route.startPosition;
		return actions.reduce((pathActions, action) => {
			if (action.type === 'APPEAR_AT_POS') {
				currentPosition = action.position;
				pathActions.push(action);
				return pathActions;
			}
			if (action.type !== 'MOVE') {
				pathActions.push(action);
				return pathActions;
			}
			if (
				currentPosition.row === action.position.row &&
				currentPosition.col === action.position.col
			) {
				pathActions.push({ ...action, reachDistance: 0 });
			} else {
				const paths = this.gameManager.pathFinder
					.findPath(currentPosition, action.position)
					?.slice(1);
				paths?.forEach(([col, row]) => {
					const isCheckpoint =
						action.pathType === 'cp' && row === action.position.row && col === action.position.col;
					const isEnd =
						action.pathType === 'end' && row === action.position.row && col === action.position.col;
					pathActions.push({
						type: 'MOVE',
						time: 0,
						position: { row, col },
						reachOffset: isCheckpoint ? action.reachOffset : { x: 0, y: 0 },
						pathType: isCheckpoint ? 'cp' : isEnd ? 'end' : 'intermediate'
					});
				});
			}
			currentPosition = action.position;
			return pathActions;
		}, []);
	}

	visualiseBranchPaths() {
		const paths = new THREE.Group();
		const config: any = this.gameManager.config;
		const branch = this.branch;
		const spawnActions: any[] =
			branch?.phases
				?.flatMap((phase: any) => phase.actions)
				.filter((action: any) => action.actionType === 'SPAWN') ?? [];
		for (const action of spawnActions) {
			const originalRoute = config.extra_routes?.[action.routeIndex];
			if (!originalRoute) continue;
			const route = this.gameManager.convertMovementConfig(structuredClone(originalRoute));
			paths.add(
				this.visualisePath(this.getPathActions(route), route.startPosition, route.spawnOffset)
			);
		}
		return paths;
	}

	visualisePath(paths: any[], startPos: any, spawnOffset: any) {
		return createPathVisualisation(
			paths,
			startPos,
			spawnOffset,
			this.assetManager,
			this.gameManager
		);
	}

	update(delta) {
		if (this.isSimulation) {
			return;
		}
		if (this.isPeriodicSummoner && this.summonInterval > 0) {
			this.summonElapsedTime += delta;
			while (this.summonElapsedTime >= this.summonInterval) {
				this.summonBranch();
				this.summonElapsedTime -= this.summonInterval;
			}
		}
		switch (this.type) {
			case 'spine':
				this.skel.update(delta);
				this.updateSummonAnimation(delta);
				break;

			default:
				break;
		}
	}
}

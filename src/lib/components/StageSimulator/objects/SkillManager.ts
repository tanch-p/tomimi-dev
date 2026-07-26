import type { Skill } from '$lib/types';
import * as spine from '$lib/spine';
import * as THREE from 'three';
import { Enemy } from './Enemy';
import { AssetManager } from './AssetManager';
import { ActiveSkill } from './ActiveSkill';
import { getDefaultAnimName } from '$lib/functions/spineHelpers';
import { GameManager } from './GameManager';

export class SkillManager {
	gameManager: GameManager;
	assetManager: AssetManager;
	enemy: Enemy;
	activeSkills: ActiveSkill[] = [];
	transformModel;
	isUsingSkill = false;
	accelerationIntervalTimer = 0;
	accelerationPreDelayTimer = 0;
	accelerateParams = null;
	accelerationStacks = 0;
	//TODO to rework acceleration into a timer based buff generic skill

	constructor(enemy: Enemy, skills: Skill[], gameManager: GameManager, skillData = null) {
		this.assetManager = AssetManager.getInstance();
		this.enemy = enemy;
		this.gameManager = gameManager;
		for (const skill of skills) {
			if (skill.key === 'transform') {
				const key = skill.value;
				this.addTransformModel(key);
			}
			if (skill.accelerate) {
				this.accelerateParams = skill.accelerate;
			}
			if (skill.key === 'parasitic') {
				this.addParasiticSprite();
			}
		}
		if (['enemy_2148_shorbb'].includes(this.enemy.key)) {
			this.activeSkills = skills
				.filter((ele) => ele.branches)
				.map((skill) => new ActiveSkill(enemy, skill));
			this.activeSkills.forEach((skill, i) => {
				skill.skillBar.position.y = (i + 1) * -10;
				enemy.meshGroup.add(skill.skillBar);
			});
		} else if (
			['enemy_2042_syboss', 'enemy_2089_skzjkl', 'enemy_2018_csdoll'].includes(this.enemy.key)
		) {
			this.activeSkills = skills
				.filter(
					(ele) =>
						ele.branches ||
						(ele.type === 'skill' && (ele.initCooldown || ele.skillType === 'INCREASE_WITH_TIME'))
				)
				.map((skill) => new ActiveSkill(enemy, skill));
			this.activeSkills.forEach((skill, i) => {
				skill.skillBar.position.y = (i + 1) * -10;
				enemy.meshGroup.add(skill.skillBar);
			});
		}
		if (skillData) {
			this.accelerationIntervalTimer = skillData.accelerationIntervalTimer;
			this.accelerationPreDelayTimer = skillData.accelerationPreDelayTimer;
			this.accelerateParams = skillData.accelerateParams;
			this.accelerationStacks = skillData.accelerationStacks;
		}
	}
	addParasiticSprite() {
		if (this.gameManager.isSimulation) return;
		const texture = this.assetManager.textures.get('parasitic')?.texture;
		const material = new THREE.SpriteMaterial({
			map: texture,
			transparent: true,
			depthTest: false
		});
		material.color.multiplyScalar(0.6);
		const sprite = new THREE.Sprite(material);
		sprite.scale.set(50, 50, 50);
		sprite.position.y = this.enemy.height + 20;
		sprite.position.z = 40;
		this.enemy.meshGroup.add(sprite);
	}

	addTransformModel(key) {
		if (this.gameManager.isSimulation) return;

		let skeletonData = this.assetManager.spineMap.get(key);
		if (!skeletonData) {
			const prefabKey = this.enemy.gameManager.config.enemies.find(
				(enemy) => enemy.id === key
			)?.prefabKey;
			if (!prefabKey) {
				return;
			}
			skeletonData = this.assetManager.spineMap.get(prefabKey);
		}
		const skeletonMesh = new spine.SkeletonMesh(skeletonData, (parameters) => {
			parameters.depthTest = false;
			parameters.alphaTest = 0.001;
			parameters.uniforms = {
				map: { type: 't', value: null }
			};
		});
		skeletonMesh.skeleton.color.a = 0.6;
		// console.log(key, skeletonData);
		const defaultAnim = getDefaultAnimName(key, skeletonData);
		skeletonMesh.state.setAnimation(0, defaultAnim, false);
		this.transformModel = skeletonMesh;
		this.enemy.meshGroup.add(skeletonMesh);
	}

	setSkills(skills: Skill[]) {
		this.reset();
		for (const skill of this.activeSkills) {
			this.enemy.meshGroup.remove(skill.skillBar);
			skill.dispose();
		}
		if (this.enemy.key === 'enemy_2042_syboss') {
			this.activeSkills = skills
				.filter(
					(ele) =>
						ele.type === 'skill' && (ele.initCooldown || ele.skillType === 'INCREASE_WITH_TIME')
				)
				.map((skill) => new ActiveSkill(this.enemy, skill));
			this.activeSkills.forEach((skill, i) => {
				skill.skillBar.position.y = (i + 1) * -20;
				this.enemy.meshGroup.add(skill.skillBar);
			});
		}
	}

	update(delta: number) {
		if (this.accelerateParams) {
			const { i, m, preDelay, limit } = this.accelerateParams;
			this.accelerationPreDelayTimer += delta;
			if (this.accelerationPreDelayTimer > preDelay) {
				this.accelerationIntervalTimer += delta;
				this.accelerationStacks = Math.min(limit, Math.floor(this.accelerationIntervalTimer / i));
				this.enemy.moddedSpeed = this.enemy.baseSpeed * (1 + this.accelerationStacks * m);
			}
		}
		if (this.transformModel) {
			this.transformModel.update(delta);
		}
		for (const skill of this.activeSkills) {
			skill.update(delta);
		}
	}

	set(data) {
		if (!data) return;
		this.accelerationIntervalTimer = data.accelerationIntervalTimer;
		this.accelerationPreDelayTimer = data.accelerationPreDelayTimer;
		this.accelerateParams = data.accelerateParams;
		this.accelerationStacks = data.accelerationStacks;
	}

	reset() {}
}

import type { Enemy, Language, MapConfig, RogueTopic, Trap } from '$lib/types';
import rogue_4_fragment_F_25 from '$lib/images/is/sarkaz/rogue_4_fragment_F_25.webp';
import tileImg from '$lib/images/tiles/tile_infection.webp';
import enemySkills from '$lib/data/enemy/enemy_skills.json';
import trapSkills from '$lib/data/trap/traps_skills.json';
import { getTranslations } from './languageHelpers';
import { checkIsTarget } from './statHelpers';

export const setOtherBuffsList = (
	store,
	rogueTopic: RogueTopic,
	enemies: Enemy[],
	traps: Trap[],
	mapConfig: MapConfig,
	language: Language,
	difficulty = 0
) => {
	const buffsList = [];
	switch (rogueTopic) {
		case 'rogue_phantom':
			if (difficulty >= 14) {
				buffsList.push({
					key: 'n14_phcs',
					img: null,
					name: 'N14',
					targets: ['ELITE', 'BOSS'],
					activeTargets: [],
					mods: [
						{ key: 'atk', value: 0.3, order: 'initial', mode: 'mul' },
						{ key: 'dmg_res', value: 0.5 }
					],
					maxCount: 1
				});
			}
			break;
		case 'rogue_mizuki':
			if (difficulty >= 18) {
				buffsList.push({
					key: 'n18_mzk',
					img: null,
					name: 'N18',
					targets: ['ELITE', 'BOSS'],
					activeTargets: [],
					mods: [
						{ key: 'atk', value: 0.3, order: 'initial', mode: 'mul' },
						{ key: 'dmg_res', value: 0.5 }
					],
					maxCount: 1
				});
			}
			break;
		case 'rogue_skz':
			buffsList.push({
				key: 'fragment_boom',
				img: rogue_4_fragment_F_25,
				name: '爆破',
				targets: ['trap_760_skztzs'],
				activeTargets: [],
				mods: [{ key: 'hp', value: -0.5, order: 'initial', mode: 'mul' }],
				maxCount: 1
			});
			break;
		case 'rogue_yan':
			if (mapConfig?.traps.some((trap) => trap.key === 'trap_222_rgdysm')) {
				buffsList.push({
					key: 'trap_222_rgdysm',
					img: '/images/chara_icons/trap_222_rgdysm.webp',
					name: '雕伥',
					targets: ['not_flying&not_trap'],
					activeTargets: [],
					mods: [
						{ key: 'ms', value: 0.5, order: 'initial', mode: 'mul' },
						{ key: 'aspd', value: 50, mode: 'add' },
						{ key: 'dmg_res', value: 0.75, mode: 'mul' }
					],
					maxCount: 1
				});
			}
			break;
	}

	const tileInfection = mapConfig?.sp_terrain?.find(
		(item) => item.tileKey === 'tile_infection' && item.heightType === 'LOWLAND'
	);
	if (tileInfection) {
		buffsList.push({
			key: 'tile_infection',
			img: tileImg,
			name: getTranslations(language).tile_infection,
			targets: ['not_flying&not_trap'],
			activeTargets: [],
			mods: [
				{ key: 'atk', value: tileInfection.blackboard['atk'], order: 'initial', mode: 'mul' },
				{
					key: 'aspd',
					value: tileInfection.blackboard['attack_speed'],
					order: 'initial',
					mode: 'add'
				}
			],
			maxCount: 1
		});
	}

	for (const trap of traps) {
		for (const skillKey of trap.special) {
			const skill = trapSkills[skillKey];
			if (!skill) {
				continue;
			}
			if (skill.type === 'buff') {
				buffsList.push({
					key: skillKey,
					img: `/images/chara_icons/${trap.key}.webp`,
					name: trap[`name_${language}`],
					targets: skill.effects.targets,
					activeTargets: skill.effects.activeTargets,
					mods: skill.effects.mods,
					stackType: skill.effects.stackType,
					maxCount: skill.effects?.maxCount
				});
			}
		}
	}

	for (const enemy of enemies) {
		const list = [
			...enemy.traits,
			...enemy.stats.special.reduce((acc, curr) => {
				acc = [...acc, ...curr];
				return acc;
			}, [])
		];
		for (const skillRef of list) {
			const skill = enemySkills[skillRef.key];
			if (!skill) {
				// case for new skills added from specialMods
				continue;
			}
			const replacedSkill = { ...skill, ...skillRef };
			if (skill.type === 'buff') {
				const enemyCount = mapConfig?.enemies.find((ele) => ele.id === enemy.stageId);
				const maxCount =
					replacedSkill.effects?.maxCount ||
					Math.max(enemyCount.max_count, enemyCount.elite_max_count, 1);
				const buff = {
					key: replacedSkill.effects?.key || enemy.stageId,
					imgKey: enemy.key,
					name: enemy[`name_${language}`],
					targets: replacedSkill.effects.targets,
					activeTargets: replacedSkill.effects.activeTargets,
					mods: replacedSkill.effects.mods,
					stackType: replacedSkill.effects.stackType,
					maxCount
				};
				if (skillRef.key === 'dycyue_evasion') {
					buff.img = '/images/chara_icons/trap_790_dytswd.webp';
				}
				buffsList.push(buff);
			}
		}
	}
	store.set(buffsList);
};

export const getOtherBuffsCount = (list, buffKey, key) => {
	const buff = list.find((item) => item.key === buffKey);
	const targetIndex = buff.activeTargets.findIndex((ele) => ele.key === key);
	if (targetIndex === -1) {
		return 0;
	}
	return buff.activeTargets[targetIndex].count;
};

export const updateOtherBuffsList = (store, buffKey, key) => {
	store.update((list) => {
		const buff = list.find((item) => item.key === buffKey);
		const targetIndex = buff.activeTargets.findIndex((ele) => ele.key === key);
		if (targetIndex === -1) {
			buff.activeTargets.push({ key, count: 1 });
		} else {
			const currentCount = buff.activeTargets[targetIndex].count;
			if (currentCount < buff.maxCount) {
				buff.activeTargets[targetIndex].count += 1;
			} else if (currentCount === buff.maxCount) {
				buff.activeTargets[targetIndex].count = 0;
			}
		}
		return list;
	});
};

export const consolidateOtherMods = (otherBuffsList) => {
	const modsList = [];
	otherBuffsList.forEach((buff) => {
		buff.activeTargets.forEach((ele) => {
			if (ele.count > 0) {
				modsList.push({
					key: buff.key,
					mods: [
						[
							{
								targets: [ele.key],
								mods: buff.mods.map(({ key, value, mode, order }) => {
									const stackType = buff.stackType || 'add';
									if (stackType === 'add') {
										if (mode === 'add') {
											return { key, value: value * ele.count, mode, order };
										}
										return {
											key,
											value: value > 1 ? 1 + (value - 1) * ele.count : value * ele.count,
											mode,
											order
										};
									}
									return { key, value: value ** ele.count, mode, order };
								})
							}
						]
					]
				});
			}
		});
	});
	return modsList;
};

export function getApplicableBuffsList(otherBuffsList, entity) {
	if (!otherBuffsList) {
		return [];
	}
	return otherBuffsList.filter((buff) =>
		buff.targets.some((target) => checkIsTarget(entity, target))
	);
}

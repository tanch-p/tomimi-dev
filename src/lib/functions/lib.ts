import translations from '$lib/translations.json';
import type { Enemy, Language, MapConfig, RogueTopic } from '$lib/types';
import rogue_4_fragment_F_25 from '$lib/images/is/sarkaz/rogue_4_fragment_F_25.webp';
import tileImg from '$lib/images/tiles/tile_infection.webp';
import { checkIsTarget } from './statHelpers';
import enemySkills from '$lib/data/enemy/enemy_skills.json';
import ISStages from '$lib/data/stages/stage_name_lookup_table.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../routes/stores';
import pako from 'pako';

export const BONUS_ENEMY_KEYS = [
	'enemy_2001_duckmi',
	'enemy_2002_bearmi',
	'enemy_2034_sythef',
	'enemy_2035_sybox',
	'enemy_2059_smbox',
	'enemy_2085_skzjxd',
	'enemy_2069_skzbox',
	'enemy_2091_skzgds',
	'enemy_2067_skzcy',
	'enemy_2065_skzjs',
	'enemy_2093_skzams',
	'enemy_2070_skzfbx',
	'enemy_2119_dyshhj_2',
	'enemy_2106_dyremy',
	'enemy_2125_dylnpp'
];

export function isEquals(obj1, obj2) {
	if (obj1 === null || obj2 === null) return obj1 === obj2;
	if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
		return obj1 === obj2;
	}
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) {
		return false;
	}
	for (const key of keys1) {
		if (!keys2.includes(key) || !isEquals(obj1[key], obj2[key])) {
			return false;
		}
	}
	return true;
}

export function round(value, decimalPoints = 2) {
	const multiplier = 10 ** decimalPoints;
	return Math.round(value * multiplier) / multiplier;
}

export function convertToOrdinal(number: number) {
	const lastDigit = number % 10;
	const lastTwoDigits = number % 100;

	if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
		return number + 'th';
	}

	switch (lastDigit) {
		case 1:
			return number + 'st';
		case 2:
			return number + 'nd';
		case 3:
			return number + 'rd';
		default:
			return number + 'th';
	}
}

export function getFormTitle(title: string | undefined | null, row: number, language: Language) {
	if (!title) {
		return null;
	}
	if (title.includes('form')) {
		const splitString = title.split('.');
		const formTitle = splitString?.[1];
		if (formTitle) {
			return translations[language][formTitle];
		}
		if (language === 'en') {
			return (
				translations[language].multiform_prefix +
				convertToOrdinal(row + 1) +
				' ' +
				translations[language].multiform_suffix
			);
		}
		return (
			translations[language].multiform_prefix + (row + 1) + translations[language].multiform_suffix
		);
	}

	return translations[language][title];
}

export const getStageData = async (stageName) => {
	const levelId = ISStages[stageName]?.key;
	if (!levelId) return;
	const data = await import(
		`../data/stages/ro_stage_data/level_${levelId.replace('level_', '')}.json`
	);
	return data?.default;
};

export const getTrapFormIndex = (list, index) => {
	const holder = {};
	let counter = 0;
	list.forEach((item, i) => {
		if (typeof item !== 'string') {
			holder[i] = counter;
			counter += 1;
		}
	});
	return holder[index];
};

const getEnemyWeight = (key, type) => {
	if (BONUS_ENEMY_KEYS.includes(key)) {
		return 99;
	}
	switch (key) {
		case 'enemy_2101_dyspll':
			return 50;
		case 'enemy_2121_dyspl2':
			return 51;
		default:
			break;
	}
	return type.includes('BOSS') ? 0 : 1;
};

export const sortEnemies = (a: Enemy, b: Enemy) => {
	return getEnemyWeight(a.key, a.type) - getEnemyWeight(b.key, b.type);
};

export const setOtherBuffsList = (
	store,
	rogueTopic: RogueTopic,
	enemies: Enemy[],
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
			name: translations[language].tile_infection,
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
	for (const enemy of enemies) {
		const enemyCount = mapConfig?.enemies.find((ele) => ele.id === enemy.stageId);
		const maxCount = Math.max(enemyCount.max_count, enemyCount.elite_max_count, 1);
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
			const replacedSkill = {...skill, ...skillRef}
			if (skill.type === 'buff') {
				buffsList.push({
					key: enemy.key,
					name: enemy[`name_${language}`],
					targets: replacedSkill.effects.targets,
					activeTargets: replacedSkill.effects.activeTargets,
					mods: replacedSkill.effects.mods,
					stackType: replacedSkill.effects.stackType,
					maxCount: maxCount
				});
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

export const getEliteColors = (rogueTopic: string) => {
	switch (rogueTopic) {
		case 'rogue_sami':
			return ['bg-[#544a8a]', 'bg-[#8f3033]'];
		case 'rogue_mizuki':
			return ['bg-[#5645a4]', 'bg-[#92344e]'];
		case 'rogue_phantom':
			return ['bg-[#dea41b]', 'bg-[#cb710c]'];
		case 'rogue_skz':
			return ['bg-[#5a4b90]', 'bg-[#cb3220]'];
		case 'rogue_yan':
			return ['bg-[#9d6bd4]', 'bg-[#c44256]'];
	}
	return [];
};

const STAGES_WITH_ELITE_IMG = [
	'ro1_e_4_8',
	'ro3_e_3_2',
	'ro3_e_4_2',
	'ro3_e_5_2',
	'ro4_e_2_2',
	'ro4_e_3_2',
	'ro4_e_3_5',
	'ro4_e_5_8'
];
export const getStageImg = (id: string, eliteMode: boolean) => {
	if (id.includes('_b_')) {
		return id;
	}
	if (id.includes('_t_')) {
		id = id.replace('_e', '');
	}
	if (
		!(eliteMode && STAGES_WITH_ELITE_IMG.includes(id)) &&
		!id.includes('ev') &&
		!id.includes('duel')
	) {
		id = id.replace('e', 'n');
	}
	return id;
};

export async function decompressGzipToJson(url: string) {
	const response = await fetch(url);
	const responseForJSON = response.clone();
	const responseForArrayBuffer = response.clone();

	try {
		return await responseForJSON.json();
	} catch (jsonError) {
		console.warn('Direct JSON parsing failed, trying decompression...');

		try {
			const arrayBuffer = await responseForArrayBuffer.arrayBuffer();

			// Check first few bytes to see if it's gzipped (starts with 0x1F 0x8B)
			const firstBytes = new Uint8Array(arrayBuffer.slice(0, 2));
			const isGzipped = firstBytes[0] === 0x1f && firstBytes[1] === 0x8b;

			if (isGzipped) {
				// It's definitely gzipped, use pako to decompress
				const decompressed = pako.inflate(new Uint8Array(arrayBuffer), { to: 'string' });
				return JSON.parse(decompressed);
			} else {
				// It's not gzipped, try to decode and parse again
				const text = new TextDecoder('utf-8').decode(arrayBuffer);
				return JSON.parse(text);
			}
		} catch (error) {
			console.error('All parsing attempts failed:', error);
			throw new Error('Failed to parse response as JSON, either directly or after decompression');
		}
	}
}

export function setLocalStorage(key, value) {
	if (browser && cookiesEnabled) {
		localStorage.setItem(key, value);
	}
}

export function pruneExtraEnemies(enemies, levelId) {
	if (!['level_rogue2_ev-3', 'level_rogue2_b-7', 'level_rogue4_b-8'].includes(levelId)) {
		return enemies;
	}

	const keys = enemies.map((enemy) => enemy.key);
	switch (levelId) {
		case 'level_rogue4_b-8':
			keys.push('enemy_2093_skzams_1', 'enemy_3001_upeopl_1');
			break;
	}
	return enemies.filter((enemy) => keys.includes(enemy.stageId));
}

export function getStageType(levelId: string, rogueTopic: RogueTopic) {
	if (levelId.includes('_b-')) {
		return 'BATTLE_BOSS';
	}
	if (levelId.includes('_sv-')) {
		return 'BATTLE_SKY';
	}
	return '';
}

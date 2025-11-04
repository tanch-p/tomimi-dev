import type { Language } from '$lib/types';
import filterOptions from '$lib/data/chara/filter_options.json';
import translations from '$lib/translations.json';
import { decompressGzipToJson } from './lib';

const SEARCH_IN_TAGS = [
	'phys',
	'arts',
	'true',
	'ele_dmg',
	'weightless',
	'ally_stealth',
	'lower_target_priority',
	'ally_lower_target_priority',
	'min_damage',
	'ally_spareshot',
	'spareshot',
	'revive',
	'resist',
	'ally_resist',
	'first_token_free',
	'global_move_speed_down',
	'global_heal',
	'global_range',
	'heal_unhealable',
	'heal_on_damage',
	'ignore_evasion',
	'stop_attack',
	'limited_use',
	'unlimited_duration',
	'charged',
	'overdrive',
	'activate_skill',
	'ignore_status',
	'status_immune',
	'inspire',
	'berserk',
	'vigor',
	'skill_time_invincible',
	'enemy_priority',
	'reallocate_hp',
	'erase_projectile',
	'slow_projectile',
	'aspd_unrelated',
	'ailment_but_skill_cont',
	'execute',
	'ally_respawn_time',
	'env_dmg_reduce',
	'ally_env_dmg_reduce',
	'crit_wound',
	'squad_effect',
	'barrier',
	'ally_barrier',
	'infected',
	'starting_cost',
	'enemy_hp',
	'terrain_water',
	'apoptosis',
	'burning',
	'neural',
	'apoptosis_scale',
	'change_target_priority',
	'remove_status',
	'dot',
	'fast_redeploy',
	'heal_ally',
	'heal_self',
	'flying',
	'drone',
	'infection',
	'sarkaz',
	'machine',
	'wildanimal',
	'seamonster',
	'cost_under_10',
	'type_stun',
	'type_sluggish',
	'type_sleep',
	'type_silence',
	'type_freeze',
	'type_levitate',
	'type_root',
	'type_tremble',
	'blocked_enemy',
	'no_block_enemy',
	'self_no_block_enemy',
	'priority_flying',
	'priority_drone',
	'priority_ranged',
	'priority_highest_weight',
	'priority_def_high',
	'priority_def_low',
	'priority_res_high',
	'priority_res_low',
	'priority_stun',
	'priority_sleep',
	'PIONEER',
	'WARRIOR',
	'SNIPER',
	'TANK',
	'MEDIC',
	'SUPPORT',
	'CASTER',
	'SPECIAL',
	'abyssal',
	'three_star',
	'robot',
	'student',
	'kazimierz',
	'rhine',
	'karlan',
	'minos',
	'siracusa',
	'position_ranged',
	'skill_invincible',
	'skill_manual_off',
	'ally_apoptosis',
	'ally_burning',
	'ally_neural',
	'ignore_stealth',
	'weaken',
	'teleport_enemy',
	'add_sp_gain_option',
	'aoe',
	'target_air',
	'elementfragile',
	'magicfragile',
	'physicfragile',
	'fragile',
	'protect',
	'attract_enemy',
	'no_source',
	'ally_min_aspd',
	'min_aspd',
	'permanentatk',
	'ally_arts',
	'mujica',
	'kjerag',
	'not_moving'
];
const SEARCH_IN_BLACKBOARD = [
	'max_target',
	'stealth',
	'camouflage',
	'ally_camouflage',
	'ally_undying',
	'undying',
	'taunt',
	'ally_taunt',
	'reflect_dmg',
	'ally_reflect_dmg',
	'cancel_stealth',
	'stun',
	'sluggish',
	'sleep',
	'silence',
	'cold',
	'levitate',
	'root',
	'tremble',
	'fear',
	'max_hp',
	'def',
	'res',
	'attack_speed',
	'respawn_time',
	'atk_down',
	'def_down',
	'res_down',
	'ms_down',
	'aspd_down',
	'ally_max_hp',
	'ally_atk',
	'ally_def',
	'ally_res',
	'ally_aspd',
	'ally_block_up',
	'ally_block_down',
	'ally_cost_down',
	'evasion',
	'ally_evasion',
	'ally_dmg_res',
	'dmg_res',
	'shield',
	'ally_shield',
	'block_dmg',
	'ally_block_dmg',
	'sp_gain',
	'ally_sp_regen',
	'ally_sp_gain',
	'ally_sp_stock',
	'sp_stock',
	'def_penetrate',
	'res_penetrate',
	'damage_scale',
	'ally_damage_scale',
	'sp_regen',
	'ally_heal_scale',
	'heal_scale',
	'receive_heal_scale',
	'cost_return',
	'block',
	'hitrate_down',
	'block_no_attack',
	'force',
	'trigger_time',
	'ct',
	'heal_scale_down',
	'ally_def_penetrate',
	'ally_res_penetrate',
	'add_bullet',
	'max_ammo',
	'ally_max_ammo',
	'liftoff',
	'attract',
	'palsy',
	'bonus_lifepoint',
	'enemy_damage_share',
	'sp_module'
];

// keys not here will just use their respective key in translations
const DISPLAY_KEYS_TABLE = {
	MELEE: 'position_melee',
	RANGED: 'position_ranged',
	ALL: 'position_all',
	force: 'force_tag',
	aspd_down: 'attack_speed',
	ally_aspd: 'attack_speed',
	ally_cost_down: 'cost',
	ally_damage_scale: 'damage_scale_buff',
	ally_shield: 'buff_shield',
	shield: 'buff_shield',
	ally_block_dmg: 'block_dmg',
	ally_def_penetrate: 'def_penetrate',
	ally_res_penetrate: 'res_penetrate',
	ally_dmg_res: 'dmg_res',
	ally_undying: 'undying',
	ally_max_hp: 'hp',
	max_hp: 'hp',
	atk_down: 'atk',
	ally_atk: 'atk',
	def_down: 'def',
	ally_def: 'def',
	res_down: 'res',
	ally_res: 'res',
	ms_down: 'ms',
	hitrate_down: 'hitrate',
	ally_block_up: 'block_up',
	ally_block_down: 'block_down',
	ally_respawn_time: 'respawnTime',
	respawn_time: 'respawnTime',
	ally_reflect_dmg: 'reflect_dmg',
	ally_evasion: 'evasion',
	ally_env_dmg_reduce: 'env_dmg_reduce',
	ally_stealth: 'stealth',
	ally_camouflage: 'camouflage',
	ally_taunt: 'taunt',
	ally_lower_target_priority: 'lower_target_priority',
	ally_resist: 'resist',
	ally_heal_scale: 'heal_scale',
	receive_heal_scale: 'heal_scale',
	heal_ally: 'heal_ally_others',
	ally_sp_gain: 'sp_gain',
	ally_sp_regen: 'sp_regen',
	ally_sp_stock: 'sp_stock',
	ally_spareshot: 'spareshot',
	ally_max_ammo: 'max_ammo',
	ally_min_aspd: 'min_aspd',
	status_immune: 'status_immune_text',
	heal_self: 'heal_self_others',
	bonus_flying: 'flying',
	bonus_drone: 'drone',
	bonus_infection: 'infection',
	bonus_sarkaz: 'sarkaz',
	bonus_machine: 'machine',
	bonus_wildanimal: 'wildanimal',
	bonus_seamonster: 'seamonster',
	bonus_blocked: 'blocked',
	bonus_no_block: 'no_block',
	bonus_stun: 'stun',
	bonus_sleep: 'sleep',
	bonus_ranged: 'enemy_ranged',
	bonus_no_attack: 'no_attack',
	type_stun: 'stun',
	type_sluggish: 'sluggish',
	type_sleep: 'sleep',
	type_silence: 'silence',
	type_freeze: 'freeze',
	type_levitate: 'levitate',
	type_root: 'root',
	type_tremble: 'tremble',
	priority_highest_weight: 'highest_weight',
	priority_flying: 'flying',
	priority_drone: 'drone',
	priority_ranged: 'enemy_ranged',
	priority_def_high: 'def_high',
	priority_def_low: 'def_low',
	priority_res_high: 'res_high',
	priority_res_low: 'res_low',
	priority_stun: 'stun',
	priority_sleep: 'sleep',
	dot: 'poison_damage'
};
const ENEMY_KEYS = ['atk_down', 'def_down', 'res_down', 'aspd_down', 'ms_down', 'hitrate_down'];
const ALLY_KEYS = [
	'ally_max_hp',
	'ally_atk',
	'ally_def',
	'ally_res',
	'ally_aspd',
	'ally_respawn_time',
	'ally_cost_down',
	'ally_damage_scale',
	'ally_reflect_dmg',
	'ally_def_penetrate',
	'ally_res_penetrate',
	'ally_arts',
	'ally_block_up',
	'ally_block_down',
	'ally_evasion',
	'ally_shield',
	'ally_block_dmg',
	'ally_dmg_res',
	'ally_undying',
	'ally_env_dmg_reduce',
	'ally_stealth',
	'ally_camouflage',
	'ally_taunt',
	'ally_lower_target_priority',
	'ally_resist',
	'ally_heal_scale',
	'ally_sp_regen',
	'ally_sp_gain',
	'ally_sp_stock'
];
const SELF_KEYS = [
	'max_hp',
	'atk',
	'def',
	'res',
	'aspd',
	'respawn_time',
	'cost_down',
	'reflect_dmg',
	'block_up',
	'block_down',
	'evasion',
	'shield',
	'block_dmg',
	'dmg_res',
	'undying',
	'env_dmg_reduce',
	'stealth',
	'camouflage',
	'taunt',
	'lower_target_priority',
	'resist',
	'heal_scale',
	'sp_regen',
	'sp_gain',
	'sp_stock'
];

const KEYS_TO_CHECK_VALUE_TYPE = [
	'damage_scale',
	'def_penetrate',
	'ally_def_penetrate',
	'ally_res_penertrate',
	'ally_max_hp',
	'ally_atk',
	'ally_def',
	'max_hp',
	'def',
	'res'
];

export const professionWeights = {
	PIONEER: 0,
	WARRIOR: 1,
	SNIPER: 2,
	TANK: 3,
	MEDIC: 4,
	SUPPORT: 5,
	CASTER: 6,
	SPECIAL: 7
};

const getConditionWeights = (key) => {
	switch (key) {
		case 'condition_none':
			return 0;
		case 'enemy_melee':
		case 'target_air':
		case 'flying':
		case 'others':
			return 1;
		case 'stun':
			return 2;
		case 'sleep':
			return 3;
		case 'silence':
			return 4;
		case 'cold':
		case 'freeze':
			return 5;
		case 'levitate':
		case 'root':
		case 'sluggish':
			return 6;
		case 'phys':
			return 7;
		case 'arts':
			return 8;
		case 'true':
			return 9;
		case 'ele_dmg':
			return 10;
		case 'melee_attack':
			return 11;
		case 'ranged_attack':
			return 12;
		case 'PIONEER':
		case 'WARRIOR':
		case 'SNIPER':
		case 'TANK':
		case 'MEDIC':
		case 'SUPPORT':
		case 'CASTER':
		case 'SPECIAL':
			return professionWeights[key] + 13;
		default:
			if (key.includes('hp')) {
				return 99;
			}
			return 98;
	}
};

export const getDisplayKey = (option) => {
	return DISPLAY_KEYS_TABLE?.[option] ?? option;
};

//used in secFilters, sortOptions
export const getOptionTranslation = (option, language: Language) => {
	let symbol = '';
	let suffix = '';

	if (ALLY_KEYS.includes(option)) {
		symbol = 'ally_abbr';
	} else if (ENEMY_KEYS.includes(option)) {
		symbol = 'enemy_abbr';
		if (option.includes('down')) {
			suffix = 'debuff';
		}
	} else if (SELF_KEYS.includes(option)) {
		symbol = 'self_abbr';
	}
	option = getDisplayKey(option);
	return (
		(translations[language].table_headers[option] ??
			translations[language][option] ??
			translations[language].types[option]) +
		(suffix ? getSpacing(language) + `${translations[language][suffix]}` : '') +
		(symbol ? getSpacing(language) + `(${translations[language][symbol]})` : '')
	);
};
export const getSpacing = (language: Language) => {
	if (language === 'en') {
		return ' ';
	}
	return '';
};

export const targetValueCheck = (targets, selectedOptions) => {
	return selectedOptions.some((val) => {
		switch (val) {
			case 'single_target':
				return targets === 1;
			case 'few_target':
				return targets > 1 && targets < 99;
			default:
				return targets >= 99;
		}
	});
};

export const convertStatKeys = {
	hp: 'hp',
	maxHp: 'hp',
	max_hp: 'hp',
	magicResistance: 'res',
	attackSpeed: 'aspd',
	attack_speed: 'aspd',
	moveSpeed: 'ms',
	respawnTime: 'respawnTime',
	block_cnt: 'blockCnt',
	blockCnt: 'blockCnt',
	atk: 'atk',
	def: 'def',
	cost: 'cost'
};

export function isSubset(arr1, arr2) {
	const set1 = new Set(arr1);
	const set2 = new Set(arr2);

	for (const elem of set1) {
		if (!set2.has(elem)) {
			return false;
		}
	}

	return true;
}

function someCheck(itemArr, selectedOptions) {
	let noneCheck = false;
	if (selectedOptions.includes('condition_none')) {
		noneCheck = !Boolean(itemArr);
	}
	let othersCheck = false;
	if (selectedOptions.includes('others')) {
		othersCheck = !Boolean(itemArr);
	}
	selectedOptions = selectedOptions.filter((val) => !['condition_none', 'others'].includes(val));
	const list = itemArr ?? [];
	return othersCheck || noneCheck || list.some((val) => selectedOptions.includes(val));
}

const revertStatKey = (statKey) => {
	switch (statKey) {
		case 'hp':
			return 'max_hp';
		case 'aspd':
			return 'attack_speed';
		case 'blockCnt':
			return 'block_cnt';
		case 'res':
			return 'magic_resistance';
		default:
			return statKey;
	}
};

const getAllValues = (char, key, subKey, functions) => {
	const defaultValue = getDefaultValue(subKey);
	if (!functions) functions = [() => true];
	const values = [];
	char.blackboard.forEach((ele) => {
		if (ele.key === key && functions.every((fn) => fn(ele, char.tags))) {
			values.push(ele[subKey] ?? defaultValue);
		}
	});
	char.tokens.forEach((token) => {
		token.blackboard.forEach((ele) => {
			if (ele.key === key && functions.every((fn) => fn(ele, token.tags))) {
				values.push(ele[subKey] ?? defaultValue);
			}
		});
	});
	char.skills.forEach((skill) => {
		skill.blackboard.forEach((ele) => {
			if (ele.key === key && functions.every((fn) => fn(ele, skill.tags))) {
				values.push(ele[subKey] ?? defaultValue);
			}
		});
	});
	char.talents.forEach((talent) => {
		talent.blackboard.forEach((ele) => {
			if (ele.key === key && functions.every((fn) => fn(ele, talent.tags))) {
				values.push(ele[subKey] ?? defaultValue);
			}
		});
	});
	char.uniequip
		.filter((equip) => equip.combatData)
		.forEach((equip) => {
			equip.combatData.blackboard.forEach((ele) => {
				if (ele.key === key && functions.every((fn) => fn(ele, equip.combatData.tags))) {
					values.push(ele[subKey] ?? defaultValue);
				}
			});
		});
	return values;
};

//goes through talent and skills blackboard and gets maximum value of key
//startValue changed to -1 because of force level...
export const getMaxValue = (char, key, subKey, functions) => {
	const defaultValue = getDefaultValue(subKey);
	const startValue = -1;
	if (!functions) functions = [() => true];
	return Math.max(
		char.blackboard.reduce((acc, curr) => {
			let value = startValue;
			if (curr.key === key && functions.every((fn) => fn(curr, char.tags))) {
				const val = curr[subKey] ?? defaultValue;
				if (val > value) value = val;
			}
			return (acc = Math.max(acc, value));
		}, startValue),
		char.tokens.reduce((acc, curr) => {
			let value = startValue;
			curr.blackboard.forEach((ele) => {
				if (ele.key === key && functions.every((fn) => fn(ele, curr.tags))) {
					const val = ele[subKey] ?? defaultValue;
					if (val > value) value = val;
				}
			});
			return (acc = Math.max(acc, value));
		}, startValue),
		char.skills.reduce((acc, curr) => {
			let value = startValue;
			curr.blackboard.forEach((ele) => {
				if (ele.key === key && functions.every((fn) => fn(ele, curr.tags))) {
					const val = ele[subKey] ?? defaultValue;
					if (val > value) value = val;
				}
			});
			return (acc = Math.max(acc, value));
		}, startValue),
		char.talents.reduce((acc, curr) => {
			let value = startValue;
			curr.blackboard.forEach((ele) => {
				if (ele.key === key && functions.every((fn) => fn(ele, curr.tags))) {
					const val = ele[subKey] ?? defaultValue;
					if (val > value) value = val;
				}
			});
			return (acc = Math.max(acc, value));
		}, startValue),
		char.uniequip
			.filter((equip) => equip.combatData)
			.reduce((acc, curr) => {
				let value = startValue;
				curr.combatData.blackboard.forEach((ele) => {
					if (ele.key === key && functions.every((fn) => fn(ele, curr.combatData.tags))) {
						const val = ele[subKey] ?? defaultValue;
						if (val > value) value = val;
					}
				});
				return (acc = Math.max(acc, value));
			}, startValue),
		key === 'force' ? -1 : 0
	);
};
export const getDefaultValue = (key) => {
	switch (key) {
		case 'duration':
			return 999;
		case 'prob':
			return 1;
		default:
			return 0;
	}
};

export const updateSortPriority = (sortOptions, index) => {
	const valueToRemove = sortOptions[index].priority;

	return sortOptions.map((ele, i) => {
		if (i === index) {
			ele.priority = null;
		}
		if (ele.priority && ele.priority > valueToRemove) {
			ele.priority -= 1;
		}
		return ele;
	});
};

export const getCharaList = async (language) => {
	const data = await decompressGzipToJson(`/data/characters_${language}.gz`);
	data.forEach((char, index) => {
		char.activeModuleIndex = 0;
		char.activeTalents = [];
		char.activeSkills = [];
		char.activeTokens = [];
	});
	return data;
};

export const getSkillImgUrl = (skillId) => {
	switch (skillId) {
		case 'skchr_svrash_1':
		case 'skchr_huang_1':
		case 'skchr_lessng_1':
		case 'skchr_snhunt_1':
			return 'skcom_powerstrike[3]';
		case 'skchr_vigna_1':
		case 'skchr_jesica_1':
		case 'skchr_caper_1':
		case 'skchr_doberm_1':
		case 'skchr_bryota_1':
		case 'skchr_savage_1':
		case 'skchr_luton_1':
			return 'skcom_powerstrike[2]';
		case 'skchr_stward_1':
			return 'skcom_powerstrike[1]';
		case 'skchr_midn_1':
			return 'skcom_enchant[1]';
		case 'skchr_catap_1':
			return 'skcom_blowrange_up[1]';
		case 'sktok_gunctrl':
			return 'skcom_withdraw';
		default:
			return skillId;
	}
};

const getModuleRelatedTalentIndex = (char, equipIndex) => {
	for (const part of char.uniequip[equipIndex].combatData.phases[2].parts) {
		if (!part.isToken && part.target.includes('TALENT') && part.upgradeDesc)
			return part.talentIndex;
	}
};

export const getModuleNewTalent = (module, stage: number) => {
	if (!module?.combatData) return;
	for (const part of module.combatData.phases[stage].parts) {
		if (!part.isToken && part.target.includes('TALENT') && part.talentIndex === -1 && part.name) {
			return {
				name: part.name,
				desc: part.upgradeDesc
			};
		}
	}
};

export const getModuleTrait = (trait, module, stage: number) => {
	if (!module?.combatData) return trait;
	for (const part of module.combatData.phases[stage].parts) {
		if (!part.isToken && (part.target.includes('TRAIT') || part.target === 'DISPLAY')) {
			if (part.addDesc) return trait + '\n' + part.addDesc;
			if (part.overrideDesc) return part.overrideDesc;
		}
	}
	return trait;
};
export const getModuleTalentDesc = (idx, module, stage: number) => {
	if (!module?.combatData) return;
	for (const part of module.combatData.phases[stage].parts) {
		if (
			!part.isToken &&
			part.target.includes('TALENT') &&
			part.talentIndex === idx &&
			part.upgradeDesc
		)
			return part.upgradeDesc;
	}
};
export const getTokenModuleTrait = (trait, module, stage: number) => {
	if (!module?.combatData) return trait;
	for (const part of module.combatData.phases[stage].parts) {
		if (part.isToken && (part.target.includes('TRAIT') || part.target === 'DISPLAY')) {
			if (part.addDesc) return trait + '\n' + part.addDesc;
			if (part.overrideDesc) return part.overrideDesc;
		}
	}
	return trait;
};
export const getTokenModuleTalent = (idx, module, stage: number) => {
	if (!module?.combatData) return;
	for (const part of module.combatData.phases[stage].parts) {
		if (
			part.isToken &&
			part.target.includes('TALENT') &&
			part.talentIndex === idx &&
			part.upgradeDesc
		)
			return part.upgradeDesc;
	}
};
export const getModuleUpdatedRange = (rangeId, module, stage, talentIndex = -1) => {
	if (!module?.combatData) return rangeId;
	for (const part of module.combatData.phases[stage].parts) {
		if (
			!part.isToken &&
			part.target.includes('TALENT') &&
			part.talentIndex === talentIndex &&
			part.rangeId
		)
			return part.rangeId;
	}
	return rangeId;
};
export const getSkillRangeId = (skill, char, moduleIndex, moduleStage) => {
	if (skill.levels?.[0]?.rangeId?.includes('get_talent')) {
		const splitStr = skill.levels?.[0]?.rangeId.split('_');
		const index = parseInt(splitStr[splitStr.length - 1]) - 1;
		const talentRangeId = char.talents[index].rangeId;
		return getModuleUpdatedRange(talentRangeId, char.uniequip[moduleIndex], moduleStage, index);
	}
	return null;
};
export const getAttackRangeId = (char, moduleIndex, moduleStage) => {
	let rangeId = char.stats.rangeId;
	for (const talent of char.talents) {
		if (talent.tags.includes('override_range')) {
			rangeId = talent.rangeId;
		}
	}
	return getModuleUpdatedRange(rangeId, char.uniequip[moduleIndex], moduleStage);
};
export const getFullCharStat = (statKey, char, moduleStat, potStat) => {
	let stat = char['stats'][statKey];
	if (statKey === 'aspd') {
		return (
			Math.round(
				(stat / ((100 + (char?.favorData?.[statKey] ?? 0) + moduleStat + potStat) / 100)) * 100
			) / 100
		);
	} else {
		stat += char?.favorData?.[statKey] ?? 0;
		stat += moduleStat;
		stat += potStat;
	}
	return stat;
};
export const getModuleStat = (statKey, attributeBlackboard) => {
	if (attributeBlackboard) {
		for (const item of attributeBlackboard) {
			const key = revertStatKey(statKey);
			if (item.key === key) {
				return item.value;
			}
		}
	}
	return 0;
};

export const getTotalPotStat = (statKey, potential) => {
	let value = 0;
	for (const pot of potential) {
		if (pot.attribute?.[statKey]) {
			value += pot.attribute[statKey];
		}
	}
	return value;
};

export const getTokenPosition = (token, uniequip) => {
	switch (uniequip?.typeIcon) {
		case 'trp-d':
			return 'all';
		default:
			return token.position.toLowerCase();
	}
};

export const getPrioritySortValues = (char, sortOptions, secFilters) => {
	const priorityOption = sortOptions.find((ele) => ele.priority === 1);
	if (!priorityOption) {
		return 0;
	}
	const { key, subKey, order } = priorityOption;
	const values = getAllValues(char, key, subKey ?? 'value', secFilters[key]);
	const uniqueValues = [...new Set(values)];
	uniqueValues.sort((a, b) => (a - b) * order);
	return uniqueValues
		.map((value) => {
			if (['sp_module'].includes(key)) return;
			if (!value && !['force'].includes(key)) return;
			if (value === 999) return '-';
			if (
				['duration'].includes(subKey) ||
				[
					'stun',
					'sluggish',
					'sleep',
					'silence',
					'cold',
					'levitate',
					'root',
					'tremble',
					'fear',
					'attract',
					'palsy',
					'ally_sp_regen',
					'shield',
					'ally_shield',
					'sp_regen',
					'force',
					'max_target',
					'ct',
					'bonus_lifepoint'
				].includes(key)
			) {
				return value.toString();
			}
			if (['damage_scale', 'ally_damage_scale', 'ally_heal_scale'].includes(key) && value < 4.9) {
				return `${Math.round((value - 1) * 100)}%`;
			}
			if (['ally_sp_gain', 'sp_gain', 'ally_max_ammo', 'max_ammo', 'add_bullet'].includes(key)) {
				return value < 1 ? `${Math.round(value * 100)}%` : value;
			}
			if (['ally_atk', 'ally_def', 'ally_res', 'def', 'res'].includes(key)) {
				return value < 4.9 ? `${Math.round(value * 100)}%` : value;
			}
			if (value < 0) {
				if (value > -1.01) {
					return `${Math.round(value * 100)}%`;
				}
				return value;
			}
			if (value < 1.01) {
				return `${Math.round(value * 100)}%`;
			}
			return value;
		})
		.filter(key === 'force' ? () => true : Boolean);
};

export const addOptionsToAcc = (acc, options) => {
	const blackboardIndex = acc.findIndex((ele) => ele.key === 'blackboard');
	const tagsIndex = acc.findIndex((ele) => ele.key === 'tags');
	const blackboardOptions = options
		.filter((value) => SEARCH_IN_BLACKBOARD.includes(value))
		.map((value) => {
			return { value, selected: false };
		});
	const tagOptions = options
		.filter((value) => SEARCH_IN_TAGS.includes(value))
		.map((value) => {
			return { value, selected: false };
		});
	if (blackboardIndex === -1) {
		acc.push({
			key: 'blackboard',
			options: blackboardOptions
		});
	} else {
		acc[blackboardIndex].options = [...acc[blackboardIndex].options, ...blackboardOptions];
	}
	if (tagsIndex === -1) {
		acc.push({
			key: 'tags',
			options: tagOptions
		});
	} else {
		acc[tagsIndex].options = [...acc[tagsIndex].options, ...tagOptions];
	}
};

export const getCategory = (value) => {
	return SEARCH_IN_BLACKBOARD.includes(value) ? 'blackboard' : 'tags';
};

export const getSelectedFilterOptions = (categories, filtersStore) => {
	return categories.reduce((acc, { optionKey }) => {
		for (const value of filterOptions[optionKey]) {
			const category = getCategory(value);
			const selected = filtersStore
				.find((ele) => ele.key === category)
				.options.find((ele) => ele.value === value)?.selected;
			if (selected) {
				acc.push(value);
			}
		}
		return acc;
	}, []);
};

export const updateFilters = (key, value, store) => {
	store.update((list) => {
		const catIndex = list.findIndex((ele) => ele.key === key);
		const optionIndex = list[catIndex].options.findIndex((ele) => ele.value === value);
		list[catIndex].options[optionIndex].selected = !list[catIndex].options[optionIndex].selected;
		return list;
	});
};
export const createNormalFilterFunction = (list, secFilters, filterMode) => {
	if (list.length === 0) {
		return (char) => {
			char.activeModuleIndex = 0;
			char.activeTalents = [];
			char.activeSkills = [];
			char.activeTokens = [];
			return true;
		};
	}
	const blockCntSubFilters = secFilters
		.filter(({ key }) => key === 'blockCnt')
		.reduce((acc, curr) => {
			const { list } = curr;
			for (const { options } of list) {
				acc = options?.map((option) => option.selected && option.value).filter(Boolean);
			}
			return acc;
		}, []);
	const secFiltersFunctions = list
		.filter((val) => ['blackboard', 'spType'].includes(val.type))
		.reduce((acc, { key }) => {
			if (key === 'spType') {
				const spTypeSecFilters = secFilters
					.filter((val) =>
						[
							'PASSIVE',
							'INCREASE_WHEN_ATTACK',
							'INCREASE_WHEN_TAKEN_DAMAGE',
							'INCREASE_WITH_TIME'
						].includes(val.key)
					)
					.reduce((acc, { key, list }) => {
						const functions = createSecFilterFunction(list);
						acc[key] = functions;
						return acc;
					}, {});
				acc[key] = spTypeSecFilters;
				return acc;
			}
			const secFilter = secFilters.find((item) => item.key === key);
			if (secFilter) {
				const functions = createSecFilterFunction(secFilter.list);
				acc[key] = functions;
			} else {
				acc[key] = [() => true];
			}
			return acc;
		}, {});
	return (char) => {
		const initialRemainder = [];
		let equipIndex = -1;
		char.activeModuleIndex = 0;

		list.forEach((searchItem) => {
			const { key, type } = searchItem;
			if (key === 'deployable_tile') {
				if (
					!searchItem.options.some(
						(val) => char.position === val || char.tags.includes('position_all')
					)
				) {
					let equipIndex = char.uniequip
						.filter((equip) => equip.combatData)
						.findIndex((equip) => equip.combatData.tags.includes('position_all'));
					char.activeModuleIndex = equipIndex + 1;
					equipIndex === -1 && initialRemainder.push(searchItem);
				}
			} else if (type === 'spType') {
				const { options } = searchItem;
				let found = false;
				// PASSIVE is in skillType, while the rest are in spType
				char.skills.forEach((skill, i) => {
					if (
						(options.includes(skill.spType) || options.includes(skill.skillType)) &&
						options.every((option) =>
							secFiltersFunctions[type][option].every((fn) => fn(skill, skill.tags))
						)
					) {
						char.activeSkills.push(i);
						found = true;
					}
				});
				if (!found) {
					initialRemainder.push(searchItem);
				}
			} else if (type === 'tags') {
				let found = false;
				if (char.tags.includes(key)) {
					found = true;
				}
				char.skills.forEach((skill, i) => {
					if (skill.tags.includes(key)) {
						found = true;
						char.activeSkills.push(i);
					}
				});
				char.talents.forEach((talent, i) => {
					if (talent.tags.includes(key)) {
						found = true;
						char.activeTalents.push(i);
					}
				});
				char.tokens.forEach((token, i) => {
					if (token.tags.includes(key)) {
						found = true;
						char.activeTokens.push(i);
					}
				});
				if (!found) {
					equipIndex = char.uniequip
						.filter((equip) => equip.combatData)
						.findIndex((equip) => equip.combatData.tags.includes(key));
					if (equipIndex !== -1) {
						char.activeModuleIndex = equipIndex + 1;
						const moduleTalent = getModuleRelatedTalentIndex(char, equipIndex + 1);
						char.activeTalents.push(moduleTalent);
					} else initialRemainder.push(searchItem);
				}
			} else if (type === 'blackboard') {
				let found = false;
				if (
					char.blackboard.some(
						(item) =>
							item.key === key && secFiltersFunctions?.[key]?.every((fn) => fn(item, char.tags))
					)
				) {
					found = true;
				}
				char.skills.forEach((skill, i) => {
					if (
						skill.blackboard.some(
							(item) =>
								item.key === key && secFiltersFunctions?.[key]?.every((fn) => fn(item, skill.tags))
						)
					) {
						found = true;
						char.activeSkills.push(i);
					}
				});
				char.talents.forEach((talent, i) => {
					if (
						talent.blackboard.some(
							(item) =>
								item.key === key && secFiltersFunctions?.[key]?.every((fn) => fn(item, talent.tags))
						)
					) {
						found = true;
						char.activeTalents.push(i);
					}
				});
				char.tokens.forEach((token, i) => {
					if (
						token.blackboard.some(
							(item) =>
								item.key === key && secFiltersFunctions?.[key]?.every((fn) => fn(item, token.tags))
						)
					) {
						found = true;
						char.activeTokens.push(i);
					}
				});
				if (!found) {
					equipIndex = char.uniequip
						.filter((equip) => equip.combatData)
						.findIndex((equip) =>
							equip.combatData.blackboard.some(
								(item) =>
									item.key === key &&
									secFiltersFunctions?.[key]?.every((fn) => fn(item, equip.combatData.tags))
							)
						);
					if (equipIndex !== -1) {
						char.activeModuleIndex = equipIndex + 1;
						const moduleTalent = getModuleRelatedTalentIndex(char, equipIndex + 1);
						char.activeTalents.push(moduleTalent);
					} else initialRemainder.push(searchItem);
				}
			} else if (type === 'blockCnt') {
				const { options } = searchItem;
				if (blockCntSubFilters.includes('skill_active')) {
					const skill = char.skills?.find((skill) =>
						skill.blackboard.some((item) => item.key === 'blockCnt' && options.includes(item.value))
					);
					if (skill) {
						const skillIndex = char.skills.findIndex((ele) => ele.name === skill.name);
						char.activeSkills.push(skillIndex);
						const option = skill.blackboard.find(
							(item) => item.key === 'blockCnt' && options.includes(item.value)
						);
						if (option.module) {
							equipIndex = char.uniequip
								.filter((equip) => equip.combatData)
								.findIndex((equip) => equip.typeIcon === option.module);
							char.activeModuleIndex = equipIndex + 1;
						}
					} else {
						initialRemainder.push(searchItem);
					}
				} else if (blockCntSubFilters.includes('normal_state')) {
					let found = false;
					if (options.includes(char.stats.blockCnt)) {
						found = true;
					}
					char.tokens.forEach((token, i) => {
						if (
							options.includes(token.stats.blockCnt) ||
							token.blackboard.some(
								(item) => item.key === 'blockCnt' && options.includes(item.value)
							)
						) {
							found = true;
							char.activeTokens.push(i);
						}
					});
					if (!found) {
						equipIndex = char.uniequip
							.filter((equip) => equip.combatData)
							.findIndex((equip) =>
								equip.combatData.blackboard.some(
									(item) => item.key === 'blockCnt' && options.includes(item.value)
								)
							);
						if (equipIndex === -1) {
							initialRemainder.push(searchItem);
						} else {
							char.activeModuleIndex = equipIndex + 1;
						}
					}
				} else {
					let found = false;
					if (options.includes(char.stats.blockCnt)) {
						found = true;
					}
					char.tokens.forEach((token, i) => {
						if (
							options.includes(token.stats.blockCnt) ||
							token.blackboard.some(
								(item) => item.key === 'blockCnt' && options.includes(item.value)
							)
						) {
							found = true;
							char.activeTokens.push(i);
						}
					});
					char.skills.forEach((skill, i) => {
						if (
							skill.blackboard.some(
								(item) => item.key === 'blockCnt' && options.includes(item.value)
							)
						) {
							found = true;
							char.activeSkills.push(i);
						}
					});
					if (!found) {
						equipIndex = char.uniequip
							.filter((equip) => equip.combatData)
							.findIndex((equip) =>
								equip.combatData.blackboard.some(
									(item) => item.key === 'blockCnt' && options.includes(item.value)
								)
							);
						if (equipIndex === -1) {
							initialRemainder.push(searchItem);
						} else {
							char.activeModuleIndex = equipIndex + 1;
						}
					}
				}
			} else {
				initialRemainder.push(searchItem);
			}
		});
		return filterMode === 'OR'
			? initialRemainder.length !== list.length
			: initialRemainder.length === 0;
	};
};

//for tags/blackboard, either talent + skill or skill must fulfill all conditions
export const createStrictFilterFunction = (list, secFilters) => {
	if (list.length === 0) {
		return (char) => {
			char.activeModuleIndex = 0;
			char.activeTalents = [];
			char.activeSkills = [];
			char.activeTokens = [];
			return true;
		};
	}
	const blockCntSubFilters = secFilters
		.filter(({ key }) => key === 'blockCnt')
		.reduce((acc, curr) => {
			const { list } = curr;
			for (const { options } of list) {
				acc = options?.map((option) => option.selected && option.value).filter(Boolean);
			}
			return acc;
		}, []);
	const secFiltersFunctions = list
		.filter((val) => ['blackboard', 'spType'].includes(val.type))
		.reduce((acc, { key }) => {
			if (key === 'spType') {
				const spTypeSecFilters = secFilters
					.filter((val) =>
						[
							'PASSIVE',
							'INCREASE_WHEN_ATTACK',
							'INCREASE_WHEN_TAKEN_DAMAGE',
							'INCREASE_WITH_TIME'
						].includes(val.key)
					)
					.reduce((acc, { key, list }) => {
						const functions = createSecFilterFunction(list);
						acc[key] = functions;
						return acc;
					}, {});
				acc[key] = spTypeSecFilters;
				return acc;
			}
			const secFilter = secFilters.find((item) => item.key === key);
			if (secFilter) {
				const functions = createSecFilterFunction(secFilter.list);
				acc[key] = functions;
			} else {
				acc[key] = [() => true];
			}
			return acc;
		}, {});
	return (char) => {
		const initialRemainder = [];
		const skillRemainder = [];
		const finalRemainder = [];
		let equipIndex = -1;
		char.activeModuleIndex = 0;
		list.forEach((searchItem) => {
			const { key, type } = searchItem;
			if (key === 'deployable_tile') {
				if (
					!searchItem.options.some(
						(val) => char.position === val || char.tags.includes('position_all')
					)
				) {
					let equipIndex = char.uniequip
						.filter((equip) => equip.combatData)
						.findIndex((equip) => equip.combatData.tags.includes('position_all'));
					char.activeModuleIndex = equipIndex + 1;
					equipIndex === -1 && initialRemainder.push(searchItem);
				}
			} else if (type === 'tags') {
				let found = false;
				if (char.tags.includes(key)) {
					found = true;
				}
				char.talents.forEach((talent, i) => {
					if (talent.tags.includes(key)) {
						found = true;
						char.activeTalents.push(i);
					}
				});
				char.tokens.forEach((token, i) => {
					if (token.tags.includes(key)) {
						found = true;
						char.activeTokens.push(i);
					}
				});
				if (!found) {
					initialRemainder.push(searchItem);
				}
			} else if (type === 'blackboard') {
				let found = false;
				if (
					char.blackboard.some(
						(item) =>
							item.key === key && secFiltersFunctions?.[key]?.every((fn) => fn(item, char.tags))
					)
				) {
					found = true;
				}
				char.talents.forEach((talent, i) => {
					if (
						talent.blackboard.some(
							(item) =>
								item.key === key && secFiltersFunctions?.[key]?.every((fn) => fn(item, talent.tags))
						)
					) {
						found = true;
						char.activeTalents.push(i);
					}
				});
				char.tokens.forEach((token, i) => {
					if (
						token.blackboard.some(
							(item) =>
								item.key === key && secFiltersFunctions?.[key]?.every((fn) => fn(item, token.tags))
						)
					) {
						found = true;
						char.activeTokens.push(i);
					}
				});
				if (!found) {
					initialRemainder.push(searchItem);
				}
			} else if (type === 'blockCnt') {
				const options = searchItem.options.filter((val) => val !== 0);
				if (blockCntSubFilters.includes('skill_active')) {
					initialRemainder.push(searchItem);
				} else if (blockCntSubFilters.includes('normal_state')) {
					if (
						!(
							options.includes(char.stats.blockCnt) ||
							char.tokens?.some(
								(token) =>
									options.includes(token.stats.blockCnt) ||
									token.blackboard.some(
										(item) => item.key === 'blockCnt' && options.includes(item.value)
									)
							)
						)
					) {
						equipIndex = char.uniequip
							.filter((equip) => equip.combatData)
							.findIndex((equip) =>
								equip.combatData.blackboard.some(
									(item) => item.key === 'blockCnt' && options.includes(item.value)
								)
							);
						if (equipIndex === -1) {
							initialRemainder.push(searchItem);
						} else {
							char.activeModuleIndex = equipIndex + 1;
						}
					}
				} else if (
					char.tokens?.some((token, i) => {
						if (
							options.includes(token.stats.blockCnt) ||
							token.blackboard.some(
								(item) => item.key === 'blockCnt' && options.includes(item.value)
							)
						) {
							char.activeTokens.push(i);
							return true;
						}
					})
				) {
				} else {
					initialRemainder.push(searchItem);
				}
			} else {
				initialRemainder.push(searchItem);
			}
		});

		if (initialRemainder.length === 0) {
			return true;
		}
		char.skills.forEach((skill, i) => {
			const remainder = [];
			initialRemainder.forEach((searchItem) => {
				const { key, type } = searchItem;
				if (type === 'tags') {
					if (skill.tags.includes(key)) {
						char.activeSkills.push(i);
					} else {
						remainder.push(searchItem);
					}
				} else if (type === 'blackboard') {
					if (
						skill.blackboard.some(
							(item) =>
								item.key === key && secFiltersFunctions?.[key]?.every((fn) => fn(item, skill.tags))
						)
					) {
						char.activeSkills.push(i);
					} else {
						remainder.push(searchItem);
					}
				} else if (type === 'spType') {
					const { options } = searchItem;
					// PASSIVE is in skillType, while the rest are in spType
					if (
						(options.includes(skill.spType) || options.includes(skill.skillType)) &&
						options.every((option) =>
							secFiltersFunctions[type][option].every((fn) => fn(skill, skill.tags))
						)
					) {
						char.activeSkills.push(i);
					} else {
						remainder.push(searchItem);
					}
				} else if (type === 'blockCnt') {
					const { options } = searchItem;
					if (blockCntSubFilters.includes('normal_state')) {
						remainder.push(searchItem);
					} else if (blockCntSubFilters.includes('skill_active')) {
						const item = skill.blackboard.find(
							(item) => item.key === key && options.includes(item.value)
						);
						if (item) {
							char.activeSkills.push(i);
						}
						if (!item) {
							remainder.push(searchItem);
						} else if (item.module) {
							equipIndex = char.uniequip
								.filter((equip) => equip.combatData)
								.findIndex((equip) => equip.typeIcon === item.module);
							char.activeModuleIndex = equipIndex + 1;
						}
					} else {
						const statPass =
							options.includes(char.stats.blockCnt) &&
							!skill.blackboard.find((item) => item.key === key);
						const skillPass =
							!options.includes(char.stats.blockCnt) &&
							skill.blackboard.find((item) => item.key === key && options.includes(item.value));
						if (!statPass) {
							if (skillPass) {
								char.activeSkills.push(i);
								const item = skill.blackboard.find(
									(item) => item.key === key && options.includes(item.value)
								);
								if (item.module) {
									equipIndex = char.uniequip
										.filter((equip) => equip.combatData)
										.findIndex((equip) => equip.typeIcon === item.module);
									char.activeModuleIndex = equipIndex + 1;
								}
							} else {
								remainder.push(searchItem);
							}
						}
					}
				} else {
					remainder.push(searchItem);
				}
			});
			skillRemainder.push(remainder);
		});
		if (skillRemainder.some((list) => list.length === 0)) {
			return true;
		}
		for (const remainder of skillRemainder) {
			const temp = [];
			remainder.forEach((searchItem) => {
				if (searchItem.type === 'blockCnt' && !searchItem.options.includes(char.stats.blockCnt)) {
					temp.push(searchItem);
				} else {
					temp.push(searchItem);
				}
			});
			finalRemainder.push(temp);
		}
		const equipList = char.uniequip.filter((equip) => equip.combatData);
		if (equipList.length === 0) {
			return finalRemainder.some((list) => list.length === 0);
		}
		for (const remainder of finalRemainder) {
			equipIndex = equipList.findIndex((equip) =>
				remainder.every((searchItem) => {
					const { key, type } = searchItem;
					if (type === 'tags') {
						return equip.combatData.tags.includes(key);
					} else if (type === 'blackboard') {
						return equip.combatData.blackboard.some(
							(item) =>
								item.key === key &&
								secFiltersFunctions?.[key]?.every((fn) => fn(item, equip.combatData.tags))
						);
					} else if (type === 'blockCnt') {
						const { options } = searchItem;
						if (blockCntSubFilters.includes('skill_active')) {
							return false;
						}
						return equip.combatData.blackboard.some(
							(item) => item.key === key && options.includes(item.value)
						);
					}
				})
			);
			if (equipIndex !== -1) {
				char.activeModuleIndex = equipIndex + 1;
				if (
					!finalRemainder.some(
						(remainder) => remainder.length === 1 && remainder[0].key === 'blockCnt'
					)
				) {
					const moduleTalent = getModuleRelatedTalentIndex(char, equipIndex + 1);
					char.activeTalents.push(moduleTalent);
				}
				return true;
			}
		}
		return equipIndex !== -1;
	};
};

export const adjustSortPriority = (list) => {
	const adjustedPriorities = list
		.filter((ele) => ele.priority)
		.sort((a, b) => a.priority - b.priority)
		.reduce((acc, { key }, i) => {
			acc[key] = i + 1;
			return acc;
		}, {});
	return list.map(({ key, subKey, suffix, order, priority }) => {
		return { key, subKey, suffix, order, priority: priority ? adjustedPriorities[key] : null };
	});
};

export const getSortOptions = (key) => {
	const list = [];
	switch (true) {
		case [
			'stun',
			'sluggish',
			'sleep',
			'silence',
			'cold',
			'levitate',
			'root',
			'tremble',
			'fear',
			'attract',
			'cancel_stealth',
			'camouflage',
			'taunt',
			'ally_undying',
			'undying'
		].includes(key):
			list.push({ key, subKey: 'value', suffix: 'duration', order: -1, priority: -1 });
			break;
		case [
			'damage_scale',
			'ally_dmg_res',
			'ally_def_penetrate',
			'ally_res_penetrate',
			'dmg_res',
			'ally_max_hp',
			'ally_atk',
			'ally_def',
			'ally_res',
			'ally_aspd',
			'atk_down',
			'def_down',
			'res_down',
			'aspd_down',
			'ms_down',
			'hitrate_down'
		].includes(key):
			list.push({ key, subKey: 'value', suffix: null, order: -1, priority: -1 });
			list.push({ key, subKey: 'duration', suffix: 'duration', order: 0, priority: null });
			break;
		case ['evasion', 'ally_evasion', 'block_dmg'].includes(key):
			list.push({ key, subKey: 'value', suffix: 'prob', order: -1, priority: -1 });
			list.push({ key, subKey: 'duration', suffix: 'duration', order: 0, priority: null });
			break;
		case key === 'force':
			list.push({
				key,
				subKey: 'value',
				displayKey: getDisplayKey(key),
				suffix: 'force',
				order: -1,
				priority: -1
			});
			break;
		case [
			'blockCnt',
			'ally_block_up',
			'ally_block_down',
			'ally_undying',
			'ally_taunt',
			'ally_camouflage',
			'ally_reflect_dmg',
			'tremble',
			'fear',
			'ally_cost_down',
			'ally_block_dmg',
			'sp_module'
		].includes(key):
			break;
		default:
			list.push({
				key,
				subKey: 'value',
				displayKey: getDisplayKey(key),
				suffix: null,
				order: -1,
				priority: -1
			});
			break;
	}

	return list;
};
export const compareValueType = (selectedOptions, value) => {
	return selectedOptions.some((val) => {
		switch (val) {
			case 'value_fixed':
				return value > 4.9;
			default:
				return value <= 4.9;
		}
	});
};
export const getSecFilterOptions = (key, store) => {
	let storeVal;
	store.subscribe((val) => (storeVal = val));
	const optionsList = Object.entries(storeVal?.[key] ?? {}).filter(
		([_, options]) => options.length > 0
	);
	if (KEYS_TO_CHECK_VALUE_TYPE.includes(key)) {
		optionsList.push(['value_type', ['value_fixed', 'value_percent']]);
	}
	const returnArr = optionsList.map(([subKey, options]) => {
		if (subKey === 'conditions' && !options.includes('condition_none')) {
			options.push('condition_none');
		}
		if (subKey === 'targets') {
			return {
				subKey: subKey,
				displayKey: getSecFilterDisplayKey(key, subKey),
				options: ['single_target', 'few_target', 'aoe'],
				type: 'options'
			};
		}
		return {
			subKey: subKey,
			displayKey: getSecFilterDisplayKey(key, subKey),
			options: options.sort((a, b) => getConditionWeights(a) - getConditionWeights(b)),
			type: 'options'
		};
	});
	switch (key) {
		case 'force':
			returnArr.push({
				subKey: 'tags',
				displayKey: 'category',
				options: ['push', 'pull'],
				type: 'options'
			});
			break;
		case 'INCREASE_WITH_TIME':
		case 'INCREASE_WHEN_ATTACK':
		case 'INCREASE_WHEN_TAKEN_DAMAGE':
			returnArr.push({
				subKey: 'spType',
				suffix: 'skillInitToUsageSP',
				sign: 'lte',
				value: -1,
				type: 'compare'
			});
			break;
		case 'stun':
		case 'sluggish':
		case 'sleep':
		case 'silence':
		case 'cold':
		case 'levitate':
		case 'root':
			returnArr.push({
				subKey: 'value',
				suffix: 'duration',
				sign: 'gte',
				value: 0,
				type: 'compare'
			});
			break;
	}
	return returnArr;
};

const getSecFilterDisplayKey = (key, subKey) => {
	switch (subKey) {
		case 'order':
			return 'calc_order';
		case 'types':
			return 'damage_type';
		case 'value':
			switch (key) {
				case 'stun':
				case 'sluggish':
				case 'sleep':
				case 'silence':
				case 'cold':
				case 'levitate':
				case 'root':
					return 'duration';
				default:
					return;
			}
		default:
			return subKey;
	}
};

export const createSecFilterFunction = (list) => {
	const functions = [];
	for (const { subKey, type, options, sign, value } of list) {
		let fn = () => true;
		if (type === 'compare') {
			switch (subKey) {
				case 'spType':
					if (value < 0) continue;
					fn = (skill) => {
						const { initSp, spCost } = skill.levels[skill.levels.length - 1].spData;
						const val = spCost - initSp;
						return sign === 'gte' ? val >= value : val <= value;
					};

					break;

				default:
					if (value <= 0) continue;
					fn = (item) => (sign === 'gte' ? item[subKey] >= value : item[subKey] <= value);
			}
		} else {
			const selectedOptions = options
				.map((option) => option.selected && option.value)
				.filter(Boolean);
			if (selectedOptions.length === 0) {
				continue;
			}
			switch (subKey) {
				case 'tags':
					fn = (_, tags) => selectedOptions.some((tag) => tags.includes(tag));
					break;
				case 'target_air':
					fn = (item) =>
						selectedOptions.some((val) =>
							val === 'target_air' ? item.target_air : !item.target_air
						);
					break;
				case 'targets':
					fn = (item) => targetValueCheck(item[subKey], selectedOptions);
					break;
				case 'category':
				case 'conditions':
					fn = (item) => someCheck(item[subKey], selectedOptions);
					break;
				case 'types':
					fn = (item) => isSubset(selectedOptions, item[subKey]);
					break;
				case 'dep_stat':
				case 'damage_type':
				case 'order':
				case 'value':
					fn = (item) => selectedOptions.includes(item[subKey]);
					break;
				case 'value_type':
					fn = (item) => compareValueType(selectedOptions, item['value']);
					break;
				case 'duration':
					// currently only used for PASSIVE skills
					fn = (_, tags) =>
						selectedOptions.some((tag) =>
							tag === 'infinite'
								? tags.includes('infinite_duration')
								: !tags.includes('infinite_duration')
						);
					break;
				default:
					break;
			}
		}
		functions.push(fn);
	}
	if (functions.length === 0) {
		return [() => true];
	}
	return functions;
};

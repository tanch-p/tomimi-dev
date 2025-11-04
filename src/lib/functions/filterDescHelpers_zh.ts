import type { Language } from '$lib/types';
import translations from '$lib/translations.json';
import relics from '$lib/data/chara/relics_chara.json';
import { formatArray } from './languageHelpers';
import { getDisplayKey } from './charaHelpers';

const DAMAGE_TYPE_KEYS = ['phys', 'arts', 'true', 'ele_dmg'];
const ELE_INJ_KEYS=['apoptosis','burning','neural'];
const BUFF_TAGS = [
	'inspire',
	'berserk',
	'protect',
	'fragile',
	'magicfragile',
	'physicfragile',
	'elementfragile',
	'vigor',
	'weaken',
	'barrier',
	'liftoff'
];
const STAT_DEBUFFS = ['atk_down', 'def_down', 'res_down', 'aspd_down', 'ms_down', 'hitrate_down','heal_scale_down'];
const DEBUFFS = [
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
	'damage_scale',
	'weightless',
	'cancel_stealth',
	'crit_wound'
];
const ALLY_STAT_BUFFS = [
	'ally_max_hp',
	'ally_atk',
	'ally_def',
	'ally_res',
	'ally_aspd',
	'ally_sp_regen',
	'ally_sp_stock',
	"ally_max_ammo",
];
const ALLY_NORMAL = [
	'ally_block_down',
	'ally_block_up',
	'change_target_priority',
	'ally_damage_scale',
	'ally_arts',
	'ally_apoptosis',
	'ally_burning',
	'ally_heal_scale',
	'ally_sp_gain',
	'ally_spareshot',
	"add_bullet",
	'ally_lower_target_priority'
];
const ALLY_STAT_MINUS = ['ally_respawn_time', 'ally_cost_down'];
const ALLY_BUFFS = [
	'ally_evasion',
	"ally_min_aspd",
	'ally_shield',
	'ally_reflect_dmg',
	'ally_res_penetrate',
	'ally_def_penetrate',
	'ally_resist',
	'ally_block_dmg',
	'ally_dmg_res',
	'ally_undying',
	'ally_env_dmg_reduce',
	'ally_stealth',
	'ally_camouflage',
	'ally_taunt'
];
const SELF_CAN_TAGS = [
	'remove_status',
	'add_sp_gain_option',
	'heal_ally',
	'heal_unhealable',
	'heal_self',
	'sp_gain',
	'spareshot',
	'force',
	'block_no_attack',
	'revive',
	'teleport_enemy',
	'execute',
	'slow_projectile',
	'erase_projectile',
	'reallocate_hp',
	'attract_enemy',
	'permanentatk'
];
const SELF_BUFF_TAGS = [
	'evasion',
	'shield',
	'block_dmg',
	'dmg_res',
	'undying',
	'env_dmg_reduce',
	'stealth',
	'camouflage',
	'taunt',
	"receive_heal_scale",
	'lower_target_priority',
	'resist',
	'status_immune'
];
const SELF_STAT_BUFFS = ['sp_regen', 'sp_stock', 'def', 'res',"max_ammo"];
const HAVE_TAGS = [
	'global_heal',
	'squad_effect',
	'min_damage',
	'ignore_evasion',
	'ignore_stealth',
	'def_penetrate',
	'res_penetrate',
	'reflect_dmg',
	'dot',
	'no_source',
	'aspd_unrelated',
	'starting_cost',
	'global_range',
	"bonus_lifepoint",
	"sp_module"
];
const SKILL_HAVE_TAGS = [
	'PASSIVE',
	'INCREASE_WHEN_ATTACK',
	'INCREASE_WHEN_TAKEN_DAMAGE',
	'INCREASE_WITH_TIME',
	'unlimited_duration',
	'skill_invincible',
	'charged',
	'overdrive',
	'trigger_time',
	"skill_manual_off",
	"ct"
];
const PRIORITY_TAGS = [
	'priority_flying',
	'priority_drone',
	'priority_ranged',
	'priority_stun',
	'priority_sleep',
	'priority_highest_weight',
	'priority_def_high',
	'priority_def_low',
	'priority_res_high',
	'priority_res_low'
];
const SQUAD_TAGS = [
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
	'PIONEER',
	'WARRIOR',
	'SNIPER',
	'TANK',
	'MEDIC',
	'SUPPORT',
	'CASTER',
	'SPECIAL',
	'cost_under_10',
	'mujica',
	"kjerag"
];
const TYPE_TAGS = [
	'flying',
	'drone',
	'infection',
	'sarkaz',
	"machine",
	'wildanimal',
	'seamonster',
	'type_stun',
	'type_sluggish',
	'type_sleep',
	'type_freeze',
	'type_root',
	'type_tremble',
	'blocked_enemy',
	'no_block_enemy',
	'self_no_block_enemy',
	"not_moving"
];

const getFilterDescCategory = (key) => {
	const categories = [
		{ category: 'damage_type', keyList: DAMAGE_TYPE_KEYS },
		{category: 'ele_inj', keyList:ELE_INJ_KEYS},
		{ category: 'enemy_stat_debuff', keyList: STAT_DEBUFFS },
		{ category: 'enemy_debuff', keyList: DEBUFFS },
		{ category: 'ally_stat_buff', keyList: ALLY_STAT_BUFFS },
		{ category: 'ally_normal', keyList: ALLY_NORMAL },
		{ category: 'ally_stat_minus', keyList: ALLY_STAT_MINUS },
		{ category: 'ally_buff', keyList: ALLY_BUFFS },
		{ category: 'have_tags', keyList: HAVE_TAGS },
		{ category: 'buff_tags', keyList: BUFF_TAGS },
		{ category: 'self_stat_buff', keyList: SELF_STAT_BUFFS },
		{ category: 'self_can', keyList: SELF_CAN_TAGS },
		{ category: 'self_buff', keyList: SELF_BUFF_TAGS },
		{ category: 'skill_have', keyList: SKILL_HAVE_TAGS },
		{ category: 'priority', keyList: PRIORITY_TAGS },
		{ category: 'squad', keyList: SQUAD_TAGS },
		{ category: 'type', keyList: TYPE_TAGS },
		{ category: 'blockCnt', keyList: [0, 1, 2, 3, 4, 5] }
	];
	for (const { category, keyList } of categories) {
		if (keyList.includes(key)) {
			return category;
		}
	}
	return 'others';
};
export const generateSkillDesc = (
	activeOptions,
	list,
	language: Language,
	filterMode,
	relicActiveOptions,
	rogueTopic,
	otherOptions
) => {
	//1. split array into indiv categories
	const allyGroups = {};
	const enemyGroups = {};
	const selfGroups = {};
	const otherGroups = {};
	const relicGroups = {};
	for (const relicId of relicActiveOptions) {
		if (!relicGroups['relic']) relicGroups['relic'] = [];
		relicGroups['relic'].push(relicId);
	}
	for (const key of list) {
		const category = getFilterDescCategory(key);
		let holder;
		if (category.includes('ally')) {
			holder = allyGroups;
		} else if (category.includes('enemy')) {
			holder = enemyGroups;
		} else if (category.includes('self')) {
			holder = selfGroups;
		} else {
			holder = otherGroups;
		}
		if (!holder[category]) {
			holder[category] = [];
		}
		holder[category].push(key);
	}
	const descList = [];
	let categoryDescHolder = [];
	let counter = 0;
	[
		{ key: 'relic', holder: relicGroups },
		{ key: 'enemy', holder: enemyGroups },
		{ key: 'ally', holder: allyGroups },
		{ key: 'self', holder: selfGroups },
		{ key: 'others', holder: otherGroups }
	].forEach(({ key, holder }) => {
		categoryDescHolder = [];
		let category_pre = '';
		if (key !== 'others' && Object.keys(holder).length > 0) {
			if (counter === 0 && key === 'enemy') {
				category_pre += '能';
			}
			if (key === 'ally' && Object.keys(enemyGroups).length === 0 && counter <= 1) {
				category_pre += '能使';
			}
			if (key === 'self') {
				if (selfGroups?.['self_buff']?.length > 0 && Object.keys(selfGroups).length === 1) {
					category_pre += '<@self>自身</>';
					if (counter === 0) {
						category_pre += '能';
					}
				}
				if (
					Object.keys(selfGroups).includes('self_stat_buff') &&
					!Object.keys(selfGroups).includes('self_can') &&
					counter === 0
				) {
					category_pre += '能';
				}
			}
			category_pre += translations[language].chara_filter[`${key}_start`] ?? '';
		}
		if (
			key === 'others' &&
			counter === 0 &&
			(otherGroups?.others?.some((ele) =>
				['aoe', 'damage_type', 'max_target', 'target_air'].includes(ele)
			) ||
				otherGroups?.['damage_type'] || otherGroups?.['ele_inj'])
		) {
			category_pre += '能';
		}
		if (Object.keys(holder).length > 0) {
			counter += 1;
		}
		const entries = Object.entries(holder);
		if (key === 'self') {
			entries.sort((a, b) => {
				if (a[0] === 'self_can') {
					return -1;
				}
				if (b[0] === 'self_can') {
					return 1;
				}
				return 0;
			});
		}
		entries.forEach(([category, options]) => {
			const translatedStrings = options.map((key) => {
				const displayKey = getDisplayKey(key);
				let relic;
				if (category === 'relic') {
					relic = relics[rogueTopic].find((item) => item.id === key);
				}
				return (
					'<@bluehl>' +
					(category === 'blockCnt'
						? key
						: category === 'relic'
						? relic[`name_${language}`] || relic['name_zh']
						: translations[language].table_headers[displayKey] ??
						  translations[language][displayKey] ??
						  translations[language].types[displayKey]) +
					'</>'
				);
			});
			const joinedString =
				filterMode === 'OR' || category === 'blockCnt'
					? translatedStrings.join('/')
					: formatArray(translatedStrings, ',', '和');
			const pre = translations[language]['chara_filter']?.[`${category}_pre`] ?? '';
			const post = translations[language]['chara_filter']?.[`${category}_post`] ?? '';
			categoryDescHolder.push(pre + joinedString + post);
		});
		if (categoryDescHolder.length > 0) {
			descList.push(category_pre + categoryDescHolder.join(','));
		}
	});

	for (const { key, options } of otherOptions) {
		const value = options
			.map(({ value, selected }) => {
				const key = getDisplayKey(value);
				return (
					selected &&
					(translations[language].table_headers[key] ??
						translations[language][key] ??
						translations[language].types[key])
				);
			})
			.filter(Boolean)
			.join('/');
		const pre = translations[language]['chara_filter']?.[`${key}_pre`] ?? '';
		const post = translations[language]['chara_filter']?.[`${key}_post`] ?? '';
		descList.push(pre + '<@bluehl>' + value + '</>' + post);
	}
	const innerConnectorFinal = filterMode === 'OR' ? '或' : ',';
	const finalConnector = descList.length > 0 && !descList[0].includes('水') ? '的' : '';
	return formatArray(descList, ',', innerConnectorFinal) + finalConnector;
};

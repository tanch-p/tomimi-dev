import type { Language, MapConfig, RogueTopic } from '$lib/types';
import fragments from '$lib/data/is/sarkaz/fragments.json';
import f27 from '$lib/images/is/sarkaz/rogue_4_fragment_F_27.webp';
import f28 from '$lib/images/is/sarkaz/rogue_4_fragment_F_28.webp';
import translations from '$lib/translations.json';
import calamity from '$lib/images/is/sarkaz/rogue_4_disaster_1_toast.webp';
import disasters from '$lib/data/is/sarkaz/disasters.json';
import relicsSui from '$lib/data/is/sui/relics_sui.json';
import enemyDatabase from '$lib/data/enemy/enemy_database.json';

const ALWAYS_KILLED_KEYS = [
	'enemy_2073_skzrck',
	'enemy_2094_skzamb',
	'enemy_2094_skzamb_2',
	'enemy_1106_byokai_b',
	'enemy_3005_lpeopl',
	'enemy_2101_dyspll',
	'enemy_10060_cjbfod',
	'enemy_2119_dyshhj_2'
];

const KEYS_TO_IGNORE = ['enemy_2086_skzdwx'];

const ACTION_TYPES_TO_PARSE = ['SPAWN', 'ACTIVATE_PREDEFINED', 'EMPTY'];

const CHESTS = [
	'trap_051_vultres',
	'trap_068_badbox',
	'trap_110_smbbox',
	'trap_758_skzmbx',
	'trap_225_dysbox'
];
const ENEMY_CHEST_KEYS = [
	'enemy_2035_sybox',
	'enemy_2059_smbox',
	'enemy_2069_skzbox',
	'enemy_2106_dyremy'
];

const getFragmentName = (id, language: Language) => {
	const fragment = fragments.find((ele) => ele.id === id);
	return fragment[`name_${language}`] || fragment['name_zh'];
};

export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // Swap elements
	}
	return array;
}

export const getOptions = (
	mapConfig: MapConfig,
	rogueTopic: RogueTopic,
	difficulty: number,
	language: Language
) => {
	const options = [];
	const list = [];
	for (const wave of mapConfig?.waves) {
		for (const fragment of wave.fragments) {
			for (const action of fragment.actions) {
				if (action.actionType === 'ACTIVATE_PREDEFINED') {
					list.push(action.key.split('#')[0]);
				}
			}
		}
	}
	const predefines = [...new Set(list)];
	switch (rogueTopic) {
		case 'rogue_phantom':
			if (predefines.includes('trap_051_vultres')) {
				options.push({
					key: 'trap_051_vultres',
					src: '/images/chara_icons/trap_051_vultres.webp',
					name: translations[language].treasure
				});
			}
			if (mapConfig?.elite_mods) {
				options.push({
					key: 'extra',
					src: '',
					name: '紧急作战 + 怒想症 / 猩红《赫里亚之辉》'
				});
			}
			if (
				['level_rogue1_b-6', 'level_rogue1_b-7', 'level_rogue1_b-8', 'level_rogue1_b-9'].includes(
					mapConfig?.levelId
				)
			) {
				options.push({
					key: 'reforge',
					src: '',
					name: 'N12以上结局关卡'
				});
			}
			[];
			break;
		case 'rogue_mizuki':
			for (const key of predefines) {
				if (key === 'trap_068_badbox') {
					options.push({
						key: 'trap_068_badbox',
						src: '/images/chara_icons/trap_068_badbox.webp',
						name: translations[language].treasure
					});
					continue;
				}
				if (key === 'trap_079_allydonq') {
					options.push({
						key: 'allydonq',
						src: '/images/enemy_icons/enemy_2038_sydonq.webp',
						name: { zh: '猎潮的骑士', ja: '猟潮の騎士', en: 'Tide-Hunt Knight' }[language]
					});
					continue;
				}
			}
			break;
		case 'rogue_sami':
			for (const key of predefines) {
				if (key === 'trap_110_smbbox') {
					options.push({
						key: 'trap_110_smbbox',
						src: '/images/chara_icons/trap_110_smbbox.webp',
						name: translations[language].treasure
					});
					continue;
				}
			}
			options.push(
				...[
					{
						key: 'totem2',
						src: '/images/chara_icons/trap_024_npcsld.webp',
						name: { zh: '盾卫', ja: '盾兵', en: 'Shieldguard' }[language]
					},
					{
						key: 'totem1',
						src: '/images/enemy_icons/enemy_1106_byokai.webp',
						name: { zh: '斗志昂扬无人机', ja: '闘志高揚ドローン', en: 'Cheering Sponsor Drone' }[
							language
						]
					},
					{
						key: 'bossrelic',
						src: '/images/relics/relic_routeweave_net.webp',
						name: { zh: '路网', ja: '導きの網織', en: 'Routeweave Net' }[language]
					}
				]
			);
			break;
		case 'rogue_skz':
			for (const key of predefines) {
				if (key === 'trap_758_skzmbx') {
					options.push({
						key: 'trap_758_skzmbx',
						src: '/images/chara_icons/trap_758_skzmbx.webp',
						name: translations[language].treasure
					});
					continue;
				}
				if (key === 'trap_764_skzshp') {
					options.push({
						key: 'trap_764_skzshp',
						src: '/images/chara_icons/trap_764_skzshp.webp',
						name: { zh: '驮兽旅行家', ja: '旅する駄獣', en: 'Burdenbeast Traveler' }[language]
					});
					continue;
				}
			}
			options.push(
				...[
					{
						key: 'calamity',
						src: calamity,
						name: { zh: '天灾年代', ja: '天災の時代', en: 'Catastrophes' }[language]
					},
					{
						key: 'hidden_door',
						src: '/images/enemy_icons/enemy_2067_skzcy.webp',
						name: getFragmentName('rogue_4_fragment_F_08', language)
					},
					{
						key: 'hidden_window',
						src: '/images/enemy_icons/enemy_2091_skzgds.webp',
						name: getFragmentName('rogue_4_fragment_F_29', language)
					},
					{
						key: 'box_1',
						src: f27,
						name: getFragmentName('rogue_4_fragment_F_27', language)
					},
					{
						key: 'box_3',
						src: f28,
						name: getFragmentName('rogue_4_fragment_F_28', language)
					},
					{
						key: 'shadow',
						src: '/images/enemy_icons/enemy_2093_skzams.webp',
						name: { zh: '终曲合声', ja: '終曲のコーラス', en: 'Finale Cadence' }[language]
					}
				]
			);
			break;
		case 'rogue_yan':
			for (const key of predefines) {
				if (key === 'trap_225_dysbox') {
					options.push({
						key: 'trap_225_dysbox',
						src: '/images/chara_icons/trap_225_dysbox.webp',
						name: translations[language].treasure
					});
					continue;
				}
			}
			options.push(
				...[
					{
						key: 'copper_b',
						src: '/images/relics/rogue_5_relic_final_3.webp',
						name: { zh: '隐蝶墨', ja: '隠蝶墨', en: 'Ink of the Hidden Butterfly' }[language]
					},
					{
						key: 'copper_r',
						src: '/images/relics/rogue_5_copper_S_1.webp',
						name: { zh: '花-鸭爵金币', ja: '鴨爵の金幣', en: 'Duck Coin' }[language]
					}
				]
			);
			break;
	}
	return options;
};

export const handleOptionsUpdate = (
	hiddenGroups,
	key,
	rogueTopic: RogueTopic,
	difficulty: number,
	otherStores
) => {
	const fragmentKeys = ['hidden_door', 'hidden_window', 'box_1', 'box_3'];
	if (rogueTopic === 'rogue_skz' && key === 'calamity') {
		const level = difficulty < 5 ? 1 : difficulty < 11 ? 2 : 3;
		const effect = disasters.find(
			(ele) => ele.iconId === 'rogue_4_disaster_1' && ele.level === level
		);
		otherStores.disaster.update((list) => {
			if (list.find((ele) => ele.id === effect.id)) {
				list = [];
			} else {
				list = [effect];
			}
			return list;
		});
	}
	if (rogueTopic === 'rogue_yan' && key === 'copper_r') {
		const effect = relicsSui.find((item) => item.id === 'rogue_5_copper_S_1');
		otherStores.relics.update((list) => {
			if (list.find((ele) => ele.id === effect.id)) {
				list = list.filter((item) => item.id !== effect.id);
			} else {
				list = [...list, effect];
			}
			return list;
		});
	}
	if (rogueTopic === 'rogue_phantom' && key === 'extra') {
		if (!hiddenGroups.includes(key)) {
			otherStores.eliteMode.set(true);
		}
	}
	switch (rogueTopic) {
		case 'rogue_skz':
			if (hiddenGroups.includes(key)) {
				hiddenGroups = hiddenGroups.filter((ele) => ele !== key);
			} else if (fragmentKeys.includes(key)) {
				hiddenGroups = hiddenGroups.filter((ele) => !fragmentKeys.includes(ele));
				hiddenGroups.push(key);
				break;
			} else {
				hiddenGroups.push(key);
			}

			break;
		default:
			if (hiddenGroups.includes(key)) {
				hiddenGroups = hiddenGroups.filter((ele) => ele !== key);
			} else {
				hiddenGroups.push(key);
			}
			break;
	}
	return hiddenGroups;
};

//to handle enemies with just a packKey and no group in the fragment i.e. rogue1_1-2 hiddenGroup extra packKey extra
const packHasGroupInFragment = (actions, packKey) => {
	if (!packKey) return false;
	for (const action of actions) {
		if (action['randomSpawnGroupPackKey'] === packKey && action['randomSpawnGroupKey']) {
			return true;
		}
	}
	return false;
};

export const getBaseCount = (mapConfig, eliteMode) => {
	let totalCount = 0;
	mapConfig?.waves.forEach((wave, waveIdx) => {
		wave['fragments'].forEach((fragment, fragIndex) => {
			for (const action of fragment['actions']) {
				if (action['actionType'] !== 'SPAWN') {
					continue;
				}
				if (action['randomSpawnGroupKey']) {
					continue;
				}
				if (packHasGroupInFragment(fragment['actions'], action['randomSpawnGroupPackKey'])) {
					continue;
				}
				if (action['hiddenGroup']) {
					continue;
				}
				if (
					[
						'level_rogue4_b-4',
						'level_rogue4_b-4-b',
						'level_rogue4_b-5',
						'level_rogue4_b-5-b'
					].includes(mapConfig?.levelId) &&
					action.key === 'enemy_2090_skzjbc' &&
					!eliteMode
				) {
					continue;
				}
				if (isCountableAction(action.key, mapConfig)) {
					totalCount += action['count'];
				}
			}
		});
	});
	return totalCount;
};

const isCountableEnemy = (key: string, mapConfig: MapConfig) => {
	let enemyKey = key;
	const enemyRef = mapConfig?.enemies.find((ele) => ele.id === key || ele.prefabKey === key);
	if (enemyRef) {
		enemyKey = enemyRef.prefabKey;
	}
	if (!enemyDatabase[enemyKey]) {
		return true;
	}
	let isCountable = !enemyDatabase[enemyKey].notCountInTotal;
	if (enemyRef?.overwrittenData?.notCountInTotal) {
		isCountable = !enemyRef?.overwrittenData?.notCountInTotal;
	}
	return isCountable;
};

const isCountableAction = (action, mapConfig: MapConfig) => {
	const key = action.key;
	if (!ACTION_TYPES_TO_PARSE.includes(action['actionType'])) {
		return false;
	}
	if (['trap', 'char', 'token'].some((ele) => key.includes(ele))) return false;
	if (key === '') return false;
	if (ALWAYS_KILLED_KEYS.includes(key)) return false;
	if (KEYS_TO_IGNORE.includes(key)) {
		return false;
	}
	return isCountableEnemy(key, mapConfig);
};

export const getEnemyCountPermutations = (
	mapConfig,
	hiddenGroups,
	eliteMode,
	bonusKey,
	baseCount
) => {
	const key = eliteMode ? 'ELITE' : 'NORMAL';
	const permutations = mapConfig?.[key].permutations;
	const bonus = mapConfig?.bonus;
	const countToAdd = mapConfig?.waves.reduce((acc, wave, waveIdx) => {
		if (bonus?.type === 'wave' && waveIdx === bonus.wave_index) return acc;
		wave.fragments.forEach((fragment, i) => {
			if (bonus?.type === 'fragment' && waveIdx === bonus.wave_index && i === bonus.frag_index)
				return;
			fragment.actions.forEach((action) => {
				if (ACTION_TYPES_TO_PARSE.includes(action.actionType)) return;
				if (
					hiddenGroups.includes(action['hiddenGroup']) &&
					!action['randomSpawnGroupKey'] &&
					!action['randomSpawnGroupPackKey'] &&
					isCountableAction(action.key, mapConfig)
				) {
					acc += action['count'];
				}
			});
		});
		return acc;
	}, 0);

	// [{ "w0f1": { "g1": 0 }, "w0f4": { "g1": 0 } }]
	const list = permutations.map((permutation) => {
		let permutationCount = 0;
		mapConfig?.waves.forEach((wave, waveIdx) => {
			if (bonus?.type === 'wave' && waveIdx === bonus.wave_index) return; //added in for ro5 stages
			wave['fragments'].forEach((fragment, fragIndex) => {
				const packedGroups = getRandomGroups(fragment, hiddenGroups);
				const key = `w${waveIdx}f${fragIndex}`;
				let groupActions = [];
				for (const [groupKey, list] of Object.entries(packedGroups)) {
					const choice = permutation?.[key]?.[groupKey];
					if (choice && list?.[choice]) {
						groupActions = groupActions.concat(list[choice]);
					} else {
						//group is from hidden group like extra/totem
						groupActions = groupActions.concat(list[0]);
					}
				}
				for (const action of groupActions.filter(Boolean)) {
					if (isCountableAction(action.key, mapConfig)) {
						permutationCount += action['count'];
					}
				}
			});
		});
		return {
			count: baseCount + countToAdd + permutationCount + (bonus && bonusKey ? 1 : 0),
			permutation
		};
	});
	return list.sort((a, b) => a.count - b.count);
};

function addPackToGroup(action, groups) {
	for (const groupKey in groups) {
		for (const item of groups[groupKey]) {
			if (action.randomSpawnGroupPackKey === item.randomSpawnGroupPackKey) {
				groups[groupKey].push(action);
				return;
			}
		}
	}
}

function groupResolver(actions) {
	const groups = {};
	const leftovers = [];
	const notRandomGroups = [];

	// First pass: handle random spawn groups
	for (const action of actions) {
		const group = action.randomSpawnGroupKey;
		if (group !== null && group !== undefined) {
			if (!groups[group]) {
				groups[group] = [];
			}
			groups[group].push(action);
		} else {
			leftovers.push(action);
		}
	}

	// Second pass: handle pack keys
	for (const action of leftovers) {
		const packKey = action.randomSpawnGroupPackKey;
		if (packKey !== null && packKey !== undefined) {
			addPackToGroup(action, groups);
		} else {
			notRandomGroups.push(action);
		}
	}

	return groups;
}

function randomGroupResolver(randomGroups) {
	const groupCollector = {};

	for (const groupKey in randomGroups) {
		const packDict = {};

		// Group actions by pack key
		for (const action of randomGroups[groupKey]) {
			const packKey = action.randomSpawnGroupPackKey;
			if (!packDict[packKey]) {
				packDict[packKey] = [];
			}
			packDict[packKey].push(action);
		}

		// Handle cases with no pack key (single pack)
		if (Object.keys(packDict).length === 1) {
			for (const pack in packDict) {
				groupCollector[groupKey] = packDict[pack];
			}
		} else {
			// Multiple packs - collect all pack groups
			const packGroups = [];
			for (const pack in packDict) {
				packGroups.push(packDict[pack]);
			}
			groupCollector[groupKey] = packGroups;
		}
	}

	return groupCollector;
}

export const generateWaveTimeline = (
	mapConfig,
	hiddenGroups,
	permutation,
	eliteMode,
	randomSeeds,
	bonusKey
) => {
	if (!permutation) return;
	let randomSeedIndex = 0;
	const enemyReplace = eliteMode ? mapConfig?.elite_runes?.enemy_replace || {} : {};
	let totalCount = 0;
	const waveTimelines = [];
	const { waves } = mapConfig;
	waves.forEach((wave, waveIdx) => {
		let prevPhaseTime = 0;
		let spawns = {};
		let waveBlockingSpawns = {};
		wave['fragments'].forEach((fragment, fragIndex) => {
			prevPhaseTime += fragment['preDelay'];

			const packedGroups = getRandomGroups(fragment, hiddenGroups);
			const key = `w${waveIdx}f${fragIndex}`;
			let groupActions = [];
			for (const [groupKey, list] of Object.entries(packedGroups)) {
				if (list.length === 1) {
					groupActions.push(list[0]);
					continue;
				}
				let choice = permutation?.[key]?.[groupKey];
				if (choice == undefined) {
					const isBonusGroup = mapConfig?.bonus
						? key === `w${mapConfig?.bonus.wave_index}f${Math.max(0, mapConfig?.bonus.frag_index)}`
						: false;
					choice = getPredefinedChoiceIndex(
						list,
						hiddenGroups,
						bonusKey,
						isBonusGroup ? mapConfig?.bonus : null
					);
					if (choice == undefined) {
						choice = Math.floor(randomSeeds[randomSeedIndex] * list.length);
						randomSeedIndex += 1;
					}
				}
				if (list?.[choice]) {
					groupActions = groupActions.concat(list[choice]);
				}
			}
			for (const action of groupActions) {
				handleAction(action, spawns, waveBlockingSpawns, prevPhaseTime, enemyReplace);
				if (isCountableAction(action.key, mapConfig)) {
					totalCount += action['count'];
				}
			}

			for (const action of fragment['actions']) {
				if (action['randomSpawnGroupKey']) {
					continue;
				}
				if (packHasGroupInFragment(fragment['actions'], action['randomSpawnGroupPackKey'])) {
					continue;
				}
				if (action['hiddenGroup'] && !hiddenGroups.includes(action['hiddenGroup'])) {
					continue;
				}
				if (
					[
						'level_rogue4_b-4',
						'level_rogue4_b-4-b',
						'level_rogue4_b-5',
						'level_rogue4_b-5-b'
					].includes(mapConfig?.levelId) &&
					action.key === 'enemy_2090_skzjbc' &&
					!eliteMode
				) {
					continue;
				}
				if (KEYS_TO_IGNORE.includes(action.key)) {
					continue;
				}
				handleAction(action, spawns, waveBlockingSpawns, prevPhaseTime, enemyReplace);
				if (isCountableAction(action, mapConfig)) {
					totalCount += action['count'];
				}
			}
			if (Object.keys(waveBlockingSpawns).length > 0) {
				prevPhaseTime = Math.max(...Object.keys(waveBlockingSpawns).map(Number));
			}
		});
		const myKeys = Object.keys(spawns).map(Number);
		if (
			!(['level_rogue4_b-7', 'level_rogue4_b-8'].includes(mapConfig?.levelId) && myKeys.length === 0)
		) {
			myKeys.sort((a, b) => a - b);
			const spawnList = myKeys.map((key) => ({ t: key, actions: spawns[key] }));
			waveTimelines.push({
				preDelay: wave['preDelay'],
				postDelay: wave['postDelay'],
				maxTimeWaitingForNextWave: wave['maxTimeWaitingForNextWave'],
				timeline: spawnList
			});
		}
	});
	return { waves: waveTimelines, count: totalCount };
};

export const generateBranchTimeline = (mapConfig, branchKey, branchIndex = -1, interval = 0) => {
	if (!branchKey) return;
	if (!mapConfig?.branches?.[branchKey]) return;
	const waveTimelines = [];
	let fragments = mapConfig?.branches?.[branchKey]?.phases;
	if (branchIndex !== -1) {
		fragments = [mapConfig?.branches?.[branchKey]?.phases[branchIndex]];
	}
	const waves = [{ fragments: fragments }];
	waves.forEach((wave) => {
		let prevPhaseTime = 0;
		const spawns = {};
		wave['fragments'].forEach((fragment) => {
			prevPhaseTime += fragment['preDelay'] + interval;
			for (const action of fragment['actions']) {
				handleAction(action, spawns, {}, prevPhaseTime);
			}
		});
		const myKeys = Object.keys(spawns).map(Number);
		if (!(myKeys.length === 0)) {
			myKeys.sort((a, b) => a - b);
			const spawnList = myKeys.map((key) => ({ t: key, actions: spawns[key] }));
			waveTimelines.push({
				preDelay: 0,
				postDelay: 0,
				maxTimeWaitingForNextWave: -1,
				timeline: spawnList
			});
		}
	});
	return waveTimelines;
};

const handleAction = (action, spawns, waveBlockingSpawns, prevPhaseTime, enemyReplace = {}) => {
	let enemyKey = action.key;
	if (enemyReplace[action.key]) {
		enemyKey = enemyReplace[action.key];
	}
	if (['trap', 'char', 'token'].some((ele) => enemyKey.includes(ele))) {
		enemyKey = enemyKey.split('#')?.[0];
	}
	if (action['count'] > 1) {
		// interval
		for (let i = 0; i < action['count']; i++) {
			const spawnTime = prevPhaseTime + action['preDelay'] + i * action['interval'];
			if (!spawns?.[spawnTime]) {
				spawns[spawnTime] = [];
			}
			spawns[spawnTime].push({
				key: enemyKey,
				actionType: action['actionType']
			});

			if (!waveBlockingSpawns[spawnTime]) {
				waveBlockingSpawns[spawnTime] = [];
				waveBlockingSpawns[spawnTime].push({ key: action['key'] });
			}
		}
	} else {
		const spawnTime = prevPhaseTime + action['preDelay'];
		if (!spawns?.[spawnTime]) {
			spawns[spawnTime] = [];
		}
		spawns[spawnTime].push({
			key: enemyKey,
			actionType: action['actionType']
		});

		if (!waveBlockingSpawns[spawnTime]) {
			waveBlockingSpawns[spawnTime] = [];
			waveBlockingSpawns[spawnTime].push({ key: action['key'] });
		}
	}
};

export const parseWaves = (
	mapConfig,
	permutation,
	hiddenGroups,
	eliteMode,
	randomSeeds,
	bonusKey
) => {
	let randomSeedIndex = 0;
	const waves = structuredClone(mapConfig?.waves);
	waves.forEach((wave, waveIdx) => {
		const fragments = [];
		wave['fragments'].forEach((fragment, fragIndex) => {
			const copy = structuredClone(fragment);
			const key = `w${waveIdx}f${fragIndex}`;
			const actions = [];

			let groupActions = [];
			const packedGroups = getRandomGroups(fragment, hiddenGroups);
			for (const [groupKey, list] of Object.entries(packedGroups)) {
				if (list.length === 1) {
					groupActions.push(list[0]);
					continue;
				}
				let choice = permutation?.[key]?.[groupKey];
				if (choice == undefined) {
					const isBonusGroup = mapConfig?.bonus
						? key === `w${mapConfig?.bonus.wave_index}f${Math.max(0, mapConfig?.bonus.frag_index)}`
						: false;
					choice = getPredefinedChoiceIndex(
						list,
						hiddenGroups,
						bonusKey,
						isBonusGroup ? mapConfig?.bonus : null
					);
					if (choice == undefined) {
						choice = Math.floor(randomSeeds[randomSeedIndex] * list.length);
						randomSeedIndex += 1;
					}
				}
				if (list?.[choice]) {
					groupActions = groupActions.concat(list[choice]);
				}
			}
			for (const action of groupActions) {
				actions.push(action);
			}
			for (const action of fragment['actions']) {
				if (
					[
						'level_rogue4_b-4',
						'level_rogue4_b-4-b',
						'level_rogue4_b-5',
						'level_rogue4_b-5-b'
					].includes(mapConfig?.levelId) &&
					action.key === 'enemy_2090_skzjbc' &&
					!eliteMode
				) {
					continue;
				}
				if (action['randomSpawnGroupKey']) {
					continue;
				}
				if (packHasGroupInFragment(fragment['actions'], action['randomSpawnGroupPackKey'])) {
					continue;
				}
				if (action['hiddenGroup'] && !hiddenGroups.includes(action['hiddenGroup'])) {
					continue;
				}
				actions.push(action);
			}
			copy.actions = actions;
			fragments.push(copy);
		});
		wave.fragments = fragments;
	});

	return waves;
};

export const getPredefinedChoiceIndex = (list, hiddenGroups, bonusKey, bonus) => {
	if (!Array.isArray(list?.[0])) {
		const badBoxIdx = list.findIndex((action) => CHESTS.includes(action.key.split('#')[0]));
		if (badBoxIdx !== -1 && hiddenGroups.some((ele) => CHESTS.includes(ele))) {
			return badBoxIdx;
		}
		if (bonus) {
			const bonusIdx = bonusKey ? list.findIndex((action) => action.key === bonusKey) : -1;
			return bonusIdx;
		}
	}
};

export const getRandomGroups = (fragment, hiddenGroups) => {
	const groups = [];
	for (const action of fragment['actions']) {
		const { actionType, randomSpawnGroupKey, randomSpawnGroupPackKey } = action;
		if (!ACTION_TYPES_TO_PARSE.includes(actionType)) {
			continue;
		}
		if (['trap_036_storm'].includes(action.key.split('#')[0])) {
			// temp fix
			continue;
		}
		if (randomSpawnGroupKey) {
			groups.push(action);
			continue;
		}
		if (packHasGroupInFragment(fragment['actions'], randomSpawnGroupPackKey)) {
			groups.push(action);
		}
	}
	const random_groups = groupResolver(groups);
	const packedGroups = randomGroupResolver(random_groups);
	for (const groupKey of Object.keys(packedGroups)) {
		let isPack = false;
		for (let i = 0; i < packedGroups[groupKey].length; i++) {
			if (Array.isArray(packedGroups[groupKey][i])) {
				isPack = true;
				packedGroups[groupKey][i] = packedGroups[groupKey][i].filter(
					(action) => !action['hiddenGroup'] || hiddenGroups.includes(action['hiddenGroup'])
				);
			}
		}
		if (!isPack) {
			packedGroups[groupKey] = packedGroups[groupKey].filter(
				(action) => !action['hiddenGroup'] || hiddenGroups.includes(action['hiddenGroup'])
			);
		}
	}
	const filteredPackedGroups = Object.keys(packedGroups).reduce((acc, key) => {
		if (
			packedGroups[key].some((item) => {
				if (Array.isArray(item)) {
					return item.length > 0;
				}
				return Boolean(item);
			})
		) {
			acc[key] = packedGroups[key];
		}
		return acc;
	}, {});
	return filteredPackedGroups;
};

export const compileHiddenGroups = (
	hiddenGroups,
	eliteMode,
	mapConfig,
	rogueTopic: RogueTopic,
	relics
) => {
	const modeKey = eliteMode ? mapConfig?.['ELITE'].groupKey : mapConfig?.['NORMAL'].groupKey;
	let groups = structuredClone(hiddenGroups);
	if (modeKey) {
		groups = [...groups, modeKey];
	}
	if (rogueTopic === 'rogue_yan' && !relics?.some((item) => item.id === 'rogue_5_copper_S_1')) {
		groups = [...groups, 'copper_d'];
	}
	return groups;
};

export const initialisePermGroupsChoices = (mapConfig, eliteMode: boolean, hidden_groups) => {
	const modeKey = eliteMode ? mapConfig?.['ELITE'].groupKey : mapConfig?.['NORMAL'].groupKey;
	const hiddenGroups = structuredClone(hidden_groups);
	if (modeKey) {
		hiddenGroups.push(modeKey);
	}
	const permutation = {};
	mapConfig?.waves.forEach((wave, waveIdx) => {
		wave.fragments.forEach((fragment, fragIdx) => {
			const key = `w${waveIdx}f${fragIdx}`;
			const groups = {};
			for (const action of fragment.actions) {
				const { hiddenGroup, randomSpawnGroupKey } = action;
				if (hiddenGroup && !hiddenGroups.includes(hiddenGroup)) {
					continue;
				}
				if (randomSpawnGroupKey && !groups[randomSpawnGroupKey]) {
					groups[randomSpawnGroupKey] = 0;
				}
			}
			if (Object.keys(groups).length > 0) {
				permutation[key] = {};
				for (const [groupKey, val] of Object.entries(groups)) {
					permutation[key][groupKey] = val;
				}
			}
		});
	});
	return structuredClone(permutation);
};

export const getRandomChance = (weight, choice) => {
	if (Array.isArray(weight)) {
		const actions = weight;
		const w = actions.find((action) => action.randomSpawnGroupKey)?.weight;
		const totalWeight = choice.reduce((acc, pack) => {
			const curr = pack.find((action) => action.randomSpawnGroupKey)?.weight;
			acc += curr;
			return acc;
		}, 0);
		return Math.round((w / totalWeight) * 100);
	}
	const totalWeight = choice.reduce((acc, curr) => {
		acc += curr.weight;
		return acc;
	}, 0);
	return Math.round((weight / totalWeight) * 1000) / 10;
};

export const compileSpawnTimeActions = (actions) => {
	const holder = [];
	for (const action of actions) {
		if (!ACTION_TYPES_TO_PARSE.includes(action.actionType)) {
			continue;
		}
		const item = holder.find((ele) => ele.key === action.key);
		if (item) {
			item.count += action.count || 1;
		} else {
			holder.push({ key: action.key, count: action.count || 1 });
		}
	}
	return holder;
};

export const getBonusEnemies = (rogueTopic: RogueTopic) => {
	switch (rogueTopic) {
		case 'rogue_phantom':
			return ['', 'enemy_2001_duckmi', 'enemy_2002_bearmi'];
		case 'rogue_sami':
			return ['', 'enemy_2001_duckmi', 'enemy_2002_bearmi', 'enemy_2034_sythef'];
		default:
			return [
				'',
				'enemy_2001_duckmi',
				'enemy_2002_bearmi',
				'enemy_2034_sythef',
				'enemy_2085_skzjxd'
			];
	}
};

export const getImageForWaves = (key, mapConfig) => {
	if (key.includes('skzamj') || key.includes('skzamf')) {
		const enemy = mapConfig?.enemies.find((enemy) => enemy.id === key);
		const transformKey = enemy.overwrittenData.talentBlackboard
			.find((ele) => ele.key === 'transform')
			?.value?.replace('skzams_1', 'skzams')
			.replace('upeopl_1', 'upeopl');
		return transformKey;
	}

	return mapConfig?.enemies.find((enemy) => enemy.id === key)?.prefabKey;
};

export function isChestBranch(branches, key: string) {
	const phases = branches?.[key]?.phases;
	if (!phases || phases.length > 1) return;
	for (const phase of phases) {
		if (phase.actions.length > 1) return;
		for (const action of phase.actions) {
			if (ENEMY_CHEST_KEYS.some((key) => action.key.includes(key))) {
				return true;
			}
		}
	}
}

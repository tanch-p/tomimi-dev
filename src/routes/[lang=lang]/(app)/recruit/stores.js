import { writable, derived } from 'svelte/store';
import filterOptions from '$lib/data/chara/filter_options.json';
import relics from '$lib/data/chara/relics_chara.json';
import secFiltersTable from '$lib/data/chara/sec_filters.json';
import {
	addOptionsToAcc,
	adjustSortPriority,
	getSecFilterOptions,
	getSortOptions,
	getMaxValue,
	professionWeights,
	createStrictFilterFunction,
	createNormalFilterFunction,
	createSecFilterFunction
} from '$lib/functions/chara/charaHelpers';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../stores';

let releaseStatus = 'cn';
let filterMode = 'AND';
if (browser && cookiesEnabled) {
	releaseStatus = localStorage.getItem('releaseStatus') || 'cn';
	filterMode = localStorage.getItem('filterMode') || 'AND';
}
export const releaseStatusStore = writable(releaseStatus);
export const filterModeStore = writable(filterMode);

export const globalCheck = derived(releaseStatusStore, ($releaseStatusStore) => (char) => {
	if ($releaseStatusStore === 'cn') {
		return true;
	}
	return !char.tags.includes('not_in_global');
});
export const secFilterOptions = writable(secFiltersTable);

const generateFilterStore = (filterOptions) => {
	return Object.keys(filterOptions).reduce((acc, category) => {
		switch (category) {
			case 'rarity':
			case 'blockCnt':
			case 'profession':
			case 'group':
				acc.push({
					key: category,
					options: filterOptions[category].map((value) => {
						return { value, selected: false };
					})
				});
				break;
			case 'subProfessionId':
				acc.push({
					key: category,
					options: Object.keys(filterOptions[category])
						.reduce((acc, subKey) => {
							acc.push(
								filterOptions[category][subKey].map((value) => {
									return { value, selected: false };
								})
							);
							return acc;
						}, [])
						.flat(2)
				});
				break;
			case 'spType':
			case 'deployable_tile':
				acc.push({
					key: category,
					options: filterOptions[category].map((value) => {
						return { value, selected: false };
					})
				});
				break;
			default:
				addOptionsToAcc(acc, filterOptions[category]);
				break;
		}
		return acc;
	}, []);
};

//filters to add: enemy type bonuses,
const defaultRogueTopic = releaseStatus === 'cn' ? 'rogue_4' : 'rogue_3';
export const filtersStore = writable(generateFilterStore(filterOptions));
export const secFiltersStore = writable([]);
export const rogueTopic = writable(defaultRogueTopic);
export const relicFiltersStore = writable(
	relics[defaultRogueTopic].map((relic) => {
		return { id: relic.id, selected: false };
	})
);
rogueTopic.subscribe((topic) =>
	relicFiltersStore.set(
		relics[topic].map((relic) => {
			return { id: relic.id, selected: false };
		})
	)
);

//condition for true/false
export const filters = derived(
	[filtersStore, secFiltersStore, relicFiltersStore, rogueTopic, filterModeStore],
	([$filtersStore, $secFiltersStore, $relicFiltersStore, $rogueTopic, $filterModeStore]) => {
		const bbTagHolder = [];
		const relicFilterFunctions = $relicFiltersStore
			.filter((option) => option.selected)
			.map((option) => {
				const relic = relics[$rogueTopic].find((relic) => relic.id === option.id);
				if (!relic) {
					console.log(option.id, 'not found');
				}
				switch (true) {
					case Boolean(relic.tag):
						bbTagHolder.push({ key: relic.tag, type: 'tags' });
						return () => true;
					case Boolean(relic.subProfessionId):
						return (char) => relic.subProfessionId.includes(char.subProfessionId);
					case relic.id === 'rogue_4_relic_explore_6':
						return (char) =>
							![
								'aoesniper',
								'phalanx',
								'bombarder',
								'corecaster',
								'primcaster',
								'ritualist',
								'stalker',
								'merchant',
								'geek',
								'splashcaster',
								'chain',
								'funnel',
								'reaper',
								'musha',
								'fighter',
								'pioneer',
								'charger',
								'tactician',
								'slower',
								'underminer',
								'blessing',
								'fastshot',
								'loopshooter',
								'shotprotector'
							].includes(char.subProfessionId) && char.rarity === 'TIER_6';
					default:
						return () => true;
				}
			});
		const filterFunctions = relicFilterFunctions.concat(
			$filtersStore.reduce((acc, curr) => {
				const selectedOptions = curr.options
					.map((option) => option.selected && option.value)
					.filter((ele) => ele !== false); //changed from Boolean because of nationId/groupId null values
				if (selectedOptions.length === 0) {
					return acc;
				}
				switch (curr.key) {
					case 'spType':
						bbTagHolder.push({
							key: 'spType',
							type: 'spType',
							options: selectedOptions
						});
						break;
					case 'group':
						acc.push((char) => {
							if (selectedOptions.includes(null)) {
								const options = selectedOptions.filter(Boolean);
								return (
									options.some((group) => char?.powers?.includes(group)) ||
									char?.powers?.length === 0
								);
							}
							return selectedOptions.some((group) => char?.powers?.includes(group));
						});
						break;
					case 'deployable_tile':
						bbTagHolder.push({
							key: 'deployable_tile',
							type: 'deployable_tile',
							options: selectedOptions
						});
						break;
					case 'blockCnt':
						bbTagHolder.push({ key: 'blockCnt', type: 'blockCnt', options: selectedOptions });
						break;
					case 'blackboard':
						bbTagHolder.push(
							...selectedOptions.map((key) => {
								return { key, type: 'blackboard' };
							})
						);
						break;
					case 'tags':
						bbTagHolder.push(
							...selectedOptions.map((key) => {
								return { key, type: 'tags' };
							})
						);
						break;
					default:
						acc.push((char) => selectedOptions.includes(char[curr.key]));
				}
				return acc;
			}, [])
		);
		if ($filterModeStore === 'OR' || $filterModeStore === 'AND') {
			filterFunctions.unshift(
				createNormalFilterFunction(bbTagHolder, $secFiltersStore, $filterModeStore)
			);
		} else {
			filterFunctions.unshift(createStrictFilterFunction(bbTagHolder, $secFiltersStore));
		}
		return function (char) {
			if (filterFunctions.length === 0) {
				return true;
			}
			for (const f of filterFunctions) {
				const passFilter = f(char);
				if (!passFilter) {
					return false;
				}
			}
			return true;
		};
	}
);

const defaultSortOptions = [
	{ key: 'release_time', subKey: null, suffix: null, order: -1, priority: 1 },
	{ key: 'rarity', subKey: null, suffix: null, order: -1, priority: 2 },
	{ key: 'profession', subKey: null, suffix: null, order: 0, priority: null }
];
export const sortOptions = writable(defaultSortOptions);
filtersStore.subscribe((list) => {
	const blackboardOptions = list
		.find(({ key }) => key === 'blackboard')
		.options.map(({ value, selected }) => selected && value)
		.filter(Boolean);
	const otherOptions = list
		.filter(
			({ key, options }) => ['blockCnt'].includes(key) && options.some(({ selected }) => selected)
		)
		.map((ele) => ele.key)
		.filter(Boolean);
	const spTypeOptions = list
		.find(({ key }) => key === 'spType')
		.options.map(({ value, selected }) => selected && value)
		.filter(Boolean);
	const activeOptions = [...otherOptions, ...blackboardOptions];
	//secFilters update
	secFiltersStore.update((options) => {
		const returnList = [];
		for (const option of activeOptions.concat(spTypeOptions)) {
			const filterOption = options.find(({ key }) => key === option);
			if (filterOption) {
				returnList.push(filterOption);
			} else {
				const secOptions = getSecFilterOptions(option, secFilterOptions);
				if (secOptions?.length > 0) {
					returnList.push({
						key: option,
						list: secOptions.map((ele) => {
							if (ele.type === 'options') {
								ele.options = ele.options?.map((value) => {
									return { value, selected: false };
								});
							}
							return ele;
						})
					});
				}
			}
		}
		return returnList;
	});

	//sortOptions update
	sortOptions.update((options) => {
		let returnList = options.filter(({ key }) =>
			['rarity', 'profession', 'release_time'].includes(key)
		);
		for (const option of activeOptions) {
			let existingOptions = [];
			for (const sortOption of options) {
				if (sortOption.key === option) {
					existingOptions.push(sortOption);
				}
			}
			if (existingOptions.length > 0) {
				returnList.push(...existingOptions);
			} else {
				returnList = [...returnList, ...getSortOptions(option)];
			}
		}
		return adjustSortPriority(returnList);
	});
});

export const secFilters = derived(secFiltersStore, ($secFiltersStore) =>
	$secFiltersStore.reduce((acc, { key, list }) => {
		acc[key] = createSecFilterFunction(list);
		return acc;
	}, {})
);

export const sortFunction = derived([sortOptions, secFilters], ([$sortOptions, $secFilters]) => {
	return (a, b) => {
		//filter out unselected options and sort by priority
		const sortedArr = Array.from($sortOptions.filter((ele) => ele.order)).sort(
			(a, b) => a.priority - b.priority
		);
		const values = sortedArr.map(({ key, subKey, order }) => {
			switch (key) {
				case 'rarity':
					return a[key].localeCompare(b[key]) * order;
				case 'profession':
					return (professionWeights[a[key]] - professionWeights[b[key]]) * order;
				case 'release_time':
					return (a[key] - b[key]) * order;
				default:
					const valA = getMaxValue(a, key, subKey ?? 'value', $secFilters[key]);
					const valB = getMaxValue(b, key, subKey ?? 'value', $secFilters[key]);
					return (valA - valB) * order;
			}
		});
		return values.length > 0 ? values.reduce((acc, curr) => acc || curr) : 0;
	};
});

export const filterDescStore = derived(
	[filtersStore, relicFiltersStore, filterModeStore, rogueTopic],
	([$filtersStore, $relicFiltersStore, $filterModeStore, $rogueTopic]) => {
		const activeOptions = $filtersStore.filter(({ options }) =>
			options.some((val) => val.selected)
		);
		const relicActiveOptions = $relicFiltersStore
			.map((option) => option.selected && option.id)
			.filter(Boolean);
		return {
			activeOptions,
			relicActiveOptions,
			filterMode: $filterModeStore,
			rogueTopic: $rogueTopic
		};
	}
);

export const selectedChara = writable(null);
export const moduleIndex = writable(0);

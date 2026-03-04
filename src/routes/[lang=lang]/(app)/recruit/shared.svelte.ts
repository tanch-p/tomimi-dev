import { getLocalStorage } from "$lib/functions/lib";
import filterOptions from "$lib/data/chara/filter_options.json";
import {
	addOptionsToAcc,
	getMaxValue,
	getSecFilterOptions,
	professionWeights,
	getSortOptions,
	// createStrictFilterFunction,
	// createNormalFilterFunction,
	// createSecFilterFunction,
} from "$lib/functions/chara/charaHelpers";
import secFiltersTable from "$lib/data/chara/sec_filters.json";
import { SvelteMap } from "svelte/reactivity";

export const releaseStatus = $state({
	value: getLocalStorage("releaseStatus", "cn"),
});
export const filterMode = $state({
	value: getLocalStorage("filterMode", "AND"),
});
type Option<T = string | number | null> = {
	value: T;
	selected: boolean;
};

type FilterGroup = {
	key: string;
	options: Option[];
};
const rawFilters: FilterGroup[] = Object.keys(filterOptions).reduce(
	(acc, category) => {
		switch (category) {
			case "rarity":
			case "blockCnt":
			case "profession":
			case "group":
				acc.push({
					key: category,
					options: filterOptions[category].map((value) => {
						return { value, selected: false };
					}),
				});
				break;
			case "subProfessionId":
				acc.push({
					key: category,
					options: Object.keys(filterOptions[category])
						.reduce((acc, subKey) => {
							acc.push(
								filterOptions[category][subKey].map((value) => {
									return { value, selected: false };
								}),
							);
							return acc;
						}, [])
						.flat(2),
				});
				break;
			case "spType":
			case "deployable_tile":
				acc.push({
					key: category,
					options: filterOptions[category].map((value) => {
						return { value, selected: false };
					}),
				});
				break;
			default:
				addOptionsToAcc(acc, filterOptions[category]);
				break;
		}
		return acc;
	},
	[],
);

type FilterKey =
	| "rarity"
	| "deployable_tile"
	| "blackboard"
	| "tags"
	| "blockCnt"
	| "profession"
	| "subProfessionId"
	| "group"
	| "spType";

export const filtersStore = $state<Record<FilterKey, Option[]>>(
	Object.fromEntries(rawFilters.map((group) => [group.key, group.options])),
);

export function toggleFilterOption(
	groupKey: keyof typeof filtersStore,
	value: string,
) {
	const group = filtersStore[groupKey];
	const option = group.find((o) => o.value === value);
	if (option) {
		option.selected = !option.selected;
	}
	if (option?.selected) {
		switch (groupKey) {
			case "blackboard":
				addSortOption(option.value);
			case "blockCnt":
			case "spType":
				break;
		}
	} else {
		removeSortOption(option.value);
	}
}

export function resetFilters() {
	for (const groupKey in filtersStore) {
		for (const option of filtersStore[groupKey]) {
			option.selected = false;
		}
	}
	resetSortOptions();
}

const adjustSortPriority = () => {
	const adjustedPriorities = sortOptions
		.filter((ele) => ele.priority)
		.sort((a, b) => a.priority - b.priority)
		.reduce((acc, { key }, i) => {
			acc[key] = i + 1;
			return acc;
		}, {});
	return sortOptions.map(({ key, subKey, suffix, order, priority }) => {
		return {
			key,
			subKey,
			suffix,
			order,
			priority: priority ? adjustedPriorities[key] : null,
		};
	});
};

function addSortOption(optionKey: string) {
	const newOptions = getSortOptions(optionKey);
	sortOptions.push(...newOptions);
}

function removeSortOption(optionKey: string) {
	const indexes = [];
	sortOptions.forEach(({ key }, i) => key === optionKey && indexes.push(i));
	for (const index of indexes) {
		sortOptions.splice(index, 1);
	}
}

const secFilters = $state({});

// const secFilters = $derived.by(() => {
// 	const result = [];

// 	for (const option of [...activeOptions, ...spTypeOptions]) {
// 		const secOptions = getSecFilterOptions(option, secFiltersTable);

// 		if (secOptions?.length > 0) {
// 			result.push({
// 				key: option,
// 				list: secOptions.map((ele) => {
// 					if (ele.type === "options") {
// 						return {
// 							...ele,
// 							options: ele.options?.map((value) => ({
// 								value,
// 								selected: false,
// 							})),
// 						};
// 					}
// 					return ele;
// 				}),
// 			});
// 		}
// 	}

// 	return result;
// });

type SortOrder = -1 | 0 | 1;

interface SortOption {
	key: string;
	subKey: string | null;
	suffix: string | null;
	order: SortOrder;
	priority: number | null;
}

const defaultSortOptions = [
	{ key: "release_time", subKey: null, suffix: null, order: -1, priority: 1 },
	{ key: "rarity", subKey: null, suffix: null, order: -1, priority: 2 },
	{ key: "profession", subKey: null, suffix: null, order: 0, priority: null },
];

// export const sortOptions = $state(defaultSortOptions);

export const sortOptions = new SvelteMap();
for (const { key, subKey, suffix, order, priority } of defaultSortOptions) {
	const state = $state([{ subKey, suffix, order, priority }]);
	sortOptions.set(key, state);
}

export const resetSortOptions = () => {
	sortOptions.forEach((ele) => {
		ele.order = 0;
		ele.priority = null;
	});
};

const getActiveSortOptionsLength = () => {
	return Array.from(sortOptions.values())
		.flat(2)
		.filter((option) => option.order !== 0).length;
};

const updateSortPriority = (index) => {
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

export const toggleSortOptions = (key, subIndex, order: SortOrder) => {
	const value = sortOptions.get(key);
	if (value[subIndex].order === order) {
		value[subIndex].order = 0;
		updateSortPriority(index);
	} else {
		value[subIndex].order = order;
		if (!value[subIndex].priority) {
			value[subIndex].priority = getActiveSortOptionsLength();
		}
	}
	sortOptions.set(key, value);
	// const index = sortOptions.findIndex(
	// 	(ele) => ele.key === key && ele.subKey === subKey,
	// );
	// if (index !== -1) {
	// if (sortOptions[index].order === order) {
	// 	sortOptions[index].order = 0;
	// 	updateSortPriority(index);
	// } else {
	// 	sortOptions[index].order = order;
	// 	if (!sortOptions[index].priority) {
	// 		sortOptions[index].priority = sortOptions.filter(
	// 			(ele) => ele.order !== 0,
	// 		).length;
	// 	}
	// }
};

// const sortOptions = $derived.by(() => {
// 	const result: SortOption[] = [];

// 	// base sorts
// 	for (const key of BASE_SORT_KEYS) {
// 		result.push({
// 			key,
// 			subKey: null,
// 			suffix: null,
// 			order: key === "profession" ? 0 : -1,
// 			priority: null,
// 		});
// 	}

// 	// dynamic sorts
// 	for (const option of activeOptions) {
// 		if (!BASE_SORT_KEYS.has(option)) {
// 			result.push(...getSortOptions(option));
// 		}
// 	}

// 	return adjustSortPriority(result);
// });

export const getSortOption = () => {
	return sortOptions;
};

// const activeSortRules = $derived.by(() => {
// 	return sortOptions
// 		.filter((opt) => opt.order !== 0)
// 		.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0));
// });
// const _sortFunction = $derived.by(() => {
// 	const compiled = activeSortRules.map((rule) => {
// 		const { key, subKey, order } = rule;

// 		switch (key) {
// 			case "rarity":
// 				return (a, b) => a[key].localeCompare(b[key]) * order;

// 			case "profession":
// 				return (a, b) =>
// 					(professionWeights[a[key]] - professionWeights[b[key]]) * order;

// 			case "release_time":
// 				return (a, b) => (a[key] - b[key]) * order;

// 			default:
// 				return (a, b) =>
// 					(getMaxValue(a, key, subKey ?? "value", secFilters[key]) -
// 						getMaxValue(b, key, subKey ?? "value", secFilters[key])) *
// 					order;
// 		}
// 	});

// 	return (a, b) => {
// 		for (const fn of compiled) {
// 			const result = fn(a, b);
// 			if (result !== 0) return result;
// 		}
// 		return 0;
// 	};
// });
export function getSortFunction() {
	return () => {};
}

import filterOptions from '$lib/data/chara/filter_options.json';
import relics from '$lib/data/chara/relics_chara.json';
import secFiltersTable from '$lib/data/chara/sec_filters.json';

import { buildFilterContext, matchesFilters } from './filters.svelte';
import { buildSecFilters } from './sec-filters.svelte';
import { buildSortOptions, createSortFunction } from './sort.svelte';

export const filters = $state(generateFilterStore(filterOptions));
export const secFilters = $state([]);
export const sortOptions = $state(defaultSortOptions);

export const filterContext = $derived(() =>
	buildFilterContext({
		filters,
		relicFilters,
		relics,
		rogueTopic,
		secFilters,
		filterMode
	})
);

export const sortFunction = $derived(() =>
	createSortFunction(sortOptions, secFilters)
);

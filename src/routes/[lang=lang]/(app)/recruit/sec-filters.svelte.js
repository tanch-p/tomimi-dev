import { getSecFilterOptions } from '$lib/functions/chara/charaHelpers';

export function buildSecFilters({
	filters,
	existing,
	secFiltersTable
}) {
	const active = [];

	for (const { key, options } of filters) {
		if (options.some((o) => o.selected)) {
			active.push(key);
		}
	}

	const result = [];

	for (const key of active) {
		const existingEntry = existing.find((e) => e.key === key);
		if (existingEntry) {
			result.push(existingEntry);
		} else {
			const options = getSecFilterOptions(key, secFiltersTable);
			if (options?.length) {
				result.push({ key, list: options });
			}
		}
	}

	return result;
}

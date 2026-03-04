import {
	createStrictFilterFunction,
	createNormalFilterFunction
} from '$lib/functions/chara/charaHelpers';

export function buildFilterContext({
	filters,
	relicFilters,
	relics,
	rogueTopic,
	secFilters,
	filterMode
}) {
	const bbTagHolder = [];
	const functions = [];

	// relic filters
	for (const option of relicFilters.filter((o) => o.selected)) {
		const relic = relics[rogueTopic].find((r) => r.id === option.id);
		if (!relic) continue;

		if (relic.tag) {
			bbTagHolder.push({ key: relic.tag, type: 'tags' });
			continue;
		}

		if (relic.subProfessionId) {
			functions.push((char) =>
				relic.subProfessionId.includes(char.subProfessionId)
			);
			continue;
		}

		if (relic.id === 'rogue_4_relic_explore_6') {
			functions.push((char) =>
				char.rarity === 'TIER_6' &&
				!['aoesniper', 'phalanx'].includes(char.subProfessionId)
			);
		}
	}

	// option filters
	for (const group of filters) {
		const selected = group.options
			.filter((o) => o.selected)
			.map((o) => o.value);

		if (!selected.length) continue;

		switch (group.key) {
			case 'group':
				functions.push((char) =>
					selected.some((g) => char?.powers?.includes(g))
				);
				break;
			default:
				functions.push((char) => selected.includes(char[group.key]));
		}
	}

	const gate =
		filterMode === 'OR' || filterMode === 'AND'
			? createNormalFilterFunction(
					bbTagHolder,
					secFilters,
					filterMode
			  )
			: createStrictFilterFunction(bbTagHolder, secFilters);

	return {
		functions: [gate, ...functions]
	};
}

export function matchesFilters(ctx, char) {
	for (const fn of ctx.functions) {
		if (!fn(char)) return false;
	}
	return true;
}

import type { MapConfig } from '$lib/types';
import type { Contracts } from '$lib/functions/recalRune';
import { initContracts } from '$lib/functions/recalRune';
import { writable, derived } from 'svelte/store';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { consolidateOtherMods } from '$lib/functions/buffHelpers';
import { consolidateMods } from '$lib/functions/recalRune';

export function createRecalRuneStores(mapConfig: MapConfig) {
	const allMods = writable<MapConfig['n_mods']>(null);
	const eliteMode = writable(false);
	const runes = writable<MapConfig['n_mods']>(null);
	const selectedRelics = writable<any[]>([]);
	const otherBuffsList = writable<any[]>([]);
	const otherMods = derived([otherBuffsList], ([$otherBuffsList]) =>
		consolidateOtherMods($otherBuffsList)
	);

	const contracts = writable<Contracts | null>(null);

	const contractMods = derived([contracts], ([$contracts]) => consolidateMods($contracts));

	const statMods = derived(
		[eliteMode, runes, allMods, contractMods, otherMods],
		([$eliteMode, $runes, $allMods, $contractMods, $otherMods]) => {
			return {
				runes: {
					key: $eliteMode ? 'elite_ops' : 'combat_ops',
					mods: [$runes, $allMods]
				},
				diff: null,
				others: [...$contractMods, ...$otherMods]
			};
		}
	);

	const specialMods = derived([runes, allMods, contractMods], ([$runes, $allMods, $contractMods]) =>
		compileSpecialMods([$runes, $allMods, ...$contractMods.flatMap((ele) => ele.mods)])
	);

	initContracts(contracts, mapConfig);
	runes.set(mapConfig.n_mods);
	allMods.set(mapConfig.all_mods);
	return {
		allMods,
		eliteMode,
		runes,
		selectedRelics,
		otherBuffsList,
		contracts,
		statMods,
		specialMods
	};
}

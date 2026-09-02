import { writable, derived } from 'svelte/store';
import difficultyModsList from '$lib/data/is/sami/difficulty_mods_sami.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { consolidateOtherMods } from '$lib/functions/buffHelpers';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('sami_difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const difficulty = writable(storedDifficulty);

export const selectedFloor = writable(1);
const floorDifficultyMods = derived(
	[selectedFloor, difficulty],
	([$selectedFloor, $difficulty]) => [
		{
			targets: ['ALL'],
			mods: [
				{
					key: 'hp',
					value: (1 + difficultyModsList[$difficulty]?.floorBuff) ** $selectedFloor,
					mode: 'mul'
				},
				{
					key: 'atk',
					value: (1 + difficultyModsList[$difficulty]?.floorBuff) ** $selectedFloor,
					mode: 'mul'
				}
			]
		}
	]
);
export const eliteMode = writable(false);
export const allMods = writable(null);
export const activeChaosEffects = writable([]);
export const portalMods = writable(null);
const difficultyMods = derived([difficulty], ([$difficulty]) =>
	difficultyModsList
		.map((ele) => {
			if (ele.difficulty <= $difficulty && ele.effects.length > 0) {
				return ele.effects;
			}
		})
		.filter(Boolean)
);
export const otherBuffsList = writable([]);
const otherMods = derived([otherBuffsList], ([$otherBuffsList]) =>
	consolidateOtherMods($otherBuffsList)
);

//elite or normal mods
export const runes = writable(null);

export const statMods = derived(
	[
		eliteMode,
		runes,
		selectedRelics,
		floorDifficultyMods,
		activeChaosEffects,
		portalMods,
		difficultyMods,
		otherMods,
		allMods
	],
	([
		$eliteMode,
		$runes,
		$selectedRelics,
		$floorDifficultyMods,
		$activeChaosEffects,
		$portalMods,
		$difficultyMods,
		$otherMods,
		$allMods
	]) => {
		const relicMods = $selectedRelics.map((relic) => {
			return {
				key: relic.id,
				mods: [relic.effects]
			};
		});
		return {
			runes: { key: $eliteMode ? 'elite_ops' : 'combat_ops', mods: [$runes, $allMods] },
			diff: { key: 'difficulty', mods: $difficultyMods, stackType: 'add' },
			others: [
				{ key: 'floor_diff', mods: [$floorDifficultyMods] },
				{
					key: 'sami_chaos',
					mods: $activeChaosEffects.map((ele) => ele.effects)
				},
				{ key: 'sami_portal', mods: [$portalMods] },
				...relicMods,
				...$otherMods
			]
		};
	}
);

// SAMI Diff Mods are added internally before being added to final calculation

export const specialMods = derived(
	[runes, allMods, selectedRelics],
	([$runes, $allMods, $selectedRelics]) =>
		compileSpecialMods(
			[$runes, $allMods],
			$selectedRelics.map((relic) => relic.effects)
		)
);

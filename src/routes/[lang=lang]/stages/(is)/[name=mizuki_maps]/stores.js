import { writable, derived } from 'svelte/store';
import difficultyModsList from '$lib/data/is/mizuki/difficulty_mods_mizuki.json';
import { browser } from '$app/environment';
import { cookiesEnabled } from '../../../../stores';
import { compileSpecialMods } from '$lib/functions/statHelpers';
import { consolidateOtherMods } from '$lib/functions/buffHelpers';

let storedDifficulty = 0;
if (browser && cookiesEnabled) {
	storedDifficulty = parseInt(localStorage.getItem('difficulty') ?? '0');
}
export const selectedRelics = writable([]);
export const difficulty = writable(storedDifficulty);
const difficultyMods = derived([difficulty], ([$difficulty]) =>
	difficultyModsList
		.map((ele) => {
			if (ele.difficulty <= $difficulty && ele.effects.length > 0) {
				return ele.effects;
			}
		})
		.filter(Boolean)
);
export const selectedFloor = writable(1);
const floorDifficultyMods = derived(
	[selectedFloor, difficulty],
	([$selectedFloor, $difficulty]) => {
		const floorBuff = difficultyModsList[$difficulty].floorBuff;
		return [
			{
				targets: ['ALL'],
				mods: [
					{
						key: 'hp',
						value: floorBuff.hp ** $selectedFloor,
						mode: 'mul'
					},
					{
						key: 'atk',
						value: floorBuff.atk ** $selectedFloor,
						mode: 'mul'
					}
				]
			}
		];
	}
);
export const eliteMode = writable(false);
export const runes = writable(null);
export const allMods = writable(null);
export const activeFloorEffects = writable([]);
export const missionMods = writable(null);
export const otherBuffsList = writable([]);
const otherMods = derived([otherBuffsList], ([$otherBuffsList]) =>
	consolidateOtherMods($otherBuffsList)
);

export const statMods = derived(
	[
		selectedRelics,
		floorDifficultyMods,
		eliteMode,
		runes,
		activeFloorEffects,
		missionMods,
		difficultyMods,
		otherMods,
		allMods
	],
	([
		$selectedRelics,
		$floorDifficultyMods,
		$eliteMode,
		$runes,
		$activeFloorEffects,
		$missionMods,
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
			diff: { key: 'difficulty', mods: $difficultyMods, stackType: 'mul' },
			others: [
				{ key: 'floor_diff', mods: [$floorDifficultyMods] },
				{
					key: 'mizuki_seaborn_call',
					mods: $activeFloorEffects.map((ele) => ele.effects),
					operation: 'times'
				},
				{ key: 'mizuki_mission', mods: [$missionMods], operation: 'times' },
				...relicMods,
				...$otherMods
			]
		};
	}
);

export const specialMods = derived(
	[selectedRelics, runes, allMods],
	([$selectedRelics, $runes, $allMods]) =>
		compileSpecialMods(
			$selectedRelics.map((relic) => relic.effects),
			[$runes, $allMods]
		)
);

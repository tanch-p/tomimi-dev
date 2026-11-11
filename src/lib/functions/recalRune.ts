import type { Effects, Language, MapConfig, ModGroup } from '$lib/types';
import type { Writable } from 'svelte/store';

type LocalizedText = Record<Language, string | null>;

export interface CrisisRune {
	runeId: string;
	score: number;
	sortId: number;
	essential: boolean;
	exclusiveGroupId: string | null;
	runeIcon: string | null;
	description: LocalizedText;
	mods: Effects;
	selected?: boolean;
}

export interface Crisis {
	fixedRuneSeriesName: LocalizedText;
	runes: CrisisRune[];
}

interface RuneGroup {
	nullGroup: CrisisRune[];
	exclusiveGroups: Record<string, CrisisRune[]>;
}

export interface Contracts {
	base: RuneGroup;
	others: RuneGroup;
}

export function splitRunesData(runes: CrisisRune[]): Contracts {
	return {
		base: groupByExclusiveGroupId(runes.filter((rune) => rune.score === 0)),
		others: groupByExclusiveGroupId(runes.filter((rune) => rune.score > 0))
	};
}

function groupByExclusiveGroupId(runes: CrisisRune[]): RuneGroup {
	const groups: RuneGroup = { nullGroup: [], exclusiveGroups: {} };
	for (const rune of runes) {
		if (rune.exclusiveGroupId === null) {
			groups.nullGroup.push(rune);
		} else {
			(groups.exclusiveGroups[rune.exclusiveGroupId] ??= []).push(rune);
		}
	}
	return groups;
}

export function initContracts(contracts: Writable<Contracts | null>, mapConfig: MapConfig) {
	const crisis = mapConfig.systems?.crisis;
	contracts.set(crisis ? clearContracts(splitRunesData(crisis.runes)) : null);
}

export function updateContracts(
	contracts: Contracts | null,
	type: keyof Contracts,
	groupId: string | null,
	runeId: string
) {
	if (!contracts) return null;
	const holder = structuredClone(contracts);
	const group = groupId === null ? holder[type].nullGroup : holder[type].exclusiveGroups[groupId];
	const selectedRune = group?.find((rune) => rune.runeId === runeId);
	if (!selectedRune) return holder;
	selectedRune.selected = !selectedRune.selected;
	if (groupId !== null) {
		for (const rune of group) {
			if (rune !== selectedRune) rune.selected = false;
		}
	}
	return holder;
}

export function clearContracts(contracts: Contracts | null): Contracts | null {
	if (!contracts) return null;
	const holder = structuredClone(contracts);
	holder.base.nullGroup.forEach((rune) => (rune.selected = true));
	Object.values(holder.base.exclusiveGroups).forEach((runes) =>
		runes.forEach((rune, i) => (rune.selected = i === 0))
	);
	holder.others.nullGroup.forEach((rune) => (rune.selected = false));
	Object.values(holder.others.exclusiveGroups).forEach((runes) =>
		runes.forEach((rune) => (rune.selected = false))
	);
	return holder;
}

export function getScore(contracts: Contracts | null): number {
	if (!contracts) return 0;
	return [contracts.others.nullGroup, ...Object.values(contracts.others.exclusiveGroups)]
		.flat()
		.reduce((score, rune) => score + (rune.selected ? rune.score : 0), 0);
}

export function consolidateMods(contracts: Contracts | null): ModGroup[] {
	if (!contracts) return [];
	return [contracts.base, contracts.others].flatMap((group) =>
		[group.nullGroup, ...Object.values(group.exclusiveGroups)]
			.flat()
			.filter((rune) => rune.selected && rune.mods?.length > 0)
			.map((rune) => ({ key: 'recalrune_' + rune.runeId, mods: [rune.mods] }))
	);
}

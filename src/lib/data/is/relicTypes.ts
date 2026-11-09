import type { Language } from '$lib/types';

export type RelicText = Partial<Record<Language, string>> & { zh: string };

export interface RelicEffect {
	targets: string[];
	conditions?: string[];
	mods?: {
		key: string;
		/** `rune` joins the stage-rune calculation; omitted values use the ordinary phase. */
		type?: string;
		value: number;
		mode?: string;
		order?: string;
		name?: string;
		valueStr?: string;
	}[];
	special?: Record<string, unknown>;
}

export interface RelicStage {
	suffix: string;
	effects: RelicEffect[];
}

export interface RelicDefinition {
	id: string;
	name: RelicText;
	tooltip: RelicText;
	effects: RelicEffect[];
	stages?: RelicStage[];
}

export interface RelicSelection {
	readonly id: string;
	readonly stageIndex: number;
}

export type ResolvedRelic = RelicDefinition & RelicSelection & { stage: RelicStage };

export function getRelicStages(relic: RelicDefinition): readonly RelicStage[] {
	return relic.stages ?? [{ suffix: '', effects: relic.effects }];
}

export function getRelicText(text: RelicText, language: Language): string {
	return text[language] || text.zh;
}

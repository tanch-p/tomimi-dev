import type { RogueTopic } from '$lib/types';
import type { RelicDefinition } from './relicTypes';
import mizuki from './mizuki/relics_mizuki.json';
import phantom from './phantom/relics_phantom.json';
import phantomHard from './phantom/relics_phantom_hard.json';
import sami from './sami/relics_sami.json';
import sarkaz from './sarkaz/relics_sarkaz.json';
import sui from './sui/relics_sui.json';
import black from './black/relics.json';

export const relicCatalogs: Record<NonNullable<RogueTopic>, readonly RelicDefinition[]> = {
	rogue_phantom: phantom,
	rogue_mizuki: mizuki,
	rogue_sami: sami,
	rogue_skz: sarkaz,
	rogue_yan: sui,
	rogue_black: black
};

export const phantomHardRelics: readonly RelicDefinition[] = phantomHard;

export type Language = 'zh' | 'ja' | 'en';
export type RogueTopic =
	| 'rogue_phantom'
	| 'rogue_mizuki'
	| 'rogue_sami'
	| 'rogue_skz'
	| 'rogue_yan'
	| null;
export type StatKey =
	| 'hp'
	| 'atk'
	| 'def'
	| 'res'
	| 'aspd'
	| 'atk_interval'
	| 'range'
	| 'weight'
	| 'lifepoint'
	| 'ms'
	| 'eleRes'
	| 'eleDmgRes'
	| 'dmgRes';
export type Stats = {
	hp: number;
	atk: number;
	def: number;
	res: number;
	aspd: number;
	range: number;
	weight: number;
	lifepoint: number;
	ms: number;
	eleRes: number;
	eleDmgRes: number;
	dmgRes?: number;
};
type EnemyDBStats = {
	hp: number;
	atk: number;
	def: number;
	res: number;
	aspd: number;
	range: number;
	weight: number;
	lifepoint: number;
	ms: number;
	eleRes: number;
	eleDmgRes: number;
	traits: Skill[];
	special: [Skill[]];
	form_mods?: Mod[];
};
export type StatusImmune =
	| 'stun'
	| 'silence'
	| 'freeze'
	| 'sleep'
	| 'levitate'
	| 'disarmCombat'
	| 'fear'
	| 'palsy';
type AttackType = 'no_attack' | 'melee' | 'ranged';
type AttackAttribute = 'phys' | 'arts' | 'true' | 'heal';
type EnemyType =
	| 'NORMAL'
	| 'ELITE'
	| 'BOSS'
	| 'melee'
	| 'ranged'
	| 'no_attack'
	| 'infection'
	| 'drone'
	| 'flying'
	| 'seamonster'
	| 'sarkaz'
	| 'originiumartscraft'
	| 'animated'
	| 'mutant'
	| 'machine'
	| 'wildanimal'
	| 'collapsal';

export type EnemyFormType = {
	title: string | null;
	normal_attack: {
		atk_type: [AttackType, AttackAttribute];
		hits: number;
	};
	status_immune: StatusImmune[];
	stats: Stats;
	special: Skill[];
};

type EnemyDBFormType = {
	title: string | null;
	normal_attack: {
		atk_type: [AttackType, AttackAttribute];
		hits: number;
	};
	status_immune: StatusImmune[];
};

// used in all stages and stat display
export type Enemy = {
	[key in `name_${Language}`]: string;
} & {
	id: string;
	key: string;
	stageId: string;
	level: number;
	forms: EnemyFormType[];
	traits: Skill[]; //traits = active throughout all enemy forms
	type: EnemyType[];
	modsList: [ModGroup[]];
	overwritten?: true | false;
	stats: EnemyDBStats[];
};

export type EnemyDBEntry = {
	[key in `name_${Language}`]: string;
} & {
	id: string;
	key: string;
	stageId: string;
	level: number;
	stats: EnemyDBStats[];
	forms: EnemyDBFormType[];
	type: EnemyType[];
	overwritten?: true | false;
};

export interface Trap {
	key: string;
	stageId: string;
	name: string;
	desc: string;
	group: "enemy"|"ally";
	tauntLevel: number;
	mainSkillLvl: number;
	modelType: string;
	hideTile: boolean;
	stats: trapStats;
	talents: [];
	skills: [];
	status_immune: StatusImmune[];
	modsList: [ModGroup[]];
}
export interface TrapData {
	name_zh: string;
	name_ja: string;
	name_en: string;
	desc_zh: string;
	desc_ja: string;
	desc_en: string;
	stats: trapStats[];
	special: string[];
	status_immune: StatusImmune[];
}
type trapStats = {
	hp: number;
	atk: number;
	def: number;
	res: number;
	blockCnt: number;
	aspd: number;
	rangeId: string | null;
	dmgRes: number;
};

type overwrittenData = {
	[key: string]: number;
};

type MapConfigEnemy = {
	id: string;
	prefabKey: string;
	level: number;
	overwrittenData: overwrittenData;
};

export interface MapConfig {
	id: string;
	levelId: string;
	tags: string[];
	initialCost: number;
	maxCost: number;
	costIncreaseTime: number;
	floors: number[] | null;
	routes: [] | null;
	code: string;
	[key: `name_${string}`]: string;
	[key: `description_${string}`]: string;
	[key: `eliteDesc_${string}`]: string;
	all_mods: Effects | null;
	n_mods: Effects | null;
	elite_mods: Effects | null;
	traps: MapConfigTrap[];
	token_cards: [];
	systems: {
		level_predefine_tokens_random_spawn_on_tile?: NonNullable<unknown>;
	};
	enemies: MapConfigEnemy[];
	sp_terrain: [];
}

export type MapConfigTrap = {
	key: string;
	alias: string;
	pos: Position;
	direction: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
	level: number;
	mainSkillLvl: number;
	hidden: boolean;
	overrideSkillBlackboard: object[] | null;
};

export type Position = {
	row: number;
	col: number;
};

export type StatMods = {
	runes: ModGroup;
	diff: ModGroup | null;
	others: ModGroup[];
};

export type ModGroup = {
	key: string;
	mods: [Effects];
	stackType?: 'mul' | 'add';
};

export type SpecialMods = {
	[key: string]: SpecialMod;
};
export type Effects = [{ targets: string[]; mods: Mod[]; special: SpecialMod }];
type SpecialMod =
	| {
			[key: string]: Skill;
	  }
	| { status_immune?: StatusImmune[] };

export type Mod = {
	key: string;
	order: 'initial' | 'final';
	mode: 'mul' | 'add' | 'set';
	name?: string;
	value: number;
};

export type Skill = {
	[key in StatKey]: SkillMod;
} & {
	key: string;
	type?: 'skill' | 'buff' | undefined;
	remove?: boolean;
	value?: number;
	buffloss?: boolean; //for enemies that lose buffs upon death
	initCooldown?: number;
	cooldown?: number;
	initSp?: number;
	spCost?: number;
	duration?: number;
	skillRange?: number;
	skillType?: 'INCREASE_WITH_TIME' | 'INCREASE_WHEN_ATTACK';
	needTarget?: boolean;
	can_silence?: boolean;
	dmg_element?: 'phys' | 'arts' | 'true' | 'heal';
	suffix?: Tooltip;
	hits?: number;
	spineState?: number;
	tooltip: Tooltip | null;
};

type SkillMod = {
	value?: number; //set value type i.e. Pompeii's explosion
	multiplier?: number;
	fixed?: number;
	order?: 'initial' | 'final';
};

type Tooltip = {
	zh: [string];
	ja: [string];
	en: [string];
};
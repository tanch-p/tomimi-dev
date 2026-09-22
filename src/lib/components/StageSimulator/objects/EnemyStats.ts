import type { Enemy, EnemyDBEntry, Mod, ModGroup, SpecialMods, StatMods } from '$lib/types';
import { EMPTY_STAT_MODS, parseStats } from '$lib/functions/statHelpers';

export type EnemyFormStats = Enemy['forms'][number]['stats'];
type StatsChangedHandler = (previous: EnemyFormStats, current: EnemyFormStats) => void;

export function preserveHpPercentage(currentHp: number, previousMaxHp: number, nextMaxHp: number) {
	if (!Number.isFinite(currentHp) || previousMaxHp <= 0) return currentHp;
	return Math.max(0, Math.min(nextMaxHp, (currentHp / previousMaxHp) * nextMaxHp));
}

export type RuntimeStatModifierInput = {
	source: string;
	mods: Mod[];
	duration?: number | null;
	stacks?: number;
	maxStacks?: number;
	stackType?: NonNullable<ModGroup['stackType']>;
};

export type RuntimeStatModifier = Required<
	Omit<RuntimeStatModifierInput, 'duration' | 'stacks' | 'maxStacks' | 'stackType'>
> & {
	handle: string;
	duration: number | null;
	remainingDuration: number | null;
	stacks: number;
	maxStacks: number;
	stackType: NonNullable<ModGroup['stackType']>;
};

export type EnemyStatsData = {
	nextModifierId: number;
	modifiers: RuntimeStatModifier[];
};

/** Owns the effective stats for one simulated enemy instance. */
export class EnemyStats {
	private formIndex: number;
	private currentStats: EnemyFormStats;
	private runtimeModifiers = new Map<string, RuntimeStatModifier>();
	private nextModifierId = 1;

	constructor(
		private readonly definition: Enemy,
		private readonly persistentModifiers: StatMods = EMPTY_STAT_MODS,
		private readonly specialMods: SpecialMods = {},
		formIndex = 0,
		private readonly onStatsChanged?: StatsChangedHandler
	) {
		this.formIndex = formIndex;
		this.currentStats = this.calculate(formIndex);
	}

	get current() {
		return this.currentStats;
	}

	get currentFormIndex() {
		return this.formIndex;
	}

	get<K extends keyof EnemyFormStats>(key: K): EnemyFormStats[K] {
		return this.currentStats[key];
	}

	get activeModifiers(): RuntimeStatModifier[] {
		return structuredClone([...this.runtimeModifiers.values()]);
	}

	hasModifier(handle: string) {
		return this.runtimeModifiers.has(handle);
	}

	getModifierHandlesBySourcePrefix(prefix: string) {
		return [...this.runtimeModifiers.values()]
			.filter((modifier) => modifier.source.startsWith(prefix))
			.map(({ handle, source }) => ({ handle, source }));
	}

	getRuntimeModifierStacks(source: string) {
		let stacks = 0;
		for (const modifier of this.runtimeModifiers.values()) {
			if (modifier.source === source) stacks += modifier.stacks;
		}
		return stacks;
	}

	hasRuntimeStatIncrease(key: keyof EnemyFormStats) {
		const currentValue = this.currentStats[key];
		if (typeof currentValue !== 'number') return false;
		for (const modifier of this.runtimeModifiers.values()) {
			if (!modifier.mods.some((mod) => mod.key === key)) continue;
			const valueWithoutModifier = this.calculate(this.formIndex, modifier.handle)[key];
			if (typeof valueWithoutModifier === 'number' && currentValue > valueWithoutModifier) {
				return true;
			}
		}
		return false;
	}

	addModifier(input: RuntimeStatModifierInput) {
		const maxStacks = Math.max(1, Math.floor(input.maxStacks ?? Number.MAX_SAFE_INTEGER));
		const stacks = Math.max(0, Math.min(maxStacks, Math.floor(input.stacks ?? 1)));
		const duration = this.normalizeDuration(input.duration);
		const handle = `runtime-stat-${this.nextModifierId++}`;
		this.runtimeModifiers.set(handle, {
			handle,
			source: input.source,
			mods: structuredClone(input.mods),
			duration,
			remainingDuration: duration,
			stacks,
			maxStacks,
			stackType: input.stackType ?? 'mul'
		});
		this.recalculate();
		return handle;
	}

	removeModifier(handle: string) {
		const removed = this.runtimeModifiers.delete(handle);
		if (removed) this.recalculate();
		return removed;
	}

	removeModifiersBySource(source: string) {
		let removed = 0;
		for (const [handle, modifier] of this.runtimeModifiers) {
			if (modifier.source !== source) continue;
			this.runtimeModifiers.delete(handle);
			removed++;
		}
		if (removed) this.recalculate();
		return removed;
	}

	setModifierStacks(handle: string, stacks: number, refreshDuration = false) {
		const modifier = this.runtimeModifiers.get(handle);
		if (!modifier) return false;
		const nextStacks = Math.max(0, Math.min(modifier.maxStacks, Math.floor(stacks)));
		const durationChanged = refreshDuration && modifier.duration !== null;
		if (durationChanged) modifier.remainingDuration = modifier.duration;
		if (nextStacks === modifier.stacks) return durationChanged;
		modifier.stacks = nextStacks;
		this.recalculate();
		return true;
	}

	addModifierStacks(handle: string, stacks = 1, refreshDuration = true) {
		const modifier = this.runtimeModifiers.get(handle);
		if (!modifier) return false;
		return this.setModifierStacks(handle, modifier.stacks + stacks, refreshDuration);
	}

	refreshModifier(handle: string, duration?: number | null) {
		const modifier = this.runtimeModifiers.get(handle);
		if (!modifier) return false;
		if (duration !== undefined) modifier.duration = this.normalizeDuration(duration);
		modifier.remainingDuration = modifier.duration;
		return true;
	}

	/** Advances timed modifiers and returns the handles that expired this tick. */
	update(delta: number) {
		if (delta <= 0) return [];
		const expired: string[] = [];
		for (const [handle, modifier] of this.runtimeModifiers) {
			if (modifier.remainingDuration === null) continue;
			modifier.remainingDuration -= delta;
			if (modifier.remainingDuration <= 0) {
				this.runtimeModifiers.delete(handle);
				expired.push(handle);
			}
		}
		if (expired.length) this.recalculate();
		return expired;
	}

	clearRuntimeModifiers() {
		if (!this.runtimeModifiers.size) return;
		this.runtimeModifiers.clear();
		this.recalculate();
	}

	getData(): EnemyStatsData {
		return {
			nextModifierId: this.nextModifierId,
			modifiers: this.activeModifiers
		};
	}

	setData(data?: EnemyStatsData | null) {
		if (!data) return;
		this.nextModifierId = data.nextModifierId;
		this.runtimeModifiers = new Map(
			data.modifiers.map((modifier) => [
				modifier.handle,
				{
					...modifier,
					mods: modifier.mods.map((mod) => ({ ...mod }))
				}
			])
		);
		this.recalculate(false);
	}

	setFormIndex(formIndex: number) {
		if (formIndex === this.formIndex) return;
		this.formIndex = formIndex;
		this.recalculate();
	}

	private calculate(formIndex: number, excludedHandle?: string) {
		const runtimeGroups = [...this.runtimeModifiers.values()]
			.filter((modifier) => modifier.handle !== excludedHandle)
			.map((modifier) => this.toModGroup(modifier));
		const modifiers: StatMods = runtimeGroups.length
			? {
					...this.persistentModifiers,
					others: [...this.persistentModifiers.others, ...runtimeGroups]
				}
			: this.persistentModifiers;
		return parseStats(
			this.definition as unknown as EnemyDBEntry,
			modifiers,
			formIndex,
			this.specialMods,
			{ recordMods: false }
		) as EnemyFormStats;
	}

	private recalculate(notify = true) {
		const previousStats = this.currentStats;
		this.currentStats = this.calculate(this.formIndex);
		if (notify) this.onStatsChanged?.(previousStats, this.currentStats);
	}

	private toModGroup(modifier: RuntimeStatModifier): ModGroup {
		return {
			key: `runtime:${modifier.source}:${modifier.handle}`,
			stackType: modifier.stackType,
			mods: Array.from({ length: modifier.stacks }, () => [
				{
					targets: ['ALL'],
					mods: modifier.mods,
					special: {}
				}
			]) as ModGroup['mods']
		};
	}

	private normalizeDuration(duration?: number | null) {
		if (duration === undefined || duration === null) return null;
		return Math.max(0, duration);
	}
}

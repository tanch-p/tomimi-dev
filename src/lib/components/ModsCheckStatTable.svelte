<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Enemy, Language, Mod } from '$lib/types';
	import DraggableContainer from './DraggableContainer.svelte';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import aspdIcon from '$lib/images/is/aspd.webp';
	import msIcon from '$lib/images/is/movespeed.webp';
	import { round } from '$lib/functions/numberHelpers';
	import { getModdedStat } from '$lib/functions/statHelpers';
	import ModsCheckIcon from './ModsCheckIcon.svelte';

	const STATS_KEY_TABLE = {
		hp: 'hp',
		atk: 'atk',
		aspd: 'aspd',
		def: 'def',
		res: 'res',
		ms: 'ms'
	};

	const STATS_SORT_WEIGHTS = {
		hp: 0,
		atk: 1,
		aspd: 2,
		def: 3,
		res: 4,
		ms: 5
	};

	interface Props {
		language: Language;
		enemy: Enemy;
		formIndex: number;
	}

	let { language, enemy, formIndex }: Props = $props();

	let statIndex = $state(0);

	function getRunes(modsList, statKey) {
		const list = [];
		const runes = modsList.find((mod) => ['combat_ops', 'elite_ops'].includes(mod.key));
		if (runes) {
			for (const mod of runes.mods) {
				if (mod.key === statKey) {
					if (mod.contributions?.length && (mod.mode === 'add' || mod.order !== 'initial')) {
						list.push(
							...mod.contributions.map((part: NonNullable<Mod['contributions']>[number]) => ({
								...mod,
								...part
							}))
						);
					} else {
						list.push({ ...mod, sourceKeys: mod.sourceKeys ?? [runes.key] });
					}
				}
			}
		}
		return list;
	}
	function getOtherMods(modsList, statKey) {
		const initialAdd = [];
		const initialMul = [];
		const finalAdd = [];
		const finalMul = [];

		modsList
			.filter((mod) => !['combat_ops', 'elite_ops'].includes(mod.key))
			.forEach((ele) => {
				const mods = ele.mods.filter((mod) => mod.key === statKey);
				for (const { value, order = 'final', mode } of mods) {
					switch (mode) {
						case 'add':
							switch (order) {
								case 'initial':
									initialAdd.push({ key: ele.key, value });
									break;
								case 'final':
									finalAdd.push({ key: ele.key, value });
									break;
							}
							break;
						case 'mul':
							switch (order) {
								case 'initial':
									initialMul.push({ key: ele.key, value });
									break;
								case 'final':
									finalMul.push({ key: ele.key, value });
									break;
							}
							break;
					}
				}
			});
		return { initialAdd, initialMul, finalAdd, finalMul };
	}

	function getAtkIntervalMods(modsList) {
		const add = [];
		const mul = [];
		modsList.forEach((ele) => {
			const mods = ele.mods.filter((mod) => mod.key === 'atk_interval');
			for (const { value, mode } of mods) {
				switch (mode) {
					case 'add':
						add.push({ key: ele.key, value });
						break;
					case 'mul':
						mul.push({ key: ele.key, value });
						break;
				}
			}
		});
		return { add, mul };
	}

	function getImgSrc(key) {
		switch (key) {
			case 'attack_speed':
				return aspdIcon;
			case 'ms':
				return msIcon;
			default:
				return charaAssets[key];
		}
	}
	let statsToShow = $derived(
		enemy.modsList[formIndex]
			.reduce((acc, curr) => {
				for (const mod of curr.mods) {
					if (['range', 'dmg_res', 'weight'].includes(mod?.key)) continue;
					let key = mod?.key;
					if (key === 'atk_interval') {
						key = 'aspd';
					}
					if (!acc.includes(key)) {
						acc.push(key);
					}
				}
				return acc;
			}, [])
			.sort((a, b) => STATS_SORT_WEIGHTS[a] - STATS_SORT_WEIGHTS[b])
	);
	$effect(() => {
		if (formIndex > -1 || enemy) {
			if (!statsToShow[statIndex]) {
				statIndex = 0;
			}
		}
	});
	let statKey = $derived(statsToShow[statIndex]);
	let runeGroup = $derived(
		enemy.modsList[formIndex].find((mod) => ['combat_ops', 'elite_ops'].includes(mod.key))
	);
	let baseStat = $derived((enemy.stats as unknown as Record<string, number>)[statKey]);
	let runeStat = $derived.by(() => {
		if (!runeGroup || !statKey) return baseStat;
		const value = getModdedStat(baseStat, statKey, runeGroup);
		return statKey === 'aspd' ? value : round(value, ['ms', 'range'].includes(statKey) ? 2 : 0);
	});
	let runeMods = $derived(getRunes(enemy.modsList[formIndex], statKey));
	let runeAtkIntervalMods = $derived(getAtkIntervalMods(runeGroup ? [runeGroup] : []));
	let otherMods = $derived(getOtherMods(enemy.modsList[formIndex], statKey));
	let hasOtherMods = $derived(Object.values(otherMods).some((mods) => mods.length > 0));
	let atkIntervalMods = $derived(getAtkIntervalMods(enemy.modsList[formIndex]));
</script>

{#snippet runeTerm(value: number, mode: string, sourceKeys: string[])}
	<div class="inline-grid grid-rows-[auto_0px] justify-items-center mx-1">
		<span
			>&nbsp;{mode === 'mul' ? '× ' : mode === 'add' && value >= 0 ? '+' : ''}{round(value)}</span
		>
		<div class="flex gap-x-2 pt-1.5 text-xs">
			{#each sourceKeys as key}
				<ModsCheckIcon {formIndex} {enemy} {key} {language} inline />
			{/each}
		</div>
	</div>
{/snippet}

{#snippet runeModifier(mod: Mod)}
	{#if mod.mode === 'mul' && mod.order === 'initial' && mod.contributions && mod.contributions.length > 1}
		<span>&nbsp;× (1 +</span>
		{#each mod.contributions as part, i}
			{@render runeTerm(part.value, i === 0 ? '' : 'mul', part.sourceKeys)}
		{/each}
		<span>)</span>
	{:else}
		{@render runeTerm(
			mod.order === 'initial' && mod.mode === 'mul' ? 1 + mod.value : mod.value,
			mod.mode,
			mod.sourceKeys ?? []
		)}
	{/if}
{/snippet}

<div class="grid grid-cols-[auto_1fr] mt-2.5">
	<div class="border-r border-gray-500 pr-3 whitespace-nowrap">
		{#each statsToShow as key, i}
			<button
				class="flex items-center gap-x-1.5 px-2 py-1 text-start {statIndex === i
					? 'bg-neutral-200 dark:bg-neutral-500'
					: ''}"
				onclick={() => (statIndex = i)}
			>
				<img
					src={getImgSrc(STATS_KEY_TABLE[key])}
					width="16px"
					height="16px"
					alt=""
					class="shrink-0"
				/>
				{getTranslations(language).table_headers[STATS_KEY_TABLE[key]]}
			</button>
		{/each}
	</div>
	<div class="ml-3 overflow-hidden">
		<span class="text-gray-500 text-xs">※{getTranslations(language).mods_check_disclaimer}</span>
		<div class="flex items-center justify-center gap-x-1.5 px-2 py-1">
			<img
				src={getImgSrc(STATS_KEY_TABLE[statKey])}
				width="16px"
				height="16px"
				alt=""
				class="shrink-0"
			/>
			{getTranslations(language).table_headers[STATS_KEY_TABLE[[statKey]]]}
			{enemy.forms[formIndex].stats[statKey]}
		</div>
		{#if statKey !== 'aspd' && runeMods?.length > 0}
			<DraggableContainer className="h-full py-3 pl-3">
				<span class="text-xs md:text-base">{getTranslations(language).pre_combat_mods}</span>
				<div
					class="flex items-center justify-center w-max mx-auto pt-4 pb-12 whitespace-nowrap text-xl"
				>
					{#if statKey === 'aspd'}
						{baseStat}
						{#each runeAtkIntervalMods.add as { value }}
							<span>&nbsp;{value >= 0 ? '+' : ''}{value}</span>
						{/each}
						{#each runeAtkIntervalMods.mul as { value }}
							<span>&nbsp;× {round(value)}</span>
						{/each}
						<span>&nbsp;/ (</span>
					{/if}
					<div class="flex relative">
						<div class="relative inline-flex">
							<div class="absolute -top-[90%] left-1/2 -translate-x-1/2 text-xs">
								{getTranslations(language).base_stat}
							</div>
							<span>{statKey === 'aspd' ? 100 : baseStat}</span>
						</div>
						{#each runeMods as mod}
							{@render runeModifier(mod)}
						{/each}
					</div>
					{#if statKey === 'aspd'}
						<span>&nbsp;/ 100)</span>
					{/if}
					<span>&nbsp;= {runeStat}</span>
				</div>
			</DraggableContainer>
		{/if}
		{#if statKey === 'aspd' || hasOtherMods}
			<DraggableContainer
				className={statKey === 'aspd' ? 'h-full' : 'h-full bg-neutral-900 py-3 pl-3'}
			>
				{#if statKey !== 'aspd'}
					<span class="text-xs md:text-base">{getTranslations(language).in_combat_mods}</span>
				{/if}
				<div class="flex items-center justify-center w-max mx-auto py-8 whitespace-nowrap text-xl">
					{#if statsToShow[statIndex] === 'aspd'}
						{#if atkIntervalMods?.mul?.length > 0}
							<span>(</span>
						{/if}
						{#if atkIntervalMods?.add?.length > 0}
							<span>(</span>
						{/if}
						{baseStat}
						{#if atkIntervalMods?.add?.length > 0}
							{#each atkIntervalMods?.add as { key, value }}
								<div class="relative">
									<ModsCheckIcon {formIndex} {enemy} {key} {language} />
									&nbsp;{#if value >= 0}+{/if}
									{value}
								</div>
							{/each}
							)
						{/if}
						{#if atkIntervalMods?.mul?.length > 0}
							{#each atkIntervalMods?.mul as { key, value }}
								<div class="relative">
									<ModsCheckIcon {formIndex} {enemy} {key} {language} />
									&nbsp;× {value}
								</div>
							{/each}
							)
						{/if}
						<span>&nbsp;/ (</span>
						{#if otherMods?.finalMul?.length > 0}
							<span>(</span>
						{/if}
						{#if otherMods?.finalAdd?.length > 0}
							<span>(</span>
						{/if}
						{#if otherMods.initialAdd.length > 0}
							<span>(</span>
						{/if}
						{#if runeMods?.length > 0}
							<span>(</span>
						{/if}
						100
						{#if runeMods?.length > 0}
							<div class="flex relative">
								{#each runeMods as mod}
									{@render runeModifier(mod)}
								{/each}
								<span>)</span>
							</div>
						{/if}
						{#if otherMods?.initialAdd?.length > 0}
							{#each otherMods?.initialAdd as { key, value }}
								<div class="relative">
									<ModsCheckIcon {formIndex} {enemy} {key} {language} />
									&nbsp;{#if value >= 0}+{/if}
									{value}
								</div>
							{/each}
							)
						{/if}
						<!-- NOTE - FOR ASPD INITIAL MODS ARE ALL UNDER RUNES -->
						{#if otherMods?.initialMul?.length > 0}
							&nbsp;× (1
							{#each otherMods?.initialMul as { key, value }}
								<div class="relative">
									<ModsCheckIcon {formIndex} {enemy} {key} {language} />
									&nbsp;+ {value}
								</div>
							{/each}
							)
						{/if}
						{#if otherMods?.finalAdd?.length > 0}
							{#each otherMods?.finalAdd as { key, value }}
								<div class="relative">
									<ModsCheckIcon {formIndex} {enemy} {key} {language} />
									&nbsp;{#if value >= 0}+{/if}
									{value}
								</div>
							{/each}
							)
						{/if}
						{#if otherMods?.finalMul?.length > 0}
							{#each otherMods?.finalMul as { key, value }}
								<div class="relative">
									<ModsCheckIcon {formIndex} {enemy} {key} {language} />
									&nbsp;× {value}
								</div>
							{/each}
							)
						{/if}

						<span>&nbsp;/ 100)</span>
					{:else}
						{#if otherMods?.finalMul?.length > 0}
							<span>(</span>
						{/if}
						{#if otherMods?.finalAdd?.length > 0}
							<span>(</span>
						{/if}
						{#if otherMods.initialAdd.length > 0}
							<span>(</span>
						{/if}
						<span>
							{runeStat}
						</span>
						{#if otherMods?.initialAdd?.length > 0}
							<div class="relative inline-flex">
								<div class="absolute -top-[90%] left-1/2 -translate-x-1/2 text-xs">
									{getTranslations(language).initial_add}
								</div>
								{#each otherMods?.initialAdd as { key, value }}
									<div class="relative">
										<ModsCheckIcon {formIndex} {enemy} {key} {language} />
										&nbsp;{#if value >= 0}+{/if}
										{round(value, 3)}
									</div>
								{/each}
								)
							</div>
						{/if}
						{#if otherMods?.initialMul?.length > 0}
							<div class="relative inline-flex">
								<div class="absolute -top-[90%] left-1/2 -translate-x-1/2 text-xs">
									{getTranslations(language).initial_mul}
								</div>
								&nbsp;× (1
								{#each otherMods?.initialMul as { key, value }}
									<div class="relative">
										<ModsCheckIcon {formIndex} {enemy} {key} {language} />
										&nbsp;+ {round(value, 3)}
									</div>
								{/each}
								)
							</div>
						{/if}
						{#if otherMods?.finalAdd?.length > 0}
							<div class="relative inline-flex">
								<div class="absolute -top-[90%] left-1/2 -translate-x-1/2 text-xs">
									{getTranslations(language).final_add}
								</div>
								{#each otherMods?.finalAdd as { key, value }}
									<div class="relative">
										<ModsCheckIcon {formIndex} {enemy} {key} {language} />
										&nbsp;{#if value >= 0}+{/if}
										{round(value, 3)}
									</div>
								{/each}
								)
							</div>
						{/if}
						{#if otherMods?.finalMul?.length > 0}
							<div class="relative inline-flex">
								<div class="absolute -top-[90%] left-1/2 -translate-x-1/2 text-xs">
									{getTranslations(language).final_mul}
								</div>
								{#each otherMods?.finalMul as { key, value }}
									<div class="relative">
										<ModsCheckIcon {formIndex} {enemy} {key} {language} />
										&nbsp;× {round(value, 3)}
									</div>
								{/each}
								)
							</div>
						{/if}
					{/if}
					<span>&nbsp;= {enemy.forms[formIndex].stats[statKey]}</span>
				</div>
			</DraggableContainer>
		{/if}
	</div>
</div>

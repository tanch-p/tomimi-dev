<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import DraggableContainer from './DraggableContainer.svelte';
	import { charaAssets } from '$lib/data/chara/chara_assets';
	import aspdIcon from '$lib/images/is/aspd.webp';
	import msIcon from '$lib/images/is/movespeed.webp';
	import { round } from '$lib/functions/lib';
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
					mod.groupKey = runes.key;
					list.push(mod);
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
				for (const { key, value, order = 'final', mode } of mods) {
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
			for (const { key, value, mode } of mods) {
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
	let statsToShow = $derived(enemy.modsList[formIndex]
		.reduce((acc, curr) => {
			for (const mod of curr.mods) {
				if (['range', 'dmg_res','weight'].includes(mod?.key)) continue;
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
		.sort((a, b) => STATS_SORT_WEIGHTS[a] - STATS_SORT_WEIGHTS[b]));
	run(() => {
		if (formIndex > -1 || enemy) {
			if (!statsToShow[statIndex]) {
				statIndex = 0;
			}
		}
	});
	let statKey = $derived(statsToShow[statIndex]);
	let runeMods = $derived(getRunes(enemy.modsList[formIndex], statKey));
	let otherMods = $derived(getOtherMods(enemy.modsList[formIndex], statKey));
	let atkIntervalMods = $derived(getAtkIntervalMods(enemy.modsList[formIndex]));
</script>

<div class="grid grid-cols-[auto_1fr] mt-2.5">
	<div class="border-r border-gray-500 pr-3 whitespace-nowrap">
		{#each statsToShow as key, i}
			<button
				class="flex items-center gap-x-1.5 px-2 py-1 text-start {statIndex === i
					? 'bg-neutral-500'
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
				{translations[language].table_headers[STATS_KEY_TABLE[key]]}
			</button>
		{/each}
	</div>
	<div class="ml-3 overflow-hidden">
		<span class="text-gray-500 text-xs">※{translations[language].mods_check_disclaimer}</span>
		<div class="flex items-center justify-center gap-x-1.5 px-2 py-1">
			<img
				src={getImgSrc(STATS_KEY_TABLE[statKey])}
				width="16px"
				height="16px"
				alt=""
				class="shrink-0"
			/>
			{translations[language].table_headers[STATS_KEY_TABLE[[statKey]]]}
			{enemy.forms[formIndex].stats[statKey]}
		</div>
		<DraggableContainer className="h-full ">
			<div class="flex items-center justify-center w-max mx-auto py-10 whitespace-nowrap text-xl">
				<span>=</span>&nbsp;
				{#if statsToShow[statIndex] === 'aspd'}
					{#if atkIntervalMods?.mul?.length > 0}
						<span>(</span>
					{/if}
					{#if atkIntervalMods?.add?.length > 0}
						<span>(</span>
					{/if}
					{enemy.stats[statKey]}
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
							<div class="absolute top-[125%] left-1/2 -translate-x-1/2 text-xs">
								{translations[language].runes}
							</div>
							{#each runeMods as { key, value, mode }}
								{#if mode === 'add'}
									<span
										>&nbsp;{#if value >= 0}+{/if}
										{value}</span
									>
								{:else}
									<span>&nbsp;× {1+value}</span>
								{/if}
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
					{/if}{#if runeMods?.length > 0}
						<div class="flex relative">
							({enemy.stats[statKey]}
							<div class="absolute -top-[90%] left-1/2 -translate-x-1/2 text-xs">
								{translations[language].runes}
							</div>
							{#each runeMods as { key, value, mode, groupKey }}
								<div class="absolute top-[125%] left-1/2 -translate-x-1/2 text-xs">
									{translations[language][groupKey]}
								</div>
								{#if mode === 'add'}
									<span
										>&nbsp;{#if value >= 0}+{/if}
										{value}</span
									>
								{:else}
									<span>&nbsp;× {round(value)}</span>
								{/if}
							{/each}
							<span>)</span>
						</div>
					{:else}
						<span>
							{enemy.stats[statKey]}
						</span>
					{/if}
					{#if otherMods?.initialAdd?.length > 0}
						<div class="relative inline-flex">
							<div class="absolute -top-[90%] left-1/2 -translate-x-1/2 text-xs">
								{translations[language].initial_add}
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
								{translations[language].initial_mul}
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
								{translations[language].final_add}
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
								{translations[language].final_mul}
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
			</div>
		</DraggableContainer>
	</div>
</div>

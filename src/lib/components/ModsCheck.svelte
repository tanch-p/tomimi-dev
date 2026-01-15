<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Enemy, Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import TogglePanel from './TogglePanel.svelte';
	import { getFormTitle } from '$lib/functions/lib';
	import DraggableContainer from './DraggableContainer.svelte';
	import ModsCheckStatTable from './ModsCheckStatTable.svelte';

	interface Props {
		language: Language;
		enemies: Enemy[];
		mapConfig: any;
	}

	let { language, enemies, mapConfig }: Props = $props();
	let enemyIndex = $state(0);
	let formIndex = $state(0);
	let enemy = $state(enemies?.[0]);

	run(() => {
		if (mapConfig) {
			enemyIndex = 0;
		}
	});
	run(() => {
		if (enemyIndex > -1) {
			formIndex = 0;
		}
	});
	let listToShow = $derived(enemies?.filter((enemy) => enemy?.modsList?.some((mods) => mods?.length > 0)) || []);
	run(() => {
		enemy = listToShow[enemyIndex];
	});

</script>

<TogglePanel
	title={translations[language].mods_check}
	size="subheading"
	className="my-4"
>
	{#if listToShow.length > 0}
		<DraggableContainer className="no-scrollbar">
			<div
				class="flex w-max min-w-full font-bold text-lg text-white text-center select-none py-1 border-b border-b-gray-500"
			>
				{#each listToShow as enemy, i}
					<button onclick={() => (enemyIndex = i)} class="px-1">
						<img
							class="pointer-events-none {i !== enemyIndex ? 'brightness-50' : ''}"
							src={`/images/enemy_icons/${enemy.key}.webp`}
							height="70px"
							width="70px"
							decoding="async"
							alt={enemy.key}
						/>
					</button>
				{/each}
			</div>
		</DraggableContainer>
		<div class="flex">
			<img
				class="select-none"
				src={`/images/enemy_icons/${enemy.key}.webp`}
				height="90px"
				width="90px"
				decoding="async"
				alt={enemy.key}
			/>
			<div class="flex flex-col ml-2">
				<div class="flex gap-x-2 mt-1.5 h-[20px]">
					{#each enemy.type.filter((ele) => !['melee', 'ranged', 'NORMAL'].includes(ele)) as type}
						<p class="whitespace-nowrap text-[#83a39f] text-sm">
							{translations[language].types[type]}
						</p>
					{/each}
				</div>
				<p class="text-2xl">
					{enemy[`name_${language}`] || enemy[`name_zh`]}
				</p>
				{#if enemy.form}
					<p class="text-gray-400">
						{getFormTitle(enemy.form, enemy.formIndex, language)}
					</p>
				{/if}
			</div>
		</div>

		{#if enemy.modsList.length > 1}
			<DraggableContainer className="mt-2">
				<div class="flex whitespace-nowrap">
					{#each enemy.forms as form, index}
						<button
							data-id="form-{index + 1}"
							class={`text-sm py-1 px-2 ${formIndex === index ? 'bg-almost-black' : 'opacity-60'}`}
							onclick={() => (formIndex = index)}
						>
							{getFormTitle(form.title, index, language)}
						</button>
					{/each}
				</div>
			</DraggableContainer>
		{/if}
		<ModsCheckStatTable {enemy} {formIndex} {language} />
	{:else}
		「」
	{/if}
</TogglePanel>

<script lang="ts">
	import type { Language } from "$lib/types/types";
	import translations from "$lib/translations.json";
	import CharaFilterToggle from "./CharaFilterToggle.svelte";
	import relics from "$lib/data/chara/relics_chara.json";
	import { relicLookup } from "$lib/data/is/relic_lookup";
	import Icon from "$lib/components/Icon.svelte";
	import { rogueTopic, toggleRelic, selectedRelicIds } from "./relics.svelte";

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();

	const relicsList = $derived(relics[rogueTopic.value]);
	let relicDisplayMode = $state("grid");

	function handleTopicChange(topic) {
		rogueTopic.value = topic;
		selectedRelicIds.clear();
	}
</script>

<div class="bg-near-white rounded-md overflow-hidden">
	<CharaFilterToggle
		title={translations[language].isw}
		innerClassName="border-t border-[#e5e7eb] px-3 md:px-4 pt-2 pb-3 md:pb-4"
	>
		<div
			class="md:absolute right-3 float-right md:float-none flex items-center gap-x-2 w-max ml-auto"
		>
			<button
				class="display-style-button rounded-full p-[9px]"
				class:active={relicDisplayMode === "grid"}
				onclick={() => (relicDisplayMode = "grid")}
			>
				<Icon name="grid-view" size={24} className="fill-black" />
			</button>
			<button
				class="display-style-button rounded-full p-[10px]"
				class:active={relicDisplayMode === "list"}
				onclick={() => (relicDisplayMode = "list")}
			>
				<Icon name="icon-list" size={22} />
			</button>
		</div>
		<div class="flex md:justify-center gap-3 pt-2">
			{#each Object.keys(relics) as topic}
				<button
					class:active={rogueTopic.value === topic}
					class="filter-btn"
					onclick={() => handleTopicChange(topic)}
				>
					{translations[language][topic]}
				</button>
			{/each}
		</div>
		<div
			class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 w-full pt-2 md:pt-5"
		>
			<p class="md:py-[5px]">{translations[language]["rogue_relic"]}</p>
			<div
				class="gap-3 {relicDisplayMode === 'grid'
					? language === 'en'
						? 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 items-start'
						: 'grid grid-cols-3 sm:flex flex-wrap'
					: 'flex flex-col'}"
			>
				{#each relicsList as relic}
					<button
						class={relicDisplayMode === "grid"
							? "text-center"
							: "grid grid-cols-[100px_1fr] gap-2 text-left"}
						class:bg-slate-300={selectedRelicIds.has(relic.id)}
						onclick={() => toggleRelic(relic.id)}
					>
						<img
							src="/images/relics/{relicLookup?.[relic.id] ?? relic.id}.webp"
							alt={relic[`name_${language}`] || relic["name_zh"]}
							width="100"
							height="100"
							loading="lazy"
							decoding="async"
							class="mx-auto w-[100px] h-[100px] object-contain"
						/>
						<div class="sm:px-2">
							<p class="text-base">
								{relic[`name_${language}`] || relic["name_zh"]}
							</p>
							{#if relicDisplayMode === "list"}
								<p class="">
									{relic[`desc_${language}`] || relic["desc_zh"]}
								</p>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		</div>
		{#snippet selected()}
			<div>
				{#if selectedRelicIds.size > 0}
					<div class="flex flex-wrap gap-2 border-t border-[#e5e7eb] py-3 mx-3">
						{#each selectedRelicIds as id}
							{@const relic = relicsList.find((ele) => ele.id === id)}
							<button
								class="text-center"
								class:bg-slate-300={selectedRelicIds.has(relic.id)}
								onclick={() => toggleRelic(relic.id)}
							>
								<img
									src="/images/relics/{relicLookup?.[relic.id] ??
										relic.id}.webp"
									alt={relic[`name_${language}`] || relic["name_zh"]}
									width="75"
									height="75"
									loading="lazy"
									decoding="async"
									class="mx-auto"
								/>
								<div class="px-2">
									<p class="text-sm">
										{relic[`name_${language}`] || relic["name_zh"]}
									</p>
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		{/snippet}
	</CharaFilterToggle>
</div>

<style>
	.display-style-button {
		background-color: dimgrey;
		opacity: 0.4;
	}
	.display-style-button.active {
		opacity: 1;
	}
</style>

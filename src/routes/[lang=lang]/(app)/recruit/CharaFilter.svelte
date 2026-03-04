<script lang="ts">
	import type { Language } from "$lib/types/types";
	import translations from "$lib/translations.json";
	import filterOptions from "$lib/data/chara/filter_options.json";
	import CharaFilterToggle from "./CharaFilterToggle.svelte";
	import {
		getCategory,
		getDisplayKey,
	} from "$lib/functions/chara/charaHelpers";
	import { setLocalStorage } from "$lib/functions/lib";
	import { releaseStatus, filtersStore, toggleFilterOption } from "./shared.svelte";
	import RelicFilters from "./RelicFilters.svelte";

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();

	const filterLayout = [
		{
			title: "enemy_debuff",
			color: "bg-[#FFA5AF]",
			textColor: "text-[#950202]",
			categories: [
				{ catKey: "stats_debuff", optionKey: "enemy_stats" },
				{ catKey: "status_ailment", optionKey: "status_ailment" },
				{ catKey: "buff_special", optionKey: "debuff_special" },
			],
		},
		{
			title: "ally_buff",
			color: "bg-[#FFC89B]",
			textColor: "text-[#A15E00]",
			categories: [
				{ catKey: "stats", optionKey: "ally_stats" },
				{ catKey: "atk_cat", optionKey: "ally_atk_buffs" },
				{ catKey: "def_cat", optionKey: "ally_def_buffs" },
				{ catKey: "targeting", optionKey: "ally_targeting" },
				{ catKey: "status_ailment", optionKey: "ally_status_buffs" },
				{ catKey: "heal_buff", optionKey: "ally_heal_buffs" },
				{ catKey: "buff_sp", optionKey: "ally_sp_buffs" },
				{ catKey: "others_tag", optionKey: "ally_others" },
			],
		},
		{
			title: "self_buff",
			color: "bg-[#C0E6FA]",
			textColor: "text-[#17638D]",
			categories: [
				{ catKey: "stats", optionKey: "self_stats" },
				{ catKey: "atk_cat", optionKey: "self_atk_buffs" },
				{ catKey: "enemy_target_priority", optionKey: "enemy_target_priority" },
				{ catKey: "def_cat", optionKey: "self_def_buffs" },
				{ catKey: "targeting", optionKey: "self_targeting" },
				{ catKey: "status_ailment", optionKey: "self_status_buffs" },
				{ catKey: "heal_buff", optionKey: "self_heal_buffs" },
				{ catKey: "buff_sp", optionKey: "self_sp_buffs" },
				{ catKey: "skill", optionKey: "skill" },
			],
		},
		{
			title: "others_tag",
			color: "bg-[#DAD4FF]",
			textColor: "",
			categories: [
				{ catKey: "buff_tags", optionKey: "buff_tags" },
				{ catKey: "profession_buff", optionKey: "profession_buff" },
				{ catKey: "group_buff", optionKey: "group_buff" },
				{ catKey: "enemy_type_related", optionKey: "enemy_type_related" },
				{ catKey: "buff_special", optionKey: "others_tag" },
				{ catKey: "terrain", optionKey: "terrain" },
			],
		},
	];

	const selectedFilters = $derived(
		Object.fromEntries(
			Object.entries(filtersStore).map(([key, options]) => [
				key,
				options.filter((o) => o.selected).map((o) => o.value),
			]),
		),
	);

	const updateReleaseStatus = (val) => {
		releaseStatus.value = val;
		setLocalStorage("releaseStatus", val);
	};

	function getSelectedOptions(categories) {
		return categories.reduce((acc, { optionKey }) => {
			for (const value of filterOptions[optionKey]) {
				const category = getCategory(value);
				const selected = selectedFilters[category].includes(value);
				if (selected) {
					acc.push(value);
				}
			}
			return acc;
		}, []);
	}

</script>

<div class="grid gap-5 text-almost-black mt-5">
	<div class="bg-near-white rounded-md p-3 md:p-4">
		<h2 class="border-b border-[#e5e7eb] text-center pb-1 md:pb-2">
			{translations[language].filter}
		</h2>
		<div
			class="flex flex-col md:grid grid-cols-[100px_1fr] gap-2 md:gap-y-3 pt-3"
		>
			<p class="md:py-[5px] font-medium">
				{translations[language].chara_filter.release_status}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each ["global", "cn"] as value}
					<button
						class="filter-btn"
						class:active={releaseStatus.value === value}
						onclick={() => updateReleaseStatus(value)}
					>
						{translations[language].chara_filter[value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 font-medium">
				{translations[language]["rarity"]}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions["rarity"] as value}
					<button
						class="filter-btn"
						class:active={selectedFilters["rarity"].includes(value)}
						onclick={() => toggleFilterOption("rarity", value)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 font-medium">
				{translations[language]["profession"]}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions["profession"] as value}
					<button
						class="filter-btn"
						class:active={selectedFilters["profession"].includes(value)}
						onclick={() => toggleFilterOption("profession", value)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 font-medium">
				{translations[language]["deployable_tile"]}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions["deployable_tile"] as value}
					<button
						class="filter-btn"
						class:active={selectedFilters["deployable_tile"].includes(value)}
						onclick={() => toggleFilterOption("deployable_tile", value)}
					>
						{translations[language][getDisplayKey(value)]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 font-medium">
				{translations[language].damage_type}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions["damage_type"] as value}
					<button
						class="filter-btn"
						class:active={selectedFilters["tags"].includes(value)}
						onclick={() => toggleFilterOption("tags", value)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 font-medium">
				{translations[language].ele_inj}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions["ele_inj"] as value}
					<button
						class="filter-btn"
						class:active={selectedFilters["tags"].includes(value)}
						onclick={() => toggleFilterOption("tags", value)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 capitalize font-medium">
				{translations[language].table_headers.blockCnt}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions["blockCnt"] as value}
					<button
						class="filter-btn"
						class:active={selectedFilters["blockCnt"].includes(value)}
						onclick={() => toggleFilterOption("blockCnt", value)}
					>
						{value}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 capitalize font-medium">
				{translations[language].others}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions["others"] as value}
					<button
						class="filter-btn"
						class:active={selectedFilters[getCategory(value)].includes(value)}
						onclick={() => toggleFilterOption(getCategory(value), value)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 capitalize font-medium">
				{translations[language].spType}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions["spType"] as value}
					<button
						class="filter-btn"
						class:active={selectedFilters["spType"].includes(value)}
						onclick={() => toggleFilterOption("spType", value)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
		</div>
		<CharaFilterToggle
			title={translations[language].subProfessionId}
			className="mt-2"
			titleClassName="border-b border-[#e5e7eb]"
		>
			<div
				class="flex flex-col md:grid grid-cols-[100px_1fr] gap-2 md:gap-y-3 pt-2 md:pt-3"
			>
				{#each Object.keys(filterOptions.subProfessionId) as subKey}
					{@const subOptions = filterOptions.subProfessionId[subKey]}
					<p class="md:py-[5px] mt-2 md:mt-0 first:mt-0 font-medium">
						{translations[language][subKey]}
					</p>
					<div class="flex flex-wrap gap-2">
						{#each subOptions as value}
							<!-- {@const selected = options.find((ele) => ele.value === value)?.selected} -->
							<button
								class="filter-btn"
								class:active={selectedFilters["subProfessionId"].includes(
									value,
								)}
								onclick={() => toggleFilterOption("subProfessionId", value)}
							>
								{translations[language][value]}
							</button>
						{/each}
					</div>
				{/each}
			</div>
		</CharaFilterToggle>
		<CharaFilterToggle
			title={translations[language].group}
			className="mt-1.5"
			titleClassName="border-b border-[#e5e7eb]"
		>
			<div
				class="flex flex-col md:grid grid-cols-[100px_1fr] gap-2 md:gap-y-3 pt-2 md:pt-3"
			>
				<p class="hidden sm:block md:py-[5px] font-medium">
					{translations[language]["group"]}
				</p>
				<div class="flex flex-wrap gap-2">
					{#each filterOptions["group"] as value}
						<button
							class="filter-btn"
							class:active={selectedFilters["group"].includes(value)}
							onclick={() => toggleFilterOption("group", value)}
						>
							{translations[language][value]}
						</button>
					{/each}
				</div>
			</div>
		</CharaFilterToggle>
	</div>
	{#each filterLayout as { title, color, textColor, categories }}
		{@const selectedOptions = getSelectedOptions(categories)}
		<div class="bg-near-white rounded-md overflow-hidden">
			<CharaFilterToggle
				id={title}
				title={translations[language][title]}
				isOpen={false}
				innerClassName="border-t border-[#e5e7eb] p-3 md:p-4"
			>
				<div
					class="relative z-1 flex flex-col md:grid grid-cols-[100px_1fr] gap-2 md:gap-y-3"
				>
					{#each categories as { catKey, optionKey }}
						<p
							class="md:py-[5px] mt-2 md:mt-0 first:mt-0 {textColor} sm:text-inherit font-medium"
						>
							{translations[language][catKey]}
						</p>
						<div class="flex flex-wrap gap-2">
							{#each filterOptions[optionKey] as value}
								{@const key = getDisplayKey(value)}
								<button
									id={value}
									class="filter-btn"
									class:active={selectedFilters[getCategory(value)].includes(
										value,
									)}
									onclick={() => toggleFilterOption(getCategory(value), value)}
								>
									{translations[language].table_headers[key] ??
										translations[language][key] ??
										translations[language].types[key]}
								</button>
							{/each}
						</div>
					{/each}
				</div>
				{#snippet triangle()}
					<div
						class="side-triangle absolute right-0 bottom-0 {color} h-[60px] w-[60px]"
					></div>
				{/snippet}
				{#snippet selected()}
					<div>
						{#if selectedOptions.length > 0}
							<div
								class="flex flex-wrap gap-2 border-t border-[#e5e7eb] py-3 mx-3 md:mx-4"
							>
								{#each selectedOptions as value}
									{@const key = getDisplayKey(value)}
									<button
										class="relative filter-btn"
										class:active={selectedFilters[getCategory(value)].includes(
											value,
										)}
										onclick={() => toggleFilterOption(getCategory(value), value)}
									>
										{translations[language].table_headers[key] ??
											translations[language][key] ??
											translations[language].types[key]}
									</button>
								{/each}
							</div>
						{/if}
					</div>
				{/snippet}
			</CharaFilterToggle>
		</div>
	{/each}
	<RelicFilters {language} />
</div>

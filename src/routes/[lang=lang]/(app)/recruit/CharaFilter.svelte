<script lang="ts">
	import type { Language } from '$lib/types';
	import { filtersStore, relicFiltersStore, rogueTopic, releaseStatusStore } from './stores';
	import translations from '$lib/translations.json';
	import filterOptions from '$lib/data/chara/filter_options.json';
	import CharaFilterToggle from './CharaFilterToggle.svelte';
	import relics from '$lib/data/chara/relics_chara.json';
	import { relicLookup } from '$lib/data/is/relic_lookup';
	import Icon from '$lib/components/Icon.svelte';
	import {
		getCategory,
		getDisplayKey,
		getSelectedFilterOptions,
		updateFilters
	} from '$lib/functions/charaHelpers';
	import { setLocalStorage } from '$lib/functions/lib';

	export let language: Language;

	const filterLayout = [
		{
			title: 'enemy_debuff',
			color: 'bg-[#FFA5AF]',
			textColor: 'text-[#950202]',
			categories: [
				{ catKey: 'stats_debuff', optionKey: 'enemy_stats' },
				{ catKey: 'status_ailment', optionKey: 'status_ailment' },
				{ catKey: 'buff_special', optionKey: 'debuff_special' }
			]
		},
		{
			title: 'ally_buff',
			color: 'bg-[#FFC89B]',
			textColor: 'text-[#A15E00]',
			categories: [
				{ catKey: 'stats', optionKey: 'ally_stats' },
				{ catKey: 'atk_cat', optionKey: 'ally_atk_buffs' },
				{ catKey: 'def_cat', optionKey: 'ally_def_buffs' },
				{ catKey: 'targeting', optionKey: 'ally_targeting' },
				{ catKey: 'status_ailment', optionKey: 'ally_status_buffs' },
				{ catKey: 'heal_buff', optionKey: 'ally_heal_buffs' },
				{ catKey: 'buff_sp', optionKey: 'ally_sp_buffs' },
				{ catKey: 'others_tag', optionKey: 'ally_others' }
			]
		},
		{
			title: 'self_buff',
			color: 'bg-[#C0E6FA]',
			textColor: 'text-[#17638D]',
			categories: [
				{ catKey: 'stats', optionKey: 'self_stats' },
				{ catKey: 'atk_cat', optionKey: 'self_atk_buffs' },
				{ catKey: 'enemy_target_priority', optionKey: 'enemy_target_priority' },
				{ catKey: 'def_cat', optionKey: 'self_def_buffs' },
				{ catKey: 'targeting', optionKey: 'self_targeting' },
				{ catKey: 'status_ailment', optionKey: 'self_status_buffs' },
				{ catKey: 'heal_buff', optionKey: 'self_heal_buffs' },
				{ catKey: 'buff_sp', optionKey: 'self_sp_buffs' },
				{ catKey: 'skill', optionKey: 'skill' }
			]
		},
		{
			title: 'others_tag',
			color: 'bg-[#DAD4FF]',
			textColor: '',
			categories: [
				{ catKey: 'buff_tags', optionKey: 'buff_tags' },
				{ catKey: 'profession_buff', optionKey: 'profession_buff' },
				{ catKey: 'group_buff', optionKey: 'group_buff' },
				{ catKey: 'enemy_type_related', optionKey: 'enemy_type_related' },
				{ catKey: 'buff_special', optionKey: 'others_tag' },
				{ catKey: 'terrain', optionKey: 'terrain' }
			]
		}
	];
	let relicDisplayMode = 'grid';
	let selectedRelics = [];

	$: isSelected = (key, value) => {
		return $filtersStore.find((ele) => ele.key === key).options.find((ele) => ele.value === value)
			?.selected;
	};
	relicFiltersStore.subscribe((list) => {
		selectedRelics = list.filter((relic) => relic.selected);
	});
	$: isRelicSelected = (id) => {
		return $relicFiltersStore.find((relic) => relic.id === id)?.selected;
	};
	const updateRelicFilters = (id) => {
		relicFiltersStore.update((list) => {
			const index = list.findIndex((ele) => ele.id === id);
			list[index].selected = !list[index].selected;
			return list;
		});
	};
	const updateReleaseStatus = (val) => {
		releaseStatusStore.set(val);
		setLocalStorage('releaseStatus', val);
	};
</script>

<div class="grid gap-5 text-almost-black mt-5">
	<div class="bg-near-white rounded-md p-3 md:p-4">
		<h2 class="border-b text-center pb-1 md:pb-2">
			{translations[language].filter}
		</h2>
		<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-2 md:gap-y-3 pt-3">
			<p class="md:py-[5px] font-medium">{translations[language].chara_filter.release_status}</p>
			<div class="flex flex-wrap gap-2">
				{#each ['global', 'cn'] as value}
					<button
						class="filter-btn"
						class:active={$releaseStatusStore === value}
						on:click={() => updateReleaseStatus(value)}
					>
						{translations[language].chara_filter[value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 font-medium">{translations[language]['rarity']}</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['rarity'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('rarity', value)}
						on:click={() => updateFilters('rarity', value, filtersStore)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 font-medium">{translations[language]['profession']}</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['profession'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('profession', value)}
						on:click={() => updateFilters('profession', value, filtersStore)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 font-medium">
				{translations[language]['deployable_tile']}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['deployable_tile'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('deployable_tile', value)}
						on:click={() => updateFilters('deployable_tile', value, filtersStore)}
					>
						{translations[language][getDisplayKey(value)]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 font-medium">{translations[language].damage_type}</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['damage_type'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('tags', value)}
						on:click={() => updateFilters('tags', value, filtersStore)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 font-medium">{translations[language].ele_inj}</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['ele_inj'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('tags', value)}
						on:click={() => updateFilters('tags', value, filtersStore)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 capitalize font-medium">
				{translations[language].table_headers.blockCnt}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['blockCnt'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('blockCnt', value)}
						on:click={() => updateFilters('blockCnt', value, filtersStore)}
					>
						{value}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 capitalize font-medium">
				{translations[language].others}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['others'] as value}
					<button
						class="filter-btn"
						class:active={isSelected(getCategory(value), value)}
						on:click={() => updateFilters(getCategory(value), value, filtersStore)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
			<p class="md:py-[5px] mt-2 md:mt-0 capitalize font-medium">
				{translations[language].spType}
			</p>
			<div class="flex flex-wrap gap-2">
				{#each filterOptions['spType'] as value}
					<button
						class="filter-btn"
						class:active={isSelected('spType', value)}
						on:click={() => updateFilters('spType', value, filtersStore)}
					>
						{translations[language][value]}
					</button>
				{/each}
			</div>
		</div>
		<CharaFilterToggle
			title={translations[language].subProfessionId}
			className="mt-2"
			titleClassName="border-b"
		>
			<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-2 md:gap-y-3 pt-2 md:pt-3">
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
								class:active={isSelected('subProfessionId', value)}
								on:click={() => updateFilters('subProfessionId', value, filtersStore)}
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
			titleClassName="border-b"
		>
			<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-2 md:gap-y-3 pt-2 md:pt-3">
				<p class="hidden sm:block md:py-[5px] font-medium">{translations[language]['group']}</p>
				<div class="flex flex-wrap gap-2">
					{#each filterOptions['group'] as value}
						<button
							class="filter-btn"
							class:active={isSelected('group', value)}
							on:click={() => updateFilters('group', value, filtersStore)}
						>
							{translations[language][value]}
						</button>
					{/each}
				</div>
			</div>
		</CharaFilterToggle>
	</div>
	{#each filterLayout as { title, color, textColor, categories }}
		{@const selectedOptions = getSelectedFilterOptions(categories, $filtersStore)}
		<div class="bg-near-white rounded-md overflow-hidden">
			<CharaFilterToggle
				id={title}
				title={translations[language][title]}
				isOpen={false}
				innerClassName="border-t p-3 md:p-4"
			>
				<div class="relative z-[1] flex flex-col md:grid grid-cols-[100px_1fr] gap-2 md:gap-y-3">
					{#each categories as { catKey, optionKey }}
						<p class="md:py-[5px] mt-2 md:mt-0 first:mt-0 {textColor} sm:text-inherit font-medium">
							{translations[language][catKey]}
						</p>
						<div class="flex flex-wrap gap-2">
							{#each filterOptions[optionKey] as value}
								{@const key = getDisplayKey(value)}
								<button
									id={value}
									class="filter-btn"
									class:active={isSelected(getCategory(value), value)}
									on:click={() => updateFilters(getCategory(value), value, filtersStore)}
								>
									{translations[language].table_headers[key] ??
										translations[language][key] ??
										translations[language].types[key]}
								</button>
							{/each}
						</div>
					{/each}
				</div>
				<div
					slot="triangle"
					class="side-triangle absolute right-0 bottom-0 {color} h-[60px] w-[60px]"
				/>
				<div slot="selected">
					{#if selectedOptions.length > 0}
						<div class="flex flex-wrap gap-2 border-t py-3 mx-3 md:mx-4">
							{#each selectedOptions as value}
								{@const key = getDisplayKey(value)}
								<button
									class="relative filter-btn"
									class:active={isSelected(getCategory(value), value)}
									on:click={() => updateFilters(getCategory(value), value, filtersStore)}
								>
									{translations[language].table_headers[key] ??
										translations[language][key] ??
										translations[language].types[key]}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</CharaFilterToggle>
		</div>
	{/each}
	<div class="bg-near-white rounded-md overflow-hidden">
		<CharaFilterToggle
			title={translations[language].isw}
			innerClassName="border-t px-3 md:px-4 pt-2 pb-3 md:pb-4"
		>
			<div
				class="md:absolute right-3 float-right md:float-none flex items-center gap-x-2 w-max ml-auto"
			>
				<button
					class="display-style-button rounded-full p-[9px]"
					class:active={relicDisplayMode === 'grid'}
					on:click={() => (relicDisplayMode = 'grid')}
				>
					<Icon name="grid-view" size={24} className="fill-black" />
				</button>
				<button
					class="display-style-button rounded-full p-[10px]"
					class:active={relicDisplayMode === 'list'}
					on:click={() => (relicDisplayMode = 'list')}
				>
					<Icon name="icon-list" size={22} />
				</button>
			</div>
			<div class="flex md:justify-center gap-3 pt-2">
				{#each Object.keys(relics) as topic}
					<button
						class:active={$rogueTopic === topic}
						class="filter-btn"
						on:click={() => rogueTopic.set(topic)}
					>
						{translations[language][topic]}
					</button>
				{/each}
			</div>
			<div class="flex flex-col md:grid grid-cols-[100px_1fr] gap-3 w-full pt-2 md:pt-5">
				<p class="md:py-[5px]">{translations[language]['rogue_relic']}</p>
				<div
					class="gap-3 {relicDisplayMode === 'grid'
						? language === 'en'
							? 'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 items-start'
							: 'grid grid-cols-3 sm:flex flex-wrap'
						: 'flex flex-col'}"
				>
					{#each relics[$rogueTopic] as relic}
						<button
							class={relicDisplayMode === 'grid'
								? 'text-center'
								: 'grid grid-cols-[100px_1fr] gap-2 text-left'}
							class:bg-slate-300={isRelicSelected(relic.id)}
							on:click={() => updateRelicFilters(relic.id)}
						>
							<img
								src="/images/relics/{relicLookup?.[relic.id] ?? relic.id}.webp"
								alt={relic[`name_${language}`] || relic['name_zh']}
								width="100"
								height="100"
								loading="lazy"
								decoding="async"
								class="mx-auto w-[100px] h-[100px] object-contain"
							/>
							<div class="sm:px-2">
								<p class="text-base">
									{relic[`name_${language}`] || relic['name_zh']}
								</p>
								{#if relicDisplayMode === 'list'}
									<p class="">{relic[`desc_${language}`] || relic['desc_zh']}</p>
								{/if}
							</div>
						</button>
					{/each}
				</div>
			</div>
			<div slot="selected">
				{#if selectedRelics.length > 0}
					<div class="flex flex-wrap gap-2 border-t py-3 mx-3">
						{#each selectedRelics as { id }}
							{@const relic = relics[$rogueTopic].find((ele) => ele.id === id)}
							<button
								class="text-center"
								class:bg-slate-300={isRelicSelected(relic.id)}
								on:click={() => updateRelicFilters(relic.id)}
							>
								<img
									src="/images/relics/{relicLookup?.[relic.id] ?? relic.id}.webp"
									alt={relic[`name_${language}`] || relic['name_zh']}
									width="75"
									height="75"
									loading="lazy"
									decoding="async"
									class="mx-auto"
								/>
								<div class="px-2">
									<p class="text-sm">
										{relic[`name_${language}`] || relic['name_zh']}
									</p>
								</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</CharaFilterToggle>
	</div>
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

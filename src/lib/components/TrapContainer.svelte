<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language, Trap } from '$lib/types';
	import TogglePanel from './TogglePanel.svelte';
	import TrapHandbookDetails from './TrapHandbookDetails.svelte';
	import MediaQuery from './MediaQuery.svelte';
	import TrapTable from './TrapTable.svelte';

	export let language: Language, traps: Trap[], otherBuffsList, specialMods, mapConfig;
</script>

{#if traps?.length > 0}
	<TogglePanel
		title={getTranslations(language).trap}
		titleIcon={'/images/skill_icons/skill_icon_sktok_emp.webp'}
		isOpen={false}
		size="subheading"
		className="my-4"
	>
		<MediaQuery>
			<div class="grid grid-cols-[80px_auto] sm:flex flex-col" slot="mobile">
				<div
					class="grid grid-flow-row sm:flex auto-rows-max gap-2.5 px-2.5 h-[calc(100vh-172px)] sm:h-auto overflow-scroll no-scrollbar sticky sm:static top-20"
				>
					{#each traps as trap}
						<a href={`#${trap.key}`}>
							<div class="relative">
								<img
									class="select-none"
									src={`/images/chara_icons/${trap.key}.webp`}
									height="60px"
									width="60px"
									decoding="async"
									alt={trap.name}
								/>
							</div>
						</a>
					{/each}
				</div>
				<div class="flex flex-col">
					{#each traps as trap, index}
						{#if index !== 0}
							<div class="bg-neutral-700 mx-1 h-0.5" />
						{/if}
						<TrapHandbookDetails {trap} {otherBuffsList} {specialMods} {mapConfig} />
					{/each}
				</div>
			</div>
			<TrapTable {traps} {language} {specialMods} {otherBuffsList} {mapConfig} slot="pc" />
		</MediaQuery>
	</TogglePanel>
{/if}

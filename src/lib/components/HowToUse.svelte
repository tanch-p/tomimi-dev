<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';
	import floorHelp from '$lib/images/others/floor_title_help.webp';
	import relicHelp from '$lib/images/others/relic_help.webp';

	export let language: Language, rogueTopic: string;
</script>

<div class="px-2">
	<p>
		{getTranslations(language).how_to_use_main}
	</p>
	<p class="mt-2">{getTranslations(language).how_to_use_ui_list}</p>
	<ul class="list-disc pl-4 space-y-1">
		<li>
			{getTranslations(language).how_to_use_relic}
			<img src={relicHelp} alt="relic help" class="pl-0.5" />
		</li>
		<li>{getTranslations(language).how_to_use_elite_toggle}</li>
		{#if rogueTopic !== 'rogue_phantom'}
			<li>{getTranslations(language).how_to_use_diff}</li>
			<li>{getTranslations(language).how_to_use_floor}</li>
			<img src={floorHelp} alt="floor help" class="pl-0.5" />
		{/if}
		{#if rogueTopic === 'rogue_mizuki'}
			<li>{getTranslations(language).how_to_use_seaborn}</li>
			<li>{getTranslations(language).how_to_use_mission}</li>
		{:else if rogueTopic === 'rogue_sami'}
			<li>{getTranslations(language).how_to_use_chaos}</li>
		{:else if rogueTopic === 'rogue_phantom'}
			<li>{getTranslations(language).how_to_use_hallu}</li>
		{:else if rogueTopic === 'rogue_skz'}
			<li>{getTranslations(language).how_to_use_sarkaz}</li>
		{/if}
	</ul>
</div>

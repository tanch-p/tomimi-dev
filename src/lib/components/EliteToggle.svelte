<script lang="ts">
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';
	import skzRelics from '$lib/data/is/sarkaz/relics_sarkaz.json';
	import { relicLookup } from '$lib/data/is/relic_lookup';
	import { getEliteColors } from '$lib/functions/lib';
	import MediaQuery from './MediaQuery.svelte';
	import EliteToggleBar from './EliteToggleBar.svelte';

	interface Props {
		mapEliteMods: any;
		mapNormalMods: any;
		rogueTopic: string;
		runes: any;
		selectedRelics: any;
		stageId: string;
		eliteMode: any;
		inWaveOptions?: boolean;
	}

	let {
		mapEliteMods,
		mapNormalMods,
		rogueTopic,
		runes,
		selectedRelics,
		stageId,
		eliteMode,
		inWaveOptions = false
	}: Props = $props();

	const ro4_SP7_BOSS_STAGES = [
		'level_rogue4_b-4',
		'level_rogue4_b-4-b',
		'level_rogue4_b-5',
		'level_rogue4_b-5-b'
	];

	const updateEliteMods = (option: boolean) => {
		if (option) {
			runes.set(mapEliteMods);
			switch (rogueTopic) {
				case 'rogue_skz':
					{
						let relicId = '';
						if (ro4_SP7_BOSS_STAGES.includes(stageId)) {
							relicId = 'rogue_4_relic_final_6';
						}
						if (stageId === 'level_rogue4_b-8') {
							relicId = 'rogue_4_relic_final_10';
						}
						if (relicId) {
							if (!$selectedRelics.find((item) => item.id === relicId)) {
								const relic = skzRelics.find((item) => item.id === relicId);
								selectedRelics.set([...$selectedRelics, relic]);
							}
						}
					}
					break;
			}
		} else {
			runes.set(mapNormalMods);
		}
	};

	eliteMode.subscribe((v) => updateEliteMods(v));

	let [combatOpsColor, eliteOpsColor] = $derived(getEliteColors(rogueTopic));

	function getEliteIcon(stageId: string) {
		if (ro4_SP7_BOSS_STAGES.includes(stageId)) {
			return `/images/relics/${relicLookup['rogue_4_relic_final_6']}.webp`;
		}
		if (stageId === 'level_rogue4_b-8') {
			return `/images/relics/${relicLookup['rogue_4_relic_final_10']}.webp`;
		}
		return emergency_icon;
	}
</script>

{#if mapEliteMods}
	{#if inWaveOptions}
		<!-- used in wave options -->
		<EliteToggleBar {combatOpsColor} {eliteOpsColor} {eliteMode} {stageId} {getEliteIcon} />
	{:else}
		<MediaQuery>
			{#snippet pc()}
						<div  class="mt-8">
					<EliteToggleBar {combatOpsColor} {eliteOpsColor} {eliteMode} {stageId} {getEliteIcon} />
				</div>
					{/snippet}
			{#snippet mobile()}
						<button
					
					id="elite-toggle"
					class={`fixed z-3 bottom-[210px] right-[20px] md:right-[40px] flex items-center justify-center rounded-full w-[45px] h-[45px] pointer-events-auto ${
						$eliteMode ? `${eliteOpsColor}` : `${combatOpsColor}`
					}`}
					onclick={() => eliteMode.set(!$eliteMode)}
				>
					<img
						src={$eliteMode ? getEliteIcon(stageId) : combat_icon}
						width="40px"
						decoding="async"
						loading="lazy"
						alt={'elite toggle'}
						class=""
					/>
				</button>
					{/snippet}
		</MediaQuery>
	{/if}
{/if}

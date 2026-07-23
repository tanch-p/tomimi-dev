<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import duelIcon from '$lib/images/is/sui/node_duel.webp';
	import combatOpsIcon from '$lib/images/is/sui/node_battle.webp';
	import bossIcon from '$lib/images/is/sui/boss_focus.webp';
	import encounterIcon from '$lib/images/is/sui/node_inv.webp';
	import shopIcon from '$lib/images/is/sui/node_shop.webp';
	import candleIcon from '$lib/images/is/sui/node_stashed_recruit.webp';
	import portalIcon from '$lib/images/is/sui/node_spZone.webp';
	import dlc1PortalIcon from '$lib/images/is/sui/node_spZone_1.webp';
	import type { Language } from '$lib/types';
	import StageNavButton from '$lib/components/StageNav/StageNavButton.svelte';
	import StageNavGroup from '$lib/components/StageNav/StageNavGroup.svelte';
	import StageNavRow from '$lib/components/StageNav/StageNavRow.svelte';
	import StageSectionHeader from '$lib/components/StageNav/StageSectionHeader.svelte';
	import ro5 from '$lib/data/stages/ro5.json';
	import {
		bossStageGroups,
		candleRows,
		dlcPortalRows,
		duelRows,
		encounterRows,
		normalStageGroups,
		portalRows,
		shopRows
	} from './stageNavConfig';

	export let language: Language;

	$: translations = getTranslations(language);
</script>

<div class="mx-auto w-full min-w-0 max-w-6xl overflow-x-auto">
	<table class="text-xs sm:text-base">
		<tbody>
			<StageSectionHeader src={combatOpsIcon} alt={translations.combat_ops} />
			{#each normalStageGroups as group}
				<StageNavGroup {group} {language} button={StageNavButton} stages={ro5} />
			{/each}

			<StageSectionHeader src={bossIcon} alt={translations.boss_ops} />
			{#each bossStageGroups as group}
				<StageNavGroup {group} {language} button={StageNavButton} stages={ro5} />
			{/each}

			<StageSectionHeader src={encounterIcon} alt={translations.encounter} />
			{#each encounterRows as items, index}
				<StageNavRow
					{items}
					{language}
					button={StageNavButton}
					stages={ro5}
					label={index === 0 ? '?' : undefined}
					labelRowspan={24}
				/>
			{/each}

			<StageSectionHeader src={shopIcon} alt={translations.shop} includeLabelColumn={false} />
			{#each shopRows as items}
				<StageNavRow {items} {language} button={StageNavButton} stages={ro5} />
			{/each}

			<StageSectionHeader
				src={candleIcon}
				alt={translations.sui_candle}
				includeLabelColumn={false}
			/>
			{#each candleRows as items}
				<StageNavRow {items} {language} button={StageNavButton} stages={ro5} />
			{/each}

			<StageSectionHeader src={duelIcon} alt={translations.duel} includeLabelColumn={false} />
			{#each duelRows as items}
				<StageNavRow {items} {language} button={StageNavButton} stages={ro5} />
			{/each}

			<StageSectionHeader
				src={portalIcon}
				alt={translations.sui_portal}
				includeLabelColumn={false}
			/>
			{#each portalRows as items}
				<StageNavRow {items} {language} button={StageNavButton} stages={ro5} />
			{/each}

			<StageSectionHeader
				src={dlc1PortalIcon}
				alt={translations.sui_portal}
				label={6}
				labelRowspan={6}
			/>
			{#each dlcPortalRows as items}
				<StageNavRow {items} {language} button={StageNavButton} stages={ro5} />
			{/each}
		</tbody>
	</table>
</div>

<style>
	table {
		width: 100%;
		table-layout: fixed;
		color: #f2f2f2;
		text-align: center;
	}

	table :global(th),
	table :global(td) {
		border: 1px solid gray;
	}

	table :global(th) {
		padding: 6px 0;
	}

	table :global(th.empty) {
		border-width: 1px 0 1px 1px;
	}
</style>

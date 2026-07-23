<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import duelIcon from '$lib/images/is/black/icon_duel.webp';
	import combatOpsIcon from '$lib/images/is/black/icon_battle_normal.webp';
	import bossIcon from '$lib/images/is/boss_icon.webp';
	import encounterIcon from '$lib/images/is/black/icon_incident.webp';
	import shopIcon from '$lib/images/is/black/icon_shop.webp';
	import iconSavage from '$lib/images/is/black/icon_savage.webp';
	import iconBattleSavage from '$lib/images/is/black/icon_battle_savage.webp';
	import iconChase from '$lib/images/is/black/icon_chase.webp';
	import type { Language } from '$lib/types';
	import StageNavButton from '$lib/components/StageNav/StageNavButton.svelte';
	import StageNavGroup from '$lib/components/StageNav/StageNavGroup.svelte';
	import StageNavRow from '$lib/components/StageNav/StageNavRow.svelte';
	import StageSectionHeader from '$lib/components/StageNav/StageSectionHeader.svelte';
	import {
		bossStageGroups,
		duelRows,
		encounterRows,
		normalStageGroups,
		savageRows,
		savageBattleRows,
		shopRows,
		chaseStageGroups
	} from './stageNavConfig';

	export let language: Language;

	$: translations = getTranslations(language);
</script>

<div class="mx-auto w-full min-w-0 max-w-6xl overflow-x-auto">
	<table class="text-xs sm:text-base">
		<tbody>
			<StageSectionHeader
				type="square"
				adjustSize={true}
				src={combatOpsIcon}
				alt={translations.combat_ops}
			/>
			{#each normalStageGroups as group}
				<StageNavGroup {group} {language} button={StageNavButton} />
			{/each}
			<StageSectionHeader type="square" src={bossIcon} alt={translations.boss_ops} />
			{#each bossStageGroups as group}
				<StageNavGroup {group} {language} button={StageNavButton} />
			{/each}
			<StageSectionHeader
				type="square"
				adjustSize={true}
				src={iconChase}
				alt={translations.chase_battle}
			/>
			{#each chaseStageGroups as group}
				<StageNavGroup {group} {language} button={StageNavButton} />
			{/each}

			<StageSectionHeader
				type="square"
				adjustSize={true}
				src={encounterIcon}
				alt={translations.encounter}
			/>
			{#each encounterRows as items, index}
				<StageNavRow
					{items}
					{language}
					button={StageNavButton}
					label={index === 0 ? '?' : undefined}
					labelRowspan={24}
				/>
			{/each}

			<StageSectionHeader
				type="square"
				adjustSize={true}
				src={shopIcon}
				alt={translations.shop}
				includeLabelColumn={false}
			/>
			{#each shopRows as items}
				<StageNavRow {items} {language} button={StageNavButton} />
			{/each}

			<StageSectionHeader
				type="square"
				adjustSize={true}
				src={duelIcon}
				alt={translations.duel}
				includeLabelColumn={false}
			/>
			{#each duelRows as items}
				<StageNavRow {items} {language} button={StageNavButton} />
			{/each}
			<StageSectionHeader
				type="square"
				adjustSize={true}
				src={iconSavage}
				alt={translations.savage}
				includeLabelColumn={false}
			/>
			{#each savageRows as items}
				<StageNavRow {items} {language} button={StageNavButton} />
			{/each}
			<StageSectionHeader
				type="square"
				adjustSize={true}
				src={iconBattleSavage}
				alt={translations.savage_battle}
				includeLabelColumn={false}
			/>
			{#each savageBattleRows as items}
				<StageNavRow {items} {language} button={StageNavButton} />
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

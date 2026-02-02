<script lang="ts">
	import type { MapConfig, Language, RogueTopic } from '$lib/types';
	import translations from '$lib/translations.json';
	import TogglePanel from './TogglePanel.svelte';
	import { BONUS_ENEMY_KEYS } from '$lib/functions/lib';

	export let mapConfig: MapConfig,
		enemies,
		eliteMode: boolean,
		language: Language,
		rogueTopic: RogueTopic;

	function getMinMaxCount(id, eliteMode) {
		const data = mapConfig?.enemies.find((enemy) => id === enemy.id);
		if (data) {
			return eliteMode
				? {
						min: data.elite_min_count,
						max: data.elite_max_count
				  }
				: { min: data.min_count, max: data.max_count };
		}
		return { min: 0, max: 0 };
	}
	function getTotalCountStr(mapConfig, eliteMode: boolean) {
		const data = eliteMode ? mapConfig?.e_count ?? mapConfig?.n_count : mapConfig?.n_count;
		const lastIndex = data.length - 1;
		let min = data[0];
		let max = data[lastIndex];
		if (min === max) {
			return min;
		}
		return `${min} ~ ${max}`;
	}
	function isEnemyToShow(key: string, levelId: string) {
		switch (rogueTopic) {
			case 'rogue_sami':
				if (['enemy_1106_byokai'].includes(key)) return false;
				break;
			case 'rogue_skz':
				if (['enemy_2065_skzjs'].includes(key)) return false;
				break;
			case 'rogue_yan':
				if (['enemy_2119_dyshhj_2','enemy_2121_dyspl2'].includes(key)) return false;
				if (levelId.includes('_sv-') || levelId.includes('_fs-') || levelId.includes('_t-'))
					return true;
				break;
		}
		if (['enemy_2065_skzjs', 'enemy_1106_byokai'].includes(key)) return false;
		if (levelId.includes('_d-')) return true;
		switch (levelId) {
			case 'level_rogue4_t-6':
			case 'level_rogue4_b-6':
				return key === 'enemy_2067_skzcy' || !BONUS_ENEMY_KEYS.includes(key);
			case 'level_rogue4_3-3':
			case 'level_rogue4_4-3':
			case 'level_rogue4_ev-1':
			case 'level_rogue4_ev-2':
				return key === 'enemy_2070_skzfbx' || !BONUS_ENEMY_KEYS.includes(key);
			case 'level_rogue4_t-1':
			case 'level_rogue4_t-2':
			case 'level_rogue4_t-3':
			case 'level_rogue4_t-4':
				return (
					[
						'enemy_2001_duckmi',
						'enemy_2002_bearmi',
						'enemy_2034_sythef',
						'enemy_2085_skzjxd'
					].includes(key) || !BONUS_ENEMY_KEYS.includes(key)
				);
			case 'level_rogue4_t-8':
				return (
					['enemy_2070_skzfbx', 'enemy_2085_skzjxd'].includes(key) ||
					!BONUS_ENEMY_KEYS.includes(key)
				);
			default:
				return !BONUS_ENEMY_KEYS.includes(key);
		}
	}
</script>

<TogglePanel
	title={translations[language].enemy_count + ` (${getTotalCountStr(mapConfig, eliteMode)})`}
	isOpen={true}
	size="subheading"
	className="my-4"
>
	<div class="flex flex-wrap gap-x-4 gap-y-2 px-2.5 md:px-0">
		{#each enemies as enemy}
			{#if isEnemyToShow(enemy.key, mapConfig?.levelId)}
				{@const { min, max } = getMinMaxCount(enemy.stageId, eliteMode)}
				<a href="#{enemy.stageId}" class="relative flex items-center hover:bg-neutral-700">
					<img
						class="select-none w-[55px] md:w-[65px]"
						src={`/images/enemy_icons/${enemy.key}.webp`}
						height="65"
						width="65"
						decoding="async"
						alt={enemy.id}
						title={enemy[`name_${language}`] || enemy[`name_zh`]}
					/>
					{#if !['level_rogue4_d-1', 'level_rogue4_d-2', 'level_rogue4_d-3', 'level_rogue4_d-4'].includes(mapConfig?.levelId)}
						<p
							class="flex absolute right-[-3px] bottom-[-3px] bg-almost-black px-1 text-xs md:text-sm"
						>
							x&nbsp;
							{#if min === max}
								<span>{min ?? 0}</span>
							{:else}
								<span>{min}</span>
								<span>~</span>
								<span>{max}</span>
							{/if}
						</p>
					{/if}
				</a>
			{/if}
		{/each}
	</div>
</TogglePanel>

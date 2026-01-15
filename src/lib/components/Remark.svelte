<script lang="ts">
	import type { Enemy, Language, MapConfig, Skill, StatusImmune, Trap } from '$lib/types';
	import TextParser from './TextParser.svelte';
	import { parseValues } from '$lib/functions/skillHelpers';
	import SkillHead from './SkillHead.svelte';

	interface Props {
		entity: Enemy | Trap;
		formIndex: number;
		skill: Skill;
		language: Language;
		mode?: string;
		statusImmuneList?: StatusImmune[];
		mapConfig: MapConfig;
	}

	let {
		entity,
		formIndex,
		skill,
		language,
		mode = 'table',
		statusImmuneList = [],
		mapConfig
	}: Props = $props();

	const getTooltip = (
		entity: Enemy | Trap,
		formIndex: number,
		skill: Skill,
		language: Language
	) => {
		if (!skill.tooltip) return;

		return skill.tooltip[language].map((line) => {
			line = parseValues(entity, formIndex, skill, line, language,mapConfig, mode);
			if (statusImmuneList.includes('silence')) {
				line = line.replace('{can_silence}', '');
			}
			return line;
		});
	};

	let tooltips = $derived(getTooltip(entity, formIndex, skill, language));
	let showSilenceIcon =
		$derived((skill.can_silence || skill.tooltip?.zh?.some((line) => line.includes('can_silence'))) &&
		!statusImmuneList.includes('silence'));
</script>

{#if tooltips}
	<li class="py-1 {showSilenceIcon ? 'list-cross' : ''}">
		{#if skill.type === 'skill'}
			<SkillHead {entity} {skill} {language} {mode} {statusImmuneList} />
		{/if}
		{#each tooltips as line}
			<TextParser {line} />
		{/each}
	</li>
{/if}

<script lang="ts">
	import type { Enemy, Language, MapConfig, Skill, StatusImmune, Trap } from '$lib/types';
	import TextParser from './TextParser.svelte';
	import { parseValues } from '$lib/functions/skillHelpers';
	import SkillHead from './SkillHead.svelte';

	export let entity: Enemy | Trap,
		formIndex: number,
		skill: Skill,
		language: Language,
		mode = 'table',
		statusImmuneList: StatusImmune[] = [],
		mapConfig: MapConfig;

	const getTooltip = (
		entity: Enemy | Trap,
		formIndex: number,
		skill: Skill,
		language: Language
	) => {
		if (!skill.tooltip) return;

		return skill.tooltip[language].map((line) => {
			line = parseValues(entity, formIndex, skill, line, language, mapConfig, mode);
			if (statusImmuneList.includes('silence')) {
				line = line.replace('{can_silence}', '');
			}
			if (skill.buffloss) {
				return line + '{buffloss}';
			}
			return line;
		});
	};

	$: tooltips = getTooltip(entity, formIndex, skill, language);
	$: showSilenceIcon =
		(skill.can_silence || skill.tooltip?.zh?.some((line) => line.includes('can_silence'))) &&
		!statusImmuneList.includes('silence');
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

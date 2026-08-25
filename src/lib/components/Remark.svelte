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

	const buildTooltipLines = (
		entity: Enemy | Trap,
		formIndex: number,
		skill: Skill,
		language: Language
	): string[] | undefined => {
		const sourceLines = skill.tooltip?.[language];
		if (!sourceLines) return undefined;

		const isSilenceImmune = statusImmuneList.includes('silence');
		const suffix = skill.buffloss ? '{buffloss}' : '';

		return sourceLines.map((sourceLine) => {
			let line = parseValues(entity, formIndex, skill, sourceLine, language, mapConfig, mode);
			if (isSilenceImmune) {
				line = line.replace('{can_silence}', '');
			}
			return line + suffix;
		});
	};

	$: tooltips = buildTooltipLines(entity, formIndex, skill, language);
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
			<TextParser {line} {language} />
		{/each}
	</li>
{/if}

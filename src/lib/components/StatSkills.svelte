<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Enemy, Language, Skill, StatKey, Trap } from '$lib/types';
	import { getDmgEleHighlight } from '$lib/functions/parseAtkType';
	import { getStatSkillValue } from '$lib/functions/statHelpers';

	export let entity: Enemy | Trap,
		formIndex: number,
		skills: Skill[],
		stat: StatKey,
		statValue: number,
		language: Language;
	$: separator = language === 'en' ? '/' : '・';
	$: skillsToParse = skills
		.map((skill) => {
			if (skill.remove) return;
			if (skill[stat]) {
				const { suffix, hits, dmg_element } = skill;
				let value = statValue;
				if (skill[stat].value) {
					value = skill[stat].value;
				} else {
					if (entity.key.includes('trap')) {
						value = entity.stats[stat] * skill[stat].multiplier;
					} else {
						value = getStatSkillValue(entity, formIndex, skill, stat);
					}
				}
				return { suffix, value, hits: hits ?? 0, dmgEle: dmg_element ?? '' };
			}
			return;
		})
		.filter(Boolean);
</script>

{#each skillsToParse as skill}
	<p class="whitespace-nowrap">
		{skill.value}
		{#if stat === 'atk' && skill.hits > 1}{`x ${skill.hits}`}{/if}{' ('}{skill?.suffix?.[
			language
		]}{#if stat === 'atk' && skill.dmgEle}{separator}<span class={getDmgEleHighlight(skill.dmgEle)}
				>{getTranslations(language)[skill.dmgEle]}</span
			>{/if}{')'}
	</p>
{/each}

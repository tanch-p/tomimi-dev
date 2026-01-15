<script lang="ts">
	import { run } from 'svelte/legacy';

	import TextParser from './TextParser.svelte';

	interface Props {
		description: string[];
		blackboard?: any;
	}

	let { description, blackboard = {} }: Props = $props();

	//temp hack before the format for spTerrain replacement is sorted out
	const percentKeys = ['atk', 'atk_scale', 'HP_RECOVERY_PER_SEC_BY_MAX_HP_RATIO'];

	let fullDesc = $derived(description);
	run(() => {
		if (blackboard) {
			fullDesc = description.map((line) => {
				let temp = line;
				for (const key in blackboard) {
					if (percentKeys.includes(key)) {
						temp = temp.replace(`<${key}>`, blackboard[key] * 100);
					} else {
						temp = temp.replace(`<${key}>`, blackboard[key]);
					}
				}
				return temp;
			});
		}
	});
</script>

<td class="border border-gray-400 px-2 py-1.5">
	{#each fullDesc as line}
		<TextParser {line} />
	{/each}
</td>

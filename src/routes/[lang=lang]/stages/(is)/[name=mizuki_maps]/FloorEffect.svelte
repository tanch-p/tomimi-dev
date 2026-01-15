<script lang="ts">
	import type { Language } from '$lib/types';
	import { activeFloorEffects } from './stores';
	interface Props {
		effect: any;
		language: Language;
	}

	let { effect, language }: Props = $props();

	let selected = $state(false);

	activeFloorEffects.subscribe((list) => {
		selected = Boolean(list.find((ele) => ele.id === effect.id));
	});

	function handleClick() {
		if (!$activeFloorEffects.find((ele) => ele.id === effect.id)) {
			activeFloorEffects.update((list) => {
				if (list.length === 2) {
					return (list = [list[1], effect]);
				} else {
					return (list = [...list, effect]);
				}
			});
		} else {
			activeFloorEffects.update((list) => (list = list.filter((ele) => ele.id !== effect.id)));
		}
	}
	let name = $derived(effect[`outerName_${language}`]);
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	id={effect[`outerName_en`].replaceAll(' ', '_')}
	class={`grid grid-cols-[75px_auto] gap-x-2 hover:cursor-pointer ${
		selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
	}`}
	onclick={handleClick}
>
	<span class="flex items-center justify-center">
		<img src={effect.src} alt={name} loading="lazy" decoding="async" /></span
	>
	<div class="flex flex-col">
		<p class={`${selected ? 'text-red-400 font-semibold' : ''}`}>{name}</p>
		<p>{effect[`tooltip_${language}`]}</p>
	</div>
</div>

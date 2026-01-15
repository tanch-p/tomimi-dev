<script lang="ts">
	import type { Language } from '$lib/types';
	import { activeFloorEffects } from './stores';
	import wrath_bg from '$lib/images/is/sui/wrath_bad_back.webp';

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
	let name = $derived(effect[`name_${language}`] || effect[`name_zh`]);
</script>

<button
	id={effect.iconId}
	class={`grid grid-cols-[75px_auto] items-center gap-x-2 text-start ${
		selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
	}`}
	onclick={handleClick}
>
	<div class="relative flex items-center justify-center rounded-full h-7 overflow-hidden">
		<img src={wrath_bg} class="absolute z-0 -inset-[9999px] m-auto h-full" alt="" />
		<img src={effect.src} alt={name} loading="lazy" decoding="async" class="absolute z-1"/>
	</div>
	<div class="flex flex-col">
		<p class={`${selected ? 'text-[#ff382e] font-semibold' : ''}`}>
			{name}
		</p>
		<p>{effect[`tooltip_${language}`] || effect[`tooltip_zh`]}</p>
	</div>
</button>

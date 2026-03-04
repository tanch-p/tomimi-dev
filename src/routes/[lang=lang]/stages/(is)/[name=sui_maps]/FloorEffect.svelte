<script lang="ts">
	import type { Language } from '$lib/types';
	import { activeFloorEffects } from './stores';
	import wrath_bg from '$lib/images/is/sui/wrath_bad_back.webp';
	import wrath0_bg from '$lib/images/is/sui/wrath_bg_variation_color.png';

	export let effect, language: Language;

	let selected = false;

	activeFloorEffects.subscribe((list) => {
		selected = Boolean(list.find((ele) => ele.id === effect.id));
	});

	function handleClick() {
		if ($activeFloorEffects.find((ele) => ele.id === effect.id)) {
			//same
			activeFloorEffects.update((list) => (list = list.filter((ele) => ele.id !== effect.id)));
		} else if (
			$activeFloorEffects.length === 0 ||
			$activeFloorEffects.find((ele) => ele.iconId === effect.iconId)
		) {
			//empty
			activeFloorEffects.set([effect]);
		}
	}
	$: name = effect[`name_${language}`] || effect[`name_zh`];
</script>

<button
	id={effect.iconId}
	class={`grid grid-cols-[75px_auto] items-center gap-x-2 text-start ${
		selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
	}`}
	on:click={handleClick}
>
	<div class="relative flex items-center justify-center rounded-full h-7 overflow-hidden">
		<img
			src={effect.level === 0 ? wrath0_bg : wrath_bg}
			class="absolute z-0 -inset-[9999px] m-auto h-full"
			alt=""
		/>
		<img src={effect.src} alt={name} loading="lazy" decoding="async" class="absolute z-[1]" />
	</div>
	<div class="flex flex-col">
		<p class={`${selected ? 'text-[#ff382e] font-semibold' : ''}`}>
			{name}
		</p>
		<p>{effect[`tooltip_${language}`] || effect[`tooltip_zh`]}</p>
	</div>
</button>

<script lang="ts">
	import type { Language } from '$lib/types';
	import { activeFloorEffects } from './stores';

	export let effect: {
		id: string;
		iconId: string;
		level: number;
		src: string;
		name_zh: string;
		name_ja: string;
		name_en: string;
		tooltip_zh: string;
		tooltip_ja: string;
		tooltip_en: string;
	};
	export let language: Language;

	let selected = false;

	activeFloorEffects.subscribe((list) => {
		selected = Boolean(list.find((ele) => ele.id === effect.id));
	});

	function handleClick() {
		if (!$activeFloorEffects.find((ele) => ele.id === effect.id)) {
			activeFloorEffects.set([effect]);
		} else {
			activeFloorEffects.set([]);
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
	<div class="relative flex items-center justify-center rounded-full">
		<img src={effect.src} alt={name} loading="lazy" decoding="async" class="" />
	</div>
	<div class="flex flex-col">
		<p class={`${selected ? 'text-[#ff382e] font-semibold' : ''}`}>
			{name}
		</p>
		<p>{effect[`tooltip_${language}`] || effect[`tooltip_zh`]}</p>
	</div>
</button>

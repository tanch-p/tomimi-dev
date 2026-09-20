<script lang="ts">
	import { capsule } from './stores';
	interface Props {
		effect: any;
		language: string;
	}

	let { effect, language }: Props = $props();

	let selected = $state(false);

	capsule.subscribe((ele) => {
		selected = ele?.id === effect.id;
	});

	function handleClick() {
		if ($capsule?.id === effect.id) capsule.set(null);
		else capsule.set(effect);
	}
</script>

<button
	class={`grid grid-cols-[75px_auto] gap-x-2 text-start ${
		selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
	}`}
	onclick={handleClick}
>
	<img
		src={effect.src}
		alt={effect['name_zh']}
		width="50"
		height="50"
		class="mx-auto"
		loading="lazy"
		decoding="async"
	/>
	<div class="flex flex-col">
		<p class={`${selected ? 'text-red-400 font-semibold' : ''}`}>{effect['name_zh']}</p>
		<p>{effect[`tooltip_${language}`]}</p>
	</div>
</button>

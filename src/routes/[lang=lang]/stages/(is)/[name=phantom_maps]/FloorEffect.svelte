<script lang="ts">
	import { activeFloorEffects } from './stores';
	interface Props {
		effect: any;
		language: string;
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
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	class={`grid ${
		language === 'en' ? 'grid-cols-[110px_auto]' : 'grid-cols-[100px_auto]'
	} hover:cursor-pointer items-center py-1 ${selected ? 'bg-neutral-700' : 'hover:bg-neutral-700'}`}
	onclick={handleClick}
>
	<!-- <img src={effect.src} alt={effect['name_zh']} loading="lazy" decoding="async" /> -->
	<p class={`text-center ${selected ? 'text-red-400 font-semibold' : ''}`}>
		{effect[`innerName_${language}`]}
	</p>
	<div class="flex flex-col">
		<!-- <p class={`${selected ? 'text-red-400 font-semibold' : ''}`}>{effect['name_zh']}</p> -->
		<p>{effect[`tooltip_${language}`]}</p>
	</div>
</div>

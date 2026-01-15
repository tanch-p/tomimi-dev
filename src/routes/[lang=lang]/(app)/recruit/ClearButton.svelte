<script lang="ts">
	import type { Language } from '$lib/types';
	import { filtersStore, relicFiltersStore } from './stores';
	import Icon from '$lib/components/Icon.svelte';
	import translations from '$lib/translations.json';

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();

	const reset = () => {
		filtersStore.update((list) =>
			list.map((ele) => {
				return {
					...ele,
					options: ele.options.map((option) => {
						return { ...option, selected: false };
					})
				};
			})
		);
		relicFiltersStore.update((list) =>
			list.map((ele) => {
				return { ...ele, selected: false };
			})
		);
	};
</script>

<div class="fixed max-w-[1280px] mx-auto inset-0 z-50 pointer-events-none">
	<button
		class="absolute bottom-[150px] right-[20px] md:right-[40px] pointer-events-auto"
		onclick={() => reset()}
		id="scroll-top-button"
		title={translations[language].filter_reset_button}
	>
		<div
			class="flex items-center justify-center h-[45px] w-[45px] rounded-full bg-slate-700 hover:bg-[rgb(40,51,69)]"
		>
			<Icon name="trash" className="stroke-white" />
		</div>
	</button>
</div>

<script lang="ts">
	import type { Language } from '$lib/types';
	import mizukiOptions from '$lib/data/is/mizuki/variations_mizuki.json';
	import FloorEffect from './FloorEffect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import translations from '$lib/translations.json';
	import 争斗 from '$lib/images/is/mizuki/争斗.webp';
	import 徒长 from '$lib/images/is/mizuki/徒长.webp';
	import 众我 from '$lib/images/is/mizuki/众我.webp';
	import 给养 from '$lib/images/is/mizuki/给养.webp';

	interface Props {
		optionsOpen: boolean;
		language: Language;
	}

	let { optionsOpen, language }: Props = $props();

	const mizukiOptionsSrc = [争斗, 给养, 众我, 徒长];
	mizukiOptions.forEach((option, index) => {
		option.src = mizukiOptionsSrc[index];
	});
</script>

<div
	class={`absolute left-[50%] -translate-x-[50%] mt-2 w-screen md:w-[700px] max-h-[calc(100vh-160px)] overflow-y-auto pb-8 rounded-md shadow-lg select-none bg-[#1c1c1c] transition-[opacity_transform] ease-in duration-150 ${
		optionsOpen ? 'opacity-90 translate-y-0' : 'invisible opacity-0 -translate-y-10'
	}`}
>
	<FloorSelect {language} />
	<div class="mx-auto mt-3 md:px-8">
		<hr class="border-neutral-600" />
		<div class="px-2 md:px-0">
			<p class="mt-4 font-medium text-lg text-red-400 text-center">
				{translations[language].mizuki_seaborn_call}
				<!-- <span class="font-normal text-sm text-near-white"
				>{translations[language].variation_max_2}</span
			> -->
			</p>
			<p class="font-normal text-sm text-near-white text-center">
				({translations[language].variation_max_2})
			</p>

			<div class="flex flex-col gap-y-4 mt-2">
				{#each mizukiOptions as option}
					<FloorEffect effect={option} {language} />
				{/each}
			</div>
		</div>
	</div>
</div>

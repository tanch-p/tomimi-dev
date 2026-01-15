<script lang="ts">
	import phantomVariations from '$lib/data/is/phantom/variations_phantom.json';
	import FloorEffect from './FloorEffect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import translations from '$lib/translations.json';
	import capsulesList from '$lib/data/is/phantom/capsules.json';
	import CapsuleOption from './CapsuleOption.svelte';
	import rogue_1_capsule_8 from "$lib/images/is/phantom/rogue_1_capsule_8.webp"
	import rogue_1_capsule_21 from "$lib/images/is/phantom/rogue_1_capsule_21.webp"

	interface Props {
		optionsOpen: boolean;
		language: string;
	}

	let { optionsOpen, language }: Props = $props();

	capsulesList.forEach((ele,i) => ele.src = i === 0 ? rogue_1_capsule_8 : rogue_1_capsule_21)
</script>

<div
	class={`absolute left-[50%] -translate-x-[50%] mt-2 w-screen md:w-[700px] max-h-[calc(100vh-160px)] overflow-y-auto pb-8 rounded-md shadow-lg select-none bg-[#1c1c1c] transition-[opacity_transform] ease-in duration-150 ${
		optionsOpen ? 'opacity-90 translate-y-0' : 'invisible opacity-0 -translate-y-10'
	}`}
>
	<FloorSelect />
	<div class="mx-auto mt-3 md:px-8">
		<hr class="border-neutral-600" />
		<div class="pr-2 md:px-0">
			<p class="mt-4 font-medium text-lg text-red-400 text-center">
				{translations[language].phantom_variation_title}
			</p>
			<p class="font-normal text-sm text-near-white text-center">
				({translations[language].variation_max_2})
			</p>
			<div class="flex flex-col gap-y-4 mt-3">
				{#each phantomVariations as option}
					<FloorEffect effect={option} {language} />
				{/each}
			</div>
			<p class="mt-4 font-medium text-lg text-[#cea658] text-center">
				{translations[language].phantom_capsule}
			</p>
			<div class="flex flex-col gap-y-4 mt-3">
				{#each capsulesList as option}
					<CapsuleOption effect={option} {language} />
				{/each}
			</div>
		</div>
	</div>
</div>

<script lang="ts">
	import type {Language} from "$lib/types"
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import favicon from '$lib/images/favicon.webp';

	interface Props {
		language: Language;
		floorTitle?: import('svelte').Snippet;
	}

	let { language, floorTitle }: Props = $props();
</script>

<header
	class="sticky top-0 w-screen sm:w-full transition-none bg-neutral-800 text-near-white py-3.5 z-10"
>
	<div
		class="grid grid-cols-[50px_auto_50px] sm:grid-cols-[100px_auto_100px] max-w-7xl mx-auto px-2 sm:px-6 items-start"
	>
		<div class="w-max">
			<a href={`/${language}`}>
				<img src={favicon} width="32px" decoding="async" loading="lazy" alt="Home" />
			</a>
		</div>
		{#if floorTitle}{@render floorTitle()}{:else}
			<div></div>
		{/if}
		<div class="hidden sm:flex justify-end">
			<LanguageSwitcher />
		</div>
	</div>
</header>

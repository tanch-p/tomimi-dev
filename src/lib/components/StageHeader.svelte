<script lang="ts">
	import type { Language } from '$lib/types';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import favicon from '$lib/images/favicon.webp';

	interface Props {
		language: Language;
		floorTitle?: import('svelte').Snippet;
	}

	let { language, floorTitle }: Props = $props();
</script>

<header
	class="sticky top-0 w-screen sm:w-full transition-none bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-near-white py-3.5 z-10"
>
	<div
		class="grid grid-cols-[32px_minmax(0,1fr)_auto] sm:grid-cols-[160px_minmax(0,1fr)_160px] gap-y-1 max-w-7xl mx-auto px-2 sm:px-6 items-center"
	>
		<div class="w-max">
			<a href={`/${language}`}>
				<img src={favicon} width="32px" decoding="async" loading="lazy" alt="Home" />
			</a>
		</div>
		<div
			class="row-start-2 col-span-3 sm:row-start-1 sm:col-start-2 sm:col-span-1 min-w-0 flex justify-center"
		>
			{#if floorTitle}{@render floorTitle()}{/if}
		</div>
		<div class="row-start-1 col-start-3 flex items-center justify-end gap-1 sm:gap-2">
			<LanguageSwitcher />
		</div>
	</div>
</header>

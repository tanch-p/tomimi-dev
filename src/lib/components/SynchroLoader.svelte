<script lang="ts">
	import { onMount } from 'svelte';
	import { getTranslations } from '$lib/functions/languageHelpers';
	import type { Language } from '$lib/types';

	export let language: Language;
	let dialog: HTMLDialogElement;

	onMount(() => {
		dialog.showModal();
		return () => {
			if (dialog.open) dialog.close();
		};
	});
</script>

<dialog
	bind:this={dialog}
	class="fixed inset-0 z-[100] m-0 h-screen max-h-none w-screen max-w-none border-0 bg-black bg-opacity-80 p-0 text-near-white"
	aria-label={getTranslations(language).synchronising}
	on:cancel={(event) => event.preventDefault()}
>
	<div
		class="flex h-full w-full flex-col items-center justify-center gap-4"
		role="status"
		aria-live="polite"
		aria-busy="true"
	>
		<svg
			class="h-14 w-14 animate-spin text-sky-400"
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<circle class="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" />
			<path class="opacity-90" fill="currentColor" d="M12 3a9 9 0 0 1 9 9h-3a6 6 0 0 0-6-6V3Z" />
		</svg>
		<p class="text-xl font-medium">{getTranslations(language).synchronising}...</p>
	</div>
</dialog>

<style>
	dialog::backdrop {
		background: transparent;
	}
</style>

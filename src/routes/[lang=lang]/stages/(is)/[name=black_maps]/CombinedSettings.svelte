<script lang="ts">
	import { onDestroy } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { getTranslations } from '$lib/functions/languageHelpers';
	import { getEliteColors } from '$lib/functions/stageHelpers';
	import type { Language, RogueTopic } from '$lib/types';
	import {
		encodeUserRunState,
		tryDecodeUserRunState,
		type UserRunState
	} from '$lib/functions/userRunStateHelpers';
	import combatIcon from '$lib/images/is/black/icon_battle_normal.webp';
	import eliteIcon from '$lib/images/is/black/icon_battle_elite.webp';
	import DifficultySelect from '$lib/components/DifficultySelect.svelte';
	import EliteToggleBar from '$lib/components/EliteToggleBar.svelte';
	import FloorSettingsContent from './FloorSettingsContent.svelte';
	import { selectedRelics, selectedFloor, activeFloorEffects, gold } from './stores';

	interface Props {
		language: Language;
		rogueTopic: RogueTopic;
		mapConfig: any;
		difficulty: any;
		eliteMode: any;
		configIndex: number;
		onLoadState: (state: UserRunState) => void;
	}

	let { language, rogueTopic, mapConfig, difficulty, eliteMode, configIndex, onLoadState }: Props =
		$props();

	let dialog: HTMLDialogElement = $state();
	let loadDialog: HTMLDialogElement = $state();
	let trigger: HTMLButtonElement = $state();
	let loadTrigger: HTMLButtonElement = $state();
	let pastedCode = $state('');
	let loadError = $state(false);
	let copyError = $state(false);
	let copied = $state(false);
	let copyResetTimeout: ReturnType<typeof setTimeout> | undefined;

	let translations = $derived(getTranslations(language));
	let [combatOpsColor, eliteOpsColor] = $derived(getEliteColors(rogueTopic ?? 'rogue_black'));
	let currentState = $derived({
		topic: 'ro6' as const,
		relics: $selectedRelics.map((relic) => ({
			id: relic.id,
			...(relic.stages && Number.isSafeInteger(relic.count) ? { count: relic.count } : {})
		})),
		diff: $difficulty,
		...($activeFloorEffects[0]?.iconId ? { variation: $activeFloorEffects[0].iconId } : {}),
		gold: $gold,
		floor: $selectedFloor,
		...(configIndex !== 0 ? { configIndex } : {})
	});
	let runStateCode = $derived(encodeUserRunState(currentState));
	$effect(() => {
		if (runStateCode) copied = false;
	});

	onDestroy(() => clearTimeout(copyResetTimeout));

	function openSettings() {
		dialog.showModal();
	}

	function closeSettings() {
		dialog.close();
	}

	function closeOnBackdropClick(event: MouseEvent) {
		const target = event.currentTarget as HTMLDialogElement;
		if (event.target !== target) return;

		const { left, right, top, bottom } = target.getBoundingClientRect();
		if (
			event.clientX < left ||
			event.clientX > right ||
			event.clientY < top ||
			event.clientY > bottom
		) {
			target.close();
		}
	}

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(runStateCode);
			copyError = false;
			copied = true;
			clearTimeout(copyResetTimeout);
			copyResetTimeout = setTimeout(() => (copied = false), 1500);
		} catch {
			copyError = true;
		}
	}

	function openLoadDialog() {
		pastedCode = '';
		loadError = false;
		loadDialog.showModal();
	}

	function loadSettings() {
		const state = tryDecodeUserRunState(pastedCode.trim(), 'ro6');
		if (!state) {
			loadError = true;
			return;
		}
		onLoadState(state);
		loadDialog.close();
	}
</script>

<div class="px-2 sm:px-6 mt-2.5">
	<button
		bind:this={trigger}
		type="button"
		aria-haspopup="dialog"
		onclick={openSettings}
		class="rounded bg-neutral-700 px-4 py-2 font-semibold hover:bg-neutral-600"
	>
		{translations.settings} · {translations.difficulty}
		{$difficulty}
	</button>
</div>

<!-- Escape is handled by the native dialog; this click handler only targets the backdrop. -->
<dialog
	bind:this={dialog}
	aria-labelledby="combined-settings-title"
	onclick={closeOnBackdropClick}
	onclose={() => trigger?.focus()}
	class="w-[calc(100vw-1rem)] max-w-[720px] max-h-[calc(100vh-1rem)] overflow-hidden rounded-md bg-neutral-900 p-0 text-near-white shadow-2xl"
>
	<div class="flex items-center justify-between border-b border-neutral-700 px-4 py-3">
		<h2 id="combined-settings-title" class="text-xl font-semibold">
			{translations.settings}
		</h2>
		<button
			type="button"
			aria-label={translations.relic_overlay_close}
			onclick={closeSettings}
			class="rounded px-2 text-2xl leading-none hover:bg-neutral-700">×</button
		>
	</div>
	<div class="mx-2 mt-8 border-t border-neutral-700 pt-5 sm:mx-6">
		<p class="mb-2 font-semibold">{translations.run_state_code}</p>
		<div class="flex min-w-0 items-center gap-2 rounded bg-neutral-800 p-2">
			<code class="min-w-0 flex-1 truncate font-mono text-sm" title={runStateCode}
				>{runStateCode}</code
			>
			<button
				type="button"
				onclick={copyCode}
				aria-label={copied ? translations.copied : translations.copy_code}
				title={copied ? translations.copied : translations.copy_code}
				class="flex h-9 w-9 shrink-0 items-center justify-center rounded hover:bg-neutral-700"
			>
				<span class="relative grid h-6 w-6 place-items-center">
					{#if copied}
						<span
							class="absolute inset-0 grid place-items-center"
							in:scale|global={{ duration: 120, start: 0.7 }}
							out:scale|global={{ duration: 100, start: 0.7 }}
						>
							<svg
								class="absolute h-6 w-6 text-green-400"
								in:fade|global={{ duration: 120 }}
								out:fade|global={{ duration: 100 }}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								aria-hidden="true"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="m5 12 4 4L19 6" />
							</svg>
						</span>
					{:else}
						<span
							class="absolute inset-0 grid place-items-center"
							in:scale|global={{ duration: 120, start: 0.7 }}
							out:scale|global={{ duration: 100, start: 0.7 }}
						>
							<svg
								class="absolute h-6 w-6"
								in:fade|global={{ duration: 120 }}
								out:fade|global={{ duration: 100 }}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								aria-hidden="true"
							>
								<rect x="8" y="8" width="12" height="12" rx="2" />
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
								/>
							</svg>
						</span>
					{/if}
				</span>
			</button>
		</div>
		{#if copyError}
			<p role="alert" class="mt-2 text-red-400">{translations.copy_failed}</p>
		{/if}
		<button
			bind:this={loadTrigger}
			type="button"
			onclick={openLoadDialog}
			class="mt-4 rounded bg-neutral-700 px-4 py-2 hover:bg-neutral-600"
		>
			{translations.load_settings}
		</button>
	</div>
	<div class="max-h-[calc(100vh-5rem)] overflow-y-auto pb-8">
		<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={15} />
		{#if mapConfig?.elite_mods}
			<div class="px-2 sm:px-6 mt-4">
				<p class="text-subheading mb-3">{translations.operation_type}</p>
				<EliteToggleBar
					stageId={mapConfig?.levelId}
					{eliteMode}
					{combatOpsColor}
					{eliteOpsColor}
					getEliteIcon={() => eliteIcon}
					iconCombat={combatIcon}
					{rogueTopic}
					idPrefix="combined-settings"
				/>
			</div>
		{/if}
		<FloorSettingsContent {language} idPrefix="combined-settings" />
	</div>
</dialog>

<!-- Escape is handled by the native dialog; this click handler only targets the backdrop. -->
<dialog
	bind:this={loadDialog}
	aria-labelledby="load-settings-title"
	onclick={closeOnBackdropClick}
	onclose={() => loadTrigger?.focus()}
	class="w-[calc(100vw-1rem)] max-w-[560px] rounded-md bg-neutral-900 p-5 text-near-white shadow-2xl"
>
	<form
		onsubmit={(event) => {
			event.preventDefault();
			loadSettings();
		}}
	>
		<h2 id="load-settings-title" class="text-xl font-semibold">{translations.load_settings}</h2>
		<label for="run-state-input" class="mt-4 block">{translations.paste_run_state_code}</label>
		<input
			id="run-state-input"
			bind:value={pastedCode}
			oninput={() => (loadError = false)}
			autocomplete="off"
			autocapitalize="off"
			autocorrect="off"
			spellcheck="false"
			class="mt-2 w-full rounded bg-neutral-800 p-2 font-mono text-sm"
		/>
		{#if loadError}
			<p role="alert" class="mt-2 text-red-400">{translations.invalid_run_state_code}</p>
		{/if}
		<div class="mt-4 flex justify-end gap-2">
			<button
				type="button"
				onclick={() => loadDialog.close()}
				class="rounded px-4 py-2 hover:bg-neutral-700">{translations.cancel}</button
			>
			<button type="submit" class="rounded bg-sky-600 px-4 py-2 hover:bg-sky-500"
				>{translations.load}</button
			>
		</div>
	</form>
</dialog>

<style>
	dialog::backdrop {
		background: rgb(0 0 0 / 0.7);
	}
</style>

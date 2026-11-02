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
	let settingsTrigger: HTMLElement | undefined;
	let loadTrigger: HTMLButtonElement = $state();
	let pastedCode = $state('');
	let loadError = $state(false);
	let copyError = $state(false);
	let copied = $state(false);
	let linkCopied = $state(false);
	let copyResetTimeout: ReturnType<typeof setTimeout> | undefined;
	let shareResetTimeout: ReturnType<typeof setTimeout> | undefined;
	type Setting = 'difficulty' | 'operation' | 'floor' | 'weather' | 'variation';
	let selectedSetting = $state<Setting>('difficulty');

	let translations = $derived(getTranslations(language));
	let settingButtons = $derived<{ id: Setting; label: string }[]>([
		{ id: 'difficulty', label: translations.difficulty },
		...(mapConfig?.elite_mods
			? [{ id: 'operation' as const, label: translations.operation_type }]
			: []),
		{ id: 'floor', label: translations.floor },
		{ id: 'weather', label: translations.black_weather },
		{ id: 'variation', label: translations.black_variation }
	]);
	$effect(() => {
		if (selectedSetting === 'operation' && !mapConfig?.elite_mods) {
			selectedSetting = 'difficulty';
		}
	});
	let [combatOpsColor, eliteOpsColor] = $derived(getEliteColors(rogueTopic ?? 'rogue_black'));
	let currentState = $derived({
		topic: 'ro6' as const,
		relics: $selectedRelics.map((relic) => ({
			id: relic.id,
			...(relic.stages && Number.isSafeInteger(relic.count) ? { count: relic.count } : {})
		})),
		diff: $difficulty,
		eliteMode: $eliteMode,
		...($activeFloorEffects[0]?.iconId ? { variation: $activeFloorEffects[0].iconId } : {}),
		gold: $gold,
		floor: $selectedFloor,
		...(configIndex !== 0 ? { configIndex } : {})
	});
	let runStateCode = $derived(encodeUserRunState(currentState));
	$effect(() => {
		if (runStateCode) {
			copied = false;
			linkCopied = false;
		}
	});

	onDestroy(() => {
		clearTimeout(copyResetTimeout);
		clearTimeout(shareResetTimeout);
	});

	export function openSettings(trigger?: HTMLElement) {
		settingsTrigger = trigger;
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

	async function shareRunState() {
		try {
			const url = new URL(window.location.href);
			url.searchParams.set('state', runStateCode);
			await navigator.clipboard.writeText(url.toString());
			copyError = false;
			linkCopied = true;
			clearTimeout(shareResetTimeout);
			shareResetTimeout = setTimeout(() => (linkCopied = false), 1500);
		} catch {
			linkCopied = false;
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

<!-- Escape is handled by the native dialog; this click handler only targets the backdrop. -->
<dialog
	id="combined-settings-dialog"
	bind:this={dialog}
	aria-labelledby="combined-settings-title"
	onclick={closeOnBackdropClick}
	onclose={() => settingsTrigger?.focus()}
	class="m-auto w-[calc(100vw-1rem)] max-w-[720px] min-h-[min(28rem,80dvh)] max-h-[80dvh] overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800 p-0 text-neutral-800 dark:text-near-white shadow-2xl"
>
	<div class="flex shrink-0 items-center justify-between border-b border-neutral-700 px-4 py-3">
		<h2 id="combined-settings-title" class="text-xl font-semibold">
			{translations.settings}
		</h2>
		<button
			type="button"
			aria-label={translations.relic_overlay_close}
			id="combined-settings-close"
			onclick={closeSettings}
			class="rounded px-2 text-2xl leading-none hover:bg-neutral-300 dark:hover:bg-neutral-700"
			>×</button
		>
	</div>
	<div class="shrink-0 border-b border-neutral-700 px-4 py-3 text-center">
		<p class="mb-2 font-semibold">{translations.run_state_code}</p>
		<div class="flex min-w-0 justify-center gap-2 mt-1">
			<div class="flex min-w-0 items-center gap-2 rounded bg-white dark:bg-neutral-900 px-2">
				<code class="min-w-0 flex-1 truncate font-mono text-sm" title={runStateCode}>
					{runStateCode}
				</code>
				<!-- <button
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
				</button> -->
			</div>
			<!-- <button
				bind:this={loadTrigger}
				type="button"
				onclick={openLoadDialog}
				class="flex items-center justify-center gap-2 rounded bg-neutral-700 px-4 py-2 hover:bg-neutral-600"
			>
				<svg
					class="h-5 w-5 shrink-0"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M12 3v12m-5-5 5 5 5-5M5 15v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
				</svg>
				{translations.load_settings}
			</button> -->
			<button
				type="button"
				onclick={shareRunState}
				id="combined-settings-share"
				class="flex shrink-0 items-center justify-center gap-2 rounded bg-neutral-200 dark:bg-neutral-700 pl-3 pr-4 py-2 hover:bg-neutral-300 dark:hover:bg-neutral-600"
			>
				<svg
					class="h-5 w-5 shrink-0"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					{#if linkCopied}
						<path d="m5 12 4 4L19 6" />
					{:else}
						<circle cx="18" cy="5" r="3" />
						<circle cx="6" cy="12" r="3" />
						<circle cx="18" cy="19" r="3" />
						<path d="m8.6 10.5 6.8-4m-6.8 7 6.8 4" />
					{/if}
				</svg>
				{linkCopied ? translations.copied : translations.share_webpage}
			</button>
		</div>
	</div>
	{#if copyError}
		<p role="alert" class="mt-2 text-red-400">{translations.copy_failed}</p>
	{/if}
	<div
		class="flex shrink-0 flex-wrap gap-2 border-b border-neutral-700 p-3"
		role="group"
		aria-label={translations.settings}
	>
		{#each settingButtons as setting (setting.id)}
			<button
				type="button"
				id={`combined-settings-button-${setting.id}`}
				aria-pressed={selectedSetting === setting.id}
				aria-controls="combined-settings-panel"
				onclick={() => (selectedSetting = setting.id)}
				class={`min-w-0 grow ${settingButtons.length === 4 ? 'basis-[calc((100%_-_0.5rem)/2)]' : 'basis-[calc((100%_-_1rem)/3)] sm:basis-auto'} rounded px-3 py-2 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${selectedSetting === setting.id ? 'bg-sky-600 text-white' : 'bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600'}`}
			>
				{setting.label}
			</button>
		{/each}
	</div>
	<div
		id="combined-settings-panel"
		role="region"
		aria-labelledby={`combined-settings-button-${selectedSetting}`}
		class="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-2"
	>
		<div class="settings-panel-content mx-auto w-full max-w-[640px] shrink-0 text-center">
			{#if selectedSetting === 'difficulty'}
				<DifficultySelect {language} {difficulty} {rogueTopic} maxDiff={16} />
			{:else if selectedSetting === 'operation' && mapConfig?.elite_mods}
				<div class="px-2 sm:px-6 mt-4">
					<p class="text-xl mb-3">{translations.operation_type}</p>
					<div class="mb-2 grid grid-cols-2 text-center text-sm">
						<p>{translations.combat_ops}</p>
						<p>{translations.elite_ops}</p>
					</div>
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
			{:else if selectedSetting === 'floor' || selectedSetting === 'weather' || selectedSetting === 'variation'}
				<FloorSettingsContent {language} idPrefix="combined-settings" section={selectedSetting} />
			{/if}
		</div>
	</div>
</dialog>

<!-- Escape is handled by the native dialog; this click handler only targets the backdrop. -->
<dialog
	bind:this={loadDialog}
	aria-labelledby="load-settings-title"
	onclick={closeOnBackdropClick}
	onclose={() => loadTrigger?.focus()}
	class="m-auto w-[calc(100vw-1rem)] max-w-[560px] rounded-md bg-white dark:bg-neutral-900 p-5 text-neutral-800 dark:text-near-white shadow-2xl"
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
			class="mt-2 w-full rounded bg-neutral-100 dark:bg-neutral-800 p-2 font-mono text-sm"
		/>
		{#if loadError}
			<p role="alert" class="mt-2 text-red-400">{translations.invalid_run_state_code}</p>
		{/if}
		<div class="mt-4 flex justify-end gap-2">
			<button
				type="button"
				onclick={() => loadDialog.close()}
				class="rounded px-4 py-2 hover:bg-neutral-300 dark:hover:bg-neutral-700"
				>{translations.cancel}</button
			>
			<button type="submit" class="rounded bg-sky-600 text-white px-4 py-2 hover:bg-sky-500"
				>{translations.load}</button
			>
		</div>
	</form>
</dialog>

<style>
	dialog[open][aria-labelledby='combined-settings-title'] {
		display: flex;
		flex-direction: column;
	}

	.settings-panel-content :global(.counter) {
		justify-content: center;
	}

	dialog::backdrop {
		background: rgb(0 0 0 / 0.7);
	}
</style>

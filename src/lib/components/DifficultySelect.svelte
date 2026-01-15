<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { Language, RogueTopic } from '$lib/types';
	import { spring } from 'svelte/motion';
	import translations from '$lib/translations.json';
	import { setLocalStorage } from '$lib/functions/lib.js';

	interface Props {
		language: Language;
		difficulty: any;
		rogueTopic: RogueTopic;
		maxDiff?: number;
		mode?: string;
		children?: import('svelte').Snippet;
	}

	let {
		language,
		difficulty,
		rogueTopic,
		maxDiff = 15,
		mode = 'normal',
		children
	}: Props = $props();

	const getStorageKey = (rogueTopic) => {
		switch (rogueTopic) {
			case 'rogue_mizuki':
				return 'difficulty';
			default:
				const topic = rogueTopic.split('_')[1];
				return `${topic}_difficulty`;
		}
	};

	function updateDifficulty(n: number) {
		if (n < 0 || n > maxDiff) {
			return;
		}
		difficulty.update(() => n);
		setLocalStorage(getStorageKey(rogueTopic), n.toString());
	}
	let selectedDifficulty: number = $state();
	difficulty.subscribe((value) => {
		selectedDifficulty = value;
	});

	const displayed_count = spring();

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}
	let timer: NodeJS.Timeout = $state();
	let initialTimeout = 300;
	let minTimeout = 100;
	function startDecrement(timeout: number) {
		if (selectedDifficulty > 0) {
			timer = setTimeout(function () {
				updateDifficulty(selectedDifficulty - 1);
				startDecrement(Math.max(timeout - 100, minTimeout));
			}, timeout);
		}
	}
	function startIncrement(timeout: number) {
		if (selectedDifficulty < maxDiff) {
			timer = setTimeout(function () {
				updateDifficulty(selectedDifficulty + 1);
				startIncrement(Math.max(timeout - 100, minTimeout));
			}, timeout);
		}
	}
	run(() => {
		displayed_count.set(selectedDifficulty);
	});
	let offset = $derived(modulo($displayed_count, 1));
</script>

<div class="px-2 sm:px-6 select-none mt-2.5">
	<p class="text-subheading">{translations[language].difficulty}</p>
	{@render children?.()}
	{#if mode === 'normal'}
		<div class="counter">
			<button
				onmousedown={() => startDecrement(initialTimeout)}
				onmouseup={() => clearTimeout(timer)}
				onmouseleave={() => clearTimeout(timer)}
				onclick={() => updateDifficulty(selectedDifficulty - 1)}
				disabled={selectedDifficulty <= 0}
				aria-label="Decrease the counter by one"
				class="group"
				id="diff-minus"
			>
				<svg aria-hidden="true" viewBox="0 0 1 1">
					<path d="M0,0.5 L1,0.5" class="group-disabled:stroke-[#444]" />
				</svg>
			</button>

			<div class="counter-viewport select-none">
				<div class="counter-digits" style="transform: translate(0, {100 * offset}%)">
					<strong class="hidden" aria-hidden="true">{Math.floor($displayed_count + 1)}</strong>
					<strong id="diff-count">{Math.floor($displayed_count)}</strong>
				</div>
			</div>

			<button
				onmousedown={() => startIncrement(initialTimeout)}
				onmouseup={() => clearTimeout(timer)}
				onmouseleave={() => clearTimeout(timer)}
				onclick={() => updateDifficulty(selectedDifficulty + 1)}
				disabled={selectedDifficulty >= maxDiff}
				aria-label="Increase the counter by one"
				class="group"
				id="diff-plus"
			>
				<svg aria-hidden="true" viewBox="0 0 1 1">
					<path d="M0,0.5 L1,0.5 M0.5,0 L0.5,1" class="group-disabled:stroke-[#444]" />
				</svg>
			</button>
		</div>
	{/if}
</div>

<style>
	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	.counter button {
		width: 2em;
		padding: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 0;
		background-color: transparent;
		touch-action: manipulation;
		font-size: 2rem;
	}

	.counter button:hover {
		background-color: var(--color-bg-1);
	}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #d6d6d6;
	}

	.counter-viewport {
		width: 8em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
		color: #f2f2f2;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>

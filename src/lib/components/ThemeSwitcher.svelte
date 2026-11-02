<script lang="ts">
	import { onMount } from 'svelte';
	import type { Language } from '$lib/types';

	let { language }: { language: Language } = $props();
	let light = $state(false);
	let ready = $state(false);
	const labels = { en: 'Light mode', ja: 'ライトモード', zh: '浅色模式' };

	function applyTheme(enabled: boolean) {
		light = enabled;
		document.documentElement.dataset.theme = enabled ? 'light' : 'dark';
	}

	function toggleTheme(event: Event) {
		applyTheme((event.currentTarget as HTMLInputElement).checked);
		try {
			localStorage.setItem('theme', light ? 'light' : 'dark');
		} catch {
			// The switch still works when browser storage is unavailable.
		}
	}

	onMount(() => {
		applyTheme(document.documentElement.dataset.theme === 'light');
		ready = true;
		const syncTheme = (event: StorageEvent) => {
			if (event.key === 'theme' || event.key === null) applyTheme(event.newValue === 'light');
		};
		window.addEventListener('storage', syncTheme);
		return () => window.removeEventListener('storage', syncTheme);
	});
</script>

<label class="theme-switch" title={labels[language]}>
	<input
		type="checkbox"
		role="switch"
		aria-label={labels[language]}
		checked={light}
		disabled={!ready}
		onchange={toggleTheme}
	/>
	<span class="track" aria-hidden="true">
		<span class="thumb">
			{#if light}
				<svg viewBox="0 0 122.88 122.88" xmlns="http://www.w3.org/2000/svg">
					<path
						fill="#f97316"
						d="M30,13.21A3.93,3.93,0,1,1,36.8,9.27L41.86,18A3.94,3.94,0,1,1,35.05,22L30,13.21Zm31.45,13A35.23,35.23,0,1,1,36.52,36.52,35.13,35.13,0,0,1,61.44,26.2ZM58.31,4A3.95,3.95,0,1,1,66.2,4V14.06a3.95,3.95,0,1,1-7.89,0V4ZM87.49,10.1A3.93,3.93,0,1,1,94.3,14l-5.06,8.76a3.93,3.93,0,1,1-6.81-3.92l5.06-8.75ZM109.67,30a3.93,3.93,0,1,1,3.94,6.81l-8.75,5.06a3.94,3.94,0,1,1-4-6.81L109.67,30Zm9.26,28.32a3.95,3.95,0,1,1,0,7.89H108.82a3.95,3.95,0,1,1,0-7.89Zm-6.15,29.18a3.93,3.93,0,1,1-3.91,6.81l-8.76-5.06A3.93,3.93,0,1,1,104,82.43l8.75,5.06ZM92.89,109.67a3.93,3.93,0,1,1-6.81,3.94L81,104.86a3.94,3.94,0,0,1,6.81-4l5.06,8.76Zm-28.32,9.26a3.95,3.95,0,1,1-7.89,0V108.82a3.95,3.95,0,1,1,7.89,0v10.11Zm-29.18-6.15a3.93,3.93,0,0,1-6.81-3.91l5.06-8.76A3.93,3.93,0,1,1,40.45,104l-5.06,8.75ZM13.21,92.89a3.93,3.93,0,1,1-3.94-6.81L18,81A3.94,3.94,0,1,1,22,87.83l-8.76,5.06ZM4,64.57a3.95,3.95,0,1,1,0-7.89H14.06a3.95,3.95,0,1,1,0,7.89ZM10.1,35.39A3.93,3.93,0,1,1,14,28.58l8.76,5.06a3.93,3.93,0,1,1-3.92,6.81L10.1,35.39Z"
					/>
				</svg>
			{:else}
				<svg viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M7.914 0a6.874 6.874 0 00-1.26 3.972c0 3.875 3.213 7.017 7.178 7.017.943 0 1.843-.178 2.668-.5C15.423 13.688 12.34 16 8.704 16 4.174 16 .5 12.41.5 7.982.5 3.814 3.754.389 7.914 0z"
						fill-rule="evenodd"
					/>
				</svg>
			{/if}
		</span>
	</span>
</label>

<style>
	.theme-switch {
		position: relative;
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		width: 2.75rem;
		height: 2.75rem;
		cursor: pointer;
	}

	input {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
	}

	.track {
		width: 100%;
		height: 1.5rem;
		padding: 2px;
		border: 1px solid #737373;
		border-radius: 999px;
		background: #404040;
		pointer-events: none;
	}

	.thumb {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.125rem;
		height: 1.125rem;
		border-radius: 50%;
		background: #f2f2f2;
		color: #262626;
	}

	svg {
		width: 0.75rem;
		height: 0.75rem;
		fill: currentColor;
	}

	input:checked + .track {
		background: #0369a1;
		border-color: #0369a1;
	}

	input:checked + .track .thumb {
		transform: translateX(1.25rem);
	}

	input:focus-visible + .track {
		outline: 2px solid #38bdf8;
		outline-offset: 3px;
	}
</style>

<script lang="ts">
	import type { Language } from '$lib/types';
	import LanguageSwitcher from '$lib/components/LanguageSwitcher.svelte';
	import favicon from '$lib/images/favicon.webp';
	interface Props {
		language: Language;
	}

	let { language }: Props = $props();
</script>

<header class="bg-[#161417] text-near-white">
	<div class="grid grid-cols-3 items-center max-w-6xl mx-auto">
		<div>
			<a href={`/${language}`} class="text">
				<span class="mx-1">
					<img src={favicon} width="32px" alt="favicon" />
				</span>
				<span class="hidden md:block">tomimi.dev</span></a
			>
		</div>
		<nav>
			<ul>
				<li class="hover:text-neutral-400">
					<a href={`/${language}/about`}>About</a>
				</li>
				<li class="hover:text-neutral-400">
					<a href={`/${language}/donate`}
						>Donate <svg
							aria-hidden="true"
							height="16"
							viewBox="0 0 16 16"
							version="1.1"
							width="16"
							class="ml-1 fill-[#db61a2]"
						>
							<path
								d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"
							/>
						</svg></a
					>
				</li>
			</ul>
		</nav>
		<div class="flex justify-end pr-2">
			<LanguageSwitcher />
		</div>
	</div>
</header>

<style>
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		gap: 0 0.5rem;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	.text {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1rem;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}

	nav a:hover {
		color: var(--color-theme-1);
	}
</style>

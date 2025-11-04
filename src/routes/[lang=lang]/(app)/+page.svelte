<script lang="ts">
	import type { PageData } from './$types';
	import banner_mizuki from '$lib/images/banner_mizuki_800px.webp';
	import banner_phantom from '$lib/images/banner_phantom_800px.webp';
	import banner_sami from '$lib/images/banner_sami_800px.webp';
	import banner_sarkaz from '$lib/images/banner_sarkaz_800px.webp';
	import banner_sui from '$lib/images/banner_sui.webp';
	import laoli_banner from '$lib/images/laoli_sim.webp';
	import chara_banner from '$lib/images/chara_banner.webp';
	import translations from '$lib/translations.json';
	import ISLogo from '$lib/images/is_logo.webp';
	import toolsLogo from '$lib/images/CRA-X.webp';
	import FriendLinks from '$lib/components/FriendLinks.svelte';

	export let data: PageData;

	$: language = data.language;
	const is_banners = [
		{ alt: 'rogue_yan', src: banner_sui, href: 'sui' },
		{ alt: 'rogue_skz', src: banner_sarkaz, href: 'sarkaz' },
		{ alt: 'rogue_sami', src: banner_sami, href: 'sami' },
		{ alt: 'rogue_mizuki', src: banner_mizuki, href: 'mizuki' },
		{ alt: 'rogue_phantom', src: banner_phantom, href: 'phantom' }
	];
</script>

<svelte:head>
	<title>{translations[language].home} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].home} />
	<meta property="og:url" content={`https://tomimi.dev/${language}`} />
</svelte:head>

<section>
	<div class="h-[10vh]" />
	<div class="w-screen sm:w-full max-w-7xl mx-auto pb-32">
		<div class="flex flex-col items-center mx-auto gap-x-4 gap-y-8 px-2 sm:px-8 justify-center">
			<FriendLinks {language} />
			<div
				class="w-full md:w-[600px] bg-[#363636] shadow-lg md:shadow-xl pt-2 sm:py-3 px-2 sm:px-6"
			>
				<div class="flex items-center justify-center">
					<span>
						<img
							src={toolsLogo}
							alt={translations[language].related_tools}
							width="31"
							height="31"
						/>
					</span>
					<p class={`${language === 'en' ? 'text-sm font-bold' : 'font-semibold'}`}>
						{translations[language].related_tools}
					</p>
				</div>
				<div class="flex flex-wrap w-full justify-center gap-4 mt-3">
					<a href={`/${language}/recruit/`} class="hover:brightness-75">
						<div class="flex flex-col justify-center items-center">
							<img
								class="select-none mx-auto"
								src={chara_banner}
								decoding="async"
								alt={translations[language].chara_title}
								width="552"
								height="177"
							/>
							<p class={`my-1 `}>
								{translations[language].chara_title}
							</p>
						</div>
					</a>
					<a href={`/${language}/laoli/`} class="hover:brightness-75">
						<div class="flex flex-col justify-center items-center">
							<img
								class="select-none mx-auto"
								src={laoli_banner}
								decoding="async"
								alt={translations[language].laoli_title}
								width="552"
								height="177"
							/>
							<p class={`my-1 ${language !== 'en' ? 'whitespace-nowrap' : ''}`}>
								{translations[language].laoli_title}
							</p>
						</div>
					</a>
				</div>
			</div>
			<div class="md:w-[600px] bg-[#363636] shadow-lg md:shadow-xl pt-2 sm:py-3 px-2 sm:px-6">
				<div class="flex items-center justify-center">
					<span>
						<img src={ISLogo} alt={translations[language].isw} width="36" height="36" />
					</span>
					<p class={`${language === 'en' ? 'text-sm font-bold' : 'font-semibold'}`}>
						{translations[language].isw}
					</p>
				</div>
				<div class="flex flex-wrap w-full justify-center">
					{#each is_banners as { alt, src, href }}
						<a href={`/${language}/${href}`} class="hover:brightness-75">
							<img
								class="select-none mx-auto py-3"
								{src}
								decoding="async"
								alt={translations[language][alt]}
								width="552"
								height="200"
							/>
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	p {
		text-align: center;
		padding: 0 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}
</style>

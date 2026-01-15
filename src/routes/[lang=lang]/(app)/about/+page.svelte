<script lang="ts">
	import type { PageData } from './$types';
	import translations from '$lib/translations.json';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let language = $derived(data.language);
</script>

<svelte:head>
	<title>{translations[language].about_text}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
</svelte:head>

<div class="max-w-xl mx-auto space-y-24 py-24 px-2">
	<div>
		<p class="font-semibold text-lg">{translations[language].about_text}</p>

		<p class="mt-4">
			{translations[language].about_content}
		</p>
		<table class="w-full mt-4 sm:mt-8">
			<tbody>
				<tr>
					<td>Github</td>
					<td>
						<a href="https://github.com/tanch-p" target="_blank" rel="noopener noreferrer">
							<span class="text-blue-400 hover:text-blue-300">tanch-p</span>
						</a>
					</td>
				</tr>

				{#if language === 'zh'}
					<tr>
						<td class="w-[80px]">b站</td>
						<td>
							<a
								href="https://space.bilibili.com/42504309"
								target="_blank"
								rel="noopener noreferrer"
							>
								<span class="text-blue-400 hover:text-blue-300">塔塔酱AT4</span>
							</a>
						</td>
					</tr>
				{:else}
					<tr>
						<td class="w-[80px]">Discord</td>
						<td>@xiiao</td>
					</tr>
					<tr>
						<td class="w-[80px]">Email</td>
						<td>tomimi.dev@gmail.com</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
	<div>
		<p class="font-semibold text-lg">Content Credits</p>

		<p class="mt-4">
			Copyright for game resources/promotion material used belongs to Shanghai Hypergryph Network
			Technology Co., Ltd. and/or its affiliates, including YOSTAR (HONG KONG) LIMITED,
			株式会社Yostar, YOSTAR LIMITED, 龍成網路, and others.
		</p>

		<p class="mt-2">Assets from other sites used:</p>
		<table class="w-full mt-2">
			<tbody>
				<tr>
					<td>IS banners / Character, Enemy data/descriptions</td>
					<td>
						<a href="https://prts.wiki/" target="_blank" rel="noopener noreferrer">
							<span class="text-blue-400 hover:text-blue-300">PRTS wiki</span>
						</a>
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div>
		<p class="font-semibold text-lg">Special Thanks</p>
		<p class="mt-4">
			To all who helped in reporting errors/bugs!
		</p>
	</div>
</div>

<style>
	td {
		padding: 2px 0;
		border-width: 1px 0;
	}
</style>

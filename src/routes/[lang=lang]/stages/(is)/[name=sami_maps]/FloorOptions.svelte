<script lang="ts">
	import type { Language } from '$lib/types';
	import FloorEffect from './FloorEffect.svelte';
	import FloorSelect from './FloorSelect.svelte';
	import translations from '$lib/translations.json';
	import linear from '$lib/images/is/sami/非线性.webp';
	import blind from "$lib/images/is/sami/pic_rogue_3_chaos_9.webp"
	import chaosList from '$lib/data/is/sami/chaos_sami.json';
	import portal from '$lib/images/is/node_portal.webp';
	import { portalMods } from './stores';

	interface Props {
		optionsOpen: boolean;
		language: Language;
	}

	let { optionsOpen, language }: Props = $props();
	const portalDesc = {
		en: 'All enemies have Movement Speed -50%, but gain DEF +800, RES +30 and Weight level +1.',
		ja: '敵全員の移動速度50%減少、重量ランク1増加、防御力800増加、術耐性30増加',
		zh: '所有敌人移动速度下降（-50%），但重量（+1）、防御力（+800）、法术抗性提升（+30）'
	};
	const portalEffects = [
		{
			targets: ['ALL'],
			mods: [
				{ key: 'weight', value: 1, mode: 'add' },
				{ key: 'ms', value: 0.5, mode: 'mul' },
				{ key: 'def', value: 800, mode: 'add', order:"initial" },
				{ key: 'res', value: 30, mode: 'add',order:"initial" }
			]
		}
	];

	let portalSelected = $state(false);
	portalMods.subscribe((value) => {
		portalSelected = Boolean(value);
	});
	chaosList.forEach((option) => {
		option.src = option.shared_id === "chaos_3" ? linear : blind;
	});

	const handlePortalClick = () => {
		portalSelected ? portalMods.set(null) : portalMods.set(portalEffects);
	};
</script>

<div
	class={`absolute left-[50%] -translate-x-[50%] mt-2 w-screen md:w-[700px] max-h-[calc(100vh-160px)] overflow-y-auto pb-8 rounded-md shadow-lg select-none bg-[#1c1c1c] transition-[opacity_transform] ease-in duration-150 ${
		optionsOpen ? 'opacity-90 translate-y-0' : 'invisible opacity-0 -translate-y-10'
	}`}
>
	<FloorSelect {language} />
	<div class="mx-auto mt-3 md:px-8">
		<hr class="border-neutral-600" />
		<div class="px-2 md:px-0">
			<p class="mt-4 font-medium text-lg text-[#FF99CA] text-center">
				{translations[language].sami_portal}
			</p>
			<button
				id="sami-portal"
				class={`grid grid-cols-[75px_auto] gap-x-2 mt-2 hover:cursor-pointer text-start ${
					portalSelected ? 'bg-neutral-700' : 'hover:bg-neutral-700'
				}`}
				onclick={handlePortalClick}
			>
				<div class="relative flex items-center justify-center">
					<img
						src={portal}
						alt={translations[language].sami_portal}
						loading="lazy"
						decoding="async"
						class="z-1"
					/>
					{#if portalSelected}
						<div class="absolute w-[55px] h-[55px] portal-active"></div>
					{/if}
				</div>
				<div class="flex flex-col">
					<p class={`${portalSelected ? 'text-[#FF99CA] font-semibold' : ''}`}>
						{translations[language].sami_portal_buff}
					</p>
					<p>{portalDesc[language]}</p>
				</div>
			</button>
			<p class="mt-4 font-medium text-lg text-purple-400 text-center">
				{translations[language].sami_chaos}
			</p>
			<div class="flex flex-col gap-y-4 mt-2">
				{#each chaosList as option}
					<FloorEffect effect={option} {language} />
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.portal-active {
		clip-path: polygon(53% 4%, 97% 52%, 51% 97%, 5% 52%);
		background-color: #ff99ca;
	}
</style>

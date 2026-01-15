<script lang="ts">
	import type { Language } from '$lib/types';
	import DLDGPN from '$lib/images/is/DLDGPN.webp';
	import enemyCount from '$lib/images/is/enemy_count.webp';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';
	import translations from '$lib/translations.json';

	interface Props {
		spEnemyInfo: any;
		language: Language;
	}

	let { spEnemyInfo, language }: Props = $props();
</script>

<div class="w-max mx-auto overflow-hidden mt-6 mb-4">
	<div class="flex justify-center items-center gap-x-1 mt-0.5">
		<img
			src={DLDGPN}
			height="65px"
			width="65px"
			decoding="async"
			loading="lazy"
			alt="sp enemy"
			class="bg-[#0a0a0a] w-[55px] md:w-[65px]"
		/>
		<img
			src={enemyCount}
			alt="enemy count"
			decoding="async"
			loading="lazy"
			class="h-[35px] md:h-[45px]"
		/>
		<div class="flex flex-col gap-y-2">
			<div class="flex gap-x-2">
				{#if spEnemyInfo.elite && !(spEnemyInfo.normal == spEnemyInfo.elite)}
					<img
						src={combat_icon}
						width="40px"
						decoding="async"
						loading="lazy"
						alt="combat ops"
						class=""
					/>
				{/if}
				<span class="">{spEnemyInfo.normal}</span>
			</div>
			{#if spEnemyInfo.elite && !(spEnemyInfo.normal == spEnemyInfo.elite)}
				<div class="flex gap-x-2">
					<img
						src={emergency_icon}
						width="40px"
						decoding="async"
						loading="lazy"
						alt="combat ops"
						class=""
					/>
					<span class="">{spEnemyInfo.elite}</span>
				</div>
			{/if}
		</div>
	</div>
	<p class="text-[0.625rem] text-neutral-300">
		※{{
			zh: '只显示出货率100%的敌数',
			ja: '出現率100%のみ表示している',
			en: 'only counts with 100% chance are shown'
		}[language]}
	</p>
</div>

<style>
	span {
		font-weight: 500;
		font-size: 1.5rem /* 24px */;
		line-height: 2rem /* 32px */;
	}
</style>

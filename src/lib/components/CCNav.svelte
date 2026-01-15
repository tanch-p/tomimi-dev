<script lang="ts">
	import translations from '$lib/translations.json';

	interface Props {
		language: string;
	}

	let { language }: Props = $props();

	const dailyStages = [
		{ name: '迷雾战区', m: 10, d: 1, href: '迷雾战区_12-1' },
		{ name: '迷雾战区', m: 10, d: 2, href: '迷雾战区_12-1' },
		{ name: '尚蜀山道', m: 10, d: 3, href: '尚蜀山道_12-1' },
		{ name: '盐风溶洞', m: 10, d: 4, href: '盐风溶洞_12-1' },
		{ name: '伦蒂尼姆边缘区块', m: 10, d: 5, href: '伦蒂尼姆边缘区块_12-1' },
		{ name: '小丘郡物流站', m: 10, d: 6, href: '小丘郡物流站_12-1' },
		{ name: '在建沙滩', m: 10, d: 7, href: '在建沙滩_12-1' },
		{ name: '冻原矿场', m: 10, d: 8, href: '冻原矿场_12-1' },
		{ name: '盐风溶洞', m: 10, d: 9, href: '盐风溶洞_12-2' },
		{ name: '伦蒂尼姆边缘区块', m: 10, d: 10, href: '伦蒂尼姆边缘区块_12-2' },
		{ name: '小丘郡物流站', m: 10, d: 11, href: '小丘郡物流站_12-2' },
		{ name: '在建沙滩', m: 10, d: 12, href: '在建沙滩_12-2' },
		{ name: '冻原矿场', m: 10, d: 13, href: '冻原矿场_12-2' },
		{ name: '迷雾战区', m: 10, d: 14, href: '迷雾战区_12-2' }
	];

	const today = new Date();
	const isPickup = (d: number) => {
		return today.getDate() === d;
	};
</script>

<div class="border border-gray-500 text-center">
	<div class="border-b border-gray-500 py-2">{translations[language].index.perma_stage}</div>
	<a href="/{language}/stages/无名庇护所">
		<div class={`py-2 hover:cursor-pointer hover:bg-gray-600 text-indigo-300 `}>
			{translations[language].无名庇护所}
		</div>
	</a>
	<div class="border-y border-gray-500 py-2">
		{translations[language].index.daily_stage}
	</div>
	<div class="grid grid-cols-4 md:grid-cols-7 items-center gap-y-4 text-sm py-2">
		{#each dailyStages as stage}
			<a href="/{language}/stages/{stage.href}">
				<div
					class={`grid grid-rows-[auto_60px] md:grid-rows-[auto_48px] items-center ${
						isPickup(stage.d) ? 'bg-gray-600' : 'hover:bg-gray-600'
					}`}
				>
					<p>{stage.m}/{stage.d}</p>
					<p class={`flex justify-center items-center py-1 h-full text-indigo-300`}>
						{translations[language][stage.name] ?? stage.name}
					</p>
				</div>
			</a>
		{/each}
	</div>
</div>

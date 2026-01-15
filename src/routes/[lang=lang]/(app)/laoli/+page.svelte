<script lang="ts">
	import translations from '$lib/translations.json';
	import type { PageData } from './$types';
	import ActionBlock from './ActionBlock.svelte';
	import StunBlock from './StunBlock.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const creditsRoll = [
		{
			name: '@Sino_P',
			href: '12732821'
		},
		{
			name: '@我长颈鹿懂了',
			href: '25389972'
		},
		{
			name: '@里雪りあ_Official',
			href: '1684845011'
		},
		{
			name: '@塔塔酱AT4',
			href: '42504309'
		},
		{
			name: '@蓝色失智魔方Eke',
			href: '174802196'
		},
		{
			name: '@阿芙朵嘉の打字机',
			href: '176551416'
		},
		{
			name: '@天降光玉',
			href: '475608177'
		},
		{
			name: '@空気力学少女丶',
			href: '194571734'
		},
		{
			name: '@巴别塔攻略组',
			href: '21342479'
		}
	];

	let aspdInc = $state(0);
	let rounds = $state(20);
	let talentInset = $state(0);
	let resolution = $state(2);
	let initialTalentActivated = $state(true);
	let doqHP50 = $state(false);
	let moduleLevel = $state(3);



	function getEnemyLockFrame() {
		return Math.floor(Math.random() * 3);
	}

	function getFreezeTimings(
		rounds,
		f0,
		Fcold,
		freezeDuration,
		initialTalentActivated,
		talentInset,
		moduleLevel
	) {
		const jobCostReduction = moduleLevel === 0 ? 3 : 2;
		const talentCostReduction = moduleLevel === 3 ? 4 : 5;
		const stunDuration = moduleLevel >= 2 ? 4 * 30 : 3 * 30;
		let talentActivated = initialTalentActivated;
		let newF0 = f0 - getEnemyLockFrame();
		let newF1 = Fcold - getEnemyLockFrame();
		let newF2 = Fcold - getEnemyLockFrame();

		let costContainer = [];
		let initial2HitCounted = false;
		let counter = 1;
		let freezeIndexes = [];
		let fValues = [];
		let loopIndexCounter = 1;
		let prevCounter = 0;
		for (let i = 1; i < rounds * 90; i++) {
			if (counter > 0) {
				if (!initial2HitCounted && counter === newF0 + newF1) {
					fValues.push({ key: 'f0', value: newF0 }, { key: 'f1', value: newF1 });
					prevCounter = newF0 + newF1;
					if (!talentActivated) {
						// console.log("freeze at initial2", i);
						// console.log(counter);
						freezeIndexes.push({ index: 0, counter });
						fValues.push({ key: 'frz', value: freezeDuration, counter });
						initial2HitCounted = false;
						counter = -freezeDuration;
					} else {
						initial2HitCounted = true;
					}
					talentActivated = false;
					newF0 = f0 - getEnemyLockFrame();
					newF1 = Fcold - getEnemyLockFrame();
					newF2 = Fcold - getEnemyLockFrame();
				} else if (
					initial2HitCounted &&
					counter - prevCounter > 0 &&
					(counter - prevCounter) % (newF1 + newF2) === 0
				) {
					fValues.push({ key: 'f2', value: newF2 }, { key: 'f1', value: newF1 });
					prevCounter += newF1 + newF2;
					if (!talentActivated) {
						// console.log("freeze at loop2", i);
						// console.log(counter);
						fValues.push({ key: 'frz', value: freezeDuration, counter });
						freezeIndexes.push({ index: loopIndexCounter, counter });
						initial2HitCounted = false;
						counter = -freezeDuration;
						loopIndexCounter = 0;
						prevCounter = 0;
					}
					talentActivated = false;
					loopIndexCounter += 1;
					newF0 = f0 - getEnemyLockFrame();
					newF1 = Fcold - getEnemyLockFrame();
					newF2 = Fcold - getEnemyLockFrame();
				}
			}
			if (i - talentInset > 0 && (i - talentInset) % 90 === 0) {
				const costConsumed = jobCostReduction + (!talentActivated ? talentCostReduction : 0);
				costContainer.push(costConsumed);
				talentActivated = true;
			}
			counter += 1;
		}

		return { freezeIndexes, costContainer, fValues };
	}
	let timer: NodeJS.Timeout = $state();
	let initialTimeout = 300;
	let minTimeout = 50;
	function startDecrement(timeout: number) {
		if (Fcold > 1) {
			timer = setTimeout(function () {
				Fcold -= 1;
				startDecrement(Math.max(timeout - 100, minTimeout));
			}, timeout);
		}
	}
	function startIncrement(timeout: number) {
		if (Fcold < 80) {
			timer = setTimeout(function () {
				Fcold += 1;
				startIncrement(Math.max(timeout - 100, minTimeout));
			}, timeout);
		}
	}
	let language = $derived(data.language);
	let f0 = $derived(Math.round((1 / ((100 + aspdInc) / 100)) * 14));
	let Fnormal = $derived(Math.round((1 / ((100 + aspdInc) / 100)) * 30));
	let Fcold = $derived(Math.round((1 / ((100 - 30 + aspdInc) / 100)) * 30));
	let freezeDuration = $derived(doqHP50 ? 120 : 60);
	let results = $derived(getFreezeTimings(
		rounds,
		f0,
		Fcold,
		freezeDuration,
		initialTalentActivated,
		talentInset,
		moduleLevel
	));
	let freezeTimings = $derived(results.freezeIndexes); //used for debug
	let fValues = $derived(results.fValues);
	let costReductions = $derived(results.costContainer);
	let costReductionPerMinute = $derived(costReductions.reduce(
		(acc, curr, i) => {
			const insertIndex = Math.floor(i / 20);
			if (!acc[insertIndex]) {
				acc[insertIndex] = 0;
			}
			acc[insertIndex] = acc[insertIndex] + curr;
			return acc;
		},
		[0]
	));
</script>

<svelte:head>
	<title>{translations[language].laoli_title} / {translations[language].title_post}</title>
	<meta name="description" content={translations[language].title_post} />
	<meta property="og:description" content={translations[language].title_post} />
	<meta property="og:title" content={translations[language].laoli_title} />
	<meta property="og:url" content={`https://tomimi.dev/${language}/laoli`} />
</svelte:head>

<div class="min-w-screen min-h-screen bg-[#f2f2f2] text-[#222222]">
	<div class="max-w-7xl mx-auto py-16 md:px-4">
		<h1 class="text-center text-2xl font-bold mb-10">{translations[language].laoli_title}</h1>
		<p class="text-lg font-bold">
			原理解析：
			<a
				class="text-sky-500 hover:underline"
				href="https://www.bilibili.com/video/BV1BF411R7Bx/"
				target="_blank"
			>
				bilibili
			</a>
		</p>
		<p class="my-4">※{translations[language].laoli_f_explain}</p>
		<div class="flex flex-col gap-y-2">
			<label>
				<span class="text-right pr-2">{translations[language].laoli_zoom}</span>
				<input type="number" bind:value={resolution} min="1" max="10" step="1" />
				<span class="text-right px-2">1</span>
				<input type="range" bind:value={resolution} min="1" max="10" step="1" />
				<span class="text-left px-2">10</span>
			</label>
			<label>
				<span class="text-right pr-2">{translations[language].laoli_rounds}</span>
				<input type="number" bind:value={rounds} min="20" max="100" step="1" />
				<span class="text-right px-2">20</span>
				<input type="range" bind:value={rounds} min="20" max="100" step="5" />
				<span class="text-left px-2">100</span>
			</label>
			<label class="mb-3">
				<span class="text-right pr-2">{translations[language].laoli_module_lvl}</span>
				<button
					class="border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"
					onclick={() => (moduleLevel -= 1)}
					disabled={moduleLevel <= 0}
				>
					－
				</button>
				<input
					class="text-center"
					type="number"
					bind:value={moduleLevel}
					min="0"
					max="3"
					step="1"
				/>
				<button
					class="border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"
					onclick={() => (moduleLevel += 1)}
					disabled={moduleLevel >= 3}
				>
					＋
				</button>
			</label>
			<label>
				<span class="text-right pr-2">{translations[language].laoli_talent_adjust}</span>
				<input type="number" bind:value={talentInset} min="0" max="90" step="1" />
				<span class="text-right px-2">0</span>
				<input type="range" bind:value={talentInset} min="0" max="90" step="5" />
				<span class="text-left px-2">90</span>
			</label>
			<label>
				<span class="text-right pr-2">{translations[language].laoli_aspd}</span>
				<input type="number" bind:value={aspdInc} min="0" max="300" step="1" />
				<span class="text-right px-2">0</span>
				<input type="range" bind:value={aspdInc} min="0" max="300" step="1" />
				<span class="text-left px-2">300</span>
			</label>
			<label>
				<span class="text-right pr-2">{translations[language].laoli_f0}(F0)</span>
				<button
					class="border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"
					onclick={() => (f0 -= 1)}
					disabled={f0 <= 0}
				>
					－
				</button>
				<input class="text-center" type="number" bind:value={f0} min="0" max="14" step="1" />
				<button
					class="border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"
					onclick={() => (f0 += 1)}
					disabled={f0 >= 18}
				>
					＋
				</button>
			</label>
			<p class="pl-[68px]">Fnormal: {Fnormal} &nbsp&nbsp Fcold: {Fcold}</p>
			<div class="grid grid-cols-[140px_auto_auto_auto] w-max">
				<span class="text-right pr-2">{translations[language].laoli_fCold}(F1,F2)</span>
				<button
					class="border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"
					onmousedown={() => startDecrement(initialTimeout)}
					onmouseup={() => clearTimeout(timer)}
					onmouseleave={() => clearTimeout(timer)}
					onclick={() => (Fcold -= 1)}
					disabled={Fcold <= 1}
				>
					－
				</button>
				<input class="text-center" type="number" bind:value={Fcold} min="0" max="60" step="1" />
				<button
					class="border rounded bg-neutral-200 active:bg-neutral-300 w-7 text-lg"
					onmousedown={() => startIncrement(initialTimeout)}
					onmouseup={() => clearTimeout(timer)}
					onmouseleave={() => clearTimeout(timer)}
					onclick={() => (Fcold += 1)}
					disabled={Fcold >= 80}
				>
					＋
				</button>
			</div>
			<label class="mt-3">
				<span class="text-right pr-2">{translations[language].laoli_initial_talent_on}</span>
				<input class="justify-self-start" type="checkbox" bind:checked={initialTalentActivated} />
			</label>
			<label>
				<span class="text-right pr-2">{translations[language].laoli_doq_hp50}</span>
				<input class="justify-self-start" type="checkbox" bind:checked={doqHP50} />
			</label>
		</div>
		<p class="text-lg font-bold text-center mt-3 mb-2">
			COST/min:
			{#each costReductionPerMinute as cost, i}
				{#if i > 0}
					,
				{/if}
				{cost}
			{/each}
		</p>
		<div class="flex flex-col overflow-auto px-1.5 md:px-0">
			<StunBlock {resolution} {fValues} {moduleLevel} />
			<div class="flex w-max" style={`margin-left:${talentInset * resolution}px`}>
				{#each Array(rounds) as _, index}
					<div class="flex flex-col items-center">
						<p class="text-lg font-bold">{index + 1}</p>
						<div
							class={`h-[24px] border-r border-black ${
								index % 2 === 0 ? 'bg-neutral-900' : 'bg-gray-600'
							}`}
							style={`width:${90 * resolution}px`}
						></div>
					</div>
				{/each}
			</div>
			<ActionBlock {resolution} {fValues} {freezeDuration} />
		</div>
		<p class="text-lg font-bold text-center mt-2">{translations[language].legend}</p>
		<div
			class="flex flex-col md:flex-row md:flex-wrap justify-evenly gap-y-2.5 rounded border bg-slate-200 py-2.5 px-3 md:px-0"
		>
			<div class="flex items-center gap-x-2">
				<div class="h-4 w-4 bg-[#fdfc01]"></div>
				<span> {translations[language].laoli_f0} </span>
			</div>
			<div class="flex items-center gap-x-2">
				<div class="h-4 w-4 bg-[#f8cc47]"></div>
				<div class="h-4 w-4 bg-[#f28b00]"></div>
				<span> {translations[language].laoli_fCold} </span>
			</div>
			<div class="flex items-center gap-x-2">
				<div class="h-4 w-4 bg-[#34c2e6]"></div>
				<span> {translations[language].laoli_freeze_duration} </span>
			</div>
			<div class="flex items-center gap-x-2">
				<div class="h-4 w-4 bg-neutral-900"></div>
				<div class="h-4 w-4 bg-gray-600"></div>
				<span>{translations[language].laoli_talent}</span>
			</div>
			<div class="flex items-center gap-x-2">
				<div class="h-4 w-4 bg-[#8d2828]"></div>
				<span> {translations[language].laoli_stun_duration} </span>
			</div>
		</div>
		<!-- <p class="text-lg font-bold mt-8">Debug用</p>
		<p>
			冻结Index（0起步）：
			{#each freezeTimings as { index }, i}
				{#if i > 0}
					,
				{/if}
				{index}
			{/each}
		</p>
		<p>
			Cost：
			{#each costReductions as cost, i}
				{#if i > 0}
					,
				{/if}
				{cost}
			{/each}
		</p>
		<p>
			F values:
			{#each fValues as { key, value }, i}
				{#if i > 0}
					,
				{/if}
				{value}
			{/each}
		</p> -->
		<div class="pl-3 md:pl-0">
			<p class="text-lg font-bold mt-8">{translations[language].laoli_credits}</p>
			<ul class="flex flex-col gap-y-2">
				{#each creditsRoll as up}
					<li>
						<a
							class="text-sky-500 hover:underline"
							href={`https://space.bilibili.com/${up.href}`}
							target="_blank"
						>
							{up.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	label {
		display: grid;
		grid-template-columns: 140px auto auto auto auto;
		width: max-content;
	}
	label:has(:global(input[type='range'])) {
		display: grid;
		grid-template-columns: 140px 60px 40px 150px 40px;
		width: max-content;
		align-items: center;
	}
	label:has(:global(input[type='range'])) input[type='number'] {
		padding-left: 8px;
	}
	input[type='number'] {
		width: 60px;
	}
	@media only screen and (max-width: 640px) {
		label:has(:global(input[type='range'])) {
			display: grid;
			grid-template-columns: 140px 60px 30px 100px 30px;
			width: max-content;
		}
	}
</style>

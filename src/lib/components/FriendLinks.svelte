<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import friendlink from '$lib/images/friendlink.webp';

	export let language: Language;

	const tts = {
		zh: {
			title: '通天国际联赛#2',
			link: 'https://live.bilibili.com/22476160',
			desc: '由巴别塔攻略组、Lungmen Dragons、極東攻略組、Team Keo、啊？戈爾舟遊籌措會共同举办的第三方全球性集成战略比赛：通天国际联赛#2正在进行中！点击图片即可查看赛事直播'
		},
		ja: {
			title: '【探索者の银凇止境】通天国際大会#2',
			link: 'https://www.youtube.com/@projektfuji9085/streams',
			desc: '大陸鯖の巴别塔攻略组、TWの啊?戈爾舟遊籌措會、グローバルのLungmen Dragons、日本の極東攻略組と韓国のTeam Keoが共催している【探索者の银凇止境】「通天国際大会#2」が開催中！画像をクリックするとライブ配信をご覧いただけます'
		},
		en: {
			title: 'Skywalking Global League #2',
			link: 'https://www.youtube.com/@projektfuji9085/streams',
			desc: 'Jointly brought to you by CN - Babel Strategy Team, TW - Aegir Organizing Committee, Global - Lungmen Dragons, JP - Projekt Fuji, KR - Team Keo, Skywalking Global League #2 is now underway! Click the image to go to the live stream'
		}
	};
</script>

<div class="w-full md:w-150 bg-[#363636] shadow-lg md:shadow-xl pt-2 sm:py-3 px-2 sm:px-6">
	<div class="flex items-center justify-center">
		<span>
			<img src={friendlink} alt={'友情链接'} width="31" height="29" />
		</span>
		<p class={`font-semibold`}>{translations[language].friendlink}</p>
	</div>

	<div class="flex flex-wrap w-full justify-center mt-3">
		<a href={tts[language].link} target="_blank" rel="noopener noreferrer">
			<div class="flex flex-col justify-center items-center">
				<div class="group relative">
					<!-- <img class="selectƒ-none mx-auto" src={tts_banner} decoding="async" alt={'banner'} /> -->
					<div
						class="hidden group-hover:flex absolute inset-0 m-auto items-center justify-center bg-black bg-opacity-50 text-xl"
					>
						<div class="bg-neutral-900 bg-opacity-70 px-4 py-1.5">
							{translations[language].go_to_link}→
						</div>
					</div>
				</div>
				<p class={`my-1 whitespace-nowrap`}>{tts[language].title}</p>
			</div>
		</a>

		<p class="italic text-[#aaa] leading-snug">
			{tts[language].desc}
		</p>
	</div>
</div>

<style>
	p {
		text-align: center;
		padding: 0 0.5rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
	}
</style>

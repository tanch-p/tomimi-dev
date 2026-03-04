<script lang="ts">
	import type { Language } from '$lib/types/types';
	import translations from '$lib/translations.json';
	import { filterDescStore } from './stores.old';
	import { getDisplayKey } from '$lib/functions/chara/charaHelpers';
	import TextParser from '$lib/components/TextParser.svelte';
	import { generateSkillDesc as generateSkillDesc_zh } from '$lib/functions/chara/filterDescHelpers_zh';
	import { generateSkillDesc as generateSkillDesc_ja } from '$lib/functions/chara/filterDescHelpers_ja';
	import { generateSkillDesc as generateSkillDesc_en } from '$lib/functions/chara/filterDescHelpers_en';

	interface Props {
		language: Language;
	}

	let { language }: Props = $props();

	let defaultLine = $derived(translations[language].chara_filter_start);

	let line = $derived(defaultLine);

	const generateDescFunc = (
		activeOptions,
		bbTagHolder,
		language,
		filterMode,
		relicActiveOptions,
		rogueTopic,
		otherOptions
	) => {
		let fn;
		switch (language) {
			case 'ja':
				fn = generateSkillDesc_ja;
				break;
			case 'en':
				fn = generateSkillDesc_en;
				break;
			default:
				fn = generateSkillDesc_zh;
				break;
		}
		return fn(
			activeOptions,
			bbTagHolder,
			language,
			filterMode,
			relicActiveOptions,
			rogueTopic,
			otherOptions
		);
	};

	const getReplaceOperatorFlag = (language, text) => {
		switch (language) {
			case 'en':
				return text.includes('<profession>') && text.includes('<subProfessionId>');
			case 'zh':
			case 'ja':
				return text.includes('<subProfessionId>');
		}
	};
	filterDescStore.subscribe(({ activeOptions, relicActiveOptions, filterMode, rogueTopic }) => {
		line = getDesc(activeOptions, relicActiveOptions, filterMode, rogueTopic);
	});

	function getDesc(activeOptions, relicActiveOptions, filterMode, rogueTopic) {
		if (activeOptions.length === 0 && relicActiveOptions.length === 0) {
			return defaultLine;
		}
		let text = translations[language].chara_filter_desc;
		//1. replace active keys
		const bbTagHolder = [];
		const otherOptions = [];
		for (const ele of activeOptions) {
			if (['tags', 'blackboard', 'blockCnt','spType'].includes(ele.key)) {
				bbTagHolder.push(
					...ele.options
						.map(({ value, selected }) => selected && value)
						.filter((val) => val === 0 || Boolean(val))
				);
			} else if (['group', 'deployable_tile'].includes(ele.key)) {
				otherOptions.push(ele);
			} else {
				let value = ele.options
					.map(({ value, selected }) => {
						const key = getDisplayKey(value);
						return (
							selected &&
							(translations[language].table_headers[key] ??
								translations[language][key] ??
								translations[language].types[key])
						);
					})
					.filter(Boolean)
					.join('/');
				let key = ele.key;
				value =
					(translations[language]['chara_filter']?.[`${key}_pre`] ?? '') +
					'<@bluehl>' +
					value +
					'</>' +
					(translations[language]['chara_filter']?.[`${key}_post`] ?? '');

				text = text.replace(`<${key}>`, value);
			}
		}
		const desc = generateDescFunc(
			activeOptions,
			bbTagHolder,
			language,
			filterMode,
			relicActiveOptions,
			rogueTopic,
			otherOptions
		);
		text = text.replace(`<options>`, desc);
		let replaceOperatorFlag = getReplaceOperatorFlag(language, text);
		if (replaceOperatorFlag) {
			text = text.replace('<operator>', translations[language].operator);
		}
		const regex = /<\w+>/g;
		text = text.replaceAll(regex, '');
		return text;
	}
</script>

<div
	class="fixed z-10 bottom-0 w-full p-2.5 pb-3 md:p-4 bg-[#333] text-near-white text-center {language ===
	'en'
		? 'text-base md:text-lg'
		: 'text-lg md:text-xl'} "
>
	<div class="max-w-[1200px] w-full mx-auto">
		<TextParser {line} />
	</div>
</div>

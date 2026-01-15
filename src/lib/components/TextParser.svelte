<script lang="ts">
	import { run } from 'svelte/legacy';

	import { page } from '$app/state';
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import termDesc from '$lib/data/term_desc.json';
	import { onMount } from 'svelte';

	const HTML_TAGS = ['span', 'br', 'div', 'h4', 'h5', 'h6'];

	
	interface Props {
		// note to self do not ever use <text> for special parsing usage when using inner HTML...
		line: string;
		// note to self do not ever use <text> for special parsing usage when using inner HTML...
		className?: string;
	}

	let { line, className = '' }: Props = $props();
	let language: Language = $state('zh');
	run(() => {
		language = page.data.language;
	});
	const tagPatterns = [
		'can_silence',
		'ignore_camou',
		'ignore_stealth',
		'once_only',
		'INCREASE_WHEN_ATTACK'
	];
	const patternsToParse = [{ prefix: '$', suffix: '$', style: 'text-red-400 font-semibold' }];
	const textPatterns = {
		'@rolv.rem': 'text-[#FF4C22]',
		'@ba.talpu': 'text-[#0098DC]',
		'@ba.vup': 'text-[#20a8EC]',
		'@ba.vdown': 'text-[#FF6237]',
		'@ba.rem': 'text-[#F49800]',
		'@ba.kw': 'text-[#00B0FF]',
		'@bluehl': 'text-[#30c8FC]',
		'@enemy': 'text-[#FFA5AF]',
		'@ally': 'text-[#FFC89B]',
		'@self': 'text-[#C0E6FA]',
		'@purple': 'text-[#A48CE7]',
		'@gold': 'text-[#CDB07A]',
		'@phys': 'text-[#FFB082] capitalize',
		'@arts': 'text-[#A7C2FC] capitalize',
		'@true': 'text-[#FF99CA] capitalize',
		'@strike': 'line-through text-neutral-400'
	};

	function processText(input, pattern) {
		if (pattern.prefix === '$') {
			const regex = /\$(.*?)\$/g;
			return input.replace(regex, (match, content) => {
				return `<span class="${pattern.style}">${content}</span>`;
			});
		}
		return input;
	}
	function addTooltip(pattern, content) {
		let desc = termDesc?.[pattern]?.[`desc_${language}`] || termDesc?.[pattern]?.[`desc_zh`];
		// determine if tooltip will exceed popup screen
		if (!desc) {
			return content;
		}
		const name = termDesc?.[pattern]?.[`name_${language}`] || termDesc?.[pattern]?.[`name_zh`];
		// prepare depth+1 desc
		let desc2 = [];
		desc = desc.replace(/<(.*?)>(.*?)<\/>/g, (match, pattern, content) => {
			if (pattern.includes('@')) {
				return `<span class="${textPatterns[pattern]}">${content}</span>`;
			} else {
				// because tailwind classes doesn't work with interpolated strings
				const peerDesc =
					desc2.length === 0
						? 'one'
						: desc2.length === 1
						? 'two'
						: desc2.length === 2
						? 'three'
						: 'four';
				const peerClass =
					desc2.length === 0
						? 'peer-has-[.one:hover]:pointer-events-auto'
						: desc2.length === 1
						? 'peer-has-[.two:hover]:pointer-events-auto'
						: desc2.length === 2
						? 'peer-has-[.three:hover]:pointer-events-auto'
						: 'peer-has-[.four:hover]:pointer-events-auto';
				desc2.push(
					`<div class="tooltiptext absolute opacity-0 pointer-events-none ${peerClass} hover:pointer-events-auto hover:opacity-100 top-[54px] bg-slate-300 text-[#222222] w-[220px] ${
						language === 'en' ? 'min-h-[150px]' : ' min-h-[100px]'
					} p-1.5 z-1 rounded-md text-sm shadow-inner"><h6 class="font-semibold text-base">${content}</h6><div class="mt-1">${
						termDesc[pattern][`desc_${language}`] || termDesc[pattern][`desc_zh`]
					}</div></div>`
				);
				return `<div class="${peerDesc} relative inline-block underline underline-offset-2">${content}</div>`;
			}
		});
		return `<div class="tooltip relative inline-block underline underline-offset-2 group leading-tight bg-[linear-gradient(to_top,#fff6,transparent_75%)]">${content}<div class="tooltiptext absolute hidden peer group-hover:block bg-slate-200 text-[#222222] w-[220px] p-1.5 z-1 rounded-md text-sm shadow-inner"><h6 class="font-semibold text-base">${name}</h6><div class="mt-1">${desc}</div></div>${desc2.join(
			''
		)}</div>`;
	}

	const parseText = (line: string, language: Language) => {
		// for {phys}/{arts}/{true} type keys
		const regex = new RegExp(`{(.*?)}`, 'gs');
		const matches = line.match(regex);
		if (matches) {
			for (const match of matches) {
				const key = match.slice(1, -1);
				const front = key.includes('ba.dt')
					? `<${key}>`
					: tagPatterns.includes(key)
					? `<@skilltag ${key}>`
					: `<@${key}>`;
				line = line.replace(
					match,
					front + translations[language][key.replace('ba.dt.', '')] + '</>'
				);
			}
		}
		line = line.replace(/<(b.*?)>(.*?)<\/>/g, (match, pattern, content) => {
			return addTooltip(pattern, content);
		});
		line = line.replaceAll('\n', '<br/>');
		line = line.replaceAll('\\n', '<br/>');
		//parsed separately to deal with cathy case
		line = line.replace(/<@(.*?)>(.*?)<\/>/g, (match, pattern, content) => {
			if (pattern.includes('skilltag')) {
				return `<span class="${pattern}">${content}</span>`;
			}
			return `<span class="${textPatterns?.['@' + pattern] ?? ''}">${content}</span>`;
		});
		for (const pattern of patternsToParse) {
			line = processText(line, pattern);
		}
		// case to handle for en stage desc with trap names... eg: ro4_1-2
		line = line.replace(/<(.*?)>/g, (match, pattern, content) => {
			if (HTML_TAGS.some((tag) => match.includes(tag))) {
				return match;
			}
			return `&lt;${pattern}&gt;`;
		});
		return line;
	};
	function adjustTooltipPosition(tooltip) {
		const container = tooltip.closest('.popup') || tooltip.closest('main');
		const tooltipTexts = tooltip.querySelectorAll('.tooltiptext');
		const containerRect = container.getBoundingClientRect();
		const tooltipRect = tooltip.getBoundingClientRect();
		const overflowRight = tooltipRect.right + 110 - containerRect.right;
		const overflowLeft = containerRect.left - tooltipRect.left + 110;
		tooltipTexts.forEach((ele) => {
			if (overflowRight > 0) {
				ele.style.right = `${tooltipRect.right - containerRect.right + 6}px`;
			} else if (overflowLeft > 0) {
				ele.style.left = `${containerRect.left - tooltipRect.left + 6}px`;
			} else {
				ele.style.left = `calc(50% - 110px)`;
			}
		});
	}
	onMount(() => {
		const tooltips = document.querySelectorAll('.tooltip');
		tooltips.forEach((tooltip) => {
			adjustTooltipPosition(tooltip);
		});
	});
</script>

<div class="relative {className}">
	{@html parseText(line, language)}
</div>

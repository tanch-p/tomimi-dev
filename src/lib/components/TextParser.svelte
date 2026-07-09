<script lang="ts">
	import { getTranslations } from '$lib/functions/languageHelpers';
	import { parseTaggedText, type TaggedTextNode } from '$lib/functions/ASTTextParser';
	import { page } from '$app/stores';
	import type { Language } from '$lib/types';
	import termDesc from '$lib/data/term_desc.json';
	import { onMount } from 'svelte';

	const LT_PLACEHOLDER = '__TEXT_PARSER_LT__';
	const GT_PLACEHOLDER = '__TEXT_PARSER_GT__';
	const TRUSTED_HTML_TAGS = ['span', 'div'];
	type TermDescEntry = {
		termId?: string;
		name_zh?: string;
		name_en?: string;
		name_ja?: string;
		desc_zh?: string;
		desc_en?: string;
		desc_ja?: string;
	};
	const termDescMap = termDesc as unknown as Record<string, TermDescEntry>;

	// note to self do not ever use <text> for special parsing usage when using inner HTML...
	export let line: string,
		className: string = '';
	let language: Language = 'zh';
	$: language = $page.data.language;
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
	} as Record<string, string>;

	function processText(input: string, pattern: { prefix: string; suffix: string; style: string }) {
		if (pattern.prefix === '$') {
			const regex = /\$(.*?)\$/g;
			return input.replace(regex, (_match, content) => {
				return `<span class="${pattern.style}">${content}</span>`;
			});
		}
		return input;
	}
	function addTooltip(pattern: string, content: string) {
		let desc = termDescMap?.[pattern]?.[`desc_${language}`] || termDescMap?.[pattern]?.[`desc_zh`];
		// determine if tooltip will exceed popup screen
		if (!desc) {
			return content;
		}
		const name =
			termDescMap?.[pattern]?.[`name_${language}`] || termDescMap?.[pattern]?.[`name_zh`];
		let desc2: string[] = [];
		desc = renderTooltipDescription(desc, desc2);
		return `<div class="tooltip relative inline-block underline underline-offset-2 group leading-tight bg-[linear-gradient(to_top,#fff6,transparent_75%)]">${content}<div class="tooltiptext absolute hidden peer group-hover:block bg-slate-200 text-[#222222] w-[220px] p-1.5 z-[1] rounded-md text-sm shadow-inner"><h6 class="font-semibold text-base">${name}</h6><div class="mt-1">${desc}</div></div>${desc2.join(
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
					front + getTranslations(language)[key.replace('ba.dt.', '')] + '</>'
				);
			}
		}
		line = renderTaggedMarkup(line);
		for (const pattern of patternsToParse) {
			line = processText(line, pattern);
		}
		return line;
	};

	function renderTaggedMarkup(input: string): string {
		const { placeholderedInput, trustedHtmlTags } = preserveTrustedHtmlTags(input);
		const sanitizedInput = escapeUnsupportedTags(placeholderedInput);

		try {
			return restoreTrustedHtmlTags(
				renderTaggedNodes(parseTaggedText(sanitizedInput).children),
				trustedHtmlTags
			);
		} catch (_error) {
			return restoreTrustedHtmlTags(formatText(sanitizedInput), trustedHtmlTags);
		}
	}

	function renderTooltipDescription(input: string, desc2: string[]): string {
		const { placeholderedInput, trustedHtmlTags } = preserveTrustedHtmlTags(input);
		const sanitizedInput = escapeUnsupportedTags(placeholderedInput);

		try {
			return restoreTrustedHtmlTags(
				renderTooltipNodes(parseTaggedText(sanitizedInput).children, desc2),
				trustedHtmlTags
			);
		} catch (_error) {
			return restoreTrustedHtmlTags(formatText(sanitizedInput), trustedHtmlTags);
		}
	}

	function renderTaggedNodes(nodes: TaggedTextNode[]): string {
		return nodes.map((node) => renderTaggedNode(node)).join('');
	}

	function renderTaggedNode(node: TaggedTextNode): string {
		if (node.type === 'text') {
			return formatText(node.value);
		}

		const content = renderTaggedNodes(node.children);
		return renderTag(node.name, content);
	}

	function renderTooltipNodes(nodes: TaggedTextNode[], desc2: string[]): string {
		return nodes.map((node) => renderTooltipNode(node, desc2)).join('');
	}

	function renderTooltipNode(node: TaggedTextNode, desc2: string[]): string {
		if (node.type === 'text') {
			return formatText(node.value);
		}

		const content = renderTooltipNodes(node.children, desc2);
		if (node.name.startsWith('@')) {
			return `<span class="${escapeHtmlAttribute(
				textPatterns[node.name] ?? ''
			)}">${content}</span>`;
		}

		const tooltipKey = node.name.startsWith('$') ? node.name.slice(1) : node.name;
		const tooltipDesc =
			termDescMap?.[tooltipKey]?.[`desc_${language}`] || termDescMap?.[tooltipKey]?.[`desc_zh`];

		if (!tooltipDesc) {
			return content;
		}

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
			} p-1.5 z-[1] rounded-md text-sm shadow-inner"><h6 class="font-semibold text-base">${content}</h6><div class="mt-1">${renderTooltipDescription(
				tooltipDesc,
				desc2
			)}</div></div>`
		);

		return `<div class="${peerDesc} relative inline-block underline underline-offset-2">${content}</div>`;
	}

	function renderTag(tagName: string, content: string): string {
		if (tagName.startsWith('@skilltag ')) {
			return `<span class="${escapeHtmlAttribute(tagName.slice(1))}">${content}</span>`;
		}
		if (tagName.startsWith('@')) {
			return `<span class="${escapeHtmlAttribute(textPatterns[tagName] ?? '')}">${content}</span>`;
		}
		if (tagName.startsWith('$')) {
			return addTooltip(tagName.slice(1), content);
		}
		if (tagName.startsWith('b')) {
			return addTooltip(tagName, content);
		}
		return formatText(`<${tagName}>`) + content;
	}

	function isSupportedCustomTag(tagName: string): boolean {
		return tagName.startsWith('@') || tagName.startsWith('$') || tagName.startsWith('b');
	}

	function preserveTrustedHtmlTags(input: string): {
		placeholderedInput: string;
		trustedHtmlTags: string[];
	} {
		const trustedHtmlTags: string[] = [];
		const htmlTagPattern = /<\/?(span|div)\b[^>]*>/gi;

		return {
			placeholderedInput: input.replace(htmlTagPattern, (match, tagName: string) => {
				if (!TRUSTED_HTML_TAGS.includes(tagName.toLowerCase())) {
					return match;
				}

				const placeholder = `__TEXT_PARSER_HTML_${trustedHtmlTags.length}__`;
				trustedHtmlTags.push(match);
				return placeholder;
			}),
			trustedHtmlTags
		};
	}

	function restoreTrustedHtmlTags(input: string, trustedHtmlTags: string[]): string {
		return trustedHtmlTags.reduce((output, tag, index) => {
			return output.replaceAll(`__TEXT_PARSER_HTML_${index}__`, tag);
		}, input);
	}

	function escapeUnsupportedTags(input: string): string {
		return input.replace(/<([^<>]+)>/g, (match, tagName) => {
			const normalizedTagName = tagName.trim();
			if (normalizedTagName === '/' || isSupportedCustomTag(normalizedTagName)) {
				return match;
			}

			return `${LT_PLACEHOLDER}${tagName}${GT_PLACEHOLDER}`;
		});
	}

	function formatText(value: string): string {
		return value
			.replaceAll(LT_PLACEHOLDER, '&lt;')
			.replaceAll(GT_PLACEHOLDER, '&gt;')
			.replaceAll('\n', '<br/>')
			.replaceAll('\\n', '<br/>');
	}

	function escapeHtmlAttribute(value: string): string {
		return value
			.replaceAll('&', '&amp;')
			.replaceAll('<', '&lt;')
			.replaceAll('>', '&gt;')
			.replaceAll('"', '&quot;')
			.replaceAll("'", '&#39;');
	}

	function adjustTooltipPosition(tooltip: Element) {
		const container = tooltip.closest('.popup') || tooltip.closest('main');
		const tooltipTexts = tooltip.querySelectorAll<HTMLElement>('.tooltiptext');
		if (!container) {
			return;
		}
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

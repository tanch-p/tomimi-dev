import termDesc from '$lib/data/term_desc.json';
import type { Language } from '$lib/types';
import { parseTaggedText, type TaggedTextNode } from './ASTTextParser';
import { getTranslations } from './languageHelpers';

const LT_PLACEHOLDER = '__TEXT_PARSER_LT__';
const GT_PLACEHOLDER = '__TEXT_PARSER_GT__';
const TRUSTED_HTML_TAGS = ['span', 'div'];
const MAX_PARSED_LINE_CACHE_SIZE = 2_000;

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
const parsedLineCache = new Map<string, string>();
const tooltipDescriptionCache = new Map<string, string>();
const tagPatterns = new Set([
	'can_silence',
	'ignore_camou',
	'ignore_stealth',
	'once_only',
	'buffloss',
	'INCREASE_WHEN_ATTACK'
]);
const textPatterns: Record<string, string> = {
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

export function renderTextLine(input: string, language: Language): string {
	const cacheKey = `${language}:${input}`;
	const cached = parsedLineCache.get(cacheKey);
	if (cached !== undefined) {
		return cached;
	}

	const translations = getTranslations(language);
	const withTranslatedTags = input.replace(/\{([^{}]*)\}/g, (_match, key: string) => {
		const tag = key.includes('ba.dt')
			? `<${key}>`
			: tagPatterns.has(key)
			? `<@skilltag ${key}>`
			: `<@${key}>`;
		return `${tag}${translations[key.replace('ba.dt.', '')]}</>`;
	});
	const rendered = renderTaggedMarkup(withTranslatedTags);
	const parsed = rendered.replace(
		/\$(.*?)\$/g,
		(_match, content: string) => `<span class="text-red-400 font-semibold">${content}</span>`
	);

	if (parsedLineCache.size >= MAX_PARSED_LINE_CACHE_SIZE) {
		parsedLineCache.clear();
	}
	parsedLineCache.set(cacheKey, parsed);
	return parsed;
}

export function getTooltipHtml(term: string, language: Language): string | undefined {
	const entry = termDescMap[term];
	if (!entry) {
		return undefined;
	}

	const description = getCachedTooltipDescription(term, language);
	if (!description) {
		return undefined;
	}
	const name = entry[`name_${language}`] ?? entry.name_zh ?? term;
	return `<h6 class="font-semibold text-base">${formatText(
		name
	)}</h6><div class="mt-1">${description}</div>`;
}

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

function getCachedTooltipDescription(term: string, language: Language): string {
	const cacheKey = `${language}:${term}`;
	const cached = tooltipDescriptionCache.get(cacheKey);
	if (cached !== undefined) {
		return cached;
	}

	const entry = termDescMap[term];
	const description = entry?.[`desc_${language}`] ?? entry?.desc_zh;
	if (!description) {
		return '';
	}

	const rendered = renderTooltipDescription(description, language);
	tooltipDescriptionCache.set(cacheKey, rendered);
	return rendered;
}

function renderTooltipDescription(input: string, language: Language): string {
	const { placeholderedInput, trustedHtmlTags } = preserveTrustedHtmlTags(input);
	const sanitizedInput = escapeUnsupportedTags(placeholderedInput);

	try {
		return restoreTrustedHtmlTags(
			renderTooltipNodes(parseTaggedText(sanitizedInput).children, language),
			trustedHtmlTags
		);
	} catch (_error) {
		return restoreTrustedHtmlTags(formatText(sanitizedInput), trustedHtmlTags);
	}
}

function renderTaggedNodes(nodes: TaggedTextNode[]): string {
	return nodes.map(renderTaggedNode).join('');
}

function renderTaggedNode(node: TaggedTextNode): string {
	if (node.type === 'text') {
		return formatText(node.value);
	}

	return renderTag(node.name, renderTaggedNodes(node.children));
}

function renderTooltipNodes(nodes: TaggedTextNode[], language: Language): string {
	return nodes.map((node) => renderTooltipNode(node, language)).join('');
}

function renderTooltipNode(node: TaggedTextNode, language: Language): string {
	if (node.type === 'text') {
		return formatText(node.value);
	}

	return renderTag(node.name, renderTooltipNodes(node.children, language));
}

function renderTag(tagName: string, content: string): string {
	if (tagName.startsWith('@skilltag ')) {
		return `<span class="${escapeHtmlAttribute(tagName.slice(1))}">${content}</span>`;
	}
	if (tagName.startsWith('@')) {
		return `<span class="${escapeHtmlAttribute(textPatterns[tagName] ?? '')}">${content}</span>`;
	}

	const tooltipKey = tagName.startsWith('$') ? tagName.slice(1) : tagName;
	if ((tagName.startsWith('$') || tagName.startsWith('b')) && hasTooltip(tooltipKey)) {
		return `<button type="button" class="relative inline-block border-0 bg-[linear-gradient(to_top,#fff6,transparent_75%)] p-0 text-left text-inherit underline underline-offset-2 leading-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" data-term="${escapeHtmlAttribute(
			tooltipKey
		)}">${content}</button>`;
	}

	return tagName.startsWith('$') || tagName.startsWith('b')
		? content
		: formatText(`<${tagName}>`) + content;
}

function hasTooltip(term: string): boolean {
	const entry = termDescMap[term];
	return Boolean(entry?.desc_zh || entry?.desc_en || entry?.desc_ja);
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
	return trustedHtmlTags.reduce(
		(output, tag, index) => output.replaceAll(`__TEXT_PARSER_HTML_${index}__`, tag),
		input
	);
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

function isSupportedCustomTag(tagName: string): boolean {
	return tagName.startsWith('@') || tagName.startsWith('$') || tagName.startsWith('b');
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

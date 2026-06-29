import type { Language } from '$lib/types';
import translations from '$lib/translations.json';

const TRANSLATION_LANGUAGES = new Set<Language>(['en', 'ja', 'zh']);
const translationViewCache = new Map<Language, unknown>();

const isTranslationLeaf = (value: unknown): value is Record<Language, unknown> => {
	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		return false;
	}

	const keys = Object.keys(value);
	return keys.length > 0 && keys.every((key) => TRANSLATION_LANGUAGES.has(key as Language));
};

const localizeTranslationNode = (value: unknown, language: Language): any => {
	if (isTranslationLeaf(value)) {
		return value[language] ?? '';
	}

	if (!value || typeof value !== 'object' || Array.isArray(value)) {
		return value;
	}

	return new Proxy(value, {
		get(target, prop, receiver) {
			return localizeTranslationNode(Reflect.get(target, prop, receiver), language);
		},
		ownKeys(target) {
			return Reflect.ownKeys(target);
		},
		getOwnPropertyDescriptor(target, prop) {
			const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
			if (!descriptor) {
				return descriptor;
			}
			return { ...descriptor, configurable: true };
		}
	});
};

export const getTranslations = (language: Language): any => {
	const cached = translationViewCache.get(language);
	if (cached) {
		return cached as any;
	}

	const localized = localizeTranslationNode(translations, language);
	translationViewCache.set(language, localized);
	return localized;
};

export function formatArray(arr: unknown[], connector: string, connector_final: string) {
	if (arr.length === 0) return '';
	if (arr.length === 1) return arr[0].toString();

	return arr.slice(0, -1).join(connector) + connector_final + arr.slice(-1);
}

export function floorPrefixSuffix(floor: number, language: Language) {
	switch (language) {
		case 'zh':
			return floor + '层';
		case 'ja':
			return '第' + floor + '層';
		case 'en':
		default:
			return floor + 'F';
	}
}
export function wavePrefixSuffix(val: number, language: Language) {
	switch (language) {
		case 'zh':
			return '第' + val + '波';
		case 'ja':
			return '第' + val + 'ウェーブ';
		case 'en':
		default:
			return 'Wave #' + val;
	}
}
export function parseConditions(key: string, language: Language): string {
	const i18n = getTranslations(language);

	if (key.includes('gt') || key.includes('lt')) {
		const splitStr = key.split('_');
		return splitStr
			.map((ele, i) => {
				const suffix = splitStr.includes('weight') ? '' : '%';
				let buffer = '';
				if (ele.includes('gte')) {
					return '≥';
				}
				if (ele.includes('lte')) {
					return '≤';
				}
				if (ele.includes('gt')) {
					return '↑';
				}
				if (ele.includes('lt')) {
					return '↓';
				}
				if (i === splitStr.length - 1) {
					return ele + suffix;
				}
				if (language === 'en' && i < splitStr.length - 2) {
					buffer = ' ';
				}
				return (i18n.table_headers[ele] ?? i18n[ele] ?? i18n.types[ele]) + buffer;
			})
			.join('');
	}
	return i18n.table_headers[key] ?? i18n[key] ?? i18n.types[key];
}

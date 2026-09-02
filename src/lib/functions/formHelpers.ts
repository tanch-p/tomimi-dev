import type { Language } from '$lib/types';
import { getTranslations } from './languageHelpers';
import { convertToOrdinal } from './numberHelpers';

export function getFormTitle(title: string | undefined | null, row: number, language: Language) {
	if (!title) {
		return null;
	}
	if (title.includes('form')) {
		const splitString = title.split('.');
		const formTitle = splitString?.[1];
		if (formTitle) {
			return getTranslations(language)[formTitle];
		}
		if (language === 'en') {
			return (
				getTranslations(language).multiform_prefix +
				convertToOrdinal(row + 1) +
				' ' +
				getTranslations(language).multiform_suffix
			);
		}
		return (
			getTranslations(language).multiform_prefix +
			(row + 1) +
			getTranslations(language).multiform_suffix
		);
	}

	return getTranslations(language)[title];
}

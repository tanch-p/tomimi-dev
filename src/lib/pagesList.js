import ISStages from './data/stages/stage_name_lookup_table.json' with { type: 'json' };

const LANGUAGES = ['en', 'ja', 'zh'];
const PAGES = ['about', 'donate', 'laoli', 'recruit', 'mizuki', 'phantom', 'sarkaz', 'sami'];

const IS_STAGES_LIST = Object.entries(ISStages).reduce((acc, [name,value]) => {
	const {lang} = value;
	if (lang === 'ALL') {
		const list = LANGUAGES.map((language) => `/${language}/stages/${name}`);
		acc = acc.concat(list);
	} else {
		acc.push(`/${lang}/stages/${name}`);
	}
	return acc;
}, []);

export const pagesToRender = LANGUAGES.reduce((acc, language) => {
	for (const page of PAGES) {
		acc.push(`/${language}/${page}`);
	}
	return acc;
}, []).concat(IS_STAGES_LIST);

import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { pagesToRender } from './src/lib/pagesList.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			routes: {
				include: ['/'],
				exclude: []
			}
		}),
		prerender: {
			concurrency: 1,
			handleMissingId: 'ignore',
			entries: [...pagesToRender, '/sitemap.xml']
		}
	}
};

export default config;

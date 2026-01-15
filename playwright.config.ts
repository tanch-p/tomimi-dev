import { defineConfig } from '@playwright/test';

export default defineConfig({
	webServer: {
		command: 'pnpm run build && pnpm run preview',
		port: 4173,
		timeout:600000,
	},
	workers:2,
	testDir: 'tests'
});
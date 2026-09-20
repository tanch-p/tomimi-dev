import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

export default tseslint.config(
	{
		ignores: [
			'.DS_Store',
			'.env',
			'.env.*',
			'!.env.example',
			'.svelte-kit/**',
			'.wrangler/**',
			'build/**',
			'node_modules/**',
			'package/**',
			'package-lock.json',
			'pnpm-lock.yaml',
			'static/**',
			'test-results/**',
			'yarn.lock'
		]
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs.recommended,
	eslintConfigPrettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.js', '**/*.svelte.ts'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: ['.svelte'],
				svelteConfig
			}
		}
	},
	{
		rules: {
			// Keep the upgraded linter focused on correctness without turning this
			// framework migration into a repository-wide style and typing rewrite.
			'@typescript-eslint/no-explicit-any': 'off',
			'svelte/no-navigation-without-resolve': 'off',
			'svelte/no-useless-mustaches': 'off',
			'svelte/require-each-key': 'off'
		}
	}
);

module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2021,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	// Adds rules for codesmith-esque linting
  rules: {
    indent: ['warn', 2],
    '@typescript-eslint/no-unused-vars': ['off', { vars: 'local' }],
    'prefer-const': 'warn',
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'space-infix-ops': 'warn',
  },
	
};

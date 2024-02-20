/** @type {import("prettier").Config} */
const config = {
	printWidth: 100,
	singleQuote: true,
	plugins: [
		'prettier-plugin-svelte',
		'prettier-plugin-astro',
		'prettier-plugin-tailwindcss',
		'prettier-plugin-organize-imports',
		'prettier-plugin-astro-organize-imports',
	],
	tailwindFunctions: ['clsx'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
			},
		},
	],
};

export default config;

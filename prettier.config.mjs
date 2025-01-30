/** @type {import("prettier").Config} */
const config = {
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
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  printWidth: 100,
  singleQuote: true,
  tailwindFunctions: ['clsx'],
};

export default config;

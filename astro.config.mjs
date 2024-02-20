import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'never',
	integrations: [svelte(), tailwind()],
});

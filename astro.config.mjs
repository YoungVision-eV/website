import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'never',
	integrations: [svelte(), tailwind()],
});

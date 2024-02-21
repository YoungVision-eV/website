import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  server: ({ command }) => ({ port: command === 'dev' ? 5173 : 4321 }),
  trailingSlash: 'never',
  integrations: [svelte(), tailwind()],
});

import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel/static';

// https://astro.build/config
export default defineConfig({
  server: ({ command }) => ({
    port: command === 'dev' ? 5173 : 4321,
  }),
  trailingSlash: 'never',
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
  },
  integrations: [svelte(), tailwind()],
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
});

import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  image: {
    remotePatterns: [
      {
        hostname: '**.cdninstagram.com',
        protocol: 'https',
      },
      {
        hostname: 'payload.youngvision.work',
        protocol: 'https',
      },
    ],
  },

  integrations: [svelte()],
  server: ({ command }) => ({ port: command === 'dev' ? 5173 : 4321 }),
  trailingSlash: 'never',

  vite: {
    plugins: [tailwindcss()],
  },
});

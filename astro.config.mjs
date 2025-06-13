import cloudflare from '@astrojs/cloudflare';
import node from '@astrojs/node';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

const PREVIEW = process.env.PREVIEW_DEPLOYMENT === 'true';

// for a live preview we need server side rendering
const adapter = PREVIEW
  ? node({
      mode: 'standalone',
    })
  : undefined;

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
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
  output: 'server', //PREVIEW ? 'server' : 'static',
  server: ({ command }) => ({ port: command === 'dev' ? 5173 : 4321 }),
  trailingSlash: 'never',

  vite: {
    define: {
      'process.env': process.env,
    },
    plugins: [tailwindcss()],
  },
});

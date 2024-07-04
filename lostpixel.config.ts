import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [{ path: '/', name: 'landing' }],
    baseUrl: 'http://172.17.0.1:3000',
  },
  lostPixelProjectId: 'clrkf72110ugom40el0d2rkx9',
  apiKey: process.env.LOST_PIXEL_API_KEY,
};

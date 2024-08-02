import type { CustomProjectConfig } from 'lost-pixel';

export const config: CustomProjectConfig = {
  pageShots: {
    pages: [
      { path: '/', name: 'Home' },
      { path: '/about-us', name: 'Über Uns' },
      { path: '/events', name: 'Veranstaltungen' },
      { path: '/events/bauwoche-2024', name: 'Bauwoche 2024' },
      { path: '/events/event-1', name: 'Event 1' },
      { path: '/support-us', name: 'Unterstütze uns' },
      { path: '/members', name: 'Mitgliedschaft' },
    ],
    baseUrl: 'http://172.17.0.1:4321',
  },
  lostPixelProjectId: 'clrkf72110ugom40el0d2rkx9',
  apiKey: process.env.LOST_PIXEL_API_KEY,
};

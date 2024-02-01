import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const webServer = process.env.PLAYWRIGHT_TEST_BASE_URL
	? undefined
	: {
		command: 'pnpm run build && pnpm run preview',
		port: 4321,
	};

const config: PlaywrightTestConfig = {
	use: { actionTimeout: 10000 },
	webServer,
	projects: [
		{
			name: 'chromium',
			use: {
				...devices['Desktop Chrome'],
			},
		},
		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
			},
		},
		{
			name: 'Mobile Chrome',
			use: {
				...devices['Pixel 5'],
			},
		},
	],
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	reporter: [[process.env.CI ? 'github' : 'list'], ['html']],
};

export default config;

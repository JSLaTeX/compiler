import { defineConfig } from 'vitest/config';
import { join } from 'desm';

export default defineConfig({
	resolve: {
		alias: {
			'~': join(import.meta.url, 'src'),
		},
	},
});

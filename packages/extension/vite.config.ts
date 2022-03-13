import * as path from 'node:path';
import * as fs from 'node:fs';
import { join } from 'desm';
import { defineConfig } from 'vite';
import tmLanguage from './syntax/JSLaTeX.tmLanguage.js';
import languageConfiguration from './syntax/jslatex-language-configuration.js';

function buildSyntax() {
	return {
		name: 'build-syntax',
		async buildStart() {
			const distDir = join(import.meta.url, 'dist');
			await fs.promises.mkdir(distDir, { recursive: true });
			await Promise.all([
				fs.promises.writeFile(
					path.join(distDir, 'JSLaTeX.tmLanguage.json'),
					tmLanguage()
				),
				fs.promises.writeFile(
					path.join(distDir, 'jslatex-language-configuration.json'),
					languageConfiguration()
				),
			]);
		},
	};
}

export default defineConfig({
	build: {
		target: 'node16',
		outDir: 'dist',
		lib: {
			entry: 'src/extension.ts',
			formats: ['cjs'],
		},
		minify: false,
		rollupOptions: {
			output: {
				entryFileNames: '[name].cjs',
			},
			external: ['vscode'],
		},
	},
	plugins: [buildSyntax()],
});

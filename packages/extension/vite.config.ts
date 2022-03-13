import * as path from 'node:path';
import * as fs from 'node:fs';
import { join } from 'desm';
import { defineConfig } from 'vite';
import tmLanguage from './syntaxes/JSLaTeX.tmLanguage.js';
import languageConfiguration from './syntaxes/jslatex-language-configuration.js';

function buildSyntax() {
	return {
		name: 'build-syntax',
		// https://stackoverflow.com/a/51220236
		async generateBundle() {
			const syntaxDistDir = join(import.meta.url, 'dist/syntaxes');
			await fs.promises.mkdir(syntaxDistDir, { recursive: true });
			await Promise.all([
				fs.promises.writeFile(
					path.join(syntaxDistDir, 'JSLaTeX.tmLanguage.json'),
					tmLanguage()
				),
				fs.promises.writeFile(
					path.join(syntaxDistDir, 'jslatex-language-configuration.json'),
					languageConfiguration()
				),
			]);
		},
	};
}

export default defineConfig({
	resolve: {
		alias: {
			'~': join(import.meta.url, 'client/src'),
		},
	},
	build: {
		target: 'node16',
		outDir: 'dist',
		minify: false,
		lib: {
			entry: '',
			formats: ['cjs']
		},
		rollupOptions: {
			input: {
				server: path.resolve(__dirname, 'server'),
				client: path.resolve(__dirname, 'client'),
			},
			output: {
				entryFileNames: '[name].cjs',
			},
			external: ['vscode'],
		},
		emptyOutDir: true,
	},
	plugins: [buildSyntax()],
});

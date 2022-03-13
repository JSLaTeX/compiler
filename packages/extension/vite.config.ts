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
			const syntaxDistDir = join(import.meta.url, 'dist/syntax');
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

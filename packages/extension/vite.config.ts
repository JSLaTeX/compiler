import { builtinModules } from 'node:module';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { join } from 'desm';
import { defineConfig } from 'vite';
import tmLanguage from './syntaxes/JSLaTeX.tmLanguage.js';
import languageConfiguration from './syntaxes/jslatex-language-configuration.js';
import chalk from 'chalk';

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
			console.info(chalk.greenBright('\nSyntax updated.'));
		},
	};
}

export default defineConfig({
	resolve: {
		mainFields: ['monke'],
		alias: {
			'~client': join(import.meta.url, 'client/src'),
		},
	},
	build: {
		target: 'node16',
		outDir: 'dist',
		minify: false,
		lib: {
			entry: './client/src/extension.ts',
			formats: ['cjs'],
		},
		rollupOptions: {
			input: {
				server: path.resolve(__dirname, 'server'),
				extension: path.resolve(__dirname, 'client'),
			},
			output: {
				chunkFileNames: '[name].cjs',
				format: 'cjs',
				entryFileNames: '[name].cjs',
			},
			external: [/vscode/, ...builtinModules.flatMap((p) => [p, `node:${p}`])],
		},
		emptyOutDir: true,
	},
	plugins: [buildSyntax()],
});

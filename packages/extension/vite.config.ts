import { builtinModules } from 'node:module';
import * as process from 'node:process';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { join } from 'desm';
import { defineConfig } from 'vite';
import chalk from 'chalk';
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
			console.info(chalk.greenBright('\nSyntax updated.'));
		},
	};
}

export default defineConfig({
	resolve: {
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
				server: join(import.meta.url, 'server'),
				extension: join(import.meta.url, 'client'),
			},
			output: {
				chunkFileNames: process.env.RELEASE ? '[name].cjs.js' : '[name].cjs',
				format: 'cjs',
				entryFileNames: process.env.RELEASE ? '[name].cjs.js' : '[name].cjs',
			},
			external: [/vscode/, ...builtinModules.flatMap((p) => [p, `node:${p}`])],
		},
		emptyOutDir: true,
	},
	plugins: [buildSyntax()],
});

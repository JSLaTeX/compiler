import * as path from 'node:path';
import { expect, test, describe, beforeAll } from 'vitest';
import { outdent } from 'outdent';
import { join } from 'desm';
import { execaCommand } from 'execa';
import { compileJsLatex, compileJsLatexFile } from '~/index.js';

const fixturesDir = join(import.meta.url, '../fixtures');

test('compiles JSLaTeX', async () => {
	const jsLatex = outdent.string(String.raw`
		\documentclass{article}
		<?= "Hello from EJS!" ?>
	`);

	const latex = await compileJsLatex({ latex: jsLatex });

	expect(latex).toEqual(
		outdent.string(String.raw`
			\documentclass{article}
			Hello from EJS!
		`)
	);
});

test('compiles JSLaTeX with ramda', async () => {
	const jsLatex = outdent.string(String.raw`
		\documentclass{article}
		<?= R.sum(R.range(1, 11)) ?>
	`);

	const latex = await compileJsLatex({ latex: jsLatex });

	expect(latex).toEqual(
		outdent.string(String.raw`
			\documentclass{article}
			55
		`)
	);
});

describe('compiles fixtures', () => {
	beforeAll(async () => {
		await execaCommand('pnpm install', {
			cwd: path.join(fixturesDir, 'cowsay'),
		});
	});

	test('chem.tex', async () => {
		expect(
			await compileJsLatexFile({ filePath: path.join(fixturesDir, 'chem.tex') })
		).toMatchSnapshot();
	});

	test('cowsay.tex', async () => {
		expect(
			await compileJsLatexFile({
				filePath: path.join(fixturesDir, 'cowsay/cowsay.tex'),
				projectBaseUrl: path.join(fixturesDir, 'cowsay/'),
			})
		).toMatchSnapshot();
	});
});

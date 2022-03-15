import * as path from 'node:path';
import * as fs from 'node:fs';
import { expect, test, describe } from 'vitest';
import { outdent } from 'outdent';
import { join } from 'desm';
import { compileJsLatex } from '~/index.js';

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
	test('chem.tex', async () => {
		const chemTex = await fs.promises.readFile(
			path.join(fixturesDir, 'chem.tex'),
			'utf8'
		);
		expect(await compileJsLatex({ latex: chemTex })).toMatchSnapshot();
	});
});

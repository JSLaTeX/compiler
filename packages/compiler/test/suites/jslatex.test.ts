import { expect, test } from 'vitest';
import { outdent } from 'outdent';
import { compileJsLatex } from '~/index.js';

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

import * as fs from 'node:fs';
import * as ets from 'embedded-ts';
import * as R from 'ramda';
import escapeLatex from 'escape-latex';

type CompileJsLatexProps = {
	latex: string;
};

export async function compileJsLatex(props: CompileJsLatexProps) {
	const latexString = ets.render({
		template: props.latex,
		data: { R, escapeLatex },
		options: {
			delimiter: '?',
			// Don't escape XML (since we're outputting to LaTeX)
			escape: (str) => str as string,
		},
	});

	return latexString;
}

type CompileJsLatexFileProps = {
	filePath: string;
};
export async function compileJsLatexFile(props: CompileJsLatexFileProps) {
	const latex = await fs.promises.readFile(props.filePath, 'utf-8');
	return compileJsLatex({ latex });
}

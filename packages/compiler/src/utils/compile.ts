import * as fs from 'node:fs';
import ejs from 'ejs';
import * as R from 'ramda';
import escapeLatex from 'escape-latex';

type CompileJsLatexProps = {
	latex: string;
};

export async function compileJsLatex(props: CompileJsLatexProps) {
	const latexString = ejs.render(
		props.latex,
		{ R, escapeLatex },
		{ async: true, delimiter: '?' }
	);

	return latexString;
}

type CompileJsLatexFileProps = {
	filePath: string;
};
export async function compileJsLatexFile(props: CompileJsLatexFileProps) {
	const latex = await fs.promises.readFile(props.filePath, 'utf-8');
	return compileJsLatex({ latex });
}

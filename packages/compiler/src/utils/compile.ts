import * as fs from 'node:fs';
import ejs from 'ejs';

type CompileJsLatexProps = {
	latex: string;
};

export async function compileJsLatex(props: CompileJsLatexProps) {
	const template = ejs.compile(props.latex, { async: true, delimiter: '?' });
	const latexString = await template();

	return latexString;
}

type CompileJsLatexFileProps = {
	filePath: string;
};
export async function compileJsLatexFile(props: CompileJsLatexFileProps) {
	const latex = await fs.promises.readFile(props.filePath, 'utf-8');
	return compileJsLatex({ latex });
}

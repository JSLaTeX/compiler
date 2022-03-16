import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as ets from 'embedded-ts';
import * as R from 'ramda';
import escapeLatex from 'escape-latex';

type CompileJsLatexProps =
	| {
			latex: string;
			projectBaseUrl?: string;
	  }
	| string;
export async function compileJsLatex(props: CompileJsLatexProps) {
	let latex: string;
	let importResolver: ((importString: string) => string) | undefined;
	if (typeof props === 'string') {
		latex = props;
		importResolver = undefined;
	} else {
		latex = props.latex;
		importResolver = props.projectBaseUrl
			? createRequire(props.projectBaseUrl).resolve
			: undefined;
	}

	const latexString = ets.render({
		template: latex,
		data: { R, escapeLatex },
		options: {
			delimiter: '?',
			// Don't escape XML (since we're outputting to LaTeX)
			escape: (str) => str as string,
			importResolver,
		},
	});

	return latexString;
}

type CompileJsLatexFileProps =
	| {
			filePath: string;
			projectBaseUrl?: string;
	  }
	| string;
export async function compileJsLatexFile(props: CompileJsLatexFileProps) {
	if (typeof props === 'string') {
		return compileJsLatex(props);
	} else {
		const latex = await fs.promises.readFile(props.filePath, 'utf-8');
		return compileJsLatex({ latex, projectBaseUrl: props.projectBaseUrl });
	}
}

import * as fs from 'node:fs';
import { createRequire } from 'node:module';
import * as ets from 'embedded-ts';
import * as R from 'ramda';
import escapeLatex from 'escape-latex';
import type { ETSOptions } from 'embedded-ts';

type CompileJsLatexProps =
	| {
			latex: string;
			projectBaseUrl?: string;
			etsOptions?: Partial<ETSOptions> & { data?: Record<string, unknown> };
	  }
	| string;
export async function compileJsLatex(props: CompileJsLatexProps) {
	let latex: string;
	let importResolver: ((importString: string) => string) | undefined;
	let etsOptions;

	if (typeof props === 'string') {
		latex = props;
		importResolver = undefined;
		etsOptions = undefined;
	} else {
		latex = props.latex;
		importResolver = props.projectBaseUrl
			? createRequire(props.projectBaseUrl).resolve
			: undefined;
		etsOptions = props.etsOptions;
	}

	const latexString = ets.render({
		template: latex,
		data: { R, escapeLatex, ...etsOptions?.data },
		options: {
			delimiter: '?',
			// Don't escape XML (since we're outputting to LaTeX)
			escape: (str) => str as string,
			importResolver,
			...etsOptions,
		},
	});

	return latexString;
}

type CompileJsLatexFileProps =
	| {
			filePath: string;
			projectBaseUrl?: string;
			etsOptions?: Partial<ETSOptions> & { data?: Record<string, unknown> };
	  }
	| string;
export async function compileJsLatexFile(props: CompileJsLatexFileProps) {
	if (typeof props === 'string') {
		return compileJsLatex(props);
	} else {
		const latex = await fs.promises.readFile(props.filePath, 'utf-8');
		return compileJsLatex({
			latex,
			projectBaseUrl: props.projectBaseUrl,
			etsOptions: props.etsOptions,
		});
	}
}

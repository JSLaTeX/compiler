import * as vscodeEjs from 'vscode-ejs';
import { tagDelimiters } from './utils/tag.js';

export default function getConfigString() {
	const { repository, patterns } = vscodeEjs.getGrammar(tagDelimiters, {
		languageName: 'ets',
		sourceLanguageName: 'ts',
	});

	const config = {
		name: 'JSLaTeX File',
		scopeName: 'text.tex.latex.jslatex',
		injectionSelector: 'L:text.tex.latex - markup.raw.verbatim.latex',
		patterns: [...patterns, { include: 'text.tex.latex' }],
		repository,
	};

	return JSON.stringify(config);
}

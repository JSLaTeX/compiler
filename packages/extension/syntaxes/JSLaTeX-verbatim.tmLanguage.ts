import * as vscodeEjs from 'vscode-ejs';
import { tagDelimiters } from './utils/tag.js';

export default function getConfigString() {
	const { repository, patterns } = vscodeEjs.getGrammar(tagDelimiters, {
		languageName: 'ets',
		sourceLanguageName: 'ts',
	});

	const config = {
		name: 'JSLaTeX Verbatim Block',
		scopeName: 'markup.raw.verbatim.latex.jslatex',
		injectionSelector: 'L:markup.raw.verbatim.latex',
		patterns,
		repository,
	};

	return JSON.stringify(config);
}

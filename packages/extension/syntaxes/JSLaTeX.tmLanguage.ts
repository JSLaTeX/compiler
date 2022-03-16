import * as vscodeEjs from 'vscode-ejs';
import { tagDelimiters } from './utils/tag.js';

export default function getConfigString() {
	const config = {
		name: 'JSLaTeX File',
		scopeName: 'text.tex.latex.jslatex',
		injectionSelector: 'L:text.tex.latex - markup.raw.verbatim.latex',
		patterns: [
			{ include: '#tag-block-comment' },
			{ include: '#single-line-tag-ejs' },
			{ include: '#tag-ejs' },
			{ include: 'text.tex.latex' },
		],
		repository: vscodeEjs.getRepository(tagDelimiters),
	};

	return JSON.stringify(config);
}

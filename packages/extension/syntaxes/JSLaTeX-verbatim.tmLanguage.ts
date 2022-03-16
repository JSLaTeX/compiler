import * as vscodeEjs from 'vscode-ejs';
import { tagDelimiters } from './utils/tag.js';

export default function getConfigString() {
	const config = {
		name: 'JSLaTeX Verbatim Block',
		scopeName: 'markup.raw.verbatim.latex.jslatex',
		injectionSelector: 'L:markup.raw.verbatim.latex',
		patterns: [
			{ include: '#tag-block-comment' },
			{ include: '#single-line-tag-ejs' },
			{ include: '#tag-ejs' },
		],
		repository: vscodeEjs.getRepository(tagDelimiters),
	};

	return JSON.stringify(config);
}

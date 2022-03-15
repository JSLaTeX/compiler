import { getRepository } from './utils/repository.js';

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
		repository: getRepository(),
	};

	return JSON.stringify(config);
}

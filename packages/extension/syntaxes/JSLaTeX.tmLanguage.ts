import { outdent } from 'outdent';

// https://stackoverflow.com/a/34755045
function r(regexString: string) {
	return regexString
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line !== '') // don't include empty lines
		.join('');
}

function getRepository() {
	const ejsBeginTag = '<%[_=-]?';
	const ejsEndTag = '[_-]?%>';

	return {
		// Comments that use the EJS <%# tag
		'tag-block-comment': {
			name: 'comment.block.ejs',
			contentName: 'comment.block.js',
			begin: '<%#',
			beginCaptures: {
				'1': {
					name: 'punctuation.definition.comment.js',
				},
			},
			end: '%>',
			endCaptures: {
				'0': {
					name: 'punctuation.definition.comment.js',
				},
			},
		},
		'tag-ejs': {
			begin: ejsBeginTag,
			beginCaptures: {
				'0': {
					name: 'punctuation.section.embedded.begin.php',
				},
			},
			end: ejsEndTag,
			endCaptures: {
				'0': {
					name: 'punctuation.section.embedded.end.php',
				},
			},
			// Matched against the part between the begin and end matches
			patterns: [
				{
					contentName: 'meta.embedded.js',
					begin: String.raw`(?:^|\G)(\s*)(.*)`,
					while: String.raw`(?:^|\G)(?!${ejsEndTag})`,
					patterns: [{ include: 'source.js' }],
				},
			],
		},
		'single-line-tag-ejs': {
			begin: r(
				outdent.string(String.raw`
					(${ejsBeginTag})
					(
						(?:
							(?!${ejsEndTag}).
						)+
					)
					(?=${ejsEndTag})
				`)
			),
			beginCaptures: {
				'1': {
					name: 'punctuation.section.embedded.begin.php',
				},
				'2': {
					name: 'meta.embedded.ejs',
					patterns: [{ include: 'source.js' }],
				},
			},
			end: ejsEndTag,
			endCaptures: {
				'0': {
					name: 'punctuation.section.embedded.end.php',
				},
			},
		},
	};
}

export default function getConfigString() {
	const config = {
		name: 'JSLaTeX File',
		scopeName: 'text.tex.latex.jslatex',
		fileTypes: ['jtex'],
		patterns: [
			{ include: '#tag-block-comment' },
			{ include: '#single-line-tag-ejs' },
			{ include: '#tag-ejs' },
			{ include: 'text.tex.latex' },
		],
		repository: getRepository(),
	};

	return JSON.stringify(config);
}

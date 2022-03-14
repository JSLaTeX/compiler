import { outdent } from 'outdent';
import escapeStringRegexp from 'escape-string-regexp';

// https://stackoverflow.com/a/34755045
function r(regexString: string) {
	return regexString
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line !== '') // don't include empty lines
		.join('');
}

const tagDelimeters = ['%', '?'];

function getRepository() {
	const ejsBeginTag = (delimiter: string) =>
		`<${escapeStringRegexp(delimiter)}[_=-]?`;
	const ejsEndTag = (delimiter: string) =>
		`[_-]?${escapeStringRegexp(delimiter)}>`;

	return {
		// Comments that use the EJS <%# tag
		'tag-block-comment': {
			name: 'comment.block.ejs',
			contentName: 'comment.block.js',
			begin: '<([%?])#',
			beginCaptures: {
				'0': {
					name: 'punctuation.definition.comment.js',
				},
			},
			end: String.raw`\1>`,
			endCaptures: {
				'0': {
					name: 'punctuation.definition.comment.js',
				},
			},
		},
		'tag-ejs': {
			patterns: tagDelimeters.map((char) => ({
				begin: ejsBeginTag(char),
				beginCaptures: {
					'0': {
						name: 'punctuation.section.embedded.begin.php',
					},
				},
				end: ejsEndTag(char),
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
						while: String.raw`(?:^|\G)(?!${ejsEndTag(char)})`,
						patterns: [{ include: 'source.js' }],
					},
				],
			})),
		},
		'single-line-tag-ejs': {
			patterns: tagDelimeters.map((char) => ({
				begin: r(
					outdent.string(String.raw`
					(${ejsBeginTag(char)})
					(
						(?:
							(?!${ejsEndTag(char)}).
						)+
					)
					(?=${ejsEndTag(char)})
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
				end: ejsEndTag(char),
				endCaptures: {
					'0': {
						name: 'punctuation.section.embedded.end.php',
					},
				},
			})),
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

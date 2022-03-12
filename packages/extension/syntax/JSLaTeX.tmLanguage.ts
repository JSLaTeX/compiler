export default function getConfigString() {
	// https://stackoverflow.com/a/34755045
	// function r(regexString: string) {
	// 	return regexString
	// 		.split('\n')
	// 		.map((line) => line.trim())
	// 		.filter((line) => line !== '') // don't include empty lines
	// 		.join('');
	// }

	const ejsBeginTag = '<%[%_=-]?';
	const ejsEndTag = '[_-]?%>';

	const config = {
		name: 'JSLaTeX File',
		scopeName: 'text.tex.latex.jslatex',
		fileTypes: ['jtex'],
		patterns: [
			{ include: '#tag-block-comment' },
			{ include: '#tag-ejs' },
			{ include: 'text.tex.latex' },
		],
		repository: {
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
				name: 'meta.block.ejs',
				// The content between the EJS tags is matched as JavaScript
				contentName: 'source.js',
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
				patterns: [{ include: 'source.js' }],
			},
		},
	};

	return JSON.stringify(config);
}

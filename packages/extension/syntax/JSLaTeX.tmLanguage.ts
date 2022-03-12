export default function getConfigString() {
	// https://stackoverflow.com/a/34755045
	function r(regexString: string) {
		return regexString
			.split('\n')
			.map((line) => line.trim())
			.filter((line) => line !== '') // don't include empty lines
			.join('');
	}

	const ejsBeginTag = '<%[%_=-]?';
	const ejsEndTag = '[_-]?%>';

	const config = {
		name: 'JSLaTeX File',
		scopeName: 'source.jslatex',
		fileTypes: ['jtex'],
		patterns: [
			{
				include: '#ejs',
			},
			{
				include: 'text.tex.latex',
			},
		],
		repository: {
			ejs: [
				{ include: '#tag-block-comment' },
				{ include: '#tag-ejs-single-line' },
				{ include: '#tag-ejs-multi-line' },
			],
			// Comments that use the EJS <%# tag
			'tag-block-comment': {
				name: 'comment.block.ejs',
				begin: '<%#',
				beginCaptures: {
					'0': {
						name: 'punctuation.definition.comment.ejs',
					},
				},
				end: '%>',
				endCaptures: {
					'0': {
						name: 'punctuation.definition.comment.ejs',
					},
				},
			},
			'tag-ejs-single-line': {
				name: 'meta.tag.metadata.script.ejs',
				begin: r(String.raw`
					(${ejsBeginTag})
					${/* All characters that aren't followed by an ending EJS tag */ ''}
					(?:
						(?!(?:${ejsEndTag})).
					)+
					(?=(${ejsEndTag}))
				`),
				beginCaptures: {
					'0': {
						contentName: 'source.js',
						name: 'meta.embedded.*',
					},
					'1': {
						// PHP has nice syntax highlighting for embedding (i.e. the <?php ?> tags)
						name: 'punctuation.section.embedded.begin.php',
					},
					'2': {
						name: 'meta.embedded.ejs',
						contentName: 'source.js',
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
			'tag-ejs-multi-line': {
				contentName: 'source.js',
				name: 'meta.block.ejs',
				begin: ejsBeginTag,
				beginCaptures: {
					'0': {
						name: 'punctuation.section.embedded.begin.php',
					},
				},
				end: ejsEndTag,
				endCaptures: {
					'1': {
						name: 'punctuation.section.embedded.begin.php',
					},
				},
				patterns: [{ include: 'source.js' }],
			},
		},
	};

	return JSON.stringify(config);
}

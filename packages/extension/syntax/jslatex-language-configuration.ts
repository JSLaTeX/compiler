export default function getConfigString() {
	return JSON.stringify({
		comments: {
			blockComment: [['<%#', '%>']],
		},
		brackets: [['<', '>']],
		autoClosingPairs: [{ open: '<%', close: '%>' }],
		folding: {
			markers: [{ start: '^<%', end: '^%>' }],
		},
	});
}

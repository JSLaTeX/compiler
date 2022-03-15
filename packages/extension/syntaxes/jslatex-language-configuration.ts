export default function getConfigString() {
	return JSON.stringify({
		autoClosingPairs: [{ open: '<?', close: '?>' }],
		folding: {
			markers: { start: '^<?', end: '^?>' },
		},
	});
}

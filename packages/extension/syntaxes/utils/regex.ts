// https://stackoverflow.com/a/34755045
export function r(regexString: string) {
	return regexString
		.split('\n')
		.map((line) => line.trim())
		.filter((line) => line !== '') // don't include empty lines
		.join('');
}

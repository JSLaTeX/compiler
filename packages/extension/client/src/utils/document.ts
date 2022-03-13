import { EmbeddedRegion } from '~/types.js';

type GetVirtualDocumentProps = {
	documentText: string;
	regions: EmbeddedRegion[];
	languageId: string;
};
export function getVirtualDocumentText({
	documentText,
	regions,
	languageId,
}: GetVirtualDocumentProps): string {
	let currentPos = 0;
	const oldContent = documentText;

	let virtualDocumentString = '';
	for (const region of regions) {
		if (region.languageId === languageId) {
			// Replace the content before the region with whitespace
			virtualDocumentString += substituteWithWhitespace(
				oldContent.slice(currentPos, region.start)
			);
			// Copy verbatim the region in the old content
			virtualDocumentString += oldContent.slice(region.start, region.end);
			currentPos = region.end;
		}
	}

	virtualDocumentString += substituteWithWhitespace(
		oldContent.slice(currentPos)
	);

	return virtualDocumentString;
}

/**
 * Substitutes a string with whitespace, making sure to keep newlines and carriage returns intact
 */
function substituteWithWhitespace(string: string): string {
	let whitespaceString = '';
	for (const char of string) {
		// Only write new lines, skip other whitespace
		if (char === '\r' || char === '\n') {
			whitespaceString += char;
		}
	}

	return whitespaceString;
}

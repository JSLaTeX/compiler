import type { EmbeddedRegion } from '~client/types.js';

type GetVirtualDocumentProps = {
	documentText: string;
	regions: EmbeddedRegion[];
	languageId: string;
};
export function getVirtualDocumentTextSections({
	documentText,
	regions,
	languageId,
}: GetVirtualDocumentProps): string[] {
	let currentPos = 0;
	const oldContent = documentText;

	const virtualDocumentTextSections: string[] = [];
	for (const region of regions) {
		if (region.languageId === languageId) {
			virtualDocumentTextSections.push(
				// Replace the content before the region with whitespace
				substituteWithWhitespace(oldContent.slice(currentPos, region.start)),
				// Copy verbatim the region in the old content
				oldContent.slice(region.start, region.end)
			);
			currentPos = region.end;
		}
	}

	virtualDocumentTextSections.push(
		substituteWithWhitespace(oldContent.slice(currentPos))
	);

	return virtualDocumentTextSections;
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

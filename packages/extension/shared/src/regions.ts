import type { EmbeddedRegion } from '~shared/types.js';

export function getDocumentTextRegions(documentText: string) {
	const regions: EmbeddedRegion[] = [];

	const ejsBeginTag = '<%[_=-]?';
	const ejsEndTag = '[_-]?%>';

	// Match starting `<%` and ending `%>`
	const tagMatches = [
		...documentText.matchAll(
			new RegExp(`(${ejsBeginTag})|(${ejsEndTag})`, 'g')
		),
	];

	let insideEjsSection = false;
	let currentSectionBeginTagIndex = 0;
	let lastSectionEndTagIndex = 0;

	for (const tagMatch of tagMatches) {
		const isBeginTag = tagMatch[1] !== undefined;
		const isEndTag = tagMatch[2] !== undefined;

		if (isBeginTag && !insideEjsSection) {
			if (tagMatch.index !== 0) {
				regions.push({
					start: lastSectionEndTagIndex,
					end: tagMatch.index!,
					languageId: 'latex',
				});
			}

			insideEjsSection = true;
			currentSectionBeginTagIndex = tagMatch.index!;
		} else if (isEndTag && insideEjsSection) {
			regions.push({
				start: currentSectionBeginTagIndex,
				end: tagMatch.index! + tagMatch.length,
				languageId: 'js',
			});

			insideEjsSection = false;
			lastSectionEndTagIndex = tagMatch.index!;
		}
	}

	return regions;
}

import type { EmbeddedRegion } from '~client/types.js';

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
	let currentSectionBeginTagMatch: RegExpMatchArray | undefined = undefined;
	let lastSectionEndTagMatch: RegExpMatchArray | undefined = undefined;

	for (const tagMatch of tagMatches) {
		const isBeginTag = tagMatch[1] !== undefined;
		const isEndTag = tagMatch[2] !== undefined;
		const tag = tagMatch[0]!;

		if (isBeginTag && !insideEjsSection) {
			regions.push({
				start:
					lastSectionEndTagMatch === undefined
						? 0
						: lastSectionEndTagMatch.index! + tag.length,
				end: tagMatch.index!,
				languageId: 'latex',
			});

			insideEjsSection = true;
			currentSectionBeginTagMatch = tagMatch;
		} else if (isEndTag && insideEjsSection) {
			if (currentSectionBeginTagMatch === undefined) continue;

			regions.push({
				start: currentSectionBeginTagMatch.index!,
				end: tagMatch.index! + tag.length,
				languageId: 'js',
			});

			insideEjsSection = false;
			lastSectionEndTagMatch = tagMatch;
		}
	}

	if (lastSectionEndTagMatch !== undefined) {
		regions.push({
			start: lastSectionEndTagMatch.index! + lastSectionEndTagMatch[0]!.length,
			end: documentText.length,
			languageId: 'latex',
		});
	}

	return regions;
}

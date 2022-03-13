import { getDocumentTextRegions } from '~shared/regions.js';

type IsInsideEjsRegionProps = {
	documentText: string;
	offset: number;
};
export function isInsideEjsRegion({
	documentText,
	offset,
}: IsInsideEjsRegionProps) {
	// Parse the document text
	const documentTextRegions = getDocumentTextRegions(documentText);

	for (const textRegion of documentTextRegions) {
		if (offset >= textRegion.start && offset < textRegion.end) {
			return textRegion.languageId === 'js';
		}
	}

	throw new Error('Could not find region in document.');
}

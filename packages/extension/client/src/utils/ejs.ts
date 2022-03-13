import { getVirtualDocumentText } from '~/utils/document.js';
import { EmbeddedRegion } from '~/types.js';
import { getDocumentTextRegions } from '~/utils/regions.js';

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

export function getJavascriptVirtualContent(documentText: string): string {
	const regions = getDocumentTextRegions(documentText);

	const javascriptVirtualContent = getVirtualDocumentText({
		documentText,
		languageId: 'js',
		regions,
	});

	return javascriptVirtualContent;
}

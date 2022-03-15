import { getVirtualDocumentTextSections } from '~client/utils/document.js';
import { getDocumentTextRegions } from '~client/utils/regions.js';

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

	for (const textRegion of documentTextRegions.filter(
		(region) => region.languageId === 'js'
	)) {
		if (offset > textRegion.start && offset <= textRegion.end) {
			return true;
		}
	}

	return false;
}

export function getJavascriptVirtualContent(documentText: string): string {
	const regions = getDocumentTextRegions(documentText);

	const javascriptVirtualContentSections = getVirtualDocumentTextSections({
		documentText,
		languageId: 'js',
		regions,
	})
		.map((section) =>
			// Removing the start and end of the section
			section.replace(/^<\?[_=-]?/, '').replace(/[_-]?\?>$/, '')
		)
		.join('');

	return javascriptVirtualContentSections;
}

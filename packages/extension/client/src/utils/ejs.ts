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

	for (const textRegion of documentTextRegions) {
		if (offset >= textRegion.start && offset < textRegion.end) {
			return textRegion.languageId === 'js';
		}
	}

	throw new Error('Could not find region in document.');
}

export function getJavascriptVirtualContent(documentText: string): string {
	const regions = getDocumentTextRegions(documentText);

	const javascriptVirtualContentSections = getVirtualDocumentTextSections({
		documentText,
		languageId: 'js',
		regions,
	})
		.map((section) => {
			// Removing the start and end of the section
			return section.replace(/^<%[_=-]?/, '').replace(/[_-]?%>$/, '');
		})
		.join('');

	return javascriptVirtualContentSections;
}

import { getVirtualDocumentText } from '~/utils/document.js';
import { getDocumentTextRegions } from '~/utils/regions.js';

export function getLatexVirtualContent(documentText: string) {
	const regions = getDocumentTextRegions(documentText);

	const latexVirtualDocumentText = getVirtualDocumentText({
		documentText,
		regions,
		languageId: 'latex',
	});

	return latexVirtualDocumentText;
}

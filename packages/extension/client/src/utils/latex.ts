import { getVirtualDocumentText } from '~shared/document.js';
import { getDocumentTextRegions } from '~shared/regions.js';

export function getLatexVirtualContent(documentText: string) {
	const regions = getDocumentTextRegions(documentText);

	const latexVirtualDocumentText = getVirtualDocumentText({
		documentText,
		regions,
		languageId: 'latex',
	});

	return latexVirtualDocumentText;
}

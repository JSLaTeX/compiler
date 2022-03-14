import {
	getVirtualDocumentTextSections,
} from '~client/utils/document.js';
import { getDocumentTextRegions } from '~client/utils/regions.js';

export function getLatexVirtualContent(documentText: string) {
	const regions = getDocumentTextRegions(documentText);

	console.log('regions', regions);

	const latexVirtualDocumentText = getVirtualDocumentTextSections({
		documentText,
		regions,
		languageId: 'latex',
	}).join('');

	console.log(latexVirtualDocumentText)

	return latexVirtualDocumentText;
}

import { TextDocument } from 'vscode-languageserver-textdocument';
import { getVirtualDocumentText } from '~shared/document.js';
import { EmbeddedRegion } from '~shared/types.js';

type GetVirtualJavascriptDocumentProps = {
	document: TextDocument;
	regions: EmbeddedRegion[];
};
export function getVirtualJavascriptDocument({
	document,
	regions,
}: GetVirtualJavascriptDocumentProps): TextDocument {
	const documentText = document.getText();

	const virtualJavascriptDocumentString = getVirtualDocumentText({
		documentText,
		languageId: 'js',
		regions,
	});

	return TextDocument.create(
		document.uri,
		'js',
		document.version,
		virtualJavascriptDocumentString
	);
}

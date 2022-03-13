import {
	createConnection,
	InitializeParams,
	ProposedFeatures,
	TextDocuments,
	TextDocumentSyncKind,
} from 'vscode-languageserver';
import * as ts from 'typescript/lib/tsserverlibrary.js';
import { TextDocument } from 'vscode-languageserver-textdocument';

// Create a connection for the server using Node's IPC as a transport.
const connection = createConnection(
	ProposedFeatures.all // Include all preview/proposed LSP features.
);

// A simple text document manager. The text document manager supports full document sync only.
const documents: TextDocuments<TextDocument> = new TextDocuments();

connection.onInitialize((_params: InitializeParams) => {
	return {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Full,
			// Tell the client that the server supports code completion
			completionProvider: {
				resolveProvider: false,
			},
		},
	};
});

connection.onCompletion(async (textDocumentPosition, token) => {
	const document = documents.get(textDocumentPosition.textDocument.uri);
	if (!document) {
		return null;
	}

	// We're only handling autocompletion requests for JavaScript
});

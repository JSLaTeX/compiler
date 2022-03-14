import {
	ProposedFeatures,
	createConnection,
	TextDocumentSyncKind,
	InitializeParams,
} from 'vscode-languageserver';

const connection = createConnection(ProposedFeatures.all);

connection.onInitialize((_params: InitializeParams) => ({
	capabilities: {
		textDocumentSync: TextDocumentSyncKind.Full,
		completionProvider: {
			resolveProvider: false,
		},
	},
}));

connection.listen();

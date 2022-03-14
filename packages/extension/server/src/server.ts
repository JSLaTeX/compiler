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
			resolveProvider: true,
		},
	},
}));

connection.onCompletion(() => {
	return null;
});

// Prevents "Unhandled method completionItem/resolve" errors
connection.onCompletionResolve(() => {
	return undefined as any;
});

connection.listen();

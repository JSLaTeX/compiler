import type { InitializeParams } from 'vscode-languageserver';
import {
	ProposedFeatures,
	createConnection,
	TextDocumentSyncKind,
} from 'vscode-languageserver';

const connection = createConnection(ProposedFeatures.all);

// Borrowed from Volar
const triggerCharacters = ['.', '"', "'", '`', '/', '@', '#', ' '];

connection.onInitialize((_params: InitializeParams) => ({
	capabilities: {
		textDocumentSync: TextDocumentSyncKind.Full,
		completionProvider: {
			triggerCharacters,
			resolveProvider: true,
		},
	},
}));

connection.onCompletion(() => null);

// Prevents "Unhandled method completionItem/resolve" errors
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
connection.onCompletionResolve(() => undefined as any);

connection.listen();

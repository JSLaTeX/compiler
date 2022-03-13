import { createConnection, ProposedFeatures } from 'vscode-languageserver';

// Create a connection for the server using Node's IPC as a transport.
const connection = createConnection(
	ProposedFeatures.all // Include all preview/proposed LSP features.
);

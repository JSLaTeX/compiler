import * as path from 'node:path';
import type { CompletionList, ExtensionContext } from 'vscode';
import { workspace, commands, Uri } from 'vscode';
import type {
	LanguageClientOptions,
	ServerOptions,
	LanguageClient,
} from 'vscode-languageclient';
import { TransportKind } from 'vscode-languageclient';
import { isInsideEjsRegion } from './utils/ejs.js';
import { getLatexVirtualContent } from './utils/latex.js';

let client: LanguageClient;

export async function activate(context: ExtensionContext) {
	await commands.executeCommand('latex-workshop.tab');

	const serverModule = context.asAbsolutePath(
		path.join('server', 'dist', 'server.js')
	);

	const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions,
		},
	};

	const virtualDocumentContents = new Map<string, string>();

	workspace.registerTextDocumentContentProvider('embedded-content', {
		provideTextDocumentContent(uri) {
			const originalUri = uri.path.slice(1).slice(0, -4);
			const decodedUri = decodeURIComponent(originalUri);
			return virtualDocumentContents.get(decodedUri);
		},
	});

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'html1' }],
		middleware: {
			// eslint-disable-next-line max-params
			async provideCompletionItem(document, position, context, token, next) {
				// We only want to perform request forwarding for the LaTeX document since LaTeX-Workshop doesn't expose a language server. Thus, if we're inside EJS tags (`<% %>`), do not perform request forwarding (instead, use the JS language server).
				if (isInsideEjsRegion()) {
					return next(document, position, context, token);
				}

				const originalUri = document.uri.toString();
				virtualDocumentContents.set(originalUri, getLatexVirtualContent());

				const vdocUriString = `embedded-content://latex/${encodeURIComponent(
					originalUri
				)}.tex`;
				const vdocUri = Uri.parse(vdocUriString);
				return commands.executeCommand<CompletionList>(
					'vscode.executeCompletionItemProvider',
					vdocUri,
					position,
					context.triggerCharacter
				);
			},
		},
	};

	client.start();
}

export function deactivate() {
	if (client === undefined) {
		return;
	}

	return client.stop();
}

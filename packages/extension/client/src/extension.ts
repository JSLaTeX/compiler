import * as path from 'path';
import type { CompletionList, ExtensionContext } from 'vscode';
import { workspace, commands, Uri } from 'vscode';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind,
} from 'vscode-languageclient';
import { isInsideEjsRegion } from './utils/ejs.js';
import { getLatexVirtualContent } from './utils/latex.js';
import { getJavascriptVirtualContent } from './utils/ejs.js';

let client: LanguageClient;

export async function activate(context: ExtensionContext) {
	await commands.executeCommand('latex-workshop.tab');

	const serverModule = context.asAbsolutePath(path.join('dist', 'server.cjs'));

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
			// Removing the `/file://` prefix
			const filePath = uri.path.slice(8);
			const filename = path.parse(filePath).name;
			// Reconstructing the file prefix without the extra file extension
			const originalUri =
				uri.path.slice(1, 8) + path.join(path.parse(filePath).dir, filename);
			const decodedUri = decodeURIComponent(originalUri);
			const virtualDocumentText = virtualDocumentContents.get(decodedUri);
			console.log('h', virtualDocumentText);
			return virtualDocumentText;
		},
	});

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'jslatex' }],
		middleware: {
			// eslint-disable-next-line max-params
			async provideCompletionItem(document, position, context, token, next) {
				const originalUri = document.uri.toString();
				let virtualDocumentText: string;
				let vdocUriString: string;

				if (
					isInsideEjsRegion({
						documentText: document.getText(),
						offset: document.offsetAt(position),
					})
				) {
					virtualDocumentText = getJavascriptVirtualContent(document.getText());
					vdocUriString = `embedded-content://js/${encodeURIComponent(
						originalUri
					)}.js`;
				}
				// Inside LaTeX region
				else {
					virtualDocumentText = getLatexVirtualContent(document.getText());
					vdocUriString = `embedded-content://latex/${encodeURIComponent(
						originalUri
					)}.tex`;
				}

				virtualDocumentContents.set(originalUri, virtualDocumentText);
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

	client = new LanguageClient(
		'jslatex-language-server',
		'JSLaTeX Language Server',
		serverOptions,
		clientOptions
	);

	client.start();
	console.info('Client started.');
}

export async function deactivate() {
	if (client !== undefined) {
		await client.stop();
	}
}

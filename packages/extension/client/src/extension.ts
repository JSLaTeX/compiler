import type { CompletionList, ExtensionContext } from 'vscode';
import { workspace, commands, Uri } from 'vscode';
import { LanguageClient, LanguageClientOptions } from 'vscode-languageclient';
import { isInsideEjsRegion } from './utils/ejs.js';
import { getLatexVirtualContent } from './utils/latex.js';
import { getJavascriptVirtualContent } from './utils/ejs.js';

let client: LanguageClient;

export async function activate(context: ExtensionContext) {
	console.log('test');
	await commands.executeCommand('latex-workshop.tab');
	console.log('test2');

	const virtualDocumentContents = new Map<string, string>();

	workspace.registerTextDocumentContentProvider('embedded-content', {
		provideTextDocumentContent(uri) {
			console.log('oof', uri);
			const originalUri = uri.path.slice(1).slice(0, -4);
			const decodedUri = decodeURIComponent(originalUri);
			return virtualDocumentContents.get(decodedUri);
		},
	});

	console.log('monke');
	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'jslatex' }],
		middleware: {
			// eslint-disable-next-line max-params
			async provideCompletionItem(document, position, context, token, next) {
				console.log('test');
				const originalUri = document.uri.toString();
				let virtualDocumentText: string;
				let vdocUriString: string;

				if (
					isInsideEjsRegion({
						documentText: document.getText(),
						offset: position.character,
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
}

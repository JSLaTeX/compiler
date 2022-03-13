import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	vscode.workspace.onDidOpenTextDocument(async (event) => {
		console.log(event);
		if (event.fileName.endsWith('.jtex')) {
			await vscode.commands.executeCommand('latex-workshop.tab');
		}
	});
}

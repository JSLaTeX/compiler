import * as vscode from 'vscode';

export async function activate(_context: vscode.ExtensionContext) {
	await vscode.commands.executeCommand('latex-workshop.tab');
}

import * as fs from 'node:fs';
import * as path from 'node:path';
import {
	rmDist,
	chProjectDir,
	copyPackageFiles,
	getProjectDir,
} from 'lion-system';
import { execaCommandSync as exec } from 'execa';
import editJsonFile from 'edit-json-file';

rmDist();
chProjectDir(import.meta.url);
const extensionPackagePath = getProjectDir(import.meta.url);
const syntaxFolderPath = path.join(extensionPackagePath, 'syntax');
const distFolder = path.join(extensionPackagePath, 'dist');

const syntaxDistFolder = path.join(distFolder, 'syntax');
fs.mkdirSync(syntaxDistFolder, { recursive: true });

// Run all the TypeScript files
await Promise.all(
	fs.readdirSync(syntaxFolderPath).map(async (syntaxFileName) => {
		const filename = path.parse(syntaxFileName).name;
		const filePath = path.join(syntaxFolderPath, syntaxFileName);
		const { default: getConfigString } = (await import(filePath)) as {
			default: () => string | Promise<string>;
		};
		fs.writeFileSync(
			path.join(syntaxDistFolder, `${filename}.json`),
			await getConfigString()
		);
	})
);

copyPackageFiles();

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
fs.copyFileSync(path.join(monorepoDir, 'readme.md'), 'dist/readme.md');
fs.copyFileSync(path.join(monorepoDir, 'license'), 'dist/license');

// Compile the extension files in ./src
exec('tsc');

// Update the "main" property
const pkg = editJsonFile('package.json');
pkg.set('main', './extension.js');
pkg.save();

import * as fs from 'node:fs';
import * as path from 'node:path';
import { join } from 'desm';
import { copyPackageFiles } from 'lion-system';

const extensionPackagePath = join(import.meta.url, '..');
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

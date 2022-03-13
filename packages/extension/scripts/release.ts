import * as path from 'node:path';
import * as fs from 'node:fs';
import * as process from 'node:process';
import { execaCommandSync as exec } from 'execa';
import {
	chProjectDir,
	copyPackageFiles,
	getProjectDir,
	rmDist,
} from 'lion-system';
import editJsonFile from 'edit-json-file';
import { deepKeys, getProperty, setProperty } from 'dot-prop';

rmDist();
chProjectDir(import.meta.url);
exec('pnpm build', { stdio: 'inherit' });
copyPackageFiles();

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
const distDir = path.join(getProjectDir(import.meta.url), 'dist');

fs.copyFileSync(
	path.join(monorepoDir, 'readme.md'),
	path.join(distDir, 'readme.md')
);
fs.copyFileSync(
	path.join(monorepoDir, 'license'),
	path.join(distDir, 'license')
);

// Update dist-pointing paths
const pkg = editJsonFile('package.json');
const pkgJson = pkg.read();
for (const property of deepKeys(pkgJson)) {
	const value = getProperty(pkgJson, property) as unknown;
	if (typeof value === 'string' && value.startsWith('./dist')) {
		pkg.set(property, value.replace(/^\.\/dist/, ''));
	}
}
pkg.save();

const iconsDir = path.join(distDir, 'icons');

fs.mkdirSync(iconsDir, { recursive: true });
fs.copyFileSync(
	path.join(monorepoDir, 'assets/jslatex.png'),
	path.join(iconsDir, 'icon.png')
);

process.chdir(distDir);

exec('vsce package', { stdio: 'inherit' });
exec('vsce publish', { stdio: 'inherit' });

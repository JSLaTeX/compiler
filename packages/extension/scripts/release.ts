import * as path from 'node:path';
import * as fs from 'node:fs';
import * as process from 'node:process';
import { execaCommandSync as exec } from 'execa';
import {
	chProjectDir,
	copyPackageFiles,
	getProjectDir,
	rmDist,
	rewriteDistPaths,
} from 'lion-system';
import { setProperty } from 'dot-prop';
import inquirer from 'inquirer';
import PressToContinuePrompt from 'inquirer-press-to-continue';

inquirer.registerPrompt('press-to-continue', PressToContinuePrompt);

rmDist();
chProjectDir(import.meta.url);
exec('pnpm build', { stdio: 'inherit', env: { RELEASE: '1' } });
copyPackageFiles();

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
const distDir = path.join(getProjectDir(import.meta.url), 'dist');

fs.copyFileSync(
	path.join(monorepoDir, 'license'),
	path.join(distDir, 'license')
);

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')) as Record<
	string,
	unknown
>;
setProperty(pkg, 'type', 'commonjs');
rewriteDistPaths(pkg);
fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, '\t'));

const iconsDir = path.join(distDir, 'icons');

fs.mkdirSync(iconsDir, { recursive: true });
fs.copyFileSync(
	path.join(monorepoDir, 'assets/jslatex.png'),
	path.join(iconsDir, 'icon.png')
);

process.chdir(distDir);

exec('npm install --only=production', { stdio: 'inherit' });

await inquirer.prompt({
	name: 'response',
	pressToContinueMessage:
		'Please inspect the `dist/` folder to make sure everything looks OK in the bundled extension! Press enter to continue...',
	type: 'press-to-continue',
	enter: true,
});

exec('vsce package', { stdio: 'inherit' });
exec('vsce publish', { stdio: 'inherit' });

import * as path from 'node:path';
import * as fs from 'node:fs';
import * as process from 'node:process';
import { execaCommandSync as exec } from 'execa';
import { chProjectDir, getProjectDir, rmDist } from 'lion-system';

rmDist();
chProjectDir(import.meta.url);
exec('pnpm build', { stdio: 'inherit' });

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
const distDir = path.join(getProjectDir(import.meta.url), 'dist');

const iconsDir = path.join(distDir, 'icons');
fs.mkdirSync(iconsDir, { recursive: true });
fs.copyFileSync(
	path.join(monorepoDir, 'assets/jslatex.png'),
	path.join(iconsDir, 'icon.png')
);

process.chdir(distDir);

exec('vsce package', { stdio: 'inherit' });
exec('vsce publish', { stdio: 'inherit' });

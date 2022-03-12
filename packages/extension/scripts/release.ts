import * as path from 'node:path';
import * as fs from 'node:fs';
import * as process from 'node:process';
import { execaCommandSync as exec } from 'execa';
import { chProjectDir, getProjectDir } from 'lion-system';

chProjectDir(import.meta.url);
exec('pnpm build');

const monorepoDir = getProjectDir(import.meta.url, { monorepoRoot: true });
const distDir = path.join(getProjectDir(import.meta.url), 'dist');

const iconsDir = path.join(distDir, 'icons');
fs.mkdirSync(iconsDir, { recursive: true });
fs.copyFileSync(
	path.join(monorepoDir, 'assets/jslatex.png'),
	path.join(iconsDir, 'icon.png')
);

process.chdir(distDir);

exec('vsce package');
exec('vsce publish');

import * as process from 'node:process';
import { execaCommandSync as exec } from 'execa';
import { chProjectDir } from 'lion-system';

exec('pnpm build');
chProjectDir(import.meta.url);
process.chdir('dist');

exec('vsce package');
exec('vsce publish');

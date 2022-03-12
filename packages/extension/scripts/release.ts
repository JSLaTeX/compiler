import { execaCommandSync as exec } from 'execa';

exec('vsce package');
exec('vsce publish');

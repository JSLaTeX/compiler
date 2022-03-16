import * as process from 'node:process';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { program } from 'commander';
import { compileJsLatexFile } from '../utils/compile.js';

program
	.option(
		'-o, --out <outputFile>',
		'the file name the compiled LaTeX file is saved as'
	)
	.argument('<file>', 'the JSLaTeX file to compile')
	.parse();

const file = program.args[0]!;
const { out } = program.opts<{ out: string }>();

const latexString = await compileJsLatexFile({
	filePath: file,
	projectBaseUrl: `${process.cwd()}/`, // slash is needed here, otherwise it won't work
});
if (out === undefined) {
	const latexFile = path.parse(file).name;
	if (fs.existsSync(`${latexFile}.tex`)) {
		fs.writeFileSync(`${latexFile}.out.tex`, latexString);
	} else {
		fs.writeFileSync(`${latexFile}.tex`, latexString);
	}
} else {
	fs.writeFileSync(out, latexString);
}

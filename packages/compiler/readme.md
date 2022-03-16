# JSLaTeX Compiler

Compile JSLaTeX documents!

## Installation

```shell
npm install --global jslatex
```

## Usage

```shell
jslatex latex-with-js.tex -o file.tex
```

## Programmatic Usage

You can import JSLaTeX as a regular `npm` package and call it from Node.js:

```javascript
import { compileJsLatex, compileJsLatexFile } from 'jslatex';

const result = await compileJsLatex(String.raw`
  \documentclass{article}
  <?= "Hello from EJS!" ?>
`)

console.log(result);
// Outputs:
/*
\documentclass{article}
Hello from EJS!
*/

// In order for dynamic `import()`s to work, you need to pass projectBaseUrl:
console.log(await compileJsLatexFile({
  filePath: 'cow.tex',
  projectBaseUrl: import.meta.url
}));
```

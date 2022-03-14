# JSLaTeX

Supercharging LaTeX with JavaScript through [EJS](https://ejs.co)!

## Usage

If for some reason you want to type an actual `<%` sequence in your LaTeX document, you can type `<%%` since in EJS `<%%` outputs a literal `<%`.

## TODO

Highlight opening & closing EJS tags; this is quite difficult because of [this VSCode issue](https://github.com/microsoft/vscode/issues/20488). The solution to this problem is to implement syntax highlighting for a subset of JavaScript so

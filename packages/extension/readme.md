# JSLaTeX VSCode Extension

[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/leonzalion.jslatex.svg?label=Visual%20Studio%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=leonzalion.jslatex)

Provides syntax highlighting and IntelliSense for `.tex` files when using [EJS](https://ejs.co) or [ETS (embedded TypeScript!)](https://github.com/leonzalion/ets)

![Syntax Highlighting Example](https://raw.githubusercontent.com/leonzalion/jslatex/main/packages/extension/assets/syntax-highlighting.png)

Using JSLaTeX, the above code would output a LaTeX document which would display something similar to the following:
![Syntax Highlighting Example Output](
https://raw.githubusercontent.com/leonzalion/jslatex/main/packages/extension/assets/syntax-highlighting-output.png)

To compile a LaTeX file that includes EJS/ETS, please visit the site for the [JSLaTeX compiler](https://npm.im/jslatex).

If you're looking for EJS syntax highlighting for regular EJS files, check out [EJS/ETS language support](https://marketplace.visualstudio.com/items?itemName=leonzalion.vscode-ejs) that uses the same syntax highlighting grammar as this package (including special highlighting for the start and end EJS tags!).

**Note:** In order to preserve compatibility with existing LaTeX formatters, EJS in JSLaTeX uses `<?` and `?>` tags instead of `<%` and `%>`.

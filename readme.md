# JSLaTeX

[![Visual&nbsp;Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/leonzalion.jslatex.svg?label=Visual%20Studio%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=leonzalion.jslatex)

Supercharging LaTeX with JavaScript through [EJS](https://ejs.co)!

**Note:** Instead of `<%` and `%>` tags, JSLaTeX uses `<?` and `?>` in order to be compatible with existing LaTeX tools such as LaTeX formatters.

## Usage

The following [chem.tex](packages/compiler/test/fixtures/chem.tex) file (syntax highlighting provided by the [JSLaTeX VSCode extension](https://marketplace.visualstudio.com/items?itemName=leonzalion.jslatex)):

![Chemistry LaTeX file example](assets/chem-latex.png)

Gets compiled by JSLaTeX into the following LaTeX code:

```latex
\documentclass{article}
\usepackage[margin=1in]{geometry}
\usepackage{float}
\usepackage{tabularx}
\usepackage{ragged2e}
\usepackage[version=4]{mhchem}



\begin{document}
  \begin{table}[H]
    \begin{tabularx}{\linewidth}{|
        >{\RaggedRight}X|
        >{\RaggedRight}X|
        >{\RaggedRight}X|
        >{\RaggedRight}X|
        >{\RaggedRight}X|
        >{\RaggedRight}X|
      }
      \hline
      Trial \#
      & Volume of \ce{CuSO4} /mL
      & Baseline temperature /$^{\circ}$C
      & Time of \ce{Zn} addition /s
      & Equation of cooling line
      & R value
      \\\hline

        1
        & 20
        & 24.4
        & 72
        & -0.042 - 0.042$x$
        & -0.992
        \\\hline

        2
        & 20
        & 24.2
        & 132
        & -0.052 - 0.052$x$
        & -0.959
        \\\hline

        3
        & 20
        & 24.2
        & 60
        & -0.086 - 0.086$x$
        & -0.993
        \\\hline

        4
        & 20
        & 24.8
        & 72
        & -0.005 - 0.005$x$
        & -0.951
        \\\hline

        5
        & 20
        & 24.6
        & 96
        & -0.042 - 0.042$x$
        & -0.996
        \\\hline

        6
        & 20
        & 23.1
        & 14
        & 0.006 + 0.006$x$
        & 0.952
        \\\hline

        7
        & 20
        & 23.8
        & 15
        & -0.060 - 0.060$x$
        & -0.897
        \\\hline

        8
        & 20
        & 24.6
        & 96
        & -0.029 - 0.029$x$
        & -0.997
        \\\hline

    \end{tabularx}
  \end{table}
\end{document}
```

Note that there is no trace of the original JavaScript code in the final LaTeX file.

This LaTeX can then be compiled by a standard LaTeX compiler like `pdflatex` or `lualatex` to produce the following PDF file:

![The compiled PDF for chem.tex](assets/chem-latex-pdf.png)

You can also use imports within EJS:

```latex
\documentclass{article}

<? const { default: cowsay } = await import('cowsay') ?>

\begin{document}
\begin{verbatim}
	<?= cowsay.say({ text: 'LaTeX!' }) ?>
\end{verbatim}
\end{document}
```

The above JSLaTeX code gets compiled to:

```latex
\documentclass{article}



\begin{document}
\begin{verbatim}
	 ________
< LaTeX! >
 --------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
\end{verbatim}
\end{document}
```

And when compiled with a standard LaTeX compiler, the corresponding output PDF will display the following text:

![cowsay.tex PDF output](assets/cowsay-pdf.png)

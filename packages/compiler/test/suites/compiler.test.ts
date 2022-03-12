import dedent from 'dedent';
import { test } from 'vitest';
import { compileJsLatex } from '../../src/index.js';

test('compiles jslatex', async () => {
	const jsLatex = outdent`
	\documentclass[notitlepage, 12pt, letterpaper, oneside]{report}
\usepackage[margin=1in]{geometry}
\usepackage[utf8]{inputenc}
\usepackage{markdown}
\usepackage[version=4]{mhchem}
\usepackage{amsmath}
\usepackage{siunitx}
\usepackage{float}
\usepackage{caption}
\usepackage{titling}

\DeclareSIUnit\mpl{\mol\per\litre}
\DeclareSIUnit\mmol{\milli\mole}
\DeclareSIUnit\ml{\milli\litre}
\sisetup{space-before-unit = true, free-standing-units = true}

\title{Redox Titrations Lab}
\author{Leon Si}
\date{February 13, 2022}

\begin{document}
\maketitle
\thispagestyle{empty}

\section*{Data}

\begin{table}[H]
	\caption{Experiment Data}
	\label{table1}
	\def\arraystretch{1.5}
	\centering
	\begin{tabular}{|l|l|l|l|}
		\hline
		Trial \#
		  & \multicolumn{1}{|p{4.5cm}|}{\centering Initial Burette Reading                \\ (± 0.05\ml)}
		  & \multicolumn{1}{|p{4.5cm}|}{\centering Final Burette Reading                  \\ (± 0.05\ml)}
		  & \multicolumn{1}{|p{3cm}|}{\centering Difference                               \\ (± 0.1\ml)} \\
		\hline
		1 & 20.30                                                          & 26.75 & 6.45 \\ \hline
		2 & 26.75                                                          & 33.00 & 6.25 \\ \hline
	\end{tabular}
\end{table}

\section*{Observations}

When KI, HCl, and \ce{KIO3} where mixed together, the colour of the solution formed was reddish-brown.
\newline
When \ce{Na2S2O3} was added, the colour of the solution became lighter.
\newline
When the starch was added, the colour of the solution became darker (more brown).
\newline
When the end point of the solution was reached, the solution turned colourless extremely quickly (within a drop of the titrant).

\section*{Analysis}

To find the concentration of the potassium iodide solution (\ce{KIO3}), the number of moles of \ce{Na2S2O3} can be used. Using the data from Trial 2, the number of moles of \ce{Na2S2O3} can be calculated using the molar concentration formula:
\begin{align*}
	c        & = \frac{n}{V}       \\
	0.10\mpl & = \frac{n}{6.25\ml} \\
	n        & = 0.625\mmol
\end{align*}

Calculating the uncertainty of the number of moles:
\begin{align*}
	\Delta n & = 0.10\mpl * 0.1\ml     \\
	\Delta n & = 0.01\mmol             \\
	n        & = (0.625 \pm 0.01)\mmol
\end{align*}


The number of moles of \ce{Na2S2O3} can be converted to the number of moles of \ce{KIO3} using the mole ratio between \ce{KIO3} and \ce{Na2S2O3}:
\begin{gather*}
	1\mol \text{ \ce{KIO3}} *
	\frac{3\mol\ \ce{I2}}{1\mol\ \ce{KIO3}} *
	\frac{2\mol\ \ce{Na2S2O3}}{1\mol\ \ce{I2}}
	= 6\mol\ \ce{Na2S2O3}
\end{gather*}

This mole ratio is used with the molar concentration formula to calculate the concentration of the \ce{KIO3} solution:
\begin{align*}
	c & = \frac{n}{V} \\
	c & = \frac{
		0.625\mmol\ \ce{Na2S2O3} * \frac{1\mol\ \ce{KIO3}}{6\mol\ \ce{Na2S2O3}}
	}{5\ml}           \\
	c & = 0.0208\mpl
\end{align*}

The uncertainty of this concentration is calculated using ±0.05\ml\ as the uncertainty of the pipette:
\begin{align*}
	\Delta c & = c * (\frac{0.01\mmol}{0.625\mmol} + \frac{0.05\ml}{5\ml}) \\
	\Delta c & = 0.000542\mpl                                              \\
	c        & = (0.0208 \pm 0.0005)\mpl
\end{align*}

Repeating this calculation for each trial yields the following values:

\begin{table}[H]
	\caption{Processed Data}
	\label{table2}
	\def\arraystretch{1.5}
	\centering
	\begin{tabular}{|l|l|l|}
		\hline
		Trial \#
		  & \multicolumn{1}{|p{4.5cm}|}{\centering Volume of \ce{Na2S2O3}                              \\ (± 0.1\ml)}
		  & \multicolumn{1}{|p{4.5cm}|}{\centering Concentration of \ce{KIO3}}                         \\
		\hline
		1 & 6.45                                                               & (0.0215 ± 0.0005)\mpl \\ \hline
		2 & 6.25                                                               & (0.0208 ± 0.0005)\mpl \\ \hline
	\end{tabular}
\end{table}

By averaging the final data from all trials, the concentration of the \ce{KIO3} solution is determined to be (0.0212 ± 0.0005)\mpl.
\end{document}

	`);

	await compileJsLatex({
		latex:
	});
});

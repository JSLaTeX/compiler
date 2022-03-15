# JSLaTeX

[![Visual&nbsp;Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/leonzalion.jslatex.svg?label=Visual%20Studio%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=leonzalion.jslatex)

Supercharging LaTeX with JavaScript through [EJS](https://ejs.co)!

**Note:** Instead of `<%` and `%>` tags, JSLaTeX uses `<?` and `?>` in order to be compatible with existing LaTeX tools such as LaTeX formatters.

## Usage

```text
\documentclass{article}
\usepackage{float}

<?
const rawData = [
  [20, 24.4, 72, 75.358, -0.0417, -0.9918],
  [20, 24.2, 132, 76.1, -0.0521, -0.9591],
  [20, 24.2, 60, 74.9, -0.086299, -0.99338],
  [20, 24.8, 72, 38.948, -0.0052021, -0.95144],
  [20, 24.6, 96, 75.883, -0.042188, -0.99564],
  [20, 23.1, 14, 35.707, +0.0060035, 0.952365476],
  [20, 23.8, 15, 74.526, -0.059536, -0.8973],
  [20, 24.6, 96, 61.881, -0.02918, -0.99694],
];

const keys = ['volume', 'initialTemp', 'zincAdditionTime', 'coolingLineB', 'coolingLineM', 'rValue'];

// The Ramda library (https://ramdajs.com/) is present in the global scope as `R`!
const data = rawData.map((row) => Object.fromEntries(R.zip(keys, row)));

function getRowEquation(rowIndex) {
  const row = data[rowIndex];
  const sign = row.coolingLineM > 0 ? '+' : '-';
  const equation = `${row.coolingLineM.toFixed(3)} ${sign} ${Math.abs(row.coolingLineM).toFixed(3)}$x$`;
  return equation;
}
?>

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
     & Volume of \ce{CuSO4} /\ml
     & Baseline temperature /\celsius
     & Time of \ce{Zn} addition /\second
     & Equation of cooling line
     & R value
    \\\hline
    <? for (const [rowIndex, row] of data.entries()) { ?>
      <?= rowIndex + 1 ?>
      & <?= row.volume ?>
      & <?= row.initialTemp ?>
      & <?= row.zincAdditionTime ?>
      & <?= getRowEquation(rowIndex) ?>
      & <?= row.rValue.toFixed(3) ?>
      \\\hline
    <? } ?>
  \end{tabularx}
\end{table}
```


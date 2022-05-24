import 'katex/dist/katex.min.css';

export const RenderKatexMatrix = (matrix,type) => {
    return (
        "\\begin{"+type+"}\n" +
        matrix.map((row, index) => {
            if (index === matrix.length) return row + " & " + "\n"
            else return row + " & " + "\\\\\n"
            })
            .join("") +
        "\\end{"+type+"}"
    )
}
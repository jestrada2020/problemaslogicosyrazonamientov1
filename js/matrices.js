// Funciones para operaciones de matrices

// Función auxiliar para formatear números en LaTeX
function formatNumberForLatexSimple(num) {
    if (num === null || num === undefined) return '0';
    if (Number.isInteger(num)) return num.toString();
    
    // Versión simplificada para fracciones comunes
    if (num === 0.5) return '\\frac{1}{2}';
    if (num === 0.25) return '\\frac{1}{4}';
    if (num === 0.75) return '\\frac{3}{4}';
    if (num === 0.333 || Math.abs(num - 1/3) < 0.001) return '\\frac{1}{3}';
    if (num === 0.667 || Math.abs(num - 2/3) < 0.001) return '\\frac{2}{3}';
    
    // Para números decimales, limitar la precisión
    let decimalStr = num.toFixed(3);
    decimalStr = decimalStr.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '');
    return decimalStr;
}

// --- FUNCIONES PARA SUMA DE MATRICES ---
function generateMatrixInputsSum() {
    const rows = parseInt(document.getElementById('rowsSum').value);
    const cols = parseInt(document.getElementById('colsSum').value);
    let inputsHTML = `<div class="row"><div class="col-md-6"><h3>Matriz A</h3><div class="matrix-container" style="display: grid; grid-template-columns: repeat(${cols}, auto); gap: 5px;">`;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            inputsHTML += `<input type="number" class="form-control text-center" id="matrixA-${i}-${j}" placeholder="A[${i+1},${j+1}]" value="${Math.floor(Math.random()*10)}">`;
        }
    }
    inputsHTML += `</div></div><div class="col-md-6"><h3>Matriz B</h3><div class="matrix-container" style="display: grid; grid-template-columns: repeat(${cols}, auto); gap: 5px;">`;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            inputsHTML += `<input type="number" class="form-control text-center" id="matrixB-${i}-${j}" placeholder="B[${i+1},${j+1}]" value="${Math.floor(Math.random()*10)}">`;
        }
    }
    inputsHTML += "</div></div></div>";
    document.getElementById('matrix-inputs-sum').innerHTML = inputsHTML;
}

function calculateSum() {
    const rows = parseInt(document.getElementById('rowsSum').value);
    const cols = parseInt(document.getElementById('colsSum').value);
    const scalarA = parseFloat(document.getElementById('scalarA').value) || 1;
    const scalarB = parseFloat(document.getElementById('scalarB').value) || 1;
    let matrixA = [], matrixB = [], scaledMatrixA = [], scaledMatrixB = [], sumMatrix = [];

    for (let i = 0; i < rows; i++) {
        matrixA[i] = []; matrixB[i] = []; scaledMatrixA[i] = []; scaledMatrixB[i] = []; sumMatrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrixA[i][j] = parseFloat(document.getElementById(`matrixA-${i}-${j}`).value) || 0;
            matrixB[i][j] = parseFloat(document.getElementById(`matrixB-${i}-${j}`).value) || 0;
            scaledMatrixA[i][j] = matrixA[i][j] * scalarA;
            scaledMatrixB[i][j] = matrixB[i][j] * scalarB;
            sumMatrix[i][j] = scaledMatrixA[i][j] + scaledMatrixB[i][j];
        }
    }
    const latexOutput = `\\begin{align*}
        A &= ${matrixToLatexGen(matrixA)}, \\quad B = ${matrixToLatexGen(matrixB)} \\\\
        ${scalarA}A &= ${matrixToLatexGen(scaledMatrixA)}, \\quad ${scalarB}B = ${matrixToLatexGen(scaledMatrixB)} \\\\
        ${scalarA}A + ${scalarB}B &= ${matrixToLatexGen(sumMatrix)}
    \\end{align*}`;
    document.getElementById('matrix-sum-result-latex').innerHTML = latexOutput;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "matrix-sum-result-latex"]);
}

// --- FUNCIONES PARA PRODUCTO DE MATRICES ---
function generateMatrixInputsProd() {
    const rowsA = parseInt(document.getElementById('rowsAProd').value);
    const colsA = parseInt(document.getElementById('colsAProd').value);
    const colsB = parseInt(document.getElementById('colsBProd').value);
    document.getElementById('rowsBProd').value = colsA;

    let inputsHTML = `<div class="row"><div class="col-md-6"><h3>Matriz A (${rowsA}x${colsA})</h3><div class="matrix-container" style="display: grid; grid-template-columns: repeat(${colsA}, auto); gap: 5px;">`;
    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsA; j++) {
            inputsHTML += `<input type="number" class="form-control text-center" id="matrixAProd-${i}-${j}" placeholder="A[${i+1},${j+1}]" value="${Math.floor(Math.random()*5)}">`;
        }
    }
    inputsHTML += `</div></div><div class="col-md-6"><h3>Matriz B (${colsA}x${colsB})</h3><div class="matrix-container" style="display: grid; grid-template-columns: repeat(${colsB}, auto); gap: 5px;">`;
    for (let i = 0; i < colsA; i++) {
        for (let j = 0; j < colsB; j++) {
            inputsHTML += `<input type="number" class="form-control text-center" id="matrixBProd-${i}-${j}" placeholder="B[${i+1},${j+1}]" value="${Math.floor(Math.random()*5)}">`;
        }
    }
    inputsHTML += "</div></div></div>";
    document.getElementById('matrix-inputs-prod').innerHTML = inputsHTML;
}

function calculateProduct() {
    const rowsA = parseInt(document.getElementById('rowsAProd').value);
    const colsA = parseInt(document.getElementById('colsAProd').value);
    const rowsB = colsA;
    const colsB = parseInt(document.getElementById('colsBProd').value);
    let matrixA = [], matrixB = [], productMatrix = Array.from({ length: rowsA }, () => Array(colsB).fill(0));

    for (let i = 0; i < rowsA; i++) {
        matrixA[i] = [];
        for (let j = 0; j < colsA; j++) matrixA[i][j] = parseFloat(document.getElementById(`matrixAProd-${i}-${j}`).value) || 0;
    }
    for (let i = 0; i < rowsB; i++) {
        matrixB[i] = [];
        for (let j = 0; j < colsB; j++) matrixB[i][j] = parseFloat(document.getElementById(`matrixBProd-${i}-${j}`).value) || 0;
    }

    for (let i = 0; i < rowsA; i++) {
        for (let j = 0; j < colsB; j++) {
            for (let k = 0; k < colsA; k++) productMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
        }
    }
    
    let latexOutput = `\\begin{align*}
        A &= ${matrixToLatexGen(matrixA)} \\\\
        B &= ${matrixToLatexGen(matrixB)} \\\\
        A \\times B &= ${matrixToLatexGen(productMatrix)}
    \\end{align*}`;
    
    if (rowsA <= 3 && colsB <= 3) {
        for (let i = 0; i < rowsA; i++) {
            for (let j = 0; j < colsB; j++) {
                let cellCalc = `\\begin{equation*} (A \\times B)_{${i+1},${j+1}} = `;
                
                for (let k = 0; k < colsA; k++) {
                    cellCalc += `${matrixA[i][k]} \\cdot ${matrixB[k][j]}`;
                    if (k < colsA - 1) cellCalc += " + ";
                }
                
                cellCalc += ` = ${productMatrix[i][j]} \\end{equation*}`;
                latexOutput += cellCalc;
            }
        }
    }
        
    document.getElementById('matrix-product-result-latex').innerHTML = latexOutput;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "matrix-product-result-latex"]);
}

// --- FUNCIONES PARA POTENCIA DE MATRICES ---
function generateMatrixInputsPow() {
    const size = parseInt(document.getElementById('sizePow').value);
    let inputsHTML = `<h3>Matriz (${size}x${size})</h3><div class="matrix-container" style="display: grid; grid-template-columns: repeat(${size}, auto); gap: 5px; max-width: ${size*60}px; margin:auto;">`;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            inputsHTML += `<input type="number" class="form-control text-center" id="matrixPow-${i}-${j}" placeholder="M[${i+1},${j+1}]" value="${Math.floor(Math.random()*3)}">`;
        }
    }
    inputsHTML += "</div>";
    document.getElementById('matrix-inputs-pow').innerHTML = inputsHTML;
}

function multiplyMatricesGen(A, B) {
    let C = Array(A.length).fill(0).map(() => Array(B[0].length).fill(0));
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < B[0].length; j++) {
            for (let k = 0; k < B.length; k++) C[i][j] += A[i][k] * B[k][j];
        }
    }
    return C;
}

function matrixPower(matrix, p) {
    if (p === 0) {
        return matrix.map((row, i) => row.map((_, j) => (i === j ? 1 : 0)));
    }
    if (p === 1) return matrix;
    let result = matrix;
    for (let k = 1; k < p; k++) result = multiplyMatricesGen(result, matrix);
    return result;
}

function calculatePower() {
    const size = parseInt(document.getElementById('sizePow').value);
    const power = parseInt(document.getElementById('powerPow').value);
    let matrix = [];
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) matrix[i][j] = parseFloat(document.getElementById(`matrixPow-${i}-${j}`).value) || 0;
    }
    let resultMatrix = matrixPower(matrix, power);
    
    let latexOutput = `\\begin{align*}
        M &= ${matrixToLatexGen(matrix)} \\\\
        M^{${power}} &= ${matrixToLatexGen(resultMatrix)}
    \\end{align*}`;
    
    if (power > 1 && power <= 4) {
        latexOutput += "\\begin{equation*}\\text{Cálculo paso a paso:}\\end{equation*}";
        
        let intermediate = matrix;
        latexOutput += `\\begin{equation*} M^1 = ${matrixToLatexGen(matrix)} \\end{equation*}`;
        
        for (let p = 2; p <= power; p++) {
            intermediate = multiplyMatricesGen(intermediate, matrix);
            latexOutput += `\\begin{equation*} M^${p} = ${matrixToLatexGen(intermediate)} \\end{equation*}`;
            
            if (p < power) {
                latexOutput += "\\";
            }
        }
    }
    
    document.getElementById('matrix-pow-result-latex').innerHTML = latexOutput;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "matrix-pow-result-latex"]);
}

// Función genérica para convertir matriz a LaTeX
function matrixToLatexGen(matrix) {
    if (!matrix || matrix.length === 0) return '\\begin{pmatrix} \\end{pmatrix}';
    
    // Usar la función de determinantes si está disponible, sino la versión simple local
    const formatFunc = (typeof formatNumberForLatex === 'function') ? formatNumberForLatex : formatNumberForLatexSimple;
    return `\\begin{pmatrix} ${matrix.map(row => row.map(val => formatFunc(val)).join(' & ')).join(' \\\\ ')} \\end{pmatrix}`;
}

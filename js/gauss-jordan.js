// Método Gauss-Jordan
// Asegurar que el objeto app existe
if (typeof window.app === 'undefined') {
    window.app = {};
}

// Debug: Log estado inicial
console.log('Cargando gauss-jordan.js...');
console.log('window.app existe:', typeof window.app !== 'undefined');

app.gaussJordan = {
    rows: 3,
    cols: 3, // Variables, so matrix will be rows x (cols+1)
    matrix: [], // Current state of the matrix
    history: [], // Descriptions of operations [{text: "...", matrixBefore: [...], matrixAfter: [...]}]
    steps: [],   // Snapshots of matrix states [matrix1, matrix2, ...]

    init() {
        console.log('=== INICIANDO GAUSS-JORDAN ===');
        console.log('Estado inicial:');
        console.log('- this:', this);
        console.log('- this.rows:', this.rows);
        console.log('- this.cols:', this.cols);
        
        // Verificar que los elementos existan antes de continuar
        let attempts = 0;
        const maxAttempts = 15;
        
        const tryInit = () => {
            console.log(`Intento de inicialización ${attempts + 1}/${maxAttempts}`);
            
            const gjRowsElement = document.getElementById('gjRows');
            const gjColsElement = document.getElementById('gjCols');
            const gjOperationType = document.getElementById('gjOperationType');
            const gjMatrixInputs = document.getElementById('gjMatrixInputs');
            const gjOperationInputs = document.getElementById('gjOperationInputs');
            
            console.log('Elementos encontrados:');
            console.log('- gjRows:', !!gjRowsElement);
            console.log('- gjCols:', !!gjColsElement);
            console.log('- gjOperationType:', !!gjOperationType);
            console.log('- gjMatrixInputs:', !!gjMatrixInputs);
            console.log('- gjOperationInputs:', !!gjOperationInputs);
            
            if (!gjRowsElement || !gjColsElement || !gjOperationType || !gjMatrixInputs || !gjOperationInputs) {
                attempts++;
                if (attempts < maxAttempts) {
                    console.log(`Elementos DOM no encontrados, reintentando en 400ms...`);
                    setTimeout(tryInit, 400);
                    return;
                } else {
                    console.error('FALLO: No se pudieron encontrar todos los elementos DOM necesarios después de múltiples intentos');
                    alert('Error crítico: No se pueden inicializar los controles de Gauss-Jordan. Verifique que la página se haya cargado correctamente.');
                    return;
                }
            }
            
            console.log('✓ Todos los elementos DOM encontrados, procediendo con inicialización...');
            
            // Set default dimensions based on input fields or internal state
            this.rows = parseInt(gjRowsElement.value) || 3;
            this.cols = parseInt(gjColsElement.value) || 3;
            
            console.log(`✓ Dimensiones establecidas: ${this.rows}x${this.cols}`);
            
            // Limpiar estado anterior
            this.matrix = [];
            this.history = [];
            this.steps = [];
            
            console.log('✓ Estado limpiado');
            
            // Inicializar componentes
            try {
                console.log('Renderizando inputs de matriz...');
                this.renderMatrixInputs(); // For user to input initial matrix
                console.log('✓ Inputs de matriz renderizados');
                
                console.log('Renderizando parámetros de operación...');
                this.renderOperationParameterInputs(); // For selecting rows, scalars
                console.log('✓ Parámetros de operación renderizados');
                
                // Event listener for operation type change
                gjOperationType.addEventListener('change', () => {
                    console.log('Tipo de operación cambiado, re-renderizando parámetros...');
                    this.renderOperationParameterInputs();
                });
                console.log('✓ Event listener agregado al selector de operaciones');
                
                // Event listeners para dimensiones
                gjRowsElement.addEventListener('change', () => this.validateDimensions());
                gjColsElement.addEventListener('change', () => this.validateDimensions());
                console.log('✓ Event listeners para dimensiones agregados');
                
                this.updateUI(); // To show initial placeholders like "Sistema no cargado"
                console.log('✓ UI actualizada');
                
                console.log('🎉 GAUSS-JORDAN INICIALIZADO CORRECTAMENTE 🎉');
                
            } catch (error) {
                console.error('ERROR durante la inicialización:', error);
                alert('Error durante la inicialización de Gauss-Jordan: ' + error.message);
            }
        };
        
        tryInit();
    },

    validateDimensions() {
        const gjRowsElement = document.getElementById('gjRows');
        const gjColsElement = document.getElementById('gjCols');
        
        if (gjRowsElement) {
            const rows = parseInt(gjRowsElement.value);
            if (isNaN(rows) || rows < 1 || rows > 10) {
                gjRowsElement.value = Math.max(1, Math.min(10, rows || 3));
            }
        }
        
        if (gjColsElement) {
            const cols = parseInt(gjColsElement.value);
            if (isNaN(cols) || cols < 1 || cols > 10) {
                gjColsElement.value = Math.max(1, Math.min(10, cols || 3));
            }
        }
    },

    gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        if (b === 0) return a;
        while(b) [a, b] = [b, a % b];
        return a;
    },

    Fraction(num = 0, den = 1) {
        if (den === 0) throw new Error("Denominator cannot be zero.");
        const common = this.gcd(num, den);
        num = num / common;
        den = den / common;
        if(den < 0) { // Normalize sign to numerator
            num = -num;
            den = -den;
        }
        return { num: num, den: den };
    },

    parseFraction(strInput) {
        let str = String(strInput).trim();
        if (!str) str = "0"; // Default to 0 if empty

        if (str.includes('/')) {
            const parts = str.split('/');
            if (parts.length === 2) {
                const num = parseFloat(parts[0]);
                const den = parseFloat(parts[1]);
                if (!isNaN(num) && !isNaN(den) && den !== 0) {
                    return this.Fraction(num, den);
                }
            }
            // Invalid fraction format, treat as 0 or throw error
            console.warn(`Invalid fraction format: ${strInput}, defaulting to 0.`);
            return this.Fraction(0, 1); 
        }
        const num = parseFloat(str);
        if (isNaN(num)) {
            console.warn(`Invalid number format: ${strInput}, defaulting to 0.`);
            return this.Fraction(0,1);
        }
        return this.Fraction(num, 1);
    },
    
    updateDimensions() {
        console.log('Actualizando dimensiones...');
        
        const gjRowsElement = document.getElementById('gjRows');
        const gjColsElement = document.getElementById('gjCols');
        
        if (!gjRowsElement || !gjColsElement) {
            console.error('Elementos de dimensiones no encontrados');
            return;
        }
        
        this.validateDimensions();
        
        this.rows = parseInt(gjRowsElement.value);
        this.cols = parseInt(gjColsElement.value);
        
        console.log(`Nuevas dimensiones: ${this.rows}x${this.cols}`);
        
        this.renderMatrixInputs(); // Re-render input fields for new dimensions
        this.renderOperationParameterInputs(); // Re-render operation selectors for new row count
        this.matrix = []; // Clear current matrix data
        this.steps = [];
        this.history = [];
        this.updateUI(); // Update display to reflect reset
    },

    renderMatrixInputs() {
        console.log('Renderizando inputs de matriz...');
        const container = document.getElementById('gjMatrixInputs');
        if (!container) {
            console.error('Contenedor gjMatrixInputs no encontrado');
            return;
        }
        
        container.innerHTML = ''; // Clear previous inputs
        
        // Create a better structured table
        const wrapper = document.createElement('div');
        wrapper.className = 'matrix-inputs-wrapper';
        wrapper.style.overflowX = 'auto';
        
        const table = document.createElement('table');
        table.className = 'matrix-inputs-table';
        table.style.width = '100%';
        table.style.borderCollapse = 'separate';
        table.style.borderSpacing = '3px';

        let inputCount = 0;
        for(let i = 0; i < this.rows; i++) {
            const row = document.createElement('tr');
            
            for(let j = 0; j <= this.cols; j++) { // Iterate up to cols for the augmented part
                const cell = document.createElement('td');
                
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control form-control-sm matrix-input'; 
                input.style.width = '50px';
                input.style.textAlign = 'center';
                input.style.fontSize = '12px';
                
                // Default values - identity-like matrix with simple RHS
                if (j < this.cols) {
                    input.value = (i === j) ? '1' : '0'; // Identity matrix part
                } else {
                    input.value = (i + 1).toString(); // Simple RHS: [1, 2, 3, ...]
                }
                
                input.id = `gj_A_${i}_${j}`;
                input.placeholder = j === this.cols ? `b${i+1}` : `a${i+1}${j+1}`;
                input.title = j === this.cols ? `Término independiente ${i+1}` : `Coeficiente [${i+1},${j+1}]`;
                
                // Add visual separator for augmented part
                if (j === this.cols) {
                    cell.style.borderLeft = '2px solid #007bff';
                    cell.style.paddingLeft = '5px';
                }
                
                // Add change event to validate input
                input.addEventListener('input', (e) => {
                    const value = e.target.value.trim();
                    if (value && !this.isValidNumber(value)) {
                        e.target.style.borderColor = '#dc3545';
                        e.target.style.backgroundColor = '#fff5f5';
                    } else {
                        e.target.style.borderColor = '#ced4da';
                        e.target.style.backgroundColor = '#fff';
                    }
                });
                
                // Add focus/blur events for better UX
                input.addEventListener('focus', (e) => {
                    e.target.style.borderColor = '#007bff';
                    e.target.style.boxShadow = '0 0 0 0.2rem rgba(0,123,255,0.25)';
                });
                
                input.addEventListener('blur', (e) => {
                    e.target.style.boxShadow = 'none';
                    if (!e.target.value.trim() || !this.isValidNumber(e.target.value.trim())) {
                        e.target.style.borderColor = '#dc3545';
                    } else {
                        e.target.style.borderColor = '#ced4da';
                    }
                });
                
                cell.appendChild(input);
                row.appendChild(cell);
                inputCount++;
            }
            table.appendChild(row);
        }
        
        wrapper.appendChild(table);
        container.appendChild(wrapper);
        
        // Add helpful text
        const helpText = document.createElement('small');
        helpText.className = 'text-muted mt-2 d-block';
        helpText.innerHTML = `
            Matriz ${this.rows}×${this.cols+1} (${this.cols} variables + términos independientes)<br>
            Puede usar fracciones como 1/2, -3/4, números decimales o enteros.
        `;
        container.appendChild(helpText);
        
        console.log(`Creados ${inputCount} inputs para matriz ${this.rows}x${this.cols + 1}`);
    },

    isValidNumber(str) {
        // Validar si es un número válido o fracción
        if (str.includes('/')) {
            const parts = str.split('/');
            return parts.length === 2 && !isNaN(parseFloat(parts[0])) && !isNaN(parseFloat(parts[1])) && parseFloat(parts[1]) !== 0;
        }
        return !isNaN(parseFloat(str));
    },

    generateMatrix() { // Reads from gjMatrixInputs and populates this.matrix
        console.log('Generando matriz desde inputs...');
        
        if (!document.getElementById('gjMatrixInputs')) {
            console.error('Contenedor de inputs de matriz no encontrado');
            alert('Error: No se pueden leer los valores de la matriz. Actualice las dimensiones primero.');
            return;
        }
        
        this.matrix = [];
        let hasError = false;
        let errorMessages = [];
        
        for(let i = 0; i < this.rows; i++) {
            const currentRow = [];
            for(let j = 0; j <= this.cols; j++) {
                const inputElement = document.getElementById(`gj_A_${i}_${j}`);
                if (inputElement) {
                    const value = inputElement.value.trim();
                    if (!value) {
                        inputElement.value = '0';
                        currentRow.push(this.Fraction(0, 1));
                    } else if (this.isValidNumber(value)) {
                        try {
                            currentRow.push(this.parseFraction(value));
                            inputElement.style.borderColor = '#28a745'; // Verde para valores válidos
                        } catch (e) {
                            console.error(`Error parseando fracción en [${i},${j}]: ${value}`, e);
                            inputElement.style.borderColor = '#dc3545';
                            errorMessages.push(`Posición [${i+1},${j+1}]: "${value}" no es válido`);
                            hasError = true;
                        }
                    } else {
                        console.error(`Valor inválido en posición [${i},${j}]: ${value}`);
                        inputElement.style.borderColor = '#dc3545';
                        errorMessages.push(`Posición [${i+1},${j+1}]: "${value}" no es un número válido`);
                        hasError = true;
                    }
                } else {
                    console.error(`Input element gj_A_${i}_${j} not found!`);
                    currentRow.push(this.Fraction(0,1)); 
                    errorMessages.push(`Campo de entrada [${i+1},${j+1}] no encontrado`);
                    hasError = true;
                }
            }
            this.matrix.push(currentRow);
        }
        
        if (hasError) {
            const errorMsg = 'Errores encontrados en la matriz:\n' + errorMessages.join('\n');
            alert(errorMsg);
            console.error('Errores en matriz:', errorMessages);
            return;
        }
        
        // Deep copy for steps and history
        this.steps = [JSON.parse(JSON.stringify(this.matrix))]; 
        this.history = [];
        
        // Resetear colores de borde a normal
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j <= this.cols; j++) {
                const inputElement = document.getElementById(`gj_A_${i}_${j}`);
                if (inputElement) {
                    inputElement.style.borderColor = '#ced4da';
                }
            }
        }
        
        this.updateUI();
        
        console.log('Matriz generada exitosamente:', this.matrix);
        console.log('Pasos inicializados:', this.steps);
        
        // Mostrar mensaje de éxito
        const successMsg = `Matriz ${this.rows}×${this.cols+1} cargada exitosamente. ¡Ya puede aplicar operaciones!`;
        console.log(successMsg);
    },

    applyOperation() {
        if (this.matrix.length === 0) {
            alert("Primero genere o cargue una matriz usando el botón 'Cargar Matriz y Empezar'.");
            return;
        }
        
        const operationType = document.getElementById('gjOperationType')?.value;
        if (!operationType) {
            alert("Error: No se pudo obtener el tipo de operación.");
            return;
        }
        
        const matrixBeforeOp = JSON.parse(JSON.stringify(this.matrix)); // For history
        let opDescription = "";

        try {
            let row1_idx, row2_idx, scalar_val, target_idx, source_idx, multiplier_val;

            switch(operationType) {
                case 'multiply':
                    const gjOpRow1 = document.getElementById('gjOpRow1');
                    const gjOpScalar = document.getElementById('gjOpScalar');
                    
                    if (!gjOpRow1 || !gjOpScalar) {
                        throw new Error("Elementos de operación no encontrados. Refresque la página.");
                    }
                    
                    row1_idx = parseInt(gjOpRow1.value);
                    if (isNaN(row1_idx) || row1_idx < 0 || row1_idx >= this.rows) {
                        throw new Error("Seleccione una fila válida.");
                    }
                    
                    scalar_val = this.parseFraction(gjOpScalar.value);
                    if (scalar_val.num === 0 && scalar_val.den === 1) { // Multiplying by 0
                         if (!confirm("Multiplicar una fila por cero resultará en una fila de ceros. ¿Continuar?")) return;
                    }
                    if (scalar_val.den === 0) throw new Error("Escalar no puede tener denominador cero.");

                    this.matrix[row1_idx] = this.matrix[row1_idx].map(f => this.multiplyFractions(f, scalar_val));
                    opDescription = `F_{${row1_idx + 1}} \\leftarrow ${this.formatFraction(scalar_val)} \\cdot F_{${row1_idx + 1}}`;
                    break;
                    
                case 'add': // F_target <- F_target + k * F_source
                    const gjOpTargetRow = document.getElementById('gjOpTargetRow');
                    const gjOpSourceRow = document.getElementById('gjOpSourceRow');
                    const gjOpMultiplier = document.getElementById('gjOpMultiplier');
                    
                    if (!gjOpTargetRow || !gjOpSourceRow || !gjOpMultiplier) {
                        throw new Error("Elementos de operación no encontrados. Refresque la página.");
                    }
                    
                    target_idx = parseInt(gjOpTargetRow.value);
                    source_idx = parseInt(gjOpSourceRow.value);
                    
                    if (isNaN(target_idx) || isNaN(source_idx) || 
                        target_idx < 0 || target_idx >= this.rows ||
                        source_idx < 0 || source_idx >= this.rows) {
                        throw new Error("Seleccione filas fuente y destino válidas.");
                    }
                    
                    if (target_idx === source_idx) {
                        throw new Error("Fila fuente y destino no pueden ser la misma para esta operación.");
                    }
                    
                    multiplier_val = this.parseFraction(gjOpMultiplier.value);
                    if (multiplier_val.den === 0) throw new Error("Multiplicador no puede tener denominador cero.");
                    
                    this.matrix[target_idx] = this.matrix[target_idx].map((val, col_idx) => 
                        this.addFractions(val, this.multiplyFractions(this.matrix[source_idx][col_idx], multiplier_val))
                    );
                    let k_formatted = this.formatFraction(multiplier_val);
                    if (multiplier_val.num < 0) k_formatted = `(${k_formatted})`; // Parenthesize negative k
                    opDescription = `F_{${target_idx + 1}} \\leftarrow F_{${target_idx + 1}} + ${k_formatted} \\cdot F_{${source_idx + 1}}`;
                    break;
                    
                case 'swap':
                    const gjOpRow1_swap = document.getElementById('gjOpRow1_swap');
                    const gjOpRow2_swap = document.getElementById('gjOpRow2_swap');
                    
                    if (!gjOpRow1_swap || !gjOpRow2_swap) {
                        throw new Error("Elementos de operación no encontrados. Refresque la página.");
                    }
                    
                    row1_idx = parseInt(gjOpRow1_swap.value);
                    row2_idx = parseInt(gjOpRow2_swap.value);
                    
                    if (isNaN(row1_idx) || isNaN(row2_idx) ||
                        row1_idx < 0 || row1_idx >= this.rows ||
                        row2_idx < 0 || row2_idx >= this.rows) {
                        throw new Error("Seleccione dos filas válidas para intercambiar.");
                    }
                    
                    if (row1_idx === row2_idx) {
                        throw new Error("Seleccione filas diferentes para intercambiar.");
                    }

                    [this.matrix[row1_idx], this.matrix[row2_idx]] = [this.matrix[row2_idx], this.matrix[row1_idx]];
                    opDescription = `F_{${row1_idx + 1}} \\leftrightarrow F_{${row2_idx + 1}}`;
                    break;
                    
                default:
                    throw new Error(`Tipo de operación desconocido: ${operationType}`);
            }
            
            this.steps.push(JSON.parse(JSON.stringify(this.matrix)));
            this.history.push({ 
                text: opDescription, 
                matrixBefore: matrixBeforeOp, 
                matrixAfter: JSON.parse(JSON.stringify(this.matrix)) 
            });
            
            this.updateUI();
            console.log(`Operación aplicada: ${opDescription}`);

        } catch (e) {
            console.error('Error en operación:', e);
            alert("Error en la operación: " + e.message);
        }
    },

    multiplyFractions(f1, f2) {
        return this.Fraction(f1.num * f2.num, f1.den * f2.den);
    },

    addFractions(f1, f2) {
        return this.Fraction(
            f1.num * f2.den + f2.num * f1.den,
            f1.den * f2.den
        );
    },

    undoOperation() {
        if (this.steps.length > 1) { // Need at least initial state + one operation
            this.steps.pop(); // Remove current state
            this.matrix = JSON.parse(JSON.stringify(this.steps[this.steps.length - 1])); // Revert to previous state
            this.history.pop(); // Remove last operation description
            this.updateUI();
        } else {
            alert("No hay operaciones para deshacer o está en el estado inicial.");
        }
    },

    renderOperationParameterInputs() { // Renders inputs for row numbers, scalars, etc.
        const container = document.getElementById('gjOperationInputs');
        if (!container) return;
        container.innerHTML = ''; // Clear previous
        const type = document.getElementById('gjOperationType').value;

        let rowOptionsHTML = "";
        for (let i = 0; i < this.rows; i++) {
            rowOptionsHTML += `<option value="${i}">Fila ${i + 1}</option>`;
        }
        
        if (type === 'multiply') {
            container.innerHTML = `
                <div class="mb-2">
                    <label for="gjOpRow1" class="form-label form-label-sm">Fila (Fᵢ):</label>
                    <select id="gjOpRow1" class="form-select form-select-sm">${rowOptionsHTML}</select>
                </div>
                <div class="mb-2">
                    <label for="gjOpScalar" class="form-label form-label-sm">Escalar (k):</label>
                    <input type="text" id="gjOpScalar" class="form-control form-control-sm" value="1">
                </div>`;
        } else if (type === 'add') { // F_target <- F_target + k * F_source
            container.innerHTML = `
                <div class="mb-2">
                    <label for="gjOpTargetRow" class="form-label form-label-sm">Fila Destino (Fᵢ):</label>
                    <select id="gjOpTargetRow" class="form-select form-select-sm">${rowOptionsHTML}</select>
                </div>
                <div class="mb-2">
                    <label for="gjOpMultiplier" class="form-label form-label-sm">Multiplicador (k):</label>
                    <input type="text" id="gjOpMultiplier" class="form-control form-control-sm" value="1">
                </div>
                <div class="mb-2">
                    <label for="gjOpSourceRow" class="form-label form-label-sm">Fila Fuente (Fⱼ):</label>
                    <select id="gjOpSourceRow" class="form-select form-select-sm">${rowOptionsHTML}</select>
                </div>`;
        } else if (type === 'swap') {
            container.innerHTML = `
                <div class="mb-2">
                    <label for="gjOpRow1_swap" class="form-label form-label-sm">Fila 1 (Fᵢ):</label>
                    <select id="gjOpRow1_swap" class="form-select form-select-sm">${rowOptionsHTML}</select>
                </div>
                <div class="mb-2">
                    <label for="gjOpRow2_swap" class="form-label form-label-sm">Fila 2 (Fⱼ):</label>
                    <select id="gjOpRow2_swap" class="form-select form-select-sm">${rowOptionsHTML}</select>
                </div>`;
        }
    },
    
    formatFraction(f) { // For LaTeX display
        if (!f || typeof f !== 'object' || !('num' in f) || !('den' in f)) {
            console.warn('Fracción inválida:', f);
            return '0';
        }
        
        if (f.den === 0) return "\\text{Indefinido}";
        if (f.den === 1 || f.num === 0) return f.num.toString();
        
        // Manejar números negativos correctamente
        const num = f.num;
        const den = Math.abs(f.den);
        
        if (den === 1) return num.toString();
        
        return `\\frac{${num}}{${den}}`;
    },

    matrixToLatex(matrixArray) {
        if (!matrixArray || matrixArray.length === 0) {
            return '\\begin{pmatrix} \\text{No hay datos} \\end{pmatrix}';
        }
        
        if (!Array.isArray(matrixArray[0])) {
            return '\\begin{pmatrix} \\text{Datos incorrectos} \\end{pmatrix}';
        }

        try {
            let latex = '\\left(\\begin{array}{';
            
            // Configurar columnas (variables + separador + constantes)
            const numCols = matrixArray[0].length;
            if (numCols > 1) {
                // Todas las columnas excepto la última son variables
                for (let i = 0; i < numCols - 1; i++) {
                    latex += 'c';
                }
                latex += '|c'; // Separador para columna de constantes
            } else {
                latex += 'c';
            }
            
            latex += '}\n';
            
            matrixArray.forEach((row, rowIndex) => {
                if (!Array.isArray(row)) {
                    latex += `\\text{Fila ${rowIndex+1} incorrecta}`;
                } else {
                    const rowLatex = row.map((f_obj, colIndex) => {
                        if (typeof f_obj === 'object' && f_obj !== null && 'num' in f_obj && 'den' in f_obj) {
                            return this.formatFraction(f_obj);
                        }
                        return String(f_obj);
                    }).join(' & ');
                    latex += rowLatex;
                }
                
                if (rowIndex < matrixArray.length - 1) {
                    latex += ' \\\\ \n';
                }
            });
            
            latex += '\n\\end{array}\\right)';
            return latex;
        } catch (error) {
            console.error('Error al generar LaTeX:', error);
            return '\\begin{pmatrix} \\text{Error al generar matriz} \\end{pmatrix}';
        }
    },

    updateUI() {
        console.log('=== ACTUALIZANDO UI DE GAUSS-JORDAN ===');
        
        // Verificar elementos DOM
        const currentMatrixDiv = document.getElementById('gjCurrentMatrix');
        const augmentedMatrixDiv = document.getElementById('gjAugmentedMatrix');
        const historyDiv = document.getElementById('gjOperationHistory');
        
        console.log('Elementos de UI encontrados:');
        console.log('- gjCurrentMatrix:', !!currentMatrixDiv);
        console.log('- gjAugmentedMatrix:', !!augmentedMatrixDiv);
        console.log('- gjOperationHistory:', !!historyDiv);
        
        if (!currentMatrixDiv || !augmentedMatrixDiv || !historyDiv) {
            console.error('Algunos elementos DOM no están disponibles para la actualización de UI');
            console.error('Esperando 300ms antes de reintentar...');
            setTimeout(() => this.updateUI(), 300);
            return;
        }
        
        try {
            console.log('Estado actual:');
            console.log('- matrix.length:', this.matrix ? this.matrix.length : 'undefined');
            console.log('- steps.length:', this.steps ? this.steps.length : 'undefined');
            console.log('- history.length:', this.history ? this.history.length : 'undefined');
            
            // Actualizar matriz actual
            if (this.matrix && this.matrix.length > 0) {
                console.log('Actualizando matriz actual...');
                const latexMatrix = this.matrixToLatex(this.matrix);
                console.log('LaTeX generado para matriz actual:', latexMatrix.substring(0, 100) + '...');
                currentMatrixDiv.innerHTML = `$$ ${latexMatrix} $$`;
                console.log('✓ Matriz actual actualizada');
            } else {
                currentMatrixDiv.innerHTML = '<div class="text-muted">Genere una matriz y aplique operaciones.</div>';
                console.log('✓ Placeholder para matriz actual establecido');
            }
            
            // Actualizar matriz original
            if (this.steps && this.steps.length > 0 && this.steps[0]) {
                console.log('Actualizando matriz original...');
                const latexOriginal = this.matrixToLatex(this.steps[0]);
                console.log('LaTeX generado para matriz original:', latexOriginal.substring(0, 100) + '...');
                augmentedMatrixDiv.innerHTML = `$$ ${latexOriginal} $$`;
                console.log('✓ Matriz original actualizada');
            } else {
                augmentedMatrixDiv.innerHTML = '<div class="text-muted">Sistema no cargado.</div>';
                console.log('✓ Placeholder para matriz original establecido');
            }
            
            // Actualizar historial
            if (this.history && this.history.length > 0) {
                console.log(`Actualizando historial con ${this.history.length} operaciones...`);
                const historyHTML = this.history.map((h_entry, index) => 
                    `<div class="gj-history-item">
                        <strong>Paso ${index + 1}:</strong> $${h_entry.text}$
                    </div>`
                ).join('');
                historyDiv.innerHTML = historyHTML;
                console.log('✓ Historial actualizado');
            } else {
                historyDiv.innerHTML = '<div class="text-muted">No hay operaciones realizadas.</div>';
                console.log('✓ Placeholder para historial establecido');
            }
            
            // Renderizar MathJax de forma más robusta
            console.log('Iniciando renderizado de MathJax...');
            this.renderMathJax();
            
            console.log('🎉 UI ACTUALIZADA CORRECTAMENTE 🎉');
            
        } catch (error) {
            console.error('ERROR al actualizar UI:', error);
            console.error('Stack trace:', error.stack);
        }
    },

    renderMathJax() {
        console.log('=== RENDERIZANDO MATHJAX ===');
        
        if (typeof MathJax === "undefined") {
            console.warn('⚠️ MathJax no está disponible');
            return;
        }
        
        try {
            if (MathJax.Hub) {
                // MathJax 2.x
                console.log('Usando MathJax 2.x...');
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementById('tool-content')]);
                console.log('✓ MathJax 2.x renderizado');
            } else if (MathJax.typesetPromise) {
                // MathJax 3.x
                console.log('Usando MathJax 3.x...');
                MathJax.typesetPromise([document.getElementById('tool-content')]).then(() => {
                    console.log('✓ MathJax 3.x renderizado');
                }).catch(err => {
                    console.error('❌ Error renderizando MathJax 3.x:', err);
                });
            } else if (MathJax.startup) {
                // MathJax 3.x alternativo
                console.log('Usando MathJax 3.x (startup)...');
                MathJax.startup.document.rerender();
                console.log('✓ MathJax 3.x (startup) renderizado');
            } else {
                console.warn('⚠️ Versión de MathJax no reconocida');
                console.log('MathJax object:', Object.keys(MathJax));
            }
        } catch (error) {
            console.error('❌ Error al renderizar MathJax:', error);
        }
    },

    // Función para cargar un ejemplo predefinido
    loadExample() {
        console.log('Cargando ejemplo predefinido...');
        
        // Establecer dimensiones del ejemplo (3x3)
        const gjRowsElement = document.getElementById('gjRows');
        const gjColsElement = document.getElementById('gjCols');
        
        if (gjRowsElement && gjColsElement) {
            gjRowsElement.value = '3';
            gjColsElement.value = '3';
            this.rows = 3;
            this.cols = 3;
        }
        
        // Regenerar inputs con las nuevas dimensiones
        this.renderMatrixInputs();
        this.renderOperationParameterInputs();
        
        // Esperar a que los inputs se rendericen
        setTimeout(() => {
            // Ejemplo: sistema 3x3 simple
            const exampleMatrix = [
                [2, 1, -1, 8],
                [-3, -1, 2, -11],
                [-2, 1, 2, -3]
            ];
            
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 4; j++) {
                    const inputElement = document.getElementById(`gj_A_${i}_${j}`);
                    if (inputElement) {
                        inputElement.value = exampleMatrix[i][j].toString();
                        inputElement.style.borderColor = '#28a745';
                    }
                }
            }
            
            // Generar la matriz automáticamente
            this.generateMatrix();
            
            // Mostrar mensaje informativo
            console.log('Ejemplo cargado: Sistema 3x3 con solución única');
        }, 200);
    },

    // Función para resetear completamente el estado
    resetAll() {
        console.log('Reseteando sistema Gauss-Jordan...');
        
        // Limpiar todos los estados
        this.matrix = [];
        this.history = [];
        this.steps = [];
        
        // Resetear dimensiones a valores por defecto
        const gjRowsElement = document.getElementById('gjRows');
        const gjColsElement = document.getElementById('gjCols');
        
        if (gjRowsElement && gjColsElement) {
            gjRowsElement.value = '3';
            gjColsElement.value = '3';
            this.rows = 3;
            this.cols = 3;
        }
        
        // Re-renderizar todos los componentes
        this.renderMatrixInputs();
        this.renderOperationParameterInputs();
        this.updateUI();
        
        console.log('Sistema reseteado correctamente');
    },

    // Función para exportar el estado actual (opcional)
    exportState() {
        const state = {
            rows: this.rows,
            cols: this.cols,
            matrix: this.matrix,
            history: this.history,
            steps: this.steps,
            timestamp: new Date().toISOString()
        };
        
        const dataStr = JSON.stringify(state, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'gauss_jordan_state.json';
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        console.log('Estado exportado exitosamente');
    },
    
    // Función de diagnóstico para verificar el estado del sistema
    diagnose() {
        console.log('=== DIAGNÓSTICO GAUSS-JORDAN ===');
        
        const report = {
            timestamp: new Date().toISOString(),
            elements: {},
            state: {},
            functions: {}
        };
        
        // Verificar elementos DOM
        const requiredElements = [
            'gjRows', 'gjCols', 'gjOperationType', 'gjMatrixInputs', 
            'gjOperationInputs', 'gjCurrentMatrix', 'gjAugmentedMatrix', 
            'gjOperationHistory'
        ];
        
        requiredElements.forEach(id => {
            const element = document.getElementById(id);
            report.elements[id] = {
                exists: !!element,
                type: element ? element.tagName : null,
                value: element ? (element.value || element.textContent?.substring(0, 50)) : null
            };
        });
        
        // Verificar estado interno
        report.state = {
            rows: this.rows,
            cols: this.cols,
            matrixLength: this.matrix ? this.matrix.length : null,
            stepsLength: this.steps ? this.steps.length : null,
            historyLength: this.history ? this.history.length : null
        };
        
        // Verificar funciones
        const requiredFunctions = [
            'init', 'renderMatrixInputs', 'generateMatrix', 'applyOperation',
            'updateUI', 'renderMathJax', 'loadExample', 'resetAll'
        ];
        
        requiredFunctions.forEach(funcName => {
            report.functions[funcName] = typeof this[funcName] === 'function';
        });
        
        // Verificar MathJax
        report.mathJax = {
            available: typeof MathJax !== 'undefined',
            hasHub: typeof MathJax !== 'undefined' && !!MathJax.Hub,
            hasTypeset: typeof MathJax !== 'undefined' && !!MathJax.typesetPromise
        };
        
        console.log('Reporte de diagnóstico:', report);
        
        // Mostrar resumen en consola
        const allElementsOk = Object.values(report.elements).every(e => e.exists);
        const allFunctionsOk = Object.values(report.functions).every(f => f);
        
        console.log(`✓ Elementos DOM: ${allElementsOk ? 'OK' : 'FALTAN ALGUNOS'}`);
        console.log(`✓ Funciones: ${allFunctionsOk ? 'OK' : 'FALTAN ALGUNAS'}`);
        console.log(`✓ MathJax: ${report.mathJax.available ? 'OK' : 'NO DISPONIBLE'}`);
        console.log(`✓ Estado: rows=${report.state.rows}, cols=${report.state.cols}`);
        
        return report;
    },
};

// Función global para diagnóstico
window.diagnoseGaussJordan = function() {
    console.log('diagnoseGaussJordan llamada');
    if (typeof app !== 'undefined' && app.gaussJordan && typeof app.gaussJordan.diagnose === 'function') {
        return app.gaussJordan.diagnose();
    } else {
        console.error('Diagnóstico no disponible');
        return null;
    }
};

// Funciones globales para cargar ejemplo y resetear desde HTML
window.loadGaussJordanExample = function() {
    console.log('loadGaussJordanExample llamada');
    console.log('app existe:', typeof app !== 'undefined');
    console.log('app.gaussJordan existe:', typeof app !== 'undefined' && typeof app.gaussJordan !== 'undefined');
    
    if (typeof app !== 'undefined' && app.gaussJordan && typeof app.gaussJordan.loadExample === 'function') {
        app.gaussJordan.loadExample();
    } else {
        console.error('Gauss-Jordan no está inicializado o loadExample no está disponible');
        alert('Error: La funcionalidad de Gauss-Jordan no está disponible. Refresque la página.');
    }
};

// Función global para resetear desde HTML
window.resetGaussJordan = function() {
    console.log('resetGaussJordan llamada');
    if (typeof app !== 'undefined' && app.gaussJordan && typeof app.gaussJordan.resetAll === 'function') {
        app.gaussJordan.resetAll();
    } else {
        console.error('Gauss-Jordan no está inicializado o resetAll no está disponible');
        alert('Error: La funcionalidad de Gauss-Jordan no está disponible. Refresque la página.');
    }
};

// Debug: Verificar que las funciones se crearon
console.log('Funciones globales creadas:');
console.log('loadGaussJordanExample:', typeof window.loadGaussJordanExample);
console.log('resetGaussJordan:', typeof window.resetGaussJordan);
console.log('gauss-jordan.js cargado completamente');

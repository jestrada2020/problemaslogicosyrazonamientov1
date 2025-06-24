// Problema Lógico Cuatro: Concurso de Baile
// Basado en el problema de parejas de baile y premios

class ProblemaLogico4 {
    constructor() {
        this.initializeData();
        this.currentStep = 0;
        this.maxSteps = 8;
        this.userSolution = {
            parejas: {},
            premios: {},
            colores: {}
        };
    }

    initializeData() {
        // Datos del problema
        this.hombres = ['Adrián', 'Benito', 'César', 'Daniel'];
        this.mujeres = ['Ana', 'Beatriz', 'Carmen', 'Diana'];
        this.premios = ['1er lugar', '2do lugar', '3er lugar', '4to lugar'];
        this.coloresMujeres = ['azul', 'rojo', 'verde', 'amarillo'];
        
        // Pistas del problema
        this.pistas = [
            "1. César y su pareja obtuvieron 2do lugar",
            "2. Adrián bailó con la mujer del vestido azul",
            "3. La pareja de Daniel obtuvo 3er lugar",
            "4. Beatriz llevaba vestido rojo",
            "5. La mujer del vestido verde obtuvo 1er lugar",
            "6. Ana no bailó con César",
            "7. Carmen no llevaba vestido amarillo",
            "8. Diana no obtuvo 4to lugar"
        ];

        // Solución correcta
        this.solucionCorrecta = {
            parejas: {
                'Adrián': 'Diana',
                'Benito': 'Carmen', 
                'César': 'Ana',
                'Daniel': 'Beatriz'
            },
            premios: {
                'Adrián': '1er lugar',
                'Benito': '4to lugar',
                'César': '2do lugar', 
                'Daniel': '3er lugar'
            },
            colores: {
                'Ana': 'verde',
                'Beatriz': 'rojo',
                'Carmen': 'azul',
                'Diana': 'amarillo'
            }
        };

        // Inicializar matrices
        this.matrices = {
            parejas: this.createMatrix(this.hombres, this.mujeres),
            premios: this.createMatrix(this.hombres, this.premios),
            colores: this.createMatrix(this.mujeres, this.coloresMujeres)
        };

        // Pasos de resolución
        this.pasos = [
            {
                descripcion: "De la pista 1: César obtuvo 2do lugar",
                cambios: [
                    { tipo: 'premios', fila: 'César', columna: '2do lugar', valor: '✓' }
                ]
            },
            {
                descripcion: "De la pista 3: Daniel obtuvo 3er lugar",
                cambios: [
                    { tipo: 'premios', fila: 'Daniel', columna: '3er lugar', valor: '✓' }
                ]
            },
            {
                descripcion: "De la pista 4: Beatriz llevaba vestido rojo",
                cambios: [
                    { tipo: 'colores', fila: 'Beatriz', columna: 'rojo', valor: '✓' }
                ]
            },
            {
                descripcion: "De la pista 5: La mujer del vestido verde obtuvo 1er lugar. Como Daniel obtuvo 3er lugar y César 2do lugar, debe ser Adrián o Benito quien obtuvo 1er lugar",
                cambios: [
                    { tipo: 'colores', fila: 'Ana', columna: 'verde', valor: '?' },
                    { tipo: 'colores', fila: 'Carmen', columna: 'verde', valor: '?' },
                    { tipo: 'colores', fila: 'Diana', columna: 'verde', valor: '?' }
                ]
            },
            {
                descripcion: "De la pista 2: Adrián bailó con la mujer del vestido azul. De la pista 6: Ana no bailó con César",
                cambios: [
                    { tipo: 'parejas', fila: 'César', columna: 'Ana', valor: '✗' },
                    { tipo: 'parejas', fila: 'Adrián', columna: 'Ana', valor: '?' },
                    { tipo: 'parejas', fila: 'Adrián', columna: 'Beatriz', valor: '?' },
                    { tipo: 'parejas', fila: 'Adrián', columna: 'Carmen', valor: '?' },
                    { tipo: 'parejas', fila: 'Adrián', columna: 'Diana', valor: '?' }
                ]
            },
            {
                descripcion: "De la pista 7: Carmen no llevaba vestido amarillo. Como Beatriz lleva rojo, Carmen debe llevar azul o verde",
                cambios: [
                    { tipo: 'colores', fila: 'Carmen', columna: 'amarillo', valor: '✗' }
                ]
            },
            {
                descripcion: "Deducción: Si la mujer del vestido verde obtuvo 1er lugar y César obtuvo 2do lugar, Daniel 3er lugar, entonces Adrián o Benito obtuvo 1er lugar. Como Adrián bailó con la del vestido azul, no puede ser la del verde. Por tanto, Benito bailó con la del vestido verde y obtuvo 1er lugar. Esto significa que Adrián obtuvo 4to lugar",
                cambios: [
                    { tipo: 'premios', fila: 'Adrián', columna: '4to lugar', valor: '✓' },
                    { tipo: 'premios', fila: 'Benito', columna: '1er lugar', valor: '✓' }
                ]
            },
            {
                descripcion: "Completando las deducciones: Como Benito obtuvo 1er lugar con la del vestido verde, y Carmen no lleva amarillo, Carmen lleva verde. Adrián baila con la del azul, que no puede ser Carmen (verde) ni Beatriz (rojo), debe ser Diana. Ana queda con César y lleva amarillo",
                cambios: [
                    { tipo: 'parejas', fila: 'Benito', columna: 'Carmen', valor: '✓' },
                    { tipo: 'parejas', fila: 'Adrián', columna: 'Diana', valor: '✓' },
                    { tipo: 'parejas', fila: 'César', columna: 'Ana', valor: '✓' },
                    { tipo: 'parejas', fila: 'Daniel', columna: 'Beatriz', valor: '✓' },
                    { tipo: 'colores', fila: 'Carmen', columna: 'verde', valor: '✓' },
                    { tipo: 'colores', fila: 'Diana', columna: 'azul', valor: '✓' },
                    { tipo: 'colores', fila: 'Ana', columna: 'amarillo', valor: '✓' }
                ]
            }
        ];
    }

    createMatrix(rows, cols) {
        const matrix = {};
        rows.forEach(row => {
            matrix[row] = {};
            cols.forEach(col => {
                matrix[row][col] = '';
            });
        });
        return matrix;
    }

    getHTML() {
        return `
            <div class="problema-logico-container">
                <div class="problema-header">
                    <h2><i class="fas fa-users"></i> Problema Lógico Cuatro: Concurso de Baile</h2>
                    <p class="problema-descripcion">
                        En un concurso de baile participaron 4 parejas. Los hombres son: Adrián, Benito, César y Daniel. 
                        Las mujeres son: Ana, Beatriz, Carmen y Diana. Los vestidos de las mujeres son de colores: 
                        azul, rojo, verde y amarillo. Los premios fueron: 1er lugar, 2do lugar, 3er lugar y 4to lugar.
                    </p>
                </div>

                <div class="pistas-container">
                    <h3><i class="fas fa-lightbulb"></i> Pistas</h3>
                    <div class="pistas-grid">
                        ${this.pistas.map((pista, index) => 
                            `<div class="pista-item ${this.currentStep > index ? 'pista-usada' : ''}">${pista}</div>`
                        ).join('')}
                    </div>
                </div>

                <div class="matrices-container">
                    <div class="matriz-tabs">
                        <button class="tab-btn active" onclick="problemaLogico4.showMatrix('parejas')">
                            <i class="fas fa-heart"></i> Parejas
                        </button>
                        <button class="tab-btn" onclick="problemaLogico4.showMatrix('premios')">
                            <i class="fas fa-trophy"></i> Premios
                        </button>
                        <button class="tab-btn" onclick="problemaLogico4.showMatrix('colores')">
                            <i class="fas fa-palette"></i> Colores
                        </button>
                    </div>

                    <div class="matriz-content">
                        <div id="matriz-parejas" class="matriz-panel active">
                            <h4>Matriz de Parejas</h4>
                            ${this.renderMatrix('parejas', this.hombres, this.mujeres)}
                        </div>
                        <div id="matriz-premios" class="matriz-panel">
                            <h4>Matriz de Premios</h4>
                            ${this.renderMatrix('premios', this.hombres, this.premios)}
                        </div>
                        <div id="matriz-colores" class="matriz-panel">
                            <h4>Matriz de Colores de Vestidos</h4>
                            ${this.renderMatrix('colores', this.mujeres, this.coloresMujeres)}
                        </div>
                    </div>
                </div>

                <div class="controles-container">
                    <div class="paso-info">
                        <h4>Paso ${this.currentStep + 1} de ${this.maxSteps}</h4>
                        <p id="paso-descripcion">${this.currentStep < this.pasos.length ? this.pasos[this.currentStep].descripcion : 'Problema resuelto'}</p>
                    </div>
                    <div class="controles-botones">
                        <button id="btn-anterior" onclick="problemaLogico4.previousStep()" 
                                ${this.currentStep === 0 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-left"></i> Anterior
                        </button>
                        <button id="btn-siguiente" onclick="problemaLogico4.nextStep()" 
                                ${this.currentStep >= this.maxSteps ? 'disabled' : ''}>
                            Siguiente <i class="fas fa-arrow-right"></i>
                        </button>
                        <button id="btn-reiniciar" onclick="problemaLogico4.restart()">
                            <i class="fas fa-refresh"></i> Reiniciar
                        </button>
                    </div>
                </div>

                <div class="solucion-container" ${this.currentStep < this.maxSteps ? 'style="display: none;"' : ''}>
                    <h3><i class="fas fa-check-circle"></i> Solución Final</h3>
                    <div class="solucion-grid">
                        <div class="solucion-item">
                            <h4>Parejas de Baile</h4>
                            <ul>
                                ${Object.entries(this.solucionCorrecta.parejas).map(([hombre, mujer]) => 
                                    `<li><strong>${hombre}</strong> bailó con <strong>${mujer}</strong></li>`
                                ).join('')}
                            </ul>
                        </div>
                        <div class="solucion-item">
                            <h4>Premios Obtenidos</h4>
                            <ul>
                                ${Object.entries(this.solucionCorrecta.premios).map(([hombre, premio]) => 
                                    `<li><strong>${hombre}</strong> obtuvo <strong>${premio}</strong></li>`
                                ).join('')}
                            </ul>
                        </div>
                        <div class="solucion-item">
                            <h4>Colores de Vestidos</h4>
                            <ul>
                                ${Object.entries(this.solucionCorrecta.colores).map(([mujer, color]) => 
                                    `<li><strong>${mujer}</strong> llevaba vestido <strong>${color}</strong></li>`
                                ).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderMatrix(tipo, rows, cols) {
        return `
            <div class="matriz-table">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            ${cols.map(col => `<th>${col}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>
                                <td class="row-header">${row}</td>
                                ${cols.map(col => `
                                    <td class="celda-matriz" data-tipo="${tipo}" data-fila="${row}" data-columna="${col}">
                                        ${this.matrices[tipo][row][col]}
                                    </td>
                                `).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    showMatrix(tipo) {
        // Ocultar todas las matrices
        document.querySelectorAll('.matriz-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Remover clase active de todos los tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Mostrar la matriz seleccionada
        document.getElementById(`matriz-${tipo}`).classList.add('active');
        
        // Activar el tab correspondiente
        event.target.classList.add('active');
    }

    nextStep() {
        if (this.currentStep < this.maxSteps) {
            if (this.currentStep < this.pasos.length) {
                const paso = this.pasos[this.currentStep];
                this.aplicarCambios(paso.cambios);
            }
            
            this.currentStep++;
            this.updateUI();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.recalcularMatrices();
            this.updateUI();
        }
    }

    aplicarCambios(cambios) {
        cambios.forEach(cambio => {
            const { tipo, fila, columna, valor } = cambio;
            this.matrices[tipo][fila][columna] = valor;
            
            // Actualizar la celda en el DOM
            const celda = document.querySelector(`[data-tipo="${tipo}"][data-fila="${fila}"][data-columna="${columna}"]`);
            if (celda) {
                celda.textContent = valor;
                if (valor === '✓') {
                    celda.classList.add('correcto');
                } else if (valor === '✗') {
                    celda.classList.add('incorrecto');
                } else if (valor === '?') {
                    celda.classList.add('posible');
                }
            }
        });
    }

    recalcularMatrices() {
        // Reinicializar matrices
        this.matrices = {
            parejas: this.createMatrix(this.hombres, this.mujeres),
            premios: this.createMatrix(this.hombres, this.premios),
            colores: this.createMatrix(this.mujeres, this.coloresMujeres)
        };

        // Aplicar pasos hasta el paso actual
        for (let i = 0; i < this.currentStep; i++) {
            if (i < this.pasos.length) {
                this.aplicarCambios(this.pasos[i].cambios);
            }
        }

        // Actualizar todas las matrices en el DOM
        this.updateMatricesDisplay();
    }

    updateMatricesDisplay() {
        ['parejas', 'premios', 'colores'].forEach(tipo => {
            const rows = tipo === 'colores' ? this.mujeres : this.hombres;
            const cols = tipo === 'parejas' ? this.mujeres : 
                        tipo === 'premios' ? this.premios : this.coloresMujeres;
            
            rows.forEach(row => {
                cols.forEach(col => {
                    const valor = this.matrices[tipo][row][col];
                    const celda = document.querySelector(`[data-tipo="${tipo}"][data-fila="${row}"][data-columna="${col}"]`);
                    if (celda) {
                        celda.textContent = valor;
                        celda.className = 'celda-matriz';
                        if (valor === '✓') {
                            celda.classList.add('correcto');
                        } else if (valor === '✗') {
                            celda.classList.add('incorrecto');
                        } else if (valor === '?') {
                            celda.classList.add('posible');
                        }
                    }
                });
            });
        });
    }

    updateUI() {
        // Actualizar descripción del paso
        const descripcionEl = document.getElementById('paso-descripcion');
        if (descripcionEl) {
            descripcionEl.textContent = this.currentStep < this.pasos.length ? 
                this.pasos[this.currentStep].descripcion : 'Problema resuelto';
        }

        // Actualizar botones
        const btnAnterior = document.getElementById('btn-anterior');
        const btnSiguiente = document.getElementById('btn-siguiente');
        
        if (btnAnterior) {
            btnAnterior.disabled = this.currentStep === 0;
        }
        
        if (btnSiguiente) {
            btnSiguiente.disabled = this.currentStep >= this.maxSteps;
        }

        // Mostrar/ocultar solución
        const solucionContainer = document.querySelector('.solucion-container');
        if (solucionContainer) {
            solucionContainer.style.display = this.currentStep >= this.maxSteps ? 'block' : 'none';
        }

        // Actualizar pistas usadas
        document.querySelectorAll('.pista-item').forEach((pista, index) => {
            if (this.currentStep > index) {
                pista.classList.add('pista-usada');
            } else {
                pista.classList.remove('pista-usada');
            }
        });

        // Actualizar número de paso
        const pasoInfo = document.querySelector('.paso-info h4');
        if (pasoInfo) {
            pasoInfo.textContent = `Paso ${this.currentStep + 1} de ${this.maxSteps}`;
        }
    }

    restart() {
        this.currentStep = 0;
        this.recalcularMatrices();
        this.updateUI();
    }
}

// Instancia global
let problemaLogico4;

// Función para cargar el problema lógico 4
function loadProblemaLogico4() {
    problemaLogico4 = new ProblemaLogico4();
    const content = document.getElementById('tool-content');
    if (content) {
        content.innerHTML = problemaLogico4.getHTML();
    }
}

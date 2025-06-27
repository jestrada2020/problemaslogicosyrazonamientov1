// --- PROBLEMA LÓGICO 14: RESTAURANTES Y PREFERENCIAS ---

class ProblemaLogico14 {
    constructor() {
        this.currentStep = 0;
        this.maxSteps = 7;
        this.currentMatrixTab = 'personas';
        
        // Datos del problema
        this.personas = ['Ana', 'Ben', 'Carmen', 'David'];
        this.restaurantes = ['Italiano', 'Chino', 'Mexicano', 'Francés'];
        this.comidas = ['Pizza', 'Arroz', 'Tacos', 'Quiche'];
        this.bebidas = ['Vino', 'Té', 'Cerveza', 'Agua'];
        
        // Matrices de relaciones
        this.matrices = {
            personas: this.createPersonasRestaurantesMatrix(),
            comidas: this.createPersonasComidasMatrix(),
            bebidas: this.createPersonasBebidasMatrix(),
            relaciones: this.createRelacionesMatrix()
        };
        
        // Pistas del problema
        this.pistas = [
            "Ana no va al restaurante Italiano, y no bebe Vino.",
            "Ben prefiere el restaurante Chino, pero no come Pizza.",
            "Carmen no come Tacos y no va al restaurante Mexicano.",
            "David bebe Agua y come Quiche.",
            "La persona que va al Italiano come Pizza y bebe Vino.", 
            "La persona que come Arroz va al restaurante Chino.",
            "Quien bebe Cerveza come Tacos y va al Mexicano."
        ];
        
        // Pasos de resolución
        this.pasos = [
            {
                titulo: "Análisis inicial",
                descripcion: "Identificamos 4 personas, 4 restaurantes, 4 comidas y 4 bebidas. Cada persona tiene exactamente una preferencia de cada categoría."
            },
            {
                titulo: "Aplicamos pista 2",
                descripcion: "Ben prefiere el restaurante Chino, pero no come Pizza. Esto nos da información directa sobre Ben."
            },
            {
                titulo: "Aplicamos pista 6",
                descripcion: "La persona que come Arroz va al restaurante Chino. Como Ben va al Chino, Ben debe comer Arroz."
            },
            {
                titulo: "Aplicamos pista 4",
                descripcion: "David bebe Agua y come Quiche. Esto determina las preferencias de David parcialmente."
            },
            {
                titulo: "Aplicamos pista 5",
                descripcion: "La persona que va al Italiano come Pizza y bebe Vino. Como Ana no va al Italiano (pista 1), debe ser Carmen."
            },
            {
                titulo: "Aplicamos pista 7",
                descripcion: "Quien bebe Cerveza come Tacos y va al Mexicano. Como Carmen no come Tacos (pista 3), debe ser Ana."
            },
            {
                titulo: "Completamos las asignaciones",
                descripcion: "Por eliminación: David va al Francés, y Ben bebe Té. Completamos todas las matrices con las asignaciones finales."
            }
        ];
        
        // Inicializar el display
        setTimeout(() => {
            this.renderMatrices();
            this.updateStepInfo();
        }, 100);
    }
    
    setupEventListeners() {
        const container = document.getElementById('problema-logico-14');
        if (!container) return;
        
        // Botones de control
        const btnReiniciar = container.querySelector('.btn-reiniciar');
        const btnSiguiente = container.querySelector('.btn-siguiente');
        const btnResolver = container.querySelector('.btn-resolver');
        
        if (btnReiniciar) btnReiniciar.addEventListener('click', () => this.reiniciar());
        if (btnSiguiente) btnSiguiente.addEventListener('click', () => this.siguientePaso());
        if (btnResolver) btnResolver.addEventListener('click', () => this.resolverCompleto());
        
        // Botones de pestañas de matrices (actualizados para la nueva clase)
        container.querySelectorAll('.tab-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab || e.target.closest('.tab-button').dataset.tab;
                if (tab) this.showMatrixTab(tab);
            });
        });
    }
    
    createPersonasRestaurantesMatrix() {
        const headers = ['Persona/Restaurante', ...this.restaurantes];
        const rows = [];
        
        this.personas.forEach(persona => {
            const row = [persona];
            this.restaurantes.forEach(() => row.push(''));
            rows.push(row);
        });
        
        return { headers, rows };
    }
    
    createPersonasComidasMatrix() {
        const headers = ['Persona/Comida', ...this.comidas];
        const rows = [];
        
        this.personas.forEach(persona => {
            const row = [persona];
            this.comidas.forEach(() => row.push(''));
            rows.push(row);
        });
        
        return { headers, rows };
    }
    
    createPersonasBebidasMatrix() {
        const headers = ['Persona/Bebida', ...this.bebidas];
        const rows = [];
        
        this.personas.forEach(persona => {
            const row = [persona];
            this.bebidas.forEach(() => row.push(''));
            rows.push(row);
        });
        
        return { headers, rows };
    }
    
    createRelacionesMatrix() {
        const headers = ['Restaurante', 'Comida', 'Bebida', 'Persona'];
        const rows = [];
        
        this.restaurantes.forEach(restaurante => {
            rows.push([restaurante, '', '', '']);
        });
        
        return { headers, rows };
    }
    
    renderMatrices() {
        const container = document.getElementById('problema-logico-14');
        if (!container) return;
        
        const matricesContent = {
            'personas': this.renderMatrix(this.matrices.personas, 'personas'),
            'comidas': this.renderMatrix(this.matrices.comidas, 'comidas'),
            'bebidas': this.renderMatrix(this.matrices.bebidas, 'bebidas'),
            'relaciones': this.renderMatrix(this.matrices.relaciones, 'relaciones')
        };
        
        Object.keys(matricesContent).forEach(tabId => {
            const contentDiv = container.querySelector(`#matriz-${tabId}-14`);
            if (contentDiv) {
                contentDiv.innerHTML = matricesContent[tabId];
            }
        });
    }
    
    renderMatrix(matrix, matrixId) {
        let html = '<table class="matriz-logica">';
        
        // Headers
        html += '<thead><tr>';
        matrix.headers.forEach(header => {
            html += `<th>${header}</th>`;
        });
        html += '</tr></thead>';
        
        // Rows
        html += '<tbody>';
        matrix.rows.forEach((row, rowIndex) => {
            html += '<tr>';
            row.forEach((cell, colIndex) => {
                if (colIndex === 0) {
                    html += `<th>${cell}</th>`;
                } else {
                    const cellValue = cell === '•' ? '•' : cell === 'X' ? 'X' : cell;
                    const cellClass = cell === '•' ? 'verdadero' : cell === 'X' ? 'falso' : '';
                    html += `<td class="${cellClass}" data-row="${rowIndex}" data-col="${colIndex}" data-matrix="${matrixId}" data-valor="${cellValue}">${cellValue}</td>`;
                }
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        
        return html;
    }
    
    showMatrixTab(tabId) {
        const container = document.getElementById('problema-logico-14');
        if (!container) return;
        
        // Actualizar botones (usando nueva clase)
        container.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = container.querySelector(`[data-tab="${tabId}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        // Mostrar/ocultar contenido (usando nueva clase)
        container.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const activeContent = container.querySelector(`#matriz-${tabId}-14`);
        if (activeContent) activeContent.classList.add('active');
        
        this.currentMatrixTab = tabId;
    }
    
    siguientePaso() {
        if (this.currentStep >= this.maxSteps) return;
        
        this.currentStep++;
        this.aplicarPaso(this.currentStep);
        this.updateStepInfo();
    }
    
    aplicarPaso(step) {
        switch(step) {
            case 1:
                // Análisis inicial - no se marca nada aún
                break;
            case 2:
                // Ben va al Chino
                this.marcarCelda('personas', 1, 2, '•'); // Ben - Chino
                this.marcarCelda('personas', 1, 1, 'X'); // Ben - Italiano
                this.marcarCelda('personas', 1, 3, 'X'); // Ben - Mexicano  
                this.marcarCelda('personas', 1, 4, 'X'); // Ben - Francés
                break;
            case 3:
                // Ben come Arroz (porque va al Chino)
                this.marcarCelda('comidas', 1, 2, '•'); // Ben - Arroz
                this.marcarCelda('comidas', 1, 1, 'X'); // Ben - Pizza
                this.marcarCelda('comidas', 1, 3, 'X'); // Ben - Tacos
                this.marcarCelda('comidas', 1, 4, 'X'); // Ben - Quiche
                break;
            case 4:
                // David bebe Agua y come Quiche
                this.marcarCelda('bebidas', 3, 4, '•'); // David - Agua
                this.marcarCelda('comidas', 3, 4, '•'); // David - Quiche
                // David debe ir al Francés por eliminación
                break;
            case 5:
                // Carmen va al Italiano (come Pizza y bebe Vino)
                this.marcarCelda('personas', 2, 1, '•'); // Carmen - Italiano
                this.marcarCelda('comidas', 2, 1, '•'); // Carmen - Pizza
                this.marcarCelda('bebidas', 2, 1, '•'); // Carmen - Vino
                break;
            case 6:
                // Ana va al Mexicano (bebe Cerveza y come Tacos)
                this.marcarCelda('personas', 0, 3, '•'); // Ana - Mexicano
                this.marcarCelda('comidas', 0, 3, '•'); // Ana - Tacos
                this.marcarCelda('bebidas', 0, 3, '•'); // Ana - Cerveza
                break;
            case 7:
                // David va al Francés (por eliminación)
                this.marcarCelda('personas', 3, 4, '•'); // David - Francés
                // Ben bebe Té (por eliminación)
                this.marcarCelda('bebidas', 1, 2, '•'); // Ben - Té
                this.completarMatrices();
                break;
        }
        
        this.renderMatrices();
    }
    
    marcarCelda(matriz, fila, columna, valor) {
        if (this.matrices[matriz] && this.matrices[matriz].rows[fila]) {
            this.matrices[matriz].rows[fila][columna] = valor;
        }
    }
    
    completarMatrices() {
        // Completar con X las celdas que deben ser falsas
        this.matrices.personas.rows.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (j > 0 && cell !== '•') {
                    this.matrices.personas.rows[i][j] = 'X';
                }
            });
        });
        
        this.matrices.comidas.rows.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (j > 0 && cell !== '•') {
                    this.matrices.comidas.rows[i][j] = 'X';
                }
            });
        });
        
        this.matrices.bebidas.rows.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (j > 0 && cell !== '•') {
                    this.matrices.bebidas.rows[i][j] = 'X';
                }
            });
        });
        
        // Completar matriz de relaciones
        this.matrices.relaciones.rows = [
            ['Italiano', 'Pizza', 'Vino', 'Carmen'],
            ['Chino', 'Arroz', 'Té', 'Ben'],
            ['Mexicano', 'Tacos', 'Cerveza', 'Ana'],
            ['Francés', 'Quiche', 'Agua', 'David']
        ];
    }
    
    resolverCompleto() {
        for (let i = 1; i <= this.maxSteps; i++) {
            this.aplicarPaso(i);
        }
        this.currentStep = this.maxSteps;
        this.updateStepInfo();
        this.mostrarSolucion();
    }
    
    reiniciar() {
        this.currentStep = 0;
        
        // Reiniciar matrices
        this.matrices = {
            personas: this.createPersonasRestaurantesMatrix(),
            comidas: this.createPersonasComidasMatrix(),
            bebidas: this.createPersonasBebidasMatrix(),
            relaciones: this.createRelacionesMatrix()
        };
        
        this.renderMatrices();
        this.updateStepInfo();
        this.ocultarSolucion();
    }
    
    updateStepInfo() {
        const container = document.getElementById('problema-logico-14');
        if (!container) return;
        
        const stepInfo = container.querySelector('.step-info');
        const btnSiguiente = container.querySelector('#btn-siguiente-14');
        const btnResolver = container.querySelector('#btn-resolver-14');
        
        if (stepInfo) {
            if (this.currentStep === 0) {
                stepInfo.innerHTML = `
                    <h4>Preparado para comenzar</h4>
                    <p>Haz clic en "Siguiente" para comenzar con el análisis paso a paso.</p>
                `;
            } else if (this.currentStep <= this.maxSteps) {
                const paso = this.pasos[this.currentStep - 1];
                stepInfo.innerHTML = `
                    <h4>Paso ${this.currentStep}: ${paso.titulo}</h4>
                    <p>${paso.descripcion}</p>
                `;
            }
        }
        
        if (btnSiguiente) {
            btnSiguiente.disabled = this.currentStep >= this.maxSteps;
        }
        
        if (btnResolver) {
            btnResolver.disabled = this.currentStep >= this.maxSteps;
        }
    }
    
    mostrarSolucion() {
        const container = document.getElementById('problema-logico-14');
        if (!container) return;
        
        const solucionDiv = container.querySelector('.solucion-final');
        if (solucionDiv) {
            solucionDiv.style.display = 'block';
            solucionDiv.innerHTML = `
                <h3><i class="fas fa-trophy"></i> Solución Final</h3>
                <div class="solucion-grid">
                    <div class="solucion-item">
                        <strong>Ana:</strong> Restaurante Mexicano, Tacos, Cerveza
                    </div>
                    <div class="solucion-item">
                        <strong>Ben:</strong> Restaurante Chino, Arroz, Té
                    </div>
                    <div class="solucion-item">
                        <strong>Carmen:</strong> Restaurante Italiano, Pizza, Vino
                    </div>
                    <div class="solucion-item">
                        <strong>David:</strong> Restaurante Francés, Quiche, Agua
                    </div>
                </div>
            `;
        }
    }
    
    ocultarSolucion() {
        const container = document.getElementById('problema-logico-14');
        if (!container) return;
        
        const solucionDiv = container.querySelector('.solucion-final');
        if (solucionDiv) {
            solucionDiv.style.display = 'none';
        }
    }
}

// Variable global para la instancia
let problemaLogico14Instance = null;

function loadProblemaLogico14() {
    const toolContent = document.getElementById('tool-content');
    toolContent.innerHTML = `
        <div id="problema-logico-14" class="problema-logico-14">
            <h1 class="main-title">Restaurantes y Preferencias - Problema Lógico 14</h1>
            
            <div class="layout-container">
                <div class="sidebar-panel">
                    <h3><i class="fas fa-tools"></i> Controles</h3>
                    <div class="control-buttons">
                        <button class="btn-control btn-reiniciar" onclick="problemaLogico14Instance.reiniciar()">
                            <i class="fas fa-refresh"></i> Reiniciar
                        </button>
                        <button id="btn-siguiente-14" class="btn-control btn-siguiente" onclick="problemaLogico14Instance.siguientePaso()">
                            <i class="fas fa-arrow-right"></i> Siguiente
                        </button>
                        <button id="btn-resolver-14" class="btn-control btn-resolver" onclick="problemaLogico14Instance.resolverCompleto()">
                            <i class="fas fa-magic"></i> Resolver
                        </button>
                    </div>
                    
                    <div class="problema-info">
                        <h4><i class="fas fa-lightbulb"></i> Pistas</h4>
                        <ul>
                            <li>1. Ana no va al restaurante Italiano, y no bebe Vino.</li>
                            <li>2. Ben prefiere el restaurante Chino, pero no come Pizza.</li>
                            <li>3. Carmen no come Tacos y no va al restaurante Mexicano.</li>
                            <li>5. La persona que va al Italiano come Pizza y bebe Vino.</li>
                            <li>6. La persona que come Arroz va al restaurante Chino.</li>
                            <li>7. Quien bebe Cerveza come Tacos y va al Mexicano.</li>
                        </ul>
                    </div>
                    
                    <div class="problema-info">
                        <h4>Preparado para comenzar</h4>
                        <p>Haz clic en "Siguiente" para comenzar con el análisis paso a paso.</p>
                    </div>
                </div>
                
                <div class="main-content">
                    <div class="paso-descripcion">
                        <div id="pl14-descripcion-paso">
                            <strong>Enunciado del Problema:</strong><br>
                            Cuatro amigos (Ana, Ben, Carmen y David) van a diferentes restaurantes (Italiano, Chino, Mexicano, Francés) donde cada uno pide una comida diferente (Pizza, Arroz, Tacos, Quiche) y una bebida diferente (Vino, Té, Cerveza, Agua). Basándote en las pistas proporcionadas, determina qué restaurante visitó cada persona, qué comió y qué bebió.
                        </div>
                    </div>
                    
                    <div class="matrices-tabs">
                        <div class="tab-buttons">
                            <button class="tab-button active" data-tab="personas">
                                <i class="fas fa-users"></i> Personas-Restaurantes
                            </button>
                            <button class="tab-button" data-tab="comidas">
                                <i class="fas fa-utensils"></i> Personas-Comidas
                            </button>
                            <button class="tab-button" data-tab="bebidas">
                                <i class="fas fa-glass-martini"></i> Personas-Bebidas
                            </button>
                            <button class="tab-button" data-tab="relaciones">
                                <i class="fas fa-link"></i> Relaciones Finales
                            </button>
                        </div>
                        
                        <div class="matriz-container">
                            <div id="matriz-personas-14" class="tab-content active"></div>
                            <div id="matriz-comidas-14" class="tab-content"></div>
                            <div id="matriz-bebidas-14" class="tab-content"></div>
                            <div id="matriz-relaciones-14" class="tab-content"></div>
                        </div>
                    </div>
                    
                    <div class="solucion-final" style="display: none;">
                        <!-- La solución se mostrará aquí -->
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Crear instancia y configurar
    problemaLogico14Instance = new ProblemaLogico14();
    problemaLogico14Instance.setupEventListeners();
    
    // Actualizar menú
    document.querySelectorAll('#sidebar button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const menuButton = document.querySelector('button[onclick="app.loadTool(\'problemaLogico14\')"]');
    if (menuButton) {
        menuButton.classList.add('active');
    }
}

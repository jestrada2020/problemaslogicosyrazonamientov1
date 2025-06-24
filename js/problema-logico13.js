// --- PROBLEMA LÓGICO 13: EL APRENDIZAJE DE UN OFICIO ---

class ProblemaLogico13 {
    constructor() {
        this.currentStep = 0;
        this.maxSteps = 8;
        this.currentMatrixTab = 'personas';
        
        // Datos del problema
        this.padres = ['García', 'Vidal', 'Benítez'];
        this.hijos = ['Pepe', 'Paco', 'Santi'];
        this.profesiones = ['Carpintero', 'Mecánico', 'Electricista'];
        this.nombresP = ['Pedro', 'Carlos', 'Antonio'];
        this.meses = ['Julio', 'Agosto'];
        
        // Matrices de relaciones
        this.matrices = {
            personas: this.createPersonasMatrix(),
            profesiones: this.createProfesionesMatrix(),
            aprendizajesJulio: this.createAprendizajesMatrix('Julio'),
            aprendizajesAgosto: this.createAprendizajesMatrix('Agosto')
        };
        
        // Pistas del problema
        this.pistas = [
            "Pepe trabajó con el electricista en julio y con Carlos en agosto.",
            "Paco, cuyo apellido no es Benítez, no trabajó con el mecánico durante el verano.",
            "El señor Vidal no es carpintero ni su nombre de pila es Carlos.",
            "El chico llamado Santi no trabajó con Antonio en agosto."
        ];
        
        // Pasos de resolución
        this.pasos = [
            {
                titulo: "Análisis inicial",
                descripcion: "Leemos el enunciado y identificamos los elementos: 3 padres especialistas, 3 hijos, 3 profesiones y los aprendizajes en julio y agosto."
            },
            {
                titulo: "Aplicamos pista 2",
                descripcion: "Paco no trabajó con el mecánico. Esto significa que el mecánico debe ser su padre (ya que cada hijo aprende con dos especialistas diferentes a su padre)."
            },
            {
                titulo: "Aplicamos pista 1 - Parte 1",
                descripcion: "Pepe trabajó con el electricista en julio. Como no es su padre, el padre de Pepe debe ser el carpintero."
            },
            {
                titulo: "Aplicamos pista 1 - Parte 2",
                descripcion: "Pepe trabajó con Carlos en agosto. Carlos debe ser el mecánico (padre de Paco)."
            },
            {
                titulo: "Aplicamos pista 3",
                descripcion: "El señor Vidal no es carpintero ni se llama Carlos. Por tanto, Vidal debe ser el electricista (Antonio Vidal)."
            },
            {
                titulo: "Completamos relaciones familiares",
                descripcion: "Santi debe ser hijo de Vidal (el electricista). Corregimos: Paco es García, no Benítez."
            },
            {
                titulo: "Determinamos aprendizajes de julio",
                descripcion: "Pepe con electricista (Antonio Vidal), Paco con carpintero (Pedro Benítez), Santi con mecánico (Carlos García)."
            },
            {
                titulo: "Determinamos aprendizajes de agosto",
                descripcion: "Pepe con mecánico (Carlos García), Paco con electricista (Antonio Vidal), Santi con carpintero (Pedro Benítez)."
            }
        ];
        
        // Inicializar el display
        setTimeout(() => {
            this.renderMatrices();
            this.updateStepInfo();
        }, 100);
    }
    
    setupEventListeners() {
        const container = document.getElementById('problema-logico-13');
        if (!container) return;
        
        // Botones de control
        const btnReiniciar = container.querySelector('.btn-reiniciar');
        const btnSiguiente = container.querySelector('.btn-siguiente');
        const btnResolver = container.querySelector('.btn-resolver');
        
        if (btnReiniciar) btnReiniciar.addEventListener('click', () => this.reiniciar());
        if (btnSiguiente) btnSiguiente.addEventListener('click', () => this.siguientePaso());
        if (btnResolver) btnResolver.addEventListener('click', () => this.resolverCompleto());
        
        // Botones de pestañas de matrices
        container.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                if (tab) this.showMatrixTab(tab);
            });
        });
    }
    
    createPersonasMatrix() {
        const headers = ['Hijo/Padre', ...this.padres];
        const rows = [];
        
        for (let hijo of this.hijos) {
            const row = [hijo];
            for (let padre of this.padres) {
                row.push('');
            }
            rows.push(row);
        }
        
        return { headers, rows };
    }
    
    createProfesionesMatrix() {
        const headers = ['Padre/Profesión', ...this.profesiones];
        const rows = [];
        
        for (let padre of this.padres) {
            const row = [padre];
            for (let prof of this.profesiones) {
                row.push('');
            }
            rows.push(row);
        }
        
        return { headers, rows };
    }
    
    createAprendizajesMatrix(mes) {
        const headers = ['Hijo/Especialista', ...this.padres];
        const rows = [];
        
        for (let hijo of this.hijos) {
            const row = [hijo];
            for (let i = 0; i < this.padres.length; i++) {
                row.push('');
            }
            rows.push(row);
        }
        
        return { headers, rows };
    }
    
    renderMatrices() {
        const container = document.getElementById('problema-logico-13');
        if (!container) return;
        
        const matricesContent = {
            'personas': this.renderMatrix(this.matrices.personas, 'personas'),
            'profesiones': this.renderMatrix(this.matrices.profesiones, 'profesiones'),
            'aprendizajesJulio': this.renderMatrix(this.matrices.aprendizajesJulio, 'aprendizajesJulio'),
            'aprendizajesAgosto': this.renderMatrix(this.matrices.aprendizajesAgosto, 'aprendizajesAgosto')
        };
        
        Object.keys(matricesContent).forEach(tabId => {
            const contentDiv = container.querySelector(`#matriz-${tabId}-13`);
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
                    const cellValue = cell === '•' ? '•' : cell === 'X' ? 'X' : '';
                    const cellClass = cell === '•' ? 'verdadero' : cell === 'X' ? 'falso' : '';
                    html += `<td class="${cellClass}" data-row="${rowIndex}" data-col="${colIndex}" data-matrix="${matrixId}" data-valor="${cellValue}">${cellValue}</td>`;
                }
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        
        return html;
    }
    
    changeTab(tabId) {
        const container = document.getElementById('problema-logico-13');
        if (!container) return;
        
        // Actualizar botones
        container.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Encontrar el botón correcto y activarlo
        const buttons = container.querySelectorAll('.tab-btn');
        buttons.forEach(btn => {
            if (btn.textContent.toLowerCase().includes(tabId.toLowerCase()) ||
                (tabId === 'personas' && btn.textContent.includes('Personas')) ||
                (tabId === 'profesiones' && btn.textContent.includes('Profesiones')) ||
                (tabId === 'aprendizajesJulio' && btn.textContent.includes('Julio')) ||
                (tabId === 'aprendizajesAgosto' && btn.textContent.includes('Agosto'))) {
                btn.classList.add('active');
            }
        });
        
        // Mostrar contenido
        container.querySelectorAll('.matriz-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const targetContent = container.querySelector(`#matriz-${tabId}-13`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
        
        this.currentMatrixTab = tabId;
    }
    
    updateStepInfo() {
        const container = document.getElementById('problema-logico-13');
        if (!container) return;
        
        const stepTitle = container.querySelector('.paso-info h2');
        const stepDesc = container.querySelector('.descripcion-paso');
        const btnSiguiente = container.querySelector('.btn-siguiente');
        
        if (stepTitle && stepDesc) {
            stepTitle.textContent = `Paso ${this.currentStep + 1}: ${this.pasos[this.currentStep].titulo}`;
            stepDesc.textContent = this.pasos[this.currentStep].descripcion;
        }
        
        if (btnSiguiente) {
            btnSiguiente.disabled = this.currentStep >= this.maxSteps - 1;
        }
    }
    
    siguientePaso() {
        if (this.currentStep < this.maxSteps - 1) {
            this.currentStep++;
            this.aplicarPaso();
            this.updateStepInfo();
        }
    }
    
    aplicarPaso() {
        switch (this.currentStep) {
            case 1: // Deducir que Paco es hijo del mecánico (pista 2)
                // García = 0, Vidal = 1, Benítez = 2
                // Pepe = 0, Paco = 1, Santi = 2
                // Carpintero = 0, Mecánico = 1, Electricista = 2
                this.setMatrixValue('profesiones', 0, 1, '•'); // García - Mecánico
                this.setMatrixValue('personas', 1, 0, '•'); // Paco - García
                break;
                
            case 2: // Aplicar pista 1 parte 1: Pepe trabajó con electricista en julio
                this.setMatrixValue('profesiones', 1, 2, '•'); // Vidal - Electricista
                this.setMatrixValue('personas', 0, 2, '•'); // Pepe - Benítez (debe ser carpintero)
                this.setMatrixValue('profesiones', 2, 0, '•'); // Benítez - Carpintero
                break;
                
            case 3: // Completar exclusiones
                this.setMatrixValue('profesiones', 0, 0, 'X'); // García - Carpintero (no)
                this.setMatrixValue('profesiones', 0, 2, 'X'); // García - Electricista (no)
                this.setMatrixValue('profesiones', 1, 0, 'X'); // Vidal - Carpintero (no)
                this.setMatrixValue('profesiones', 1, 1, 'X'); // Vidal - Mecánico (no)
                this.setMatrixValue('profesiones', 2, 1, 'X'); // Benítez - Mecánico (no)
                this.setMatrixValue('profesiones', 2, 2, 'X'); // Benítez - Electricista (no)
                break;
                
            case 4: // Completar relaciones padre-hijo
                this.setMatrixValue('personas', 0, 0, 'X'); // Pepe - García (no)
                this.setMatrixValue('personas', 0, 1, 'X'); // Pepe - Vidal (no)
                this.setMatrixValue('personas', 1, 1, 'X'); // Paco - Vidal (no)
                this.setMatrixValue('personas', 1, 2, 'X'); // Paco - Benítez (no)
                this.setMatrixValue('personas', 2, 0, 'X'); // Santi - García (no)
                this.setMatrixValue('personas', 2, 1, '•'); // Santi - Vidal
                this.setMatrixValue('personas', 2, 2, 'X'); // Santi - Benítez (no)
                break;
                
            case 5: // Aprendizajes de julio
                // Pepe con electricista (Vidal), Paco con carpintero (Benítez), Santi con mecánico (García)
                this.setMatrixValue('aprendizajesJulio', 0, 0, 'X'); // Pepe - García (no)
                this.setMatrixValue('aprendizajesJulio', 0, 1, '•'); // Pepe - Vidal (electricista)
                this.setMatrixValue('aprendizajesJulio', 0, 2, 'X'); // Pepe - Benítez (no)
                
                this.setMatrixValue('aprendizajesJulio', 1, 0, 'X'); // Paco - García (no)
                this.setMatrixValue('aprendizajesJulio', 1, 1, 'X'); // Paco - Vidal (no)
                this.setMatrixValue('aprendizajesJulio', 1, 2, '•'); // Paco - Benítez (carpintero)
                
                this.setMatrixValue('aprendizajesJulio', 2, 0, '•'); // Santi - García (mecánico)
                this.setMatrixValue('aprendizajesJulio', 2, 1, 'X'); // Santi - Vidal (no)
                this.setMatrixValue('aprendizajesJulio', 2, 2, 'X'); // Santi - Benítez (no)
                break;
                
            case 6: // Aprendizajes de agosto
                // Pepe con mecánico (García), Paco con electricista (Vidal), Santi con carpintero (Benítez)
                this.setMatrixValue('aprendizajesAgosto', 0, 0, '•'); // Pepe - García (mecánico)
                this.setMatrixValue('aprendizajesAgosto', 0, 1, 'X'); // Pepe - Vidal (no)
                this.setMatrixValue('aprendizajesAgosto', 0, 2, 'X'); // Pepe - Benítez (no)
                
                this.setMatrixValue('aprendizajesAgosto', 1, 0, 'X'); // Paco - García (no)
                this.setMatrixValue('aprendizajesAgosto', 1, 1, '•'); // Paco - Vidal (electricista)
                this.setMatrixValue('aprendizajesAgosto', 1, 2, 'X'); // Paco - Benítez (no)
                
                this.setMatrixValue('aprendizajesAgosto', 2, 0, 'X'); // Santi - García (no)
                this.setMatrixValue('aprendizajesAgosto', 2, 1, 'X'); // Santi - Vidal (no)
                this.setMatrixValue('aprendizajesAgosto', 2, 2, '•'); // Santi - Benítez (carpintero)
                break;
                
            case 7: // Mostrar solución
                this.mostrarSolucion();
                break;
        }
        
        this.renderMatrices();
    }
    
    setMatrixValue(matrixName, row, col, value) {
        if (this.matrices[matrixName] && this.matrices[matrixName].rows[row]) {
            this.matrices[matrixName].rows[row][col] = value;
        }
    }
    
    mostrarSolucion() {
        const container = document.getElementById('problema-logico-13');
        if (!container) return;
        
        const solucionHTML = `
            <div class="solucion-final-container">
                <h2>🎉 ¡Solución Encontrada!</h2>
                <div class="solucion-cards">
                    <div class="solucion-card">
                        <h4> Carlos García (Mecánico)</h4>
                        <p><strong>Hijo:</strong> Paco García</p>
                        <p><strong>Aprendices:</strong> Santi (Julio), Pepe (Agosto)</p>
                    </div>
                    <div class="solucion-card">
                        <h4>⚡ Antonio Vidal (Electricista)</h4>
                        <p><strong>Hijo:</strong> Santi Vidal</p>
                        <p><strong>Aprendices:</strong> Pepe (Julio), Paco (Agosto)</p>
                    </div>
                    <div class="solucion-card">
                        <h4>👨‍🔧 Pedro Benítez (Carpintero)</h4>
                        <p><strong>Hijo:</strong> Pepe Benítez</p>
                        <p><strong>Aprendices:</strong> Paco (Julio), Santi (Agosto)</p>
                    </div>
                </div>
            </div>
        `;
        
        const mainContent = container.querySelector('.problema-main');
        if (mainContent) {
            mainContent.insertAdjacentHTML('beforeend', solucionHTML);
        }
    }
    
    resolverCompleto() {
        this.currentStep = this.maxSteps - 1;
        
        // Aplicar todas las deducciones
        for (let step = 1; step <= this.maxSteps - 1; step++) {
            this.currentStep = step;
            this.aplicarPaso();
        }
        
        this.updateStepInfo();
    }
    
    reiniciar() {
        this.currentStep = 0;
        
        // Limpiar matrices
        Object.keys(this.matrices).forEach(matrixName => {
            const matrix = this.matrices[matrixName];
            for (let i = 0; i < matrix.rows.length; i++) {
                for (let j = 1; j < matrix.rows[i].length; j++) {
                    matrix.rows[i][j] = '';
                }
            }
        });
        
        // Remover solución si existe
        const container = document.getElementById('problema-logico-13');
        if (container) {
            const solucionContainer = container.querySelector('.solucion-final-container');
            if (solucionContainer) {
                solucionContainer.remove();
            }
        }
        
        this.renderMatrices();
        this.updateStepInfo();
    }
}

// Función para cargar el problema lógico 13 cuando se selecciona desde el menú
function loadProblemaLogico13() {
    const toolContent = document.getElementById('tool-content');
    toolContent.innerHTML = `
        <div id="problema-logico-13" class="problema-logico13-container">
            <h1>El Aprendizaje de un Oficio - Problema Lógico 13</h1>
            
            <div class="problema-layout">
                <div class="problema-sidebar">
                    <div class="control-panel">
                        <h3><i class="fas fa-tools"></i> Controles</h3>
                        <div class="control-buttons">
                            <button class="btn-control btn-reiniciar" onclick="problemaLogico13Instance.reiniciar()">
                                <i class="fas fa-refresh"></i> Reiniciar
                            </button>
                            <button id="btn-siguiente-13" class="btn-control btn-siguiente" onclick="problemaLogico13Instance.siguientePaso()">
                                <i class="fas fa-arrow-right"></i> Siguiente
                            </button>
                            <button id="btn-resolver-13" class="btn-control btn-resolver" onclick="problemaLogico13Instance.resolverCompleto()">
                                <i class="fas fa-check-double"></i> Resolver Todo
                            </button>
                        </div>
                    </div>
                    
                    <div class="enunciado-panel">
                        <h3>Enunciado</h3>
                        <p>El señor García y otros dos especialistas (Vidal y Benítez) trabajan en ramas diferentes (carpintero, mecánico, electricista). Cada uno tiene un hijo (Pepe, Paco, Santi) al que enseña su propio oficio, pero los chicos han expresado su deseo de aprender algo de los otros dos.</p>
                        <p>El año pasado, cada chico trabajó como aprendiz con uno de los otros dos hombres en julio y con el segundo en agosto.</p>
                    </div>
                    
                    <div class="pistas-panel">
                        <h3>Pistas</h3>
                        <ul>
                            <li><strong>P1:</strong> Pepe trabajó con el electricista en julio y con Carlos en agosto.</li>
                            <li><strong>P2:</strong> Paco, cuyo apellido no es Benítez, no trabajó con el mecánico durante el verano.</li>
                            <li><strong>P3:</strong> El señor Vidal no es carpintero ni su nombre de pila es Carlos.</li>
                            <li><strong>P4:</strong> El chico llamado Santi no trabajó con Antonio en agosto.</li>
                        </ul>
                        <p><em>Nota: Uno de los seis se llama Pedro.</em></p>
                    </div>
                </div>
                
                <div class="problema-main">
                    <div class="paso-info">
                        <h2 id="titulo-paso-13"></h2>
                        <div id="descripcion-paso-13" class="descripcion-paso"></div>
                    </div>
                    
                    <div class="matrices-container">
                        <div class="matriz-tab">
                            <div class="tab-buttons">
                                <button class="tab-btn active" onclick="problemaLogico13Instance.changeTab('personas')">Personas</button>
                                <button class="tab-btn" onclick="problemaLogico13Instance.changeTab('profesiones')">Profesiones</button>
                                <button class="tab-btn" onclick="problemaLogico13Instance.changeTab('aprendizajesJulio')">Aprendizajes Julio</button>
                                <button class="tab-btn" onclick="problemaLogico13Instance.changeTab('aprendizajesAgosto')">Aprendizajes Agosto</button>
                            </div>
                            <div class="tab-content">
                                <div id="matriz-personas-13" class="matriz-content active"></div>
                                <div id="matriz-profesiones-13" class="matriz-content"></div>
                                <div id="matriz-aprendizajesJulio-13" class="matriz-content"></div>
                                <div id="matriz-aprendizajesAgosto-13" class="matriz-content"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="solucion-final-13" class="solucion-final-container"></div>
                </div>
            </div>
        </div>
    `;
    
    // Crear la instancia del problema
    window.problemaLogico13Instance = new ProblemaLogico13();
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('problema-logico-13')) {
        new ProblemaLogico13();
    }
});

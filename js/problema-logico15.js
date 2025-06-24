// --- PROBLEMA LÓGICO 15: LOS NIÑOS DE LA VECINDAD ---

class ProblemaLogico15 {
    constructor() {
        this.currentStep = 0;
        this.maxSteps = 8;
        this.currentAssignmentTab = 'apellidos';
        
        // Datos del problema
        this.ninos = ['Toni', 'Luis', 'Lisa', 'Rita', 'Tina'];
        this.apellidos = ['Torres', 'Parga', 'Pla', 'Ribas'];
        this.edades = [3, 4, 5, 6, 7];
        
        // Asignaciones de los niños
        this.asignaciones = {
            'Toni': { apellido: '', edad: null },
            'Luis': { apellido: '', edad: null },
            'Lisa': { apellido: '', edad: null },
            'Rita': { apellido: '', edad: null },
            'Tina': { apellido: '', edad: null }
        };
        
        // Matrices de deducción
        this.matrices = {
            apellidos: this.createApellidosMatrix(),
            edades: this.createEdadesMatrix()
        };
        
        // Pistas del problema
        this.pistas = [
            "La señora Parga tiene dos hijos. La señora Ribas tiene una hija más joven que los hijos de la señora Parga.",
            "Tina es mayor que Luis y más joven que el niño(a) cuyo apellido es Pla.",
            "La niña apellidada Torres es dos años mayor que Lisa.",
            "Rita y Toni no son hermanos Parga, ni son hijos de la señora Ribas. Además, no son hermanos entre sí."
        ];
        
        // Pasos de resolución
        this.pasos = [
            {
                titulo: "Análisis inicial",
                descripcion: "Identificamos que hay 5 niños con edades 3-7 años. Dos hermanos Parga, una hija Ribas, y tres madres más con un hijo cada una."
            },
            {
                titulo: "Aplicamos pista 4",
                descripcion: "Rita y Toni no son Parga ni Ribas, y no son hermanos. Por tanto, Rita debe ser Torres y Toni debe ser Pla (o viceversa)."
            },
            {
                titulo: "Aplicamos pista 3",
                descripcion: "La niña Torres es dos años mayor que Lisa. Como Rita es mujer, Rita Torres tiene 2 años más que Lisa."
            },
            {
                titulo: "Deducimos que Toni es Pla",
                descripcion: "Si Rita es Torres, entonces Toni debe ser Pla (única opción restante para los no-Parga, no-Ribas)."
            },
            {
                titulo: "Aplicamos pista 1",
                descripcion: "Lisa debe ser Ribas (la hija más joven). Luis y Tina son los hermanos Parga."
            },
            {
                titulo: "Aplicamos pista 2 para las edades",
                descripcion: "Tina > Luis y Tina < Toni(Pla). Como Lisa es la más joven (3 años), Rita tiene 5 años."
            },
            {
                titulo: "Completamos las edades",
                descripcion: "Por la pista 2: Luis < Tina < Toni. Lisa=3, Rita=5. Entonces Luis=4, Tina=6, Toni=7."
            },
            {
                titulo: "Verificamos la solución",
                descripcion: "Comprobamos que todas las pistas se cumplen con la asignación final."
            }
        ];
        
        // Inicializar el display
        setTimeout(() => {
            this.renderAssignments();
            this.renderMatrices();
            this.updateStepInfo();
        }, 100);
    }
    
    setupEventListeners() {
        const container = document.getElementById('problema-logico-15');
        if (!container) return;
        
        // Botones de control
        const btnReiniciar = container.querySelector('.btn-reiniciar');
        const btnSiguiente = container.querySelector('.btn-siguiente');
        const btnResolver = container.querySelector('.btn-resolver');
        
        if (btnReiniciar) btnReiniciar.addEventListener('click', () => this.reiniciar());
        if (btnSiguiente) btnSiguiente.addEventListener('click', () => this.siguientePaso());
        if (btnResolver) btnResolver.addEventListener('click', () => this.resolverCompleto());
        
        // Botones de pestañas
        container.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                if (tab) this.showAssignmentTab(tab);
            });
        });
        
        // Event listeners para dropdowns de asignación
        this.setupAssignmentListeners();
    }
    
    setupAssignmentListeners() {
        const container = document.getElementById('problema-logico-15');
        if (!container) return;
        
        this.ninos.forEach(nino => {
            const apellidoSelect = container.querySelector(`#apellido-${nino}`);
            const edadSelect = container.querySelector(`#edad-${nino}`);
            
            if (apellidoSelect) {
                apellidoSelect.addEventListener('change', (e) => {
                    this.asignaciones[nino].apellido = e.target.value;
                    this.updateMatrices();
                });
            }
            
            if (edadSelect) {
                edadSelect.addEventListener('change', (e) => {
                    this.asignaciones[nino].edad = e.target.value ? parseInt(e.target.value) : null;
                    this.updateMatrices();
                });
            }
        });
    }
    
    createApellidosMatrix() {
        const headers = ['Niño/Apellido', ...this.apellidos];
        const rows = [];
        
        this.ninos.forEach(nino => {
            const row = [nino];
            this.apellidos.forEach(() => row.push(''));
            rows.push(row);
        });
        
        return { headers, rows };
    }
    
    createEdadesMatrix() {
        const headers = ['Niño/Edad', ...this.edades.map(e => e.toString())];
        const rows = [];
        
        this.ninos.forEach(nino => {
            const row = [nino];
            this.edades.forEach(() => row.push(''));
            rows.push(row);
        });
        
        return { headers, rows };
    }
    
    renderAssignments() {
        const container = document.getElementById('problema-logico-15');
        if (!container) return;
        
        const assignmentsContainer = container.querySelector('.assignments-container');
        if (!assignmentsContainer) return;
        
        let html = '<div class="assignments-grid">';
        
        this.ninos.forEach(nino => {
            const asignacion = this.asignaciones[nino];
            html += `
                <div class="assignment-card">
                    <h4>${nino}</h4>
                    <div class="assignment-fields">
                        <div class="field">
                            <label>Apellido:</label>
                            <select id="apellido-${nino}" class="form-select">
                                <option value="">---</option>
                                ${this.apellidos.map(apellido => 
                                    `<option value="${apellido}" ${asignacion.apellido === apellido ? 'selected' : ''}>${apellido}</option>`
                                ).join('')}
                            </select>
                        </div>
                        <div class="field">
                            <label>Edad:</label>
                            <select id="edad-${nino}" class="form-select">
                                <option value="">---</option>
                                ${this.edades.map(edad => 
                                    `<option value="${edad}" ${asignacion.edad === edad ? 'selected' : ''}>${edad}</option>`
                                ).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="assignment-result">
                        ${asignacion.apellido && asignacion.edad ? 
                            `<strong>${nino} ${asignacion.apellido}</strong><br><span class="edad">${asignacion.edad} años</span>` : 
                            '<span class="incomplete">Incompleto</span>'
                        }
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        assignmentsContainer.innerHTML = html;
        
        // Re-setup event listeners after updating HTML
        setTimeout(() => {
            this.setupAssignmentListeners();
        }, 100);
    }
    
    renderMatrices() {
        const container = document.getElementById('problema-logico-15');
        if (!container) return;
        
        const matricesContent = {
            'apellidos': this.renderMatrix(this.matrices.apellidos, 'apellidos'),
            'edades': this.renderMatrix(this.matrices.edades, 'edades')
        };
        
        Object.keys(matricesContent).forEach(tabId => {
            const contentDiv = container.querySelector(`#matriz-${tabId}-15`);
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
    
    updateMatrices() {
        // Actualizar matrices basándose en las asignaciones actuales
        this.matrices.apellidos.rows.forEach((row, rowIndex) => {
            const nino = this.ninos[rowIndex];
            const apellidoAsignado = this.asignaciones[nino].apellido;
            
            row.forEach((cell, colIndex) => {
                if (colIndex > 0) {
                    const apellido = this.apellidos[colIndex - 1];
                    if (apellidoAsignado === apellido) {
                        row[colIndex] = '•';
                    } else if (apellidoAsignado && apellidoAsignado !== apellido) {
                        row[colIndex] = 'X';
                    } else {
                        row[colIndex] = '';
                    }
                }
            });
        });
        
        this.matrices.edades.rows.forEach((row, rowIndex) => {
            const nino = this.ninos[rowIndex];
            const edadAsignada = this.asignaciones[nino].edad;
            
            row.forEach((cell, colIndex) => {
                if (colIndex > 0) {
                    const edad = this.edades[colIndex - 1];
                    if (edadAsignada === edad) {
                        row[colIndex] = '•';
                    } else if (edadAsignada && edadAsignada !== edad) {
                        row[colIndex] = 'X';
                    } else {
                        row[colIndex] = '';
                    }
                }
            });
        });
        
        this.renderMatrices();
    }
    
    showAssignmentTab(tabId) {
        const container = document.getElementById('problema-logico-15');
        if (!container) return;
        
        // Actualizar botones
        container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = container.querySelector(`[data-tab="${tabId}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        // Mostrar/ocultar contenido
        container.querySelectorAll('.tab-content-item').forEach(content => {
            content.style.display = 'none';
        });
        
        const activeContent = container.querySelector(`#tab-${tabId}-15`);
        if (activeContent) activeContent.style.display = 'block';
        
        this.currentAssignmentTab = tabId;
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
                // Análisis inicial - sin cambios
                break;
            case 2:
                // Rita Torres, Toni Pla
                this.asignaciones['Rita'].apellido = 'Torres';
                this.asignaciones['Toni'].apellido = 'Pla';
                break;
            case 3:
                // Lisa es 2 años menor que Rita
                // Asumimos Rita tiene 5 años, Lisa 3 años
                this.asignaciones['Lisa'].edad = 3;
                this.asignaciones['Rita'].edad = 5;
                break;
            case 4:
                // Confirmamos Toni Pla
                // Ya asignado en paso 2
                break;
            case 5:
                // Lisa Ribas, Luis y Tina Parga
                this.asignaciones['Lisa'].apellido = 'Ribas';
                this.asignaciones['Luis'].apellido = 'Parga';
                this.asignaciones['Tina'].apellido = 'Parga';
                break;
            case 6:
                // Aplicar restricciones de edad de pista 2
                // Luis < Tina < Toni
                this.asignaciones['Luis'].edad = 4;
                this.asignaciones['Tina'].edad = 6;
                break;
            case 7:
                // Toni edad 7 (mayor de todos)
                this.asignaciones['Toni'].edad = 7;
                break;
            case 8:
                // Verificar solución y mostrar
                this.mostrarSolucion();
                break;
        }
        
        this.renderAssignments();
        this.updateMatrices();
    }
    
    resolverCompleto() {
        // Aplicar solución completa directamente
        this.asignaciones = {
            'Toni': { apellido: 'Pla', edad: 7 },
            'Luis': { apellido: 'Parga', edad: 4 },
            'Lisa': { apellido: 'Ribas', edad: 3 },
            'Rita': { apellido: 'Torres', edad: 5 },
            'Tina': { apellido: 'Parga', edad: 6 }
        };
        
        this.currentStep = this.maxSteps;
        this.renderAssignments();
        this.updateMatrices();
        this.updateStepInfo();
        this.mostrarSolucion();
    }
    
    reiniciar() {
        this.currentStep = 0;
        
        // Reiniciar asignaciones
        this.asignaciones = {
            'Toni': { apellido: '', edad: null },
            'Luis': { apellido: '', edad: null },
            'Lisa': { apellido: '', edad: null },
            'Rita': { apellido: '', edad: null },
            'Tina': { apellido: '', edad: null }
        };
        
        // Reiniciar matrices
        this.matrices = {
            apellidos: this.createApellidosMatrix(),
            edades: this.createEdadesMatrix()
        };
        
        this.renderAssignments();
        this.renderMatrices();
        this.updateStepInfo();
        this.ocultarSolucion();
    }
    
    updateStepInfo() {
        const container = document.getElementById('problema-logico-15');
        if (!container) return;
        
        const stepInfo = container.querySelector('.step-info');
        const btnSiguiente = container.querySelector('#btn-siguiente-15');
        const btnResolver = container.querySelector('#btn-resolver-15');
        
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
        const container = document.getElementById('problema-logico-15');
        if (!container) return;
        
        const solucionDiv = container.querySelector('.solucion-final');
        if (solucionDiv) {
            solucionDiv.style.display = 'block';
            solucionDiv.innerHTML = `
                <h3><i class="fas fa-trophy"></i> Solución Final</h3>
                <div class="solucion-grid">
                    <div class="solucion-item">
                        <strong>Toni Pla:</strong> 7 años
                    </div>
                    <div class="solucion-item">
                        <strong>Tina Parga:</strong> 6 años
                    </div>
                    <div class="solucion-item">
                        <strong>Rita Torres:</strong> 5 años
                    </div>
                    <div class="solucion-item">
                        <strong>Luis Parga:</strong> 4 años
                    </div>
                    <div class="solucion-item">
                        <strong>Lisa Ribas:</strong> 3 años
                    </div>
                </div>
                <div class="verificacion">
                    <h4>Verificación de Pistas:</h4>
                    <ul>
                        <li>✓ Parga tiene 2 hijos (Luis 4, Tina 6). Ribas tiene 1 hija (Lisa 3, menor que ambos Parga)</li>
                        <li>✓ Tina (6) > Luis (4) y Tina (6) < Toni Pla (7)</li>
                        <li>✓ Rita Torres (5) = Lisa (3) + 2 años</li>
                        <li>✓ Rita Torres y Toni Pla no son Parga ni Ribas, y tienen apellidos diferentes</li>
                    </ul>
                </div>
            `;
        }
    }
    
    ocultarSolucion() {
        const container = document.getElementById('problema-logico-15');
        if (!container) return;
        
        const solucionDiv = container.querySelector('.solucion-final');
        if (solucionDiv) {
            solucionDiv.style.display = 'none';
        }
    }
}

// Variable global para la instancia
let problemaLogico15Instance = null;

function loadProblemaLogico15() {
    const toolContent = document.getElementById('tool-content');
    toolContent.innerHTML = `
        <div id="problema-logico-15" class="problema-logico15-container">
            <h1>Los Niños de la Vecindad - Problema Lógico 15</h1>
            
            <div class="problema-layout">
                <div class="problema-sidebar">
                    <div class="control-panel">
                        <h3><i class="fas fa-child"></i> Controles</h3>
                        <div class="control-buttons">
                            <button class="btn-control btn-reiniciar" onclick="problemaLogico15Instance.reiniciar()">
                                <i class="fas fa-refresh"></i> Reiniciar
                            </button>
                            <button id="btn-siguiente-15" class="btn-control btn-siguiente" onclick="problemaLogico15Instance.siguientePaso()">
                                <i class="fas fa-arrow-right"></i> Siguiente
                            </button>
                            <button id="btn-resolver-15" class="btn-control btn-resolver" onclick="problemaLogico15Instance.resolverCompleto()">
                                <i class="fas fa-magic"></i> Resolver
                            </button>
                        </div>
                    </div>
                    
                    <div class="pistas-panel">
                        <h3><i class="fas fa-lightbulb"></i> Pistas</h3>
                        <div class="pistas-list">
                            <div class="pista">
                                <strong>1.</strong> La señora Parga tiene dos hijos. La señora Ribas tiene una hija más joven que los hijos de la señora Parga.
                            </div>
                            <div class="pista">
                                <strong>2.</strong> Tina es mayor que Luis y más joven que el niño(a) cuyo apellido es Pla.
                            </div>
                            <div class="pista">
                                <strong>3.</strong> La niña apellidada Torres es dos años mayor que Lisa.
                            </div>
                            <div class="pista">
                                <strong>4.</strong> Rita y Toni no son hermanos Parga, ni son hijos de la señora Ribas. Además, no son hermanos entre sí.
                            </div>
                        </div>
                    </div>
                    
                    <div class="step-info">
                        <h4>Preparado para comenzar</h4>
                        <p>Haz clic en "Siguiente" para comenzar con el análisis paso a paso.</p>
                    </div>
                </div>
                
                <div class="problema-main">
                    <div class="enunciado">
                        <h2>Enunciado del Problema</h2>
                        <p>Cinco niños, todos de edades distintas comprendidas entre los tres y los siete años, viven en la misma casa de la calle del Olmo. Los nombres son: <strong>Toni, Luis, Lisa, Rita, Tina</strong>. Los apellidos disponibles son: <strong>Torres, Parga, Pla, Ribas</strong>. Nota: Hay dos hermanos con el apellido Parga.</p>
                        <p>Basándote en las pistas proporcionadas, determina el nombre completo y la edad de cada niño.</p>
                    </div>
                    
                    <div class="tab-buttons">
                        <button class="tab-btn active" data-tab="asignaciones">
                            <i class="fas fa-user-friends"></i> Asignaciones
                        </button>
                        <button class="tab-btn" data-tab="apellidos">
                            <i class="fas fa-id-card"></i> Matriz Apellidos
                        </button>
                        <button class="tab-btn" data-tab="edades">
                            <i class="fas fa-birthday-cake"></i> Matriz Edades
                        </button>
                    </div>
                    
                    <div class="tab-content">
                        <div id="tab-asignaciones-15" class="tab-content-item" style="display: block;">
                            <div class="assignments-container">
                                <!-- Las asignaciones se renderizan aquí -->
                            </div>
                        </div>
                        <div id="tab-apellidos-15" class="tab-content-item" style="display: none;">
                            <div id="matriz-apellidos-15" class="matriz-content"></div>
                        </div>
                        <div id="tab-edades-15" class="tab-content-item" style="display: none;">
                            <div id="matriz-edades-15" class="matriz-content"></div>
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
    problemaLogico15Instance = new ProblemaLogico15();
    problemaLogico15Instance.setupEventListeners();
    
    // Actualizar menú
    document.querySelectorAll('#sidebar button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const menuButton = document.querySelector('button[onclick="app.loadTool(\'problemaLogico15\')"]');
    if (menuButton) {
        menuButton.classList.add('active');
    }
}

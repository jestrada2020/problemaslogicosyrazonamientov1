// Problema Lógico Seis: La Edad Dorada
// Basado en el problema de mujeres jubiladas y sus edades

class ProblemaLogico6 {
    constructor() {
        this.initializeData();
        this.currentStep = 0;
        this.maxSteps = 11;
    }

    initializeData() {
        // Datos del problema
        this.nombres = ['Ana', 'Carmen', 'Luisa', 'Sara', 'Susana'];
        this.apellidos = ['Bravo', 'Gómez', 'Larra', 'Parra', 'Vázquez'];
        this.edadesPosibles = [91, 92, 93, 94, 95, 96, 97, 98, 99];
        
        // Pistas del problema
        this.pistas = [
            "1. La edad de Carmen es intermedia entre la de la señora Bravo y la de la señora Gómez",
            "2. Sara es mayor que la señora Gómez, pero más joven que Carmen",
            "3. Todas las mujeres tienen un número par de años, excepto la señora Vázquez",
            "4. Susana no es ni la mayor ni la menor del grupo",
            "5. La señora Larra le lleva tantos años a Ana como la señora Parra le lleva a la señora Larra"
        ];

        // Solución correcta
        this.solucionCorrecta = {
            'Ana': { apellido: 'Gómez', edad: 92 },
            'Carmen': { apellido: 'Vázquez', edad: 95 },
            'Luisa': { apellido: 'Bravo', edad: 98 },
            'Sara': { apellido: 'Larra', edad: 94 },
            'Susana': { apellido: 'Parra', edad: 96 }
        };

        // Inicializar matrices y estructuras de datos
        this.matrices = {
            nombreApellido: this.createMatrix(this.nombres, this.apellidos)
        };

        // Vectores para edades asignadas
        this.edadesNombres = {};
        this.edadesApellidos = {};
        this.nombres.forEach(nombre => this.edadesNombres[nombre] = null);
        this.apellidos.forEach(apellido => this.edadesApellidos[apellido] = null);

        // Pasos de resolución
        this.pasos = [
            {
                descripcion: "Estado inicial: Sin asignaciones. Edades entre 91-99 años.",
                cambios: []
            },
            {
                descripcion: "Análisis de extremos (Pistas 1, 2, 4): Carmen no es la mayor ni la menor (intermedia). Sara no es la mayor ni la menor (intermedia). Susana no es la mayor ni la menor. Por lo tanto, los extremos (mayor y menor) deben ser Ana y Luisa.",
                cambios: []
            },
            {
                descripcion: "Pista 3 (Paridad de Edades): 4 edades son pares, 1 es impar (la de Sra. Vázquez). Edades pares posibles: 92, 94, 96, 98. Edad impar de Sra. Vázquez: 91, 93, 95, 97, o 99.",
                cambios: []
            },
            {
                descripcion: "Pista 5 (Progresión Aritmética): Ana < Larra < Parra, y Larra - Ana = Parra - Larra. Las edades forman una progresión aritmética. Ana no puede tener 91 (requeriría otra edad impar). Asignaciones: Ana = 92, Sra. Larra = 94, Sra. Parra = 96.",
                cambios: [
                    { tipo: 'edad_nombre', nombre: 'Ana', edad: 92 }
                ]
            },
            {
                descripcion: "Deducción (Luisa y Ana): Los extremos son Ana y Luisa. Ana = 92, entonces Luisa es la mayor con 98 años.",
                cambios: [
                    { tipo: 'edad_nombre', nombre: 'Luisa', edad: 98 }
                ]
            },
            {
                descripcion: "Identificación de Ana Gómez: Ana no es Bravo (P1,P2), ni Larra o Parra (P5), ni Vázquez (edad par, P3). Por consiguiente, Ana es Gómez. Sra. Vázquez tiene edad impar = 95.",
                cambios: [
                    { tipo: 'matriz', fila: 'Ana', columna: 'Gómez', valor: '✓' },
                    { tipo: 'edad_apellido', apellido: 'Gómez', edad: 92 },
                    { tipo: 'edad_apellido', apellido: 'Vázquez', edad: 95 }
                ]
            },
            {
                descripcion: "Identificación de Sras. Larra y Parra: De la pista 5, Sra. Larra = 94 años y Sra. Parra = 96 años.",
                cambios: [
                    { tipo: 'edad_apellido', apellido: 'Larra', edad: 94 },
                    { tipo: 'edad_apellido', apellido: 'Parra', edad: 96 }
                ]
            },
            {
                descripcion: "Identificación de Sra. Bravo: La única edad par restante es 98 (Luisa). Como Luisa = 98, entonces Luisa = Sra. Bravo.",
                cambios: [
                    { tipo: 'matriz', fila: 'Luisa', columna: 'Bravo', valor: '✓' },
                    { tipo: 'edad_apellido', apellido: 'Bravo', edad: 98 }
                ]
            },
            {
                descripcion: "Pistas 1 y 2 (Carmen y Sara): P1: Carmen está entre Bravo(98) y Gómez(92). P2: Gómez(92) < Sara < Carmen. Carmen = 95 (Sra. Vázquez) y Sara = 94 (Sra. Larra). Esto cumple: Gómez(92) < Sara(94) < Carmen(95), y Carmen(95) está entre Gómez(92) y Bravo(98).",
                cambios: [
                    { tipo: 'matriz', fila: 'Carmen', columna: 'Vázquez', valor: '✓' },
                    { tipo: 'matriz', fila: 'Sara', columna: 'Larra', valor: '✓' },
                    { tipo: 'edad_nombre', nombre: 'Carmen', edad: 95 },
                    { tipo: 'edad_nombre', nombre: 'Sara', edad: 94 }
                ]
            },
            {
                descripcion: "Susana (Eliminación): La única persona y apellido restantes. Susana = Parra, edad = 96. P4: Susana (96) no es ni mayor (98) ni menor (92). Consistente.",
                cambios: [
                    { tipo: 'matriz', fila: 'Susana', columna: 'Parra', valor: '✓' },
                    { tipo: 'edad_nombre', nombre: 'Susana', edad: 96 }
                ]
            },
            {
                descripcion: "¡Problema resuelto! Todas las asignaciones están completas.",
                cambios: []
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
            <div class="problema-logico6-container">
                <div class="problem-header">
                    <button class="menu-button" onclick="toggleSidebar()" title="Abrir/Cerrar Menú">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="edad-header">
                        <h2><i class="fas fa-birthday-cake"></i> Problema Lógico Seis: La Edad Dorada</h2>
                        <p class="edad-descripcion">
                            Cinco mujeres jubiladas (Ana, Carmen, Luisa, Sara, Susana) tienen entre 91 y 99 años.
                            No hay dos con la misma edad. Todas las edades son números enteros.
                            El objetivo es encontrar el nombre completo y la edad de cada una.
                        </p>
                        <div class="participantes-edad-info">
                            <div class="edad-info-grupo">
                                <strong>Nombres:</strong> Ana, Carmen, Luisa, Sara, Susana
                            </div>
                            <div class="edad-info-grupo">
                                <strong>Apellidos:</strong> Bravo, Gómez, Larra, Parra, Vázquez
                            </div>
                            <div class="edad-info-grupo">
                                <strong>Rango de edades:</strong> 91 a 99 años (4 pares, 1 impar)
                            </div>
                        </div>
                    </div>
                </div>

                <div class="edad-pistas-container">
                    <h3><i class="fas fa-search"></i> Pistas del Problema</h3>
                    <div class="edad-pistas-grid">
                        ${this.pistas.map((pista, index) => 
                            `<div class="edad-pista-item ${this.currentStep > index ? 'pista-usada' : ''}">${pista}</div>`
                        ).join('')}
                    </div>
                </div>

                <div class="edad-main-content">
                    <div class="edad-matriz-section">
                        <h3><i class="fas fa-table"></i> Matriz Nombre - Apellido</h3>
                        <div class="edad-matriz-container">
                            ${this.renderMatrix()}
                        </div>
                    </div>

                    <div class="edad-edades-section">
                        <h3><i class="fas fa-clock"></i> Edades Asignadas</h3>
                        <div class="edad-edades-display">
                            <div class="edad-nombres-col">
                                <h4>Por Nombre</h4>
                                <div class="edad-lista">
                                    ${this.nombres.map(nombre => 
                                        `<div class="edad-item">
                                            <span class="edad-nombre">${nombre}:</span> 
                                            <span class="edad-valor">${this.edadesNombres[nombre] || '??'}</span>
                                        </div>`
                                    ).join('')}
                                </div>
                            </div>
                            <div class="edad-apellidos-col">
                                <h4>Por Apellido</h4>
                                <div class="edad-lista">
                                    ${this.apellidos.map(apellido => 
                                        `<div class="edad-item">
                                            <span class="edad-nombre">Sra. ${apellido}:</span> 
                                            <span class="edad-valor">${this.edadesApellidos[apellido] || '??'}</span>
                                        </div>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="edad-controles">
                    <button id="edad-btn-anterior" onclick="problemaLogico6.previousStep()" class="edad-btn"
                            ${this.currentStep === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-left"></i> Anterior
                    </button>
                    <button id="edad-btn-siguiente" onclick="problemaLogico6.nextStep()" class="edad-btn"
                            ${this.currentStep >= this.maxSteps ? 'disabled' : ''}>
                        Siguiente <i class="fas fa-arrow-right"></i>
                    </button>
                    <button id="edad-btn-reiniciar" onclick="problemaLogico6.restart()" class="edad-btn reiniciar">
                        <i class="fas fa-refresh"></i> Reiniciar
                    </button>
                </div>
                
                <div class="edad-paso-info">
                    <h4>Paso ${this.currentStep + 1} de ${this.maxSteps}</h4>
                    <p id="edad-paso-descripcion">${this.currentStep < this.pasos.length ? this.pasos[this.currentStep].descripcion : 'Problema resuelto'}</p>
                </div>

                <div class="edad-solucion-container" ${this.currentStep < this.maxSteps ? 'style="display: none;"' : ''}>
                    <h3><i class="fas fa-trophy"></i> Solución Final</h3>
                    
                    ${this.generarTablaSolucion()}
                    
                    <div class="edad-solucion-grid">
                        ${Object.entries(this.solucionCorrecta)
                            .sort((a, b) => a[1].edad - b[1].edad)
                            .map(([nombre, datos]) => `
                            <div class="edad-solucion-item">
                                <h4>${nombre} ${datos.apellido}</h4>
                                <p><i class="fas fa-birthday-cake"></i> <strong>${datos.edad} años</strong></p>
                                <p class="edad-posicion">${this.getPositionText(datos.edad)}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                ${this.currentStep >= this.maxSteps ? this.generarTablaSolucion() : ''}
            </div>
        `;
    }

    getPositionText(edad) {
        if (edad === 92) return '(La más joven)';
        if (edad === 98) return '(La mayor)';
        if (edad === 95) return '(Única edad impar)';
        return '';
    }

    // Función para generar tabla de solución estilo Problema Lógico 3
    generarTablaSolucion() {
        const solucionCompleta = Object.entries(this.solucionCorrecta)
            .sort((a, b) => a[1].edad - b[1].edad)
            .map(([nombre, datos]) => ({
                nombre: nombre,
                apellido: datos.apellido,
                edad: datos.edad,
                posicion: this.getPositionText(datos.edad)
            }));

        return `
            <div class="edad-tabla-solucion">
                <h3><i class="fas fa-table"></i> Tabla de Solución Final</h3>
                <table class="tabla-solucion-final">
                    <thead>
                        <tr>
                            <th><i class="fas fa-user"></i> Nombre</th>
                            <th><i class="fas fa-id-card"></i> Apellido</th>
                            <th><i class="fas fa-birthday-cake"></i> Edad</th>
                            <th><i class="fas fa-info-circle"></i> Observaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${solucionCompleta.map(persona => `
                            <tr>
                                <td class="nombre-cell">${persona.nombre}</td>
                                <td class="apellido-cell">${persona.apellido}</td>
                                <td class="edad-cell">${persona.edad} años</td>
                                <td class="observacion-cell">${persona.posicion}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    renderMatrix() {
        return `
            <table class="edad-matriz-table">
                <thead>
                    <tr>
                        <th></th>
                        ${this.apellidos.map(apellido => `<th>${apellido}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${this.nombres.map(nombre => `
                        <tr>
                            <td class="edad-row-header">${nombre}</td>
                            ${this.apellidos.map(apellido => `
                                <td class="edad-celda-matriz" data-fila="${nombre}" data-columna="${apellido}">
                                    ${this.matrices.nombreApellido[nombre][apellido]}
                                </td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    nextStep() {
        if (this.currentStep < this.maxSteps) {
            if (this.currentStep < this.pasos.length) {
                const paso = this.pasos[this.currentStep];
                this.aplicarCambios(paso.cambios);
                this.propagarCambios();
            }
            
            this.currentStep++;
            this.updateUI();
        }
    }

    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.recalcularEstado();
            this.updateUI();
        }
    }

    aplicarCambios(cambios) {
        cambios.forEach(cambio => {
            if (cambio.tipo === 'matriz') {
                this.matrices.nombreApellido[cambio.fila][cambio.columna] = cambio.valor;
                if (cambio.valor === '✓') {
                    this.marcarXesAutomaticas(cambio.fila, cambio.columna);
                }
            } else if (cambio.tipo === 'edad_nombre') {
                this.edadesNombres[cambio.nombre] = cambio.edad;
            } else if (cambio.tipo === 'edad_apellido') {
                this.edadesApellidos[cambio.apellido] = cambio.edad;
            }
        });
    }

    marcarXesAutomaticas(filaConfirmada, columnaConfirmada) {
        // Marcar X en otras columnas de la misma fila
        this.apellidos.forEach(apellido => {
            if (apellido !== columnaConfirmada && this.matrices.nombreApellido[filaConfirmada][apellido] === '') {
                this.matrices.nombreApellido[filaConfirmada][apellido] = '✗';
            }
        });
        
        // Marcar X en otras filas de la misma columna
        this.nombres.forEach(nombre => {
            if (nombre !== filaConfirmada && this.matrices.nombreApellido[nombre][columnaConfirmada] === '') {
                this.matrices.nombreApellido[nombre][columnaConfirmada] = '✗';
            }
        });
    }

    propagarCambios() {
        let changed = true;
        while (changed) {
            changed = false;
            
            // Propagar de Nombre-Apellido confirmado + Edad de Nombre => Edad de Apellido
            this.nombres.forEach(nombre => {
                if (this.edadesNombres[nombre] !== null) {
                    this.apellidos.forEach(apellido => {
                        if (this.matrices.nombreApellido[nombre][apellido] === '✓' && 
                            this.edadesApellidos[apellido] === null) {
                            this.edadesApellidos[apellido] = this.edadesNombres[nombre];
                            changed = true;
                        }
                    });
                }
            });
            
            // Propagar de Nombre-Apellido confirmado + Edad de Apellido => Edad de Nombre
            this.apellidos.forEach(apellido => {
                if (this.edadesApellidos[apellido] !== null) {
                    this.nombres.forEach(nombre => {
                        if (this.matrices.nombreApellido[nombre][apellido] === '✓' && 
                            this.edadesNombres[nombre] === null) {
                            this.edadesNombres[nombre] = this.edadesApellidos[apellido];
                            changed = true;
                        }
                    });
                }
            });
        }
    }

    updateCell(fila, columna, valor) {
        const celda = document.querySelector(`[data-fila="${fila}"][data-columna="${columna}"]`);
        if (celda) {
            celda.textContent = valor;
            celda.className = 'edad-celda-matriz';
            if (valor === '✓') {
                celda.classList.add('true');
            } else if (valor === '✗') {
                celda.classList.add('false');
            } else {
                celda.classList.add('unknown');
            }
        }
    }

    recalcularEstado() {
        // Reinicializar matrices y edades
        this.matrices = {
            nombreApellido: this.createMatrix(this.nombres, this.apellidos)
        };
        this.edadesNombres = {};
        this.edadesApellidos = {};
        this.nombres.forEach(nombre => this.edadesNombres[nombre] = null);
        this.apellidos.forEach(apellido => this.edadesApellidos[apellido] = null);

        // Aplicar pasos hasta el paso actual
        for (let i = 0; i < this.currentStep; i++) {
            if (i < this.pasos.length) {
                this.aplicarCambios(this.pasos[i].cambios);
                this.propagarCambios();
            }
        }

        // Actualizar display
        this.updateMatrixDisplay();
        this.updateEdadesDisplay();
    }

    updateMatrixDisplay() {
        this.nombres.forEach(nombre => {
            this.apellidos.forEach(apellido => {
                const valor = this.matrices.nombreApellido[nombre][apellido];
                this.updateCell(nombre, apellido, valor);
            });
        });
    }

    updateEdadesDisplay() {
        // Actualizar nombres
        this.nombres.forEach(nombre => {
            const elementos = document.querySelectorAll('.edad-nombres-col .edad-item');
            elementos.forEach(el => {
                if (el.querySelector('.edad-nombre').textContent === `${nombre}:`) {
                    el.querySelector('.edad-valor').textContent = this.edadesNombres[nombre] || '??';
                }
            });
        });

        // Actualizar apellidos
        this.apellidos.forEach(apellido => {
            const elementos = document.querySelectorAll('.edad-apellidos-col .edad-item');
            elementos.forEach(el => {
                if (el.querySelector('.edad-nombre').textContent === `Sra. ${apellido}:`) {
                    el.querySelector('.edad-valor').textContent = this.edadesApellidos[apellido] || '??';
                }
            });
        });
    }

    updateUI() {
        // Actualizar descripción del paso
        const descripcionEl = document.getElementById('edad-paso-descripcion');
        if (descripcionEl) {
            descripcionEl.textContent = this.currentStep < this.pasos.length ? 
                this.pasos[this.currentStep].descripcion : 'Problema resuelto';
        }

        // Actualizar botones
        const btnAnterior = document.getElementById('edad-btn-anterior');
        const btnSiguiente = document.getElementById('edad-btn-siguiente');
        
        if (btnAnterior) {
            btnAnterior.disabled = this.currentStep === 0;
        }
        
        if (btnSiguiente) {
            btnSiguiente.disabled = this.currentStep >= this.maxSteps;
        }

        // Mostrar/ocultar solución
        const solucionContainer = document.querySelector('.edad-solucion-container');
        if (solucionContainer) {
            solucionContainer.style.display = this.currentStep >= this.maxSteps ? 'block' : 'none';
        }

        // Actualizar pistas usadas
        document.querySelectorAll('.edad-pista-item').forEach((pista, index) => {
            if (this.currentStep > index) {
                pista.classList.add('pista-usada');
            } else {
                pista.classList.remove('pista-usada');
            }
        });

        // Actualizar número de paso
        const pasoInfo = document.querySelector('.edad-paso-info h4');
        if (pasoInfo) {
            pasoInfo.textContent = `Paso ${this.currentStep + 1} de ${this.maxSteps}`;
        }

        // Actualizar displays
        this.updateMatrixDisplay();
        this.updateEdadesDisplay();
    }

    restart() {
        this.currentStep = 0;
        this.recalcularEstado();
        this.updateUI();
    }
}

// Instancia global
let problemaLogico6;

// Función para cargar el problema lógico 6
function loadProblemaLogico6() {
    problemaLogico6 = new ProblemaLogico6();
    const content = document.getElementById('tool-content');
    if (content) {
        content.innerHTML = problemaLogico6.getHTML();
    }
}

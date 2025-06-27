// Problema Lógico Cinco: Fin de Semana en Las Vegas
// Basado en el problema de parejas que van a Las Vegas

class ProblemaLogico5 {
    constructor() {
        this.initializeData();
        this.currentStep = 0;
        this.maxSteps = 9;
    }

    initializeData() {
        // Datos del problema
        this.apellidos = ['Blum', 'Brown', 'Steel', 'Jones'];
        this.hombres = ['Charles', 'Eric', 'John', 'Max'];
        this.mujeres = ['Grace', 'Irene', 'Mae', 'Sarah'];
        this.hoteles = ['Star', 'Moon', 'Sun'];
        this.espectaculos = ['Star Show', 'Moon Show', 'Hill Show', 'Nero Show'];
        
        // Pistas del problema
        this.pistas = [
            "1. La pareja que se alojó en el Moon vio el espectáculo del Nero's Castle",
            "2. A Max Blum le agradó el baile que vio en el espectáculo del Star",
            "3. Mae no quiso salir del hotel para asistir a un espectáculo",
            "4. Sarah Steel fue al Hill (vio el espectáculo del Hill)",
            "5. Eric se aloja siempre en el Sun cuando visita Las Vegas",
            "6. Charles y Grace Brown se alojaron en el Star"
        ];

        // Solución correcta
        this.solucionCorrecta = {
            parejas: {
                'Max': { mujer: 'Mae', apellido: 'Blum', hotel: 'Star', espectaculo: 'Star Show' },
                'Charles': { mujer: 'Grace', apellido: 'Brown', hotel: 'Star', espectaculo: 'Moon Show' },
                'Eric': { mujer: 'Sarah', apellido: 'Steel', hotel: 'Sun', espectaculo: 'Hill Show' },
                'John': { mujer: 'Irene', apellido: 'Jones', hotel: 'Moon', espectaculo: 'Nero Show' }
            }
        };

        // Inicializar matrices
        this.matrices = {
            hombreApellido: this.createMatrix(this.hombres, this.apellidos),
            mujerApellido: this.createMatrix(this.mujeres, this.apellidos),
            hombreMujer: this.createMatrix(this.hombres, this.mujeres),
            apellidoHotel: this.createMatrix(this.apellidos, this.hoteles),
            apellidoEspectaculo: this.createMatrix(this.apellidos, this.espectaculos),
            hombreHotel: this.createMatrix(this.hombres, this.hoteles),
            hombreEspectaculo: this.createMatrix(this.hombres, this.espectaculos)
        };

        // Pasos de resolución
        this.pasos = [
            {
                descripcion: "Estado inicial: Cuadrículas vacías. Comenzamos con la información del problema.",
                cambios: []
            },
            {
                descripcion: "De la pista 5: Eric se hospedó en el Sun Hotel",
                cambios: [
                    { tipo: 'hombreHotel', fila: 'Eric', columna: 'Sun', valor: '✓' }
                ]
            },
            {
                descripcion: "De la pista 2: Max Blum vio el espectáculo del Star",
                cambios: [
                    { tipo: 'hombreApellido', fila: 'Max', columna: 'Blum', valor: '✓' },
                    { tipo: 'hombreEspectaculo', fila: 'Max', columna: 'Star Show', valor: '✓' }
                ]
            },
            {
                descripcion: "Deducción combinada de pistas 1, 2 y 3: Max Blum no se alojó en el Moon (porque la pareja del Moon vio Nero's, Max vio Star Show). Mae no quiso salir del hotel, lo que significa que vio el espectáculo de su propio hotel. Si Max es pareja de Mae y ven Star Show, deben estar en Star Hotel.",
                cambios: [
                    { tipo: 'apellidoHotel', fila: 'Blum', columna: 'Moon', valor: '✗' },
                    { tipo: 'hombreHotel', fila: 'Max', columna: 'Star', valor: '✓' },
                    { tipo: 'hombreMujer', fila: 'Max', columna: 'Mae', valor: '✓' }
                ]
            },
            {
                descripcion: "De la pista 6: Charles y Grace Brown se alojaron en el Star",
                cambios: [
                    { tipo: 'hombreApellido', fila: 'Charles', columna: 'Brown', valor: '✓' },
                    { tipo: 'mujerApellido', fila: 'Grace', columna: 'Brown', valor: '✓' },
                    { tipo: 'hombreMujer', fila: 'Charles', columna: 'Grace', valor: '✓' },
                    { tipo: 'hombreHotel', fila: 'Charles', columna: 'Star', valor: '✓' }
                ]
            },
            {
                descripcion: "Deducción de hoteles: Ya tenemos Blum (Star), Brown (Star), Eric (Sun). La única pareja restante debe haberse hospedado en el Moon. De la pista 1: La pareja del Moon vio el espectáculo de Nero's Castle. Por tanto, John se hospedó en Moon y vio Nero's Castle.",
                cambios: [
                    { tipo: 'hombreHotel', fila: 'John', columna: 'Moon', valor: '✓' },
                    { tipo: 'hombreEspectaculo', fila: 'John', columna: 'Nero Show', valor: '✓' }
                ]
            },
            {
                descripcion: "De la pista 4: Sarah Steel fue al Hill (vio el espectáculo del Hill)",
                cambios: [
                    { tipo: 'mujerApellido', fila: 'Sarah', columna: 'Steel', valor: '✓' },
                    { tipo: 'apellidoEspectaculo', fila: 'Steel', columna: 'Hill Show', valor: '✓' }
                ]
            },
            {
                descripcion: "Deducción de parejas: Sarah Steel vio Hill Show. John vio Nero Show. Así que Sarah Steel no es la mujer de John. Mujeres restantes por emparejar: Irene, Sarah. Hombres: Eric, John. Si Sarah Steel no es de John, debe ser la de Eric. Consecuentemente, la mujer de John es Irene. El apellido de John y Irene es Jones (único apellido restante).",
                cambios: [
                    { tipo: 'hombreMujer', fila: 'John', columna: 'Sarah', valor: '✗' },
                    { tipo: 'hombreMujer', fila: 'Eric', columna: 'Sarah', valor: '✓' },
                    { tipo: 'hombreMujer', fila: 'John', columna: 'Irene', valor: '✓' },
                    { tipo: 'hombreApellido', fila: 'John', columna: 'Jones', valor: '✓' },
                    { tipo: 'mujerApellido', fila: 'Irene', columna: 'Jones', valor: '✓' },
                    { tipo: 'hombreApellido', fila: 'Eric', columna: 'Steel', valor: '✓' }
                ]
            },
            {
                descripcion: "Deducción final de espectáculos: Espectáculos asignados: Star Show (Blum), Nero Show (Jones), Hill Show (Steel). Único espectáculo restante: Moon Show. Única pareja sin espectáculo: Brown. Por lo tanto, los Brown vieron el espectáculo del Moon.",
                cambios: [
                    { tipo: 'apellidoEspectaculo', fila: 'Brown', columna: 'Moon Show', valor: '✓' }
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
            <div class="problema-logico5-container">
                <div class="problem-header">
                    <button class="menu-button" onclick="toggleSidebar()" title="Abrir/Cerrar Menú">
                        <i class="fas fa-bars"></i>
                    </button>
                    <div class="vegas-header">
                        <h2><i class="fas fa-dice"></i> Problema Lógico Cinco: Fin de Semana en Las Vegas</h2>
                        <p class="vegas-descripcion">
                            Cuatro parejas de Los Ángeles (Blum, Brown, Steel, Jones) fueron a Las Vegas. 
                            Dos se alojaron en el Star Hotel, una en el Moon Hotel, y la otra en el Sun Hotel. 
                            El sábado, cada pareja asistió a una cena con espectáculo. 
                            Sólo una de ellas vio el espectáculo del hotel en que paraba. 
                            Los espectáculos se exhibían en el Star Hotel, Moon Hotel, el Hill y el Nero's Castle.
                        </p>
                        <div class="participantes-info">
                            <div class="info-grupo">
                                <strong>Hombres:</strong> Charles, Eric, John, Max
                            </div>
                            <div class="info-grupo">
                                <strong>Mujeres:</strong> Grace, Irene, Mae, Sarah
                            </div>
                            <div class="info-grupo">
                            <strong>Hoteles:</strong> Star, Moon, Sun
                        </div>
                        <div class="info-grupo">
                            <strong>Espectáculos:</strong> Star Show, Moon Show, Hill Show, Nero Show
                        </div>
                    </div>
                </div>

                <div class="vegas-pistas-container">
                    <h3><i class="fas fa-search"></i> Pistas del Problema</h3>
                    <div class="vegas-pistas-grid">
                        ${this.pistas.map((pista, index) => 
                            `<div class="vegas-pista-item ${this.currentStep > index ? 'pista-usada' : ''}">${pista}</div>`
                        ).join('')}
                    </div>
                </div>

                <div class="vegas-matrices-container">
                    <div class="vegas-matriz-tabs">
                        <button class="vegas-tab-btn active" onclick="problemaLogico5.showMatrix('hombreApellido')">
                            <i class="fas fa-user-tag"></i> Hombre-Apellido
                        </button>
                        <button class="vegas-tab-btn" onclick="problemaLogico5.showMatrix('mujerApellido')">
                            <i class="fas fa-female"></i> Mujer-Apellido
                        </button>
                        <button class="vegas-tab-btn" onclick="problemaLogico5.showMatrix('hombreMujer')">
                            <i class="fas fa-heart"></i> Parejas
                        </button>
                        <button class="vegas-tab-btn" onclick="problemaLogico5.showMatrix('apellidoHotel')">
                            <i class="fas fa-hotel"></i> Apellido-Hotel
                        </button>
                        <button class="vegas-tab-btn" onclick="problemaLogico5.showMatrix('apellidoEspectaculo')">
                            <i class="fas fa-theater-masks"></i> Apellido-Espectáculo
                        </button>
                        <button class="vegas-tab-btn" onclick="problemaLogico5.showMatrix('hombreHotel')">
                            <i class="fas fa-bed"></i> Hombre-Hotel
                        </button>
                        <button class="vegas-tab-btn" onclick="problemaLogico5.showMatrix('hombreEspectaculo')">
                            <i class="fas fa-star"></i> Hombre-Espectáculo
                        </button>
                    </div>

                    <div class="vegas-matriz-content">
                        <div id="matriz-hombreApellido" class="vegas-matriz-panel active">
                            <h4>Matriz Hombre - Apellido</h4>
                            ${this.renderMatrix('hombreApellido', this.hombres, this.apellidos)}
                        </div>
                        <div id="matriz-mujerApellido" class="vegas-matriz-panel">
                            <h4>Matriz Mujer - Apellido</h4>
                            ${this.renderMatrix('mujerApellido', this.mujeres, this.apellidos)}
                        </div>
                        <div id="matriz-hombreMujer" class="vegas-matriz-panel">
                            <h4>Matriz de Parejas</h4>
                            ${this.renderMatrix('hombreMujer', this.hombres, this.mujeres)}
                        </div>
                        <div id="matriz-apellidoHotel" class="vegas-matriz-panel">
                            <h4>Matriz Apellido - Hotel</h4>
                            ${this.renderMatrix('apellidoHotel', this.apellidos, this.hoteles)}
                        </div>
                        <div id="matriz-apellidoEspectaculo" class="vegas-matriz-panel">
                            <h4>Matriz Apellido - Espectáculo</h4>
                            ${this.renderMatrix('apellidoEspectaculo', this.apellidos, this.espectaculos)}
                        </div>
                        <div id="matriz-hombreHotel" class="vegas-matriz-panel">
                            <h4>Matriz Hombre - Hotel (Auxiliar)</h4>
                            ${this.renderMatrix('hombreHotel', this.hombres, this.hoteles)}
                        </div>
                        <div id="matriz-hombreEspectaculo" class="vegas-matriz-panel">
                            <h4>Matriz Hombre - Espectáculo (Auxiliar)</h4>
                            ${this.renderMatrix('hombreEspectaculo', this.hombres, this.espectaculos)}
                        </div>
                    </div>
                </div>

                <div class="vegas-controles-container">
                    <div class="vegas-paso-info">
                        <h4>Paso ${this.currentStep + 1} de ${this.maxSteps}</h4>
                        <p id="vegas-paso-descripcion">${this.currentStep < this.pasos.length ? this.pasos[this.currentStep].descripcion : 'Problema resuelto'}</p>
                    </div>
                    <div class="vegas-controles-botones">
                        <button id="vegas-btn-anterior" onclick="problemaLogico5.previousStep()" 
                                ${this.currentStep === 0 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-left"></i> Anterior
                        </button>
                        <button id="vegas-btn-siguiente" onclick="problemaLogico5.nextStep()" 
                                ${this.currentStep >= this.maxSteps ? 'disabled' : ''}>
                            Siguiente <i class="fas fa-arrow-right"></i>
                        </button>
                        <button id="vegas-btn-reiniciar" onclick="problemaLogico5.restart()">
                            <i class="fas fa-refresh"></i> Reiniciar
                        </button>
                    </div>
                </div>

                <div class="vegas-solucion-container" ${this.currentStep < this.maxSteps ? 'style="display: none;"' : ''}>
                    <h3><i class="fas fa-trophy"></i> Solución Final</h3>
                    <div class="vegas-solucion-grid">
                        ${Object.entries(this.solucionCorrecta.parejas).map(([hombre, datos]) => `
                            <div class="vegas-solucion-item">
                                <h4>${hombre} y ${datos.mujer} ${datos.apellido}</h4>
                                <p><i class="fas fa-hotel"></i> Se alojaron en el <strong>${datos.hotel} Hotel</strong></p>
                                <p><i class="fas fa-theater-masks"></i> Vieron el <strong>${datos.espectaculo}</strong></p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    renderMatrix(tipo, rows, cols) {
        return `
            <div class="vegas-matriz-table">
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
                                <td class="vegas-row-header">${row}</td>
                                ${cols.map(col => `
                                    <td class="vegas-celda-matriz" data-tipo="${tipo}" data-fila="${row}" data-columna="${col}">
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
        document.querySelectorAll('.vegas-matriz-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Remover clase active de todos los tabs
        document.querySelectorAll('.vegas-tab-btn').forEach(btn => {
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
                this.propagarCambios();
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
            
            // Si es una confirmación, marcar X en otras celdas de la fila y columna
            if (valor === '✓') {
                this.marcarXesAutomaticas(tipo, fila, columna);
            }
            
            // Actualizar la celda en el DOM
            this.updateCell(tipo, fila, columna, valor);
        });
    }

    marcarXesAutomaticas(tipo, filaConfirmada, columnaConfirmada) {
        const matriz = this.matrices[tipo];
        const rows = Object.keys(matriz);
        const cols = Object.keys(matriz[rows[0]]);
        
        // Marcar X en otras columnas de la misma fila
        cols.forEach(col => {
            if (col !== columnaConfirmada && matriz[filaConfirmada][col] === '') {
                matriz[filaConfirmada][col] = '✗';
                this.updateCell(tipo, filaConfirmada, col, '✗');
            }
        });
        
        // Marcar X en otras filas de la misma columna
        rows.forEach(row => {
            if (row !== filaConfirmada && matriz[row][columnaConfirmada] === '') {
                matriz[row][columnaConfirmada] = '✗';
                this.updateCell(tipo, row, columnaConfirmada, '✗');
            }
        });
    }

    propagarCambios() {
        let changed = true;
        while (changed) {
            changed = false;
            
            // Propagar de Hombre-Apellido + Apellido-Hotel => Hombre-Hotel
            this.hombres.forEach(hombre => {
                this.apellidos.forEach(apellido => {
                    if (this.matrices.hombreApellido[hombre][apellido] === '✓') {
                        this.hoteles.forEach(hotel => {
                            if (this.matrices.apellidoHotel[apellido][hotel] === '✓' && 
                                this.matrices.hombreHotel[hombre][hotel] === '') {
                                this.matrices.hombreHotel[hombre][hotel] = '✓';
                                this.marcarXesAutomaticas('hombreHotel', hombre, hotel);
                                this.updateCell('hombreHotel', hombre, hotel, '✓');
                                changed = true;
                            }
                        });
                    }
                });
            });
            
            // Propagar de Hombre-Apellido + Apellido-Espectaculo => Hombre-Espectaculo
            this.hombres.forEach(hombre => {
                this.apellidos.forEach(apellido => {
                    if (this.matrices.hombreApellido[hombre][apellido] === '✓') {
                        this.espectaculos.forEach(espectaculo => {
                            if (this.matrices.apellidoEspectaculo[apellido][espectaculo] === '✓' && 
                                this.matrices.hombreEspectaculo[hombre][espectaculo] === '') {
                                this.matrices.hombreEspectaculo[hombre][espectaculo] = '✓';
                                this.marcarXesAutomaticas('hombreEspectaculo', hombre, espectaculo);
                                this.updateCell('hombreEspectaculo', hombre, espectaculo, '✓');
                                changed = true;
                            }
                        });
                    }
                });
            });
            
            // Propagar de Hombre-Mujer + Mujer-Apellido => Hombre-Apellido
            this.hombres.forEach(hombre => {
                this.mujeres.forEach(mujer => {
                    if (this.matrices.hombreMujer[hombre][mujer] === '✓') {
                        this.apellidos.forEach(apellido => {
                            if (this.matrices.mujerApellido[mujer][apellido] === '✓' && 
                                this.matrices.hombreApellido[hombre][apellido] === '') {
                                this.matrices.hombreApellido[hombre][apellido] = '✓';
                                this.marcarXesAutomaticas('hombreApellido', hombre, apellido);
                                this.updateCell('hombreApellido', hombre, apellido, '✓');
                                changed = true;
                            }
                        });
                    }
                });
            });
            
            // Propagar de Hombre-Mujer + Hombre-Apellido => Mujer-Apellido
            this.hombres.forEach(hombre => {
                this.mujeres.forEach(mujer => {
                    if (this.matrices.hombreMujer[hombre][mujer] === '✓') {
                        this.apellidos.forEach(apellido => {
                            if (this.matrices.hombreApellido[hombre][apellido] === '✓' && 
                                this.matrices.mujerApellido[mujer][apellido] === '') {
                                this.matrices.mujerApellido[mujer][apellido] = '✓';
                                this.marcarXesAutomaticas('mujerApellido', mujer, apellido);
                                this.updateCell('mujerApellido', mujer, apellido, '✓');
                                changed = true;
                            }
                        });
                    }
                });
            });
            
            // Propagar de Hombre-Hotel + Hombre-Apellido => Apellido-Hotel
            this.hombres.forEach(hombre => {
                this.hoteles.forEach(hotel => {
                    if (this.matrices.hombreHotel[hombre][hotel] === '✓') {
                        this.apellidos.forEach(apellido => {
                            if (this.matrices.hombreApellido[hombre][apellido] === '✓' && 
                                this.matrices.apellidoHotel[apellido][hotel] === '') {
                                this.matrices.apellidoHotel[apellido][hotel] = '✓';
                                this.marcarXesAutomaticas('apellidoHotel', apellido, hotel);
                                this.updateCell('apellidoHotel', apellido, hotel, '✓');
                                changed = true;
                            }
                        });
                    }
                });
            });
            
            // Propagar de Hombre-Espectaculo + Hombre-Apellido => Apellido-Espectaculo
            this.hombres.forEach(hombre => {
                this.espectaculos.forEach(espectaculo => {
                    if (this.matrices.hombreEspectaculo[hombre][espectaculo] === '✓') {
                        this.apellidos.forEach(apellido => {
                            if (this.matrices.hombreApellido[hombre][apellido] === '✓' && 
                                this.matrices.apellidoEspectaculo[apellido][espectaculo] === '') {
                                this.matrices.apellidoEspectaculo[apellido][espectaculo] = '✓';
                                this.marcarXesAutomaticas('apellidoEspectaculo', apellido, espectaculo);
                                this.updateCell('apellidoEspectaculo', apellido, espectaculo, '✓');
                                changed = true;
                            }
                        });
                    }
                });
            });
        }
    }

    updateCell(tipo, fila, columna, valor) {
        const celda = document.querySelector(`[data-tipo="${tipo}"][data-fila="${fila}"][data-columna="${columna}"]`);
        if (celda) {
            celda.textContent = valor;
            celda.className = 'vegas-celda-matriz';
            if (valor === '✓') {
                celda.classList.add('vegas-correcto');
            } else if (valor === '✗') {
                celda.classList.add('vegas-incorrecto');
            }
        }
    }

    recalcularMatrices() {
        // Reinicializar matrices
        this.matrices = {
            hombreApellido: this.createMatrix(this.hombres, this.apellidos),
            mujerApellido: this.createMatrix(this.mujeres, this.apellidos),
            hombreMujer: this.createMatrix(this.hombres, this.mujeres),
            apellidoHotel: this.createMatrix(this.apellidos, this.hoteles),
            apellidoEspectaculo: this.createMatrix(this.apellidos, this.espectaculos),
            hombreHotel: this.createMatrix(this.hombres, this.hoteles),
            hombreEspectaculo: this.createMatrix(this.hombres, this.espectaculos)
        };

        // Aplicar pasos hasta el paso actual
        for (let i = 0; i < this.currentStep; i++) {
            if (i < this.pasos.length) {
                this.aplicarCambios(this.pasos[i].cambios);
                this.propagarCambios();
            }
        }

        // Actualizar todas las matrices en el DOM
        this.updateMatricesDisplay();
    }

    updateMatricesDisplay() {
        Object.keys(this.matrices).forEach(tipo => {
            const matriz = this.matrices[tipo];
            Object.keys(matriz).forEach(fila => {
                Object.keys(matriz[fila]).forEach(columna => {
                    const valor = matriz[fila][columna];
                    this.updateCell(tipo, fila, columna, valor);
                });
            });
        });
    }

    updateUI() {
        // Actualizar descripción del paso
        const descripcionEl = document.getElementById('vegas-paso-descripcion');
        if (descripcionEl) {
            descripcionEl.textContent = this.currentStep < this.pasos.length ? 
                this.pasos[this.currentStep].descripcion : 'Problema resuelto';
        }

        // Actualizar botones
        const btnAnterior = document.getElementById('vegas-btn-anterior');
        const btnSiguiente = document.getElementById('vegas-btn-siguiente');
        
        if (btnAnterior) {
            btnAnterior.disabled = this.currentStep === 0;
        }
        
        if (btnSiguiente) {
            btnSiguiente.disabled = this.currentStep >= this.maxSteps;
        }

        // Mostrar/ocultar solución
        const solucionContainer = document.querySelector('.vegas-solucion-container');
        if (solucionContainer) {
            solucionContainer.style.display = this.currentStep >= this.maxSteps ? 'block' : 'none';
        }

        // Actualizar pistas usadas
        document.querySelectorAll('.vegas-pista-item').forEach((pista, index) => {
            if (this.currentStep > index) {
                pista.classList.add('pista-usada');
            } else {
                pista.classList.remove('pista-usada');
            }
        });

        // Actualizar número de paso
        const pasoInfo = document.querySelector('.vegas-paso-info h4');
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
let problemaLogico5;

// Función para cargar el problema lógico 5
function loadProblemaLogico5() {
    problemaLogico5 = new ProblemaLogico5();
    const content = document.getElementById('tool-content');
    if (content) {
        content.innerHTML = problemaLogico5.getHTML();
    }
}

// Problema Lógico
const problemaLogico = {
    nombres: ["Moreno", "Castaño", "Rubio", "Blanco"],
    profesiones: ["Banquero", "Tendero", "Fotógrafo", "Cantante"],
    grid: {},
    pasoActual: 0,
    
    pasosSolucion: [
        {
            descripcion: "Estado inicial: cuadrícula vacía.",
            cambios: []
        },
        {
            descripcion: "Aplicando pistas directas:<br>• Blanco NO es banquero (pista 1)<br>• Castaño NO es fotógrafo (pista 2)<br>• Blanco NO es cantante (pista 3)<br>• Moreno y Rubio NO son cantantes (pista 4)",
            cambios: [
                {profesion: "Banquero", nombre: "Blanco", valor: "X"},
                {profesion: "Fotógrafo", nombre: "Castaño", valor: "X"},
                {profesion: "Cantante", nombre: "Blanco", valor: "X"},
                {profesion: "Cantante", nombre: "Moreno", valor: "X"},
                {profesion: "Cantante", nombre: "Rubio", valor: "X"}
            ]
        },
        {
            descripcion: "Solo Castaño puede ser cantante. <strong>Castaño = Cantante</strong>",
            cambios: [
                {profesion: "Cantante", nombre: "Castaño", valor: "✓"}
            ]
        },
        {
            descripcion: "Blanco no es banquero ni cantante. Castaño no es fotógrafo. <strong>Blanco = Fotógrafo</strong>",
            cambios: [
                {profesion: "Fotógrafo", nombre: "Blanco", valor: "✓"}
            ]
        },
        {
            descripcion: "Solo quedan Moreno y Rubio para banquero y tendero. <strong>Moreno = Banquero</strong>",
            cambios: [
                {profesion: "Banquero", nombre: "Moreno", valor: "✓"}
            ]
        },
        {
            descripcion: "Por eliminación: <strong>Rubio = Tendero</strong><br>Problema resuelto.",
            cambios: [
                {profesion: "Tendero", nombre: "Rubio", valor: "✓"}
            ]
        }
    ],
    
    init() {
        this.inicializarGrid();
        this.pasoActual = 0;
        this.actualizarPaso();
        const solucionFinal = document.getElementById('solucion-final');
        if (solucionFinal) {
            solucionFinal.style.display = 'none';
        }
    },
    
    inicializarGrid() {
        this.grid = {};
        this.profesiones.forEach(prof => {
            this.grid[prof] = {};
            this.nombres.forEach(nom => {
                this.grid[prof][nom] = "";
            });
        });
        this.renderGrid();
    },
    
    renderGrid() {
        this.profesiones.forEach(prof => {
            this.nombres.forEach(nom => {
                const cell = document.getElementById(`cell-${prof}-${nom}`);
                if (cell) {
                    const valor = this.grid[prof][nom];
                    cell.textContent = valor;
                    cell.className = "";
                    if (valor === "X") {
                        cell.classList.add("marca-x");
                    } else if (valor === "✓") {
                        cell.classList.add("marca-check");
                    }
                }
            });
        });
    },
    
    aplicarCambios(cambios) {
        cambios.forEach(cambio => {
            this.grid[cambio.profesion][cambio.nombre] = cambio.valor;
            
            // Si es una marca ✓, marcar X en el resto de la fila y columna
            if (cambio.valor === "✓") {
                // Marcar X en el resto de la fila (misma profesión, otros nombres)
                this.nombres.forEach(nom => {
                    if (nom !== cambio.nombre && this.grid[cambio.profesion][nom] === "") {
                        this.grid[cambio.profesion][nom] = "X";
                    }
                });
                
                // Marcar X en el resto de la columna (mismo nombre, otras profesiones)
                this.profesiones.forEach(prof => {
                    if (prof !== cambio.profesion && this.grid[prof][cambio.nombre] === "") {
                        this.grid[prof][cambio.nombre] = "X";
                    }
                });
            }
        });
    },
    
    actualizarPaso() {
        const descripcionDiv = document.getElementById('descripcion-paso');
        if (descripcionDiv && this.pasosSolucion[this.pasoActual]) {
            descripcionDiv.innerHTML = this.pasosSolucion[this.pasoActual].descripcion;
        }
        
        // Verificar si está completo
        if (this.pasoActual === this.pasosSolucion.length - 1) {
            this.mostrarSolucionFinal();
        }
    },
    
    siguientePaso() {
        if (this.pasoActual < this.pasosSolucion.length - 1) {
            this.pasoActual++;
            const paso = this.pasosSolucion[this.pasoActual];
            this.aplicarCambios(paso.cambios);
            this.renderGrid();
            this.actualizarPaso();
        }
    },
    
    resolverTodo() {
        // Aplicar todos los pasos
        for (let i = 1; i < this.pasosSolucion.length; i++) {
            this.aplicarCambios(this.pasosSolucion[i].cambios);
        }
        this.pasoActual = this.pasosSolucion.length - 1;
        this.renderGrid();
        this.actualizarPaso();
    },
    
    reiniciar() {
        this.init();
    },
    
    mostrarSolucionFinal() {
        const solucionDiv = document.getElementById('solucion-final');
        const itemsDiv = document.getElementById('solucion-items');
        
        if (!solucionDiv || !itemsDiv) return;
        
        // Encontrar las soluciones (marcas ✓)
        const soluciones = [];
        this.profesiones.forEach(prof => {
            this.nombres.forEach(nom => {
                if (this.grid[prof][nom] === "✓") {
                    soluciones.push(`${nom}: ${prof}`);
                }
            });
        });
        
        itemsDiv.innerHTML = soluciones.map(sol => 
            `<div class="solucion-item">${sol}</div>`
        ).join('');
        
        solucionDiv.style.display = 'block';
    }
};

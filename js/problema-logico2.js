// Problema Lógico 2: Resolución Interactiva
// Traducción de la aplicación Shiny R a JavaScript

const problemaLogico2 = {
    // Datos del problema
    nombres: ["Andrés", "Luis", "Noel", "Jorge", "Paco"],
    apellidos: ["Mora", "López", "Díaz", "Soto", "Cobos"],
    mercancias: ["Palomitas", "Gaseosa", "Caramelos", "Helados", "Cacahuetes"],
    
    // Matrices del problema
    matrices: {
        NvsA: null, // Nombres vs Apellidos
        NvsM: null, // Nombres vs Mercancías
        AvsM: null  // Apellidos vs Mercancías
    },
    
    // Control de pasos
    pasoActual: 0,
    
    // Definición de pasos de solución
    pasosSolucion: [
        {
            descripcion: "Estado inicial: cuadrículas vacías.",
            cambios: []
        },
        {
            descripcion: "<b>Pista 1:</b> Jorge ≠ López, Jorge ≠ Palomitas",
            cambios: [
                {matriz: "NvsA", fila: "Jorge", col: "López", valor: "X"},
                {matriz: "NvsM", fila: "Jorge", col: "Palomitas", valor: "X"}
            ]
        },
        {
            descripcion: "<b>Pista 2:</b> Díaz ≠ Gaseosa, Díaz ≠ Caramelos",
            cambios: [
                {matriz: "AvsM", fila: "Díaz", col: "Gaseosa", valor: "X"},
                {matriz: "AvsM", fila: "Díaz", col: "Caramelos", valor: "X"}
            ]
        },
        {
            descripcion: "<b>Pista 3:</b> Noel y Jorge no son Soto/Cobos, no venden helados. Soto/Cobos no venden helados",
            cambios: [
                {matriz: "NvsA", fila: "Noel", col: "Soto", valor: "X"},
                {matriz: "NvsA", fila: "Noel", col: "Cobos", valor: "X"},
                {matriz: "NvsM", fila: "Noel", col: "Helados", valor: "X"},
                {matriz: "NvsA", fila: "Jorge", col: "Soto", valor: "X"},
                {matriz: "NvsA", fila: "Jorge", col: "Cobos", valor: "X"},
                {matriz: "NvsM", fila: "Jorge", col: "Helados", valor: "X"},
                {matriz: "AvsM", fila: "Soto", col: "Helados", valor: "X"},
                {matriz: "AvsM", fila: "Cobos", col: "Helados", valor: "X"}
            ]
        },
        {
            descripcion: "<b>Pista 4:</b> Andrés ≠ López/Cobos, Andrés ≠ Caramelos, Cobos ≠ Caramelos",
            cambios: [
                {matriz: "NvsA", fila: "Andrés", col: "López", valor: "X"},
                {matriz: "NvsA", fila: "Andrés", col: "Cobos", valor: "X"},
                {matriz: "NvsM", fila: "Andrés", col: "Caramelos", valor: "X"},
                {matriz: "AvsM", fila: "Cobos", col: "Caramelos", valor: "X"}
            ]
        },
        {
            descripcion: "<b>Pista 5:</b> Paco ≠ Cacahuetes/Helados, Díaz ≠ Cacahuetes/Helados",
            cambios: [
                {matriz: "NvsM", fila: "Paco", col: "Cacahuetes", valor: "X"},
                {matriz: "NvsM", fila: "Paco", col: "Helados", valor: "X"},
                {matriz: "AvsM", fila: "Díaz", col: "Cacahuetes", valor: "X"},
                {matriz: "AvsM", fila: "Díaz", col: "Helados", valor: "X"}
            ]
        },
        {
            descripcion: "<b>Deducción:</b> Solo Díaz puede vender Palomitas. <strong>Díaz = Palomitas</strong>",
            cambios: [
                {matriz: "AvsM", fila: "Díaz", col: "Palomitas", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción:</b> Por eliminación, <strong>Paco = Díaz</strong>",
            cambios: [
                {matriz: "NvsA", fila: "Paco", col: "Díaz", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Propagación:</b> <strong>Paco = Palomitas</strong>",
            cambios: [
                {matriz: "NvsM", fila: "Paco", col: "Palomitas", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción:</b> Por eliminación, <strong>Luis = Cobos</strong>",
            cambios: [
                {matriz: "NvsA", fila: "Luis", col: "Cobos", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción:</b> Solo Andrés puede vender Helados. <strong>Andrés = Helados</strong>",
            cambios: [
                {matriz: "NvsM", fila: "Andrés", col: "Helados", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción:</b> Por eliminación, <strong>Andrés = Mora</strong>",
            cambios: [
                {matriz: "NvsA", fila: "Andrés", col: "Mora", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Propagación:</b> <strong>Mora = Helados</strong>",
            cambios: [
                {matriz: "AvsM", fila: "Mora", col: "Helados", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción:</b> Por eliminación, <strong>Noel = Soto</strong>",
            cambios: [
                {matriz: "NvsA", fila: "Noel", col: "Soto", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción:</b> Por eliminación, <strong>Jorge = López</strong>",
            cambios: [
                {matriz: "NvsA", fila: "Jorge", col: "López", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción:</b> <strong>Jorge = Caramelos</strong>",
            cambios: [
                {matriz: "NvsM", fila: "Jorge", col: "Caramelos", valor: "•"},
                {matriz: "AvsM", fila: "López", col: "Caramelos", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción:</b> <strong>Noel = Cacahuetes</strong>",
            cambios: [
                {matriz: "NvsM", fila: "Noel", col: "Cacahuetes", valor: "•"},
                {matriz: "AvsM", fila: "Soto", col: "Cacahuetes", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Final:</b> <strong>Luis = Gaseosa</strong> - Problema resuelto",
            cambios: [
                {matriz: "NvsM", fila: "Luis", col: "Gaseosa", valor: "•"},
                {matriz: "AvsM", fila: "Cobos", col: "Gaseosa", valor: "•"}
            ]
        }
    ],

    // Inicializar matrices
    inicializarMatrices: function() {
        this.matrices.NvsA = this.crearMatrizVacia(this.nombres, this.apellidos);
        this.matrices.NvsM = this.crearMatrizVacia(this.nombres, this.mercancias);
        this.matrices.AvsM = this.crearMatrizVacia(this.apellidos, this.mercancias);
    },

    crearMatrizVacia: function(filas, columnas) {
        const matriz = {};
        filas.forEach(fila => {
            matriz[fila] = {};
            columnas.forEach(col => {
                matriz[fila][col] = "";
            });
        });
        return matriz;
    },

    // Reiniciar todo
    reiniciar: function() {
        this.pasoActual = 0;
        this.inicializarMatrices();
        this.actualizarUI();
    },

    // Siguiente paso
    siguientePaso: function() {
        if (this.pasoActual < this.pasosSolucion.length - 1) {
            this.pasoActual++;
            this.aplicarCambiosPaso(this.pasoActual);
            this.actualizarUI();
        }
    },

    // Resolver todo
    resolverTodo: function() {
        this.inicializarMatrices();
        for (let i = 1; i < this.pasosSolucion.length; i++) {
            this.aplicarCambiosPaso(i);
        }
        this.pasoActual = this.pasosSolucion.length - 1;
        this.actualizarUI();
    },

    // Aplicar cambios de un paso específico
    aplicarCambiosPaso: function(numeroPaso) {
        const paso = this.pasosSolucion[numeroPaso];
        paso.cambios.forEach(cambio => {
            this.matrices[cambio.matriz][cambio.fila][cambio.col] = cambio.valor;
            if (cambio.valor === "•") {
                this.marcarXesAutomatico(cambio.matriz, cambio.fila, cambio.col);
            }
        });
        this.propagarEntreMatrices();
    },

    // Marcar X automáticamente cuando se confirma un •
    marcarXesAutomatico: function(nombreMatriz, filaSeleccionada, colSeleccionada) {
        const matriz = this.matrices[nombreMatriz];
        
        // Marcar X en el resto de la fila
        Object.keys(matriz[filaSeleccionada]).forEach(col => {
            if (col !== colSeleccionada && matriz[filaSeleccionada][col] === "") {
                matriz[filaSeleccionada][col] = "X";
            }
        });

        // Marcar X en el resto de la columna
        Object.keys(matriz).forEach(fila => {
            if (fila !== filaSeleccionada && matriz[fila][colSeleccionada] === "") {
                matriz[fila][colSeleccionada] = "X";
            }
        });
    },

    // Propagar información entre matrices
    propagarEntreMatrices: function() {
        // Si NvsA[N, A] == "•" y NvsM[N, M] == "•", entonces AvsM[A, M] debería ser "•"
        this.nombres.forEach(nombre => {
            this.apellidos.forEach(apellido => {
                if (this.matrices.NvsA[nombre][apellido] === "•") {
                    this.mercancias.forEach(mercancia => {
                        if (this.matrices.NvsM[nombre][mercancia] === "•" && 
                            this.matrices.AvsM[apellido][mercancia] === "") {
                            this.matrices.AvsM[apellido][mercancia] = "•";
                            this.marcarXesAutomatico("AvsM", apellido, mercancia);
                        }
                        if (this.matrices.AvsM[apellido][mercancia] === "•" && 
                            this.matrices.NvsM[nombre][mercancia] === "") {
                            this.matrices.NvsM[nombre][mercancia] = "•";
                            this.marcarXesAutomatico("NvsM", nombre, mercancia);
                        }
                    });
                }
            });
        });
    },

    // Actualizar interfaz de usuario
    actualizarUI: function() {
        // Actualizar descripción del paso actual
        const descripcionElement = document.getElementById('pl2-descripcion-paso');
        if (descripcionElement) {
            descripcionElement.innerHTML = this.pasosSolucion[this.pasoActual].descripcion;
        }

        // Actualizar matrices
        this.renderizarMatriz('NvsA', 'pl2-matriz-nvsa', this.nombres, this.apellidos);
        this.renderizarMatriz('NvsM', 'pl2-matriz-nvsm', this.nombres, this.mercancias);
        this.renderizarMatriz('AvsM', 'pl2-matriz-avsm', this.apellidos, this.mercancias);

        // Actualizar solución final si está completa
        this.actualizarSolucionFinal();

        // Actualizar botones
        const btnSiguiente = document.getElementById('pl2-btn-siguiente');
        if (btnSiguiente) {
            btnSiguiente.disabled = this.pasoActual >= this.pasosSolucion.length - 1;
        }
    },

    // Renderizar una matriz en HTML
    renderizarMatriz: function(nombreMatriz, containerId, filas, columnas) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = '<table class="matriz-problema-logico"><thead><tr><th></th>';
        columnas.forEach(col => html += `<th>${col}</th>`);
        html += '</tr></thead><tbody>';

        filas.forEach(fila => {
            html += `<tr><th>${fila}</th>`;
            columnas.forEach(col => {
                const valor = this.matrices[nombreMatriz][fila][col];
                const clase = valor === "•" ? "positivo" : valor === "X" ? "negativo" : "";
                html += `<td class="${clase}">${valor}</td>`;
            });
            html += '</tr>';
        });

        html += '</tbody></table>';
        container.innerHTML = html;
    },

    // Actualizar solución final
    actualizarSolucionFinal: function() {
        const solucionElement = document.getElementById('pl2-solucion-final');
        if (!solucionElement) return;

        if (this.pasoActual === this.pasosSolucion.length - 1) {
            const solucion = this.generarTextoSolucion();
            solucionElement.innerHTML = `<h4>Solución Final:</h4><div class="solucion-texto">${solucion}</div>`;
        } else {
            solucionElement.innerHTML = '<p>La solución aparecerá aquí una vez completados todos los pasos.</p>';
        }
    },

    // Generar texto de solución
    generarTextoSolucion: function() {
        const resultados = [];
        
        this.nombres.forEach(nombre => {
            let apellido = "";
            let mercancia = "";
            
            // Encontrar apellido
            this.apellidos.forEach(ap => {
                if (this.matrices.NvsA[nombre][ap] === "•") {
                    apellido = ap;
                }
            });
            
            // Encontrar mercancía
            this.mercancias.forEach(mer => {
                if (this.matrices.NvsM[nombre][mer] === "•") {
                    mercancia = mer;
                }
            });
            
            if (apellido && mercancia) {
                resultados.push(`${nombre} ${apellido} vende ${mercancia}.`);
            }
        });
        
        return resultados.join('<br>');
    }
};

// Inicializar cuando se carga la herramienta
document.addEventListener('DOMContentLoaded', function() {
    if (typeof app !== 'undefined' && app.currentTool === 'problemaLogico2') {
        problemaLogico2.inicializarMatrices();
        problemaLogico2.actualizarUI();
    }
});

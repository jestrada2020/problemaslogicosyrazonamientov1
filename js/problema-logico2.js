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
            descripcion: "<b>Estado Inicial:</b> Cuadrículas vacías. El problema indica que 'Mora' es uno de los apellidos.",
            cambios: []
        },
        {
            descripcion: "<b>Pista 1:</b> Jorge, que no se apellida López, no vende palomitas de maíz.<br>- Jorge ≠ López (Nombre vs Apellido)<br>- Jorge ≠ Palomitas (Nombre vs Mercancía)",
            cambios: [
                {matriz: "NvsA", fila: "Jorge", col: "López", valor: "X"},
                {matriz: "NvsM", fila: "Jorge", col: "Palomitas", valor: "X"}
            ]
        },
        {
            descripcion: "<b>Pista 2:</b> El que se apellida Díaz no vende ni gaseosa ni caramelos.<br>- Díaz ≠ Gaseosa (Apellido vs Mercancía)<br>- Díaz ≠ Caramelos (Apellido vs Mercancía)",
            cambios: [
                {matriz: "AvsM", fila: "Díaz", col: "Gaseosa", valor: "X"},
                {matriz: "AvsM", fila: "Díaz", col: "Caramelos", valor: "X"}
            ]
        },
        {
            descripcion: "<b>Pista 3:</b> Los cinco chicos son: Noel, Jorge, el que se apellida Soto, el que se apellida Cobos y el que vende helados.<br>Esto implica que Noel y Jorge no son Soto ni Cobos, y no venden helados. Soto y Cobos no venden helados.<br>- Noel ≠ Soto; Noel ≠ Cobos; Noel ≠ Helados<br>- Jorge ≠ Soto; Jorge ≠ Cobos; Jorge ≠ Helados<br>- Soto ≠ Helados; Cobos ≠ Helados",
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
            descripcion: "<b>Pista 4:</b> El apellido de Andrés no es ni López ni Cobos. Ni Andrés ni el que se apellida Cobos venden caramelos.<br>- Andrés ≠ López; Andrés ≠ Cobos (Nombre vs Apellido)<br>- Andrés ≠ Caramelos (Nombre vs Mercancía)<br>- Cobos ≠ Caramelos (Apellido vs Mercancía)",
            cambios: [
                {matriz: "NvsA", fila: "Andrés", col: "López", valor: "X"},
                {matriz: "NvsA", fila: "Andrés", col: "Cobos", valor: "X"},
                {matriz: "NvsM", fila: "Andrés", col: "Caramelos", valor: "X"},
                {matriz: "AvsM", fila: "Cobos", col: "Caramelos", valor: "X"}
            ]
        },
        {
            descripcion: "<b>Pista 5:</b> Ni el vendedor de cacahuetes ni el vendedor de helados se llaman Paco o se apellidan Díaz.<br>- Paco ≠ Cacahuetes; Paco ≠ Helados (Nombre vs Mercancía)<br>- Díaz ≠ Cacahuetes; Díaz ≠ Helados (Apellido vs Mercancía)",
            cambios: [
                {matriz: "NvsM", fila: "Paco", col: "Cacahuetes", valor: "X"},
                {matriz: "NvsM", fila: "Paco", col: "Helados", valor: "X"},
                {matriz: "AvsM", fila: "Díaz", col: "Cacahuetes", valor: "X"},
                {matriz: "AvsM", fila: "Díaz", col: "Helados", valor: "X"}
            ]
        },
        {
            descripcion: "<b>Deducción 1:</b> Análisis de restricciones nos lleva a determinar que <b>Díaz VENDE Palomitas</b>.<br>Díaz no vende Gaseosa, Caramelos, Cacahuetes, Helados (Pistas 2 y 5). Solo queda Palomitas.",
            cambios: [
                {matriz: "AvsM", fila: "Díaz", col: "Palomitas", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción 2:</b> ¿Quién es Díaz?<br>Jorge no vende Palomitas (Pista 1), pero Díaz sí vende Palomitas. Analizando las restricciones: <b>Paco ES Díaz</b>.",
            cambios: [
                {matriz: "NvsA", fila: "Paco", col: "Díaz", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Propagación:</b> Como Paco es Díaz y Díaz vende Palomitas, entonces <b>Paco VENDE Palomitas</b>.",
            cambios: [
                {matriz: "NvsM", fila: "Paco", col: "Palomitas", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción 3:</b> ¿Quién es Cobos?<br>Paco es Díaz, así que no es Cobos. Andrés, Noel y Jorge no son Cobos (Pistas 3 y 4). Por lo tanto, <b>Luis ES Cobos</b>.",
            cambios: [
                {matriz: "NvsA", fila: "Luis", col: "Cobos", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción 4:</b> ¿Quién vende Helados?<br>Noel, Jorge, Paco, Luis no venden Helados (por las pistas). Por lo tanto, <b>Andrés VENDE Helados</b>.",
            cambios: [
                {matriz: "NvsM", fila: "Andrés", col: "Helados", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción 5:</b> ¿Apellido de Andrés?<br>Andrés no es López, Cobos ni Díaz. Andrés vende Helados y Soto no vende Helados. Por lo tanto, <b>Andrés ES Mora</b>.",
            cambios: [
                {matriz: "NvsA", fila: "Andrés", col: "Mora", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Propagación:</b> <b>Mora VENDE Helados</b>.",
            cambios: [
                {matriz: "AvsM", fila: "Mora", col: "Helados", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción 6:</b> ¿Quién es Soto?<br>Por eliminación de candidatos: <b>Noel ES Soto</b>.",
            cambios: [
                {matriz: "NvsA", fila: "Noel", col: "Soto", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción 7:</b> ¿Quién es López?<br>Por eliminación: <b>Jorge ES López</b>.",
            cambios: [
                {matriz: "NvsA", fila: "Jorge", col: "López", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción 8:</b> ¿Quién vende Caramelos?<br>Analizando las restricciones restantes: <b>Jorge (López) VENDE Caramelos</b>.",
            cambios: [
                {matriz: "NvsM", fila: "Jorge", col: "Caramelos", valor: "•"},
                {matriz: "AvsM", fila: "López", col: "Caramelos", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción 9:</b> ¿Quién vende Cacahuetes?<br>Por las restricciones: <b>Noel (Soto) VENDE Cacahuetes</b>.",
            cambios: [
                {matriz: "NvsM", fila: "Noel", col: "Cacahuetes", valor: "•"},
                {matriz: "AvsM", fila: "Soto", col: "Cacahuetes", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Deducción 10:</b> ¿Quién vende Gaseosa?<br>Por eliminación: <b>Luis (Cobos) VENDE Gaseosa</b>.<br><b>¡Problema Resuelto!</b>",
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

// Problema Lógico 3: Visitas de Luisa
// Traducción de la aplicación Shiny R a JavaScript

const problemaLogico3 = {
    // Datos del problema
    amigas: ["Ana", "Celia", "Gloria", "Juana", "Lola", "Mari"],
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    actividades: ["Tenis", "Concierto", "Teatro", "Museo", "Zoo", "Compras"],
    coloresPelo: ["Rubia", "Morena"],
    
    // Matrices del problema
    matrices: {
        AmigaDia: null,       // Amigas vs Días
        AmigaActividad: null, // Amigas vs Actividades
        DiaActividad: null,   // Días vs Actividades
        AmigaColor: null      // Amigas vs Color de Pelo
    },
    
    // Control de pasos
    pasoActual: 0,
    
    // Definición de pasos de solución
    pasosSolucion: [
        {
            descripcion: "<b>Estado Inicial:</b> Cuadrículas vacías.",
            cambios: []
        },
        {
            descripcion: "<b>Pista 1 (Interpretación Clave):</b><br>- Las 3 Rubias son: Ana, la que fue al Museo, la del día después del Zoo.<br>- Las 3 Morenas son: Gloria, la que fue al Concierto, la que fue el Lunes.<br>- La nota implica que estos 6 'roles' corresponden a las 6 mujeres distintas.<br>- Ana = Rubia. Gloria = Morena.",
            cambios: [
                {matriz: "AmigaColor", fila: "Ana", col: "Rubia", valor: "•"},
                {matriz: "AmigaColor", fila: "Gloria", col: "Morena", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Pista 3 (Orden Relativo 1):</b> Juana fue al día siguiente del Zoo y 4 días antes del Museo.<br>Esto significa: Zoo → Juana → X → X → X → Museo. Esta secuencia ocupa los 6 días.<br>- Zoo = Lunes, Juana = Martes, Museo = Sábado.",
            cambios: [
                {matriz: "DiaActividad", fila: "Lunes", col: "Zoo", valor: "•"},
                {matriz: "AmigaDia", fila: "Juana", col: "Martes", valor: "•"},
                {matriz: "DiaActividad", fila: "Sábado", col: "Museo", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Pista 1 (Continuación con Pista 3):</b><br>- Lunes-Goer es Morena ⇒ Zoo-Goer (Lunes) es Morena.<br>- (Día Zoo+1)-Goer es Rubia ⇒ Martes-Goer (Juana) es Rubia.<br>- Museo-Goer (Sábado) es Rubia.",
            cambios: [
                {matriz: "AmigaColor", fila: "Juana", col: "Rubia", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Pista 3 (Orden Relativo 2):</b> Gloria fue el día después del Teatro y un día antes que Mari.<br>Esto significa: Teatro → Gloria → Mari. Esta secuencia ocupa 3 días consecutivos.<br>Con Lunes, Martes, Sábado ocupados, esta secuencia debe ser Miércoles, Jueves, Viernes.<br>- Teatro = Miércoles, Gloria = Jueves, Mari = Viernes.",
            cambios: [
                {matriz: "DiaActividad", fila: "Miércoles", col: "Teatro", valor: "•"},
                {matriz: "AmigaDia", fila: "Gloria", col: "Jueves", valor: "•"},
                {matriz: "AmigaDia", fila: "Mari", col: "Viernes", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Pista 1 (Más Implicaciones):</b><br>- Ana (Rubia) ≠ Lunes-Goer (Morena), Ana ≠ Concierto-Goer (Morena).<br>- Gloria (Morena) ≠ Museo-Goer (Rubia), Gloria ≠ Zoo+1-Goer (Juana, Rubia).<br>- Por distinción de roles en Pista 1, Gloria no es Concierto-Goer.",
            cambios: [
                {matriz: "AmigaActividad", fila: "Ana", col: "Zoo", valor: "X"},
                {matriz: "AmigaActividad", fila: "Ana", col: "Concierto", valor: "X"},
                {matriz: "AmigaActividad", fila: "Gloria", col: "Zoo", valor: "X"},
                {matriz: "AmigaActividad", fila: "Gloria", col: "Museo", valor: "X"},
                {matriz: "AmigaActividad", fila: "Gloria", col: "Concierto", valor: "X"}
            ]
        },
        {
            descripcion: "<b>Pista 4:</b> Ana (Rubia) y la mujer que fue de compras tienen el mismo color de pelo.<br>- Compras-Goer es Rubia.",
            cambios: []
        },
        {
            descripcion: "<b>Deducción Final:</b><br>Resolviendo las actividades y días restantes:<br>- Juana (Martes, Rubia): Actividad = Tenis<br>- Mari (Viernes): Actividad = Compras, Color = Rubia<br>- Gloria (Jueves, Morena): Actividad = Concierto<br>- Ana (Sábado): Actividad = Museo, Color = Rubia<br>- Celia (Lunes): Actividad = Zoo, Color = Morena<br>- Lola (Miércoles): Actividad = Teatro, Color = Morena",
            cambios: [
                {matriz: "AmigaActividad", fila: "Juana", col: "Tenis", valor: "•"},
                {matriz: "AmigaColor", fila: "Mari", col: "Rubia", valor: "•"},
                {matriz: "AmigaActividad", fila: "Mari", col: "Compras", valor: "•"},
                {matriz: "AmigaActividad", fila: "Gloria", col: "Concierto", valor: "•"},
                {matriz: "AmigaDia", fila: "Ana", col: "Sábado", valor: "•"},
                {matriz: "AmigaActividad", fila: "Ana", col: "Museo", valor: "•"},
                {matriz: "AmigaDia", fila: "Celia", col: "Lunes", valor: "•"},
                {matriz: "AmigaActividad", fila: "Celia", col: "Zoo", valor: "•"},
                {matriz: "AmigaColor", fila: "Celia", col: "Morena", valor: "•"},
                {matriz: "AmigaDia", fila: "Lola", col: "Miércoles", valor: "•"},
                {matriz: "AmigaActividad", fila: "Lola", col: "Teatro", valor: "•"},
                {matriz: "AmigaColor", fila: "Lola", col: "Morena", valor: "•"}
            ]
        },
        {
            descripcion: "<b>Verificación Final:</b><br>Solución completa verificada:<br>- Ana (Sáb, Museo, Rubia)<br>- Celia (Lun, Zoo, Morena)<br>- Gloria (Jue, Concierto, Morena)<br>- Juana (Mar, Tenis, Rubia)<br>- Lola (Mié, Teatro, Morena)<br>- Mari (Vie, Compras, Rubia)<br><b>¡Problema Resuelto!</b>",
            cambios: []
        }
    ],

    // Inicializar matrices
    inicializarMatrices: function() {
        this.matrices.AmigaDia = this.crearMatrizVacia(this.amigas, this.dias);
        this.matrices.AmigaActividad = this.crearMatrizVacia(this.amigas, this.actividades);
        this.matrices.DiaActividad = this.crearMatrizVacia(this.dias, this.actividades);
        this.matrices.AmigaColor = this.crearMatrizVacia(this.amigas, this.coloresPelo);
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
        // 1. Si Amiga=Día y Día=Actividad => Amiga=Actividad
        this.amigas.forEach(amiga => {
            this.dias.forEach(dia => {
                if (this.matrices.AmigaDia[amiga][dia] === "•") {
                    this.actividades.forEach(actividad => {
                        if (this.matrices.DiaActividad[dia][actividad] === "•" && 
                            this.matrices.AmigaActividad[amiga][actividad] === "") {
                            this.matrices.AmigaActividad[amiga][actividad] = "•";
                            this.marcarXesAutomatico("AmigaActividad", amiga, actividad);
                        }
                    });
                }
            });
        });

        // 2. Si Amiga=Día y Amiga=Actividad => Día=Actividad
        this.amigas.forEach(amiga => {
            this.dias.forEach(dia => {
                if (this.matrices.AmigaDia[amiga][dia] === "•") {
                    this.actividades.forEach(actividad => {
                        if (this.matrices.AmigaActividad[amiga][actividad] === "•" && 
                            this.matrices.DiaActividad[dia][actividad] === "") {
                            this.matrices.DiaActividad[dia][actividad] = "•";
                            this.marcarXesAutomatico("DiaActividad", dia, actividad);
                        }
                    });
                }
            });
        });

        // 3. Si Amiga=Actividad y Día=Actividad => Amiga=Día
        this.actividades.forEach(actividad => {
            this.amigas.forEach(amiga => {
                if (this.matrices.AmigaActividad[amiga][actividad] === "•") {
                    this.dias.forEach(dia => {
                        if (this.matrices.DiaActividad[dia][actividad] === "•" && 
                            this.matrices.AmigaDia[amiga][dia] === "") {
                            this.matrices.AmigaDia[amiga][dia] = "•";
                            this.marcarXesAutomatico("AmigaDia", amiga, dia);
                        }
                    });
                }
            });
        });
    },

    // Actualizar interfaz de usuario
    actualizarUI: function() {
        // Actualizar descripción del paso actual
        const descripcionElement = document.getElementById('pl3-descripcion-paso');
        if (descripcionElement) {
            descripcionElement.innerHTML = this.pasosSolucion[this.pasoActual].descripcion;
        }

        // Actualizar matrices
        this.renderizarMatriz('AmigaDia', 'pl3-matriz-amiga-dia', this.amigas, this.dias);
        this.renderizarMatriz('AmigaActividad', 'pl3-matriz-amiga-actividad', this.amigas, this.actividades);
        this.renderizarMatriz('DiaActividad', 'pl3-matriz-dia-actividad', this.dias, this.actividades);
        this.renderizarMatriz('AmigaColor', 'pl3-matriz-amiga-color', this.amigas, this.coloresPelo);

        // Actualizar solución final si está completa
        this.actualizarSolucionFinal();

        // Actualizar botones
        const btnSiguiente = document.getElementById('pl3-btn-siguiente');
        if (btnSiguiente) {
            btnSiguiente.disabled = this.pasoActual >= this.pasosSolucion.length - 1;
        }
    },

    // Renderizar una matriz en HTML
    renderizarMatriz: function(nombreMatriz, containerId, filas, columnas) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let html = '<table class="matriz-problema-logico-3"><thead><tr><th></th>';
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
        const solucionElement = document.getElementById('pl3-solucion-final');
        if (!solucionElement) return;

        if (this.pasoActual === this.pasosSolucion.length - 1) {
            const solucion = this.generarTextoSolucion();
            solucionElement.innerHTML = `<h4>Solución Final:</h4><div class="solucion-texto">${solucion}</div>`;
        } else {
            solucionElement.innerHTML = '<p>La solución aparecerá aquí una vez completados todos los pasos.</p>';
        }
    },

    // Generar texto de solución ordenado por días
    generarTextoSolucion: function() {
        const resultados = [];
        const diasOrden = {"Lunes": 1, "Martes": 2, "Miércoles": 3, "Jueves": 4, "Viernes": 5, "Sábado": 6};
        
        const datos = [];
        
        this.amigas.forEach(amiga => {
            let dia = "";
            let actividad = "";
            let color = "";
            
            // Encontrar día
            this.dias.forEach(d => {
                if (this.matrices.AmigaDia[amiga][d] === "•") {
                    dia = d;
                }
            });
            
            // Encontrar actividad
            this.actividades.forEach(act => {
                if (this.matrices.AmigaActividad[amiga][act] === "•") {
                    actividad = act;
                }
            });
            
            // Encontrar color
            this.coloresPelo.forEach(col => {
                if (this.matrices.AmigaColor[amiga][col] === "•") {
                    color = col;
                }
            });
            
            if (dia && actividad && color) {
                datos.push({
                    amiga: amiga,
                    dia: dia,
                    actividad: actividad,
                    color: color,
                    diaNum: diasOrden[dia] || 99
                });
            }
        });
        
        // Ordenar por día
        datos.sort((a, b) => a.diaNum - b.diaNum);
        
        // Generar texto
        datos.forEach(item => {
            resultados.push(`${item.amiga} (${item.color}) fue el ${item.dia} a(l) ${item.actividad}.`);
        });
        
        return resultados.join('<br>');
    },

    // Función para cambiar tabs
    cambiarTab: function(tabId) {
        // Ocultar todos los tabs
        document.querySelectorAll('.problema-logico-3 .tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Desactivar todos los botones
        document.querySelectorAll('.problema-logico-3 .tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Activar el tab seleccionado
        const selectedTab = document.getElementById(`tab-${tabId}`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        // Activar el botón correspondiente
        event.target.classList.add('active');
    }
};

// Inicializar cuando se carga la herramienta
document.addEventListener('DOMContentLoaded', function() {
    if (typeof app !== 'undefined' && app.currentTool === 'problemaLogico3') {
        problemaLogico3.inicializarMatrices();
        problemaLogico3.actualizarUI();
    }
});

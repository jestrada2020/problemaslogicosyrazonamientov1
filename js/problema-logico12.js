// Problema Lógico Doce: El Aprendizaje de un Oficio
// Basado en la aplicación Shiny proporcionada

const PROBLEMA_LOGICO_12 = {
    padres: ["García", "Vidal", "Benítez"],
    hijos: ["Pepe", "Paco", "Santi"],
    profesiones: ["Carpintero", "Mecánico", "Electricista"],
    nombres: ["Pedro", "Carlos", "Antonio"],
    meses: ["Julio", "Agosto"],
    
    matrices: {
        PadreNombre: null,
        PadreProfesion: null,
        PadreHijo: null,
        HijoAprendizJulio: null,
        HijoAprendizAgosto: null
    },
    
    pasoActual: 0,
    
    pasos: [
        {
            titulo: "Estado Inicial",
            descripcion: "3 padres, 3 hijos, 3 profesiones, 3 nombres de pila. Cada hijo aprende con dos especialistas diferentes en julio y agosto.",
            cambios: []
        },
        {
            titulo: "P2: Paco no es Benítez y no trabajó con mecánico",
            descripcion: "Pista 2: Paco no es apellido Benítez y no trabajó con el mecánico durante el verano. Si Paco no trabajó con el mecánico, entonces el mecánico debe ser su padre (ya que cada hijo trabaja con los otros dos especialistas).",
            cambios: [
                {matriz: "PadreHijo", fila: "Benítez", col: "Paco", valor: "X"},
                {matriz: "PadreProfesion", fila: "García", col: "Mecánico", valor: "•"},
                {matriz: "PadreHijo", fila: "García", col: "Paco", valor: "•"}
            ]
        },
        {
            titulo: "P1: Pepe trabajó con electricista en julio",
            descripcion: "Pista 1: Pepe trabajó con el electricista en julio. Como Paco es hijo del mecánico (García), y cada hijo trabaja con los otros dos especialistas, Pepe debe ser hijo del carpintero.",
            cambios: [
                {matriz: "HijoAprendizJulio", fila: "Pepe", col: "Electricista", valor: "•"},
                {matriz: "PadreProfesion", fila: "Benítez", col: "Carpintero", valor: "•"},
                {matriz: "PadreHijo", fila: "Benítez", col: "Pepe", valor: "•"},
                {matriz: "PadreProfesion", fila: "Vidal", col: "Electricista", valor: "•"},
                {matriz: "PadreHijo", fila: "Vidal", col: "Santi", valor: "•"}
            ]
        },
        {
            titulo: "P1: Pepe trabajó con Carlos en agosto",
            descripcion: "Pista 1: Pepe trabajó con Carlos en agosto. Carlos debe ser el mecánico (García), confirmando las deducciones anteriores.",
            cambios: [
                {matriz: "HijoAprendizAgosto", fila: "Pepe", col: "Mecánico", valor: "•"},
                {matriz: "PadreNombre", fila: "García", col: "Carlos", valor: "•"}
            ]
        },
        {
            titulo: "P3: Sr. Vidal no es carpintero ni Carlos",
            descripcion: "Pista 3: El señor Vidal no es carpintero (ya confirmado que es electricista) ni se llama Carlos (ya confirmado que Carlos es García).",
            cambios: []
        },
        {
            titulo: "P4: Santi no trabajó con Antonio en agosto",
            descripcion: "Pista 4: Santi no trabajó con Antonio en agosto. Como Santi es hijo del electricista (Vidal) y debe trabajar con carpintero y mecánico, y no con Antonio en agosto, entonces Antonio debe ser el carpintero (Benítez).",
            cambios: [
                {matriz: "PadreNombre", fila: "Benítez", col: "Antonio", valor: "X"},
                {matriz: "PadreNombre", fila: "Benítez", col: "Pedro", valor: "•"},
                {matriz: "PadreNombre", fila: "Vidal", col: "Antonio", valor: "•"}
            ]
        },
        {
            titulo: "Completar aprendizajes",
            descripcion: "Completar las asignaciones de aprendizajes basándose en las deducciones: Paco con Benítez en julio y Vidal en agosto, Santi con García en julio y Benítez en agosto.",
            cambios: [
                {matriz: "HijoAprendizJulio", fila: "Paco", col: "Carpintero", valor: "•"},
                {matriz: "HijoAprendizAgosto", fila: "Paco", col: "Electricista", valor: "•"},
                {matriz: "HijoAprendizJulio", fila: "Santi", col: "Mecánico", valor: "•"},
                {matriz: "HijoAprendizAgosto", fila: "Santi", col: "Carpintero", valor: "•"}
            ]
        },
        {
            titulo: "¡Problema Resuelto!",
            descripcion: "Todas las asignaciones completas.",
            cambios: []
        }
    ]
};

function inicializarMatrices12() {
    PROBLEMA_LOGICO_12.matrices.PadreNombre = crearMatriz(PROBLEMA_LOGICO_12.padres, PROBLEMA_LOGICO_12.nombres);
    PROBLEMA_LOGICO_12.matrices.PadreProfesion = crearMatriz(PROBLEMA_LOGICO_12.padres, PROBLEMA_LOGICO_12.profesiones);
    PROBLEMA_LOGICO_12.matrices.PadreHijo = crearMatriz(PROBLEMA_LOGICO_12.padres, PROBLEMA_LOGICO_12.hijos);
    PROBLEMA_LOGICO_12.matrices.HijoAprendizJulio = crearMatriz(PROBLEMA_LOGICO_12.hijos, PROBLEMA_LOGICO_12.profesiones);
    PROBLEMA_LOGICO_12.matrices.HijoAprendizAgosto = crearMatriz(PROBLEMA_LOGICO_12.hijos, PROBLEMA_LOGICO_12.profesiones);
}

function marcarXesAuto12(matriz, filaSeleccionada, colSeleccionada) {
    // Marcar X en otras columnas de la misma fila
    for (let col in matriz[filaSeleccionada]) {
        if (col !== colSeleccionada && matriz[filaSeleccionada][col] === "") {
            matriz[filaSeleccionada][col] = "X";
        }
    }
    // Marcar X en otras filas de la misma columna
    for (let fila in matriz) {
        if (fila !== filaSeleccionada && matriz[fila][colSeleccionada] === "") {
            matriz[fila][colSeleccionada] = "X";
        }
    }
}

function propagar12() {
    let cambio = true;
    while (cambio) {
        cambio = false;
        
        // Propagar entre PadreHijo y otras matrices basándose en las relaciones
        for (let padre of PROBLEMA_LOGICO_12.padres) {
            for (let hijo of PROBLEMA_LOGICO_12.hijos) {
                if (PROBLEMA_LOGICO_12.matrices.PadreHijo[padre][hijo] === "•") {
                    // Si un padre tiene un hijo, propagar nombre y profesión
                    for (let profesion of PROBLEMA_LOGICO_12.profesiones) {
                        if (PROBLEMA_LOGICO_12.matrices.PadreProfesion[padre][profesion] === "•") {
                            // El hijo no puede trabajar con su propio padre
                            if (PROBLEMA_LOGICO_12.matrices.HijoAprendizJulio[hijo][profesion] === "") {
                                PROBLEMA_LOGICO_12.matrices.HijoAprendizJulio[hijo][profesion] = "X";
                                cambio = true;
                            }
                            if (PROBLEMA_LOGICO_12.matrices.HijoAprendizAgosto[hijo][profesion] === "") {
                                PROBLEMA_LOGICO_12.matrices.HijoAprendizAgosto[hijo][profesion] = "X";
                                cambio = true;
                            }
                        }
                    }
                }
            }
        }
    }
}

function aplicarCambios12(cambios) {
    for (let cambio of cambios) {
        const matriz = PROBLEMA_LOGICO_12.matrices[cambio.matriz];
        if (matriz && matriz[cambio.fila] && matriz[cambio.fila].hasOwnProperty(cambio.col)) {
            if (cambio.valor === "•") {
                matriz[cambio.fila][cambio.col] = "•";
                marcarXesAuto12(matriz, cambio.fila, cambio.col);
            } else {
                matriz[cambio.fila][cambio.col] = cambio.valor;
            }
        }
    }
    propagar12();
}

function actualizarDisplay12() {
    const paso = PROBLEMA_LOGICO_12.pasos[PROBLEMA_LOGICO_12.pasoActual];
    document.getElementById('titulo-paso-12').textContent = `Paso ${PROBLEMA_LOGICO_12.pasoActual + 1}: ${paso.titulo}`;
    document.getElementById('descripcion-paso-12').innerHTML = paso.descripcion;
    
    // Actualizar matrices
    actualizarMatrizHTML12('padre-nombre', PROBLEMA_LOGICO_12.matrices.PadreNombre, PROBLEMA_LOGICO_12.padres, PROBLEMA_LOGICO_12.nombres);
    actualizarMatrizHTML12('padre-profesion', PROBLEMA_LOGICO_12.matrices.PadreProfesion, PROBLEMA_LOGICO_12.padres, PROBLEMA_LOGICO_12.profesiones);
    actualizarMatrizHTML12('padre-hijo', PROBLEMA_LOGICO_12.matrices.PadreHijo, PROBLEMA_LOGICO_12.padres, PROBLEMA_LOGICO_12.hijos);
    actualizarMatrizHTML12('hijo-julio', PROBLEMA_LOGICO_12.matrices.HijoAprendizJulio, PROBLEMA_LOGICO_12.hijos, PROBLEMA_LOGICO_12.profesiones);
    actualizarMatrizHTML12('hijo-agosto', PROBLEMA_LOGICO_12.matrices.HijoAprendizAgosto, PROBLEMA_LOGICO_12.hijos, PROBLEMA_LOGICO_12.profesiones);
    
    // Actualizar botones
    document.getElementById('btn-siguiente-12').disabled = PROBLEMA_LOGICO_12.pasoActual >= PROBLEMA_LOGICO_12.pasos.length - 1;
    
    // Verificar si está resuelto
    if (PROBLEMA_LOGICO_12.pasoActual === PROBLEMA_LOGICO_12.pasos.length - 1) {
        mostrarSolucionFinal12();
    }
}

function actualizarMatrizHTML12(tipo, matriz, filas, columnas) {
    let html = '<table class="matrix-table"><thead><tr><th></th>';
    
    // Headers de columnas
    for (let col of columnas) {
        html += `<th>${col}</th>`;
    }
    html += '</tr></thead><tbody>';
    
    // Filas de datos
    for (let fila of filas) {
        html += `<tr><th>${fila}</th>`;
        for (let col of columnas) {
            const valor = matriz[fila][col];
            const valorDisplay = valor === "•" ? "●" : valor;
            html += `<td data-valor="${valor}">${valorDisplay}</td>`;
        }
        html += '</tr>';
    }
    
    html += '</tbody></table>';
    document.getElementById(`matriz-${tipo}-12`).innerHTML = html;
}

function mostrarSolucionFinal12() {
    let solucion = '<h3>¡Problema Resuelto!</h3>';
    solucion += '<div class="solucion-resumen">';
    
    // Buscar las asignaciones finales
    for (let padre of PROBLEMA_LOGICO_12.padres) {
        let nombre = "", profesion = "", hijo = "";
        let aprendizJulio = "", aprendizAgosto = "";
        
        // Buscar nombre
        for (let nom of PROBLEMA_LOGICO_12.nombres) {
            if (PROBLEMA_LOGICO_12.matrices.PadreNombre[padre][nom] === "•") {
                nombre = nom;
                break;
            }
        }
        
        // Buscar profesión
        for (let prof of PROBLEMA_LOGICO_12.profesiones) {
            if (PROBLEMA_LOGICO_12.matrices.PadreProfesion[padre][prof] === "•") {
                profesion = prof;
                break;
            }
        }
        
        // Buscar hijo
        for (let h of PROBLEMA_LOGICO_12.hijos) {
            if (PROBLEMA_LOGICO_12.matrices.PadreHijo[padre][h] === "•") {
                hijo = h;
                break;
            }
        }
        
        // Buscar aprendices
        for (let h of PROBLEMA_LOGICO_12.hijos) {
            if (PROBLEMA_LOGICO_12.matrices.HijoAprendizJulio[h][profesion] === "•") {
                aprendizJulio = h;
            }
            if (PROBLEMA_LOGICO_12.matrices.HijoAprendizAgosto[h][profesion] === "•") {
                aprendizAgosto = h;
            }
        }
        
        solucion += `
            <div class="solucion-padre">
                <h4>${profesion}: ${nombre} ${padre}</h4>
                <p><strong>Hijo:</strong> ${hijo}</p>
                <p><strong>Aprendices:</strong> ${aprendizJulio} en julio, ${aprendizAgosto} en agosto</p>
            </div>
        `;
    }
    
    solucion += '</div>';
    document.getElementById('solucion-final-12').innerHTML = solucion;
}

function reiniciar12() {
    PROBLEMA_LOGICO_12.pasoActual = 0;
    inicializarMatrices12();
    actualizarDisplay12();
    document.getElementById('solucion-final-12').innerHTML = '<p>La solución aparecerá aquí una vez completados todos los pasos.</p>';
}

function siguientePaso12() {
    if (PROBLEMA_LOGICO_12.pasoActual < PROBLEMA_LOGICO_12.pasos.length - 1) {
        PROBLEMA_LOGICO_12.pasoActual++;
        const paso = PROBLEMA_LOGICO_12.pasos[PROBLEMA_LOGICO_12.pasoActual];
        aplicarCambios12(paso.cambios);
        actualizarDisplay12();
    }
}

function resolverCompleto12() {
    for (let i = 1; i < PROBLEMA_LOGICO_12.pasos.length; i++) {
        aplicarCambios12(PROBLEMA_LOGICO_12.pasos[i].cambios);
    }
    PROBLEMA_LOGICO_12.pasoActual = PROBLEMA_LOGICO_12.pasos.length - 1;
    actualizarDisplay12();
}

function mostrarMatriz12(tipo) {
    document.querySelectorAll('.problema-logico12-container .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.problema-logico12-container .matriz-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`.problema-logico12-container .tab-btn[onclick="mostrarMatriz12('${tipo}')"]`).classList.add('active');
    document.getElementById(`matriz-${tipo}-12`).classList.add('active');
}

function loadProblemaLogico12() {
    const toolContent = document.getElementById('tool-content');
    toolContent.innerHTML = `
        <div class="problema-logico12-container">
            <h1>El Aprendizaje de un Oficio</h1>
            
            <div class="problema-layout">
                <div class="problema-sidebar">
                    <div class="control-panel">
                        <h3><i class="fas fa-tools"></i> Controles</h3>
                        <div class="control-buttons">
                            <button class="btn-control btn-reiniciar" onclick="reiniciar12()">
                                <i class="fas fa-refresh"></i> Reiniciar
                            </button>
                            <button id="btn-siguiente-12" class="btn-control btn-siguiente" onclick="siguientePaso12()">
                                <i class="fas fa-arrow-right"></i> Siguiente
                            </button>
                            <button id="btn-resolver-12" class="btn-control btn-resolver" onclick="resolverCompleto12()">
                                <i class="fas fa-check-double"></i> Resolver Todo
                            </button>
                        </div>
                    </div>
                    
                    <div class="enunciado-panel">
                        <h3>Enunciado</h3>
                        <p>El señor García y otros dos especialistas trabajan en ramas diferentes. Cada uno tiene un hijo al que enseña su propio oficio, pero los chicos han expresado su deseo de aprender algo de los otros dos. El año pasado, cada chico trabajó como aprendiz con uno de los otros dos hombres en julio y con el segundo en agosto.</p>
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
                        <h2 id="titulo-paso-12"></h2>
                        <div id="descripcion-paso-12" class="descripcion-paso"></div>
                    </div>
                    
                    <div class="matrices-container">
                        <div class="matriz-tab">
                            <div class="tab-buttons">
                                <button class="tab-btn active" onclick="mostrarMatriz12('padre-nombre')">Padre - Nombre</button>
                                <button class="tab-btn" onclick="mostrarMatriz12('padre-profesion')">Padre - Profesión</button>
                                <button class="tab-btn" onclick="mostrarMatriz12('padre-hijo')">Padre - Hijo</button>
                                <button class="tab-btn" onclick="mostrarMatriz12('hijo-julio')">Hijo - Aprendiz Julio</button>
                                <button class="tab-btn" onclick="mostrarMatriz12('hijo-agosto')">Hijo - Aprendiz Agosto</button>
                            </div>
                            <div class="tab-content">
                                <div id="matriz-padre-nombre-12" class="matriz-content active"></div>
                                <div id="matriz-padre-profesion-12" class="matriz-content"></div>
                                <div id="matriz-padre-hijo-12" class="matriz-content"></div>
                                <div id="matriz-hijo-julio-12" class="matriz-content"></div>
                                <div id="matriz-hijo-agosto-12" class="matriz-content"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="solucion-final-12" class="solucion-final-container"></div>
                </div>
            </div>
        </div>
    `;
    
    inicializarMatrices12();
    actualizarDisplay12();
}

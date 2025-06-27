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
    document.getElementById('pl12-descripcion-paso').innerHTML = `<strong>Paso ${PROBLEMA_LOGICO_12.pasoActual + 1}: ${paso.titulo}</strong><br>${paso.descripcion}`;
    
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
    let html = '<table class="logic-grid"><thead><tr><th></th>';
    
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
            let claseCSS = '';
            let contenido = '';
            
            if (valor === "•") {
                claseCSS = 'yes';
                contenido = '';
            } else if (valor === "X") {
                claseCSS = 'no';
                contenido = '';
            } else {
                contenido = valor;
            }
            
            html += `<td class="${claseCSS}" data-valor="${valor}">${contenido}</td>`;
        }
        html += '</tr>';
    }
    
    html += '</tbody></table>';
    document.getElementById(`matriz-${tipo}-12`).innerHTML = html;
}

function mostrarSolucionFinal12() {
    let solucion = `
        <div class="solution-panel">
            <h3>🎉 ¡Problema Resuelto!</h3>
            <div class="solution-grid">
    `;
    
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
            <div class="solution-item">
                <h4>${profesion}</h4>
                <p><strong>${nombre} ${padre}</strong></p>
                <p>Hijo: ${hijo}</p>
                <p>Aprendices: ${aprendizJulio} (jul), ${aprendizAgosto} (ago)</p>
            </div>
        `;
    }
    
    solucion += `
            </div>
        </div>
    `;
    
    const solucionDiv = document.getElementById('solucion-final-12');
    solucionDiv.innerHTML = solucion;
    solucionDiv.style.display = 'block';
}

function reiniciar12() {
    PROBLEMA_LOGICO_12.pasoActual = 0;
    inicializarMatrices12();
    actualizarDisplay12();
    
    const solucionDiv = document.getElementById('solucion-final-12');
    solucionDiv.style.display = 'none';
    solucionDiv.innerHTML = '';
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
    // Desactivar todos los botones de pestaña
    document.querySelectorAll('.problema-logico-12 .tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ocultar todo el contenido de pestañas
    document.querySelectorAll('.problema-logico-12 .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activar el botón y contenido correspondiente
    const activeBtn = document.querySelector(`.problema-logico-12 .tab-button[data-tab="${tipo}"]`);
    if (activeBtn) activeBtn.classList.add('active');
    
    const activeContent = document.getElementById(`matriz-${tipo}-12`);
    if (activeContent) activeContent.classList.add('active');
}

function setupTabListeners12() {
    document.querySelectorAll('.problema-logico-12 .tab-button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tab = e.target.dataset.tab || e.target.closest('.tab-button').dataset.tab;
            if (tab) mostrarMatriz12(tab);
        });
    });
}

function loadProblemaLogico12() {
    const toolContent = document.getElementById('tool-content');
    toolContent.innerHTML = `
        <div class="problema-logico-12">
            <h1 class="main-title">El Aprendizaje de un Oficio - Problema Lógico 12</h1>
            
            <div class="layout-container">
                <div class="sidebar-panel">
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
                    
                    <div class="problema-info">
                        <h4><i class="fas fa-info-circle"></i> Enunciado</h4>
                        <p>El señor García y otros dos especialistas trabajan en ramas diferentes. Cada uno tiene un hijo al que enseña su propio oficio, pero los chicos han expresado su deseo de aprender algo de los otros dos. El año pasado, cada chico trabajó como aprendiz con uno de los otros dos hombres en julio y con el segundo en agosto.</p>
                    </div>
                    
                    <div class="problema-info">
                        <h4><i class="fas fa-lightbulb"></i> Pistas</h4>
                        <ul>
                            <li><strong>P1:</strong> Pepe trabajó con el electricista en julio y con Carlos en agosto.</li>
                            <li><strong>P2:</strong> Paco, cuyo apellido no es Benítez, no trabajó con el mecánico durante el verano.</li>
                            <li><strong>P3:</strong> El señor Vidal no es carpintero ni su nombre de pila es Carlos.</li>
                            <li><strong>P4:</strong> El chico llamado Santi no trabajó con Antonio en agosto.</li>
                        </ul>
                        <p><em>Nota: Uno de los seis se llama Pedro.</em></p>
                    </div>
                </div>
                
                <div class="main-content">
                    <div class="paso-descripcion">
                        <div id="pl12-descripcion-paso">
                            <strong>Estado Inicial:</strong><br>
                            3 padres con apellidos, 3 nombres, 3 profesiones, 3 hijos. Haga clic en "Siguiente" para comenzar el análisis paso a paso.
                        </div>
                    </div>
                    
                    <div class="matrices-tabs">
                        <div class="tab-buttons">
                            <button class="tab-button active" data-tab="padre-nombre">
                                <i class="fas fa-user"></i> Padre - Nombre
                            </button>
                            <button class="tab-button" data-tab="padre-profesion">
                                <i class="fas fa-briefcase"></i> Padre - Profesión
                            </button>
                            <button class="tab-button" data-tab="padre-hijo">
                                <i class="fas fa-users"></i> Padre - Hijo
                            </button>
                            <button class="tab-button" data-tab="hijo-julio">
                                <i class="fas fa-calendar-alt"></i> Hijo - Aprendiz Julio
                            </button>
                            <button class="tab-button" data-tab="hijo-agosto">
                                <i class="fas fa-calendar"></i> Hijo - Aprendiz Agosto
                            </button>
                        </div>
                        
                        <div class="matriz-container">
                            <div id="matriz-padre-nombre-12" class="tab-content active"></div>
                            <div id="matriz-padre-profesion-12" class="tab-content"></div>
                            <div id="matriz-padre-hijo-12" class="tab-content"></div>
                            <div id="matriz-hijo-julio-12" class="tab-content"></div>
                            <div id="matriz-hijo-agosto-12" class="tab-content"></div>
                        </div>
                    </div>
                    
                    <div id="solucion-final-12" class="solucion-final" style="display: none;"></div>
                </div>
            </div>
        </div>
    `;
    
    inicializarMatrices12();
    actualizarDisplay12();
    
    // Configurar event listeners para las pestañas
    setupTabListeners12();
    
    // Actualizar menú
    document.querySelectorAll('#sidebar button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const menuButton = document.querySelector('button[onclick="app.loadTool(\'problemaLogico12\')"]');
    if (menuButton) {
        menuButton.classList.add('active');
    }
}

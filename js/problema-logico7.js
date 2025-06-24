// Problema Lógico Siete: Partido de Fútbol
// Basado en la aplicación Shiny proporcionada

// Datos del problema
const PROBLEMA_LOGICO_7 = {
    personas: ["Pepe", "Dora", "Hugo", "Lola", "Alba"],
    apellidos: ["Alba", "Beltrán", "García", "Moreno"],
    profesiones: ["Contratista", "Dentista", "Programador", "Estadístico"],
    equipos: ["Celta", "Valencia"],
    
    // Matrices de deducción
    matrices: {
        nombreApellido: null,
        nombreProfesion: null,
        nombreEquipo: null
    },
    
    pasoActual: 0,
    
    // Pasos de la solución
    pasos: [
        {
            titulo: "Estado Inicial",
            descripcion: "Anfitrión Pepe. Invitados: Dora, Hugo, Lola, Alba. Apellidos a asignar: Beltrán, García, Moreno, y el de Pepe (Alba).",
            cambios: []
        },
        {
            titulo: "Pistas 4, 5 y 2 (Equipos)",
            descripcion: "- Moreno es hincha del Celta (P4)<br>- Lola y Alba son hinchas del Celta (P5)<br>- Hugo es hincha del Valencia (P2)",
            cambios: [
                { matriz: "nombreEquipo", fila: "Dora", columna: "Celta", valor: "•" },
                { matriz: "nombreEquipo", fila: "Lola", columna: "Celta", valor: "•" },
                { matriz: "nombreEquipo", fila: "Alba", columna: "Celta", valor: "•" },
                { matriz: "nombreEquipo", fila: "Hugo", columna: "Valencia", valor: "•" }
            ]
        },
        {
            titulo: "Deducción de Apellidos",
            descripcion: "- Alba es el apellido de Pepe<br>- Moreno es el apellido de Dora<br>- Hugo no se apellida García (P2), entonces Hugo = Beltrán<br>- Lola = García (por eliminación)",
            cambios: [
                { matriz: "nombreApellido", fila: "Pepe", columna: "Alba", valor: "•" },
                { matriz: "nombreApellido", fila: "Dora", columna: "Moreno", valor: "•" },
                { matriz: "nombreApellido", fila: "Hugo", columna: "García", valor: "X" },
                { matriz: "nombreApellido", fila: "Hugo", columna: "Beltrán", valor: "•" },
                { matriz: "nombreApellido", fila: "Lola", columna: "García", valor: "•" }
            ]
        },
        {
            titulo: "Pistas 1 y 7 (Contratista)",
            descripcion: "- Ni Dora ni Pepe son contratistas (P1)<br>- Lola García no es contratista (P7)<br>- Por tanto, Hugo es el contratista",
            cambios: [
                { matriz: "nombreProfesion", fila: "Dora", columna: "Contratista", valor: "X" },
                { matriz: "nombreProfesion", fila: "Pepe", columna: "Contratista", valor: "X" },
                { matriz: "nombreProfesion", fila: "Lola", columna: "Contratista", valor: "X" },
                { matriz: "nombreProfesion", fila: "Hugo", columna: "Contratista", valor: "•" }
            ]
        },
        {
            titulo: "Pista 6 (Programador)",
            descripcion: "- El programador fue el último en marcharse<br>- No pudo ser Pepe (anfitrión) ni Dora (se marchó antes)<br>- El programador es Lola García",
            cambios: [
                { matriz: "nombreProfesion", fila: "Pepe", columna: "Programador", valor: "X" },
                { matriz: "nombreProfesion", fila: "Dora", columna: "Programador", valor: "X" },
                { matriz: "nombreProfesion", fila: "Lola", columna: "Programador", valor: "•" }
            ]
        },
        {
            titulo: "Pista 3 y Profesiones Restantes",
            descripcion: "- Dora no es dentista (P3)<br>- Dora no es Contratista, Programador, ni Dentista → Dora = Estadístico<br>- Pepe es Dentista (por eliminación)",
            cambios: [
                { matriz: "nombreProfesion", fila: "Dora", columna: "Dentista", valor: "X" },
                { matriz: "nombreProfesion", fila: "Dora", columna: "Estadístico", valor: "•" },
                { matriz: "nombreProfesion", fila: "Pepe", columna: "Dentista", valor: "•" }
            ]
        },
        {
            titulo: "Solución Final",
            descripcion: "- Pepe Alba: Dentista<br>- Hugo Beltrán: Contratista, hincha del Valencia<br>- Lola García: Programadora, hincha del Celta<br>- Dora Moreno: Estadística, hincha del Celta<br>- Alba: hincha del Celta",
            cambios: []
        }
    ]
};

// Funciones auxiliares
function inicializarMatrices7() {
    const { personas, apellidos, profesiones, equipos } = PROBLEMA_LOGICO_7;
    
    // Matriz Nombre-Apellido
    PROBLEMA_LOGICO_7.matrices.nombreApellido = crearMatriz(personas, apellidos);
    
    // Matriz Nombre-Profesión
    PROBLEMA_LOGICO_7.matrices.nombreProfesion = crearMatriz(personas, profesiones);
    
    // Matriz Nombre-Equipo
    PROBLEMA_LOGICO_7.matrices.nombreEquipo = crearMatriz(personas, equipos);
}

function crearMatriz(filas, columnas) {
    const matriz = {};
    for (let fila of filas) {
        matriz[fila] = {};
        for (let columna of columnas) {
            matriz[fila][columna] = "";
        }
    }
    return matriz;
}

function marcarXesAutomatico7(matriz, filaSeleccionada, columnaSeleccionada) {
    // Marcar X en el resto de la fila
    for (let col in matriz[filaSeleccionada]) {
        if (col !== columnaSeleccionada && matriz[filaSeleccionada][col] === "") {
            matriz[filaSeleccionada][col] = "X";
        }
    }
    
    // Marcar X en el resto de la columna
    for (let fila in matriz) {
        if (fila !== filaSeleccionada && matriz[fila][columnaSeleccionada] === "") {
            matriz[fila][columnaSeleccionada] = "X";
        }
    }
}

function aplicarCambios7(cambios) {
    for (let cambio of cambios) {
        const matriz = PROBLEMA_LOGICO_7.matrices[cambio.matriz];
        if (matriz && matriz[cambio.fila] && matriz[cambio.fila].hasOwnProperty(cambio.columna)) {
            matriz[cambio.fila][cambio.columna] = cambio.valor;
            
            if (cambio.valor === "•") {
                marcarXesAutomatico7(matriz, cambio.fila, cambio.columna);
            }
        }
    }
}

function renderizarMatriz7(matriz, nombre) {
    if (!matriz) return '<p>Matriz no disponible</p>';
    
    let html = `<div class="matrix-container">
        <h4>${nombre}</h4>
        <table class="matrix-table">
            <thead>
                <tr>
                    <th></th>`;
    
    // Encabezados de columnas
    const columnas = Object.keys(Object.values(matriz)[0]);
    for (let col of columnas) {
        html += `<th>${col}</th>`;
    }
    html += '</tr></thead><tbody>';
    
    // Filas de datos
    for (let fila in matriz) {
        html += `<tr><th>${fila}</th>`;
        for (let col of columnas) {
            const valor = matriz[fila][col];
            let clase = '';
            if (valor === 'X') clase = 'cell-x';
            else if (valor === '•') clase = 'cell-dot';
            
            html += `<td class="${clase}">${valor}</td>`;
        }
        html += '</tr>';
    }
    
    html += '</tbody></table></div>';
    return html;
}

function actualizarDisplay7() {
    const paso = PROBLEMA_LOGICO_7.pasos[PROBLEMA_LOGICO_7.pasoActual];
    
    // Actualizar título del paso
    document.getElementById('titulo-paso-7').innerHTML = `<strong>Paso ${PROBLEMA_LOGICO_7.pasoActual + 1}:</strong> ${paso.titulo}`;
    
    // Actualizar descripción
    document.getElementById('descripcion-paso-7').innerHTML = paso.descripcion;
    
    // Actualizar matrices
    document.getElementById('matriz-nombre-apellido-7').innerHTML = 
        renderizarMatriz7(PROBLEMA_LOGICO_7.matrices.nombreApellido, 'Nombre - Apellido');
    
    document.getElementById('matriz-nombre-profesion-7').innerHTML = 
        renderizarMatriz7(PROBLEMA_LOGICO_7.matrices.nombreProfesion, 'Nombre - Profesión');
    
    document.getElementById('matriz-nombre-equipo-7').innerHTML = 
        renderizarMatriz7(PROBLEMA_LOGICO_7.matrices.nombreEquipo, 'Nombre - Equipo');
    
    // Actualizar botones
    document.getElementById('btn-anterior-7').disabled = PROBLEMA_LOGICO_7.pasoActual === 0;
    document.getElementById('btn-siguiente-7').disabled = PROBLEMA_LOGICO_7.pasoActual === PROBLEMA_LOGICO_7.pasos.length - 1;
    
    // Mostrar solución final si es el último paso
    if (PROBLEMA_LOGICO_7.pasoActual === PROBLEMA_LOGICO_7.pasos.length - 1) {
        document.getElementById('solucion-final-7').innerHTML = `
            <div class="solucion-final">
                <h4>Solución Final:</h4>
                <ul>
                    <li><strong>Pepe Alba:</strong> Dentista</li>
                    <li><strong>Hugo Beltrán:</strong> Contratista, hincha del Valencia</li>
                    <li><strong>Lola García:</strong> Programadora, hincha del Celta</li>
                    <li><strong>Dora Moreno:</strong> Estadística, hincha del Celta</li>
                    <li><strong>Alba:</strong> hincha del Celta (apellido y profesión no determinados)</li>
                </ul>
            </div>
        `;
    } else {
        document.getElementById('solucion-final-7').innerHTML = '';
    }
}

// Funciones de control
function reiniciarProblema7() {
    PROBLEMA_LOGICO_7.pasoActual = 0;
    inicializarMatrices7();
    actualizarDisplay7();
}

function siguientePaso7() {
    if (PROBLEMA_LOGICO_7.pasoActual < PROBLEMA_LOGICO_7.pasos.length - 1) {
        PROBLEMA_LOGICO_7.pasoActual++;
        const paso = PROBLEMA_LOGICO_7.pasos[PROBLEMA_LOGICO_7.pasoActual];
        aplicarCambios7(paso.cambios);
        actualizarDisplay7();
    }
}

function pasoAnterior7() {
    if (PROBLEMA_LOGICO_7.pasoActual > 0) {
        PROBLEMA_LOGICO_7.pasoActual--;
        // Reconstruir matrices desde el inicio hasta el paso actual
        inicializarMatrices7();
        for (let i = 1; i <= PROBLEMA_LOGICO_7.pasoActual; i++) {
            aplicarCambios7(PROBLEMA_LOGICO_7.pasos[i].cambios);
        }
        actualizarDisplay7();
    }
}

function resolverCompleto7() {
    PROBLEMA_LOGICO_7.pasoActual = PROBLEMA_LOGICO_7.pasos.length - 1;
    inicializarMatrices7();
    for (let i = 1; i < PROBLEMA_LOGICO_7.pasos.length; i++) {
        aplicarCambios7(PROBLEMA_LOGICO_7.pasos[i].cambios);
    }
    actualizarDisplay7();
}

// Función para cargar el problema
function loadProblemaLogico7() {
    const toolContent = document.getElementById('tool-content');
    toolContent.innerHTML = `
        <div class="problema-logico-7-container">
            <h1>Problema Lógico Siete: Partido de Fútbol</h1>
            
            <div class="problema-layout">
                <div class="problema-sidebar">
                    <div class="control-panel">
                        <h3>Controles</h3>
                        <div class="control-buttons">
                            <button id="btn-reiniciar-7" class="btn-control btn-reiniciar" onclick="reiniciarProblema7()">
                                <i class="fas fa-refresh"></i> Reiniciar
                            </button>
                            <button id="btn-anterior-7" class="btn-control btn-anterior" onclick="pasoAnterior7()">
                                <i class="fas fa-arrow-left"></i> Anterior
                            </button>
                            <button id="btn-siguiente-7" class="btn-control btn-siguiente" onclick="siguientePaso7()">
                                <i class="fas fa-arrow-right"></i> Siguiente
                            </button>
                            <button id="btn-resolver-7" class="btn-control btn-resolver" onclick="resolverCompleto7()">
                                <i class="fas fa-check-double"></i> Resolver Todo
                            </button>
                        </div>
                    </div>
                    
                    <div class="enunciado-panel">
                        <h3>Enunciado</h3>
                        <p>Cuatro amigos, incluido Pepe (el anfitrión), se reúnen para ver un partido Celta vs Valencia. Hay que determinar el apellido de cada hincha (uno es Beltrán), sus profesiones (uno es especialista en estadística), y quién es hincha de qué equipo.</p>
                    </div>
                    
                    <div class="pistas-panel">
                        <h3>Pistas</h3>
                        <ul>
                            <li><strong>Pista 1:</strong> Dos de los invitados de Pepe son Dora y el contratista de obras.</li>
                            <li><strong>Pista 2:</strong> Hugo, cuyo apellido no es García, es un hincha leal del Valencia.</li>
                            <li><strong>Pista 3:</strong> Dora no es dentista.</li>
                            <li><strong>Pista 4:</strong> Moreno, hincha apasionado del Celta, se marchó a su casa antes de que terminase el partido.</li>
                            <li><strong>Pista 5:</strong> Lola y Alba se sintieron encantados al ver que el Celta ganaba el partido con un gol en los últimos segundos.</li>
                            <li><strong>Pista 6:</strong> El programador (o la programadora) fue el último en marcharse a casa.</li>
                            <li><strong>Pista 7:</strong> García no es el contratista de obras.</li>
                        </ul>
                    </div>
                </div>
                
                <div class="problema-main">
                    <div class="paso-info">
                        <h2 id="titulo-paso-7"></h2>
                        <div id="descripcion-paso-7" class="descripcion-paso"></div>
                    </div>
                    
                    <div class="matrices-container">
                        <div class="matriz-tab">
                            <div class="tab-buttons">
                                <button class="tab-btn active" onclick="mostrarMatriz7('nombre-apellido')">Nombre - Apellido</button>
                                <button class="tab-btn" onclick="mostrarMatriz7('nombre-profesion')">Nombre - Profesión</button>
                                <button class="tab-btn" onclick="mostrarMatriz7('nombre-equipo')">Nombre - Equipo</button>
                            </div>
                            <div class="tab-content">
                                <div id="matriz-nombre-apellido-7" class="matriz-content active"></div>
                                <div id="matriz-nombre-profesion-7" class="matriz-content"></div>
                                <div id="matriz-nombre-equipo-7" class="matriz-content"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="solucion-final-7" class="solucion-final-container"></div>
                </div>
            </div>
        </div>
    `;
    
    // Inicializar el problema
    inicializarMatrices7();
    actualizarDisplay7();
}

// Función para cambiar entre matrices
function mostrarMatriz7(tipo) {
    // Remover clase active de todos los botones
    document.querySelectorAll('.problema-logico-7-container .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Remover clase active de todos los contenidos
    document.querySelectorAll('.problema-logico-7-container .matriz-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activar botón y contenido correspondiente
    document.querySelector(`.problema-logico-7-container .tab-btn[onclick="mostrarMatriz7('${tipo}')"]`).classList.add('active');
    document.getElementById(`matriz-${tipo}-7`).classList.add('active');
}

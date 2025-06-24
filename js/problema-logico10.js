// Problema Lógico Diez: Las Vacaciones
// Basado en la aplicación Shiny proporcionada

const PROBLEMA_LOGICO_10 = {
    parejas: ["Aldrich", "Harrison", "Johnson", "Jones", "Wilson"],
    destinos: ["Alaska", "Canadá", "Nueva Inglaterra", "Oregón", "Yellowstone"],
    formas_vacaciones: ["Camping", "Tienda", "Crucero", "Caravana", "Remolque"],
    
    matrices: {
        ParejaDestino: null,
        ParejaForma: null,
        DestinoForma: null
    },
    
    pasoActual: 0,
    
    pasos: [
        {
            titulo: "Estado Inicial",
            descripcion: "5 parejas, 5 destinos, 5 formas de vacacionar.",
            cambios: []
        },
        {
            titulo: "Pistas 1, 5 y 6 (Formas)",
            descripcion: "Jones y Yellowstone-viajero NO usaron Caravana ni Remolque. Wilson NO usó Caravana ni Remolque. Johnson NO usó Tienda, Caravana, ni Remolque.",
            cambios: [
                {matriz: "ParejaForma", fila: "Jones", col: "Caravana", valor: "X"},
                {matriz: "ParejaForma", fila: "Jones", col: "Remolque", valor: "X"},
                {matriz: "DestinoForma", fila: "Yellowstone", col: "Caravana", valor: "X"},
                {matriz: "DestinoForma", fila: "Yellowstone", col: "Remolque", valor: "X"},
                {matriz: "ParejaForma", fila: "Wilson", col: "Caravana", valor: "X"},
                {matriz: "ParejaForma", fila: "Wilson", col: "Remolque", valor: "X"},
                {matriz: "ParejaForma", fila: "Johnson", col: "Tienda", valor: "X"},
                {matriz: "ParejaForma", fila: "Johnson", col: "Caravana", valor: "X"},
                {matriz: "ParejaForma", fila: "Johnson", col: "Remolque", valor: "X"}
            ]
        },
        {
            titulo: "Pista 3 y Deducción (Formas)",
            descripcion: "Aldrich NO usó Remolque. Jones, Johnson, Wilson, Aldrich no usaron Remolque. Por tanto, Harrison usó Remolque. Aldrich usó Caravana.",
            cambios: [
                {matriz: "ParejaForma", fila: "Aldrich", col: "Remolque", valor: "X"},
                {matriz: "ParejaForma", fila: "Harrison", col: "Remolque", valor: "•"},
                {matriz: "ParejaForma", fila: "Aldrich", col: "Caravana", valor: "•"}
            ]
        },
        {
            titulo: "Pistas 2, 1 y 5 (Destinos Alaska)",
            descripcion: "Caravana (Aldrich) y Remolque (Harrison) NO fueron a Alaska. Jones NO fue a Alaska. Johnson NO fue a Alaska.",
            cambios: [
                {matriz: "ParejaDestino", fila: "Aldrich", col: "Alaska", valor: "X"},
                {matriz: "ParejaDestino", fila: "Harrison", col: "Alaska", valor: "X"},
                {matriz: "ParejaDestino", fila: "Jones", col: "Alaska", valor: "X"},
                {matriz: "ParejaDestino", fila: "Johnson", col: "Alaska", valor: "X"}
            ]
        },
        {
            titulo: "Deducción (Wilson a Alaska)",
            descripcion: "Aldrich, Harrison, Jones, Johnson no fueron a Alaska. Por tanto, Wilson fue a Alaska.",
            cambios: [
                {matriz: "ParejaDestino", fila: "Wilson", col: "Alaska", valor: "•"}
            ]
        },
        {
            titulo: "Pistas 3 y 4 (Destinos)",
            descripcion: "Aldrich NO fue a Oregón. Harrison (Remolque) NO fue a Oregón. Aldrich (Caravana) NO fue a Nueva Inglaterra.",
            cambios: [
                {matriz: "ParejaDestino", fila: "Aldrich", col: "Oregón", valor: "X"},
                {matriz: "ParejaDestino", fila: "Harrison", col: "Oregón", valor: "X"},
                {matriz: "ParejaDestino", fila: "Aldrich", col: "Nueva Inglaterra", valor: "X"}
            ]
        },
        {
            titulo: "Deducción (Aldrich y Harrison Destinos)",
            descripcion: "Yellowstone NO fue Caravana (Aldrich). Entonces Aldrich fue a Canadá. Yellowstone NO fue Remolque (Harrison). Entonces Harrison fue a Nueva Inglaterra.",
            cambios: [
                {matriz: "DestinoForma", fila: "Yellowstone", col: "Caravana", valor: "X"},
                {matriz: "ParejaDestino", fila: "Aldrich", col: "Canadá", valor: "•"},
                {matriz: "DestinoForma", fila: "Yellowstone", col: "Remolque", valor: "X"},
                {matriz: "ParejaDestino", fila: "Harrison", col: "Nueva Inglaterra", valor: "•"}
            ]
        },
        {
            titulo: "Deducción (Johnson y Jones Destinos)",
            descripcion: "Jones no fue a Yellowstone (P1). Entonces Jones fue a Oregón. Por eliminación, Johnson fue a Yellowstone.",
            cambios: [
                {matriz: "ParejaDestino", fila: "Jones", col: "Yellowstone", valor: "X"},
                {matriz: "ParejaDestino", fila: "Jones", col: "Oregón", valor: "•"},
                {matriz: "ParejaDestino", fila: "Johnson", col: "Yellowstone", valor: "•"}
            ]
        },
        {
            titulo: "Pista 7 (Crucero y Tienda)",
            descripcion: "Oregón (Jones) y Yellowstone (Johnson) NO hicieron Crucero. Tienda NO fue a Yellowstone (Johnson).",
            cambios: [
                {matriz: "DestinoForma", fila: "Oregón", col: "Crucero", valor: "X"},
                {matriz: "DestinoForma", fila: "Yellowstone", col: "Crucero", valor: "X"},
                {matriz: "DestinoForma", fila: "Yellowstone", col: "Tienda", valor: "X"}
            ]
        },
        {
            titulo: "Deducción Final (Formas)",
            descripcion: "Wilson hizo Crucero (Alaska-Crucero). Johnson usó Camping (Yellowstone-Camping). Jones usó Tienda (Oregón-Tienda).",
            cambios: [
                {matriz: "ParejaForma", fila: "Wilson", col: "Crucero", valor: "•"},
                {matriz: "ParejaForma", fila: "Johnson", col: "Camping", valor: "•"},
                {matriz: "ParejaForma", fila: "Jones", col: "Tienda", valor: "•"}
            ]
        },
        {
            titulo: "¡Problema Resuelto!",
            descripcion: "Todas las asignaciones completas.",
            cambios: []
        }
    ]
};

function inicializarMatrices10() {
    const { parejas, destinos, formas_vacaciones } = PROBLEMA_LOGICO_10;
    
    PROBLEMA_LOGICO_10.matrices.ParejaDestino = crearMatriz10(parejas, destinos);
    PROBLEMA_LOGICO_10.matrices.ParejaForma = crearMatriz10(parejas, formas_vacaciones);
    PROBLEMA_LOGICO_10.matrices.DestinoForma = crearMatriz10(destinos, formas_vacaciones);
}

function crearMatriz10(filas, columnas) {
    const matriz = {};
    for (let fila of filas) {
        matriz[fila] = {};
        for (let columna of columnas) {
            matriz[fila][columna] = "";
        }
    }
    return matriz;
}

function marcarXesAutomatico10(matriz, filaSeleccionada, columnaSeleccionada) {
    for (let col in matriz[filaSeleccionada]) {
        if (col !== columnaSeleccionada && matriz[filaSeleccionada][col] === "") {
            matriz[filaSeleccionada][col] = "X";
        }
    }
    for (let fila in matriz) {
        if (fila !== filaSeleccionada && matriz[fila][columnaSeleccionada] === "") {
            matriz[fila][columnaSeleccionada] = "X";
        }
    }
}

function propagarMatrices10(mats) {
    let cambioRealizado = true;
    let iteraciones = 0;
    const maxIteraciones = 10;
    
    while (cambioRealizado && iteraciones < maxIteraciones) {
        cambioRealizado = false;
        iteraciones++;
        
        // Pareja-Destino + Pareja-Forma => Destino-Forma
        for (let p of PROBLEMA_LOGICO_10.parejas) {
            for (let d of PROBLEMA_LOGICO_10.destinos) {
                if (mats.ParejaDestino[p][d] === "•") {
                    for (let f of PROBLEMA_LOGICO_10.formas_vacaciones) {
                        if (mats.ParejaForma[p][f] === "•") {
                            if (mats.DestinoForma[d][f] === "") {
                                mats.DestinoForma[d][f] = "•";
                                marcarXesAutomatico10(mats.DestinoForma, d, f);
                                cambioRealizado = true;
                            }
                        }
                    }
                }
            }
        }
        
        // Pareja-Destino + Destino-Forma => Pareja-Forma
        for (let p of PROBLEMA_LOGICO_10.parejas) {
            for (let d of PROBLEMA_LOGICO_10.destinos) {
                if (mats.ParejaDestino[p][d] === "•") {
                    for (let f of PROBLEMA_LOGICO_10.formas_vacaciones) {
                        if (mats.DestinoForma[d][f] === "•") {
                            if (mats.ParejaForma[p][f] === "") {
                                mats.ParejaForma[p][f] = "•";
                                marcarXesAutomatico10(mats.ParejaForma, p, f);
                                cambioRealizado = true;
                            }
                        }
                    }
                }
            }
        }
        
        // Pareja-Forma + Destino-Forma => Pareja-Destino
        for (let p of PROBLEMA_LOGICO_10.parejas) {
            for (let f of PROBLEMA_LOGICO_10.formas_vacaciones) {
                if (mats.ParejaForma[p][f] === "•") {
                    for (let d of PROBLEMA_LOGICO_10.destinos) {
                        if (mats.DestinoForma[d][f] === "•") {
                            if (mats.ParejaDestino[p][d] === "") {
                                mats.ParejaDestino[p][d] = "•";
                                marcarXesAutomatico10(mats.ParejaDestino, p, d);
                                cambioRealizado = true;
                            }
                        }
                    }
                }
            }
        }
    }
    
    return mats;
}

function aplicarCambios10(cambios) {
    for (let cambio of cambios) {
        const matriz = PROBLEMA_LOGICO_10.matrices[cambio.matriz];
        if (matriz && matriz[cambio.fila] && matriz[cambio.fila].hasOwnProperty(cambio.col)) {
            matriz[cambio.fila][cambio.col] = cambio.valor;
            
            if (cambio.valor === "•") {
                marcarXesAutomatico10(matriz, cambio.fila, cambio.col);
            }
        }
    }
    
    // Propagar cambios entre matrices
    PROBLEMA_LOGICO_10.matrices = propagarMatrices10(PROBLEMA_LOGICO_10.matrices);
}

function renderizarMatriz10(matriz, nombre) {
    if (!matriz) return '<p>Matriz no disponible</p>';
    
    let html = `<div class="matrix-container">
        <h4>${nombre}</h4>
        <table class="matrix-table">
            <thead>
                <tr>
                    <th></th>`;
    
    const columnas = Object.keys(Object.values(matriz)[0]);
    for (let col of columnas) {
        html += `<th>${col}</th>`;
    }
    html += '</tr></thead><tbody>';
    
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

function actualizarDisplay10() {
    const paso = PROBLEMA_LOGICO_10.pasos[PROBLEMA_LOGICO_10.pasoActual];
    
    document.getElementById('titulo-paso-10').innerHTML = `<strong>Paso ${PROBLEMA_LOGICO_10.pasoActual + 1}:</strong> ${paso.titulo}`;
    document.getElementById('descripcion-paso-10').innerHTML = paso.descripcion;
    
    document.getElementById('matriz-pareja-destino-10').innerHTML = 
        renderizarMatriz10(PROBLEMA_LOGICO_10.matrices.ParejaDestino, 'Pareja - Destino');
    
    document.getElementById('matriz-pareja-forma-10').innerHTML = 
        renderizarMatriz10(PROBLEMA_LOGICO_10.matrices.ParejaForma, 'Pareja - Forma Vacaciones');
    
    document.getElementById('matriz-destino-forma-10').innerHTML = 
        renderizarMatriz10(PROBLEMA_LOGICO_10.matrices.DestinoForma, 'Destino - Forma Vacaciones');
    
    document.getElementById('btn-anterior-10').disabled = PROBLEMA_LOGICO_10.pasoActual === 0;
    document.getElementById('btn-siguiente-10').disabled = PROBLEMA_LOGICO_10.pasoActual === PROBLEMA_LOGICO_10.pasos.length - 1;
    
    if (PROBLEMA_LOGICO_10.pasoActual === PROBLEMA_LOGICO_10.pasos.length - 1) {
        document.getElementById('solucion-final-10').innerHTML = `
            <div class="solucion-final">
                <h4>Solución Final:</h4>
                <ul>
                    <li><strong>Aldrich:</strong> Canadá, caravana</li>
                    <li><strong>Harrison:</strong> Nueva Inglaterra, remolque</li>
                    <li><strong>Johnson:</strong> Yellowstone, camping</li>
                    <li><strong>Jones:</strong> Oregón, tienda</li>
                    <li><strong>Wilson:</strong> Alaska, crucero</li>
                </ul>
            </div>
        `;
    } else {
        document.getElementById('solucion-final-10').innerHTML = '';
    }
}

function reiniciarProblema10() {
    PROBLEMA_LOGICO_10.pasoActual = 0;
    inicializarMatrices10();
    actualizarDisplay10();
}

function siguientePaso10() {
    if (PROBLEMA_LOGICO_10.pasoActual < PROBLEMA_LOGICO_10.pasos.length - 1) {
        PROBLEMA_LOGICO_10.pasoActual++;
        const paso = PROBLEMA_LOGICO_10.pasos[PROBLEMA_LOGICO_10.pasoActual];
        aplicarCambios10(paso.cambios);
        actualizarDisplay10();
    }
}

function pasoAnterior10() {
    if (PROBLEMA_LOGICO_10.pasoActual > 0) {
        PROBLEMA_LOGICO_10.pasoActual--;
        inicializarMatrices10();
        for (let i = 1; i <= PROBLEMA_LOGICO_10.pasoActual; i++) {
            aplicarCambios10(PROBLEMA_LOGICO_10.pasos[i].cambios);
        }
        actualizarDisplay10();
    }
}

function resolverCompleto10() {
    PROBLEMA_LOGICO_10.pasoActual = PROBLEMA_LOGICO_10.pasos.length - 1;
    inicializarMatrices10();
    for (let i = 1; i < PROBLEMA_LOGICO_10.pasos.length; i++) {
        aplicarCambios10(PROBLEMA_LOGICO_10.pasos[i].cambios);
    }
    actualizarDisplay10();
}

function loadProblemaLogico10() {
    const toolContent = document.getElementById('tool-content');
    toolContent.innerHTML = `
        <div class="problema-logico-10-container">
            <h1>Problema Lógico Diez: Las Vacaciones</h1>
            
            <div class="problema-layout">
                <div class="problema-sidebar">
                    <div class="control-panel">
                        <h3>Controles</h3>
                        <div class="control-buttons">
                            <button id="btn-reiniciar-10" class="btn-control btn-reiniciar" onclick="reiniciarProblema10()">
                                <i class="fas fa-refresh"></i> Reiniciar
                            </button>
                            <button id="btn-anterior-10" class="btn-control btn-anterior" onclick="pasoAnterior10()">
                                <i class="fas fa-arrow-left"></i> Anterior
                            </button>
                            <button id="btn-siguiente-10" class="btn-control btn-siguiente" onclick="siguientePaso10()">
                                <i class="fas fa-arrow-right"></i> Siguiente
                            </button>
                            <button id="btn-resolver-10" class="btn-control btn-resolver" onclick="resolverCompleto10()">
                                <i class="fas fa-check-double"></i> Resolver Todo
                            </button>
                        </div>
                    </div>
                    
                    <div class="enunciado-panel">
                        <h3>Enunciado</h3>
                        <p>Los Harrison y otras cuatro parejas (Aldrich, Johnson, Jones, Wilson) pasaron las vacaciones en diversos lugares (uno de ellos Canadá) y de distintas maneras. Una pareja permaneció en un camping, otra acampó en una tienda, y una tercera hizo un crucero. Las caravanas y los remolques se consideran como vehículos de recreo. Objetivo: Determinar dónde fue cada pareja y cómo pasó sus vacaciones.</p>
                    </div>
                    
                    <div class="pistas-panel">
                        <h3>Pistas</h3>
                        <ul>
                            <li><strong>P1:</strong> Ni los Jones -que no visitaron Alaska-, ni la pareja que fue al Parque Nacional de Yellowstone viajaron en vehículos de recreo (Caravana o Remolque).</li>
                            <li><strong>P2:</strong> Ni la pareja que viajó en un remolque ni la que viajó en una caravana visitaron Alaska.</li>
                            <li><strong>P3:</strong> Los Aldrich no forman la pareja que pasó las vacaciones en las montañas de Oregón, ni la que viajó en remolque.</li>
                            <li><strong>P4:</strong> La pareja que viajó en caravana no visitó Nueva Inglaterra; la pareja que viajó en remolque no visitó Oregón.</li>
                            <li><strong>P5:</strong> Los Johnson, que no acamparon en una tienda, no viajaron tampoco ni en caravana ni en remolque, ni visitaron Alaska.</li>
                            <li><strong>P6:</strong> Los Wilson no viajaron en un vehículo de recreo (Caravana o Remolque).</li>
                            <li><strong>P7:</strong> Ni la pareja que fue a Oregón ni la que visitó Yellowstone hicieron un crucero; la pareja de la tienda no fue tampoco a Yellowstone.</li>
                        </ul>
                    </div>
                </div>
                
                <div class="problema-main">
                    <div class="paso-info">
                        <h2 id="titulo-paso-10"></h2>
                        <div id="descripcion-paso-10" class="descripcion-paso"></div>
                    </div>
                    
                    <div class="matrices-container">
                        <div class="matriz-tab">
                            <div class="tab-buttons">
                                <button class="tab-btn active" onclick="mostrarMatriz10('pareja-destino')">Pareja - Destino</button>
                                <button class="tab-btn" onclick="mostrarMatriz10('pareja-forma')">Pareja - Forma Vacaciones</button>
                                <button class="tab-btn" onclick="mostrarMatriz10('destino-forma')">Destino - Forma Vacaciones</button>
                            </div>
                            <div class="tab-content">
                                <div id="matriz-pareja-destino-10" class="matriz-content active"></div>
                                <div id="matriz-pareja-forma-10" class="matriz-content"></div>
                                <div id="matriz-destino-forma-10" class="matriz-content"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="solucion-final-10" class="solucion-final-container"></div>
                </div>
            </div>
        </div>
    `;
    
    inicializarMatrices10();
    actualizarDisplay10();
}

function mostrarMatriz10(tipo) {
    document.querySelectorAll('.problema-logico-10-container .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.problema-logico-10-container .matriz-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`.problema-logico-10-container .tab-btn[onclick="mostrarMatriz10('${tipo}')"]`).classList.add('active');
    document.getElementById(`matriz-${tipo}-10`).classList.add('active');
}

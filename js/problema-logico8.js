// Problema Lógico Ocho: Muestra de Artes y Oficios
// Basado en la aplicación Shiny proporcionada

const PROBLEMA_LOGICO_8 = {
    expositores: ["Isa", "Julia", "Laura", "Marta", "Olivia", "Pedro"],
    artes: ["Vidrio", "Joyas", "Patchwork", "Cerámica", "Telar", "Madera"],
    matrices: {
        ExpositorArte: null,
        Intercambios: null
    },
    pasoActual: 0,
    pasos: [
        {
            titulo: "Estado Inicial",
            descripcion: "Sin asignaciones. Pedro es el único hombre.",
            cambios_arte: [], cambios_inter: []
        },
        {
            titulo: "Pista 5 (Participantes en Intercambios)",
            descripcion: "Cuatro participaron: Julia, Isa, Joyero/a, Patchwork-mujer. Olivia NO participó en ninguno. La Ceramista intercambió con DOS personas distintas.",
            cambios_arte: [],
            cambios_inter: [
                {p1: "Olivia", p2: "Isa", valor: "X"}, {p1: "Olivia", p2: "Julia", valor: "X"},
                {p1: "Olivia", p2: "Laura", valor: "X"}, {p1: "Olivia", p2: "Marta", valor: "X"},
                {p1: "Olivia", p2: "Pedro", valor: "X"},
                {p1: "Isa", p2: "Olivia", valor: "X"}, {p1: "Julia", p2: "Olivia", valor: "X"},
                {p1: "Laura", p2: "Olivia", valor: "X"}, {p1: "Marta", p2: "Olivia", valor: "X"},
                {p1: "Pedro", p2: "Olivia", valor: "X"}
            ]
        },
        {
            titulo: "Deducción (Artes y Pista 5)",
            descripcion: "Olivia no es Ceramista, Joyero, ni Patchwork. Pedro no es ceramista. Marta no hace patchwork. Pedro = Joyas. Marta = Cerámica.",
            cambios_arte: [
                {expositor: "Olivia", arte: "Cerámica", valor: "X"},
                {expositor: "Olivia", arte: "Joyas", valor: "X"},
                {expositor: "Olivia", arte: "Patchwork", valor: "X"},
                {expositor: "Pedro", arte: "Cerámica", valor: "X"},
                {expositor: "Marta", arte: "Patchwork", valor: "X"},
                {expositor: "Pedro", arte: "Joyas", valor: "•"},
                {expositor: "Marta", arte: "Cerámica", valor: "•"}
            ], cambios_inter: []
        },
        {
            titulo: "Deducción (Patchwork y Tejido)",
            descripcion: "Por eliminación, Laura hace patchwork. Ni Julia ni Isa son tejedoras; la tejedora es Olivia.",
            cambios_arte: [
                {expositor: "Laura", arte: "Patchwork", valor: "•"},
                {expositor: "Julia", arte: "Telar", valor: "X"},
                {expositor: "Isa", arte: "Telar", valor: "X"},
                {expositor: "Olivia", arte: "Telar", valor: "•"}
            ], cambios_inter: []
        },
        {
            titulo: "Deducción (Madera y Vidrio)",
            descripcion: "Isa no talla madera. Julia talla madera, e Isa trabaja el vidrio.",
            cambios_arte: [
                {expositor: "Isa", arte: "Madera", valor: "X"},
                {expositor: "Julia", arte: "Madera", valor: "•"},
                {expositor: "Isa", arte: "Vidrio", valor: "•"}
            ], cambios_inter: []
        },
        {
            titulo: "Pista 1 (Intercambio Julia)",
            descripcion: "Julia intentó con Laura (Patchwork) y con Tejedora (Olivia). Se puso de acuerdo con UNA. El intercambio de tejidos de Julia no tuvo lugar con Olivia, que no hizo ningún intercambio. Tuvo lugar con Laura.",
            cambios_arte: [],
            cambios_inter: [
                {p1: "Julia", p2: "Laura", valor: "SI"},
                {p1: "Laura", p2: "Julia", valor: "SI"},
                {p1: "Julia", p2: "Olivia", valor: "NO"}
            ]
        },
        {
            titulo: "Pista 5 (Intercambios Marta - Ceramista)",
            descripcion: "Marta (ceramista) intercambió dos de sus piezas, una con Isa y otra con Pedro.",
            cambios_arte: [],
            cambios_inter: [
                {p1: "Marta", p2: "Isa", valor: "SI"}, {p1: "Isa", p2: "Marta", valor: "SI"},
                {p1: "Marta", p2: "Pedro", valor: "SI"}, {p1: "Pedro", p2: "Marta", valor: "SI"}
            ]
        },
        {
            titulo: "Verificación Intercambios (Pista 5)",
            descripcion: "Julia <-> Laura. Marta <-> Isa. Marta <-> Pedro. Olivia no intercambió con nadie. ¡Problema Resuelto!",
            cambios_arte: [], cambios_inter: []
        }
    ]
};

function inicializarMatrices8() {
    const { expositores, artes } = PROBLEMA_LOGICO_8;
    // Matriz Expositor-Arte
    PROBLEMA_LOGICO_8.matrices.ExpositorArte = crearMatriz8(expositores, artes);
    // Matriz Intercambios (simétrica)
    PROBLEMA_LOGICO_8.matrices.Intercambios = crearMatriz8(expositores, expositores);
    // Diagonal: no se intercambia consigo mismo
    for (let i = 0; i < expositores.length; i++) {
        PROBLEMA_LOGICO_8.matrices.Intercambios[expositores[i]][expositores[i]] = "---";
    }
}

function crearMatriz8(filas, columnas) {
    const matriz = {};
    for (let fila of filas) {
        matriz[fila] = {};
        for (let columna of columnas) {
            matriz[fila][columna] = "";
        }
    }
    return matriz;
}

function marcarXesAutomatico8(matriz, filaSeleccionada, columnaSeleccionada) {
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

function aplicarCambios8(cambios_arte, cambios_inter) {
    // Cambios en artes
    for (let cambio of cambios_arte) {
        const matriz = PROBLEMA_LOGICO_8.matrices.ExpositorArte;
        if (matriz && matriz[cambio.expositor] && matriz[cambio.expositor].hasOwnProperty(cambio.arte)) {
            matriz[cambio.expositor][cambio.arte] = cambio.valor;
            if (cambio.valor === "•") {
                marcarXesAutomatico8(matriz, cambio.expositor, cambio.arte);
            }
        }
    }
    // Cambios en intercambios
    for (let cambio of cambios_inter) {
        const matriz = PROBLEMA_LOGICO_8.matrices.Intercambios;
        if (matriz && matriz[cambio.p1] && matriz[cambio.p1].hasOwnProperty(cambio.p2)) {
            matriz[cambio.p1][cambio.p2] = cambio.valor;
            if (cambio.valor === "SI" && cambio.p1 !== cambio.p2) {
                matriz[cambio.p2][cambio.p1] = "SI";
            }
        }
    }
}

function renderizarMatriz8(matriz, nombre) {
    if (!matriz) return '<p>Matriz no disponible</p>';
    let html = `<div class=\"matrix-container\">
        <h4>${nombre}</h4>
        <table class=\"matrix-table\">
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
            else if (valor === 'SI') clase = 'cell-si';
            else if (valor === 'NO') clase = 'cell-no';
            else if (valor === '---') clase = 'cell-diag';
            html += `<td class=\"${clase}\">${valor}</td>`;
        }
        html += '</tr>';
    }
    html += '</tbody></table></div>';
    return html;
}

function actualizarDisplay8() {
    const paso = PROBLEMA_LOGICO_8.pasos[PROBLEMA_LOGICO_8.pasoActual];
    document.getElementById('titulo-paso-8').innerHTML = `<strong>Paso ${PROBLEMA_LOGICO_8.pasoActual + 1}:</strong> ${paso.titulo}`;
    document.getElementById('descripcion-paso-8').innerHTML = paso.descripcion;
    document.getElementById('matriz-expositor-arte-8').innerHTML = renderizarMatriz8(PROBLEMA_LOGICO_8.matrices.ExpositorArte, 'Expositor - Arte');
    document.getElementById('matriz-intercambios-8').innerHTML = renderizarMatriz8(PROBLEMA_LOGICO_8.matrices.Intercambios, 'Intercambios Realizados');
    document.getElementById('btn-anterior-8').disabled = PROBLEMA_LOGICO_8.pasoActual === 0;
    document.getElementById('btn-siguiente-8').disabled = PROBLEMA_LOGICO_8.pasoActual === PROBLEMA_LOGICO_8.pasos.length - 1;
    if (PROBLEMA_LOGICO_8.pasoActual === PROBLEMA_LOGICO_8.pasos.length - 1) {
        document.getElementById('solucion-final-8').innerHTML = `
            <div class=\"solucion-final\">
                <h4>Solución Final:</h4>
                <ul>
                    <li>Isa: Vidrio</li>
                    <li>Julia: Madera</li>
                    <li>Laura: Patchwork</li>
                    <li>Marta: Cerámica</li>
                    <li>Olivia: Telar</li>
                    <li>Pedro: Joyas</li>
                </ul>
                <h5>Intercambios:</h5>
                <ul>
                    <li>Julia (Madera) ↔ Laura (Patchwork)</li>
                    <li>Marta (Cerámica) ↔ Isa (Vidrio)</li>
                    <li>Marta (Cerámica) ↔ Pedro (Joyas)</li>
                    <li>Olivia (Telar) no intercambió con nadie</li>
                </ul>
            </div>
        `;
    } else {
        document.getElementById('solucion-final-8').innerHTML = '';
    }
}

function reiniciarProblema8() {
    PROBLEMA_LOGICO_8.pasoActual = 0;
    inicializarMatrices8();
    actualizarDisplay8();
}

function siguientePaso8() {
    if (PROBLEMA_LOGICO_8.pasoActual < PROBLEMA_LOGICO_8.pasos.length - 1) {
        PROBLEMA_LOGICO_8.pasoActual++;
        const paso = PROBLEMA_LOGICO_8.pasos[PROBLEMA_LOGICO_8.pasoActual];
        aplicarCambios8(paso.cambios_arte, paso.cambios_inter);
        actualizarDisplay8();
    }
}

function pasoAnterior8() {
    if (PROBLEMA_LOGICO_8.pasoActual > 0) {
        PROBLEMA_LOGICO_8.pasoActual--;
        inicializarMatrices8();
        for (let i = 1; i <= PROBLEMA_LOGICO_8.pasoActual; i++) {
            aplicarCambios8(PROBLEMA_LOGICO_8.pasos[i].cambios_arte, PROBLEMA_LOGICO_8.pasos[i].cambios_inter);
        }
        actualizarDisplay8();
    }
}

function resolverCompleto8() {
    PROBLEMA_LOGICO_8.pasoActual = PROBLEMA_LOGICO_8.pasos.length - 1;
    inicializarMatrices8();
    for (let i = 1; i < PROBLEMA_LOGICO_8.pasos.length; i++) {
        aplicarCambios8(PROBLEMA_LOGICO_8.pasos[i].cambios_arte, PROBLEMA_LOGICO_8.pasos[i].cambios_inter);
    }
    actualizarDisplay8();
}

function loadProblemaLogico8() {
    const toolContent = document.getElementById('tool-content');
    toolContent.innerHTML = `
        <div class=\"problema-logico-8-container\">
            <h1>Problema Lógico Ocho: Muestra de Artes y Oficios</h1>
            <div class=\"problema-layout\">
                <div class=\"problema-sidebar\">
                    <div class=\"control-panel\">
                        <h3>Controles</h3>
                        <div class=\"control-buttons\">
                            <button id=\"btn-reiniciar-8\" class=\"btn-control btn-reiniciar\" onclick=\"reiniciarProblema8()\"><i class=\"fas fa-refresh\"></i> Reiniciar</button>
                            <button id=\"btn-anterior-8\" class=\"btn-control btn-anterior\" onclick=\"pasoAnterior8()\"><i class=\"fas fa-arrow-left\"></i> Anterior</button>
                            <button id=\"btn-siguiente-8\" class=\"btn-control btn-siguiente\" onclick=\"siguientePaso8()\"><i class=\"fas fa-arrow-right\"></i> Siguiente</button>
                            <button id=\"btn-resolver-8\" class=\"btn-control btn-resolver\" onclick=\"resolverCompleto8()\"><i class=\"fas fa-check-double\"></i> Resolver Todo</button>
                        </div>
                    </div>
                    <div class=\"enunciado-panel\">
                        <h3>Enunciado</h3>
                        <p>Seis expositores (cinco mujeres y un hombre, Pedro) en una muestra de artes y oficios. Uno es soplador de vidrio. Se realizan intercambios de obras. Objetivo: Determinar el arte de cada uno, quién hizo intercambio y con quién.</p>
                    </div>
                    <div class=\"pistas-panel\">
                        <h3>Pistas</h3>
                        <ul>
                            <li><strong>Pista 1:</strong> Julia intentó hacer un trato con Laura y un trato con la persona que teje y acabó por ponerse de acuerdo con una de ellas.</li>
                            <li><strong>Pista 2:</strong> Pedro no es ceramista.</li>
                            <li><strong>Pista 3:</strong> Marta no hace patchwork.</li>
                            <li><strong>Pista 4:</strong> Isa no es escultora en madera ni tejedora.</li>
                            <li><strong>Pista 5:</strong> Según los acuerdos finales, la ceramista intercambió dos de sus piezas, cada una con una persona diferente; cuatro de los seis expositores -Julia, Isa, la persona que hace joyas y la mujer que hace patchwork- intervinieron en un intercambio, y Olivia no intervino en ninguno.</li>
                        </ul>
                    </div>
                </div>
                <div class=\"problema-main\">
                    <div class=\"paso-info\">
                        <h2 id=\"titulo-paso-8\"></h2>
                        <div id=\"descripcion-paso-8\" class=\"descripcion-paso\"></div>
                    </div>
                    <div class=\"matrices-container\">
                        <div class=\"matriz-tab\">
                            <div class=\"tab-buttons\">
                                <button class=\"tab-btn active\" onclick=\"mostrarMatriz8('expositor-arte')\">Expositor - Arte</button>
                                <button class=\"tab-btn\" onclick=\"mostrarMatriz8('intercambios')\">Intercambios Realizados</button>
                            </div>
                            <div class=\"tab-content\">
                                <div id=\"matriz-expositor-arte-8\" class=\"matriz-content active\"></div>
                                <div id=\"matriz-intercambios-8\" class=\"matriz-content\"></div>
                            </div>
                        </div>
                    </div>
                    <div id=\"solucion-final-8\" class=\"solucion-final-container\"></div>
                </div>
            </div>
        </div>
    `;
    inicializarMatrices8();
    actualizarDisplay8();
}

function mostrarMatriz8(tipo) {
    document.querySelectorAll('.problema-logico-8-container .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.problema-logico-8-container .matriz-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelector(`.problema-logico-8-container .tab-btn[onclick=\"mostrarMatriz8('${tipo}')\"]`).classList.add('active');
    document.getElementById(`matriz-${tipo}-8`).classList.add('active');
}

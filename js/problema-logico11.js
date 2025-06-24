// Problema Lógico Once: El Club de Coches Antiguos
// Basado en la aplicación Shiny proporcionada

const PROBLEMA_LOGICO_11 = {
    nombres: ["Lorenzo", "Marcos", "Isidro", "Jaime", "Gustavo"],
    apellidos: ["Abril", "Blasco", "Casas", "Delgado", "Escobar"],
    marcas: ["Nike", "Hydra", "Kratos", "Sibyl", "Pegasus"],
    anios: ["47", "49", "51", "53", "55"],
    
    matrices: {
        NombreApellido: null,
        NombreMarca: null,
        NombreAnio: null,
        MarcaAnio: null
    },
    
    pasoActual: 0,
    
    pasos: [
        {
            titulo: "Estado Inicial",
            descripcion: "5 Nombres, 5 Apellidos, 5 Marcas, 5 Años.",
            cambios: []
        },
        {
            titulo: "Análisis Inicial de Años y Marcas",
            descripcion: "Ni el Nike, ni el Kratos, ni el Pegasus, ni el Sibyl son el coche más antiguo (47). Por tanto, Hydra es del año 47. El Nike es del 53, Kratos del 49. El coche de Gustavo es del 51 y el de Marcos del 55. Gustavo tiene Pegasus (51) y Marcos tiene Sibyl (55).",
            cambios: [
                {matriz: "MarcaAnio", fila: "Hydra", col: "47", valor: "•"},
                {matriz: "MarcaAnio", fila: "Nike", col: "53", valor: "•"},
                {matriz: "MarcaAnio", fila: "Kratos", col: "49", valor: "•"},
                {matriz: "MarcaAnio", fila: "Pegasus", col: "51", valor: "•"},
                {matriz: "MarcaAnio", fila: "Sibyl", col: "55", valor: "•"}
            ]
        },
        {
            titulo: "P1 y P6: Gustavo con Pegasus",
            descripcion: "Los coches más antiguos (47, 49, 51) son de Gustavo, Sr. Blasco y Jaime. El coche de Gustavo es del año 51 (Pegasus). Por tanto, Gustavo tiene el Pegasus del 51.",
            cambios: [
                {matriz: "NombreMarca", fila: "Gustavo", col: "Pegasus", valor: "•"},
                {matriz: "NombreAnio", fila: "Gustavo", col: "51", valor: "•"}
            ]
        },
        {
            titulo: "P3: Sr. Casas y Jaime",
            descripcion: "El coche del Sr. Casas es más antiguo que el Kratos (49), por tanto es del año 47 (Hydra). Como los coches antiguos (47, 49, 51) son de Gustavo, Sr. Blasco y Jaime, y Sr. Casas tiene el del 47, Sr. Casas debe ser Jaime. Jaime Casas tiene el Hydra del 47.",
            cambios: [
                {matriz: "NombreApellido", fila: "Jaime", col: "Casas", valor: "•"},
                {matriz: "NombreMarca", fila: "Jaime", col: "Hydra", valor: "•"},
                {matriz: "NombreAnio", fila: "Jaime", col: "47", valor: "•"}
            ]
        },
        {
            titulo: "P4: Isidro y Kratos",
            descripcion: "El coche de Isidro es dos años más antiguo que el Pegasus (51), por tanto es del año 49 (Kratos). El Sr. Blasco tiene el Kratos del 49, por tanto Isidro es el Sr. Blasco. Isidro Blasco tiene el Kratos del 49.",
            cambios: [
                {matriz: "NombreApellido", fila: "Isidro", col: "Blasco", valor: "•"},
                {matriz: "NombreMarca", fila: "Isidro", col: "Kratos", valor: "•"},
                {matriz: "NombreAnio", fila: "Isidro", col: "49", valor: "•"}
            ]
        },
        {
            titulo: "Asignación de Marcos y Lorenzo",
            descripcion: "El coche de Marcos es del 55 (Sibyl) según las deducciones anteriores. Las marcas/años restantes: Nike (53). Lorenzo tiene el Nike del 53.",
            cambios: [
                {matriz: "NombreMarca", fila: "Marcos", col: "Sibyl", valor: "•"},
                {matriz: "NombreAnio", fila: "Marcos", col: "55", valor: "•"},
                {matriz: "NombreMarca", fila: "Lorenzo", col: "Nike", valor: "•"},
                {matriz: "NombreAnio", fila: "Lorenzo", col: "53", valor: "•"}
            ]
        },
        {
            titulo: "P5: Apellidos restantes",
            descripcion: "P5: El coche del Sr. Abril es más antiguo que el Sibyl (55) y que el modelo del Delgado. Si Gustavo es Abril (coche 51): 51 < 55 (OK). Sr. Delgado debe tener coche > 51. Lorenzo (53) puede ser Delgado: 51 < 53 (OK). Gustavo Abril, Lorenzo Delgado, Marcos Escobar.",
            cambios: [
                {matriz: "NombreApellido", fila: "Gustavo", col: "Abril", valor: "•"},
                {matriz: "NombreApellido", fila: "Lorenzo", col: "Delgado", valor: "•"},
                {matriz: "NombreApellido", fila: "Marcos", col: "Escobar", valor: "•"}
            ]
        },
        {
            titulo: "¡Problema Resuelto!",
            descripcion: "Todas las asignaciones completas.",
            cambios: []
        }
    ]
};

function inicializarMatrices11() {
    PROBLEMA_LOGICO_11.matrices.NombreApellido = crearMatriz(PROBLEMA_LOGICO_11.nombres, PROBLEMA_LOGICO_11.apellidos);
    PROBLEMA_LOGICO_11.matrices.NombreMarca = crearMatriz(PROBLEMA_LOGICO_11.nombres, PROBLEMA_LOGICO_11.marcas);
    PROBLEMA_LOGICO_11.matrices.NombreAnio = crearMatriz(PROBLEMA_LOGICO_11.nombres, PROBLEMA_LOGICO_11.anios);
    PROBLEMA_LOGICO_11.matrices.MarcaAnio = crearMatriz(PROBLEMA_LOGICO_11.marcas, PROBLEMA_LOGICO_11.anios);
}

function crearMatriz(filas, columnas) {
    const matriz = {};
    for (let fila of filas) {
        matriz[fila] = {};
        for (let col of columnas) {
            matriz[fila][col] = "";
        }
    }
    return matriz;
}

function marcarXesAuto11(matriz, filaSeleccionada, colSeleccionada) {
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

function propagar11() {
    let cambio = true;
    while (cambio) {
        cambio = false;
        
        // Nombre-Marca + Marca-Año => Nombre-Año
        for (let nombre of PROBLEMA_LOGICO_11.nombres) {
            for (let marca of PROBLEMA_LOGICO_11.marcas) {
                if (PROBLEMA_LOGICO_11.matrices.NombreMarca[nombre][marca] === "•") {
                    for (let anio of PROBLEMA_LOGICO_11.anios) {
                        if (PROBLEMA_LOGICO_11.matrices.MarcaAnio[marca][anio] === "•") {
                            if (PROBLEMA_LOGICO_11.matrices.NombreAnio[nombre][anio] === "") {
                                PROBLEMA_LOGICO_11.matrices.NombreAnio[nombre][anio] = "•";
                                marcarXesAuto11(PROBLEMA_LOGICO_11.matrices.NombreAnio, nombre, anio);
                                cambio = true;
                            }
                        }
                    }
                }
            }
        }
        
        // Nombre-Año + Marca-Año => Nombre-Marca
        for (let nombre of PROBLEMA_LOGICO_11.nombres) {
            for (let anio of PROBLEMA_LOGICO_11.anios) {
                if (PROBLEMA_LOGICO_11.matrices.NombreAnio[nombre][anio] === "•") {
                    for (let marca of PROBLEMA_LOGICO_11.marcas) {
                        if (PROBLEMA_LOGICO_11.matrices.MarcaAnio[marca][anio] === "•") {
                            if (PROBLEMA_LOGICO_11.matrices.NombreMarca[nombre][marca] === "") {
                                PROBLEMA_LOGICO_11.matrices.NombreMarca[nombre][marca] = "•";
                                marcarXesAuto11(PROBLEMA_LOGICO_11.matrices.NombreMarca, nombre, marca);
                                cambio = true;
                            }
                        }
                    }
                }
            }
        }
    }
}

function aplicarCambios11(cambios) {
    for (let cambio of cambios) {
        const matriz = PROBLEMA_LOGICO_11.matrices[cambio.matriz];
        if (matriz && matriz[cambio.fila] && matriz[cambio.fila].hasOwnProperty(cambio.col)) {
            if (cambio.valor === "•") {
                matriz[cambio.fila][cambio.col] = "•";
                marcarXesAuto11(matriz, cambio.fila, cambio.col);
            } else {
                matriz[cambio.fila][cambio.col] = cambio.valor;
            }
        }
    }
    propagar11();
}

function actualizarDisplay11() {
    const paso = PROBLEMA_LOGICO_11.pasos[PROBLEMA_LOGICO_11.pasoActual];
    document.getElementById('titulo-paso-11').textContent = `Paso ${PROBLEMA_LOGICO_11.pasoActual + 1}: ${paso.titulo}`;
    document.getElementById('descripcion-paso-11').innerHTML = paso.descripcion;
    
    // Actualizar matrices
    actualizarMatrizHTML11('nombre-apellido', PROBLEMA_LOGICO_11.matrices.NombreApellido, PROBLEMA_LOGICO_11.nombres, PROBLEMA_LOGICO_11.apellidos);
    actualizarMatrizHTML11('nombre-marca', PROBLEMA_LOGICO_11.matrices.NombreMarca, PROBLEMA_LOGICO_11.nombres, PROBLEMA_LOGICO_11.marcas);
    actualizarMatrizHTML11('nombre-anio', PROBLEMA_LOGICO_11.matrices.NombreAnio, PROBLEMA_LOGICO_11.nombres, PROBLEMA_LOGICO_11.anios);
    actualizarMatrizHTML11('marca-anio', PROBLEMA_LOGICO_11.matrices.MarcaAnio, PROBLEMA_LOGICO_11.marcas, PROBLEMA_LOGICO_11.anios);
    
    // Actualizar botones
    document.getElementById('btn-siguiente-11').disabled = PROBLEMA_LOGICO_11.pasoActual >= PROBLEMA_LOGICO_11.pasos.length - 1;
    
    // Verificar si está resuelto
    if (PROBLEMA_LOGICO_11.pasoActual === PROBLEMA_LOGICO_11.pasos.length - 1) {
        mostrarSolucionFinal11();
    }
}

function actualizarMatrizHTML11(tipo, matriz, filas, columnas) {
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
    document.getElementById(`matriz-${tipo}-11`).innerHTML = html;
}

function mostrarSolucionFinal11() {
    let solucion = '<h3>¡Problema Resuelto!</h3>';
    solucion += '<table class="solucion-table"><thead><tr><th>Nombre</th><th>Apellido</th><th>Marca</th><th>Año</th></tr></thead><tbody>';
    
    const orden = ["Jaime", "Isidro", "Gustavo", "Lorenzo", "Marcos"];
    
    for (let nombre of orden) {
        let apellido = "", marca = "", anio = "";
        
        // Buscar apellido
        for (let ap of PROBLEMA_LOGICO_11.apellidos) {
            if (PROBLEMA_LOGICO_11.matrices.NombreApellido[nombre][ap] === "•") {
                apellido = ap;
                break;
            }
        }
        
        // Buscar marca
        for (let mar of PROBLEMA_LOGICO_11.marcas) {
            if (PROBLEMA_LOGICO_11.matrices.NombreMarca[nombre][mar] === "•") {
                marca = mar;
                break;
            }
        }
        
        // Buscar año
        for (let an of PROBLEMA_LOGICO_11.anios) {
            if (PROBLEMA_LOGICO_11.matrices.NombreAnio[nombre][an] === "•") {
                anio = an;
                break;
            }
        }
        
        solucion += `<tr><td>${nombre}</td><td>${apellido}</td><td>${marca}</td><td>${anio}</td></tr>`;
    }
    
    solucion += '</tbody></table>';
    document.getElementById('solucion-final-11').innerHTML = solucion;
}

function reiniciar11() {
    PROBLEMA_LOGICO_11.pasoActual = 0;
    inicializarMatrices11();
    actualizarDisplay11();
    document.getElementById('solucion-final-11').innerHTML = '<p>La solución aparecerá aquí una vez completados todos los pasos.</p>';
}

function siguientePaso11() {
    if (PROBLEMA_LOGICO_11.pasoActual < PROBLEMA_LOGICO_11.pasos.length - 1) {
        PROBLEMA_LOGICO_11.pasoActual++;
        const paso = PROBLEMA_LOGICO_11.pasos[PROBLEMA_LOGICO_11.pasoActual];
        aplicarCambios11(paso.cambios);
        actualizarDisplay11();
    }
}

function resolverCompleto11() {
    for (let i = 1; i < PROBLEMA_LOGICO_11.pasos.length; i++) {
        aplicarCambios11(PROBLEMA_LOGICO_11.pasos[i].cambios);
    }
    PROBLEMA_LOGICO_11.pasoActual = PROBLEMA_LOGICO_11.pasos.length - 1;
    actualizarDisplay11();
}

function mostrarMatriz11(tipo) {
    document.querySelectorAll('.problema-logico11-container .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.problema-logico11-container .matriz-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`.problema-logico11-container .tab-btn[onclick="mostrarMatriz11('${tipo}')"]`).classList.add('active');
    document.getElementById(`matriz-${tipo}-11`).classList.add('active');
}

function loadProblemaLogico11() {
    const toolContent = document.getElementById('tool-content');
    toolContent.innerHTML = `
        <div class="problema-logico11-container">
            <h1>El Club de Coches Antiguos</h1>
            
            <div class="problema-layout">
                <div class="problema-sidebar">
                    <div class="control-panel">
                        <h3><i class="fas fa-car"></i> Controles</h3>
                        <div class="control-buttons">
                            <button class="btn-control btn-reiniciar" onclick="reiniciar11()">
                                <i class="fas fa-refresh"></i> Reiniciar
                            </button>
                            <button id="btn-siguiente-11" class="btn-control btn-siguiente" onclick="siguientePaso11()">
                                <i class="fas fa-arrow-right"></i> Siguiente
                            </button>
                            <button id="btn-resolver-11" class="btn-control btn-resolver" onclick="resolverCompleto11()">
                                <i class="fas fa-check-double"></i> Resolver Todo
                            </button>
                        </div>
                    </div>
                    
                    <div class="enunciado-panel">
                        <h3>Enunciado</h3>
                        <p>Cinco miembros de un club de coches antiguos poseen una marca de coche distinta (Nike, Hydra, Kratos, Sibyl, Pegasus) y cada modelo corresponde a un año diferente (47, 49, 51, 53, 55). Objetivo: Determinar el nombre propio, apellido, marca de coche y año del modelo de cada miembro.</p>
                    </div>
                    
                    <div class="pistas-panel">
                        <h3>Pistas</h3>
                        <ul>
                            <li><strong>P1:</strong> Los tres coches más antiguos (47, 49, 51) son propiedad de Gustavo, el señor Blasco y Jaime, aunque no forzosamente en este orden.</li>
                            <li><strong>P2:</strong> El Nike es más antiguo que el coche de Marcos.</li>
                            <li><strong>P3:</strong> El coche del señor Casas es más antiguo que el Kratos.</li>
                            <li><strong>P4:</strong> El coche de Isidro es dos años más antiguo que el Pegasus.</li>
                            <li><strong>P5:</strong> El coche del señor Abril es más antiguo que el Sibyl y que el modelo del Delgado.</li>
                            <li><strong>P6:</strong> El Kratos es dos años más antiguo que el coche de Gustavo y cuatro años más antiguo que el Nike.</li>
                        </ul>
                    </div>
                </div>
                
                <div class="problema-main">
                    <div class="paso-info">
                        <h2 id="titulo-paso-11"></h2>
                        <div id="descripcion-paso-11" class="descripcion-paso"></div>
                    </div>
                    
                    <div class="matrices-container">
                        <div class="matriz-tab">
                            <div class="tab-buttons">
                                <button class="tab-btn active" onclick="mostrarMatriz11('nombre-apellido')">Nombre - Apellido</button>
                                <button class="tab-btn" onclick="mostrarMatriz11('nombre-marca')">Nombre - Marca</button>
                                <button class="tab-btn" onclick="mostrarMatriz11('nombre-anio')">Nombre - Año</button>
                                <button class="tab-btn" onclick="mostrarMatriz11('marca-anio')">Marca - Año</button>
                            </div>
                            <div class="tab-content">
                                <div id="matriz-nombre-apellido-11" class="matriz-content active"></div>
                                <div id="matriz-nombre-marca-11" class="matriz-content"></div>
                                <div id="matriz-nombre-anio-11" class="matriz-content"></div>
                                <div id="matriz-marca-anio-11" class="matriz-content"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="solucion-final-11" class="solucion-final-container"></div>
                </div>
            </div>
        </div>
    `;
    
    inicializarMatrices11();
    actualizarDisplay11();
}

// Problema Lógico Nueve: Las Consultas Médicas
// Basado en la aplicación Shiny proporcionada

const PROBLEMA_LOGICO_9 = {
    pacientes_nombres: ["Manuel", "María", "Martina", "Mercedes", "Miguel"],
    pacientes_apellidos: ["Ramos", "Regó", "Ribot", "Robles", "Ruiz"],
    medicos_apellidos: ["Aguado", "Cano", "Noble", "Pérez", "Sáinz"],
    especialidades: ["Cirujano", "Dermatólogo", "Oftalmólogo", "Ortopédico", "Tocólogo"],
    
    matrices: {
        PacienteNombreApellido: null,
        PacienteMedico: null,
        MedicoEspecialidad: null
    },
    
    pasoActual: 0,
    
    pasos: [
        {
            titulo: "Estado Inicial",
            descripcion: "Pacientes: Manuel, Miguel Regó, María, Martina, Mercedes. Un médico es Sáinz, una especialidad es Oftalmólogo.",
            cambios: []
        },
        {
            titulo: "Pistas 1 y 7 (Apellidos conocidos)",
            descripcion: "Miguel Regó es un paciente. Mercedes se apellida Ruiz.",
            cambios: [
                {matriz: "PacienteNombreApellido", fila: "Miguel", col: "Regó", valor: "•"},
                {matriz: "PacienteNombreApellido", fila: "Mercedes", col: "Ruiz", valor: "•"}
            ]
        },
        {
            titulo: "Pistas 2 y 3 (Roles Mujeres y Cirujano)",
            descripcion: "Las 3 mujeres son: Paciente del Dr. Noble, Sra. Ramos, Paciente del Dermatólogo. Sra. Ribot fue al Cirujano. Por tanto, Sra. Ribot debe ser la paciente del Dr. Noble, y Dr. Noble es el Cirujano.",
            cambios: [
                {matriz: "MedicoEspecialidad", fila: "Noble", col: "Cirujano", valor: "•"}
            ]
        },
        {
            titulo: "Pista 7 y 2 (Mercedes y Dermatólogo)",
            descripcion: "Mercedes Ruiz es una mujer. No es Sra. Ramos ni Sra. Ribot (pac. Dr. Noble). Por tanto, Mercedes Ruiz es la que acudió al Dermatólogo.",
            cambios: []
        },
        {
            titulo: "Deducción Apellido Manuel",
            descripcion: "Por eliminación, el apellido de Manuel es Robles. Manuel (hombre) no puede ser Ramos ni Ribot (ambas señoras).",
            cambios: [
                {matriz: "PacienteNombreApellido", fila: "Manuel", col: "Robles", valor: "•"}
            ]
        },
        {
            titulo: "Pistas 6 y 2 (María, Tocólogo, Apellidos)",
            descripcion: "María no vio al Tocólogo. Dr. Cano no es el Tocólogo. Dado que Mercedes=Ruiz (Dermatólogo), y la mujer que fue al tocólogo no es María, tiene que ser Martina Ramos. Y María, por eliminación, es la señora Ribot.",
            cambios: [
                {matriz: "PacienteNombreApellido", fila: "Martina", col: "Ramos", valor: "•"},
                {matriz: "PacienteNombreApellido", fila: "María", col: "Ribot", valor: "•"},
                {matriz: "PacienteMedico", fila: "María", col: "Noble", valor: "•"}
            ]
        },
        {
            titulo: "Pista 5 (Mujer Dr. Aguado)",
            descripcion: "Una mujer vio al Dr. Aguado, no fue Martina. María ya tiene médico (Noble). Entonces Mercedes Ruiz fue al Dr. Aguado. Como Mercedes vio al Dermatólogo, Dr. Aguado es el Dermatólogo.",
            cambios: [
                {matriz: "PacienteMedico", fila: "Mercedes", col: "Aguado", valor: "•"},
                {matriz: "MedicoEspecialidad", fila: "Aguado", col: "Dermatólogo", valor: "•"}
            ]
        },
        {
            titulo: "Pista 4 (Ortopédico y Dr. Cano)",
            descripcion: "El Ortopédico no es médico de Robles (Manuel). El Ortopédico no es Dr. Cano. Dr. Cano no es el ortopédico ni el tocólogo, sino el oftalmólogo. Manuel Robles vio al Dr. Cano.",
            cambios: [
                {matriz: "MedicoEspecialidad", fila: "Cano", col: "Ortopédico", valor: "X"},
                {matriz: "MedicoEspecialidad", fila: "Cano", col: "Tocólogo", valor: "X"},
                {matriz: "MedicoEspecialidad", fila: "Cano", col: "Oftalmólogo", valor: "•"},
                {matriz: "PacienteMedico", fila: "Manuel", col: "Cano", valor: "•"}
            ]
        },
        {
            titulo: "Pista 1 y Médicos Restantes",
            descripcion: "Miguel Regó no fue al Dr. Pérez. Médicos restantes para Miguel y Martina: Pérez, Sáinz. Si Miguel no vio a Pérez, Miguel vio a Sáinz. Entonces Martina vio a Pérez. El Ortopédico es el Dr. Sáinz. El Tocólogo es el Dr. Pérez.",
            cambios: [
                {matriz: "PacienteMedico", fila: "Miguel", col: "Pérez", valor: "X"},
                {matriz: "PacienteMedico", fila: "Miguel", col: "Sáinz", valor: "•"},
                {matriz: "PacienteMedico", fila: "Martina", col: "Pérez", valor: "•"},
                {matriz: "MedicoEspecialidad", fila: "Sáinz", col: "Ortopédico", valor: "•"},
                {matriz: "MedicoEspecialidad", fila: "Pérez", col: "Tocólogo", valor: "•"}
            ]
        },
        {
            titulo: "¡Problema Resuelto!",
            descripcion: "Todas las asignaciones completas.",
            cambios: []
        }
    ]
};

function inicializarMatrices9() {
    const { pacientes_nombres, pacientes_apellidos, medicos_apellidos, especialidades } = PROBLEMA_LOGICO_9;
    
    PROBLEMA_LOGICO_9.matrices.PacienteNombreApellido = crearMatriz9(pacientes_nombres, pacientes_apellidos);
    PROBLEMA_LOGICO_9.matrices.PacienteMedico = crearMatriz9(pacientes_nombres, medicos_apellidos);
    PROBLEMA_LOGICO_9.matrices.MedicoEspecialidad = crearMatriz9(medicos_apellidos, especialidades);
}

function crearMatriz9(filas, columnas) {
    const matriz = {};
    for (let fila of filas) {
        matriz[fila] = {};
        for (let columna of columnas) {
            matriz[fila][columna] = "";
        }
    }
    return matriz;
}

function marcarXesAutomatico9(matriz, filaSeleccionada, columnaSeleccionada) {
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

function aplicarCambios9(cambios) {
    for (let cambio of cambios) {
        const matriz = PROBLEMA_LOGICO_9.matrices[cambio.matriz];
        if (matriz && matriz[cambio.fila] && matriz[cambio.fila].hasOwnProperty(cambio.col)) {
            matriz[cambio.fila][cambio.col] = cambio.valor;
            
            if (cambio.valor === "•") {
                marcarXesAutomatico9(matriz, cambio.fila, cambio.col);
            }
        }
    }
}

function renderizarMatriz9(matriz, nombre) {
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

function actualizarDisplay9() {
    const paso = PROBLEMA_LOGICO_9.pasos[PROBLEMA_LOGICO_9.pasoActual];
    
    document.getElementById('titulo-paso-9').innerHTML = `<strong>Paso ${PROBLEMA_LOGICO_9.pasoActual + 1}:</strong> ${paso.titulo}`;
    document.getElementById('descripcion-paso-9').innerHTML = paso.descripcion;
    
    document.getElementById('matriz-paciente-apellido-9').innerHTML = 
        renderizarMatriz9(PROBLEMA_LOGICO_9.matrices.PacienteNombreApellido, 'Paciente - Apellido');
    
    document.getElementById('matriz-paciente-medico-9').innerHTML = 
        renderizarMatriz9(PROBLEMA_LOGICO_9.matrices.PacienteMedico, 'Paciente - Médico');
    
    document.getElementById('matriz-medico-especialidad-9').innerHTML = 
        renderizarMatriz9(PROBLEMA_LOGICO_9.matrices.MedicoEspecialidad, 'Médico - Especialidad');
    
    document.getElementById('btn-anterior-9').disabled = PROBLEMA_LOGICO_9.pasoActual === 0;
    document.getElementById('btn-siguiente-9').disabled = PROBLEMA_LOGICO_9.pasoActual === PROBLEMA_LOGICO_9.pasos.length - 1;
    
    if (PROBLEMA_LOGICO_9.pasoActual === PROBLEMA_LOGICO_9.pasos.length - 1) {
        document.getElementById('solucion-final-9').innerHTML = `
            <div class="solucion-final">
                <h4>Solución Final:</h4>
                <ul>
                    <li><strong>Martina Ramos:</strong> tocólogo, Dr. Pérez</li>
                    <li><strong>Miguel Regó:</strong> ortopédico, Dr. Sáinz</li>
                    <li><strong>María Ribot:</strong> cirujano, Dr. Noble</li>
                    <li><strong>Manuel Robles:</strong> oftalmólogo, Dr. Cano</li>
                    <li><strong>Mercedes Ruiz:</strong> dermatólogo, Dr. Aguado</li>
                </ul>
            </div>
        `;
    } else {
        document.getElementById('solucion-final-9').innerHTML = '';
    }
}

function reiniciarProblema9() {
    PROBLEMA_LOGICO_9.pasoActual = 0;
    inicializarMatrices9();
    actualizarDisplay9();
}

function siguientePaso9() {
    if (PROBLEMA_LOGICO_9.pasoActual < PROBLEMA_LOGICO_9.pasos.length - 1) {
        PROBLEMA_LOGICO_9.pasoActual++;
        const paso = PROBLEMA_LOGICO_9.pasos[PROBLEMA_LOGICO_9.pasoActual];
        aplicarCambios9(paso.cambios);
        actualizarDisplay9();
    }
}

function pasoAnterior9() {
    if (PROBLEMA_LOGICO_9.pasoActual > 0) {
        PROBLEMA_LOGICO_9.pasoActual--;
        inicializarMatrices9();
        for (let i = 1; i <= PROBLEMA_LOGICO_9.pasoActual; i++) {
            aplicarCambios9(PROBLEMA_LOGICO_9.pasos[i].cambios);
        }
        actualizarDisplay9();
    }
}

function resolverCompleto9() {
    PROBLEMA_LOGICO_9.pasoActual = PROBLEMA_LOGICO_9.pasos.length - 1;
    inicializarMatrices9();
    for (let i = 1; i < PROBLEMA_LOGICO_9.pasos.length; i++) {
        aplicarCambios9(PROBLEMA_LOGICO_9.pasos[i].cambios);
    }
    actualizarDisplay9();
}

function loadProblemaLogico9() {
    const toolContent = document.getElementById('tool-content');
    toolContent.innerHTML = `
        <div class="problema-logico9-container">
            <h1>Problema Lógico Nueve: Las Consultas Médicas</h1>
            
            <div class="problema-layout">
                <div class="problema-sidebar">
                    <div class="control-panel">
                        <h3>Controles</h3>
                        <div class="control-buttons">
                            <button id="btn-reiniciar-9" class="btn-control btn-reiniciar" onclick="reiniciarProblema9()">
                                <i class="fas fa-refresh"></i> Reiniciar
                            </button>
                            <button id="btn-anterior-9" class="btn-control btn-anterior" onclick="pasoAnterior9()">
                                <i class="fas fa-arrow-left"></i> Anterior
                            </button>
                            <button id="btn-siguiente-9" class="btn-control btn-siguiente" onclick="siguientePaso9()">
                                <i class="fas fa-arrow-right"></i> Siguiente
                            </button>
                            <button id="btn-resolver-9" class="btn-control btn-resolver" onclick="resolverCompleto9()">
                                <i class="fas fa-check-double"></i> Resolver Todo
                            </button>
                        </div>
                    </div>
                    
                    <div class="enunciado-panel">
                        <h3>Enunciado</h3>
                        <p>Manuel y otras cuatro personas fueron a un centro para consultar a un médico. Cada persona acudió a un médico distinto (una fue al Dr. Sáinz), de especialidades diferentes (una es oftalmólogo). Objetivo: Determinar nombre completo de cada paciente y el apellido y especialidad de sus médicos.</p>
                    </div>
                    
                    <div class="pistas-panel">
                        <h3>Pistas</h3>
                        <ul>
                            <li><strong>Pista 1:</strong> Miguel Regó no fue al doctor Pérez.</li>
                            <li><strong>Pista 2:</strong> Las tres mujeres son: la que vio al doctor Noble, la señora Ramos y la que fue al dermatólogo.</li>
                            <li><strong>Pista 3:</strong> La señora Ribot fue a consultar al cirujano.</li>
                            <li><strong>Pista 4:</strong> El ortopédico, que no es el médico de Robles, no es tampoco el doctor Cano.</li>
                            <li><strong>Pista 5:</strong> Una mujer acudió al doctor Aguado, pero esa mujer no fue Martina.</li>
                            <li><strong>Pista 6:</strong> María no es la mujer que vio al tocólogo, el cual no es el doctor Cano.</li>
                            <li><strong>Pista 7:</strong> Mercedes se apellida Ruiz.</li>
                        </ul>
                    </div>
                </div>
                
                <div class="problema-main">
                    <div class="paso-info">
                        <h2 id="titulo-paso-9"></h2>
                        <div id="descripcion-paso-9" class="descripcion-paso"></div>
                    </div>
                    
                    <div class="matrices-container">
                        <div class="matriz-tab">
                            <div class="tab-buttons">
                                <button class="tab-btn active" onclick="mostrarMatriz9('paciente-apellido')">Paciente - Apellido</button>
                                <button class="tab-btn" onclick="mostrarMatriz9('paciente-medico')">Paciente - Médico</button>
                                <button class="tab-btn" onclick="mostrarMatriz9('medico-especialidad')">Médico - Especialidad</button>
                            </div>
                            <div class="tab-content">
                                <div id="matriz-paciente-apellido-9" class="matriz-content active"></div>
                                <div id="matriz-paciente-medico-9" class="matriz-content"></div>
                                <div id="matriz-medico-especialidad-9" class="matriz-content"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div id="solucion-final-9" class="solucion-final-container"></div>
                </div>
            </div>
        </div>
    `;
    
    inicializarMatrices9();
    actualizarDisplay9();
}

function mostrarMatriz9(tipo) {
    document.querySelectorAll('.problema-logico9-container .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelectorAll('.problema-logico9-container .matriz-content').forEach(content => {
        content.classList.remove('active');
    });
    
    document.querySelector(`.problema-logico9-container .tab-btn[onclick="mostrarMatriz9('${tipo}')"]`).classList.add('active');
    document.getElementById(`matriz-${tipo}-9`).classList.add('active');
}

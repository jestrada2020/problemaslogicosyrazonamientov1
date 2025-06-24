// Aplicación principal
const app = {
    currentTool: null,
    loadTool: function(tool) {
        // Remove active class from previous button
        if (this.currentTool) {
            const prevButton = document.querySelector(`#sidebar button[onclick="app.loadTool('${this.currentTool}')"]`);
            if (prevButton) prevButton.classList.remove('active');
        }
        // Add active class to current button
        const currentButton = document.querySelector(`#sidebar button[onclick="app.loadTool('${tool}')"]`);
        if (currentButton) currentButton.classList.add('active');
        this.currentTool = tool;

        const toolContent = document.getElementById('tool-content');
        let content = '';
        
        if(tool === 'algebraLineal') {
            // Herramienta temporalmente deshabilitada
            content = `
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">Herramienta en Desarrollo</h4>
                <p>La funcionalidad de Sistemas de Ecuaciones (Gauss-Jordan) está temporalmente deshabilitada mientras se realizan mejoras.</p>
                <hr>
                <p class="mb-0">Por favor, utilice las otras herramientas disponibles en el menú lateral.</p>
            </div>`;
            toolContent.innerHTML = content;
        } else if(tool === 'determinantes') {
            // Herramienta temporalmente deshabilitada
            content = `
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">Herramienta en Desarrollo</h4>
                <p>La funcionalidad de Determinantes por Operaciones está temporalmente deshabilitada mientras se realizan mejoras.</p>
                <hr>
                <p class="mb-0">Por favor, utilice las otras herramientas disponibles en el menú lateral.</p>
            </div>`;
            toolContent.innerHTML = content;
        } else if(tool === 'problemaLogico1') {
            content = `
            <div class="problema-logico">
                <h1 class="main-title">Resolución Interactiva de Problema Lógico</h1>
                
                <div class="control-panel">
                    <div class="control-buttons">
                        <button class="btn-control btn-reiniciar" onclick="problemaLogico.reiniciar()">
                            <i class="fas fa-refresh"></i> Reiniciar
                        </button>
                        <button class="btn-control btn-siguiente" onclick="problemaLogico.siguientePaso()">
                            <i class="fas fa-arrow-right"></i> Siguiente Paso
                        </button>
                        <button class="btn-control btn-resolver" onclick="problemaLogico.resolverTodo()">
                            <i class="fas fa-check-double"></i> Resolver Todo
                        </button>
                    </div>
                    
                    <div class="problema-texto">
                        <h4 style="color: white;">Problema:</h4>
                        <p>Una joven asiste a una fiesta. Le presentan a cuatro hombres en una sucesión más bien rápida y, como es frecuente en tales reuniones, pronto se hace mención del tipo de trabajo a que se dedica cada uno. Desgraciadamente, a la chica le falla un poco la memoria. Al cabo de media hora, sólo es capaz de recordar que ha conocido al señor Castaño, el señor Blanco, el señor Moreno y el señor Rubio. Se acuerda también de que uno de ellos es fotógrafo, que hay un tendero, un banquero y un cantante, pero le resulta imposible señalar un nombre para cada uno. Su anfitriona, una amiga aficionada a las bromas, se niega a refrescarle la memoria, pero le proporciona cuatro pistas. Por fortuna, la lógica de la muchacha es mejor que su memoria y, rápidamente, empareja cada hombre con su profesión. ¿Puede hacerlo usted? Aquí están las pistas:</p>
                        
                        <h4 style="color: white;">Pistas:</h4>
                        <ul class="pistas-lista">
                            <li><strong>Pista 1:</strong> El señor Blanco sondea al banquero sobre la posibilidad de obtener un préstamo.</li>
                            <li><strong>Pista 2:</strong> El señor Castaño conoció al fotógrafo cuando le contrató para hacer las fotografías de su boda.</li>
                            <li><strong>Pista 3:</strong> El cantante y el señor Blanco son amigos, pero nunca han tenido tratos de negocios.</li>
                            <li><strong>Pista 4:</strong> Ni el señor Moreno ni el cantante conocían al señor Rubio antes de la fiesta.</li>
                        </ul>
                    </div>
                </div>
                
                <div class="main-content">
                    <div class="paso-actual">
                        <h3>Paso Actual</h3>
                        <div id="descripcion-paso"></div>
                    </div>
                    
                    <div class="cuadricula-container">
                        <h3>Cuadrícula Lógica</h3>
                        <table class="logic-grid" id="logic-grid">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Moreno</th>
                                    <th>Castaño</th>
                                    <th>Rubio</th>
                                    <th>Blanco</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Banquero</th>
                                    <td id="cell-Banquero-Moreno"></td>
                                    <td id="cell-Banquero-Castaño"></td>
                                    <td id="cell-Banquero-Rubio"></td>
                                    <td id="cell-Banquero-Blanco"></td>
                                </tr>
                                <tr>
                                    <th>Tendero</th>
                                    <td id="cell-Tendero-Moreno"></td>
                                    <td id="cell-Tendero-Castaño"></td>
                                    <td id="cell-Tendero-Rubio"></td>
                                    <td id="cell-Tendero-Blanco"></td>
                                </tr>
                                <tr>
                                    <th>Fotógrafo</th>
                                    <td id="cell-Fotógrafo-Moreno"></td>
                                    <td id="cell-Fotógrafo-Castaño"></td>
                                    <td id="cell-Fotógrafo-Rubio"></td>
                                    <td id="cell-Fotógrafo-Blanco"></td>
                                </tr>
                                <tr>
                                    <th>Cantante</th>
                                    <td id="cell-Cantante-Moreno"></td>
                                    <td id="cell-Cantante-Castaño"></td>
                                    <td id="cell-Cantante-Rubio"></td>
                                    <td id="cell-Cantante-Blanco"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="solucion-final" id="solucion-final" style="display: none;">
                    <h3>¡Problema Resuelto!</h3>
                    <div class="solucion-items" id="solucion-items"></div>
                </div>
            </div>`;
            toolContent.innerHTML = content;
            problemaLogico.init();
        } else if(tool === 'introduccion1') {
            content = `
            <h3>Introducción a la Caja de Herramientas</h3>
            <p>Hace algún tiempo, el profesor Carlos Andrés Escobar Guerra propuso la creación de unas cartillas para los cursos de matemáticas de la Facultad de Ciencias y Biotecnología. Estas cartillas no solo organizaron los contenidos esenciales, sino que también generaron la necesidad de contar con herramientas prácticas que permitieran desarrollar las actividades propuestas de manera interactiva y significativa.</p>
            <p>Resolver muchos de los problemas propuestos en la cartilla —y en especial los problemas de ingenio— no requiere ser un experto en matemáticas, sino tener disposición para razonar con sentido común, comprender los conceptos esenciales y elegir adecuadamente la herramienta más apropiada. La caja de herramientas ofrece precisamente ese conjunto de instrumentos para facilitar este proceso: gráficos, visualizaciones, y aplicaciones interactivas que acompañan y guían la solución de problemas.</p>
            <p>Estos problemas de lógica o pasatiempos matemáticos están cuidadosamente seleccionados para fomentar la deducción, el pensamiento crítico y el ordenamiento de datos relacionados. En cada uno se ofrecen todas las pistas necesarias para llegar a una solución clara, apelando más al razonamiento que al conocimiento técnico especializado. El objetivo es que el estudiante experimente la satisfacción de descubrir soluciones a través de la observación, el análisis y el uso de estrategias inteligentes.</p>
            <p>La construcción de esta herramienta fue posible gracias al esfuerzo conjunto de un equipo comprometido con la innovación educativa. Participaron en su desarrollo los profesores Carlos Andrés Escobar Guerra, Pablo Andrés Guzmán, Juan Alberto Arias Quiceno y John Jairo Estrada Álvarez. En particular, el profesor Guzmán aportó su experiencia en estadística y programación, inspirando la creación de un grupo de estudio que ha sido clave en la evolución del proyecto. Por su parte, John Jairo Estrada, el verdadero motor técnico, se encargó de programar todas las aplicaciones, integrando tecnologías como R, LaTeX, Shiny, Flexdashboard, Bookdown y GeoGebra, junto con un diseño visual elaborado en HTML, CSS y JavaScript.</p>
            <p>Esta iniciativa no solo representa una valiosa contribución al aprendizaje de las matemáticas, sino también un ejemplo claro de cómo el trabajo colaborativo, la creatividad y el uso adecuado de la tecnología pueden transformar la educación. Invitamos a cada estudiante a sumergirse en esta experiencia, a resolver con entusiasmo los problemas propuestos, y a disfrutar del desafío intelectual que cada uno de ellos representa.</p>
            <p> </p>`;
            toolContent.innerHTML = content;
        /* 
        
        */
        } else if(tool === 'problemaLogico2') {
            content = `
            <div class="problema-logico-2">
                <h1 class="main-title">Resolución Interactiva: Problema Lógico 2</h1>
                
                <div class="layout-container">
                    <div class="sidebar-panel">
                        <h3><i class="fas fa-cog"></i> Controles</h3>
                        <div class="control-buttons">
                            <button class="btn-control btn-reiniciar" onclick="problemaLogico2.reiniciar()">
                                <i class="fas fa-refresh"></i> Reiniciar Todo
                            </button>
                            <button class="btn-control btn-siguiente" id="pl2-btn-siguiente" onclick="problemaLogico2.siguientePaso()">
                                <i class="fas fa-arrow-right"></i> Siguiente Paso
                            </button>
                            <button class="btn-control btn-resolver" onclick="problemaLogico2.resolverTodo()">
                                <i class="fas fa-check-double"></i> Resolver Completo
                            </button>
                        </div>
                        
                        <div class="problema-info">
                            <h4><i class="fas fa-info-circle"></i> Problema:</h4>
                            <p>Andrés, Luis, Noel, Jorge y Paco -el apellido de uno de ellos es Mora- han sido contratados recientemente para vender refrescos y golosinas en el estadio Miramar. Cada uno de los chicos vende sólo una clase de mercancía. Partiendo de las pistas siguientes, intente determinar el nombre completo de todos ellos y las mercancías que venden.</p>
                        </div>
                        
                        <div class="problema-info">
                            <h4><i class="fas fa-lightbulb"></i> Pistas:</h4>
                            <ul>
                                <li><b>Pista 1:</b> Jorge, que no se apellida López, no vende palomitas de maíz.</li>
                                <li><b>Pista 2:</b> El que se apellida Díaz no vende ni gaseosa ni caramelos.</li>
                                <li><b>Pista 3:</b> Los cinco chicos son: Noel, Jorge, el que se apellida Soto, el que se apellida Cobos y el que vende helados.</li>
                                <li><b>Pista 4:</b> El apellido de Andrés no es ni López ni Cobos. Ni Andrés ni el que se apellida Cobos venden caramelos.</li>
                                <li><b>Pista 5:</b> Ni el vendedor de cacahuetes ni el vendedor de helados se llaman Paco o se apellidan Díaz.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="main-content">
                        <div class="paso-descripcion">
                            <div id="pl2-descripcion-paso">
                                <b>Estado Inicial:</b> Cuadrículas vacías. El problema indica que 'Mora' es uno de los apellidos.
                            </div>
                        </div>
                        
                        <div class="matrices-container">
                            <div class="matriz-card">
                                <h4><i class="fas fa-user"></i> Nombres vs Apellidos</h4>
                                <div id="pl2-matriz-nvsa"></div>
                            </div>
                            <div class="matriz-card">
                                <h4><i class="fas fa-shopping-cart"></i> Nombres vs Mercancías</h4>
                                <div id="pl2-matriz-nvsm"></div>
                            </div>
                            <div class="matriz-card">
                                <h4><i class="fas fa-link"></i> Apellidos vs Mercancías</h4>
                                <div id="pl2-matriz-avsm"></div>
                            </div>
                        </div>
                        
                        <div class="solucion-final">
                            <div id="pl2-solucion-final">
                                <p>La solución aparecerá aquí una vez completados todos los pasos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            toolContent.innerHTML = content;
            // Inicializar el problema lógico 2
            setTimeout(() => {
                problemaLogico2.inicializarMatrices();
                problemaLogico2.actualizarUI();
            }, 100);
        } else if(tool === 'problemaLogico3') {
            content = `
            <div class="problema-logico-3">
                <h1 class="main-title">Visitas de Luisa - Problema Lógico Avanzado</h1>
                
                <div class="layout-container">
                    <div class="sidebar-panel">
                        <h3><i class="fas fa-users"></i> Panel de Control</h3>
                        <div class="control-buttons">
                            <button class="btn-control btn-reiniciar" onclick="problemaLogico3.reiniciar()">
                                <i class="fas fa-refresh"></i> Reiniciar
                            </button>
                            <button class="btn-control btn-siguiente" id="pl3-btn-siguiente" onclick="problemaLogico3.siguientePaso()">
                                <i class="fas fa-step-forward"></i> Siguiente
                            </button>
                            <button class="btn-control btn-resolver" onclick="problemaLogico3.resolverTodo()">
                                <i class="fas fa-magic"></i> Resolver
                            </button>
                        </div>
                        
                        <div class="problema-info">
                            <h4><i class="fas fa-info-circle"></i> Problema:</h4>
                            <p>Luisa visita a sus 6 amigas (Ana, Celia, Gloria, Juana, Lola, Mari) durante 6 días (Lunes-Sábado). Cada día una amiga diferente la acompaña a una actividad diferente: Tenis, Concierto, Teatro, Museo, Zoo, Compras. El domingo anterior hubo una fiesta.</p>
                        </div>
                        
                        <div class="problema-info">
                            <h4><i class="fas fa-search"></i> Pistas:</h4>
                            <ul>
                                <li><b>Pista 1:</b> Ana, la visitante del museo y la mujer cuyo día siguió al de la visitante del zoo son rubias. Gloria, la que fue al concierto y la que pasó el lunes con Luisa son morenas.</li>
                                <li><b>Pista 2:</b> El día que pasó Celia con Luisa no siguió inmediatamente al día en que le tocó el turno a Mari.</li>
                                <li><b>Pista 3:</b> Juana estuvo con ella al día siguiente de la visita al zoo y cuatro días antes de la visita al museo. Gloria la acompañó el día después del teatro y un día antes que Mari.</li>
                                <li><b>Pista 4:</b> Ana y la mujer que fue de compras tienen el mismo color de pelo.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="main-content">
                        <div class="paso-descripcion">
                            <div id="pl3-descripcion-paso">
                                <b>Estado Inicial:</b> Cuadrículas vacías.
                            </div>
                        </div>
                        
                        <div class="matrices-tabs">
                            <div class="tab-buttons">
                                <button class="tab-button active" onclick="problemaLogico3.cambiarTab('amiga-dia')">
                                    <i class="fas fa-calendar-alt"></i> Amigas vs Días
                                </button>
                                <button class="tab-button" onclick="problemaLogico3.cambiarTab('amiga-actividad')">
                                    <i class="fas fa-running"></i> Amigas vs Actividades
                                </button>
                                <button class="tab-button" onclick="problemaLogico3.cambiarTab('dia-actividad')">
                                    <i class="fas fa-clock"></i> Días vs Actividades
                                </button>
                                <button class="tab-button" onclick="problemaLogico3.cambiarTab('amiga-color')">
                                    <i class="fas fa-palette"></i> Amigas vs Color
                                </button>
                            </div>
                            
                            <div class="matriz-container">
                                <div id="tab-amiga-dia" class="tab-content active">
                                    <div id="pl3-matriz-amiga-dia"></div>
                                </div>
                                <div id="tab-amiga-actividad" class="tab-content">
                                    <div id="pl3-matriz-amiga-actividad"></div>
                                </div>
                                <div id="tab-dia-actividad" class="tab-content">
                                    <div id="pl3-matriz-dia-actividad"></div>
                                </div>
                                <div id="tab-amiga-color" class="tab-content">
                                    <div id="pl3-matriz-amiga-color"></div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="solucion-final">
                            <div id="pl3-solucion-final">
                                <p>La solución aparecerá aquí una vez completados todos los pasos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            toolContent.innerHTML = content;
            // Inicializar el problema lógico 3
            setTimeout(() => {
                problemaLogico3.inicializarMatrices();
                problemaLogico3.actualizarUI();
            }, 100);
        } else if(tool === 'problemaLogico4') {
            loadProblemaLogico4();
        } else if(tool === 'problemaLogico5') {
            loadProblemaLogico5();
        } else if(tool === 'problemaLogico6') {
            loadProblemaLogico6();
        } else if(tool === 'problemaLogico7') {
            loadProblemaLogico7();
        } else if(tool === 'problemaLogico8') {
            loadProblemaLogico8();
        } else if(tool === 'problemaLogico9') {
            loadProblemaLogico9();
        } else if(tool === 'problemaLogico10') {
            loadProblemaLogico10();
        } else if(tool === 'problemaLogico11') {
            loadProblemaLogico11();
        } else if(tool === 'problemaLogico12') {
            loadProblemaLogico12();
        } else if(tool === 'problemaLogico13') {
            loadProblemaLogico13();
        } else if(tool === 'problemaLogico14') {
            loadProblemaLogico14();
        } else if(tool === 'problemaLogico15') {
            loadProblemaLogico15();
        }
        
        if (typeof MathJax !== "undefined" && MathJax.Hub) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, toolContent]);
        }
    }
};

// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado, inicializando aplicación...');
    app.loadTool('introduccion1'); // Cargar la herramienta de introducción por defecto
});

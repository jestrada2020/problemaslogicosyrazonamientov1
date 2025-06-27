// Aplicación principal
const app = {
    currentTool: null,
    sidebarCollapsed: false,
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

        // Auto-collapse sidebar after selecting a tool (except for introduction)
        if (tool !== 'introduccion1' && !this.sidebarCollapsed) {
            setTimeout(() => {
                collapseSidebar();
            }, 500); // Small delay to see the selection
        }

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
                <h1 class="main-title">Problema Lógico 1</h1>
                
                <div class="layout-container">
                    <div class="sidebar-panel">
                        <h3><i class="fas fa-cog"></i> Controles</h3>
                        <div class="control-buttons">
                            <button class="btn-control btn-reiniciar" onclick="problemaLogico.reiniciar()">
                                <i class="fas fa-refresh"></i> Reiniciar
                            </button>
                            <button class="btn-control btn-siguiente" onclick="problemaLogico.siguientePaso()">
                                <i class="fas fa-arrow-right"></i> Siguiente
                            </button>
                            <button class="btn-control btn-resolver" onclick="problemaLogico.resolverTodo()">
                                <i class="fas fa-check-double"></i> Resolver
                            </button>
                        </div>
                        
                        <div class="problema-info">
                            <h4><i class="fas fa-info-circle"></i> Problema</h4>
                            <p>Una joven asiste a una fiesta y conoce a cuatro hombres: señor Castaño, señor Blanco, señor Moreno y señor Rubio. Uno es fotógrafo, otro tendero, otro banquero y otro cantante. Usando las pistas, determine qué profesión tiene cada uno.</p>
                        </div>
                        
                        <div class="problema-info">
                            <h4><i class="fas fa-lightbulb"></i> Pistas</h4>
                            <ul>
                                <li><b>1.</b> El señor Blanco sondea al banquero sobre un préstamo.</li>
                                <li><b>2.</b> El señor Castaño contrató al fotógrafo para su boda.</li>
                                <li><b>3.</b> El cantante y el señor Blanco son amigos sin negocios.</li>
                                <li><b>4.</b> Ni el señor Moreno ni el cantante conocían al señor Rubio.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="main-content">
                        <div class="paso-descripcion">
                            <div id="descripcion-paso"></div>
                        </div>
                        
                        <div class="cuadricula-container">
                            <h3><i class="fas fa-table"></i> Cuadrícula lógica</h3>
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
                            <h3>Solución</h3>
                            <div class="solucion-items" id="solucion-items"></div>
                        </div>
                    </div>
                </div>
            </div>`;
            toolContent.innerHTML = content;
            problemaLogico.init();
        } else if(tool === 'introduccion1') {
            content = `
            <h3>Introducción a la Caja de Herramientas</h3>
            <p>Hace algún tiempo, el profesor Carlos Andrés Escobar Guerra propuso la creación de unas cartillas para los cursos de matemáticas de la Facultad de Ciencias y Biotecnología. Estas cartillas no solo organizaron los contenidos esenciales, sino que también despertaron la necesidad de contar con herramientas prácticas que permitieran desarrollar las actividades propuestas de forma interactiva y significativa.</p>
<p>De esta visión nació la Caja de Herramientas Matemáticas, una plataforma digital dinámica que reúne en un solo entorno virtual una amplia variedad de aplicaciones para apoyar los cursos de Aritmética, Matemáticas I, II y III, así como temáticas más avanzadas. Esta herramienta no solo facilita el aprendizaje de saberes fundamentales, sino que también estimula el pensamiento lógico, la deducción y la capacidad analítica de los estudiantes.</p>
<p>En este entorno, los problemas de lógica y pasatiempos matemáticos seleccionados cumplen un propósito esencial: fomentar la observación, el razonamiento estratégico y el uso inteligente de los datos disponibles. No se requiere ser experto en matemáticas, sino tener disposición para pensar con sentido común, comprender conceptos clave y escoger la herramienta adecuada para llegar a soluciones bien fundamentadas. Esta propuesta pedagógica apunta a que los estudiantes experimenten la satisfacción del descubrimiento mediante el análisis crítico.</p>
<p>La construcción de esta herramienta fue posible gracias al esfuerzo conjunto de un equipo comprometido con la innovación educativa. Destacamos la participación de los profesores Carlos Andrés Escobar Guerra, Pablo Andrés Guzmán, Juan Alberto Arias Quiceno y John Jairo Estrada Álvarez. En particular, Pablo Guzmán aportó sus conocimientos en estadística y programación, fomentando la formación de un grupo de estudio clave en la evolución del proyecto. Por su parte, John Jairo Estrada asumió el liderazgo técnico, integrando tecnologías como R, LaTeX, Shiny, Flexdashboard, Bookdown y GeoGebra, complementadas con un diseño moderno en HTML, CSS y JavaScript.</p>
<p>Queremos reconocer como autora principal de los problemas lógicos a Rosalind Moore. Agradecemos la gentileza de Guillermo Mejía y la labor del preparador Patricio Barros. De igual manera, rendimos homenaje a los autores que, con su ingenio, claridad pedagógica y creatividad, inspiraron esta colección de retos lógicos y contribuyeron a crear una experiencia de aprendizaje única. Sus nombres se presentan a continuación con gratitud y reconocimiento:</p>
<p>M. J. Arterberry, Karen J. Allen, Diane C. Baldwin, Frank A. Bauckman, Lois Bohnsack, Haydon Calhoun, Fred H. Dale, Roseann Fairchild, Karen Feinberg, Tara Lynn Fulton, Jean M. Hannagan, Joanne Horton, Carol Johnson, Gary Maeder, Virginia C. McCarthy, Cheryl McLaughlin, Edna M. McNellis, Kathleen A. Misze, W. H. Organ ,Nancy R. Patterson, Mary A. Powell, Evelyn B. Rosenthal, Margaret Ruff, Dodi Schultz, Margaret Shoop / Margaret E. Shoop, Julie Spence, Jennifer Stern, Faye Taylor, Randall L. Whipkey, Diane Yoko</p>
<p>Gracias a todos ellos, y a cada persona que ha creído en el poder transformador de las matemáticas, por hacer posible este proyecto. Invitamos a los estudiantes a explorar cada desafío con entusiasmo y a disfrutar del proceso de descubrir y razonar, porque el conocimiento que se construye con lógica y pasión permanece para siempre.</p>
            <p> </p>`;
            toolContent.innerHTML = content;
        /* 
        
        */
        } else if(tool === 'problemaLogico2') {
            content = `
            <div class="problema-logico-2">
                <h1 class="main-title">Problema Lógico 2</h1>
                
                <div class="layout-container">
                    <div class="sidebar-panel">
                        <h3><i class="fas fa-cog"></i> Controles</h3>
                        <div class="control-buttons">
                            <button class="btn-control btn-reiniciar" onclick="problemaLogico2.reiniciar()">
                                <i class="fas fa-refresh"></i> Reiniciar
                            </button>
                            <button class="btn-control btn-siguiente" id="pl2-btn-siguiente" onclick="problemaLogico2.siguientePaso()">
                                <i class="fas fa-arrow-right"></i> Siguiente
                            </button>
                            <button class="btn-control btn-resolver" onclick="problemaLogico2.resolverTodo()">
                                <i class="fas fa-check-double"></i> Resolver
                            </button>
                        </div>
                        
                        <div class="problema-info">
                            <h4><i class="fas fa-info-circle"></i> Problema</h4>
                            <p>Cinco chicos venden refrescos y golosinas en el estadio. Cada uno vende una mercancía diferente. Determine el nombre completo y qué vende cada uno.</p>
                        </div>
                        
                        <div class="problema-info">
                            <h4><i class="fas fa-lightbulb"></i> Pistas</h4>
                            <ul>
                                <li><b>1.</b> Jorge (no López) no vende palomitas.</li>
                                <li><b>2.</b> Díaz no vende gaseosa ni caramelos.</li>
                                <li><b>3.</b> Son cinco: Noel, Jorge, Soto, Cobos y el vendedor de helados.</li>
                                <li><b>4.</b> Andrés no es López ni Cobos. Ni Andrés ni Cobos venden caramelos.</li>
                                <li><b>5.</b> Los vendedores de cacahuetes y helados no son Paco ni Díaz.</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="main-content">
                        <div class="paso-descripcion">
                            <div id="pl2-descripcion-paso">
                                Estado inicial: cuadrículas vacías. El problema indica que 'Mora' es uno de los apellidos.
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

// Funciones para manejar el sidebar colapsable
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const toggleBtn = document.getElementById('menu-toggle');
    const icon = toggleBtn.querySelector('i');
    
    if (app.sidebarCollapsed) {
        // Expandir sidebar
        sidebar.classList.remove('collapsed');
        content.classList.remove('sidebar-collapsed');
        toggleBtn.classList.add('menu-open');
        icon.className = 'fas fa-times';
        app.sidebarCollapsed = false;
    } else {
        // Colapsar sidebar
        sidebar.classList.add('collapsed');
        content.classList.add('sidebar-collapsed');
        toggleBtn.classList.remove('menu-open');
        icon.className = 'fas fa-bars';
        app.sidebarCollapsed = true;
    }
}

function collapseSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const toggleBtn = document.getElementById('menu-toggle');
    const icon = toggleBtn.querySelector('i');
    
    sidebar.classList.add('collapsed');
    content.classList.add('sidebar-collapsed');
    toggleBtn.classList.remove('menu-open');
    icon.className = 'fas fa-bars';
    app.sidebarCollapsed = true;
}

function expandSidebar() {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const toggleBtn = document.getElementById('menu-toggle');
    const icon = toggleBtn.querySelector('i');
    
    sidebar.classList.remove('collapsed');
    content.classList.remove('sidebar-collapsed');
    toggleBtn.classList.add('menu-open');
    icon.className = 'fas fa-times';
    app.sidebarCollapsed = false;
}

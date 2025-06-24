// Test rápido para verificar funcionalidad Gauss-Jordan
console.log('=== TEST MANUAL GAUSS-JORDAN ===');

// Verificar que todo esté cargado
setTimeout(() => {
    console.log('Estado después de 2 segundos:');
    console.log('- window.app:', typeof window.app);
    console.log('- app.gaussJordan:', typeof window.app?.gaussJordan);
    console.log('- loadGaussJordanExample:', typeof window.loadGaussJordanExample);
    console.log('- resetGaussJordan:', typeof window.resetGaussJordan);
    
    // Si todo está bien, hacer una prueba básica
    if (typeof window.app?.gaussJordan?.init === 'function') {
        console.log('✓ Funcionalidad disponible');
        
        // Test básico
        try {
            const gj = window.app.gaussJordan;
            console.log('Dimensiones actuales:', gj.rows + 'x' + gj.cols);
            console.log('Matriz actual length:', gj.matrix.length);
            console.log('Steps length:', gj.steps.length);
            console.log('History length:', gj.history.length);
            console.log('✓ Test básico completado sin errores');
        } catch (e) {
            console.error('❌ Error en test básico:', e);
        }
    } else {
        console.error('❌ Funcionalidad no disponible');
    }
}, 2000);

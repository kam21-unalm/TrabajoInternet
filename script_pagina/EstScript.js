// Función para cargar y mostrar las imágenes generadas por Python
function mostrarImagenes() {
    // Mostrar el gráfico de barras (imagen generada por Python)
    const graficoBarras = document.getElementById('graficoBarras');
    graficoBarras.src = 'grafico_barras.png';  // Ruta de la imagen generada por Python para el gráfico de barras

    // Mostrar el gráfico de dispersión (imagen generada por Python)
    const graficoDispersion = document.getElementById('graficoDispersion');
    graficoDispersion.src = 'grafico_dispersion.png';  // Ruta de la imagen generada por Python para el gráfico de dispersión
}

// Ejecutar la función para mostrar las imágenes cuando la página se cargue
window.onload = function() {
    mostrarImagenes();  // Cargar las imágenes generadas por Python cuando la página se cargue
};

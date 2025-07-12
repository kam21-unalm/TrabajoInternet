function cargarDistritos() {
    // Cargar el archivo CSV desde la ruta relativa
    fetch('../processed_data/pobreza_lima.csv') // Ruta relativa al archivo CSV
        .then(response => response.text()) // Obtener el archivo como texto
        .then(data => {
            const rows = data.split('\n'); // Dividir el archivo en filas
            const distritos = new Set(); // Usar un Set para evitar duplicados

            // Procesar la primera fila (encabezados), que tiene los nombres de las columnas
            const headers = rows[0].split(','); // Cambiar de '\t' a ',' para separar por comas
            let distritoIndex = headers.indexOf('DISTRITO'); // Buscar la columna DISTRITO

            // Verificar si la columna DISTRITO existe
            if (distritoIndex === -1) {
                console.error('No se encuentra la columna DISTRITO en el archivo CSV');
                return;
            }

            // Recorrer las filas restantes del archivo (desde la segunda fila) para extraer los distritos
            rows.slice(1).forEach(row => {
                const columns = row.split(','); // Cambiar de '\t' a ',' para separar por comas
                const distrito = columns[distritoIndex].trim(); // Extraer el nombre del distrito
                if (distrito) {
                    distritos.add(distrito); // Agregar al Set para evitar duplicados
                }
            });

            // Llenar el select con los distritos
            const distritoSelect = document.getElementById('distritoSelect');
            distritos.forEach(distrito => {
                const option = document.createElement('option');
                option.value = distrito;
                option.textContent = distrito;
                distritoSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar el archivo CSV:', error);
        });
}

// Ejecutar la función al cargar la página
document.addEventListener('DOMContentLoaded', cargarDistritos);

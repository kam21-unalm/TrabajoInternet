// Función para cargar el archivo Excel y procesar los datos
function cargarDatosExcel() {
    // Asegúrate de que la ruta sea correcta (si el archivo está en 'data/planes_todas_empresas.xlsx')
    fetch('data/planes_todas_empresas.xlsx')  // Ruta correcta del archivo Excel en la carpeta "data"
        .then(response => response.arrayBuffer())  // Leer el archivo como ArrayBuffer
        .then(data => {
            // Leer el archivo Excel y convertirlo en un objeto JavaScript
            const workbook = XLSX.read(data, { type: 'array' });
            const sheet = workbook.Sheets[workbook.SheetNames[0]]; // Acceder a la primera hoja
            const jsonData = XLSX.utils.sheet_to_json(sheet); // Convertir la hoja a formato JSON

            const precios = [];
            const velocidades = [];

            // Procesamos los datos y extraemos los valores
            jsonData.forEach(plan => {
                if (plan["Proveedor"] && plan["Precio regular"] && plan["Velocidad regular"]) {
                    // Limpiar y convertir los datos de precio
                    precios.push(parseFloat(plan["Precio regular"].replace('S/', '').replace(',', '')));

                    // Limpiar y convertir los datos de velocidad
                    velocidades.push(parseInt(plan["Velocidad regular"].replace(' Mbps', '').replace(',', '')));
                }
            });

            // Si no hay datos, mostrar un mensaje de error
            if (precios.length === 0 || velocidades.length === 0) {
                console.error("No se encontraron datos válidos para generar el gráfico.");
                return;
            }

            // Llamamos a la función para generar el gráfico
            generarGraficoDispercion(precios, velocidades);
        })
        .catch(error => {
            // Mostrar el error si no se puede cargar el archivo
            console.error('Error al leer el archivo Excel:', error);
        });
}

// Función para generar el gráfico de dispersión interactivo
function generarGraficoDispercion(precios, velocidades) {
    const ctx = document.getElementById('graficoDispersión').getContext('2d');
    const graficoDispersión = new Chart(ctx, {
        type: 'scatter',  // Tipo de gráfico: dispersión
        data: {
            datasets: [{
                label: 'Precio vs Velocidad',
                data: precios.map((precio, i) => ({ x: precio, y: velocidades[i] })),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',  // Color de los puntos
                borderColor: 'rgba(153, 102, 255, 1)',      // Color del borde
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',  // Eje X es lineal (para precios)
                    position: 'bottom'  // El eje X estará en la parte inferior
                },
                y: {
                    type: 'linear',  // Eje Y es lineal (para velocidades)
                    position: 'left'  // El eje Y estará en la parte izquierda
                }
            },
            responsive: true,  // El gráfico será responsivo
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            // Formato de los tooltips (cuando pasas el mouse sobre los puntos)
                            return 'Precio: S/' + tooltipItem.raw.x + ' | Velocidad: ' + tooltipItem.raw.y + ' Mbps';
                        }
                    }
                }
            },
            hover: {
                mode: 'nearest',
                intersect: true
            }
        }
    });
}

// Ejecutar la función de carga al cargar la página
window.onload = function() {
    cargarDatosExcel();  // Cargar los datos desde el archivo Excel cuando la página se cargue
};

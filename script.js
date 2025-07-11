// Función para leer el archivo Excel desde el sistema de archivos del proyecto
function cargarArchivoExcel() {
    fetch('planes_todas_empresas.xlsx') // Asegúrate de que la ruta sea correcta
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });

            // Suponiendo que los datos están en la primera hoja
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Aquí almacenamos los datos globalmente
            window.datosPlanes = jsonData;

            // Verificar que los datos se hayan cargado correctamente
            console.log(window.datosPlanes);
        })
        .catch(error => {
            console.error('Error al cargar el archivo Excel:', error);
        });
}

// Llamada a la función al cargar la página
window.onload = cargarArchivoExcel;

// Función para comparar las marcas
function compararMarcas() {
    const tablaPlanes = document.getElementById("tablaPlanes");
    const marcas = {};

    // Verificar que los datos se hayan cargado correctamente
    if (!window.datosPlanes || window.datosPlanes.length === 0) {
        console.log("No se han cargado datos.");
        tablaPlanes.innerHTML = "<p>No se han cargado datos del archivo Excel.</p>";
        return;
    }

    // Recorremos todos los planes y comparamos las marcas
    window.datosPlanes.forEach(plan => {
        if (!marcas[plan.Proveedor]) {
            marcas[plan.Proveedor] = {
                marca: plan.Proveedor,
                totalPrecio: 0,
                totalVelocidad: 0,
                count: 0,
                calidad: [],
                velocidadPromedio: 0,
                precioPromedio: 0,
            };
        }

        // Acumulamos el precio total y la velocidad promedio por marca
        marcas[plan.Proveedor].totalPrecio += parseFloat(plan["Precio regular"].replace('S/', '').replace(',', ''));
        marcas[plan.Proveedor].totalVelocidad += parseInt(plan["Velocidad regular"].replace(' Mbps', '').replace(',', ''));
        marcas[plan.Proveedor].count++;

        // Almacenamos la calidad de los planes
        if (!marcas[plan.Proveedor].calidad.includes(plan.Calidad)) {
            marcas[plan.Proveedor].calidad.push(plan.Calidad);
        }
    });

    // Calculamos el precio y velocidad promedio por marca
    Object.values(marcas).forEach(marca => {
        marca.precioPromedio = (marca.totalPrecio / marca.count).toFixed(2);
        marca.velocidadPromedio = (marca.totalVelocidad / marca.count).toFixed(0);
    });

    // Generar la comparación de marcas
    let contenido = `<div class="comparacion">`;

    // Comparamos las marcas y mostramos los resultados
    Object.values(marcas).forEach(marca => {
        contenido += `
            <div class="tarjeta ${marca.marca.toLowerCase()}">
                <h3>${marca.marca}</h3>
                <p><strong>Precio Promedio:</strong> S/ ${marca.precioPromedio}</p>
                <p><strong>Velocidad Promedio:</strong> ${marca.velocidadPromedio} Mbps</p>
                <p><strong>Calidad:</strong> ${marca.calidad.join(', ')}</p>
            </div>`;
    });

    contenido += `</div>`;

    // Mostrar la sección de comparación de marcas
    tablaPlanes.innerHTML = contenido;

    // Añadir una apreciación final
    const apreciacionFinal = obtenerApreciacionFinal(marcas);
    const divApreciacion = document.createElement('div');
    divApreciacion.classList.add('apreciacion-final');
    divApreciacion.innerHTML = `<h4>Apreciación Final:</h4><p>${apreciacionFinal}</p>`;
    tablaPlanes.appendChild(divApreciacion);
}

// Función para generar la apreciación final
function obtenerApreciacionFinal(marcas) {
    let mejorMarca = '';
    let mejorValor = 0;

    // Evaluar cuál marca tiene el mejor valor, por ejemplo, la mejor relación precio/velocidad
    Object.values(marcas).forEach(marca => {
        const valor = marca.velocidadPromedio / marca.precioPromedio;
        if (valor > mejorValor) {
            mejorValor = valor;
            mejorMarca = marca.marca;
        }
    });

    return `La marca más competitiva es ${mejorMarca}, ya que ofrece el mejor valor en relación precio/velocidad.`;
}

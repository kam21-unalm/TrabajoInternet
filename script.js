function mostrarPlanes() {
    const distrito = document.getElementById("selectDistrito").value;
    const tablaPlanes = document.getElementById("tablaPlanes");
    const planesSection = document.getElementById("planes");
    const data = {
        distrito1: [
            { marca: "Marca 1", velocidad: "20 Mbps", precio: "S/ 100", calidad: "Alta" },
            { marca: "Marca 2", velocidad: "30 Mbps", precio: "S/ 150", calidad: "Alta" }
        ],
        distrito2: [
            { marca: "Marca 1", velocidad: "15 Mbps", precio: "S/ 80", calidad: "Media" },
            { marca: "Marca 3", velocidad: "20 Mbps", precio: "S/ 120", calidad: "Alta" }
        ],
        distrito3: [
            { marca: "Marca 2", velocidad: "10 Mbps", precio: "S/ 60", calidad: "Baja" },
            { marca: "Marca 3", velocidad: "15 Mbps", precio: "S/ 90", calidad: "Media" }
        ]
    };

    let contenido = `<table>
        <thead>
            <tr>
                <th>Marca</th>
                <th>Velocidad</th>
                <th>Precio</th>
                <th>Calidad</th>
            </tr>
        </thead>
        <tbody>`;

    // Añadir filas de la tabla según el distrito seleccionado
    data[distrito].forEach(plan => {
        contenido += `
            <tr>
                <td>${plan.marca}</td>
                <td>${plan.velocidad}</td>
                <td>${plan.precio}</td>
                <td>${plan.calidad}</td>
            </tr>`;
    });

    contenido += `</tbody></table>`;
    
    // Mostrar la sección de planes
    tablaPlanes.innerHTML = contenido;
    planesSection.classList.remove("hidden");
}


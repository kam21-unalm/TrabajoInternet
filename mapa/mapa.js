// Objeto para almacenar el índice de pobreza por distrito
const pobreza = {};

// Paso 1: Leer el CSV con índice de pobreza
fetch('../processed_data/pobreza_lima.csv')  // ✅ Ruta ajustada
  .then(res => res.text())
  .then(texto => {
    // Parsear CSV línea por línea
    texto.split("\n").slice(1).forEach(row => {
      const [distrito, pobreza_str] = row.split(",");
      if (distrito) {
        pobreza[distrito.trim().toUpperCase()] = parseFloat(pobreza_str);
      }
    });

    // Paso 2: Leer el archivo GeoJSON con los distritos
    return fetch('../data/lima_callao_distritos.geojson');  // ✅ Ruta ajustada
  })
  .then(res2 => res2.json())
  .then(geojson => {
    // Paso 3: Crear el mapa centrado en Lima
    const map = L.map('map').setView([-12.05, -77.03], 11);

    // ✅ Conexión a la API pública de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Función para asignar colores según la pobreza
    function getColor(p) {
      return p > 25 ? '#800026' :
             p > 15 ? '#BD0026' :
             p > 10 ? '#E31A1C' :
             p > 5 ? '#FC4E2A' :
             p > 0  ? '#FD8D3C' :
                      '#FFEDA0';
    }

    // Estilo por distrito
    function estilo(feature) {
      const dist = feature.properties.distrito?.toUpperCase() || feature.properties.DISTRITO?.toUpperCase();
      const p = pobreza[dist] || 0;
      return {
        fillColor: getColor(p),
        weight: 1,
        color: 'white',
        fillOpacity: 0.7
      };
    }

    // Añadir distritos al mapa y mostrar datos en popups
    L.geoJson(geojson, {
      style: estilo,
      onEachFeature: (feature, layer) => {
        const dist = feature.properties.distrito || feature.properties.DISTRITO;
        const p = pobreza[dist.toUpperCase()] ?? 'Sin datos';
        layer.bindPopup(`<strong>${dist}</strong><br>Índice de pobreza: ${p}%`);
      }
    }).addTo(map);
  })
  .catch(err => console.error('❌ Error cargando datos:', err));


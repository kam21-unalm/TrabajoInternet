# 🌐 Brecha Digital en Lima Metropolitana

Este proyecto busca analizar las **desigualdades en el acceso a internet fijo** en Lima Metropolitana. Utilizando técnicas de web scraping, recolección de datos abiertos y análisis visual, identificamos cómo varían los precios, velocidades y cobertura del internet entre distritos, y cómo esto se relaciona con variables como pobreza y densidad poblacional.

---

## 🎯 Objetivos del Proyecto

### Objetivo General:
Analizar las desigualdades en el acceso a internet fijo en Lima Metropolitana mediante la recopilación automatizada de datos y su contraste con variables socioeconómicas.

### Objetivos Específicos:
- Extraer datos de planes de internet por distrito: precios, velocidades, tecnología y operador.
- Comparar esta información con indicadores como pobreza, población y número de conexiones.
- Visualizar los resultados en gráficos y mapas.
- Proponer una herramienta para recomendar planes de internet según tu ubicación.

---

## 🗂️ Estructura del Repositorio
TrabajoInternet/
├── data/
│ ├── raw/ # Datos descargados directamente de las fuentes
│ └── processed/ # Datos limpios y combinados
├── src/
│ ├── scraping.py
│ ├── limpieza.py
│ ├── analisis.py
│ └── visualizaciones.py
├── notebooks/
│ ├── exploracion.ipynb
│ └── mapas.ipynb
├── docs/
│ └── informe_final.pdf
├── README.md
└── requerimientos.txt

---

## 🔍 Fuentes de Datos

| Fuente           | Tipo               | Datos Extraídos                                            |
|------------------|--------------------|-------------------------------------------------------------|
| [ChecaTuPlan.pe](https://www.checatuplan.pe/) | Web scraping (Selenium) | Planes por distrito: precio, velocidad, tecnología, operador |
| OSIPTEL          | CSV                | Conexiones fijas, velocidades promedio, tarifas por operador |
| INEI             | CSV / XLS          | Pobreza distrital, población, servicios básicos             |

---

## 🛠️ Herramientas Utilizadas

- Python
- Selenium
- Pandas
- Matplotlib / Seaborn
- GeoPandas
- Jupyter Notebook
- Git & GitHub

---

## 📌 Resultados Esperados

- Tabla comparativa de planes de internet por distrito
- Mapa coroplético de Lima con precios por Mbps
- Gráficos de relación entre pobreza y calidad del internet
- Herramienta que recomienda el mejor plan según tu distrito

---

## 👥 Integrantes del Proyecto

- Fabiana Rojas – [Fabiana1809]
- Kamila Saavedra – [kam21-unalm]
- Arturo Ramirez– [arturoramirezcaro]






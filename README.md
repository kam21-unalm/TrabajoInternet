# 🌐 Brecha Digital en Lima Metropolitana

Este proyecto tiene como objetivo analizar las desigualdades en el acceso a internet fijo en Lima Metropolitana. A través de técnicas de **web scraping**, recolección de **datos abiertos** y análisis visual, identificamos cómo varían los precios y velocidades del internet entre distritos, y cómo esto se relaciona con el **índice de pobreza** en cada zona.

## 🎯 Objetivos del Proyecto

### Objetivo General:
Analizar las desigualdades en el acceso a internet fijo en Lima Metropolitana mediante la recopilación automatizada de datos y su contraste con el índice de pobreza distrital.

### Objetivos Específicos:
- Extraer datos de planes de internet por distrito: precios, velocidades, tecnología y operador.
- Comparar esta información con el índice de pobreza distrital.
- Visualizar los resultados en gráficos y mapas.

## 🗂️ Estructura del Repositorio
TrabajoInternet/
│
├── data/ # Carpeta con los datos crudos y procesados
│ ├── Anexo Estadistico.xlsx # Datos adicionales
│ ├── lima_callao_distritos.geojson # Datos geoespaciales
│ ├── osiptel.csv # Datos de OSIPTEL sobre velocidades y tarifas
│ ├── pobreza_lima.csv # Datos del índice de pobreza por distrito
│ └── planes_todas_empresas.xlsx # Información de planes de distintas operadoras
│
├── imagenes/ # Carpeta con imágenes usadas en visualizaciones
│ ├── fondo1.jpg # Imagen de fondo
│ ├── marcas.jpg # Imagen de marcas
│ └── marcas2.png # Otra imagen de marcas
│
├── mapa/ # Carpeta con archivos relacionados con el mapa
│ ├── mapa.html # Mapa interactivo
│ ├── mapa.js # Script para el mapa
│ └── mapa.html # Página del mapa
│
├── processed_data/ # Datos procesados
│ ├── Webscrap_Empresas.ipynb # Notebook de web scraping
│ ├── internet_pobreza.csv # Datos procesados sobre internet y pobreza
│ ├── merged_data_final.csv # Datos combinados
│ ├── osiptel_lima.csv # Datos procesados de OSIPTEL
│ └── pobreza_lima.csv # Datos procesados del índice de pobreza
│
├── script_pagina/ # Scripts relacionados con la página web
│ ├── EstScripts.js # Scripts generales para la web
│ ├── analisis_planes.py # Script de análisis de los planes
│ ├── estadisticas.html # Página con estadísticas
│ ├── fondo3.jpg # Imagen de fondo
│ └── index.html # Página principal del sitio
│
├── scripts/ # Scripts adicionales de procesamiento
│ ├── filtrar_pobreza.py # Script para filtrar datos de pobreza
│ ├── filtrar_osiptel.py # Script para filtrar datos de OSIPTEL
│ └── unir_datos.py # Script para unir los datos
│
├── README.md # Este archivo
└── index.html # Página principal del sitio

## 🔍 Fuentes de Datos

| Fuente               | Tipo                  | Datos Extraídos                                                                         |
|----------------------|-----------------------|-----------------------------------------------------------------------------------------|
| **ChecaTuPlan.pe**    | Web scraping (Selenium) | Planes de internet por distrito: precio, velocidad, tecnología, operador               |
| **OSIPTEL**           | CSV                   | Conexiones fijas, velocidades promedio, tarifas por operador                             |
| **INEI**              | CSV / XLS             | Pobreza distrital, población, servicios básicos                                        |

## 🛠️ Herramientas Utilizadas

- **Python**
- **Selenium**
- **Pandas**
- **Matplotlib / Seaborn**
- **GeoPandas**
- **Jupyter Notebook**
- **Git & GitHub**

## 📌 Resultados Esperados

- **Tabla comparativa** de planes de internet por distrito.
- **Mapa coroplético** de Lima con precios por Mbps.
- **Gráficos** de relación entre pobreza y calidad del internet.

## 👥 Integrantes del Proyecto

- **Fabiana Rojas** – [Fabiana1809](https://github.com/Fabiana1809)
- **Kamila Saavedra** – [kam21-unalm](https://github.com/kam21-unalm)
- **Arturo Ramirez** – [arturoramirezcaro](https://github.com/arturoramirezcaro)








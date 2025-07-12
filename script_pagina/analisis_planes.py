import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Ruta del archivo Excel
ruta = r"C:\Users\Usuario\Documents\final_ana\TrabajoInternet\data\planes_todas_empresas.xlsx"

# Leer el archivo Excel
df = pd.read_excel(ruta)

# Preprocesar los datos
df['Precio regular'] = df['Precio regular'].replace({'S/': '', ',': ''}, regex=True).astype(float)
df['Velocidad regular'] = df['Velocidad regular'].replace({' Mbps': '', ',': '', 'No indica': np.nan}, regex=True)
df['Velocidad regular'] = pd.to_numeric(df['Velocidad regular'], errors='coerce')

# Definir colores personalizados para cada proveedor
colores = {
    'Bitel': 'yellow',        # Amarillo
    'Claro': 'red',           # Rojo
    'Entel': 'blue',          # Azul
    'Movistar': '#00bcd4',    # Celeste (código de color)
    'Win': 'orange',          # Naranja
    'Wow': 'purple'           # Morado
}

# --- Gráfico de barras: Precio promedio de los planes por proveedor ---
precio_por_proveedor = df.groupby('Proveedor')['Precio regular'].mean()

# Crear gráfico de barras con colores personalizados
plt.figure(figsize=(10, 6))
bars = precio_por_proveedor.plot(kind='bar', color=[colores[proveedor] for proveedor in precio_por_proveedor.index])
plt.title('Precio Promedio de Planes por Proveedor', fontsize=16)
plt.xlabel('Proveedor', fontsize=14)
plt.ylabel('Precio Promedio (S/)', fontsize=14)

# Añadir rejilla
plt.grid(True, which='both', linestyle='--', linewidth=0.5)

# Ajustar el gráfico para que no se corten las etiquetas
plt.tight_layout()

# Guardar la imagen del gráfico de barras en la carpeta 'script_pagina'
plt.savefig(r"C:\Users\Usuario\Documents\final_ana\TrabajoInternet\script_pagina\grafico_barras.png")
plt.close()

# --- Gráfico de dispersión: Relación entre Precio y Velocidad ---
plt.figure(figsize=(10, 6))

# Crear el gráfico de dispersión
for proveedor in df['Proveedor'].unique():
    data = df[df['Proveedor'] == proveedor]
    plt.scatter(data['Precio regular'], data['Velocidad regular'], 
                color=colores[proveedor], label=proveedor, alpha=0.7, s=100)

# Añadir título y etiquetas
plt.title('Relación entre Precio y Velocidad de Planes de Internet', fontsize=16)
plt.xlabel('Precio (S/)', fontsize=14)
plt.ylabel('Velocidad (Mbps)', fontsize=14)

# Añadir rejilla
plt.grid(True, which='both', linestyle='--', linewidth=0.5)

# Añadir leyenda
plt.legend(title="Proveedores", loc="upper left", fontsize=12)

# Ajustar la visualización
plt.tight_layout()

# Guardar la imagen del gráfico de dispersión en la carpeta 'script_pagina'
plt.savefig(r"C:\Users\Usuario\Documents\final_ana\TrabajoInternet\script_pagina\grafico_dispersion.png")
plt.close()


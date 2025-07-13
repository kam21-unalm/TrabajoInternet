import pandas as pd
import plotly.express as px
import numpy as np  # Necesario para manejar los valores nulos

# Ruta del archivo CSV
csv_path = r"C:\Users\Usuario\Documents\final_ana\TrabajoInternet\processed_data\merged_data_final.csv"
df = pd.read_csv(csv_path)

# Preprocesamiento de los datos
df['Velocidad regular'] = df['RANGO_VELOC_BAJADA'].replace({' Mbps': '', ',': '', 'No indica': np.nan}, regex=True)
df['Velocidad regular'] = pd.to_numeric(df['Velocidad regular'], errors='coerce')  # Convertir a numérico, NaN si no es posible
df['Velocidad regular'] = df['Velocidad regular'].fillna(df['Velocidad regular'].median())  # Rellenar con la mediana

# --- Gráfico 1: Distribución de Tecnologías por Distrito ---
df_tec_distrito = df.groupby(['DISTRITO', 'TECNOLOGIA']).size().reset_index(name='count')
fig1 = px.bar(df_tec_distrito, 
              x="DISTRITO", 
              y="count", 
              color="TECNOLOGIA", 
              title="Distribución de Tecnologías de Internet por Distrito",
              labels={"count": "Número de Planes", "DISTRITO": "Distrito", "TECNOLOGIA": "Tecnología"})

# Guardar el gráfico 1 como un archivo HTML
fig1.write_html(r"C:\Users\Usuario\Documents\final_ana\TrabajoInternet\script_pagina\grafico1.html")

# --- Gráfico 2: Número de Proveedores por Distrito ---
df_distrito_proveedores = df.groupby('DISTRITO')['EMPRESA'].nunique().reset_index(name='num_proveedores')
fig2 = px.bar(df_distrito_proveedores, 
              x="DISTRITO", 
              y="num_proveedores", 
              title="Número de Proveedores por Distrito", 
              labels={"num_proveedores": "Número de Proveedores", "DISTRITO": "Distrito"})

# Guardar el gráfico 2 como un archivo HTML
fig2.write_html(r"C:\Users\Usuario\Documents\final_ana\TrabajoInternet\script_pagina\grafico2.html")

# --- Gráfico 3: Pie Chart - Distribución de Tecnologías ---
df_tec_count = df['TECNOLOGIA'].value_counts().reset_index()
df_tec_count.columns = ['Tecnología', 'Cantidad']
fig3 = px.pie(df_tec_count, 
              names='Tecnología', 
              values='Cantidad', 
              title='Distribución de Tecnologías de Internet')

# Guardar el gráfico 3 como un archivo HTML
fig3.write_html(r"C:\Users\Usuario\Documents\final_ana\TrabajoInternet\script_pagina\grafico3.html")

# --- Gráfico 4: Moda de las Empresas (Frecuencia de Empresas) ---
df_empresa_frecuencia = df['EMPRESA'].value_counts().reset_index()
df_empresa_frecuencia.columns = ['Empresa', 'Frecuencia']
fig4 = px.bar(df_empresa_frecuencia, 
              x='Empresa', 
              y='Frecuencia', 
              title='Moda de las Empresas (Frecuencia por Empresa)', 
              labels={'Empresa': 'Nombre de la Empresa', 'Frecuencia': 'Frecuencia'},
              color='Frecuencia', color_continuous_scale='Viridis')

# Ajuste para alargar el gráfico
fig4.update_layout(
    xaxis_tickangle=-45,  # Inclina las etiquetas para que se vean mejor
    height=600,           # Aumenta la altura para hacerlo más largo
    width=1000,           # Aumenta el ancho del gráfico
    margin=dict(l=0, r=0, t=40, b=100)  # Ajusta los márgenes para mejor presentación
)

# Guardar el gráfico 4 como un archivo HTML
fig4.write_html(r"C:\Users\Usuario\Documents\final_ana\TrabajoInternet\script_pagina\grafico4.html")


# --- Gráfico 5: Resumen de Tendencias Clave ---
df_resumen = df.groupby('DISTRITO').agg(
    num_proveedores=('EMPRESA', 'nunique'),
    velocidad_promedio=('Velocidad regular', 'mean'),
    num_empresas=('EMPRESA', 'nunique')
).reset_index()

fig5 = px.bar(df_resumen, 
              x="DISTRITO", 
              y=["num_proveedores", "velocidad_promedio", "num_empresas"], 
              title="Resumen de Tendencias Clave por Distrito",
              labels={
                  "num_proveedores": "Número de Proveedores",
                  "velocidad_promedio": "Velocidad Promedio (Mbps)",
                  "num_empresas": "Número de Empresas"
              },
              barmode='group')

# Guardar el gráfico 5 como un archivo HTML
fig5.write_html(r"C:\Users\Usuario\Documents\final_ana\TrabajoInternet\script_pagina\grafico5.html")







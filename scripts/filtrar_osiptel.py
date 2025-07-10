import pandas as pd

# Ruta del archivo original
ruta_origen = "data/osiptel.csv"

# Cargar datos (el archivo tiene separador ;)
df = pd.read_csv(ruta_origen, sep=";", encoding="latin1")

# Filtrar solo provincia LIMA
df_lima = df[df["PROVINCIA"].str.upper() == "LIMA"]

# Seleccionar columnas clave
columnas = ["DISTRITO", "TECNOLOGÍA", "RANGO_VELOC_BAJADA", "EMPRESA"]
df_filtrado = df_lima[columnas]

# Guardar en carpeta de datos procesados
ruta_salida = "processed_data/osiptel_lima.csv"
df_filtrado.to_csv(ruta_salida, index=False, encoding="utf-8")

print("✅ Archivo filtrado guardado en 'processed_data/osiptel_lima.csv'")

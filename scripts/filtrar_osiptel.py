import pandas as pd

# Ruta del archivo original
ruta_origen = "data/osiptel.csv"

# Leer datos con punto y coma como separador y codificación latin1
df = pd.read_csv(ruta_origen, sep=";", encoding="latin1")

# Normalizar nombres de columnas
df.columns = df.columns.str.strip().str.upper()

# Confirmación visual (opcional, puedes comentar si ya está todo bien)
print("Columnas detectadas:")
print(df.columns)

# Filtrar solo registros de la provincia de LIMA
df_lima = df[df["PROVINCIA"] == "LIMA"]

# Seleccionar columnas clave
columnas = ["DISTRITO", "TECNOLOGÍA", "RANGO_VELOC_BAJADA", "EMPRESA"]
df_filtrado = df_lima[columnas]

# Guardar el archivo limpio
ruta_salida = "processed_data/osiptel_lima.csv"
df_filtrado.to_csv(ruta_salida, index=False, encoding="latin1")  # latin1 para evitar errores de tildes en Excel

print("✅ Archivo limpio guardado en 'processed_data/osiptel_lima.csv'")

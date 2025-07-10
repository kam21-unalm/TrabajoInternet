import pandas as pd

# Ruta al archivo Excel
ruta_excel = "data/Anexo Estadístico.xlsx"

# Cargar hoja A3.16 desde fila 6
df = pd.read_excel(ruta_excel, sheet_name="A3.16", skiprows=6)

# Renombrar columnas importantes
df = df.rename(columns={
    "Unnamed: 2": "PROVINCIA",
    "Unnamed: 3": "DISTRITO",
    "Unnamed: 5": "POBREZA_INFERIOR",
    "Unnamed: 6": "POBREZA_SUPERIOR"
})

# Filtrar solo registros de la provincia de LIMA
df_lima = df[df["PROVINCIA"] == "LIMA"].dropna(subset=["DISTRITO"])

# Calcular el promedio entre límite inferior y superior
df_lima["POBREZA"] = (df_lima["POBREZA_INFERIOR"] + df_lima["POBREZA_SUPERIOR"]) / 2

# Dejar solo distrito y pobreza
df_resultado = df_lima[["DISTRITO", "POBREZA"]]

# Guardar CSV limpio
ruta_salida = "processed_data/pobreza_lima.csv"
df_resultado.to_csv(ruta_salida, index=False, encoding="utf-8")

print("✅ Archivo 'pobreza_lima.csv' generado correctamente.")

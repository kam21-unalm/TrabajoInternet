import pandas as pd

# Ruta al archivo Excel del INEI
ruta_inei = "data/Anexo Estadístico.xlsx"

# Leer desde la fila 6 para saltar encabezados innecesarios
df = pd.read_excel(ruta_inei, sheet_name="A3.16", skiprows=6)

# Renombrar columnas claves para trabajar mejor
df = df.rename(columns={
    "Unnamed: 2": "PROVINCIA",
    "Unnamed: 3": "DISTRITO",
    "Unnamed: 5": "POBREZA_INFERIOR",
    "Unnamed: 6": "POBREZA_SUPERIOR"
})

# Filtrar solo la provincia Lima
df_lima = df[df["PROVINCIA"] == "LIMA"].dropna(subset=["DISTRITO"])

# Calcular pobreza promedio
df_lima["POBREZA"] = (df_lima["POBREZA_INFERIOR"] + df_lima["POBREZA_SUPERIOR"]) / 2

# Seleccionar solo columnas finales
df_final = df_lima[["DISTRITO", "POBREZA"]].copy()

# Guardar archivo limpio
df_final.to_csv("processed_data/pobreza_lima.csv", index=False, encoding="utf-8")

print("✅ Archivo 'pobreza_lima.csv' generado correctamente.")

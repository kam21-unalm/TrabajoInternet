import pandas as pd

# Cargar datasets ya procesados
df_internet = pd.read_csv("processed_data/osiptel_lima.csv", encoding="latin1")
df_pobreza = pd.read_csv("processed_data/pobreza_lima.csv", encoding="utf-8")

# Normalizar nombres de distrito (mayúsculas y sin espacios extra)
df_internet["DISTRITO"] = df_internet["DISTRITO"].str.upper().str.strip()
df_pobreza["DISTRITO"] = df_pobreza["DISTRITO"].str.upper().str.strip()

# Unir por 'DISTRITO'
df_final = pd.merge(df_internet, df_pobreza, on="DISTRITO", how="left")

# Guardar archivo combinado
df_final.to_csv("processed_data/internet_pobreza.csv", index=False, encoding="utf-8")

print("✅ Archivo combinado guardado como 'internet_pobreza.csv'")

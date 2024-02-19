from pymongo import MongoClient
import random

# Establecer la conexión con MongoDB
client = MongoClient('mongodb+srv://val21328:joto76fiji@cluster0.ubmwx9v.mongodb.net/?retryWrites=true&w=majority', 27017)  # Puedes especificar la dirección del servidor y el puerto aquí

# Seleccionar o crear una base de datos
db = client['Proyecto1BDD2']  # Cambia 'mi_base_de_datos' al nombre de tu base de datos


# Seleccionar o crear una colección
collection = db['Arreglos']  # Cambia 'arreglos' al nombre de tu colección

# Función para generar un arreglo de elementos mixtos
def generar_arreglo_mixto(nombreArreglo):
    cantidad_total = 0
    nombre_arreglo = nombreArreglo
    arreglo_mixto = {
        "Nombre de arreglo": nombre_arreglo,
        "Elemento": {
            "Cantidad_total": cantidad_total,
            "Tipo": {
                "Flores": {"Cantidad": random.randint(1, 24), "Tipo de flor": random.choice(["Rosa", "Lirio", "Tulipán", "Margarita", "Girasol", "Orquídea", "Clavel", "Peonía", "Gerbera", "Lavanda", "Crisantemo", "Hortensia", "Astromelia", "Caléndula", "Narciso", "Dalia", "Azucena", "Campanilla", "Jacinto", "Gardenia"])},
                "Globos": {"Cantidad": random.randint(1, 10), "Tipo de globo": random.choice(["Globos metálicos", "Globos de látex", "Globos gigantes", "Globos LED", "Globos de helio", "Globos impresos", "Globos en forma de animal", "Globos transparentes"])},
                "Snacks": {"Cantidad": random.randint(1, 6), "Marca": random.choice(["Doritos", "Chocolates", "Dulces", "M&Ms", "Cheetos"])},
                "Botellas": {"Cantidad": random.randint(1, 2), "Alcohol": "Vino"}
            }
        },
        "Existencia": random.randint(0, 10),
        "Precio": random.randint(500, 900),
        "Categoría": "Mixto",
        "SKU": "MIXTO" + str(random.randint(1000, 9999))
    }
    # Calcular la cantidad total de elementos en el arreglo mixto
    for elemento in arreglo_mixto["Elemento"]["Tipo"]:
        cantidad_total += arreglo_mixto["Elemento"]["Tipo"][elemento]["Cantidad"]
    return arreglo_mixto


# Generar arreglos de flores
nombres_flores = ["Ramo de rosas rojas", "Cesta de lirios blancos", "Bouquet primaveral", "Arreglo de girasoles brillantes", "Centro de mesa con margaritas", 
                  "Corona de flores silvestres", "Canasta de tulipanes multicolores", "Ramo de claveles rosados", "Bouquet de peonías", "Cesta de flores tropicales", 
                  "Arreglo de orquídeas exóticas", "Centro de mesa con lilas", "Ramo de margaritas amarillas", "Canasta de crisantemos blancos", 
                  "Bouquet elegante de rosas blancas", "Cesta de flores del campo", "Arreglo de tulipanes rojos y blancos", "Centro de mesa con calas", 
                  "Ramo de flores mixtas", "Bouquet de rosas y lirios", "Cesta de gerberas coloridas", "Arreglo de flores secas", "Centro de mesa con hortensias", 
                  "Ramo de claveles rojos", "Canasta de flores de verano", "Bouquet romántico de rosas y peonías", "Cesta de flores de otoño", 
                  "Arreglo de flores artificiales", "Centro de mesa con astromelias", "Ramo de tulipanes amarillos", "Bouquet vintage de flores silvestres", 
                  "Cesta de lavanda y rosas", "Arreglo de crisantemos y asters", "Centro de mesa con flores de lis", "Ramo de flores exóticas", 
                  "Bouquet de flores tropicales", "Cesta de rosas y lirios", "Arreglo de hortensias azules", "Centro de mesa con orquídeas blancas", 
                  "Ramo de claveles morados", "Bouquet de flores de invierno", "Cesta de flores de Navidad", "Arreglo de bayas y ramas secas", 
                  "Centro de mesa con flores de pascua", "Ramo de peonías rosadas", "Bouquet de flores campestres", "Cesta de flores para el día de la madre", 
                  "Arreglo de rosas y lilas", "Centro de mesa con rosas y margaritas"]
for nombre in nombres_flores:
    cantidad_total = random.randint(1, 24)
    arreglo_flor = {
        "Nombre de arreglo": nombre,
        "Elemento": {
            "Cantidad_total": cantidad_total,
            "Tipo":{
                "Flores": {"Cantidad": cantidad_total, "Tipo de flor": random.choice(["Rosa", "Lirio", "Tulipán", "Margarita", "Girasol", "Orquídea", "Clavel", "Peonía", "Gerbera", "Lavanda", "Crisantemo", "Hortensia", "Astromelia", "Caléndula", "Narciso", "Dalia", "Azucena", "Campanilla", "Jacinto", "Gardenia"])}
            }
        },
        "Existencia": random.randint(0, 10),
        "Precio": random.randint(250, 700),
        "Categoría": random.choice(["Ramo", "Cesta", "Bouquet", "Arreglo", "Centro de mesa", "Corona", "Canasta"]),
        "SKU": "FLOR" + str(random.randint(1000, 9999))
    }
    collection.insert_one(arreglo_flor)

# Generar arreglos de globos
nombres_globos = ["Columna de globos", "Arco de globos", "Torre de globos", "Guirnalda de globos", "Centro de mesa con globos", "Bouquet de globos", 
                  "Cascada de globos", "Nube de globos", "Pilar de globos", "Serpentina de globos", "Escultura de globos", "Corona de globos", "Corazón de globos", 
                  "Arreglo de globos para fiestas", "Ramo de globos", "Columna de globos con luces", "Torre de globos con flores", "Guirnalda de globos con temática",
                    "Centro de mesa con globos y velas", "Bouquet de globos con peluches", "Cascada de globos con estrellas", "Nube de globos con arcoíris", 
                    "Pilar de globos con lazo", "Serpentina de globos con confeti", "Escultura de globos con personajes", "Corona de globos con mensaje", 
                    "Corazón de globos con fotos", "Arreglo de globos para boda", "Ramo de globos con cinta"]
for nombre in nombres_globos:
    cantidad_total = random.randint(1, 10)
    arreglo_globos = {
        "Nombre de arreglo": nombre,
        "Elemento": {
            "Cantidad_total": cantidad_total,
            "Tipo":{
                "Globos": {"Cantidad": cantidad_total, "Tipo de globo": random.choice(["Globos metálicos", "Globos de látex", "Globos gigantes", "Globos LED", "Globos de helio", "Globos impresos", "Globos en forma de animal", "Globos transparentes"])}
            }
        },
        "Existencia": random.randint(0, 10),
        "Precio": random.randint(250, 700),
        "Categoría": random.choice(["Columna", "Arco", "Torre", "Guirnalda", "Centro de mesa", "Bouquet", "Cascada", "Nube", "Pilar", "Serpentina", "Escultura", "Corona", "Corazón", "Arreglo para fiestas", "Ramo"]),
        "SKU": "GLOBO" + str(random.randint(1000, 9999))
    }
    collection.insert_one(arreglo_globos)

# Generar arreglos de snacks
nombres_snacks = ["Torre de Tentaciones", "Fiesta de Picoteo", "Bomba de Bocadillos", "Cesta de Caprichos", "Revolución de Sabores", "Montaña de Delicias", 
                  "Tornado de Tentempiés", "Barco de Botanas", "Cascada de Crujientes", "Jardín de Gourmet"]
for nombre in nombres_snacks:
    cantidad_total = random.randint(1, 6)
    arreglo_snacks = {
        "Nombre de arreglo": nombre,
        "Elemento": {
            "Cantidad_total": cantidad_total,
            "Tipo":{
                "Snacks": {"Cantidad": cantidad_total, "Marca": random.choice(["Doritos", "Chocolates", "Dulces", "M&Ms", "Cheetos"])}
            }
        },
        "Existencia": random.randint(0, 10),
        "Precio": random.randint(250, 700),
        "Categoría": "Snacks",
        "SKU": "SNACK" + str(random.randint(1000, 9999))
    }
    collection.insert_one(arreglo_snacks)

# Generar arreglos de botellas
nombres_botellas = ["Fiesta de Botellas", "Torre de Elixir", "Bouquet de Bebidas", "Cascada de Botellitas", "Rincón de Refrescos", "Montaña de Mojitos", "Sinfonía de Sabores", "Barco de Botellas", "Arcoíris Embotellado", "Estallido de Emociones"]
for nombre in nombres_botellas:
    cantidad_total = random.randint(1, 2)
    arreglo_botellas = {
        "Nombre de arreglo": nombre,
        "Elemento": {
            "Cantidad_total": cantidad_total,
            "Tipo":{
                "Botellas": {"Cantidad": cantidad_total, "Alcohol": "Vino"}
            }
        },
        "Existencia": random.randint(0, 10),
        "Precio": random.randint(250, 700),
        "Categoría": "Botellas",
        "SKU": "BOTELLA" + str(random.randint(1000, 9999))
    }
    collection.insert_one(arreglo_botellas)

#nombres de arreglos mixtos 
nombresArreglosDivertidos = [
  "Torre de Tentaciones y Globos",
  "Fiesta de Picoteo y Flores",
  "Bouquet de Bebidas y Chocolates",
  "Cascada de Botellitas y Dulces",
  "Rincón de Refrescos y Globos",
  "Montaña de Mojitos y Doritos",
  "Sinfonía de Sabores y Globos",
  "Barco de Botellas y Galletas",
  "Arcoíris Embotellado y Frutos Secos",
  "Estallido de Emociones y Chocolates",
  "Columna de Globos y Snacks",
  "Centro de Mesa con Botellas y Flores",
  "Torre de Globos y Dulces",
  "Arreglo de Globos y Chocolates",
  "Guirnalda de Globos y Galletas",
  "Bouquet de Flores y Snacks",
  "Arco de Globos y Botellas",
  "Cesta de Globos y Frutos Secos",
  "Nube de Globos y Doritos",
  "Pilar de Globos y Chocolates",
  "Serpentina de Globos y Flores",
  "Escultura de Globos y Dulces",
  "Corona de Globos y Galletas",
  "Corazón de Globos y Botellas",
  "Arreglo de Botellas y Snacks",
  "Ramo de Globos y Flores",
  "Columna de Botellas y Globos",
  "Bouquet de Snacks y Globos",
  "Torre de Flores y Botellas",
  "Cesta de Snacks y Globos"
];

# Generar arreglos de elementos mixtos
for nombre  in nombresArreglosDivertidos:
    arreglo_mixto = generar_arreglo_mixto(nombre)
    collection.insert_one(arreglo_mixto)

# Confirmar la inserción
print("Datos insertados correctamente en la colección.")

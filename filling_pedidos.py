import pymongo
from pymongo import MongoClient
import random
from datetime import datetime
from faker import Faker

# Establecer la conexión con MongoDB
client = MongoClient('mongodb+srv://val21328:ABCDE12345@cluster0.ubmwx9v.mongodb.net/?retryWrites=true&w=majority', 27017)  # Puedes especificar la dirección del servidor y el puerto aquí

# Seleccionar o crear una base de datos
db = client['Proyecto1BDD2']  # Cambia 'mi_base_de_datos' al nombre de tu base de datos

# Seleccionar o crear una colección
collection_pedidos = db['Pedidos']  # Nombre de la colección de pedidos

# Instanciar el generador Faker
fake = Faker()

# Función para obtener un arreglo aleatorio de la colección de arreglos
def obtener_arreglo_aleatorio():
    arreglos = db['Arreglos']  # Nombre de la colección de arreglos
    return arreglos.aggregate([{ '$sample': { 'size': 1 } }]).next()

# Función para obtener un cliente aleatorio
def obtener_cliente_aleatorio():
    clientes = db['Clientes']  # Nombre de la colección de clientes
    return clientes.aggregate([{ '$sample': { 'size': 1 } }]).next()

# Función para generar un pedido
def generar_pedido(id_pedido):
    arreglo = obtener_arreglo_aleatorio()
    cantidad = random.randint(1, 5)  # Cantidad aleatoria entre 1 y 5
    precio_arreglo = arreglo['Precio']
    subtotal = precio_arreglo * cantidad
    metodo_entrega = random.choice(["Recogido en tienda", "Enviado"])
    precio_envio = 0 if metodo_entrega == "Recogido en tienda" else random.randint(40, 100)
    precio_total = subtotal + precio_envio

    pedido = {
        "ID_pedido": id_pedido,  # ID de pedido aleatorio
        "Destinatario": fake.name(),  # Nombre de destinatario generado aleatoriamente
        "Comprador": obtener_cliente_aleatorio()["CUI"],  # CUI del comprador aleatorio
        "Fecha": fake.date_time_between(start_date='-1y', end_date='now'),  # Fecha aleatoria en el último año
        "Arreglo_entregado": {"arreglo": arreglo['SKU'], "cantidad": cantidad},
        "Dirección": fake.address(),  # Dirección generada aleatoriamente
        "Método_de_pago": random.choice(["Contra entrega", "Tarjeta"]),
        "Estado": random.choice(["Entregado", "No entregado"]),
        "Método_de_entrega": metodo_entrega,
        "Precio_envío": precio_envio,
        "Subtotal": subtotal,
        "Precio_total": precio_total
    }
    return pedido

# Generar 50 pedidos de ejemplo

id_pedido = 1
for _ in range(50000):
    pedido = generar_pedido(id_pedido)
    collection_pedidos.insert_one(pedido)
    id_pedido += 1

print("Pedidos insertados correctamente en la colección.")

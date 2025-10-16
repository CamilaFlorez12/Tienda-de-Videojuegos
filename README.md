# 📚 Documentación de la API - Inventario Tienda de Videojuegos

### 🚀 Introducción

Este proyecto es un Control de Inventario para una Tienda de Videojuegos que permite gestionar productos físicos como videojuegos y consolas, así como controlar las ventas y el stock disponible.

La API facilita registrar productos con sus atributos principales (nombre, tipo, precio y cantidad), gestionar ventas descontando automáticamente el stock y validar que no se puedan realizar ventas si el inventario es insuficiente.

Este sistema está diseñado para simplificar y automatizar la gestión de inventarios en tiendas de videojuegos físicas.


## 📌 Endpoints Principales
### Productos

#### GET /api/productos

Obtiene la lista de todos los productos disponibles.

Respuesta exitosa (200 OK):

``` js

[
  {
    "id": 1,
    "nombre": "Super Mario Odyssey",
    "tipo": "juego",
    "precio": 50,
    "cantidad": 20
  },
  {
    "id": 2,
    "nombre": "PlayStation 5",
    "tipo": "consola",
    "precio": 499,
    "cantidad": 5
  }
]
```

#### POST /api/productos

Crea un nuevo producto.

Cuerpo de la solicitud:
```js 
{
  "nombre": "Nintendo Switch",
  "tipo": "consola",
  "precio": 299,
  "cantidad": 15
}
```

Respuesta exitosa (201 Created):
```js
{
  "id": 3,
  "nombre": "Nintendo Switch",
  "tipo": "consola",
  "precio": 299,
  "cantidad": 15
}
```
### Ventas

#### POST /api/ventas

Registra una venta y descuenta automáticamente el stock del producto.

Cuerpo de la solicitud:
```js
{
  "productoId": 1,
  "cantidad": 2
}
```

Respuestas posibles:

201 Created: Venta registrada correctamente y stock actualizado.

400 Bad Request: Si no hay stock suficiente para la venta.

## 🛠️ Uso con Swagger UI
```
Para probar los endpoints directamente desde la interfaz Swagger, visita:

http://localhost:4000/documentation#/

Desde allí, puedes interactuar con la API, enviar solicitudes y ver respuestas en tiempo real.
```

## 🧪 Ejemplos de Solicitudes
#### Obtener productos

- GET: "http://localhost:4000/api/productos"

#### Crear un nuevo producto
- POST "http://localhost:4000/api/productos" 
```js
'{"nombre":"Nintendo Switch",
"tipo":"consola",
"precio":299,
"cantidad":15}'
```

#### Registrar una venta
- POST "http://localhost:4000/api/ventas" 
```js
{
    "cliente_id":"652a4c7e12f0a7c2d1b7f1a1",
    "productos":[
        {
            "videojuego_id":"68ed80366aae2d93bdc5f52e",
            "nombre":"FIFA 25",
            "cantidad":5,
            "precio_unitario":20000
        }
    ]
}
```
## 📄 Especificación OpenAPI

La especificación completa de la API está disponible en formato OpenAPI 3.0 en los archivos:

- openapi.json

## 🛠️ Desarrollo

Para  ejecutar el proyecto localmente:

### Clona el repositorio:

[git clone ](https://github.com/CamilaFlorez12/Tienda-de-Videojuegos)


### Instala las dependencias:

- npm install


### Ejecuta el servidor:

- npm start

## 🔗 Repositorio front 

- [Repositorio front](https://github.com/ValentinaDelgadoRincon/Frontend_inventario)

## 👨‍💻  Autoras
- Valentina Delgado
- Camila Florez
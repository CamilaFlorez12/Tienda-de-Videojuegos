import { conectarDB, obtenerDB } from "./src/config/db";
import { ObjectId } from "mongodb";

async function seed() {
    await conectarDB();

    const productos = [
        {
            _id: new ObjectId("68ed80366aae2d93bdc5f52e"),
            nombre: "FIFA 25",
            tipo: "juego",
            precio: 20000,
            cantidad: 50,
            proveedor: "Electronic arts ",
            fecha: new Date("2025-10-13")
        },
        {
            _id: new ObjectId("68ed80366aae2d93bdc5f52f"),
            nombre: "PlayStation 5",
            tipo: "consola",
            precio: 2800000,
            cantidad: 15,
            proveedor: "Sony Interactive Entertainment",
            fecha: new Date("2025-10-13")
        },
        {
            _id: new ObjectId("68ed80366aae2d93bdc5f530"),
            nombre: "The Legend of Zelda: Tears of the Kingdom",
            tipo: "juego",
            precio: 250000,
            cantidad: 30,
            proveedor: "Nintendo",
            fecha: new Date("2025-10-13")
        }
    ];

    await obtenerDB().collection("productos").deleteMany();
    await obtenerDB().collection("productos").insertMany(productos);

    const ventas = [
        {
            _id: new ObjectId("68ed80366aae2d93bdc5f531"),
            fecha: ISODate("2025-10-13T15:00:00Z"),
            cliente_id: new ObjectId("652a4c7e12f0a7c2d1b7f1a1"),
            productos: [
                {
                    videojuego_id: new ObjectId("68ed80366aae2d93bdc5f52e"),
                    nombre: "FIFA 25",
                    cantidad: 2,
                    precio_unitario: 20000,
                    subtotal: 40000
                },
                {
                    videojuego_id: new ObjectId("68ed80366aae2d93bdc5f530"),
                    nombre: "The Legend of Zelda: Tears of the Kingdom",
                    cantidad: 1,
                    precio_unitario: 250000,
                    subtotal: 250000
                }
            ],
            total: 290000
        }, {
            _id: new ObjectId("68ed80366aae2d93bdc5f532"),
            fecha: ISODate("2025-10-13T16:30:00Z"),
            cliente_id: new ObjectId("652a4c8b52f7d8b2d2c3e2b2"),
            productos: [
                {
                    videojuego_id: new ObjectId("68ed80366aae2d93bdc5f52f"),
                    nombre: "PlayStation 5",
                    cantidad: 1,
                    precio_unitario: 2800000,
                    subtotal: 2800000
                }
            ],
            total: 2800000
        }, {
            _id: new ObjectId("68ed80366aae2d93bdc5f533"),
            fecha: ISODate("2025-10-13T18:45:00Z"),
            cliente_id: new ObjectId("652a4c9618e5a6a3f3d4f3c3"),
            productos: [
                {
                    videojuego_id: new ObjectId("68ed80366aae2d93bdc5f530"),
                    nombre: "The Legend of Zelda: Tears of the Kingdom",
                    cantidad: 2,
                    precio_unitario: 250000,
                    subtotal: 500000
                },
                {
                    videojuego_id: new ObjectId("68ed80366aae2d93bdc5f52e"),
                    nombre: "FIFA 25",
                    cantidad: 3,
                    precio_unitario: 20000,
                    subtotal: 60000
                }
            ],
            total: 560000
        }

    ]

    await obtenerDB().collection("ventas").deleteMany();
    await obtenerDB().collection("ventas").insertMany(ventas);

}

const clientes = [
    {
        _id: ObjectId("652a4c7e12f0a7c2d1b7f1a1"),
        nombre: "Carlos",
        correo: "carlos.mendez@gmail.com"
    },
    {
        _id: ObjectId("652a4c8b52f7d8b2d2c3e2b2"),
        nombre: "María",
        correo: "maria.garcia@gmail.com"
    },
    {
        _id: ObjectId("652a4c9618e5a6a3f3d4f3c3"),
        nombre: "Jorge",
        correo: "jorge.luna@gmail.com"
    },
    {
        _id: ObjectId("652a4ca3fae6b7d4a4e5g4d4"),
        nombre: "Sofía",
        correo: "sofia.ramos@gmail.com"
    },
    {
        _id: ObjectId("652a4cb0cde7c8e5b5f6h5e5"),
        nombre: "Andrés",
        correo: "andres.perez@gmail.com"
    }
    
]

seed();
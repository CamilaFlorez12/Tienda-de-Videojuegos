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
            fecha: new Date("2025-10-13"),
            proveedor: "Electronic arts "
        },
        {
            _id: new ObjectId("68ed80366aae2d93bdc5f52f"),
            nombre: "PlayStation 5",
            tipo: "consola",
            precio: 2800000,
            cantidad: 15,
            fecha: new Date("2025-10-13"),
            proveedor: "Sony Interactive Entertainment"
        },
        {
            _id: new ObjectId("68ed80366aae2d93bdc5f530"),
            nombre: "The Legend of Zelda: Tears of the Kingdom",
            tipo: "juego",
            precio: 250000,
            cantidad: 30,
            fecha: new Date("2025-10-13"),
            proveedor: "Nintendo"
        }
    ];

    await obtenerDB().collection("productos").deleteMany();
    await obtenerDB().collection("productos").insertMany(productos);

    const ventas = [
        {
            _id: new ObjectId("68ed80366aae2d93bdc5f531"),
            fecha: ISODate("2025-10-13T15:00:00Z"),
            cliente_id: new ObjectId("68ed80366aae2d93bdc5f540"),
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
            cliente_id: new ObjectId("68ed80366aae2d93bdc5f541"),
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
            cliente_id: new ObjectId("68ed80366aae2d93bdc5f542"),
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

seed();
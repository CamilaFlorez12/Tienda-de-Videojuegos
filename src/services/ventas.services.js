import { obtenerDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const COLECCION_VENTAS = "ventas";

export async function registrarVentas(datos) {
    const db = obtenerDB();
    const { cliente_id, productos = [], fecha = new Date() } = datos;

    if (!cliente_id || productos.length === 0) {
        throw new Error("Faltan datos obligatorios: cliente_id o productos");
    }

    const productosProcesados = productos.map(producto => {
        const { videojuego_id, nombre, cantidad, precio_unitario } = producto;

        if (!videojuego_id || !nombre || !cantidad || !precio_unitario) {
            throw new Error("Faltan datos en un producto");
        }

        const subtotal = cantidad * precio_unitario;

        return {
            videojuego_id: new ObjectId(videojuego_id),
            nombre,
            cantidad,
            precio_unitario,
            subtotal
        };
    });

    const total = productosProcesados.reduce((sum, p) => sum + p.subtotal, 0);

    const nuevaVenta = {
        fecha: new Date(fecha),
        cliente_id: new ObjectId(cliente_id),
        productos: productosProcesados,
        total
    };

    await db.collection("ventas").insertOne(nuevaVenta);

    for (const producto of productosProcesados) {
        const resultado = await db.collection("productos").updateOne(
            { _id: producto.videojuego_id },
            { $inc: { stock: -producto.cantidad } }
        );

        if (resultado.matchedCount === 0) {
            throw new Error(`Producto no encontrado: ${producto.nombre}`);
        }
    }

    return { message: "Venta creada y stock actualizado" };
}

export async function listarVentas() {
    const ventas = await obtenerDB().collection(COLECCION_VENTAS).find().toArray();
    return ventas;
}

export async function consultarVenta(id) {
    if(!ObjectId.isValid(id)){
        throw new Error("ID de la venta no válido");
    }

    const venta = await obtenerDB().collection(COLECCION_VENTAS).findOne({_id:new ObjectId(id)});

    if(!venta) throw new Error("Venta no encontrada");

    return venta
}
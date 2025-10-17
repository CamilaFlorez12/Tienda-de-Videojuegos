import { obtenerDB, obtenerCliente } from "../config/db.js";
import { ObjectId } from "mongodb";

const COLECCION_VENTAS = "ventas";
const COLECCION_PRODUCTOS = "productos"

export async function registrarVentas(datos) {
    const client = obtenerCliente();
    const session = client.startSession();
    try {
        const db = obtenerDB();
        const {productos = [], fecha = new Date() } = datos;

        if (! productos.length === 0) {
            throw new Error("Faltan datos obligatorios: cliente_id o productos");
        }

        await session.startTransaction();

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

        await db.collection(COLECCION_VENTAS).insertOne(nuevaVenta, { session });

        for (const producto of productosProcesados) {

            const productoEnDB = await db.collection(COLECCION_PRODUCTOS).findOne(
                { _id: producto.videojuego_id },
                { session }
            );

            if (!productoEnDB) {
                throw new Error(`Producto no encontrado: ${producto.nombre}`);
            }

            if (productoEnDB.stock < producto.cantidad) {
                throw new Error(`Stock insuficiente para ${producto.nombre}. Disponible: ${productoEnDB.stock}`);
            }
            const resultado = await db.collection(COLECCION_PRODUCTOS).updateOne(
                { _id: producto.videojuego_id },
                { $inc: { stock: +producto.cantidad } },
                { session }
            );

            if (resultado.modifiedCount === 0) {
                throw new Error(`No se pudo actualizar stock para: ${producto.nombre}`);
            }
        }

        await session.commitTransaction();
        return { message: "Venta creada y stock actualizado" };


    } catch (error) {
        await session.abortTransaction();

        console.error("Error en registrarVentas:", error.message);
        throw new Error("Error al registrar la venta: " + error.message);
    } finally {
        await session.endSession();
    }
}

export async function listarVentas() {
    const ventas = await obtenerDB().collection(COLECCION_VENTAS).find().toArray();
    return ventas;
}

export async function consultarVenta(id) {
    if (!ObjectId.isValid(id)) {
        throw new Error("ID de la venta no válido");
    }

    const venta = await obtenerDB().collection(COLECCION_VENTAS).findOne({ _id: new ObjectId(id) });

    if (!venta) throw new Error("Venta no encontrada");

    return venta
}
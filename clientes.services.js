import { obtenerDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const COLECCION_CLIENTES = "clientes";

export async function registrarCliente(datos) {
    const {nombre,correo} = datos;
    if(!nombre || correo){
        throw new Error("Falta algún campo");
    }

    const cliente = {
        nombre,
        correo
    }
    await obtenerDB().collection(COLECCION_CLIENTES).insertOne(cliente);
    return {message:"Nuevo cliente insertado"}
}

export async function listarClientes() {
    const clientes = await obtenerDB().collection(COLECCION_CLIENTES).find().toArray();
    return clientes;
}

export async function actualizarCliente(id,datos) {
    const resultado = await obtenerDB().collection(COLECCION_CLIENTES).updateOne({_id:new ObjectId(id)},{$set:datos});
    return resultado.matchedCount > 0;
}

export async function eliminarCliente(id) {
    const resultado = await obtenerDB().collection(COLECCION_CLIENTES).deleteOne({_id:new ObjectId(id)});
    return resultado.deletedCount > 0
}
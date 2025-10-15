import { obtenerDB } from "../config/db";
import { objectId } from "mongodb";

const COLECCION_PRODUCTOS = "productos";

export async function registrarVideoJuego(datos) {
    const { nombre, tipo, precio, stock, proveedor } = datos;
    if (!nombre || !tipo || !precio || !stock || proveedor) {
        throw new Error("Falta algún campo");
    }

    if (precio <= 0){
        throw new Error("El precio no puede ser cero o negativo")
    }
    
    const videoJuego = {
        nombre,
        tipo,
        precio,
        stock,
        proveedor,
        fecha : new Date()
    }
    await obtenerDB().collection(COLECCION_PRODUCTOS).insertOne(videoJuego);
    return {message:"Nuevo juego insertado"}
}

export async function listarVideoJuegos() {
    const videojuegos = await obtenerDB().collection(COLECCION_PRODUCTOS).find().toArray();
    return videojuegos;
}

export async function consultarVideoJuego(id) {
    if(!objectId.isValid(id)){
        throw new Error("ID de video juego no válido");
    }

    const videoJuego = await obtenerDB().collection(COLECCION_PRODUCTOS).findone({_id:new objectId(id)});

    if(!videoJuego) throw new Error("Video juego no encontrado");

    return videoJuego
}

export async function actualizarVideoJuego(id,datosActualizados) {
    const resultado = await obtenerDB().collection(COLECCION_PRODUCTOS).updateOne({_id:new objectId(id)},{$set:{datosActualizados}});
    return resultado.matchedCoun > 0;
}

export async function eliminarvideoJuego(id) {
    const resultado = await obtenerDB().collection(COLECCION_PRODUCTOS).deleteOne({_id:new objectId(id)});
    return resultado.deleteCount > 0
    
}
import { obtenerDB } from "./db";
import { objectId } from "mongodb";

const COLECCION_PRODUCTOS = "productos";

export async function registrarVideoJuego(datos) {
    const { nombre, tipo, precio, cantidad, proveedor } = datos;
    if (!nombre || !tipo || !precio || !cantidad || proveedor) {
        throw new Error("Falta algún campo");
    }

    if (precio <= 0){
        throw new Error("El precio no puede ser cero o negativo")
    }
    
    const producto = {
        nombre,
        tipo,
        precio,
        cantidad,
        proveedor,
        fecha : new Date()
    }
    await obtenerDB().collection(COLECCION_PRODUCTOS).insertOne(producto);
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
    const videoJuego = await obtenerDB().collection(COLECCION_PRODUCTOS).updateOne({_id:new objectId(id)},{$set:{datosActualizados}})  
}



export async function editarTituloReceta(id, titulo) {
    const resultado = await obtenerDB().collection(COLECCION_RECETA).updateOne({ _id: new ObjectId(id) }, { $set: { titulo } });
    if (resultado.matchedCount === 0) throw new Error("Receta no encontrada");
    return { message: "Titulo de la receta modificado" };
}
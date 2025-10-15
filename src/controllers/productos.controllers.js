import {
    registrarVideoJuego,
    listarVideoJuegos,
    consultarVideoJuego,
    actualizarVideoJuego,
    eliminarvideoJuego
}
    from "../services/productos.services";

export async function registroVideoJuego(req, res, next) {
    try {
        const videoJuegoCreado = await registrarVideoJuego(req.body);
        res.status(200).json(videoJuegoCreado);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function verVideoJuegos(req, res, next) {
    try {
        const videoJuegos = await listarVideoJuegos();
        res.status(200).json(videoJuegos);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function verVideoJuegoId(req, res, next) {
    try {
        const videoJuego = await consultarVideoJuego(req.params.id);
        if (!videoJuego) return res.status(404).json({ error: "Video juego no encontrado" });
        res.status(200).json(videoJuego)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function actualizacionVideoJuego(req, res, next) {
    try {
        const videoJuegoActualizado = await actualizarVideoJuego(req.params.id, req.body);
        if (!videoJuegoActualizado) return res.status(404).json({ error: "Video juego no encontrado" });
        res.status(200).json(videoJuegoActualizado);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function eliminacionVideoJuego(req, res, next) {
    try {
        const videoJuegoEliminado = await eliminarvideoJuego(req.params.id);
        if (!videoJuegoEliminado) return res.status(404).json({ error: "Video juego no encontrado" });
        res.status(200).json(videoJuegoEliminado);
    } catch (error) {
        res.status(500).json({ error: error })
    }

}
import {
    registrarVentas,
    listarVentas,
    consultarVenta
} from "./ventas.services";

export async function registroVenta(req, res, next) {
    try {
        const ventaCreada = await registrarVentas(req.body);
        res.status(200).json(ventaCreada);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function verVentas(req, res, next) {
    try {
        const ventas = await listarVentas();
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function verVentaId(req, res, next) {
    try {
        const venta = await consultarVenta(req.params.id);
        if (!venta) return res.status(404).json({ error: "Venta no encontrada" });
        res.status(200).json(venta)
    } catch (error) {
        res.status(500).json({ error: error })
    }
}
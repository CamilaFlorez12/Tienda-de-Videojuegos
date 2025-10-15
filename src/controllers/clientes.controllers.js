import {
    registrarCliente,
    listarClientes,
    actualizarCliente,
    eliminarCliente
} from "../services/clientes.services";

export async function registroCliente(req, res, next) {
    try {
        const clienteCreado = await registrarCliente(req.body);
        res.status(200).json(clienteCreado);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function verClientes(req, res, next) {
    try {
        const clientes = await listarClientes();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function actualizacioncliente(req, res, next) {
    try {
        const clienteActualizado = await actualizarCliente(req.params.id, req.body);
        if (!clienteActualizado) return res.status(404).json({ error: "Cliente no encontrado" });
        res.status(200).json(clienteActualizado);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

export async function eliminacionCliete(req, res, next) {
    try {
        const ClienteEliminado = await eliminarCliente(req.params.id);
        if (!ClienteEliminado) return res.status(404).json({ error: "Cliente no encontrado" });
        res.status(200).json(ClienteEliminado);
    } catch (error) {
        res.status(500).json({ error: error })
    }

}
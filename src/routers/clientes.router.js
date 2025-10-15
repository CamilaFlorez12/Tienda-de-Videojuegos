import { Router } from "express";
import { registrarClientesDTO,actualizarCLientesDTO } from "../dtos/clientesDTO.js";
import { registroCliente, verClientes,actualizacioncliente,eliminacionCliete} from "../controllers/clientes.controllers.js";
import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

router.get("/",verClientes);
router.post("/",registrarClientesDTO,validationRequest,registroCliente);
router.patch("/:id",actualizarCLientesDTO,validationRequest,actualizacioncliente);
router.delete("/:id", eliminacionCliete);

export default router;
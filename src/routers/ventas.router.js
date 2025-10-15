import {Router} from "express";
import { registrarVentaDTO } from "../dtos/ventasDTO.js";
import { registroVenta, verVentas,verVentaId} from "../controllers/ventas.controllers.js";

import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

router.get("/",verVentas);
router.get("/:id",verVentaId);
router.post("/",registrarVentaDTO,validationRequest, registroVenta);

export default router;
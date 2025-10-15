import {Router} from express;
import { registrarVentaDTO } from "../dtos/ventasDTO.js";
import { registroVenta, verVentas,verVentaId} from "./ventas.controllers";

import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

router.get("/",verVentas);
router.get("/:id",verVentaId);
router.post("/",registrarVentaDTO,validationRequest, registroVenta);

export default router;
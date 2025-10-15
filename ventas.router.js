import {Router} from express;
import { registrarventaDTO } from "./ventasDTO";
import { registroVenta, verVentas,verVentaId} from "./ventas.controllers";

import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

router.get("/",verVentas);
router.get("/:id",verVentaId);
router.post("/",registrarventaDTO,validationRequest, registroVenta);

export default router;
import { Router } from "express";
import { registrarVideoJuegosDTO,actualizarVideoJuegosDTO } from "../dtos/productosDTO.js";
import { registroVideoJuego,verVideoJuegos,verVideoJuegoId,actualizacionVideoJuego,eliminacionVideoJuego } from "../controllers/productos.controllers.js";

import { validationRequest } from "../middlewares/validatorDTO.js";

const router = Router();

router.get("/",verVideoJuegos);
router.get("/:id",verVideoJuegoId);
router.post("/",registrarVideoJuegosDTO,validationRequest, registroVideoJuego);
router.patch("/:id",actualizarVideoJuegosDTO,validationRequest,actualizacionVideoJuego);
router.delete("/:id", eliminacionVideoJuego);

export default router;
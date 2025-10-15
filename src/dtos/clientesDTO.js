import { body, param } from "express-validator";

export const registrarClientesDTO = [
    body("nombre").isString().trim().notEmpty().withMessage("El nombre es obligatorio"),
    body("correo").isEmail().normalizeEmail().withMessage("Debe proporcionar un correo electrónico válido"),
]

export const actualizarCLientesDTO = [
    body("nombre").optional().isString().trim(),
    body("correo").optional().isEmail().withMessage("Debe ser un correo electrónico válido"),
]
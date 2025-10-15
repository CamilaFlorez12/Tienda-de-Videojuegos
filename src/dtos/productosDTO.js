import { body, param } from "express-validator";

export const registrarVideoJuegosDTO = [
    body("nombre").isString().trim().notEmpty().withMessage("El nombre es obligatorio"),
    body("tipo").isString().trim().notEmpty().withMessage("El tipo es obligatorio"),
    body("precio").isFloat({ gt: 0 }).withMessage("El precio debe ser mayor a cero"),
    body("stock").optional().isInt({ min: 0 }).withMessage("precio obligatorio"),
    body("proveedor").isString().trim().notEmpty().withMessage("El proveedor obligatorio")
]

export const actualizarVideoJuegosDTO = [
    body("nombre").optional().isString().trim(),
    body("tipo").optional().isString().trim(),
    body("precio").optional().isFloat({gt:0}),
    body("stock").optional().isInt({min:0}),
    body("proveedor").optional().isString().trim(),
]
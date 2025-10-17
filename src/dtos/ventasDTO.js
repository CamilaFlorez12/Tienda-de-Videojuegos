import { body, param } from "express-validator";

export const registrarVentaDTO = [
    body("productos").isArray({ min: 1 }).withMessage("Debe incluirse al menos un producto"),
    body("productos.*.videojuego_id").notEmpty().withMessage("El 'videojuego_id' es obligatorio").isMongoId().withMessage("El 'videojuego_id' debe ser un ObjectId válido"),
    body("productos.*.nombre").notEmpty().withMessage("El 'nombre' del producto es obligatorio").isString().withMessage("El 'nombre' debe ser texto"),
    body("productos.*.cantidad").notEmpty().withMessage("La 'cantidad' es obligatoria").isInt({ min: 1 }).withMessage("La 'cantidad' debe ser un número entero mayor que 0"),
    body("productos.*.precio_unitario").notEmpty().withMessage("El 'precio_unitario' es obligatorio").isFloat({ min: 0.01 }).withMessage("El 'precio_unitario' debe ser un número mayor que 0"),
    body("fecha").optional().isISO8601().withMessage("La fecha debe tener formato válido (ISO8601)")
];
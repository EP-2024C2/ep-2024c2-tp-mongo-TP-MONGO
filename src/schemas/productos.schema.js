const Joi = require("joi");

const productoSchema = Joi.object({
  nombre: Joi.string().min(1).required().messages({
    "string.empty": "El nombre no puede estar vacío",
    "any.required": "El nombre del producto es obligatorio",
  }),
  descripcion: Joi.string().min(1).required().messages({
    "string.empty": "La descripción no puede estar vacía",
    "any.required": "La descripción del producto es obligatoria",
  }),
  precio: Joi.number().positive().required().messages({
    "number.base": "El precio debe ser un número válido",
    "number.positive": "El precio debe ser mayor a 0",
    "any.required": "El precio del producto es obligatorio",
  }),
  pathImg: Joi.string().uri().optional().messages({
    "string.uri": "La URL de la imagen no es válida",
  }),
});

module.exports = productoSchema;
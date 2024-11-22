const Joi = require("joi");

const productoSchema = Joi.object({
  nombre: Joi.string().min(1).required().messages({
    "string.empty": "El nombre del producto no puede estar vacío",
    "any.required": "El nombre del producto es obligatorio",
  }),

  descripcion: Joi.string(),

  precio: Joi.number().strict().positive().required().messages({
    "number.base": "El precio del producto debe ser un número",
    "number.empty": "El precio del producto no puede estar vacío",
    "number.positive": "El precio del producto debe ser mayor a 0",
    "any.required": "El precio del producto es obligatorio",
  }),

  pathImg: Joi.string().uri().optional().messages({
    "string.uri": "La URL de la imagen no es válida",
  }),
});

module.exports = productoSchema;

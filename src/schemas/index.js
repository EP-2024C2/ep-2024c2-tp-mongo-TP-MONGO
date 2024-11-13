const productoSchema = require("./productos.schema");
const fabricanteSchema = require("./fabricantes.schema");
const componenteSchema = require("./componentes.schema");
const Joi = require("joi");

const idSchema = Joi.array().items(
  Joi.object({
    id: Joi.number().strict().min(1).required().messages({
      "any.required": "El id es requerido",
      "number.base": "El id debe ser un número",
    }),
  })
);

module.exports = {
  productoSchema,
  fabricanteSchema,
  componenteSchema,
  idSchema,
};
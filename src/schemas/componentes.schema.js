const Joi = require("joi");

const componenteSchema = Joi.object({
  nombre: Joi.string().min(1).required().messages({
    "string.empty": "El nombre no puede estar vacío",
    "any.required": "El nombre del componente es obligatorio",
  }),

  descripcion: Joi.string().min(1).required().messages({
    "string.empty": "La descripción no puede estar vacía",
    "any.required": "La descripción del componente es obligatoria",
  }),
});

module.exports = componenteSchema;
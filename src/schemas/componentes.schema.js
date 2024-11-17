const Joi = require("joi");

const componenteSchema = Joi.object({
  nombre: Joi.string().min(1).required().messages({
    "string.empty": "El nombre del componente no puede estar vacío",
    "any.required": "El nombre del componente es obligatorio",
  }),

  descripcion: Joi.string(), //Verificar!!!
});

module.exports = componenteSchema;

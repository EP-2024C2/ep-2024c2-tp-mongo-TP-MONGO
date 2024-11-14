const Joi = require("joi");

const fabricanteSchema = Joi.object({
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío",
    "any.required": "El nombre del fabricante es obligatorio",
  }),

  direccion: Joi.string().required().messages({
    "string.empty": "La dirección no puede estar vacía",
    "any.required": "La dirección es obligatoria",
  }),

  numeroContacto: Joi.string().strict().required().messages({
    "string.empty": "El número de contacto no puede estar vacío",
    "any.required": "El número de contacto es obligatorio",
  }),

  pathImgPerfil: Joi.string().uri().optional().messages({
    "string.uri": "La URL de la imagen de perfil debe ser válida",
  }),
});

module.exports = fabricanteSchema;
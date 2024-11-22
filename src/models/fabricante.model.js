const mongoose = require("mongoose");

const fabricanteSchema = new mongoose.Schema(
  {
    nombre: { type: mongoose.Schema.Types.String, required: true },
    direccion: { type: mongoose.Schema.Types.String, required: true },
    numeroContacto: { type: mongoose.Schema.Types.String, required: true },
    pathImgPerfil: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: null,
    },
    productos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fabricante", fabricanteSchema);

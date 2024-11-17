const mongoose = require("mongoose");

const fabricanteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    numeroContacto: { type: String, required: true },
    pathImgPerfil: { type: String, required: false },
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

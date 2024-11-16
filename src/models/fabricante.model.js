const mongoose = require("mongoose");

const fabricanteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    direccion: { type: String, required: false },
    numeroContacto: { type: Number, required: false },
    pathImgPerfil: { type: String, required: false },
    productos: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Producto" 
      }
    ], // Relación con productos
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Fabricante", fabricanteSchema);

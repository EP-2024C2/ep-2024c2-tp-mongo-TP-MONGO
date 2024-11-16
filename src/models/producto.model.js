const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    precio: { type: Number, required: true },
    fabricante: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Fabricante",
      },
    ],
    componentes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Componente",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Producto", productoSchema);

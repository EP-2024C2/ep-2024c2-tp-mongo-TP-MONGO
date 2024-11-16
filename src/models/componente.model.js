const mongoose = require("mongoose");

const componenteSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    productos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Producto", // Relación con productos
      },
    ],
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Componente", componenteSchema);

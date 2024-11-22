const mongoose = require("mongoose");

const componenteSchema = new mongoose.Schema(
  {
    nombre: { type: mongoose.Schema.Types.String, required: true },
    descripcion: {
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

module.exports = mongoose.model("Componente", componenteSchema);

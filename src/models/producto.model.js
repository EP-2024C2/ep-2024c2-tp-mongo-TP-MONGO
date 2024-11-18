const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    nombre: { type: mongoose.Schema.Types.String, required: true },
    descripcion: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: null,
    },
    precio: { type: mongoose.Schema.Types.Number, required: true },
    pathImg: {
      type: mongoose.Schema.Types.String,
      required: false,
      default: null,
    },
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
    timestamps: false,
  }
);

module.exports = mongoose.model("Producto", productoSchema);

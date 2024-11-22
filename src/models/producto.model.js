const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const componenteSchema = new mongoose.Schema({
  nombre: {
    type: Schema.Types.String,
    required: true
  },
  descripcion: Schema.Types.String
});

const productoSchema = new mongoose.Schema({
  nombre: {
    type: Schema.Types.String,
    required: true
  },
  descripcion: {
    type: Schema.Types.String
  },
  precio: {
    type: Schema.Types.Number,
    required: true
  },
  pathImg: Schema.Types.String,
  componentes: [componenteSchema],
  fabricantesId: [{
    type: Schema.Types.ObjectId,
    ref: 'Fabricante'
  }]
});

productoSchema.methods.toJSON = function() {
  const productoObject = this.toObject();
  delete productoObject.__v;
  productoObject.fabricantes = productoObject.fabricantesId;
  delete productoObject.fabricantesId;
  return productoObject;
}

module.exports = mongoose.model('Producto', productoSchema);
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const componenteSchema = new mongoose.Schema({
  nombre: {
    type: Schema.Types.String,
    required: true
  },
  descripcion: Schema.Types.String,
  productosId: [{
    type: Schema.Types.ObjectId,
    ref: 'Producto'
  }]
});

componenteSchema.methods.toJSON = function() {
  const componenteObject = this.toObject();
  delete componenteObject.__v;
  componenteObject.productos = componenteObject.productosId;
  delete componenteObject.productosId;
  return componenteObject;
}

module.exports = mongoose.model('Componente', componenteSchema);
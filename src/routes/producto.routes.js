const { Router } = require('express');
const {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  asociarFabricantes,
  getFabricantesDelProducto,
  asociarComponentes,
  getComponentesDelProducto
} = require('../controllers/producto.controller');
const route = Router();

route.get('/', getAllProductos);
route.get('/:id', getProductoById);
route.post('/', createProducto);
route.put('/:id', updateProducto);
route.delete('/:id', deleteProducto);
route.post('/:id/fabricantes', asociarFabricantes);
route.get('/:id/fabricantes', getFabricantesDelProducto);
route.post('/:id/componentes', asociarComponentes)
route.get('/:id/componentes', getComponentesDelProducto);

module.exports = route;
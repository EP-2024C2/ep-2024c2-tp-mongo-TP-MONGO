const { Router } = require('express');

const { getAllFabricantes,getFabricanteById,createFabricante,updateFabricante,deleteFabricante,getProductoDeFabricante,asociarFabricante} = require('../controllers/fabricante.controller');

const route = Router();

route.get('/', getAllFabricantes);
route.get('/:id', getFabricanteById);
route.post('/', createFabricante);
route.put('/:id', updateFabricante);
route.delete('/:id', deleteFabricante);
route.get('/:id/productos',getProductoDeFabricante);

module.exports = route;

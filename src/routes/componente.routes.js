const { Router } = require('express');

const { 
    getAllComponentes,
    getComponenteById,
    createComponente,
    updateComponente,
    deleteComponente,
    getProductosFromComponente,
} = require('../controllers/componente.controller');

const route = Router();

route.get('/', getAllComponentes);
route.get('/:id', getComponenteById);
route.post('/', createComponente);
route.put('/:id', updateComponente);
route.delete('/:id', deleteComponente);
route.get('/:id/productos',getProductosFromComponente);

module.exports = route;


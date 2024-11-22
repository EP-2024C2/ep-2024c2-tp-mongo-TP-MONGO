const { Router } = require('express');
const productoRoutes = require('./producto.routes');
const fabricanteRoutes = require('./fabricante.routes');
const componenteRoutes=  require('./componente.routes');

const router = Router();

router.use('/productos', productoRoutes);

router.use('/fabricantes', fabricanteRoutes);

router.use('/componentes', componenteRoutes);

module.exports = router;

const ProductoController = require("../controllers/producto.controller");
const { schemaValidator, validateId } = require("../middlewares");
const {
  productoSchema,
  fabricanteSchema,
  componenteSchema,
  idSchema,
} = require("../schemas");
const { Producto } = require("../models");
const { Router } = require("express");
const route = Router();

route.get("/", ProductoController.getAll);

route.get("/:id", validateId(Producto, "Producto"), ProductoController.getById);

route.get(
  "/:id/componentes",
  validateId(Producto, "Producto"),
  ProductoController.getComponentesByProducto
);

route.get(
  "/:id/fabricantes",
  validateId(Producto, "Producto"),
  ProductoController.getFabricantesByProducto
);

route.post("/", schemaValidator(productoSchema), ProductoController.create);

route.post(
  "/:id/componentes",
  validateId(Producto, "Producto"),
  schemaValidator(idSchema),
  ProductoController.createComponenteByProducto
);

route.post(
  "/:id/fabricantes",
  validateId(Producto, "Producto"),
  schemaValidator(idSchema),
  ProductoController.createFabricanteByProducto
);

route.put(
  "/:id",
  schemaValidator(productoSchema),
  validateId(Producto, "Producto"),
  ProductoController.update
);

route.delete(
  "/:id",
  validateId(Producto, "Producto"),
  ProductoController.delete
);

module.exports = route;

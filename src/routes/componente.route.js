const ComponenteController = require("../controllers/componente.controller");
const { Router } = require("express");
const route = Router();
const { schemaValidator, validateId } = require("../middlewares");
const { componenteSchema } = require("../schemas");
const { Componente } = require("../models");

route.get("/", ComponenteController.getAll);

route.get(
  "/:id",
  validateId(Componente, "componente"),
  ComponenteController.getById
);

route.get(
  "/:id/productos",
  validateId(Componente, "componente"),
  ComponenteController.getProductosByComponente
);

route.post("/", schemaValidator(componenteSchema), ComponenteController.create);

route.put(
  "/:id",
  schemaValidator(componenteSchema),
  validateId(Componente, "componente"),
  ComponenteController.update
);

route.delete(
  "/:id",
  validateId(Componente, "componente"),
  ComponenteController.delete
);

module.exports = route;
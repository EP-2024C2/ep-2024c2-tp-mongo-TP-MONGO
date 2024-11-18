const ComponenteController = require("../controllers/componente.controller");
const { Router } = require("express");
const route = Router();
const { schemaValidator, validateId } = require("../middlewares");
const { componenteSchema } = require("../schemas");
const { Componente } = require("../models");
const validateAsociation = require("../middlewares/asociationValidator");

route.get("/", ComponenteController.getAll);

route.get(
  "/:id",
  validateId(Componente, "Componente"),
  ComponenteController.getById
);

route.get(
  "/:id/productos",
  validateId(Componente, "Componente"),
  ComponenteController.getProductosByComponente
);

route.post("/", schemaValidator(componenteSchema), ComponenteController.create);

route.put(
  "/:id",
  schemaValidator(componenteSchema),
  validateId(Componente, "Componente"),
  ComponenteController.update
);

route.delete(
  "/:id",
  validateId(Componente, "Componente"),
  validateAsociation(Componente, "Componente", ["productos"]),
  ComponenteController.delete
);

module.exports = route;

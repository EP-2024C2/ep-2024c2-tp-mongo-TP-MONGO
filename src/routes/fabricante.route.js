const FabricanteController = require("../controllers/fabricante.controller");
const { Router } = require("express");
const { schemaValidator, validateId } = require("../middlewares");
const { fabricanteSchema } = require("../schemas");
const { Fabricante } = require("../models");
const validateAsociation = require("../middlewares/asociationValidator");
const route = Router();

route.get("/", FabricanteController.getAll);

route.get(
  "/:id",
  validateId(Fabricante, "Fabricante"),
  FabricanteController.getById
);

route.get(
  "/:id/productos",
  validateId(Fabricante, "Fabricante"),
  FabricanteController.getProductosByFabricante
);

route.post("/", schemaValidator(fabricanteSchema), FabricanteController.create);

route.put(
  "/:id",
  schemaValidator(fabricanteSchema),
  validateId(Fabricante, "Fabricante"),
  FabricanteController.update
);

route.delete(
  "/:id",
  validateId(Fabricante, "Fabricante"),
  validateAsociation(Fabricante, "Fabricante", ["productos"]),
  FabricanteController.delete
);

module.exports = route;

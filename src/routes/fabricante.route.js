const FabricanteController = require("../controllers/fabricante.controller");
const { Router } = require("express");
const { schemaValidator, validateId } = require("../middlewares");
const { fabricanteSchema } = require("../schemas");
const { Fabricante } = require("../models");
const route = Router();

route.get("/", FabricanteController.getAll);

route.get(
  "/:id",
  validateId(Fabricante, "fabricante"),
  FabricanteController.getById
);

route.get(
  "/:id/productos",
  validateId(Fabricante, "fabricante"),
  FabricanteController.getProductosByFabricante
);

route.post("/", schemaValidator(fabricanteSchema), FabricanteController.create);

route.put(
  "/:id",
  schemaValidator(fabricanteSchema),
  validateId(Fabricante, "fabricante"),
  FabricanteController.update
);

route.delete(
  "/:id",
  validateId(Fabricante, "fabricante"),
  FabricanteController.delete
);

module.exports = route;
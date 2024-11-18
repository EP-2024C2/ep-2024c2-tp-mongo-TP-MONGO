const FabricanteController = require("../controllers/fabricante.controller");
const { Router } = require("express");
const { schemaValidator, validateId } = require("../middlewares");
const { fabricanteSchema } = require("../schemas");
const { Fabricante } = require("../models");
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
  FabricanteController.delete
);

module.exports = route;

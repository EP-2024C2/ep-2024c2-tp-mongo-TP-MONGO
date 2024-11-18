const { Fabricante } = require("../models");

class FabricanteController {
  async getAll(req, res) {
    const fabricantes = await Fabricante.find().select(
      "-_id -createdAt -updatedAt -__v -productos"
    );
    res.status(200).send(fabricantes);
  }

  async getById(req, res) {
    const fabricante = await Fabricante.findById(req.params.id, [
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-__v",
      "-productos",
    ]);
    res.status(200).send(fabricante);
  }

  async create(req, res) {
    await Fabricante.create(req.body);
    res.status(201).send({ message: "Producto creado correctamente" });
  }

  async getProductosByFabricante(req, res) {
    const { id } = req.params;
    const fabricante = await Fabricante.findById(id, [
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-__v",
    ]).populate("productos", [
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-__v",
      "-fabricante",
      "-componentes",
    ]);
    res.status(200).send(fabricante);
  }

  async update(req, res) {
    const { id } = req.params;
    await Fabricante.updateOne({ _id: id }, { $set: req.body });
    res.status(200).send({ message: "Fabricante actualizado correctamente" });
  }

  async delete(req, res) {
    const { id } = req.params;
    await Fabricante.deleteOne({ _id: id });
    res.status(200).send({ message: "Componente eliminado correctamente" });
  }
}

module.exports = new FabricanteController();

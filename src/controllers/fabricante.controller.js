const { Fabricante, Producto, Componente } = require("../models");

class FabricanteController {
  async getAll(req, res) {
    const fabricantes = await Fabricante.find()
      .select("-_id -createdAt -updatedAt -__v")
      .populate("productos", [
        "-_id",
        "-createdAt",
        "-updatedAt",
        "-__v",
        "-fabricante",
        "-componentes",
      ]);
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
    try {
      const fabricante = await Fabricante.create(req.body);
      res.status(201).send(fabricante);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
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
    res.status(200).send("Fabricante actualizado correctamente");
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Fabricante.deleteOne({ _id: id });
      res.status(200).send({ message: "Componente eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "No se puede eliminar el fabricante" });
    }
  }
}

module.exports = new FabricanteController();

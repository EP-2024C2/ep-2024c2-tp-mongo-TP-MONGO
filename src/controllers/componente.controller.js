const { Componente } = require("../models");

class ComponenteController {
  async getAll(req, res) {
    const componentes = await Componente.find().select(
      "-_id -createdAt -updatedAt -__v -productos"
    );
    res.status(200).json(componentes);
  }

  async getById(req, res) {
    const componente = await Componente.findById(req.params.id, [
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-__v",
      "-productos",
    ]);
    res.status(200).send(componente);
  }

  async getProductosByComponente(req, res) {
    const { id } = req.params;
    const componente = await Componente.findById(id, [
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
    res.status(200).send(componente);
  }

  async create(req, res) {
    await Componente.create(req.body);
    res.status(201).send({ message: "Producto creado correctamente" });
  }

  async update(req, res) {
    const { id } = req.params;
    await Componente.updateOne({ _id: id }, { $set: req.body });
    res.status(200).send({ message: "Componente actualizado correctamente" });
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await Componente.deleteOne({ _id: id });
      res.status(200).send({ message: "Componente eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "No se puede eliminar el componente" });
    }
  }
}

module.exports = new ComponenteController();

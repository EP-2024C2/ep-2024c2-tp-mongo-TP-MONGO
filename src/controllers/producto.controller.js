const { Producto, Componente, Fabricante } = require("../models");

class ProductoController {
  async getAll(req, res) {
    const productos = await Producto.find().select(
      "-_id -createdAt -updatedAt -__v -fabricante -componentes"
    );
    res.status(200).send(productos);
  }

  async getById(req, res) {
    const { id } = req.params;
    const producto = await Producto.findById(id, [
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-__v",
      "-componentes",
      "-fabricante",
    ]);

    res.status(200).send(producto);
  }

  async create(req, res) {
    await Producto.create(req.body);
    res.status(201).send({ message: "Producto creado correctamente" });
  }

  async update(req, res) {
    const { id } = req.params;
    await Producto.updateOne({ _id: id }, { $set: req.body });
    res.status(200).send({ message: "Producto actualizado correctamente" });
  }

  async delete(req, res) {
    const { id } = req.params;
    await Producto.deleteOne({ _id: id });
    res.status(200).send({ message: "Producto eliminado correctamente" });
  }

  async getComponentesByProducto(req, res) {
    const { id } = req.params;
    const producto = await Producto.findById(id, [
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-__v",
      "-fabricante",
    ]).populate("componentes", ["nombre", "descripcion", "-_id"]);
    res.status(200).send(producto);
  }

  async getFabricantesByProducto(req, res) {
    const { id } = req.params;
    const producto = await Producto.findById(id, [
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-componentes",
      "-__v",
    ]).populate("fabricante", [
      "-_id",
      "-createdAt",
      "-updatedAt",
      "-productos",
      "-__v",
    ]);
    res.status(200).send(producto);
  }

  async createComponenteByProducto(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
      const listaIdsComponentes = body.map(({ id }) => id);

      listaIdsComponentes.forEach(async (idFabricantes) => {
        await Componente.updateOne(
          { _id: idFabricantes },
          { $set: { productos: id } }
        );
      });

      await Producto.updateOne(
        { _id: id },
        { $set: { componentes: listaIdsComponentes } }
      );

      res.status(201).json({ message: "Componentes asociados al producto" });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({ message: "Error al asociar los componentes.", error });
    }
  }

  async createFabricanteByProducto(req, res) {
    const { id } = req.params;
    const { body } = req;

    try {
      const listaIdsFabricantes = body.map(({ id }) => id);

      listaIdsFabricantes.forEach(async (idFabricantes) => {
        await Fabricante.updateOne(
          { _id: idFabricantes },
          { $set: { productos: id } }
        );
      });

      await Producto.updateOne(
        { _id: id },
        { $set: { fabricante: listaIdsFabricantes } }
      );

      res.status(201).json({ message: "Fabricantes asociados al producto" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al asociar los fabricantes.", error });
    }
  }
}

module.exports = new ProductoController();

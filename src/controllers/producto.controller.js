const { Producto, Componente, Fabricante } = require("../models");

class ProductoController {
  async getAll(req, res) {
    const productos = await Producto.findAll();
    res.status(200).send(productos);
  }

  async getById(req, res) {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    res.status(200).send(producto);
  }

  async create(req, res) {
    try {
      const producto = await Producto.create(req.body);
      res.status(201).send(producto);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    producto.update(req.body);
    res.status(200).send(producto);
  }

  async delete(req, res) {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    try {
      await producto.destroy();
      res.status(200).send({ message: "Producto eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "No se puede eliminar el producto" });
    }
  }

  async getComponentesByProducto(req, res) {
    const { id } = req.params;
    const producto = await Producto.findById(id, {
      include: [
        {
          model: Componente,
          attributes: ["nombre", "descripcion"],
          through: { attributes: [] },
        },
      ],
      through: { attributes: [] },
    });
    res.status(200).send(producto);
  }

  async getFabricantesByProducto(req, res) {
    const { id } = req.params;
    const producto = await Producto.findById(id, {
      include: [
        {
          model: Fabricante,
          attributes: [
            "nombre",
            "direccion",
            "numeroContacto",
            "pathImgPerfil",
          ],
          through: { attributes: [] },
        },
      ],
      through: { attributes: [] },
    });
    res.status(200).send(producto);
  }

  async createComponenteByProducto(req, res) {
    const { id } = req.params;
    const { body } = req; // Array de objetos con id

    const producto = await Producto.findById(id);

    try {
      const componentes = await Promise.all(
        body.map(async ({ id }) => {
          return await Componente.findById(id);
        })
      );

      await producto.addComponentes(componentes);

      res.status(201).json({ message: "Componentes asociados al producto" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al asociar los componentes.", error });
    }
  }

  async createFabricanteByProducto(req, res) {
    const { id } = req.params;
    const { body } = req;

    const producto = await Producto.findById(id);

    try {
      const fabricantes = await Promise.all(
        body.map(async ({ id }) => {
          return await Fabricante.findById(id);
        })
      );

      await producto.addFabricantes(fabricantes);

      res.status(201).json({ message: "Fabricantes asociados al producto" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al asociar los fabricantes.", error });
    }
  }
}

module.exports = new ProductoController();
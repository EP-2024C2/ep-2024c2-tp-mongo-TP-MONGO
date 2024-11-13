const { Model } = require("sequelize");
const { Fabricante, Producto, Componente } = require("../models");

class FabricanteController {
  async getAll(req, res) {
    const fabricantes = await Fabricante.findAll();
    res.status(200).send(fabricantes);
  }

  async getById(req, res) {
    const fabricante = await Fabricante.findByPk(req.params.id);
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
    const fabricante = await Fabricante.findByPk(id, {
      include: [
        {
          model: Producto,
          attributes: ["nombre", "descripcion", "precio", "pathImg"],
          include: [
            {
              model: Componente,
              attributes: ["nombre", "descripcion"],
              through: { attributes: [] },
            },
          ],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).send(fabricante);
  }

  async update(req, res) {
    const fabricante = await Fabricante.findByPk(req.params.id);
    fabricante.update(req.body);
    res.status(200).send(fabricante);
  }

  async delete(req, res) {
    const { id } = req.params;
    const fabricante = await Fabricante.findByPk(id);
    try {
      await fabricante.destroy();
      res.status(200).send({ message: "Componente eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "No se puede eliminar el fabricante" });
    }
  }
}

module.exports = new FabricanteController();
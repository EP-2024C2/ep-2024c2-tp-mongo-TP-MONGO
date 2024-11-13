const { Componente, Producto } = require("../models");

class ComponenteController {
  async getAll(req, res) {
    const componentes = await Componente.findAll();
    res.status(200).json(componentes);
  }

  async getById(req, res) {
    const componente = await Componente.findByPk(req.params.id);
    res.status(200).send(componente);
  }

  async getProductosByComponente(req, res) {
    const { id } = req.params;
    const componente = await Componente.findByPk(id, {
      through: { attributes: [] },
      include: [
        {
          model: Producto,
          attributes: ["nombre", "descripcion", "precio", "pathImg"],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).send(componente);
  }

  async create(req, res) {
    try {
      const componente = await Componente.create(req.body);
      res.status(201).send(componente);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }

  async update(req, res) {
    const componente = await Componente.findByPk(req.params.id);
    componente.update(req.body);
    res.status(200).send(componente);
  }

  async delete(req, res) {
    const { id } = req.params;
    const componente = await Componente.findByPk(id);
    try {
      await componente.destroy();
      res.status(200).send({ message: "Componente eliminado correctamente" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "No se puede eliminar el componente" });
    }
  }
}

module.exports = new ComponenteController();
const Componente = require('../models/componente.model');

const getAllComponentes = async (req, res) => {
  try {
    const componentes = await Componente.find().populate('productosId', 'nombre descripcion');
    res.status(200).json(componentes);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener componentes: ${error.message}` });
  }
};

const getComponenteById = async (req, res) => {
  try {
    const { id } = req.params;
    const componente = await Componente.findById(id).populate('productosId', 'nombre descripcion');
    if (!componente) {
      return res.status(404).json({ message: 'Componente no encontrado' });
    }
    res.status(200).json(componente);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener el componente: ${error.message}` });
  }
};

const createComponente = async (req, res) => {
    try {
      const { nombre, descripcion, productosId } = req.body;
      const nuevoComponente = new Componente({ nombre, descripcion, productosId });
      await nuevoComponente.save();
      res.status(201).json(nuevoComponente);
    } catch (error) {
      res.status(400).json({ message: `Error al crear el componente: ${error.message}` });
    }
};

const updateComponente = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, productosId } = req.body;
  
      const componenteActualizado = await Componente.findByIdAndUpdate(
        id,
        { nombre, descripcion, productosId },
        { new: true, runValidators: true } // `new: true` devuelve el documento actualizado
      );
  
      if (!componenteActualizado) {
        return res.status(404).json({ message: 'Componente no encontrado' });
      }
  
      res.status(200).json(componenteActualizado);
    } catch (error) {
      res.status(400).json({ message: `Error al actualizar el componente: ${error.message}` });
    }
  };

const deleteComponente = async (req, res) => {
  try {
    const { id } = req.params;

    const componenteEliminado = await Componente.findByIdAndDelete(id);

    if (!componenteEliminado) {
      return res.status(404).json({ message: 'Componente no encontrado' });
    }

    res.status(200).json({ message: 'Componente eliminado correctamente', componente: componenteEliminado });
  } catch (error) {
    res.status(500).json({ message: `Error al eliminar el componente: ${error.message}` });
  }
};
const getProductosFromComponente = async (req, res) => {
    try {
      const { id } = req.params;
  
      const componente = await Componente.findById(id).populate('productosId', 'nombre descripcion');
  
      if (!componente) {
        return res.status(404).json({ message: 'Componente no encontrado' });
      }
  
      res.status(200).json(componente.productosId);
    } catch (error) {
      res.status(500).json({ message: `Error al obtener productos del componente: ${error.message}` });
    }
  };
  
  module.exports = {
    getAllComponentes,
    getComponenteById,
    createComponente,
    updateComponente,
    deleteComponente,
    getProductosFromComponente,
}
/*prueba*/
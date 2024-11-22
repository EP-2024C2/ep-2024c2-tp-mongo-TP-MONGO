const Producto = require('../models/producto.model');
const Fabricante = require('../models/fabricante.model');
const Componente = require('../models/componente.model');
const mongoose = require('mongoose');

// Obtener todos los productos
const getAllProductos = async (req, res) => {
  try {
    const productos = await Producto.find().select('-fabricantesId -componentes');
    res.status(200).json(productos);
  } catch (error) {
    res.status(404).json({ message: `No se encontró la página solicitada. ${error.message}` });
  }
};

// Obtener un producto por id
const getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findById(id).select('-fabricantesId -componentes');
    res.status(200).json(producto);
  } catch (error) {
    res.status(404).json({ message: `No se encontró la página solicitada. ${error.message}` });
  }
};

// Crear un producto
const createProducto = async (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({ message: 'Los campos nombre y precio son obligatorios.' });
  }
  try {
    const producto = await Producto.create({
      ...req.body
    });
    res.status(201).json({ message: 'El producto se creó con éxito.', producto });
  } catch (error) {
    res.status(400).json({ message: `Error en la creación del producto. ${error.message}` });
  }
};

// Modificar los datos de un producto
const updateProducto = async (req, res) => {
  const { id: _id } = req.params;
  const { nombre, precio, descripcion, pathImg } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({ message: 'Los campos nombre y precio son obligatorios.' });
  }
  try {
    const productoActualizado = await Producto.findByIdAndUpdate({ _id }, {
      ...req.body
    }, { new: true });
    res.status(200).json({ message: 'El producto se modificó con éxito.', productoActualizado });
  } catch (error) {
    res.status(404).json({ message: `Error en la modificación del producto. ${error.message}` });
  }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const productoEliminado = await Producto.findByIdAndDelete({ _id });
    res.status(200).json({ message: 'El producto se eliminó con éxito.', productoEliminado });
  } catch (error) {
    res.status(404).json({ message: `Error al intentar eliminar el producto. ${error.message}` });
  }
};

// Asociar un producto con N fabricantes
const asociarFabricantes = async (req, res) => {
  const { fabricantes } = req.body; // fabricantes es un arreglo de nombres de los fabricantes
  const { id: _id } = req.params;
  const fabrEncontrados = [];
  try {
    for (i = 0; i < fabricantes.length; i++) {
      const unFabricante = await Fabricante.findOne({ nombre: fabricantes[i] });
      fabrEncontrados.push(unFabricante._id);
    }
    const producto = await Producto.updateOne({ _id }, {
      fabricantesId: fabrEncontrados
    });
    res.status(201).json({ message: 'El proceso de asosiación fue éxitoso.', producto });
  } catch (error) {
    res.status(404).json({ message: `No se encontró el recurso solicitado. ${error.message}` });
  }
};

// Obtener todos los fabricantes de un producto
const getFabricantesDelProducto = async (req, res) => {
  const { id: idProducto } = req.params;
  try {
    const producto = await Producto.findById(idProducto).select('-componentes').populate({
      path: 'fabricantesId',
      select: '-__v -productosId'
    });
    res.status(200).json(producto);
  } catch (error) {
    res.status(404).json({ message: `No se encontró el recurso solicitado. ${error.message}` });
  }
};

// Asociar un producto con N componentes
const asociarComponentes = async (req, res) => {
  const { componentes } = req.body; // componentes es un arreglo de nombres de los componentes
  const { id: _id } = req.params;
  const componentesEncontrados = [];
  try {
    for (i = 0; i < componentes.length; i++) {
      const unComponente = await Componente.findOne({ nombre: componentes[i] });
      componentesEncontrados.push(unComponente);
    }
    const producto = await Producto.updateOne({ _id }, {
      componentes: componentesEncontrados
    });
    res.status(201).json({ message: 'El proceso de asosiación fue éxitoso.', producto });
  } catch (error) {
    res.status(404).json({ message: `No se encontró el recurso solicitado. ${error.message}` });
  }
};

// Obtener todos los componentes de un producto
const getComponentesDelProducto = async (req, res) => {
  const { id: idProducto } = req.params;
  try {
    const producto = await Producto.findById(idProducto).select('-fabricantesId');
    res.status(200).json(producto);
  } catch (error) {
    res.status(404).json({ message: `No se encontró el recurso solicitado. ${error.message}` });
  }
}

module.exports = {
  getAllProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  asociarFabricantes,
  getFabricantesDelProducto,
  asociarComponentes,
  getComponentesDelProducto
};
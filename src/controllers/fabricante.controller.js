const { mongoose } = require('mongoose');
const Fabricante = require('../models/fabricante.model');

const getAllFabricantes = async (req, res) => {
    try {
        const fabricantes = await Fabricante.find();
        res.status(200).json(fabricantes);
        
    } catch (error) {
        res.status(404).json({ message: `No se encontró la página solicitada. ${error.message}` })
        
    }
};

const getFabricanteById = async ( req , res) => {
    const { id } = req.params;
    try {
        const fabricante = await Fabricante.findById(id);
        res.status(200).json(fabricante);
        
    } catch (error) {
        res.status(404).json({ message: `No se encontró la página solicitada. ${error.message}` })
        
    }
}
const createFabricante = async (req , res ) => {
    const { nombre , direccion, numeroContacto} = req.body;
    if(!nombre || !direccion || !numeroContacto  ){
        return req.json({ message: `Los campos nombre, direccion y numeroContacto son obligatorios`})
    }
    try {
        const fabricante = await Fabricante.create({
            ...req.body
        });
        res.status(201).json(fabricante);
        
    } catch (error) {
        res.status(400).json({ message: `Error en la creación del fabricante. ${error.message}` });

    }
}
const updateFabricante = async (req, res) => {
    const { id: _id } = req.params;
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body;
    if (!nombre || !direccion || !numeroContacto) {
      return res.status(401).json({ message: 'Los campos nombre, direccion y numeroContacto son obligatorios.' });
    }
    try {
      const fabricanteActualizado = await Fabricante.updateOne({ _id }, {
        nombre,
        direccion,
        numeroContacto,
        pathImgPerfil
      });
      res.status(201).json({ message: 'fabricante actualizado con éxito!', fabricanteActualizado });
    } catch (error) {
      return res.status(404).json({ message: `Error en la modificación del fabricante. ${error.message}` });
    }
  };

  const deleteFabricante = async (req, res) => {
    const { id: _id } = req.params;
    try {
      const fabricanteEliminado = await Fabricante.deleteOne({ _id });
      res.status(200).json({ message: 'Fabricante eliminado con éxito.', fabricanteEliminado });
    } catch (error) {
      res.status(404).json({ message: `Error al eliminar el fabricante. ${error.message}` });
    }
  };
  // crea un fabricante y agrega sus productos
  const asociarFabricante = async ( req , res ) =>{
    const id = req.params.id;
    try {
     const nuevoFabricante ={...req.body, productosId: new mongoose.Types.ObjectId(id)}
     const fabricante = await Fabricante.create(nuevoFabricante);

      res.status(201).json(fabricante)
      
    } catch (error) {
     res.status(400).json({ message: `Error en la creación del fabricante. ${error.message}` });
      
    }
  }

const getProductoDeFabricante = async (req, res) =>{
  const _id = req.params.id;
  try {
    const fabricante = await Fabricante.find({_id}).populate({
      path: 'productosId',
      select: '-__v -fabricantesId'
    });
    res.status(200).json(fabricante)
    
  } catch (error) {
     res.status(404).json({ message: `No se encontró la página solicitada. ${error.message}`})
  }
  
}

module.exports = {
    getAllFabricantes,
    getFabricanteById,
    createFabricante,
    updateFabricante,
    deleteFabricante,
    asociarFabricante,
    getProductoDeFabricante
}

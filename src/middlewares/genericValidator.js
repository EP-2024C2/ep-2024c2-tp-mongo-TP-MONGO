const validateId = (model, modelName) => {
    return async (req, res, next) => {
      const { id } = req.params;
      const instance = await model.findByPk(id);
      if (!instance) {
        return res.status(404).json({ error: `${modelName} no encontrado` });
      }
      next();
    };
  };
  
  module.exports = validateId;
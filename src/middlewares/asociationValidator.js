const validateAsociation = (model, modelName, relatedModels) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const instance = await model.findById(id, relatedModels);

    for (const relatedModel of relatedModels) {
      if (instance[relatedModel]?.length > 0) {
        return res.status(500).json({
          error: `No es posible eliminar al ${modelName}, ya que poseé asociaciones`,
        });
      }
    }

    next();
  };
};

module.exports = validateAsociation;

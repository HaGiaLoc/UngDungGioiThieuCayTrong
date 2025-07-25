const service = require('../services/plant.service');

exports.getAll = async (req, res) => {
  try {
    const plants = await service.getAllPlants(req.query);
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get = async (req, res) => {
  try {
    const plant = await service.getPlantById(req.params.id);
    if (!plant) return res.status(404).json({ error: "Plant not found" });
    res.json(plant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const plant = await service.createPlant(req.body);
    res.status(201).json(plant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const plant = await service.updatePlant(req.params.id, req.body);
    if (!plant) return res.status(404).json({ error: "Plant not found" });
    res.json(plant);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await service.deletePlant(req.params.id);
    if (!result || result.deletedCount === 0) {
      return res.status(404).json({ error: "Plant not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAll: exports.getAll,
  get: exports.get,
  create: exports.create,
  update: exports.update,
  delete: exports.delete,
}; 
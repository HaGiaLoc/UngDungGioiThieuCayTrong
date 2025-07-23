const Plant = require('../models/plant.model');

async function getAllPlants(query = {}) {
  const where = {};
  if (query.featured) where.featured = true;
  if (query.category) where.category = query.category;
  if (query.keyword) where.name = { [require('sequelize').Op.like]: `%${query.keyword}%` };
  return await Plant.findAll({ where });
}

async function getPlantById(id) {
  return await Plant.findByPk(id);
}

async function createPlant(data) {
  return await Plant.create(data);
}

async function updatePlant(id, data) {
  const plant = await Plant.findByPk(id);
  if (!plant) return null;
  await plant.update(data);
  return plant;
}

async function deletePlant(id) {
  return await Plant.destroy({ where: { id } });
}

module.exports = {
  getAllPlants,
  getPlantById,
  createPlant,
  updatePlant,
  deletePlant,
}; 
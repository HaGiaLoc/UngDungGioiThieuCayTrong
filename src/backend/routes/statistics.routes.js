const express = require('express');
const router = express.Router();
const Plant = require('../models/plant.model');
const Category = require('../models/category.model');

/**
 * @swagger
 * /api/statistics:
 *   get:
 *     tags: ["Admin"]
 *     summary: Lấy thống kê tổng quan
 *     responses:
 *       200:
 *         description: Dữ liệu thống kê tổng quan
 */
router.get('/', async (req, res) => {
  try {
    const totalPlants = await Plant.count();
    const totalCategories = await Category.count();
    const visiblePlants = await Plant.count({ where: { status: 'Hiển thị' } });
    const hiddenPlants = await Plant.count({ where: { status: 'Ẩn' } });

    const { Op } = require('sequelize');
    const now = new Date();
    const year = now.getFullYear();
    const plantsByMonth = [];
    for (let m = 0; m < 12; m++) {
      const start = new Date(year, m, 1);
      const end = new Date(year, m + 1, 1);
      const count = await Plant.count({
        where: {
          createdAt: {
            [Op.gte]: start,
            [Op.lt]: end
          }
        }
      });
      plantsByMonth.push(count);
    }

    const categories = await Category.findAll();
    const plantsByCategory = [];
    for (const cat of categories) {
      const count = await Plant.count({ where: { category: cat.name } });
      plantsByCategory.push({ category: cat.name, count });
    }

    res.json({
      totalPlants,
      totalCategories,
      visiblePlants,
      hiddenPlants,
      plantsByMonth,
      plantsByCategory
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 
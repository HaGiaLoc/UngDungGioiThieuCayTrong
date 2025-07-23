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
// GET /api/statistics
router.get('/', async (req, res) => {
  try {
    // Tổng số cây
    const totalPlants = await Plant.count();
    // Tổng số danh mục
    const totalCategories = await Category.count();
    // Số cây đang hiển thị
    const visiblePlants = await Plant.count({ where: { status: 'Hiển thị' } });
    // Số cây đang ẩn
    const hiddenPlants = await Plant.count({ where: { status: 'Ẩn' } });

    // Số cây theo tháng (trong năm hiện tại)
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

    // Số cây theo danh mục
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
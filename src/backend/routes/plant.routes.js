// plantRoutes.js - Route mẫu cho cây trồng

const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plant.controller');

// Lấy danh sách tất cả cây trồng
router.get('/', plantController.getAll);
// Lấy chi tiết một cây trồng
router.get('/:id', plantController.get);
// Thêm cây trồng mới
router.post('/', plantController.create);
// Cập nhật cây trồng
router.put('/:id', plantController.update);
// Xóa cây trồng
router.delete('/:id', plantController.delete);

module.exports = router; 
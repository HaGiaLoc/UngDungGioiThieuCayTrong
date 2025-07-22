// plantRoutes.js - Route mẫu cho cây trồng

const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plant.controller');

/**
 * @swagger
 * /api/plants:
 *   get:
 *     summary: Lấy danh sách tất cả cây trồng
 *     responses:
 *       200:
 *         description: Danh sách cây trồng
 *   post:
 *     summary: Thêm cây trồng mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đã tạo cây trồng mới
 *
 * /api/plants/{id}:
 *   get:
 *     summary: Lấy chi tiết một cây trồng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chi tiết cây trồng
 *       404:
 *         description: Không tìm thấy cây trồng
 *   put:
 *     summary: Cập nhật cây trồng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đã cập nhật cây trồng
 *       404:
 *         description: Không tìm thấy cây trồng
 *   delete:
 *     summary: Xóa cây trồng
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Đã xóa cây trồng
 *       404:
 *         description: Không tìm thấy cây trồng
 */

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
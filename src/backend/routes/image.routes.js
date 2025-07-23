const express = require('express');
const router = express.Router();
const imageController = require('../controllers/image.controller');

/**
 * @swagger
 * /api/images:
 *   get:
 *     tags: ["Image"]
 *     summary: Lấy danh sách tất cả ảnh
 *     responses:
 *       200:
 *         description: Danh sách ảnh
 */
router.get('/', imageController.getAll);

/**
 * @swagger
 * /api/images/{id}:
 *   get:
 *     tags: ["Image"]
 *     summary: Lấy chi tiết ảnh
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chi tiết ảnh
 *       404:
 *         description: Không tìm thấy ảnh
 */
router.get('/:id', imageController.get);

/**
 * @swagger
 * /api/images:
 *   post:
 *     tags: ["Image"]
 *     summary: Thêm ảnh mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Tên ảnh"
 *               src:
 *                 type: string
 *                 description: "Đường dẫn ảnh"
 *     responses:
 *       201:
 *         description: Đã tạo ảnh mới
 */
router.post('/', imageController.create);

/**
 * @swagger
 * /api/images/{id}:
 *   put:
 *     tags: ["Image"]
 *     summary: Cập nhật ảnh
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
 *                 description: "Tên ảnh"
 *               src:
 *                 type: string
 *                 description: "Đường dẫn ảnh"
 *     responses:
 *       200:
 *         description: Đã cập nhật ảnh
 *       404:
 *         description: Không tìm thấy ảnh
 */
router.put('/:id', imageController.update);

/**
 * @swagger
 * /api/images/{id}:
 *   delete:
 *     tags: ["Image"]
 *     summary: Xóa ảnh
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Đã xóa ảnh
 *       404:
 *         description: Không tìm thấy ảnh
 */
router.delete('/:id', imageController.delete);

module.exports = router; 
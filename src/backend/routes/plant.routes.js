// plantRoutes.js - Route mẫu cho cây trồng

const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plant.controller');

/**
 * @swagger
 * /api/plants:
 *   get:
 *     tags: ["Plant"]
 *     summary: Lấy danh sách tất cả cây trồng
 *     responses:
 *       200:
 *         description: Danh sách cây trồng
 */
router.get('/', plantController.getAll);

/**
 * @swagger
 * /api/plants/{id}:
 *   get:
 *     tags: ["Plant"]
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
 */
router.get('/:id', plantController.get);

/**
 * @swagger
 * /api/plants:
 *   post:
 *     tags: ["Plant"]
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
 *                 nullable: true
 *                 description: "Tên cây trồng"
 *               description:
 *                 type: string
 *                 nullable: true
 *                 description: "Mô tả cây trồng"
 *               image:
 *                 type: string
 *                 nullable: true
 *                 description: "Đường dẫn hoặc tên file ảnh"
 *               category:
 *                 type: string
 *                 nullable: true
 *                 description: "Danh mục cây"
 *               status:
 *                 type: string
 *                 nullable: true
 *                 description: "Hiển thị/Ẩn"
 *               featured:
 *                 type: boolean
 *                 nullable: true
 *                 description: "Đánh dấu nổi bật"
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *                 nullable: true
 *                 description: "Mảng đường dẫn ảnh phụ"
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 nullable: true
 *                 description: "Mảng đặc điểm nổi bật"
 *               care:
 *                 type: object
 *                 nullable: true
 *                 description: "Thông tin chăm sóc"
 *                 properties:
 *                   light:
 *                     type: string
 *                     nullable: true
 *                     description: "Ánh sáng"
 *                   water:
 *                     type: string
 *                     nullable: true
 *                     description: "Nước tưới"
 *                   soil:
 *                     type: string
 *                     nullable: true
 *                     description: "Đất"
 *                   temp:
 *                     type: string
 *                     nullable: true
 *                     description: "Nhiệt độ"
 *     responses:
 *       201:
 *         description: Đã tạo cây trồng mới
 */
router.post('/', plantController.create);

/**
 * @swagger
 * /api/plants/{id}:
 *   put:
 *     tags: ["Plant"]
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
 *                 nullable: true
 *                 description: "Tên cây trồng"
 *               description:
 *                 type: string
 *                 nullable: true
 *                 description: "Mô tả cây trồng"
 *               image:
 *                 type: string
 *                 nullable: true
 *                 description: "Đường dẫn hoặc tên file ảnh"
 *               category:
 *                 type: string
 *                 nullable: true
 *                 description: "Danh mục cây"
 *               status:
 *                 type: string
 *                 nullable: true
 *                 description: "Hiển thị/Ẩn"
 *               featured:
 *                 type: boolean
 *                 nullable: true
 *                 description: "Đánh dấu nổi bật"
 *               gallery:
 *                 type: array
 *                 items:
 *                   type: string
 *                 nullable: true
 *                 description: "Mảng đường dẫn ảnh phụ"
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 nullable: true
 *                 description: "Mảng đặc điểm nổi bật"
 *               care:
 *                 type: object
 *                 nullable: true
 *                 description: "Thông tin chăm sóc"
 *                 properties:
 *                   light:
 *                     type: string
 *                     nullable: true
 *                     description: "Ánh sáng"
 *                   water:
 *                     type: string
 *                     nullable: true
 *                     description: "Nước tưới"
 *                   soil:
 *                     type: string
 *                     nullable: true
 *                     description: "Đất"
 *                   temp:
 *                     type: string
 *                     nullable: true
 *                     description: "Nhiệt độ"
 *     responses:
 *       200:
 *         description: Đã cập nhật cây trồng
 *       404:
 *         description: Không tìm thấy cây trồng
 */
router.put('/:id', plantController.update);

/**
 * @swagger
 * /api/plants/{id}:
 *   delete:
 *     tags: ["Plant"]
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
router.delete('/:id', plantController.delete);

module.exports = router; 
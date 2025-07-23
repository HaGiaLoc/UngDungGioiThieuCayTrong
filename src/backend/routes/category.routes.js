const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
/**
 * @swagger
 * /api/categories:
 *   get:
 *     tags: ["Category"]
 *     summary: Lấy danh sách tất cả danh mục
 *     responses:
 *       200:
 *         description: Danh sách danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   status:
 *                     type: string
 *                   count:
 *                     type: integer
 */
router.get('/', categoryController.getAll);

/**
 * @swagger
 * /api/categories:
 *   post:
 *     tags: ["Category"]
 *     summary: Thêm danh mục mới
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Tên danh mục"
 *               status:
 *                 type: string
 *                 description: "Trạng thái (Hiển thị/Ẩn)"
 *               count:
 *                 type: integer
 *                 description: "Số lượng"
 *     responses:
 *       201:
 *         description: Đã tạo danh mục mới
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 *                 count:
 *                   type: integer
 */
router.post('/', categoryController.create);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     tags: ["Category"]
 *     summary: Lấy chi tiết một danh mục
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chi tiết danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 *                 count:
 *                   type: integer
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.get('/:id', categoryController.getById);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     tags: ["Category"]
 *     summary: Cập nhật danh mục
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
 *                 description: "Tên danh mục"
 *               status:
 *                 type: string
 *                 description: "Trạng thái (Hiển thị/Ẩn)"
 *               count:
 *                 type: integer
 *                 description: "Số lượng"
 *     responses:
 *       200:
 *         description: Đã cập nhật danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 *                 count:
 *                   type: integer
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.put('/:id', categoryController.update);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     tags: ["Category"]
 *     summary: Xóa danh mục
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Đã xóa danh mục
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Không tìm thấy danh mục
 */
router.delete('/:id', categoryController.deleteCategory);

module.exports = router; 
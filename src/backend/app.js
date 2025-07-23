const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const plantRoutes = require('./routes/plant.routes');
const categoryRoutes = require('./routes/category.routes');
const imageRoutes = require('./routes/image.routes');
const statisticsRoutes = require('./routes/statistics.routes');
const errorHandler = require('./middlewares/errorHandler');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Cấu hình Swagger - Chuyển từ server.js sang đây
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Green Garden API',
    version: '1.0.0',
    description: 'Tài liệu RESTful API cho Green Garden',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Local server' },
  ],
  tags: [
    { name: 'Plant', description: 'Quản lý cây trồng' },
    { name: 'Category', description: 'Quản lý danh mục' },
    { name: 'Image', description: 'Quản lý ảnh' },
    { name: 'Admin', description: 'Chức năng quản trị: Đăng nhập, Thống kê' },
  ],
};

const options = {
  swaggerDefinition,
  // Đường dẫn đến các file chứa API-docs. __dirname là thư mục hiện tại của file app.js
  apis: [path.join(__dirname, './routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

// Routes
// Chuyển hướng trang chủ đến trang tài liệu API
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/plants', plantRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/auth', authRoutes);

// Xử lý lỗi (đặt ở cuối cùng)
app.use(errorHandler);

module.exports = app;
const express = require('express');
const plantRoutes = require('./routes/plant.routes');
const swaggerUi = require(require.resolve('swagger-ui-express'));
const swaggerJSDoc = require(require.resolve('swagger-jsdoc'));
const cors = require('cors');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

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
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Khi truy cập root, tự động chuyển hướng sang Swagger UI
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use(express.json());
app.use(cors());
app.use('/api/plants', plantRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server đang chạy tại http://localhost:${PORT}`);
  });
}); 
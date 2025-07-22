const express = require('express');
const plantRoutes = require('./routes/plant.routes');
const cors = require('cors');
const { connectDB } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

// Khi truy cập root, tự động chuyển hướng sang Swagger UI
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.use(express.json());
app.use(cors());
app.use('/api/plants', plantRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend server đang chạy tại http://localhost:${PORT}`);
  });
}); 
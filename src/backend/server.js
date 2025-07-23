const app = require('./app'); // Nhập ứng dụng đã cấu hình từ app.js
const { connectDB, sequelize } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Kết nối CSDL và khởi động server
connectDB().then(async () => {
  // Đồng bộ model với CSDL
  await sequelize.sync({ alter: true }); 
  
  // Khởi động server
  app.listen(PORT, () => {
    console.log(`Backend server đang chạy tại http://localhost:${PORT}`);
    console.log(`API docs có tại http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
    console.error('Không thể khởi động server:', err);
    process.exit(1);
});
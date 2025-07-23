const app = require('./app');
const { connectDB, sequelize } = require('./config/database');

const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
  await sequelize.sync({ alter: true }); 
  
  app.listen(PORT, () => {
    console.log(`Backend server đang chạy tại http://localhost:${PORT}`);
    console.log(`API docs có tại http://localhost:${PORT}/api-docs`);
  });
}).catch(err => {
    console.error('Không thể khởi động server:', err);
    process.exit(1);
});
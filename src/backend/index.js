// Điểm khởi đầu cho backend, không có RESTful API
const db = require('./config/database');
const Plant = require('./models/plant.model');

async function main() {
  try {
    await db.connect();
    // Ví dụ: lấy danh sách cây trồng
    const plants = await Plant.getAll();
    console.log('Danh sách cây trồng:', plants);
    await db.disconnect();
  } catch (err) {
    console.error('Lỗi:', err);
  }
}

main(); 
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'greengarden',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || '',
  {
    host: process.env.MYSQL_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối MySQL thành công!');
  } catch (error) {
    console.error('Kết nối MySQL thất bại:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
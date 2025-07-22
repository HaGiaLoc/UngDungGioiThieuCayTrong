const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'greengarden',
  process.env.MYSQL_USER || 'user',
  process.env.MYSQL_PASSWORD || 'password',
  {
    host: process.env.MYSQL_HOST || 'mysql_db',
    dialect: 'mysql',
    logging: false,
  }
);

const connectDB = async () => {
  let connected = false;
  while (!connected) {
    try {
      await sequelize.authenticate();
      console.log('Kết nối MySQL thành công!');
      connected = true;
    } catch (error) {
      console.error('Kết nối MySQL thất bại, thử lại sau 3 giây...');
      await new Promise(res => setTimeout(res, 3000));
    }
  }
};

module.exports = { sequelize, connectDB };
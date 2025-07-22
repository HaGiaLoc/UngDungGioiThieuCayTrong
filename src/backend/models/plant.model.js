const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Plant = sequelize.define('Plant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Hiển thị',
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  gallery: {
    type: DataTypes.JSON, // Lưu mảng đường dẫn ảnh
    allowNull: true,
    defaultValue: [],
  },
  features: {
    type: DataTypes.JSON, // Lưu mảng string
    allowNull: true,
    defaultValue: [],
  },
  care: {
    type: DataTypes.JSON, // Lưu object { light, water, soil, temp }
    allowNull: true,
    defaultValue: {},
  },
}, {
  tableName: 'plants',
  timestamps: true,
});

module.exports = Plant; 
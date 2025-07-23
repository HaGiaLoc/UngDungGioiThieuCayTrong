const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Image = sequelize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  src: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'images',
  timestamps: true,
});

module.exports = Image; 
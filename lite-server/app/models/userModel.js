const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50)
  },
  role: {
    type: DataTypes.STRING(20)
  },
  contact: {
    type: DataTypes.STRING(50)
  },
  password: {
    type: DataTypes.STRING(255)
  }
});

module.exports = User;
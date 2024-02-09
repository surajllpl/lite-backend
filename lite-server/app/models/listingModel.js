
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');

const Listing = sequelize.define('Listing', {
  listing_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.TEXT
  },
  from_city: {
    type: DataTypes.TEXT
  },
  from_pin: {
    type: DataTypes.INTEGER
  },
  to_city: {
    type: DataTypes.TEXT
  },
  to_pin: {
    type: DataTypes.INTEGER
  },
  image_url_1: {
    type: DataTypes.STRING(255)
  },
  image_url_2: {
    type: DataTypes.STRING(255)
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  created_by: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  length: {
    type: DataTypes.FLOAT
  },
  width: {
    type: DataTypes.FLOAT
  },
  height: {
    type: DataTypes.FLOAT
  }
});

Listing.belongsTo(User, { foreignKey: 'created_by' });

module.exports = Listing;
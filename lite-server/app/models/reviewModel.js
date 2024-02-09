
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');
const Listing = require('./listingModel');

const Review = sequelize.define('Review', {
  review_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  listing_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Listing,
      key: 'listing_id'
    }
  },
  review: {
    type: DataTypes.TEXT
  }
});

Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Listing, { foreignKey: 'listing_id' });

module.exports = Review;
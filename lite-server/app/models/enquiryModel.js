
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const User = require('./userModel');
const Listing = require('./listingModel');

const Enquiry = sequelize.define('Enquiry', {
  enquiry_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  by_user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  to_user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'user_id'
    }
  },
  for_listing_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Listing,
      key: 'listing_id'
    }
  }
});

Enquiry.belongsTo(User, { foreignKey: 'by_user_id', as: 'Enquirer' });
Enquiry.belongsTo(User, { foreignKey: 'to_user_id', as: 'Recipient' });
Enquiry.belongsTo(Listing, { foreignKey: 'for_listing_id', as: 'Listing' });

module.exports = Enquiry;
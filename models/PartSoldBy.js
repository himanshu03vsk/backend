// models/PartSoldBy.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PartSoldBy = sequelize.define('part_sold_by', {
  seller_email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true
  },
  part_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'part_sold_by'
});

module.exports = PartSoldBy;

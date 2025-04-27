const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Order = require('./Order');
const Part = require('./Part');
const Shipment = sequelize.define('Shipment', {
    shipment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
        key: 'order_id',
      },
      allowNull: false,
    },
    part_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Part,
        key: 'part_id',
      },
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    quantity_purchased: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shipment_status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'Pending',
    },
    shipment_cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    tableName: 'shipment',
    timestamps: false
  });

  module.exports = Shipment;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Buyer = require('./Buyer');



const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    buyer_email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: Buyer,
        key: 'buyer_email',
      },
    },
    order_date: {
      type: DataTypes.DATE,
    },
    shipping_address: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    payment_method: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  }, {
    tableName: 'orders',
    timestamps: false
  });
  
module.exports = Order;
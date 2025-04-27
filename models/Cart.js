const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Part = require('./Part');
const Buyer = require('./Buyer');

const Cart = sequelize.define('Cart', {
    part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Part,
            key: 'part_id'
        }
    },
    buyer_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Buyer,
            key: 'buyer_email'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    color: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
}, {
    tableName: 'cart',
    timestamps: false
});

module.exports = Cart;

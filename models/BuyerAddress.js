const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Buyer = require('./Buyer');

const BuyerAddress = sequelize.define('BuyerAddress', {
    buyer_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Buyer,
            key: 'buyer_email'
        }
    },
    line1: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    line2: {
        type: DataTypes.STRING(255)
    },
    city: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    state_in: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    zip_code: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    tableName: 'buyer_address',
    timestamps: false
});

module.exports = BuyerAddress;

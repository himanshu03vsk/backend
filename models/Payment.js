const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Buyer = require('./Buyer');

const Payment = sequelize.define('Payment', {
    method_no: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    buyer_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        references: {
            model: Buyer,
            key: 'buyer_email'
        }
    },
    card_no: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    card_exp_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    card_cvv: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    card_name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    card_address: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    tableName: 'payment_info',
    timestamps: false
});

module.exports = Payment;

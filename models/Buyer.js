const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Person = require('./Person');

const Buyer = sequelize.define('Buyer', {
    buyer_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Person,
            key: 'email'
        }
    },
    
    notification_preferences: {
        type: DataTypes.STRING(6),
        allowNull: true,
        defaultValue: 'email'
    }
}, {
    tableName: 'buyer',
    timestamps: false
});

module.exports = Buyer;

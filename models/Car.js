const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Car = sequelize.define('Car', {
    make: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    model: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    car_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: 'car',
    timestamps: false
});

module.exports = Car;

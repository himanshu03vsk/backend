const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Part = sequelize.define('Part', {
    part_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    part_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    part_description: {
        type: DataTypes.TEXT
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    dimensions: {
        type: DataTypes.STRING(30)
    },
    part_weight: {
        type: DataTypes.DECIMAL(5, 2)
    },
    part_color: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    part_type: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    part_category: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'part',
    timestamps: false
});

module.exports = Part;

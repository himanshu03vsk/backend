const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Part = require('./Part');

const PartImage = sequelize.define('PartImage', {
    path: {
        type: DataTypes.STRING(255),
        allowNull: false,
        primaryKey: true
    },
    part_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Part,
            key: 'part_id'
        }
    },
    image_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255)
    }
}, {
    tableName: 'part_image',
    timestamps: false
});

module.exports = PartImage;

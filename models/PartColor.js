const Parts = require('./Part');
const sequelize = require('../config/db'); // Adjust the path as necessary
const { DataTypes } = require('sequelize');

const PartColor = sequelize.define('PartColor', {
    part_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Parts,
            key: 'part_id'
        }
    },

    color: {
        type: DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
    }
},
{
    tableName: 'part_color',
    timestamps: false
});

module.exports = PartColor;
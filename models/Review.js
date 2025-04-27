const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Buyer = require('./Buyer');
const Part = require('./Part');

const Review = sequelize.define('Review', {
    buyer_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Buyer,
            key: 'buyer_email'
        }
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
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    review_text: {
        type: DataTypes.TEXT
    }
}, {
    tableName: 'Review',
    timestamps: false
});

module.exports = Review;

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Person = require('./Person');

const Seller = sequelize.define('Seller', {
    seller_email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Person,
            key: 'email'
        }
    },
    seller_org_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    member_since: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'seller',
    timestamps: false
});

// In your model setup (can be at the bottom of models/Seller.js or in a central model index.js):
Seller.belongsTo(Person, { foreignKey: 'seller_email' });


module.exports = Seller;
    
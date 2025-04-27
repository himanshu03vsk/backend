const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Person = sequelize.define('Person', {
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true
    },
    p_password: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    fname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    carrier: {
        type: DataTypes.ENUM,
        values: ['Verizon', 'AT&T', 'T-Mobile', 'Sprint'],  // ENUM list of popular U.S. carriers
        allowNull: false
      },
}, {
    tableName: 'person',
    timestamps: false
});


module.exports = Person;

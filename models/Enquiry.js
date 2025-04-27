const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


// models/Enquiry.js

const Enquiry = sequelize.define('Enquiry', {

        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      message_subject: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    }, {
      tableName: 'Enquiry', // explicitly match the table name
      timestamps: false,    // if your table doesn't have createdAt/updatedAt
    });

  
module.exports = Enquiry;

  
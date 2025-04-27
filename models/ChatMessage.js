// models/ChatMessage.js


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');





// models/ChatMessage.js
const ChatMessage = sequelize.define("ChatMessage", {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      sender_email: { type: DataTypes.STRING, allowNull: false },
      receiver_email: { type: DataTypes.STRING, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
      timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },

    {
        tableName: 'ChatMessages',
        timestamps: false
    }
    );



  module.exports = ChatMessage;
// Associations

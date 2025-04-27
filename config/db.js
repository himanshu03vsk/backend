require('dotenv').config({ path: '.env' }); // Adjust this path if needed
 
const express = require('express');
// const sql = require('mssql');
const app = express();
const  { Sequelize } = require('sequelize');
 
console.log('DB_NAME:', process.env.DB_NAME);   //
console.log('DB_USER:', process.env.DB_USER);   //
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);   //
console.log('DB_SERVER:', process.env.DB_HOST);  
 
 
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST, // SQL Server host (replace with your Azure SQL server name)
    dialect: 'mssql', // Dialect
    dialectOptions: {
      encrypt: true, // Important for Azure SQL
      trustServerCertificate: true, // Disable certificate validation, optional (only for development)
    },
    logging: console.log, // Optional: disable logging if you don't need SQL queries to be printed
  }
);


// const sequelize = new Sequelize(
//   'carshopdb', // Database name
//   'root', // Username
//   'kiminosei', // Password
//   {
//     host: 'localhost', // SQL Server host (replace with your Azure SQL server name)
//     dialect: 'mysql', // Dialect
//     dialectOptions: {
//       encrypt: true, // Important for Azure SQL
//       trustServerCertificate: true, // Disable certificate validation, optional (only for development)
//     },
//     logging: console.log, // Optional: disable logging if you don't need SQL queries to be printed
//   }
// );
 
module.exports = sequelize;
 
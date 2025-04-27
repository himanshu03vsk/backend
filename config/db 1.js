require('dotenv').config({ path: '.env' }); // Adjust this path if needed

const express = require('express');
const sql = require('mssql');
const app = express();

console.log('DB_NAME:', process.env.DB_NAME);   // Should print 'carshop'
console.log('DB_USER:', process.env.DB_USER);   // Should print 'root'
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);   // Should print 'kiminosei'
console.log('DB_SERVER:', process.env.DB_SERVER);   // Should print 'localhost'

// Database connection
const config = {
    server: 'wdmcarparts.database.windows.net',
    user: 'admin1',
    password: 'carPart2025',
    database: 'carparts',
    options: {
        encrypt: true,   // For Azure SQL Database, set encrypt to true
        trustServerCertificate: false // Change to true if you get SSL/TLS certificate issues
      }
    };
    
    // Connect to the database
    sql.connect(config)
      .then(pool => {
        console.log('Connected to Azure SQL Database!');
        
        // Example query
        return pool.request().query('SELECT * FROM part');
      })
      .then(result => {
        console.log(result.recordset); // Show query results
      })
      .catch(err => {
        console.error('Error connecting to Azure SQL Database', err);
      })
      .finally(() => {
        sql.close();
      });




      require('dotenv').config({ path: '.env' }); // Adjust this path if needed
      
      console.log('DB_NAME:', process.env.DB_NAME);   // Should print 'carshop'
      console.log('DB_USER:', process.env.DB_USER);   // Should print 'root'
      console.log('DB_PASSWORD:', process.env.DB_PASSWORD);   // Should print 'kiminosei'
      console.log('DB_HOST:', process.env.DB_HOST);   // Should print 'localhost'
      
      const { Sequelize } = require('sequelize');
      
      // Initialize Sequelize with environment variables
      const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
          host: process.env.DB_HOST,
          dialect: 'mysql',
           // Log SQL queries for debugging
      });
      
      
      
      // const sequelize = new Sequelize('carshop', 'root', 'kiminosei', {
      //     host: 'localhost',
      //     dialect: 'mysql',
      //     logging: console.log // Log SQL queries for debugging
      // });
      
      // Test the connection
      sequelize.authenticate()
          .then(() => {
              console.log('Connection has been established successfully.');
          })
          .catch(err => {
              console.error('Unable to connect to the database:', err.message);
          });
      
      module.exports = sequelize;
      
      
      

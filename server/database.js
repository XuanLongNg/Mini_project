const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

// IIFE
const connectMysql = (() => {
  try {
    const data = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_database,
    });
    console.log("connected to database");
    return data;
  } catch (error) {
    console.log("Error, connection error: " + error);
  }
})();

module.exports = { connectMysql };

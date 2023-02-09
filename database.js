const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

module.exports.connectDB = () => {
  return new Promise((resolve, reject) => {
    const con = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_database,
    });
    con.connect(function (err) {
      if (err) {
        reject(err);
        throw err;
      }
      resolve(con);
    });
  });
};
module.exports.closeDB = (con) => {
  console.log("Close database");
  con.destroy();
};

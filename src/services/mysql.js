const mysql = require('mysql');
const Config = require('../../config');
const dbDriver = Config.get('/mysqlConnection');

const dbPool = mysql.createPool(dbDriver);

const connect = () => {
  return new Promise((resolve, reject) => {
    dbPool.getConnection((err, connection) => {
      if (err) reject(err);
      resolve(connection);
    });
  });
};

module.exports = connect;

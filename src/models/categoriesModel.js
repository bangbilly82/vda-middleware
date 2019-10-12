const Connect = require('../services/mysql');

const getCategories = () => {
  return new Promise((resolve, reject) => {
    Connect().then(connection => {
      connection.query('SELECT * FROM category', (error, results, fields) => {
        if (error) reject(error);
        connection.release();
        resolve(results);
      });
    });
  });
};

const getCategoryById = id => {
  return new Promise((resolve, reject) => {
    Connect().then(connection => {
      connection.query(`SELECT * FROM category WHERE category_id = '${id}'`, (error, results, fields) => {
        if (error) reject(error);
        connection.release();
        resolve(results);
      });
    });
  });
};

module.exports = {
  getCategories,
  getCategoryById
};

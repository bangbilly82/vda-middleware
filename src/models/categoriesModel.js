const Connect = require('../services/mysql');

const getCategories = () => {
  return new Promise((resolve, reject) => {
    Connect()
      .then(connection => {
        connection.query('SELECT * FROM category', (error, results, fields) => {
          if (error) reject(error);
          connection.release();
          resolve(results);
        });
      })
      .catch(error => {
        reject(error);
      });
  });
};

const getCategoryById = id => {
  return new Promise((resolve, reject) => {
    Connect()
      .then(connection => {
        connection.query(
          `SELECT * FROM category WHERE category_id = '${id}'`,
          (error, results, fields) => {
            if (error) reject(error);
            connection.release();
            resolve(results);
          }
        );
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = {
  getCategories,
  getCategoryById
};

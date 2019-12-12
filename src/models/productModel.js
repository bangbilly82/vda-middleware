const Connect = require('../services/mysql');

const getProducts = () => {
  return new Promise((resolve, reject) => {
    Connect()
      .then(connection => {
        connection.query('SELECT * FROM product WHERE product.`type` = "retail"', (error, results, fields) => {
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

const getProductsByID = id => {
  return new Promise((resolve, reject) => {
    Connect()
      .then(connection => {
        connection.query('SELECT * FROM product WHERE product.`type` = "retail" and product.`external_product_id` = ' + id + '', (error, results, fields) => {
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

module.exports = {
  getProducts,
  getProductsByID
};

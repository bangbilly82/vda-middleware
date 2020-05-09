const Connect = require('../services/mysql');

const getAllActiveUser = () => {
  return new Promise((resolve, reject) => {
    Connect()
      .then((connection) => {
        connection.query(
          'SELECT * FROM users LIMIT 0,100',
          (error, results, fields) => {
            if (error) reject(error);
            connection.release();
            resolve(results);
          }
        );
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  getAllActiveUser,
};

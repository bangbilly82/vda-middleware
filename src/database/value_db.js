const Connect = require('../services/mysql');

const saveValue = (payload) => {
  const { valueName } = payload;
  const query = `INSERT INTO value (name, status, description, created_by, updated_by, created_at, updated_at) VALUES ('${valueName}', 10, '', 1, 1, NOW(), NOW())`;
  return new Promise((resolve, reject) => {
    Connect()
      .then((connection) => {
        connection.query(query, (error, results, fields) => {
          if (error) reject(error);
          connection.release();
          resolve(results);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const getValue = () => {
  // const query = `SELECT value.*, keyword.name as keyword FROM value LEFT JOIN keyword ON value.id = keyword.value_id`;
  // const query = `SELECT value.name, (SELECT keyword.name FROM keyword WHERE keyword.value_id = value.id LIMIT 1) as keyword FROM value`;
  const query = `SELECT V.*, K.name as keyword, K.id as keyword_id FROM value V INNER JOIN keyword K ON V.id = K.value_id`;
  return new Promise((resolve, reject) => {
    Connect()
      .then((connection) => {
        connection.query(query, (error, results, fields) => {
          if (error) reject(error);
          connection.release();
          resolve(results);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  saveValue,
  getValue,
};

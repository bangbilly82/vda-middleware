const Connect = require('../services/mysql');

const saveKeyword = (payload) => {
  const { keywordName, valueID } = payload;
  const query = `INSERT INTO keyword (value_id, name, status, description, created_by, updated_by, created_at, updated_at) VALUES ('${valueID}', '${keywordName}', 10, '', 1, 1, NOW(), NOW())`;
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

const getKeyword = () => {
  const query = `SELECT * FROM keyword`;
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

const getKeywordByValueID = (value_id) => {
  const query = `SELECT * FROM keyword WHERE value_id = '${value_id}'`;
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
  saveKeyword,
  getKeyword,
  getKeywordByValueID,
};

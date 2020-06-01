const Connect = require('../services/mysql');

const saveDepartment = (payload) => {
  const { division, userIdHead, divisionUserId } = payload;
  const query = `INSERT INTO department (name, status, description, created_by, updated_by, created_at, updated_at) VALUES ('${division}', 10, '', 1, 1, NOW(), NOW())`;
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

const getDepartment = () => {
  const query = `SELECT * FROM department`;
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
  saveDepartment,
  getDepartment,
};

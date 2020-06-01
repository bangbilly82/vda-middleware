const Connect = require('../services/mysql');
const _ = require('lodash');

const getAllActiveUser = () => {
  const query = `SELECT users.*, department.name as division, department.id as division_id FROM users JOIN department ON users.department_id = department.id LIMIT 0,100`;
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

const getUserByID = (id) => {
  return new Promise((resolve, reject) => {
    Connect()
      .then((connection) => {
        connection.query(
          'SELECT * FROM users WHERE id = ' + id + ' LIMIT 0,100',
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

const saveUser = (payload) => {
  const { nik, namaLengkap, email, level, division, password } = payload;
  const query = `INSERT INTO users (NIK, status, name, email, phone, level, department_id, email_verified_at, password, remember_token, created_at, updated_at) VALUES ('${nik}', 10, '${namaLengkap}', '${email}', NULL, '${level}', '${division}', NULL, '${password}', NULL, NOW(), NOW())`;
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

const getUserByNIK = (nik) => {
  const query = `SELECT * FROM users WHERE NIK = '${nik}' LIMIT 0,100`;
  return new Promise((resolve, reject) => {
    Connect()
      .then((connection) => {
        connection.query(query, (error, results, fields) => {
          if (error) reject(error);
          connection.release();
          if (_.isEmpty(results)) {
            reject('data not valid');
            return;
          }
          resolve(results);
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

module.exports = {
  getAllActiveUser,
  getUserByID,
  saveUser,
  getUserByNIK,
};

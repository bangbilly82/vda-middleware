const Connect = require('../services/mysql');

const saveActivity = (payload) => {
  const { nameActivity } = payload;
  const query = `INSERT INTO activity (name, status, description, created_by, updated_by, created_at, updated_at) VALUES ('${nameActivity}', 10, '', 1, 1, NOW(), NOW())`;
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

const getActivity = () => {
  const query = `SELECT * FROM activity`;
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

const updateActivity = (payload) => {
  const { id, nameActivity } = payload;
  const query = `UPDATE activity SET name = '${nameActivity}', updated_at = NOW() WHERE id = '${id}'`;
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
  saveActivity,
  getActivity,
  updateActivity
};

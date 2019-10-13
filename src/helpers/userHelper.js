const Padawan = require('../services/padawan');

const getUserDetailById = ({ request, id }) => {
  return new Promise((resolve, reject) => {
    Padawan.getUserDetailById(id, request, (error, data) => {
      const payload = JSON.parse(data);
      if (error) {
        reject(error);
        return;
      }
      resolve(payload);
    });
  });
};

module.exports = {
  getUserDetailById
};

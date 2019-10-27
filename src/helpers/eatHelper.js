const Padawan = require('../services/padawan');

const getFoodDetail = ({ request, id }) => {
  return new Promise((resolve, reject) => {
    Padawan.getFoodDetail(id, request, (error, data) => {
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
  getFoodDetail
};

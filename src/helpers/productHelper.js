const Padawan = require('../services/padawan');

const getAllPointBoosterMerchant = ({ request }) => {
  return new Promise((resolve, reject) => {
    Padawan.getAllPointBoosterMerchant(request, (error, data) => {
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
  getAllPointBoosterMerchant
};

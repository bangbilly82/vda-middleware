const Config = require('../../config');
const Padawan = require('../services/padawan');
const Utils = require('../utils/Utils');
const host = Config.get('/staticFile');

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

const getProductJSON = () => {
  return new Promise((resolve, reject) => {
    Utils.readProductJson().then(results => {
      const product = [];
      results.forEach(item => {
        product.push({
          ...item,
          image_url: `${host}/api/static/file/image/${item.image}`
        });
      });
      resolve(product);
    });
  });
};

module.exports = {
  getAllPointBoosterMerchant,
  getProductJSON
};

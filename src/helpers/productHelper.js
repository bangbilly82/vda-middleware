const Config = require('../../config');
const Padawan = require('../services/padawan');
const Utils = require('../utils/Utils');
const host = Config.get('/staticFile');
const _ = require('lodash');

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

const getProductById = id => {
  return new Promise((resolve, reject) => {
    Utils.readProductJson().then(results => {
      const product = results.filter(item => {
        return item.product_id === id;
      });
      _.extend(product[0], {
        image_url: `${host}/api/static/file/image/${product[0].image}`
      });
      resolve(product[0]);
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
  getProductJSON,
  getProductById
};

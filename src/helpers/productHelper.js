const Config = require('../../config');
const Padawan = require('../services/padawan');
const Utils = require('../utils/Utils');
const host = Config.get('/staticFile');
const _ = require('lodash');
const Fitmart = require('../services/fitmart');
const WP = require('../services/wp');

const CATEGORY_MAPPING = {
  flashsale: 102,
  featured: 227
};

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

const getAllFitmartProducts = categoryId => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllProduct(categoryId).then(response => {
      resolve(response);
    });
  });
};

const getFitmartProductById = id => {
  return new Promise((resolve, reject) => {
    Fitmart.getProductById(id).then(response => {
      resolve(response);
    });
  });
};

const getAllFitmartPayments = () => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllPayments().then(response => {
      resolve(response);
    });
  });
};

const getAllShippingMethods = () => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllShippingMethods().then(response => {
      resolve(response);
    });
  });
};

const proceedOrder = ({ request }) => {
  return new Promise((resolve, reject) => {
    const data = request.payload;
    Fitmart.proceedOrder(data).then(response => {
      resolve(response);
    });
  });
};

const getAllAvailableCoupons = () => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllAvailableCoupons().then(response => {
      resolve(response);
    });
  });
};

const searchByCriteria = query => {
  return new Promise((resolve, reject) => {
    WP.searchByCriteria(query).then(response => {
      resolve(response);
    });
  });
};

module.exports = {
  getAllPointBoosterMerchant,
  getProductJSON,
  getProductById,
  getAllFitmartProducts,
  getFitmartProductById,
  getAllFitmartPayments,
  getAllShippingMethods,
  proceedOrder,
  getAllAvailableCoupons,
  searchByCriteria
};

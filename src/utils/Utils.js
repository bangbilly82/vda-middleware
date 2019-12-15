const Fs = require('fs');
const Path = require('path');
const PRODUCTS = Path.join(__dirname, '../../assets/products.json');
const CATEGORIES = Path.join(__dirname, '../../assets/categories.json');
const SHIPPING = Path.join(__dirname, '../../assets/shipping.json');
const BANNER = Path.join(__dirname, '../../assets/banner.json');
const PROMOTION = Path.join(__dirname, '../../assets/promotion.json');

const readFile = file => {
  return new Promise(function(resolve, reject) {
    Fs.readFile(file, function(err, content) {
      if (err) {
        resolve({ err: err });
        return;
      }
      var json = JSON.parse(content);
      resolve(json);
    });
  });
};

const readProductJson = () => {
  return new Promise((resolve, reject) => {
    return readFile(PRODUCTS).then(response => {
      resolve(response);
    });
  });
};

const readCategoriesJson = () => {
  return new Promise((resolve, reject) => {
    return readFile(CATEGORIES).then(response => {
      resolve(response);
    });
  });
};

const readShippingJson = () => {
  return new Promise((resolve, reject) => {
    return readFile(SHIPPING).then(response => {
      resolve(response);
    });
  });
};

const readBannerJson = () => {
  return new Promise((resolve, reject) => {
    return readFile(BANNER).then(response => {
      resolve(response);
    });
  });
};

const readPromotionJson = () => {
  return new Promise((resolve, reject) => {
    return readFile(PROMOTION).then(response => {
      resolve(response);
    });
  });
};

module.exports = {
  readProductJson,
  readCategoriesJson,
  readShippingJson,
  readBannerJson,
  readPromotionJson
};

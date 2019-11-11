const Boom = require('boom');
const Config = require('../../config');
const CategoriesModel = require('../models/categoriesModel');
const Utils = require('../utils/Utils');
const host = Config.get('/staticFile');
const Fitmart = require('../services/fitmart');

const categoryBackgroundColor = {
  active: '#87D7EA',
  beverage: '#A8BDEA',
  bundling: '#CCAEEC',
  'flash-sale': '#EAA9E9',
  'food-beverage': '#F9B5CC',
  'healthy-snacks': '#F5BA90',
  'ingredients-cooking-stuff': '#A7DB9B',
  lifestyle: '#5FEFCB',
  nutrition: '#7FE2E8',
  'produk-unggulan': '#B8BBF9'
};

const getCategories = () => {
  return new Promise((resolve, reject) => {
    CategoriesModel.getCategories()
      .then(results => {
        const categories = [];
        results.forEach(item => {
          categories.push({
            ...item,
            image_url: `${host}/api/static/file/image/${item.image}`
          });
        });
        resolve(categories);
      })
      .catch(err => {
        reject(Boom.badImplementation(err));
      });
  });
};

const getCategoryById = id => {
  return new Promise((resolve, reject) => {
    CategoriesModel.getCategoryById(id)
      .then(results => {
        resolve(results);
      })
      .catch(err => {
        reject(Boom.badImplementation(err));
      });
  });
};

const getCategoryByJSON = () => {
  return new Promise((resolve, reject) => {
    Utils.readCategoriesJson().then(results => {
      const categories = [];
      results.forEach(item => {
        categories.push({
          ...item,
          image_url: `${host}/api/static/file/image/${item.image}`
        });
      });
      resolve(categories);
    });
  });
};

const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    Fitmart.getAllCategories().then(response => {
      const categories = response.filter(item => {
        return item.slug !== 'uncategorized';
      });
      categories.map(item => {
        item.backgroundColor = categoryBackgroundColor[item.slug.toLowerCase()];
      });
      resolve(categories);
    });
  });
};

module.exports = {
  getCategories,
  getCategoryById,
  getCategoryByJSON,
  getAllCategories
};

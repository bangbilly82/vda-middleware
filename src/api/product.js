const Joi = require('joi');
const Utils = require('../utils/Utils');
const ProductHelper = require('../helpers/productHelper');

module.exports = {
  name: 'product-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/featured',
        options: {
          auth: 'default',
          description: 'Get all featured products',
          tags: ['api', 'Product']
        },
        handler: featuredProducts
      },
      {
        method: 'GET',
        path: '/id/{product_id}',
        options: {
          auth: 'default',
          description: 'Get product by id',
          tags: ['api', 'Product'],
          validate: {
            params: {
              product_id: Joi.string().required()
            }
          }
        },
        handler: getProductById
      },
      {
        method: 'GET',
        path: '/point-booster/merchant',
        options: {
          auth: 'default',
          description: 'Get all point booster merchant',
          tags: ['api', 'Product']
        },
        handler: getPointBoosterMerchant
      },
    ]);
  }
};

const featuredProducts = async (request, h) => {
  try {
    const featuredProducts = await Utils.readProductJson();
    return h.response(featuredProducts);
  } catch (error) {
    return error;
  }
};

const getProductById = async (request, h) => {
  try {
    const product_id = request.params.product_id;
    const featuredProducts = await Utils.readProductJson();
    const product = featuredProducts.filter(item => {
      return item.product_id === product_id;
    });
    return h.response(product[0]);
  } catch (error) {
    return error;
  }
};

const getPointBoosterMerchant = async (request, h) => {
  try {
    const boosters = await ProductHelper.getAllPointBoosterMerchant({ request });
    return h.response(boosters);
  } catch (error) {
    return error;
  }
};

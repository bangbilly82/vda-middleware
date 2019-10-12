const Boom = require('@hapi/boom');
const Joi = require('joi');
const Utils = require('../utils/Utils');

module.exports = {
  name: 'product-api',
  version: '1.0.0',
  register: (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/featured',
        options: {
          auth: false,
          description: 'Get all featured products'
        },
        handler: featuredProducts
      },
      {
        method: 'GET',
        path: '/id/{product_id}',
        options: {
          auth: false,
          description: 'Get product by id',
          validate: {
            params: {
              product_id: Joi.string().required()
            }
          }
        },
        handler: getProductById
      }
    ]);
  }
};

const featuredProducts = async (request, h) => {
  try {
    const featuredProducts = await Utils.readProductJson();
    return h.response(featuredProducts);
  } catch (error) {
    return h.response(error);
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
    return h.response(error);
  }
};

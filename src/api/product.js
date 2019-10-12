const Joi = require('joi');
const Utils = require('../utils/Utils');

const productAPI = {
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
        path: '/by',
        options: {
          auth: false,
          description: 'Get product by id',
          validate: {
            query: {
              id: Joi.string().required()
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
  } catch (error) {}
};

const getProductById = async (request, h) => {
  try {
    const product_id = request.query.id;
    const featuredProducts = await Utils.readProductJson();
    const product = featuredProducts.filter( item => {
      return item.product_id === product_id;
    })
    return h.response(product[0]);
  } catch (error) {}
};

module.exports = productAPI;

const Joi = require('joi');
const ShippingHelper = require('../helpers/shippingHelper');
const Utils = require('../utils/Utils');

module.exports = {
  name: 'shipping-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/',
        options: {
          auth: 'guestAuth',
          description: 'Get all shipping option',
          tags: ['api', 'Shipping']
        },
        handler: shippingHandler
      },
      {
        method: 'GET',
        path: '/province',
        options: {
          auth: 'guestAuth',
          description: 'Get all shipping province',
          tags: ['api', 'Shipping'],
          validate: {
            query: {
              id: Joi.string().optional()
            }
          }
        },
        handler: getShippingProvince
      },
      {
        method: 'GET',
        path: '/city',
        options: {
          auth: 'guestAuth',
          description: 'Get all shipping city',
          tags: ['api', 'Shipping'],
          validate: {
            query: {
              id: Joi.string().optional(),
              province: Joi.string().optional()
            }
          }
        },
        handler: getShippingCity
      },
      {
        method: 'POST',
        path: '/cost',
        options: {
          auth: 'guestAuth',
          description: 'Get all shipping cost',
          tags: ['api', 'Shipping'],
          validate: {
            payload: {
              origin: Joi.string().optional(),
              destination: Joi.string().optional(),
              weight: Joi.string().optional(),
              courier: Joi.string().optional()
            }
          }
        },
        handler: getCost
      }
    ]);
  }
};

const shippingHandler = async (request, h) => {
  try {
    const shipping = await Utils.readShippingJson();
    return h.response(shipping);
  } catch (error) {
    return error;
  }
};

const getShippingProvince = async (request, h) => {
  try {
    const province = await ShippingHelper.getAllShippingProvince({ request });
    return h.response(province);
  } catch (error) {
    return error;
  }
};

const getShippingCity = async (request, h) => {
  try {
    const city = await ShippingHelper.getAllShippingCity({ request });
    return h.response(city);
  } catch (error) {
    return error;
  }
};

const getCost = async (request, h) => {
  try {
    const cost = await ShippingHelper.getCost({ request });
    return h.response(cost);
  } catch (error) {
    return error;
  }
};

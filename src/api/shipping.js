const CategoriesHelper = require('../helpers/categoriesHelper');
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

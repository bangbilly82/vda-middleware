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
    let session = request.state.session;
    if (!session) {
      session = { user: 'joe' };
    }

    session.last = Date.now();
    const shipping = await Utils.readShippingJson();
    return h.response(shipping).state('session', session);
  } catch (error) {
    return error;
  }
};

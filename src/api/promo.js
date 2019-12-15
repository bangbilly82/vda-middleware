const CategoriesHelper = require('../helpers/categoriesHelper');
const Utils = require('../utils/Utils');

module.exports = {
  name: 'promo-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/',
        options: {
          auth: 'guestAuth',
          description: 'Get all shop promotion',
          tags: ['api', 'Promo']
        },
        handler: getAllPromo
      }
    ]);
  }
};

const getAllPromo = async (request, h) => {
  try {
    const promotion = await Utils.readPromotionJson();
    return h.response(promotion);
  } catch (error) {
    return error;
  }
};

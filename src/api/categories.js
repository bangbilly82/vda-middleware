const Utils = require('../utils/Utils');

module.exports = {
  name: 'categories-api',
  version: '1.0.0',
  register: (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/categories',
        handler: fetchShopCategories
      }
    ]);
  }
};

const fetchShopCategories = async (request, h) => {
  try {
    const categories = await Utils.readCategoriesJson();
    return h.response(categories);
  } catch (error) {}
};

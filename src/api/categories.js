const CategoriesHelper = require('../helpers/categoriesHelper');

module.exports = {
  name: 'categories-api',
  version: '1.0.0',
  register: (server, options) => {
    server.route([
      {
        method: 'GET',
        path: '/categories',
        options: {
          auth: 'default',
          description: 'Get all shop categories'
        },
        handler: fetchShopCategories
      }
    ]);
  }
};

const fetchShopCategories = async (request, h) => {
  try {
    const categories = await CategoriesHelper.getCategoryByJSON();
    return h.response(categories);
  } catch (error) {}
};

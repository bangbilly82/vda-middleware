const CategoriesHelper = require('../helpers/categoriesHelper');

module.exports = {
  name: 'categories-api',
  version: '1.0.0',
  register: server => {
    server.route([
      {
        method: 'GET',
        path: '/',
        options: {
          auth: 'guestAuth',
          description: 'Get all shop categories',
          tags: ['api', 'Categories']
        },
        handler: getAllFitmartCategories
      }
    ]);
  }
};

const getAllFitmartCategories = async (request, h) => {
  try {
    const categories = await CategoriesHelper.getAllCategories();
    return h.response(categories);
  } catch (error) {
    return error;
  }
};

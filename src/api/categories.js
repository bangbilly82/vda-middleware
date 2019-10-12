const uuidv4 = require('uuid/v4');

const categoriesAPI = {
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

const fetchShopCategories = (request, h) => {
  const categories = [
    {
      category_id: uuidv4(),
      name: 'Food'
    },
    {
      category_id: uuidv4(),
      name: 'Essentials'
    },
    {
      category_id: uuidv4(),
      name: 'Active'
    }
  ];
  return categories;
};

module.exports = categoriesAPI;

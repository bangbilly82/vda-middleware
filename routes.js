module.exports = [
  {
    plugin: require('./src/api/categories'),
    routes: {
      prefix: '/api/shop/categories'
    }
  },
  {
    plugin: require('./src/api/product'),
    routes: {
      prefix: '/api/shop/product'
    }
  },
  {
    plugin: require('./src/api/user'),
    routes: {
      prefix: '/api/user'
    }
  },
  {
    plugin: require('./src/api/staticfile'),
    routes: {
      prefix: '/api/static/file'
    }
  }
];

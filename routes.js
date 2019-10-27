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
  },
  {
    plugin: require('./src/api/shipping'),
    routes: {
      prefix: '/api/shipping'
    }
  },
  {
    plugin: require('./src/api/eat'),
    routes: {
      prefix: '/api/eat'
    }
  },
  {
    plugin: require('./src/api/media'),
    routes: {
      prefix: '/api/shop/media'
    }
  }
];

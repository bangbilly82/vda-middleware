module.exports = [
  {
    plugin: require('./src/api/categories'),
    routes: {
      prefix: '/api/shop'
    }
  },
  {
    plugin: require('./src/api/product'),
    routes: {
      prefix: '/api/product'
    }
  },
  {
    plugin: require('./src/api/staticfile'),
    routes: {
      prefix: '/api/static/file'
    }
  }
];

const Confidence = require('confidence');
const Glue = require('@hapi/glue');

const criteria = {
  env: process.env.NODE_ENV
};

const manifest = {
  server: {
    port: process.env.PORT || 5000
  },
  register: {
    plugins: [
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
      }
    ]
  }
};

const options = {
  relativeTo: __dirname
};

module.exports = () => {
  return Glue.compose(
    manifest,
    options
  );
};

const Confidence = require('confidence');
const Glue = require('@hapi/glue');

const criteria = {
  env: process.env.NODE_ENV
};

const manifest = {
  server: {
    port: process.env.NODE_ENV || 5000
  },
  register: {
    plugins: [
      {
        plugin: require('./src/api/categories'),
        routes: {
          prefix: '/api/shop'
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

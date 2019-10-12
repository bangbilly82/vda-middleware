const Glue = require('@hapi/glue');
const Path = require('path');

const manifest = {
  server: {
    port: process.env.PORT || 5000,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  },
  register: {
    plugins: [
      {
        plugin: require('inert')
      },
      {
        plugin: require('@hapi/basic')
      },
      {
        plugin: require('./src/authentication/auth')
      },
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

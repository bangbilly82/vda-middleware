const Confidence = require('confidence');

const criteria = {
  env: process.env.NODE_ENV
};

var config = {
  $meta: 'FITCO Shop Middleware.',
  projectName: 'fitco-shop-middleware',
  staticFile: {
    $filter: 'env',
    production: 'https://fitco-shop-api.herokuapp.com',
    staging: 'https://fitco-shop-api.herokuapp.com',
    dev: 'https://fitco-shop-api.herokuapp.com',
    local: 'https://fitco-shop-api.herokuapp.com',
    $default: 'https://fitco-shop-api.herokuapp.com'
  },
  padawanApi: {
    $filter: 'env',
    production: 'https://api.fitco.id',
    staging: 'https://staging.api.fitco.id',
    dev: 'https://dev.api.fitco.id',
    local: 'http://localhost:3000',
    $default: 'http://localhost:3000'
  },
  mysqlConnection: {
    $filter: 'env',
    production: {
      host: 'production.fitco.id',
      user: 'root',
      password: 'password',
      database: 'fitco_shop',
      port: 3306
    },
    staging: {
      host: 'staging.fitco.id',
      user: 'root',
      password: 'password',
      database: 'fitco_shop',
      port: 3306
    },
    dev: {
      host: 'dev.fitco.id',
      user: 'root',
      password: 'password',
      database: 'fitco_shop',
      port: 3306
    },
    local: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'fitco_shop',
      port: 3306
    },
    $default: {
      host: '127.0.0.1',
      user: 'root',
      password: 'password',
      database: 'fitco_shop',
      port: 3306
    }
  },
  swaggerOptions: {
    info: {
      title: 'FITCO SHOP API Documentation',
      version: '1.0.0'
    },
    tags: [
      {
        name: 'Categories',
        description: 'shop categories api'
      },
      {
        name: 'Product',
        description: 'shop product api'
      },
      {
        name: 'Static File',
        description: 'static file api'
      }
    ],
    grouping: 'tags'
  }
};

var store = new Confidence.Store(config);

exports.get = function(key) {
  return store.get(key, criteria);
};

exports.meta = function(key) {
  return store.meta(key, criteria);
};

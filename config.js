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
  }
};

var store = new Confidence.Store(config);

exports.get = function(key) {
  return store.get(key, criteria);
};

exports.meta = function(key) {
  return store.meta(key, criteria);
};

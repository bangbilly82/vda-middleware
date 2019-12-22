const Confidence = require('confidence');

const criteria = {
  env: process.env.NODE_ENV
};

var config = {
  $meta: 'VDA Middleware.',
  projectName: 'vda-middleware',
  mongodb: {
    $filter: 'env',
    production: {
      host: 'mongodb://vda:vdaasmin1@ds135335.mlab.com:35335/vda'
    },
    staging: {
      host: 'mongodb://vda:vdaasmin1@ds135335.mlab.com:35335/vda'
    },
    dev: {
      host: 'mongodb://vda:vdaasmin1@ds135335.mlab.com:35335/vda'
    },
    local: {
      host: 'mongodb://127.0.0.1:27017/'
    },
    $default: {
      host: 'mongodb://127.0.0.1:27017/'
    }
  },
  swaggerOptions: {
    info: {
      title: 'VDA API Documentation',
      version: '1.0.0'
    }
  },
  secretKey: {
    $filter: 'env',
    production: 'vda-prod-secret-1234',
    staging: 'vda-staging-secret-1234',
    dev: 'vda-dev-secret-1234',
    local: 'vda-local-secret-1234',
    $default: 'vda-local-secret-1234'
  },
  rajaOngkir: {
    $filter: 'env',
    production: {
      host: 'https://pro.rajaongkir.com/api',
      apiKey: 'bef633a7aec9fe973400bcdfea287d35'
    },
    staging: {
      host: 'https://pro.rajaongkir.com/api',
      apiKey: 'bef633a7aec9fe973400bcdfea287d35'
    },
    dev: {
      host: 'https://pro.rajaongkir.com/api',
      apiKey: 'bef633a7aec9fe973400bcdfea287d35'
    },
    local: {
      host: 'https://pro.rajaongkir.com/api',
      apiKey: 'bef633a7aec9fe973400bcdfea287d35'
    },
    $default: {
      host: 'https://pro.rajaongkir.com/api',
      apiKey: 'bef633a7aec9fe973400bcdfea287d35'
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

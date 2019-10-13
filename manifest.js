const Glue = require('@hapi/glue');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Good = require('@hapi/good');
const Path = require('path');
const HapiSwagger = require('hapi-swagger');
const Config = require('./config');
const Routes = require('./routes');

const Swagger = {
  plugin: HapiSwagger,
  options: Config.get('/swaggerOptions')
};

const Logger = {
  plugin: Good,
  options: {
    reporters: {
      myConsoleReporter: [
        {
          module: '@hapi/good-squeeze',
          name: 'Squeeze',
          args: [{ log: '*', response: '*' }]
        },
        {
          module: '@hapi/good-console'
        },
        'stdout'
      ]
    }
  }
};

const HapiAuthJWT = {
  plugin: require('hapi-auth-jwt2')
};

const Auth = {
  plugin: require('./src/authentication/auth')
};

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
    plugins: [Inert, Vision, Swagger, Logger, HapiAuthJWT, Auth, ...Routes]
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

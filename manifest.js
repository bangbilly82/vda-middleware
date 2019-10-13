const Glue = require('@hapi/glue');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Path = require('path');
const HapiSwagger = require('hapi-swagger');
const Config = require('./config');
const Routes = require('./routes');

const Swagger = {
  plugin: HapiSwagger,
  options: Config.get('/swaggerOptions')
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
    plugins: [
      Inert,
      Vision,
      Swagger,
      {
        plugin: require('./src/authentication/auth')
      },
      ...Routes
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
